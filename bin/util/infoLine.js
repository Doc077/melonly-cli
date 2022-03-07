const cli = require('cli-color')

const infoLine = (text) => {
    console.log(cli.green(text))
}

exports.infoLine = infoLine
