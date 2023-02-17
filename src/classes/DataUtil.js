
export default class DataUtil {
    static skip = {}

    static transferProperties(from, to, keys) {
        return keys.reduce((current, key) => {
            current[key] = from[key]
            return current
        }, to)

        //for(let key in keys){
        //    to[key] = from[key]
        //}
    }

    static objectMap(obj, fn) {
        return Object.fromEntries(
            Object.entries(obj).map(
                ([key, value]) => [key, fn(value, key)]
            )
        )
    }

    static objectMapPerProperty(obj,mappingFunctions){
        return this.objectMap(mappingFunctions, (mappingFunction, key) => {
            return mappingFunction(obj[key])
        })
    }

    static mapArray(mappingFunction) {
        return array => array.map(mappingFunction)
    }

    static preserveNull(mappingFunction) {
        return obj => obj == null ? null : mappingFunction(obj)
    }

}