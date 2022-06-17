import { copyFileSync, readFileSync, writeFileSync } from 'fs'
import { join as joinPath } from 'path'
import { bgGreenBright } from 'cli-color'
import { Command } from '../decorators/command.decorator'
import { errorLine } from '../utils/error-line.function'
import { infoLine } from '../utils/info-line.function'
import { removeDirectory } from '../utils/remove-directory.function'
import { runCommand } from '../utils/run-command.function'

@Command({
  parameters: ['name'],
})
export class NewCommand {
  private failInstallation(message?: string): void {
    errorLine(message ?? 'Installation failed')
  
    process.exit(1)
  }
  
  private stageGitClone(appName: string): void {
    infoLine(`[${bgGreenBright('   ')}         ] ✓ Creating new project '${appName}'...`)
  
    if (!runCommand(`git clone https://github.com/Doc077/melonly.git ${appName}`)) {
      this.failInstallation('Connection failed')
    }
  
    removeDirectory(joinPath(process.cwd(), '.git'))
  }
  
  private stagePackagesInstall(appName: string): void {
    infoLine(`[${bgGreenBright('      ')}      ] ✓ Installing packages...`)
  
    process.chdir(appName)
  
    if (!runCommand('npm install')) {
      this.failInstallation('Cannot install packages')
    }
  }
  
  private stageFilesPrepare(appName: string): void {
    infoLine(`[${bgGreenBright('         ')}   ] ✓ Copying new files...`)
  
    copyFileSync(joinPath(process.cwd(), '.env.example'), joinPath(process.cwd(), '.env'))
  
    try {
      const packagePath = joinPath(process.cwd(), 'package.json')
  
      const packageData = readFileSync(packagePath)
        .toString()
        .replace('"name": "melonly"', `"name": "${appName}"`)
  
      writeFileSync(joinPath(process.cwd(), 'package.json'), packageData)
    } catch (error) {
      this.failInstallation()
    }
  }
  
  private stageInitRepository() {
    infoLine(`[${bgGreenBright('            ')}] ✓ Initializing Git repository...`)
  
    if (!runCommand('git init')) {
      this.failInstallation('You have to install Git CLI to init a repository')
    }
  }

  public handle(appName: string): void {
    this.stageGitClone(appName)

    this.stagePackagesInstall(appName)

    this.stageFilesPrepare(appName)

    if (process.argv[4] === '--git') {
      this.stageInitRepository()
    }

    infoLine(`Your project has been created. Run 'cd ${appName} && npm start' to launch your application.`)
  }
}
