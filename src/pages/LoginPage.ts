import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginCredentials, RegisterUserData } from '../types';

/**
 * LoginPage - Page Object for Login/Signup page
 * URL: /login
 */
export class LoginPage extends BasePage {
  // Page identifiers
  readonly pageTitle: Locator;
  
  // Login form elements
  readonly loginHeader: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMessage: Locator;
  
  // Signup form elements
  readonly signupHeader: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly signupErrorMessage: Locator;

  constructor(page: Page) {
    super(page);
    
    // Page title
    this.pageTitle = page.locator('.login-form h2, .signup-form h2').first();
    
    // Login form locators
    this.loginHeader = page.locator('.login-form h2');
    this.loginEmailInput = page.locator('input[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.loginErrorMessage = page.locator('.login-form p[style*="color: red"]');
    
    // Signup form locators
    this.signupHeader = page.locator('.signup-form h2');
    this.signupNameInput = page.locator('input[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
    this.signupErrorMessage = page.locator('.signup-form p[style*="color: red"]');
  }

  /**
   * Navigate to login page
   */
  async navigate(): Promise<void> {
    await this.goto('/login');
    await this.handleAdsConsent();
  }

  /**
   * Check if login page elements are displayed
   * @returns Object with visibility status of login and signup headers
   */
  async isLoginPageDisplayed(): Promise<boolean> {
    const loginVisible = await this.loginHeader.isVisible();
    const signupVisible = await this.signupHeader.isVisible();
    return loginVisible && signupVisible;
  }

  /**
   * Login with credentials
   */
  async login(credentials: LoginCredentials): Promise<void> {
    await this.fillInput(this.loginEmailInput, credentials.email);
    await this.fillInput(this.loginPasswordInput, credentials.password);
    await this.loginButton.click();
    await this.waitForPageLoad();
  }

  /**
   * Check if login error message is visible
   */
  async isLoginErrorVisible(): Promise<boolean> {
    return await this.loginErrorMessage.isVisible();
  }

  /**
   * Get login error message text
   */
  async getLoginErrorMessage(): Promise<string | null> {
    return await this.loginErrorMessage.textContent();
  }

  /**
   * Fill signup form (step 1)
   */
  async fillSignupForm(name: string, email: string): Promise<void> {
    await this.fillInput(this.signupNameInput, name);
    await this.fillInput(this.signupEmailInput, email);
  }

  /**
   * Submit signup form (step 1)
   */
  async submitSignup(): Promise<void> {
    await this.signupButton.click();
    await this.waitForPageLoad();
  }

  /**
   * Start signup process and proceed to account info page
   */
  async startSignup(name: string, email: string): Promise<void> {
    await this.fillSignupForm(name, email);
    await this.submitSignup();
  }

  /**
   * Check if signup error message is visible
   */
  async isSignupErrorVisible(): Promise<boolean> {
    return await this.signupErrorMessage.isVisible();
  }

  /**
   * Get signup error message text
   */
  async getSignupErrorMessage(): Promise<string | null> {
    return await this.signupErrorMessage.textContent();
  }

  /**
   * Check if signup form is visible
   */
  async isSignupFormVisible(): Promise<boolean> {
    const nameVisible = await this.signupNameInput.isVisible();
    const emailVisible = await this.signupEmailInput.isVisible();
    const buttonVisible = await this.signupButton.isVisible();
    return nameVisible && emailVisible && buttonVisible;
  }

  /**
   * Check if login form is visible
   */
  async isLoginFormVisible(): Promise<boolean> {
    const emailVisible = await this.loginEmailInput.isVisible();
    const passwordVisible = await this.loginPasswordInput.isVisible();
    const buttonVisible = await this.loginButton.isVisible();
    return emailVisible && passwordVisible && buttonVisible;
  }
}
