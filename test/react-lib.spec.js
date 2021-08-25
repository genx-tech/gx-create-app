const path = require('path');
const { _, eachAsync_, fs, runCmdSync } = require('rk-utils');

const common = require('./common');

describe('react-lib', function () {

    before(function() {        
        common.prepareDir();
    });

    common.init({
        mode: 'react-lib',
        name: 'test-react-lib'
    }, true);
});
