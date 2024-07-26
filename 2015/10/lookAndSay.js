export default function lookAndSay(sequence, iterations) {
    for (let i = 0; i < iterations; i++) {
        sequence = sequence.replace(/(.)\1*/g, (say) => say.length.toString() + say[0])
    }
    return sequence.length
}