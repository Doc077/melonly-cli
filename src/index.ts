#!/usr/bin/env node

import { errorLine } from './util/errorLine'

import commandsCommand from './commands/commands'
import makeCommand from './commands/make'
import newCommand from './commands/new'
import openCommand from './commands/open'
import startCommand from './commands/start'
import updateCommand from './commands/update'
import versionCommand from './commands/version'

switch (process.argv[2]) {
    case 'new':
        newCommand()

        break

    case 'make':
        makeCommand()

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

    case 'version':
    case '--version':
    case '-v':
        versionCommand()

        break

    case 'commands':
    case undefined:
        commandsCommand()

        break

    default:
        errorLine(`Unknown command. Run 'melon commands' to get list of available commands.`)
}
