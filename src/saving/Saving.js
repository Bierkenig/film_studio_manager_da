
const fs = require("fs");
const hash = require("object-hash");
const moment = require("moment");
let path = require("path")


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
            date: moment().format("DD/MM/YYYY HH:mm:ss"),
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

    let data = fs.readFileSync(path.join('.', 'saves', slot.toString(), 'save.json'));

    let save = JSON.parse(data.toString());

    //security check #1
    if (hash(save.state) !== save.hash) {
        //TODO corrupted error
        console.log("corrupted")
        return null
    }
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
        });
    });
}