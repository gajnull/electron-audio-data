/****************************************************************
  во внешнем модуле используется fileTxt.init() и fileTxt.close()
*****************************************************************/

import {vent} from './vent.js'

const fileTxt = {
  name: '',
  path: ''  //with name
}

const btn = document.getElementById('btn-files-txt')
const input = document.getElementById('input-txt')
const path = document.getElementById('field-files-txt')

fileTxt.init = function() {
  btn.addEventListener('click', clickInput)
  input.addEventListener('change', chooseFile)
}
fileTxt.close = function() {
  btn.removeEventListener('click', clickInput)
  input.removeEventListener('change', chooseFile)
}

function clickInput() {
  input.click()
}
function chooseFile() {
  if (input.files.length === 0) return; //здесь ";" обязательно
  const f = input.files[0]
  console.log(f)
  //path.innerHTML =
  const reader = new FileReader()
  reader.readAsText(f)
  reader.onprogress = updateProgress
  reader.onload = loaded
  reader.onerror = errorHandler
}

function updateProgress(ev) {
  if (ev.lengthComputable) {
    var loaded = (ev.loaded / ev.total)
    if (loaded < 1) {
      // Increase the prog bar length
      // style.width = (loaded * 200) + "px";
    }
  }
}

function loaded(ev) {
  fileString = ev.target.result
  vent.publish('loadLngt', fileString)
  // Handle UTF-16 file dump
  //if(utils.regexp.isChinese(fileString)) {
    //Chinese Characters + Name validation
  //}
//  else {
    // run other charset test
//  }
  // xhr.send(fileString)
}

function errorHandler(ev) {
  if(ev.target.error.name == "NotReadableError") {
    path.innerHTML = 'Выбеоите другой звуковой файл'
    vent.publish('loadLngt', 'err')
  }
}

export {fileTxt}
