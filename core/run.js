/**
 * run.js
 *
 * Description: Run the solution for a given year, day, and part.
 */

import _ from 'lodash'
import moment from 'moment'
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from "url";

export default async function runAsync({year = 2015, day = 1, part = 1, output = true } = {}) {
    const formatLog = (label, value, width = 30) => `${year}.${day}.${part} ${label}:`.padEnd(width) + value;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const solutionFile = `part${part}.js`
    const inputFile = 'input.txt'

    const startTime = moment();

    const filePath = path.resolve(__dirname, `../${year}/`, `${String(day).padStart(2, '0')}`);

    let input = fs.readFileSync(path.resolve(filePath, inputFile), 'utf-8').trimEnd().split('\r\n')

    if (output) {
        console.log(`Running ${year}.${day}.${part}`)
    } 
    let module = await import(pathToFileURL(path.resolve(filePath, solutionFile)))
    let answer = await module.default(input.length === 1 ? input[0] : input)

    if (output) {
        if (module.metadata && module.metadata['Puzzle Name']) {
            console.log(chalk.bgGreen.black('Puzzle: ', module.metadata['Puzzle Name']))
        }

        if (_.isObject(answer) || _.isArray(answer)) {
            console.log(`${year}.${day}.${part} answer:`)
            console.log(JSON.stringify(answer))
        } else {
            console.log(formatLog('answer', answer))
        }
    }
    let endTime = moment()

    if (output) {
        console.log(formatLog('time', moment(endTime.diff(startTime)).format('mm:ss:SSSSS')))
    }
    return answer
}