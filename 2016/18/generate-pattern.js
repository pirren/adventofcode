export const generatePattern = (input, iterations) => {
    input = input.replace(/\./g, 0).replace(/\^/g, 1)

    let prev = input.split('').map(Number)
    let sum = sumSafeTiles(prev)
    let rowLength = input.length
    let rowCount = 1

    while(rowCount < iterations) {
        const newRow = []
        for(let i = 0; i < rowLength; i++) {
            const left = i === 0 ? '.' : prev[i - 1]
            const right = i === rowLength - 1 ? '.' : prev[i + 1]
            
            newRow.push(left ^ right)
        }
        sum += sumSafeTiles(newRow)
        prev = newRow
        rowCount++
    }

    return sum
}

const sumSafeTiles = (row) => row.filter(x => x === 0).length