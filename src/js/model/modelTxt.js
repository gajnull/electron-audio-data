import vent from './vent';
const {ipcRenderer} = window.require('electron');

const modelTxt = {};

//const subfolder = 'target';
let file = {};       // {name, path}
                      // path: fullPath + name
let nodeTxt = null,   // весь элемент
    nodeBlank = null,
    nodeSelection = null, nodeDelete = null, nodeTransl = null



////////////************ установка  ************

modelTxt.setRoot = (root) => {
  nodeTxt = root;
};

modelTxt.setLoadedFile = ({name, path, content}) => {
  file = {name, path};
  let str = txtToLngt(content);
  initNodes(str);

  vent.publish('loadedFile', {type: 'lngt', name: file.name, path: file.path, startPoz: getStartPoz()});

  function txtToLngt(content) {
    if (!/\.txt$/.test(file.name)) return content;
    file.name = (file.name).replace(/\.txt$/,'._lngt');
    file.path = (file.path).replace(/\.txt$/,'._lngt');
    let s = content;
    //Нормализуем - убираем из текста возможные тэги
    s = s.replace(/</g, '(').replace(/>/g, ')');
    //Заменяем абзацы и упорядочиваем пробелы
    s = s.replace(/\n/g, '<br>').replace(/\s*<br>\s*/g,'<br>&nbsp;&nbsp;'). //для отступа
          replace(/\s+/g, ' '). //все пробелы однотипные и по одному
          replace(/\s([.,:;!\)])/g, '$1'); //убираем ненужные пробелы
    //Добавляем тэги для начальной работы с текстом
    s = `<main-info></main-info>
         <span id="selection-txt"></span>
         <span id="blank-txt">&nbsp;&nbsp;${s}</span>`;
    return s;
  }

}

function initNodes(str) {
  nodeTxt.innerHTML = str;
  nodeSelection = nodeTxt.querySelector('#selection-txt');  // метод getElementById есть только у document
  nodeBlank = nodeTxt.querySelector('#blank-txt');
}


/////////////************  Изменение состояния  ************************

modelTxt.setState = (state, countUnits) => {
  if (!file.name) return {_from: '0', _to: '0'};
  clearNodeSelection();
  clearNodeDelete();
  clearNodeTranl();
  if (state === 'add') return setNodeSelection();
  if (state === 'delete') return setNodeDelete();
  if (state === 'transl') return setNodeTransl(countUnits);
}

function clearNodeSelection() {
  const selection = nodeSelection.innerHTML;
  if(selection) {
    nodeBlank.innerHTML = selection + nodeBlank.innerHTML;
    nodeSelection.innerHTML = '';
  }
}

function clearNodeDelete() {
  if (nodeDelete) nodeDelete.removeAttribute('id');
  nodeDelete = null;
}

function clearNodeTranl() {
  if (nodeTransl) nodeTransl.removeAttribute('id');
  nodeTransl = null;
}

function setNodeSelection() {
  let _from = '0',
      _to = '0';
  const lastNode = nodeSelection.previousElementSibling;
  if(lastNode && lastNode.hasAttribute('to')) {
    _from = _to = lastNode.getAttribute('to');
  }
  return {_from, _to};
}

function setNodeDelete() {
  const pozz = {_from: '0', _to: '0'};
  if (!nodeSelection) return pozz;
  nodeDelete = nodeSelection.previousElementSibling;  // не лучший вариант поиска
  if (!nodeDelete || !nodeDelete.hasAttribute('from')) return pozz;
  nodeDelete.id = 'delete-txt';
  pozz._from = nodeDelete.getAttribute('from');
  pozz._to = nodeDelete.getAttribute('to');
  return pozz;
}

function setNodeTransl(countUnits) {
  const nodes = nodeTxt.querySelectorAll('span[from]');
  if (nodes && nodes[countUnits]) {
    nodeTransl = nodes[countUnits]; // следующий кусок, т.к. index = length - 1
    nodeTransl.id = 'transl-txt';
  }
  return {_from: '0', _to: '0'};
}


////////////************ Сохранение/восстановление файла *************

modelTxt.save = () => {
  if (!file.name) return; // можно другое свойство file проверить, Boolean(file = {}) = true
  clearNodeSelection();
  clearNodeDelete();
  clearNodeTranl();
  const content = nodeTxt.innerHTML;
  if (!content) return;
  ipcRenderer.send('will-save-file', {path: file.path, content, kind: '_lngt'});
}

modelTxt.make = () => {
  modelTxt.save();
  if (!nodeTxt) return;
  const nodes = nodeTxt.querySelectorAll('span[from]');
  if (nodes.length === 0) return; 
  let arr = [];
  nodes.forEach(node => {
    arr.push({
      txt: (node.innerHTML).replace(/<br>/g, '\n').replace(/&nbsp;/g, ' '),
      from: node.getAttribute('from'),
      to: node.getAttribute('to')
    });
  });
  const content = JSON.stringify(arr);
  const path = (file.path).replace(/\._lngt$/, '.lngt');
  ipcRenderer.send('will-save-file', {path, content, kind: 'lngt'});
};

  ipcRenderer.on('file-saved', (event, arg) => {
    // {err, path, kind}
    if (arg.err) {
      console.log('error in saving *._lngt:');  console.log(arg.err);
      return;
    }
    if (arg.kind === '_lngt') {
      setLocalStorage();
      vent.publish('savedLngt', file);
    }
    if (arg.kind === 'lngt') {
      const rest = (nodeBlank.innerHTML).replace(/(\s|<br>|&nbsp;)/g, '');
      let msg = '<p> Сформирован окончательный файл:<br>' + arg.path + '</p>';
      if (rest !== '') msg = msg +'<p> Остался неопределённый фрагмент: ' +
                                  (nodeBlank.innerHTML).slice(0, 100) + '...</p>';
      vent.publish('popup', {msg, duration: 4000});
    }
  });

  function setLocalStorage() {
    localStorage.setItem('path-lngt', file.path);
    localStorage.setItem('name-lngt', file.name);
  }

modelTxt.restore = () => {
  const name = localStorage.getItem('name-lngt');
  const path = localStorage.getItem('path-lngt');
  if (!name || !path) return;
  if (!/\._lngt$/.test(name) ||        // это не должно случиться
      !/\._lngt$/.test(path)) return;  // для случая, если при сохранении произошла ошибка

  ipcRenderer.send('will-restore-file', {name, path, kind: '_lngt'});
}

  ipcRenderer.on('file-restored', (event, arg) => {
    //arg = {name, path, content, kind, err};
    if (arg.kind !== '_lngt') return;
    if (arg.err) {
      vent.publish('popup', '<p> ошибка при восстановлении <p>');
      console.log('error in restoring *._lngt:');  console.log(arg.err);
      return;
    }
    const {name, path, content} = arg;
    modelTxt.setLoadedFile({name, path, content}); // здесь сами установится file
  })




//////////////************  Изменение области выделения  ************************

modelTxt.addSelection = () => {
  //if (stateTxt === 'delete interval') return;
  let current = nodeBlank.innerHTML
  let selection = nodeSelection.innerHTML
  if (!current) return;
  const s = current.match(/^.+?(\s|<br>)/)
  if (s) {
    nodeSelection.innerHTML = selection + s[0]
    nodeBlank.innerHTML = current.slice(s[0].length)
  } else {  //конец текстового файла
    nodeSelection.innerHTML = selection + current
    nodeBlank.innerHTML = ''
  }
}

modelTxt.reduceSelection = () => {
  //if (stateTxt === 'delete interval') return;
  let current = nodeBlank.innerHTML
  let selection = nodeSelection.innerHTML
  if(!selection) return;
  const s = selection.match(/.+(\s|<br>)(.+(\s|<br>)?)$/)
  if(s) {
    nodeBlank.innerHTML = s[2] + current;
    nodeSelection.innerHTML = selection.slice(0, -s[2].length);
  } else {
    nodeBlank.innerHTML = selection + current;
    nodeSelection.innerHTML = '';
  }
}

modelTxt.setSelectionTransl = (countUnits) => {
  if (!file.name) return;
  clearNodeTranl();
  setNodeTransl(countUnits);
}

// Установка аудиоинтервала в выделеный участок
modelTxt.setUnit = ({ pozFrom, pozTo }) => {
  const selection = nodeSelection.innerHTML;
  if (selection.trim() === '') return;
  nodeSelection.innerHTML = '';
  const span = document.createElement('span');
  span.innerHTML = selection;
  span.setAttribute('from', pozFrom);
  span.setAttribute('to', pozTo);
  nodeSelection.before(span);
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

modelTxt.getSelTransl = () => {
  return (nodeTransl) ? nodeTransl.innerHTML : null;
}


function getStartPoz() {
  let poz = 0;
  const span = nodeSelection.previousElementSibling;
  if (span && span.hasAttribute('to')) poz = + span.getAttribute('to');
  return poz;
};




export default modelTxt;
