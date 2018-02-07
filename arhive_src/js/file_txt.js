/****************************************************************
  Компонент для загрузки текстового файла.
  во внешнем модуле используется fileTxt.init(model) и
   fileTxt.close(model)
  генерирует событие получения контента текстового файл
*****************************************************************/

const fileTxt = {}

let model,
    btn,
    input,
    path,
    progress

fileTxt.init = function(modelTxt) {
  model = modelTxt
  btn = document.getElementById('btn-files-txt')
  input = document.getElementById('input-txt')
  path = document.querySelector('#field-files-txt span')
  progress = document.querySelector('#field-files-txt .progress')

  btn.addEventListener('click', clickInput)
  input.addEventListener('change', choosedFile)
}

fileTxt.close = function() {
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
  reader.readAsText(file)

  reader.onloadstart = startProgress
  reader.onprogress = updateProgress
  reader.onload = loaded
  reader.onerror = errorHandler

  function startProgress(ev) {
    progress.style.display = 'block'
    setWidthProgress(0)
  }

  function updateProgress(ev) {
    if (ev.lengthComputable) {
      var loaded = (ev.loaded / ev.total)
      if (loaded < 1) {
        setWidthProgress(loaded)
      }
    } else {
      // тогда будет анимация загрузки средствами css
    }
  }

  function loaded(ev) {
    let content = ev.target.result
    if (/\.txt$/.test(model.file.name)) {
      content = model.txtToLngt(content)
    }
    setWidthProgress(0)
    progress.style.display = 'none'
    model.publish('loadedLngt', content)
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    model.publish('setPoz', model.getPoz)
  }

  function errorHandler(ev) {
    if(ev.target.error.name == "NotReadableError") {
      path.innerHTML = 'Выберите другой звуковой файл'
      setWidthProgress(0)
      progress.style.display = 'none'
    }
  }

}


function setWidthProgress(value) {
  const width = 20 + value * 70
  progress.style.width = width + '%'
}


export default fileTxt
