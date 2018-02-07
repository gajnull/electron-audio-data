import keyboard from './keyboard';

const areaTxt = {};
let mTxt, mAudio,
    area,
    last,
    selection,
    current;

areaTxt.init = function(model) {
  area = document.getElementById('txt');

  mTxt = model.txt;
  mAudio = model.audio;
  mTxt.on('loadedLngt', loadHandler);
  mTxt.on('saveLngt', () => { //need to replace for named function
    mTxt.save(area.innerHTML);
  });
  mAudio.on('addInterval', addInterval);

  mTxt.getTxt = function() {
    return area.innerHTML;
  };

  keyboard('arrowRight', addSelection);
  keyboard('arrowLeft', reduceSelection);
  keyboard('tab', changeStateTxt);
};

areaTxt.close = function() {
  mTxt.off('loadedLngt', loadHandler);

  keyboard('arrowRight', () => {});
  keyboard('arrowLeft', () => {});
  keyboard('tab', () => {});
};

function loadHandler({content}) {
  area.innerHTML = content
  selection = document.getElementById('selection-txt')
  current = document.getElementById('current-txt')
  mTxt.selection = selection.innerHTML
  mTxt.current = current.innerHTML
  //mAudio.pozMin = getPozMin()
}
  function getPozMin() {
    const span = selection.previousElementSibling
    if (span && span.hasAttribute('to')) return span.getAttribute('to');
    return 0;
  }

function addSelection() {
  mTxt.addSelection()
  setFromModel();
}

function reduceSelection() {
  mTxt.reduceSelection();
  setFromModel();
}

function addInterval({ pozFrom, pozTo }) {
  const span = document.createElement('span');
  span.setAttribute('from', pozFrom);
  span.setAttribute('to', pozTo);
  span.innerHTML = mTxt.selection;
  selection.innerHTML = mTxt.selection = '';
  selection.before(span);
}

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
  mTxt.current += mTxt.selection;
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


function setFromModel() {
  selection.innerHTML = mTxt.selection;
  current.innerHTML = mTxt.current;
}

export default areaTxt;
