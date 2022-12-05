// 14 minutes
const readline = require('readline')
const fs = require('fs')

function intersect(array1, array2) {
    var result = [];
    // Don't destroy the original arrays
    var a = array1.slice(0);
    var b = array2.slice(0);
    var aLast = a.length - 1;
    var bLast = b.length - 1;
    while (aLast >= 0 && bLast >= 0) {
       if (a[aLast] > b[bLast] ) {
          a.pop();
          aLast--;
       } else if (a[aLast] < b[bLast] ){
          b.pop();
          bLast--;
       } else /* they're equal */ {
          result.push(a.pop());
          b.pop();
          aLast--;
          bLast--;
       }
    }
    return result;
 }

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-04/input'),
})

var contained = 0
readInterface.on('line', function(line) {
    var first = parseInt(line.split(',')[0].split('-')[0])
    var second = parseInt(line.split(',')[0].split('-')[1])
    var third = parseInt(line.split(',')[1].split('-')[0])
    var fourth = parseInt(line.split(',')[1].split('-')[1])
    /*
    2-4,6-8
    2-3,4-5
    5-7,7-9 *
    2-8,3-7 *
    6-6,4-6 *
    2-6,4-8 *
    */
    let firstElfSections = new Array
    for (let i = first; i <= second; i += 1) {
        firstElfSections.push(i);
    }
    let secondElfSections = new Array
    for (let i = third; i <= fourth; i += 1) {
        secondElfSections.push(i);
    }
    if (intersect(firstElfSections,secondElfSections).length) contained++;
}).on('close', function() {
        console.log(contained)
})