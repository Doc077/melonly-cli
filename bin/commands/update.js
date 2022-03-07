const { runCommand } = require('../util/runCommand')
const { infoLine } = require('../util/infoLine')
const { errorLine } = require('../util/errorLine')

module.exports = () => {
    if (!runCommand('npm install -g @melonly/cli')) {
        errorLine('Connection failed')
    }

    infoLine('Melonly CLI has been updated')
}
