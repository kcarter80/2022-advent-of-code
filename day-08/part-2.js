// 35 minutes
function scenicScore(y, x, grid) { 
    let xToEval, yToEval
    let up = 0, down = 0, left = 0, right = 0
    // the ys above
    for(yToEval = y - 1; yToEval >= 0; yToEval--) {
        up++
        if (grid[yToEval][x] >= grid[y][x]) {
            break
        }
    }
    // the ys below
    for(yToEval = y + 1; yToEval < grid.length; yToEval++) {
        down++
        if (grid[yToEval][x] >= grid[y][x]) {
            break
        }
    }
    // the xs to left
    for(xToEval = x - 1; xToEval >= 0; xToEval--) {
        left++
        if (grid[y][xToEval] >= grid[y][x]) {
            break
        }
    }
    // the xs to right
    for(xToEval = x + 1; xToEval < grid[0].length; xToEval++) {
        right++
        if (grid[y][xToEval] >= grid[y][x]) {
            break
        }
    }

    return up * down * left * right
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
    let maxScenicScore = 0
    for(let y = 1; y < grid.length - 1; y++) {
        for(let x = 1; x < grid[0].length - 1; x++) {
            if (scenicScore(y,x,grid) > maxScenicScore) maxScenicScore = scenicScore(y,x,grid)
        }
    }
    console.log(maxScenicScore)
})