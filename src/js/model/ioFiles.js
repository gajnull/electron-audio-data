import vent from './vent';
const {ipcRenderer} = window.require('electron');


let isLoading = false;  // для избежания повторного запроса
let file = {};

////////////************ установка  ************


const setLoadedFile = ({type, name, path, content}) => {
  
  file = {name, path};
  let str = txtToTransl(content);
  initNodes(str);

  vent.publish('loadedTransl', file);

  function txtToTransl(content) {
    if (!/\.txt$/.test(file.name)) return content;
    file.name = (file.name).replace(/(\.[a-zа-яё]{1,3})?\.txt$/,'._transl');  // тогда txt-файл с переводом можно также называть, но прибавлять через точку несколько букв(например *.ru.txt)
    file.path = (file.path).replace(/(\.[a-zа-яё]{1,3})?\.txt$/,'._transl');
    let s = content;
    //Нормализуем - убираем из текста возможные тэги
    s = s.replace(/</g, '(').replace(/>/g, ')');
    //Заменяем абзацы и упорядочиваем пробелы
    s = s.replace(/\n/g, '<br>').replace(/\s*<br>\s*/g,'<br>&nbsp&nbsp'). //для отступа
          replace(/\s+/g, ' '). //все пробелы однотипные и по одному
          replace(/\s([.,:;!\)])/g, '$1'); //убираем ненужные пробелы
    //Добавляем тэги для начальной работы с текстом
    s = `<main-info lang="ru"></main-info>
         <span id="selection-transl"></span>
         <span id="blank-transl">&nbsp&nbsp${s}</span>`;
    return s;
  }

}


////////////************ Сохранение/восстановление файла *************

const save = () => {
  if (!file.name) return;
  clearNodeSelection();
  const content = nodeTransl.innerHTML;
  if (!content) return;
  ipcRenderer.send('will-save-file', {path: file.path, content, kind: '_transl'});
}

const make = () => {
  save();
  if (!nodeTransl) return;
  const nodes = nodeTransl.querySelectorAll('span[transl="true"]');
  if (nodes.length === 0) return;
  let arr = [];
  nodes.forEach(node => {
    arr.push((node.innerHTML).replace(/<br>/g, '\n').replace(/&nbsp;/g, ' '));
  });
  const content = JSON.stringify(arr);
  const path = (file.path).replace(/\._transl$/, '.transl');
  ipcRenderer.send('will-save-file', {path, content, kind: 'transl'});
}

  ipcRenderer.on('file-saved', (event, arg) => {
    // {err, path, kind}
    if (arg.err) {
      console.log('error in saving *._transl:');  console.log(arg.err);
      return;
    }
    if (arg.kind === '_transl') {
      setLocalStorage();
      vent.publish('savedTransl', file);
    }
    if (arg.kind === 'transl') {
      const rest = (nodeBlank.innerHTML).replace(/(\s|<br>|&nbsp;)/g, '');
      let msg = '<p> Сформирован окончательный файл:<br>' + arg.path + '</p>';
      if (rest !== '') msg = msg +'<p> Остался неопределённый фрагмент: ' +
                                  (nodeBlank.innerHTML).slice(0, 100) + '...</p>';
      vent.publish('popup', {msg, duration: 4000});
    }
  });

  function setLocalStorage() {
    localStorage.setItem('path-transl', file.path);
    localStorage.setItem('name-transl', file.name);
  }

const restore = () => {
  const name = localStorage.getItem('name-transl');
  const path =localStorage.getItem('path-transl');
  if (!name || !path) return;
  if (!/\._transl$/.test(name) ||        // это не должно случиться
      !/\._transl$/.test(path)) return;  // для случая, если при сохранении произошла ошибка
  ipcRenderer.send('will-restore-file', {name, path, kind: '_transl'});
}

  ipcRenderer.on('file-restored', (event, arg) => {
    //arg = {name, path, content, kind, err};
    if (arg.kind !== '_transl') return;
    if (arg.err) {
      console.log('error in restoring *._transl:');  console.log(arg.err);
      return;
    }
    const {name, path, content} = arg;
    modelTransl.setLoadedFile({name, path, content}); // здесь сами установятся file и localStorage
  })



const modelTransl = {
  setLoadedFile,
  save,
  make,
  restore
};

export default ioFiles;