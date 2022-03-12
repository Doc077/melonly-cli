import cli from 'cli-color'

export const errorLine = (text: string) => {
    console.error(cli.redBright(text))
}
