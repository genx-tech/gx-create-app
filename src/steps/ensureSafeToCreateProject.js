const path = require('path');
const { fs } = require('@genx/sys');

const exitWithError = require('./exitWithError');

module.exports = (app, arrayConflitFiles, { targetPath }) => {    
    const conflicts = [];

    arrayConflitFiles.forEach(file => {
        const filePath = path.join(targetPath, file);

        if (fs.existsSync(filePath)) {
            conflicts.push(file);
        }
    });

    if (conflicts.length > 0) {
        exitWithError(`The target path [${targetPath}] contains files that could conflict:\n  - ` + conflicts.join('\n  - '));
    }
}