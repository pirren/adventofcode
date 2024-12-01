export default function parseGame(line) {
    const id = line.match(/Game (\d+)/).at(1);
    return line.split(': ')
        .at(-1)
        .replace(new RegExp(/\; /, 'g'), ', ')
        .split(', ')
        .reduce(
            (acc, round) => {
                let [value, key] = round.split(' ');
                acc['id'] ??= +id;
                acc[key] = Math.max(acc[key] || 0, parseInt(value));
                return acc;
            }, 
            {}
        );
}
