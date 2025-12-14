## 🎯 Description
<!-- Provide a brief description of the changes in this PR -->


## 🧪 Test Cases Added/Modified
<!-- List all test cases with their IDs and brief description -->
- [ ] TC_XXX_001: Description
- [ ] TC_XXX_002: Description
- [ ] TC_XXX_003: Description

## 📊 Test Results
**Local Execution:**
- Total Tests: X
- Passed: X
- Failed: X
- Skipped: X
- Duration: Xm Xs

**Allure Report:**
<!-- Add link when CI/CD completes -->
🔗 [View Allure Report](link-will-be-added-by-ci)

## 🏷️ Test Categorization
<!-- Mark which categories apply -->
- [ ] Severity: Blocker
- [ ] Severity: Critical
- [ ] Severity: Normal
- [ ] Severity: Minor
- [ ] Severity: Trivial

**Tags:**
- [ ] @smoke
- [ ] @regression
- [ ] @security
- [ ] @integration
- [ ] @e2e

**Traceability:**
- Epic:
- Feature:
- Story:

## 🔍 Type of Change
- [ ] New test cases
- [ ] Bug fix in existing tests
- [ ] Refactoring (no functional changes)
- [ ] Documentation update
- [ ] Page Object changes
- [ ] Test data/fixtures update
- [ ] Configuration changes

## 📝 Changes Made
### Added:
<!-- List new files or features -->
-

### Modified:
<!-- List changed files -->
-

### Deleted:
<!-- List removed files -->
-

## 🖼️ Evidence
<!-- Add screenshots, videos, or GIFs of test execution -->
<details>
<summary>Screenshot: Test Results</summary>

<!-- Paste screenshot here -->

</details>

## ✅ Pre-merge Checklist
<!-- Verify all items before requesting review -->

**Test Quality:**
- [ ] All tests pass locally
- [ ] Tests follow AAA pattern (Arrange, Act, Assert)
- [ ] Test names are clear and descriptive (TC_XXX_YYY: Description)
- [ ] Used `test.step()` for better reporting
- [ ] Allure annotations added (severity, tags, epic, feature)
- [ ] No hardcoded test data (using TestDataFactory)
- [ ] Both positive and negative scenarios covered
- [ ] Edge cases considered

**Code Quality:**
- [ ] Follows Page Object Model pattern
- [ ] No code duplication
- [ ] TypeScript types used correctly
- [ ] Constants used for static values
- [ ] No console.log() or debug code left
- [ ] Proper error handling

**Security:**
- [ ] No hardcoded credentials
- [ ] No sensitive data in test code
- [ ] Security tests included (if applicable)

**Documentation:**
- [ ] Code comments added where needed
- [ ] Test case descriptions are clear
- [ ] README updated (if needed)

**Git:**
- [ ] Branch is up to date with base branch
- [ ] Commit messages follow convention (feat:, fix:, test:)
- [ ] No merge conflicts

**CI/CD:**
- [ ] All CI checks pass
- [ ] Allure report generated successfully

## 🔗 Related Issues
<!-- Link related issues or tickets -->
Closes #
Related to #

## 👥 Reviewers
<!-- Tag team members who should review -->
@qa-lead
@team-member

## 📌 Additional Notes
<!-- Any extra information for reviewers -->

