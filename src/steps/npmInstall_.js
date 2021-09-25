const runCommand_ = require('./runCommand_');

module.exports = async (app, targetPath, options) => {
    if (!options.skipNpmInstall) {
        await runCommand_(app, targetPath, 'npm install');
    }
}