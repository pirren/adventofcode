import { randomizeData, calculateChecksum } from './randomizer.js'

export default function solution (input) {
    let diskSize = 35651584
    let dataBuffer = randomizeData(input, diskSize)
    return calculateChecksum(dataBuffer)
}
