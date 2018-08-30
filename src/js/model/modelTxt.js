import vent from './vent';
const {ipcRenderer} = window.require('electron');

const modelTxt = {};

//const subfolder = 'target';
let file = {};       // {name, path}
                      // path: fullPath + name
let nodeTxt = null,   // весь элемент
    nodeBlank = null,
    nodeAdd = null, nodeDelete = null, nodeTransl = null



////////////************ установка  ************ 

modelTxt.setRoot = (root) => {
  nodeTxt = root;
};

modelTxt.setLoadedFile = ({name, path, content}) => { 
  txtToLngt();
  nodeTxt.innerHTML = content;
  nodeAdd = nodeTxt.querySelector('#add-txt');  // метод getElementById есть только у document
  nodeBlank = nodeTxt.querySelector('#blank-txt');

  file = {name, path};
  setLocalStorage();
  vent.publish('loadedLngt', {name, path, startPoz: getStartPoz()});

  function txtToLngt() {
    if (/\.lngt$/.test(name)) return;

    let s = content;
    //Нормализуем - убираем из текста возможные тэги
    s = s.replace(/</g, '(').replace(/>/g, ')');
    //Заменяем абзацы и упорядочиваем пробелы
    s = s.replace(/\n/g, '<br>');
    s = s.replace(/\s*<br>\s*/g,'<br>&nbsp&nbsp'); //для отступа
    s = s.replace(/\s+/g, ' '); //все пробелы однотипные и по одному
    s = s.replace(/\s([.,:;!\)])/g, '$1'); //убираем ненужные пробелы
    //Добавляем тэги для начальной работы с текстом
    s = `<main-info></main-info>
         <span id="add-txt"></span>
         <span id="blank-txt">&nbsp&nbsp${s}</span>`;
    content = s;
  }

}

function setLocalStorage() {
  localStorage.setItem('path-lngt', file.path);
  localStorage.setItem('name-lngt', file.name);
}



////////////************ Сохранение/восстановление файла *************

modelTxt.save = () => {
  if (!file.name) return; // можно другое свойство file проверить, Boolean(file = {}) = true 
  cleareSelection();
  const content = nodeTxt.innerHTML;
  if (!content) return;
  const path =  /\.lngt$/.test(file.path) ? file.path : file.path.replace(/\.[^.]{1,5}$/,'.lngt');
  const name =  /\.lngt$/.test(file.name) ? file.name : file.name.replace(/\.[^.]{1,5}$/,'.lngt');

  ipcRenderer.send('will-save-file', {path, name, content, kind: 'lngt'});
}

  ipcRenderer.on('file-saved', (event, arg) => {
    if (arg.kind !== 'lngt') return;  // {err, path, name, kind}
    if (arg.err) {
      console.log('error in saving *.lngt:');  console.log(arg.err);
      return;
    }
    file.path = arg.path; // если было расширение .txt (или другое), то оно изменится на .lngt
    file.name = arg.name;
    setLocalStorage();
    vent.publish('savedLngt', file);
  });

modelTxt.restore = () => {
  const name = file.name || localStorage.getItem('name-lngt');
  const path = file.path || localStorage.getItem('path-lngt');
  if (!name || !path) return;
  ipcRenderer.send('will-restore-file', {name, path, kind: 'lngt'});
}

  ipcRenderer.on('file-restored', (event, arg) => {
    //arg = {name, path, content, kind, err};
    if (arg.kind !== 'lngt') return;
    if (arg.err) {
      console.log('error in restoring *.lngt:');  console.log(arg.err);
      return;
    }    
    const {name, path, content} = arg;
    modelTxt.setLoadedFile({name, path, content}); // здесь сами установятся file и localStorage
  })



/////////////************  Изменение состояния  ************************

modelTxt.setStateAdd = () => {
  if (nodeDelete) nodeDelete.removeAttribute('id');
  if (nodeTransl) nodeTransl.removeAttribute('id');
  nodeDelete = nodeTransl = null;
}

modelTxt.setStateDelete = () => {


  let _from, _to;   // from - показывает ключевое слово
  if (!nodeAdd) return;
  nodeDelete = nodeAdd.previousElementSibling;
  if(!nodeDelete || !nodeDelete.hasAttribute('from')) return;
  _from = nodeDelete.getAttribute('from');
  _to = nodeDelete.getAttribute('to');
  nodeDelete.id = 'delete-txt';
  cleareSelection();
  return { _from, _to };
}

modelTxt.setStateTransl = () => {}



//////////////************  Изменение области выделения  ************************ 
 
modelTxt.addSelection = () => {
  //if (stateTxt === 'delete interval') return;
  let current = nodeBlank.innerHTML
  let selection = nodeAdd.innerHTML
  if (!current) return;
  const s = current.match(/^.+?(\s|<br>)/)
  if (s) {
    nodeAdd.innerHTML = selection + s[0]
    nodeBlank.innerHTML = current.slice(s[0].length)
  } else {  //конец текстового файла
    nodeAdd.innerHTML = selection + current
    nodeBlank.innerHTML = ''
  }
}

modelTxt.reduceSelection = () => {
  //if (stateTxt === 'delete interval') return;
  let current = nodeBlank.innerHTML
  let selection = nodeAdd.innerHTML
  if(!selection) return;
  const s = selection.match(/.+(\s|<br>)(.+(\s|<br>)?)$/)
  if(s) {
    nodeBlank.innerHTML = s[2] + current;
    nodeAdd.innerHTML = selection.slice(0, -s[2].length);
  } else {
    nodeBlank.innerHTML = selection + current;
    nodeAdd.innerHTML = '';
  }
}

// Установка аудиоинтервала в выделеный участок
modelTxt.setUnit = ({ pozFrom, pozTo }) => {
  const selection = nodeAdd.innerHTML;
  if (selection.trim() === '') return;
  nodeAdd.innerHTML = '';
  const span = document.createElement('span');
  span.innerHTML = selection;
  span.setAttribute('from', pozFrom);
  span.setAttribute('to', pozTo);
  nodeAdd.before(span);
  return true;
}

// Выделенный участок перемещаем в оставшуюся область, выделяем предыдущий участок
modelTxt.deleteUnit = () => {
  let _from, _to;   // from - показывает ключевое слово
  let span = nodeDelete.previousElementSibling;  // возможно можно const span
  nodeDelete.removeAttribute('id');
  const txtTmp = nodeDelete.innerHTML;
  nodeBlank.innerHTML = txtTmp + nodeBlank.innerHTML;
  nodeDelete.remove();
  if (span && span.hasAttribute('from') &&  span.hasAttribute('to')) {
    _from = + span.getAttribute('from');
    _to = + span.getAttribute('to');
    span.id = 'delete-txt';
    nodeDelete = span;
  }
  return { _from, _to };
}


function cleareSelection() {
  const current = nodeBlank.innerHTML;
  const selection = nodeAdd.innerHTML;
  if(selection) {
    nodeBlank.innerHTML = selection + current;
    nodeAdd.innerHTML = '';
  }
}

function getStartPoz() {
  let poz = 0;
  const span = nodeAdd.previousElementSibling;
  if (span && span.hasAttribute('to')) poz = + span.getAttribute('to');
  return poz;
}

export default modelTxt;
