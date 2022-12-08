// 2.5 hours

class Directory {
    constructor(name, parent) {
        console.log(name)
        this.name = name
        this.parent = parent
        this.childDirectories = []
        this.files = []
    }

    addChild(childDirectory) {
        this.childDirectories.push(childDirectory)
    }
    
    addFile(name, size) {
        this.files.push({
            name: name,
            size: size
        })
    }

    size() {
        let size = 0
        this.files.forEach(file => size += file.size)
        this.childDirectories.forEach(directory => size += directory.size())
        return size
    }

    smallChildren() {
        let smallChildren = []
        // loop through each child directory
        this.childDirectories.forEach(directory => {
            // if the directory is small
            if (directory.size() <= 100000) {
                // add it to the array
                smallChildren.push(directory)
            }
            // add any of its children are also small
            smallChildren = smallChildren.concat(directory.smallChildren())
        })
        return smallChildren
    }
 
    print(prefix) {
        let returnString = prefix + this.name + ' (dir) \n'
        this.childDirectories.forEach(directory => returnString += directory.print(prefix + '\t'));
        this.files.forEach(file => returnString += prefix + '\t' + file.name + ` (file, size=${file.size})\n`);
        return returnString
    }

}

const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-07/input'),
})

let root
let currentDirectory = null
let parentDirectory = null
readInterface.on('line', function(line) {
    console.log('line: ',line)
    if (line.slice(0,4) == '$ cd') {
        // entering new directory
        if (!line.includes('..')) {
            parentDirectory = currentDirectory
            currentDirectory = new Directory(line.split(' ')[2],parentDirectory)
            if (line.includes('/')) {
                root = currentDirectory
            } else {
                parentDirectory.addChild(currentDirectory)
            }
        // move out one level
        } else {
            currentDirectory = parentDirectory
            parentDirectory = currentDirectory.parent
        }
    } else if (!isNaN(line[0])) {
        currentDirectory.addFile(line.split(' ')[1],parseInt(line.split(' ')[0]))
    }
}).on('close', function() {
    console.log(root.print(''))
    let smallChildrenSizes = 0
    root.smallChildren().forEach(directory => smallChildrenSizes += directory.size())
    //console.log(root.smallChildren()[2])
    console.log(smallChildrenSizes)
})