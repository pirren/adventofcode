import _ from 'lodash'
import md5 from 'md5'
import fs from 'fs'

export default function solution (input) {
    let cache = fs.existsSync('./2016/05/cache.json') ? JSON.parse(fs.readFileSync('./2016/05/cache.json')) : [];
    let password = ''
    let found = 0
    let index = 0
    let cachedIndexes = _.clone(cache)

    while (found < 8) {
        let hash = md5(`${input}${index}`)
        if (_.startsWith(hash, '00000')) {
            password += hash[5]
            found++
            
            if (!_.includes(cache, index)) {
                cache.push(index)
                fs.writeFileSync('./2016/05/cache.json', JSON.stringify(cache))
            }
        }
        index = cachedIndexes.length ? cachedIndexes.shift() : index + 1
    }
    
    return password
} 
