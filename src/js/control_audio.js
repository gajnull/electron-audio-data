import model from './model/model';
import keyboard from './keyboard';

const controlAudio = {};

let btns, intervals, btnPlay;

controlAudio.init = function() {
  btns = document.getElementById('btns');
  intervals = document.getElementById('edit-intervals');
  btnPlay = btns.querySelector('button[act="tooglePlay"]');

  model.on('changeStateEdit', changeStateEdit);  //меняем набор кнопок
  model.on('decodedAudio', handlerDecoded);
  model.on('changeStateAudio', changeBtnPlay); //меняем кнопку stop/play
};

controlAudio.close = function() {
  model.off('decodedAudio', handlerDecoded);
  model.off('changeStateAudio', changeBtnPlay);
  model.off('changeStateEdit', changeStateEdit);
  keyboard('space', () => {});
  btns.onclick = '';
  btns = null;
}

function handlerDecoded() {
  keyboard('space', () => { model.tooglePlay() });
  btns.onclick = function(event) {
    const target = event.target
    if (target.hasAttribute('act')) {
      target.blur(); //убираем фокусировку, чтобы пробел не срабатывал как нажатие на кнопку
      const attr = target.getAttribute('act');
      model.fnAudio(attr);
      // switch (attr) {
      //   case 'addInterval':
      //     const b = txt.addInterval(audio.getInterval());
      //     if (b) audio.nextInterval();
      //     break;
      //   default:
      //     audio[attr]();
      // }
    }
  };
}

function changeBtnPlay({ playing }) {
  if (playing) {
    btnPlay.innerHTML = 'Stop';
  } else {
    btnPlay.innerHTML = 'Play';
  }
}

function changeStateEdit({ stateEdit }) {
  if (stateEdit === 'add interval') {
    btns.style.display = 'flex';
    intervals.style.display = 'none';
    //audio.nextInterval();
  } else {
    btns.style.display = 'none';
    intervals.style.display = 'flex';
    //audio.gotoInterval(_from, _to);
  }
}

export default controlAudio;
