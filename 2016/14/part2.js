import _ from 'lodash'
import encrypt from './otp.js'

export default function solution (input) {
    let cacheFilePath = './2016/14/cache2.json'
    return encrypt(input, cacheFilePath, 2017)
}