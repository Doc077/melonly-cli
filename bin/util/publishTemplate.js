"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishTemplate = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const makeFile_1 = require("./makeFile");
const errorLine_1 = require("./errorLine");
const publishTemplate = (path, template, variables) => {
    var _a;
    try {
        let data = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '..', '..', 'assets', 'templates', `${template}.txt`)).toString();
        for (const expression of (_a = data.matchAll(/([^@])\{\{ *([^ ]*?) *\}\}/g)) !== null && _a !== void 0 ? _a : []) {
            let variableValue = variables[expression[2]];
            data = data.replace(expression[0], expression[1] + variableValue);
        }
        (0, makeFile_1.makeFile)(path, data);
    }
    catch (error) {
        (0, errorLine_1.errorLine)('Cannot create new file');
    }
};
exports.publishTemplate = publishTemplate;
