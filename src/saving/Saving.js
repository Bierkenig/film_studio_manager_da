
const fs = require("fs");
const hash = require("object-hash");
const moment = require("moment");
const path = require("path");
const hidefile = require('hidefile');



//slot MUST be Integer 1-3 when calling this method
//Creates a save file used in load() default save-file for default file loading
export function save(data, slot) {
    data = JSON.parse(data)

    fs.mkdir(path.join('.', '.data'), (err) => {
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
        fs.mkdir(path.join('.','.data', 'recovery'), (err2) => {
            if (err2 && err2.code !== 'EEXIST') {
                console.log(err2)
            }
        })

            hidefile.hideSync(path.join('.', '.data'));




        //creates directory if not already existing
        fs.mkdir(path.join('.','.data', 'saves', slot.toString()), (err) => {
            if (err && err.code !== 'EEXIST') {
                console.log(err)
            }
        })



        //Attributes for save file: {save, backup, auto}
        //writes save-file with additional values
        fs.writeFile(path.join('.','.data', 'saves', slot.toString(), 'save.json'), JSON.stringify({
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

        fs.writeFile(path.join('.','.data', 'recovery',  'b' + slot.toString() + '.json'), JSON.stringify({
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
}


//slot MUST be Integer 1-3 when calling this method
//(Error-)Codes:
//100 - File loaded - Save-File or Backup was loaded
//101 - Save File corrupt - Backup will be used - recovery possible!
//102 - Backup File corrupt - No recovery!
export function load(slot){
    let save = JSON.parse(fs.readFileSync(path.join('.', '.data', 'saves', slot.toString(), 'save.json')).toString());
    let code = null;
    //security check #1
    if(!checkFileStatus(slot,'default')){
        code = '101';

        if(checkFileStatus(slot,'backup')){
            save = JSON.parse(fs.readFileSync(path.join('.', '.data',  'recovery',  'b' + slot.toString() + '.json')).toString());
        }
        else{
            code = '102';
        }
    }
    else{
        code = '100';
    }
    getSaveName(slot)

    getSaveDate(slot)

    return [save,code]
}

//slot MUST be Integer 1-3 when calling this method
export function deleteSaveFile(slot) {
    //checks if file exists before deleting
    if(checkIfExists(slot)[0]){
        //deleting file
        fs.unlink(path.join('.', '.data', 'saves', slot.toString(), 'save.json'), function (err) {
            if (err) return console.log(err);
            console.log('file deleted successfully');

            fs.unlink(path.join('.', '.data', 'recovery', 'b' + slot.toString() + '.json'), function (err) {
                if (err) return console.log(err);
                console.log('backup file deleted successfully');
            });

            fs.rmdir(path.join('.', '.data', 'saves', slot.toString()), function (err) {
                if (err) return console.log(err);
                console.log('directory deleted successfully');
            });
        });
    }
    else{
        console.log('not existing')
    }

}

export function checkIfExists(slot){
    console.log("check")
        try{
            fs.statSync(path.join('.','.data' ,'saves', slot.toString(), 'save.json'))
        }
        catch(e){
            console.log("no file")
            return [false, slot]
        }
        console.log("exists")
        return [true, slot]
}

//If file exists returns true/false
//If no file return null (can't work on unused slot)
export function checkFileStatus(slot, type){
    if(checkIfExists(slot)[0] && type === 'default') {
        let save = JSON.parse(fs.readFileSync(path.join('.','.data' ,'saves', slot.toString(), 'save.json')).toString());

        return hash(save.state) === save.hash;
    }
    else if(type === 'backup'){
        let save = JSON.parse(fs.readFileSync(path.join('.','.data','recovery', 'b' + slot.toString() + '.json')).toString());
        return hash(save.state) === save.hash;
    }
    else{
        return null
    }
}


export function getSaveName(slot){
    if(checkIfExists(slot)[0] && checkFileStatus(slot)){
        let save = JSON.parse(fs.readFileSync(path.join('.','.data' ,'saves', slot.toString(), 'save.json')).toString());
        console.log(save.state.studio.name)
        return save.state.studio.name
    }
}

//getSaveDate returns the date the save file was created
// getSaveDate(slot)[0] returns the date in american time system MM/DD/YYYY for en-language
// getSaveDate(slot)[1] returns the date in german time system DD/MM/YYYY for de-language
export function getSaveDate(slot) {
    if (checkIfExists(slot)[0] && checkFileStatus(slot)) {
        let save = JSON.parse(fs.readFileSync(path.join('.', '.data' ,'saves', slot.toString(), 'save.json')).toString());
        console.log(save.en_date)
        console.log(save.de_date)
        return [save.en_date, save.de_date]
    }
    return null
}