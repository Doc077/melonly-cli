#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorLine_1 = require("./util/errorLine");
const commands_1 = __importDefault(require("./commands/commands"));
const make_1 = __importDefault(require("./commands/make"));
const new_1 = __importDefault(require("./commands/new"));
const open_1 = __importDefault(require("./commands/open"));
const start_1 = __importDefault(require("./commands/start"));
const update_1 = __importDefault(require("./commands/update"));
const version_1 = __importDefault(require("./commands/version"));
switch (process.argv[2]) {
    case 'new':
        (0, new_1.default)();
        break;
    case 'make':
        (0, make_1.default)();
        break;
    case 'open':
        (0, open_1.default)();
        break;
    case 'start':
        (0, start_1.default)();
        break;
    case 'update':
        (0, update_1.default)();
        break;
    case 'version':
    case '--version':
    case '-v':
        (0, version_1.default)();
        break;
    case 'commands':
    case undefined:
        (0, commands_1.default)();
        break;
    default:
        (0, errorLine_1.errorLine)(`Unknown command. Run 'melon commands' to get list of available commands.`);
}
