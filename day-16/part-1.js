// 10 hours (?), but (finally) came up with strategy without researching
class Valve {
    constructor(name) {
        this.name = name
        this.tunnels = []
        this.travelTimes = null
    }

    addTunnel(valve) {
        this.tunnels.push(valve.name)
    }

    setflowRate(flowRate) {
        this.flowRate = flowRate
    }

    generateTravelTimes(valves) {
        if (this.travelTimes == null) {
            this.travelTimes = new Object
            // default the travel times to null
            Object.keys(valves).forEach(valveName => {
                if (valveName != this.name) this.travelTimes[valveName] = null
            })
        }

        let tunnelsToFollow = this.tunnels
        let nextTunnelsToFollow = []
        let stops = 1
        while(Object.values(this.travelTimes).includes(null)) {
            tunnelsToFollow.forEach(valveName => {
                if(Object.hasOwn(this.travelTimes, valveName) && this.travelTimes[valveName] == null) {
                    this.travelTimes[valveName] = stops
                }
                // add tunnels that aren't this.name or already evaluated
                nextTunnelsToFollow = nextTunnelsToFollow.concat(valves[valveName].tunnels.filter(valveName => {
                    if (valveName == this.name || this.travelTimes[valveName] != null) { 
                        return false
                    } else {
                        return true
                    }   
                }))              
            })
            tunnelsToFollow = nextTunnelsToFollow
            nextTunnelsToFollow = []
            stops++
        }
    }
}

function calculatePressureReleased(game) {
    let pressureReleased = 0
    Object.keys(game['valvesOpened']).forEach(valveName => {
        pressureReleased += valves[valveName]['flowRate'] * (31-game['valvesOpened'][valveName])
    })
    return pressureReleased
}

function biggestRelease(valvesWithFlowRate,game) {
    // from https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript/27997169#27997169
    let remainingValvesToOpen = [...new Set(valvesWithFlowRate.filter(x => !new Set(Object.keys(game['valvesOpened'])).has(x)))]
    let travelTimes = valves[game['currentLocation']].travelTimes

    let dispensedGameResults = []

    let noMoreSteps = true
    // if there are any remaining valves
    remainingValvesToOpen.forEach(valveName =>  {
        // if there's time to travel to this remaining valve, open it, and accumulate the pressure at least once
        if (game['minute'] + travelTimes[valveName] + 1 <= 30) {
            noMoreSteps = false
            // cloning the game object
            let updatedGame = {...game}
            // need to deep clone the opened valves
            updatedGame['valvesOpened'] = {...game['valvesOpened']}
            updatedGame['currentLocation'] = valveName
            // travel time plus a minute to open
            updatedGame['minute'] = game['minute'] + travelTimes[valveName] + 1
            // could reduce this structure
            updatedGame['valvesOpened'][valveName] = updatedGame['minute']
            dispensedGameResults.push(biggestRelease(valvesWithFlowRate,updatedGame))
        }
    })

    if (noMoreSteps) {
        // get the score of this game if no further moves are possible
        dispensedGameResults.push(calculatePressureReleased(game))
    }

//    console.log('find the max of the following',dispensedGameResults,Math.max(...dispensedGameResults))
    return Math.max(...dispensedGameResults)
}

const readline = require('readline')
const fs = require('fs')
const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-16/input'),
})

let valves = new Object
readInterface.on('line', function(line) {
    let name = line.split('Valve ')[1].split(' has flow')[0]
    let flowRate = parseInt(line.split('flow rate=')[1].split(';')[0])
    // slightly modified the sample and input so that valves is always pluralized
    let tunnelDirections = line.split('valves ')[1].split(', ')
    let valve
    if (!Object.hasOwn(valves,name)) {
        valve = new Valve(name)
        valves[name] = valve
    } else {
        valve = valves[name]
    }
    valve.setflowRate(flowRate)
    tunnelDirections.forEach( name => {
        if (Object.hasOwn(valves,name)) valve.addTunnel(valves[name])
        else {
            valves[name] = new Valve(name)
            valve.addTunnel(valves[name])   
        }
    })   
}).on('close', function() {
    Object.values(valves).forEach(valve => valve.generateTravelTimes(valves))
    let valvesWithFlowRate = Object.keys(valves).filter(valveName => {return valves[valveName].flowRate > 0})
    console.log(
    biggestRelease(valvesWithFlowRate,{
        currentLocation: 'AA',
        minute: 1,
        valvesOpened: {}
    })
    )
})

// submitted 2345, too low