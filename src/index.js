const copyFilesFromTemplate_ = require("./steps/copyFilesFromTemplate_");
const createOptionalFiles_ = require("./steps/createOptionalFiles_");
const ensureSafeToCreateProject_ = require("./steps/ensureSafeToCreateProject_");
const npmInstall_ = require("./steps/npmInstall_");
const requireFilesExist_ = require("./steps/requireFilesExist_");

exports.runner = require("./runner");
exports.steps = {    
    copyFilesFromTemplate_,
    createOptionalFiles_,
    ensureSafeToCreateProject_,
    npmInstall_,
    requireFilesExist_
};
