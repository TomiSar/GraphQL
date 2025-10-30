const { defineConfig } = require('cypress');
// const { CLIENT_URL } = require('./src/config/constants');

module.exports = defineConfig({
  e2e: {
    // baseUrl: CLIENT_URL,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
