const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 360,
        height: 280,
        minWidth: 200,
        minHeight: 100,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        resizable: true,
        skipTaskbar: false,
        icon: path.join(__dirname, '..', 'favicon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    win.loadFile(path.join(__dirname, '..', 'index.html'));

    // Window drag via IPC
    let dragOffset = null;

    ipcMain.on('window-drag-start', (event, { x, y }) => {
        const [wx, wy] = win.getPosition();
        dragOffset = { x: x - wx, y: y - wy };
    });

    ipcMain.on('window-drag', (event, { x, y }) => {
        if (dragOffset) {
            win.setPosition(x - dragOffset.x, y - dragOffset.y);
        }
    });

    ipcMain.on('window-drag-end', () => {
        dragOffset = null;
    });

    ipcMain.on('window-close', () => {
        win.close();
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    app.quit();
});
