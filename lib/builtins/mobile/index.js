"use strict";

require("source-map-support/register");

const path = require("path");

const {
  fs
} = require("@genx/sys");

const localConfig = require("./config");

const {
  steps,
  packageConfig
} = require("../..");

const getTemplatePath = require("../../utils/getTemplatePath");

const copyFileFromTemplate_ = require("../../utils/copyFileFromTemplate_");

module.exports = async (app, options) => {
  const appNameLowerCase = options.appName.toLowerCase();
  options = { ...localConfig,
    ...options,
    appNameLowerCase
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
    await fs.unlink(path.join(targetPath, "package-lock.json"));
  }

  const templatePath = getTemplatePath(options.appMode);
  await steps.removeFiles_(app, targetPath, [".prettierrc.js", "App.js", "index.js"]);
  await steps.copyFilesFromTemplate_(app, templatePath, targetPath, options);
  const fileMainActivity = `android/app/src/main/java/com/${appNameLowerCase}/MainActivity.java`;
  await copyFileFromTemplate_(path.join(__dirname, "changes/MainActivity.java.tpl"), path.join(targetPath, fileMainActivity), options);
  app.log('info', `Updated ${fileMainActivity}`);
  await steps.createOptionalFiles_(app, targetPath, options);
  await steps.updatePackageJson_(app, targetPath, config => {
    packageConfig.addPackages(config, options);
    packageConfig.addConfig(config, options);
    packageConfig.addNpmScripts(config, options);
  });
  await steps.npmInstall_(app, targetPath, options);
  await steps.runCommand_(app, targetPath, 'npm run pod');
  await steps.runCommand_(app, targetPath, 'npm run link');
};
//# sourceMappingURL=index.js.map