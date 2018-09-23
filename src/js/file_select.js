/****************************************************************
  во внешнем модуле используется fileAudio.init() и
  fileAudio.close()
*****************************************************************/
import fileInput from './file_input';


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
  const el = document.querySelector('#files [type-file="' & type & '"]');
  el.innerHTML = name;
  el.setAttribute('title', path);
}





fileAudio.init = function() {
  btn = document.getElementById('file-audio');
  //input = document.getElementById('input-audio');

  btn.addEventListener('click', selectFile);
  //input.addEventListener('change', choosedFile);
  model.on('decodedAudio', setInfoLodedAudio);
}

fileAudio.close = function() {
  btn.removeEventListener('click', selectFile);
  //input.removeEventListener('change', choosedFile);
  model.off('decodedAudio', setInfoLodedAudio);
}

/*
function clickInput() {
  input.click();
}

function choosedFile() {
  if (input.files.length === 0) return; //здесь ";" обязательно
  const file = input.files[0];
  input.value = '';  // единственный способ чтобы заново открыть тотже файл
  const path = file.path;
  const name = file.name;

  btn.innerHTML = 'loding...';

  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  //reader.onloadstart = startProgress
  //reader.onprogress = updateProgress
  reader.onload = loaded;
  reader.onerror = errorHandler;

  function loaded(ev) {
    const content = ev.target.result;
    model.setLoadedAudioFile({name, path, content});
  }

  function errorHandler(ev) {
    if(ev.target.error.name == "NotReadableError") {
      btn.innerHTML = 'Выберите другой звуковой файл';
    }
  }

}
*/

function setInfoLodedAudio({name, path}) {
  btn.innerHTML = name;
  btn.setAttribute('title', path);
}

export default fileAudio;
