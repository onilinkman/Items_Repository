const {app,BrowserWindow}=require('electron');
//app.disableHardwareAcceleration();

const createWindow=()=>{
    const win=new BrowserWindow({
        width:800,
        height:600
    })
    win.loadFile('index.html')
    win.webContents.setFrameRate(3)
}

app.whenReady().then(()=>{
    createWindow()
})