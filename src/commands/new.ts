import { copyFileSync, readFileSync, writeFileSync } from 'fs'
import { join as joinPath } from 'path'
import { errorLine } from '../util/errorLine'
import { infoLine } from '../util/infoLine'
import { removeDirectory } from '../util/removeDirectory'
import { runCommand } from '../util/runCommand'

const failInstallation = (): void => {
  errorLine('Installation failed')

  process.exit(1)
}

const stageGitClone = (appName: string): void => {
  infoLine(`Creating new project '${appName}'...`)

  if (!runCommand(`git clone https://github.com/Doc077/melonly.git ${appName}`)) {
    failInstallation()
  }
}

const stagePackagesInstall = (appName: string): void => {
  infoLine('Installing packages...')

  process.chdir(appName)

  if (!runCommand('npm install')) {
    failInstallation()
  }

  removeDirectory(joinPath(process.cwd(), '.git'))
}

const stageFilesPrepare = (appName: string): void => {
  infoLine('Copying new files...')

  copyFileSync(joinPath(process.cwd(), '.env.example'), joinPath(process.cwd(), '.env'))

  try {
    let packageData = readFileSync(joinPath(process.cwd(), 'package.json')).toString()

    packageData = packageData.replace('"name": "melonly"', `"name": "${appName}"`)

    writeFileSync(joinPath(process.cwd(), 'package.json'), packageData)
  } catch (error) {
    failInstallation()
  }
}

export default () => {
  const appName = process.argv[3]

  if (!appName) {
    errorLine('App name is required')

    return
  }

  stageGitClone(appName)

  stagePackagesInstall(appName)

  stageFilesPrepare(appName)

  infoLine(`Your project has been created. Run 'cd ${appName} && npm start' to start your application.`)
}
