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
    files = files.sort((a, b) => b.id - a.id)

    while(freeSpace.length) {
        let { spacePos, space } = freeSpace.shift()
        
        for (let i = 0; i < files.length; i++) {
            let file = files[i]

            if (file.filePos < spacePos || file.size > space) 
                continue;

            file.filePos = spacePos;
            if (space > file.size) 
                freeSpace.unshift({ spacePos: spacePos + file.size, space: space - file.size })

            break;
        }
    }
}