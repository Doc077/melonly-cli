const { join } = require('path')
const { copyFileSync, readFileSync, writeFileSync } = require('fs')
const { removeDirectory } = require('../util/removeDirectory')

const { runCommand } = require('../util/runCommand')
const { infoLine } = require('../util/infoLine')
const { errorLine } = require('../util/infoLine')

module.exports = () => {
    const appName = process.argv[3]

    infoLine(`Creating new project '${appName}'...`)

    if (!runCommand(`git clone https://github.com/Doc077/melonly.git ${appName}`)) {
        errorLine('Installation failed')
    }

    infoLine('Installing packages...')

    process.chdir(appName)

    if (!runCommand('npm install')) {
        errorLine('Installation failed')
    }

    removeDirectory(join(process.cwd(), '.git'))

    infoLine('Extracting new files...')

    copyFileSync(join(process.cwd(), '.env.example'), join(process.cwd(), '.env'))

    readFileSync(join(process.cwd(), 'package.json'), (error, data) => {
        if (error) {
            errorLine('Installation failed')
        }

        let projectData = JSON.parse(data)

        projectData.name = appName

        writeFileSync(join(process.cwd(), 'package.json'), projectData, (error) => {
            if (error) {
                errorLine('Installation failed')
            }
        })
    })

    infoLine(`Your project has been created. Run 'cd ${appName}' and 'npm start' to launch your application.`)
}
