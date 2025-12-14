# คู่มือการอัพโค้ดขึ้น GitHub

## 📋 สิ่งที่ต้องมี

- ✅ บัญชี GitHub (ถ้ายังไม่มี: [สมัครที่นี่](https://github.com/signup))
- ✅ Git ติดตั้งในเครื่องแล้ว
- ✅ Code commit แล้ว (เสร็จแล้ว! ✅)

---

## 🚀 วิธีที่ 1: สร้าง Repository บน GitHub (แนะนำ)

### **ขั้นตอนที่ 1: สร้าง Repository ใหม่**

1. เข้า [GitHub](https://github.com)
2. คลิก **"+"** มุมบนขวา → **"New repository"**
3. กรอกข้อมูล:

```
Repository name: automation-exercise-phase1
Description: Playwright + TypeScript Test Automation Framework with Allure Reporting

☑️ Public (ถ้าต้องการให้คนอื่นเห็น)
   หรือ Private (ถ้าเป็นโปรเจคส่วนตัว)

⬜ Initialize this repository with:
   ⬜ Add a README file (อย่าเลือก - เรามีแล้ว)
   ⬜ Add .gitignore (อย่าเลือก - เรามีแล้ว)
   ⬜ Choose a license (เลือกหรือไม่ก็ได้)
```

4. คลิก **"Create repository"**

---

### **ขั้นตอนที่ 2: เชื่อมต่อกับ Repository**

GitHub จะแสดงคำสั่งให้คุณ เลือกส่วน **"…or push an existing repository from the command line"**

**คัดลอกและรันคำสั่งเหล่านี้:**

```bash
# เปลี่ยน YOUR_USERNAME เป็นชื่อผู้ใช้ของคุณ
git remote add origin https://github.com/YOUR_USERNAME/automation-exercise-phase1.git
git branch -M main
git push -u origin main
```

**ตัวอย่าง:**
```bash
# ถ้า username ของคุณคือ "thanisorn"
git remote add origin https://github.com/thanisorn/automation-exercise-phase1.git
git branch -M main
git push -u origin main
```

---

### **ขั้นตอนที่ 3: ใส่ Username และ Password**

เมื่อ push จะมีการถามข้อมูล:

```
Username for 'https://github.com': YOUR_USERNAME
Password for 'https://YOUR_USERNAME@github.com':
```

**⚠️ สำคัญ!**
- **Password ไม่ใช่ password ปกติ**
- ต้องใช้ **Personal Access Token (PAT)**

#### **วิธีสร้าง Personal Access Token:**

1. GitHub → คลิกรูปโปรไฟล์ → **Settings**
2. เลื่อนลงล่าง → **Developer settings** (ซ้ายสุด)
3. **Personal access tokens** → **Tokens (classic)**
4. **Generate new token** → **Generate new token (classic)**
5. กรอกข้อมูล:
   ```
   Note: Automation Project Token
   Expiration: 90 days (หรือตามต้องการ)

   Select scopes:
   ☑️ repo (เลือกทั้งหมดใน repo)
   ☑️ workflow
   ```
6. คลิก **Generate token**
7. **คัดลอก token ทันที!** (จะแสดงแค่ครั้งเดียว)
   ```
   ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
8. นำ token นี้ไปใส่แทน password

---

### **ขั้นตอนที่ 4: ตรวจสอบ**

เปิด browser ไปที่:
```
https://github.com/YOUR_USERNAME/automation-exercise-phase1
```

คุณจะเห็น:
- ✅ โค้ดทั้งหมด
- ✅ README.md แสดงหน้าแรก
- ✅ โครงสร้างโฟลเดอร์
- ✅ เอกสารทั้งหมด

---

## 🔄 วิธีที่ 2: ใช้ GitHub Desktop (ง่ายกว่า)

### **1. ติดตั้ง GitHub Desktop**
- Download: [desktop.github.com](https://desktop.github.com)

### **2. Publish Repository**
1. เปิด GitHub Desktop
2. **File** → **Add Local Repository**
3. เลือกโฟลเดอร์: `automation-exercise-phase1`
4. คลิก **Publish repository**
5. เลือก:
   ```
   Name: automation-exercise-phase1
   Description: (อัตโนมัติ)
   ☑️ Keep this code private (ถ้าต้องการ)
   ```
6. คลิก **Publish repository**

**เสร็จ!** ✅

---

## 🎯 ตรวจสอบว่าสำเร็จ

### **บน GitHub:**
```
https://github.com/YOUR_USERNAME/automation-exercise-phase1
```

คุณควรเห็น:
```
📁 .github/
📁 docs/
📁 src/
📁 tests/
📄 README.md
📄 package.json
📄 playwright.config.ts
และอื่นๆ...

48 files committed
```

---

## 📝 คำสั่ง Git ที่คุณรันไปแล้ว

```bash
# ✅ เสร็จแล้ว!
git add .
git commit -m "feat: initial project setup..."

# 🔜 ต่อไปต้องทำ:
git remote add origin https://github.com/YOUR_USERNAME/automation-exercise-phase1.git
git branch -M main
git push -u origin main
```

---

## 🔐 เก็บ Personal Access Token

### **วิธีที่ 1: Git Credential Manager (แนะนำ)**

Windows จะจำ token อัตโนมัติหลังใส่ครั้งแรก

### **วิธีที่ 2: เก็บใน .env (ไม่แนะนำ)**

**อย่าทำ!** เพราะเสี่ยงหลุด

### **วิธีที่ 3: ใช้ SSH Key (ปลอดภัยที่สุด)**

1. สร้าง SSH Key:
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

2. เพิ่มใน GitHub:
```
Settings → SSH and GPG keys → New SSH key
```

3. เปลี่ยน remote URL:
```bash
git remote set-url origin git@github.com:YOUR_USERNAME/automation-exercise-phase1.git
```

---

## 🎓 หลังจากอัพขึ้น GitHub แล้ว

### **1. เปิด GitHub Pages (สำหรับ Allure Report)**

```
Settings → Pages
Source: เลือก "gh-pages" branch
→ Save
```

**URL:**
```
https://YOUR_USERNAME.github.io/automation-exercise-phase1/
```

---

### **2. เปิด GitHub Actions**

ไฟล์อยู่แล้วที่:
```
.github/workflows/playwright-allure.yml.example
```

**เปิดใช้งาน:**
```bash
# Rename ไฟล์
mv .github/workflows/playwright-allure.yml.example .github/workflows/playwright-allure.yml

# Commit และ push
git add .github/workflows/playwright-allure.yml
git commit -m "ci: enable GitHub Actions"
git push
```

**ดูผลลัพธ์:**
```
GitHub → Actions → เห็น workflow กำลังรัน
```

---

### **3. เพิ่มเพื่อนร่วมงาน (Collaborators)**

```
Settings → Collaborators
→ Add people
```

---

## 🔄 การอัพเดตโค้ดครั้งต่อไป

```bash
# 1. แก้ไขโค้ด
# ... เขียน code ...

# 2. ดูว่าแก้อะไรบ้าง
git status

# 3. Add ไฟล์ที่แก้
git add .

# 4. Commit พร้อม message
git commit -m "feat: add cart tests"

# 5. Push ขึ้น GitHub
git push
```

---

## 🚨 แก้ปัญหา

### **ปัญหา: Permission denied**

**แก้ไข:**
```bash
# ตรวจสอบ remote URL
git remote -v

# ถ้าเป็น SSH แต่ยังไม่ได้ตั้งค่า → เปลี่ยนเป็น HTTPS
git remote set-url origin https://github.com/YOUR_USERNAME/automation-exercise-phase1.git
```

---

### **ปัญหา: Repository ชื่อซ้ำ**

**แก้ไข:**
```
1. เปลี่ยนชื่อ repository บน GitHub
2. อัพเดต remote URL:
   git remote set-url origin https://github.com/YOUR_USERNAME/NEW_NAME.git
```

---

### **ปัญหา: Large files**

**แก้ไข:**
```bash
# ลบ node_modules ที่อาจมีขนาดใหญ่
rm -rf node_modules/
rm -rf allure-results/
rm -rf allure-report/

# .gitignore จะจัดการไม่ให้ add ไฟล์เหล่านี้อัตโนมัติ
```

---

## ✅ Checklist ก่อน Push

```
□ รัน test ผ่านหมด (npm test)
□ ไม่มี node_modules ใน git (ตรวจสอบ .gitignore)
□ ไม่มี .env หรือ sensitive data
□ README.md อัพเดตแล้ว
□ Commit message ชัดเจน
□ Personal Access Token พร้อม
```

---

## 🎉 สำเร็จ!

หลังจากอัพขึ้น GitHub แล้ว คุณสามารถ:

✅ **แชร์โปรเจค** ให้เพื่อนหรือทีมดู
✅ **ใช้ CI/CD** รัน test อัตโนมัติ
✅ **ดู Allure Report** บน GitHub Pages
✅ **ทำงานร่วมกัน** ผ่าน Pull Request
✅ **Track issues** และ bugs
✅ **Version control** โค้ดทุกเวอร์ชัน

---

## 📚 เอกสารเพิ่มเติม

- [GitHub Docs](https://docs.github.com)
- [Git Tutorial](https://git-scm.com/docs/gittutorial)
- [Personal Access Token Guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

---

**Repository URL ของคุณ:**
```
https://github.com/YOUR_USERNAME/automation-exercise-phase1
```

**Happy Testing! 🚀**
