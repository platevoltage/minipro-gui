
import { contextBridge, ipcRenderer } from 'electron';



contextBridge.exposeInMainWorld("api", {
    readData: (device: string, force?: boolean) => ipcRenderer.invoke('readData', device, force),
    getSupportedDevices: () => ipcRenderer.invoke('getSupportedDevices'),
    getInfo: (device: string) => ipcRenderer.invoke('getInfo', device),
    saveFile: (file: Buffer) => ipcRenderer.invoke('saveFile', file),
});