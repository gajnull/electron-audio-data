import model from './model/model';

let txt, transl;

const init = () => {
  txt = document.getElementById('txt');
  transl = document.getElementById('transl');
  model.setArea(txt);
  model.setAreaTransl(transl);
  model.on('changeState', changeState);
};

const close = () => {
  model.off('changeState', changeState);
  txt = transl = null;
};

function changeState({ state }) {
  if (state === 'transl') {
    transl.style.display = 'block';
  } else {
    transl.style.display = 'none';
  }
}



const txtArea = {
  init,
  close
}

export default txtArea;
