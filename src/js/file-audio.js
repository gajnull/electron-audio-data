/********************************************
  во внешнем модуле используется files.init()
*********************************************/

import {vent} from './vent.js'

const fileAudio = {}


  const btn = document.getElementById('btn-files-audio')
  const input = document.getElementById('input-audio')
  const path = document.getElementById('field-files-audio')
  f.init = function() {
    btn.addEventListener('click', chooseFile);
  }
  f.close = function() {
    btn.removeEventListener('click', chooseFile);
  }
  function chooseFile() {}




export {fileAudio}
