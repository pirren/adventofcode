import _ from 'lodash'
import { getDisk, calculateChecksum } from './disk.js'

export const metadata = {
    "Puzzle Name": "Disk Fragmenter"
}

export default function solution (input) {
    let [files, freeSpace] = getDisk(input);

    fragment(files, freeSpace);

    return calculateChecksum(files);
}

function fragment(files, freeSpace) {
    while (freeSpace.length) {
        let {spacePos: currentPos, space: remainingSpace} = freeSpace.shift()
        while (remainingSpace > 0) {
            if (currentPos > files.at(-1).filePos) 
                break;

            const lastFile = files.at(-1);
            const chunkToMove = Math.min(lastFile.size, remainingSpace);

            lastFile.size -= chunkToMove;
            if (lastFile.size === 0) 
                files.pop()

            const newFile = {id: lastFile.id, size: chunkToMove, filePos: currentPos}
            const nextFile = files.find(f => f.filePos > currentPos)
            files.splice(files.indexOf(nextFile), 0, newFile) // Insert new file in the right position

            remainingSpace -= chunkToMove;
            currentPos += chunkToMove;
        }
    }
}
