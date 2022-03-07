const { infoLine } = require('../util/infoLine')

module.exports = () => {
    infoLine('Command list:')
    infoLine('- make {type} {file}')
    infoLine('- new')
    infoLine('- update')
    infoLine('- version')
}
