const DefaultInit = require('./default');
const { getLatestNpmPkgVer } = require('../utils');

class DesktopInit extends DefaultInit {
    async getDependencies_() {
        return {
            "electron": getLatestNpmPkgVer('electron')
        };
    }

    async getNpmScripts_() {
        return {
            "start": "electron .",
            "dev": "electron . --debug"
        };
    }

    async fillPackageJson_(packageJson) {
        await super.fillPackageJson_(packageJson);

        packageJson.main = 'main.js';
    }
}

module.exports = DesktopInit;