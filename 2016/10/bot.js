export class Bot {
    constructor(id) {
        this.id = id
        this.high = null
        this.low = null
        this.htype = ''
        this.ltype = ''
        this.chips = []
    }

    putChip(c) {
        if (!this.chips.includes(c)) {
            this.chips.push(c)
            this.chips.sort((a, b) => a - b)
        }
    }

    readyToPass() {
        return this.chips.length > 1
    } 
}