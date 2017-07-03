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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// const {ipcMain} = require('electron')
//
// ipcMain.on('async-msg', (event, arg) => {
//   console.log(arg.x)  // prints "ping"
//   event.sender.send('async-msg', 'pong-from-main')
// })
//
// ipcMain.on('sync-msg', (event, arg) => {
//   console.log(arg.x)  // prints "ping"
//   event.returnValue = 'pong'
// })
