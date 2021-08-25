const path = require('path');
const { _, eachAsync_, fs, runCmdSync } = require('rk-utils');

const common = require('./common');

const TEST_DIR = path.resolve(__dirname);

describe.only('Server', function () {

    before(function() {        
        fs.ensureDirSync(TEST_DIR);        
    });

    common.init({
        'mode': 'server',
        'skip-install': true
    });    
});
