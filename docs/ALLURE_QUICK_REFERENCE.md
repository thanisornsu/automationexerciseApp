# Allure Quick Reference Card

## 🚀 Most Used Commands

```bash
# Full workflow (recommended)
npm run test:allure              # Clean → Test → Generate → Open

# Individual steps
npm run allure:clean             # Clean old results
npm test                         # Run tests
npm run allure:generate          # Generate HTML report
npm run allure:open              # Open report in browser

# Quick serve (no HTML generation)
npm run allure:serve             # Generate + serve on the fly

# Specific test suites
npm run test:auth                # Auth tests only
npm run test:smoke               # Smoke tests only (@smoke tag)
npm run test:regression          # All regression tests
```

---

## 📝 Test Annotation Template

```typescript
test('Your test name', async ({ page }) => {
  // 1. Add Allure metadata
  test.info().annotations.push(
    { type: 'severity', description: 'critical' },      // blocker|critical|normal|minor|trivial
    { type: 'tag', description: 'smoke' },              // smoke|regression|security
    { type: 'epic', description: 'User Management' },
    { type: 'feature', description: 'Login' },
    { type: 'story', description: 'User login story' },
    { type: 'owner', description: 'QA Team' },
    { type: 'issue', description: 'JIRA-123' }          // Bug ticket
  );

  // 2. Use test.step for clear phases
  await test.step('Step 1: Navigate', async () => {
    await page.goto('/login');
  });

  await test.step('Step 2: Fill form', async () => {
    await page.fill('[name="email"]', 'test@example.com');
  });

  await test.step('Step 3: Verify result', async () => {
    await expect(page.locator('text=Welcome')).toBeVisible();
  });
});
```

---

## 🏷️ Severity Guide (Copy-Paste)

```typescript
// BLOCKER - Blocks release, critical bug
{ type: 'severity', description: 'blocker' }

// CRITICAL - Core functionality (login, payment)
{ type: 'severity', description: 'critical' }

// NORMAL - Important features
{ type: 'severity', description: 'normal' }

// MINOR - Nice to have
{ type: 'severity', description: 'minor' }

// TRIVIAL - Cosmetic/UI issues
{ type: 'severity', description: 'trivial' }
```

---

## 🎯 Tag Examples (Copy-Paste)

```typescript
// Smoke tests (quick verification)
{ type: 'tag', description: 'smoke' }

// Regression tests (full suite)
{ type: 'tag', description: 'regression' }

// Security tests
{ type: 'tag', description: 'security' }

// Integration tests
{ type: 'tag', description: 'integration' }

// End-to-end tests
{ type: 'tag', description: 'e2e' }
```

---

## 🗂️ Epic/Feature/Story Examples

```typescript
// E-commerce example
{ type: 'epic', description: 'Shopping Cart' }
{ type: 'feature', description: 'Add to Cart' }
{ type: 'story', description: 'User adds product to cart' }

// Authentication example
{ type: 'epic', description: 'User Authentication' }
{ type: 'feature', description: 'Login' }
{ type: 'story', description: 'User logs in with valid credentials' }

// Payment example
{ type: 'epic', description: 'Payment Processing' }
{ type: 'feature', description: 'Credit Card Payment' }
{ type: 'story', description: 'User completes payment with credit card' }
```

---

## 📊 Report Sections

| Section | What it shows |
|---------|---------------|
| **Overview** | Total tests, pass rate, duration, trends |
| **Categories** | Auto-categorized failures (timeout, assertion, etc.) |
| **Suites** | Tests grouped by file/folder |
| **Graphs** | Charts (severity, duration, status) |
| **Timeline** | Visual execution timeline |
| **Behaviors** | Tests grouped by Epic → Feature → Story |

---

## 🐛 Common Issues

### Report is empty
```bash
npm run allure:clean && npm test && npm run allure:generate
```

### Old tests showing
```bash
npm run allure:clean
```

### Screenshots missing
Check `playwright.config.ts`:
```typescript
screenshot: 'only-on-failure',
video: 'retain-on-failure',
```

---

## 💡 Daily Workflow

**Morning standup:**
```bash
npm run test:allure
# Share report link with team
```

**Before PR:**
```bash
npm run test:regression
npm run allure:generate
npm run allure:open
# Fix failures, then commit
```

**Quick check:**
```bash
npm run test:smoke
npm run allure:serve
```

---

## 🔗 Links

- Full Guide: [ALLURE_BEST_PRACTICES.md](./ALLURE_BEST_PRACTICES.md)
- Example Test: [tests/examples/allure-enhanced-test.example.ts](./tests/examples/allure-enhanced-test.example.ts)
- Allure Docs: https://docs.qameta.io/allure/
