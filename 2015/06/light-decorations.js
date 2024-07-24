export default function deploy (input, on, off, toggle) {
    let grid = getGrid()
    input.map(parse).forEach(([ins, x1, y1, x2, y2]) => {
        for (let y = y1; y <= y2; y++) {
            for (let x = x1; x <= x2; x++) {
                if (ins === 'turn on') {
                    grid[y][x] = on(grid[y][x])
                }
                else if(ins === 'turn off') {
                    grid[y][x] = off(grid[y][x])
                }
                else if(ins === 'toggle') {
                    grid[y][x] = toggle(grid[y][x])
                }
            }
        }
    })
    return grid.flat().reduce((acc, light) => acc + light, 0)
}

const getGrid = (x = 1000, y = 1000) => Array.from({ length: y }, () => Array.from({ length: x }, () => 0))

const parse = (line) => {
    const matches = line.match(/(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/)
        .slice(1)
    return [
        matches[0],
        ...matches.slice(1).map(Number)
    ]
} 