export class Interpreter {
    constructor() {
        this.acc = {}
        this.pointer = 0
    }
    
    handleCopy(value, destination) {
        if (isNaN(value)) {
            value = this.acc[value] ?? 0
        }
        this.acc[destination] = Number(value)
    }

    handleJump (check, length) {
        if (isNaN(check)) {
            check = Number(this.acc[check] ?? 0);
        }
        if (check !== 0) {
            this.pointer += Number(length);
            return true;
        }
        return false;
    }

    handleIncrement(target) {
        this.acc[target] = (this.acc[target] || 0) + 1
    }

    handleDecrement(target) {
        this.acc[target] = (this.acc[target] || 0) - 1
    }

    executeInstructions (input, initialAcc = {}) {
        this.acc = {...initialAcc}
        const instructions = input.map(line => {
            const [_, cmd, arg1, arg2] = line.match(/(\w+) (\S+)(?: (\S+))?/)
            return { cmd, arg1, arg2 }
        })

        const cmds = {
            'cpy' : this.handleCopy.bind(this),
            'inc' : this.handleIncrement.bind(this),
            'dec' : this.handleDecrement.bind(this),
        }

        while (this.pointer < instructions.length) {
            let { cmd, arg1, arg2 } = instructions[this.pointer]
            if (cmds[cmd]) cmds[cmd](arg1, arg2)
            if (cmd.includes('jnz') && this.handleJump(arg1, arg2)) continue
            this.pointer++
        }
        return this.acc['a']
    }
}