const path = require("path");
const { fs } = require("@genx/sys");

const templatePath = path.resolve(__dirname, '../../templates/optional');

module.exports = async (app, ctx) => {
    if (ctx.disablePackageLock) {
        const sourceFile = path.join(templatePath, '.npmrc');
        const destFile = path.join(ctx.targetPath, '.npmrc');
        await fs.copyFile(sourceFile, destFile);
    }
}