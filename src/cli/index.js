const { Starters: { startCommand } } = require('@genx/app');
const pkg = require('../../package.json');
const { appModeList } = require('../modes');

const runner = require('../runner');

function main () {
    startCommand(runner, {
        logger: {
            level: 'info'
        },
        commandName: 'genx-init',
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
                        "alias": [ "mode" ],
                        "silentModeDefault": "web",
                        "inquire": true,
                        "required": true,
                        "promptType": "list",
                        "promptMessage": "Please choose the target application mode:",
                        "choicesProvider": appModeList
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