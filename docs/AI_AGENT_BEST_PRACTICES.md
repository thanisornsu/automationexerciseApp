# 🤖 AI Agent Best Practices for QA Automation

**A comprehensive guide for QA engineers to effectively use AI agents (like Cursor AI) for test automation development.**

---

## 📋 Table of Contents

1. [The Planning-First Approach](#the-planning-first-approach)
2. [Before You Start: Define Rules & Context](#before-you-start-define-rules--context)
3. [Effective Communication Patterns](#effective-communication-patterns)
4. [Token Efficiency Strategies](#token-efficiency-strategies)
5. [Project-Specific Workflows](#project-specific-workflows)
6. [Common Mistakes to Avoid](#common-mistakes-to-avoid)
7. [Real-World Examples](#real-world-examples)

---

## 🎯 The Planning-First Approach

### ✅ **YES: Always Plan Before Implementation**

**Why?**

- AI agents work best with clear context and constraints
- Prevents wasted tokens on back-and-forth corrections
- Ensures consistency with your project's architecture
- Reduces implementation errors

**The Workflow:**

```
1. Define Requirements → 2. Set Rules → 3. Create Plan → 4. Implement → 5. Review
```

---

## 📝 Before You Start: Define Rules & Context

### Step 1: Create a `.cursorrules` File (Recommended)

Create a file named `.cursorrules` in your project root to establish coding standards:

```markdown
# Project Rules for AI Agent

## Project Context

- Framework: Playwright + TypeScript
- Test Structure: Page Object Model (POM)
- Test Organization: Frontend tests in `tests/frontend/`, API tests in `tests/api/`
- Base URL: https://automationexercise.com

## Coding Standards

- Always use Page Object Model pattern
- Extend BasePage for all page objects
- Use TestDataFactory for generating test data
- Follow test naming: TC_MODULE_NNN format
- Include Allure annotations in all tests
- Use test.step() for logical test sections
- Export new page objects from src/pages/index.ts
- Add fixtures to src/fixtures/test-fixtures.ts

## File Structure Rules

- Page objects: src/pages/[PageName]Page.ts
- Test files: tests/[frontend|api]/[module]/[feature].spec.ts
- Test data: src/fixtures/test-data.ts
- Constants: src/constants/app-constants.ts

## Test Writing Rules

- Use beforeEach for common setup
- Use test.describe() to group related tests
- Include test case ID in test name: TC_MODULE_NNN
- Add Allure annotations: severity, tags, epic, feature, story
- Use meaningful step descriptions
- Clean up test data after tests (delete accounts, etc.)

## Code Quality

- Use TypeScript strict mode
- Add JSDoc comments for public methods
- Use async/await (no callbacks)
- Handle errors gracefully with try-catch
- Use Playwright's built-in wait strategies
```

### Step 2: Reference Existing Patterns

Before asking the agent to create new code, **always reference existing patterns**:

**Good Prompt:**

```
"Create a new test file for product search following the same pattern as
tests/frontend/auth/login.spec.ts. Use the same Allure annotation structure
and test naming convention."
```

**Bad Prompt:**

```
"Create a test for product search"
```

---

## 💬 Effective Communication Patterns

### Pattern 1: Context-Rich Requests

**✅ Good Example:**

```
"I need to add a new test suite for cart functionality. Please:
1. Create tests/frontend/cart/cart.spec.ts following the pattern from login.spec.ts
2. Create src/pages/CartPage.ts extending BasePage
3. Add cart-related methods: addProduct(), removeProduct(), verifyCartTotal()
4. Include Allure annotations with epic='Shopping Cart', feature='Cart Management'
5. Use TestDataFactory for test data
6. Add CartPage to fixtures in test-fixtures.ts"
```

**❌ Bad Example:**

```
"Add cart tests"
```

### Pattern 2: Incremental Development

**✅ Good Approach:**

```
Step 1: "Create CartPage.ts with basic structure and navigation method"
Step 2: "Add addProduct() method to CartPage"
Step 3: "Create cart.spec.ts with one test case"
Step 4: "Add remaining test cases following TC_CART_NNN format"
```

**❌ Bad Approach:**

```
"Create complete cart test suite with all features"
```

### Pattern 3: Specific File References

**✅ Good Example:**

```
"Update src/pages/LoginPage.ts to add a new method verifyLoginErrorMessage()
that checks for error messages. Follow the same pattern as the existing
loginExpectError() method."
```

**❌ Bad Example:**

```
"Add error checking to login page"
```

---

## 🎯 Token Efficiency Strategies

### 1. **Batch Related Requests**

**✅ Efficient:**

```
"Create three test cases for checkout:
- TC_CHECKOUT_001: Complete checkout with valid data
- TC_CHECKOUT_002: Checkout with invalid payment info
- TC_CHECKOUT_003: Checkout with empty required fields

All should follow the pattern from register.spec.ts"
```

**❌ Inefficient:**

```
"Create checkout test 1"
[wait for response]
"Create checkout test 2"
[wait for response]
"Create checkout test 3"
```

### 2. **Reference Existing Code**

**✅ Efficient:**

```
"Add a new test TC_LOGIN_008 following the same pattern as TC_LOGIN_002
in login.spec.ts"
```

**❌ Inefficient:**

```
"Add a login test" [agent has to read entire file to understand pattern]
```

### 3. **Use File Paths Explicitly**

**✅ Efficient:**

```
"Update tests/frontend/auth/login.spec.ts: add TC_LOGIN_008 after line 45"
```

**❌ Inefficient:**

```
"Add a test to the login file"
```

### 4. **Provide Context Upfront**

**✅ Efficient:**

```
"Context: I'm working on Phase 2 - Product tests.
Task: Create products.spec.ts with 5 test cases for product listing.
Requirements:
- Use ProductsPage from src/pages/ProductsPage.ts
- Follow TC_PRODUCT_NNN naming
- Include @smoke tag for TC_PRODUCT_001
- Use TestDataFactory for search terms"
```

**❌ Inefficient:**

```
"Create product tests"
[agent asks clarifying questions, wasting tokens]
```

---

## 🔄 Project-Specific Workflows

### Workflow 1: Adding a New Test Suite

**Step-by-Step Process:**

1. **Planning Phase** (You do this):

   ```
   - Identify test cases needed
   - Determine if new Page Object needed
   - Check existing patterns
   - List requirements
   ```

2. **Agent Request**:

   ```
   "I need to add checkout tests. Here's my plan:

   Page Object: CheckoutPage.ts
   - Methods: fillShippingInfo(), selectPaymentMethod(), completeOrder()
   - Extends BasePage

   Test File: tests/frontend/checkout/checkout.spec.ts
   - TC_CHECKOUT_001: Complete checkout flow
   - TC_CHECKOUT_002: Validation errors
   - Follow pattern from register.spec.ts

   Please create both files following project conventions."
   ```

3. **Review & Refine**:
   ```
   "The CheckoutPage needs a verifyOrderConfirmation() method.
   Add it following the same pattern as other verify methods."
   ```

### Workflow 2: Fixing a Failing Test

**Step-by-Step Process:**

1. **Provide Context**:

   ```
   "Test TC_LOGIN_005 is failing. Error: Element not found.
   File: tests/frontend/auth/login.spec.ts, line 78
   Issue: loginPage.logoutButton selector is incorrect
   Expected: Should find logout link after login
   "
   ```

2. **Request Fix**:
   ```
   "Fix the selector in LoginPage.ts. The logout link should be
   located using the pattern from BasePage.ts (line 30)."
   ```

### Workflow 3: Adding New Test Data

**Step-by-Step Process:**

1. **Specify Requirements**:

   ```
   "Add a new method to TestDataFactory in src/fixtures/test-data.ts:
   generateCheckoutData() that returns:
   - firstName, lastName, company, address1, address2
   - country, state, city, zipcode, phoneNumber

   Follow the same pattern as generateRegistrationData()"
   ```

---

## 🚫 Common Mistakes to Avoid

### Mistake 1: Vague Requests

**❌ Bad:**

```
"Fix the test"
```

**✅ Good:**

```
"Fix TC_LOGIN_005 in tests/frontend/auth/login.spec.ts.
The test fails because logoutButton selector is wrong.
Use the same selector pattern as in BasePage.ts line 30."
```

### Mistake 2: Not Providing Context

**❌ Bad:**

```
"Add a new page"
```

**✅ Good:**

```
"Create ProductsPage.ts in src/pages/ following the same structure as LoginPage.ts.
It should extend BasePage and include methods for product listing and search."
```

### Mistake 3: Asking for Too Much at Once

**❌ Bad:**

```
"Create all cart, checkout, and product tests with page objects"
```

**✅ Good:**

```
"Create CartPage.ts first with basic structure.
Then we'll add tests incrementally."
```

### Mistake 4: Not Reviewing Generated Code

**❌ Bad:**

```
[Accept all changes without review]
```

**✅ Good:**

```
[Review code]
"Update CartPage.addProduct() to use the product ID parameter
instead of hardcoded value."
```

---

## 📚 Real-World Examples

### Example 1: Adding a New Feature Test

**Your Planning Document** (create this first):

```markdown
## Feature: Product Search

- Page Object: ProductsPage.ts
- Test File: tests/frontend/products/search.spec.ts
- Test Cases:
  - TC_SEARCH_001: Search with valid keyword (@smoke)
  - TC_SEARCH_002: Search with no results
  - TC_SEARCH_003: Search with special characters
- Test Data: Use TestDataFactory.generateSearchTerm()
```

**Agent Request:**

```
"I'm adding product search tests. Here's my plan:

1. Create src/pages/ProductsPage.ts extending BasePage with:
   - searchProduct(keyword: string)
   - verifySearchResults()
   - getProductCount()

2. Create tests/frontend/products/search.spec.ts with 3 test cases
   following TC_SEARCH_NNN format

3. Use TestDataFactory for search terms

4. Add ProductsPage to fixtures

Reference: Follow the same pattern as LoginPage.ts and login.spec.ts"
```

### Example 2: Refactoring Existing Code

**Agent Request:**

```
"Refactor tests/frontend/auth/login.spec.ts:
- Extract common login steps into helper functions
- Group Allure annotations into a constant
- Follow DRY principle

Keep the same test structure and behavior."
```

### Example 3: Adding API Tests

**Agent Request:**

```
"Create API test file tests/api/cart/cart-api.spec.ts following
the pattern from tests/api/auth/login-api.spec.ts.

Test cases:
- TC_CART_API_001: GET /api/cart - Retrieve cart items
- TC_CART_API_002: POST /api/cart - Add item to cart
- TC_CART_API_003: DELETE /api/cart/:id - Remove item

Use the same API client pattern and Allure annotations."
```

---

## 🎓 Quick Reference: Prompt Templates

### Template 1: New Test Suite

```
"Create [feature] tests:
- Page Object: [PageName]Page.ts in src/pages/
- Test File: tests/[frontend|api]/[module]/[feature].spec.ts
- Test Cases: [list with IDs]
- Pattern: Follow [existing-file].spec.ts
- Requirements: [specific requirements]"
```

### Template 2: Fix Bug

```
"Fix [test-id] in [file-path]:
- Issue: [description]
- Error: [error message]
- Expected: [expected behavior]
- Reference: [similar working code]"
```

### Template 3: Add Method

```
"Add [method-name]() to [PageName]Page.ts:
- Purpose: [what it does]
- Parameters: [list]
- Return: [return type]
- Pattern: Follow [existing-method] in [file]"
```

### Template 4: Refactor

```
"Refactor [file-path]:
- Goal: [what to improve]
- Keep: [what to preserve]
- Change: [what to modify]
- Pattern: [reference pattern]"
```

---

## ✅ Checklist Before Asking Agent

- [ ] Have I reviewed existing similar code?
- [ ] Have I defined clear requirements?
- [ ] Have I specified file paths?
- [ ] Have I referenced existing patterns?
- [ ] Have I provided context about the project?
- [ ] Is my request specific enough?
- [ ] Am I asking for one focused task?
- [ ] Have I checked if .cursorrules exists?

---

## 🎯 Summary: The Golden Rules

1. **Plan First**: Always define requirements before implementation
2. **Be Specific**: Use file paths, line numbers, and code references
3. **Reference Patterns**: Point to existing code that works
4. **Incremental**: Break large tasks into smaller steps
5. **Context-Rich**: Provide project context upfront
6. **Review Always**: Never blindly accept generated code
7. **Batch Requests**: Group related changes together
8. **Use Rules**: Create .cursorrules for consistent behavior

---

## 📖 Additional Resources

- [Project Structure Guide](./FOLDER_STRUCTURE_GUIDE.md)
- [Allure Best Practices](./ALLURE_BEST_PRACTICES.md)
- [Example Walkthrough](./EXAMPLE_WALKTHROUGH.md)

---

**Remember**: AI agents are powerful tools, but they need clear instructions and context to work effectively. The more specific and structured your requests, the better the results!

---

_Last Updated: 2024_
_Author: QA Team_
