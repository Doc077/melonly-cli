import open from 'open'

export class OpenCommand {
  public handle(): void {
    open(process.argv[3])
  }
}
