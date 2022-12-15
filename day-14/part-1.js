// 2 hours
function drawSandMap(sandMap) {
    let drawnSandMap = ''
    for (let y = 0; y < sandMap.length; y++) {
        for (let x = 0; x < sandMap[0].length; x++) {
            drawnSandMap += sandMap[y][x]
        }
        drawnSandMap += '\n'
    }
    console.log(drawnSandMap)
}

function pourSand(x,y,sandMap) {
    // void reached!
    if (y + 2 > sandMap.length) return false
    if (sandMap[y+1][x] == '.') {
        return pourSand(x,y+1,sandMap)
    // needs to go left or right
    } else if (x-1 < 0 || x > sandMap.length - 2) {
        // if left or right is a boundary, this grain will go into the void
        return false
    } else if(sandMap[y+1][x-1] == '.') {
        return pourSand(x-1,y+1,sandMap)
    } else if(sandMap[y+1][x+1] == '.') {
        return pourSand(x+1,y+1,sandMap)
    } else {
        sandMap[y][x] = 'o'
        return true
    }
}

const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-14/input'),
})

let paths = new Array
let maxX = null
let maxY = null
let minX = null
// minY always 0
readInterface.on('line', function(line) {
    // parsing the paths
    paths.push(line.split(' -> ').map( coords => coords.split(',').map(coord => parseInt(coord))))
    maxX = paths[0][0][0]
    maxY = paths[0][0][1]
    minX = maxX
    paths.forEach(path => path.forEach(coords => {
        if(coords[0] > maxX) maxX = coords[0]
        if(coords[0] < minX) minX = coords[0]
        if(coords[1] > maxY) maxY = coords[1]
    }))
}).on('close', function() {
    // build the sandMap
    let sandMap = new Array(maxY)
    for (let y = 0; y < maxY + 1; y++) {
        sandMap[y] = new Array(maxX - minX + 1).fill('.')
    }

    for (let i = 0; i < paths.length; i++) {
        for (let ii = 0; ii < paths[i].length -1 ; ii++) {
            //console.log(paths[i][ii],paths[i][ii+1])
            let startX = paths[i][ii][0] < paths[i][ii+1][0] ? paths[i][ii][0] : paths[i][ii+1][0]
            let endX = paths[i][ii][0] > paths[i][ii+1][0] ? paths[i][ii][0] : paths[i][ii+1][0]
            let startY = paths[i][ii][1] < paths[i][ii+1][1] ? paths[i][ii][1] : paths[i][ii+1][1]
            let endY = paths[i][ii][1] > paths[i][ii+1][1] ? paths[i][ii][1] : paths[i][ii+1][1]
            for (let x = startX; x <= endX; x++) {
                for (let y = startY; y <= endY; y++) {
                    sandMap[y][x - minX] = '#'
                }
            }
        }
    }
    sandMap[0][500-minX] = '+'
    drawSandMap(sandMap)
    let units = 0
    // sand always pours from 500,0
    while(pourSand(500-minX,0,sandMap)) {
        units++
        drawSandMap(sandMap)
    }
    console.log(units)
})