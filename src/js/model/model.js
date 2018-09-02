//export const something = 'test'
import vent from './vent';
import modelAudio from './modelAudio';
import modelTxt from './modelTxt';
import modelTransl from './modelTransl';

const model = {
  on: vent.on, // в vent.on this не используется
  off: vent.off
};

let state = 'add',  // 'delete'/'transl'
  playing = false,
  timer = null,
  timerStop = null;

vent.on('loadedLngt', ({startPoz}) => { modelAudio.setStartPoz(startPoz); }); // это можно в modelTxt


model.setState = (_state) => {
  modelAudio.stop();
  if (_state === state) return; // наверное это потом уберём
  const countUnits = modelTransl.setState(_state);
  const pozz = modelTxt.setState(_state, countUnits); // {_from: '0', _to: '0'}
  modelAudio.setPozz(pozz);
  state = _state;
  vent.publish('changeState', {state});
};

/*

function setStateDelete() {
  const interval = modelTxt.setStateDelete();   // from - показывает ключевое слово
  if(!interval) return;
  modelAudio.assignInterval(interval);
}

function setStateTransl() {
  const num = modelTransl.setStateTransl();
  modelTxt.setStateTransl(num);
}
*/


////////************  Txt ************

model.setArea = (area) => { modelTxt.setRoot(area); }
/*
model.fnTxtSelection = (action) => {
  if(state === 'delete') return;
  modelTxt[action]();
}*/

model.addSelection = () => {
  if(state === 'delete') return;
  if(state === 'add') modelTxt.addSelection();
  if(state === 'transl') modelTransl.addSelection();
};

model.reduceSelection = () => {
  if(state === 'delete') return;
  if(state === 'add') modelTxt.reduceSelection();
  if(state === 'transl') modelTransl.reduceSelection();
};

// действия, совершаемые при state === 'add'
model.fnTxt = (action, args) => {
  if (state === 'delete') model.toogleState();
  modelTxt[action](args);
}

// действия, совершаемые при state === 'delete'
model.fnTxtDelete = (action, args) => {
  if (state === 'add') model.toogleState();
  modelTxt[action](args);
}

model.setLoadedTxtFile = (file) => { // file: {name, path, content}
  if (state === 'delete') model.setState('add');
  modelTxt.setLoadedFile(file);
}



////////************  Transl ************
model.setAreaTransl  = (area) => { modelTransl.setRoot(area); }

model.setLoadedTranslFile = (file) => { // file: {name, path, content}
  modelTransl.setLoadedFile(file);
}

model.fnTransl = (act) => {}


///////************  Audio ************

model.setLoadedAudioFile = (file) => { // file: {name, path, content}
  modelAudio.decodeFile(file);
}


model.fnAudio = (action, args) => { // возможно args не понадобится
  if (state === 'delete') model.toogleState();  // если используется клавиатура
  const res = modelAudio[action](args);
  if (action === "setUnit" && res) {  // res = {pozFrom, pozTo} - если выбран звуковой интервал
    const isAdd = modelTxt.setUnit(res);  // isAdd - если выделена область текста, тогда устанавливаем для неё звуковой интервал
    if (isAdd) modelAudio.nextUnit();
  }
  modelAudio.advertPozz();
}

model.fnEditAudio = (action, args) => { // возможно args не понадобится
  //if (state === 'add') model.toogleState();  // если используется клавиатура
  if (action === "repeate") modelAudio[action](args);
  if (action === "cleare") {
    const interval = modelTxt.deleteUnit();  //
    if (interval) {
      modelAudio.assignInterval(interval);
    } else {
      model.toogleState();
    }
  }
  modelAudio.advertPozz();
}


///////************  save/restore ************

model.save = () => {
  modelTxt.save();
  modelTransl.save();
}

model.restore = () => {
  modelTxt.restore();
  modelTransl.restore();
  modelAudio.restore(); // если аудио загружено, то оставляем как есть
}

export default model;
