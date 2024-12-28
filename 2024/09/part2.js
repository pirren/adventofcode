import { parseDisk, checksum } from './part1.js'
import { pipe } from "../../lib/utils.js";

export const metadata = {
    "Puzzle Name": "Disk Fragmenter"
};

function defragment([files, freeSpace]) {
    while(freeSpace.length) {
        let { spacePos, space } = freeSpace.shift();
        
        for (let i = 0; i < files.length; i++) {
            let file = files[i];

            if (file.filePos < spacePos || file.size > space) continue;

            file.filePos = spacePos;
            if (space > file.size) 
                freeSpace.unshift({ spacePos: spacePos + file.size, space: space - file.size })

            break;
        }
    }

    return files;
};

export default pipe(
    parseDisk,
    ([files, freeSpace]) => 
        [files.sort((a, b) => b.id - a.id), freeSpace],
    defragment,
    checksum
);
