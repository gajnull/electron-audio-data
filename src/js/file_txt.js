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

fileTxt.init = function({txt}) {
  model = txt
  btn = document.getElementById('file-txt')
  input = document.getElementById('input-txt')

  btn.addEventListener('click', clickInput)
  input.addEventListener('change', choosedFile)
  model.on('loadedLngt', setInfoLodedLngt)
  model.on('savedLngt', setInfoLodedLngt)  
}

fileTxt.close = function() {
  btn.removeEventListener('click', clickInput)
  input.removeEventListener('change', choosedFile)
  model.off('loadedLngt', setInfoLodedLngt)  
  model.on('savedLngt', setInfoLodedLngt) // 'savedLngt' нельзя объеденить с 'loadedLngt' 
}                                         // так как на loadedLngt меняется содержимое текста 

function clickInput() {
  input.click()
}

function choosedFile() {
  if (input.files.length === 0) return; //здесь ";" обязательно
  const file = input.files[0]
  input.value = ''  // единственный способ чтобы заново открыть тотже файл
  const path = file.path
  const name = file.name
  const size = file.size

  btn.innerHTML = 'loding...'

  const reader = new FileReader()
  reader.readAsText(file)

  //reader.onloadstart = startProgress
  //reader.onprogress = updateProgress
  reader.onload = loaded
  reader.onerror = errorHandler


  function loaded(ev) {
    let content = ev.target.result
    if (/\.txt$/.test(name)) {
      content = txtToLngt(content)
    }

    model.setLoadedFile({name, path, size, content})
  }

  function txtToLngt(str) {
    let s = str
    //Нормализуем - убираем из текста возможные тэги
    s = s.replace(/</g, '(').replace(/>/g, ')')
    //Заменяем абзацы и упорядочиваем пробелы
    s = s.replace(/\n/g, '<br>')
    s = s.replace(/\s*<br>\s*/g,'<br>&nbsp&nbsp') //для отступа
    s = s.replace(/\s+/g, ' ') //все пробелы однотипные и по одному
    s = s.replace(/\s([.,:;!\)])/g, '$1') //убираем ненужные пробелы
    //Добавляем тэги для начальной работы с текстом
    s = `<span id="selection-txt"></span>
         <span id="current-txt">&nbsp&nbsp${s}</span>`
    return s;
  }

  function errorHandler(ev) {
    if(ev.target.error.name == "NotReadableError") {
      btn.innerHTML = 'Выберите другой текстовой файл'
    }
  }

}

function setInfoLodedLngt({path, name}) {
  btn.innerHTML = name
  btn.setAttribute('title', path)
}  

export default fileTxt
