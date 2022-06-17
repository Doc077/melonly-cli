#!/usr/bin/env node

import { CommandsCommand } from './commands/commands.command'
import { MakeCommand } from './commands/make.command'
import { MigrateCommand } from './commands/migrate.command'
import { NewCommand } from './commands/new.command'
import { OpenCommand } from './commands/open.command'
import { StartCommand } from './commands/start.command'
import { UpdateCommand } from './commands/update.command'
import { VersionCommand } from './commands/version.command'

import { Constructor } from './interfaces/constructor.interface'
import { errorLine } from './utils/errorLine'

const commands: Record<string, Constructor> = {
  commands: CommandsCommand,
  new: NewCommand,
  make: MakeCommand,
  migrate: MigrateCommand,
  open: OpenCommand,
  start: StartCommand,
  update: UpdateCommand,
  '-v': VersionCommand,
  '--version': VersionCommand,
  version: VersionCommand,
}

const command = process.argv[2]

const handleCommand = (command: string) => {
  new commands[command]().handle()
}

commands[command as keyof object]
  ? handleCommand(command)
  : errorLine(`Invalid command. Run 'melon commands' to get list of available commands.`)
