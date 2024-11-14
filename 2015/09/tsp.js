import { defaultDict } from '../../lib/dict.js'
import { permute } from '../../lib/iter-tools.js'

const parse = (line) => {
    let match = /^(\w+) to (\w+) = (\d+)$/.exec(line).splice(1)
    return [match[0], match[1], Number(match[2])]
}

const calculateTotalDistance = (arr, map) => {
    let total = map[arr[0]][arr[1]]

    for (let i = 1; i < arr.length - 1; i++) 
        total += map[arr[i]][arr[i + 1]]

    return total
}

export default function tsp(input, { target = null, comparer = null } = {}) {
    let map = defaultDict(() => ({}))
    let locations = new Set()

    input.map(parse).forEach(([from, to, dist]) => {
        map[from][to] = dist
        map[to][from] = dist
        Array.from([to, from]).forEach(loc => locations.add(loc))
    })

    locations = [...locations]

    return permute(locations).reduce((best, perms) => comparer(calculateTotalDistance(perms, map), best), target)
}