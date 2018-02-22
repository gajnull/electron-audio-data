/****************************************************************
  Компонент для загрузки текстового файла.
  во внешнем модуле используется fileTxt.init(model) и
   fileTxt.close()
  генерирует событие получения контента текстового файл
*****************************************************************/

const fileTxt = {}

let model,
    btn,
    input
    //progress,
    //btnSave,
    //btnRestore

fileTxt.init = function(fullModel) {
  model = fullModel.txt
  btn = document.getElementById('file-txt')
  input = document.getElementById('input-txt')

  btn.addEventListener('click', clickInput)
  input.addEventListener('change', choosedFile)
}

fileTxt.close = function() {
  btn.removeEventListener('click', clickInput)
  input.removeEventListener('change', choosedFile)
}

function clickInput() {
  input.click()
}

function choosedFile() {
  if (input.files.length === 0) return; //здесь ";" обязательно
  const file = input.files[0]
  input.value = ''  // единственный способ чтобы заново открыть тотже файл
  const path = file.path
  const name = file.name

  btn.innerHTML = name
  btn.setAttribute('title', path)

  const reader = new FileReader()
  reader.readAsText(file)

  //reader.onloadstart = startProgress
  //reader.onprogress = updateProgress
  reader.onload = loaded
  reader.onerror = errorHandler

  // function startProgress(ev) {
    // progress.style.display = 'block'
    // setWidthProgress(0)
  // }

  // function updateProgress(ev) {
    // if (ev.lengthComputable) {
      // var loaded = (ev.loaded / ev.total)
      // if (loaded < 1) {
        // setWidthProgress(loaded)
      // }
    // } else {
      //тогда будет анимация загрузки средствами css
    // }
  // }

  function loaded(ev) {
    let content = ev.target.result
    if (/\.txt$/.test(name)) {
      content = model.txtToLngt(content)
    }
    //setWidthProgress(0)
    //progress.style.display = 'none'
    model.setLoadedFile({name, path, size})
    model.publish('loadedLngt', content)
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //model.publish('setPoz', model.getPoz)
  }

  function errorHandler(ev) {
    if(ev.target.error.name == "NotReadableError") {
      btn.innerHTML = 'Выберите другой текстовой файл'
      //setWidthProgress(0)
      //progress.style.display = 'none'
    }
  }

}

// function setWidthProgress(value) {
  // const width = 20 + value * 70
  // progress.style.width = width + '%'
// }


export default fileTxt
