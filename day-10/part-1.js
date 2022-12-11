// 2 hours
class CPU {
    constructor() {
        this.longestInstruction = 1
        this.registerX = 1
        this.cycle = 0
        this.cyclesBusy = null
        this.instructions = []
        this.signalStrengths = 0
    }
    
    addInstruction(instruction,value) {
        this.instructions.push({
            instruction: instruction,
            value: value
        })
    }

    #setBusyCycles() {
        if (this.instructions.length == 0) this.cyclesBusy = null
        else {
            switch(this.instructions[0].instruction) {
                case 'noop':
                    this.cyclesBusy = 1
                    break
                case 'addx':
                    this.cyclesBusy = 2
                    break
            }
        }
    }

    executeCycle() {
        //console.log(this.cycle,this.registerX)
        this.cycle++
        if(this.cycle == 20 || this.cycle == 60 || this.cycle == 100 || this.cycle == 140 || this.cycle == 180 || this.cycle == 220) {
            console.log(this.registerX * this.cycle)
            this.signalStrengths += this.registerX * this.cycle
        }

        let instruction = null
        // this only occurs on the first cycle
        if (this.cyclesBusy == null) {
            this.#setBusyCycles()
        }
        if (this.cyclesBusy != 0) {
            this.cyclesBusy--
        }
        if (this.cyclesBusy == 0) {
            instruction = this.instructions.shift()
            switch(instruction['instruction']) {
                case 'noop':
                    // do nothing
                    break
                case 'addx':
                    // add value to register X
                    this.registerX += instruction['value']
                    break
                default:
                    // code block
            }
            this.#setBusyCycles()
        }
    }

    hasInstructions() {
        return this.instructions.length > 0
    }
}

const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-10/input'),
})

let cpu = new CPU()
readInterface.on('line', function(line) {
    cpu.addInstruction(line.split(' ')[0],line.split(' ')[1] == undefined ? null : parseInt(line.split(' ')[1]))
}).on('close', function() {
    while(cpu.hasInstructions()) {
        cpu.executeCycle()
    }
    console.log(cpu.registerX,cpu.cycle,cpu.signalStrengths)
})