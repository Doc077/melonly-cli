"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const errorLine_1 = require("../util/errorLine");
const infoLine_1 = require("../util/infoLine");
const publishTemplate_1 = require("../util/publishTemplate");
exports.default = () => {
    switch (process.argv[3]) {
        case 'controller':
            (0, publishTemplate_1.publishTemplate)((0, path_1.join)(process.cwd(), 'src', process.argv[4], `${process.argv[4]}.controller.ts`), 'controller', {
                className: `${process.argv[4].charAt(0).toUpperCase()}${process.argv[4].slice(1)}Controller`,
                path: `${process.argv[4]}s`,
                view: `${process.argv[4]}`,
            });
            break;
        case 'email':
            (0, publishTemplate_1.publishTemplate)((0, path_1.join)(process.cwd(), 'src', 'mail', `${process.argv[4]}.email.ts`), 'email', {
                className: `${process.argv[4].charAt(0).toUpperCase()}${process.argv[4].slice(1)}Email`,
                view: `${process.argv[4]}`,
            });
            break;
        case 'service':
            (0, publishTemplate_1.publishTemplate)((0, path_1.join)(process.cwd(), 'src', process.argv[4], `${process.argv[4]}.service.ts`), 'service', {
                className: `${process.argv[4].charAt(0).toUpperCase()}${process.argv[4].slice(1)}Service`,
            });
            break;
        default:
            (0, errorLine_1.errorLine)(`Unknown generator command '${process.argv[3]}'`);
            return;
    }
    (0, infoLine_1.infoLine)(`Generated new ${process.argv[3]} '${process.argv[4]}'`);
};
