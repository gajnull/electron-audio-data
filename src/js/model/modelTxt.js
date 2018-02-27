import Vent from './Vent'
const {ipcRenderer} = window.require('electron')

class ModelTxt extends Vent {
  constructor() {
    const evs = {
      loadedLngt: [],
      setMinPoz: [],
      changeStateEdit: []
    }
    super(evs)
  }
}

const subfolder = 'target'

let nodeTxt = null

const modelTxt = new ModelTxt()

modelTxt.init = (root) => {
  nodeTxt = root
}





export default modelTxt;

class ModelTxtOld extends Vent {
  constructor() {
    const evs = {
      loadedLngt: [],
      //saveLngt: [],
      setMinPoz: [],
      changeStateEdit: []
    }
    super(evs);
    this.file = {
      name: null,
      path: null,
      size: null
    }
    this.subfolder = 'target';  // место, куда сохраняется результат

    this.current = null;
    this.selection = null;
    this.last = null;
    this.stateEdit = 'add interval';  // or 'delete interval'
  }

  setLoadedFile(file) {
    this.file = file
    localStorage.setItem('path-lngt', file.path)
    localStorage.setItem('name-lngt', file.name)
  }

  txtToLngt(str) {
    let s = str
    //Нормализуем - убираем из текста возможные тэги
    s = s.replace(/</g, '(').replace(/>/g, ')')
    //s = s.replace(/>/g, ')')
    //Заменяем абзацы и упорядочиваем пробелы
    s = s.replace(/\n/g, '<br>')
    s = s.replace(/\s*<br>\s*/g,'<br>&nbsp&nbsp') //для отступа
    s = s.replace(/\s+/g, ' ') //все пробелы однотипные и по одному
    s = s.replace(/\s([.,:;!\)])/g, '$1') //убираем ненужные пробелы
    //Добавляем тэги для начальной работы с текстом
    s = `<span id="selection-txt"></span>
         <span id="current-txt">&nbsp&nbsp${s}</span>`
    //this.publish(0)
    return s;
  }

  addSelection() {
    if (!this.current) return;
    const s = this.current.match(/^.+?(\s|<br>)/)
    if (s) {
      this.selection += s[0]
      this.current = this.current.slice(s[0].length)
    } else {  //конец текстового файла
      this.selection += this.current
      this.current = ''
    }
  }

  reduceSelection() {
    if(!this.selection) return;
    const s = this.selection.match(/.+(\s|<br>)(.+(\s|<br>)?)$/);
    if(s) {
      this.current = s[2] + this.current;
      this.selection = this.selection.slice(0, -s[2].length);
    } else {
      this.current = this.selection + this.current;
      this.selection = '';
    }
  }

  cleareSelection() {
    if(this.selection) {
      this.current = this.selection + this.current
      this.selection = ''
    }
  }



  save(nameLngt) {
    if (!this.getData) return;
    const data = this.getData()
    if (!data) return;
    const name = nameLngt + '.lngt'
    const lngt = {
      data,
      name,
      path: this.subfolder + '/' + name
    };
    ipcRenderer.on('file-saved', (event, arg) => {
      localStorage.setItem('name-lngt', lngt.name) //если сохранили, запоминаем имя
      localStorage.setItem('path-lngt', this.subfolder + '/' + lngt.name)
    });
    ipcRenderer.send('will-save-file', lngt);
  }

  restore() {
    const nameLngt = localStorage.getItem('name-lngt')
    const pathLngt = localStorage.getItem('path-lngt')
    if (!nameLngt || !pathLngt) return;
    ipcRenderer.on('file-restored', (event, arg) => {
      console.log(arg)
      //this.publish('loadedLngt', {content: arg})
    });
    ipcRenderer.send('will-restore-file', {pathLngt});
  }

}
