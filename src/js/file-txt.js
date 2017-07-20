/****************************************************************
  во внешнем модуле используется fileTxt.init() и fileTxt.close()
*****************************************************************/

import {vent} from './vent.js'

const fileTxt = {}

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
  const reader = new FileReader()
  reader.readAsText(f)
  reader.onprogress = updateProgress
  reader.onload = loaded
  reader.onerror = errorHandler
}

function updateProgress(evt) {
  if (evt.lengthComputable) {
    // evt.loaded and evt.total are ProgressEvent properties
    var loaded = (evt.loaded / evt.total)
    if (loaded < 1) {
      // Increase the prog bar length
      // style.width = (loaded * 200) + "px";
    }
  }
}

function loaded(evt) {
  // Obtain the read file data
  var fileString = evt.target.result
  document.getElementById('txt').innerHTML = fileString
  // Handle UTF-16 file dump
  //if(utils.regexp.isChinese(fileString)) {
    //Chinese Characters + Name validation
  //}
//  else {
    // run other charset test
//  }
  // xhr.send(fileString)
}

function errorHandler(evt) {
  if(evt.target.error.name == "NotReadableError") {
    // The file could not be read
  }
}

export {fileTxt}
