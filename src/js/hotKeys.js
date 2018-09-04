//управление сохранением и восстановлением текстового файла .lngt
import model from './model/model';
import setHotKey from './model/keyboard';

const hotKeys = {
	init: () => {
		setHotKey('arrowLeft', () => { model.reduceSelection(); });
		setHotKey('arrowRight', () => { model.addSelection(); });
    setHotKey('space', () => { model.fnAll('tooglePlay'); });
    setHotKey('tab', () => { model.fnAll('setUnit'); });
    setHotKey('ctrlSpace', () => { model.fnAll('repeate'); });
   // setHotKey('shiftSpace', () => { ; });
    //setHotKey('shiftTab', () => { ; });
 	},

	close: () => {
		setHotKey('clear');
	}
};

export default hotKeys;
