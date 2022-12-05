// 26 minutes

// sample
// let stacks = [ ['Z','N'], ['M','C','D'],['P']]
// input
/*
[N]     [Q]         [N]            
[R]     [F] [Q]     [G] [M]        
[J]     [Z] [T]     [R] [H] [J]    
[T] [H] [G] [R]     [B] [N] [T]    
[Z] [J] [J] [G] [F] [Z] [S] [M]    
[B] [N] [N] [N] [Q] [W] [L] [Q] [S]
[D] [S] [R] [V] [T] [C] [C] [N] [G]
[F] [R] [C] [F] [L] [Q] [F] [D] [P]
*/
let stacks = [
    ['F','D','B','Z','T','J','R','N'],
    ['R','S','N','J','H'],
    ['C','R','N','J','G','Z','F','Q'],
    ['F','V','N','G','R','T','Q'],
    ['L','T','Q','F'],
    ['Q','C','W','Z','B','R','G','N'],
    ['F','C','L','S','N','H','M'],
    ['D','N','Q','M','T','J'],
    ['P','G','S']
]

const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-05/input'),
})
readInterface.on('line', function(line) {
    if (line[0] == 'm') {
        let numberOfCratesToMove = line.split('move ')[1].split(' from')[0]
        // stacks are one indexed, and array is zero indexed so substracting 1
        let stackFromIndex = line.split('from ')[1].split(' to')[0] - 1
        let stackToIndex = line.split('to ')[1] - 1
        while(numberOfCratesToMove) {
            stacks[stackToIndex].push(stacks[stackFromIndex].pop())
            numberOfCratesToMove--
        }
        //console.log(numberOfCratesToMove,stackFromIndex,stackToIndex,stacks)
    }
}).on('close', function() {
    let topCrates = ''
    for(let i = 0; i < stacks.length; i++) {
        topCrates += stacks[i].pop()
    }
    console.log(topCrates)
})