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


model.setState = function (_state) {
  if (_state === state) return; // наверное это потом уберём
  var pozz = __WEBPACK_IMPORTED_MODULE_2__modelTxt__["a" /* default */].setState(_state); // || {_from: '0', _to: '0'}
  __WEBPACK_IMPORTED_MODULE_3__modelTransl__["a" /* default */].setState(_state);
  if (pozz !== false) __WEBPACK_IMPORTED_MODULE_1__modelAudio__["a" /* default */].setPozz(pozz);
  state = _state;
  __WEBPACK_IMPORTED_MODULE_0__vent__["a" /* default */].publish('changeState', { state: state });
  __WEBPACK_IMPORTED_MODULE_1__modelAudio__["a" /* default */].advertPozz(); // это надо включить в   modelAudio.setState(_state);
};

/*
function setStateAdd() {
  modelTxt.setStateAdd();
  modelAudio.nextUnit();
}

function setStateDelete() {
  const interval = modelTxt.setStateDelete();   // from - показывает ключевое слово
  if(!interval) return;
  modelAudio.assignInterval(interval);
}

function setStateTransl() {
  const num = modelTransl.setStateTransl();
  modelTxt.setStateTransl(num);
}
*/

////////************  Txt ************

model.setArea = function (area) {
  __WEBPACK_IMPORTED_MODULE_2__modelTxt__["a" /* default */].setRoot(area);
};

model.fnTxtSelection = function (action) {
  if (state === 'delete') return;
  __WEBPACK_IMPORTED_MODULE_2__modelTxt__["a" /* default */][action]();
};

// действия, совершаемые при state === 'add'
model.fnTxt = function (action, args) {
  if (state === 'delete') model.toogleState();
  __WEBPACK_IMPORTED_MODULE_2__modelTxt__["a" /* default */][action](args);
};

// действия, совершаемые при state === 'delete'
model.fnTxtDelete = function (action, args) {
  if (state === 'add') model.toogleState();
  __WEBPACK_IMPORTED_MODULE_2__modelTxt__["a" /* default */][action](args);
};

model.setLoadedTxtFile = function (file) {
  // file: {name, path, content}
  if (state === 'delete') model.setState('add');
  __WEBPACK_IMPORTED_MODULE_2__modelTxt__["a" /* default */].setLoadedFile(file);
};

////////************  Transl ************
model.setAreaTransl = function (area) {
  __WEBPACK_IMPORTED_MODULE_3__modelTransl__["a" /* default */].setRoot(area);
};

model.setLoadedTranslFile = function (file) {
  // file: {name, path, content}
  __WEBPACK_IMPORTED_MODULE_3__modelTransl__["a" /* default */].setLoadedFile(file);
};

model.fnTransl = function (act) {};

///////************  Audio ************

model.setLoadedAudioFile = function (file) {
  // file: {name, path, content}
  __WEBPACK_IMPORTED_MODULE_1__modelAudio__["a" /* default */].decodeFile(file);
};

model.fnAudio = function (action, args) {
  // возможно args не понадобится
  if (state === 'delete') model.toogleState(); // если используется клавиатура
  var res = __WEBPACK_IMPORTED_MODULE_1__modelAudio__["a" /* default */][action](args);
  if (action === "setUnit" && res) {
    // res = {pozFrom, pozTo} - если выбран звуковой интервал
    var isAdd = __WEBPACK_IMPORTED_MODULE_2__modelTxt__["a" /* default */].setUnit(res); // isAdd - если выделена область текста, тогда устанавливаем для неё звуковой интервал
    if (isAdd) __WEBPACK_IMPORTED_MODULE_1__modelAudio__["a" /* default */].nextUnit();
  }
  __WEBPACK_IMPORTED_MODULE_1__modelAudio__["a" /* default */].advertPozz();
};

model.fnEditAudio = function (action, args) {
  // возможно args не понадобится
  //if (state === 'add') model.toogleState();  // если используется клавиатура
  if (action === "repeate") __WEBPACK_IMPORTED_MODULE_1__modelAudio__["a" /* default */][action](args);
  if (action === "cleare") {
    var interval = __WEBPACK_IMPORTED_MODULE_2__modelTxt__["a" /* default */].deleteUnit(); //
    if (interval) {
      __WEBPACK_IMPORTED_MODULE_1__modelAudio__["a" /* default */].assignInterval(interval);
    } else {
      model.toogleState();
    }
  }
  __WEBPACK_IMPORTED_MODULE_1__modelAudio__["a" /* default */].advertPozz();
};

///////************  save/restore ************

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

  transl.onclick = function (event) {
    var target = event.target;
    if (!target.hasAttribute('act')) return;
    target.blur(); //убираем фокусировку, чтобы пробел не срабатывал как нажатие на кнопку
    var attr = target.getAttribute('act');
    __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].fnTransl(attr);
  };

  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].on('changeState', changeState); //меняем набор кнопок
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].on('decodedAudio', handlerDecoded);
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
      __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].fnAudio(attr);
    }
  };
  intervals.onclick = function (event) {
    var target = event.target;
    if (target.hasAttribute('act')) {
      target.blur(); //убираем фокусировку, чтобы пробел не срабатывал как нажатие на кнопку
      var attr = target.getAttribute('act');
      __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].fnEditAudio(attr);
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
  input.removeEventListener('change', chooseFile);
  __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].off('decodedAudio', setInfoLodedAudio);
};

function clickInput() {
  input.click();
}

function choosedFile() {
  if (input.files.length === 0) return; //здесь ";" обязательно
  var file = input.files[0];
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
      __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].fnTxtSelection('reduceSelection');
    });
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__model_keyboard__["a" /* default */])('arrowRight', function () {
      __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].fnTxtSelection('addSelection');
    });
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__model_keyboard__["a" /* default */])('space', function () {
      __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].fnAudio('tooglePlay');
    });
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__model_keyboard__["a" /* default */])('ctrlSpace', function () {
      __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].fnAudio('repeate');
    });
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__model_keyboard__["a" /* default */])('shiftSpace', function () {
      __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].fnAudio('setUnit');
    });
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__model_keyboard__["a" /* default */])('tab', function () {
      __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].toogleState('edit');
    });
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__model_keyboard__["a" /* default */])('shiftTab', function () {
      __WEBPACK_IMPORTED_MODULE_0__model_model__["a" /* default */].toogleState('transl');
    });
  },

  close: function close() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__model_keyboard__["a" /* default */])('clear');
  }
};

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
  //size: null
};

var modelAudio = {
  decodeFile: function decodeFile(_ref) {
    var name = _ref.name,
        path = _ref.path,
        content = _ref.content;

    api.decode(content).then(function (res) {
      duration = res;
      file.name = { name: name, path: path };
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


var _window$require = window.require('electron'),
    ipcRenderer = _window$require.ipcRenderer;

var subfolder = 'target';
var file = {}; // {name, path, size}
// path: fullPath + name
var nodeTransl = null,
    // весь элемент
nodeCurrent = null,
    nodeSelection = null; // выделяется из nodeCurrent
//nodeLast = null


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
  nodeCurrent = nodeTransl.querySelector('#current-transl');

  file = { name: name, path: path /*, startPoz: getStartPoz()*/ };
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
    s = '<main-info lang="ru"></main-info>\n         <span id="selection-transl"></span>\n         <span id="current-transl">&nbsp&nbsp' + s + '</span>';
    return s;
  }
};

function setLocalStorage() {
  localStorage.setItem('path-transl', file.path);
  localStorage.setItem('name-transl', file.name);
}

var setState = function setState(state) {};

// Сохранение файла
var save = function save() {
  if (!file.name) return;
  //cleareSelection();
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

/*
// Изменение области выделения
modelTransl.addSelection = () => {
  //if (stateTxt === 'delete interval') return;
  let current = nodeCurrent.innerHTML
  let selection = nodeSelection.innerHTML
  if (!current) return;
  const s = current.match(/^.+?(\s|<br>)/)
  if (s) {
    nodeSelection.innerHTML = selection + s[0]
    nodeCurrent.innerHTML = current.slice(s[0].length)
  } else {  //конец текстового файла
    nodeSelection.innerHTML = selection + current
    nodeCurrent.innerHTML = ''
  }
}

modelTransl.reduceSelection = () => {
  //if (stateTxt === 'delete interval') return;
  //let current = nodeCurrent.innerHTML
  let selection = nodeSelection.innerHTML
  if(!selection) return;
  const s = selection.match(/.+(\s|<br>)(.+(\s|<br>)?)$/)
  if(s) {
    nodeCurrent.innerHTML = s[2] + current;
    nodeSelection.innerHTML = selection.slice(0, -s[2].length);
  } else {
    nodeCurrent.innerHTML = selection + current;
    nodeSelection.innerHTML = '';
  }
}
*/

// Выделенный участок перемещаем в оставшуюся область, выделяем предыдущий участок
/*
modelTransl.deleteUnit = () => {
  let _from, _to;   // from - показывает ключевое слово
  let span = nodeLast.previousElementSibling;  // возможно можно const span
  nodeLast.removeAttribute('id');
  const txtTmp = nodeLast.innerHTML;
  nodeCurrent.innerHTML = txtTmp + nodeCurrent.innerHTML;
  nodeLast.remove();
  if (span && span.hasAttribute('from') &&  span.hasAttribute('to')) {
    _from = + span.getAttribute('from');
    _to = + span.getAttribute('to');
    span.id = 'last-txt';
    nodeLast = span;
  }
  return { _from, _to };
}

modelTransl.setStateTransl = () => {
  if (nodeLast) nodeLast.removeAttribute('id');
  nodeLast = null;
}

modelTransl.setStateDelete = () => {
  let _from, _to;   // from - показывает ключевое слово
  if (!nodeSelection) return;
  nodeLast = nodeSelection.previousElementSibling;
  if(!nodeLast || !nodeLast.hasAttribute('from')) return;
  _from = nodeLast.getAttribute('from');
  _to = nodeLast.getAttribute('to');
  nodeLast.id = 'last-txt';
  cleareSelection();
  return { _from, _to };
}

function cleareSelection() {
  const current = nodeCurrent.innerHTML;
  const selection = nodeSelection.innerHTML;
  if(selection) {
    nodeCurrent.innerHTML = selection + current;
    nodeSelection.innerHTML = '';
  }
}
*/

/*
function getStartPoz() {
  let poz = 0;
  const span = nodeSelection.previousElementSibling;
  if (span && span.hasAttribute('to')) poz = + span.getAttribute('to');
  return poz;
}
*/

var modelTransl = {
  setRoot: setRoot,
  setLoadedFile: setLoadedFile,
  setState: setState,
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

modelTxt.setState = function (state) {
  var res = false;
  if (state !== 'add') clearNodeAdd();
  if (state !== 'delete') clearNodeDelete();
  if (state !== 'transl') clearNodeTranl();
  if (state === 'add') res = getLastPoz();
  if (state === 'delete') res = getRangeLastNode();
  return res;
};

function clearNodeAdd() {
  var selection = nodeAdd.innerHTML;
  if (selection) {
    nodeBlank.innerHTML = selection + nodeBlank.innerHTML;
    nodeAdd.innerHTML = '';
  }
  return false;
}

function clearNodeDelete() {
  if (nodeDelete) nodeDelete.removeAttribute('id');
  if (nodeTransl) nodeDelete.removeAttribute('id');
  nodeDelete = nodeTransl = null;
}

function clearNodeTranl() {}

function getLastPoz() {
  var _from = '0',
      _to = '0';
  var lastNode = nodeAdd.previousElementSibling;
  if (!lastNode || !lastNode.hasAttribute('to')) return;
  _from = _to = lastNode.getAttribute('to');
  return { _from: _from, _to: _to };
}

function getRangeLastNode() {
  var _from = '0',
      _to = '0';
  var lastNode = nodeAdd.previousElementSibling;
  if (!lastNode || !lastNode.hasAttribute('from')) return;
  _from = lastNode.getAttribute('from');
  _to = lastNode.getAttribute('to');
  return { _from: _from, _to: _to };
}

////////////************ Сохранение/восстановление файла *************

modelTxt.save = function () {
  if (!file.name) return; // можно другое свойство file проверить, Boolean(file = {}) = true
  cleareSelection();
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

/////////////************  Изменение состояния  ************************


modelTxt.setStateDelete = function () {
  var _from = void 0,
      _to = void 0; // from - показывает ключевое слово
  if (!nodeAdd) return;
  nodeDelete = nodeAdd.previousElementSibling;
  if (!nodeDelete || !nodeDelete.hasAttribute('from')) return;
  _from = nodeDelete.getAttribute('from');
  _to = nodeDelete.getAttribute('to');
  nodeDelete.id = 'delete-txt';
  cleareSelection();
  return { _from: _from, _to: _to };
};

modelTxt.setStateTransl = function () {};

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

function cleareSelection() {
  var current = nodeBlank.innerHTML;
  var selection = nodeAdd.innerHTML;
  if (selection) {
    nodeBlank.innerHTML = selection + current;
    nodeAdd.innerHTML = '';
  }
}

function getStartPoz() {
  var poz = 0;
  var span = nodeAdd.previousElementSibling;
  if (span && span.hasAttribute('to')) poz = +span.getAttribute('to');
  return poz;
}

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

exports = module.exports = __webpack_require__(18)(false);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\nhtml, body, div, span, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, address, big, cite, code,\ndel, em, img, small, strike, strong, tt,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline; }\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block; }\n\nbody {\n  line-height: 1; }\n\nol, ul {\n  list-style: none; }\n\nblockquote, q {\n  quotes: none; }\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: '';\n  content: none; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\n/************************************\r\n\tПервая палитра\r\n*************************************/\n/************************************\r\n\tВторая палитра\r\n*************************************/\nhtml, body {\n  height: 100%; }\n\n#work {\n  background-color: #e8f3f7;\n  display: flex;\n  flex-flow: column nowrap;\n  height: 100%; }\n  #work .part {\n    margin: 0px 5px 5px 5px; }\n  #work #files {\n    margin: 5px 5px 5px 0px; }\n\n#area {\n  flex: 1 0 100px;\n  background-color: #f4f8f7;\n  display: flex; }\n\n#info {\n  background-color: #B6D0C9; }\n\n#files {\n  display: flex;\n  flex-wrap: wrap; }\n  #files .file-field {\n    flex: 1 0 200px;\n    margin: 5px 0 0 5px;\n    background-color: #C2DFEA;\n    border: 0.5px solid #8C95AA;\n    border-radius: 4px;\n    padding: 6px;\n    cursor: pointer; }\n\n#btns-files-state {\n  display: flex; }\n  #btns-files-state .btns-file {\n    flex: 1 0 100px;\n    align-content: stretch;\n    display: flex; }\n    #btns-files-state .btns-file button {\n      width: 100px;\n      margin-right: 5px;\n      cursor: pointer;\n      color: #fdfaf2;\n      border: 0.5px solid #86644f;\n      border-radius: 4px;\n      padding: 5px;\n      background-color: #A47C64; }\n  #btns-files-state #btns-state {\n    flex: 1 0 100px;\n    align-content: right;\n    display: flex;\n    max-width: 400px; }\n    #btns-files-state #btns-state button {\n      flex: 1 0 25px;\n      margin-left: 5px;\n      cursor: pointer;\n      color: #fdfaf2;\n      border: 0.5px solid #86644f;\n      border-radius: 4px;\n      padding: 5px;\n      background-color: #255677; }\n    #btns-files-state #btns-state button.current {\n      background-color: #6e94b6; }\n\n/*\r\n.progress {\r\n  background-color: $a_blue;\r\n  position: absolute;\r\n  width: 30%;\r\n  height: 100%;\r\n  left: 0px;\r\n  top: 0px;\r\n  opacity: 0.3;\r\n}\r\n*/\n#info {\n  display: flex;\n  border: 0.5px solid #8C95AA; }\n  #info div {\n    flex: 1 1 270px;\n    padding: 5px;\n    overflow: auto; }\n  #info .mid-border {\n    border-left: 0.5px solid #8C95AA; }\n  #info .td-border {\n    border-left: 0.5px solid #8C95AA; }\n\n#btns {\n  display: flex; }\n\n#btns-intervals, #btns-transl {\n  display: none; }\n\n#btns button, #btns-intervals button, #btns-transl button {\n  background-color: #879c64;\n  color: #e7ece0;\n  border-radius: 5px;\n  margin: 0 1px;\n  padding: 5px 0;\n  cursor: pointer; }\n\n#btns {\n  justify-content: space-between; }\n  #btns .btns-group {\n    display: flex; }\n  #btns .btns-control button {\n    width: 70px; }\n  #btns .btns-from-to button {\n    width: 47px; }\n  #btns .btns-from-to button.z {\n    width: 30px; }\n\n#btns-intervals button, #btns-transl button {\n  width: 100px; }\n\n#txt {\n  padding: 5px;\n  overflow-y: scroll;\n  color: #50a3c3; }\n  #txt #blank-txt {\n    background-color: #50a3c3;\n    color: #f7fbfc; }\n  #txt #add-txt {\n    color: black; }\n  #txt #delete-txt {\n    background-color: #6e557b;\n    color: #f7fbfc; }\n\n#transl {\n  display: none;\n  padding: 5px;\n  overflow-y: scroll;\n  color: #50a3c3; }\n  #transl #add-transl {\n    background-color: #50a3c3;\n    color: #f7fbfc; }\n  #transl #blank-transl {\n    color: black; }\n\n#area .area {\n  border: 0.5px solid #8C95AA;\n  flex: 1 0 100px; }\n", ""]);

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


/***/ })
/******/ ]);