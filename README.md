# Automation Exercise - Playwright Test Framework

A comprehensive QA automation framework for [Automation Exercise](https://automationexercise.com) built with **Playwright** and **TypeScript**.

## 📚 Documentation

### 🚀 New to the Project? Start Here!
- **[Example Walkthrough](./docs/EXAMPLE_WALKTHROUGH.md)** - Real-world 3-day feature development example
- **[Folder Structure Guide](./docs/FOLDER_STRUCTURE_GUIDE.md)** - Frontend vs API test organization ⭐
- **[AI Agent Best Practices](./docs/AI_AGENT_BEST_PRACTICES.md)** - 🤖 How to effectively use AI agents for QA automation ⭐ NEW!
- **[AI Agent Examples](./docs/AI_AGENT_EXAMPLES.md)** - 🤖 Real-world prompt examples (good vs bad) ⭐ NEW!

### Quick Start Guides
- **[Folder Structure Summary](./docs/FOLDER_STRUCTURE_SUMMARY.md)** - Implementation overview
- **[Workflow Cheat Sheet](./WORKFLOW_CHEAT_SHEET.md)** - Daily commands and quick reference
- **[Visual Workflow](./VISUAL_WORKFLOW.md)** - Step-by-step diagrams and flowcharts
- **[AI Agent Quick Reference](./docs/AI_AGENT_QUICK_REFERENCE.md)** - 🤖 One-page cheat sheet for AI agent usage ⭐ NEW!

### Complete Guides
- **[CI/CD Workflow Guide](./CI_CD_WORKFLOW_GUIDE.md)** - Complete feature development process
- **[Allure Best Practices](./docs/ALLURE_BEST_PRACTICES.md)** - Comprehensive reporting guide
- **[Allure Quick Reference](./docs/ALLURE_QUICK_REFERENCE.md)** - Copy-paste templates

### Templates
- **[Pull Request Template](./.github/PULL_REQUEST_TEMPLATE.md)** - PR checklist and format
- **[Bug Report Template](./.github/ISSUE_TEMPLATE/bug_report.md)** - Report test failures
- **[Feature Request Template](./.github/ISSUE_TEMPLATE/feature_request.md)** - Request new tests

## 🏗️ Project Structure

```
automation-exercise/
├── docs/                   # 📚 Documentation
│   ├── FOLDER_STRUCTURE_GUIDE.md    # Frontend vs API organization
│   ├── FOLDER_STRUCTURE_SUMMARY.md  # Quick implementation guide
│   ├── ALLURE_BEST_PRACTICES.md
│   ├── ALLURE_QUICK_REFERENCE.md
│   └── EXAMPLE_WALKTHROUGH.md
│
├── src/
│   ├── pages/              # Page Object Model classes
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   ├── SignupPage.ts
│   │   └── ...
│   ├── fixtures/           # Test fixtures & data
│   │   ├── test-fixtures.ts   # Custom Playwright fixtures
│   │   └── test-data.ts       # Test data factory with Faker
│   ├── constants/          # App constants
│   │   └── app-constants.ts
│   ├── types/              # TypeScript interfaces
│   └── utils/              # Helper utilities
│       ├── allure-helpers.ts
│       └── setup-allure-env.ts
│
├── tests/
│   ├── frontend/           # 🖥️ UI tests (browser automation)
│   │   ├── auth/          # Login, register, logout
│   │   │   ├── login.spec.ts      (7 tests)
│   │   │   └── register.spec.ts   (11 tests)
│   │   ├── products/      # Product browsing (future)
│   │   ├── cart/          # Shopping cart (future)
│   │   └── checkout/      # Checkout flow (future)
│   │
│   ├── api/               # ⚡ API tests (HTTP requests)
│   │   ├── auth/         # Auth endpoints
│   │   │   └── login-api.spec.ts  (4 tests)
│   │   ├── products/     # Product endpoints
│   │   │   └── products-api.spec.ts (4 tests)
│   │   └── cart/         # Cart endpoints (future)
│   │
│   └── examples/          # Example tests
│
├── .github/
│   ├── workflows/         # CI/CD pipelines
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/
│
├── playwright.config.ts   # Playwright configuration
├── global-setup.ts        # Allure environment setup
└── package.json           # NPM scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn

### Installation

```bash
# Clone/download the project
cd automation-exercise

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests with UI mode (interactive)
npm run test:ui

# Run tests with headed browser
npm run test:headed

# Run specific test file
npm run test:auth

# Run in debug mode
npm run test:debug

# View HTML report
npm run report
```

## 📋 Test Coverage (Phase 1)

### Login Tests (`login.spec.ts`)

| Test ID | Description | Priority |
|---------|-------------|----------|
| TC_LOGIN_001 | Verify login page elements are visible | High |
| TC_LOGIN_002 | Login with invalid email | High |
| TC_LOGIN_003 | Login with invalid password | High |
| TC_LOGIN_004 | Login form validation - empty fields | Medium |
| TC_LOGIN_005 | Login and Logout flow | Critical |
| TC_LOGIN_006 | SQL injection attempt | High |
| TC_LOGIN_007 | XSS attempt in email | High |

### Registration Tests (`register.spec.ts`)

| Test ID | Description | Priority |
|---------|-------------|----------|
| TC_REG_001 | Complete user registration - Full flow | Critical |
| TC_REG_002 | Registration with minimum required fields | High |
| TC_REG_003 | Registration with existing email | High |
| TC_REG_004 | Signup form validation - Empty name | Medium |
| TC_REG_005 | Invalid email format validation | Medium |
| TC_REG_006 | Country selection dropdown | Low |
| TC_REG_007 | Date of birth selection | Low |
| TC_REG_008 | Newsletter checkboxes | Low |
| TC_REG_009 | Title (Mr/Mrs) selection | Low |
| TC_REG_010 | Special characters in name | Medium |
| TC_REG_011 | Long input values | Medium |

## 🎯 Key Features

### Page Object Model (POM)
- Clean separation of test logic and page interactions
- Reusable page methods
- Centralized locators

### Custom Test Fixtures
```typescript
// Use page objects as fixtures
test('example', async ({ loginPage, signupPage }) => {
  await loginPage.navigate();
  await loginPage.login(credentials);
});
```

### Dynamic Test Data
```typescript
// Generate random test data
const userData = TestDataFactory.generateRegistrationData();

// Override specific fields
const customUser = TestDataFactory.generateRegistrationData({
  country: 'Australia',
  newsletter: true,
});
```

### Built-in Assertions
```typescript
await loginPage.verifyLoginPageIsDisplayed();
await loginPage.loginExpectSuccess(credentials);
await loginPage.loginExpectError(invalidCredentials);
```

## 🔧 Configuration

### Environment Variables (`.env`)

```env
BASE_URL=https://automationexercise.com
TEST_USER_EMAIL=test@example.com
TEST_USER_PASSWORD=Test@123
HEADLESS=true
```

### Playwright Config Highlights

- **Parallel execution**: Tests run in parallel for speed
- **Auto-retry**: Failed tests retry up to 2 times on CI
- **Screenshots**: Captured on failure
- **Video**: Recorded on first retry
- **Trace**: Collected for debugging

## 📊 Reporting

### HTML Report
```bash
npm run report
```

### Allure Report (Recommended for Production)

**Quick start:**
```bash
npm run test:allure    # Clean → Test → Generate → Open (all in one)
```

**Individual steps:**
```bash
npm run allure:clean       # Clean old results
npm test                   # Run tests
npm run allure:generate    # Generate HTML report
npm run allure:open        # Open in browser
```

**📚 Documentation:**
- **Quick Reference**: [ALLURE_QUICK_REFERENCE.md](./ALLURE_QUICK_REFERENCE.md) - Copy-paste templates
- **Best Practices**: [ALLURE_BEST_PRACTICES.md](./ALLURE_BEST_PRACTICES.md) - Complete guide
- **Example Test**: [tests/examples/allure-enhanced-test.example.ts](./tests/examples/allure-enhanced-test.example.ts)

## 🛠️ Development

### Adding New Page Objects

1. Create new file in `src/pages/`
2. Extend `BasePage`
3. Export from `src/pages/index.ts`
4. Add to fixtures in `src/fixtures/test-fixtures.ts`

### Adding New Tests

1. Create spec file in appropriate `tests/` subdirectory
2. Import fixtures: `import { test, expect, TestDataFactory } from '../../src/fixtures'`
3. Use page objects via fixtures

## 📝 Best Practices

1. **Use data-qa attributes** for reliable selectors
2. **Generate fresh test data** using Faker
3. **Clean up test data** (delete created accounts)
4. **Use meaningful test IDs** (TC_XXX_NNN format)
5. **Group related tests** with `test.describe`
6. **Use beforeEach** for common setup

## 🗺️ Roadmap

- [x] Phase 1: Setup + Login/Register tests
- [ ] Phase 2: Product + Cart tests
- [ ] Phase 3: Checkout E2E + API tests
- [ ] Phase 4: CI/CD + Full reporting

## 👤 Author

THANISORN - QA Engineer

---

Built with ❤️ using Playwright + TypeScript
