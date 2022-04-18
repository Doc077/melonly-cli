#!/usr/bin/env node

import commandsCommand from './commands/commands'
import makeCommand from './commands/make'
import migrateCommand from './commands/migrate'
import newCommand from './commands/new'
import openCommand from './commands/open'
import startCommand from './commands/start'
import updateCommand from './commands/update'
import versionCommand from './commands/version'

import { errorLine } from './util/errorLine'

const command = process.argv[2]

switch (command) {
  case 'new':
    newCommand()

    break

  case 'make':
    makeCommand()

    break

  case 'migrate':
    migrateCommand()

    break

  case 'open':
    openCommand()

    break

  case 'start':
    startCommand()

    break

  case 'update':
    updateCommand()

    break

  case '-v':
  case '--version':
  case 'version':
    versionCommand()

    break

  case 'commands':
  case undefined:
    commandsCommand()

    break

  default:
    errorLine(`Invalid command. Run 'melon commands' to get list of available commands.`)
}
