const { defineConfig } = require('cypress');
import eyesPlugin from '@applitools/eyes-cypress'  
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin =
  require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;
const { NodeGlobalsPolyfillPlugin } = require("@esbuild-plugins/node-globals-polyfill")

const { NodeModulesPolyfillPlugin } = require("@esbuild-plugins/node-modules-polyfill")  
const fs = require('fs-extra')
const path = require('path')

function getConfigurationByFile() {
  const pathToConfigFile = path.resolve('cypress', 'config', `.ts`)
  if(!fs.existsSync(pathToConfigFile)) {
    console.log('No custom config file found')
    return {};
  }

  return fs.readJson(pathToConfigFile)
}


export default eyesPlugin(defineConfig({
  video: false,
  defaultCommandTimeout: 45000,
  pageLoadTimeout: 100000,
  requestTimeout: 50000,
  numTestsKeptInMemory: 100,
  responseTimeout: 45000,
  chromeWebSecurity: false,
  port: null,
  fixturesFolder: 'cypress/fixtures',
  screenshotsFolder: 'report/screenshots',
  watchForFileChanges: false,
  screenshotOnRunFailure: true,
  
  e2e: {
    specPattern: 'cypress/e2e/**/*.feature',
    baseUrl: 'https://www.eonnext.com/',
    "chromeWebSecurity": false,
    "experimentalModifyObstructiveThirdPartyCode":true,
    experimentalSessionAndOrigin: true,
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      await addCucumberPreprocessorPlugin(on, config);

      const version = config.env.VERSION || 'local'

      const urls = {
        dev: "https://www.eonnext-dev.com/",
        prod: "https://www.eonnext.com/"
      }
      
      config.baseUrl = urls[version]

      const bundler = createBundler({
        plugins: [
          NodeModulesPolyfillPlugin(),
          NodeGlobalsPolyfillPlugin({
            process: true,
            buffer: true
          }),
          createEsbuildPlugin(config)
        ],
      });
      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);

      getConfigurationByFile()

      return config;
    },
  },
})
)

require('@applitools/eyes-cypress')(module)
