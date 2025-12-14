# 🤖 AI Agent Usage Examples

**Real-world examples of effective AI agent prompts for QA automation**

---

## Example 1: Adding a New Test Suite (Cart Functionality)

### ❌ Bad Approach

**Prompt 1:**
```
"Add cart tests"
```

**Problems:**
- Too vague
- No context
- No file structure specified
- Agent will ask many clarifying questions

**Prompt 2:**
```
"Create cart page and tests"
```

**Problems:**
- Still vague
- No pattern reference
- No requirements specified

---

### ✅ Good Approach

**Step 1: Planning (You do this first)**
```markdown
## Cart Test Suite Plan

### Page Object: CartPage.ts
- Location: src/pages/CartPage.ts
- Extends: BasePage
- Methods needed:
  - navigateToCart()
  - addProductToCart(productId: string)
  - removeProduct(productId: string)
  - updateQuantity(productId: string, quantity: number)
  - verifyCartTotal(expectedTotal: number)
  - getCartItemCount()

### Test File: cart.spec.ts
- Location: tests/frontend/cart/cart.spec.ts
- Test Cases:
  - TC_CART_001: Add product to cart (@smoke)
  - TC_CART_002: Remove product from cart
  - TC_CART_003: Update product quantity
  - TC_CART_004: Verify cart total calculation
  - TC_CART_005: Add multiple products to cart

### Pattern Reference:
- Page Object: src/pages/LoginPage.ts
- Test File: tests/frontend/auth/login.spec.ts
```

**Step 2: Agent Request**
```
"I'm adding cart functionality tests. Here's my plan:

1. Create src/pages/CartPage.ts:
   - Extend BasePage (like LoginPage.ts)
   - Methods: navigateToCart(), addProductToCart(productId), 
     removeProduct(productId), updateQuantity(productId, quantity),
     verifyCartTotal(expectedTotal), getCartItemCount()
   - Follow the same structure as LoginPage.ts

2. Create tests/frontend/cart/cart.spec.ts:
   - Follow the pattern from tests/frontend/auth/login.spec.ts
   - Test Cases: TC_CART_001 through TC_CART_005
   - TC_CART_001 should have @smoke tag
   - Use TestDataFactory for product IDs
   - Include Allure annotations (epic='Shopping Cart', feature='Cart Management')

3. Add CartPage to fixtures in src/fixtures/test-fixtures.ts
4. Export CartPage from src/pages/index.ts

Reference files:
- Page Object pattern: src/pages/LoginPage.ts
- Test pattern: tests/frontend/auth/login.spec.ts
- Fixtures: src/fixtures/test-fixtures.ts
```

**Result:** Agent creates exactly what you need, following your project's patterns!

---

## Example 2: Fixing a Failing Test

### ❌ Bad Approach

**Prompt:**
```
"The login test is failing"
```

**Problems:**
- Which test?
- What error?
- What file?
- Agent needs to search everything

---

### ✅ Good Approach

**Step 1: Gather Information**
```bash
# Run the test and capture error
npm test -- tests/frontend/auth/login.spec.ts

# Error output:
# Error: Element not found: loginPage.logoutButton
# File: tests/frontend/auth/login.spec.ts:78
```

**Step 2: Agent Request**
```
"Fix failing test TC_LOGIN_005 in tests/frontend/auth/login.spec.ts:

Issue: Element not found error for logoutButton
Error: TimeoutError: Element not found
Location: Line 78 in login.spec.ts
Current selector: loginPage.logoutButton

Expected behavior: After successful login, logout button should be visible

Reference: 
- BasePage.ts line 30 shows logout link selector pattern
- LoginPage.ts should use similar pattern

Please check the selector in LoginPage.ts and fix it to match the pattern 
used in BasePage.ts for the logout link."
```

**Result:** Agent fixes the exact issue quickly!

---

## Example 3: Adding a New Method to Existing Page

### ❌ Bad Approach

**Prompt:**
```
"Add a method to check if user is logged in"
```

**Problems:**
- Which page?
- What should it check?
- What should it return?
- No pattern reference

---

### ✅ Good Approach

**Agent Request:**
```
"Add a new method to LoginPage.ts (src/pages/LoginPage.ts):

Method name: isUserLoggedIn()
Purpose: Check if user is currently logged in
Return type: Promise<boolean>
Logic: Check if 'Logged in as' text is visible (use loggedInAs locator from BasePage)

Pattern: Follow the same structure as existing methods like isLoginFormVisible() 
in LoginPage.ts (around line 45)

Add JSDoc comment following the same format as other methods."
```

**Result:** Agent adds the method exactly as you need it!

---

## Example 4: Refactoring Test Code

### ❌ Bad Approach

**Prompt:**
```
"Make the tests better"
```

**Problems:**
- Too vague
- What does "better" mean?
- Agent will guess

---

### ✅ Good Approach

**Agent Request:**
```
"Refactor tests/frontend/auth/login.spec.ts:

Goals:
1. Extract common login steps into helper functions
2. Group Allure annotations into constants at the top
3. Reduce code duplication in test cases

Keep:
- Same test structure and behavior
- All test case IDs (TC_LOGIN_001-007)
- Allure annotations (just reorganize them)
- Test logic unchanged

Pattern: Follow DRY principle, similar to how register.spec.ts is structured.

Create helper functions:
- performLogin(credentials) - handles login action
- verifyLoginSuccess() - verifies successful login
- verifyLoginError(expectedMessage) - verifies error messages"
```

**Result:** Agent refactors code while maintaining functionality!

---

## Example 5: Adding API Tests

### ❌ Bad Approach

**Prompt:**
```
"Add API tests for products"
```

**Problems:**
- Which endpoints?
- What to test?
- No pattern reference

---

### ✅ Good Approach

**Agent Request:**
```
"Create API test file tests/api/products/products-api.spec.ts:

Pattern: Follow the same structure as tests/api/auth/login-api.spec.ts

Test Cases:
- TC_PRODUCTS_API_001: GET /api/products - Retrieve all products (@smoke)
- TC_PRODUCTS_API_002: GET /api/products/:id - Get single product
- TC_PRODUCTS_API_003: POST /api/products/search - Search products
- TC_PRODUCTS_API_004: GET /api/products/category/:category - Filter by category

Requirements:
- Use APIRequestContext from Playwright
- Include status code assertions (200, 404, etc.)
- Validate response schema/structure
- Use Allure annotations (epic='Products API', feature='Product Endpoints')
- Use TestDataFactory for test data (product IDs, search terms)

Reference: tests/api/auth/login-api.spec.ts for API test pattern"
```

**Result:** Agent creates consistent API tests!

---

## Example 6: Batch Request (Efficient)

### ❌ Bad Approach (Inefficient)

**Prompt 1:**
```
"Create ProductsPage.ts"
```
[Wait for response]

**Prompt 2:**
```
"Create products.spec.ts"
```
[Wait for response]

**Prompt 3:**
```
"Add ProductsPage to fixtures"
```
[Wait for response]

**Total: 3 separate requests = More tokens used**

---

### ✅ Good Approach (Efficient)

**Single Prompt:**
```
"Create product listing test suite:

1. Page Object: src/pages/ProductsPage.ts
   - Extend BasePage
   - Methods: navigateToProducts(), getProductCount(), 
     clickProduct(productId), verifyProductDetails(productId)

2. Test File: tests/frontend/products/products.spec.ts
   - Test Cases: TC_PRODUCT_001-005
   - Follow pattern from login.spec.ts

3. Add ProductsPage to fixtures in test-fixtures.ts
4. Export from src/pages/index.ts

All in one go, following existing patterns."
```

**Total: 1 request = Fewer tokens, faster results!**

---

## Example 7: Complex Feature (Step-by-Step)

### ✅ Good Approach: Incremental Development

**Step 1: Foundation**
```
"Create CheckoutPage.ts in src/pages/ with basic structure:
- Extend BasePage
- Add navigateToCheckout() method
- Add basic locators for checkout form fields
- Follow LoginPage.ts structure"
```

**Step 2: Add Methods**
```
"Add to CheckoutPage.ts:
- fillShippingInfo(data: ShippingInfo)
- selectPaymentMethod(method: 'card' | 'cash')
- completeOrder()
- verifyOrderConfirmation()

Follow the same method pattern as LoginPage.ts"
```

**Step 3: Create Tests**
```
"Create tests/frontend/checkout/checkout.spec.ts:
- TC_CHECKOUT_001: Complete checkout flow (@smoke)
- TC_CHECKOUT_002: Validation errors
- Use CheckoutPage from fixtures
- Follow login.spec.ts pattern"
```

**Step 4: Refine**
```
"Update CheckoutPage.verifyOrderConfirmation() to also check order number.
Add getOrderNumber() method that extracts order number from confirmation page."
```

**Result:** Incremental development ensures quality at each step!

---

## 🎯 Key Takeaways

1. **Always provide context** - File paths, line numbers, references
2. **Reference existing patterns** - Point to similar working code
3. **Be specific** - Exact method names, test IDs, requirements
4. **Batch related requests** - Group related changes together
5. **Incremental for complex features** - Break into steps
6. **Review and refine** - Don't accept blindly, iterate

---

## 📊 Comparison: Token Usage

| Approach | Requests | Estimated Tokens | Time |
|----------|----------|------------------|------|
| ❌ Vague, multiple | 5-8 | ~15,000 | 10-15 min |
| ✅ Specific, batched | 1-2 | ~3,000 | 2-3 min |

**Savings: 80% fewer tokens, 70% faster!**

---

**See Also:**
- [AI Agent Best Practices](./AI_AGENT_BEST_PRACTICES.md) - Complete guide
- [AI Agent Quick Reference](./AI_AGENT_QUICK_REFERENCE.md) - Cheat sheet

