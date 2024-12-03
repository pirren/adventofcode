export default function sorted(arr, ordered) {
    const tooSteep = (arr, i) => Math.abs(arr.at(i) - arr.at(i + 1)) > 3
    for (let i = 0; i < arr.length - 1; i++) {
        if (!ordered(arr, i) || tooSteep(arr, i)) {
            return false;
        }
    }
    return true;
}
