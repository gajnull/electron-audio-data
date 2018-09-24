import './scss/style.scss';

import model from './js/model/model';
import hotKeys from './js/hotKeys';

import fileSelect from './js/file_select';
import fileEnd from './js/file_end';
import txtArea from './js/txt_area';

import controlAudio from './js/control_audio';
import infoTiming from './js/infoTiming';


export default function work() {
  hotKeys.init();
  fileSelect.init(); // в fileTxt будет чтение текстового файла
  txtArea.init();
  fileEnd.init();
  controlAudio.init();
  infoTiming.init();
}
