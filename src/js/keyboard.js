export default setHotKey;

let evs; //var чтобы не было ошибки при повторной встрече

const keyCodes = {
  37: 'arrowLeft',    // <- влево
  39: 'arrowRight',   // -> вправо
  32: 'space',        // _ пробел
   9: 'tab'           // tab
}

setHotKey.init = function() {
  if (evs) {
    console.warn('setHotKey инициализирована');
    return;
  }
  evs = {
    arrowLeft() {},
    arrowRight() {},
    space() {}
  }
  document.onkeydown = keyboardHandler
}

function setHotKey(hotKey, fn) {
  if (!evs) {
    console.warn('setHotKey неинициализирована');
    return;
  }
  evs[hotKey] = fn;
}

function keyboardHandler(ev) {
  //console.log(ev.keyCode);
  const fn = keyCodes[ev.keyCode];
  if (fn) {
    evs[fn]();
   }
}
