// 3 hours
function findDistressSignal(sensors,maxSearch) {
    // covering the y search space
    for (let y = 0; y <= maxSearch; y++) {
        let xsSensed = []
        // loop through each sensor
        for (let i = 0; i < sensors.length; i++) {
            // getting the x and y distances between the sensor and its nearest beacon
            let xBeaconDistance = Math.abs(sensors[i]['xSensor'] - sensors[i]['xBeacon'])
            let yBeaconDistance = Math.abs(sensors[i]['ySensor'] - sensors[i]['yBeacon'])
            // the manhattan distance is the sum
            let manhattanDistance = xBeaconDistance + yBeaconDistance           
            // if the y search distance is *within* the manhattan distance
            if (Math.abs(sensors[i]['ySensor'] - y) <= manhattanDistance) {
                // then the possible x range (at "this" y) for this sensor is the manhattan distance minus the "this" y distance
                let xRange = manhattanDistance - Math.abs(sensors[i]['ySensor'] - y)
                // only interested in the range inside these possible X's (starts with 1 element: 0 -> maxSearch)
                let xSensedBegin = sensors[i]['xSensor']-xRange
                let xSensedEnd = sensors[i]['xSensor']+xRange
                xsSensed.push([xSensedBegin,xSensedEnd])
            }
        }
        xsSensed.sort((a,b) => { return a[1] - b[1] }).sort((a,b) => { return a[0] - b[0] })
        for (let i = 0; i < xsSensed.length; i++) {
            // limit search space to greater than or equal to 0
            if (xsSensed[i][0] < 0) xsSensed[i][0] = 0
            // and less than or equal to max search
            if (xsSensed[i][1] > maxSearch) xsSensed[i][1] = maxSearch
        }

        for (let i = 0; i < xsSensed.length - 1; i++) {
            // if the "next" sensor begins before (or just after) this one ends
            if (xsSensed[i+1][0] <= xsSensed[i][1] + 1) {
                // if the "next" sensor ends after (or equal to) where this one ends
                if (xsSensed[i+1][1] >= xsSensed[i][1]) {
                    // "this" one should be pushed out
                    xsSensed[i][1] = xsSensed[i+1][1]
                    // and remove the "next one"
                    xsSensed.splice(i+1,1)
                    i--
                } else {
                    // "next" one should be removed since it's enclosed by "this" one
                    xsSensed.splice(i+1,1)
                    i--
                }
            }
        }
        // 13029714573243
        if (xsSensed.length > 1) console.log(y,xsSensed.length,xsSensed[0],xsSensed[1],(xsSensed[0][1] + 1) * 4000000 + y)
    }
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
    findDistressSignal(sensors,4000000)
    console.log('done')
})