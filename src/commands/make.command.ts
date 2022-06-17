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
  public handle(): void {
    const generatedType = process.argv[3]
    const generatedName = process.argv[4]

    if (!generatedType) {
      errorLine('File type is required')

      return
    }

    if (!generatedName) {
      errorLine('File name is required')

      return
    }

    switch (generatedType) {
      case 'channel':
        publishTemplate(
          joinPath(process.cwd(), 'src', 'channels', `${generatedName}.channel.ts`),

          'channel',
          {
            className: `${pascalCase(generatedName)}Channel`,
            name: generatedName,
          },
        )

        break

      case 'controller':
        publishTemplate(
          joinPath(process.cwd(), 'src', 'controllers', `${generatedName}.controller.ts`),

          'controller',
          {
            className: `${pascalCase(generatedName)}Controller`,
            path: `${generatedName}s`,
            view: generatedName,
          },
        )

        break

      case 'email':
        publishTemplate(
          joinPath(process.cwd(), 'src', 'emails', `${generatedName}.email.ts`),

          'email',
          {
            className: `${pascalCase(generatedName)}Email`,
            view: generatedName,
          },
        )

        publishTemplate(
          joinPath(process.cwd(), 'views', 'emails', `${generatedName}.melon.html`),

          'email-view',
        )

        break

      case 'model':
        publishTemplate(
          joinPath(process.cwd(), 'src', 'models', `${generatedName}.model.ts`),

          'model',
          {
            className: `${pascalCase(generatedName)}`,
          },
        )

        break

      case 'service':
        publishTemplate(
          joinPath(process.cwd(), 'src', 'services', `${generatedName}.service.ts`),

          'service',
          {
            className: `${pascalCase(generatedName)}Service`,
          },
        )

        break

      case 'test':
        publishTemplate(
          joinPath(process.cwd(), 'tests', `${generatedName}.test.ts`), 'test', {
            name: generatedName
          },
        )

        break

      default:
        errorLine(`Unknown generator command '${generatedType}'`)

        return
    }

    infoLine(`Generated new ${generatedType} '${generatedName}'`)
  }
}
