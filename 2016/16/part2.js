import { randomizeData, calculateChecksum } from './randomizer.js'

export const metadata = {
    "Puzzle Name": "Dragon Checksum"
}

export default function solution (input) {
    let diskSize = 35651584
    let dataBuffer = randomizeData(input, diskSize)
    return calculateChecksum(dataBuffer)
}
