import { redBright } from 'cli-color'

export const errorLine = (text: string) => {
  console.error(redBright(text))
}
