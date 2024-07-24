import _ from 'lodash'
import md5 from 'md5'
import fs from 'fs'

export default function encrypt(salt, startsWith, cacheFilePath) {
    let cache = fs.existsSync(cacheFilePath) ? JSON.parse(fs.readFileSync(cacheFilePath)) : []
    let index = cache.shift() || 1
    let hash = ''
    
    while (!_.startsWith(hash, startsWith)) {
        hash = md5(`${salt}${index}`)
        index++
    }

    let found = index - 1

    if (!cache.includes(found))
    {
        cache.push(found)
        fs.writeFileSync(cacheFilePath, JSON.stringify(cache))
    }

    return found
}
