# 🚀 AI Agent Quick Reference for QA

**One-page cheat sheet for effective AI agent usage**

---

## 📋 Before You Ask: Checklist

- [ ] Reviewed existing similar code?
- [ ] Defined clear requirements?
- [ ] Specified exact file paths?
- [ ] Referenced existing patterns?
- [ ] Provided project context?

---

## 💬 Prompt Templates

### ✅ New Test Suite
```
"Create [feature] tests:
- Page Object: [PageName]Page.ts in src/pages/
- Test File: tests/[frontend|api]/[module]/[feature].spec.ts
- Test Cases: TC_[MODULE]_001, TC_[MODULE]_002...
- Pattern: Follow [existing-file].spec.ts
- Requirements: [specific details]"
```

### ✅ Fix Bug
```
"Fix [test-id] in [file-path]:
- Issue: [description]
- Error: [error message]
- Line: [line number if known]
- Expected: [expected behavior]
- Reference: [similar working code]"
```

### ✅ Add Method
```
"Add [method-name]() to [PageName]Page.ts:
- Purpose: [what it does]
- Parameters: [list]
- Return: [return type]
- Pattern: Follow [existing-method] in [file-path]"
```

### ✅ Refactor
```
"Refactor [file-path]:
- Goal: [what to improve]
- Keep: [what to preserve]
- Change: [what to modify]
- Pattern: [reference file]"
```

---

## 🎯 Token Efficiency Tips

### ✅ DO
- Batch related requests
- Reference existing code by file path
- Provide context upfront
- Use specific line numbers
- Ask for one focused task at a time

### ❌ DON'T
- Ask vague questions
- Request everything at once
- Skip context
- Ignore existing patterns
- Accept code without review

---

## 📝 Example: Good vs Bad

### ❌ Bad Prompt
```
"Add cart tests"
```

### ✅ Good Prompt
```
"Create cart test suite:
- Page Object: CartPage.ts in src/pages/ extending BasePage
- Test File: tests/frontend/cart/cart.spec.ts
- Test Cases:
  - TC_CART_001: Add product to cart (@smoke)
  - TC_CART_002: Remove product from cart
  - TC_CART_003: Update cart quantity
- Pattern: Follow tests/frontend/auth/login.spec.ts
- Use TestDataFactory for test data
- Add CartPage to fixtures in test-fixtures.ts"
```

---

## 🔄 Workflow

```
1. Plan → 2. Define Rules → 3. Ask Agent → 4. Review → 5. Refine
```

---

## 📚 Key Files to Reference

- **Test Pattern**: `tests/frontend/auth/login.spec.ts`
- **Page Object**: `src/pages/LoginPage.ts`
- **Base Class**: `src/pages/BasePage.ts`
- **Test Data**: `src/fixtures/test-data.ts`
- **Fixtures**: `src/fixtures/test-fixtures.ts`

---

## 🎓 Golden Rules

1. **Be Specific** - Use file paths, line numbers
2. **Reference Patterns** - Point to existing code
3. **Provide Context** - Project structure, requirements
4. **Incremental** - One task at a time
5. **Review Always** - Never blindly accept

---

**Full Guide**: See [AI_AGENT_BEST_PRACTICES.md](./AI_AGENT_BEST_PRACTICES.md)

