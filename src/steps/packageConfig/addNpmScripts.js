const { _ } = require('@genx/july');

module.exports = async (config, options) => {
    if (options.npmScripts) {
        _.defaults(config.scripts, options.npmScripts);
    } 
};
