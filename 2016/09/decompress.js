export default function decompress (sequence, recurse) {
    let decompressedLength = 0
    while (sequence.length > 0) {
        if (sequence[0] === '(') {
            let [_, length, multiplier, subSequence] = /^\((\d+)x(\d+)\)(.*)$/.exec(sequence);

            let subSequenceLength = recurse(subSequence.substr(0, +length), recurse)
            decompressedLength += subSequenceLength * (+multiplier)

            sequence = subSequence.substr(+length)
        }
        else {
            decompressedLength += 1
            sequence = sequence.substr(1)
        }
    }

    return decompressedLength
}
