//export const something = 'test'
import vent from './vent';
import modelAudio from './modelAudio';
import modelTxt from './modelTxt';

const model = {
  on: vent.on, // в vent.on this не используется
  off: vent.off
};

let stateEdit = 'add',  // 'delete'
  playing = false,
  timer = null,
  timerStop = null;

//////// Txt

model.setArea = (area) => { modelTxt.setRoot(area); }

model.fnTxtSelection = (action) => {
  if(stateEdit === 'delete') return;
  modelTxt[action]();
}

// действия, совершаемые при stateEdit === 'add'
model.fnTxt = (action, args) => {
  if (stateEdit === 'delete') model.toogleState();
  modelTxt[action](args);
}

// действия, совершаемые при stateEdit === 'delete'
model.fnTxtDelete = (action, args) => {
  if (stateEdit === 'add') model.toogleState();
  modelTxt[action](args);
}

model.setLoadedTxtFile = (file) => { // file: {name, path, size, content}
  if (stateEdit === 'delete') model.toogleState();
  const startPoz = modelTxt.setLoadedFile(file);
  modelAudio.setStartPoz(startPoz);
  vent.publish('loadedLngt', file);
}


model.toogleState = () => {
  if (stateEdit === 'add') {
    const interval = modelTxt.gotoToDelete();   // from - показывает ключевое слово
    if(!interval) return;
    modelAudio.assignInterval(interval);
    stateEdit = 'delete';
  } else {
    modelTxt.gotoToAdd();
    modelAudio.nextUnit();
    stateEdit = 'add';
  }
  vent.publish('changeStateEdit', {stateEdit});
}

/////// Audio

model.setLoadedAudioFile = (file) => { // file: {name, path, size, content}
  modelAudio.decodeFile(file);
}


model.fnAudio = (action, args) => { // возможно args не понадобится
  if (stateEdit === 'delete') model.toogleState();  // если используется клавиатура
  const res = modelAudio[action](args);
  if (action === "setUnit" && res) {  // res = {pozFrom, pozTo} - если выбран звуковой интервал
    const isAdd = modelTxt.setUnit(res);  // isAdd - если выделена область текста, тогда устанавливаем для неё звуковой интервал
    if (isAdd) modelAudio.nextUnit();
  }
  modelAudio.advertPozz();
}

model.fnEditAudio = (action, args) => { // возможно args не понадобится
  if (stateEdit === 'add') model.toogleState();  // если используется клавиатура
  const metod = action + 'Edit';
  const res = modelAudio[metod](args);  

  modelAudio.advertPozz();
}




export default model;
