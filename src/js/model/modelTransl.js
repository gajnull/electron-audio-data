import vent from './vent';
const {ipcRenderer} = window.require('electron');


const subfolder = 'target';
let file = {};       // {name, path, size}
                      // path: fullPath + name
let nodeTransl = null,   // весь элемент
    nodeBlank = null,
    nodeSelection = null  // выделяется из nodeBlank



// установка
const setRoot = (root) => {
  nodeTransl = root;
};

const setLoadedFile = ({name, path, content}) => {
  let s = content;
  s = txtToTransl(s);
  initNodes(s);

  file = {name, path };
  vent.publish('loadedTransl', file);

  function txtToTransl(_s) {
    if (/\._transl$/.test(name)) return _s;
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
         <span id="blank-transl">&nbsp&nbsp${s}</span>`;
    return s;
  }

}

function initNodes(str) {
  nodeTransl.innerHTML = str;
  nodeSelection = nodeTransl.querySelector('#selection-transl');  // метод getElementById есть только у document
  nodeBlank = nodeTransl.querySelector('#blank-transl');

  /*
  if (!nodeBlank) {
    nodeBlank = document.createElement('span');
    nodeBlank.id = 'blank-transl';
    nodeTransl.appendChild(nodeBlank);
  }
  if (!nodeSelection) {
    nodeSelection = document.createElement('span');
    nodeSelection.id = 'selection-transl';
    nodeBlank.before(nodeSelection);
  }*/

}

function setLocalStorage() {
  localStorage.setItem('path-transl', file.path);
  localStorage.setItem('name-transl', file.name);
}

const setState = (state) => {
  if (!nodeSelection) return -1;
  clearNodeSelection();
  return getCountUnits();
};

function clearNodeSelection() {
  const selection = nodeSelection.innerHTML;
  if(selection) {
    nodeBlank.innerHTML = selection + nodeBlank.innerHTML;
    nodeSelection.innerHTML = '';
  }
}

/*
function deleteNodesSelectionBlank() {
  if (!nodeBlank) return;
  const str = (nodeBlank.innerHTML).replace(/\s|<br>|&nbsp;/g,'');
  if (str === '') {
    nodeBlank.remove();
    if (nodeSelection) nodeSelection.remove();
  }
}
*/


function getCountUnits() { // количество уже назначеннх кусков
  const nodes = nodeTransl.querySelectorAll('span[transl="true"]');
  return (nodes) ? nodes.length : 0;  // возможно проверка не нужна
}


// Сохранение файла
const save = () => {
  if (!file.name) return;
  clearNodeSelection();
  const content = nodeTransl.innerHTML;
  if (!content) return;
  const path =  /\._transl$/.test(file.path) ? file.path : file.path.replace(/\.[^.]{1,5}$/,'._transl');
  const name =  /\._transl$/.test(file.name) ? file.name : file.name.replace(/\.[^.]{1,5}$/,'._transl');

  ipcRenderer.send('will-save-file', {path, name, content, kind: 'transl'});
}

const make = () => {
  ////
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
  const name = localStorage.getItem('name-transl');
  const path =localStorage.getItem('path-transl');
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


const offer = (txt) => {
  const total = txt.split(/[.,!?]|<br>/).length;
  let count = 0;
  clearNodeSelection();
  do {
    addSelection();
    count = (nodeSelection.innerHTML).split(/[.,!?]|<br>/).length;
  } while (count < total && nodeBlank.innerHTML !== '')
}


// Изменение области выделения
const addSelection = () => {
  let blank = nodeBlank.innerHTML;
  if (!blank) return;
  const s = blank.match(/^.+?(\s|<br>)/);
  if (s) {
    nodeSelection.innerHTML = nodeSelection.innerHTML + s[0];
    nodeBlank.innerHTML = blank.slice(s[0].length);
  } else {  //конец текстового файла
    nodeSelection.innerHTML = nodeSelection.innerHTML + blank;
    nodeBlank.innerHTML = '';
  }
};

const reduceSelection = () => {
  let selection = nodeSelection.innerHTML;
  if (!selection) return;
  const s = selection.match(/.+(\s|<br>)(.+(\s|<br>)?)$/);  // ленивого квантификатора здесь не нужно
  if(s) {
    nodeBlank.innerHTML = s[2] + nodeBlank.innerHTML;
    nodeSelection.innerHTML = selection.slice(0, -s[2].length);
  } else {
    nodeBlank.innerHTML = selection + nodeBlank.innerHTML;
    nodeSelection.innerHTML = '';
  }
};

const setUnit = () => { // если вернёт -1, то порция перевода не установлена, либо число установленных отрезков
  let selection = nodeSelection.innerHTML;
  if (!selection) return -1;
  nodeSelection.removeAttribute('id');
  nodeSelection.setAttribute('transl', 'true');
  nodeSelection = document.createElement('span');
  nodeSelection.id = 'selection-transl';
  nodeBlank.before(nodeSelection);
  return getCountUnits();
};


const modelTransl = {
  setRoot,
  setLoadedFile,
  setState,
  offer,
  addSelection,
  reduceSelection,
  setUnit,
  save,
  make,
  restore
};

export default modelTransl;
