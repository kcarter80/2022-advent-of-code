// 20 minutes

function drawHeightmap(heightmap) {
    let heightmapDrawn = ''
    for (let y = 0; y < heightmap.length; y++) {
        for (let x = 0; x < heightmap[0].length; x++) {
            heightmapDrawn += heightmap[y][x]
        }
        heightmapDrawn += '\n'
    }
    console.log(heightmapDrawn)
}

// height is 'a' if S, 'z' if E, otherwise is whatever it is
function getHeight(glyph) {
    return glyph == 'S' ? 'a' : glyph == 'E' ? 'z' : glyph
}

function evaluatePosition(position,heightmap,currentPositions) {
    let currentX = parseInt(position.split(',')[0])
    let currentY = parseInt(position.split(',')[1])
    let nextSteps = currentPositions[position] + 1
    let heightCurrent = getHeight(heightmap[currentY][currentX])
    let heightAbove = currentY == 0 ? null : getHeight(heightmap[currentY - 1][currentX])
    let heightBelow = currentY == heightmap.length - 1 ? null : getHeight(heightmap[currentY + 1][currentX])
    let heightLeft = currentX == 0 ? null : getHeight(heightmap[currentY][currentX - 1])
    let heightRight = currentY == heightmap[0].length - 1 ? null : getHeight(heightmap[currentY][currentX + 1])  
    
    // "less than" is "higher" in this situation (e.g. "a" < "b")
    if (heightAbove && heightAbove.charCodeAt(0) - heightCurrent.charCodeAt(0) <= 1) {
        //console.log('can move up')
        let key = `${currentX},${currentY - 1}`
        if (!(key in currentPositions) || (currentPositions[key] > nextSteps)) {
            currentPositions[key] = nextSteps
            evaluatePosition(key,heightmap,currentPositions)
        }
    }
    if (heightBelow && heightBelow.charCodeAt(0) - heightCurrent.charCodeAt(0) <= 1) {
        //console.log('can move down')
        let key = `${currentX},${currentY + 1}`
        if (!(key in currentPositions) || (currentPositions[key] > nextSteps)) {
            currentPositions[key] = nextSteps
            evaluatePosition(key,heightmap,currentPositions)
        }
    }
    if (heightLeft && heightLeft.charCodeAt(0) - heightCurrent.charCodeAt(0) <= 1) {
        //console.log('can move left')
        let key = `${currentX - 1},${currentY}`
        if (!(key in currentPositions) || (currentPositions[key] > nextSteps)) {
            currentPositions[key] = nextSteps
            evaluatePosition(key,heightmap,currentPositions)
        }
    }
    if (heightRight && heightRight.charCodeAt(0) - heightCurrent.charCodeAt(0) <= 1) {
        //console.log('can move right')
        let key = `${currentX + 1},${currentY}`
        if (!(key in currentPositions) || (currentPositions[key] > nextSteps)) {
            currentPositions[key] = nextSteps
            evaluatePosition(key,heightmap,currentPositions)
        }
    }
}

const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    // S:0,20 E:77,20
    input: fs.createReadStream('./day-12/input'),
})

let heightmap = new Array
readInterface.on('line', function(line) {
    heightmap.push(line.split(''))
}).on('close', function() {
    drawHeightmap(heightmap)

    let fewestSteps = 361

    for (let y = 0; y < heightmap.length; y++) {
        for (let x = 0; x < heightmap[0].length; x++) {
            if (heightmap[y][x] == 'a' || heightmap[y][x] == 'S') {
                let currentPositions = new Object
                let initialPosition = `${x},${y}`
                currentPositions[initialPosition] = 0
                evaluatePosition(initialPosition,heightmap,currentPositions)
                console.log(initialPosition,currentPositions['77,20'])
                if (currentPositions['77,20'] && currentPositions['77,20'] < fewestSteps) fewestSteps = currentPositions['77,20']
            }
        }
    }
    console.log(fewestSteps)
})