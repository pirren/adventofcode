
export function createMap(input, parse = (x) => x) {
    let map = new ProxyMap();
    for (const [y, row] of input.entries()) {
        for (const [x, token] of row.split('').entries()) {
            map.set([x, y], parse(token));
        }
    }
    return map;
};

export const neighbors = ([x, y]) => [[x, y - 1], [x + 1, y], [x, y + 1], [x - 1, y]];

// Handles map.get([x, y]) and map.set([x, y], value) because javascript tuples are arrays and treated as reference types
export class ProxyMap extends Map {
    constructor(entries) {
        super(entries);
        return new Proxy(this, {
            get: (target, prop) => {
                if (prop === 'get') {
                    return (key) => target.get(Array.isArray(key) ? `${key[0]},${key[1]}` : key);
                }
                if (prop === 'set') {
                    return (key, value) => target.set(Array.isArray(key) ? `${key[0]},${key[1]}` : key, value);
                }
                return target[prop];
            }
        });
    }
};