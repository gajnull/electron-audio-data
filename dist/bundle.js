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
/* harmony default export */ __webpack_exports__["a"] = (setHotKey);

var evs = void 0; //var чтобы не было ошибки при повторной встрече

var keyCodes = {
  37: 'arrowLeft', // <- влево
  39: 'arrowRight', // -> вправо
  32: 'space', // _ пробел
  9: 'tab' // tab
};

setHotKey.init = function () {
  if (evs) {
    console.warn('setHotKey инициализирована');
    return;
  }
  evs = {
    arrowLeft: function arrowLeft() {},
    arrowRight: function arrowRight() {},
    space: function space() {}
  };
  document.onkeydown = keyboardHandler;
};

function setHotKey(hotKey, fn) {
  if (!evs) {
    console.warn('setHotKey неинициализирована');
    return;
  }
  evs[hotKey] = fn;
}

function keyboardHandler(ev) {
  //console.log(ev.keyCode);
  var fn = keyCodes[ev.keyCode];
  if (fn) {
    evs[fn]();
  }
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vent = function () {
  function Vent(evs) {
    _classCallCheck(this, Vent);

    this.evs = evs;
  }

  _createClass(Vent, [{
    key: "on",
    value: function on(ev, fn) {
      this.evs[ev].push(fn);
    }
  }, {
    key: "off",
    value: function off(ev, fn) {
      this.evs[ev] = this.evs[ev].filter(function (fnEv) {
        return fnEv !== fn;
      });
    }
  }, {
    key: "publish",
    value: function publish(ev, data) {
      //console.log(ev)
      //console.log(evs)
      // if (ev !== 'changedPoz') {
      //   console.log(ev);
      //   console.log(this.evs[ev]);
      // }
      this.evs[ev].forEach(function (fnEv) {
        fnEv(data);
      });
    }
  }]);

  return Vent;
}();

/* harmony default export */ __webpack_exports__["a"] = (Vent);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = work;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_style_scss__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scss_style_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_keyboard__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__js_model_model__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__js_file_txt__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__js_area_txt__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__js_file_end__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__js_file_audio__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__js_control_audio__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__js_infoTiming__ = __webpack_require__(9);






//import modelTxt from './js/model/modelTxt'




//import ModelAudio from './js/model/modelAudio'




function work() {

  __WEBPACK_IMPORTED_MODULE_1__js_keyboard__["a" /* default */].init();

  __WEBPACK_IMPORTED_MODULE_3__js_file_txt__["a" /* default */].init(__WEBPACK_IMPORTED_MODULE_2__js_model_model__["a" /* default */]);
  __WEBPACK_IMPORTED_MODULE_4__js_area_txt__["a" /* default */].init(__WEBPACK_IMPORTED_MODULE_2__js_model_model__["a" /* default */]);
  __WEBPACK_IMPORTED_MODULE_5__js_file_end__["a" /* default */].init(__WEBPACK_IMPORTED_MODULE_2__js_model_model__["a" /* default */]);

  __WEBPACK_IMPORTED_MODULE_6__js_file_audio__["a" /* default */].init(__WEBPACK_IMPORTED_MODULE_2__js_model_model__["a" /* default */]);
  __WEBPACK_IMPORTED_MODULE_7__js_control_audio__["a" /* default */].init(__WEBPACK_IMPORTED_MODULE_2__js_model_model__["a" /* default */]);
  __WEBPACK_IMPORTED_MODULE_8__js_infoTiming__["a" /* default */].init(__WEBPACK_IMPORTED_MODULE_2__js_model_model__["a" /* default */]);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__keyboard__ = __webpack_require__(0);


var areaTxt = {};
var model = void 0,
    area = void 0;

areaTxt.init = function (_model) {
  model = _model;

  area = document.getElementById('txt');
  model.setArea(area);

  ////model.on('loadedLngt', setPozAudio);
  //mAudio.on('addInterval', addInterval)

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__keyboard__["a" /* default */])('arrowRight', addSelection);
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__keyboard__["a" /* default */])('arrowLeft', reduceSelection);
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__keyboard__["a" /* default */])('tab', toogleState);
};

areaTxt.close = function () {
  //mAudio.off('addInterval', addInterval)
  ////model.off('loadedLngt', setPozAudio);

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__keyboard__["a" /* default */])('arrowRight', function () {});
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__keyboard__["a" /* default */])('arrowLeft', function () {});
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__keyboard__["a" /* default */])('tab', function () {});
};

// function setPozAudio({poz}) {
//   mAudio.setStartPoz(poz);
// }

//////////////////////////
function addSelection() {
  model.fnTxt('addSelection');
}

function reduceSelection() {
  model.fnTxt('reduceSelection');
}

function toogleState() {
  model.toogleState();
}

/* harmony default export */ __webpack_exports__["a"] = (areaTxt);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__keyboard__ = __webpack_require__(0);



var controlAudio = {};

var model = void 0,
    txt = void 0,
    audio = void 0,
    vent = void 0,
    btns = void 0,
    intervals = void 0,
    btnPlay = void 0;

controlAudio.init = function (_model) {
  model = _model;
  var _model2 = model,
      txt = _model2.txt,
      audio = _model2.audio,
      vent = _model2.vent; // let нужен по синтаксу es6

  btns = document.getElementById('btns');
  intervals = document.getElementById('edit-intervals');
  btnPlay = btns.querySelector('button[act="tooglePlay"]');

  vent.on('changeStateEdit', changeStateEdit); //меняем набор кнопок
  vent.on('decodedAudio', handlerDecoded);
  vent.on('changeStateAudio', changeBtnPlay); //меняем кнопку stop/play
};

controlAudio.close = function () {
  vent.off('decodedAudio', handlerDecoded);
  vent.off('changeStateAudio', changeBtnPlay);
  vent.off('changeStateEdit', changeStateEdit);
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__keyboard__["a" /* default */])('space', function () {});
  btns.onclick = '';
  btns = null;
};

function handlerDecoded() {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__keyboard__["a" /* default */])('space', function () {
    mAudio.tooglePlay();
  });
  btns.onclick = function (event) {
    var target = event.target;
    if (target.hasAttribute('act')) {
      target.blur(); //убираем фокусировку, чтобы пробел не срабатывал как нажатие на кнопку
      var attr = target.getAttribute('act');
      switch (attr) {
        case 'addInterval':
          var b = txt.addInterval(audio.getInterval());
          if (b) audio.nextInterval();
          break;
        default:
          audio[attr]();
      }
    }
  };
}

function changeBtnPlay() {
  if (audio.playing) {
    btnPlay.innerHTML = 'Stop';
  } else {
    btnPlay.innerHTML = 'Play';
  }
}

function changeStateEdit(_ref) {
  var stateEdit = _ref.stateEdit,
      _from = _ref._from,
      _to = _ref._to;

  if (stateEdit === 'add interval') {
    btns.style.display = 'flex';
    intervals.style.display = 'none';
    audio.nextInterval();
  } else {
    btns.style.display = 'none';
    intervals.style.display = 'flex';
    audio.gotoInterval(_from, _to);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (controlAudio);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/****************************************************************
  во внешнем модуле используется fileAudio.init(model) и
  fileAudio.close(model)

*****************************************************************/

var fileAudio = {};

var model = void 0,
    btn = void 0,
    input = void 0;

fileAudio.init = function (_ref) {
  var audio = _ref.audio;

  model = audio;
  btn = document.getElementById('file-audio');
  input = document.getElementById('input-audio');

  btn.addEventListener('click', clickInput);
  input.addEventListener('change', choosedFile);
};

fileAudio.close = function () {
  btn.removeEventListener('click', clickInput);
  input.removeEventListener('change', chooseFile);
};

function clickInput() {
  input.click();
}

function choosedFile() {
  if (input.files.length === 0) return; //здесь ";" обязательно
  var file = input.files[0];
  var path = file.path;
  var name = file.name;

  btn.innerHTML = file.name;
  btn.setAttribute('title', path);

  var reader = new FileReader();
  reader.readAsArrayBuffer(file);
  /*
    reader.onloadstart = startProgress
    reader.onprogress = updateProgress
    */
  reader.onload = loaded;
  reader.onerror = errorHandler;

  /*
    function startProgress(ev) {
      progress.style.display = 'block'
      setWidthProgress(0)
    }
  
    function updateProgress(ev) {
      //console.log(ev.loaded)
      if (ev.lengthComputable) {
        var loaded = (ev.loaded / ev.total)
        if (loaded < 1) {
          setWidthProgress(loaded)  //остальную половину будет декодироваться аудио
        }
      } else {
        // тогда будет анимация загрузки средствами css
      }
    }
  */

  function loaded(ev) {
    //setWidthProgress(0)
    model.file = { name: name, path: path, size: file.size };
    model.decode(ev.target.result);
    /*    model.decode(ev.target.result, function(duration) {
          model.file = {name, path, size: file.size}
          model.duration = duration
          model.publish('decodedAudio')
          //model.changePoz()
        })
    */
  }

  function errorHandler(ev) {
    if (ev.target.error.name == "NotReadableError") {
      path.innerHTML = 'Выберите другой звуковой файл';
    }
  }
}

function handleDecodedAudio(data) {} // пока не используется (ф-ция подписчмк на декодирование)

/*
function setWidthProgress(value) {
  const width = 20 + value * 70
  progress.style.width = width + '%'
}
*/

/* harmony default export */ __webpack_exports__["a"] = (fileAudio);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//export const something = 'test'
var fileEnd = {};

var mTxt = void 0,
    mVent = void 0,
    nameEnd = void 0,
    btnSave = void 0,
    btnRestore = void 0;
//progress,

fileEnd.init = function (_ref) {
  var vent = _ref.vent,
      txt = _ref.txt;

  mTxt = txt;
  mVent = vent;

  nameEnd = document.getElementById('name-lngt');
  btnSave = document.querySelector('#file-end button[act=save]');
  btnRestore = document.querySelector('#file-end button[act=restore]');

  btnSave.addEventListener('click', saveFile);
  btnRestore.addEventListener('click', restoreFile);
  mVent.on('loadedLngt', writeName);
};

fileEnd.close = function () {
  btnSave.removeEventListener('click', saveFile);
  btnRestore.removeEventListener('click', restoreFile);
  mVent.off('loadedLngt', writeName);
};

function saveFile() {
  var name = nameEnd.value;
  if (!name) nameEnd.value = name = 'noName';
  mTxt.save(name);
}

function restoreFile() {
  mTxt.restore();
}

function writeName(_ref2) {
  var name = _ref2.name;

  var res = name.match(/^(.+)\.\w{2,6}$/i); // {2,6} - перестраховались
  if (res) nameEnd.value = res[1];
}

/* harmony default export */ __webpack_exports__["a"] = (fileEnd);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/****************************************************************
  Компонент для загрузки текстового файла.
  во внешнем модуле используется fileTxt.init(model) и
   fileTxt.close()
  генерирует событие получения контента текстового файл
*****************************************************************/

var fileTxt = {};

var mTxt = void 0,
    mVent = void 0,
    btn = void 0,
    input = void 0;

fileTxt.init = function (_ref) {
  var vent = _ref.vent,
      txt = _ref.txt;

  mTxt = txt;
  mVent = vent;
  btn = document.getElementById('file-txt');
  input = document.getElementById('input-txt');

  btn.addEventListener('click', clickInput);
  input.addEventListener('change', choosedFile);
  mVent.on('loadedLngt', setInfoLodedLngt);
  mVent.on('savedLngt', setInfoLodedLngt);
};

fileTxt.close = function () {
  btn.removeEventListener('click', clickInput);
  input.removeEventListener('change', choosedFile);
  mVent.off('loadedLngt', setInfoLodedLngt);
  mVent.on('savedLngt', setInfoLodedLngt); // 'savedLngt' нельзя объеденить с 'loadedLngt'
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
  var size = file.size;

  btn.innerHTML = 'loding...';

  var reader = new FileReader();
  reader.readAsText(file);

  //reader.onloadstart = startProgress
  //reader.onprogress = updateProgress
  reader.onload = loaded;
  reader.onerror = errorHandler;

  function loaded(ev) {
    var content = ev.target.result;
    if (/\.txt$/.test(name)) {
      content = txtToLngt(content);
    }

    mTxt.setLoadedFile({ name: name, path: path, size: size, content: content });
  }

  function txtToLngt(str) {
    var s = str;
    //Нормализуем - убираем из текста возможные тэги
    s = s.replace(/</g, '(').replace(/>/g, ')');
    //Заменяем абзацы и упорядочиваем пробелы
    s = s.replace(/\n/g, '<br>');
    s = s.replace(/\s*<br>\s*/g, '<br>&nbsp&nbsp'); //для отступа
    s = s.replace(/\s+/g, ' '); //все пробелы однотипные и по одному
    s = s.replace(/\s([.,:;!\)])/g, '$1'); //убираем ненужные пробелы
    //Добавляем тэги для начальной работы с текстом
    s = '<span id="selection-txt"></span>\n         <span id="current-txt">&nbsp&nbsp' + s + '</span>';
    return s;
  }

  function errorHandler(ev) {
    if (ev.target.error.name == "NotReadableError") {
      btn.innerHTML = 'Выберите другой текстовой файл';
    }
  }
}

function setInfoLodedLngt(_ref2) {
  var path = _ref2.path,
      name = _ref2.name;

  btn.innerHTML = name;
  btn.setAttribute('title', path);
}

/* harmony default export */ __webpack_exports__["a"] = (fileTxt);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var infoTiming = {};

var mAudio = void 0,
    mVent = void 0,
    info = void 0;

infoTiming.init = function (_ref) {
  var vent = _ref.vent,
      audio = _ref.audio;

  mAudio = audio;
  mVent = vent;
  mVent.on('changedPoz', showChangedPoz);
  info = document.getElementById('info');
};

infoTiming.close = function () {
  mVent.off('changedPoz', showChangedPoz);
  info = null;
};

function showChangedPoz(_ref2) {
  var _ref2$pozCurrent = _ref2.pozCurrent,
      pozCurrent = _ref2$pozCurrent === undefined ? 0 : _ref2$pozCurrent,
      _ref2$duration = _ref2.duration,
      duration = _ref2$duration === undefined ? 0 : _ref2$duration,
      _ref2$pozMin = _ref2.pozMin,
      pozMin = _ref2$pozMin === undefined ? 0 : _ref2$pozMin,
      _ref2$pozFrom = _ref2.pozFrom,
      pozFrom = _ref2$pozFrom === undefined ? 0 : _ref2$pozFrom,
      _ref2$pozTo = _ref2.pozTo,
      pozTo = _ref2$pozTo === undefined ? 0 : _ref2$pozTo;


  var localPoz = (pozCurrent - pozMin).toFixed(1);
  var localFrom = (pozFrom - pozMin).toFixed(1);
  var localTo = (pozTo - pozMin).toFixed(1);
  var totalPoz = (+pozCurrent).toFixed(1);
  var total = (+duration).toFixed(1);

  info.innerHTML = '\n    <div>\n      <span> \u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u043E\u0442\u0440\u0435\u0437\u043E\u043A (\u0432\u044B\u0431\u0440\u0430\u043D\u043E): </span>\n      <span info = "curr-region"> ' + localPoz + ' (' + localFrom + ' - ' + localTo + ')</span>\n    </div>\n    <div class = "mid-border">\n      <span> \u041F\u043E\u0437\u0438\u0446\u0438\u044F \u0432 \u0444\u0430\u0439\u043B\u0435/\u0412\u0441\u0435\u0433\u043E: </span>\n      <span info = "poz-file"> ' + totalPoz + ' / ' + total + ' </span>\n    </div>\n  ';
}

/* harmony default export */ __webpack_exports__["a"] = (infoTiming);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vent__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modelAudio__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modelTxt__ = __webpack_require__(12);
//export const something = 'test'




var model = new __WEBPACK_IMPORTED_MODULE_0__Vent__["a" /* default */]({
  //lngt events
  loadedLngt: [],
  savedLngt: [],
  changeStateEdit: [],
  //audio events
  decodedAudio: [],
  changedPoz: [],
  changeStateAudio: []
});

//modelTxt.setVent(vent);
//const audio = new ModelAudio(vent);

model.setArea = function (area) {
  __WEBPACK_IMPORTED_MODULE_2__modelTxt__["a" /* default */].setRoot(area);
};

model.fnTxt = function (action) {
  __WEBPACK_IMPORTED_MODULE_2__modelTxt__["a" /* default */][action]();
};

model.toogleState = function () {
  //modelTxt.toogleState();
};

/* harmony default export */ __webpack_exports__["a"] = (model);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vent__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__webAudioAPI__ = __webpack_require__(13);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var ModelAudio = function () {
  function ModelAudio(_vent) {
    _classCallCheck(this, ModelAudio);

    this.vent = _vent;

    this.file = { // пока не используется
      name: null,
      path: null,
      size: null
    };
    this.api = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__webAudioAPI__["a" /* default */])();

    this.pozMin = 0; // Позиция конца предыдущего отрезка
    this.pozCurrent = 0; // Текущая позиция
    this.duration = 0; // Продолжительность всего ауиотрека.
    // Запомненный отрезок
    this.pozFrom = 0;
    this.pozTo = 0;
    this.delta = 0.1; // Шаг изменения позиции отрезка
  }

  _createClass(ModelAudio, [{
    key: 'decode',
    value: function decode(rawData) {
      this.playing = false;

      this.timer = null;
      this.timerStop = null;

      this.api.decode(rawData, decodedAudio.bind(this));

      function decodedAudio(duration) {
        this.duration = duration;
        this.vent.publish('decodedAudio');
        this.changePoz();
      }
    }
  }, {
    key: 'changePoz',
    value: function changePoz() {
      this.vent.publish('changedPoz', { pozMin: this.pozMin,
        duration: this.duration,
        pozCurrent: this.pozCurrent,
        pozFrom: this.pozFrom,
        pozTo: this.pozTo });
    }

    ///// проигрывание/остановка

  }, {
    key: 'tooglePlay',
    value: function tooglePlay() {
      //проигрываем с момента остановки
      if (this.playing) {
        this.stop();
      } else {
        this.play();
      }
    }
  }, {
    key: 'play',
    value: function play() {
      var _this = this;

      this.api.play(this.pozCurrent);
      this.playing = true;
      this.vent.publish('changeStateAudio');
      this.timer = setInterval(function () {
        _this.pozCurrent = _this.api.getCurrentPoz();
        if (_this.pozCurrent > _this.duration) _this.stop();
        _this.changePoz();
      }, 100);
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (!this.playing) return; //не должно быть
      this.pozCurrent = this.api.stop();
      this.playing = false;
      this.vent.publish('changeStateAudio');
      if (this.pozCurrent > this.duration) this.pozCurrent = this.duration; //не должно быть - может превысить на доли секунды
      clearInterval(this.timer);
      if (this.timerStop) {
        clearTimeout(this.timerStop);
      }
      this.changePoz();
    }
  }, {
    key: 'repeate',
    value: function repeate() {
      var _this2 = this;

      //проигрываем выбранный отрезок
      if (this.playing) return;
      this.pozCurrent = this.pozFrom;
      this.play();
      this.playing = true;
      var period = (this.pozTo - this.pozFrom) * 1000;
      this.timerStop = setTimeout(function () {
        _this2.stop();
      }, period);
    }

    // внесение в текстовой файл выбранный интервал

  }, {
    key: 'getInterval',
    value: function getInterval() {
      if (this.playing) return;
      return { pozFrom: this.pozFrom, pozTo: this.pozTo };
    }
  }, {
    key: 'nextInterval',
    value: function nextInterval() {
      this.pozMin = this.pozFrom = this.pozCurrent = this.pozTo;
      this.changePoz();
    }

    // установка аудиоинтервала

  }, {
    key: 'gotoInterval',
    value: function gotoInterval(_from, _to) {
      this.pozMin = this.pozCurrent = this.pozFrom = +_from;
      this.pozTo = +_to;
      this.changePoz();
    }

    //// переход позиции старт, от и до (может в if(this.playing) вместо return надо this.stop(); )

  }, {
    key: 'gotoStart',
    value: function gotoStart() {
      if (this.playing) return;
      this.pozCurrent = this.pozMin;
      this.changePoz();
    }
  }, {
    key: 'gotoFrom',
    value: function gotoFrom() {
      if (this.playing) return;
      this.pozCurrent = this.pozFrom;
      this.changePoz();
    }
  }, {
    key: 'gotoTo',
    value: function gotoTo() {
      if (this.playing) return;
      this.pozCurrent = this.pozTo;
      this.changePoz();
    }

    //// установка и изменение позицй от и до

  }, {
    key: 'fromMoveBack',
    value: function fromMoveBack() {
      var newPoz = Math.round((this.pozFrom - this.delta) * 10) / 10;
      if (newPoz < this.pozMin) {
        newPoz = this.pozMin;
      } // тогда скорее всего будет повторение, но иначе число this.pozMin может быть слишком дробным
      this.pozFrom = newPoz;
      this.changePoz();
    }
  }, {
    key: 'fromSet',
    value: function fromSet() {
      this.pozFrom = +this.pozCurrent.toFixed(1);
      if (this.pozTo < this.pozFrom) this.pozTo = this.pozFrom;
      this.changePoz();
    }
  }, {
    key: 'fromMoveForward',
    value: function fromMoveForward() {
      var newPoz = Math.round((this.pozFrom + this.delta) * 10) / 10;
      if (newPoz > this.duration) {
        newPoz = this.duration;
      }
      this.pozFrom = newPoz;
      if (this.pozFrom > this.pozTo) this.pozTo = this.pozFrom;
      this.changePoz();
    }
  }, {
    key: 'toMoveBack',
    value: function toMoveBack() {
      if (this.playing) return;
      var newPoz = Math.round((this.pozTo - this.delta) * 10) / 10;
      if (newPoz < this.pozMin) {
        newPoz = this.pozMin;
      } // тогда скорее всего будет повторение, но иначе число this.pozMin может быть слишком дробным
      this.pozTo = newPoz;
      if (this.pozTo < this.pozFrom) this.pozFrom = this.pozTo;
      this.changePoz();
    }
  }, {
    key: 'toSet',
    value: function toSet() {
      //if(this.playing) return;
      this.stop(); // this working only if this.playing = true
      this.pozTo = +this.pozCurrent.toFixed(1);
      if (this.pozFrom > this.pozTo) this.pozFrom = this.pozTo;
      this.changePoz();
    }
  }, {
    key: 'toMoveForward',
    value: function toMoveForward() {
      if (this.playing) return;
      var newPoz = Math.round((this.pozTo + this.delta) * 10) / 10;
      if (newPoz > this.duration) {
        newPoz = this.duration;
      }
      this.pozTo = newPoz;
      this.changePoz();
    }
  }, {
    key: 'setStartPoz',
    value: function setStartPoz(poz) {
      this.pozMin = this.pozCurrent = this.pozFrom = this.pozTo = +poz;
      //this.changePoz(); звуковой файл ещё может быть не загружен
    }
  }]);

  return ModelAudio;
}();

/* unused harmony default export */ var _unused_webpack_default_export = (ModelAudio);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vent__ = __webpack_require__(1);


var _window$require = window.require('electron'),
    ipcRenderer = _window$require.ipcRenderer;

var modelTxt = {};

var vent = void 0;

var subfolder = 'target';
var file = {}; // {name, path, size, content}
// path: fullPath + name
var nodeTxt = null;
var nodeCurrent = null;
var nodeSelection = null;
var nodeLast = null;
var stateEdit = 'add interval'; // 'delete interval'


// modelTxt.setVent = (_vent) => {
//   vent = _vent;
// }

// установка
modelTxt.setRoot = function (root) {
  nodeTxt = root;
};

modelTxt.setLoadedFile = function (_ref) {
  var name = _ref.name,
      path = _ref.path,
      size = _ref.size,
      content = _ref.content;

  nodeTxt.innerHTML = content;
  nodeSelection = nodeTxt.querySelector('#selection-txt'); // метод getElementById есть только у document
  nodeCurrent = nodeTxt.querySelector('#current-txt');
  var poz = 0;
  var span = nodeSelection.previousElementSibling;
  if (span && span.hasAttribute('to')) poz = +span.getAttribute('to');
  file = { name: name, path: path, size: size, poz: poz };
  localStorage.setItem('path-lngt', path);
  localStorage.setItem('name-lngt', name);
  vent.publish('loadedLngt', file); //почему-то this здесь не работает ??????
};

// Сохранение файла
modelTxt.save = function (nameLngt) {
  if (!nodeTxt || !file) return;
  var content = nodeTxt.innerHTML;
  if (!content) return;
  if (stateEdit === 'delete interval') modelTxt.toogleState();

  cleareSelection();
  content = nodeTxt.innerHTML;
  var name = nameLngt + '.lngt';
  var path = subfolder + '/' + name;
  var lngt = { name: name, path: path, content: content };
  file.temp = { name: name, path: path };
  ipcRenderer.send('will-save-file', lngt);
};

ipcRenderer.on('file-saved', function (event, arg) {
  var _file$temp = file.temp,
      name = _file$temp.name,
      path = _file$temp.path;

  if (arg) {
    console.log('error in saving:'); // in arg i send err
    console.log(arg);
    return;
  }
  localStorage.setItem('name-lngt', name); //если сохранили, запоминаем имя
  localStorage.setItem('path-lngt', path);
  vent.publish('savedLngt', { name: name, path: path });
});

// Восстановление файла
modelTxt.restore = function () {
  var name = localStorage.getItem('name-lngt');
  var path = localStorage.getItem('path-lngt');
  if (!name || !path) return;
  file.temp = { name: name, path: path };
  ipcRenderer.send('will-restore-file', { path: path });
};

ipcRenderer.on('file-restored', function (event, arg) {
  var _file$temp2 = file.temp,
      name = _file$temp2.name,
      path = _file$temp2.path;

  modelTxt.setLoadedFile({ name: name, path: path, content: arg, size: file.size });
});

// Изменение области выделения
modelTxt.addSelection = function () {
  if (stateEdit === 'delete interval') return;
  var current = nodeCurrent.innerHTML;
  var selection = nodeSelection.innerHTML;
  if (!current) return;
  var s = current.match(/^.+?(\s|<br>)/);
  if (s) {
    nodeSelection.innerHTML = selection + s[0];
    nodeCurrent.innerHTML = current.slice(s[0].length);
  } else {
    //конец текстового файла
    nodeSelection.innerHTML = selection + current;
    nodeCurrent.innerHTML = '';
  }
};

modelTxt.reduceSelection = function () {
  if (stateEdit === 'delete interval') return;
  var current = nodeCurrent.innerHTML;
  var selection = nodeSelection.innerHTML;
  if (!selection) return;
  var s = selection.match(/.+(\s|<br>)(.+(\s|<br>)?)$/);
  if (s) {
    nodeCurrent.innerHTML = s[2] + current;
    nodeSelection.innerHTML = selection.slice(0, -s[2].length);
  } else {
    nodeCurrent.innerHTML = selection + current;
    nodeSelection.innerHTML = '';
  }
};

// Установка аудиоинтервала в выделеный участок
modelTxt.addInterval = function (_ref2) {
  var pozFrom = _ref2.pozFrom,
      pozTo = _ref2.pozTo;

  if (!pozFrom || !pozTo) return false;
  //if (stateEdit === 'delete interval') return; этого не должно быть
  var selection = nodeSelection.innerHTML;
  if (selection.trim() === '') return false;
  nodeSelection.innerHTML = '';
  var span = document.createElement('span');
  span.innerHTML = selection;
  span.setAttribute('from', pozFrom);
  span.setAttribute('to', pozTo);
  nodeSelection.before(span);
  return true;
};

// изменение состояния
modelTxt.toogleState = function () {
  var _from = void 0,
      _to = void 0; // from - показывает ключевое слово
  if (stateEdit === 'delete interval') {
    nodeLast.removeAttribute('id');
    nodeLast = null;
    stateEdit = 'add interval';
  } else {
    if (!nodeSelection) return;
    nodeLast = nodeSelection.previousElementSibling;
    if (!nodeLast || !nodeLast.hasAttribute('from')) return;
    _from = nodeLast.getAttribute('from');
    _to = nodeLast.getAttribute('to');
    nodeLast.id = 'last-txt';
    cleareSelection();
    stateEdit = 'delete interval';
  }
  vent.publish('changeStateEdit', { stateEdit: stateEdit, _from: _from, _to: _to });
};

function cleareSelection() {
  var current = nodeCurrent.innerHTML;
  var selection = nodeSelection.innerHTML;
  if (selection) {
    nodeCurrent.innerHTML = selection + current;
    nodeSelection.innerHTML = '';
  }
}

/* harmony default export */ __webpack_exports__["a"] = (modelTxt);

/***/ }),
/* 13 */
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

  res.decode = function (rawData, fn) {
    //if (!(data instanceof ArrayBuffer)) return;
    context = new contextClass();
    context.decodeAudioData(rawData, function (audioBuffer) {
      buffer = audioBuffer;
      initVars();
      fn(buffer.duration);
    }, onError);
  };

  function initVars() {
    startTime = startPoz = 0;
    playing = false;
  }

  res.play = function (poz) {
    source = context.createBufferSource();
    source.connect(context.destination);
    source.buffer = buffer;

    startTime = context.currentTime;
    startPoz = poz || 0;
    source.start(0, startPoz);
    playing = true;
  };

  res.getCurrentPoz = function () {
    if (playing) {
      return context.currentTime - startTime + startPoz;
    } else return; // этого нельзя допускать
  };

  res.stop = function () {
    source.stop();
    return res.getCurrentPoz();
    playing = false;
  };

  function onError() {}

  return res;
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\nhtml, body, div, span, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, address, big, cite, code,\ndel, em, img, small, strike, strong, tt,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline; }\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block; }\n\nbody {\n  line-height: 1; }\n\nol, ul {\n  list-style: none; }\n\nblockquote, q {\n  quotes: none; }\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: '';\n  content: none; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\n/************************************\r\n\tПервая палитра\r\n*************************************/\n/************************************\r\n\tВторая палитра\r\n*************************************/\nhtml, body {\n  height: 100%; }\n\n#work {\n  background-color: #e8f3f7;\n  display: flex;\n  flex-flow: column nowrap;\n  height: 100%; }\n  #work .part {\n    margin: 0px 5px 5px 5px; }\n  #work #files {\n    margin: 5px 5px 5px 0px; }\n\n#txt {\n  background-color: #f4f8f7;\n  border: 0.5px solid #8C95AA;\n  flex: 1 0 100px;\n  overflow-y: scroll; }\n\n#info {\n  background-color: #B6D0C9; }\n\n#files {\n  display: flex;\n  flex-wrap: wrap; }\n  #files .file-field {\n    flex: 1 0 200px;\n    margin-left: 5px;\n    background-color: #C2DFEA;\n    border: 0.5px solid #8C95AA;\n    border-radius: 4px;\n    padding: 6px;\n    cursor: pointer; }\n\n#file-end {\n  display: flex; }\n  #file-end #name-lngt {\n    padding: 6px;\n    flex: 1 0 250px;\n    background-color: #f4ecf5;\n    border: 0.5px solid #8C95AA;\n    font-size: 0.9em; }\n  #file-end .btns-file {\n    flex: 1 0 150px;\n    align-content: stretch;\n    display: flex; }\n    #file-end .btns-file button {\n      flex: 1 0 40px;\n      margin-left: 5px;\n      cursor: pointer;\n      color: #fdfaf2;\n      border: 0.5px solid #86644f;\n      border-radius: 4px;\n      padding: 5px;\n      background-color: #A47C64; }\n\n.progress {\n  background-color: #8C95AA;\n  position: absolute;\n  width: 30%;\n  height: 100%;\n  left: 0px;\n  top: 0px;\n  opacity: 0.3; }\n\n#info {\n  display: flex;\n  border: 0.5px solid #8C95AA; }\n  #info div {\n    flex: 1 1 270px;\n    padding: 5px;\n    overflow: auto; }\n  #info .mid-border {\n    border-left: 0.5px solid #8C95AA; }\n  #info .td-border {\n    border-left: 0.5px solid #8C95AA; }\n\n#btns, #edit-intervals {\n  display: flex;\n  justify-content: space-between; }\n  #btns > div, #edit-intervals > div {\n    display: flex; }\n    #btns > div button, #edit-intervals > div button {\n      background-color: #879c64;\n      color: #e7ece0;\n      border-radius: 5px;\n      margin: 0 1px;\n      padding: 5px 0;\n      cursor: pointer; }\n  #btns .btns-control button, #edit-intervals .btns-control button {\n    width: 60px; }\n  #btns .btns-move button,\n  #btns .btns-from button,\n  #btns .btns-to button, #edit-intervals .btns-move button,\n  #edit-intervals .btns-from button,\n  #edit-intervals .btns-to button {\n    width: 47px; }\n  #btns .btns-from button.z,\n  #btns .btns-to button.z, #edit-intervals .btns-from button.z,\n  #edit-intervals .btns-to button.z {\n    width: 30px; }\n  #btns .toogle, #edit-intervals .toogle {\n    width: 80px;\n    background-color: #586278; }\n\n#edit-intervals {\n  display: none; }\n\n#txt {\n  padding: 5px; }\n  #txt span {\n    color: #50a3c3; }\n  #txt #selection-txt {\n    background-color: #50a3c3;\n    color: #f7fbfc; }\n  #txt #current-txt {\n    color: black; }\n  #txt #last-txt {\n    background-color: #6e557b;\n    color: #f7fbfc; }\n", ""]);

// exports


/***/ }),
/* 15 */
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(14);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(17)(content, options);
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
/* 17 */
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

var	fixUrls = __webpack_require__(18);

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
/* 18 */
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