import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HomePage - Page Object for the main landing page
 */
export class HomePage extends BasePage {
  // Hero section
  readonly heroSlider: Locator;
  readonly leftSidebarCategories: Locator;
  
  // Featured items section
  readonly featuredItems: Locator;
  readonly viewProductButtons: Locator;
  readonly addToCartButtons: Locator;
  
  // Subscription section
  readonly subscriptionEmail: Locator;
  readonly subscribeButton: Locator;
  readonly subscriptionSuccessMessage: Locator;

  constructor(page: Page) {
    super(page);
    
    // Hero section locators
    this.heroSlider = page.locator('#slider');
    this.leftSidebarCategories = page.locator('.left-sidebar .category-products');
    
    // Featured items locators
    this.featuredItems = page.locator('.features_items');
    this.viewProductButtons = page.locator('a[href^="/product_details/"]');
    this.addToCartButtons = page.locator('.add-to-cart');
    
    // Subscription locators
    this.subscriptionEmail = page.locator('#susbscribe_email');
    this.subscribeButton = page.locator('#subscribe');
    this.subscriptionSuccessMessage = page.locator('.alert-success.alert');
  }

  /**
   * Navigate to home page
   */
  async navigate(): Promise<void> {
    await this.goto('/');
    await this.handleAdsConsent();
  }

  /**
   * Verify home page is displayed
   */
  async verifyHomePageIsDisplayed(): Promise<void> {
    await expect(this.heroSlider).toBeVisible();
    await expect(this.featuredItems).toBeVisible();
  }

  /**
   * Get number of featured products
   */
  async getFeaturedProductsCount(): Promise<number> {
    return await this.viewProductButtons.count();
  }

  /**
   * Subscribe to newsletter
   */
  async subscribeToNewsletter(email: string): Promise<void> {
    await this.subscriptionEmail.scrollIntoViewIfNeeded();
    await this.fillInput(this.subscriptionEmail, email);
    await this.subscribeButton.click();
  }

  /**
   * Verify subscription success
   */
  async verifySubscriptionSuccess(): Promise<void> {
    await expect(this.subscriptionSuccessMessage).toBeVisible();
    await expect(this.subscriptionSuccessMessage).toContainText('successfully subscribed');
  }

  /**
   * Click on a category in sidebar
   */
  async selectCategory(categoryName: string): Promise<void> {
    const category = this.page.locator(`.panel-title a:has-text("${categoryName}")`);
    await category.click();
  }

  /**
   * View product details by index
   */
  async viewProductByIndex(index: number): Promise<void> {
    await this.viewProductButtons.nth(index).click();
    await this.waitForPageLoad();
  }

  /**
   * Add product to cart by index
   */
  async addProductToCartByIndex(index: number): Promise<void> {
    const productCard = this.page.locator('.product-image-wrapper').nth(index);
    await productCard.hover();
    await productCard.locator('.add-to-cart').first().click();
  }
}
