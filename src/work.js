import './scss/style.scss';

import hotKeys from './js/hotKeys';
//import modelTxt from './js/model/modelTxt'
import model from './js/model/model';
import fileTxt from './js/file_txt';
import fileEnd from './js/file_end';

//import ModelAudio from './js/model/modelAudio'
import fileAudio from './js/file_audio';
import controlAudio from './js/control_audio';
import infoTiming from './js/infoTiming';

export default function work() {
  hotKeys.init();
  fileTxt.init();
  setAreaTxt();
  fileEnd.init();
  fileAudio.init();
  controlAudio.init();
  infoTiming.init();
}

function setAreaTxt() {
  const area = document.getElementById('txt');
  model.setArea(area);
}
