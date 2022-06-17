import { infoLine } from '../utils/info-line.function'

export class VersionCommand {
  public handle(): void {
    const version = require('../../package.json').version

    infoLine(`Melonly CLI v${version}`)
  }
}
