const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin; // Updated import

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // Configure the ESBuild bundler with the Cucumber plugin
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)] // updated usage
      });
      on('file:preprocessor', bundler);

      // Add the Cucumber preprocessor plugin
      await addCucumberPreprocessorPlugin(on, config);

      // Return the updated config
      return config;
    },
    specPattern: 'cypress/e2e/integration/**/*.feature',// path to .feature files
    supportFile: false, // disable support file if you don’t need it
  }
});