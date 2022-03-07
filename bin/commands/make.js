const { join } = require('path')

const { errorLine } = require('../util/errorLine')
const { infoLine } = require('../util/infoLine')
const { makeFile } = require('../util/makeFile')

module.exports = () => {
    switch (process.argv[3]) {
        case 'service':
            makeFile(join(process.cwd(), 'src', process.argv[4], `${process.argv[4]}.service.ts`), '//some service content')

            break

        default:
            errorLine(`Unknown generator command '${process.argv[3]}'`)

            return
    }

    infoLine(`Generated new ${process.argv[3]} '${process.argv[4]}'`)
}
