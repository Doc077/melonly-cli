import { infoLine } from '../utils/infoLine'

export default () => {
  const version = require('../../package.json').version

  infoLine(`Melonly CLI v${version}`)
}
