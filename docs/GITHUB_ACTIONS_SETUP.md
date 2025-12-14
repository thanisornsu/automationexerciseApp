# 🚀 GitHub Actions CI/CD Setup Guide

**Complete guide to set up CI/CD pipeline for this automation project**

---

## 📋 Table of Contents

1. [Quick Setup](#quick-setup)
2. [Workflow Files Overview](#workflow-files-overview)
3. [Step-by-Step Setup](#step-by-step-setup)
4. [GitHub Pages Configuration](#github-pages-configuration)
5. [Viewing Test Results](#viewing-test-results)
6. [Troubleshooting](#troubleshooting)

---

## ⚡ Quick Setup

### Step 1: Push Workflow Files to Repository

The workflow files are already created in `.github/workflows/`:

- `ci.yml` - Main CI/CD pipeline
- `smoke-tests.yml` - Quick smoke tests
- `nightly-regression.yml` - Nightly regression suite

Just commit and push:

```bash
git add .github/workflows/
git commit -m "Add GitHub Actions CI/CD workflows"
git push origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository: https://github.com/thanisornsu/automationexerciseApp
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
4. Click **Save**

### Step 3: Verify Workflow Runs

1. Go to **Actions** tab in your repository
2. You should see workflows running automatically
3. Click on a workflow run to see details

---

## 📁 Workflow Files Overview

### 1. **ci.yml** - Main CI/CD Pipeline

**Triggers:**

- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`
- Manual trigger (`workflow_dispatch`)
- Scheduled (nightly at 2 AM UTC)

**What it does:**

- ✅ Runs all Playwright tests
- ✅ Generates Allure reports
- ✅ Uploads test artifacts
- ✅ Deploys Allure report to GitHub Pages (main branch only)
- ✅ Comments on PRs with test results

**Artifacts:**

- Allure results (30 days retention)
- Allure report (30 days retention)
- Test artifacts (screenshots, videos - 7 days)
- Playwright HTML report (7 days)

### 2. **smoke-tests.yml** - Quick Smoke Tests

**Triggers:**

- Push to `main` or `develop`
- Pull requests
- Manual trigger

**What it does:**

- ✅ Runs only smoke tests (`@smoke` tag)
- ✅ Fast execution (~5-10 minutes)
- ✅ Perfect for quick validation

### 3. **nightly-regression.yml** - Full Regression Suite

**Triggers:**

- Scheduled (nightly at 2 AM UTC)
- Manual trigger

**What it does:**

- ✅ Runs full test suite
- ✅ Generates comprehensive Allure report
- ✅ Deploys to GitHub Pages

---

## 🔧 Step-by-Step Setup

### Prerequisites

- ✅ GitHub repository: https://github.com/thanisornsu/automationexerciseApp
- ✅ Node.js 18+ (configured in workflow)
- ✅ Playwright installed (handled in workflow)

### Detailed Setup Steps

#### 1. Verify Workflow Files

Check that these files exist:

```
.github/workflows/
├── ci.yml
├── smoke-tests.yml
└── nightly-regression.yml
```

#### 2. Enable GitHub Actions

1. Go to repository **Settings**
2. Click **Actions** → **General**
3. Under **Workflow permissions**, select:
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**
4. Click **Save**

#### 3. Configure GitHub Pages

1. Go to **Settings** → **Pages**
2. Configure:
   ```
   Source: Deploy from a branch
   Branch: gh-pages
   Folder: / (root)
   ```
3. Click **Save**

#### 4. Test the Workflow

**Option A: Push to trigger**

```bash
git add .
git commit -m "Test CI/CD workflow"
git push origin main
```

**Option B: Manual trigger**

1. Go to **Actions** tab
2. Select **CI/CD - Playwright Tests with Allure**
3. Click **Run workflow**
4. Select branch and click **Run workflow**

---

## 📊 GitHub Pages Configuration

### Accessing Reports

After workflow runs, Allure reports will be available at:

**Main Branch Reports:**

```
https://thanisornsu.github.io/automationexerciseApp/allure-report-RUN_NUMBER/
```

**Nightly Regression Reports:**

```
https://thanisornsu.github.io/automationexerciseApp/nightly-regression-RUN_NUMBER/
```

### Report Structure

Each workflow run creates a separate report directory:

- `allure-report-123/` - Run #123
- `allure-report-124/` - Run #124
- `nightly-regression-125/` - Nightly run #125

This allows you to:

- ✅ Compare reports across runs
- ✅ Keep historical data
- ✅ Share specific test run results

---

## 👀 Viewing Test Results

### Method 1: GitHub Actions UI

1. Go to **Actions** tab
2. Click on a workflow run
3. View:
   - ✅ Test execution logs
   - ✅ Download artifacts
   - ✅ See test results summary

### Method 2: Artifacts Download

1. Go to workflow run page
2. Scroll to **Artifacts** section
3. Download:
   - `allure-report-RUN_NUMBER` - Full HTML report
   - `test-artifacts-RUN_NUMBER` - Screenshots, videos
   - `playwright-report-RUN_NUMBER` - Playwright HTML report

### Method 3: GitHub Pages (Main Branch Only)

1. Reports automatically deployed to GitHub Pages
2. Access via: `https://thanisornsu.github.io/automationexerciseApp/allure-report-RUN_NUMBER/`
3. Share link with team

### Method 4: PR Comments

When you create a Pull Request:

- ✅ Automatic comment with test results
- ✅ Link to download artifacts
- ✅ Link to view report (if on main branch)

---

## 🔍 Workflow Features

### ✅ Automatic Features

1. **Test Execution**

   - Runs on every push/PR
   - Continues even if tests fail (to generate reports)
   - Retries failed tests (2 retries on CI)

2. **Report Generation**

   - Allure HTML reports
   - Playwright HTML reports
   - Test artifacts (screenshots, videos)

3. **Artifact Storage**

   - Allure results: 30 days
   - Allure reports: 30 days
   - Test artifacts: 7 days
   - Playwright reports: 7 days

4. **GitHub Pages Deployment**

   - Automatic deployment (main branch only)
   - Historical reports preserved
   - Shareable URLs

5. **PR Integration**
   - Automatic comments on PRs
   - Test result summaries
   - Artifact download links

### 🎯 Workflow Triggers

| Trigger             | When                     | Use Case            |
| ------------------- | ------------------------ | ------------------- |
| `push`              | Code pushed to branch    | Automatic testing   |
| `pull_request`      | PR created/updated       | Validate PR changes |
| `schedule`          | Cron schedule (2 AM UTC) | Nightly regression  |
| `workflow_dispatch` | Manual trigger           | On-demand testing   |

---

## 🛠️ Troubleshooting

### Issue 1: Workflow Not Running

**Symptoms:** No workflows appear in Actions tab

**Solutions:**

1. Check workflow files are in `.github/workflows/` directory
2. Verify YAML syntax is correct
3. Check branch name matches trigger (main/develop)
4. Ensure GitHub Actions is enabled in repository settings

### Issue 2: Tests Failing in CI

**Symptoms:** Tests pass locally but fail in CI

**Common Causes:**

- Environment differences
- Missing dependencies
- Timeout issues
- Browser installation issues

**Solutions:**

```yaml
# Increase timeout in workflow
timeout-minutes: 90

# Add debug output
- name: Debug
  run: |
    echo "Node version: $(node --version)"
    echo "NPM version: $(npm --version)"
    npx playwright --version
```

### Issue 3: Allure Report Not Generating

**Symptoms:** No Allure report artifact

**Solutions:**

1. Check Allure installation step completed
2. Verify `allure-results/` directory exists after tests
3. Check workflow logs for errors
4. Ensure `npm run allure:generate` runs successfully

### Issue 4: GitHub Pages Not Updating

**Symptoms:** Reports not accessible via GitHub Pages

**Solutions:**

1. Verify GitHub Pages is enabled
2. Check `gh-pages` branch exists
3. Ensure workflow has write permissions
4. Check workflow logs for deployment errors

### Issue 5: PR Comments Not Appearing

**Symptoms:** No comment on Pull Request

**Solutions:**

1. Check workflow permissions (read/write)
2. Verify `github.event_name == 'pull_request'`
3. Check Actions tab for errors
4. Ensure GitHub token has proper permissions

---

## 📝 Customization

### Change Node Version

Edit workflow files:

```yaml
env:
  NODE_VERSION: "20" # Change from 18 to 20
```

### Add More Browsers

Edit `ci.yml`:

```yaml
- name: Install Playwright browsers
  run: npx playwright install --with-deps chromium firefox webkit
```

### Change Schedule

Edit `nightly-regression.yml`:

```yaml
schedule:
  - cron: "0 3 * * *" # Change to 3 AM UTC
```

### Add Slack Notifications

1. Create Slack webhook
2. Add secret: `Settings` → `Secrets` → `SLACK_WEBHOOK_URL`
3. Update `notify` job in `ci.yml`:

```yaml
- name: Send Slack notification
  run: |
    curl -X POST -H 'Content-type: application/json' \
    --data '{"text":"Tests failed!"}' \
    ${{ secrets.SLACK_WEBHOOK_URL }}
```

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Workflow files exist in `.github/workflows/`
- [ ] GitHub Actions enabled in repository settings
- [ ] GitHub Pages configured (gh-pages branch)
- [ ] Workflow runs on push to main/develop
- [ ] Workflow runs on Pull Requests
- [ ] Allure reports generate successfully
- [ ] Artifacts upload correctly
- [ ] GitHub Pages deploy reports
- [ ] PR comments appear with test results

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Playwright CI/CD Guide](https://playwright.dev/docs/ci)
- [Allure Reporting](https://docs.qameta.io/allure/)
- [Project CI/CD Guide](./CI_CD_WORKFLOW_GUIDE.md)

---

## 🎯 Quick Commands

```bash
# Check workflow status
gh workflow list

# View workflow runs
gh run list

# Download artifacts
gh run download <run-id>

# Rerun failed workflow
gh run rerun <run-id>
```

---

**Repository:** https://github.com/thanisornsu/automationexerciseApp

**Last Updated:** 2024
