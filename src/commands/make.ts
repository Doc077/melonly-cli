import { join } from 'path'
import { errorLine } from '../util/errorLine'
import { infoLine } from '../util/infoLine'
import { publishTemplate } from '../util/publishTemplate'

export default () => {
  const generatedType = process.argv[3]
  const generatedName = process.argv[4]

  switch (generatedType) {
    case 'channel':
      publishTemplate(
        join(process.cwd(), 'src', 'broadcasting', `${generatedName}.channel.ts`),

        'channel',
        {
          className: `${generatedName.charAt(0).toUpperCase()}${generatedName.slice(1)}Channel`,
          name: `${generatedName}`,
        },
      )

      break

    case 'controller':
      publishTemplate(
        join(process.cwd(), 'src', generatedName, `${generatedName}.controller.ts`),

        'controller',
        {
          className: `${generatedName.charAt(0).toUpperCase()}${generatedName.slice(1)}Controller`,
          path: `${generatedName}s`,
          view: `${generatedName}`,
        },
      )

      break

    case 'email':
      publishTemplate(
        join(process.cwd(), 'src', 'mail', `${generatedName}.email.ts`),

        'email',
        {
          className: `${generatedName.charAt(0).toUpperCase()}${generatedName.slice(1)}Email`,
          view: `${generatedName}`,
        },
      )

      break

    case 'service':
      publishTemplate(
        join(process.cwd(), 'src', generatedName, `${generatedName}.service.ts`),

        'service',
        {
          className: `${generatedName.charAt(0).toUpperCase()}${generatedName.slice(1)}Service`,
        },
      )

      break

    case 'test':
      publishTemplate(
        join(process.cwd(), 'tests', `${generatedName}.test.ts`),

        'test',
        { name: `${generatedName}` },
      )

      break

    default:
      errorLine(`Unknown generator command '${generatedType}'`)

      return
  }

  infoLine(`Generated new ${generatedType} '${generatedName}'`)
}
