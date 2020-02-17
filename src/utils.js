const { runCmdSync, template, fs } = require('rk-utils');
const download = require('./download');

exports.createFileByTemplate = (templateFile, destFile, variables) => {
    let templateContent = fs.readFileSync(templateFile, 'utf8');
    let content = template(templateContent, variables);
    fs.outputFileSync(destFile, content, 'utf8');    
};

const getLatestNpmPkgVer = exports.getLatestNpmPkgVer = (pkgName) => pkgName.startsWith('@genx/') ? pkgName.replace('@genx/', 'genx-tech/gx-') + '#v-next' : ('^' + runCmdSync(`npm show ${pkgName} version`).trim());

exports.ensureDependency = (deps, dep, ver) => {
    if (!(dep in deps)) {
        deps[dep] = ver || getLatestNpmPkgVer(dep);
    }
};

exports.getTemplateFromGit_ = async (relativePath, commit) => {
    commit || (commit = 'master');

    const gitUrl = `https://raw.githubusercontent.com/genx-tech/gx-create-app/${commit}/templates/${relativePath}`;

    const targetFile = path.resolve(__dirname, '..', 'templates', 'download', relativePath);

    await download(gitUrl, targetFile);

    return targetFile;
};