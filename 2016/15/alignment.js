import _ from 'lodash'

export default function alignsAt(input, extraDisc = null) {
    let discs = input.map(parseDisc)
    if (extraDisc) discs.push({ number: discs.length + 1, positions: extraDisc.positions, start: extraDisc.start })
    
    let startTime = 0;
    while (!alignsAtTime(_.clone(discs), startTime++));
    return startTime - 1;
}

const parseDisc = (line) => {
    let [_, number, positions, start] = line.match(/Disc #(\d+) has (\d+) positions; at time=0, it is at position (\d+)./).map(Number)
    return { number, positions, start }
}

const alignsAtTime = (discs, time) => discs.every(disc => (disc.start + time + disc.number) % disc.positions === 0)