import encrypt from './otp.js'

export const metadata = {
    "Puzzle Name": "One-Time Pad"
}

export default function solution (input) {
    let cacheFilePath = './2016/14/cache1.json'
    return encrypt(input, cacheFilePath, 1)
}