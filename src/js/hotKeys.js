//управление сохранением и восстановлением текстового файла .lngt
import model from './model/model';
import setHotKey from './model/keyboard';

const hotKeys = {
	init: () => {
		setHotKey('arrowLeft', () => { model.fnTxtSelection('reduceSelection'); });
		setHotKey('arrowRight', () => { model.fnTxtSelection('addSelection'); });
    setHotKey('space', () => { model.fnAudio('tooglePlay'); });
    setHotKey('alt', () => { model.fnAudio('repeate'); });
    setHotKey('tab', () => { model.fnAudio('setUnit'); });  
    setHotKey('f2', () => { model.toogleState(); });
 	},

	close: () => {
		setHotKey('clear');
	}
};

export default hotKeys;