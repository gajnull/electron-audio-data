//управление сохранением и восстановлением текстового файла .lngt
import model from './model/model';

const fileEnd = {};

let btnSave, btnRestore,
    btnsState, btnCurrentState;

fileEnd.init = function() {
  btnSave = document.querySelector('#btns-files-state .btns-file button[act="save"]');
  btnRestore = document.querySelector('#btns-files-state .btns-file button[act="restore"]');

  btnsState = document.getElementById('btns-state');
  btnCurrentState = btnsState.querySelector('.current');

  btnSave.addEventListener('click', model.save);
  btnRestore.addEventListener('click',  model.restore);
  btnsState.addEventListener('click', setState);
  model.on('changeState', changeState);
}

fileEnd.close = function() {
  btnSave.removeEventListener('click', model.save);
  btnRestore.removeEventListener('click', model.restore);
  btnsState.removeEventListener('click', setState);
  model.off('changeState', changeState);
  btnSave = btnRestore = btnsState = btnCurrent = null;
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

export default fileEnd;
