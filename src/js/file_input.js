/****************************************************************
  Компонент для загрузки всех файла.
*****************************************************************/
import model from './model/model';

const file = {};
let isLoading = false;

let input, field;

const init = () => {
  input = document.getElementById('input-files');
  input.addEventListener('change', choosedFile);
}

const close = () => {
  input.removeEventListener('change', choosedFile);
  input = null;
}


const selectFile = (type = 'lngt', btn) => {
  if (isLoading) return;
  let attr = '.lngt';
  if (type === 'lngt') attr = '.txt,._lngt,.lngt';
  if (type === 'transl') attr = '.txt,._transl,.transl';
  if (type === 'mp3') attr = '.mp3,.wav';
  field = btn
  input.setAttribute('accept', attr);
  file.type = type;
  input.click();
}

function choosedFile() {
  if (input.files.length === 0) return; //здесь ";" обязательно
  isLoading = true;
  const selectedFile = input.files[0];
  input.value = '';  // единственный способ чтобы заново открыть тотже файл
  file.path = selectedFile.path;
  file.name = selectedFile.name;
  file.size = selectedFile.size;

  field.innerHTML = 'loding...';
  const reader = new FileReader();
  if(file.type === 'mp3') {
      reader.readAsArrayBuffer(selectedFile);
  } else {
      reader.readAsText(selectedFile);
  }

  //reader.onloadstart = startProgress
  //reader.onprogress = updateProgress
  reader.onload = loaded;
  reader.onerror = errorHandler;

  function loaded(ev) {
    file.content = ev.target.result;
    model.setLoadedFile(file);
    isLoading = false;
  }

  function errorHandler(ev) {
    if(ev.target.error.name == "NotReadableError") {
      field.innerHTML = 'Выберите другой текстовой файл';
      isLoading = false;
    }
  }

}


const fileInput = {
  init,
  close,
  selectFile
};

export default fileInput;
