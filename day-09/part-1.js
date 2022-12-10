// 60 minutes

const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-09/input'),
})

let tailPositions = { '0,0': true }
let headX = 0
let headY = 0
let tailX = 0
let tailY = 0 
let direction, steps
readInterface.on('line', function(line) {
    direction = line.split(' ')[0]
    steps = line.split(' ')[1]
    while(steps > 0) {
        // move the head
        if (direction == 'R') headX++
        if (direction == 'L') headX--
        if (direction == 'U') headY++
        if (direction == 'D') headY--

        // move the tail
        if (Math.abs(headX - tailX) == 2) {
            if (headX > tailX) tailX++
            else tailX--
            // handles the diagnol case (note this may have a bug that doesn't emerge until part 2)
            tailY = headY
        }
        if (Math.abs(headY - tailY) == 2) {
            if (headY > tailY) tailY++
            else tailY--
            // handles the diagnol case 
            tailX = headX
        }

        tailPositions[`${tailX},${tailY}`] = true
        //console.log(`${headX},${headY} ${tailX},${tailY}`)
        steps--
    }
    

}).on('close', function() {
    console.log(Object.keys(tailPositions).length)
})