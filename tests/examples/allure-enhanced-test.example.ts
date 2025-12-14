import { test, expect } from '@playwright/test';
import { allureStep, attachJSON, attachText, Severity, Category } from '../../src/utils/allure-helpers';

/**
 * EXAMPLE: Enhanced Test with Allure Annotations
 *
 * This is a reference example showing best practices for Allure reporting.
 * Use these patterns in your actual test files.
 */

test.describe('Enhanced Login Tests with Allure', () => {
  // Add metadata at test level
  test('TC_LOGIN_ENHANCED_001: Login with valid credentials', async ({ page }) => {
    // Allure annotations using test.info().annotations
    test.info().annotations.push(
      { type: 'severity', description: Severity.CRITICAL },
      { type: 'tag', description: Category.SMOKE },
      { type: 'epic', description: 'User Authentication' },
      { type: 'feature', description: 'Login' },
      { type: 'story', description: 'As a user, I want to login to access my account' },
      { type: 'owner', description: 'QA Team' },
      { type: 'issue', description: 'JIRA-123' },
      { type: 'tms', description: 'TEST-456' }
    );

    // Use test.step for clear reporting of test phases
    await test.step('Navigate to login page', async () => {
      await page.goto('/login');
      await expect(page).toHaveURL(/.*login/);
    });

    await test.step('Enter valid credentials', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'Test123!',
      };

      // Attach test data (password masked for security)
      attachJSON('Test Credentials', {
        email: credentials.email,
        password: '********',
      });

      await page.fill('[data-qa="login-email"]', credentials.email);
      await page.fill('[data-qa="login-password"]', credentials.password);
    });

    await test.step('Click login button', async () => {
      await page.click('[data-qa="login-button"]');
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify successful login', async () => {
      const loggedInText = await page.locator('text=Logged in as').textContent();
      attachText('Login Result', `User successfully logged in: ${loggedInText}`);

      await expect(page.locator('text=Logged in as')).toBeVisible();
    });
  });

  test('TC_LOGIN_ENHANCED_002: Login with invalid credentials', async ({ page }) => {
    test.info().annotations.push(
      { type: 'severity', description: Severity.NORMAL },
      { type: 'tag', description: Category.REGRESSION },
      { type: 'epic', description: 'User Authentication' },
      { type: 'feature', description: 'Login Validation' }
    );

    await allureStep('Navigate to login page', async () => {
      await page.goto('/login');
    });

    await allureStep('Attempt login with invalid credentials', async () => {
      await page.fill('[data-qa="login-email"]', 'invalid@test.com');
      await page.fill('[data-qa="login-password"]', 'wrongpass');
      await page.click('[data-qa="login-button"]');
    });

    await allureStep('Verify error message is displayed', async () => {
      const errorMessage = await page.locator('.login-error').textContent();
      attachText('Error Message', errorMessage || 'No error message found');

      await expect(page.locator('.login-error')).toBeVisible();
      expect(errorMessage).toContain('incorrect');
    });
  });
});

/**
 * BEST PRACTICES DEMONSTRATED:
 *
 * 1. Severity Levels:
 *    - BLOCKER: Tests that block release (critical bugs)
 *    - CRITICAL: Core functionality (login, checkout)
 *    - NORMAL: Important but not critical features
 *    - MINOR: Nice-to-have features
 *    - TRIVIAL: UI/cosmetic issues
 *
 * 2. Categories/Tags:
 *    - smoke: Quick tests for build verification
 *    - regression: Full test suite
 *    - integration: Tests multiple components
 *    - e2e: End-to-end user journeys
 *    - security: Security testing
 *
 * 3. Epic/Feature/Story:
 *    - Epic: High-level business capability
 *    - Feature: Specific functionality
 *    - Story: User story or requirement
 *
 * 4. Test Steps:
 *    - Use test.step() for clear phases
 *    - Each step shows in Allure timeline
 *    - Failed step highlighted clearly
 *
 * 5. Attachments:
 *    - Attach test data for debugging
 *    - Attach API responses
 *    - Screenshots/videos auto-attached on failure
 */
