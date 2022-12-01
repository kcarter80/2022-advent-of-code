// 22 minutes to complete
const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-01/input'),
});

var calories = 0;
var maxCalories = 0;
readInterface.on('line', function(line) {
    if (line == '') {
        if (calories > maxCalories) {
            maxCalories = calories;
        }
        calories = 0;
    } else {
        calories += parseInt(line);
    }
}).on('close', function() {
    if (calories > maxCalories) {
        maxCalories = calories;
    }
    console.log(maxCalories);
});