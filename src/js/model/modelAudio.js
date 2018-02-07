import Vent from './Vent'
import webAudioAPI from './webAudioAPI'

export default class ModelAudio extends Vent {
  constructor() {
    const evs = {
      decodedAudio: [],
      changedPoz: [],
      changeStateAudio: [],
      addInterval: []
    }
    super(evs)
    this.file = {
      name: null,
      path: null,
      size: null
    }
    this.api = webAudioAPI()
  }

  decode(rawData) {
    this.pozMin = 0   // Позиция конца предыдущего отрезка
    this.pozCurrent = 0 // Текущая позиция
    this.duration = 0 // Продолжительность всего ауиотрека.
    // Запомненный отрезок
    this.pozFrom = 0
    this.pozTo = 0

    this.playing = false
    this.delta = 0.1 // Шаг изменения позиции отрезка

    this.timer = null
    this.timerStop = null

    this.api.decode(rawData, decodedAudio.bind(this))

    function decodedAudio(duration) {
      this.duration = duration
      this.publish('decodedAudio')
      this.changePoz()
    }

  }

  changePoz() {
    this.publish('changedPoz', { pozMin: this.pozMin,
                                duration: this.duration,
                                pozCurrent: this.pozCurrent,
                                pozFrom: this.pozFrom,
                                pozTo: this.pozTo })
  }

///// проигрывание/остановка
  tooglePlay() { //проигрываем с момента остановки
    if (this.playing) {
      this.stop()
    } else {
      this.play()
    }
  }

  play() {
    this.api.play(this.pozCurrent)
    this.playing = true
    this.publish('changeStateAudio')
    this.timer = setInterval(() => {
                  this.pozCurrent = this.api.getCurrentPoz()
                  if(this.pozCurrent > this.duration) this.stop()
                  this.changePoz()
                }, 100)
  }

  stop() {
    if(!this.playing) return;
    this.pozCurrent = this.api.stop()
    this.playing = false
    this.publish('changeStateAudio')
    if(this.pozCurrent > this.duration) this.pozCurrent = this.duration
    clearInterval(this.timer)
    if (this.timerStop) { clearTimeout(this.timerStop) }
    this.changePoz()
  }


  repeate() { //проигрываем выбранный отрезок
    if(this.playing) return;
    this.pozCurrent = this.pozFrom
    this.play()
    this.playing = true
    //this.publish('changeStateAudio')
    const period = (this.pozTo - this.pozFrom) * 1000
    this.timerStop = setTimeout(() => { this.stop() }, period)
  }

  addInterval() {
    const pozFrom = this.pozFrom;
    const pozTo = this.pozTo;
    this.publish('addInterval', { pozFrom, pozTo });
    this.pozMin = this.pozFrom = this.pozCurrent = pozTo;
    this.changePoz();
  }

//// переход позиции старт, от и до
  gotoStart() {
    if(this.playing) return;
    this.pozCurrent = this.pozMin
    this.changePoz()
  }

  gotoFrom() {
    if(this.playing) return;
    this.pozCurrent = this.pozFrom
    this.changePoz()
  }

  gotoTo() {
    if(this.playing) return;
    this.pozCurrent = this.pozTo
    this.changePoz()
  }


//// установка и изменение позицй от и до
  fromMoveBack() {
    let newPoz = Math.round((this.pozFrom - this.delta) * 10) / 10
    if(newPoz < this.pozMin) { newPoz = this.pozMin } // тогда скорее всего будет повторение, но иначе число this.pozMin может быть слишком дробным
    this.pozFrom = newPoz
    this.changePoz()
  }

  fromSet() {
    this.pozFrom = + this.pozCurrent.toFixed(1)
    if (this.pozTo < this.pozFrom) this.pozTo = this.pozFrom
    this.changePoz()
  }

  fromMoveForward() {
    let newPoz = Math.round((this.pozFrom + this.delta) * 10) / 10
    if (newPoz > this.duration) { newPoz = this.duration }
    this.pozFrom = newPoz
    if (this.pozFrom > this.pozTo) this.pozTo = this.pozFrom
    this.changePoz()
  }


  toMoveBack() {
    if(this.playing) return;
    let newPoz = Math.round((this.pozTo - this.delta) * 10) / 10
    if(newPoz < this.pozMin) { newPoz = this.pozMin } // тогда скорее всего будет повторение, но иначе число this.pozMin может быть слишком дробным
    this.pozTo = newPoz
    if (this.pozTo < this.pozFrom) this.pozFrom = this.pozTo
    this.changePoz()
  }

  toSet() {
    //if(this.playing) return;
    this.stop();  // this working only if this.playing = true
    this.pozTo =  + this.pozCurrent.toFixed(1);
    if (this.pozFrom > this.pozTo) this.pozFrom = this.pozTo;
    this.changePoz();
  }

  toMoveForward() {
    if(this.playing) return;
    let newPoz = Math.round((this.pozTo + this.delta) * 10) / 10
    if (newPoz > this.duration) { newPoz = this.duration }
    this.pozTo = newPoz
    this.changePoz()
  }

}
