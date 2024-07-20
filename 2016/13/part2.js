let seed

const room = (x, y, seed) => {
    let room = (x * x + 3 * x + 2 * x * y + y + y * y + seed >>> 0).toString(2)
    return (room.match(/1/g) || [] ).length % 2 == 0 ? '.' : '#'
} 

const isOpenSpace = (x, y) => {
    if (x < 0 || y < 0) return false
    return room(x, y, seed) === '.'
};

const neighbors = (vertex) => {
    const [x, y] = vertex;
    return [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1]
    ].filter(([nx, ny]) => isOpenSpace(nx, ny));
}

export default function solution (input) {
    let start = [1,1]
    let maxSteps = 50
    seed = Number(input)
    
    let queue = [[start, 0]]
    let visited = new Set([start.toString()])
    let parentMap = new Map([[start.toString(), null]])
    
    while (queue.length) {
        let [current, steps] = queue.shift()
        
        if (steps === maxSteps) continue
        // if (current[0] === target[0] && current[1] === target[1]) {
        //     return countSteps(current, parentMap)
        // }

        for(const neighbor of neighbors(current))
        {
            if (!visited.has(neighbor.toString())) {
                visited.add(neighbor.toString())
                queue.push([neighbor, steps + 1])
                parentMap.set(neighbor.toString(), current)
            }
        }
        
    }

    return parentMap.size
}