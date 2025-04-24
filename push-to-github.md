# خطوات دفع المشروع إلى GitHub

## 1. تهيئة مستودع Git المحلي (إذا لم يكن موجوداً بالفعل)

افتح موجه الأوامر (Command Prompt) أو PowerShell وانتقل إلى مجلد المشروع:

```bash
cd c:\Users\saleh\Desktop\taleenapp
git init
```

## 2. إضافة الملفات إلى Git

```bash
git add .
```

## 3. عمل commit للتغييرات

```bash
git commit -m "إضافة Google Analytics إلى التطبيق"
```

## 4. إنشاء مستودع على GitHub

1. قم بتسجيل الدخول إلى حسابك على GitHub
2. انقر على زر "+" في الزاوية العلوية اليمنى واختر "New repository"
3. أدخل اسم المستودع (مثلاً: "taleenapp")
4. اترك باقي الإعدادات كما هي واضغط على "Create repository"

## 5. ربط المستودع المحلي بمستودع GitHub

استبدل `USERNAME` باسم المستخدم الخاص بك و `REPOSITORY-NAME` باسم المستودع الذي أنشأته:

```bash
git remote add origin https://github.com/USERNAME/REPOSITORY-NAME.git
```

## 6. دفع التغييرات إلى GitHub

```bash
git push -u origin master
```
أو إذا كان الفرع الرئيسي يسمى "main":
```bash
git push -u origin main
```

ملاحظة: قد يطلب منك GitHub إدخال اسم المستخدم وكلمة المرور.
