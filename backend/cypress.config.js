const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'tvohw7',
  e2e: {
    baseUrl: 'http://localhost:5173', // This lets you use cy.visit('/') instead of hardcoded URLs
    pageLoadTimeout: 120000,          // Increased timeout to allow Vite server to fully load
    setupNodeEvents(on, config) {
      // You can add tasks, logging, or test setup hooks here
    },
  },
});
