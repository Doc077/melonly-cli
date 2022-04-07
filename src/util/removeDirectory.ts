import { existsSync, statSync, unlinkSync, rmdirSync, readdirSync } from 'fs'
import { join as joinPath } from 'path'

export const removeDirectory = (path: string) => {
  if (existsSync(path)) {
    const files = readdirSync(path)

    if (files.length > 0) {
      files.forEach((filename) => {
        const filePath = joinPath(path, filename)

        statSync(filePath).isDirectory()
          ? removeDirectory(filePath)
          : unlinkSync(filePath)
      })
    }

    rmdirSync(path)
  }
}
