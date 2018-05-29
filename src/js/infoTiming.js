const infoTiming = {};

let model, info;

infoTiming.init = function(_model) {
  model = _model;
  model.on('changedPoz', showChangedPoz);
  info = document.getElementById('info');
}

infoTiming.close = function() {
  model.off('changedPoz', showChangedPoz);
  info = null;
}


function showChangedPoz({ pozCurrent = 0, duration = 0,
                          pozMin = 0, pozFrom = 0, pozTo = 0}) {

  const localPoz = (pozCurrent - pozMin).toFixed(1);
  const localFrom = (pozFrom - pozMin).toFixed(1);
  const localTo = (pozTo - pozMin).toFixed(1);
  const totalPoz = (+pozCurrent).toFixed(1);
  const total = (+duration).toFixed(1);

  info.innerHTML = `
    <div>
      <span> Текущий отрезок (выбрано): </span>
      <span info = "curr-region"> ${localPoz} (${localFrom} - ${localTo})</span>
    </div>
    <div class = "mid-border">
      <span> Позиция в файле/Всего: </span>
      <span info = "poz-file"> ${totalPoz} / ${total} </span>
    </div>
  `
}

export default infoTiming;
