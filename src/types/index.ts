/**
 * Type definitions for Automation Exercise tests
 */

// User registration data
export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  title?: 'Mr' | 'Mrs';
  birthDay?: string;
  birthMonth?: string;
  birthYear?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  address1?: string;
  address2?: string;
  country?: string;
  state?: string;
  city?: string;
  zipcode?: string;
  mobileNumber?: string;
  newsletter?: boolean;
  specialOffers?: boolean;
}

// Login credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// User account info displayed after login
export interface UserAccountInfo {
  username: string;
  isLoggedIn: boolean;
}

// API Response types
export interface ApiResponse<T = unknown> {
  responseCode: number;
  message: string;
  data?: T;
}

// Product data
export interface Product {
  id: number;
  name: string;
  price: string;
  brand: string;
  category: string;
}

// Cart item
export interface CartItem {
  product: Product;
  quantity: number;
  totalPrice: string;
}

// Test result metadata
export interface TestMetadata {
  testId: string;
  feature: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
}
