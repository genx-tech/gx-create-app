const path = require('path');
const { _, eachAsync_, fs, runCmdSync } = require('rk-utils');

describe('BVT', function () {   
    it('usage', function () {   
        const out = runCmdSync('node bin/create-app.js -?');
        const pkg = require('../package.json');

        out.startsWith('Gen-X application initiator command line v' + pkg.version).should.be.ok();
    });  

    it('version', function () {   
        const out = runCmdSync('node bin/create-app.js -v');
        const pkg = require('../package.json');

        out.trim().should.be.equal(pkg.version);
    });    
});
