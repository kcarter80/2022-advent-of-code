// 1 hour

class Monkey {
    constructor(items, operation, test, ifTrueMonkey, ifFalseMonkey) {
        this.items = items
        this.operation = operation
        this.test = test
        this.ifTrueMonkey = ifTrueMonkey
        this.ifFalseMonkey = ifFalseMonkey
        this.inspectedItems = 0
    }
    
    addItem(item) {
        this.items.push(item)
    }

    round(monkeys) {
        while(this.items.length) {
            this.inspectedItems++
            this.items[0] = eval(this.items[0].toString() + this.operation)
            this.items[0] = Math.floor(this.items[0] / 3)
            if (this.items[0] % this.test == 0)
                monkeys[this.ifTrueMonkey].addItem(this.items.shift())
            else
                monkeys[this.ifFalseMonkey].addItem(this.items.shift())
        }
    }
}

/*
monkeys = [
    new Monkey(
        [79,98],
        '* 19',
        23,
        2,
        3
    ),
    new Monkey(
        [54,65,75,74],
        '+ 6',
        19,
        2,
        0
    ),
    new Monkey(
        [79,60,97],
        '* this.items[0]',
        13,
        1,
        3
    ),
    new Monkey(
        [74],
        '+ 3',
        17,
        0,
        1
    ),
]
*/

monkeys = [
    new Monkey(
        [80],
        '* 5',
        2,
        4,
        3
    ),
    new Monkey(
        [75,83,74],
        '+ 7',
        7,
        5,
        6
    ),
    new Monkey(
        [86,67,61,96,52,63,73],
        '+ 5',
        3,
        7,
        0
    ),
    new Monkey(
        [85, 83, 55, 85, 57, 70, 85, 52],
        '+ 8',
        17,
        1,
        5
    ),
    new Monkey(
        [67, 75, 91, 72, 89],
        '+ 4',
        11,
        3,
        1
    ),
    new Monkey(
        [66, 64, 68, 92, 68, 77],
        '* 2',
        19,
        6,
        2
    ),
    new Monkey(
        [97, 94, 79, 88],
        '* this.items[0]',
        5,
        2,
        7
    ),
    new Monkey(
        [77,85],
        '+ 6',
        13,
        4,
        0
    ),
]

for (let i = 0; i < 20; i++)
    monkeys.forEach(monkey => monkey.round(monkeys))
let inspectedItems = []
monkeys.forEach(monkey => inspectedItems.push(monkey.inspectedItems))
inspectedItems.sort((a,b) => b-a)
console.log(inspectedItems[0] * inspectedItems[1])