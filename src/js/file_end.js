//управление сохранением и восстановлением текстового файла .lngt
import model from './model/model';

const fileEnd = {};

let /*btnSave, btnRestore,*/ btnsFiles,
    btnsState, btnCurrentState;

fileEnd.init = function() {
  //btnSave = document.querySelector('#btns-files-state .btns-file button[act="save"]');
  //btnRestore = document.querySelector('#btns-files-state .btns-file button[act="restore"]');
  btnsFiles = document.querySelector('#btns-files-state .btns-file');

  btnsState = document.getElementById('btns-state');
  btnCurrentState = btnsState.querySelector('.current');

  //btnSave.addEventListener('click', model.save);
  //btnRestore.addEventListener('click',  model.restore);
  btnsFiles.addEventListener('click', handlerFiles);
  btnsState.addEventListener('click', setState);
  model.on('changeState', changeState);
}

fileEnd.close = function() {
  //btnSave.removeEventListener('click', model.save);
  //btnRestore.removeEventListener('click', model.restore);
  btnsFiles.removeEventListener('click', handlerFiles);
  btnsState.removeEventListener('click', setState);
  model.off('changeState', changeState);
  btnSave = /*btnRestore = btnsState*/ btnsFiles = btnCurrent = null;
}

//function saveFiles() {model.save();}function restoreFiles() {model.restore();}

function setState(ev) {
  const state = ev.target.getAttribute('state');
  if (state) model.setState(state);
}

function changeState({ state }) {
  btnCurrentState.classList.remove('current');

  btnCurrentState = btnsState.querySelector('[state=' + state + ']')
  btnCurrentState.classList.add('current');  
}

function handlerFiles(ev) {
  const act = ev.target.getAttribute('act');
  if (act) model[act]();
}


export default fileEnd;
