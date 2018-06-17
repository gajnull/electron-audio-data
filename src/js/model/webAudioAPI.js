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
      playing,
      startTime,
      startPoz

  res.decode = function(content) {
    /////if (!(data instanceof ArrayBuffer)) return;
    return new Promise((resolve, reject) => {
      context = new contextClass();
      context.decodeAudioData(content, function(audioBuffer) {
        buffer = audioBuffer;
        initVars();
        resolve(buffer.duration);
      }, reject)  // может надо () => {reject();}
    });
  }

  function initVars() {
    startTime = startPoz = 0
    playing = false
  }

  res.play = function(poz) {
    source = context.createBufferSource()
    source.connect(context.destination)
    source.buffer = buffer

    startTime = context.currentTime
    startPoz = poz || 0
    source.start(0, startPoz)
    playing = true
  }

  res.getCurrentPoz = function() {
    if(playing) {
      return (context.currentTime - startTime + startPoz);
    } else return; // этого нельзя допускать
  }

  res.stop = function() {
    source.stop()
    return res.getCurrentPoz();
    playing = false
  }


  function onError() {}

  return res;

}
