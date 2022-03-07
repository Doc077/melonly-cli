const { infoLine } = require('../util/infoLine')

module.exports = () => {
    const version = require('../../package.json').version

    infoLine(`Melonly CLI v${version}`)
}
