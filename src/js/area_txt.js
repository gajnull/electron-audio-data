import keyboard from './keyboard';

const areaTxt = {};
let mTxt, mAudio, area


areaTxt.init = function({txt, audio}) {
  area = document.getElementById('txt');

  mTxt = txt;
  mTxt.setRoot(area);
  mAudio = audio;

  mTxt.on('loadedLngt', setPozAudio);
  //mAudio.on('addInterval', addInterval)

  keyboard('arrowRight', addSelection);
  keyboard('arrowLeft', reduceSelection);
  keyboard('tab', toogleState);
};

areaTxt.close = function() {
  //mAudio.off('addInterval', addInterval)
  mTxt.off('loadedLngt', setPozAudio);

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

//////////////////////////
//
// function setStateAdd() {
//   mTxt.last = '';
//   last.removeAttribute('id');
//   mAudio.pozFrom = mAudio.pozCurrent = mAudio.pozFrom = mAudio.pozTo;
//   mAudio.changePoz();
//   last = null;
// }


export default areaTxt;
