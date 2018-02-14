const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let win

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600})

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.webContents.openDevTools()	// Open the DevTools.

  win.on('closed', function () {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (win === null) {
    createWindow()
  }
})

//сохранение файла .lngt
const fs = require('fs');
const {ipcMain} = require('electron');
ipcMain.on('will-save-file', (event, arg) => {
  fs.writeFile('target/' + arg.name, arg.data, ()=>{
    event.sender.send('file-saved', 'file-saved')
  });
})
