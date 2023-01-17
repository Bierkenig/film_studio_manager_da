'use strict'
import {app, BrowserWindow, ipcMain, protocol} from 'electron'
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
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

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
    })

    ipcMain.on('toGetGenreRating', (event, data) => {
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) console.error('Database opening error: ', err);
        });
        db.serialize(() => {
            db.each(data, (err, row) => {
                if (err) console.log(err)
                else event.sender.send('fromGetGenreRating', row)
            })
        })
        db.close()
    })
// IPC Saving
    ipcMain.on('savingData', (event, data) => {
        saving.save(data[0], data[1]);
    })

    ipcMain.on('saveSettingData', (event, data) => {
        saving.saveSettings(data);
    })

    ipcMain.on('r2mLoading', (event, data) => {
        event.sender.send('m2rLoading', saving.load(data))
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
    })

    ipcMain.on('changeDBPath', (event, data) => {
        dbPath = data
        console.log(dbPath)
    })

    ipcMain.on('resetDB', (event, data) => {
        saving.resetDB(data)
    })

    //simulation
    //get last Id
    ipcMain.on('lastID', (event, data) => {
        db = new sqlite3.Database("src/DB/test/fsm.db", (err) => {
            if (err) console.error('Database opening error: ', err);
        });

        db.serialize(() => {
            db.each(data, (err, row) => {
                if (err) console.log(err)
                console.log("DB: Got the last ID")
                event.sender.send('sendLastID', row)
            })
        })
        db.close()
    })

    //kill a Person
    ipcMain.on('killPerson', (event, data) => {
        db = new sqlite3.Database("src/DB/test/fsm.db", (err) => {
            if (err) console.error('Database opening error: ', err);
        });

        let sql = data[0]
        let params = data[1]

        db.serialize(() => {
            db.each(sql, params, (err) => {
                if (err) console.log(err)
                console.log("DB: Killed a Person")
            })
        })
        db.close()
    })

    //generate a new one
    ipcMain.on('generatePerson', (event, data) => {
        db = new sqlite3.Database("src/DB/test/fsm.db", (err) => {
            if (err) console.error('Database opening error: ', err);
        });

        const sql = data[0]
        const params = data[1]

        db.serialize(() => {
            db.each(sql, params, (err) => {
                if (err) console.log(err)
                console.log("DB: Person created")
            })
        })
        db.close()
    })

    //refresh stats
    ipcMain.on('refreshPerson', (event, data) => {
        db = new sqlite3.Database("src/DB/test/fsm.db", (err) => {
            if (err) console.error('Database opening error: ', err);
        });

        let sql = data[0]
        let params = data[1]

        db.serialize(() => {
            db.each(sql, params, (err) => {
                if (err) console.log(err)
                console.log("DB: Person refreshed")
            })
        })
        db.close()
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