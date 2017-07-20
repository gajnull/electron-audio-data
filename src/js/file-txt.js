/****************************************************************
  во внешнем модуле используется fileTxt.init() и fileTxt.close()
*****************************************************************/

import {vent} from './vent.js'

const fileTxt = {}

const btn = document.getElementById('btn-files-txt')
const input = document.getElementById('input-txt')
const path = document.getElementById('field-files-txt')

fileTxt.init = function() {
                                                console.log('before init')
  btn.addEventListener('click', clickInput);
  input.addEventListener('change', chooseFile)
                                                console.log('after init')
}
fileTxt.close = function() {
  btn.removeEventListener('click', clickInput);
  input.removeEventListener('change', chooseFile)
}

function clickInput() {
  console.log('clickInput')
  input.click()
}
function chooseFile() {
  if (input.files[0]) console.log(input.files[0])
}



export {fileTxt}
