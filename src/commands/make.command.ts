import { join as joinPath } from 'path'
import { Command } from '../decorators/command.decorator'
import { errorLine } from '../utils/error-line.function'
import { infoLine } from '../utils/info-line.function'
import { pascalCase } from '../utils/pascal-case.function'
import { publishTemplate } from '../utils/publish-template.function'

@Command({
  parameters: ['type', 'name'],
})
export class MakeCommand {
  public handle(type: string, name: string): void {
    switch (type) {
      case 'channel':
        publishTemplate(
          joinPath(process.cwd(), 'src', 'channels', `${name}.channel.ts`),

          'channel',
          {
            className: `${pascalCase(name)}Channel`,
            name: name,
          },
        )

        break

      case 'controller':
        publishTemplate(
          joinPath(process.cwd(), 'src', 'controllers', `${name}.controller.ts`),

          'controller',
          {
            className: `${pascalCase(name)}Controller`,
            path: `${name}s`,
            view: name,
          },
        )

        break

      case 'email':
        publishTemplate(
          joinPath(process.cwd(), 'src', 'emails', `${name}.email.ts`),

          'email',
          {
            className: `${pascalCase(name)}Email`,
            view: name,
          },
        )

        publishTemplate(
          joinPath(process.cwd(), 'views', 'emails', `${name}.melon.html`),

          'email-view',
        )

        break

      case 'model':
        publishTemplate(
          joinPath(process.cwd(), 'src', 'models', `${name}.model.ts`),

          'model',
          {
            className: `${pascalCase(name)}`,
          },
        )

        break

      case 'service':
        publishTemplate(
          joinPath(process.cwd(), 'src', 'services', `${name}.service.ts`),

          'service',
          {
            className: `${pascalCase(name)}Service`,
          },
        )

        break

      case 'test':
        publishTemplate(
          joinPath(process.cwd(), 'tests', `${name}.test.ts`), 'test', {
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
