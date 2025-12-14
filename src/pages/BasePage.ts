import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage - Abstract base class for all page objects
 * Contains common methods and utilities shared across pages
 */
export abstract class BasePage {
  readonly page: Page;
  
  // Common header elements
  readonly logo: Locator;
  readonly homeLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly loginLink: Locator;
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly contactUsLink: Locator;
  readonly loggedInAs: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Initialize common header locators
    this.logo = page.locator('.logo img');
    this.homeLink = page.locator('a[href="/"]').first();
    this.productsLink = page.locator('a[href="/products"]');
    this.cartLink = page.locator('a[href="/view_cart"]');
    this.loginLink = page.locator('a[href="/login"]');
    this.logoutLink = page.locator('a[href="/logout"]');
    this.deleteAccountLink = page.locator('a[href="/delete_account"]');
    this.contactUsLink = page.locator('a[href="/contact_us"]');
    this.loggedInAs = page.locator('a:has-text("Logged in as")');
  }

  /**
   * Navigate to a specific path
   */
  async goto(path: string = '/'): Promise<void> {
    await this.page.goto(path);
    await this.waitForPageLoad();
  }

  /**
   * Wait for page to fully load
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    // Use a shorter timeout for networkidle to handle pages with persistent network activity (ads, analytics)
    try {
      await this.page.waitForLoadState('networkidle', { timeout: 5000 });
    } catch {
      // If network doesn't go idle within 5s, continue anyway
      // This is acceptable as domcontentloaded ensures the page is interactive
    }
  }

  /**
   * Handle Google Ads consent popup if it appears
   */
  async handleAdsConsent(): Promise<void> {
    try {
      const consentFrame = this.page.frameLocator('iframe[title*="consent"]');
      const agreeButton = consentFrame.locator('button:has-text("Agree")');
      
      if (await agreeButton.isVisible({ timeout: 3000 })) {
        await agreeButton.click();
      }
    } catch {
      // Consent popup not present, continue
    }
  }

  /**
   * Click element and wait for navigation
   */
  async clickAndWaitForNavigation(locator: Locator): Promise<void> {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle' }),
      locator.click(),
    ]);
  }

  /**
   * Get current page URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Check if user is logged in
   */
  async isUserLoggedIn(): Promise<boolean> {
    return await this.loggedInAs.isVisible();
  }

  /**
   * Get logged in username
   */
  async getLoggedInUsername(): Promise<string | null> {
    if (await this.isUserLoggedIn()) {
      const text = await this.loggedInAs.textContent();
      return text?.replace('Logged in as ', '') || null;
    }
    return null;
  }

  /**
   * Navigate to login page
   */
  async goToLogin(): Promise<void> {
    await this.loginLink.click();
    await this.waitForPageLoad();
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    await this.logoutLink.click();
    await this.waitForPageLoad();
  }

  /**
   * Delete account
   */
  async deleteAccount(): Promise<void> {
    await this.deleteAccountLink.click();
    await this.waitForPageLoad();
  }

  /**
   * Take screenshot with custom name
   */
  async takeScreenshot(name: string): Promise<Buffer> {
    return await this.page.screenshot({ 
      path: `test-results/screenshots/${name}.png`,
      fullPage: true 
    });
  }

  /**
   * Scroll to element
   */
  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Wait for element to be visible
   */
  async waitForVisible(locator: Locator, timeout: number = 10000): Promise<void> {
    await expect(locator).toBeVisible({ timeout });
  }

  /**
   * Fill input field with clear
   */
  async fillInput(locator: Locator, value: string): Promise<void> {
    await locator.clear();
    await locator.fill(value);
  }

  /**
   * Select dropdown by visible text
   */
  async selectByText(locator: Locator, text: string): Promise<void> {
    await locator.selectOption({ label: text });
  }

  /**
   * Select dropdown by value
   */
  async selectByValue(locator: Locator, value: string): Promise<void> {
    await locator.selectOption({ value });
  }
}
