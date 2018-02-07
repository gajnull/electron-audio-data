export default function webAudioAPI() {

  const contextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
  if (!contextClass) {
    console.log('Web Audio API недоступно')
    return;
  }

  const res = {}
  let context,
      source,
      buffer,
      status

  res.decode = function(rawData, fn) {
    //if (!(data instanceof ArrayBuffer)) return;
    context = new contextClass()
    context.decodeAudioData(rawData, function(audioBuffer) {
      buffer = audioBuffer
      fn(buffer.duration)
    }, onError)
  }

  res.start = function() {
    source = context.createBufferSource()
    source.connect(context.destination)
    source.buffer = buffer
    source.start(0)
  }

  res.end = function() {
    source.stop()
  }

  res.play = function() {}
  res.stop = function() {}
  res.pause = function() {}

  function onError() {}

  return res;

}



// var webAudioAPI = (function () {
//   var o = {};
//   var context, source, buffer;
//   var startTime = 0;
//   var status = 'still' //'playing'
//
//   const contextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
//
//   if (!contextClass) {
//     console.log('Web Audio API недоступно');
//     //trow err;
//   }
//
//   o.setSrc = function(fn, content) {
//     //if (!(data instanceof ArrayBuffer)) return;
//     context = new contextClass();
//     context.decodeAudioData(content, function(_buffer) {
//       buffer = _buffer;
//       fn(buffer.duration);
//     }, onError);
//   };
//
//   o.play = function(startPoz) {
//     source = context.createBufferSource();
//     source.connect(context.destination);
//     source.buffer = buffer;
//     startPoz = startPoz || 0;
//     startTime = context.currentTime + startPoz;
//     source.start(0, startTime);
//     status = 'playing';
//   };
//
//   o.stop = function() {
//     source.stop();
//     status = 'still';
//   };
//
//   o.pause = function() {
//     source.stop();
//     var offset = context.currentTime - startTime;
//     status = 'still';
//     return offset;
//   };
//
//   o.position = function() {
//     if (status === 'playing') {
//       return  context.currentTime - startTime;
//     }
//     return;
//   };
//
//   function onError(e) {
//     console.log(e.message || 'неизвестная ошибка в webAudioAPI');
//   }
//
//   return o;
// }());
