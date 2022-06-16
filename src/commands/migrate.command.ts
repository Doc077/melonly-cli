import { infoLine } from '../utils/infoLine'

export class MigrateCommand {
  public handle(): void {
    infoLine('Running migrations...')
  }
}
