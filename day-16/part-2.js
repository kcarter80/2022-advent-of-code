// 3 hours
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
        pressureReleased += valves[valveName]['flowRate'] * (27-game['valvesOpened'][valveName])
    })
    return pressureReleased
}

function cloneGame(game) {
    // cloning the game object
    let clonedGame = {...game}
    // need to deep clone the opened valves and logistics
    clonedGame['valvesOpened'] = {...game['valvesOpened']}
    clonedGame['myLogistics'] = {...game['myLogistics']}
    clonedGame['elephantLogistics'] = {...game['elephantLogistics']}
    return clonedGame
}

function biggestRelease(valvesWithFlowRate,game) {
    // from https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript/27997169#27997169
    let remainingValvesToOpen = [...new Set(valvesWithFlowRate.filter(x => !new Set(Object.keys(game['valvesOpened'])).has(x)))]
    
    let dispensedGameResults = []

    // holds whether there are additional valves possible to open
    let noMoreSteps = true

    // holds all the games to be updated
    let updatedGames = []

    let eligibleMovers = []
    if (game['myLogistics']['minute'] == game['minute']) eligibleMovers.push('myLogistics')
    if (game['elephantLogistics']['minute'] == game['minute']) eligibleMovers.push('elephantLogistics')

    // if someone is available to travel this minute
    if (eligibleMovers.length) {
            let travelTimes = valves[game[eligibleMovers[0]]['location']].travelTimes
            // if there are any remaining valves
            remainingValvesToOpen.forEach(valveName =>  {
                // if there's time to travel to this remaining valve, open it, and accumulate the pressure at least once
                if (game['minute'] + travelTimes[valveName] + 1 <= 26) {
                    noMoreSteps = false
                    // cloning the game object
                    let updatedGame = cloneGame(game)                    
                    // the new location is this valve
                    updatedGame[eligibleMovers[0]]['location'] = valveName
                    // travel time plus a minute to open
                    updatedGame[eligibleMovers[0]]['minute'] = game['minute'] + travelTimes[valveName] + 1
                    // set when this valve will be open
                    updatedGame['valvesOpened'][valveName] = game['minute'] + travelTimes[valveName] + 1
                    // the GAME minute is the lowest next open valve minute
                    updatedGame['minute'] = Object.values(updatedGame['valvesOpened']).sort((a,b) => a-b).find(element => element > game['minute'])

                    let atLeastOneSecondMove = false
                    // if the other party is also available to move
                    if (eligibleMovers.length > 1) {
                        let travelTimes2 = valves[game[eligibleMovers[1]]['location']].travelTimes
                        // filtering out the valve already sent to
                        remainingValvesToOpen.filter(v => v != valveName).forEach(valveName2 => {
                            // if there's time to travel to this remaining valve, open it, and accumulate the pressure at least once
                            if (game['minute'] + travelTimes2[valveName2] + 1 <= 26) {
                                atLeastOneSecondMove = true
                                // cloning the game object
                                let updatedGame2 = cloneGame(updatedGame)
                                // the new location is this valve
                                updatedGame2[eligibleMovers[1]]['location'] = valveName2
                                // travel time plus a minute to open
                                updatedGame2[eligibleMovers[1]]['minute'] = game['minute'] + travelTimes2[valveName2] + 1
                                // set when this valve will be open
                                updatedGame2['valvesOpened'][valveName2] = updatedGame2[eligibleMovers[1]]['minute']                                
                                // the GAME minute is the lowest next open valve minute
                                updatedGame2['minute'] = Object.values(updatedGame2['valvesOpened']).sort((a,b) => a-b).find(element => element > game['minute'])
                                
                                updatedGames.push(updatedGame2)
                            }
                        })
                    } 
                    if (!atLeastOneSecondMove) updatedGames.push(updatedGame)
                }
            })
    }
    
    updatedGames.forEach(updatedGame => {
        //console.log(updatedGame.valvesOpened)
        dispensedGameResults.push(biggestRelease(valvesWithFlowRate,updatedGame))
    })
    


    if (noMoreSteps) {
        // get the score of this game if no further moves are possible
        dispensedGameResults.push(calculatePressureReleased(game))
    }

    iterations++
    if (iterations % 100000 == 0) console.log(iterations)
    return Math.max(...dispensedGameResults)
}

const readline = require('readline')
const fs = require('fs')
const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-16/input'),
})

let valves = new Object
let iterations = 0
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
        myLogistics: {location: 'AA', minute: 1},
        elephantLogistics: {location: 'AA', minute: 1},
        minute: 1,
        valvesOpened: {}
    })
    )

    /*
    console.log(
        biggestRelease(valvesWithFlowRate,{
            myLogistics: {location: 'HH', minute: 8},
            elephantLogistics: {location: 'JJ', minute: 4},
            minute: 4,
            valvesOpened: {DD: 3, JJ: 4, HH: 8}
        })
    )
    */

})

// submitted 2663, too low

//{ valvesOpened: { DD: 3, JJ: 4, HH: 8, BB: 8, CC: 10, EE: 12}}