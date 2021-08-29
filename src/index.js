const copyFileFromTemplate_ = require('./steps/copyFileFromTemplate_');
const copyFilesFromTemplate_ = require('./steps/copyFilesFromTemplate_');
const createOptionalFiles_ = require('./steps/createOptionalFiles_');
const createPackageJson_ = require('./steps/createPackageJson_');
const ensureSafeToCreateProject = require('./steps/ensureSafeToCreateProject');
const exitWithError = require('./steps/exitWithError');

exports.runner = require('./runner');
exports.steps = {
    copyFileFromTemplate_,
    copyFilesFromTemplate_,
    createOptionalFiles_,
    createPackageJson_,
    ensureSafeToCreateProject,
    exitWithError
}; 