import './scss/style.scss'

import Vent from './js/model/Vent'

import ModelTxt from './js/model/ModelTxt'
import fileTxt from './js/file_txt'
import areaTxt from './js/area_txt'

import ModelAudio from './js/model/ModelAudio'
import fileAudio from './js/file_audio'
import controlAudio from './js/control_audio'

export default function work() {

  // const vent = new Vent({
  //   setPoz: []
  // })

  const txt = new ModelTxt()
  const audio = new ModelAudio()

  //txt.on('setMinPoz', audio.setMinPoz)  //audio.setMinPoz(startPoz)
  //audio.on('setInterval', txt.setInterval) //txt.setInterval({startPoz, endPoz})

  fileTxt.init(txt)
  areaTxt.init(txt, audio)

  fileAudio.init(audio)
  controlAudio.init(txt, audio)


}


// txt.publish('setMinPoz', minPoz) -> audio.minPoz = minPoz
// audio.publish('')
