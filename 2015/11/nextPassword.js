import _ from 'lodash'

export default function nextPassword(input, n) {
    let encoder = new TextEncoder();
    let decoder = new TextDecoder();

    let buffer = encoder.encode(input);
    
    let len = buffer.length - 1
    let passwords = []

    while(passwords.length < n) {
        buffer = generateNext(buffer, len, len)

        if (valid(buffer)) 
            passwords.push(decoder.decode(buffer))
    }

    return passwords.at(-1)
}

let [min, max] = [ 97, 122 ]

function generateNext(buffer, len, pos) {
    do {
        buffer[pos]++
    } while (badChar(buffer[pos]))

    if (buffer[pos] > max) {
        return generateNext(buffer, len, pos - 1)
    }

    if (pos < len) {
        for (let i = pos + 1; i <= len; i++) {
            buffer[i] = min
        }
    }

    return buffer;
}

function valid(buffer) {
    return incrementsBy(buffer) && validChars(buffer) && twoPairs(buffer)
}

function incrementsBy(buffer) {
    for (let i = 2; i < buffer.length; i++) {
        let arr = buffer.slice(i - 2, i + 1) 
        if (arr.every((v, i) => i === 0 || v - arr[i - 1] === 1)) {
            return true
        }
    }
    return false
}

function validChars(buffer) {
    return !buffer.some(badChar) // Check for i, o, l
}

function badChar(v) {
    return [105, 111, 108].includes(v)
}

function twoPairs(buffer) {
    let count = 0
    for(let i = 1; i < buffer.length; i++) {
        if (buffer[i] !== buffer[i - 1]) 
            continue
        count++
        i++
    }
    return count > 1
}
