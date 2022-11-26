import { app, BrowserWindow, ipcMain, Menu, safeStorage } from 'electron';
import * as util from 'util';
import * as child_process from 'child_process';
import * as path from 'path';

const exec = util.promisify(child_process.exec);

app.whenReady().then(() => {

  
    const win = createMainWindow();
    
    
});

const createMainWindow = () => {
    const win = new BrowserWindow({
      width: 1280,
      height: 720,
      minHeight: 200,
      minWidth: 600,
    //   title: "Transmission",
    //   frame: !isMac,
    //   titleBarStyle: isMac ? "hidden" : "default",
      webPreferences: {
        enableBlinkFeatures: "CSSColorSchemeUARendering",
        devTools: false,
        // preload: path.join(__dirname, 'mainWindowPreload.js')
      }
    });
    win.loadFile(path.join(__dirname, './public/main-window/index.html')) 
    return win;
}

async function listDevices() {
    const { stdout } = await exec(`minipro -l -q TL866A`);
    console.log(stdout);
}

async function getDeviceInfo(device: string) {
    const { stderr } = await exec(`minipro -d ${device} -q TL866A`);
    console.log(stderr);
}

getDeviceInfo("SST29SF512");
// listDevices();