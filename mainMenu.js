
// 如果需要传参 必须导出一个函数
const mainMenu = (params,cb) => {
  return  [ {label:'首页',
submenu : [{
    label:'sub item 1',
    click:() => {
        console.log('menu接收到的参数',params);
        cb('menu传出的参数')
    }
},{
    label:'sub item 2',
}]
}, {
 label: 'Edit',
 submenu: [
 { role: 'undo'},
 { role: 'redo'},
 { role: 'copy'},
 { role: 'paste'},
 ]
 },
 ]
}

module.exports = mainMenu