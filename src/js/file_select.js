/****************************************************************
  во внешнем модуле используется 
*****************************************************************/
import fileInput from './file_input';
import model from './model/model';

const init = () => {
  fileInput.init();
  document.getElementById('files').addEventListener('click', selectFile);
  model.on('loadedFile', setInfoLodedFile);
};

const close = () => {
  fileInputs.close();
  document.getElementById('files').removeEventListener('click', selectFile);
  model.off('loadedFile', setInfoLodedFile);
};

function selectFile(ev) {
  const el = ev.target;
  if (!el.hasAttribute('type-file')) return;
  const typeFile = el.getAttribute('type-file');
  fileInput.selectFile(typeFile, el);
}

function setInfoLodedFile({type, name, path}) {
  const el = document.querySelector('#files [type-file="' + type + '"]');
  el.innerHTML = name;
  el.setAttribute('title', path);
}

const fileSelect = {
  init,
  close
};

export default fileSelect;

