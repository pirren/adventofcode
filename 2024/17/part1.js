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

    const registers = {
        'A' : _registers[0],
        'B' : _registers[1],
        'C' : _registers[2]
    };

    let program = ints(input.at(-1))
    
    // opcodes: 0-7 (8 total)
    // The adv instruction (opcode 0) performs division. The numerator is the value in the A register. 
    // The denominator is found by raising 2 to the power of the instruction's combo operand. 
    // (So, an operand of 2 would divide A by 4 (2^2); an operand of 5 would divide A by 2^B.) 
    // The result of the division operation is truncated to an integer and then written to the A register.

    //So, the program [0,1,2,3] would run the instruction whose opcode is 0 and pass it the operand 1, 
    // then run the instruction having opcode 2 and pass it the operand 3, then halt.
    let i = 0; 
    let jumped = false;
    let output = []
    const invoke = {
        0: (operand, registers) => adv(operand, registers),
        1: (operand, registers) => bxl(operand, registers),
        2: (operand, registers) => bst(operand, registers),
        3: (operand, registers) => { 
            jumped = jnz(operand, registers)
            if(jumped) 
                i = operand
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

        let [opcode, operand] = program.slice(i, i + 2)
        invoke[opcode](operand, registers)
    }

    return output.join()
}

function combo(operand, registers) {
    if (operand <= 3) return operand
    if (operand == 4) return registers['A']
    if (operand == 5) return registers['B']
    if (operand == 6) return registers['C']
    // if (operand == 7n) return registers['A'] + registers['B']
}

function adv(operand, registers) {
    registers['A'] = Math.floor(registers['A'] / Math.pow(2, combo(operand, registers)))
}

function bxl(operand, registers) {
    registers['B'] = registers['B'] ^ operand
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
    registers['B'] = registers['B'] ^ registers['C']
}

function out(operand, registers) {
    let value = combo(operand, registers) % 8
    return value
}

function bdv(operand, registers) {
    registers['B'] = Math.floor(registers['A'] / Math.pow(2, combo(operand, registers)))
}

function cdv(operand, registers) {
    registers['C'] = Math.floor(registers['A'] / Math.pow(2, combo(operand, registers)))
}
