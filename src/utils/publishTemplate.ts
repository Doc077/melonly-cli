import { readFileSync } from 'fs'
import { join as joinPath } from 'path'
import { errorLine } from './errorLine'
import { makeFile } from './makeFile'

export interface ViewVariables {
  [key: string]: any
}

export const publishTemplate = (path: string, template: string, variables: Record<string, any> = {}) => {
  const variablePattern = /([^@])\{\{ *([^ ]*?) *\}\}/g

  try {
    let content = readFileSync(joinPath(__dirname, '..', '..', 'assets', 'templates', `${template}.txt`)).toString()

    for (const expression of content.matchAll(variablePattern) ?? []) {
      let variableValue = variables[expression[2]]

      content = content.replace(expression[0], expression[1] + variableValue)
    }

    makeFile(path, content)
  } catch (error) {
    errorLine('Cannot publish a new file')
  }
}
