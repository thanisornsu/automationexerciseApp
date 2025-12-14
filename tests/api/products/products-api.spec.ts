import { test, expect } from '@playwright/test';

/**
 * API Test Suite: Products
 *
 * Tests product-related API endpoints
 */

test.describe('API: Products', () => {
  const baseURL = 'https://automationexercise.com';

  test('TC_API_PROD_001: Get all products list', async ({ request }) => {
    test.info().annotations.push(
      { type: 'severity', description: 'critical' },
      { type: 'tag', description: 'api' },
      { type: 'tag', description: 'smoke' },
      { type: 'epic', description: 'API Testing' },
      { type: 'feature', description: 'Products API' },
      { type: 'story', description: 'Retrieve product catalog' }
    );

    await test.step('Send GET request to /api/productsList', async () => {
      const response = await request.get(`${baseURL}/api/productsList`);

      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);

      const responseBody = await response.json();

      // Attach response sample
      await test.info().attach('Response Sample', {
        body: JSON.stringify(responseBody.products?.slice(0, 2), null, 2),
        contentType: 'application/json',
      });

      // Assertions
      expect(responseBody.responseCode).toBe(200);
      expect(responseBody.products).toBeDefined();
      expect(Array.isArray(responseBody.products)).toBeTruthy();
      expect(responseBody.products.length).toBeGreaterThan(0);
    });
  });

  test('TC_API_PROD_002: Verify product structure', async ({ request }) => {
    test.info().annotations.push(
      { type: 'severity', description: 'normal' },
      { type: 'tag', description: 'api' },
      { type: 'tag', description: 'regression' },
      { type: 'epic', description: 'API Testing' },
      { type: 'feature', description: 'Products API' }
    );

    await test.step('Validate product object schema', async () => {
      const response = await request.get(`${baseURL}/api/productsList`);
      const responseBody = await response.json();

      const firstProduct = responseBody.products[0];

      // Attach product sample
      await test.info().attach('Product Schema', {
        body: JSON.stringify(firstProduct, null, 2),
        contentType: 'application/json',
      });

      // Validate product structure
      expect(firstProduct).toHaveProperty('id');
      expect(firstProduct).toHaveProperty('name');
      expect(firstProduct).toHaveProperty('price');
      expect(firstProduct).toHaveProperty('brand');
      expect(firstProduct).toHaveProperty('category');
    });
  });

  test('TC_API_PROD_003: Search product by name', async ({ request }) => {
    test.info().annotations.push(
      { type: 'severity', description: 'normal' },
      { type: 'tag', description: 'api' },
      { type: 'tag', description: 'regression' },
      { type: 'epic', description: 'API Testing' },
      { type: 'feature', description: 'Product Search API' }
    );

    await test.step('Search for specific product', async () => {
      const response = await request.post(`${baseURL}/api/searchProduct`, {
        form: {
          search_product: 'tshirt',
        },
      });

      expect(response.status()).toBe(200);

      const responseBody = await response.json();

      // Attach search results
      await test.info().attach('Search Results', {
        body: JSON.stringify(responseBody, null, 2),
        contentType: 'application/json',
      });

      expect(responseBody.responseCode).toBe(200);
      expect(responseBody.products).toBeDefined();
      expect(responseBody.products.length).toBeGreaterThan(0);

      // Verify search results contain the search term
      const productNames = responseBody.products.map((p: any) => p.name.toLowerCase());
      const hasSearchTerm = productNames.some((name: string) => name.includes('tshirt'));
      expect(hasSearchTerm).toBeTruthy();
    });
  });

  test('TC_API_PROD_004: API response time benchmark', async ({ request }) => {
    test.info().annotations.push(
      { type: 'severity', description: 'normal' },
      { type: 'tag', description: 'api' },
      { type: 'tag', description: 'performance' },
      { type: 'epic', description: 'API Testing' },
      { type: 'feature', description: 'Performance' }
    );

    await test.step('Measure product list API performance', async () => {
      const measurements: number[] = [];

      // Run 5 requests and measure average
      for (let i = 0; i < 5; i++) {
        const startTime = Date.now();
        await request.get(`${baseURL}/api/productsList`);
        const endTime = Date.now();
        measurements.push(endTime - startTime);
      }

      const averageTime = measurements.reduce((a, b) => a + b, 0) / measurements.length;
      const maxTime = Math.max(...measurements);
      const minTime = Math.min(...measurements);

      // Attach performance metrics
      await test.info().attach('Performance Metrics', {
        body: JSON.stringify({
          average: `${averageTime.toFixed(2)}ms`,
          min: `${minTime}ms`,
          max: `${maxTime}ms`,
          measurements: measurements.map(m => `${m}ms`),
        }, null, 2),
        contentType: 'application/json',
      });

      // Assertion: Average should be under 1 second
      expect(averageTime).toBeLessThan(1000);
    });
  });
});

/**
 * API Testing Benefits:
 *
 * 1. Faster execution (no browser overhead)
 * 2. Test data validation at source
 * 3. Better for CI/CD pipelines
 * 4. Can run in parallel easily
 * 5. Performance benchmarking
 * 6. Contract testing
 */
