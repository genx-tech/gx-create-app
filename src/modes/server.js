const AppInit = require('./app');

/**
 * server config
 * httpPort: default as 3000
 */
class ServerInit extends AppInit {
    constructor(owner, name, root, mergeMode, config) {
        if (mergeMode) {
            throw new Error('"server" application does not support merge mode. It requires an empty folder to initialize.');
        }

        super(owner, name, root, mergeMode, config);

        this.confPrefix = 'server';
    }

    async createFiles_() {
        await super.createFiles_();

        this.createFileByTemplate('server/src/server.js.swig', 'src/server.js', { serverName: this.appName });        
        this.copyFileFromTemplate('server/public/favicon.ico', 'public/favicon.ico');
    }

    async getNpmScripts_() {
        let scripts = await super.getNpmScripts_();

        return {
            ...scripts,
            "start": "NODE_RT=babel babel-node src/server.js",
            "dev": "NODE_RT=babel nodemon --exec babel-node src/server.js",
            "bulid:clean": "rm -rf build",
            "build:server:prod": "npm run bulid:clean && NODE_ENV=production babel src -d build --copy-files && del build/**/__test__",
            "build:server": "npm run bulid:clean && NODE_ENV=development babel src -d build --copy-files && del build/**/__test__",
            "build": "npm run build:server",
            "build:prod": "npm run build:server:prod"
        }
    }

    async getConfig_() {
        return {            
            "timezone": "Australia/Sydney",  
            "loggers": {
                "accessLog": {
                    "transports": [
                        {
                            "type": "console",                    
                            "options": {      
                                "level": "verbose",                      
                                "format": "#!jsv: log.format.combine(log.format.colorize(), log.format.simple())"
                            }
                        }
                    ]
                }
            },
            "koa": {       
                "keys": [ "cookie", "secret", "to be replaced"],
                "httpPort": this.config.httpPort || 3000       
            },
            "middlewares": [
                [ "favicon", "public/favicon.ico" ],
                [ "accessLog", { "logger": "accessLog" } ],
                [ "@koa/cors", { "origin": "*" } ],     
                "koa-compress",
                "koa-etag"
            ],
            "routing": {                          
                "/": "index.home"
            }
        };
    }
}

module.exports = ServerInit;