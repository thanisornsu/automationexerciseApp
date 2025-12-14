import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * AccountCreatedPage - Page Object for Account Created confirmation page
 * URL: /account_created
 */
export class AccountCreatedPage extends BasePage {
  // Success message elements
  readonly accountCreatedHeader: Locator;
  readonly successMessage: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Locators
    this.accountCreatedHeader = page.locator('h2[data-qa="account-created"]');
    this.successMessage = page.locator('.col-sm-9 p').first();
    this.continueButton = page.locator('a[data-qa="continue-button"]');
  }

  /**
   * Verify account created page is displayed
   */
  async verifyAccountCreatedIsDisplayed(): Promise<void> {
    await expect(this.accountCreatedHeader).toBeVisible();
    await expect(this.accountCreatedHeader).toHaveText('Account Created!');
  }

  /**
   * Get success message text
   */
  async getSuccessMessage(): Promise<string | null> {
    return await this.successMessage.textContent();
  }

  /**
   * Click continue button to proceed to home
   */
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
    await this.waitForPageLoad();
  }

  /**
   * Verify and continue
   */
  async verifyAndContinue(): Promise<void> {
    await this.verifyAccountCreatedIsDisplayed();
    await this.clickContinue();
  }
}
