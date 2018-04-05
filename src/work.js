import './scss/style.scss'

import hotKeys from './js/keyboard'

import model from './js/model/model';

//import modelTxt from './js/model/modelTxt'
import fileTxt from './js/file_txt'
import areaTxt from './js/area_txt'
import fileEnd from './js/file_end'

//import ModelAudio from './js/model/modelAudio'
import fileAudio from './js/file_audio'
import controlAudio from './js/control_audio'
import infoTiming from './js/infoTiming'

export default function work() {

  hotKeys.init();

  fileTxt.init(model);
  areaTxt.init(model);
  fileEnd.init(model);

  fileAudio.init(model);
  controlAudio.init(model);
  infoTiming.init(model);

}
