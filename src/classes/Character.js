export class Character {
    constructor(name, gender, age) {
        //TYPE -> String
        this.name = name;
        //TYPE -> String
        this.gender = gender;
        //TYPE -> Number
        this.age = age;
    }

    getName() {
        return this.name;
    }

    setName(value) {
        this.name = value;
    }

    getGender() {
        return this.gender;
    }

    setGender(value) {
        this.gender = value;
    }

    getAge() {
        return this.age;
    }

    setAge(value) {
        this.age = value;
    }

    static fromJSON(jsonObject){
        return Object.assign(new Character(), jsonObject)
    }
    toString() {
        return "Character(Name: " + this.name +  ", Gender: " + this.gender + ", Age: " + this.age + ")";
    }
}