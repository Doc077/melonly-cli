"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDirectory = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const removeDirectory = (path) => {
    if ((0, fs_1.existsSync)(path)) {
        const files = (0, fs_1.readdirSync)(path);
        if (files.length > 0) {
            files.forEach((filename) => {
                const filePath = (0, path_1.join)(path, filename);
                (0, fs_1.statSync)(filePath).isDirectory()
                    ? (0, exports.removeDirectory)(filePath)
                    : (0, fs_1.unlinkSync)(filePath);
            });
        }
        (0, fs_1.rmdirSync)(path);
    }
};
exports.removeDirectory = removeDirectory;
