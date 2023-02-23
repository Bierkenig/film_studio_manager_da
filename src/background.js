'use strict'
import {app, BrowserWindow, ipcMain, protocol, screen} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {VUEJS3_DEVTOOLS} from 'electron-devtools-installer'
import {spawn} from "child_process";
import {streamWrite} from "@rauschma/stringio";

const path = require('path');


const isDevelopment = process.env.NODE_ENV !== 'production'
const saving = require("./saving/Saving");


// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true, stream: true}}
])

export let updatePresence

async function createWindow() {

    const primaryDisplay = screen.getPrimaryDisplay()
    const { width, height } = primaryDisplay.workAreaSize
    // Create the browser window.
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
        },
        resizable: false,
        fullscreen: true,
        frame: false,
        movable: false,
    })

    launchDiscordGameSDK(win)

    console.log(screen.getPrimaryDisplay())

    //DB Dev Path
    const sqlite3 = require('sqlite3').verbose()
    let dbPath = isDevelopment ? "public/DB/database/fsm.db" : "../bundled/DB/database/fsm.db"
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

    ipcMain.on('getStudios', (event, data) => {
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) console.error('Database opening error: ', err);
        });
        db.serialize(() => {
            db.each(data, (err, row) => {
                if (err) console.log(err)
                else event.sender.send('gotStudios', row)
            })
        })
        db.close()
        db = null
    })

    ipcMain.on('getCharacters', (event, data) => {
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) console.error('Database opening error: ', err);
        });
        db.serialize(() => {
            db.each(data, (err, row) => {
                if (err) console.log(err)
                else event.sender.send('gotCharacters', row)
            })
        })
        db.close()
        db = null
    })

    ipcMain.on('getRoles', (event, data) => {
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) console.error('Database opening error: ', err);
        });
        db.serialize(() => {
            db.each(data, (err, row) => {
                if (err) console.log(err)
                else event.sender.send('gotRoles', row)
            })
        })
        db.close()
        db = null
    })

    ipcMain.on('getScreenplays', (event, data) => {
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) console.error('Database opening error: ', err);
        });
        db.serialize(() => {
            db.each(data, (err, row) => {
                if (err) console.log(err)
                else event.sender.send('gotScreenplays', row)
            })
        })
        db.close()
        db = null
    })

    ipcMain.on('getMovies', (event, data) => {
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) console.error('Database opening error: ', err);
        });
        db.serialize(() => {
            db.each(data, (err, row) => {
                if (err) console.log(err)
                else event.sender.send('gotMovies', row)
            })
        })
        db.close()
        db = null
    })

    ipcMain.on('getIntAwards', (event, data) => {
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) console.error('Database opening error: ', err);
        });
        db.serialize(() => {
            db.each(data, (err, row) => {
                if (err) console.log(err)
                else event.sender.send('gotIntAwards', row)
            })
        })
        db.close()
        db = null
    })

    ipcMain.on('getIndAwards', (event, data) => {
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) console.error('Database opening error: ', err);
        });
        db.serialize(() => {
            db.each(data, (err, row) => {
                if (err) console.log(err)
                else event.sender.send('gotIndAwards', row)
            })
        })
        db.close()
        db = null
    })

    ipcMain.on('getAudAwards', (event, data) => {
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) console.error('Database opening error: ', err);
        });
        db.serialize(() => {
            db.each(data, (err, row) => {
                if (err) console.log(err)
                else event.sender.send('gotAudAwards', row)
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

    ipcMain.on('updateDiscordDetails', (event, data) => {
        updatePresence(data)
    })

    ipcMain.on('editDB', (event, data) => {
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) console.error('Database opening error: ', err);
        });

        db.serialize(() => {
            db.each(data, (err, row) => {
                if (err) console.log(err)
                //else event.sender.send('sendPeople', row)
            })
        })
        db.close()
        db = null
    })

    ipcMain.on('changeDBPath', (event, data) => {
        dbPath = data
        console.log(data)
    })

    ipcMain.on('resetDB', (event, data) => {
        saving.resetDB(data)
    })

    //if (process.env.WEBPACK_DEV_SERVER_URL)
    if (isDevelopment) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        //if (!process.env.IS_TEST) win.webContents.openDevTools()
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

async function launchDiscordGameSDK(win) {
    let child
    try {
        if(process.env.NODE_ENV === 'production'){
            child = spawn('java', ['-jar', '../bundled/Discord.jar', process.pid.toString()],
                {stdio: ['pipe', process.stdout, process.stderr]});
        }
        else{
            child = spawn('java', ['-jar', 'src/Discord.jar', process.pid.toString()],
                {stdio: ['pipe', process.stdout, process.stderr]});
        }

        child.stdin.on('error', (error) => {
            updatePresence = () => {
            }
        })
        updatePresence = (details) => {
            if (child.pid != undefined) {
                streamWrite(child.stdin, details + '\n');
            }
        }

        await new Promise(resolve => setTimeout(resolve, 100))
        if (child.pid != undefined) {
            function keepAlive() {
                updatePresence("keepAlive")
                setTimeout(keepAlive, 10)
            }

            keepAlive()
        }

    } catch (e) {
        console.log("No Java No Party")
    }
}