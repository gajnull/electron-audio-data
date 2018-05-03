import Vent from './Vent'
const {ipcRenderer} = window.require('electron')

const modelTxt = {};

let vent;

const subfolder = 'target';
let file = {};       // {name, path, size, content}
                      // path: fullPath + name
let nodeTxt = null;
let nodeCurrent = null;
let nodeSelection = null;
let nodeLast = null;
let stateEdit = 'add interval';  // 'delete interval'


modelTxt.setVent = (_vent) => {
  vent = _vent;
}

// установка
modelTxt.setRoot = (root) => {
  nodeTxt = root
}

modelTxt.setLoadedFile = ({name, path, size, content}) => {
  nodeTxt.innerHTML = content
  nodeSelection = nodeTxt.querySelector('#selection-txt')  // метод getElementById есть только у document
  nodeCurrent = nodeTxt.querySelector('#current-txt');
  let poz = 0;
  const span = nodeSelection.previousElementSibling;
  if (span && span.hasAttribute('to')) poz = +span.getAttribute('to');
  file = {name, path, size, poz};
  localStorage.setItem('path-lngt', path);
  localStorage.setItem('name-lngt', name);
  vent.publish('loadedLngt' , file); //почему-то this здесь не работает ??????
}

// Сохранение файла
modelTxt.save = (nameLngt) => {
  if (!nodeTxt || !file) return;
  let content = nodeTxt.innerHTML
  if (!content) return;
  if (stateEdit === 'delete interval') modelTxt.toogleState();

  cleareSelection()
  content = nodeTxt.innerHTML
  const name = nameLngt + '.lngt'
  const path = subfolder + '/' + name
  const lngt = {name,  path, content}
  file.temp = {name, path}
  ipcRenderer.send('will-save-file', lngt)
}

  ipcRenderer.on('file-saved', (event, arg) => {
    const {name, path} = file.temp
    if (arg) {
      console.log('error in saving:')  // in arg i send err
      console.log(arg)
      return;
    }
    localStorage.setItem('name-lngt', name) //если сохранили, запоминаем имя
    localStorage.setItem('path-lngt', path)
    vent.publish('savedLngt', {name, path})
  });

// Восстановление файла
modelTxt.restore = () => {
  const name = localStorage.getItem('name-lngt')
  const path = localStorage.getItem('path-lngt')
  if (!name || !path) return;
  file.temp = {name, path}
  ipcRenderer.send('will-restore-file', {path});
}

  ipcRenderer.on('file-restored', (event, arg) => {
    const {name, path} = file.temp
    modelTxt.setLoadedFile({name, path, content: arg, size: file.size})
  })

// Изменение области выделения
modelTxt.addSelection = () => {
  if (stateEdit === 'delete interval') return;
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

modelTxt.reduceSelection = () => {
  if (stateEdit === 'delete interval') return;
  let current = nodeCurrent.innerHTML
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

// Установка аудиоинтервала в выделеный участок
modelTxt.addInterval = ({ pozFrom, pozTo }) => {
  if (!pozFrom || !pozTo) return false;
  //if (stateEdit === 'delete interval') return; этого не должно быть
  const selection = nodeSelection.innerHTML;
  if (selection.trim() === '') return false;
  nodeSelection.innerHTML = '';
  const span = document.createElement('span');
  span.innerHTML = selection;
  span.setAttribute('from', pozFrom);
  span.setAttribute('to', pozTo);
  nodeSelection.before(span);
  return true;
}

// изменение состояния
modelTxt.toogleState = () => {
  let _from, _to;   // from - показывает ключевое слово
  if (stateEdit === 'delete interval') {
    nodeLast.removeAttribute('id');
    nodeLast = null;
    stateEdit = 'add interval';
  } else {
    if (!nodeSelection) return;
    nodeLast = nodeSelection.previousElementSibling;
    if(!nodeLast || !nodeLast.hasAttribute('from')) return;
    _from = nodeLast.getAttribute('from');
    _to = nodeLast.getAttribute('to');
    nodeLast.id = 'last-txt';
    cleareSelection();
    stateEdit = 'delete interval';
  }
  vent.publish('changeStateEdit', {stateEdit, _from, _to});
}

function cleareSelection() {
  const current = nodeCurrent.innerHTML;
  const selection = nodeSelection.innerHTML;
  if(selection) {
    nodeCurrent.innerHTML = selection + current;
    nodeSelection.innerHTML = '';
  }
}



export default modelTxt;
