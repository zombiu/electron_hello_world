// 预加载模块  作用：主进程给渲染进程传值

const { contextBridge, ipcRenderer } = require('electron/renderer')
console.log('-->>preload.js');
contextBridge.exposeInMainWorld('globalConfig', {
    'platform':process.platform,
    'fetchData': (code) => {
        console.log('主进程 接收到的数据=' + code);
    },
    'send': async (data) => {
        console.log('send',data);
       return ipcRenderer.invoke('sendEvent',data)
    }
})