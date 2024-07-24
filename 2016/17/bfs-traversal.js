import md5 from 'md5'

export class BFSTraversal {
    constructor(salt) {
        this.salt = salt
        this.start = []
        this.target = []
    }

    #withinBounds = (x, y) => x >= 0 && y >= 0 && x < 4 && y < 4
    
    #neighbors = (vertex, doors) => {	
        const [x, y] = vertex
        return  [
            [x, y - 1], // Up
            [x, y + 1], // Down
            [x - 1, y], // Left
            [x + 1, y]  // Right
        ]
        .filter(([nx, ny], idx) => doors[idx] && this.#withinBounds(nx, ny))
    }

    #getDirection = (current, neighbor) => {
        if (neighbor[1] === current[1] + 1) return 'D'
        if (neighbor[1] === current[1] - 1) return 'U'
        if (neighbor[0] === current[0] + 1) return 'R'
        if (neighbor[0] === current[0] - 1) return 'L'
    }

    traverse(start, target, keepLooking = false) {
        let queue = [[start, '']]
        let visited = new Set([start.toString()])
        let longestPathLength = 0
        
        while (queue.length) {
            let [current, path] = queue.shift()
    
            if (current[0] === target[0] && current[1] === target[1]) {
                if (!keepLooking) return path
                longestPathLength = Math.max(path.length, longestPathLength)
                continue
            }

            let hash = md5(this.salt + path).slice(0, 4)
            let doors = hash.split('').map(char => char >= 'b')
            
            let neighbors = this.#neighbors(current, doors)
            for(const neighbor of neighbors)
            {
                visited.add(neighbor.toString())
                queue.push([neighbor, path + this.#getDirection(current, neighbor)])
            }
        }
        return longestPathLength
    }
}