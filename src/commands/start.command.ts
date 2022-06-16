import { runCommand } from '../utils/runCommand'

export class StartCommand {
  public handle(): void {
    runCommand('npm start')
  }
}
