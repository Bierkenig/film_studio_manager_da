
const fs = require("fs");
const hash = require("object-hash");
const moment = require("moment");
const path = require("path")


//slot MUST be Integer 1-3 when calling this method
//Creates a save file used in load() default save-file for default file loading
export function save(data, slot){
    data=JSON.parse(data)

    //creates directory if not already existing
    fs.mkdir(path.join('.', 'saves', slot.toString()), (err) => {
        if (err && err.code !== 'EEXIST') {
            console.log(err)
            return
        }

        //Attributes for save file: {default, backup, auto}
        //writes save-file with additional values
        fs.writeFile(path.join('.', 'saves', slot.toString(), 'save.json'), JSON.stringify({
            en_date: moment().format("MM/DD/YYYY HH:mm:ss"),
            de_date: moment().format("DD/MM/YYYY HH:mm:ss"),
            slot: slot,
            warning: 'Changing this data could cause the save file to be corrupted and therefore the game data might not be restored!',
            type: 'default',
            state: data,
            hash: hash(data)
        }, null, 2), 'utf-8', err => {
            if (err) {
                console.error(err);
                return
            }
        })

        //let nameData = fs.readFileSync('./saves/save1.json');
        //fs.rename('./saves/save1.json','./saves/save1' + JSON.stringify(nameData) + '.json', (error => {
        //    if(error){
        //        console.log(error);
        //        return
        //    }
        //}))
    })
}

//slot MUST be Integer 1-3 when calling this method
export function load(slot){
    let save = null
    let data = fs.readFileSync(path.join('.', 'saves', slot.toString(), 'save.json'));

    try{
        save = JSON.parse(data.toString());

    }catch (e){
        console.log(e.message)
    }

    //security check #1
    if(!checkFileStatus(slot)){
        console.log("corrupted")
        return null
    }
    getSaveName(slot)

    getSaveDate(slot)

    return save
}

//slot MUST be Integer 1-3 when calling this method
export function deleteSaveFile(slot) {
    //checks if file exists before deleting
    fs.stat(path.join('.', 'saves', slot.toString(), 'save.json'), function (err) {
        //console.log(stats);//here we got all information of file in stats variable

        if (err) {
            return console.error(err);
        }

        //deleting file
        fs.unlink(path.join('.', 'saves', slot.toString(), 'save.json'), function (err) {
            if (err) return console.log(err);
            console.log('file deleted successfully');

            fs.rmdir(path.join('.', 'saves', slot.toString()), function (err) {
                if (err) return console.log(err);
                console.log('directory deleted successfully');
            });
        });
    });
}

export function checkIfExists(slot){
    console.log("check")
        try{
            fs.statSync(path.join('.', 'saves', slot.toString(), 'save.json'))
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
export function checkFileStatus(slot){
    if(checkIfExists(slot)[0]) {
        let save = JSON.parse(fs.readFileSync(path.join('.', 'saves', slot.toString(), 'save.json')).toString());

        return hash(save.state) === save.hash;
    }
    else{
        return null
    }
}


export function getSaveName(slot){
    if(checkIfExists(slot)[0] && checkFileStatus(slot)){
        let save = JSON.parse(fs.readFileSync(path.join('.', 'saves', slot.toString(), 'save.json')).toString());
        console.log(save.state.studio.name)
        return save.state.studio.name
    }
}

//getSaveDate returns the date the save file was created
// getSaveDate(slot)[0] returns the date in american time system MM/DD/YYYY for en-language
// getSaveDate(slot)[1] returns the date in german time system DD/MM/YYYY for de-language
export function getSaveDate(slot) {
    if (checkIfExists(slot)[0] && checkFileStatus(slot)) {
        let save = JSON.parse(fs.readFileSync(path.join('.', 'saves', slot.toString(), 'save.json')).toString());
        console.log(save.en_date)
        console.log(save.de_date)
        return [save.en_date, save.de_date]
    }
    return null
}