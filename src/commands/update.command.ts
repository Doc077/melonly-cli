import { errorLine } from '../utils/error-line.function'
import { infoLine } from '../utils/info-line.function'
import { runCommand } from '../utils/run-command.function'

export class UpdateCommand {
  public handle(): void {
    if (!runCommand('npm install -g @melonly/cli')) {
      errorLine('Connection failed')
    }
  
    infoLine('Melonly CLI has been updated')
  }
}
