import { test } from '@playwright/test';

/**
 * Allure Helper Functions
 * Provides utilities for enhanced Allure reporting
 */

/**
 * Add step to Allure report
 * Usage: await allureStep('Step description', async () => { ... })
 */
export async function allureStep<T>(
  name: string,
  body: () => Promise<T>
): Promise<T> {
  return await test.step(name, body);
}

/**
 * Attach text to Allure report
 */
export function attachText(name: string, content: string): void {
  const allure = (global as any).allure;
  if (allure) {
    allure.attachment(name, content, 'text/plain');
  }
}

/**
 * Attach JSON data to Allure report
 */
export function attachJSON(name: string, data: any): void {
  const allure = (global as any).allure;
  if (allure) {
    allure.attachment(name, JSON.stringify(data, null, 2), 'application/json');
  }
}

/**
 * Add environment information to report
 * Should be called in global setup
 */
export function setEnvironmentInfo(info: Record<string, string>): void {
  const allure = (global as any).allure;
  if (allure) {
    Object.entries(info).forEach(([key, value]) => {
      allure.addEnvironment(key, value);
    });
  }
}

/**
 * Severity levels for test categorization
 */
export enum Severity {
  BLOCKER = 'blocker',
  CRITICAL = 'critical',
  NORMAL = 'normal',
  MINOR = 'minor',
  TRIVIAL = 'trivial',
}

/**
 * Test categories
 */
export enum Category {
  SMOKE = 'smoke',
  REGRESSION = 'regression',
  INTEGRATION = 'integration',
  E2E = 'e2e',
  SECURITY = 'security',
}
