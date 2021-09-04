const path = require("path");
const { fs } = require("@genx/sys");

const templatePath = path.resolve(__dirname, '../../templates/optional');

module.exports = async (app, targetPath, options) => {
    if (options.disablePackageLock) {
        const sourceFile = path.join(templatePath, '.npmrc');
        const destFile = path.join(targetPath, '.npmrc');
        await fs.copyFile(sourceFile, destFile);
        app.log('info', `Added .npmrc to disable generation of package-lock.json`);       
    } 
}