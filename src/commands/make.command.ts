import { readFileSync, writeFileSync } from 'fs'
import { join as joinPath } from 'path'
import { pluralize } from 'inflection'
import { Command } from '../decorators/command.decorator'
import { errorLine } from '../utils/error-line.function'
import { infoLine } from '../utils/info-line.function'
import { pascalCase } from '../utils/pascal-case.function'
import { publishTemplate } from '../utils/publish-template.function'

@Command({
  parameters: ['type', 'name'],
})
export class MakeCommand {
  private currentDirectory = process.cwd()

  public handle(type: string, name: string): void {
    switch (type) {
      case 'channel':
        const channelClassName = `${pascalCase(name)}Channel`

        publishTemplate(
          joinPath(this.currentDirectory, 'src', 'channels', `${name}.channel.ts`),

          'channel',
          {
            className: channelClassName,
            name,
          },
        )

        /**
         * Register channel in main.ts file
         */

        try {
          const path = joinPath(this.currentDirectory, 'src', 'main.ts')
      
          let data = readFileSync(path).toString()

          const inlineMatch = data.match(/channels: *?(\[(.*?),?\])/) ?? []
          const multilineMatch = data.match(/channels: *?(\[((.|[\n\r])*?),?\])/m) ?? []
          const importMatch = data.match(/^(import .*?(\n|\r\n))$/m) ?? []

          data = data.replace(inlineMatch[1], `[${inlineMatch[2] ? inlineMatch[2] + ', ' : inlineMatch[2]}${channelClassName}]`)
            .replace(multilineMatch[1], `[${multilineMatch[2]}  ${channelClassName},\n  ]`)
            .replace(importMatch[0], `${importMatch[1]}import { ${channelClassName} } from './channels/${name}.channel'\n`)

          writeFileSync(joinPath(this.currentDirectory, 'src', 'main.ts'), data)
        } catch (error) {
          errorLine('Cannot register channel automatically')
        }

        break

      case 'controller':
        const controllerClassName = `${pascalCase(name)}Controller`

        publishTemplate(
          joinPath(this.currentDirectory, 'src', 'controllers', `${name}.controller.ts`),

          'controller',
          {
            className: controllerClassName,
            path: pluralize(name),
            view: pluralize(name),
          },
        )

        /**
         * Register controller in main.ts file
         */

        try {
          const path = joinPath(this.currentDirectory, 'src', 'main.ts')
      
          let data = readFileSync(path).toString()

          const inlineMatch = data.match(/controllers: *?(\[(.*?),?\])/) ?? []
          const multilineMatch = data.match(/controllers: *?(\[((.|[\n\r])*?),?\])/m) ?? []
          const importMatch = data.match(/^(import .*?(\n|\r\n))$/m) ?? []

          data = data.replace(inlineMatch[1], `[${inlineMatch[2] ? inlineMatch[2] + ', ' : inlineMatch[2]}${controllerClassName}]`)
            .replace(multilineMatch[1], `[${multilineMatch[2]}  ${controllerClassName},\n  ]`)
            .replace(importMatch[0], `${importMatch[1]}import { ${controllerClassName} } from './controllers/${name}.controller'\n`)

          writeFileSync(joinPath(this.currentDirectory, 'src', 'main.ts'), data)
        } catch (error) {
          errorLine('Cannot register controller automatically')
        }

        break

      case 'email':
        publishTemplate(
          joinPath(this.currentDirectory, 'src', 'emails', `${name}.email.ts`),

          'email',
          {
            className: `${pascalCase(name)}Email`,
            view: name,
          },
        )

        publishTemplate(
          joinPath(this.currentDirectory, 'views', 'emails', `${name}.melon.html`),

          'email-view',
        )

        break

      case 'model':
        publishTemplate(
          joinPath(this.currentDirectory, 'src', 'models', `${name}.model.ts`),

          'model',
          {
            className: `${pascalCase(name)}`,
          },
        )

        break

      case 'service':
        publishTemplate(
          joinPath(this.currentDirectory, 'src', 'services', `${name}.service.ts`),

          'service',
          {
            className: `${pascalCase(name)}Service`,
          },
        )

        break

      case 'test':
        publishTemplate(
          joinPath(this.currentDirectory, 'tests', `${name}.test.ts`), 'test', {
            name: name
          },
        )

        break

      default:
        errorLine(`Unknown generator command '${type}'`)

        return
    }

    infoLine(`Generated new ${type} '${name}'`)
  }
}
