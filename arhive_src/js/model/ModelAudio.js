import Vent from './Vent'
import webAudioAPI from './webAudioAPI'

export default class ModelAudio extends Vent {
  constructor() {
    const evs = {
      //loadedAudio: [],
      decodedAudio: []
    }
    super(evs)
    this.file = {
      name: null,
      path: null,
      size: null
    }
    this.api = webAudioAPI()
    this.decode = this.api.decode
      // устанавливается в callback в this.decode
    this.pozMin = 0   // Позиция конца предыдущего отрезка
    this.duration = 0 // Продолжительность всего ауиотрека

    // Запомненный отрезок
    this.pozFrom = 0
    this.pozTo = 0

    this.pozPause = 0
    // Устанавливается после загрузки изменения modelTxt (в setPoz)
    // this.setPoz = this.setPoz.bind(this)

  }

  getData() {
    const totalPoz =  api.getPoz()
    return {
      relativePoz: totalPoz - this.pozMin,
      relativeFrom: this.pozFrom - this.pozMin,
      relativeTo: this.pozTo - this.pozMin,
      totalPoz,
      duration: this.duration
    };
  }

///// проигрывание
  start() { //проигрываем сначала (с pozMin)
    this.api.start(this.pozMin)
  }

  play() { //проигрываем с момента остановки
    this.api.continue(this.pozPause)
    this.pozPause = this.pozMin
  }

  repeate() { //проигрываем выбранный отрезок
    this.api.play(this.pozFrom, this.pozTo)
    this.pozPause = this.pozMin
  }

  stop() {
    this.pozPause = api.currentTime()
    this.api.stop()
  }

//// установка позицй от и до
  setPozFrom() {
    this.pozFrom = this.pozPause
  }
  setPozFrom() {
    this.pozTo = this.pozPause
  }

//// изменение позиции от и до


}
