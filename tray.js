// 托盘功能
const {Tray,Menu} = require('electron')
const path = require('path')

const createTray = (app,window) => {
    // 路径需要绝对路径
    let tray = new Tray(path.resolve(__dirname,'./images/icon@2x.png'))
    tray.setToolTip('九转仙蛊')

    tray.on('click',() => {
        console.log('点击了九转仙蛊');
        window.isVisible()? window.hide():window.show()
    })

    let trayMenu = Menu.buildFromTemplate([{label:'item1',click: () => {
                window.isVisible()? window.hide():window.show()
    }},{label:'item2'}])
    tray.setContextMenu(trayMenu)
    return tray
}

module.exports = createTray