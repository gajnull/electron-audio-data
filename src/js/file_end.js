//управление сохранением и восстановлением текстового файла .lngt
import model from './model/model';

const fileEnd = {};

let nameEnd,
    btnSave, btnRestore,
    btnsState, btnStateAdd, btnStateDelete, btnStateTransl;

fileEnd.init = function() {
  nameEnd = document.getElementById('name-lngt');
  btnSave = document.querySelector('#file-end button[act=save]');
  btnRestore = document.querySelector('#file-end button[act=restore]');

  btnsState = document.getElementById('btns-state');
  btnStateAdd = btnsState.querySelector('[state="add"]');
  btnStateDelete = btnsState.querySelector('[state="delete"]');
  btnStateTransl = btnsState.querySelector('[state="transl"]');

  btnSave.addEventListener('click', saveFile);
  btnRestore.addEventListener('click', restoreFile);
  btnsState.addEventListener('click', setState);
  model.on('loadedLngt', writeName);
  model.on('changeState', changeState);
}

fileEnd.close = function() {
  btnSave.removeEventListener('click', saveFile);
  btnRestore.removeEventListener('click', restoreFile);
  btnsState.removeEventListener('click', setState);
  model.off('loadedLngt', writeName);
  model.off('changeState', changeState);
}

function saveFile() {
  let name = nameEnd.value;
  if (!name) nameEnd.value = name = 'noName';
  model.fnTxt('save', name);
}

function restoreFile() {
  model.fnTxt('restore');
}

function writeName({ name }) {
  const res = name.match(/^(.+)\.\w{2,6}$/i); // {2,6} - перестраховались
  if (res) nameEnd.value = res[1];
}

function setState(ev) {
  const state = ev.target.getAttribute('state');
  if (state) model.setState(state);
}

function changeState({ state }) {
  btnStateAdd.style.display = (state === 'add') ? 'none' : 'inline-block';
  btnStateDelete.style.display = (state === 'delete') ? 'none' : 'inline-block';
  btnStateTransl.style.display = (state === 'transl') ? 'none' : 'inline-block';
}

export default fileEnd;
