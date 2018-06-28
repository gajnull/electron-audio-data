import vent from './vent';
import webAudioAPI from './webAudioAPI';

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
  path: null,
  size: null
}



const modelAudio = {

  decodeFile({name, path, size, content}) {
    api.decode(content).then(res => {
      duration = res;
      file.name = {name, path, size};
      vent.publish('decodedAudio', {name, path});
      vent.publish('changedPoz', getPoz());
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
    const period = (pozTo - pozFrom) * 1000;
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
    if (pozFrom < pozTo) return { pozFrom, pozTo };
  },

  nextUnit() {  // должно быть playing = false
    pozMin = pozFrom = pozCurrent = pozTo;
  },

// установка аудиоинтервала (из файла .lngt)
  assignInterval({ _from, _to }) {  // должно быть playing = false
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
  }
}

function getPoz(updatePoz = false) {
  if (updatePoz) pozCurrent = api.getCurrentPoz();
  return {
    pozMin, pozCurrent, duration, pozFrom, pozTo
  };
}

export default modelAudio;
