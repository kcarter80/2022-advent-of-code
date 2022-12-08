// 1 hour

class Directory {
    constructor(name, parent) {
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

    allDirectories() {
        let allDirectories = []
        // loop through each child directory
        this.childDirectories.forEach(directory => {
            allDirectories.push(directory)
            allDirectories = allDirectories.concat(directory.allDirectories())
        })
        return allDirectories
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

let filesystem = 70000000
let required   = 30000000
let root
let currentDirectory = null
let parentDirectory = null
readInterface.on('line', function(line) {
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
    let spaceNeeded = required- (filesystem - root.size())
    console.log(spaceNeeded)
    let allDirectories = root.allDirectories()
    allDirectories.sort((a, b) => a.size() - b.size())
    allDirectories.every(directory => {
        if (directory.size() > spaceNeeded) {
            console.log(directory.name,directory.size())
            return false
        }
        return true
    })
})