const path = require('path');
const { _, fs, getValueByPath, setValueByPath } = require('rk-utils');
const shell = require('shelljs');
const DefaultInit = require('./default');
const { getLatestNpmPkgVer, ensureDependency } = require('../utils');

/**
 * app config
 * targetLTSVersion: default as "12.0"
 */

class AppInit extends DefaultInit {
    constructor(owner, name, root, mergeMode, config) {
        if (mergeMode) {            
            root = path.join(root, 'app_modules', name);
        }

        super(owner, name, root, mergeMode, config);

        this.confPrefix = 'app';
    }

    async getDependencies_() {
        return {                        
            "@genx/server": getLatestNpmPkgVer('@genx/server')
        };
    }

    async getDevDependencies_() {
        return {
            "@babel/cli": "^7.8.4",
            "@babel/core": "^7.8.4",
            "@babel/node": "^7.8.4",
            "@babel/preset-env": "^7.8.4",
            "del-cli": "^3.0.0",            
            "mocha": "^7.0.1",
            "nyc": "^15.0.0",
            "should": "^13.2.3",
            "supertest": "^4.0.2"
        };
    }

    async createFiles_() {
        await super.createFiles_();   
        
        this.ensureDirs([
            'conf',
            'src',
            'test'
        ]);

        await this.createConfig_();
        this.copyFileFromTemplate('app/controllers/index.js', 'src/controllers/index.js');
        this.createFileByTemplate('app/babel.config.js.swig', '/babel.config.js', { targetLTSVersion: this.config.targetLTSVersion || "12.0" });        

        if (this.mergeMode) {        
            const lernaRelativePath = '../../lerna.json';    

            if (!fs.existsSync(path.resolve(this.appRoot, lernaRelativePath))) {
                this.copyFileFromTemplate('server/lerna.json', lernaRelativePath);
            }
        }
    }

    async updateFiles_() {
        await super.updateFiles_();   

        if (this.mergeMode) {    
            //add app routing             
            const serverConfigPath = path.resolve(this.appRoot, '../../conf/server.default.json');
            
            if (!fs.existsSync(serverConfigPath)) {
                throw new Error(`Server config "${serverConfigPath}" not found.`);
            }

            const serverConfig = fs.readJsonSync(serverConfigPath, 'utf8');
            let mountAt = _.findKey(serverConfig.appRouting, mount => mount.name === this.appName);

            if (!mountAt) {
                mountAt = "/" + this.appName;
                if (!serverConfig.appRouting) {
                    serverConfig.appRouting = {};
                } else if (mountAt in serverConfig.appRouting) {
                    throw new Error(`Default route for app module "${this.appName}" has been occupied.`);
                }

                serverConfig.appRouting[mountAt] = {
                    name: this.appName,
                    options: {}
                };

                fs.writeJsonSync(serverConfigPath, serverConfig, {spaces: 4});
                this.logUpdatedFile(serverConfigPath);
            }

            //add app modules build scripts to server scripts
            const packageConfigPath = path.resolve(this.appRoot, '../../package.json');
            const packageConfig = fs.readJsonSync(packageConfigPath, 'utf8');

            let scriptBuild = getValueByPath(packageConfig, 'scripts.build', 'npm run build:server');
            let scriptBuildProd = getValueByPath(packageConfig, 'scripts.build:prod', 'npm run build:server:prod');
            let scriptPostInstall = getValueByPath(packageConfig, 'scripts.postinstall', 'lerna bootstrap && link-parent-bin');

            if (scriptBuild.indexOf(" && lerna") === -1) {
                scriptBuild += " && lerna run --parallel build";
            }

            if (scriptBuildProd.indexOf(" && lerna") === -1) {
                scriptBuildProd += " && lerna run --parallel build:prod";
            }

            if (scriptPostInstall.indexOf("lerna bootstrap && link-parent-bin") === -1) {
                scriptPostInstall += " && lerna bootstrap && link-parent-bin";
            }

            packageConfig.scripts['build'] = scriptBuild;
            packageConfig.scripts['build:prod'] = scriptBuildProd;
            packageConfig.scripts['postinstall'] = scriptPostInstall;

            //add dev dependency
            ensureDependency(packageConfig.devDependencies, 'lerna');
            ensureDependency(packageConfig.devDependencies, 'link-parent-bin');

            fs.writeJsonSync(packageConfigPath, packageConfig, {spaces: 4});
            this.logUpdatedFile(packageConfigPath);
        }
    }

    async installDeps_() {
        if (this.mergeMode) {
            shell.cd(path.resolve(this.appRoot, '../..'));
        }

        return super.installDeps_();
    }

    async createConfig_() {
        const configJson = await this.getConfig_();

        const fileName = `${this.confPrefix}.default.json`;

        fs.writeFileSync(
            path.join(this.appRoot, 'conf', fileName),
            JSON.stringify(configJson, null, 4));

        this.logCreatedFile(fileName);
    }

    async getConfig_() {
        return {            
            "middlewares": [
                "koa-body",
                "koa-override"
            ],
            "routing": {                          
                "/": "index.home"
            }
        };
    }
}

module.exports = AppInit;