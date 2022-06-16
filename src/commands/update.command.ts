import { errorLine } from '../utils/errorLine'
import { infoLine } from '../utils/infoLine'
import { runCommand } from '../utils/runCommand'

export class UpdateCommand {
  public handle(): void {
    if (!runCommand('npm install -g @melonly/cli')) {
      errorLine('Connection failed')
    }
  
    infoLine('Melonly CLI has been updated')
  }
}
