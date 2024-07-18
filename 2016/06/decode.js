import _ from 'lodash'

export default function decode(data, sortBy) {
    return Array.from({ length: data[0].length }, (_, position) => {
        let frequencies = {};

        data.forEach(line => {
            let char = line[position];
            frequencies[char] = (frequencies[char] || 0) + 1; 
        });

        return Object.keys(frequencies).reduce((a, b) => sortBy(frequencies, a, b) ? a : b)
    }).join('')
}