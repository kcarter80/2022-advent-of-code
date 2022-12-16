// 80 minutes
function occupiedPositions(y,sensors) {
    let impossiblePositions = new Array
    for (let i = 0; i < sensors.length; i++) {
        // getting the x and y distances between the sensor and its nearest beacon
        let xBeaconDistance = Math.abs(sensors[i]['xSensor'] - sensors[i]['xBeacon'])
        let yBeaconDistance = Math.abs(sensors[i]['ySensor'] - sensors[i]['yBeacon'])
        // the manhattan distance is the sum
        let manhattanDistance = xBeaconDistance + yBeaconDistance
        //console.log(sensors[i],xBeaconDistance,yBeaconDistance,manhattanDistance)
        // if the y to check distance is *within* the manhattan distance
        if (Math.abs(sensors[i]['ySensor'] - y) <= manhattanDistance) {
            // then the possible x range is the manhattan distance minus the y to check distance
            let xRange = manhattanDistance - Math.abs(sensors[i]['ySensor'] - y)
            for (let ii = sensors[i]['xSensor']-xRange; ii <= sensors[i]['xSensor']+xRange; ii++) {
                impossiblePositions.push(parseInt(ii))
            }
        }       
    }
    // remove duplicates
    impossiblePositions = [...new Set(impossiblePositions)]
    // sort
    impossiblePositions.sort((a, b) =>  a - b)
    // need to remove the spots where there are actual beacons
    for (let i = 0; i < sensors.length; i++) {
        if (sensors[i]['yBeacon'] == y && impossiblePositions.includes(sensors[i]['xBeacon'])) {
            impossiblePositions.splice(impossiblePositions.indexOf(sensors[i]['xBeacon']),1)
            console.log('removed beacon position from impossible beacon positions')
        }
    }
    console.log(impossiblePositions.length)
}

const readline = require('readline')
const fs = require('fs')
const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-15/input'),
})

sensors = new Array

readInterface.on('line', function(line) {
    sensors.push({
        xSensor:parseInt(line.split('x=')[1].split(',')[0]),
        ySensor:parseInt(line.split('y=')[1].split(':')[0]),
        xBeacon:parseInt(line.split('x=')[2].split(',')[0]),
        yBeacon:parseInt(line.split('y=')[2])
    })
}).on('close', function() {
    occupiedPositions(2000000,sensors)
})