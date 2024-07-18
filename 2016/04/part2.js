import _ from 'lodash'

export default function solution (input) {
    return _.reduce(input, (result, line) => {
        const match = /^([a-z-]+)-(\d+)\[([a-z]+)\]$/.exec(line)
    
        const secId = +match[2]
        const letters = [...match[1]
            .replaceAll('-', '')]
            .map(c => String.fromCharCode(97 + (c.charCodeAt(0) - 'a'.charCodeAt(0) + secId) % 26))
            .join('');
        
            return _.includes(letters, 'north') ? secId : result
    }, undefined);
} 
