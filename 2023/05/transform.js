import _ from 'lodash'

export default function transform(input, { parseSeeds = null } = {}) {
    let inputSeeds = parseSeeds(input.at(0))
    let mappingRanges = parseRanges(input.slice(2))

    return Math.min(...mappingRanges.reduce((seeds, ranges) => {
        let inputSeeds = seeds
        let outputSeeds = []

        while (inputSeeds.length > 0) {
            let { sStart, sEnd } = inputSeeds.shift()
            let consumed = false

            for(let { rStart, rEnd, dest } of ranges) {
                const start = Math.max(sStart, rStart)
                const end = Math.min(sEnd, rEnd)

                if (start <= end) {
                    consumed = true
                    let newSeed = { sStart: start - rStart + dest, sEnd: start - rStart + dest + end - start }
                    outputSeeds.push(newSeed)

                    if (sStart < rStart) {
                        let startSeed = { sStart, sEnd: rStart - 1 }
                        inputSeeds.push(startSeed)
                    }

                    if (sEnd > rEnd) {
                        let endSeed = { sStart: rEnd + 1, sEnd }
                        inputSeeds.push(endSeed)
                    }
                }
            }
            if (!consumed) outputSeeds.push({ sStart, sEnd })
        }
    
        return outputSeeds
    }, inputSeeds).map(({ sStart }) => sStart))
}

function parseRanges(data) {
    let ranges = []
    let currentRanges = []

    for (const line of data) {
        if (line == '') {
            ranges.push(currentRanges)
            currentRanges = []
        }
        else if(/(\d+)/g.test(line)) {
            let [dest, start, length] = line.split(' ').filter(Boolean).map(Number)
            currentRanges.push({ rStart: start, rEnd: start + length - 1, dest: dest })
        } 
    }

    if (currentRanges.length) ranges.push(currentRanges);
    return ranges;
}
