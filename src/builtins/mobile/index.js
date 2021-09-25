const path = require("path");
const { fs } = require('@genx/sys'); 
const localConfig = require("./config");
const { steps, packageConfig } = require("../..");
const getTemplatePath = require("../../utils/getTemplatePath");

module.exports = async (app, options) => {
    options = {
        ...localConfig,
        ...options
    };

    const targetPath = path.join(options.workingPath, options.appDir);
    let cmd = `npx react-native init ${options.appName} --npm`;
    let cwd;
    
    if (!fs.existsSync(targetPath)) {
        cwd = options.workingPath;
        cmd += ` --directory ${options.appDir}`;        
    } else {
        cwd = targetPath;
        cmd += ` --directory .`;        
    }   
    
    await steps.runCommand_(app, cwd, cmd, true);

    if (options.disablePackageLock) {
        await fs.unlink(path.join(targetPath, 'package-lock.json'));
    }

    const templatePath = getTemplatePath(options.appMode);

    await steps.removeFiles_(app, targetPath, [
        '.prettierrc.js',
        'App.js',
        'index.js'
    ]);

    await steps.copyFilesFromTemplate_(app, templatePath, targetPath, options);

    await steps.createOptionalFiles_(app, targetPath, options);

    await steps.updatePackageJson_(app, targetPath, (config) => {
        packageConfig.addPackages(config, options);
        packageConfig.addConfig(config, options);
        packageConfig.addNpmScripts(config, options);
    });    

    await steps.npmInstall_(app, targetPath, options);
};
