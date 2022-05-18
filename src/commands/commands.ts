import { infoLine } from '../utils/infoLine'

export default () => {
  infoLine('Command list:')

  console.table([
    {
      command: 'make',
      description: 'Generate new file',
      arguments: '{type} {name}',
    },
    {
      command: 'commands',
      description: 'Get available CLI commands',
    },
    {
      command: 'new',
      description: 'Create new Melonly project',
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
