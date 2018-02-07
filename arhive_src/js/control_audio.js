const controlAudio = {}

let mTxt, mAudio,
    btnStart,
    btnEnd

controlAudio.init = function(modelTxt, modelAudio) {
  mTxt = modelTxt
  mAudio = modelAudio
  mAudio.on('decodedAudio', handlerDecoded)
  btnStart = document.querySelector('button[act="start"]')
  btnEnd = document.querySelector('button[act="stop"]')

}

controlAudio.close = function() {
  mAudio.off('decodedAudio', handlerDecoded)
  removeListeners()
}

function handlerDecoded() {
  btnStart.addEventListener('click', mAudio.start)
  btnEnd.addEventListener('click', mAudio.end)
}
function removeListeners() {
  btnStart.removeEventListener('click', mAudio.start)
  btnEnd.removeEventListener('click', mAudio.end)
}


export default controlAudio
