const path = require('path');

module.exports = async (ctx) => {
    let packageFile = path.join(ctx.targetPath, "package.json");
    let packageJson;

    if (this.mergeMode && fs.existsSync(packageFile)) {
        let existing = fs.readJsonSync(packageFile);

        packageJson = {
            ...existing,
            dependencies: { ...existing.dependencies, ...(await this.getDependencies_()) },
            devDependencies: { ...existing.devDependencies, ...(await this.getDevDependencies_()) },
            scripts: { ...existing.scripts, ...(await this.getNpmScripts_()) },
        };

        merged = true;
    } else {
        packageJson = {
            name: this.appName,
            version: "0.1.0",
            description: _.startCase(this.appName),
            private: true,
            dependencies: await this.getDependencies_(),
            devDependencies: await this.getDevDependencies_(),
            scripts: await this.getNpmScripts_(),
        };
    }

    await this.fillPackageJson_(packageJson);

    fs.writeFileSync(packageFile, JSON.stringify(packageJson, null, 4));
};
