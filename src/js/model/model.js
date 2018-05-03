//export const something = 'test'
import Vent from './Vent';
import ModelAudio from './modelAudio';
import modelTxt from './modelTxt';

const vent = new Vent({
  //lngt events
  loadedLngt: [],
  savedLngt: [],
  changeStateEdit: [],
  //audio events
  decodedAudio: [],
  changedPoz: [],
  changeStateAudio: []
});

modelTxt.setVent(vent);

const model = {
  vent,
  audio: new ModelAudio(vent),
  txt: modelTxt
}

export default model;
