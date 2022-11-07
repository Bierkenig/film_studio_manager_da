export default class Award {
    constructor(desc, type, year) {
        this.desc = desc
        this.type = type
        this.year = year
    }

    getDesc() {
        return this.desc
    }

    getType() {
        return this.type
    }

    getYear() {
        return this.year
    }
}