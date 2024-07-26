/**
 * Creates a proxy that mimics the behavior of Python's defaultdict.
 * If a key does not exist in the target object, it initializes the key
 * with a new value created by the provided constructor function.
 *
 * @param {Function} constructor - A function that takes a key as an argument and returns a new value.
 * @returns {Proxy} A proxy object that automatically initializes missing keys using the constructor function.
 *
 * @example
 * class Bot {
 *     constructor(id) {
 *         this.id = id;
 *         this.chips = [];
 *     }
 * }
 * 
 * const bots = defaultDict(id => new Bot(id));
 * 
 * // Accessing a non-existent key initializes it with a new Bot instance
 * bots['bot1'].chips.push(5);
 * console.log(bots['bot1']); // Bot { id: 'bot1', chips: [5] }
 * 
 * // The same key can be accessed again and will refer to the same instance
 * bots['bot1'].chips.push(10);
 * console.log(bots['bot1']); // Bot { id: 'bot1', chips: [5, 10] }
 */
export function defaultDict(constructor) {
    return new Proxy({}, {
        get: function(target, id) {
            return (target[id] ??= constructor(id));
        }
    });
}