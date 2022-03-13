import { copyFileSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

import { removeDirectory } from '../util/removeDirectory'
import { runCommand } from '../util/runCommand'
import { infoLine } from '../util/infoLine'
import { errorLine } from '../util/errorLine'

export default () => {
    const appName = process.argv[3]

    infoLine(`Creating new project '${appName}'...`)

    if (!runCommand(`git clone https://github.com/Doc077/melonly.git ${appName}`)) {
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

        writeFileSync(join(process.cwd(), 'package.json'), packageData, (error: any): any => {
            if (error) {
                errorLine('Installation failed')

                process.exit(1)
            }
        })
    } catch (error) {
        errorLine('Installation failed')

        process.exit(1)
    }

    infoLine(
        `Your project has been created. Run 'cd ${appName} && npm start' to start your application.`,
    )
}
