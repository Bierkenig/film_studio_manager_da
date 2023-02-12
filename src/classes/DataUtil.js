
export default class DataUtil {
    static skip = {}

    static transferProperties(from, to, keys) {
        for(let key in keys){
            to[key] = from[key]
        }
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
}