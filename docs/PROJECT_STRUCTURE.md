# 📁 Project Structure

**Clean and organized structure for Automation Exercise Test Framework**

---

## 🏗️ Complete Directory Structure

```
automation-exercise-phase1/
│
├── 📚 docs/                          # Documentation
│   ├── README.md                     # Documentation index
│   │
│   ├── Getting Started/
│   │   ├── FOLDER_STRUCTURE_GUIDE.md
│   │   ├── FOLDER_STRUCTURE_SUMMARY.md
│   │   └── EXAMPLE_WALKTHROUGH.md
│   │
│   ├── AI Agent Guides/
│   │   ├── AI_AGENT_BEST_PRACTICES.md
│   │   ├── AI_AGENT_QUICK_REFERENCE.md
│   │   └── AI_AGENT_EXAMPLES.md
│   │
│   ├── CI/CD & Setup/
│   │   ├── GITHUB_ACTIONS_SETUP.md
│   │   ├── CI_CD_WORKFLOW_GUIDE.md
│   │   ├── WORKFLOW_CHEAT_SHEET.md
│   │   ├── setup/                    # Setup guides
│   │   │   ├── GITHUB_SETUP_GUIDE.md
│   │   │   └── GITHUB_ACTION_CHECKLIST.md
│   │   └── examples/                 # Example files
│   │       └── playwright-allure.yml.example
│   │
│   ├── Allure Reporting/
│   │   ├── ALLURE_BEST_PRACTICES.md
│   │   └── ALLURE_QUICK_REFERENCE.md
│   │
│   └── Additional Resources/
│       ├── VISUAL_WORKFLOW.md
│       ├── CI_CD_QUICK_GUIDE_TH.md
│       └── CI_CD_THAI_EXPLANATION.md
│
├── 🔧 .github/                       # GitHub configuration
│   ├── workflows/                    # CI/CD workflows
│   │   ├── ci.yml                   # Main CI/CD pipeline
│   │   ├── smoke-tests.yml         # Smoke tests
│   │   └── nightly-regression.yml  # Nightly regression
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── PULL_REQUEST_TEMPLATE.md
│
├── 📦 src/                           # Source code
│   ├── pages/                       # Page Object Model
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   ├── SignupPage.ts
│   │   └── index.ts
│   ├── fixtures/                    # Test fixtures
│   │   ├── test-fixtures.ts
│   │   ├── test-data.ts
│   │   └── index.ts
│   ├── constants/                   # App constants
│   │   ├── app-constants.ts
│   │   └── index.ts
│   ├── types/                       # TypeScript types
│   │   └── index.ts
│   └── utils/                       # Utilities
│       ├── allure-helpers.ts
│       └── setup-allure-env.ts
│
├── 🧪 tests/                        # Test files
│   ├── frontend/                    # UI tests
│   │   ├── auth/
│   │   │   ├── login.spec.ts
│   │   │   └── register.spec.ts
│   │   ├── products/
│   │   ├── cart/
│   │   └── checkout/
│   ├── api/                         # API tests
│   │   ├── auth/
│   │   │   └── login-api.spec.ts
│   │   └── products/
│   │       └── products-api.spec.ts
│   └── examples/                    # Example tests
│       └── allure-enhanced-test.example.ts
│
├── 📄 Configuration Files
│   ├── package.json                 # NPM dependencies
│   ├── playwright.config.ts        # Playwright config
│   ├── tsconfig.json               # TypeScript config
│   ├── global-setup.ts             # Global test setup
│   ├── .cursorrules                # AI agent rules
│   └── README.md                   # Main README
│
└── 📊 Generated Files (gitignored)
    ├── node_modules/               # Dependencies
    ├── allure-results/             # Allure test results
    ├── allure-report/              # Allure HTML reports
    ├── playwright-report/          # Playwright HTML reports
    └── test-results/               # Test artifacts
```

---

## 📂 Key Directories Explained

### 📚 `docs/` - Documentation
- **Purpose**: All project documentation
- **Organization**: Grouped by category (Getting Started, AI Agent, CI/CD, etc.)
- **Subdirectories**:
  - `setup/` - Setup and configuration guides
  - `examples/` - Example files and templates

### 🔧 `.github/` - GitHub Configuration
- **Purpose**: GitHub-specific configuration
- **Contents**:
  - `workflows/` - CI/CD pipeline definitions
  - `ISSUE_TEMPLATE/` - Issue templates
  - `PULL_REQUEST_TEMPLATE.md` - PR template

### 📦 `src/` - Source Code
- **Purpose**: Reusable code and utilities
- **Structure**:
  - `pages/` - Page Object Model classes
  - `fixtures/` - Test fixtures and data factories
  - `constants/` - Application constants
  - `types/` - TypeScript type definitions
  - `utils/` - Helper utilities

### 🧪 `tests/` - Test Files
- **Purpose**: All test specifications
- **Organization**:
  - `frontend/` - Browser-based UI tests
  - `api/` - API endpoint tests
  - `examples/` - Example test files

---

## 🎯 File Organization Principles

### ✅ Best Practices

1. **Group Related Files**
   - Documentation grouped by topic
   - Tests organized by feature/module
   - Setup guides in `docs/setup/`

2. **Clear Naming**
   - Descriptive file names
   - Consistent naming conventions
   - Logical directory structure

3. **Separation of Concerns**
   - Source code separate from tests
   - Configuration separate from code
   - Documentation separate from implementation

4. **Easy Navigation**
   - Index files (`README.md`, `index.ts`)
   - Clear directory structure
   - Logical grouping

---

## 📝 File Naming Conventions

### Documentation
- `UPPERCASE_WITH_UNDERSCORES.md` - Main guides
- `README.md` - Index files
- `*.example.*` - Example files

### Source Code
- `PascalCase.ts` - Classes and types
- `camelCase.ts` - Utilities and helpers
- `index.ts` - Barrel exports

### Tests
- `*.spec.ts` - Test specifications
- `*.example.ts` - Example tests

---

## 🔄 Recent Structure Improvements

### ✅ Changes Made

1. **Organized Documentation**
   - Created `docs/setup/` for setup guides
   - Created `docs/examples/` for example files
   - Updated `docs/README.md` as index

2. **Moved Files**
   - `GITHUB_SETUP_GUIDE.md` → `docs/setup/`
   - `GITHUB_ACTION_CHECKLIST.md` → `docs/setup/`
   - `playwright-allure.yml.example` → `docs/examples/`

3. **Updated References**
   - Main `README.md` updated with correct paths
   - Documentation index created
   - All links verified

---

## 📚 Related Documentation

- **[Folder Structure Guide](./FOLDER_STRUCTURE_GUIDE.md)** - Detailed test organization
- **[Documentation Index](./README.md)** - All documentation organized
- **[Main README](../README.md)** - Project overview

---

**Last Updated:** 2024

