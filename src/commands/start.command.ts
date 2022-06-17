import { runCommand } from '../utils/run-command.function'

export class StartCommand {
  public handle(): void {
    runCommand('npm start')
  }
}
