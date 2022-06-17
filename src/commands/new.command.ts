import { copyFileSync, readFileSync, unlinkSync, writeFileSync } from 'fs'
import { join as joinPath } from 'path'
import { bgGreenBright } from 'cli-color'
import { Command } from '../decorators/command.decorator'
import { errorLine } from '../utils/error-line.function'
import { infoLine } from '../utils/info-line.function'
import { publishTemplate } from '../utils/publish-template.function'
import { removeDirectory } from '../utils/remove-directory.function'
import { runCommand } from '../utils/run-command.function'

@Command({
  parameters: ['name'],
})
export class NewCommand {
  private currentDirectory = process.cwd()

  private clearLine(): void {
    process.stdout.moveCursor(0, -1)
    process.stdout.clearLine(1)
  }

  private failInstallation(message?: string): void {
    errorLine(message ?? 'Installation failed')
  
    process.exit(1)
  }
  
  private stageGitClone(appName: string): void {
    infoLine(`[${bgGreenBright('   ')}         ] ✓ Creating new project '${appName}'...`)
  
    if (!runCommand(`git clone https://github.com/Doc077/melonly.git ${appName}`)) {
      this.failInstallation('Connection failed')
    }
  
    removeDirectory(joinPath(this.currentDirectory, appName, '.git'))
  }
  
  private stagePackagesInstall(appName: string): void {
    this.clearLine()

    infoLine(`[${bgGreenBright('      ')}      ] ✓ Installing packages...`)
  
    process.chdir(appName)
    this.currentDirectory = process.cwd()
  
    if (!runCommand('npm install')) {
      this.failInstallation('Installing packages failed')
    }
  }
  
  private stageFilesPrepare(appName: string): void {
    this.clearLine()

    infoLine(`[${bgGreenBright('         ')}   ] ✓ Copying new files...`)
  
    copyFileSync(joinPath(this.currentDirectory, '.env.example'), joinPath(this.currentDirectory, '.env'))
  
    try {
      const packagePath = joinPath(this.currentDirectory, 'package.json')
  
      const packageData = readFileSync(packagePath)
        .toString()
        .replace('"name": "melonly"', `"name": "${appName}"`)
  
      writeFileSync(joinPath(this.currentDirectory, 'package.json'), packageData)
    } catch (error) {
      this.failInstallation()
    }
  }
  
  private stageInitTemplate(type?: string) {
    this.clearLine()

    infoLine(`[${bgGreenBright('            ')}] ✓ Applying template...`)
  
    switch (type) {
      case 'vue':
        publishTemplate(joinPath(this.currentDirectory, 'resources', 'vite.config.js'), 'starters.vite-vue')

        /**
         * Delete unused files and create Vue-specific ones
         */

        unlinkSync(joinPath(this.currentDirectory, 'public', 'main.js'))
        unlinkSync(joinPath(this.currentDirectory, 'views', 'home.melon.html'))

        publishTemplate(joinPath(this.currentDirectory, 'resources', 'vue', 'main.js'), 'starters.script-vue')
        publishTemplate(joinPath(this.currentDirectory, 'resources', 'vue', 'App.vue'), 'starters.component-vue')
        publishTemplate(joinPath(this.currentDirectory, 'views', 'home.melon.html'), 'starters.home-vue')

        /**
         * Create client-side package.json and
         * install required dependencies
         */

        process.chdir('resources')

        this.currentDirectory = process.cwd()

        publishTemplate(joinPath(this.currentDirectory, 'package.json'), 'starters.package-vue')

        if (!runCommand('npm install -D vue vite @vitejs/plugin-vue')) {
          this.failInstallation('Installing packages failed')
        }

        break

      default:
        this.failInstallation(`Invalid template type. Try '--template=vue'`)
    }
  }

  public handle(appName: string): void {
    this.stageGitClone(appName)
    this.stagePackagesInstall(appName)
    this.stageFilesPrepare(appName)

    if (process.argv[4]) {
      const match = process.argv[4].match(/\-\-template=([a-z]*)/) ?? []

      this.stageInitTemplate(match[1])
    }

    infoLine(`Your project has been created. Run 'cd ${appName} && npm start' to launch your application.`)
  }
}
