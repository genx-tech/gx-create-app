const testSuite = require('./testSuite');

describe('Server', function () {
    testSuite.init({
        'mode': 'server',
        'skip-install': true
    });    
});
