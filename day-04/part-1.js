// 10 minutes
const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-04/input'),
})

var fullyContained = 0
readInterface.on('line', function(line) {
    var first = parseInt(line.split(',')[0].split('-')[0])
    var second = parseInt(line.split(',')[0].split('-')[1])
    var third = parseInt(line.split(',')[1].split('-')[0])
    var fourth = parseInt(line.split(',')[1].split('-')[1])
    if (first <= third && second >= fourth) fullyContained++
    else if (third <= first && fourth >= second) fullyContained++
}).on('close', function() {
    console.log(fullyContained)
})