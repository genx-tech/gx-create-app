const path = require('path');
const localConfig = require('./config');
const { steps } = require('../..');

module.exports = async (app, ctx) => {
    ctx = {
        ...localConfig,
        ...ctx
    };

    steps.ensureSafeToCreateProject(app, [
        "package.json"
    ], ctx);       

    const templatePath = path.resolve(__dirname, '../../../templates/server');

    await steps.copyFilesFromTemplate_(app, templatePath, ctx);   

    await steps.createOptionalFiles_(app, ctx);
};
