import { infoLine } from '../utils/info-line.function'

export class MigrateCommand {
  public handle(): void {
    infoLine('Running migrations...')
  }
}
