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


const audio = new ModelAudio();

model.setArea = (area) => { modelTxt.setRoot(area) }

model.fnTxt = (action) => { modelTxt[action]() }
model.fnAudio = (action) => {
  switch (action) {
    case 'tooglePlay':
      tooglePlay();
      break;
    default:
      audio[action]();
  }
  model.publish('changedPoz', audio.getPoz());
}

model.toogleState = () => {
  let interval;   // from - показывает ключевое слово
  if (stateEdit === 'add') {
    interval = modelTxt.gotoToDelete();
    audio.gotoInterval(interval);
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
      model.publish('changedPoz', () => audio.getPoz(true);)
      if (audio.endedTrack()) stopAudio();
    }, 100);
  }

  function stopAudio() {
    audio.stop();
    playing = false;
    model.publish('changedPoz', () => audio.getPoz(true);)  //может это лишнее
    clearInterval(timer);
    if (timerStop) { clearTimeout(timerStop); }
  }

export default model;
