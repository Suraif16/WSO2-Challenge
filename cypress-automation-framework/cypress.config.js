const { defineConfig } = require("cypress");
const plugin =     require('cypress-mochawesome-reporter/plugin')

module.exports = defineConfig({
  projectId: 'vqga8j',
  reporter: 'cypress-mochawesome-reporter',
  chromeWebSecurity: false,
  video: true,
  reporterOptions: {
    reportDir: "cypress/report",
    charts: true,
    reportPageTitle: 'Cypress Inline Reporter',
    embeddedScreenshots: true, 
    inlineAssets: true, //Adds the asserts inline
    overwrite: true,
    html: false,
    json: true
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      plugin(on);
    },
    specPattern: 'cypress/e2e/**/*.{js, jsx, tsx, ts, feature}',
  }
});
