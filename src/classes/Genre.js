export default class Genre {
    constructor(genreName, childrenPopularity, teenPopularity, adultPopularity) {
        this.genreName = genreName
        this.childrenPopularity = childrenPopularity
        this.teenPopularity = teenPopularity
        this.adultPopularity = adultPopularity
    }

    static fromJSON(jsonObject){
        return Object.assign(new Genre(), jsonObject)
    }
}