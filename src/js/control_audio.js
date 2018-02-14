
import keyboard from './keyboard'

const controlAudio = {};

let mTxt, mAudio, btns, intervals, btnPlay;

controlAudio.init = function({txt, audio}) {
  mTxt = txt;
  mAudio = audio;
  mAudio.on('decodedAudio', handlerDecoded);
  mAudio.on('changeStateAudio', changeBtnPlay); //меняем кнопку stop/play
  mTxt.on('changeStateEdit', changeStateEdit);  //меняем набор кнопок
  //mAudio.on('addInterval', );
  btns = document.getElementById('btns');
  intervals = document.getElementById('edit-intervals');
  btnPlay = btns.querySelector('button[act="tooglePlay"]');
};

controlAudio.close = function() {
  mAudio.off('decodedAudio', handlerDecoded);
  mAudio.off('changeStateAudio', changeBtnPlay);
  mTxt.on('changeStateEdit', changeStateEdit);
  keyboard('space', () => {});
  btns.onclick = '';
  btns = null;
}

function handlerDecoded() {
  keyboard('space', () => { mAudio.tooglePlay() });
  btns.onclick = function(event) {
    const target = event.target
    if (target.hasAttribute('act')) {
      target.blur(); //убираем фокусировку, чтобы пробел не срабатывал как нажатие на кнопку
      const attr = target.getAttribute('act');
      switch (attr) {
        case 'addInterval':
          if (mTxt.selection.trim() !== '') { mAudio[attr](); }
          break;
        case 'resetInterval':
          //
          break;
        default:
          mAudio[attr]();
      }
    }
  };
}

function changeBtnPlay() {
  if (mAudio.playing) {
    btnPlay.innerHTML = 'Stop';
  } else {
    btnPlay.innerHTML = 'Play';
  }
}

function changeStateEdit() {
  if (mTxt.stateEdit === 'add interval') {
    btns.style.display = 'flex';
    intervals.style.display = 'none';
  } else {
    btns.style.display = 'none';
    intervals.style.display = 'flex';
  }
}

export default controlAudio
