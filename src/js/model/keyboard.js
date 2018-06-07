export default setHotKey;

const evs = {
  arrowLeft() {},
  arrowRight() {},
  space() {},
  tab() {}    
};

const keyCodes = {
  37: 'arrowLeft',    // <- влево
  39: 'arrowRight',   // -> вправо
  32: 'space',        // _ пробел
   9: 'tab'           // tab
}

document.onkeydown = keyboardHandler;

function keyboardHandler(ev) {
  //console.log(ev.keyCode);
  const key = ev.keyCode;
  if(!(key in keyCodes)) return;
  const fn = keyCodes[key];    
  if (!fn) return;
  evs[fn]();
}




function setHotKey(keyName, fn) {
  if (keyName === 'clear') {
    clearAllEvs();
    return;
  }
  if (keyName in evs) {
    evs[hotKey] = fn;
  } else {
    console.warn('Такой клавиши(сочетания клавиш) не предусмотрено');
  }
}
  // очищаем все назначения клавиш
  function clearAllEvs() {
    for (var keyName in evs) {
      evs[keyName] = () => {};
    }
  }






