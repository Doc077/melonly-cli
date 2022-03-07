const cli = require('cli-color')

const errorLine = (text) => {
    console.error(cli.redBright(text))
}

exports.errorLine = errorLine
