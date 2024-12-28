import { pipe, range, sum } from "../../lib/utils.js";

export const metadata = {
    "Puzzle Name": "Disk Fragmenter"
};

const fragment = ([files, freeSpace]) => 
    freeSpace.reduce((updatedFiles, {spacePos: currentPos, space: remainingSpace}) => {
        while (remainingSpace > 0) {
            if (currentPos > updatedFiles.at(-1).filePos) 
                break;

            const lastFile = files.at(-1);
            const chunkToMove = Math.min(lastFile.size, remainingSpace);

            lastFile.size -= chunkToMove;
            if (lastFile.size === 0) 
                files.pop();

            const newFile = {id: lastFile.id, size: chunkToMove, filePos: currentPos};
            const nextFile = files.find(f => f.filePos > currentPos);
            files.splice(files.indexOf(nextFile), 0, newFile);

            remainingSpace -= chunkToMove;
            currentPos += chunkToMove;
        }

        return updatedFiles;
    }, files);

export const parseDisk = input =>  
    [...input]
        .map(Number)
        .reduce(
            ([files, freeSpace, pos, id], sizeOrSpace, index, arr) => {
                if (index % 2 === 0) {
                    // Handle file
                    files.push({ id, size: sizeOrSpace, filePos: pos });
                    pos += sizeOrSpace;
                } else {
                    // Handle free space
                    if (sizeOrSpace > 0) freeSpace.push({ spacePos: pos, space: sizeOrSpace });
                    pos += sizeOrSpace;
                    id++;
                }
                return [files, freeSpace, pos, id];
            },
            [[], [], 0, 0] // accumulator: files, freeSpace, position and id
        )
        .slice(0, 2); // Return only files and freeSpace

export const checksum = (files) => 
    sum(
        files
            .flatMap(({id, size, filePos}) => 
                range(filePos, filePos + size).map(i => i * id)
        )
    );

export default pipe(
    parseDisk,
    fragment,
    checksum
);
