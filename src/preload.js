// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron");

// Exponemos funciones seguras al renderer
contextBridge.exposeInMainWorld("electronAPI", {
  generateStructure: (text) => ipcRenderer.invoke("generate-structure", text)
});