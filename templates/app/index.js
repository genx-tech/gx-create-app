const { WebServer } = require('@genx/server');

const webServer = new WebServer('server', {
    loadConfigFromOptions: true,
    config: {
        
    }
});

webServer.start_().catch(err => {
    console.error(err);
    process.exit(1);
});