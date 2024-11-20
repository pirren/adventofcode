export function parseNumbers(line, i) {
    let matches = [...line.matchAll(/(\d+)/g)]
    return matches.map(match => {
        return {
            n: Number(match.at(0)),
            x: match.index,
            y: i,
            len: match.at(0).length
        }
    })
}

export function parseGearSymbols(line, i) {
    let matches = [...line.matchAll(/(\*)/g)]
    return matches.map(match => {
        return {
            x: match.index,
            y: i
        }
    })
}