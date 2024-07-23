export const allowedIPs = (input, onlyFirst) => {
    let intervals = input.map((line) => {
        return line.split('-').map((num) => parseInt(num))
    }).sort((a, b) => a[0] - b[0])

    let merged = [intervals[0]]
    for (let i = 1; i < intervals.length; i++) {
        let current = intervals[i]
        let last = merged[merged.length - 1]
        if (current[0] <= last[1] + 1) {
            last[1] = Math.max(last[1], current[1])
        } else {
            merged.push(current)
        }
    }

    return onlyFirst 
        ? merged[0][1] + 1
        : merged.slice(1).reduce((acc, range, i) => acc + range[0] - merged[i][1] - 1, 0)
}