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

model.fnTxt = (action, args) => {
  modelTxt[action](args);
}

model.setLoadedTxtFile = (file) => { // file: {name, path, size, content}
  const startPoz = modelTxt.setLoadedFile(file);
  modelAudio.setStartPoz(startPoz);
  vent.publish('loadedLngt', file);
}

model.save = (name) => {
  if (stateEdit === 'delete') model.toogleState();
  modelTxt.save(name);
}

model.toogleState = () => {
  if (stateEdit === 'add') {
    const interval = modelTxt.gotoToDelete();   // from - показывает ключевое слово
    if(!interval) return;
    modelAudio.assignInterval(interval);
    stateEdit = 'delete';
  } else {
    modelTxt.gotoToAdd();
    modelAudio.nextInterval();
    stateEdit = 'add';
  }
  vent.publish('changeStateEdit', {stateEdit});
}

/////// Audio

model.setLoadedAudioFile = (file) => { // file: {name, path, size, content}
  modelAudio.decodeFile(file);
}

model.fnAudio = (action, args) => {
  switch (action) {
    case 'tooglePlay':
      tooglePlay();
      break;
    default:
      if(!playing) modelAudio[action](args);
  }
  const pozz = modelAudio.getPoz();
  vent.publish('changedPoz', pozz);
}

function tooglePlay() {
  if (playing) {
    playAudio();
  } else {
    stopAudio();
  }
  vent.publish('changeStateAudio', { playing });
}

  function playAudio() {
    modelAudio.play();
    playing = true;
    timer = setInterval(() => {
      vent.publish('changedPoz', modelAudio.getPoz(true));
      if (modelAudio.endedTrack()) stopAudio();
    }, 100);
  }

  function stopAudio() {
    modelAudio.stop();
    playing = false;
    vent.publish('changedPoz', modelAudio.getPoz(true))  //может это лишнее
    clearInterval(timer);
    if (timerStop) { clearTimeout(timerStop); }
  }

export default model;
