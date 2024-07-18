import _ from 'lodash'

export default function extractAddressData (line) {
    return _.split(line, /\[|\]/).reduce((acc, part, index) => {
        if (index % 2 === 0) 
            acc.supernet.push(part)
        else 
            acc.hypernet.push(part)
        return acc
    }, { supernet: [], hypernet: [] })
}