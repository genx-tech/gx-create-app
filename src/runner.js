const path = require('path');
const { fs } = require('@genx/sys');

const { appModes } = require('./modes');
const exitWithError = require('./steps/exitWithError');

module.exports = async (app) => {
    const cmd = app.commandLine;

    if (cmd.option('help')) {
        cmd.showUsage();
        return;
    }

    if (cmd.option('version')) {
        console.log(pkg.version);
        return;
    }        

    const appDir = cmd.argv._[0];
    const appName = cmd.option('name');
    const appMode = cmd.option('mode');

    if (appName.indexOf(' ') !== -1) {
        exitWithError('App name should not contain any space character.');
    }

    if (appName.split('/').length > 2) {
        exitWithError('App name should not contain more than one "/" character.');
    }

    if (!appModes.includes(appMode)) {
        exitWithError(`Unsupported app mode: ${appMode}`);
    }

    const targetPath = path.resolve(process.cwd(), appDir);    
    try {
        fs.ensureDirSync(targetPath);
    } catch (error) {
        exitWithError(error.message);
    }   
    
    let config;
    const configFile = cmd.option('config');
    if (configFile && fs.existsSync(configFile)) {
        config = fs.readJsonSync(configFile);
    } 
    
    let init_;

    if (appMode.indexOf('://') > 0) {
        //remote boilerplate

    } else {
        init_ = require(`./builtins/${appMode}`);
    }

    const context = {
        ...config,    
        appName,
        targetPath
    };

    return init_(app, context);
}