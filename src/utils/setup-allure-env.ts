import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

/**
 * Setup Allure Environment Information
 * This creates environment.properties file for the Allure report
 */
export function setupAllureEnvironment() {
  const allureResultsDir = path.join(process.cwd(), 'allure-results');

  // Create allure-results directory if it doesn't exist
  if (!fs.existsSync(allureResultsDir)) {
    fs.mkdirSync(allureResultsDir, { recursive: true });
  }

  const envInfo = {
    'Test Environment': process.env.TEST_ENV || 'Production',
    'Base URL': process.env.BASE_URL || 'https://automationexercise.com',
    'Browser': process.env.BROWSER || 'Chromium',
    'Platform': os.platform(),
    'OS Version': os.release(),
    'Node Version': process.version,
    'Test Runner': 'Playwright',
    'Reporter': 'Allure',
    'Execution Date': new Date().toISOString(),
    'Executed By': process.env.USER || process.env.USERNAME || 'Automation',
  };

  // Create environment.properties content
  const envContent = Object.entries(envInfo)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  // Write to allure-results/environment.properties
  fs.writeFileSync(
    path.join(allureResultsDir, 'environment.properties'),
    envContent
  );

  console.log('✓ Allure environment info configured');
}

/**
 * Create executor.json for CI/CD integration
 * Provides information about the test execution context
 */
export function setupAllureExecutor(buildInfo?: {
  buildName?: string;
  buildUrl?: string;
  reportUrl?: string;
}) {
  const allureResultsDir = path.join(process.cwd(), 'allure-results');

  const executorInfo = {
    name: 'Local Execution',
    type: 'local',
    buildOrder: Date.now(),
    buildName: buildInfo?.buildName || `Build #${Date.now()}`,
    buildUrl: buildInfo?.buildUrl || '#',
    reportUrl: buildInfo?.reportUrl || '#',
    reportName: 'Allure Report',
  };

  fs.writeFileSync(
    path.join(allureResultsDir, 'executor.json'),
    JSON.stringify(executorInfo, null, 2)
  );

  console.log('✓ Allure executor info configured');
}
