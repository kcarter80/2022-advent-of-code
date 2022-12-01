// 5 minutes to complete
const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-01/input'),
});

var calories = 0;
var calorieTotals = new Array;
readInterface.on('line', function(line) {
    if (line == '') {
        calorieTotals.push(calories);
        calories = 0;
    } else {
        calories += parseInt(line);
    }
}).on('close', function() {
    calorieTotals.sort((a, b) => b - a);
    console.log(calorieTotals[0] + calorieTotals[1] + calorieTotals[2]);
});