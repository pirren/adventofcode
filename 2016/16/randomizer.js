export const randomizeData = (input, diskSize) => {
    let buffer = Buffer.alloc(diskSize, 0)
    for (let i = 0; i < input.length; i++) {
        buffer[i] = input[i]
    }

    let i = 0
    let len = input.length
    while (i < diskSize) {
        for (let j = len + 1; j < len * 2 + 1; j++) {
            buffer[j] = buffer[j - (j - len) * 2] ^ 1
        }
        
        len = len * 2 + 1
        i = len
    }
    return buffer 
}

export const calculateChecksum = (buffer) => {
    let len = buffer.length
    while (len % 2 === 0) {
        for (let i = 0; i < len - 1; i += 2) {
            buffer[i / 2] = buffer[i] === buffer[i + 1] ? 1 : 0
        }
        len /= 2
    }
    return buffer.slice(0, len).join('')
}