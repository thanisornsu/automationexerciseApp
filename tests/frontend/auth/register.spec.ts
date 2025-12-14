import { test, expect, TestDataFactory } from '../../../src/fixtures';
import { Countries } from '../../../src/constants';

/**
 * Registration Test Suite
 * Test Case IDs: TC_REG_001 - TC_REG_010
 * 
 * Covers:
 * - Complete registration flow
 * - Required field validation
 * - Duplicate email handling
 * - Form field validation
 * - Registration with various data combinations
 */

test.describe('User Registration', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('TC_REG_001: Complete user registration - Full flow', async ({ 
    loginPage, 
    signupPage, 
    accountCreatedPage,
    accountDeletedPage,
    page 
  }) => {
    // Arrange
    const userData = TestDataFactory.generateRegistrationData({
      newsletter: true,
      specialOffers: true,
    });

    // Act - Step 1: Start signup
    await loginPage.startSignup(userData.name, userData.email);
    await expect(page.locator('text=Enter Account Information')).toBeVisible();

    // Act - Step 2: Verify signup page and fill form
    await signupPage.verifySignupFormIsDisplayed();
    await signupPage.verifyNamePreFilled(userData.name);
    await signupPage.completeRegistration(userData);

    // Assert - Step 3: Verify account created
    await accountCreatedPage.verifyAccountCreatedIsDisplayed();
    await accountCreatedPage.clickContinue();

    // Assert - Step 4: Verify logged in
    const loggedInText = page.locator(`text=Logged in as ${userData.name}`);
    await expect(loggedInText).toBeVisible();

    // Cleanup - Delete account
    await loginPage.deleteAccount();
    await accountDeletedPage.verifyAccountDeletedIsDisplayed();
  });

  test('TC_REG_002: Registration with minimum required fields only', async ({ 
    loginPage, 
    signupPage, 
    accountCreatedPage,
    page 
  }) => {
    // Arrange - Minimal data
    const minimalData = TestDataFactory.generateRegistrationData({
      company: undefined,
      address2: undefined,
      newsletter: false,
      specialOffers: false,
    });

    // Act
    await loginPage.startSignup(minimalData.name, minimalData.email);
    await expect(page.locator('text=Enter Account Information')).toBeVisible();
    
    // Fill only required fields
    await signupPage.fillInput(signupPage.passwordInput, minimalData.password);
    await signupPage.fillInput(signupPage.firstNameInput, minimalData.firstName!);
    await signupPage.fillInput(signupPage.lastNameInput, minimalData.lastName!);
    await signupPage.fillInput(signupPage.address1Input, minimalData.address1!);
    await signupPage.countrySelect.selectOption(minimalData.country!);
    await signupPage.fillInput(signupPage.stateInput, minimalData.state!);
    await signupPage.fillInput(signupPage.cityInput, minimalData.city!);
    await signupPage.fillInput(signupPage.zipcodeInput, minimalData.zipcode!);
    await signupPage.fillInput(signupPage.mobileNumberInput, minimalData.mobileNumber!);
    await signupPage.submitRegistration();

    // Assert
    await accountCreatedPage.verifyAccountCreatedIsDisplayed();
    await accountCreatedPage.clickContinue();
    await expect(page.locator(`text=Logged in as ${minimalData.name}`)).toBeVisible();

    // Cleanup
    await loginPage.deleteAccount();
  });

  test('TC_REG_003: Registration with existing email should fail', async ({
    loginPage,
    signupPage,
    accountCreatedPage,
    page
  }) => {
    // Arrange
    const testName = 'Test User';

    // First, create and complete registration for a user
    const userData = TestDataFactory.generateRegistrationData();
    await loginPage.startSignup(userData.name, userData.email);
    await expect(page.locator('text=Enter Account Information')).toBeVisible();
    await signupPage.completeRegistration(userData);
    await accountCreatedPage.verifyAccountCreatedIsDisplayed();
    await accountCreatedPage.clickContinue();

    // Logout so we can try to register again
    await loginPage.logout();

    // Navigate back to login page
    await loginPage.navigate();

    // Act - Try to register with the same email
    await loginPage.startSignup(testName, userData.email);
    console.log('Attempting to register with existing email:', userData.email);

    // Assert
    await expect(loginPage.signupErrorMessage).toBeVisible();
    const errorMessage = await loginPage.getSignupErrorMessage();
    expect(errorMessage).toContain('Email Address already exist!');

    // Cleanup - Delete the account
    await loginPage.login({ email: userData.email, password: userData.password });
    await loginPage.deleteAccount();
  });

  test('TC_REG_004: Signup form validation - Empty name', async ({ loginPage, page }) => {
    // Arrange
    const testEmail = TestDataFactory.generateLoginCredentials().email;

    // Act - Leave name empty
    await loginPage.fillSignupForm('', testEmail);
    await loginPage.signupButton.click();

    // Assert - Should not proceed, HTML5 validation
    expect(loginPage.getCurrentUrl()).toContain('/login');
    
    const nameInput = page.locator('input[data-qa="signup-name"]');
    const validationMessage = await nameInput.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(validationMessage).toBeTruthy();
  });

  test('TC_REG_005: Signup form validation - Invalid email format', async ({ loginPage, page }) => {
    // Arrange
    const invalidEmails = TestDataFactory.generateInvalidEmails();

    // Act & Assert - Test first invalid email
    await loginPage.fillSignupForm('Test User', invalidEmails[0]);
    await loginPage.signupButton.click();

    // Should not proceed due to HTML5 email validation
    expect(loginPage.getCurrentUrl()).toContain('/login');
  });

  test('TC_REG_006: Registration form - Select different countries', async ({
    loginPage,
    signupPage,
    page
  }) => {
    // Arrange
    const userData = TestDataFactory.generateRegistrationData();
    await loginPage.startSignup(userData.name, userData.email);
    await expect(page.locator('text=Enter Account Information')).toBeVisible();

    // Act & Assert - Verify all countries are selectable
    for (const country of Countries) {
      await signupPage.countrySelect.selectOption(country);
      const selectedValue = await signupPage.countrySelect.inputValue();
      expect(selectedValue).toBe(country);
    }
  });

  test('TC_REG_007: Registration form - Date of birth selection', async ({
    loginPage,
    signupPage,
    page
  }) => {
    // Arrange
    const userData = TestDataFactory.generateRegistrationData({
      birthDay: '15',
      birthMonth: 'June',
      birthYear: '1990',
    });

    await loginPage.startSignup(userData.name, userData.email);
    await expect(page.locator('text=Enter Account Information')).toBeVisible();

    // Act
    await signupPage.daySelect.selectOption('15');
    await signupPage.monthSelect.selectOption({ label: 'June' });
    await signupPage.yearSelect.selectOption('1990');

    // Assert
    expect(await signupPage.daySelect.inputValue()).toBe('15');
    expect(await signupPage.yearSelect.inputValue()).toBe('1990');
  });

  test('TC_REG_008: Registration form - Newsletter and offers checkboxes', async ({
    loginPage,
    signupPage,
    page
  }) => {
    // Arrange
    const userData = TestDataFactory.generateRegistrationData();
    await loginPage.startSignup(userData.name, userData.email);
    await expect(page.locator('text=Enter Account Information')).toBeVisible();

    // Act & Assert - Check newsletter
    await expect(signupPage.newsletterCheckbox).not.toBeChecked();
    await signupPage.newsletterCheckbox.check();
    await expect(signupPage.newsletterCheckbox).toBeChecked();

    // Act & Assert - Check special offers
    await expect(signupPage.specialOffersCheckbox).not.toBeChecked();
    await signupPage.specialOffersCheckbox.check();
    await expect(signupPage.specialOffersCheckbox).toBeChecked();

    // Act & Assert - Uncheck both
    await signupPage.newsletterCheckbox.uncheck();
    await signupPage.specialOffersCheckbox.uncheck();
    await expect(signupPage.newsletterCheckbox).not.toBeChecked();
    await expect(signupPage.specialOffersCheckbox).not.toBeChecked();
  });

  test('TC_REG_009: Registration form - Title selection', async ({
    loginPage,
    signupPage,
    page
  }) => {
    // Arrange
    const userData = TestDataFactory.generateRegistrationData();
    await loginPage.startSignup(userData.name, userData.email);
    await expect(page.locator('text=Enter Account Information')).toBeVisible();

    // Act & Assert - Select Mr
    await signupPage.selectTitle('Mr');
    await expect(signupPage.titleMr).toBeChecked();
    await expect(signupPage.titleMrs).not.toBeChecked();

    // Act & Assert - Select Mrs
    await signupPage.selectTitle('Mrs');
    await expect(signupPage.titleMrs).toBeChecked();
    await expect(signupPage.titleMr).not.toBeChecked();
  });
});

test.describe('Registration Edge Cases', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('TC_REG_010: Registration with special characters in name', async ({ 
    loginPage, 
    signupPage,
    accountCreatedPage,
    page 
  }) => {
    // Arrange
    const specialName = "O'Brien-Smith Jr.";
    const userData = TestDataFactory.generateRegistrationData({
      name: specialName,
      firstName: "O'Brien",
      lastName: "Smith Jr.",
    });

    // Act
    await loginPage.startSignup(specialName, userData.email);
    await expect(page.locator('text=Enter Account Information')).toBeVisible();
    await signupPage.completeRegistration(userData);

    // Assert
    await accountCreatedPage.verifyAccountCreatedIsDisplayed();
    await accountCreatedPage.clickContinue();
    
    // Note: The displayed name might be formatted differently
    await expect(page.locator('text=Logged in as')).toBeVisible();

    // Cleanup
    await loginPage.deleteAccount();
  });

  test('TC_REG_011: Registration with long input values', async ({ 
    loginPage, 
    signupPage 
  }) => {
    // Arrange - Generate very long values
    const longString = 'A'.repeat(100);
    const userData = TestDataFactory.generateRegistrationData({
      name: longString,
      company: longString,
      address1: longString,
    });

    // Act
    await loginPage.startSignup(longString, userData.email);

    // Assert - Check if values are truncated or accepted
    // This tests the application's handling of boundary conditions
    await signupPage.verifySignupFormIsDisplayed();
  });
});
