
const fs = require("fs");
const hash = require("object-hash");
const moment = require("moment");
const path = require("path");
const hidefile = require('hidefile');

let autoCounter = 1000;

//slot MUST be Integer 1-3 when calling this method
//Creates a save file used in load() default save-file for default file loading
export function save(data, slot) {
    data = JSON.parse(data)

    fs.mkdir(path.join('.', '.data'), (err) =>{
        fs.mkdir(path.join('.', '.data', 'saves'), (err1) =>{
            if (err1 && err1.code !== 'EEXIST') {
                console.log(err1)
                return
            }
        })
        if (err && err.code !== 'EEXIST') {
            console.log(err)
            return
        }
        fs.mkdir(path.join('.', '.data', 'recovery'), (err2) => {
            if (err2 && err2.code !== 'EEXIST') {
                console.log(err2)
            }
        })
        if (!hidefile.isHiddenSync(path.join('.', '.data'))) {
            hidefile.hideSync(path.join('.', '.data'));
        }

        //creates directory if not already existing
        // fs.mkdir(path.join('.', '.data', 'saves', slot.toString()), (err) => {
        //     if (err && err.code !== 'EEXIST') {
        //         console.log(err)
        //     }
        // })


        //Attributes for save file: {save, backup, auto}
        //writes save-file with additional values
        fs.writeFile(path.join('.', '.data', 'saves','save' + slot.toString() + '.json'), JSON.stringify({
            en_date: moment().format("MM/DD/YYYY HH:mm:ss"),
            de_date: moment().format("DD/MM/YYYY HH:mm:ss"),
            slot: slot,
            warning: 'Changing this data could cause the save file to be corrupted and therefore the game data might not be restored!',
            type: 'save',
            state: data,
            hash: hash(data)
        }, null, 2), 'utf-8', err => {
            if (err) {
                console.error(err);
                return
            }
        })

        fs.writeFile(path.join('.', '.data', 'recovery', 'b' + slot.toString() + '.json'), JSON.stringify({
            warning: 'Changing this data could cause the save file to be corrupted and therefore the game data might not be restored!',
            en_date: moment().format("MM/DD/YYYY HH:mm:ss"),
            de_date: moment().format("DD/MM/YYYY HH:mm:ss"),
            slot: slot,
            type: 'backup',
            state: data,
            hash: hash(data)
        }, null, 2), 'utf-8', err => {
            if (err) {
                console.error(err);
                return
            }
        })

    })
    //createDBForSlot();
    //autoSave(JSON.stringify(data),slot);
}


//slot MUST be Integer 1-3 when calling this method
//(Error-)Codes:
//100 - File loaded - Save-File was loaded
//101 - Save File corrupt - Backup will be used - recovery possible!
//102 - Save File & Backup File corrupt or No File
//103 - Auto File newer
//104 - Save & Backup corrupted - Auto Save File exists and could be used
//105 - No Save File, but Auto Save available
//106 - No Save File
export function load(slot) {
    let save = null;
    let code = null;

    //security check #1
    console.log(code)
    if (!checkFileStatus(slot, 'default')) {
        code = '101';

        if (checkFileStatus(slot, 'backup')) {
            try {
                save = JSON.parse(fs.readFileSync(path.join('.', '.data', 'recovery', 'b' + slot.toString() + '.json')).toString());

            } catch (e) {
                code = '102'
            }
        } else {
            code = '102';
        }
    } else {
        try {
            save = JSON.parse(fs.readFileSync(path.join('.', '.data', 'saves', 'save' + slot.toString() + '.json')).toString());
            code = '100';
        } catch (e) {
            code = '102'
        }

        console.log(compareDate(slot))
        if (code !== '102' && checkFileStatus(slot, 'default') && compareDate(slot)[0]) {
            code = '103'
            return [save, code, slot, compareDate(slot)[1]]
        }
    }

    if (checkIfExists(slot)[0] === false) {
        code = '106'
        return [null, code, slot]
    }

    //getSaveName(slot)

    //getSaveDate(slot)


    console.log(code)

    if (code === '102') {
        return [null, code, slot]
    } else {
        return [save, code, slot]
    }
}

export function compareDate(slot) {
    let autoSave = null;
    let save = JSON.parse(fs.readFileSync(path.join('.', '.data', 'saves', 'save' + slot.toString() + '.json')).toString());

    let fileNames = fs.readdirSync(path.join('.', '.data', 'temp'));

    //listing all files using forEach
    fileNames.forEach(file => {
        console.log(file)
        if (file.substr(8, 1) === slot.toString()) {
            autoSave = JSON.parse(fs.readFileSync(path.join('.', '.data', 'temp', 'temp' + file.substr(4, 4) + slot.toString() + '.json')).toString())
        }
    });

    if (autoSave !== null) {
        if (save.de_date > autoSave.de_date) {
            console.log('save ist aktueller')
            return [false, null];
        } else {
            console.log('autoSave ist aktueller')
            return [true, autoSave];
        }
    } else {
        return [false, null];
    }


}

//slot MUST be Integer 1-3 when calling this method
export function deleteSaveFile(slot) {
    //checks if file exists before deleting
    if (checkIfExists(slot)[0]) {
        //deleting file
        fs.unlink(path.join('.', '.data', 'saves', 'save' + slot.toString()+ '.json'), function (err) {
            if (err) return console.log(err);
            console.log('file deleted successfully');

            fs.unlink(path.join('.', '.data', 'recovery', 'b' + slot.toString() + '.json'), function (err) {
                if (err) return console.log(err);
                console.log('backup file deleted successfully');
            });

            // fs.rmdir(path.join('.', '.data', 'saves', slot.toString()), function (err) {
            //     if (err) return console.log(err);
            //     console.log('directory deleted successfully');
            // });
        });
    } else {
        console.log('not existing')
    }

}

export function checkIfExists(slot = null) {
    console.log("check")
    if (slot !== null) {
        try {
            fs.statSync(path.join('.', '.data', 'saves', 'save' + slot.toString() + '.json'))
        } catch (e) {
            console.log("no file")
            return [false, slot]
        }
        console.log("exists")
        return [true, slot]
    }
    if (slot === null) {
        try {
            fs.statSync(path.join('.', '.data', 'settings.json'));
            return true;
        } catch (e) {
            return false;
        }
    }
}

// export function checkIfExists(slot = null){
//     console.log("check")
//     let result;
//
//     if(slot !== null) {
//         const filePath = path.join('.','.data' ,'saves', slot.toString(), 'save.json');
//
//         try {
//             fs.statSync(filePath);
//             result = [true, slot];
//         } catch (e) {
//             result = [false, slot];
//         }
//     }
//     if(slot === null){
//         const filePath = path.join('.','.data','settings.json');
//
//         try{
//             fs.statSync(filePath);
//             result = true;
//         }
//         catch(e) {
//             result = false;
//         }
//     }
//
//     console.log(result[0] ? "exists" : "no file");
//     return result;
// }


//If file exists returns true/false
//If no file return null (can't work on unused slot)
// export function checkFileStatus(slot, type){
//     if(checkIfExists(slot)[0] && type === 'default') {
//         let save = JSON.parse(fs.readFileSync(path.join('.','.data' ,'saves', slot.toString(), 'save.json')).toString());
//         return hash(save.state) === save.hash;
//     }
//     else if(checkIfExists(slot)[0] && type === 'backup'){
//         let save = JSON.parse(fs.readFileSync(path.join('.','.data','recovery', 'b' + slot.toString() + '.json')).toString());
//         return hash(save.state) === save.hash;
//     }
//     else{
//         return false
//     }
// }
export function checkFileStatus(slot, type) {
    if (checkIfExists(slot)[0]) {
        let saveFileLocation;
        if (type === 'default') {
            saveFileLocation = path.join('.', '.data', 'saves','save' + slot.toString() + '.json');
        } else if (type === 'backup') {
            saveFileLocation = path.join('.', '.data', 'recovery', 'b' + slot.toString() + '.json');
        } else {
            return false;
        }
        try{
            let save = JSON.parse(fs.readFileSync(saveFileLocation).toString());
            return hash(save.state) === save.hash;
        }catch{
            return false;
        }
    } else {
        return false;

    }
}


export function getSaveName(slot) {
    if (checkIfExists(slot)[0] && checkFileStatus(slot)) {
        let save = JSON.parse(fs.readFileSync(path.join('.', '.data', 'saves', 'save' + slot.toString() + '.json')).toString());
        console.log(save.state.studio.name)
        return save.state.studio.name
    }
}

//getSaveDate returns the date the save file was created
// getSaveDate(slot)[0] returns the date in american time system MM/DD/YYYY for en-language
// getSaveDate(slot)[1] returns the date in german time system DD/MM/YYYY for de-language
export function getSaveDate(slot) {
    if (checkIfExists(slot)[0] && checkFileStatus(slot)) {
        let save = JSON.parse(fs.readFileSync(path.join('.', '.data', 'saves','save' + slot.toString() + '.json')).toString());
        console.log(save.en_date)
        console.log(save.de_date)
        return [save.en_date, save.de_date]
    }
    return null
}

//TODO remove underscore from file
//TODO use auto save when both save files are corrupted
export function autoSave(data, slot) {
    data = JSON.parse(data)

    fs.mkdir(path.join('.', '.data'), (err) => {
        if (err && err.code !== 'EEXIST') {
            console.log(err)
            return
        }

        //creates directory if not already existing
        fs.mkdir(path.join('.', '.data', 'temp'), (err) => {
            if (err && err.code !== 'EEXIST') {
                console.log(err)
            }
        })

        //Attributes for save file: {save, backup, auto}
        //writes save-file with additional values
        fs.writeFile(path.join('.', '.data', 'temp', 'temp' + autoCounter.toString() + slot.toString() + '.json'), JSON.stringify({
            en_date: moment().format("MM/DD/YYYY HH:mm:ss"),
            de_date: moment().format("DD/MM/YYYY HH:mm:ss"),
            slot: slot,
            warning: 'Changing this data could cause the save file to be corrupted and therefore the game data might not be restored!',
            type: 'auto',
            state: data,
            hash: hash(data)
        }, null, 2), 'utf-8', err => {
            if (err) {
                console.error(err);
                return
            }
        })

    })
    autoCounter++;

    if (autoCounter > 1001) {
        fs.unlink(path.join('.', '.data', 'temp', 'temp' + (autoCounter - 1).toString() + slot.toString() + '.json'), function (err) {
            if (err) return console.log(err);
            console.log('auto file ' + (autoCounter - 1) + ' deleted successfully');
        })
    }

    if (autoCounter === 1001) {

        fs.readdir(path.join('.', '.data', 'temp'), function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            console.log("checking directory")
            //listing all files using forEach
            files.forEach(function (file) {
                // Do whatever you want to do with the file

                if (file.substr(8, 1) === slot.toString()) {
                    if (file.substr(4, 4) > 1001) {
                        fs.unlink(path.join('.', '.data', 'temp', 'temp' + file.substr(4, 4).toString() + slot.toString() + '.json'), function (err) {
                            if (err) return console.log(err);
                            console.log('auto file ' + file.substr(4, 4) + ' deleted successfully');
                        })
                    }
                }
            });
        });
    }
}


export function resetDB(slot) {
    fs.copyFileSync('src/DB/database/fsm.db', './.data/database/fsm_custom' + slot.toString() + '.db')

}

export function saveSettings(data) {
    data = JSON.parse(data)
    fs.writeFile(path.join('.', '.data', 'settings.json'), JSON.stringify({
        en_date: moment().format("MM/DD/YYYY HH:mm:ss"),
        de_date: moment().format("DD/MM/YYYY HH:mm:ss"),
        type: 'settings',
        state: data
    }, null, 2), 'utf-8', err => {
        if (err) {
            console.error(err);
            return
        }
    })
}

export function loadSettings() {
    let save = null;
    if (checkIfExists()) {
        save = JSON.parse(fs.readFileSync(path.join('.', '.data', 'settings.json')).toString());
    }

    return save;
}
