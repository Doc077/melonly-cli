const { join } = require('path')
const { readFileSync } = require('fs')
const { makeFile } = require('./makeFile')
const { errorLine } = require('./errorLine')

const publishTemplate = (path, template, variables) => {
    try {
        let data = readFileSync(join(__dirname, '..', '..', 'assets', 'templates', `${template}.txt`)).toString()

        for (const expression of data.matchAll(/([^@])\{\{ *([^ ]*?) *\}\}/g) ?? []) {
            let variableValue = variables[expression[2]]

            data = data.replace(expression[0], expression[1] + variableValue)
        }

        makeFile(path, data)
    } catch (error) {
        errorLine('Cannot create new file')
    }
}

exports.publishTemplate = publishTemplate
