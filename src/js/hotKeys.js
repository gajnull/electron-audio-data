//управление сохранением и восстановлением текстового файла .lngt
import model from './model/model';
import setHotKey from './model/keyboard';

const hotKeys = {
	init: () => {
		setHotKey('arrowLeft', () => { model.fnTxtSelection('reduceSelection'); });
		setHotKey('arrowRight', () => { model.fnTxtSelection('addSelection'); });
		setHotKey('space', () => { model.fnAudio('tooglePlay') });
		setHotKey('tab', () => { model.toogleState(); });
	},

	close: () => {
		setHotKey('clear');
	}
};

export default hotKeys;