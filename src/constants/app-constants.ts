/**
 * Application Constants
 * Centralized location for error messages, URLs, UI text, and other static values
 */

/**
 * Error Messages
 */
export const ErrorMessages = {
  LOGIN: {
    INCORRECT_CREDENTIALS: 'Your email or password is incorrect!',
    EMPTY_EMAIL: 'Please fill out this field',
    INVALID_EMAIL_FORMAT: 'Please enter a valid email address',
  },
  SIGNUP: {
    EMAIL_EXISTS: 'Email Address already exist!',
    EMPTY_NAME: 'Please fill out this field',
    EMPTY_EMAIL: 'Please fill out this field',
  },
  VALIDATION: {
    REQUIRED_FIELD: 'Please fill out this field',
    INVALID_EMAIL: 'Please include an \'@\' in the email address',
  },
};

/**
 * Success Messages
 */
export const SuccessMessages = {
  ACCOUNT_CREATED: 'Account Created!',
  ACCOUNT_DELETED: 'Account Deleted!',
  CONGRATULATIONS: 'Congratulations! Your new account has been successfully created!',
};

/**
 * Page URLs and Routes
 */
export const Routes = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  ACCOUNT_CREATED: '/account_created',
  ACCOUNT_DELETED: '/delete_account',
  PRODUCTS: '/products',
  CART: '/view_cart',
  CHECKOUT: '/checkout',
  PAYMENT: '/payment',
  CONTACT_US: '/contact_us',
  TEST_CASES: '/test_cases',
  API_LIST: '/api_list',
};

/**
 * UI Text and Labels
 */
export const UIText = {
  LOGIN_HEADER: 'Login to your account',
  SIGNUP_HEADER: 'New User Signup!',
  ACCOUNT_INFO_HEADER: 'Enter Account Information',
  ADDRESS_INFO_HEADER: 'Address Information',
  LOGGED_IN_AS: 'Logged in as',

  // Button text
  BUTTONS: {
    LOGIN: 'Login',
    SIGNUP: 'Signup',
    CONTINUE: 'Continue',
    CREATE_ACCOUNT: 'Create Account',
    DELETE_ACCOUNT: 'Delete Account',
    LOGOUT: 'Logout',
  },

  // Navigation links
  NAV: {
    HOME: 'Home',
    PRODUCTS: 'Products',
    CART: 'Cart',
    SIGNUP_LOGIN: 'Signup / Login',
    LOGOUT: 'Logout',
    DELETE_ACCOUNT: 'Delete Account',
    LOGGED_IN_AS: 'Logged in as',
  },
};

/**
 * Form Field Labels
 */
export const FormLabels = {
  EMAIL: 'Email',
  PASSWORD: 'Password',
  NAME: 'Name',
  FIRST_NAME: 'First name',
  LAST_NAME: 'Last name',
  COMPANY: 'Company',
  ADDRESS: 'Address',
  COUNTRY: 'Country',
  STATE: 'State',
  CITY: 'City',
  ZIPCODE: 'Zipcode',
  MOBILE_NUMBER: 'Mobile Number',
};

/**
 * Test Timeouts (in milliseconds)
 */
export const Timeouts = {
  SHORT: 5000,
  MEDIUM: 10000,
  LONG: 30000,
  NETWORK_IDLE: 5000,
};

/**
 * Test Data Constraints
 */
export const Constraints = {
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 50,
  NAME_MAX_LENGTH: 100,
  EMAIL_MAX_LENGTH: 255,
};

/**
 * Countries available in dropdown
 */
export const Countries = [
  'India',
  'United States',
  'Canada',
  'Australia',
  'Israel',
  'New Zealand',
  'Singapore',
] as const;

export type Country = typeof Countries[number];

/**
 * Months for date of birth selection
 */
export const Months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

export type Month = typeof Months[number];

/**
 * Title options
 */
export const Titles = ['Mr', 'Mrs'] as const;
export type Title = typeof Titles[number];
