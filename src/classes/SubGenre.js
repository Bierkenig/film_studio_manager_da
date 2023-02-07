import DataUtil from "@/classes/DataUtil";

export default class SubGenre {
    constructor(subGenreName, childrenPopularity, teenPopularity, adultPopularity) {
        if(arguments[0] === DataUtil.skip){
            return
        }
        this.subGenreName = subGenreName
        this.childrenPopularity = childrenPopularity
        this.teenPopularity = teenPopularity
        this.adultPopularity = adultPopularity
    }

    static fromJSON(jsonObject){
        return Object.assign(new SubGenre(DataUtil.skip), jsonObject)
    }
}