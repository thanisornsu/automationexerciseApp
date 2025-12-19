import { test, expect } from '@playwright/test';

/**
 * API Test Suite: Authentication - Login
 *
 * Tests the login API endpoints directly without UI interaction
 * Faster execution, better for CI/CD pipelines
 */

test.describe('API: Login Authentication', () => {
  const baseURL = 'https://automationexercise.com';
  const loginEndpoint = '/api/verifyLogin';

  test('TC_API_LOGIN_001 @smoke: Valid login credentials return success', async ({ request }) => {
    // Allure annotations
    test.info().annotations.push(
      { type: 'severity', description: 'critical' },
      { type: 'tag', description: 'api' },
      { type: 'tag', description: 'smoke' },
      { type: 'epic', description: 'API Testing' },
      { type: 'feature', description: 'Authentication API' },
      { type: 'story', description: 'User login via API' }
    );

    await test.step('Send POST request with valid credentials', async () => {
      const response = await request.post(`${baseURL}${loginEndpoint}`, {
        form: {
          email: 'testautomation@example.com',
          password: 'TestPassword123!',
        },
      });

      // Attach request details to Allure
      await test.info().attach('Request Body', {
        body: JSON.stringify({
          email: 'testautomation@example.com',
          password: '********',
        }, null, 2),
        contentType: 'application/json',
      });

      // Attach response to Allure
      const responseBody = await response.text();
      await test.info().attach('Response', {
        body: responseBody,
        contentType: 'application/json',
      });

      // Assertions
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
    });
  });

  test('TC_API_LOGIN_002: Invalid credentials return error', async ({ request }) => {
    test.info().annotations.push(
      { type: 'severity', description: 'critical' },
      { type: 'tag', description: 'api' },
      { type: 'tag', description: 'regression' },
      { type: 'epic', description: 'API Testing' },
      { type: 'feature', description: 'Authentication API' }
    );

    await test.step('Send POST request with invalid credentials', async () => {
      const response = await request.post(`${baseURL}${loginEndpoint}`, {
        form: {
          email: 'invalid@test.com',
          password: 'wrongpassword',
        },
      });

      const responseBody = await response.json();

      // Attach response
      await test.info().attach('Response', {
        body: JSON.stringify(responseBody, null, 2),
        contentType: 'application/json',
      });

      // Assertions
      expect(response.status()).toBe(404);
      expect(responseBody.responseCode).toBe(404);
      expect(responseBody.message).toContain('User not found');
    });
  });

  test('TC_API_LOGIN_003: Missing email parameter returns error', async ({ request }) => {
    test.info().annotations.push(
      { type: 'severity', description: 'normal' },
      { type: 'tag', description: 'api' },
      { type: 'tag', description: 'regression' },
      { type: 'epic', description: 'API Testing' },
      { type: 'feature', description: 'Authentication API' }
    );

    await test.step('Send POST request without email', async () => {
      const response = await request.post(`${baseURL}${loginEndpoint}`, {
        form: {
          password: 'TestPassword123!',
        },
      });

      const responseBody = await response.json();

      // Assertions
      expect(response.status()).toBe(400);
      expect(responseBody.responseCode).toBe(400);
      console.log('Response Body:', responseBody);
      expect(responseBody.message).toContain('Bad request');
    });
  });

  test('TC_API_LOGIN_004: Response time is acceptable', async ({ request }) => {
    test.info().annotations.push(
      { type: 'severity', description: 'normal' },
      { type: 'tag', description: 'api' },
      { type: 'tag', description: 'performance' },
      { type: 'epic', description: 'API Testing' },
      { type: 'feature', description: 'Performance' }
    );

    await test.step('Measure API response time', async () => {
      const startTime = Date.now();

      await request.post(`${baseURL}${loginEndpoint}`, {
        form: {
          email: 'testautomation@example.com',
          password: 'TestPassword123!',
        },
      });

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      // Attach performance metric
      await test.info().attach('Response Time', {
        body: `${responseTime}ms`,
        contentType: 'text/plain',
      });

      // Assertion: Response time should be under 2 seconds
      expect(responseTime).toBeLessThan(2000);
    });
  });
});

/**
 * Best Practices Demonstrated:
 *
 * 1. API-specific annotations (@api tag)
 * 2. Request/Response attached to Allure
 * 3. Performance testing (response time)
 * 4. Error handling validation
 * 5. Fast execution (no UI overhead)
 * 6. Reusable for CI/CD smoke tests
 */
