// ipcMain.handle('start-reservation', async (event, data) => {
//   console.log('renderer에서 받은 값:', data);

//   const result = await runReservation(data);
//   return result;
// });
console.log('preload loaded');

// import { contextBridge, ipcRenderer } from 'electron';
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  startReservation: (data) => ipcRenderer.invoke('start-reservation', data)
});