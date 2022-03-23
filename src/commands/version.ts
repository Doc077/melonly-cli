import { infoLine } from '../util/infoLine'

export default () => {
  const version = require('../../package.json').version

  infoLine(`Melonly CLI v${version}`)
}
