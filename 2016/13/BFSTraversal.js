export class BFSTraversal {
    constructor(seed) {
        this.seed = Number(seed)
        this.start = []
        this.target = []
        this.maxSteps = Infinity
    }

    #roomType = (x, y) => {
        let room = (x * x + 3 * x + 2 * x * y + y + y * y + this.seed >>> 0).toString(2)
        return (room.match(/1/g) || [] ).length % 2 == 0 ? '.' : '#'
    } 
    
    #isOpenSpace = (x, y) => {
        if (x < 0 || y < 0) return false
        return this.#roomType(x, y) === '.'
    };
    
    #neighbors = (vertex) => {
        const [x, y] = vertex
        return [
            [x + 1, y],
            [x - 1, y],
            [x, y + 1],
            [x, y - 1]
        ].filter(([nx, ny]) => this.#isOpenSpace(nx, ny))
    }
    
    #countSteps = (target, parentMap) => {
        let steps = 0
        let current = target
        while (current) {
            steps++
            current = parentMap.get(current.toString())
        }
        return steps - 1
    }

    traverse(start, target = [], maxSteps = Infinity) {
        let queue = [[start, 0]]
        let visited = new Set([start.toString()])
        let parentMap = new Map([[start.toString(), null]])
        
        while (queue.length) {
            let [current, steps] = queue.shift()
            
            if (steps === maxSteps) continue
    
            if (target.length && current[0] === target[0] && current[1] === target[1]) {
                return this.#countSteps(current, parentMap)
            }
    
            for(const neighbor of this.#neighbors(current))
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
}