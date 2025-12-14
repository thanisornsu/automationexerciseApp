# Allure Report Best Practices Guide

## 📋 Table of Contents
- [Overview](#overview)
- [Quick Start](#quick-start)
- [Real-World Workflow](#real-world-workflow)
- [Test Annotations](#test-annotations)
- [Categories & Severity](#categories--severity)
- [CI/CD Integration](#cicd-integration)
- [Advanced Features](#advanced-features)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

Allure is an enterprise-grade test reporting framework that provides:
- **Rich Test Reports**: Visual, interactive HTML reports
- **Historical Trends**: Track test stability over time
- **Categorization**: Group tests by severity, features, epics
- **Attachments**: Screenshots, logs, videos automatically attached
- **CI/CD Integration**: Jenkins, GitHub Actions, Azure DevOps

---

## 🚀 Quick Start

### Basic Commands

```bash
# Run tests and generate report (full flow)
npm run test:allure

# Individual steps:
npm test                    # Run tests
npm run allure:generate     # Generate report from results
npm run allure:open         # Open generated report

# Quick serve (no generation needed)
npm run allure:serve        # Generate and serve in one command
```

### Clean Results

```bash
npm run allure:clean        # Delete old results and reports
```

---

## 🔄 Real-World Workflow

### Daily Development

```bash
# 1. Clean previous results
npm run allure:clean

# 2. Run specific test suite
npm run test:auth

# 3. Generate and view report
npm run allure:generate
npm run allure:open
```

### Before Pull Request

```bash
# Run full regression with Allure report
npm run test:allure

# Review failures, fix, then retry only failed tests
npm run test:retry-failed
npm run allure:generate
npm run allure:open
```

### Smoke Testing

```bash
# Run only smoke tests (fast feedback)
npm run test:smoke
npm run allure:serve
```

---

## 🏷️ Test Annotations

### Severity Levels (Business Impact)

Use severity to prioritize test failures:

```typescript
test('Critical user flow', async ({ page }) => {
  test.info().annotations.push(
    { type: 'severity', description: 'blocker' }  // Choose one below
  );
});
```

**Severity Guide:**
- **`blocker`**: Blocks release (payment fails, users can't login)
- **`critical`**: Core features (checkout, registration, search)
- **`normal`**: Important but not critical (profile edit, wishlist)
- **`minor`**: Nice-to-have features (sorting, filtering)
- **`trivial`**: UI/cosmetic (alignment, colors, tooltips)

### Categories/Tags (Test Organization)

```typescript
test.info().annotations.push(
  { type: 'tag', description: 'smoke' },
  { type: 'tag', description: 'regression' }
);
```

**Common Tags:**
- `@smoke`: Quick build verification tests (5-10 min)
- `@regression`: Full test suite (all tests)
- `@security`: Security-related tests
- `@integration`: Tests multiple components
- `@e2e`: End-to-end user journeys

Run by tag:
```bash
npm run test:smoke      # Only smoke tests
npm run test:regression # All tests
```

### Epic/Feature/Story (Requirement Traceability)

```typescript
test.info().annotations.push(
  { type: 'epic', description: 'User Management' },
  { type: 'feature', description: 'Authentication' },
  { type: 'story', description: 'User Login' }
);
```

**Example Hierarchy:**
```
Epic: E-Commerce Platform
  └─ Feature: Shopping Cart
      ├─ Story: Add items to cart
      ├─ Story: Update cart quantities
      └─ Story: Remove items from cart
```

### Issue Tracking (Link to JIRA/GitHub)

```typescript
test.info().annotations.push(
  { type: 'issue', description: 'JIRA-1234' },
  { type: 'tms', description: 'TEST-5678' }
);
```

- `issue`: Bug ticket (JIRA, GitHub Issue)
- `tms`: Test management system ID

---

## 📊 Complete Test Example

```typescript
import { test, expect } from '@playwright/test';

test('TC_LOGIN_001: Valid user login', async ({ page, loginPage }) => {
  // Annotations
  test.info().annotations.push(
    { type: 'severity', description: 'critical' },
    { type: 'tag', description: 'smoke' },
    { type: 'tag', description: 'regression' },
    { type: 'epic', description: 'User Authentication' },
    { type: 'feature', description: 'Login' },
    { type: 'story', description: 'As a user, I want to login to access my account' },
    { type: 'owner', description: 'QA Team' },
    { type: 'issue', description: 'JIRA-123' }
  );

  // Test steps - appear in Allure timeline
  await test.step('Navigate to login page', async () => {
    await loginPage.navigate();
    await expect(page).toHaveURL(/.*login/);
  });

  await test.step('Enter valid credentials', async () => {
    await loginPage.fillInput(loginPage.loginEmailInput, 'user@test.com');
    await loginPage.fillInput(loginPage.loginPasswordInput, 'Test123!');
  });

  await test.step('Click login button', async () => {
    await loginPage.loginButton.click();
  });

  await test.step('Verify successful login', async () => {
    await expect(page.locator('text=Logged in as')).toBeVisible();
  });
});
```

---

## 🗂️ Categories Configuration

File: `.allure-categories.json`

Auto-categorize failures by error type:

```json
[
  {
    "name": "Product Defects",
    "matchedStatuses": ["failed"],
    "messageRegex": ".*AssertionError.*"
  },
  {
    "name": "Timeout Issues",
    "matchedStatuses": ["failed", "broken"],
    "messageRegex": ".*TimeoutError.*|.*timeout.*"
  }
]
```

**Built-in Categories:**
- Product Defects: Assertion failures (bugs)
- Test Defects: Test script errors
- Timeout Issues: Slow pages/network
- Network Issues: Connection problems
- Authentication Issues: Login/auth failures

---

## 🔧 CI/CD Integration

### GitHub Actions Example

```yaml
name: Playwright Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3

      - name: Install dependencies
        run: npm ci

      - name: Run Playwright tests
        run: npm run test:ci

      - name: Generate Allure Report
        if: always()
        run: npm run allure:generate

      - name: Deploy Allure Report to GitHub Pages
        if: always()
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: allure-report
```

### Jenkins Integration

```groovy
pipeline {
  agent any

  stages {
    stage('Test') {
      steps {
        sh 'npm ci'
        sh 'npm test'
      }
    }

    stage('Allure Report') {
      steps {
        allure([
          includeProperties: false,
          jdk: '',
          results: [[path: 'allure-results']]
        ])
      }
    }
  }
}
```

---

## 🎨 Advanced Features

### 1. Test Steps (Timeline View)

```typescript
await test.step('Step 1: Navigate', async () => {
  await page.goto('/login');
});

await test.step('Step 2: Fill form', async () => {
  await page.fill('[name="email"]', 'test@example.com');
});
```

**Benefits:**
- Shows exactly where test failed
- Visual timeline in Allure
- Better debugging

### 2. Custom Attachments

```typescript
import { test } from '@playwright/test';

test('Test with attachments', async ({ page }) => {
  // Attach test data
  await test.info().attach('Test Credentials', {
    body: JSON.stringify({ email: 'test@example.com' }),
    contentType: 'application/json',
  });

  // Attach API response
  const response = await page.request.get('/api/user');
  await test.info().attach('API Response', {
    body: await response.text(),
    contentType: 'application/json',
  });
});
```

**Auto-attached on failure:**
- Screenshots
- Videos (if enabled)
- Traces
- Console logs

### 3. Retries & Flaky Tests

```typescript
// playwright.config.ts
export default defineConfig({
  retries: 2, // Retry failed tests 2 times
});
```

Allure automatically marks tests as **flaky** if they pass on retry.

### 4. Historical Trends

Keep old reports for trend analysis:

```bash
# Generate report with history
allure generate allure-results -o allure-report --clean

# Keep history (don't clean)
allure generate allure-results -o allure-report
```

---

## 📈 Report Features

### Overview Tab
- Total tests, passed, failed, broken, skipped
- Success rate percentage
- Duration and trends

### Categories Tab
- Auto-categorized failures
- Group by error type

### Suites Tab
- Tests grouped by file/describe blocks

### Graphs Tab
- Severity distribution
- Duration trends
- Status breakdown

### Timeline Tab
- Visual execution timeline
- Parallel execution view

### Behaviors Tab
- Group by Epic → Feature → Story
- Business-oriented view

---

## 🐛 Troubleshooting

### Issue: Report not showing tests

**Solution:**
```bash
# Clean and regenerate
npm run allure:clean
npm test
npm run allure:generate
npm run allure:open
```

### Issue: "allure: command not found"

**Solution:**
```bash
npm install -g allure-commandline
```

Or use npx:
```bash
npx allure generate allure-results -o allure-report
npx allure open allure-report
```

### Issue: Old test results showing

**Solution:**
```bash
# Always clean before new run
npm run allure:clean
npm test
```

### Issue: Screenshots not appearing

**Solution:**
Check `playwright.config.ts`:
```typescript
use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'on-first-retry',
}
```

---

## 🎯 Real-World Tips

### Daily Usage

1. **Morning standup**: Show Allure report trend
2. **PR review**: Include Allure report link
3. **Bug reports**: Attach Allure test results
4. **Regression**: Run nightly, email Allure link

### Team Collaboration

```bash
# Share results folder with team
zip -r allure-results.zip allure-results/

# Team member generates report locally
unzip allure-results.zip
npm run allure:serve
```

### Performance Testing

```typescript
await test.step('Measure page load time', async () => {
  const start = Date.now();
  await page.goto('/products');
  const loadTime = Date.now() - start;

  // Attach performance metric
  await test.info().attach('Load Time', {
    body: `${loadTime}ms`,
    contentType: 'text/plain',
  });

  expect(loadTime).toBeLessThan(3000); // Must load in <3s
});
```

---

## 📚 Additional Resources

- [Allure Official Docs](https://docs.qameta.io/allure/)
- [Allure Playwright Integration](https://www.npmjs.com/package/allure-playwright)
- [Example Reports](https://demo.qameta.io/allure/)

---

## ✅ Checklist for Production

- [ ] Add severity to all tests
- [ ] Add tags for smoke/regression
- [ ] Add Epic/Feature/Story for traceability
- [ ] Configure `.allure-categories.json`
- [ ] Setup global-setup for environment info
- [ ] Configure CI/CD to generate reports
- [ ] Setup report hosting (GitHub Pages, S3, etc.)
- [ ] Train team on reading reports
- [ ] Add Allure report link to bug tickets
