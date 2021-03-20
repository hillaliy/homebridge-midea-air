"use strict";
const MideaPlatform_1 = require("./MideaPlatform");
const MigrationHelper_1 = require("./MigrationHelper");
module.exports = (api) => {
    new MigrationHelper_1.MigrationHelper(console, api.user.configPath());
    api.registerPlatform('homebridge-midea-air', 'midea-air', MideaPlatform_1.MideaPlatform);
};
