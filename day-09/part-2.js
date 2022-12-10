// 3 hours

const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-09/input'),
})

let positions9 = { '0,0': true }
let rope = [
    [0,0], // head
    [0,0], // 1
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0]  // 9
]

let direction, steps
let i = 0
readInterface.on('line', function(line) {
    direction = line.split(' ')[0]
    steps = line.split(' ')[1]
    while(steps > 0) {
        // move the head
        if (direction == 'R') rope[0][0]++
        if (direction == 'L') rope[0][0]--
        if (direction == 'U') rope[0][1]++
        if (direction == 'D') rope[0][1]--

        // move the knots
        for (let i = 1; i < rope.length; i++) {
            // need to move
            if (Math.abs(rope[i-1][0] - rope[i][0]) == 2) {
                if (rope[i-1][0] > rope[i][0]) rope[i][0]++
                else rope[i][0]--
                // handles the diagnol cases
                if (rope[i-1][1] > rope[i][1]) rope[i][1]++
                else if (rope[i-1][1] < rope[i][1]) rope[i][1]--
            }
            if (Math.abs(rope[i-1][1] - rope[i][1]) == 2) {
                if (rope[i-1][1] > rope[i][1]) rope[i][1]++
                else rope[i][1]--
                // handles the diagnol cases
                if (rope[i-1][0] > rope[i][0]) rope[i][0]++
                else if (rope[i-1][0] < rope[i][0]) rope[i][0]--
            }
            if (i == 9) positions9[`${rope[i][0]},${rope[i][1]}`] = true
        }
        steps--
        /*
        let grid = ''
        for(let y = -10; y <= 10; y++) {
            for(let x = -10; x <= 10; x++) {
                let glyph = '.' 
                if (x == 0 && y == 0) glyph = 's' 
                else {
                    for (let i = rope.length - 1; i >= 0; i--) {
                        if (rope[i][0] == x && rope[i][1] == y) {
                            glyph = i == 0 ? 'H' : i
                        }
                    }
                }
                grid += glyph
            }
            grid += '\n'
        }
        console.log(grid,'\n\n\n\n\n')
        */
    }  
}).on('close', function() {
    console.log(Object.keys(positions9).length)
})