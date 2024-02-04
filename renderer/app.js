
// 只有 NodeJS 内才有这个模块，浏览器端是没有 Node 环境的，也就是说浏览器是没有 FS 模块的。如果你想要直接在浏览器中使用是不行的。
// 如果想要在 Electron 项目内使用的话，需要开启 Node 支持(默认是关闭的)，也就是说要修改 main.js 的配置项 nodeIntegration: true
// const fs = require('fs')
// console.log('获取fs=' + JSON.stringify(fs));

// 主进程传值给渲染进程
console.log(window.globalConfig.platform);
window.globalConfig.fetchData('789')


// 这一行会报错 浏览器中没有node js环境
// const { contextBridge, ipcRenderer } = require('electron/renderer')

let btn_event1 = document.querySelector('#btn_event1')
btn_event1.addEventListener('click',async(event) => {
    let result =await   window.globalConfig.send('appjs中的数据')
    console.log('addEventListener click',result);
})

let captrueImg = document.querySelector('#captrueImg')

let btn_event2 = document.querySelector('#btn_event2')
btn_event2.addEventListener('click',async(event) => {
    let result =await   window.globalConfig.mediaCaptrue()
    console.log(result);
    captrueImg.src = result
})


let btn_event3 = document.querySelector('#btn_event3')
btn_event3.addEventListener('click',async(event) => {
    window.globalConfig.testNativeImage()


})




