const { join } = require('path')
const { copyFileSync, readFileSync, writeFileSync } = require('fs')
const { removeDirectory } = require('../util/removeDirectory')

const { runCommand } = require('../util/runCommand')
const { infoLine } = require('../util/infoLine')
const { errorLine } = require('../util/errorLine')

module.exports = () => {
    const appName = process.argv[3]

    infoLine(`Creating new project '${appName}'...`)

    if (!runCommand(`git clone https://github.com/Doc077/melonly.git ${appName} --branch ${require('../../package.json').version}`)) {
        errorLine('Installation failed')

        process.exit(1)
    }

    infoLine('Installing packages...')

    process.chdir(appName)

    if (!runCommand('npm install')) {
        errorLine('Installation failed')

        process.exit(1)
    }

    removeDirectory(join(process.cwd(), '.git'))

    infoLine('Extracting new files...')

    copyFileSync(join(process.cwd(), '.env.example'), join(process.cwd(), '.env'))

    try {
        let packageData = readFileSync(join(process.cwd(), 'package.json')).toString()

        packageData = packageData.replace('"name": "melonly"', `"name": "${appName}"`)

        writeFileSync(join(process.cwd(), 'package.json'), packageData, (error) => {
            if (error) {
                errorLine('Installation failed')

                process.exit(1)
            }
        })
    } catch (error) {
        errorLine('Installation failed')

        process.exit(1)
    }

    infoLine(`Your project has been created. Run 'cd ${appName} && npm start' to launch your application.`)
}
