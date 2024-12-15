import _ from 'lodash'

export const metadata = {
    "Puzzle Name": "Warehouse Wandering"
}

export default function solution (input) {
    const [map, instructions] = parse(input)
    let at = getPosition(map, '@')

    for (let [dx, dy] of instructions.map(nextDir)) {
        let [x, y] = at
        let nextToken = map[y + dy][x + dx]
        
        if (nextToken == '#') 
            continue
        
        if (nextToken == '.') {
            map[y + dy][x + dx] = '@'
            map[y][x] = '.'
            at = [x + dx, y + dy]
        }

        if (nextToken == 'O') {
            let objectsToMove = [[x, y]]
            let steps = 1

            while (nextToken == 'O') {
                objectsToMove.push([x + steps * dx, y + steps * dy])
                steps++
                nextToken = map[y + steps * dy][x + steps * dx]
            }

            if (nextToken == '.') {
                moveBy(map, objectsToMove, dx, dy)
                at = [x + dx, y + dy]
            }
        }
    }

    return getSumCoordinates(map)
}

function getSumCoordinates(map) {
    let sum = 0
    for (let [y, row] of map.entries()) {
        for (let [x, token] of row.entries()) {
            if (token == 'O') {
                sum += 100 * y + x
            }
        }
    }
    return sum
}

function moveBy(map, objects, dx, dy) {
    for (let [x, y] of objects.reverse()) {
        map[y + dy][x + dx] = map[y][x]
        map[y][x] = '.'
    }
}

function getPosition(map, token) {
    for (let [y, row] of map.entries()) {
        for (let [x, t] of row.entries()) {
            if (t == token) return [x, y]
        }
    }
    return null
}

const D = new Map([
    ['>'.toString(), [1, 0]],
    ['v'.toString(), [0, 1]],
    ['<'.toString(), [-1, 0]],
    ['^'.toString(), [0, -1]]
]);

const nextDir = char => D.get(char);

function parse(input) {
    const [instructionsData, mapData] = _.partition(input, l => [...D.keys()].includes(l[0]))

    let map = []
    for (let [y, line] of mapData.filter(Boolean).entries()) {
        if (line == '') break
        map[y] = []
        for (let [x, token] of [...line].entries()) {
            map[y][x] = token
        }
    }
    return [map, [...instructionsData.join('')]];
}