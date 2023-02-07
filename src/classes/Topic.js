import DataUtil from "@/classes/DataUtil";

export default class Topic {
    constructor(topicName, childrenPopularity, teenPopularity, adultPopularity) {
        if(arguments[0] === DataUtil.skip){
            return
        }
        this.topicName = topicName
        this.childrenPopularity = childrenPopularity
        this.teenPopularity = teenPopularity
        this.adultPopularity = adultPopularity
    }

    static fromJSON(jsonObject){
        return Object.assign(new Topic(DataUtil.skip), jsonObject)
    }
}