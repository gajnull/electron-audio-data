import keyboard from './keyboard';

const areaTxt = {};
let model, area;


areaTxt.init = function(_model) {
  model = _model;

  area = document.getElementById('txt');
  model.setArea(area);

  ////model.on('loadedLngt', setPozAudio);
  //mAudio.on('addInterval', addInterval)

  keyboard('arrowRight', addSelection);
  keyboard('arrowLeft', reduceSelection);
  keyboard('tab', toogleState);
};

areaTxt.close = function() {
  //mAudio.off('addInterval', addInterval)
  ////model.off('loadedLngt', setPozAudio);

  keyboard('arrowRight', () => {});
  keyboard('arrowLeft', () => {});
  keyboard('tab', () => {});
};

// function setPozAudio({poz}) {
//   mAudio.setStartPoz(poz);
// }

//////////////////////////
function addSelection() {
  model.fnTxt('addSelection');
}

function reduceSelection() {
  model.fnTxt('reduceSelection');
}

function toogleState() {
  model.toogleState()
}



export default areaTxt;
