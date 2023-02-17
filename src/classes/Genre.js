import DataUtil from "@/classes/DataUtil";

export default class Genre {
    constructor(id, genreName, childrenPopularity, teenPopularity, adultPopularity) {
        if(arguments[0] === DataUtil.skip){
            return
        }
        this.id = id
        this.genreName = genreName
        this.childrenPopularity = childrenPopularity
        this.teenPopularity = teenPopularity
        this.adultPopularity = adultPopularity
    }

    static fromJSON(jsonObject){
        return Object.assign(new Genre(DataUtil.skip), jsonObject)
    }
}