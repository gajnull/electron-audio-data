/****************************************************************
  во внешнем модуле используется fileAudio.init(model) и
  fileAudio.close(model)

*****************************************************************/

const fileAudio = {}
// const file = {
//   buffer: null,
//   name: '',
//   duration: 0,
//   size: null,  //if !computable then will be null
//   path: ''  //with name
// }
let model,
    btn,
    input,
    path,
    progress

fileAudio.init = function(modelAudio) {
  model = modelAudio
  btn = document.getElementById('btn-files-audio')
  input = document.getElementById('input-audio')
  path = document.querySelector('#field-files-audio span')
  progress = document.querySelector('#field-files-audio .progress')

  btn.addEventListener('click', clickInput)
  input.addEventListener('change', choosedFile)
}

fileAudio.close = function() {
  btn.removeEventListener('click', clickInput)
  input.removeEventListener('change', chooseFile)
}

function clickInput() {
  input.click()
}

function choosedFile() {
  if (input.files.length === 0) return; //здесь ";" обязательно
  const file = input.files[0]
  model.file.name = file.name
  model.file.path = file.path
  model.file.size = file.size
  path.innerHTML = file.path

  const reader = new FileReader()
  reader.readAsArrayBuffer(file);

  reader.onloadstart = startProgress
  reader.onprogress = updateProgress
  reader.onload = loaded
  reader.onerror = errorHandler
}

function startProgress(ev) {
  progress.style.display = 'block'
  setWidthProgress(0)
}

function updateProgress(ev) {
  //console.log(ev.loaded)
  if (ev.lengthComputable) {
    var loaded = (ev.loaded / ev.total)
    if (loaded < 1) {
      setWidthProgress(loaded)  //остальную половину будет декодироваться аудио
    }
  } else {
    // тогда будет анимация загрузки средствами css
  }
}

function loaded(ev) {
  setWidthProgress(0)
  progress.style.display = 'none'
  //start animation of decoding
  model.decode(ev.target.result, function(duration) {
    //end animation
    model.duration = duration
    model.pozMax = duration
    model.publish('decodedAudio')
  })
}

function errorHandler(ev) {
  if(ev.target.error.name == "NotReadableError") {
    path.innerHTML = 'Выберите другой звуковой файл'
    //vent.publish('loadLngt', 'err')
  }
}

function setWidthProgress(value) {
  const width = 20 + value * 70
  progress.style.width = width + '%'
}

export default fileAudio
