import { infoLine } from '../utils/infoLine'

export class CommandsCommand {
  public handle(): void {
    infoLine('Available commands:')

    console.table([
      {
        command: 'commands',
        description: 'Get available CLI commands',
      },
      {
        command: 'make',
        description: 'Generate new file',
        arguments: '{type} {name}',
      },
      {
        command: 'migrate',
        description: 'Run database migrations',
      },
      {
        command: 'new',
        description: 'Create a new Melonly project',
        arguments: '{name}',
      },
      {
        command: 'start',
        description: 'Run application',
      },
      {
        command: 'update',
        description: 'Update Melon CLI',
      },
      {
        command: 'version',
        description: 'Get Melon CLI version',
      },
    ])
  }
}
