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
let playing = false;
let timer = null;
let timerStop = null;

/////////const audio = new ModelAudio();

model.setArea = (area) => { modelTxt.setRoot(area); }

model.fnTxt = (action, args) => { modelTxt[action](args); }

model.fnAudio = (action) => {
  switch (action) {
    case 'tooglePlay':
      tooglePlay();
      break;
    default:
      if(!playing) audio[action]();
  }
  const pozz = audio.getPoz();
  model.publish('changedPoz', pozz);
}

model.setLoadedFile = (file) => {
  modelTxt.setLoadedFile(file);
  model.publish('loadedLngt', file);
}

model.save = (name) => {
  if (stateEdit === 'delete') model.toogleState();
  modelTxt.save(name);
  model.publish('savedLngt', {stateEdit});
}


model.toogleState = () => {
  if (stateEdit === 'add') {
    const interval = modelTxt.gotoToDelete();   // from - показывает ключевое слово
    if(!interval) return;
    audio.assignInterval(interval);
    stateEdit = 'delete';
  } else {
    modelTxt.gotoToAdd();
    audio.nextInterval();
    stateEdit = 'add';
  }
  model.publish('changeStateEdit', {stateEdit});
}

function tooglePlay() {
  if (playing) {
    playAudio();
  } else {
    stopAudio();
  }
  model.publish('changeStateAudio', { playing });
}

  function playAudio() {
    audio.play();
    playing = true;
    timer = setInterval(() => {
      model.publish('changedPoz', audio.getPoz(true));
      if (audio.endedTrack()) stopAudio();
    }, 100);
  }

  function stopAudio() {
    audio.stop();
    playing = false;
    model.publish('changedPoz', audio.getPoz(true))  //может это лишнее
    clearInterval(timer);
    if (timerStop) { clearTimeout(timerStop); }
  }

export default model;
