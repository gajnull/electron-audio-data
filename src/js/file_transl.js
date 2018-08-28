/****************************************************************
  Компонент для загрузки текстового файла.
  во внешнем модуле используется fileTxt.init() и fileTxt.close()
*****************************************************************/
import model from './model/model';


let btn, input;

const init = () => {
  btn = document.getElementById('file-transl');
  input = document.getElementById('input-transl');

  btn.addEventListener('click', clickInput);
  input.addEventListener('change', choosedFile);
  model.on('loadedTransl', setInfoLodedTransl);
  model.on('savedTransl', setInfoLodedTransl);
};

const close = () => {
  btn.removeEventListener('click', clickInput);
  input.removeEventListener('change', choosedFile);
  model.off('loadedTransl', setInfoLodedTransl);
  model.off('savedTransl', setInfoLodedTransl); // 'savedLngt' нельзя объеденить с 'loadedLngt'
 };                                             // так как на loadedLngt меняется содержимое текста


function clickInput() {
  input.click();
}

function choosedFile() {
  if (input.files.length === 0) return; //здесь ";" обязательно
  const file = input.files[0];
  input.value = '';  // единственный способ чтобы заново открыть тотже файл
  const path = file.path;
  const name = file.name;
  //const size = file.size;

  btn.innerHTML = 'loding...';

  const reader = new FileReader();
  reader.readAsText(file);

  //reader.onloadstart = startProgress
  //reader.onprogress = updateProgress
  reader.onload = loaded;
  reader.onerror = errorHandler;

  function loaded(ev) {
    const content = ev.target.result;
    model.setLoadedTranslFile({name, path, content}); //!!!
  }

  function errorHandler(ev) {
    if(ev.target.error.name == "NotReadableError") {
      btn.innerHTML = 'Выберите другой текстовой файл';
    }
  }

}

function setInfoLodedTransl({path, name}) {
  btn.innerHTML = name;
  btn.setAttribute('title', path);
}


const fileTransl = {
  init,
  close
}

export default fileTransl;
