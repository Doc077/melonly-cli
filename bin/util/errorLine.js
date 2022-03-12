"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLine = void 0;
const cli_color_1 = __importDefault(require("cli-color"));
const errorLine = (text) => {
    console.error(cli_color_1.default.redBright(text));
};
exports.errorLine = errorLine;
