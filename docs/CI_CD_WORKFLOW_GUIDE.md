# Real-World CI/CD Workflow Guide

## 📋 Table of Contents
- [Complete Feature Development Flow](#complete-feature-development-flow)
- [Branch Strategy](#branch-strategy)
- [Step-by-Step Workflow](#step-by-step-workflow)
- [Pull Request Process](#pull-request-process)
- [CI/CD Pipeline Setup](#cicd-pipeline-setup)
- [Code Review Checklist](#code-review-checklist)
- [Best Practices](#best-practices)

---

## 🔄 Complete Feature Development Flow

### Real-World Scenario: Login Page Testing

```
main (production)
  └── develop (staging)
       └── feature/login-page-tests  ← Your branch
```

---

## 🌿 Branch Strategy (Git Flow)

### Branch Types

1. **`main`** (or `master`)
   - Production-ready code
   - All tests must pass
   - Protected branch (no direct commits)
   - Deploy to production environment

2. **`develop`**
   - Integration branch for features
   - Deploy to staging/QA environment
   - Nightly regression tests run here

3. **`feature/[name]`**
   - Individual features
   - Example: `feature/login-page-tests`
   - Merge to `develop` via Pull Request

4. **`bugfix/[name]`**
   - Bug fixes
   - Example: `bugfix/login-timeout-issue`

5. **`hotfix/[name]`**
   - Critical production fixes
   - Branch from `main`, merge back to both `main` and `develop`

---

## 📝 Step-by-Step Workflow

### **Step 1: Create Feature Branch**

```bash
# Start from develop branch
git checkout develop
git pull origin develop

# Create your feature branch
git checkout -b feature/login-page-tests

# Verify you're on the correct branch
git branch
# * feature/login-page-tests
```

---

### **Step 2: Write Your Tests**

```bash
# Create test file
# tests/auth/login.spec.ts

# Run tests locally as you write
npm run test:auth

# Run with UI mode for debugging
npm run test:ui
```

**Example test structure:**
```typescript
test.describe('Login Page Tests', () => {
  test('TC_LOGIN_001: Valid login', async ({ page }) => {
    test.info().annotations.push(
      { type: 'severity', description: 'critical' },
      { type: 'tag', description: 'smoke' }
    );
    // Test steps...
  });
});
```

---

### **Step 3: Run Tests Locally**

```bash
# Run all auth tests
npm run test:auth

# Generate Allure report to verify
npm run test:allure

# Fix any failures, repeat until all pass
```

**✅ Checklist before commit:**
- [ ] All tests pass locally
- [ ] Added test.step() for clarity
- [ ] Added Allure annotations (severity, tags, epic, feature)
- [ ] No hardcoded data (use TestDataFactory)
- [ ] Followed Page Object Model pattern
- [ ] Added comments for complex logic

---

### **Step 4: Commit Your Changes**

```bash
# Check what changed
git status

# Add your test files
git add tests/auth/login.spec.ts
git add src/pages/LoginPage.ts  # If you created/modified page objects

# Commit with descriptive message
git commit -m "feat: add login page test cases

- Add TC_LOGIN_001: Valid user login
- Add TC_LOGIN_002: Invalid credentials
- Add TC_LOGIN_003: Empty fields validation
- Configure Allure annotations for test categorization
- Add smoke and regression tags

Test Coverage:
- Valid login flow
- Error message validation
- Form validation
"

# Push to remote
git push origin feature/login-page-tests
```

**Commit Message Best Practices:**
- Use conventional commits: `feat:`, `fix:`, `test:`, `docs:`, `refactor:`
- First line: Brief summary (50 chars)
- Body: Detailed explanation
- Include test coverage summary

---

### **Step 5: Create Pull Request (PR)**

#### On GitHub:

1. **Navigate to your repository**
2. **Click "Compare & pull request"**
3. **Fill PR template:**

```markdown
## 🎯 Description
Implemented comprehensive test suite for Login Page functionality

## 🧪 Test Cases Added
- ✅ TC_LOGIN_001: Valid user login with correct credentials
- ✅ TC_LOGIN_002: Invalid email validation
- ✅ TC_LOGIN_003: Invalid password handling
- ✅ TC_LOGIN_004: Empty fields validation
- ✅ TC_LOGIN_005: SQL injection security test

## 📊 Test Results
- **Total Tests**: 5
- **Passed**: 5
- **Failed**: 0
- **Duration**: 45s

[View Allure Report](link-to-report)

## 🏷️ Test Categorization
- Severity: Critical
- Tags: @smoke, @regression, @security
- Epic: User Authentication
- Feature: Login Page

## 🔍 Changes
### Added:
- `tests/auth/login.spec.ts` - Login test suite
- Allure annotations for test organization
- Test data factory for dynamic test data

### Modified:
- `src/pages/LoginPage.ts` - Enhanced error message handling

## ✅ Pre-merge Checklist
- [x] All tests pass locally
- [x] Allure report generated successfully
- [x] Followed Page Object Model pattern
- [x] Added test.step() for clarity
- [x] No hardcoded sensitive data
- [x] Added appropriate tags (@smoke, @regression)
- [x] Code reviewed by self

## 🖼️ Screenshots
![Test Results](screenshot-url)

## 🔗 Related Issues
Closes #123
Related to #456
```

4. **Set reviewers** (QA lead, team members)
5. **Add labels**: `testing`, `enhancement`, `ready-for-review`
6. **Set milestone**: Sprint 10
7. **Link to project board**

---

### **Step 6: CI/CD Pipeline Runs Automatically**

When you create the PR, GitHub Actions automatically:

#### **Pipeline Steps:**

```yaml
1. ✅ Checkout code
2. ✅ Install dependencies
3. ✅ Install Playwright browsers
4. ✅ Run linter/type checker
5. ✅ Run tests
   ├── Run all tests
   ├── Generate Allure report
   └── Upload artifacts
6. ✅ Post comment on PR with results
7. ✅ Deploy report to GitHub Pages
```

#### **What You'll See:**

```
Checks (6)
✅ Lint and Type Check — 1m 23s
✅ Run Playwright Tests — 4m 12s
✅ Generate Allure Report — 45s
✅ Upload Test Artifacts — 1m 02s
✅ Deploy Report — 2m 15s
✅ Code Coverage — 1m 34s
```

#### **If Tests Fail:**

```
❌ Run Playwright Tests — 3m 45s
   3 tests failed
   └── View details
```

**Action Required:**
```bash
# Pull latest changes (if any)
git pull origin feature/login-page-tests

# Fix the failures locally
npm run test:auth

# Commit the fix
git add .
git commit -m "fix: resolve login timeout issue"
git push origin feature/login-page-tests

# CI/CD runs again automatically
```

---

### **Step 7: Code Review Process**

#### **Reviewer's Checklist:**

**Test Quality:**
- [ ] Tests follow AAA pattern (Arrange, Act, Assert)
- [ ] Test names are clear and descriptive
- [ ] Proper use of test.step() for readability
- [ ] Allure annotations added (severity, tags, epic, feature)
- [ ] No hardcoded data or credentials

**Code Quality:**
- [ ] Follows Page Object Model
- [ ] No duplicate code
- [ ] Proper error handling
- [ ] Clear comments where needed

**Coverage:**
- [ ] Positive scenarios covered
- [ ] Negative scenarios covered
- [ ] Edge cases considered
- [ ] Security tests included

**CI/CD:**
- [ ] All CI checks pass
- [ ] Tests don't take too long (< 10 min)
- [ ] Allure report accessible

#### **Review Process:**

**Reviewer leaves comments:**
```markdown
### Changes Requested

1. Line 45: Add test.step() for better reporting
2. Line 78: Use TestDataFactory instead of hardcoded email
3. Missing test case: What happens with special characters in password?

Please update and re-request review.
```

**You respond:**
```bash
# Make the changes
git add .
git commit -m "refactor: address code review feedback

- Add test.step() for clarity (line 45)
- Replace hardcoded data with TestDataFactory
- Add TC_LOGIN_006: Special characters in password
"
git push origin feature/login-page-tests

# Add comment on PR: "✅ Addressed all feedback, re-requesting review"
```

---

### **Step 8: Approval and Merge**

#### **After Approval:**

```
Reviewers (2/2 approved)
✅ @qa-lead — Approved
✅ @senior-qa — Approved

Checks (6/6 passed)
✅ All tests passed

Ready to merge
```

#### **Merge Options:**

**1. Squash and Merge** (Recommended for features)
```
✅ Best for: Feature branches with many commits
   Combines all commits into one clean commit

Final commit:
feat: add login page test suite (#123)

- Implemented 6 test cases covering login functionality
- Added Allure annotations for test organization
- Includes positive, negative, and security tests
```

**2. Create Merge Commit**
```
✅ Best for: Multiple related features
   Preserves all commit history
```

**3. Rebase and Merge**
```
✅ Best for: Clean linear history
   Replays commits on top of base branch
```

#### **Choose "Squash and Merge":**
```bash
# GitHub does this automatically:
git checkout develop
git merge --squash feature/login-page-tests
git commit -m "feat: add login page test suite (#123)"
git push origin develop
```

---

### **Step 9: Post-Merge Actions**

#### **Automatic Actions:**

1. **CI/CD runs on `develop` branch:**
   ```
   ✅ All tests pass on develop
   ✅ Deploy to QA environment
   ✅ Run full regression suite
   ✅ Update Allure trend history
   ```

2. **Notifications sent:**
   - Slack: "PR #123 merged by @you"
   - Email: Test results to team
   - Dashboard updated with new test coverage

#### **Clean Up Your Local Branch:**

```bash
# Switch back to develop
git checkout develop

# Pull the latest (includes your merged changes)
git pull origin develop

# Delete local feature branch
git branch -d feature/login-page-tests

# Delete remote branch (if GitHub didn't auto-delete)
git push origin --delete feature/login-page-tests

# Verify your changes are in develop
git log --oneline -5
```

---

### **Step 10: Monitor Production Deploy**

#### **When `develop` → `main`:**

```bash
# Usually done by release manager
git checkout main
git pull origin main
git merge develop
git push origin main
git tag v1.2.0
git push origin v1.2.0
```

#### **Production Pipeline:**

```
1. ✅ Run full test suite (smoke + regression)
2. ✅ Generate Allure report
3. ✅ Deploy to staging
4. ✅ Run smoke tests on staging
5. ✅ Manual approval required
6. ✅ Deploy to production
7. ✅ Run smoke tests on production
8. ✅ Send success notification
```

#### **Monitor:**
- Check Allure report for any flaky tests
- Monitor error logs
- Watch for production issues

---

## 🔧 CI/CD Pipeline Setup

### **GitHub Actions Configuration**

Create: `.github/workflows/test-on-pr.yml`

```yaml
name: Test on Pull Request

on:
  pull_request:
    branches: [ develop, main ]
    types: [ opened, synchronize, reopened ]

jobs:
  test:
    name: Run Tests
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run linter
        run: npm run lint || echo "No lint script"

      - name: Run tests
        run: npm test
        continue-on-error: true

      - name: Generate Allure Report
        if: always()
        run: npm run allure:generate

      - name: Upload Allure Report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: allure-report
          path: allure-report/

      - name: Deploy Report to GitHub Pages
        if: always()
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: allure-report
          destination_dir: pr-${{ github.event.pull_request.number }}

      - name: Comment PR with Results
        if: always()
        uses: actions/github-script@v7
        with:
          script: |
            const reportUrl = `https://${{ github.repository_owner }}.github.io/${{ github.event.repository.name }}/pr-${{ github.event.pull_request.number }}/`;
            const comment = `## 📊 Test Results

            🔗 [View Allure Report](${reportUrl})
            📦 [Download Artifacts](https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }})

            ✅ Tests completed. Please review the report.`;

            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
```

---

### **Branch Protection Rules**

#### **Configure on GitHub:**

**Settings → Branches → Add rule**

**For `develop` branch:**
```yaml
Branch name pattern: develop

Protection rules:
☑️ Require a pull request before merging
  ☑️ Require approvals: 1
  ☑️ Dismiss stale pull request approvals
  ☑️ Require review from Code Owners

☑️ Require status checks to pass before merging
  ☑️ Require branches to be up to date
  Required checks:
    - Run Tests
    - Generate Allure Report
    - Lint and Type Check

☑️ Require conversation resolution before merging
☑️ Do not allow bypassing the above settings
```

**For `main` branch:**
```yaml
Branch name pattern: main

Protection rules:
☑️ Require a pull request before merging
  ☑️ Require approvals: 2
  ☑️ Require review from Code Owners

☑️ Require status checks to pass before merging
  Required checks:
    - Run Full Test Suite
    - Security Scan
    - Code Coverage > 80%

☑️ Include administrators (enforce on admins too)
☑️ Do not allow bypassing the above settings
```

---

## 📋 Code Review Checklist

### **For Test Author (Self-Review):**

**Before Creating PR:**
- [ ] All tests pass locally: `npm run test:auth`
- [ ] Allure report generated: `npm run test:allure`
- [ ] No console errors or warnings
- [ ] Test coverage is adequate
- [ ] Followed naming conventions
- [ ] Added Allure annotations (severity, tags, epic, feature)
- [ ] Used test.step() for readability
- [ ] No hardcoded credentials or sensitive data
- [ ] Page Objects used correctly
- [ ] Test data from TestDataFactory
- [ ] Git commit messages are clear
- [ ] Branch up to date with base branch

---

### **For Reviewer:**

**Test Quality:**
- [ ] Test names are descriptive (TC_XXX_YYY: Description)
- [ ] Tests are independent (no test depends on another)
- [ ] Proper assertions (not just checking visibility)
- [ ] Error scenarios covered
- [ ] Edge cases considered
- [ ] Test.step() used for clarity
- [ ] Allure annotations present and accurate

**Code Quality:**
- [ ] Follows project structure
- [ ] Page Object Model followed
- [ ] No code duplication
- [ ] Reusable helpers used
- [ ] Constants used (not magic strings)
- [ ] TypeScript types used correctly

**Security:**
- [ ] No hardcoded credentials
- [ ] No sensitive data in logs
- [ ] Security tests included where applicable

**Performance:**
- [ ] Tests complete in reasonable time
- [ ] No unnecessary waits
- [ ] Proper timeout handling

**Documentation:**
- [ ] Comments explain "why", not "what"
- [ ] Complex logic documented
- [ ] PR description is clear

---

## 🎯 Best Practices Summary

### **1. Always Work in Feature Branches**
```bash
# ✅ Good
git checkout -b feature/login-tests

# ❌ Bad
git checkout develop
# ... make changes directly
```

### **2. Small, Focused PRs**
```
✅ Good PR: Add login page tests (5 test cases)
❌ Bad PR: Add all authentication tests (50 test cases)
```

### **3. Run Tests Before Committing**
```bash
# Always run before push
npm run test:auth
npm run test:allure
```

### **4. Write Clear Commit Messages**
```bash
# ✅ Good
git commit -m "feat: add login validation tests

- Add empty field validation
- Add invalid email format validation
- Add SQL injection security test
"

# ❌ Bad
git commit -m "updated tests"
```

### **5. Keep PR Description Detailed**
- What was changed
- Why it was changed
- Test results
- Screenshots/videos
- Link to Allure report

### **6. Respond to Reviews Quickly**
- Address feedback within 24 hours
- Ask questions if something is unclear
- Re-request review after changes

### **7. Clean Up After Merge**
```bash
# Delete local and remote branches
git branch -d feature/login-tests
git push origin --delete feature/login-tests
```

---

## 🔄 Quick Reference: Daily Workflow

```bash
# Morning: Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/my-feature

# During: Write tests
npm run test:ui                  # Debug mode
npm run test:auth                # Run tests

# Before commit: Verify
npm run test:allure              # Check report
git status                       # Review changes
git add .                        # Stage changes
git commit -m "feat: ..."        # Commit
git push origin feature/my-feature

# On GitHub: Create PR
# ... fill PR template
# ... wait for CI/CD
# ... address review feedback

# After merge: Clean up
git checkout develop
git pull origin develop
git branch -d feature/my-feature
```

---

## 📚 Additional Resources

- **Git Flow Guide**: https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow
- **Conventional Commits**: https://www.conventionalcommits.org/
- **GitHub Actions**: https://docs.github.com/en/actions
- **Allure CI/CD**: https://docs.qameta.io/allure/#_jenkins

---

## ✅ Checklist for Production-Ready CI/CD

- [ ] Branch protection rules configured
- [ ] GitHub Actions workflow created
- [ ] Allure reporting configured
- [ ] PR template created
- [ ] Code review process documented
- [ ] Team trained on workflow
- [ ] Slack/email notifications configured
- [ ] Allure reports hosted (GitHub Pages)
- [ ] Nightly regression tests scheduled
- [ ] Test results tracked in dashboard
