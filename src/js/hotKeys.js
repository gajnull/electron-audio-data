//управление сохранением и восстановлением текстового файла .lngt
import model from './model/model';
import setHotKey from './model/keyboard';

const hotKeys = {
	init: () => {
		setHotKey('arrowLeft', () => { model.fnTxtSelection('reduceSelection'); });
		setHotKey('arrowRight', () => { model.fnTxtSelection('addSelection'); });
    setHotKey('space', () => { model.fnAudio('tooglePlay'); });
    setHotKey('ctrlSpace', () => { model.fnAudio('repeate'); });
    setHotKey('shiftSpace', () => { model.fnAudio('setUnit'); });
    setHotKey('tab', () => { model.toogleState('edit'); });
    setHotKey('shiftTab', () => { model.toogleState('transl'); });
 	},

	close: () => {
		setHotKey('clear');
	}
};

export default hotKeys;
