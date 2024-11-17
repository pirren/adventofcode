import _ from 'lodash'
import extractAddressData from './extract.js'

export const metadata = {
    "Puzzle Name": "Internet Protocol Version 7"
}

const abba = (sequence) => {
    for (let i = 0; i <= sequence.length - 4; i++) {
        let [a, b, c, d] = sequence.slice(i, i + 4)

        if (a !== b && a === d && b === c) 
            return true
    }
    return false
}

export default function solution (input) {
    let ips = input.map(extractAddressData)
    return ips.reduce((acc, ip) => ip.hypernet.some(abba) ? acc : acc + (ip.supernet.some(abba) ? 1 : 0), 0)
}