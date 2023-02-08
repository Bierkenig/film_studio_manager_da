'use strict'
import {app, BrowserWindow, ipcMain, protocol, screen} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {VUEJS3_DEVTOOLS} from 'electron-devtools-installer'

const path = require('path')
const isDevelopment = process.env.NODE_ENV !== 'production'
const saving = require("./saving/Saving");


// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}}
])

async function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 1500,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        resizable: true,
        movable: true,
        useContentSize: true,
        title: "Film Studio Manager",
    })

    console.log(screen.getPrimaryDisplay())

    //Resize to 16:9
    // set aspect ratio to 16:9 on Windows
    /*if (process.platform === 'win32') {
        let size = win.getSize()
        win.setSize(size[0], parseInt(size[0] * 9 / 16))
    }*/
    //win.setAspectRatio(win.getSize()[0] * 9 /16)
    /*let screenDimension = screen.getPrimaryDisplay().workAreaSize
    let width = screenDimension.width

    const scaleFactor = 1 / (1920 / width);
    win.once("ready-to-show", () => {
            win.maximize();
            win.setFullScreen(true);

        //Adjust zoom factor according to DPI or scale factor that we determined before
        console.log("Display with current scale factor: %o", scaleFactor);
        win.webContents.setZoomFactor(scaleFactor);
        win.show()
    });*/

    //DB Dev Path
    const sqlite3 = require('sqlite3').verbose()
    let dbPath = "src/DB/database/fsm.db"
    let db = null

    //IPC Main
    ipcMain.on('toGetPeople', (event, data) => {
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) console.error('Database opening error: ', err);
        });
        db.serialize(() => {
            db.each(data, (err, row) => {
                if (err) console.log(err)
                else event.sender.send('fromGetPeople', row)
            })
        })
        db.close()
        db = null
    })

    ipcMain.on('toGetTopics', (event, data) => {
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) console.error('Database opening error: ', err);
        });
        db.serialize(() => {
            db.each(data, (err, row) => {
                if (err) console.log(err)
                else event.sender.send('fromGetTopics', row)
            })
        })
        db.close()
        db = null
    })

    ipcMain.on('getGenres', (event, data) => {
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) console.error('Database opening error: ', err);
        });
        db.serialize(() => {
            db.each(data, (err, row) => {
                if (err) console.log(err)
                else event.sender.send('gotGenres', row)
            })
        })
        db.close()
        db = null
    })

    ipcMain.on('getSubGenres', (event, data) => {
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) console.error('Database opening error: ', err);
        });
        db.serialize(() => {
            db.each(data, (err, row) => {
                if (err) console.log(err)
                else event.sender.send('gotSubGenres', row)
            })
        })
        db.close()
        db = null
    })

    // IPC Saving
    ipcMain.on('savingData', (event, data) => {
        saving.save(data[0], data[1]);
    })

    ipcMain.on('saveSettingData', (event, data) => {
        saving.saveSettings(data);
    })

    ipcMain.on('r2mLoading', (event, data) => {
        event.sender.send(data.responseChannel, saving.load(data.slotNr))
    })

    ipcMain.on('r2mChecking', (event, data) => {
        event.sender.send('m2rChecking', saving.checkIfExists(data))
    })

    ipcMain.on('r2mSettingsLoading', (event) => {
        event.sender.send('m2rSettingsLoading', saving.loadSettings())
    })


    ipcMain.on('r2mDeleting', (event, data) => {
        //db.close()
        saving.deleteSaveFile(data)
    })

    ipcMain.on('autoSave', (event, data) => {
        saving.autoSave(data[0], data[1])
    })

    ipcMain.on('editDB', (event, data) => {
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) console.error('Database opening error: ', err);
        });

        db.serialize(() => {
            db.each(data, (err, row) => {
                if (err) console.log(err)
                console.log(row)
                //else event.sender.send('sendPeople', row)
            })
        })
        db.close()
        db = null
    })

    ipcMain.on('changeDBPath', (event, data) => {
        dbPath = data
        console.log(dbPath)
    })

    ipcMain.on('resetDB', (event, data) => {
        saving.resetDB(data)
    })

    //simulation
    //kill a Person
    ipcMain.on('killPerson', async (event, data) => {
        db = new sqlite3.Database("src/DB/test/fsm.db", (err) => {
            if (err) console.error('Database opening error: ', err);
        });

        let sql = data[0]
        let params = data[1]

        for (let i = 0; i < params.length; i++) {
            db.serialize(() => {
                db.each(sql, params[i], (err) => {
                    if (err) console.log(err)
                    else event.sender.send('killedPerson', "KILLED")
                })
            })
        }

        db.close()
        db = null
    })

    //refresh stats
    ipcMain.on('refreshPerson', (event, data) => {
        db = new sqlite3.Database("src/DB/test/fsm.db", (err) => {
            if (err) console.error('Database opening error: ', err);
        });

        let sql = data[0]
        let values = data[1]

        for (let i = 0; i < values.length; i++) {
            db.serialize(() => {
                db.each(sql, [values[i].exp, values[i].pop, values[i].id], (err) => {
                    if (err) console.log(err)
                    else console.log("DB: Person refreshed")
                })
            })
        }
        db.close()
        db = null
    })

    //generate a new one
    ipcMain.on('generatePerson', (event, data) => {
        db = new sqlite3.Database("src/DB/test/fsm.db", (err) => {
            if (err) console.error('Database opening error: ', err);
        });

        const sql = data[0]
        const params = data[1]

        for (let i = 0; i < params.length; i++) {
            db.serialize(() => {
                db.each(sql, params[i], (err) => {
                    if (err) console.log(err)
                    else console.log("DB: Person created")
                })
            })
        }
        db.close()
        db = null
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
    }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            await installExtension(VUEJS3_DEVTOOLS)
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }
    createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}
/**
// Set this to true if building for steam
const useSteam = true
if (useSteam) {
    const steamworks = require("steamworks.js")
    console.log("stesmworks, ", steamworks)
    const client = steamworks.init()

    console.log("client", client)
    console.log(client.localplayer.getName())
    // /!\ Those 3 lines are important for Steam compatibility!
    app.commandLine.appendSwitch("in-process-gpu")
    app.commandLine.appendSwitch("disable-direct-composition")
    app.allowRendererProcessReuse = false
}
 **/