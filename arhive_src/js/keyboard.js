export default function getKeyboard() {
  const res = {}
  const evs = {
    addSelection() {},
    reduceSelection() {}
  }

  document.addEventListener('keydown', keyboardHandler)

  function keyboardHandler(ev) {
    const keyCode = ev.keyCode
    // -> вправо
    if(keyCode === 39) {
      evs.addSelection();
      return;
    }
    // <- влево
    if(keyCode === 37) {
      evs.reduceSelection();
      return;
    }
  }


  res.addKeyHandler = (ev, fn)=> {
    if (typeof fn !== 'function') return;
    if(evs[ev]) evs[ev] = fn
  }

  res.close = function() {
    document.removeEventListener('keydown', keyboardHandler)
  }

  return res;
}
