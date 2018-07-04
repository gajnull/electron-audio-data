export default function webAudioAPI() {

  const contextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
  if (!contextClass) {
    console.log('Web Audio API недоступно');
    return;
  }

  const res = {}
  let context, source, buffer,
      playing, startTime, startPoz;

  res.decode = (content) => {
    /////if (!(data instanceof ArrayBuffer)) return;
    return new Promise((resolve, reject) => {
      context = new contextClass();
      context.decodeAudioData(content, function(audioBuffer) {
        buffer = audioBuffer;
        initVars();
        const duration =  Math.round(buffer.duration * 10) / 10;
        resolve(duration);
      }, reject)  // может надо () => {reject();}
    });
  }

  function initVars() {
    startTime = startPoz = 0;
    playing = false;
  }

  res.play = (poz = 0) => {
    source = context.createBufferSource();
    source.connect(context.destination);
    source.buffer = buffer;

    startTime = context.currentTime;
    startPoz = poz;
    source.start(0, startPoz);
    playing = true;
  }

  res.getCurrentPoz = () => {
    return Math.round((context.currentTime - startTime + startPoz) * 10) / 10;
  }

  res.stop = () => {
    source.stop();
    playing = false;
    return res.getCurrentPoz();
  }


  function onError() {}

  return res;

}
