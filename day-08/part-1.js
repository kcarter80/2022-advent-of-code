// 90 minutes
function isVisible(y, x, grid) { 
    let xToEval, yToEval
    let blockedDirections = 0
    // the ys above
    for(yToEval = 0; yToEval < y; yToEval++) {
        if (grid[yToEval][x] >= grid[y][x]) {
            blockedDirections++
            break
        }
    }
    // the ys below
    for(yToEval = y + 1; yToEval < grid.length; yToEval++) {
        if (grid[yToEval][x] >= grid[y][x]) {
            blockedDirections++
            break
        }
    }
    // the xs to left
    for(xToEval = 0; xToEval < x; xToEval++) {
        if (grid[y][xToEval] >= grid[y][x]) {
            blockedDirections++
            break
        }
    }
    // the xs to right
    for(xToEval = x + 1; xToEval < grid[0].length; xToEval++) {
        if (grid[y][xToEval] >= grid[y][x]) {
            blockedDirections++
            break
        }
    }

    if (blockedDirections == 4) return false
    else return true
}


const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-08/input'),
})

let grid = new Array
readInterface.on('line', function(line) {
    grid.push(line.split(''))
}).on('close', function() {
    let visible = (grid.length - 1) * 2 + (grid[0].length - 1) * 2
    for(let y = 1; y < grid.length - 1; y++) {
        for(let x = 1; x < grid[0].length - 1; x++) {
            //console.log(y,x,isVisible(y,x,grid))
            if (isVisible(y,x,grid)) visible++
        }
    }
    console.log(visible)
})