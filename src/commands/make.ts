import { join as joinPath } from 'path'
import { errorLine } from '../util/errorLine'
import { infoLine } from '../util/infoLine'
import { publishTemplate } from '../util/publishTemplate'

export default () => {
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
          className: `${generatedName.charAt(0).toUpperCase()}${generatedName.slice(1)}Channel`,
          name: generatedName,
        },
      )

      break

    case 'controller':
      publishTemplate(
        joinPath(process.cwd(), 'src', 'controllers', `${generatedName}.controller.ts`),

        'controller',
        {
          className: `${generatedName.charAt(0).toUpperCase()}${generatedName.slice(1)}Controller`,
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
          className: `${generatedName.charAt(0).toUpperCase()}${generatedName.slice(1)}Email`,
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
          className: `${generatedName.charAt(0).toUpperCase()}${generatedName.slice(1)}`,
        },
      )

      break

    case 'service':
      publishTemplate(
        joinPath(process.cwd(), 'src', 'services', `${generatedName}.service.ts`),

        'service',
        {
          className: `${generatedName.charAt(0).toUpperCase()}${generatedName.slice(1)}Service`,
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
