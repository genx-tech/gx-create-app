const path = require('path');
const { _, fs, runCmdSync } = require('rk-utils');
const shell = require('shelljs');
const { createFileByTemplate } = require('../utils');

class DefaultInit {
    constructor(owner, name, root, mergeMode, config) {
        this.owner = owner;
        this.appName = name.indexOf(' ') === -1 ? name : _.kebabCase(name),
        this.appRoot = root;
        this.config = config;
        this.mergeMode = mergeMode;

        fs.ensureDirSync(this.appRoot);     
        
        shell.cd(this.appRoot);
    }

    ensureIsSafeToCreateProjectIn() {
        let conflitFiles = new Set(this.getConflictFileList());
        let conflicts = [];

        for (let file of conflitFiles) {
            let filePath = path.join(this.appRoot, file);

            if (fs.existsSync(filePath)) {
                conflicts.push(file);
            }
        }

        if (conflicts.length > 0) {
            throw new Error(`The directory [${this.appRoot}] contains files that could conflict:\n  - ` + conflicts.join('\n  - '));
        }
    }

    getConflictFileList() {
        return [
            'package.json'
        ];
    }

    getCmdOption(option) {
        return this.owner.app.commandLine.option(option);
    }

    async createFiles_() {
        const fileName = 'package.json';
        let packageFile = path.join(this.appRoot, fileName);

        let packageJson, merged = false; 

        if (this.mergeMode && fs.existsSync(packageFile)) {
            let existing = fs.readJsonSync(packageFile);

            packageJson = {
                ...existing,
                dependencies: { ...existing.dependencies, ...(await this.getDependencies_()) },
                devDependencies: { ...existing.devDependencies, ...(await this.getDevDependencies_()) },
                scripts: { ...existing.scripts, ...(await this.getNpmScripts_()) } 
            };

            merged = true;
        } else {
            packageJson = {
                name: this.appName,
                version: '0.1.0',
                description: _.startCase(this.appName),
                private: true,
                dependencies: (await this.getDependencies_()),
                devDependencies: (await this.getDevDependencies_()),
                scripts: (await this.getNpmScripts_())
            };
        }        

        await this.fillPackageJson_(packageJson);        

        fs.writeFileSync(
            packageFile,
            JSON.stringify(packageJson, null, 4));

        if (merged) {
            this.logUpdatedFile(fileName);
        } else {
            this.logCreatedFile(fileName);
        }

        if (!this.getCmdOption('package-lock')) {
            this.copyFileFromTemplate('.npmrc', '.npmrc');      
        }        
    }

    async updateFiles_() {        
    }

    async fillPackageJson_(packageJson) {
    }

    async installDeps_() {
        runCmdSync('npm install');
    }    

    async getDependencies_() {
        return {};
    }

    async getDevDependencies_() {
        return {};
    }

    async getNpmScripts_() {
        return {};
    }

    ensureDirs(dirs) {
        dirs.forEach(dir => {
            fs.ensureDirSync(path.join(this.appRoot, dir));        
        });
    }

    logCreatedFile(fileName) {
        this.owner.logger.log('info', `Created "${fileName}".`);
    }

    logUpdatedFile(fileName) {
        this.owner.logger.log('info', `Updated "${fileName}".`);
    }

    getTemplate(relativePath) {
        return path.resolve(__dirname, '..', '..', 'templates', relativePath);
    }

    toTargetPath(relativePath) {
        return path.join(this.appRoot, relativePath);
    }

    createFileByTemplate(relativePath, relativeDestFile, variables) {
        let templateFile = this.getTemplate(relativePath);
        let destFile = this.toTargetPath(relativeDestFile);
        fs.ensureFileSync(destFile);

        createFileByTemplate(templateFile, destFile, variables);  
        this.logCreatedFile(destFile);      
    }

    copyFileFromTemplate(relativePath, relativeDestFile) {
        let templateFile = this.getTemplate(relativePath);
        let destFile = this.toTargetPath(relativeDestFile);
        fs.ensureFileSync(destFile);

        fs.copyFileSync(templateFile, destFile);
        this.logCreatedFile(destFile);
    }
}

module.exports = DefaultInit;