const path = require('path');
const { fs } = require('rk-utils');

class AppInitiator {
    constructor(context) {
        this.app = context.app;
        this.cwd = context.cwd;
        this.logger = context.logger;        
    }

    async run(appDir, appName, appMode) {
        let config;
        let configFile = this.app.commandLine.option('config');
        if (configFile && fs.existsSync(configFile)) {
            config = fs.readJsonSync(configFile);
        }

        let targetPath = path.resolve(this.cwd, appDir);        

        let mergeMode = this.app.commandLine.option('merge');

        const SpecificAppInit = require(`./modes/${appMode}`);
        let appInit = new SpecificAppInit(this, appName, targetPath, mergeMode, config || {});        
        appInit.ensureIsSafeToCreateProjectIn();

        this.logger.log('verbose', 'Creating project files ...');
        await appInit.createFiles_();

        if (mergeMode) {
            await appInit.updateFiles_();
        }

        if (!this.app.commandLine.option('skip-install')) {
            this.logger.log('verbose', 'Installing dependencies ...');
            await appInit.installDeps_();
        }
    }
}

module.exports = AppInitiator;