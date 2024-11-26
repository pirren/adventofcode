export default function solveCaptcha(input, len) {
    return [...input].reduce((sum, char, i) => sum + (char == input.at(i-len) ? Number(char) : 0), 0)
}
