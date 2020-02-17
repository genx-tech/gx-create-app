const path = require('path');
const { _, fs } = require('rk-utils');

const AppInit = require('./app');
const { getLatestNpmPkgVer, getTemplateFromGit_ } = require('../utils');

class ReactInit extends AppInit {
    async getDependencies() {
        if (this.mergeMode) {
            return await super.getDependencies_();   
        }
        
        return this.getReactDependencies_();
    }

    async getDevDependencies_() {
        if (this.mergeMode) {
            return await this.getReactDependencies_(); 
        }
        
        return super.getDevDependencies_();   
    }

    async getReactDependencies_() {
        let pkgTmpl = this.getTemplate('react/package.json');


    }

    async createFiles_() {
        await super.createFiles_();        
    }
}

module.exports = ReactInit;