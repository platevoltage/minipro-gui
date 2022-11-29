import { app, BrowserWindow, ipcMain, Menu, safeStorage, dialog } from 'electron';
import * as util from 'util';
import * as child_process from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

const exec = util.promisify(child_process.exec);

app.whenReady().then(() => {

    const win = createMainWindow();
    ipcMain.handle("readData", async (_, device, force) => {
      console.log(device, force)
      return readDevice(device, force);
    });
    ipcMain.handle("writeData", async (_, file, device, force) => {
      console.log(device, force)
      return writeDevice(file, device, force);
    });
    ipcMain.handle("getSupportedDevices", async () => {
      return listDevices();
    });
    ipcMain.handle("getInfo", async (_, device) => {
      return getDeviceInfo(device);
    });
    ipcMain.handle("saveFile", async (_, file) => {
      const savePath = await dialog.showSaveDialog(win, { defaultPath: "Untitled.hex"});
      console.log(savePath)
      saveFile(savePath.filePath, file)
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
    return { stdout };
}

async function getDeviceInfo(device: string) {
  const execString = `minipro -d ${device} -q TL866A`
    const { stderr } = await exec(execString);
    console.log(stderr);
    return { stderr, execString };
}

async function readDevice(device: string, force?: boolean) {
  const execString = `minipro -p ${device} -r test.hex ${force? "-y" : ""}`
  try {
    const { stdout, stderr } = await exec(execString);
    const file = await readFile("test.hex");
    return {stdout, stderr, file, execString};
  } catch(err) {
    return { err, execString };
  }
    
}

async function writeDevice(file: Buffer, device: string, force?: boolean) {
  await saveFile("temp.hex", file);
  const execString = `minipro -p ${device} -w temp.hex ${force? "-y" : ""}`
  try {
    const { stdout, stderr } = await exec(execString);
    // const file = await readFile("test.hex");
    return {stdout, stderr, execString};
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

async function saveFile(path: string, file: Buffer, encoding?: BufferEncoding | null) {
  try {
    const data = await fs.promises.writeFile(path, file, { encoding })
    return data;
  }
  catch (err) {
    console.error(err)
    return null;
  }
}


// listDevices();