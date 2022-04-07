import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { dirname } from 'path'
import { errorLine } from './errorLine'

export const makeFile = (path: string, content: string) => {
  if (!existsSync(path)) {
    mkdirSync(dirname(path), {
      recursive: true,
    })
  } else {
    errorLine('File already exists')

    process.exit(1)
  }

  try {
    writeFileSync(path, content)
  } catch (error) {
    errorLine('Unable to create new file')

    process.exit(1)
  }
}
