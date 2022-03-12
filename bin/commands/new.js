"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const removeDirectory_1 = require("../util/removeDirectory");
const runCommand_1 = require("../util/runCommand");
const infoLine_1 = require("../util/infoLine");
const errorLine_1 = require("../util/errorLine");
exports.default = () => {
    const appName = process.argv[3];
    (0, infoLine_1.infoLine)(`Creating new project '${appName}'...`);
    if (!(0, runCommand_1.runCommand)(`git clone https://github.com/Doc077/melonly.git ${appName}`)) {
        (0, errorLine_1.errorLine)('Installation failed');
        process.exit(1);
    }
    (0, infoLine_1.infoLine)('Installing packages...');
    process.chdir(appName);
    if (!(0, runCommand_1.runCommand)('npm install')) {
        (0, errorLine_1.errorLine)('Installation failed');
        process.exit(1);
    }
    (0, removeDirectory_1.removeDirectory)((0, path_1.join)(process.cwd(), '.git'));
    (0, infoLine_1.infoLine)('Extracting new files...');
    (0, fs_1.copyFileSync)((0, path_1.join)(process.cwd(), '.env.example'), (0, path_1.join)(process.cwd(), '.env'));
    try {
        let packageData = (0, fs_1.readFileSync)((0, path_1.join)(process.cwd(), 'package.json')).toString();
        packageData = packageData.replace('"name": "melonly"', `"name": "${appName}"`);
        (0, fs_1.writeFileSync)((0, path_1.join)(process.cwd(), 'package.json'), packageData, (error) => {
            if (error) {
                (0, errorLine_1.errorLine)('Installation failed');
                process.exit(1);
            }
        });
    }
    catch (error) {
        (0, errorLine_1.errorLine)('Installation failed');
        process.exit(1);
    }
    (0, infoLine_1.infoLine)(`Your project has been created. Run 'cd ${appName} && npm start' to start your application.`);
};
