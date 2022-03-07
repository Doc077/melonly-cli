const { existsSync, statSync, unlinkSync, rmdirSync, readdirSync } = require('fs')
const { join } = require('path')

const removeDirectory = (path) => {
    if (existsSync(path)) {
        const files = readdirSync(path)
    
        if (files.length > 0) {
            files.forEach((filename) => {
                const filePath = join(path, filename)

                statSync(filePath).isDirectory()
                    ? removeDirectory(filePath)
                    : unlinkSync(filePath)
            })
        }

        rmdirSync(path)
    }
}

exports.removeDirectory = removeDirectory
