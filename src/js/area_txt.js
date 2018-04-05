import keyboard from './keyboard';

const areaTxt = {};
let mTxt, mAudio, mVent, area


areaTxt.init = function({vent, txt, audio}) {
  area = document.getElementById('txt');

  mVent = vent;
  mTxt = txt;
  mTxt.setRoot(area);
  mAudio = audio;

  mVent.on('loadedLngt', setPozAudio);
  //mAudio.on('addInterval', addInterval)

  keyboard('arrowRight', addSelection);
  keyboard('arrowLeft', reduceSelection);
  keyboard('tab', toogleState);
};

areaTxt.close = function() {
  //mAudio.off('addInterval', addInterval)
  mVent.off('loadedLngt', setPozAudio);

  keyboard('arrowRight', () => {});
  keyboard('arrowLeft', () => {});
  keyboard('tab', () => {});
};

function setPozAudio({poz}) {
  mAudio.setStartPoz(poz);
}

//////////////////////////
function addSelection() {
  mTxt.addSelection()
}

function reduceSelection() {
  mTxt.reduceSelection()
}

function toogleState() {
  mTxt.toogleState()
}



export default areaTxt;
