import vent from './vent';
import webAudioAPI from './webAudioAPI';
const {ipcRenderer} = window.require('electron');

const api = webAudioAPI();

let pozMin = 0,     // Позиция конца предыдущего отрезка
    pozCurrent = 0, // Текущая позиция
    duration = 0;   // Продолжительность всего ауиотрека.
// Запомненный отрезок
let pozFrom = 0,
    pozTo = 0,
    delta = 0.1; // Шаг изменения позиции отрезка

let playing = false,  // Состояние проигрывателя - играет/пауза
    timer = null,
    timerStop = null;

let file = { // пока не используется
  name: null,
  path: null
};


const modelAudio = {

  decodeFile({name, path, content}) {
    api.decode(content).then(res => {
      duration = res;
      file = {name, path};
      vent.publish('decodedAudio', {name, path});
      vent.publish('changedPoz', getPoz());
      localStorage.setItem('path-audio', path);
      localStorage.setItem('name-audio', name);
    });
  },


///// проигрывание/остановка
  tooglePlay() {
    if (playing) {
      this.stop();
    } else {
      this.play();
    }
  },

  play() {
    if (playing) return; // может вызываться не только из tooglePlay()
    api.play(pozCurrent);
    playing = true;
    vent.publish('changeStateAudio', { playing });
    timer = setInterval(() => {
      vent.publish('changedPoz', getPoz(true));
      if (pozCurrent > duration) this.tooglePlay(); // this.stop() - недостаточно
    }, 100);
  },

  stop() {
    if (!playing) return; // может вызываться не только из tooglePlay()
    clearInterval(timer);
    if (timerStop) { clearTimeout(timerStop); }
    pozCurrent = api.stop();
    playing = false;
    vent.publish('changeStateAudio', { playing });
    if (pozCurrent > duration) pozCurrent = duration; //не должно быть - может превысить на доли секунды
  },

  repeate() { //проигрываем выбранный отрезок
    if (playing) return;
    if (notFitUnit()) return; // если отрезок не установлен и не может быть установлен
    const period = (pozTo - pozFrom) * 1000;  // здесь не обязательно округлять
    console.log(pozFrom, ' , ', pozTo);
    if (period < 0) return; // не должно быть
    pozCurrent = pozFrom;
    this.play();
    timerStop = setTimeout(() => { this.stop() }, period);
  },

  reset() {
    pozFrom = pozCurrent = pozTo = pozMin;
  },

  setUnit() {
    if (playing) return;
    if (notFitUnit()) return; // если отрезок не установлен и не может быть установлен
    return { pozFrom, pozTo };
  },

  nextUnit() {  // должно быть playing = false
    pozMin = pozFrom = pozCurrent = pozTo;
  },

  setPozz({_from, _to}) {
    pozMin = pozCurrent = pozFrom = +_from;
    pozTo = +_to;
    vent.publish('changedPoz', getPoz());
  },

// установка аудиоинтервала (из файла .lngt)
  assignInterval({_from, _to}) {  // должно быть playing = false
    pozMin = pozCurrent = pozFrom = +_from;
    pozTo = +_to;
  },

//// переход позиции старт, от и до (может в if(this.playing) вместо return надо this.stop(); )
  gotoStart() {
    if (playing) return;
    pozCurrent = pozMin;
  },
  gotoFrom() {
    if (playing) return;
    pozCurrent = pozFrom;
  },
  gotoTo() {
    if (playing) return;
    pozCurrent = pozTo;
   },

//// установка и изменение позицй от и до
  fromMoveBack() {
    let newPoz = Math.round((pozFrom - delta) * 10) / 10;
    if(newPoz < pozMin) { newPoz = pozMin; } // тогда скорее всего будет повторение, но иначе число this.pozMin может быть слишком дробным
    pozFrom = newPoz;
  },

  fromSet() { // playing может быть любым
    pozFrom = + pozCurrent.toFixed(1);
    if (pozTo < pozFrom) pozTo = pozFrom;
  },

  fromMoveForward() {
    let newPoz = Math.round((pozFrom + delta) * 10) / 10;
    if (newPoz > duration) { newPoz = duration }
    pozFrom = newPoz;
    if (pozFrom > pozTo) pozTo = pozFrom;
  },

  toMoveBack() {
    let newPoz = Math.round((pozTo - delta) * 10) / 10;
    if(newPoz < pozMin) { newPoz = pozMin } // тогда скорее всего будет повторение, но иначе число pozMin может быть слишком дробным
    pozTo = newPoz;
    if (pozTo < pozFrom) pozFrom = pozTo;
  },

  toSet() {
    if (playing) this.stop();
    pozTo =  + pozCurrent.toFixed(1);
    if (pozFrom > pozTo) pozFrom = pozTo;
  },

  toMoveForward() {
    if(playing) return;
    let newPoz = Math.round((pozTo + delta) * 10) / 10;
    if (newPoz > duration) { newPoz = duration }
    pozTo = newPoz;
  },

  setStartPoz(poz) {
    pozMin = pozCurrent = pozFrom = pozTo = +poz;
    vent.publish('changedPoz', getPoz());  // может это надо в другом месте
  },

  advertPozz() {
    vent.publish('changedPoz', getPoz());
  },

  restore() {
    const name = file.name || localStorage.getItem('name-audio');
    const path = file.path || localStorage.getItem('path-audio');
    if (!name || !path) return;
    ipcRenderer.send('will-restore-audio', {name, path});
  }
}

ipcRenderer.on('audio-restored', (event, arg) => {
  if (arg.err) {
    console.log('error in restoring audio:');  console.log(arg.err);
    return;
  }
  const content = arg.content.buffer;
  const {name, path} = arg;
  modelAudio.decodeFile({name, path, content}); // здесь установятся file и localStorage
})


function getPoz(updatePoz = false) {
  if (updatePoz) pozCurrent = api.getCurrentPoz();
  return {
    pozMin, pozCurrent, duration, pozFrom, pozTo
  };
}

function notFitUnit() { // если отрезок не установлен (pozFrom + x > pozTo) и не может быть установлен (pozCurrent < pozFrom + x)
  if ( pozTo < pozFrom + 0.3  && pozCurrent > pozFrom + 0.3) pozTo = pozCurrent;
  if (pozTo > pozFrom + 0.3) return;
  return true;
}



export default modelAudio;
