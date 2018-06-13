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
  model.on('decodedAudio', decodedAudio);
}

fileAudio.close = function() {
  btn.removeEventListener('click', clickInput);
  input.removeEventListener('change', chooseFile);
  model.off('decodedAudio', decodedAudio);
}

function clickInput() {
  input.click();
}

function choosedFile() {
  if (input.files.length === 0) return; //здесь ";" обязательно
  const file = input.files[0];
  //const path = file.path;
  //const name = file.name;

  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
/*
  reader.onloadstart = startProgress
  reader.onprogress = updateProgress
  */
  reader.onload = loaded;
  reader.onerror = errorHandler;

/*
  function updateProgress(ev) {
    if (ev.lengthComputable) {
      var loaded = (ev.loaded / ev.total)
      if (loaded < 1) {
        setWidthProgress(loaded)  //остальную половину будет декодироваться аудио
      }
    } else {
      // тогда будет анимация загрузки средствами css
    }
  }
*/

  function loaded(ev) {
    //setWidthProgress(0)
    model.decode({name: file.name, path: file.path,
                 size: file.size, content: ev.target.result});
  }

  function errorHandler(ev) {
    if(ev.target.error.name == "NotReadableError") {
      path.innerHTML = 'Выберите другой звуковой файл';
    }
  }

}

function decodedAudio(name, path) {
  btn.innerHTML = name;
  btn.setAttribute('title', path);
}

export default fileAudio;
