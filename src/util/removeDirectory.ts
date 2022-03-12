import { existsSync, statSync, unlinkSync, rmdirSync, readdirSync } from 'fs'
import { join } from 'path'

export const removeDirectory = (path: string) => {
    if (existsSync(path)) {
        const files = readdirSync(path)
    
        if (files.length > 0) {
            files.forEach((filename) => {
                const filePath = join(path, filename)

                statSync(filePath).isDirectory()
                    ? removeDirectory(filePath)
                    : unlinkSync(filePath)
            })
        }

        rmdirSync(path)
    }
}