import vent from './vent';
const {ipcRenderer} = window.require('electron');


const subfolder = 'target';
let file = {};       // {name, path, size}
                      // path: fullPath + name
let nodeTransl = null,   // весь элемент
    nodeCurrent = null,
    nodeSelection = null  // выделяется из nodeCurrent
    //nodeLast = null


// установка
const setRoot = (root) => {
  nodeTransl = root;
};

const setLoadedFile = ({name, path, content}) => {
  let s = content;
  s = txtToTransl(s);
  nodeTransl.innerHTML = s;
  nodeSelection = nodeTransl.querySelector('#selection-transl');  // метод getElementById есть только у document
  nodeCurrent = nodeTransl.querySelector('#current-transl');

  file = {name, path /*, startPoz: getStartPoz()*/ };
  setLocalStorage();
  vent.publish('loadedTransl', file);

  function txtToTransl(_s) {
    if (/\.transl$/.test(name)) return _s;
    let s = _s;
    //Нормализуем - убираем из текста возможные тэги
    s = s.replace(/</g, '(').replace(/>/g, ')');
    //Заменяем абзацы и упорядочиваем пробелы
    s = s.replace(/\n/g, '<br>');
    s = s.replace(/\s*<br>\s*/g,'<br>&nbsp&nbsp'); //для отступа
    s = s.replace(/\s+/g, ' '); //все пробелы однотипные и по одному
    s = s.replace(/\s([.,:;!\)])/g, '$1'); //убираем ненужные пробелы
    //Добавляем тэги для начальной работы с текстом
    s = `<main-info lang="ru"></main-info>
         <span id="selection-transl"></span>
         <span id="current-transl">&nbsp&nbsp${s}</span>`;
    return s;
  }

}

function setLocalStorage() {
  localStorage.setItem('path-transl', file.path);
  localStorage.setItem('name-transl', file.name);
}

const setState = (state) => {

}

// Сохранение файла
const save = () => {
  if (!file.name) return;
  //cleareSelection();
  const content = nodeTransl.innerHTML;
  if (!content) return;
  const path =  /\.transl$/.test(file.path) ? file.path : file.path.replace(/\.[^.]{1,5}$/,'.transl');
  const name =  /\.transl$/.test(file.name) ? file.name : file.name.replace(/\.[^.]{1,5}$/,'.transl');

  ipcRenderer.send('will-save-file', {path, name, content, kind: 'transl'});
}

  ipcRenderer.on('file-saved', (event, arg) => {
    if (arg.kind !== 'transl') return;   // {err, path, name, kind}
    if (arg.err) {
      console.log('error in saving *.transl:');  console.log(arg.err);
      return;
    }
    file.path = arg.path; // если было расширение .txt (или другое), то оно изменится на .lngt
    file.name = arg.name;
    setLocalStorage();
    vent.publish('savedTransl', file);
  });

// Восстановление файла
const restore = () => {
  const name = file.name || localStorage.getItem('name-transl');
  const path = file.path || localStorage.getItem('path-transl');
  if (!name || !path) return;
  ipcRenderer.send('will-restore-file', {name, path, kind: 'transl'});
}

  ipcRenderer.on('file-restored', (event, arg) => {
    //arg = {name, path, content, kind, err};
    if (arg.kind !== 'transl') return;
    if (arg.err) {
      console.log('error in restoring *.transl:');  console.log(arg.err);
      return;
    }
    const {name, path, content} = arg;
    modelTransl.setLoadedFile({name, path, content}); // здесь сами установятся file и localStorage
  })

/*
// Изменение области выделения
modelTransl.addSelection = () => {
  //if (stateTxt === 'delete interval') return;
  let current = nodeCurrent.innerHTML
  let selection = nodeSelection.innerHTML
  if (!current) return;
  const s = current.match(/^.+?(\s|<br>)/)
  if (s) {
    nodeSelection.innerHTML = selection + s[0]
    nodeCurrent.innerHTML = current.slice(s[0].length)
  } else {  //конец текстового файла
    nodeSelection.innerHTML = selection + current
    nodeCurrent.innerHTML = ''
  }
}

modelTransl.reduceSelection = () => {
  //if (stateTxt === 'delete interval') return;
  //let current = nodeCurrent.innerHTML
  let selection = nodeSelection.innerHTML
  if(!selection) return;
  const s = selection.match(/.+(\s|<br>)(.+(\s|<br>)?)$/)
  if(s) {
    nodeCurrent.innerHTML = s[2] + current;
    nodeSelection.innerHTML = selection.slice(0, -s[2].length);
  } else {
    nodeCurrent.innerHTML = selection + current;
    nodeSelection.innerHTML = '';
  }
}
*/


// Выделенный участок перемещаем в оставшуюся область, выделяем предыдущий участок
/*
modelTransl.deleteUnit = () => {
  let _from, _to;   // from - показывает ключевое слово
  let span = nodeLast.previousElementSibling;  // возможно можно const span
  nodeLast.removeAttribute('id');
  const txtTmp = nodeLast.innerHTML;
  nodeCurrent.innerHTML = txtTmp + nodeCurrent.innerHTML;
  nodeLast.remove();
  if (span && span.hasAttribute('from') &&  span.hasAttribute('to')) {
    _from = + span.getAttribute('from');
    _to = + span.getAttribute('to');
    span.id = 'last-txt';
    nodeLast = span;
  }
  return { _from, _to };
}

modelTransl.setStateTransl = () => {
  if (nodeLast) nodeLast.removeAttribute('id');
  nodeLast = null;
}

modelTransl.setStateDelete = () => {
  let _from, _to;   // from - показывает ключевое слово
  if (!nodeSelection) return;
  nodeLast = nodeSelection.previousElementSibling;
  if(!nodeLast || !nodeLast.hasAttribute('from')) return;
  _from = nodeLast.getAttribute('from');
  _to = nodeLast.getAttribute('to');
  nodeLast.id = 'last-txt';
  cleareSelection();
  return { _from, _to };
}

function cleareSelection() {
  const current = nodeCurrent.innerHTML;
  const selection = nodeSelection.innerHTML;
  if(selection) {
    nodeCurrent.innerHTML = selection + current;
    nodeSelection.innerHTML = '';
  }
}
*/

/*
function getStartPoz() {
  let poz = 0;
  const span = nodeSelection.previousElementSibling;
  if (span && span.hasAttribute('to')) poz = + span.getAttribute('to');
  return poz;
}
*/

const modelTransl = {
  setRoot,
  setLoadedFile,
  setState,
  save,
  restore
};

export default modelTransl;
