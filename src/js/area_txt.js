import keyboard from './keyboard';

const areaTxt = {};
let mTxt, mAudio, area


areaTxt.init = function(model) {
  area = document.getElementById('txt');

  mTxt = model.txt
  mTxt.setRoot(area)
  mAudio = model.audio
  mAudio.on('addInterval', addInterval)

  mTxt.getData = function() { // для сохранения
    if (mTxt.stateEdit === 'delete interval') return;
    mTxt.cleareSelection();
    return area.innerHTML;
  };

  keyboard('arrowRight', addSelection);
  keyboard('arrowLeft', reduceSelection);
  keyboard('tab', changeStateTxt);
};

areaTxt.close = function() {
  mAudio.off('addInterval', addInterval);

  keyboard('arrowRight', () => {});
  keyboard('arrowLeft', () => {});
  keyboard('tab', () => {});
};



//////////////////////////
function addSelection() {
  if (mTxt.stateEdit === 'delete interval') return; //не очень правильный вариант
  mTxt.addSelection()
}

function reduceSelection() {
  if (mTxt.stateEdit === 'delete interval') return;
  mTxt.reduceSelection()
}

function cleareSelection() {
  mTxt.cleareSelection()
}

//////////////////////////
function addInterval({ pozFrom, pozTo }) {
  if (mTxt.stateEdit === 'delete interval') return;
  const span = document.createElement('span');
  span.setAttribute('from', pozFrom);
  span.setAttribute('to', pozTo);
  span.innerHTML = mTxt.selection;
  selection.innerHTML = mTxt.selection = '';
  selection.before(span);
}



////////////////////////////
function changeStateTxt() {
  if (mTxt.stateEdit === 'add interval') {
    if (!setStateDelete()) return;  // если ни одного интервала ещё не установлено
    mTxt.stateEdit = 'delete interval';
    mTxt.publish('changeStateEdit');
  } else {
    setStateAdd();
    mTxt.stateEdit = 'add interval';
    mTxt.publish('changeStateEdit');
  }
}

function setStateDelete() { // устанавливает ...
  last = selection.previousSibling;
  if (!last) return false;
  last.id = 'last-txt';
  mTxt.current = mTxt.selection + mTxt.current;
  mTxt.selection = '';
  mTxt.last = last.innerHTML;
  setFromModel();
  mAudio.pozFrom = + last.getAttribute('from');
  mAudio.pozTo = + last.getAttribute('to');
  mAudio.pozCurrent = mAudio.pozMin = mAudio.pozFrom;
  mAudio.changePoz();
  return true;
}

function setStateAdd() {
  mTxt.last = '';
  last.removeAttribute('id');
  mAudio.pozFrom = mAudio.pozCurrent = mAudio.pozFrom = mAudio.pozTo;
  mAudio.changePoz();
  last = null;
}



// function saveLngt() {
//   mTxt.save(area.innerHTML);
// }


export default areaTxt;
