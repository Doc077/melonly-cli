import { join } from 'path'
import { readFileSync } from 'fs'
import { makeFile } from './makeFile'
import { errorLine } from './errorLine'

export const publishTemplate = (
    path: string,
    template: string,
    variables: { [key: string]: string },
) => {
    try {
        let data = readFileSync(
            join(__dirname, '..', '..', 'assets', 'templates', `${template}.txt`),
        ).toString()

        for (const expression of data.matchAll(/([^@])\{\{ *([^ ]*?) *\}\}/g) ?? []) {
            let variableValue = variables[expression[2]]

            data = data.replace(expression[0], expression[1] + variableValue)
        }

        makeFile(path, data)
    } catch (error) {
        errorLine('Cannot create new file')
    }
}
