import _ from 'lodash'
import md5 from 'md5'
import fs from 'fs'

export default function encrypt(salt, cacheFilePath, iterations) {
    let found = 0
    let hash
    let tempCache = {} // Used for re-usability of hashed indexes

    // Use a persistent cache of notable indexes to speed up running and testing
    // Part2 run time without persistent cache: 01:28:17900
    let persistentCache = fs.existsSync(cacheFilePath) ? JSON.parse(fs.readFileSync(cacheFilePath)) : []
    let cachedIndexes = _.clone(persistentCache)
    let [index, jc] = cachedIndexes.length ? cachedIndexes.shift() : [0, undefined]

    while (found < 64) {
        hash = tempCache[index] || getHash(salt, index, iterations)
        tempCache[index] = hash
        let triplet = findTriplet(hash)
        if (triplet) {
            for (let j = jc || (index + 1); j <= index + 1000; j++) {
                let nextHash = tempCache[j] || getHash(salt, j, iterations)
                tempCache[j] = nextHash
                if (findQuintuplet(triplet, nextHash)) {
                    found++
                    if (!contains(persistentCache, [index, j])) {
                        persistentCache.push([index, j])
                        fs.writeFileSync(cacheFilePath, JSON.stringify(persistentCache))
                    }
                    break
                }
            }
        }
        [index, jc] = cachedIndexes.length ? cachedIndexes.shift() : [index + 1, undefined]
    }
    return index - 1
}

const contains = (arr, [i, j]) => arr.some(([x, y]) => x === i && y === j)

const findTriplet = hash =>  {
    let match = hash.match(/([a-zA-Z0-9])\1\1/g)
    return match ? match[0][0] : undefined
}

const findQuintuplet = (triplet, hash) =>  {
    const regex = new RegExp(`${triplet}{5}`)
    return regex.test(hash)
}

const getHash = (salt, index, iterations) => {
    let hash = `${salt}${index}`
    for (let i = 0; i < iterations; i++) 
    {
        hash = md5(hash)
    }
    return hash
}