//управление сохранением и восстановлением текстового файла .lngt
import model from './model/model';
import setHotKey from './model/keyboard';

const hotKeys = {
  init: () => {
    setHotKey('arrowLeft', () => { model.fnTxt('reduceSelection'); });
    setHotKey('arrowRight', () => { model.fnTxt('addSelection'); });
    setHotKey('space', () => {  });
    setHotKey('tab', () => { model.toogleState(); });    
  },

  close: () => {
    setHotKey('clear');
  }
};

export default hotKeys;