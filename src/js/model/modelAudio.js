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
      vent.publish('changedPoz', this.getPoz());
    });
  },

  endedTrack() {  
    return (pozCurrent > duration);
  },

  getPoz(updatePoz = false) {
    if (updatePoz) pozCurrent = api.getCurrentPoz();
    return {
      pozMin, pozCurrent, duration, pozFrom, pozTo,
    };
  },

///// проигрывание/остановка
  tooglePlay() { 
    if (!playing) {
      this.play();
    } else {
      this.stop();
    }
    playing = !playing;
    vent.publish('changeStateAudio', { playing });    
  },
  
  play() {    // перед вызовом проверить playing === false
    api.play(pozCurrent);
    timer = setInterval(() => {
      vent.publish('changedPoz', this.getPoz(true));
      if (pozCurrent > duration) this.stop();
    }, 100);     
  },

  stop() { // перед вызовом проверить playing === true
    pozCurrent = api.stop();
    clearInterval(timer);
    if (timerStop) { clearTimeout(timerStop); }
    if (pozCurrent > duration) pozCurrent = duration; //не должно быть - может превысить на доли секунды
  },

  repeate() { //проигрываем выбранный отрезок
    pozCurrent = pozFrom;
    this.play();
    //this.playing = true;
    //const period = (this.pozTo - this.pozFrom) * 1000;
    //this.timerStop = setTimeout(() => { this.stop() }, period);
  },

// внесение в текстовой файл выбранный интервал
  // getInterval() {
  //   return { pozFrom: this.pozFrom, pozTo: this.pozTo };
  // }
  nextInterval() {
    pozMin = pozFrom = pozCurrent = pozTo;
  },

// установка аудиоинтервала
  assignInterval({ _from, _to }) {
    pozMin = pozCurrent = pozFrom = +_from;
    pozTo = +_to;
  },

//// переход позиции старт, от и до (может в if(this.playing) вместо return надо this.stop(); )
  gotoStart() { pozCurrent = pozMin; },
  gotoFrom() { pozCurrent = pozFrom; },
  gotoTo() { pozCurrent = pozTo; },

//// установка и изменение позицй от и до
  fromMoveBack() {
    let newPoz = Math.round((pozFrom - delta) * 10) / 10;
    if(newPoz < pozMin) { newPoz = pozMin; } // тогда скорее всего будет повторение, но иначе число this.pozMin может быть слишком дробным
    pozFrom = newPoz;
  },

  fromSet() {
    pozFrom = + pozCurrent.toFixed(1);
    if (pozTo < pozFrom) pozTo = pozFrom;
  },

  fromMoveForward() {
    let newPoz = Math.round((pozFrom + delta) * 10) / 10
    if (newPoz > duration) { newPoz = duration }
    pozFrom = newPoz
    if (pozFrom > pozTo) pozTo = pozFrom
  },

  toMoveBack() {
    let newPoz = Math.round((pozTo - delta) * 10) / 10;
    if(newPoz < pozMin) { newPoz = pozMin } // тогда скорее всего будет повторение, но иначе число pozMin может быть слишком дробным
    pozTo = newPoz;
    if (pozTo < pozFrom) pozFrom = pozTo;
  },

  toSet() {
    this.stop();  // this working only if model.playing = true
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
    vent.publish('changedPoz', this.getPoz());  // может это надо в другом месте
  }
}


export default modelAudio;
