'use strict';

// Import parts of electron to use
const electron = require('electron');
const path = require('path');
const url = require('url');
const openAboutWindow = require('about-window').default;
const windowStateKeeper = require('electron-window-state');

const App = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Keep a reference for dev mode
let dev = false;
let enableScreenshotProtection = true;
let template = null;
let menu = null;

if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
  dev = true;
}

function createWindow() {
  // Create the browser window.
  var iconpath = `${__dirname}/src/assets/images/icons/azenix-16x16.png`;
  let {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;

  let mainWindowState = windowStateKeeper({
    defaultWidth: width - 100,
    defaultHeight: height - 100
  });

  mainWindow = new BrowserWindow({width: mainWindowState.defaultWidth, height: mainWindowState.defaultHeight, x: mainWindowState.x, y: mainWindowState.y, center: false,
    icon: iconpath, resizable: true, frame: true, show: false});

  mainWindow.setContentProtection(true);
  mainWindowState.manage(mainWindow);

  // and load the index.html of the app.
  let indexPath;
  
  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
	    host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true
    });
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true
    });
  }
  mainWindow.loadURL(indexPath);

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    // Open the DevTools automatically if developing
    if (dev) {
      mainWindow.webContents.openDevTools();
    }
  });

  template = [
  {
    label: 'Application',
    submenu: [
      {
        label: 'About AzeniX',
        click: () => openAboutWindow({
          icon_path: `${__dirname}/src/assets/images/logo/azenix-400x303.png`,
          // package_json_dir: __dirname,
          copyright: 'Copyright (c) 2018 AzeniX',
          homepage: 'https://azenix.io/',
          title: 'AzeniX'
        })
      },
      { type: 'separator' },
      { label: getScreenshotProtectionLabel(), click: () => { updateScreenshotProtectionItem() }, enabled: process.platform !== 'linux' },
      { type: 'separator' },
      { label: 'Minimize', click: function () { mainWindow.minimize() } },
      { label: 'Maximize', click: function () { mainWindow.maximize() } },
      { label: 'Full Screen', click: function () { mainWindow.setFullScreen(!mainWindow.isFullScreen()) } },
      { type: 'separator' },
      { label: 'Restart', accelerator: 'Command+R', click: function () { mainWindow.reload() } },
      { label: 'Quit', accelerator: 'Command+Q', click: function () { App.quit() } }
    ]
  }, {
    label: 'Edit',
    submenu: [
      { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
      { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
      { type: 'separator' },
      { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
      { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
      { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
      { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' },
      { type: 'separator' },
      { label: 'Open Dev Tools', accelerator: 'CmdOrCtrl+D', click: function () { mainWindow.webContents.openDevTools() } },
      { label: 'Reload App', accelerator: 'CmdOrCtrl+R', click: function () { mainWindow.webContents.reload() } },
      { label: 'Print Page', accelerator: 'CmdOrCtrl+P', click: function () { mainWindow.webContents.print({printBackground: true}) } }
    ]
  }
];

menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
App.on('ready', createWindow);

// Quit when all windows are closed.
App.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    App.quit();
  }
});

App.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

function updateScreenshotProtectionItem () {
  if (menu == null || template == null) {
    return;
  }

  enableScreenshotProtection = !enableScreenshotProtection;

  mainWindow.setContentProtection(enableScreenshotProtection);

  if (enableScreenshotProtection) {
    template[0].submenu[2].label = 'Disable screenshot protection (unsafe)';
  } else {
    template[0].submenu[2].label = 'Enable screenshot protection (recommended)';
  }

  menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function getScreenshotProtectionLabel () {
  if (process.platform === 'linux') {
    return 'Screenshot Protection Not Available On Linux';
  } else if (enableScreenshotProtection) {
    return 'Disable screenshot protection (unsafe)';
  } else {
    return 'Enable screenshot protection (recommended)';
  }
}
