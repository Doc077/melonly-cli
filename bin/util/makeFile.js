const { existsSync, mkdirSync, writeFileSync } = require('fs')
const { dirname } = require('path')
const { errorLine } = require('./errorLine')

const makeFile = (path, content) => {
    if (!existsSync(path)) {
        mkdirSync(dirname(path), {
            recursive: true,
        })
    } else {
        errorLine('File already exists')

        process.exit(1)
    }

    writeFileSync(path, content, (error) => {
        if (error) {
            errorLine('Cannot create new file')
        }
    })
}

exports.makeFile = makeFile
