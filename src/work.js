import './scss/style.scss';

import model from './js/model/model';
import hotKeys from './js/hotKeys';

import fileTxt from './js/file_txt';
import fileEnd from './js/file_end';
import txtArea from './js/txt_area';

import fileAudio from './js/file_audio';
import controlAudio from './js/control_audio';
import infoTiming from './js/infoTiming';

import fileTransl from './js/file_transl';

export default function work() {
  hotKeys.init();
  fileTxt.init(); // в fileTxt будет чтение текстового файла
  txtArea.init();
  fileEnd.init();
  fileAudio.init(); // в fileTxt будет чтение содержимого звукового файла
  fileTransl.init();
  controlAudio.init();
  infoTiming.init();
}
