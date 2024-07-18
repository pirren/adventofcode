import _ from 'lodash'
import extractAddressData from './extract.js'

const aba = (sequence) => {
    let aba = []
    for (let i = 0; i <= sequence.length - 3; i++) {
        let [a, b, c] = sequence.slice(i, i + 4)

        if (a !== b && a === c && c !== b ) 
            aba.push([a, b, c].join(''))
    }
    return _.compact(aba)
}

const bab = (babArray, aba) => {
    let bab = aba[1] + aba[0] + aba[1]
    return babArray.some(x => x == bab)
}

export default function solution (input) {
    let ips = input.map(extractAddressData)
    return ips.reduce((acc, ipv7) => {
        let abaSequences = ipv7.supernet.map(x => aba(x)).flat()
        let babSequences = ipv7.hypernet.map(x => aba(x)).flat()

        return abaSequences.some(x => bab(babSequences, x)) ? acc + 1 : acc
    }, 0)
}