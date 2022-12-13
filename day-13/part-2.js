// 45 minutes

function compare(first, second) {
    //console.log('Compare',first,'to',second)
    if (typeof first == 'number' && typeof second == 'number') {
        if (first < second) return 1
        else if (first > second) return -1
        else return 0
    }
    else if (typeof first == 'object' && typeof second == 'object') {
        // go through each
        let i = 0
        do {
            // lists are the same length and no comparison makes a decision about the order
            if (first[i] == undefined && second[i] == undefined) return 0
            // the left list runs out of items first, the inputs are in the right order
            else if (first[i] == undefined) return 1
            // the right list runs out of items first, the inputs are not in the right order
            else if (second[i] == undefined) return -1
            else {
                let comparison = compare(first[i],second[i])
                if (comparison != 0) return comparison
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

let packets = new Array
packets.push([[2]])
packets.push([[6]])

readInterface.on('line', function(line) {
    if (line) packets.push(eval(line))
}).on('close', function() {
    packets.sort(compare).reverse()
    let decoderKey = 1
    packets.forEach((value,index) => {if (value.length == 1 && value[0].length == 1 && (value[0][0] == 2 || value[0][0] == 6)) decoderKey *= index + 1})
    console.log(decoderKey)
})