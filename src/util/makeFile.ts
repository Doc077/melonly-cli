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

  writeFileSync(path, content)
}
