import { setupAllureEnvironment, setupAllureExecutor } from './src/utils/setup-allure-env';

/**
 * Global Setup - Runs once before all tests
 * Sets up Allure report environment information
 */
async function globalSetup() {
  console.log('\n🚀 Running Global Setup...\n');

  // Setup Allure environment info
  setupAllureEnvironment();

  // Setup Allure executor info (useful for CI/CD)
  setupAllureExecutor({
    buildName: process.env.BUILD_NAME || `Local Build - ${new Date().toLocaleDateString()}`,
    buildUrl: process.env.BUILD_URL,
    reportUrl: process.env.REPORT_URL,
  });

  console.log('✓ Global setup completed\n');
}

export default globalSetup;
