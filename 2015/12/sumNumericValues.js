import _ from 'lodash'

export default function sumNumericValues(jsonData, { doubleCount = false } = {}) {
    let numbers = []
    for (let key in jsonData) {
        let value = jsonData[key]
        if (doubleCount && value === 'red' && isObject(jsonData)) {
            return []
        }
        if (typeof value === 'number') {
            numbers.push(value)
        } else if (typeof value === 'object') {
            numbers = numbers.concat(sumNumericValues(value, { doubleCount }))
        }
    }
    return _.sum(numbers)
}

function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}