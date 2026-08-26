# نشر موقع التعمير على Cloudflare Pages

## اللينك المتوقع بعد أول نشر
https://tameer-facilities.pages.dev

## خطوات النشر من الجهاز

1. تسجيل الدخول لـ Cloudflare (مرة واحدة):

```powershell
cd "d:\web\التعمير\الموقع الرئسي\tameer_facilities"
npx wrangler login
```

2. رفع الموقع:

```powershell
npx wrangler pages deploy . --project-name=tameer-facilities --commit-dirty=true
```

3. بعد ما يخلص، هتلاقي اللينك في التيرمنال بهذا الشكل:

```
https://tameer-facilities.pages.dev
```

## ملاحظات
- لو الاسم `tameer-facilities` مستخدم، غيّره في الأمر (مثلاً `tameer-fm`).
- أفضل للصور والموقع الثابت: **Cloudflare Pages** مش Workers القديم.
- لو ربطت الريبو بـ Pages من لوحة Cloudflare، أي push على GitHub ينشر لوحده.
