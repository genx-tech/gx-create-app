const path = require('path');
const { _, eachAsync_, fs, runCmdSync } = require('rk-utils');

const common = require('./common');

const TEST_DIR = path.resolve(__dirname);

describe('App Module', function () {

    before(function() {        
        fs.ensureDirSync(TEST_DIR);        
    });

    common.init('appModule', [ '--skip-install' ]);

    it('skip-install', async function() {
        
    });
    
});
