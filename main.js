
import { app, BrowserWindow, Menu, Tray, globalShortcut, ipcMain, shell, powerMonitor, dialog } from 'electron';
import windowStateKeeper from 'electron-window-state';
import storage from 'electron-json-storage';
import { autoUpdater } from 'electron-updater';
import axios from 'axios';
import _debug from 'debug';

import pkg from './package.json';
import config from './config';
import api from './server/api';

let debug = _debug('dev:main');
let forceQuit = false;
let downloading = false;
let autoUpdaterInit = false;
let menu;
let tray;
let mainWindow;
let isOsx = process.platform === 'darwin';
let mainMenu = [
    {
        label: 'xbyjMusic',
        submenu: [
            {
                label: `关于(About)`,
                selector: 'orderFrontStandardAboutPanel:',
            },
            {
                type: 'separator'
            },
            {
                label: '首选项(Preferences)',
                accelerator: 'Cmd+,',
                click() {
                    mainWindow.webContents.send('show-preferences');
                }
            },
            {
                type: 'separator'
            },
            {
                role: 'hide'
            },
            {
                role: 'hideothers'
            },
            {
                role: 'unhide'
            },
            {
                type: 'separator'
            },
            {
                label: '检查更新(Check for updates)',
                accelerator: 'Cmd+U',
                click() {
                    checkForUpdates();
                }
            },
            {
                label: '退出(Quit)',
                accelerator: 'Command+Q',
                selector: 'terminate:',
                click() {
                    forceQuit = true;
                    mainWindow = null;
                    app.quit();
                }
            }
        ]
    },
    {
        label: '功能页',
        submenu: [
            {
                label: '首页(Home)',
                accelerator: 'Cmd+Shift+H',
                click() {
                    mainWindow.webContents.send('show-home');
                }
            },
            {
                label: '播放列表',
                accelerator: 'Cmd+P',
                click() {
                    mainWindow.webContents.send('show-playing');
                }
            },
            {
                label: '私人FM',
                accelerator: 'Cmd+Shift+F',
                click() {
                    mainWindow.webContents.send('show-fm');
                }
            },
            {
                label: '榜单(TOP)',
                accelerator: 'Cmd+Shift+T',
                click() {
                    mainWindow.webContents.send('show-top');
                }
            },
            {
                label: '歌单(Playlist)',
                accelerator: 'Cmd+Shift+P',
                click() {
                    mainWindow.webContents.send('show-playlist');
                }
            },
            {
                label: '搜索(Search)',
                accelerator: 'Cmd+F',
                click() {
                    mainWindow.webContents.send('show-search');
                }
            },
            {
                type: 'separator',
            },
            {
                label: '联系我',
                accelerator: 'Cmd+Shift+M',
                click() {
                    mainWindow.webContents.send('about-me');
                }
            },
            {
                type: 'separator'
            },
            {
                role: 'toggledevtools'
            },
        ]
    },
    {
        label: '控制',
        submenu: [
            {
                label: '播放/暂停',
                accelerator: 'Space',
                click() {
                    mainWindow.show();
                    mainWindow.webContents.send('player-toggle');
                }
            },
            {
                label: '下一首(Next)',
                accelerator: 'Right',
                click() {
                    mainWindow.show();
                    mainWindow.webContents.send('player-next');
                }
            },
            {
                label: '上一首(Previous)',
                accelerator: 'Left',
                click() {
                    mainWindow.show();
                    mainWindow.webContents.send('player-previous');
                }
            },
            {
                label: '增加音量',
                accelerator: 'Up',
                click() {
                    mainWindow.show();
                    mainWindow.webContents.send('player-volume-up');
                }
            },
            {
                label: '较小音量',
                accelerator: 'Down',
                click() {
                    mainWindow.show();
                    mainWindow.webContents.send('player-volume-down');
                }
            },
            {
                label: '喜欢(Like)',
                accelerator: 'Cmd+L',
                click() {
                    mainWindow.show();
                    mainWindow.webContents.send('player-like');
                }
            },
        ],
    },
    {
        label: '播放列表',
        submenu: [
            {
                label: 'Nothing...',
            }
        ],
    },
    {
        label: '最近播放',
        submenu: [
            {
                label: 'Nothing...',
            }
        ],
    },
    {
        label: '编辑',
        submenu: [
            {
                role: 'undo'
            },
            {
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                role: 'cut'
            },
            {
                role: 'copy'
            },
            {
                role: 'paste'
            },
            {
                role: 'pasteandmatchstyle'
            },
            {
                role: 'delete'
            },
            {
                role: 'selectall'
            }
        ]
    },
    {
        role: 'window',
        submenu: [
            {
                role: 'minimize'
            },
            {
                role: 'close'
            }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Bug report 🐛',
                click() {
                    shell.openExternal('https://github.com/yllg/xbyjMusic/issues');
                }
            },
            {
                label: 'Fork me ~',
                click() {
                    shell.openExternal('https://github.com/yllg');
                }
            },
            {
                type: 'separator'
            },
        ]
    }
];
let trayMenu = [
    {
        label: '播放/暂停',
        click() {
            mainWindow.webContents.send('player-toggle');
        }
    },
    {
        label: '下一首(Next)',
        click() {
            mainWindow.webContents.send('player-next');
        }
    },
    {
        label: '上一首(Previous)',
        click() {
            mainWindow.webContents.send('player-previous');
        }
    },
    {
        type: 'separator'
    },
    {
        label: '首选项(Preferences)',
        accelerator: 'Cmd+,',
        click() {
            mainWindow.webContents.send('show-preferences');
        }
    },
    {
        type: 'separator'
    },
    {
        label: '隐藏/显示',
        click() {
            let isVisible = mainWindow.isVisible();
            isVisible ? mainWindow.hide() : mainWindow.show();
        }
    },
    {
        type: 'separator'
    },
    {
        label: '检查更新',
        accelerator: 'Cmd+U',
        click() {
            checkForUpdates();
        }
    },
    {
        label: 'Fork me on Github',
        click() {
            shell.openExternal('https://github.com/yllg');
        }
    },
    {
        type: 'separator'
    },
    {
        label: '打开开发者工具',
        accelerator: 'Alt+Command+I',
        click() {
            mainWindow.show();
            mainWindow.toggleDevTools();
        }
    },
    {
        type: 'separator'
    },
    {
        label: '退出(Quit)',
        accelerator: 'Command+Q',
        selector: 'terminate:',
        click() {
            forceQuit = true;
            mainWindow = null;
            app.quit();
        }
    }
];
let dockMenu = [
    {
        label: '播放/暂停',
        accelerator: 'Space',
        click() {
            mainWindow.show();
            mainWindow.webContents.send('player-toggle');
        }
    },
    {
        label: '下一首(Next)',
        accelerator: 'Right',
        click() {
            mainWindow.show();
            mainWindow.webContents.send('player-next');
        }
    },
    {
        label: '上一首(Previous)',
        accelerator: 'Left',
        click() {
            mainWindow.show();
            mainWindow.webContents.send('player-previous');
        }
    },
    {
        label: '喜欢(Like)',
        accelerator: 'Cmd+L',
        click() {
            mainWindow.show();
            mainWindow.webContents.send('player-like');
        }
    },
];

function checkForUpdates() {
    if (downloading) {
        dialog.showMessageBox({
            type: 'info',
            buttons: ['OK'],
            title: pkg.name,
            message: `Downloading...`,
            detail: `Please leave the app open, the new version is downloading. You'll receive a new dialog when downloading is finished.`
        });
        return;
    }
    // 检查更新
    autoUpdater.checkForUpdates();
}

function updateMenu(playing) {
    if (!isOsx) {
        return;
    }
    mainMenu[1]['submenu'][0]['label'] = playing ? 'Pause' : 'Play';
    // 配置应用的菜单
    menu = Menu.buildFromTemplate(mainMenu);
    Menu.setApplicationMenu(menu);
}

function updateTray(playing) {
    trayMenu[0].label = playing ? 'Pause' : 'Play';

    let contextmenu = Menu.buildFromTemplate(trayMenu);
    let icon = playing
        ? `${__dirname}/src/assets/playing.png`
        : `${__dirname}/src/assets/notplaying.png`
        ;

    if (!tray) {
        tray = new Tray(icon);
        tray.on('right-click', () => {
            tray.popUpContextMenu();
        });
    }

    tray.setImage(icon);
    tray.setContextMenu(contextmenu);
}

function registerGlobalShortcut() {
    // MediaNextTrack 键盘的“右箭头”
    globalShortcut.register('MediaNextTrack', e => {
        mainWindow.webContents.send('player-next');
    });
    // Play the previous song
    globalShortcut.register('MediaPreviousTrack', e => {
        mainWindow.webContents.send('player-previous');
    });
    // 键盘的播放暂停建，即空格键
    globalShortcut.register('MediaPlayPause', e => {
        mainWindow.webContents.send('player-toggle');
    });
}

const createMainWindow = () => {
    // 保存窗口的大小和位置信息
    var mainWindowState = windowStateKeeper({
        defaultWidth: 740,
        defaultHeight: 480,
    });
    mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: 1002,
        height: 670,
        minWidth: 1002,
        minHeight: 670,
        resizable: false,
        vibrancy: 'medium-light',
        backgroundColor: 'none',
        // Headless
        frame: !isOsx,
    });

    // 加载react调试工具, mac和window上的插件目录不一样
    if (process.env.NODE_ENV === 'development' && isOsx) {
        BrowserWindow.addDevToolsExtension('/Users/xuanbiyijue/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.2.3_0');
    } else if (process.env.NODE_ENV === 'development' && !isOsx) {
        BrowserWindow.addDevToolsExtension('C:/Users/Mingxing/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.2.3_0');
    };

    mainWindow.loadURL(`file://${__dirname}/src/index.html`);

    mainWindow.webContents.on('did-finish-load', () => {
        try {
            mainWindow.show();
            mainWindow.focus();
        } catch (ex) { console.log(ex); }
    });

    mainWindow.webContents.on('new-window', (event, url) => {
        event.preventDefault();
        shell.openExternal(url);
    });

    mainWindow.on('close', e => {
        if (forceQuit) {
            mainWindow = null;
            app.quit();
        } else {
            e.preventDefault();
            mainWindow.hide();
        }
    });

    // Update the history menu
    ipcMain.on('update-history', (event, args) => {
        var historyMenu = mainMenu.find(e => e.label === '最近播放');
        var submenu = args.songs.map((e, index) => {
            return {
                label: e.name,
                accelerator: `Cmd+${index}`,
                click() {
                    mainWindow.show();
                    mainWindow.webContents.send('player-play', {
                        id: e.id,
                    });
                }
            };
        });
        historyMenu.submenu = submenu;
        updateMenu();
    });

    // Update 播放列表 menu
    ipcMain.on('update-playing', async(event, args) => {
        var playingMenu = mainMenu.find(e => e.label === '播放列表');
        var submenu = args.songs.map((e, index) => {
            return {
                label: e.name,
                click() {
                    mainWindow.show();
                    mainWindow.webContents.send('player-play', {
                        id: e.id,
                    });
                }
            };
        });
        playingMenu.submenu = submenu;
        updateMenu();
    });

    // Update menu icon image and controls menu
    ipcMain.on('update-status', (event, args) => {
        var { playing, song } = args;
        if (tray) {
            updateTray(playing, song);
        }
        updateMenu(playing);
    });

    // Show/Hide menu icon
    ipcMain.on('update-preferences', (event, args) => {
        mainWindow.setAlwaysOnTop(!!args.alwaysOnTop);
        if (!args.showTray) {
            if (tray) {
                tray.destroy();
                tray = null;
            }
            return;
        }
        updateTray(args.playing);
    });

    // Show the main window
    ipcMain.on('show', event => {
        mainWindow.show();
        mainWindow.focus();
    });

    // Minimize the window
    ipcMain.on('minimize', event => {
        mainWindow.minimize();
    });

    // Quit app
    ipcMain.on('goodbye', (event) => {
        forceQuit = true;
        mainWindow = null;
        app.quit();
    });

    // App has suspend
    powerMonitor.on('suspend', () => {
        mainWindow.webContents.send('player-pause');
    });

    if (isOsx) {
        // App about
        app.setAboutPanelOptions({
            applicationName: 'xbyjMusic',
            applicationVersion: pkg.version,
            copyright: 'Made by 悬笔e绝. \n https://github.com/yllg/xbyjMusic',
            version: pkg.version
        });
        app.dock.setIcon(`${__dirname}/src/assets/dock.png`);
        app.dock.setMenu(Menu.buildFromTemplate(dockMenu));
    }

    updateMenu();
    registerGlobalShortcut();
    mainWindow.webContents.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8');
    debug('Create main process success 🍻');
};

app.setName('xbyjMusic');

app.on('ready', createMainWindow);

app.on('before-quit', () => {
    // Fix issues #14
    forceQuit = true;
});
app.on('activate', e => {
    if (!mainWindow.isVisible()) {
        mainWindow.show();
    }
});

storage.get('preferences', (err, data) => {
    var port = config.api.port;
    if (!err) {
        port = data.port || port;
        if (data.autoupdate) {
            autoUpdater.checkForUpdates();
        } else {
            autoUpdaterInit = true;
        }
    }
    axios.defaults.baseURL = `http://localhost:${port}`;
    api.listen(port, (err) => {
        if (err) throw err;
        debug(`API server is running with port ${port} 👊`);
    });
});

autoUpdater.on('update-not-available', e => {
    if (!autoUpdaterInit) {
        autoUpdaterInit = true;
        return;
    }
    dialog.showMessageBox({
        type: 'info',
        buttons: ['OK'],
        title: pkg.name,
        message: `${pkg.name} is up to date :)`,
        detail: `${pkg.name} ${pkg.version} is currently the newest version available, It looks like you're already rocking the latest version!`
    });
});

autoUpdater.on('update-available', e => {
    downloading = true;
    checkForUpdates();
});

autoUpdater.on('error', err => {
    dialog.showMessageBox({
        type: 'error',
        buttons: ['Cancel update'],
        title: pkg.name,
        message: `Failed to update ${pkg.name} :(`,
        detail: `An error occurred in retrieving update information, Please try again later.`,
    });
    downloading = false;
    console.error(err);
});

autoUpdater.on('update-downloaded', info => {
    var { releaseNotes, releaseName } = info;
    var index = dialog.showMessageBox({
        type: 'info',
        buttons: ['Restart', 'Later'],
        title: pkg.name,
        message: `The new version has been downloaded. Please restart the application to apply the updates.`,
        detail: `${releaseName}\n\n${releaseNotes}`
    });
    downloading = false;
    if (index === 1) {
        return;
    }
    autoUpdater.quitAndInstall();
    setTimeout(() => {
        mainWindow = null;
        app.quit();
    });
});
