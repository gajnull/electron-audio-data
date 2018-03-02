import Vent from './Vent'
const {ipcRenderer} = window.require('electron')

class ModelTxt extends Vent {
  constructor() {
    const evs = {
      loadedLngt: [],
      savedLngt: [],
      setMinPoz: [],
      changeStateEdit: []
    }
    super(evs)
  }
}

const subfolder = 'target'
let file = null       // {name, path, size, content}
                      // path: fullPath + name
let nodeTxt = null
let nodeCurrent = null
let nodeSelection = null
let nodeLast = null

const modelTxt = new ModelTxt()

modelTxt.stateEdit = 'add interval'  // 'delete interval'

modelTxt.setRoot = (root) => {
  nodeTxt = root
}

modelTxt.setLoadedFile = ({name, path, size, content}) => {
  nodeTxt.innerHTML = content
  nodeSelection = nodeTxt.querySelector('#selection-txt')  // метод getElementById есть только у document
  nodeCurrent = nodeTxt.querySelector('#current-txt')
  file = {name, path, size}
  localStorage.setItem('path-lngt', path)
  localStorage.setItem('name-lngt', name)
  modelTxt.publish('loadedLngt' , file) //почему-то this здесь не работает ??????
}

modelTxt.save = (nameLngt) => {
  if (!nodeTxt) return;
  const content = nodeTxt.innerHTML
  if (!content) return;

  const name = nameLngt + '.lngt'
  const path = subfolder + '/' + name
  const lngt = {name,  path, content}

  ipcRenderer.on('file-saved', (event, arg) => {
    if (arg) {
      console.log(arg)  // in arg i send err
      return;
    }
    localStorage.setItem('name-lngt', name) //если сохранили, запоминаем имя
    localStorage.setItem('path-lngt', path)
    modelTxt.publish('savedLngt', {name, path})
  });
  ipcRenderer.send('will-save-file', lngt);
}

modelTxt.restore = () => {
  const name = localStorage.getItem('name-lngt')
  const path = localStorage.getItem('path-lngt')
  if (!name || !path) return;
  ipcRenderer.on('file-restored', (event, arg) => {
    this.setLoadedFile({name, path, size: arg.size, content: arg.content})
  })
  ipcRenderer.send('will-restore-file', {path});
}

modelTxt.addSelection = () => {
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

modelTxt.reduceSelection = () => {
  let current = nodeCurrent.innerHTML
  let selection = nodeSelection.innerHTML  
  if(selection) return;
  const s = this.selection.match(/.+(\s|<br>)(.+(\s|<br>)?)$/);
  if(s) {
    nodeCurrent.innerHTML = s[2] + current;
    nodeSelection.innerHTML = selection.slice(0, -s[2].length);
  } else {
    nodeCurrent.innerHTML = selection + current;
    nodeSelection.innerHTML = '';
  }
}

modelTxt.cleareSelection = () => {
  let current = nodeCurrent.innerHTML
  let selection = nodeSelection.innerHTML   
  if(selection) {
    nodeCurrent.innerHTML = selection + current
    nodeSelection.innerHTML = ''
  }
}

export default modelTxt;

