export default setHotKey;

const evs = {
  arrowLeft() {},
  arrowRight() {},
  space() {},
  tab() {},
  //altSpace() {}, // срабатывает событие окна
  shiftSpace() {},
  ctrlSpace() {},
  shiftTab() {},
  f2() {}
};

const keyCodes = {
  37: 'arrowLeft',    // <- влево
  39: 'arrowRight',   // -> вправо
  32: 'space',        // _ пробел
   9: 'tab',          // tab
 113: 'f2'            // F2 - пока не используется
}

document.onkeydown = keyboardHandler;

function keyboardHandler(ev) {
  //console.log(ev.keyCode);
  const key = ev.keyCode;
  if(key in keyCodes) {
    ev.preventDefault();
    //ev.stopPropagation()
    let fn = keyCodes[key];
    if (!fn) return;
    if (ev.ctrlKey) fn = 'ctrl' + fn[0].toUpperCase() + fn.slice(1);  // i.e. 'space' -> 'ctrlSpace'
    //if (ev.altKey) fn = 'alt' + fn[0].toUpperCase() + fn.slice(1);
    if (ev.shiftKey) fn = 'shift' + fn[0].toUpperCase() + fn.slice(1);
    if (fn in evs) evs[fn]();
  }
}



function setHotKey(keyName, fn) {
  if (keyName === 'clear') {
    clearAllEvs();
    return;
  }
  if (keyName in evs) {
    evs[keyName] = fn;
  } else {
    console.warn('Такой клавиши: ' + keyName + '(сочетания клавиш) не предусмотрено');
  }
}
  // очищаем все назначения клавиш
  function clearAllEvs() {
    for (var keyName in evs) {
      evs[keyName] = () => {};
    }
  }
