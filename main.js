const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

let win;

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600})

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.webContents.openDevTools();	// Open the DevTools.

  win.on('closed', function () {
    win = null;
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', function () {
  if (win === null) {
    createWindow();
  }
})

const fs = require('fs');
const {ipcMain} = require('electron');
//сохранение файла .lngt и .transl
ipcMain.on('will-save-file', (event, arg) => {
  const {path, content, kind} = arg;
  fs.writeFile(path, content, (err)=>{
    event.sender.send('file-saved', {err, kind, path});
  });
});
//восстановление файла .lngt и .transl
ipcMain.on('will-restore-file', (event, arg) => {
  const {name, path, kind} = arg;
  fs.readFile(path, 'utf8', (err, content) => {
    event.sender.send('file-restored', {name, path, content, kind, err});
  });
});

//восстановление audio
ipcMain.on('will-restore-audio', (event, arg) => {
  const {name, path} = arg;
  fs.readFile(path, (err, data) => {
    const content = new Uint8Array(data.buffer);
    event.sender.send('audio-restored', {name, path, content, err});
  });
});
