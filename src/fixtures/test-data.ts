import { faker } from '@faker-js/faker';
import { RegisterUserData, LoginCredentials } from '../types';

/**
 * Test Data Factory - Generates dynamic test data using Faker
 */
export class TestDataFactory {
  /**
   * Generate complete registration data
   */
  static generateRegistrationData(overrides?: Partial<RegisterUserData>): RegisterUserData {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    
    return {
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      password: faker.internet.password({ length: 12, memorable: false }),
      title: faker.helpers.arrayElement(['Mr', 'Mrs']),
      birthDay: faker.number.int({ min: 1, max: 28 }).toString(),
      birthMonth: faker.date.month(),
      birthYear: faker.number.int({ min: 1970, max: 2000 }).toString(),
      firstName,
      lastName,
      company: faker.company.name(),
      address1: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country: 'United States',
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      mobileNumber: faker.phone.number(),
      newsletter: faker.datatype.boolean(),
      specialOffers: faker.datatype.boolean(),
      ...overrides,
    };
  }

  /**
   * Generate login credentials
   */
  static generateLoginCredentials(overrides?: Partial<LoginCredentials>): LoginCredentials {
    return {
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password({ length: 10 }),
      ...overrides,
    };
  }

  /**
   * Generate invalid email formats for negative testing
   */
  static generateInvalidEmails(): string[] {
    return [
      'invalid-email',
      'missing@domain',
      '@nodomain.com',
      'spaces in@email.com',
      'double@@at.com',
    ];
  }

  /**
   * Generate weak passwords for validation testing
   */
  static generateWeakPasswords(): string[] {
    return [
      '123',
      'abc',
      '   ',
      '',
    ];
  }
}

/**
 * Static test data for consistent tests
 * Note: For app-defined values like countries, months, error messages, etc.,
 * use the constants from src/constants/app-constants.ts instead
 */
export const StaticTestData = {
  // Valid existing user (for login tests - needs to be created first)
  existingUser: {
    email: 'testautomation@example.com',
    password: 'TestPassword123!',
    name: 'Test Automation User',
  },

  // Invalid credentials for negative tests
  invalidCredentials: {
    nonExistentEmail: 'nonexistent@invalid.com',
    wrongPassword: 'WrongPassword123!',
  },
};
