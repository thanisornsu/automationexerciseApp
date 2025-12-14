import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * AccountDeletedPage - Page Object for Account Deleted confirmation page
 * URL: /delete_account
 */
export class AccountDeletedPage extends BasePage {
  // Page elements
  readonly accountDeletedHeader: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Locators
    this.accountDeletedHeader = page.locator('h2[data-qa="account-deleted"]');
    this.continueButton = page.locator('a[data-qa="continue-button"]');
  }

  /**
   * Verify account deleted page is displayed
   */
  async verifyAccountDeletedIsDisplayed(): Promise<void> {
    await expect(this.accountDeletedHeader).toBeVisible();
    await expect(this.accountDeletedHeader).toHaveText('Account Deleted!');
  }

  /**
   * Click continue button
   */
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
    await this.waitForPageLoad();
  }

  /**
   * Verify deletion and continue
   */
  async verifyAndContinue(): Promise<void> {
    await this.verifyAccountDeletedIsDisplayed();
    await this.clickContinue();
  }
}
