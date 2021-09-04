const path = require("path");

module.exports = (...relativePath) =>
    path.resolve(__dirname, "../../templates", ...relativePath);
