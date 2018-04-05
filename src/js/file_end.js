//export const something = 'test'
const fileEnd = {}

let mTxt,
    mVent,
    nameEnd,
    btnSave, btnRestore
    //progress,

fileEnd.init = function({vent, txt}) {
  mTxt = txt;
  mVent = vent;

  nameEnd = document.getElementById('name-lngt')
  btnSave = document.querySelector('#file-end button[act=save]')
  btnRestore = document.querySelector('#file-end button[act=restore]')

  btnSave.addEventListener('click', saveFile)
  btnRestore.addEventListener('click', restoreFile)
  mVent.on('loadedLngt', writeName)
}

fileEnd.close = function() {
  btnSave.removeEventListener('click', saveFile)
  btnRestore.removeEventListener('click', restoreFile)
  mVent.off('loadedLngt', writeName)
}

function saveFile() {
  let name = nameEnd.value;
  if (!name) nameEnd.value = name = 'noName';
  mTxt.save(name);
}

function restoreFile() {
  mTxt.restore();
}

function writeName({name}) {
  const res = name.match(/^(.+)\.\w{2,6}$/i)  // {2,6} - перестраховались
  if(res) nameEnd.value = res[1]
}

export default fileEnd
