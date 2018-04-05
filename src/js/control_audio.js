
import keyboard from './keyboard'

const controlAudio = {};

let mTxt, mAudio, mVent, btns, intervals, btnPlay;

controlAudio.init = function({vent, txt, audio}) {
  mTxt = txt;
  mAudio = audio;
  mVent = vent;

  btns = document.getElementById('btns');
  intervals = document.getElementById('edit-intervals');
  btnPlay = btns.querySelector('button[act="tooglePlay"]');

  vent.on('changeStateEdit', changeStateEdit);  //меняем набор кнопок
  vent.on('decodedAudio', handlerDecoded);
  vent.on('changeStateAudio', changeBtnPlay); //меняем кнопку stop/play
};

controlAudio.close = function() {
  vent.off('decodedAudio', handlerDecoded);
  vent.off('changeStateAudio', changeBtnPlay);
  vent.off('changeStateEdit', changeStateEdit);
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
