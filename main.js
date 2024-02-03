

// npm init -y 用来构造一个package.json
// npm i electron -D 加载electron依赖
// npm i electron -g 全局安装electron依赖

// 全局安装 nodemon
// npm i nodemon -g

// 使用如下命令设置为淘宝的镜像源：
// npm config set registry https://registry.npm.taobao.org 
// 使用如下命令检验是否成功：
// npm config get registry 

// 修改js 可以使app重启
//  "start": "nodemon --exec electron ."  

// common.js 包规范导入
const {app,BrowserWindow,ipcMain ,Menu,dialog} = require('electron')
const path= require('path')
const WinState = require('electron-win-state').default
const mainMenu = require('./mainMenu')
const createTray = require('./tray')


// 窗口状态保存 x、y在屏幕中的偏移量  以及窗口大小
const winState = new WinState({
    defaultWidth:600,
    defaultHeight:400,
})

        // 设置菜单
let menu =    Menu.buildFromTemplate(mainMenu('传给menu的参数', (params) => {
        console.log(params);
    }) )

const createWindow = () => {

    let win = new BrowserWindow({
        ...winState.winOptions,
        // width:1000,height:800,
    webPreferences:{
        // nodeIntegration:true,
        // contextIsolation:false,
        preload: path.join(__dirname, './preload.js')
    }})
    // win.loadFile('index.html')
    win.loadURL('https://github.com')
    // 打开开发者工具
    win.webContents.openDevTools()
    console.log('文件目录='+__dirname);

    winState.manage(win)

    // webContents 相关事件
    // did-finish-load 页面加载完毕
    win.webContents.on('did-finish-load',() => {
        console.log('did-finish-load');
    })
    // dom 加载完毕
    win.webContents.on('dom-ready', () => {
          console.log('dom-ready');
    })
    // 右键 上下文菜单
    win.webContents.on('context-menu',(event,params) => {
        console.log(params);
        console.log('右键信息=' + params.selectionText);
        // 注入js执行
        // win.webContents.executeJavaScript(`alert('${params.selectionText}')`)
        // 右键菜单
        menu.popup()
    })

    // 设置menu  可以设置menu点击回调
    Menu.setApplicationMenu(menu)

        // 托盘功能
    createTray(app,win)
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed',() => {
    if (process.platform !== 'darwin') {
        console.log('当前平台='+process.platform);
        app.quit()
    }
})

app.on('quit',() => {
    console.log('app quit');
})


// 主进程接收数据
const eventObserver = async(event,data) => {
    // 主进程中log打印 会显示在控制终端中
    console.log('eventObserver',data);
    return 'ok ' + JSON.stringify(data)
}

ipcMain.handle('sendEvent', eventObserver)

const xlog = (data) => {
     const electronDialog = window.require('electron').remote;
 const con = electronDialog.getGlobal('console')
 con.log(data);
}