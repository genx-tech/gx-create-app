module.exports = (cli) => ({                        
    "@genx/app": cli.getLatestNpmPkgVer('@genx/app'),
    "@genx/server": cli.getLatestNpmPkgVer('@genx/server')
});