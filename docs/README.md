# Documentation

Complete guides for QA automation best practices, CI/CD workflows, and test organization.

## 📚 Available Guides

### Getting Started
- **[Folder Structure Guide](./FOLDER_STRUCTURE_GUIDE.md)** - Frontend vs API test organization

### Workflows
- **[CI/CD Workflow Guide](../CI_CD_WORKFLOW_GUIDE.md)** - Complete feature development process
- **[Workflow Cheat Sheet](../WORKFLOW_CHEAT_SHEET.md)** - Daily commands reference
- **[Visual Workflow](../VISUAL_WORKFLOW.md)** - Diagrams and flowcharts
- **[Example Walkthrough](../EXAMPLE_WALKTHROUGH.md)** - Real 3-day development example

### Allure Reporting
- **[Allure Best Practices](../ALLURE_BEST_PRACTICES.md)** - Comprehensive reporting guide
- **[Allure Quick Reference](../ALLURE_QUICK_REFERENCE.md)** - Copy-paste templates

---

## 🏗️ Project Structure

```
automation-exercise-phase1/
├── docs/                          # Documentation
│   ├── README.md                 # This file
│   ├── FOLDER_STRUCTURE_GUIDE.md # Test organization
│   ├── ALLURE_BEST_PRACTICES.md
│   └── ALLURE_QUICK_REFERENCE.md
│
├── tests/
│   ├── frontend/                 # UI tests with browser
│   │   ├── auth/                # Login, register, logout
│   │   ├── products/            # Product browsing
│   │   ├── cart/                # Shopping cart
│   │   └── checkout/            # Checkout flow
│   │
│   ├── api/                      # API tests with HTTP
│   │   ├── auth/                # Auth endpoints
│   │   ├── products/            # Product endpoints
│   │   └── cart/                # Cart endpoints
│   │
│   └── examples/                 # Example tests
│
├── src/
│   ├── pages/                    # Page Object Model
│   ├── fixtures/                 # Test fixtures & data
│   ├── constants/                # App constants
│   └── utils/                    # Helpers & utilities
│
└── .github/
    ├── workflows/                # CI/CD pipelines
    ├── PULL_REQUEST_TEMPLATE.md
    └── ISSUE_TEMPLATE/
