import _ from 'lodash'
import defaultDict from '../../lib/defaultdict.js'
import { Bot } from './bot.js'

export default function solution (input) {
    let bots = defaultDict(x => new Bot(x))

    for (let line of input) {
        let match = /^value ([0-9]+) goes to bot ([0-9]+)$/.exec(line)
        if (match) {
            let [_, value, bot] = match
            bots[bot].putChip(Number(value))
        }

        match = /^bot ([0-9]+) gives low to (bot|output) ([0-9]+) and high to (bot|output) ([0-9]+)$/.exec(line)
        if (match) {
            let [_, bot, ltype, low, htype, high] = match
            bots[bot].ltype = ltype
            bots[bot].htype = htype
            bots[bot].low = Number(low)
            bots[bot].high = Number(high)
        }
    }

    let queue = Object.values(bots).filter(bot => bot.readyToPass()).map(bot => bot.id)
    let bins = ['-', '-', '-']
    while (queue.length > 0) {
        let bot = bots[queue.shift()]
        if (!bot.readyToPass()) {
            continue
        }
        if (bot.ltype === 'bot')
        {
            bots[bot.low].putChip(bot.chips[0])
            if (!queue.includes(bot.low)) queue.push(bot.low)
        }
        else if (bot.low < 3)
        {
            bins[bot.low] = bot.chips[0]
        }
        if (bot.htype === 'bot')
        {
            bots[bot.high].putChip(bot.chips[1])
            if (!queue.includes(bot.high)) queue.push(bot.high)
        }
        else if(bot.high < 3)
        {
            bins[bot.high] = bot.chips[1]
        }
        if (bins.every(bin => bin !== '-')) {
            return bins.reduce((sum, value) => sum * value, 1)
        }
    }
}