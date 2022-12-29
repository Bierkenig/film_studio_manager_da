export default class DataUtil {
    static transferProperties(from, to, keys) {
        return keys.reduce((current, key) => {
            current[key] = from[key]
            return current
        }, to)
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