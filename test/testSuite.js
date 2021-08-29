const path = require('path');
const { fs, cmd } = require('@genx/sys');
const { _ } = require('@genx/july');

const TEST_DIR = path.resolve(__dirname);
const TEMP_DIR = path.join(TEST_DIR, 'temp');

const prepareDir = () => {
    fs.ensureDirSync(TEST_DIR);
    fs.emptyDirSync(TEMP_DIR);
};

exports.prepareDir = prepareDir;

/**
 * @param {string} mode
 * @param {array} options
 */
exports.init = (options, dirName = 'temp') => {
    options = { name: 'test', ...options };
    prepareDir();

    it('init', function () {  
        process.chdir(TEST_DIR);

        let cmdLine = `node ../src/cli/index.js ${dirName} `;

        if (options) {
            cmdLine += _.map(options, (v, k) => (typeof v === 'boolean' ? (v ? `--${k}` : '') : ('--' + k + '=' + v))).join(' ');
        }

        const log = cmd.runSync(cmdLine);
        console.log(log);

        let packageFile = path.join(TEMP_DIR, 'package.json');
        
        fs.existsSync(packageFile).should.be.ok();

        const pkg = require(packageFile);
        pkg.name.should.be.equal(options.name);
    });

    if (!options['skip-install']) {
        it('install', function () {   
            process.chdir(TEMP_DIR);
    
            let cmdLine = `npm install`;
    
            let retCode = cmd.runSync(cmdLine);
    
            console.log('return code', retCode);
            
            fs.existsSync(path.join(TEMP_DIR, 'node_modules')).should.be.ok();
        });
    }    
}