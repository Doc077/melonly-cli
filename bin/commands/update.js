"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runCommand_1 = require("../util/runCommand");
const infoLine_1 = require("../util/infoLine");
const errorLine_1 = require("../util/errorLine");
exports.default = () => {
    if (!(0, runCommand_1.runCommand)('npm install -g @melonly/cli')) {
        (0, errorLine_1.errorLine)('Connection failed');
    }
    (0, infoLine_1.infoLine)('Melonly CLI has been updated');
};
