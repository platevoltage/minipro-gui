import { app, BrowserWindow, ipcMain, Menu, safeStorage } from 'electron';
import * as util from 'util';
import * as child_process from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

const exec = util.promisify(child_process.exec);

app.whenReady().then(() => {

    const win = createMainWindow();
    ipcMain.handle("readData", async () => {
      console.log("readTry")
      return readDevice("SST27SF512@DIP28");
      
    });

});

const createMainWindow = () => {
    const win = new BrowserWindow({
      width: 1280,
      height: 720,
      minHeight: 200,
      minWidth: 600,
      backgroundColor: 'black',
    //   title: "Transmission",
    //   frame: !isMac,
    //   titleBarStyle: isMac ? "hidden" : "default",
      webPreferences: {
        enableBlinkFeatures: "CSSColorSchemeUARendering",
        devTools: false,
        preload: path.join(__dirname, 'mainPreload.js')
      }
    });
    // win.loadFile(path.join(__dirname, './public/main-window/index.html')) 
    win.loadURL('http://localhost:3000')
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

async function readDevice(device: string) {
  const execString = `minipro -p ${device} -r test.hex -y`
  try {
    const { stdout, stderr } = await exec(execString);
    const file = await readFile("test.hex");
    return {stdout, stderr, file, execString};
  } catch(err) {
    return { err, execString };
  }
    
}

async function readFile(path: string, encoding?: BufferEncoding | null) {
  try {
    const data = await fs.promises.readFile(path, { encoding })
    return data;
  }
  catch (err) {
    console.error(err)
    return null;
  }
}


// listDevices();