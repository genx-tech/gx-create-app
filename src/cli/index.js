const { Starters: { startCommand } } = require('@genx/app');
const pkg = require('../../package.json');

const AppInitiator = require('../AppInitiator');

const appModes = [ 
    { name: "Command line application project", value: "cli" },    
    { name: "Web server project to host multiple app", value: "server" },
    { name: "App module (micro-service) project", value: "app" },
    { name: "React app module project", value: "react" },    
    { name: "Electron-based desktop project", value: "desktop" }    
];

function main () {
    startCommand((app) => {
        let cmd = app.commandLine;

        if (cmd.option('help')) {
            cmd.showUsage();
            return;
        }

        if (cmd.option('version')) {
            console.log(pkg.version);
            return;
        }

        let appDir = cmd.argv._[0];

        const appInitiator = new AppInitiator({  
            app,
            cwd: process.cwd(),
            logger: app.logger
        });

        return appInitiator.run(appDir, cmd.option('name'), cmd.option('mode'));
    }, {
        logger: {
            level: 'debug'
        },
        commandName: 'create-app',
        config: {
            "version": pkg.version,
            "commandLine": {
                "banner": `Gen-X application initiator command line v${pkg.version}`,
                "program": "npm init @genx/app",            
                "arguments": [
                    { 
                        "name": "app-directory", 
                        "required": true, 
                        "inquire": true, 
                        "promptMessage": "Please enter the application directory (usually the app name):"
                    }
                ],  
                "options": {                
                    "s": {
                        "desc": "Silent mode",
                        "alias": [ "silent" ],
                        "bool": true,
                        "default": false
                    },            
                    "v": {
                        "desc": "Show version information",
                        "alias": [ "version" ],
                        "bool": true,
                        "default": false
                    },
                    "?": {
                        "desc": "Show usage message",
                        "alias": [ "help" ],
                        "bool": true,
                        "default": false
                    },
                    "m": {
                        "desc": "Target application mode",
                        "alias": [ "mode", "app-mode" ],
                        "silentModeDefault": "web",
                        "inquire": true,
                        "required": true,
                        "promptType": "list",
                        "promptMessage": "Please choose the target application mode:",
                        "choicesProvider": appModes
                    },
                    "n": {
                        "desc": "Application name",
                        "alias": [ "name", "app-name" ],                    
                        "inquire": true,
                        "required": true,
                        "promptMessage": "Please input the application name:",
                        "promptDefault": cli => cli.argv._[0],
                        "silentModeDefault": cli => cli.argv._[0] 
                    },
                    "c": {
                        "desc": "Config path",
                        "alias": [ "conf", "config" ]
                    },
                    "lock": {
                        "desc": "With npm package lock",
                        "alias": [ "package-lock", "with-package-lock" ],                    
                        "bool": true,
                        "inquire": true,
                        "required": true,                    
                        "promptDefault": false,
                        "silentModeDefault": false
                    },
                    "merge": {
                        "desc": "Merge with existing project",                        
                        "bool": true,
                        "default": false
                    },
                    "bp": {
                        "desc": "Project boilerplate",
                        "alias": [ "boilerplate", "with-boilerplate" ]
                    },                    
                    "skip-install": {
                        "desc": "Skip dependencies installation",
                        "alias": [ "skip-npm-install" ],                    
                        "bool": true,
                        "inquire": true,
                        "required": true,                    
                        "promptDefault": false,
                        "silentModeDefault": false
                    }
                },
                "silentMode": cli => (cli.argv['silent'] || cli.argv['version'] || cli.argv['help']),
                "nonValidationMode": cli => (cli.argv['version'] || cli.argv['help']),
                "showUsageOnError": true,
                "showArguments": true
            }
        }
    });
};

if (!module.parent) {
    main();
} else {
    module.exports = main;
}