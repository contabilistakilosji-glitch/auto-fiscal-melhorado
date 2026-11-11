const { app, BrowserWindow, dialog, shell, utilityProcess } = require('electron');
const path = require('node:path');
const http = require('node:http');

let serverProcess;
const PORT = Number(process.env.PORT) || 3187;
const baseDir = app.getAppPath();
const serverFile = path.join(baseDir, 'server.prod.mjs');

function waitForServer(url, attempts = 50) {
  return new Promise((resolve, reject) => {
    let count = 0;
    const check = () => {
      const req = http.get(url, (res) => { res.resume(); resolve(); });
      req.on('error', () => {
        if (++count >= attempts) return reject(new Error('O servidor local não iniciou.'));
        setTimeout(check, 300);
      });
      req.setTimeout(1000, () => req.destroy());
    };
    check();
  });
}

function startBackend() {
  serverProcess = utilityProcess.fork(serverFile, [], {
    cwd: baseDir,
    env: {
      ...process.env,
      NODE_ENV: 'production',
      PORT: String(PORT),
      HOST: '127.0.0.1',
      AUTOFISCAL_DIST: path.join(baseDir, 'dist')
    },
    stdio: 'inherit'
  });
  serverProcess.on('exit', (code) => {
    if (!app.isQuitting && code !== 0) console.error(`Backend finalizado: ${code}`);
  });
}

async function createWindow() {
  const win = new BrowserWindow({
    width: 1440, height: 920, minWidth: 1050, minHeight: 700,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#0b1220',
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  try {
    await waitForServer(`http://127.0.0.1:${PORT}`);
    await win.loadURL(`http://127.0.0.1:${PORT}`);
    win.show();
  } catch (error) {
    dialog.showErrorBox('AutoFiscal não iniciou', `${error.message}\nVerifique se o antivírus ou firewall bloqueou o aplicativo.`);
    app.quit();
  }
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://')) shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(async () => {
  startBackend();
  await createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('before-quit', () => {
  app.isQuitting = true;
  if (serverProcess && !serverProcess.killed) serverProcess.kill();
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
