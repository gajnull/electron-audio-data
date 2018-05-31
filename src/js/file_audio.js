/****************************************************************
  во внешнем модуле используется fileAudio.init(model) и
  fileAudio.close(model)
*****************************************************************/
import model from './model/model';
const fileAudio = {};

let btn, input;

fileAudio.init = function() {
  btn = document.getElementById('file-audio');
  input = document.getElementById('input-audio');

  btn.addEventListener('click', clickInput);
  input.addEventListener('change', choosedFile);
}

fileAudio.close = function() {
  btn.removeEventListener('click', clickInput);
  input.removeEventListener('change', chooseFile);
}

function clickInput() {
  input.click();
}

function choosedFile() {
  if (input.files.length === 0) return; //здесь ";" обязательно
  const file = input.files[0];
  const path = file.path;
  const name = file.name;

  btn.innerHTML = file.name;
  btn.setAttribute('title', path);

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
    model.file = {name, path, size: file.size};
    model.decode(ev.target.result);
/*    model.decode(ev.target.result, function(duration) {
      model.file = {name, path, size: file.size}
      model.duration = duration
      model.publish('decodedAudio')
    })
*/
  }

  function errorHandler(ev) {
    if(ev.target.error.name == "NotReadableError") {
      path.innerHTML = 'Выберите другой звуковой файл';
    }
  }

}

function handleDecodedAudio(data) {}  // пока не используется (ф-ция подписчмк на декодирование)

export default fileAudio;
