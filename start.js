const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path')
let win;
let windows = {};

function createWindow(options, file) {

    if (options.title == 'boop') {
        win = new BrowserWindow(options);
    
        win.loadFile(file)
        if (options.title == 'boop') win.hide()
    } else {
        windows[options.title] = new BrowserWindow(options);

        windows[options.title].loadFile(file)
    }
}

app.whenReady().then(() => {
    createWindow({  height: 1, width: 175, title: 'boop', titleBarStyle: 'hidden', frame: false, transparent: true, webPreferences: { nodeIntegration: true, contextIsolation: false } }, "boop.html");

    console.log('loaded!')
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow({  height: 1, width: 175, title: 'boop', webPreferences: { nodeIntegration: true, contextIsolation: false } }, "boop.html")
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});

ipcMain.on('close', (event, title) => {
    windows[title].close()
    delete windows[title]
    setTimeout(runProgram, randomNumber())
})

const runProgram = () => {
    createWindow({ height: 622, width: 616, title: "index", titleBarStyle: 'hidden', frame: false, transparent: true, webPreferences: { nodeIntegration: true, contextIsolation: false } }, "index.html")
}

function randomNumber () {
    let num = (Math.random() * 1500000)
    if (num > 450000) return num;
    else num = (Math.random() * 1500000);
}

setTimeout(runProgram, randomNumber())