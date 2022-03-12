import { runCommand } from '../util/runCommand'
import { infoLine } from '../util/infoLine'
import { errorLine } from '../util/errorLine'

export default () => {
    if (!runCommand('npm install -g @melonly/cli')) {
        errorLine('Connection failed')
    }

    infoLine('Melonly CLI has been updated')
}
