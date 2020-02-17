const APP_NAME = 'test';

/**
 * @param {string} mode
 * @param {array} options
 */
exports.init = (mode, options) => {
    it('init', function () {   
        process.chdir(TEST_DIR);

        let cmdLine = `node bin/create-app.js temp --mode=${mode} --name=${APP_NAME}`;

        if (options) {
            cmdLine += options.join(' ');
        }

        runCmdSync(cmdLine);

        let packageFile = path.join(TEMP_DIR, 'package.json');
        
        fs.existsSync(packageFile).should.be.ok();

        const pkg = require(packageFile);
        pkg.name.should.be.equal(APP_NAME);
    });

}