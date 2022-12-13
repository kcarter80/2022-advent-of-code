// 90 minutes

function compare(first, second) {
    console.log('Compare',first,'to',second)
    if (typeof first == 'number' && typeof second == 'number') {
        if (first < second) return true
        else if (first > second) return false
        else return null
    }
    else if (typeof first == 'object' && typeof second == 'object') {
        // go through each
        let i = 0
        do {
            // lists are the same length and no comparison makes a decision about the order
            if (first[i] == undefined && second[i] == undefined) return null
            // the left list runs out of items first, the inputs are in the right order
            else if (first[i] == undefined) return true
            // the right list runs out of items first, the inputs are not in the right order
            else if (second[i] == undefined) return false
            else {
                let comparison = compare(first[i],second[i])
                if (comparison != null) return comparison
                else i++
            }
        } while (true)

    } else {
        // only one of first and second is an integer
        if (typeof first == 'number')
            return compare([first],second)
        else
            return compare(first,[second])
    }
}

const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-13/input'),
})

let firsts = new Array
let seconds = new Array
let i = 0
readInterface.on('line', function(line) {
    if (i % 3 == 0)
        firsts.push(eval(line))
    else if (i % 3 == 1)
        seconds.push(eval(line))
    i++
}).on('close', function() {
    let sum = 0
    for(i = 0; i < firsts.length; i++) {
        if(compare(firsts[i],seconds[i])) {
            sum += i + 1
        }
    }
    console.log(sum)
})