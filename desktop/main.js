// Cửa sổ chính của phần mềm Luyện Chuột Cùng Em
const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

// Chỉ cho mở một cửa sổ cùng lúc
if (!app.requestSingleInstanceLock()) {
    app.quit();
}

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 800,
        minWidth: 360,
        minHeight: 520,
        title: 'Luyện Chuột Cùng Em',
        icon: path.join(__dirname, 'icon.ico'),
        backgroundColor: '#c4b5fd',
        autoHideMenuBar: true,
        show: false,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            spellcheck: false
        }
    });

    win.once('ready-to-show', () => win.show());
    win.loadFile(path.join(__dirname, 'web', 'index.html'));

    // Liên kết Zalo và các liên kết ngoài mở bằng trình duyệt của máy, không mở trong phần mềm
    win.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });
    win.webContents.on('will-navigate', (event, url) => {
        if (!url.startsWith('file://')) {
            event.preventDefault();
            shell.openExternal(url);
        }
    });
}

app.whenReady().then(() => {
    Menu.setApplicationMenu(null);
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('second-instance', () => {
    const win = BrowserWindow.getAllWindows()[0];
    if (win) { if (win.isMinimized()) win.restore(); win.focus(); }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
