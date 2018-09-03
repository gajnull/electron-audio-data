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

model.setArea = (area) => { modelTxt.setRoot(area); }

model.setAreaTransl  = (area) => { modelTransl.setRoot(area); }

model.setState = (_state) => {
  modelAudio.stop();
  if (_state === state) return; // наверное это потом уберём
  const countUnits = modelTransl.setState(_state);
  if (_state === 'transl' && countUnits === -1) return; // файл с переводом не загружен
  const pozz = modelTxt.setState(_state, countUnits); // {_from: '0', _to: '0'}
  modelAudio.setPozz(pozz);
  state = _state;
  vent.publish('changeState', {state});
};



////////************  actions ************

model.fnTransl = (act) => {
  modelTransl[act]();
}

model.fnAdd = (action, args) => { // возможно args не понадобится
  if (state === 'delete') model.toogleState();  // если используется клавиатура
  const res = modelAudio[action](args);
  if (action === "setUnit" && res) {  // res = {pozFrom, pozTo} - если выбран звуковой интервал
    const isAdd = modelTxt.setUnit(res);  // isAdd - если выделена область текста, тогда устанавливаем для неё звуковой интервал
    if (isAdd) modelAudio.nextUnit();
  }
  modelAudio.advertPozz();
}

model.fnDelete = (action, args) => { // возможно args не понадобится
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


///////************  Selection  ************

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



///////************    Load   **************

model.setLoadedAudioFile = (file) => { // file: {name, path, content}
  modelAudio.decodeFile(file);
};

model.setLoadedTranslFile = (file) => { // file: {name, path, content}
  modelTransl.setLoadedFile(file);
};

model.setLoadedTxtFile = (file) => { // file: {name, path, content}
  if (state === 'delete') model.setState('add');
  modelTxt.setLoadedFile(file);
}



///////************  Save/Restore ************

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
