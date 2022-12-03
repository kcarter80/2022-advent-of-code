// 17 minutes

const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-03/input'),
});

var i, seenItems;
var prioritiesSum = 0;
readInterface.on('line', function(line) {
    seenItems = new Object;
    i = 0;
    while(i < (line.length / 2)) {
        seenItems[line[i]] = true
        i++;
    }
    while(i < line.length) {
        if (line[i] in seenItems) {
            if (line[i].toUpperCase() === line[i]) {
                // upper case
                //console.log('u',line[i],line[i].charCodeAt(0) - 38);
                prioritiesSum += line[i].charCodeAt(0) - 38;
            } else {
                // lower case
                //console.log('l',line[i],line[i].charCodeAt(0) - 96);
                prioritiesSum += line[i].charCodeAt(0) - 96;
            }
            break;
        }
        i++;
    }
}).on('close', function() {
    console.log(prioritiesSum);
});