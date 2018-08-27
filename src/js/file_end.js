//управление сохранением и восстановлением текстового файла .lngt
import model from './model/model';

const fileEnd = {};

let btnSave, btnRestore,
    btnsState, btnCurrent;

fileEnd.init = function() {
  btnSave = document.querySelector('#btns-files-state .btns-file button[act="save"]');
  btnRestore = document.querySelector('#btns-files-state .btns-file button[act="restore"]');

  btnsState = document.getElementById('btns-state');
  btnCurrent = btnsState.querySelector('.current');
  //btnStateAdd = btnsState.querySelector('[state="add"]');
  //btnStateDelete = btnsState.querySelector('[state="delete"]');
 // btnStateTransl = btnsState.querySelector('[state="transl"]');

  btnSave.addEventListener('click', saveFiles);
  btnRestore.addEventListener('click', restoreFiles);
  btnsState.addEventListener('click', setState);
  model.on('changeState', changeState);
}

fileEnd.close = function() {
  btnSave.removeEventListener('click', saveFiles);
  btnRestore.removeEventListener('click', restoreFiles);
  btnsState.removeEventListener('click', setState);
  model.off('changeState', changeState);
  btnSave = btnRestore = btnsState = btnCurrent = null;
}

function saveFiles() {
  model.save();
}

function restoreFiles() {
  model.restore();
}

function setState(ev) {
  const state = ev.target.getAttribute('state');
  if (state) model.setState(state);
}

function changeState({ state }) {
  btnCurrent.classList.remove('current');

  btnCurrent = btnsState.querySelector('[state=' + state + ']')
  btnCurrent.classList.add('current');  
}

export default fileEnd;
