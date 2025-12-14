import { test, expect, TestDataFactory, StaticTestData } from '../../../src/fixtures';

/**
 * Login Test Suite
 * Test Case IDs: TC_LOGIN_001 - TC_LOGIN_005
 * 
 * Covers:
 * - Valid login
 * - Invalid credentials (wrong email/password)
 * - Empty fields validation
 * - Login form visibility
 */

test.describe('Login Functionality', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('TC_LOGIN_001: Verify login page elements are visible', async ({ loginPage }) => {
    // Allure annotations
    test.info().annotations.push(
      { type: 'severity', description: 'critical' },
      { type: 'tag', description: 'frontend' },
      { type: 'tag', description: 'smoke' },
      { type: 'epic', description: 'User Authentication' },
      { type: 'feature', description: 'Login Page UI' },
      { type: 'story', description: 'User should see login and signup forms on login page' }
    );

    // Arrange & Act - Navigation done in beforeEach

    // Assert
    await test.step('Verify login header and form', async () => {
      await expect(loginPage.loginHeader).toBeVisible();
      await expect(loginPage.loginHeader).toHaveText('Login to your account');
      expect(await loginPage.isLoginFormVisible()).toBe(true);
    });

    await test.step('Verify signup header and form', async () => {
      await expect(loginPage.signupHeader).toBeVisible();
      await expect(loginPage.signupHeader).toHaveText('New User Signup!');
      expect(await loginPage.isSignupFormVisible()).toBe(true);
    });
  });

  test('TC_LOGIN_002: Login with invalid email', async ({ loginPage }) => {
    // Arrange
    const invalidCredentials = {
      email: StaticTestData.invalidCredentials.nonExistentEmail,
      password: 'AnyPassword123',
    };

    // Act
    await loginPage.login(invalidCredentials);

    // Assert
    await expect(loginPage.loginErrorMessage).toBeVisible();
    const errorMessage = await loginPage.getLoginErrorMessage();
    expect(errorMessage).toContain('Your email or password is incorrect!');
  });

  test('TC_LOGIN_003: Login with invalid password', async ({ loginPage }) => {
    // Arrange
    const invalidCredentials = {
      email: 'someuser@example.com',
      password: StaticTestData.invalidCredentials.wrongPassword,
    };

    // Act
    await loginPage.login(invalidCredentials);

    // Assert
    await expect(loginPage.loginErrorMessage).toBeVisible();
    const errorMessage = await loginPage.getLoginErrorMessage();
    expect(errorMessage).toContain('Your email or password is incorrect!');
  });

  test('TC_LOGIN_004: Login form validation - empty fields', async ({ loginPage, page }) => {
    // Arrange - Leave fields empty
    
    // Act
    await loginPage.loginButton.click();

    // Assert - Browser validation should prevent submission
    // Check that we're still on login page
    expect(loginPage.getCurrentUrl()).toContain('/login');
    
    // Check HTML5 validation
    const emailInput = page.locator('input[data-qa="login-email"]');
    const validationMessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(validationMessage).toBeTruthy();
  });

  test('TC_LOGIN_005: Login and Logout flow (requires registered user)', async ({ 
    loginPage, 
    signupPage, 
    accountCreatedPage,
    page 
  }) => {
    /**
     * This test creates a new user, logs out, then logs back in
     * to verify the complete login/logout flow
     */
    
    // Arrange - Create a new user first
    const userData = TestDataFactory.generateRegistrationData();
    
    // Step 1: Register new user
    await loginPage.startSignup(userData.name, userData.email);
    await expect(page.locator('text=Enter Account Information')).toBeVisible();
    await signupPage.completeRegistration(userData);
    await accountCreatedPage.verifyAndContinue();
    
    // Step 2: Verify logged in
    await expect(page.locator(`text=Logged in as ${userData.name}`)).toBeVisible();
    
    // Step 3: Logout
    await loginPage.logout();
    
    // Step 4: Verify logged out (back to login page or home)
    await expect(loginPage.loginLink).toBeVisible();
    
    // Step 5: Login with the created credentials
    await loginPage.navigate();
    await loginPage.login({
      email: userData.email,
      password: userData.password,
    });
    
    // Assert - Should be logged in again
    await expect(page.locator(`text=Logged in as ${userData.name}`)).toBeVisible();
    
    // Cleanup - Delete account
    await loginPage.deleteAccount();
  });
});

test.describe('Login Negative Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('TC_LOGIN_006: Login with SQL injection attempt', async ({ loginPage, page }) => {
    // Arrange - SQL injection payload
    const maliciousCredentials = {
      email: "' OR '1'='1",
      password: "' OR '1'='1",
    };

    // Act
    await loginPage.fillInput(loginPage.loginEmailInput, maliciousCredentials.email);
    await loginPage.fillInput(loginPage.loginPasswordInput, maliciousCredentials.password);
    await loginPage.loginButton.click();

    // Assert - HTML5 validation should prevent submission or server should reject
    // Check if HTML5 validation triggered (form not submitted)
    const emailInput = page.locator('input[data-qa="login-email"]');
    const validationMessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);

    // If HTML5 validation is present, that's acceptable security
    // Otherwise, should still be on login page or show error
    if (!validationMessage) {
      // If form was submitted, server should show error
      const isErrorVisible = await loginPage.isLoginErrorVisible();
      if (isErrorVisible) {
        const errorMessage = await loginPage.getLoginErrorMessage();
        expect(errorMessage).toContain('incorrect');
      } else {
        // Should still be on login page (not bypassed auth)
        expect(page.url()).toContain('/login');
      }
    } else {
      // HTML5 validation prevented submission - this is acceptable
      expect(validationMessage).toBeTruthy();
    }
  });

  test('TC_LOGIN_007: Login with XSS attempt in email', async ({ loginPage, page }) => {
    // Arrange - XSS payload
    const xssCredentials = {
      email: '<script>alert("xss")</script>@test.com',
      password: 'TestPassword123',
    };

    // Set up dialog listener before any action
    let alertTriggered = false;
    page.on('dialog', () => {
      alertTriggered = true;
    });

    // Act
    await loginPage.fillInput(loginPage.loginEmailInput, xssCredentials.email);
    await loginPage.fillInput(loginPage.loginPasswordInput, xssCredentials.password);
    await loginPage.loginButton.click();

    // Assert - Page should handle gracefully
    // Check no alert dialog appeared
    expect(alertTriggered).toBe(false);

    // Check if HTML5 validation prevented submission (which is good security)
    const emailInput = page.locator('input[data-qa="login-email"]');
    const validationMessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);

    // Either HTML5 validation blocks it, or server handles it safely
    if (!validationMessage) {
      // If submitted, should still be on login page or show error (not execute XSS)
      const currentUrl = page.url();
      expect(currentUrl).toContain('/login');
    } else {
      // HTML5 validation prevented submission - acceptable security
      expect(validationMessage).toBeTruthy();
    }
  });
});
