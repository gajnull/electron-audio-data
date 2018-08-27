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

const setLoadedFile = ({name, path, size, content}) => {
  txtToTransl();
  nodeTransl.innerHTML = content;
  nodeSelection = nodeTransl.querySelector('#selection-txt');  // метод getElementById есть только у document
  nodeCurrent = nodeTransl.querySelector('#current-txt');

  file = {name, path, size /*, startPoz: getStartPoz()*/ };
  vent.publish('loadedTransl', file);
  localStorage.setItem('path-transl', path);
  localStorage.setItem('name-transl', name);

  function txtToTransl() {
    if (!/\.txt$/.test(name)) return;

    let s = content;
    //Нормализуем - убираем из текста возможные тэги
    s = s.replace(/</g, '(').replace(/>/g, ')');
    //Заменяем абзацы и упорядочиваем пробелы
    s = s.replace(/\n/g, '<br>');
    s = s.replace(/\s*<br>\s*/g,'<br>&nbsp&nbsp'); //для отступа
    s = s.replace(/\s+/g, ' '); //все пробелы однотипные и по одному
    s = s.replace(/\s([.,:;!\)])/g, '$1'); //убираем ненужные пробелы
    //Добавляем тэги для начальной работы с текстом
    s = `<main-info audio-file=""></main-info>
         <span id="selection-txt"></span>
         <span id="current-txt">&nbsp&nbsp${s}</span>`;
    content = s;
  }

}
/*
// Сохранение файла
modelTransl.save = (nameLngt) => {
  if (!nodeTransl || !file) return;
  let content = nodeTransl.innerHTML;
  if (!content) return;

  cleareSelection();
  content = nodeTransl.innerHTML;
  const name = nameLngt + '.lngt';
  const path = subfolder + '/' + name;
  const lngt = {name,  path, content};
  file.temp = {name, path};
  ipcRenderer.send('will-save-file', lngt);
}

  ipcRenderer.on('file-saved', (event, arg) => {
    const {name, path} = file.temp;
    file.temp = null;
    if (arg) {
      console.log('error in saving:');  // in arg i send err
      console.log(arg);
      return;
    }
    localStorage.setItem('name-lngt', name); //если сохранили, запоминаем имя
    localStorage.setItem('path-lngt', path);
    vent.publish('savedLngt', {name, path});
  });


// Восстановление файла
modelTransl.restore = () => {
  const name = localStorage.getItem('name-lngt');
  const path = localStorage.getItem('path-lngt');
  if (!name || !path) return;
  file.temp = {name, path};
  ipcRenderer.send('will-restore-file', {path});
}

  ipcRenderer.on('file-restored', (event, arg) => {
    const {name, path} = file.temp;
    file = {name, path, content: arg, size: file.size};
    modelTransl.setLoadedFile(file);
  })


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

modelTransl.gotoToAdd = () => {
  if (nodeLast) nodeLast.removeAttribute('id');
  nodeLast = null;
}

modelTransl.gotoToDelete = () => {
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
  setLoadedFile  
};

export default modelTransl;
