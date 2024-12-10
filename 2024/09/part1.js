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

export function getDisk(input) {
    let queue = [...input].map(Number)
    let files = []
    let freeSpace = []
    
    let pos = 0, id = 0
    while (queue.length) {
        const size = queue.shift() || 0, space = queue.shift() || 0
        
        files.push({id, size, filePos: pos})
        pos += size;

        if (space > 0) 
            freeSpace.push({spacePos: pos, space})
        
        pos += space;
        id++;
    }
    return [files, freeSpace];
}

export function calculateChecksum(files) {
    return files.reduce((acc, {id, size, filePos}) => {
        for (let i = filePos; i < filePos + size; i++) {
            acc += i * id;
        }
        return acc;
    }, 0);
}
