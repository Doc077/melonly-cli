"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const infoLine_1 = require("../util/infoLine");
exports.default = () => {
    const version = require('../../package.json').version;
    (0, infoLine_1.infoLine)(`Melonly cli v${version}`);
};
