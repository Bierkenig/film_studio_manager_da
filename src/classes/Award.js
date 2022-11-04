export default class Award {
    constructor(desc, type) {
        this.desc = desc
        this.type = type
    }

    getDesc() {
        return this.desc
    }

    getType() {
        return this.type
    }
}