import { test as base } from '@playwright/test';
import { 
  HomePage, 
  LoginPage, 
  SignupPage, 
  AccountCreatedPage,
  AccountDeletedPage 
} from '../pages';

/**
 * Custom test fixtures extending Playwright's base test
 * Provides page objects as fixtures for cleaner test code
 */
type PageFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  signupPage: SignupPage;
  accountCreatedPage: AccountCreatedPage;
  accountDeletedPage: AccountDeletedPage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  signupPage: async ({ page }, use) => {
    const signupPage = new SignupPage(page);
    await use(signupPage);
  },

  accountCreatedPage: async ({ page }, use) => {
    const accountCreatedPage = new AccountCreatedPage(page);
    await use(accountCreatedPage);
  },

  accountDeletedPage: async ({ page }, use) => {
    const accountDeletedPage = new AccountDeletedPage(page);
    await use(accountDeletedPage);
  },
});

export { expect } from '@playwright/test';
