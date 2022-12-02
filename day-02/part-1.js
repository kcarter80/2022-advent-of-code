// 4:44 a to 5:08 a is 24 minutes
const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-02/input'),
});

var scoreMatrix = {
    // rock
    X: {
        score: 1,
        // rock
        A: 3,
        // paper
        B: 0,
        // scissors
        C: 6
    },
    // paper
    Y: {
        score: 2,
        A: 6,
        B: 3,
        C: 0
    },
    // scissors
    Z: {
        score: 3,
        A: 0,
        B: 6,
        C: 3
    }
};

var totalScore = 0;
readInterface.on('line', function(line) {
    var splitLine = line.split(' ');
    totalScore += scoreMatrix[splitLine[1]].score + scoreMatrix[splitLine[1]][splitLine[0]];
}).on('close', function() {
    console.log(totalScore);
});