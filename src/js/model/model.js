//export const something = 'test'
import Vent from './Vent';
import ModelAudio from './modelAudio';
import modelTxt from './modelTxt';

const model = new Vent({
  //lngt events
  loadedLngt: [],
  savedLngt: [],
  changeStateEdit: [],
  //audio events
  decodedAudio: [],
  changedPoz: [],
  changeStateAudio: []
});

let stateEdit = 'add';  // 'delete'

//modelTxt.setVent(vent);
//const audio = new ModelAudio(vent);

model.setArea = (area) => { modelTxt.setRoot(area) };

model.fnTxt = (action) => { modelTxt[action]() };

model.toogleState = () => {
  //modelTxt.toogleState();
}

export default model;
