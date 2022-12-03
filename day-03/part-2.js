// 22 minutes

const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-03/input'),
});

var rucksackNumber = 0;
var eligibleItems = new Object;
var prioritiesSum = 0;
readInterface.on('line', function(line) {
    if (rucksackNumber == 0) {
        var i = 0;
        while(i < line.length) {
            eligibleItems[line[i]] = true;
            i++;
        }
    } else if (rucksackNumber == 1 || rucksackNumber == 2) {
        for (const item in eligibleItems) {
            if (line.indexOf(item) == -1) {
                delete eligibleItems[item]
            }
        }
    }
    if (rucksackNumber < 2) {
        rucksackNumber++;
    } else {
        var commonItem = Object.keys(eligibleItems)[0];
        if (commonItem.toUpperCase() === commonItem) {
            // upper case
            prioritiesSum += commonItem.charCodeAt(0) - 38;
        } else {
            // lower case
            prioritiesSum += commonItem.charCodeAt(0) - 96;
        }
        rucksackNumber = 0;
        eligibleItems = new Object;
    }

}).on('close', function() {
    console.log(prioritiesSum);
});