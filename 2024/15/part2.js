import _ from 'lodash'
import { ProxyMap } from '../../lib/map.js'

export const metadata = {
    "Puzzle Name": "Warehouse Wandering"
}

export default function solution (input) {
    let [map, boxes, robot, instructions] = parseInput(input)

    for (let [dx, dy] of instructions.map(nextDir)) {
        let [x, y] = robot
        let nextPosition = [x + dx, y + dy]

        if (isWall(nextPosition, map)) 
            continue
        
        let collidingBox = findCollidingBox(nextPosition, boxes);

        if (!collidingBox) {
            robot = nextPosition
            continue
        }

        if (dx !== 0 && tryMoveHorizontally([x, y], dx, dy, map, boxes)) {
            robot = nextPosition
        } 
        else if (
            !isWall([collidingBox.lhs[0] + dx, collidingBox.lhs[1] + dy], map) 
            && !isWall([collidingBox.rhs[0] + dx, collidingBox.rhs[1] + dy], map)
            && tryMoveVertically(collidingBox, dx, dy, map, boxes)
        ) {
            robot = nextPosition
        }
    }

    return getSumCoordinates(boxes)
}

function tryMoveHorizontally([x, y], dx, dy, map, boxes) {
    let steps = 1
    let collidingBox = findCollidingBox([x + dx, y + dy], boxes)
    
    let boxesToMove = []
    do  {
        boxesToMove.push(collidingBox)
        steps+=2
    } while (collidingBox = findCollidingBox([x + steps * dx, y + steps * dy], boxes))

    let finalPosition = [x + steps * dx, y + steps * dy]
    if (map.get(finalPosition) == '.') {
        moveBoxesBy(boxesToMove, dx, dy)
        return true;
    }

    return false;
}

function tryMoveVertically(box, dx, dy, map, boxes) {
    let boxesToMove = [box]
    let newBoxes = findNewCollidingBoxes([box.lhs, box.rhs], dx, dy, boxes);
    let topLevel = [box.lhs, box.rhs]
    let validMove = true

    while (newBoxes.length > 0) {
        if (newBoxes.some(({lhs, rhs}) => isWall([lhs[0] + dx, lhs[1] + dy], map) || isWall([rhs[0] + dx, rhs[1] + dy], map))) {
            validMove = false
            break
        }
        boxesToMove.push(...newBoxes)
        topLevel = newBoxes.map(({lhs, rhs}) => [lhs, rhs]).flat()
        newBoxes = findNewCollidingBoxes(topLevel, dx, dy, boxes);
    }

    if (validMove && topLevel.every(([x, y]) => map.get([x + dx, y + dy]) == '.')) {
        moveBoxesBy(boxesToMove, dx, dy)
        return true
    }

    return false
}

function findNewCollidingBoxes(positions, dx, dy, boxes) {
    return [...new Set(positions
        .map(([x, y]) => findCollidingBox([x + dx, y + dy], boxes))
        .filter(x => x))]
}

function findCollidingBox([x, y], boxes) {
    return boxes.find(({lhs, rhs}) => 
        lhs[0] == x && lhs[1] == y || rhs[0] == x && rhs[1] == y) || false
}

function isWall([x, y], map) {
    return map.get([x, y]) == '#'
} 

function getSumCoordinates(boxes) {
    return boxes.reduce((acc, { lhs }) => acc + 100 * lhs[1] + lhs[0], 0);
}

function moveBoxesBy(boxes, dx, dy) {
    for (let box of boxes) {
        box.lhs = [box.lhs[0] + dx, box.lhs[1] + dy]
        box.rhs = [box.rhs[0] + dx, box.rhs[1] + dy]
    }
}

const D = new Map([
    ['>'.toString(), [1, 0]],
    ['v'.toString(), [0, 1]],
    ['<'.toString(), [-1, 0]],
    ['^'.toString(), [0, -1]]
]);

const nextDir = char => D.get(char);

const isInstructionLine = line =>  [...D.keys()].includes(line[0]);

const setWalkable = (map, [x, y]) => {
    map.set([x, y], '.');
    map.set([x + 1, y], '.');
}

function parseInput(input) {
    const [instructionLines, mapLines] = _.partition(input, isInstructionLine)
    mapLines.pop() // remove empty line

    let map = new ProxyMap();
    let boxes = []
    let robotPosition = null

    for (let y = 0; y < mapLines.length; y++) {
        let line = mapLines[y]
        let rx = 0
        for (let x = 0; x < line.length; x++) {
            let token = line[x]
            if (token == '@') {
                robotPosition = [rx, y]
                setWalkable(map, [rx, y])
            }
            else if (token == 'O') {
                boxes.push({ lhs: [rx, y], rhs: [rx + 1, y] })
                setWalkable(map, [rx, y])
            }
            else {
                map.set([rx, y], token)
                map.set([rx + 1, y], token)
            }
            rx += 2
        }
    }

    return [map, boxes, robotPosition, [...instructionLines.join('')]];
}