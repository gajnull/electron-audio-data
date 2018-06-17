/****************************************************************
  во внешнем модуле используется fileAudio.init() и
  fileAudio.close()
*****************************************************************/
import model from './model/model';

const fileAudio = {};

let btn, input;

fileAudio.init = function() {
  btn = document.getElementById('file-audio');
  input = document.getElementById('input-audio');

  btn.addEventListener('click', clickInput);
  input.addEventListener('change', choosedFile);
  model.on('decodedAudio', setInfoLodedAudio);
}

fileAudio.close = function() {
  btn.removeEventListener('click', clickInput);
  input.removeEventListener('change', chooseFile);
  model.off('decodedAudio', setInfoLodedAudio);
}

function clickInput() {
  input.click();
}

function choosedFile() {
  if (input.files.length === 0) return; //здесь ";" обязательно
  const file = input.files[0];
  const path = file.path;
  const name = file.name;
  const size = file.size;

  btn.innerHTML = 'loding...';

  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  //reader.onloadstart = startProgress
  //reader.onprogress = updateProgress
  reader.onload = loaded;
  reader.onerror = errorHandler;

  function loaded(ev) {
    const content = ev.target.result;
    model.setLoadedAudioFile({name, path, size, content});
  }

  function errorHandler(ev) {
    if(ev.target.error.name == "NotReadableError") {
      btn.innerHTML = 'Выберите другой звуковой файл';
    }
  }

}

function setInfoLodedAudio({name, path}) {
  btn.innerHTML = name;
  btn.setAttribute('title', path);
}

export default fileAudio;
