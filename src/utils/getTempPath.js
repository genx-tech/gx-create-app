const path = require("path");
const os = require("os");

module.exports = (...relativePath) =>
    path.resolve(os.tmpdir(), "gx-create-app", ...relativePath);
