export class Character {
    constructor(name, gender, age) {
        this.name = name;
        this.gender = gender;
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

    toString() {
        return "Character(Name: " + this.name +  ", Gender: " + this.gender + ", Age: " + this.age + ")";
    }
}