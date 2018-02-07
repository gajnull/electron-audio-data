import getKeyboard from './keyboard'

const areaTxt = {}
let mTxt, mAudio,
    current,
    area,
    selection,
    keyboard

areaTxt.init = function(modelTxt, modelAudio) {
  area = document.getElementById('txt')

  mTxt = modelTxt
  mAudio = modelAudio
  mTxt.on('loadedLngt', loadHandler)

  keyboard = getKeyboard()
  keyboard.addKeyHandler('addSelection', addSelection)
  keyboard.addKeyHandler('reduceSelection', reduceSelection)
}

areaTxt.close = function() {
  mTxt.off('loadedLngt', loadHandler)
  keyboard.close()
}

function loadHandler(content) {
  area.innerHTML = content
  selection = document.getElementById('selection-txt')
  current = document.getElementById('current-txt')
  mTxt.selection = selection.innerHTML
  mTxt.current = current.innerHTML
  mAudio.pozMin = getPozMin()
}
  function getPozMin() {
    const el = selection.previousElementSibling
    if (el && el.hasAttribute('end')) return el.getAttribute('end');
    return 0;
  }

function addSelection() {
  mTxt.addSelection()
  selection.innerHTML = mTxt.selection
  current.innerHTML = mTxt.current
}

function reduceSelection() {
  mTxt.reduceSelection()
  selection.innerHTML = mTxt.selection
  current.innerHTML = mTxt.current
}

export default areaTxt
