/********************************************
  во внешнем модуле используется files.init()
*********************************************/

import {vent} from './vent.js'

/******************************************/
const audio = (function() {
  const f = {}
  const btn = document.getElementById('btn-files-audio')
  const path = document.getElementById('field-files-audio')
  f.init = function() {
    btn.addEventListener('click', chooseFile);
  }
  f.close = function() {
    btn.removeEventListener('click', chooseFile);
  }
  function chooseFile() {}


})()


/******************************************/
const txt = (function () {
  const f = {}
  const btn = document.getElementById('btn-files-txt')
  const path = document.getElementById('field-files-txt')
  f.init = function() {
    btn.addEventListener('click', chooseFile);
  }
  f.close = function() {
    btn.removeEventListener('click', chooseFile);
  }
  function chooseFile() {}


})()


/******************************************/
const files = {}
files.init = function() {
  audio.init()
  txt.init()
}
files.close = function() {
  audio.close()
  txt.close()
}

export {files}
