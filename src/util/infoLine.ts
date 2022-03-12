import cli from 'cli-color'

export const infoLine = (text: string) => {
    console.log(cli.green(text))
}
