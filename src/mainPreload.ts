
import { contextBridge, ipcRenderer } from 'electron';



contextBridge.exposeInMainWorld("api", {
    readData: () => ipcRenderer.invoke('readData'),
});