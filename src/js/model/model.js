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


vent.on('loadedFile', ({type, startPoz}) => { 
  if (type === 'lngt') modelAudio.setStartPoz(startPoz); 
}); 

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



////////************ state-actions ************

model.fnAdd = (act, args) => { // возможно args не понадобится
  if (state !== 'add') return;
  const res = modelAudio[act](args);
  if (act === "setUnit" && res) {  // res = {pozFrom, pozTo} - если выбран звуковой интервал
    const isAdd = modelTxt.setUnit(res);  // isAdd - если выделена область текста, тогда устанавливаем для неё звуковой интервал
    if (isAdd) modelAudio.nextUnit();
  }
  modelAudio.advertPozz();
}

model.fnDelete = (act, args) => { // возможно args не понадобится
  if (state !== 'delete') return;
  if (act === "repeate") modelAudio[act](args);
  if (act === "cleare") {
    const interval = modelTxt.deleteUnit();  //
    if (interval) {
      modelAudio.assignInterval(interval);
    } else {
      model.setState('add');
    }
  }
  modelAudio.advertPozz();
}

model.fnTransl = (act) => {
  if (state !== 'transl') return;
  let arg;
  if (act === 'offer') arg = modelTxt.getSelTransl();
  const countUnits = modelTransl[act](arg);
  if (countUnits !== -1 && act === 'setUnit') modelTxt.setSelectionTransl(countUnits);
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



///////************  Load/Save/Restore ************

model.setLoadedFile = (file) => {
  if (file.type === 'mp3') modelAudio.decodeFile(file);
  if (file.type === 'lngt') modelTxt.setLoadedFile(file);
  if (file.type === 'transl') modelTransl.setLoadedFile(file);
};

model.save = () => {
  if (state === 'add') modelTxt.save();
  if (state === 'transl') modelTransl.save();
  if (state === 'delete') model.popup('Перейдите в режим редактирования или перевода', 2000);
};

model.restore = () => {
  modelTxt.restore();
  modelTransl.restore();
  modelAudio.restore(); // если аудио загружено, то оставляем как есть
};

model.make = () => {
  if (state === 'add') modelTxt.make();
  if (state === 'transl') modelTransl.make();
  if (state === 'delete') model.popup('Перейдите в режим редактирования или перевода', 2000);
};


//////
model.popup = (msg, duration) => {
  vent.publish('popup', {msg, duration});
}

export default model;
