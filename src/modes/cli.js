const DefaultInit = require('./default');
const { getLatestNpmPkgVer } = require('../utils');

class CliInit extends DefaultInit {
    async getDependencies_() {
        return {
            "@genx/app": getLatestNpmPkgVer('@genx/app')
        };
    }

}

module.exports = CliInit;