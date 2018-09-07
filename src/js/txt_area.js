import model from './model/model';

let txt, transl, popup;

const init = () => {
  txt = document.getElementById('txt');
  transl = document.getElementById('transl');
  popup = document.getElementById('popup'); 
  model.setArea(txt);
  model.setAreaTransl(transl);
  model.on('changeState', changeState);
  model.on('popup', popupNotification);
  txt.addEventListener('click', handlerTxt);
};

const close = () => {
  model.off('changeState', changeState);
  model.off('popup', popupNotification);
  txt.removeEventListener('click', handlerTxt); 
  txt = transl = null;
};

function changeState({ state }) {
  if (state === 'transl') {
    transl.style.display = 'block';
  } else {
    transl.style.display = 'none';
  }
}

function popupNotification(msg) {
  popup.innerHTML = msg;
  popup.style.display = 'block';
  setTimeout(() => {
    popup.style.display = 'none';
    popup.innerHTML = '';
  }, 2000);
}

function handlerTxt(e) {
  model.popup('Выделение управляется стрелками вправо и влево');
}


const txtArea = {
  init,
  close
}

export default txtArea;
