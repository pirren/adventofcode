import _ from 'lodash'
import { ints } from '../../lib/parsing.js'

export const metadata = {
    "Puzzle Name": "Chronospatial Computer"
}

const isRegister = line => line.startsWith('R')

export default function solution (input) {
    let _registers = input.map(line => {
        let match = line.match(/(A|B|C): (\d+)$/)
        return match ? parseInt(match[2]) : null
    })//.filter(reg => reg != null);

    let clonedRegisters = _registers.slice()

    const registers = {
        'A' : clonedRegisters[0],
        'B' : clonedRegisters[1],
        'C' : clonedRegisters[2]
    };

    const arraysMatch = (a, b) =>
        a.length === b.length && a.every((val, i) => val === b[i]);

    const program = ints(input.at(-1))
    const programLen = program.join().replaceAll(',', '').length
    const programReverse = program.slice().reverse()

    let nextProgram = null

    // let a = 510200000

    // 2 ^ 3×6
    
    let lastPos = 2 ** (3 * (programLen - 1))

    let a = 0
    let it = 0
    let ii = programLen - 1
    for (;;) {
        registers['A'] = a
        registers['B'] = _registers[1]
        registers['C'] = _registers[2]

        nextProgram = run(program, registers)

        // console.log('A:', a, 'Current program:', nextProgram.join(''))

        if (arraysMatch(nextProgram, program)) 
            break;

        if (program[ii] === nextProgram[ii]) {
            ii--
        }
        // if (it == 84) {
        //     debugger;
        // }
        a += 2 ** (3 * ii)

        if (ii == -1) break;
        // console.log('finished iteration:', it)
        it++
    }

    return 12345//a
}

function firstWrongIndex(arr, target) {
    return arr.findIndex((el, i) => el !== target[i])
}

function run(program, registers) {
    let i = 0; 
    let jumped = false;
    let output = []
    const invoke = {
        0: (operand, registers) => adv(operand, registers),
        1: (operand, registers) => bxl(operand, registers),
        2: (operand, registers) => bst(operand, registers),
        3: (operand, registers) => { 
            jumped = jnz(operand, registers)
            if(jumped) i = operand
        },
        4: (_, registers) => bxc(registers),
        5: (operand, registers) => {
            output.push(out(operand, registers))
        },
        6: (operand, registers) => bdv(operand, registers),
        7: (operand, registers) => cdv(operand, registers),
    };
    for (;i < program.length; i+=2) {

        if (jumped) {
            jumped = false
            i -= 2;
        }

        // console.log('A:', registers['A'], 'B:', registers['B'], 'C:', registers['C'])

        let [opcode, operand] = program.slice(i, i + 2)
        invoke[opcode](operand, registers)
    }

    return output
}

function combo(operand, registers) {
    if (operand <= 3) return operand
    if (operand == 4) return registers['A']
    if (operand == 5) return registers['B']
    if (operand == 6) return registers['C']
}

function adv(operand, registers) {
    registers['A'] = Math.trunc(registers['A'] / Math.pow(2, combo(operand, registers)))
}

function bxl(operand, registers) {
    registers['B'] = (registers['B'] ^ operand) >>> 0
}

function bst(operand, registers) {
    registers['B'] = combo(operand, registers) % 8
}

function jnz(operand, registers) {
    if (registers['A'] == 0) return false;
        
    registers['C'] = combo(operand, registers)
    return true
}

function bxc(registers) {
    registers['B'] = (registers['B'] ^ registers['C']) >>> 0
}

function out(operand, registers) {
    let value = combo(operand, registers) % 8
    return value
}

function bdv(operand, registers) {
    registers['B'] = Math.trunc(registers['A'] / Math.pow(2, combo(operand, registers)))
}

function cdv(operand, registers) {
    registers['C'] = Math.trunc(registers['A'] / Math.pow(2, combo(operand, registers)))
}
