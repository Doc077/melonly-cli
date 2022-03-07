const { join } = require('path')

const { errorLine } = require('../util/errorLine')
const { infoLine } = require('../util/infoLine')
const { publishTemplate } = require('../util/publishTemplate')

module.exports = () => {
    switch (process.argv[3]) {
        case 'controller':
            publishTemplate(
                join(process.cwd(), 'src', process.argv[4], `${process.argv[4]}.controller.ts`),

                'controller', {
                    className: `${process.argv[4].charAt(0).toUpperCase()}${process.argv[4].slice(1)}Controller`,
                    path: `${process.argv[4]}s`,
                    view: `${process.argv[4]}`,
                },
            )

            break

        case 'email':
            publishTemplate(
                join(process.cwd(), 'src', 'mail', `${process.argv[4]}.email.ts`),

                'email', {
                    className: `${process.argv[4].charAt(0).toUpperCase()}${process.argv[4].slice(1)}Email`,
                    view: `${process.argv[4]}`,
                },
            )

            break

        case 'service':
            publishTemplate(
                join(process.cwd(), 'src', process.argv[4], `${process.argv[4]}.service.ts`),

                'service', {
                    className: `${process.argv[4].charAt(0).toUpperCase()}${process.argv[4].slice(1)}Service`,
                },
            )

            break

        default:
            errorLine(`Unknown generator command '${process.argv[3]}'`)

            return
    }

    infoLine(`Generated new ${process.argv[3]} '${process.argv[4]}'`)
}
