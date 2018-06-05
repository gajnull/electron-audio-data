//export const something = 'test'
import vent from './vent';
import ModelAudio from './modelAudio';
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

model.fnTxt = (action, args) => { modelTxt[action](args); }

model.setLoadedFile = (file) => { // file: {name, path, size, content}
  modelTxt.setLoadedFile(file);
  vent.publish('loadedLngt', file);
}

model.save = (name) => {
  if (stateEdit === 'delete') model.toogleState();
  modelTxt.save(name);
  //vent.publish('savedLngt', {stateEdit});
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
  vent.publish('changeStateEdit', {stateEdit});
}

/////// Audio

model.fnAudio = (action) => {
  switch (action) {
    case 'tooglePlay':
      tooglePlay();
      break;
    default:
      if(!playing) audio[action]();
  }
  const pozz = audio.getPoz();
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
    audio.play();
    playing = true;
    timer = setInterval(() => {
      vent.publish('changedPoz', audio.getPoz(true));
      if (audio.endedTrack()) stopAudio();
    }, 100);
  }

  function stopAudio() {
    audio.stop();
    playing = false;
    vent.publish('changedPoz', audio.getPoz(true))  //может это лишнее
    clearInterval(timer);
    if (timerStop) { clearTimeout(timerStop); }
  }

export default model;
