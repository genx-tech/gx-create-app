const { WebServer } = require('@genx/server');

const webServer = new WebServer('test');

webServer.start_();

if (module.parent) { // export for code coverage
    module.exports = webServer;
}