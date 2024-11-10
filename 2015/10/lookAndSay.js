export default function lookAndSay(sequence, n) {
    for (let i = 0; i < n; i++) {
        sequence = sequence.replace(/(.)\1*/g, say => say.length.toString() + say[0])
    }
    return sequence.length
}