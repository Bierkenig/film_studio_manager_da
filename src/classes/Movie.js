import {Screenplay} from "./Screenplay";
import store from "../services/store";
import Person from "@/classes/Person";

export class Movie {
    constructor(screenplay, studio, year, earnings) {
        this.studio = studio
        this.title = screenplay.getTitle()
        this.screenplay = screenplay;
        this.director = new Person(2,null,'Jakob','Mukovic',25,'male','austrian','arabian',4,4,3,null,null,5,23,123456,null,true,false,null);
        this.roles = {main: [], support: [], minor: []};
        this.year = year
        this.earnings = earnings
    }

    getStudio() {
        return this.studio
    }

    getTitle() {
        return this.title
    }

    getScreenplay() {
        return this.screenplay;
    }

    getYear() {
        return this.year
    }

    getEarnings() {
        return this.earnings
    }

    getDirector() {
        return this.director;
    }

    setDirector(value) {
        this.director = value;
    }

    getRoles() {
        return this.roles;
    }

    addMainCharacter(actor) {
        this.roles.main.push(actor);
    }

    addSupportCharacter(actor) {
        this.roles.support.push(actor);
    }

    addMinorCharacter(actor) {
        this.roles.minor.push(actor);
    }

    toString() {
        let castString = '';
        for (let rolesKey in this.roles) {
            for (let actorKey in this.roles[rolesKey]) {
                if (castString !== '') {
                    castString += ', ';
                }
                castString += this.roles[rolesKey][actorKey].getFirstName() + ' ' + this.roles[rolesKey][actorKey].getLastName();
            }
        }
        return 'Screenplay: ' + this.screenplay.toString() + ', Director: ' + this.director + ', Cast: ' + castString;
    }

    static fromJSON(jsonObject){
        let instance = Object.assign(new Movie(), jsonObject)

        instance.screenplay = instance.screenplay? Screenplay.fromJSON(instance.screenplay) : null
        instance.director = instance.director? store.data.allDirectors.find(director => director.id === instance.director.id) : null
        instance.roles.main = this.rolesFromJSON(instance.roles.main)
        instance.roles.minor = this.rolesFromJSON(instance.roles.minor)
        instance.roles.support = this.rolesFromJSON(instance.roles.support)
        return instance
    }

    static rolesFromJSON(jsonArray){
        return jsonArray.map(jsonObject => store.data.allActors.find(actor => actor.id === jsonObject.id)).filter(actor => actor)
    }
}