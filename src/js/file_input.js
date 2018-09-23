/****************************************************************
  Компонент для загрузки всех файла.
*****************************************************************/
import model from './model/model';

const file = {};
let isLoading = false;

let input, btn;

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
  isLoading = true;
  let attr = '.lngt';
  type === 'lngt' && attr = '.txt,._lngt,.lngt';
  type === 'transl' && attr = '.txt,._transl,.transl';
  type === 'mp3' && attr = '.mp3,.wav';
  input.setAttribute('accept', attr);
  file.type = type;
  input.click();
}

function choosedFile() {
  if (input.files.length === 0) return; //здесь ";" обязательно
  const selectedFile = input.files[0];
  input.value = '';  // единственный способ чтобы заново открыть тотже файл
  file.path = selectedFile.path;
  file.name = selectedFile.name;
  file.size = selectedFile.size;
  console.log(file.size);

  btn.innerHTML = 'loding...';
  const reader = new FileReader();
  if(file.type === 'mp3') {
      reader.readAsArrayBuffer(file);
  } else {
      reader.readAsText(file);
  }

  //reader.onloadstart = startProgress
  //reader.onprogress = updateProgress
  reader.onload = loaded;
  reader.onerror = errorHandler;

  function loaded(ev) {
    file.content = ev.target.result;
    model.setLoadedFile(file);
  }

  function errorHandler(ev) {
    if(ev.target.error.name == "NotReadableError") {
      btn.innerHTML = 'Выберите другой текстовой файл';
    }
  }

}


const fileInput = {
  init,
  close,
  selectFile
};

export default fileInput;
