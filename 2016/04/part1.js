import _ from 'lodash'

export default function solution (input) {
    const regex = /^([a-z-]+)-(\d+)\[([a-z]+)\]$/;

    return _.map(input, line => {
        const match = regex.exec(line);
    
        const secId = +match[2]
        const givenChecksum = match[3]
        const letters = match[1].replaceAll('-', '')

        return { letters, secId, givenChecksum }
    }).reduce((acc, room) => {
        let letterMap = _.reduce([...room.letters], (map, char) => (map[char] = (map[char] ?? 0) + 1, map), {})

        let computedChecksum = Object.keys(letterMap).sort((a, b) => letterMap[b] !== letterMap[a]
            ? letterMap[b] - letterMap[a]
            : a.localeCompare(b)
        ).join('').slice(0, 5)

        return acc + (computedChecksum === room.givenChecksum ? room.secId : 0)
    }, 0)
} 
