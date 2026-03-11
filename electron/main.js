const { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage } = require('electron');
const path = require('path');

let win;
let tray;
let clickThrough = false;

function createWindow() {
    win = new BrowserWindow({
        width: 360,
        height: 280,
        minWidth: 200,
        minHeight: 100,
        frame: false,
        transparent: true,
        backgroundColor: '#00000000',
        alwaysOnTop: true,
        resizable: true,
        skipTaskbar: true,
        hasShadow: false,
        icon: path.join(__dirname, '..', 'favicon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    win.loadFile(path.join(__dirname, '..', 'index.html'));

    win.on('close', (e) => {
        // Hide to tray instead of closing
        e.preventDefault();
        win.hide();
    });

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
        win.hide();
    });
}

function createTray() {
    const icon = nativeImage.createFromPath(path.join(__dirname, '..', 'favicon.png'));
    tray = new Tray(icon.resize({ width: 16, height: 16 }));
    tray.setToolTip('BF6 Stats');

    function buildMenu() {
        return Menu.buildFromTemplate([
            {
                label: 'Show / Hide',
                click: () => {
                    if (win.isVisible()) {
                        win.hide();
                    } else {
                        win.show();
                    }
                }
            },
            {
                label: clickThrough ? 'Disable Click-Through' : 'Enable Click-Through',
                click: () => {
                    clickThrough = !clickThrough;
                    if (clickThrough) {
                        win.setIgnoreMouseEvents(true, { forward: true });
                    } else {
                        win.setIgnoreMouseEvents(false);
                    }
                    win.webContents.send('click-through-changed', clickThrough);
                    tray.setContextMenu(buildMenu());
                }
            },
            { type: 'separator' },
            {
                label: 'Quit',
                click: () => {
                    win.removeAllListeners('close');
                    app.quit();
                }
            }
        ]);
    }

    tray.setContextMenu(buildMenu());

    tray.on('click', () => {
        if (win.isVisible()) {
            win.hide();
        } else {
            win.show();
        }
    });
}

app.whenReady().then(() => {
    createWindow();
    createTray();
});

app.on('window-all-closed', (e) => {
    // Keep app running in tray
});
