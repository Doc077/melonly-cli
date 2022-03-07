#!/usr/bin/env node

const { errorLine } = require('./util/errorLine')

const commandsCommand = require('./commands/commands')
const makeCommand = require('./commands/make')
const newCommand = require('./commands/new')
const openCommand = require('./commands/open')
const updateCommand = require('./commands/update')
const versionCommand = require('./commands/version')

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
