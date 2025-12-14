# Test Folder Structure - Best Practices Guide

## 📁 Project Structure Overview

```
tests/
├── frontend/                 # UI/E2E tests using Playwright browser automation
│   ├── auth/                # Authentication UI tests
│   │   ├── login.spec.ts
│   │   └── register.spec.ts
│   ├── products/            # Product browsing UI tests
│   │   ├── product-list.spec.ts
│   │   ├── product-details.spec.ts
│   │   └── product-search.spec.ts
│   ├── cart/                # Shopping cart UI tests
│   │   ├── add-to-cart.spec.ts
│   │   ├── update-cart.spec.ts
│   │   └── remove-from-cart.spec.ts
│   └── checkout/            # Checkout flow UI tests
│       ├── checkout-flow.spec.ts
│       └── payment.spec.ts
│
├── api/                     # API tests using Playwright request context
│   ├── auth/               # Authentication API tests
│   │   ├── login-api.spec.ts
│   │   └── register-api.spec.ts
│   ├── products/           # Products API tests
│   │   ├── products-api.spec.ts
│   │   └── search-api.spec.ts
│   └── cart/               # Cart API tests
│       └── cart-api.spec.ts
│
└── examples/               # Example tests and templates
    └── allure-enhanced-test.example.ts
```

---

## 🎯 Why Separate Frontend and API?

### **Frontend Tests (UI/E2E)**
**Purpose:** Test user-facing functionality through the browser

**Characteristics:**
- ✅ Slower execution (browser overhead)
- ✅ Tests complete user journeys
- ✅ Validates UI/UX
- ✅ Catches visual bugs
- ✅ Tests browser compatibility
- ✅ Uses Page Object Model

**When to Use:**
- User workflows (login → browse → add to cart → checkout)
- UI validation (buttons, forms, modals)
- Visual regression testing
- Cross-browser testing
- Accessibility testing

**Example:**
```typescript
// tests/frontend/auth/login.spec.ts
test('User can login through UI', async ({ loginPage }) => {
  await loginPage.navigate();
  await loginPage.login({ email: 'test@test.com', password: 'pass123' });
  await expect(page.locator('text=Logged in')).toBeVisible();
});
```

---

### **API Tests**
**Purpose:** Test backend functionality directly via HTTP requests

**Characteristics:**
- ⚡ Fast execution (no browser)
- ⚡ Tests data/business logic
- ⚡ Better for CI/CD smoke tests
- ⚡ Easy to run in parallel
- ⚡ Performance benchmarking
- ⚡ Contract testing

**When to Use:**
- Data validation
- Performance testing
- Integration testing
- Smoke tests for CI/CD
- Testing endpoints before UI is ready
- Load testing preparation

**Example:**
```typescript
// tests/api/auth/login-api.spec.ts
test('Login API returns success', async ({ request }) => {
  const response = await request.post('/api/login', {
    data: { email: 'test@test.com', password: 'pass123' }
  });
  expect(response.status()).toBe(200);
});
```

---

## 📊 Comparison Table

| Aspect | Frontend Tests | API Tests |
|--------|----------------|-----------|
| **Speed** | Slow (5-10s per test) | Fast (<1s per test) |
| **Coverage** | UI + API + Business Logic | API + Business Logic only |
| **Flakiness** | Higher (network, rendering) | Lower (direct HTTP) |
| **CI/CD** | Run subset (@smoke) | Run all tests |
| **Cost** | Higher (browser resources) | Lower (just HTTP) |
| **Debugging** | Screenshots, videos, traces | Request/response logs |
| **Maintenance** | Higher (UI changes) | Lower (API stable) |
| **Use Case** | User journeys | Data validation |

---

## 🏗️ Detailed Folder Structure

### **Frontend Tests**

```
tests/frontend/
├── auth/
│   ├── login.spec.ts           # TC_LOGIN_001-005
│   ├── register.spec.ts        # TC_REG_001-008
│   ├── logout.spec.ts          # TC_LOGOUT_001-002
│   └── password-reset.spec.ts  # TC_RESET_001-003
│
├── products/
│   ├── product-list.spec.ts    # TC_PROD_LIST_001-005
│   ├── product-details.spec.ts # TC_PROD_DETAILS_001-003
│   ├── product-search.spec.ts  # TC_SEARCH_001-005
│   └── product-filter.spec.ts  # TC_FILTER_001-004
│
├── cart/
│   ├── add-to-cart.spec.ts     # TC_CART_ADD_001-005
│   ├── update-cart.spec.ts     # TC_CART_UPDATE_001-003
│   ├── remove-from-cart.spec.ts # TC_CART_REMOVE_001-002
│   └── cart-validation.spec.ts  # TC_CART_VAL_001-003
│
├── checkout/
│   ├── checkout-flow.spec.ts   # TC_CHECKOUT_001-010
│   ├── payment.spec.ts         # TC_PAYMENT_001-005
│   └── order-confirmation.spec.ts # TC_ORDER_001-003
│
└── account/
    ├── profile.spec.ts         # TC_PROFILE_001-005
    ├── order-history.spec.ts   # TC_HISTORY_001-003
    └── account-delete.spec.ts  # TC_DELETE_001-002
```

### **API Tests**

```
tests/api/
├── auth/
│   ├── login-api.spec.ts       # TC_API_LOGIN_001-005
│   ├── register-api.spec.ts    # TC_API_REG_001-005
│   └── token-api.spec.ts       # TC_API_TOKEN_001-003
│
├── products/
│   ├── products-api.spec.ts    # TC_API_PROD_001-008
│   ├── search-api.spec.ts      # TC_API_SEARCH_001-005
│   └── categories-api.spec.ts  # TC_API_CAT_001-003
│
├── cart/
│   ├── cart-api.spec.ts        # TC_API_CART_001-006
│   └── cart-sync-api.spec.ts   # TC_API_SYNC_001-003
│
└── orders/
    ├── create-order-api.spec.ts # TC_API_ORDER_001-005
    └── order-status-api.spec.ts # TC_API_STATUS_001-003
```

---

## 🎨 Naming Conventions

### **File Naming**
```
✅ Good:
- login.spec.ts
- product-list.spec.ts
- login-api.spec.ts

❌ Bad:
- LoginTest.ts
- test_login.ts
- login_tests.ts
```

### **Test ID Naming**
```typescript
// Frontend tests
TC_LOGIN_001: User can login with valid credentials
TC_CART_ADD_001: Add product to cart from product page

// API tests
TC_API_LOGIN_001: Login API returns success with valid credentials
TC_API_PROD_001: Get all products returns 200 status
```

### **Test Tags**
```typescript
// Frontend
test.info().annotations.push(
  { type: 'tag', description: 'frontend' },
  { type: 'tag', description: 'smoke' }
);

// API
test.info().annotations.push(
  { type: 'tag', description: 'api' },
  { type: 'tag', description: 'smoke' }
);
```

---

## ⚙️ NPM Scripts for Running Tests

Update `package.json`:

```json
{
  "scripts": {
    "test": "playwright test",

    "test:frontend": "playwright test tests/frontend/",
    "test:api": "playwright test tests/api/",

    "test:frontend:auth": "playwright test tests/frontend/auth/",
    "test:frontend:products": "playwright test tests/frontend/products/",
    "test:frontend:cart": "playwright test tests/frontend/cart/",
    "test:frontend:checkout": "playwright test tests/frontend/checkout/",

    "test:api:auth": "playwright test tests/api/auth/",
    "test:api:products": "playwright test tests/api/products/",

    "test:smoke": "playwright test --grep @smoke",
    "test:smoke:api": "playwright test tests/api/ --grep @smoke",
    "test:smoke:frontend": "playwright test tests/frontend/ --grep @smoke",

    "test:regression": "playwright test --grep @regression",
    "test:security": "playwright test --grep @security",

    "test:allure": "npm run allure:clean && playwright test && npm run allure:generate && npm run allure:open"
  }
}
```

---

## 🚀 Usage Examples

### **Daily Development**

```bash
# Run all tests
npm test

# Run only frontend tests
npm run test:frontend

# Run only API tests (fast feedback)
npm run test:api

# Run specific module
npm run test:frontend:auth
npm run test:api:products
```

### **CI/CD Pipeline**

```bash
# Smoke tests (fast, critical paths)
npm run test:smoke          # All smoke tests
npm run test:smoke:api      # API smoke only (fastest)
npm run test:smoke:frontend # Frontend smoke only

# Full regression (nightly)
npm run test:regression
```

### **Before Pull Request**

```bash
# Run tests related to your changes
npm run test:frontend:auth  # If you changed auth UI
npm run test:api:auth       # If you changed auth API

# Run smoke to ensure no critical breaks
npm run test:smoke
```

---

## 🎯 Test Strategy

### **Pyramid Strategy**

```
         ╱╲
        ╱  ╲
       ╱ UI ╲         ← Fewer tests (10-20%)
      ╱──────╲          Slow, expensive
     ╱        ╲         Critical user journeys
    ╱ API/Int ╲       ← More tests (30-40%)
   ╱────────────╲       Fast, reliable
  ╱   Unit Tests ╲    ← Most tests (50-60%)
 ╱────────────────╲     Very fast
```

**Applied to this project:**

```
Frontend Tests (UI):     20-30 tests
├─ Smoke: 5-10 tests (critical paths)
└─ Regression: 20-30 tests (full coverage)

API Tests:               40-60 tests
├─ Smoke: 10-15 tests (endpoints)
└─ Regression: 40-60 tests (all scenarios)

Total: ~70-90 tests
```

---

## 📋 Test Coverage Matrix

| Feature | Frontend Tests | API Tests | Total |
|---------|----------------|-----------|-------|
| **Authentication** | 8 tests | 5 tests | 13 |
| **Products** | 12 tests | 8 tests | 20 |
| **Cart** | 10 tests | 6 tests | 16 |
| **Checkout** | 15 tests | 5 tests | 20 |
| **Account** | 8 tests | 3 tests | 11 |
| **Total** | **53** | **27** | **80** |

---

## 🔄 When to Use Each Type

### **Use Frontend Tests For:**
1. ✅ Complete user journeys (login → browse → checkout)
2. ✅ UI validation (buttons visible, forms functional)
3. ✅ Browser compatibility
4. ✅ Visual regression
5. ✅ Accessibility testing
6. ✅ Cookie/session handling
7. ✅ Client-side validation

### **Use API Tests For:**
1. ✅ Data validation (correct response structure)
2. ✅ Performance benchmarks
3. ✅ Smoke tests (quick feedback)
4. ✅ Integration testing
5. ✅ Contract testing
6. ✅ Testing before UI is ready
7. ✅ Load testing preparation

### **Use Both For:**
1. ✅ Critical features (login, payment)
2. ✅ Data consistency (cart sync)
3. ✅ Full coverage

---

## 🛠️ Migrating Existing Tests

### **Step 1: Identify Test Type**

```typescript
// Is this test using the browser UI?
await page.click('[data-qa="login-button"]')  // → Frontend

// Is this test making HTTP requests?
await request.post('/api/login')              // → API
```

### **Step 2: Move Files**

```bash
# Frontend tests
mv tests/auth/*.spec.ts tests/frontend/auth/

# If you create API tests
# Create new files in tests/api/auth/
```

### **Step 3: Update Imports**

```typescript
// Update relative imports
// Before: import { test } from '../../src/fixtures'
// After:  import { test } from '../../../src/fixtures'
```

### **Step 4: Update Tags**

```typescript
// Add appropriate tags
test.info().annotations.push(
  { type: 'tag', description: 'frontend' }  // or 'api'
);
```

---

## 📊 Reporting by Test Type

### **Allure Configuration**

Update `.allure-categories.json`:

```json
[
  {
    "name": "Frontend Test Failures",
    "matchedStatuses": ["failed"],
    "messageRegex": ".*frontend.*"
  },
  {
    "name": "API Test Failures",
    "matchedStatuses": ["failed"],
    "messageRegex": ".*api.*"
  }
]
```

### **Viewing Reports by Type**

In Allure Report:
- **Behaviors Tab** → Filter by Epic: "Frontend Testing" or "API Testing"
- **Suites Tab** → See tests/frontend/ and tests/api/ separately
- **Graphs Tab** → Distribution by tag (@frontend, @api)

---

## ✅ Best Practices Checklist

### **Organization**
- [ ] Frontend and API tests separated
- [ ] Logical feature-based folders
- [ ] Consistent naming conventions
- [ ] Clear test IDs

### **Tagging**
- [ ] All tests tagged (@frontend or @api)
- [ ] Smoke tests identified (@smoke)
- [ ] Regression tests identified (@regression)
- [ ] Critical tests marked (severity: critical)

### **Performance**
- [ ] API tests in CI/CD for fast feedback
- [ ] Frontend smoke tests only in pre-merge
- [ ] Full frontend regression nightly
- [ ] Parallel execution enabled

### **Maintenance**
- [ ] DRY principle (no duplicate tests)
- [ ] Page Objects for frontend
- [ ] API helpers for API tests
- [ ] Shared test data factory

---

## 📚 Additional Resources

- [Playwright API Testing Guide](https://playwright.dev/docs/api-testing)
- [Test Automation Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
- [API vs UI Testing](https://www.browserstack.com/guide/api-testing-vs-ui-testing)

---

## 🎓 Summary

**Frontend Tests:**
- Use browser automation
- Test user-facing features
- Slower but comprehensive
- ~20-30% of total tests

**API Tests:**
- Use HTTP requests
- Test backend logic
- Faster and more stable
- ~40-60% of total tests

**Together:**
- Complete test coverage
- Fast feedback (API)
- User validation (Frontend)
- Production confidence
