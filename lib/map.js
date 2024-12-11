
export function createMap(input, parse = (x) => x) {
    let map = mapProxy(new Map());
    for (const [y, row] of input.entries()) {
        for (const [x, token] of row.split('').entries()) {
            map.set([x, y], parse(token));
        }
    }
    return [map, input[0].length, input.length];
};

// Proxy to handle map.get([x, y]) and map.set([x, y], value) because javascript tuples are arrays and treated as reference types
function mapProxy (map) { 
    return new Proxy(map, {
        get: (target, prop) => {
            if (prop === 'get') 
                return (key) => target.get(Array.isArray(key) ? `${key[0]},${key[1]}` : key);
            if (prop === 'set') 
                return (key, value) => target.set(Array.isArray(key) ? `${key[0]},${key[1]}` : key, value);
            return target[prop];
        }
    });
};