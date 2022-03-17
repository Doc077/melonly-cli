import { errorLine } from '../util/errorLine'
import { infoLine } from '../util/infoLine'
import { runCommand } from '../util/runCommand'

export default () => {
    if (!runCommand('npm install -g @melonly/cli')) {
        errorLine('Connection failed')
    }

    infoLine('Melonly CLI has been updated')
}
