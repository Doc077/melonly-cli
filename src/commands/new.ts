import { copyFileSync, readFileSync, writeFileSync } from 'fs'
import { join as joinPath } from 'path'
import { errorLine } from '../util/errorLine'
import { infoLine } from '../util/infoLine'
import { removeDirectory } from '../util/removeDirectory'
import { runCommand } from '../util/runCommand'

const failInstallation = (message?: string): void => {
  errorLine(message ?? 'Installation failed')

  process.exit(1)
}

const stageGitClone = (appName: string): void => {
  infoLine(`✓ Creating new project '${appName}'...`)

  if (!runCommand(`git clone https://github.com/Doc077/melonly.git ${appName}`)) {
    failInstallation('Connection failed')
  }

  removeDirectory(joinPath(process.cwd(), '.git'))
}

const stagePackagesInstall = (appName: string): void => {
  infoLine('✓ Installing packages...')

  process.chdir(appName)

  if (!runCommand('npm install')) {
    failInstallation('Cannot install packages')
  }
}

const stageFilesPrepare = (appName: string): void => {
  infoLine('✓ Copying new files...')

  copyFileSync(joinPath(process.cwd(), '.env.example'), joinPath(process.cwd(), '.env'))

  try {
    const packagePath = joinPath(process.cwd(), 'package.json')

    const packageData = readFileSync(packagePath)
      .toString()
      .replace('"name": "melonly"', `"name": "${appName}"`)

    writeFileSync(joinPath(process.cwd(), 'package.json'), packageData)
  } catch (error) {
    failInstallation()
  }
}

const stageInitRepository = () => {
  infoLine('✓ Initializing Git repository...')

  if (!runCommand('git init')) {
    failInstallation('You have to install Git CLI to init a repository')
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

  if (process.argv[4] === '--git') {
    stageInitRepository()
  }

  infoLine(`Your project has been created. Run 'cd ${appName} && npm start' to start your application.`)
}
