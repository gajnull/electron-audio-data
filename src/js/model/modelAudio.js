import webAudioAPI from './webAudioAPI';

export default class ModelAudio {
  constructor(/*_vent*/) {
    //this.vent = _vent;

    this.file = { // пока не используется
      name: null,
      path: null,
      size: null
    }
    this.api = webAudioAPI();

    this.pozMin = 0;   // Позиция конца предыдущего отрезка
    this.pozCurrent = 0; // Текущая позиция
    this.duration = 0; // Продолжительность всего ауиотрека.
    // Запомненный отрезок
    this.pozFrom = 0;
    this.pozTo = 0;
    this.delta = 0.1; // Шаг изменения позиции отрезка
  }

  decode(rawData) {

    this.api.decode(rawData, decodedAudio.bind(this));

    function decodedAudio(duration) {
      this.duration = duration;
      //this.vent.publish('decodedAudio');
      //this.changePoz();
    }
  }

  endedTrack() {
    return (this.pozCurrent > this.duration);
  }

  getPoz(updatePoz = false) {
    if (updatePoz) this.pozCurrent = this.api.getCurrentPoz();
    return {
      pozMin: this.pozMin,
      duration: this.duration,
      pozCurrent: this.pozCurrent,
      pozFrom: this.pozFrom,
      pozTo: this.pozTo
    };
  }

///// проигрывание/остановка
  play() { this.api.play(this.pozCurrent) }

  stop() {
    this.pozCurrent = this.api.stop()
    if(this.pozCurrent > this.duration) this.pozCurrent = this.duration //не должно быть - может превысить на доли секунды
  }

  repeate() { //проигрываем выбранный отрезок
    this.pozCurrent = this.pozFrom;
    this.play();
    //this.playing = true;
    //const period = (this.pozTo - this.pozFrom) * 1000;
    //this.timerStop = setTimeout(() => { this.stop() }, period);
  }

// внесение в текстовой файл выбранный интервал
  // getInterval() {
  //   return { pozFrom: this.pozFrom, pozTo: this.pozTo };
  // }
  nextInterval() {
    this.pozMin = this.pozFrom = this.pozCurrent = this.pozTo;
  }

// установка аудиоинтервала
  assignInterval({ _from, _to }) {
    this.pozMin = this.pozCurrent = this.pozFrom = +_from;
    this.pozTo = +_to;
  }

//// переход позиции старт, от и до (может в if(this.playing) вместо return надо this.stop(); )
  gotoStart() { this.pozCurrent = this.pozMin; }
  gotoFrom() { this.pozCurrent = this.pozFrom; }
  gotoTo() { this.pozCurrent = this.pozTo; }

//// установка и изменение позицй от и до
  fromMoveBack() {
    let newPoz = Math.round((this.pozFrom - this.delta) * 10) / 10;
    if(newPoz < this.pozMin) { newPoz = this.pozMin; } // тогда скорее всего будет повторение, но иначе число this.pozMin может быть слишком дробным
    this.pozFrom = newPoz;
  }

  fromSet() {
    this.pozFrom = + this.pozCurrent.toFixed(1);
    if (this.pozTo < this.pozFrom) this.pozTo = this.pozFrom;
  }

  fromMoveForward() {
    let newPoz = Math.round((this.pozFrom + this.delta) * 10) / 10
    if (newPoz > this.duration) { newPoz = this.duration }
    this.pozFrom = newPoz
    if (this.pozFrom > this.pozTo) this.pozTo = this.pozFrom
  }


  toMoveBack() {
    let newPoz = Math.round((this.pozTo - this.delta) * 10) / 10;
    if(newPoz < this.pozMin) { newPoz = this.pozMin } // тогда скорее всего будет повторение, но иначе число this.pozMin может быть слишком дробным
    this.pozTo = newPoz;
    if (this.pozTo < this.pozFrom) this.pozFrom = this.pozTo;
  }

  toSet() {
    this.stop();  // this working only if model.playing = true
    this.pozTo =  + this.pozCurrent.toFixed(1);
    if (this.pozFrom > this.pozTo) this.pozFrom = this.pozTo;
  }

  toMoveForward() {
    if(this.playing) return;
    let newPoz = Math.round((this.pozTo + this.delta) * 10) / 10;
    if (newPoz > this.duration) { newPoz = this.duration }
    this.pozTo = newPoz;
  }

  setStartPoz(poz) {
    this.pozMin = this.pozCurrent = this.pozFrom = this.pozTo = +poz;
  }

}
