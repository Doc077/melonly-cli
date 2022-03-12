"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFile = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const errorLine_1 = require("./errorLine");
const makeFile = (path, content) => {
    if (!(0, fs_1.existsSync)(path)) {
        (0, fs_1.mkdirSync)((0, path_1.dirname)(path), {
            recursive: true,
        });
    }
    else {
        (0, errorLine_1.errorLine)('File already exists');
        process.exit(1);
    }
    (0, fs_1.writeFileSync)(path, content);
};
exports.makeFile = makeFile;
