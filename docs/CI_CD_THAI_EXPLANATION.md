# คู่มือ CI/CD Pipeline แบบละเอียดสำหรับมือใหม่

## 📚 ไฟล์: `.github/workflows/playwright-allure.yml`

---

## 🎯 CI/CD คืออะไร?

**CI/CD** ย่อมาจาก:
- **CI** = Continuous Integration (การรวมโค้ดอย่างต่อเนื่อง)
- **CD** = Continuous Deployment/Delivery (การส่งโค้ดขึ้น production อย่างต่อเนื่อง)

**ง่ายๆ คือ:** ทุกครั้งที่คุณ push code ขึ้น GitHub → ระบบจะ **รัน test อัตโนมัติ** และ **สร้าง report** ให้คุณดู โดยที่คุณไม่ต้องทำอะไรเลย!

---

## 📂 โครงสร้างไฟล์ในโปรเจค

```
.github/
└── workflows/
    └── playwright-allure.yml  ← ไฟล์นี้เอง!
```

**ตำแหน่งนี้สำคัญมาก!** GitHub จะมองหาไฟล์ในโฟลเดอร์ `.github/workflows/` เท่านั้น

---

## 📖 อธิบายทีละส่วน

### **ส่วนที่ 1: ชื่อ Workflow**

```yaml
name: Playwright Tests with Allure Report
```

**คำอธิบาย:**
- นี่คือชื่อของ workflow นี้
- จะแสดงใน GitHub Actions tab
- ตั้งชื่ออะไรก็ได้ ที่อ่านแล้วเข้าใจ

**ตัวอย่างในหน้าจริง:**
```
GitHub → Actions → "Playwright Tests with Allure Report" ✅ Passed
```

---

### **ส่วนที่ 2: เงื่อนไขการทำงาน (Triggers)**

```yaml
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]
  schedule:
    - cron: '0 2 * * *'
  workflow_dispatch:
```

**คำอธิบาย:** ระบบจะรันเมื่อไร?

#### **1. เมื่อ Push Code (`push`)**
```yaml
push:
  branches: [ main, develop ]
```

**เกิดเมื่อ:**
- คุณ push code ไปที่ branch `main` หรือ `develop`
- ใช้คำสั่ง: `git push origin main`

**ตัวอย่าง:**
```bash
# คุณทำงานเสร็จแล้ว push code
git add .
git commit -m "feat: add login tests"
git push origin develop

# → CI/CD จะรันทันที! ⚡
```

#### **2. เมื่อสร้าง Pull Request (`pull_request`)**
```yaml
pull_request:
  branches: [ main, develop ]
```

**เกิดเมื่อ:**
- คุณสร้าง PR ไปยัง `main` หรือ `develop`
- อัปเดต PR (push code ใหม่ใน PR)

**ตัวอย่าง:**
```
1. คุณ: สร้าง PR จาก feature/login → develop
2. GitHub Actions: รัน test อัตโนมัติ
3. ผลลัพธ์: แสดงใน PR ว่า test pass หรือ fail
```

#### **3. ตั้งเวลารันอัตโนมัติ (`schedule`)**
```yaml
schedule:
  - cron: '0 2 * * *'
```

**คำอธิบาย Cron:**
```
'0 2 * * *'
 │ │ │ │ │
 │ │ │ │ └─── วันในสัปดาห์ (0-6, Sunday-Saturday)
 │ │ │ └───── เดือน (1-12)
 │ │ └─────── วันที่ (1-31)
 │ └───────── ชั่วโมง (0-23)
 └─────────── นาที (0-59)
```

**ตัวอย่าง:**
- `'0 2 * * *'` = ทุกวันเวลา 2:00 AM UTC (9:00 AM เวลาไทย)
- `'0 9 * * 1'` = ทุกวันจันทร์ เวลา 9:00 AM UTC
- `'30 14 * * *'` = ทุกวันเวลา 14:30 UTC

**ใช้งานจริง:**
```
เหมาะสำหรับ: รัน regression test ตอนกลางคืน
→ เช้าตื่นมาดู report ได้เลย!
```

#### **4. รันด้วยมือ (`workflow_dispatch`)**
```yaml
workflow_dispatch:
```

**คำอธิบาย:**
- คุณสามารถกดปุ่มรันเองได้
- ไม่ต้องรอ push หรือ PR

**วิธีใช้:**
```
GitHub → Actions → เลือก workflow → คลิก "Run workflow" → Run
```

---

### **ส่วนที่ 3: Job - งานหลัก**

```yaml
jobs:
  test:
    name: Run Playwright Tests
    runs-on: ubuntu-latest
    timeout-minutes: 60
```

**คำอธิบาย:**

**`jobs:`**
- รวมกลุ่มงานทั้งหมดที่จะทำ

**`test:`**
- ชื่อ job นี้ (ตั้งชื่ออะไรก็ได้)

**`runs-on: ubuntu-latest`**
- รันบนเครื่อง Ubuntu (Linux)
- เป็นเครื่อง virtual ที่ GitHub จัดให้ฟรี

**`timeout-minutes: 60`**
- ถ้างานนี้ใช้เวลาเกิน 60 นาที → ให้หยุดเลย
- ป้องกันไม่ให้รันค้างตลอด

---

### **ส่วนที่ 4: Steps - ขั้นตอนการทำงาน**

#### **Step 1: ดึง Code มา**

```yaml
- name: Checkout code
  uses: actions/checkout@v4
```

**คำอธิบาย:**
- ดึง code จาก repository มาไว้ในเครื่อง virtual
- เหมือนคุณใช้ `git clone`

**ถ้าไม่มี step นี้:**
```
❌ Error: ไม่มี code ให้รัน!
```

---

#### **Step 2: ติดตั้ง Node.js**

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '18'
    cache: 'npm'
```

**คำอธิบาย:**

**`node-version: '18'`**
- ติดตั้ง Node.js version 18
- ต้องตรงกับที่คุณใช้ในเครื่อง local

**`cache: 'npm'`**
- เก็บ cache ของ npm ไว้
- ทำให้ครั้งต่อไปติดตั้งเร็วขึ้น

**เทียบกับการทำเอง:**
```bash
# คุณทำเองในเครื่อง:
nvm install 18
nvm use 18
```

---

#### **Step 3: ติดตั้ง Dependencies**

```yaml
- name: Install dependencies
  run: npm ci
```

**คำอธิบาย:**

**`npm ci` vs `npm install`:**

| คำสั่ง | ใช้เมื่อไร |
|--------|-----------|
| `npm install` | Development (เครื่องของคุณ) |
| `npm ci` | CI/CD (ติดตั้งแบบ clean, เร็วกว่า) |

**เทียบกับการทำเอง:**
```bash
npm ci
```

**ระยะเวลา:** ~30-60 วินาที

---

#### **Step 4: ติดตั้ง Playwright Browsers**

```yaml
- name: Install Playwright browsers
  run: npx playwright install --with-deps
```

**คำอธิบาย:**
- ติดตั้ง browsers (Chromium, Firefox, WebKit)
- `--with-deps` = ติดตั้ง dependencies ของ browser ด้วย

**เทียบกับการทำเอง:**
```bash
npx playwright install --with-deps
```

**ระยะเวลา:** ~1-2 นาที (ครั้งแรก), ~10 วินาที (มี cache)

---

#### **Step 5: รัน Tests 🎯**

```yaml
- name: Run Playwright tests
  run: npm run test:ci
  continue-on-error: true
```

**คำอธิบาย:**

**`npm run test:ci`**
- รัน script ที่คุณกำหนดไว้ใน `package.json`
- ดูจาก: `"test:ci": "playwright test --reporter=list,allure-playwright"`

**`continue-on-error: true`**
- **สำคัญมาก!** แม้ test fail → ยังให้ทำ step ต่อไป
- เพื่อให้สร้าง Allure report แม้ test fail

**ถ้าไม่มีบรรทัดนี้:**
```
Test fail → หยุดเลย → ไม่มี report ❌
```

**ตัวอย่างผลลัพธ์:**
```
Running 26 tests using 6 workers
  ✅ TC_LOGIN_001: Pass (2.3s)
  ✅ TC_LOGIN_002: Pass (3.1s)
  ❌ TC_LOGIN_003: Fail (2.8s)
  ...
```

---

#### **Step 6: สร้าง Allure Report**

```yaml
- name: Generate Allure Report
  if: always()
  run: |
    npm run allure:generate
```

**คำอธิบาย:**

**`if: always()`**
- รันทุกกรณี แม้ step ก่อนหน้า fail
- เพราะเราต้องการ report แม้ test fail!

**`run: |`**
- `|` = สามารถเขียนหลายบรรทัดได้

**`npm run allure:generate`**
- รัน: `allure generate allure-results -o allure-report --clean`
- แปลง `allure-results/` (JSON) → `allure-report/` (HTML)

**เทียบกับการทำเอง:**
```bash
npm run allure:generate
# → สร้างโฟลเดอร์ allure-report/
```

---

#### **Step 7: Upload Allure Results (ข้อมูลดิบ)**

```yaml
- name: Upload Allure Results
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: allure-results
    path: allure-results/
    retention-days: 30
```

**คำอธิบาย:**

**Artifact คืออะไร?**
- ไฟล์ที่เก็บไว้หลังรัน workflow เสร็จ
- สามารถ download มาดูได้

**`retention-days: 30`**
- เก็บไฟล์ไว้ 30 วัน แล้วลบอัตโนมัติ

**วิธีดาวน์โหลด:**
```
GitHub → Actions → เลือก workflow run → Artifacts → allure-results
```

**ประโยชน์:**
- เก็บข้อมูลดิบไว้ในกรณีต้องการ debug
- สามารถสร้าง report ใหม่ภายหลัง

---

#### **Step 8: Upload Allure Report (HTML)**

```yaml
- name: Upload Allure Report
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: allure-report
    path: allure-report/
    retention-days: 30
```

**คำอธิบาย:**
- คล้ายกับ step 7 แต่เป็น HTML report
- สามารถ download แล้วเปิดดูในเครื่องได้

**วิธีดู:**
```
1. Download artifact: allure-report.zip
2. Extract ไฟล์
3. เปิด index.html ใน browser
```

---

#### **Step 9: Deploy Report ขึ้น GitHub Pages 🌐**

```yaml
- name: Deploy Allure Report to GitHub Pages
  if: always() && github.ref == 'refs/heads/main'
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./allure-report
    destination_dir: allure-report-${{ github.run_number }}
    keep_files: true
```

**คำอธิบาย:**

**`if: always() && github.ref == 'refs/heads/main'`**
- รันเฉพาะเมื่อ push ไปที่ branch `main` เท่านั้น
- ไม่รันใน PR หรือ branch อื่น

**`publish_dir: ./allure-report`**
- โฟลเดอร์ที่จะ deploy

**`destination_dir: allure-report-${{ github.run_number }}`**
- แต่ละครั้งที่รัน จะสร้างโฟลเดอร์ใหม่
- ตัวอย่าง: `allure-report-1`, `allure-report-2`, ...

**`keep_files: true`**
- เก็บ report เก่าไว้ (ไม่ลบ)
- เห็นประวัติการรันทั้งหมด

**ผลลัพธ์:**
```
URL: https://YOUR_USERNAME.github.io/YOUR_REPO/allure-report-123/
```

**ดูได้ที่ไหน:**
```
เปิด browser → ใส่ URL ข้างบน → ดู report สวยๆ!
```

---

#### **Step 10: Comment ใน PR**

```yaml
- name: Comment PR with Report Link
  if: always() && github.event_name == 'pull_request'
  uses: actions/github-script@v7
  with:
    script: |
      const runNumber = context.runNumber;
      const reportUrl = `https://${{ github.repository_owner }}.github.io/${{ github.event.repository.name }}/allure-report-${runNumber}/`;
      const comment = `## 📊 Test Results\n\n✅ Allure Report: ${reportUrl}\n\n📦 [Download Artifacts](https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }})`;

      github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: comment
      });
```

**คำอธิบาย:**

**`if: github.event_name == 'pull_request'`**
- รันเฉพาะเมื่อเป็น PR เท่านั้น

**ทำอะไร:**
- สร้าง comment ใน PR อัตโนมัติ
- ใส่ link ไปหา Allure report
- ใส่ link download artifacts

**ตัวอย่าง Comment:**
```markdown
## 📊 Test Results

✅ Allure Report: https://username.github.io/repo/allure-report-123/

📦 Download Artifacts
```

**ประโยชน์:**
- Reviewer เห็นผล test ได้ทันที
- ไม่ต้องไป Actions tab เอง

---

#### **Step 11: Upload Screenshots & Videos**

```yaml
- name: Upload test artifacts (screenshots, videos)
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: test-artifacts
    path: |
      test-results/
      playwright-report/
    retention-days: 7
```

**คำอธิบาย:**

**`path: |`**
- Upload หลายโฟลเดอร์

**โฟลเดอร์ที่ upload:**
1. `test-results/` - Screenshots, videos, traces
2. `playwright-report/` - HTML report ของ Playwright

**`retention-days: 7`**
- เก็บแค่ 7 วัน (เพราะไฟล์ใหญ่)

**ใช้เมื่อไร:**
- Test fail → ดู screenshot ว่าเกิดอะไร
- Debug ปัญหา

---

### **ส่วนที่ 5: Notification Job (Optional)**

```yaml
notify:
  name: Send Notifications
  needs: test
  if: failure()
  runs-on: ubuntu-latest
  steps:
    - name: Send Slack notification
      run: |
        echo "Tests failed! Send notification here."
```

**คำอธิบาย:**

**`needs: test`**
- Job นี้รันหลังจาก job `test` เสร็จ

**`if: failure()`**
- รันเฉพาะเมื่อ test fail

**ใช้ทำอะไร:**
- ส่งการแจ้งเตือนไป Slack
- ส่ง email
- ส่ง LINE notify

**ตัวอย่าง Slack:**
```bash
curl -X POST -H 'Content-type: application/json' \
  --data '{"text":"🚨 Test failed in main branch!"}' \
  $SLACK_WEBHOOK_URL
```

---

## 🔄 Flow การทำงานทั้งหมด

```
1. คุณ Push Code
   ↓
2. GitHub Actions ตรวจจับ (trigger)
   ↓
3. สร้าง Virtual Machine (Ubuntu)
   ↓
4. Checkout Code
   ↓
5. ติดตั้ง Node.js
   ↓
6. ติดตั้ง Dependencies (npm ci)
   ↓
7. ติดตั้ง Playwright Browsers
   ↓
8. รัน Tests
   ↓
9. สร้าง Allure Report
   ↓
10. Upload Artifacts
   ↓
11. Deploy Report ขึ้น GitHub Pages
   ↓
12. Comment ใน PR (ถ้ามี)
   ↓
13. ส่ง Notification (ถ้า fail)
   ↓
14. เสร็จสิ้น! ✅
```

---

## 🎯 ตัวอย่างการใช้งานจริง

### **สถานการณ์ที่ 1: Push Code ไป develop**

```bash
# ในเครื่องคุณ
git add .
git commit -m "feat: add login tests"
git push origin develop
```

**ใน GitHub:**
```
1. Actions tab → เห็น workflow กำลังรัน 🟡
2. รอ 3-5 นาที
3. เห็นผลลัพธ์:
   ✅ All tests passed (18/18)
   📊 Allure Report: [link]
```

---

### **สถานการณ์ที่ 2: สร้าง Pull Request**

```
1. คุณสร้าง PR: feature/login → develop
2. GitHub Actions รันอัตโนมัติ
3. เห็น comment ใน PR:

   ## 📊 Test Results

   ✅ Allure Report: https://...

   Tests: 18 passed, 0 failed
   Duration: 45s

4. Reviewer เห็นผลลัพธ์ทันที
5. Approve PR ได้เลย (ถ้า test pass)
```

---

### **สถานการณ์ที่ 3: Test Fail**

```
1. Push code
2. CI/CD รัน
3. เจอ test fail:
   ✅ 17 passed
   ❌ 1 failed

4. ดู Allure Report:
   - เห็น screenshot ตอน fail
   - เห็น error message
   - เห็น stack trace

5. แก้ bug
6. Push code ใหม่
7. CI/CD รันอีกครั้งอัตโนมัติ
8. Test pass ✅
```

---

### **สถานการณ์ที่ 4: รันตามเวลา (Nightly)**

```
เวลา 2:00 AM UTC (9:00 AM เวลาไทย):
1. GitHub Actions รันอัตโนมัติ
2. รัน full regression tests
3. ส่ง email/Slack ถ้า fail
4. เช้ามาดู report ได้เลย
```

---

## ⚙️ วิธีเปิดใช้งาน

### **1. Rename ไฟล์**

```bash
# ชื่อเดิม
.github/workflows/playwright-allure.yml.example

# เปลี่ยนเป็น
.github/workflows/playwright-allure.yml
```

**คำสั่ง:**
```bash
mv .github/workflows/playwright-allure.yml.example .github/workflows/playwright-allure.yml
```

---

### **2. เปิด GitHub Pages**

```
1. ไปที่ GitHub repository
2. Settings → Pages
3. Source: เลือก "gh-pages" branch
4. Save
```

**รอ 2-3 นาที** แล้ว URL จะพร้อมใช้งาน:
```
https://YOUR_USERNAME.github.io/YOUR_REPO/
```

---

### **3. Push ขึ้น GitHub**

```bash
git add .github/workflows/playwright-allure.yml
git commit -m "ci: add GitHub Actions workflow"
git push origin main
```

---

### **4. ดูผลลัพธ์**

```
1. GitHub → Actions tab
2. เห็น workflow กำลังรัน
3. คลิกเข้าไปดูรายละเอียด
4. รอจนเสร็จ
5. เห็น Allure Report link
```

---

## 🎓 คำศัพท์สำคัญ

| คำศัพท์ | คำอธิบาย | ตัวอย่าง |
|---------|----------|----------|
| **Workflow** | ชุดงานที่ทำอัตโนมัติ | รัน test + สร้าง report |
| **Job** | งานหนึ่งใน workflow | `test`, `notify` |
| **Step** | ขั้นตอนหนึ่งใน job | Checkout code, Run tests |
| **Trigger** | เหตุการณ์ที่เริ่ม workflow | Push, PR, Schedule |
| **Artifact** | ไฟล์ที่เก็บหลังรัน | Screenshots, reports |
| **GitHub Pages** | เว็บไซต์ฟรีจาก GitHub | แสดง Allure report |
| **Cron** | กำหนดเวลารัน | `0 2 * * *` = 2 AM ทุกวัน |

---

## 💡 Tips & Best Practices

### **1. ใช้ Cache เพื่อความเร็ว**

```yaml
- uses: actions/setup-node@v4
  with:
    cache: 'npm'  # ⚡ เร็วขึ้น!
```

---

### **2. ใช้ `if: always()` สำหรับ Report**

```yaml
- name: Generate Allure Report
  if: always()  # รันแม้ test fail
```

---

### **3. กำหนด Timeout**

```yaml
timeout-minutes: 60  # หยุดถ้าใช้เวลาเกิน 60 นาที
```

---

### **4. แยก Job สำหรับ Smoke vs Regression**

```yaml
jobs:
  smoke:
    runs-on: ubuntu-latest
    steps:
      - run: npm run test:smoke  # เร็ว!

  regression:
    runs-on: ubuntu-latest
    steps:
      - run: npm run test:regression  # ช้า
```

---

## 🚨 Troubleshooting

### **ปัญหา 1: Workflow ไม่รัน**

**สาเหตุ:**
- ชื่อไฟล์ผิด (ต้องใน `.github/workflows/`)
- Branch ไม่ตรง (`main` vs `master`)

**แก้ไข:**
```yaml
on:
  push:
    branches: [ main ]  # ตรวจสอบชื่อ branch
```

---

### **ปัญหา 2: Test Timeout**

**สาเหตุ:**
- Test ใช้เวลานาน
- Network ช้า

**แก้ไข:**
```yaml
timeout-minutes: 120  # เพิ่มเป็น 120 นาที
```

---

### **ปัญหา 3: GitHub Pages ไม่ทำงาน**

**สาเหตุ:**
- ยังไม่เปิด GitHub Pages
- Branch gh-pages ยังไม่มี

**แก้ไข:**
```
Settings → Pages → Source: gh-pages
```

---

## 📊 ตัวอย่างผลลัพธ์

### **GitHub Actions Tab:**

```
✅ Playwright Tests with Allure Report
   🟢 Completed in 4m 32s

   Jobs:
   ✅ test - 4m 28s
      ✅ Checkout code - 2s
      ✅ Setup Node.js - 5s
      ✅ Install dependencies - 45s
      ✅ Install Playwright - 1m 20s
      ✅ Run tests - 1m 10s
      ✅ Generate Allure Report - 15s
      ✅ Upload artifacts - 30s
      ✅ Deploy report - 21s
```

---

### **PR Comment:**

```markdown
## 📊 Test Results

✅ Allure Report: https://username.github.io/repo/allure-report-45/

**Summary:**
- Tests: 18 passed, 0 failed
- Duration: 52s
- Browser: Chromium

📦 [Download Artifacts](https://github.com/username/repo/actions/runs/12345)
```

---

## 🎉 สรุป

ไฟล์ CI/CD นี้ช่วยให้คุณ:

1. ✅ **รัน test อัตโนมัติ** ทุกครั้งที่ push/PR
2. ✅ **สร้าง Allure report** ที่สวยงาม
3. ✅ **Deploy report** ขึ้นเว็บให้ทีมดูได้
4. ✅ **Comment ใน PR** พร้อม link report
5. ✅ **รันตามเวลา** (nightly tests)
6. ✅ **เก็บ artifacts** (screenshots, videos)

**ไม่ต้องทำอะไรเลย** - ทุกอย่างอัตโนมัติ 100%! 🚀

---

## 📚 เอกสารเพิ่มเติม

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Playwright CI Guide](https://playwright.dev/docs/ci)
- [Allure Docker Service](https://github.com/fescobar/allure-docker-service)
- [Cron Expression Generator](https://crontab.guru/)
