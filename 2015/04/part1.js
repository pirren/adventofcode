import encrypt from './encrypt.js'

export const metadata = {
    "Puzzle Name": "The Ideal Stocking Stuffer"
}

export default async function solution(input) {
    return encrypt(input, { startsWith: '00000', cacheFilePath: './2015/04/cache1.json' })
}