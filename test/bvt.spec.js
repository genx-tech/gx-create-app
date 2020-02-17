const path = require('path');
const { _, eachAsync_, fs, runCmdSync } = require('rk-utils');

const TEST_DIR = path.resolve(__dirname);
const TEMP_DIR = path.join(TEST_DIR, 'temp');

describe('BVT', function () {

    before(function() {        
        fs.ensureDirSync(TEMP_DIR);
    });
   
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
