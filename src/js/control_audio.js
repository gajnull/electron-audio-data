import model from './model/model';

const controlAudio = {};

let btns, intervals, transl, btnPlay;
controlAudio.init = function() {
  btns = document.getElementById('btns');
  intervals = document.getElementById('btns-intervals');
  transl = document.getElementById('btns-transl');
  btnPlay = btns.querySelector('button[act="tooglePlay"]');

  model.on('changeState', changeState);  //меняем набор кнопок
  model.on('decodedAudio', handlerDecoded);
  model.on('changeStateAudio', changeBtnPlay); //меняем кнопку stop/play
};

controlAudio.close = function() {
  model.off('decodedAudio', handlerDecoded);
  model.off('changeStateAudio', changeBtnPlay);
  model.off('changeState', changeState);
  btns.onclick = '';
  btns = null;
};

function handlerDecoded() {
  btns.onclick = function(event) {
    const target = event.target
    if (target.hasAttribute('act')) {
      target.blur(); //убираем фокусировку, чтобы пробел не срабатывал как нажатие на кнопку
      const attr = target.getAttribute('act');
      model.fnAudio(attr);
    }
  };
  intervals.onclick = function(event) {
    const target = event.target
    if (target.hasAttribute('act')) {
      target.blur(); //убираем фокусировку, чтобы пробел не срабатывал как нажатие на кнопку
      const attr = target.getAttribute('act');
      model.fnEditAudio(attr);
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

function changeState({ state }) {
  btns.style.display = (state === 'add') ? 'flex' : 'none';
  intervals.style.display = (state === 'delete') ? 'flex' : 'none';
  transl.style.display = (state === 'transl') ? 'flex' : 'none';
}

export default controlAudio;
