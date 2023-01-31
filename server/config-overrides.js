const { override, useBabelRc } = require("customize-cra");

// config-overrides.js
// eslint-disable-next-line react-hooks/rules-of-hooks
module.exports = override(useBabelRc());
