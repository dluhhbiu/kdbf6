const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronWidget', {
    startDrag: (x, y) => ipcRenderer.send('window-drag-start', { x, y }),
    drag: (x, y) => ipcRenderer.send('window-drag', { x, y }),
    endDrag: () => ipcRenderer.send('window-drag-end'),
    close: () => ipcRenderer.send('window-close')
});
