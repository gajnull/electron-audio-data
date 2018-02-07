
import Api from './webAudioAPI.js'

export default function dataAudio() {
  const api = Api()

  const res = {}


  let name,
      path,
      size

  res.setAttr = function(data) {
    name = data.name
    path = data.path
    size = data.size
  }

  res.decode = api.decode

  return res;
}










// const contextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext)
// if (!contextClass) {
//   console.log('Web Audio API недоступно')
// }
//
// export default function getAudioData(buffer, fn) {
//   if (!contextClass) return;
//   const res = {}
//   let buffer
//
//   const context = new contextClass();
//   context.decodeAudioData(content, function(_buffer) {
//     buffer = _buffer;
//     fn(buffer.duration);
//   }, onError);
//
//
//   function onError(e) {
//     console.log(e.message || 'Ошибка в декодировании');
//   }
//
//   return res;
// }
