import { readFileSync } from 'fs'
import { join } from 'path'
import { errorLine } from './errorLine'
import { makeFile } from './makeFile'

export interface ViewVariables {
  [key: string]: any
}

export const publishTemplate = (path: string, template: string, variables: ViewVariables) => {
  try {
    let content = readFileSync(join(__dirname, '..', '..', 'assets', 'templates', `${template}.txt`)).toString()

    for (const expression of content.matchAll(/([^@])\{\{ *([^ ]*?) *\}\}/g) ?? []) {
      let variableValue = variables[expression[2]]

      content = content.replace(expression[0], expression[1] + variableValue)
    }

    makeFile(path, content)
  } catch (error) {
    errorLine('Cannot create a file')
  }
}
