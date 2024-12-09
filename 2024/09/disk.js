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