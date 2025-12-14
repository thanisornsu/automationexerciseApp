import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { RegisterUserData } from '../types';

/**
 * SignupPage - Page Object for Account Information page (Signup Step 2)
 * URL: /signup
 */
export class SignupPage extends BasePage {
  // Page header
  readonly pageHeader: Locator;
  readonly accountInfoHeader: Locator;
  
  // Account Information section
  readonly titleMr: Locator;
  readonly titleMrs: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly daySelect: Locator;
  readonly monthSelect: Locator;
  readonly yearSelect: Locator;
  
  // Checkboxes
  readonly newsletterCheckbox: Locator;
  readonly specialOffersCheckbox: Locator;
  
  // Address Information section
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  
  // Submit button
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Headers
    this.pageHeader = page.locator('.signup-form');
    this.accountInfoHeader = page.locator('text=Enter Account Information');
    
    // Account Information locators
    this.titleMr = page.locator('#id_gender1');
    this.titleMrs = page.locator('#id_gender2');
    this.nameInput = page.locator('input[data-qa="name"]');
    this.emailInput = page.locator('input[data-qa="email"]');
    this.passwordInput = page.locator('input[data-qa="password"]');
    this.daySelect = page.locator('select[data-qa="days"]');
    this.monthSelect = page.locator('select[data-qa="months"]');
    this.yearSelect = page.locator('select[data-qa="years"]');
    
    // Checkboxes
    this.newsletterCheckbox = page.locator('#newsletter');
    this.specialOffersCheckbox = page.locator('#optin');
    
    // Address Information locators
    this.firstNameInput = page.locator('input[data-qa="first_name"]');
    this.lastNameInput = page.locator('input[data-qa="last_name"]');
    this.companyInput = page.locator('input[data-qa="company"]');
    this.address1Input = page.locator('input[data-qa="address"]');
    this.address2Input = page.locator('input[data-qa="address2"]');
    this.countrySelect = page.locator('select[data-qa="country"]');
    this.stateInput = page.locator('input[data-qa="state"]');
    this.cityInput = page.locator('input[data-qa="city"]');
    this.zipcodeInput = page.locator('input[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('input[data-qa="mobile_number"]');
    
    // Submit
    this.createAccountButton = page.locator('button[data-qa="create-account"]');
  }

  /**
   * Verify signup form page is displayed
   */
  async verifySignupFormIsDisplayed(): Promise<void> {
    await expect(this.accountInfoHeader).toBeVisible();
    await expect(this.nameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }

  /**
   * Select title (Mr/Mrs)
   */
  async selectTitle(title: 'Mr' | 'Mrs'): Promise<void> {
    if (title === 'Mr') {
      await this.titleMr.check();
    } else {
      await this.titleMrs.check();
    }
  }

  /**
   * Fill account information section
   */
  async fillAccountInfo(data: RegisterUserData): Promise<void> {
    // Title
    if (data.title) {
      await this.selectTitle(data.title);
    }
    
    // Password
    await this.fillInput(this.passwordInput, data.password);
    
    // Date of birth
    if (data.birthDay) {
      await this.daySelect.selectOption(data.birthDay);
    }
    if (data.birthMonth) {
      await this.monthSelect.selectOption({ label: data.birthMonth });
    }
    if (data.birthYear) {
      await this.yearSelect.selectOption(data.birthYear);
    }
    
    // Newsletter & offers
    if (data.newsletter) {
      await this.newsletterCheckbox.check();
    }
    if (data.specialOffers) {
      await this.specialOffersCheckbox.check();
    }
  }

  /**
   * Fill address information section
   */
  async fillAddressInfo(data: RegisterUserData): Promise<void> {
    if (data.firstName) {
      await this.fillInput(this.firstNameInput, data.firstName);
    }
    if (data.lastName) {
      await this.fillInput(this.lastNameInput, data.lastName);
    }
    if (data.company) {
      await this.fillInput(this.companyInput, data.company);
    }
    if (data.address1) {
      await this.fillInput(this.address1Input, data.address1);
    }
    if (data.address2) {
      await this.fillInput(this.address2Input, data.address2);
    }
    if (data.country) {
      await this.countrySelect.selectOption(data.country);
    }
    if (data.state) {
      await this.fillInput(this.stateInput, data.state);
    }
    if (data.city) {
      await this.fillInput(this.cityInput, data.city);
    }
    if (data.zipcode) {
      await this.fillInput(this.zipcodeInput, data.zipcode);
    }
    if (data.mobileNumber) {
      await this.fillInput(this.mobileNumberInput, data.mobileNumber);
    }
  }

  /**
   * Fill complete registration form
   */
  async fillCompleteForm(data: RegisterUserData): Promise<void> {
    await this.fillAccountInfo(data);
    await this.fillAddressInfo(data);
  }

  /**
   * Submit registration form
   */
  async submitRegistration(): Promise<void> {
    await this.createAccountButton.click();
    await this.waitForPageLoad();
  }

  /**
   * Complete full registration
   */
  async completeRegistration(data: RegisterUserData): Promise<void> {
    await this.fillCompleteForm(data);
    await this.submitRegistration();
  }

  /**
   * Verify name is pre-filled (from step 1)
   */
  async verifyNamePreFilled(expectedName: string): Promise<void> {
    await expect(this.nameInput).toHaveValue(expectedName);
  }

  /**
   * Verify email is pre-filled and readonly
   */
  async verifyEmailPreFilled(expectedEmail: string): Promise<void> {
    await expect(this.emailInput).toHaveValue(expectedEmail);
    await expect(this.emailInput).toBeDisabled();
  }
}
