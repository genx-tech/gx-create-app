const path = require("path");
const { fs, glob } = require("@genx/sys");
const { eachAsync_ } = require("@genx/july");

const copyFileFromTemplate_ = require("./copyFileFromTemplate_");

module.exports = async (app, templatePath, ctx) => {
    const files = await glob('**/*.*', { cwd: templatePath, dot: true });
    await eachAsync_(files, async (relativePath) => {   
        console.log(relativePath);       
        let sourceFile = path.join(templatePath, relativePath);
        let destFile = path.join(ctx.targetPath, relativePath);

        const ls = await fs.lstat(sourceFile);
        if (ls.isDirectory()) {
            await fs.ensureDir(destFile);
            return;
        }         

        if (relativePath.endsWith(".tpl")) {
            destFile = destFile.slice(0, -4);

            await fs.ensureFile(destFile);
            await copyFileFromTemplate_(sourceFile, destFile, ctx);
            return;
        } 

        await fs.ensureFile(destFile);
        await fs.copyFile(sourceFile, destFile);
    });
};
