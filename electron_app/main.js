// const { app, BrowserWindow } = require('electron')
import {app,BrowserWindow} from 'electron'
import path from 'node:path';
// const path = require('node:path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    
  })

  win.loadFile('./electron_app/index.html')
}

app.whenReady().then(() => {
  createWindow()
})