const path = require('path');
const { _, eachAsync_, fs, runCmdSync } = require('rk-utils');

const common = require('./common');

const TEST_DIR = path.resolve(__dirname);
const TEMP_DIR = path.join(TEST_DIR, 'temp');

describe('App Module', function () {

    before(function() {        
        fs.ensureDirSync(TEMP_DIR);
        fs.emptyDirSync(TEMP_DIR);
    });

    common.init('appModule', [ '--skip-install' ]);

    it('skip-install', async function() {
        
    });
    
});
