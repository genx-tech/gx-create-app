const { cmd } = require('@genx/sys');

describe('BVT', function () {   
    it('usage', function () {   
        const out = cmd.runSync('node bin/create-app.js -?');
        const pkg = require('../package.json');

        out.startsWith('Gen-X application initiator command line v' + pkg.version).should.be.ok();
    });  

    it('version', function () {   
        const out = cmd.runSync('node bin/create-app.js -v');
        const pkg = require('../package.json');

        out.trim().should.be.equal(pkg.version);
    });    

    it.only('invalid app name', function () {   
        const out = cmd.runSync('node bin/create-app.js --name="with space"');
        console.log(out);
        
    });    
});