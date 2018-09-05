//управление сохранением и восстановлением текстового файла .lngt
import model from './model/model';
import setHotKey from './model/keyboard';

const hotKeys = {
	init: () => {
		setHotKey('arrowLeft', () => { model.reduceSelection(); });
		setHotKey('arrowRight', () => { model.addSelection(); });
    setHotKey('space', handlerSpace);
    setHotKey('tab',handlerTab);
    setHotKey('ctrlSpace', handlerCtrlSpace);
   // setHotKey('shiftSpace', () => { ; });
    //setHotKey('shiftTab', () => { ; });
 	},

	close: () => {
		setHotKey('clear');
	}
};

// *** срабатывать будет только та функция в обработчике, которая соответствует state

function handlerSpace() {
  model.fnAdd('tooglePlay');
  model.fnDelete('repeate'); // as well as 'ctrlSpace'
  model.fnTransl('offer');
}

function handlerTab() {
  model.fnAdd('setUnit');
  model.fnDelete('cleare');
  model.fnTransl('setUnit');
}

function handlerCtrlSpace() {
  model.fnAdd('repeate');
  model.fnDelete('repeate');
}


export default hotKeys;
