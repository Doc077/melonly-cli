import { Constructor } from '../interfaces/constructor.interface'
import { errorLine } from './error-line.function'

interface Command {
  parameters?: string[]
  handle(...params: string[]): void
}

export const handleCommand = (name: string, commands: Record<string, Constructor>) => {
  const command: Command = new commands[name]()
  const requiredArguments = command.parameters ?? []

  const parameters: string[] = []

  requiredArguments.forEach((argument: string, index: number) => {
    const resolved = process.argv[index + 3]

    parameters.push(resolved)

    if (!resolved) {
      errorLine(`Parameter '${argument}' is required`)
  
      process.exit(1)
    }
  })

  command.handle(...parameters)
}
