
import keyboard from './keyboard'

const controlAudio = {};

let mTxt, mAudio, btns, intervals, btnPlay;

controlAudio.init = function({txt, audio}) {
  mTxt = txt;
  mAudio = audio;

  btns = document.getElementById('btns');
  intervals = document.getElementById('edit-intervals');
  btnPlay = btns.querySelector('button[act="tooglePlay"]');

  mTxt.on('changeStateEdit', changeStateEdit);  //меняем набор кнопок
  mAudio.on('decodedAudio', handlerDecoded);
  mAudio.on('changeStateAudio', changeBtnPlay); //меняем кнопку stop/play
};

controlAudio.close = function() {
  mAudio.off('decodedAudio', handlerDecoded);
  mAudio.off('changeStateAudio', changeBtnPlay);
  mTxt.off('changeStateEdit', changeStateEdit);
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
          const b = mTxt.addInterval(mAudio.getInterval());
          if (b) mAudio.nextInterval();
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

function changeStateEdit({stateEdit, _from, _to}) {
  if (stateEdit === 'add interval') {
    btns.style.display = 'flex';
    intervals.style.display = 'none';
    mAudio.nextInterval();
  } else {
    btns.style.display = 'none';
    intervals.style.display = 'flex';
    mAudio.gotoInterval(_from, _to);
  }
}

export default controlAudio
