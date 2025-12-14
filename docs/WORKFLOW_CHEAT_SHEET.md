# CI/CD Workflow Cheat Sheet

## 📋 Quick Reference for Daily Work

---

## 🚀 Starting a New Feature

```bash
# 1. Update develop branch
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/login-page-tests

# 3. Verify branch
git branch
# * feature/login-page-tests
```

**Branch Naming Convention:**
- `feature/description` - New features/tests
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical production fixes
- `refactor/description` - Code refactoring

---

## ✍️ Writing Tests

```bash
# Run tests as you write (UI mode)
npm run test:ui

# Run specific test file
npm run test:auth

# Generate Allure report
npm run test:allure
```

**Test Template:**
```typescript
test('TC_XXX_001: Description', async ({ page }) => {
  // Annotations
  test.info().annotations.push(
    { type: 'severity', description: 'critical' },
    { type: 'tag', description: 'smoke' },
    { type: 'epic', description: 'Authentication' },
    { type: 'feature', description: 'Login' }
  );

  // Test steps
  await test.step('Step 1', async () => { });
  await test.step('Step 2', async () => { });
  await test.step('Step 3', async () => { });
});
```

---

## 💾 Committing Changes

```bash
# Check status
git status

# Add files
git add tests/auth/login.spec.ts
git add src/pages/LoginPage.ts

# Commit with conventional format
git commit -m "feat: add login page test cases

- Add TC_LOGIN_001: Valid login
- Add TC_LOGIN_002: Invalid credentials
- Add TC_LOGIN_003: Empty fields
- Configure Allure annotations
"

# Push to remote
git push origin feature/login-page-tests
```

**Commit Types:**
- `feat:` - New feature/test
- `fix:` - Bug fix
- `test:` - Test updates
- `refactor:` - Code refactoring
- `docs:` - Documentation
- `chore:` - Maintenance tasks

---

## 📤 Creating Pull Request

### On GitHub:
1. Click "Compare & pull request"
2. Fill out PR template (auto-populated)
3. Add reviewers
4. Add labels: `testing`, `enhancement`
5. Link issues: `Closes #123`
6. Click "Create pull request"

### CI/CD Runs Automatically:
```
✅ Lint and Type Check
✅ Run Playwright Tests
✅ Generate Allure Report
✅ Upload Artifacts
✅ Deploy Report to GitHub Pages
✅ Comment on PR with report link
```

---

## 🔍 Handling CI/CD Failures

### If Tests Fail:

```bash
# 1. Pull latest changes
git pull origin feature/login-page-tests

# 2. Run tests locally
npm run test:auth

# 3. Fix the issue
# ... make changes ...

# 4. Commit fix
git add .
git commit -m "fix: resolve login timeout issue"

# 5. Push
git push origin feature/login-page-tests

# CI/CD runs again automatically ✅
```

---

## 📝 Responding to Code Review

### When reviewer requests changes:

```bash
# 1. Make the changes
# ... edit files ...

# 2. Commit
git add .
git commit -m "refactor: address code review feedback

- Add test.step() for clarity
- Replace hardcoded data with TestDataFactory
- Add test case for special characters
"

# 3. Push
git push origin feature/login-page-tests

# 4. Comment on PR
# "✅ Addressed all feedback, ready for re-review"
```

---

## ✅ After PR Approval

### Merge Process:
1. Select "Squash and merge"
2. Edit commit message if needed
3. Confirm merge
4. Delete branch (checkbox)

### Clean Up Locally:

```bash
# 1. Switch to develop
git checkout develop

# 2. Pull merged changes
git pull origin develop

# 3. Delete local branch
git branch -d feature/login-page-tests

# 4. Verify
git log --oneline -5
```

---

## 🔄 Common Scenarios

### Scenario 1: Feature Branch Behind Develop

```bash
# Pull latest develop
git checkout develop
git pull origin develop

# Switch back to feature branch
git checkout feature/login-page-tests

# Merge develop into feature
git merge develop

# Resolve conflicts if any
# ... edit conflicting files ...
git add .
git commit -m "merge: resolve conflicts with develop"

# Push
git push origin feature/login-page-tests
```

### Scenario 2: Multiple People Working on Same Feature

```bash
# Before pushing, pull latest from feature branch
git pull origin feature/login-page-tests

# Resolve conflicts if any
git push origin feature/login-page-tests
```

### Scenario 3: Need to Undo Last Commit (Not Pushed)

```bash
# Undo last commit, keep changes
git reset --soft HEAD~1

# Undo last commit, discard changes
git reset --hard HEAD~1
```

### Scenario 4: Need to Undo Pushed Commit

```bash
# Create new commit that undoes changes
git revert HEAD
git push origin feature/login-page-tests
```

### Scenario 5: Wrong Branch - Made Changes on Develop

```bash
# Stash changes
git stash

# Create correct branch
git checkout -b feature/my-feature

# Apply stashed changes
git stash pop

# Continue working
```

---

## 📊 Monitoring & Reports

### Check Test Results:

```bash
# Local HTML report
npm run report

# Allure report
npm run test:allure

# Just generate (don't open)
npm run allure:generate
```

### View CI/CD Results:
1. Go to GitHub repository
2. Click "Actions" tab
3. Click on latest workflow run
4. View test results and Allure report link

---

## 🎯 Pre-Commit Checklist

**Before every commit:**
- [ ] Tests pass: `npm test`
- [ ] Allure report clean: `npm run test:allure`
- [ ] No console errors
- [ ] No hardcoded data
- [ ] Commit message follows convention
- [ ] Files staged correctly

---

## 📱 Daily Workflow Summary

```
Morning:
├─ git checkout develop
├─ git pull origin develop
└─ git checkout -b feature/my-feature

During Day:
├─ Write tests
├─ npm run test:ui (debug)
├─ npm run test:auth (verify)
└─ Commit regularly

Before Leaving:
├─ npm run test:allure (final check)
├─ git push origin feature/my-feature
└─ Create PR if ready

After PR Review:
├─ Address feedback
├─ Push changes
└─ Wait for approval

After Merge:
├─ git checkout develop
├─ git pull origin develop
└─ git branch -d feature/my-feature
```

---

## 🆘 Emergency Commands

```bash
# Forgot branch name
git branch -a

# See what changed
git status
git diff

# Undo all local changes (DANGEROUS)
git reset --hard origin/develop

# See commit history
git log --oneline -10

# Find who changed a line
git blame tests/auth/login.spec.ts

# Search commit messages
git log --grep="login"

# Show files in last commit
git show --name-only

# Compare branches
git diff develop..feature/my-feature
```

---

## 🔗 Useful Links

- Full Guide: [CI_CD_WORKFLOW_GUIDE.md](./CI_CD_WORKFLOW_GUIDE.md)
- Allure Guide: [ALLURE_BEST_PRACTICES.md](./ALLURE_BEST_PRACTICES.md)
- Quick Reference: [ALLURE_QUICK_REFERENCE.md](./ALLURE_QUICK_REFERENCE.md)

---

## 📞 Getting Help

**Test failures:**
1. Check Allure report
2. Review error message
3. Run test in headed mode: `npm run test:headed`
4. Run test in debug mode: `npm run test:debug`

**Git issues:**
1. `git status` - See current state
2. `git log` - See history
3. Ask team on Slack

**CI/CD issues:**
1. Check GitHub Actions tab
2. View workflow logs
3. Check if tests pass locally first
