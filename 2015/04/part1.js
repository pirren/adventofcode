import _ from 'lodash'
import encrypt from './encrypt.js'

export default async function solution(input) {
    return encrypt(input, '00000', './2015/04/cache1.json')
}