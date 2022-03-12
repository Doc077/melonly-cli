import { infoLine } from '../util/infoLine'

export default () => {
    const version = require('../../package.json').version

    infoLine(`Melonly cli v${version}`)
}
