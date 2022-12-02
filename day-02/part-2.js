// 5:09 a to 5:14 a is 5 minutes
const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-02/input'),
});

// 1 for Rock, 2 for Paper, and 3 for Scissors
var scoreMatrix = {
    // lose
    X: {
        score: 0,
        // rock
        A: 3,
        // paper
        B: 1,
        // scissors
        C: 2
    },
    // draw
    Y: {
        score: 3,
        A: 1,
        B: 2,
        C: 3
    },
    // win
    Z: {
        score: 6,
        A: 2,
        B: 3,
        C: 1
    }
};

var totalScore = 0;
readInterface.on('line', function(line) {
    var splitLine = line.split(' ');
    totalScore += scoreMatrix[splitLine[1]].score + scoreMatrix[splitLine[1]][splitLine[0]];
}).on('close', function() {
    console.log(totalScore);
});