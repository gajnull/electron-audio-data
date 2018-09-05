/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vent__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modelAudio__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modelTxt__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modelTransl__ = __webpack_require__(13);
//export const something = 'test'





var model = {
  on: __WEBPACK_IMPORTED_MODULE_0__vent__["a" /* default */].on, // в vent.on this не используется
  off: __WEBPACK_IMPORTED_MODULE_0__vent__["a" /* default */].off
};

var state = 'add',
    // 'delete'/'transl'
playing = false,
    timer = null,
    timerStop = null;

__WEBPACK_IMPORTED_MODULE_0__vent__["a" /* default */].on('loadedLngt', function (_ref) {
  var startPoz = _ref.startPoz;
  __WEBPACK_IMPORTED_MODULE_1__modelAudio__["a" /* default */].setStartPoz(startPoz);
}); // это можно в modelTxt

model.setArea = function (area) {
  __WEBPACK_IMPORTED_MODULE_2__modelTxt__["a" /* default */].setRoot(area);
};

model.setAreaTransl = function (area) {
  __WEBPACK_IMPORTED_MODULE_3__modelTransl__["a" /* default */].setRoot(area);
};

model.setState = function (_state) {
  __WEBPACK_IMPORTED_MODULE_1__modelAudio__["a" /* default */].stop();
  if (_state === state) return; // наверное это потом уберём
  var countUnits = __WEBPACK_IMPORTED_MODULE_3__modelTransl__["a" /* default */].setState(_state);
  if (_state === 'transl' && countUnits === -1) return; // файл с переводом не загружен
  var pozz = __WEBPACK_IMPORTED_MODULE_2__modelTxt__["a" /* default */].setState(_state, countUnits); // {_from: '0', _to: '0'}
  __WEBPACK_IMPORTED_MODULE_1__modelAudio__["a" /* default */].setPozz(pozz);
  state = _state;
  __WEBPACK_IMPORTED_MODULE_0__vent__["a" /* default */].publish('changeState', { state: state });
};

////////************ state-actions ************

model.fnAdd = function (act, args) {
  // возможно args не понадобится
  if (state !== 'add') return;
  var res = __WEBPACK_IMPORTED_MODULE_1__modelAudio__["a" /* default */][act](args);
  if (act === "setUnit" && res) {
    // res = {pozFrom, pozTo} - если выбран звуковой интервал
    var isAdd = __WEBPACK_IMPORTED_MODULE_2__modelTxt__["a" /* default */].setUnit(res); // isAdd - если выделена область текста, тогда устанавливаем для неё звуковой интервал
    if (isAdd) __WEBPACK_IMPORTED_MODULE_1__modelAudio__["a" /* default */].nextUnit();
  }
  __WEBPACK_IMPORTED_MODULE_1__modelAudio__["a" /* default */].advertPozz();
};

model.fnDelete = function (act, args) {
  // возможно args не понадобится
  if (state !== 'delete') return;
  if (act === "repeate") __WEBPACK_IMPORTED_MODULE_1__modelAudio__["a" /* default */][act](args);
  if (act === "cleare") {
    var interval = __WEBPACK_IMPORTED_MODULE_2__modelTxt__["a" /* default */].deleteUnit(); //
    if (interval) {
      __WEBPACK_IMPORTED_MODULE_1__modelAudio__["a" /* default */].assignInterval(interval);
    } else {
      model.setState('add');
    }
  }
  __WEBPACK_IMPORTED_MODULE_1__modelAudio__["a" /* default */].advertPozz();
};

model.fnTransl = function (act) {
  if (state !== 'transl') return;
  var arg = void 0;
  if (act === 'offer') arg = __WEBPACK_IMPORTED_MODULE_2__modelTxt__["a" /* default */].getSelTransl();
  var countUnits = __WEBPACK_IMPORTED_MODULE_3__modelTransl__["a" /* default */][act](arg);
  if (countUnits !== -1 && act === 'setUnit') __WEBPACK_IMPORTED_MODULE_2__modelTxt__["a" /* default */].setSelectionTransl(countUnits);
};

///////************  Selection  ************

model.addSelection = function () {
  if (state === 'delete') return;
  if (state === 'add') __WEBPACK_IMPORTED_MODULE_2__modelTxt__["a" /* default */].addSelection();
  if (state === 'transl') __WEBPACK_IMPORTED_MODULE_3__modelTransl__["a" /* default */].addSelection();
};

model.reduceSelection = function () {
  if (state === 'delete') return;
  if (state === 'add') __WEBPACK_IMPORTED_MODULE_2__modelTxt__["a" /* default */].reduceSelection();
  if (state === 'transl') __WEBPACK_IMPORTED_MODULE_3__modelTransl__["a" /* default */].reduceSelection();
};

///////************    Load   **************

model.setLoadedAudioFile = function (file) {
  // file: {name, path, content}
  __WEBPACK_IMPORTED_MODULE_1__modelAudio__["a" /* default */].decodeFile(file);
};

model.setLoadedTranslFile = function (file) {
  // file: {name, path, content}
  __WEBPACK_IMPORTED_MODULE_3__modelTransl__["a" /* default */].setLoadedFile(file);
};

model.setLoadedTxtFile = function (file) {
  // file: {name, path, content}
  if (state === 'delete') model.setState('add');
  __WEBPACK_IMPORTED_MODULE_2__modelTxt__["a" /* default */].setLoadedFile(file);
};

///////************  Save/Restore ************

model.save = function () {
  __WEBPACK_IMPORTED_MODULE_2__modelTxt__["a" /* default */].save();
  __WEBPACK_IMPORTED_MODULE_3__modelTransl__["a" /* default */].save();
};

model.restore = function () {
  __WEBPACK_IMPORTED_MODULE_2__modelTxt__["a" /* default */].restore();
  __WEBPACK_IMPORTED_MODULE_3__modelTransl__["a" /* default */].restore();
  __WEBPACK_IMPORTED_MODULE_1__modelAudio__["a" /* default */].restore(); // если аудио загружено, то оставляем как есть
};

/* harmony default export */ __webpack_exports__["a"] = (model);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

var evs = {
  changeState: [], //publish - {state}
  //lngt events
  loadedLngt: [], //publish - {name, path, content, startPoz}
  savedLngt: [], //publish - {name, path}
  //audio events
  decodedAudio: [], //publish - {name, path}
  changedPoz: [], //publish - {pozMin, pozCurrent, duration, pozFrom, pozTo}
  changeStateAudio: [], //publish - {playing}
  //transl events
  loadedTransl: [], //publish - {name, path, content} 
  savedTransl: [] //publish - {name, path}   
};

var vent = {
  on: function on(ev, fn) {
    if (ev in evs) {
      evs[ev].push(fn);
    } else {
      console.log('ошибка в vent.on - события ' + ev + ' нет');
    }
  },
  off: function off(ev, fn) {
    if (ev in evs) {
      evs[ev] = evs[ev].filter(function (fnEv) {
        return fnEv !== fn;
      });
    } else {
      console.log('ошибка в vent.off - события ' + ev + ' нет');
    }
  },
  publish: function publish(ev, data) {
    //console.log(ev); console.log(evs)
    // if(ev !=='changedPoz') {console.log(ev); console.log(evs[ev]);}
    if (ev in evs) {
      evs[ev].forEach(function (fnEv) {
        fnEv(data);
      });
    } else {
      console.log('ошибка в vent.publish - события ' + ev + ' нет');
    }
  }
};

vent.dispatch = vent.publish; // для постепенного перехода

/* harmony default export */ __webpack_exports__["a"] = (vent);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = work;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_style_scss__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scss_style_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_model_model__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__js_hotKeys__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__js_file_txt__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__js_file_end__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__js_txt_area__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__js_file_audio__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__js_control_audio__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__js_infoTiming__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__js_file_transl__ = __webpack_require__(7);















function work() {
  __WEBPACK_IMPORTED_MODULE_2__js_hotKeys__["a" /* default */].init();
  __WEBPACK_IMPORTED_MODULE_3__js_file_txt__["a" /* default */].init(); // в fileTxt будет чтение текстового файла
  __WEBPACK_IMPORTED_MODULE_5__js_txt_area__["a" /* default */].init();
  __WEBPACK_IMPORTED_MODULE_4__js_file_end__["a" /* default */].init();
  __WEBPACK_IMPORTED_MODULE_6__js_file_audio__["a" /* default */].init(); // в fileTxt будет чтение содержимого звукового файла
  __WEBPACK_IMPORTED_MODULE_9__js_file_transl__["a" /* default */].init();
  __WEBPACK_IMPORTED_MODULE_7__js_control_audio__["a" /* default */].init();
  __WEBPACK_IMPORTED_MODULE_8__js_infoTiming__["a" /* default */].init();
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__work_js__ = __webpack_require__(2);


__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__work_js__["a" /* default */])();

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_model__ = __webpack_require__(0);


var controlAudio = {};

var btns = void 0,
    intervals = void 0,
    transl = void 0,
    btnPlay = void 0;
controlAudio.init = function () {
  btns = document.getElementById('btns');
  intervals = document.getElementById('btns-intervals');
  transl = document.getElementById('btns-transl');
  btnPlay = btns.querySelector('button[act="tooglePlay"]');

  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].on('changeState', changeState); //меняем набор кнопок
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].on('decodedAudio', handlerDecoded);
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].on('loadedTransl', handlerLoadedTransl);
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].on('changeStateAudio', changeBtnPlay); //меняем кнопку stop/play
};

controlAudio.close = function () {
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].off('decodedAudio', handlerDecoded);
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].off('changeStateAudio', changeBtnPlay);
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].off('changeState', changeState);
  btns.onclick = '';
  btns = null;
};

function handlerDecoded() {
  btns.onclick = function (event) {
    var target = event.target;
    if (target.hasAttribute('act')) {
      target.blur(); //убираем фокусировку, чтобы пробел не срабатывал как нажатие на кнопку
      var attr = target.getAttribute('act');
      __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].fnAdd(attr);
    }
  };
  intervals.onclick = function (event) {
    var target = event.target;
    if (target.hasAttribute('act')) {
      target.blur(); //убираем фокусировку, чтобы пробел не срабатывал как нажатие на кнопку
      var attr = target.getAttribute('act');
      __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].fnDelete(attr);
    }
  };
}

function handlerLoadedTransl() {
  transl.onclick = function (event) {
    var target = event.target;
    if (target.hasAttribute('act')) {
      target.blur(); //убираем фокусировку, чтобы пробел не срабатывал как нажатие на кнопку
      var attr = target.getAttribute('act');
      __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].fnTransl(attr);
    }
  };
}

function changeBtnPlay(_ref) {
  var playing = _ref.playing;

  if (playing) {
    btnPlay.innerHTML = 'Stop';
  } else {
    btnPlay.innerHTML = 'Play';
  }
}

function changeState(_ref2) {
  var state = _ref2.state;

  btns.style.display = state === 'add' ? 'flex' : 'none';
  intervals.style.display = state === 'delete' ? 'flex' : 'none';
  transl.style.display = state === 'transl' ? 'flex' : 'none';
}

/* harmony default export */ __webpack_exports__["a"] = (controlAudio);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_model__ = __webpack_require__(0);
/****************************************************************
  во внешнем модуле используется fileAudio.init() и
  fileAudio.close()
*****************************************************************/


var fileAudio = {};

var btn = void 0,
    input = void 0;

fileAudio.init = function () {
  btn = document.getElementById('file-audio');
  input = document.getElementById('input-audio');

  btn.addEventListener('click', clickInput);
  input.addEventListener('change', choosedFile);
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].on('decodedAudio', setInfoLodedAudio);
};

fileAudio.close = function () {
  btn.removeEventListener('click', clickInput);
  input.removeEventListener('change', choosedFile);
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].off('decodedAudio', setInfoLodedAudio);
};

function clickInput() {
  input.click();
}

function choosedFile() {
  if (input.files.length === 0) return; //здесь ";" обязательно
  var file = input.files[0];
  input.value = ''; // единственный способ чтобы заново открыть тотже файл
  var path = file.path;
  var name = file.name;

  btn.innerHTML = 'loding...';

  var reader = new FileReader();
  reader.readAsArrayBuffer(file);

  //reader.onloadstart = startProgress
  //reader.onprogress = updateProgress
  reader.onload = loaded;
  reader.onerror = errorHandler;

  function loaded(ev) {
    var content = ev.target.result;
    __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].setLoadedAudioFile({ name: name, path: path, content: content });
  }

  function errorHandler(ev) {
    if (ev.target.error.name == "NotReadableError") {
      btn.innerHTML = 'Выберите другой звуковой файл';
    }
  }
}

function setInfoLodedAudio(_ref) {
  var name = _ref.name,
      path = _ref.path;

  btn.innerHTML = name;
  btn.setAttribute('title', path);
}

/* harmony default export */ __webpack_exports__["a"] = (fileAudio);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_model__ = __webpack_require__(0);
//управление сохранением и восстановлением текстового файла .lngt


var fileEnd = {};

var btnSave = void 0,
    btnRestore = void 0,
    btnsState = void 0,
    btnCurrentState = void 0;

fileEnd.init = function () {
  btnSave = document.querySelector('#btns-files-state .btns-file button[act="save"]');
  btnRestore = document.querySelector('#btns-files-state .btns-file button[act="restore"]');

  btnsState = document.getElementById('btns-state');
  btnCurrentState = btnsState.querySelector('.current');

  btnSave.addEventListener('click', __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].save);
  btnRestore.addEventListener('click', __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].restore);
  btnsState.addEventListener('click', setState);
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].on('changeState', changeState);
};

fileEnd.close = function () {
  btnSave.removeEventListener('click', __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].save);
  btnRestore.removeEventListener('click', __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].restore);
  btnsState.removeEventListener('click', setState);
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].off('changeState', changeState);
  btnSave = btnRestore = btnsState = btnCurrent = null;
};

//function saveFiles() {model.save();}function restoreFiles() {model.restore();}

function setState(ev) {
  var state = ev.target.getAttribute('state');
  if (state) __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].setState(state);
}

function changeState(_ref) {
  var state = _ref.state;

  btnCurrentState.classList.remove('current');

  btnCurrentState = btnsState.querySelector('[state=' + state + ']');
  btnCurrentState.classList.add('current');
}

/* harmony default export */ __webpack_exports__["a"] = (fileEnd);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_model__ = __webpack_require__(0);
/****************************************************************
  Компонент для загрузки текстового файла.
  во внешнем модуле используется fileTxt.init() и fileTxt.close()
*****************************************************************/


var btn = void 0,
    input = void 0;

var init = function init() {
  btn = document.getElementById('file-transl');
  input = document.getElementById('input-transl');

  btn.addEventListener('click', clickInput);
  input.addEventListener('change', choosedFile);
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].on('loadedTransl', setInfoLodedTransl);
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].on('savedTransl', setInfoLodedTransl);
};

var close = function close() {
  btn.removeEventListener('click', clickInput);
  input.removeEventListener('change', choosedFile);
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].off('loadedTransl', setInfoLodedTransl);
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].off('savedTransl', setInfoLodedTransl); // 'savedLngt' нельзя объеденить с 'loadedLngt'
}; // так как на loadedLngt меняется содержимое текста


function clickInput() {
  input.click();
}

function choosedFile() {
  if (input.files.length === 0) return; //здесь ";" обязательно
  var file = input.files[0];
  input.value = ''; // единственный способ чтобы заново открыть тотже файл
  var path = file.path;
  var name = file.name;
  //const size = file.size;

  btn.innerHTML = 'loding...';

  var reader = new FileReader();
  reader.readAsText(file);

  //reader.onloadstart = startProgress
  //reader.onprogress = updateProgress
  reader.onload = loaded;
  reader.onerror = errorHandler;

  function loaded(ev) {
    var content = ev.target.result;
    __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].setLoadedTranslFile({ name: name, path: path, content: content }); //!!!
  }

  function errorHandler(ev) {
    if (ev.target.error.name == "NotReadableError") {
      btn.innerHTML = 'Выберите другой текстовой файл';
    }
  }
}

function setInfoLodedTransl(_ref) {
  var path = _ref.path,
      name = _ref.name;

  btn.innerHTML = name;
  btn.setAttribute('title', path);
}

var fileTransl = {
  init: init,
  close: close
};

/* harmony default export */ __webpack_exports__["a"] = (fileTransl);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_model__ = __webpack_require__(0);
/****************************************************************
  Компонент для загрузки текстового файла.
  во внешнем модуле используется fileTxt.init() и fileTxt.close()
*****************************************************************/


var fileTxt = {};

var btn = void 0,
    input = void 0;

fileTxt.init = function () {
  btn = document.getElementById('file-txt');
  input = document.getElementById('input-txt');

  btn.addEventListener('click', clickInput);
  input.addEventListener('change', choosedFile);
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].on('loadedLngt', setInfoLodedLngt);
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].on('savedLngt', setInfoLodedLngt);
};

fileTxt.close = function () {
  btn.removeEventListener('click', clickInput);
  input.removeEventListener('change', choosedFile);
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].off('loadedLngt', setInfoLodedLngt);
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].off('savedLngt', setInfoLodedLngt);
};

function clickInput() {
  input.click();
}

function choosedFile() {
  if (input.files.length === 0) return; //здесь ";" обязательно
  var file = input.files[0];
  input.value = ''; // единственный способ чтобы заново открыть тотже файл
  var path = file.path;
  var name = file.name;
  //const size = file.size;

  btn.innerHTML = 'loding...';

  var reader = new FileReader();
  reader.readAsText(file);

  //reader.onloadstart = startProgress
  //reader.onprogress = updateProgress
  reader.onload = loaded;
  reader.onerror = errorHandler;

  function loaded(ev) {
    var content = ev.target.result;
    __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].setLoadedTxtFile({ name: name, path: path, content: content });
  }

  function errorHandler(ev) {
    if (ev.target.error.name == "NotReadableError") {
      btn.innerHTML = 'Выберите другой текстовой файл';
    }
  }
}

function setInfoLodedLngt(_ref) {
  var path = _ref.path,
      name = _ref.name;

  btn.innerHTML = name;
  btn.setAttribute('title', path);
}

/* harmony default export */ __webpack_exports__["a"] = (fileTxt);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_model__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_keyboard__ = __webpack_require__(11);
//управление сохранением и восстановлением текстового файла .lngt



var hotKeys = {
  init: function init() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__model_keyboard__["a" /* default */])('arrowLeft', function () {
      __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].reduceSelection();
    });
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__model_keyboard__["a" /* default */])('arrowRight', function () {
      __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].addSelection();
    });
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__model_keyboard__["a" /* default */])('space', handlerSpace);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__model_keyboard__["a" /* default */])('tab', handlerTab);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__model_keyboard__["a" /* default */])('ctrlSpace', function () {
      __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].fnKeys('repeate');
    });
    // setHotKey('shiftSpace', () => { ; });
    //setHotKey('shiftTab', () => { ; });
  },

  close: function close() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__model_keyboard__["a" /* default */])('clear');
  }
};

// *** срабатывать будет только та функция в обработчике, которая соответствует state 

function handlerSpace() {
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].fnAdd('tooglePlay');
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].fnDelete('tooglePlay'); // as well as 'ctrlSpace' 
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].fnTransl('offer');
}

function handlerTab() {
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].fnAdd('setUnit');
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].fnDelete('cleare');
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].fnTransl('setUnit');
}

function handlerCtrlSpace() {
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].fnAdd('repeate');
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].fnDelete('repeate');
}

/* harmony default export */ __webpack_exports__["a"] = (hotKeys);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_model__ = __webpack_require__(0);

var infoTiming = {};

var info = void 0;

infoTiming.init = function () {
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].on('changedPoz', showChangedPoz);
  info = document.getElementById('info');
};

infoTiming.close = function () {
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].off('changedPoz', showChangedPoz);
  info = null;
};

function showChangedPoz(_ref) {
  var _ref$pozCurrent = _ref.pozCurrent,
      pozCurrent = _ref$pozCurrent === undefined ? 0 : _ref$pozCurrent,
      _ref$duration = _ref.duration,
      duration = _ref$duration === undefined ? 0 : _ref$duration,
      _ref$pozMin = _ref.pozMin,
      pozMin = _ref$pozMin === undefined ? 0 : _ref$pozMin,
      _ref$pozFrom = _ref.pozFrom,
      pozFrom = _ref$pozFrom === undefined ? 0 : _ref$pozFrom,
      _ref$pozTo = _ref.pozTo,
      pozTo = _ref$pozTo === undefined ? 0 : _ref$pozTo;


  var localPoz = (pozCurrent - pozMin).toFixed(1);
  var localFrom = (pozFrom - pozMin).toFixed(1);
  var localTo = (pozTo - pozMin).toFixed(1);
  var totalPoz = (+pozCurrent).toFixed(1); // .toFixed(1) наверное здесь не обязательно
  var total = (+duration).toFixed(1); // .toFixed(1) наверное здесь не обязательно

  info.innerHTML = '\n    <div>\n      <span> \u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u043E\u0442\u0440\u0435\u0437\u043E\u043A (\u0432\u044B\u0431\u0440\u0430\u043D\u043E): </span>\n      <span info = "curr-region"> ' + localPoz + ' (' + localFrom + ' - ' + localTo + ')</span>\n    </div>\n    <div class = "mid-border">\n      <span> \u041F\u043E\u0437\u0438\u0446\u0438\u044F \u0432 \u0444\u0430\u0439\u043B\u0435/\u0412\u0441\u0435\u0433\u043E: </span>\n      <span info = "poz-file"> ' + totalPoz + ' / ' + total + ' </span>\n    </div>\n  ';
}

/* harmony default export */ __webpack_exports__["a"] = (infoTiming);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (setHotKey);

var evs = {
  arrowLeft: function arrowLeft() {},
  arrowRight: function arrowRight() {},
  space: function space() {},
  tab: function tab() {},

  //altSpace() {}, // срабатывает событие окна
  shiftSpace: function shiftSpace() {},
  ctrlSpace: function ctrlSpace() {},
  shiftTab: function shiftTab() {},
  f2: function f2() {}
};

var keyCodes = {
  37: 'arrowLeft', // <- влево
  39: 'arrowRight', // -> вправо
  32: 'space', // _ пробел
  9: 'tab', // tab
  113: 'f2' // F2 - пока не используется
};

document.onkeydown = keyboardHandler;

function keyboardHandler(ev) {
  //console.log(ev.keyCode);
  var key = ev.keyCode;
  if (key in keyCodes) {
    ev.preventDefault();
    //ev.stopPropagation()
    var fn = keyCodes[key];
    if (!fn) return;
    if (ev.ctrlKey) fn = 'ctrl' + fn[0].toUpperCase() + fn.slice(1); // i.e. 'space' -> 'ctrlSpace'
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
    evs[keyName] = function () {};
  }
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vent__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__webAudioAPI__ = __webpack_require__(15);



var _window$require = window.require('electron'),
    ipcRenderer = _window$require.ipcRenderer;

var api = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__webAudioAPI__["a" /* default */])();

var pozMin = 0,
    // Позиция конца предыдущего отрезка
pozCurrent = 0,
    // Текущая позиция
duration = 0; // Продолжительность всего ауиотрека.
// Запомненный отрезок
var pozFrom = 0,
    pozTo = 0,
    delta = 0.1; // Шаг изменения позиции отрезка

var playing = false,
    // Состояние проигрывателя - играет/пауза
timer = null,
    timerStop = null;

var file = { // пока не используется
  name: null,
  path: null
};

var modelAudio = {
  decodeFile: function decodeFile(_ref) {
    var name = _ref.name,
        path = _ref.path,
        content = _ref.content;

    api.decode(content).then(function (res) {
      duration = res;
      file = { name: name, path: path };
      __WEBPACK_IMPORTED_MODULE_0__vent__["a" /* default */].publish('decodedAudio', { name: name, path: path });
      __WEBPACK_IMPORTED_MODULE_0__vent__["a" /* default */].publish('changedPoz', getPoz());
      localStorage.setItem('path-audio', path);
      localStorage.setItem('name-audio', name);
    });
  },


  ///// проигрывание/остановка
  tooglePlay: function tooglePlay() {
    if (playing) {
      this.stop();
    } else {
      this.play();
    }
  },
  play: function play() {
    var _this = this;

    if (playing) return; // может вызываться не только из tooglePlay()
    api.play(pozCurrent);
    playing = true;
    __WEBPACK_IMPORTED_MODULE_0__vent__["a" /* default */].publish('changeStateAudio', { playing: playing });
    timer = setInterval(function () {
      __WEBPACK_IMPORTED_MODULE_0__vent__["a" /* default */].publish('changedPoz', getPoz(true));
      if (pozCurrent > duration) _this.tooglePlay(); // this.stop() - недостаточно
    }, 100);
  },
  stop: function stop() {
    if (!playing) return; // может вызываться не только из tooglePlay()
    clearInterval(timer);
    if (timerStop) {
      clearTimeout(timerStop);
    }
    pozCurrent = api.stop();
    playing = false;
    __WEBPACK_IMPORTED_MODULE_0__vent__["a" /* default */].publish('changeStateAudio', { playing: playing });
    if (pozCurrent > duration) pozCurrent = duration; //не должно быть - может превысить на доли секунды
  },
  repeate: function repeate() {
    var _this2 = this;

    //проигрываем выбранный отрезок
    if (playing) return;
    if (notFitUnit()) return; // если отрезок не установлен и не может быть установлен
    var period = (pozTo - pozFrom) * 1000; // здесь не обязательно округлять
    if (period < 0) return; // не должно быть
    pozCurrent = pozFrom;
    this.play();
    timerStop = setTimeout(function () {
      _this2.stop();
    }, period);
  },
  reset: function reset() {
    pozFrom = pozCurrent = pozTo = pozMin;
  },
  setUnit: function setUnit() {
    if (playing) return;
    if (notFitUnit()) return; // если отрезок не установлен и не может быть установлен
    return { pozFrom: pozFrom, pozTo: pozTo };
  },
  nextUnit: function nextUnit() {
    // должно быть playing = false
    pozMin = pozFrom = pozCurrent = pozTo;
  },
  setPozz: function setPozz(_ref2) {
    var _from = _ref2._from,
        _to = _ref2._to;

    pozMin = pozCurrent = pozFrom = +_from;
    pozTo = +_to;
    __WEBPACK_IMPORTED_MODULE_0__vent__["a" /* default */].publish('changedPoz', getPoz());
  },


  // установка аудиоинтервала (из файла .lngt)
  assignInterval: function assignInterval(_ref3) {
    var _from = _ref3._from,
        _to = _ref3._to;
    // должно быть playing = false
    pozMin = pozCurrent = pozFrom = +_from;
    pozTo = +_to;
  },


  //// переход позиции старт, от и до (может в if(this.playing) вместо return надо this.stop(); )
  gotoStart: function gotoStart() {
    if (playing) return;
    pozCurrent = pozMin;
  },
  gotoFrom: function gotoFrom() {
    if (playing) return;
    pozCurrent = pozFrom;
  },
  gotoTo: function gotoTo() {
    if (playing) return;
    pozCurrent = pozTo;
  },


  //// установка и изменение позицй от и до
  fromMoveBack: function fromMoveBack() {
    var newPoz = Math.round((pozFrom - delta) * 10) / 10;
    if (newPoz < pozMin) {
      newPoz = pozMin;
    } // тогда скорее всего будет повторение, но иначе число this.pozMin может быть слишком дробным
    pozFrom = newPoz;
  },
  fromSet: function fromSet() {
    // playing может быть любым
    pozFrom = +pozCurrent.toFixed(1);
    if (pozTo < pozFrom) pozTo = pozFrom;
  },
  fromMoveForward: function fromMoveForward() {
    var newPoz = Math.round((pozFrom + delta) * 10) / 10;
    if (newPoz > duration) {
      newPoz = duration;
    }
    pozFrom = newPoz;
    if (pozFrom > pozTo) pozTo = pozFrom;
  },
  toMoveBack: function toMoveBack() {
    var newPoz = Math.round((pozTo - delta) * 10) / 10;
    if (newPoz < pozMin) {
      newPoz = pozMin;
    } // тогда скорее всего будет повторение, но иначе число pozMin может быть слишком дробным
    pozTo = newPoz;
    if (pozTo < pozFrom) pozFrom = pozTo;
  },
  toSet: function toSet() {
    if (playing) this.stop();
    pozTo = +pozCurrent.toFixed(1);
    if (pozFrom > pozTo) pozFrom = pozTo;
  },
  toMoveForward: function toMoveForward() {
    if (playing) return;
    var newPoz = Math.round((pozTo + delta) * 10) / 10;
    if (newPoz > duration) {
      newPoz = duration;
    }
    pozTo = newPoz;
  },
  setStartPoz: function setStartPoz(poz) {
    pozMin = pozCurrent = pozFrom = pozTo = +poz;
    __WEBPACK_IMPORTED_MODULE_0__vent__["a" /* default */].publish('changedPoz', getPoz()); // может это надо в другом месте
  },
  advertPozz: function advertPozz() {
    __WEBPACK_IMPORTED_MODULE_0__vent__["a" /* default */].publish('changedPoz', getPoz());
  },
  restore: function restore() {
    var name = file.name || localStorage.getItem('name-audio');
    var path = file.path || localStorage.getItem('path-audio');
    if (!name || !path) return;
    ipcRenderer.send('will-restore-audio', { name: name, path: path });
  }
};

ipcRenderer.on('audio-restored', function (event, arg) {
  if (arg.err) {
    console.log('error in restoring audio:');console.log(arg.err);
    return;
  }
  var content = arg.content.buffer;
  var name = arg.name,
      path = arg.path;

  modelAudio.decodeFile({ name: name, path: path, content: content }); // здесь установятся file и localStorage
});

function getPoz() {
  var updatePoz = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  if (updatePoz) pozCurrent = api.getCurrentPoz();
  return {
    pozMin: pozMin, pozCurrent: pozCurrent, duration: duration, pozFrom: pozFrom, pozTo: pozTo
  };
}

function notFitUnit() {
  // если отрезок не установлен (pozFrom + x > pozTo) и не может быть установлен (pozCurrent < pozFrom + x)
  if (pozTo < pozFrom + 0.3 && pozCurrent > pozFrom + 0.3) pozTo = pozCurrent;
  if (pozTo > pozFrom + 0.3) return;
  return true;
}

/* harmony default export */ __webpack_exports__["a"] = (modelAudio);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vent__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_util__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_util__);



var _window$require = window.require('electron'),
    ipcRenderer = _window$require.ipcRenderer;

var subfolder = 'target';
var file = {}; // {name, path, size}
// path: fullPath + name
var nodeTransl = null,
    // весь элемент
nodeBlank = null,
    nodeSelection = null; // выделяется из nodeBlank


// установка
var setRoot = function setRoot(root) {
  nodeTransl = root;
};

var setLoadedFile = function setLoadedFile(_ref) {
  var name = _ref.name,
      path = _ref.path,
      content = _ref.content;

  var s = content;
  s = txtToTransl(s);
  nodeTransl.innerHTML = s;
  nodeSelection = nodeTransl.querySelector('#selection-transl'); // метод getElementById есть только у document
  nodeBlank = nodeTransl.querySelector('#blank-transl');

  file = { name: name, path: path };
  setLocalStorage();
  __WEBPACK_IMPORTED_MODULE_0__vent__["a" /* default */].publish('loadedTransl', file);

  function txtToTransl(_s) {
    if (/\.transl$/.test(name)) return _s;
    var s = _s;
    //Нормализуем - убираем из текста возможные тэги
    s = s.replace(/</g, '(').replace(/>/g, ')');
    //Заменяем абзацы и упорядочиваем пробелы
    s = s.replace(/\n/g, '<br>');
    s = s.replace(/\s*<br>\s*/g, '<br>&nbsp&nbsp'); //для отступа
    s = s.replace(/\s+/g, ' '); //все пробелы однотипные и по одному
    s = s.replace(/\s([.,:;!\)])/g, '$1'); //убираем ненужные пробелы
    //Добавляем тэги для начальной работы с текстом
    s = '<main-info lang="ru"></main-info>\n         <span id="selection-transl"></span>\n         <span id="blank-transl">&nbsp&nbsp' + s + '</span>';
    return s;
  }
};

function setLocalStorage() {
  localStorage.setItem('path-transl', file.path);
  localStorage.setItem('name-transl', file.name);
}

var setState = function setState(state) {
  if (!nodeSelection) return -1;
  clearNodeSelection();
  return getCountUnits();
};

function clearNodeSelection() {
  var selection = nodeSelection.innerHTML;
  if (selection) {
    nodeBlank.innerHTML = selection + nodeBlank.innerHTML;
    nodeSelection.innerHTML = '';
  }
}

function getCountUnits() {
  // количество уже назначеннх кусков
  var nodes = nodeTransl.querySelectorAll('span[transl]');
  console.dir(nodes);
  return nodes ? nodes.length : 0; // возможно проверка не нужна
}

// Сохранение файла
var save = function save() {
  if (!file.name) return;
  clearNodeSelection();
  var content = nodeTransl.innerHTML;
  if (!content) return;
  var path = /\.transl$/.test(file.path) ? file.path : file.path.replace(/\.[^.]{1,5}$/, '.transl');
  var name = /\.transl$/.test(file.name) ? file.name : file.name.replace(/\.[^.]{1,5}$/, '.transl');

  ipcRenderer.send('will-save-file', { path: path, name: name, content: content, kind: 'transl' });
};

ipcRenderer.on('file-saved', function (event, arg) {
  if (arg.kind !== 'transl') return; // {err, path, name, kind}
  if (arg.err) {
    console.log('error in saving *.transl:');console.log(arg.err);
    return;
  }
  file.path = arg.path; // если было расширение .txt (или другое), то оно изменится на .lngt
  file.name = arg.name;
  setLocalStorage();
  __WEBPACK_IMPORTED_MODULE_0__vent__["a" /* default */].publish('savedTransl', file);
});

// Восстановление файла
var restore = function restore() {
  var name = file.name || localStorage.getItem('name-transl');
  var path = file.path || localStorage.getItem('path-transl');
  if (!name || !path) return;
  ipcRenderer.send('will-restore-file', { name: name, path: path, kind: 'transl' });
};

ipcRenderer.on('file-restored', function (event, arg) {
  //arg = {name, path, content, kind, err};
  if (arg.kind !== 'transl') return;
  if (arg.err) {
    console.log('error in restoring *.transl:');console.log(arg.err);
    return;
  }
  var name = arg.name,
      path = arg.path,
      content = arg.content;

  modelTransl.setLoadedFile({ name: name, path: path, content: content }); // здесь сами установятся file и localStorage
});

var offer = function offer(txt) {
  var total = txt.split(/[.,!?]|<br>/).length;
  var count = 0;
  clearNodeSelection();
  do {
    addSelection();
    count = nodeSelection.innerHTML.split(/[.,!?]|<br>/).length;
  } while (count < total && nodeBlank.innerHTML !== '');
};

// Изменение области выделения
var addSelection = function addSelection() {
  var blank = nodeBlank.innerHTML;
  if (!blank) return;
  var s = blank.match(/^.+?(\s|<br>)/);
  if (s) {
    nodeSelection.innerHTML = nodeSelection.innerHTML + s[0];
    nodeBlank.innerHTML = blank.slice(s[0].length);
  } else {
    //конец текстового файла
    nodeSelection.innerHTML = nodeSelection.innerHTML + blank;
    nodeBlank.innerHTML = '';
  }
};

var reduceSelection = function reduceSelection() {
  var selection = nodeSelection.innerHTML;
  if (!selection) return;
  var s = selection.match(/.+(\s|<br>)(.+(\s|<br>)?)$/); // ленивого квантификатора здесь не нужно
  if (s) {
    nodeBlank.innerHTML = s[2] + nodeBlank.innerHTML;
    nodeSelection.innerHTML = selection.slice(0, -s[2].length);
  } else {
    nodeBlank.innerHTML = selection + nodeBlank.innerHTML;
    nodeSelection.innerHTML = '';
  }
};

var setUnit = function setUnit() {
  // если вернёт -1, то порция перевода не установлена, либо число установленных отрезков
  var selection = nodeSelection.innerHTML;
  if (!selection) return -1;
  nodeSelection.removeAttribute('id');
  nodeSelection.setAttribute('trasl', 'true');
  nodeSelection = document.createElement('span');
  nodeSelection.id = 'selection-transl';
  nodeBlank.before(nodeSelection);
  return getCountUnits();
};

var modelTransl = {
  setRoot: setRoot,
  setLoadedFile: setLoadedFile,
  setState: setState,
  offer: offer,
  addSelection: addSelection,
  reduceSelection: reduceSelection,
  setUnit: setUnit,
  save: save,
  restore: restore
};

/* harmony default export */ __webpack_exports__["a"] = (modelTransl);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vent__ = __webpack_require__(1);


var _window$require = window.require('electron'),
    ipcRenderer = _window$require.ipcRenderer;

var modelTxt = {};

//const subfolder = 'target';
var file = {}; // {name, path}
// path: fullPath + name
var nodeTxt = null,
    // весь элемент
nodeBlank = null,
    nodeAdd = null,
    nodeDelete = null,
    nodeTransl = null;

////////////************ установка  ************

modelTxt.setRoot = function (root) {
  nodeTxt = root;
};

modelTxt.setLoadedFile = function (_ref) {
  var name = _ref.name,
      path = _ref.path,
      content = _ref.content;

  txtToLngt();
  nodeTxt.innerHTML = content;
  nodeAdd = nodeTxt.querySelector('#add-txt'); // метод getElementById есть только у document
  nodeBlank = nodeTxt.querySelector('#blank-txt');

  file = { name: name, path: path };
  setLocalStorage();
  __WEBPACK_IMPORTED_MODULE_0__vent__["a" /* default */].publish('loadedLngt', { name: name, path: path, startPoz: getStartPoz() });

  function txtToLngt() {
    if (/\.lngt$/.test(name)) return;

    var s = content;
    //Нормализуем - убираем из текста возможные тэги
    s = s.replace(/</g, '(').replace(/>/g, ')');
    //Заменяем абзацы и упорядочиваем пробелы
    s = s.replace(/\n/g, '<br>');
    s = s.replace(/\s*<br>\s*/g, '<br>&nbsp&nbsp'); //для отступа
    s = s.replace(/\s+/g, ' '); //все пробелы однотипные и по одному
    s = s.replace(/\s([.,:;!\)])/g, '$1'); //убираем ненужные пробелы
    //Добавляем тэги для начальной работы с текстом
    s = '<main-info></main-info>\n         <span id="add-txt"></span>\n         <span id="blank-txt">&nbsp&nbsp' + s + '</span>';
    content = s;
  }
};

function setLocalStorage() {
  localStorage.setItem('path-lngt', file.path);
  localStorage.setItem('name-lngt', file.name);
}

/////////////************  Изменение состояния  ************************

modelTxt.setState = function (state, countUnits) {
  if (!file.name) return { _from: '0', _to: '0' };
  clearNodeAdd();
  clearNodeDelete();
  clearNodeTranl();
  if (state === 'add') return setNodeAdd();
  if (state === 'delete') return setNodeDelete();
  if (state === 'transl') return setNodeTransl(countUnits);
};

function clearNodeAdd() {
  var selection = nodeAdd.innerHTML;
  if (selection) {
    nodeBlank.innerHTML = selection + nodeBlank.innerHTML;
    nodeAdd.innerHTML = '';
  }
}

function clearNodeDelete() {
  if (nodeDelete) nodeDelete.removeAttribute('id');
  nodeDelete = null;
}

function clearNodeTranl() {
  if (nodeTransl) nodeTransl.removeAttribute('id');
  nodeTransl = null;
}

function setNodeAdd() {
  var _from = '0',
      _to = '0';
  var lastNode = nodeAdd.previousElementSibling;
  if (lastNode && lastNode.hasAttribute('to')) {
    _from = _to = lastNode.getAttribute('to');
  }
  return { _from: _from, _to: _to };
}

function setNodeDelete() {
  var pozz = { _from: '0', _to: '0' };
  if (!nodeAdd) return pozz;
  nodeDelete = nodeAdd.previousElementSibling; // не лучший вариант поиска
  if (!nodeDelete || !nodeDelete.hasAttribute('from')) return pozz;
  nodeDelete.id = 'delete-txt';
  pozz._from = nodeDelete.getAttribute('from');
  pozz._to = nodeDelete.getAttribute('to');
  return pozz;
}

function setNodeTransl(countUnits) {
  var nodes = nodeTxt.querySelectorAll('span[from]');
  if (nodes && nodes[countUnits]) {
    nodeTransl = nodes[countUnits]; // следующий кусок, т.к. index = length - 1
    nodeTransl.id = 'transl-txt';
  }
  return { _from: '0', _to: '0' };
}

////////////************ Сохранение/восстановление файла *************

modelTxt.save = function () {
  if (!file.name) return; // можно другое свойство file проверить, Boolean(file = {}) = true
  clearNodeAdd();
  clearNodeDelete();
  clearNodeTranl();
  var content = nodeTxt.innerHTML;
  if (!content) return;
  var path = /\.lngt$/.test(file.path) ? file.path : file.path.replace(/\.[^.]{1,5}$/, '.lngt');
  var name = /\.lngt$/.test(file.name) ? file.name : file.name.replace(/\.[^.]{1,5}$/, '.lngt');

  ipcRenderer.send('will-save-file', { path: path, name: name, content: content, kind: 'lngt' });
};

ipcRenderer.on('file-saved', function (event, arg) {
  if (arg.kind !== 'lngt') return; // {err, path, name, kind}
  if (arg.err) {
    console.log('error in saving *.lngt:');console.log(arg.err);
    return;
  }
  file.path = arg.path; // если было расширение .txt (или другое), то оно изменится на .lngt
  file.name = arg.name;
  setLocalStorage();
  __WEBPACK_IMPORTED_MODULE_0__vent__["a" /* default */].publish('savedLngt', file);
});

modelTxt.restore = function () {
  var name = file.name || localStorage.getItem('name-lngt');
  var path = file.path || localStorage.getItem('path-lngt');
  if (!name || !path) return;
  ipcRenderer.send('will-restore-file', { name: name, path: path, kind: 'lngt' });
};

ipcRenderer.on('file-restored', function (event, arg) {
  //arg = {name, path, content, kind, err};
  if (arg.kind !== 'lngt') return;
  if (arg.err) {
    console.log('error in restoring *.lngt:');console.log(arg.err);
    return;
  }
  var name = arg.name,
      path = arg.path,
      content = arg.content;

  modelTxt.setLoadedFile({ name: name, path: path, content: content }); // здесь сами установятся file и localStorage
});

//////////////************  Изменение области выделения  ************************

modelTxt.addSelection = function () {
  //if (stateTxt === 'delete interval') return;
  var current = nodeBlank.innerHTML;
  var selection = nodeAdd.innerHTML;
  if (!current) return;
  var s = current.match(/^.+?(\s|<br>)/);
  if (s) {
    nodeAdd.innerHTML = selection + s[0];
    nodeBlank.innerHTML = current.slice(s[0].length);
  } else {
    //конец текстового файла
    nodeAdd.innerHTML = selection + current;
    nodeBlank.innerHTML = '';
  }
};

modelTxt.reduceSelection = function () {
  //if (stateTxt === 'delete interval') return;
  var current = nodeBlank.innerHTML;
  var selection = nodeAdd.innerHTML;
  if (!selection) return;
  var s = selection.match(/.+(\s|<br>)(.+(\s|<br>)?)$/);
  if (s) {
    nodeBlank.innerHTML = s[2] + current;
    nodeAdd.innerHTML = selection.slice(0, -s[2].length);
  } else {
    nodeBlank.innerHTML = selection + current;
    nodeAdd.innerHTML = '';
  }
};

modelTxt.setSelectionTransl = function (countUnits) {
  console.log(countUnits);
  if (!file.name) return;
  clearNodeTranl();
  setNodeTransl(countUnits);
};

// Установка аудиоинтервала в выделеный участок
modelTxt.setUnit = function (_ref2) {
  var pozFrom = _ref2.pozFrom,
      pozTo = _ref2.pozTo;

  var selection = nodeAdd.innerHTML;
  if (selection.trim() === '') return;
  nodeAdd.innerHTML = '';
  var span = document.createElement('span');
  span.innerHTML = selection;
  span.setAttribute('from', pozFrom);
  span.setAttribute('to', pozTo);
  nodeAdd.before(span);
  return true;
};

// Выделенный участок перемещаем в оставшуюся область, выделяем предыдущий участок
modelTxt.deleteUnit = function () {
  var _from = void 0,
      _to = void 0; // from - показывает ключевое слово
  var span = nodeDelete.previousElementSibling; // возможно можно const span
  nodeDelete.removeAttribute('id');
  var txtTmp = nodeDelete.innerHTML;
  nodeBlank.innerHTML = txtTmp + nodeBlank.innerHTML;
  nodeDelete.remove();
  if (span && span.hasAttribute('from') && span.hasAttribute('to')) {
    _from = +span.getAttribute('from');
    _to = +span.getAttribute('to');
    span.id = 'delete-txt';
    nodeDelete = span;
  }
  return { _from: _from, _to: _to };
};

modelTxt.getSelTransl = function () {
  return nodeTransl ? nodeTransl.innerHTML : null;
};

function getStartPoz() {
  var poz = 0;
  var span = nodeAdd.previousElementSibling;
  if (span && span.hasAttribute('to')) poz = +span.getAttribute('to');
  return poz;
};

// для корректной работы model.fnAdd()
//modelTxt.tooglePlay = () => {};


/* harmony default export */ __webpack_exports__["a"] = (modelTxt);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = webAudioAPI;
function webAudioAPI() {
  var contextClass = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext;
  if (!contextClass) {
    console.log('Web Audio API недоступно');
    return;
  }

  var res = {};
  var context = void 0,
      source = void 0,
      buffer = void 0,
      playing = void 0,
      startTime = void 0,
      startPoz = void 0;

  res.decode = function (content) {
    /////if (!(data instanceof ArrayBuffer)) return;
    return new Promise(function (resolve, reject) {
      context = new contextClass();
      context.decodeAudioData(content, function (audioBuffer) {
        buffer = audioBuffer;
        initVars();
        var duration = Math.round(buffer.duration * 10) / 10;
        resolve(duration);
      }, reject); // может надо () => {reject();}
    });
  };

  function initVars() {
    startTime = startPoz = 0;
    playing = false;
  }

  res.play = function () {
    var poz = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    source = context.createBufferSource();
    source.connect(context.destination);
    source.buffer = buffer;

    startTime = context.currentTime;
    startPoz = poz;
    source.start(0, startPoz);
    playing = true;
  };

  res.getCurrentPoz = function () {
    return Math.round((context.currentTime - startTime + startPoz) * 10) / 10;
  };

  res.stop = function () {
    source.stop();
    playing = false;
    return res.getCurrentPoz();
  };

  function onError() {}

  return res;
}

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_model__ = __webpack_require__(0);


var txt = void 0,
    transl = void 0;

var init = function init() {
  txt = document.getElementById('txt');
  transl = document.getElementById('transl');
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].setArea(txt);
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].setAreaTransl(transl);
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].on('changeState', changeState);
};

var close = function close() {
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].off('changeState', changeState);
  txt = transl = null;
};

function changeState(_ref) {
  var state = _ref.state;

  if (state === 'transl') {
    transl.style.display = 'block';
  } else {
    transl.style.display = 'none';
  }
}

var txtArea = {
  init: init,
  close: close
};

/* harmony default export */ __webpack_exports__["a"] = (txtArea);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)(undefined);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\nhtml, body, div, span, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, address, big, cite, code,\ndel, em, img, small, strike, strong, tt,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline; }\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block; }\n\nbody {\n  line-height: 1; }\n\nol, ul {\n  list-style: none; }\n\nblockquote, q {\n  quotes: none; }\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: '';\n  content: none; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\n/************************************\r\n\tПервая палитра\r\n*************************************/\n/************************************\r\n\tВторая палитра\r\n*************************************/\nhtml, body {\n  height: 100%; }\n\n#work {\n  background-color: #e8f3f7;\n  display: flex;\n  flex-flow: column nowrap;\n  height: 100%; }\n  #work .part {\n    margin: 0px 5px 5px 5px; }\n  #work #files {\n    margin: 5px 5px 5px 0px; }\n\n#area {\n  flex: 1 0 100px;\n  background-color: #f4f8f7;\n  display: flex; }\n\n#info {\n  background-color: #B6D0C9; }\n\n#files {\n  display: flex;\n  flex-wrap: wrap; }\n  #files .file-field {\n    flex: 1 0 200px;\n    margin: 5px 0 0 5px;\n    background-color: #C2DFEA;\n    border: 0.5px solid #8C95AA;\n    border-radius: 4px;\n    padding: 6px;\n    cursor: pointer; }\n\n#btns-files-state {\n  display: flex; }\n  #btns-files-state .btns-file {\n    flex: 1 0 100px;\n    align-content: stretch;\n    display: flex; }\n    #btns-files-state .btns-file button {\n      width: 100px;\n      margin-right: 5px;\n      cursor: pointer;\n      color: #fdfaf2;\n      border: 0.5px solid #86644f;\n      border-radius: 4px;\n      padding: 5px;\n      background-color: #A47C64; }\n  #btns-files-state #btns-state {\n    flex: 1 0 100px;\n    align-content: right;\n    display: flex;\n    max-width: 400px; }\n    #btns-files-state #btns-state button {\n      flex: 1 0 25px;\n      margin-left: 5px;\n      cursor: pointer;\n      color: #fdfaf2;\n      border: 0.5px solid #86644f;\n      border-radius: 4px;\n      padding: 5px;\n      background-color: #255677; }\n    #btns-files-state #btns-state button.current {\n      background-color: #6e94b6; }\n\n/*\r\n.progress {\r\n  background-color: $a_blue;\r\n  position: absolute;\r\n  width: 30%;\r\n  height: 100%;\r\n  left: 0px;\r\n  top: 0px;\r\n  opacity: 0.3;\r\n}\r\n*/\n#info {\n  display: flex;\n  border: 0.5px solid #8C95AA; }\n  #info div {\n    flex: 1 1 270px;\n    padding: 5px;\n    overflow: auto; }\n  #info .mid-border {\n    border-left: 0.5px solid #8C95AA; }\n  #info .td-border {\n    border-left: 0.5px solid #8C95AA; }\n\n#btns {\n  display: flex; }\n\n#btns-intervals, #btns-transl {\n  display: none; }\n\n#btns button, #btns-intervals button, #btns-transl button {\n  background-color: #879c64;\n  color: #e7ece0;\n  border-radius: 5px;\n  margin: 0 1px;\n  padding: 5px 0;\n  cursor: pointer; }\n\n#btns {\n  justify-content: space-between; }\n  #btns .btns-group {\n    display: flex; }\n  #btns .btns-control button {\n    width: 70px; }\n  #btns .btns-from-to button {\n    width: 47px; }\n  #btns .btns-from-to button.z {\n    width: 30px; }\n\n#btns-intervals button, #btns-transl button {\n  width: 100px; }\n\n#txt {\n  padding: 5px;\n  overflow-y: scroll;\n  color: #50a3c3; }\n  #txt #blank-txt {\n    color: black; }\n  #txt #add-txt {\n    background-color: #50a3c3;\n    color: #f7fbfc; }\n  #txt #delete-txt, #txt #transl-txt {\n    background-color: #6e557b;\n    color: #f7fbfc; }\n\n#transl {\n  display: none;\n  padding: 5px;\n  overflow-y: scroll;\n  color: #50a3c3; }\n  #transl #selection-transl {\n    background-color: #50a3c3;\n    color: #f7fbfc; }\n  #transl #blank-transl {\n    color: black; }\n\n#area .area {\n  border: 0.5px solid #8C95AA;\n  flex: 1 0 100px; }\n", ""]);

// exports


/***/ }),
/* 18 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(17);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(20)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(21);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 21 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 23 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(24);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(23);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26), __webpack_require__(22)))

/***/ }),
/* 26 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);