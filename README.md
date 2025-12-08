# LaunchPod / DopaLive — Project Readme

> **📌 Pinned — Her Zaman Başvur:**  
> - Kurallar: [`AGENTS_RULES.md`](./AGENTS_RULES.md)  
> - Tasarım Sistemi: [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)
> - ⚠️ **Fiyatlandırma: [`docs/PRICING_STRATEGY.md`](./docs/PRICING_STRATEGY.md)** — Pricing bölümü eklerken MUTLAKA oku!

Pixel-perfect, ADHD odaklı landing & funnel sayfaları. Modern, sofistike ve düşük bilişsel yük için optimize edildi.

## 🎨 Görsele Uygun İyileştirmeler

### Typography
- **Font Weight**: 300 (Ultra Light) - Görseldeki gibi çok ince
- **Font Sizes**: Desktop'ta 88px, responsive breakpoints
- **Letter Spacing**: -0.02em (tight)

### Colors & Gradients
- **Soft Gradients**: Blue → Purple → Pink geçişleri
- **Transparency**: Form bg-white/[0.08] - çok şeffaf
- **Border**: border-white/[0.18] - çok subtle

### Glassmorphism
- **Backdrop Blur**: 40px - çok yoğun blur
- **Low Opacity**: 8-12% - çok şeffaf arka plan
- **Soft Borders**: 18-25% opacity

### Animations
- **Easing**: Cubic bezier [0.22, 1, 0.36, 1] - smooth
- **Delays**: Staggered entrance animations
- **Hover**: Subtle scale ve opacity değişimleri

## 🚀 Çalıştırma

```bash
npm run dev
```

**URL**: http://localhost:3002/hero

## 📁 Yapı

```
├── app/
│   ├── hero/page.tsx      # Ana hero sayfası
│   ├── layout.tsx         # Root layout (Inter font)
│   └── globals.css        # Global styles
├── components/
│   ├── Navigation.tsx     # Top navigation
│   ├── HeroSection.tsx    # Main hero content
│   ├── SocialProof.tsx    # Avatar group + text
│   └── EmailForm.tsx      # Glassmorphism form
```

## 🎯 Görselden Farklılıklar

1. **Logo**: Basit bir circular icon (gerçek logo eklenebilir)
2. **Social Icons**: Emoji kullanılıyor (SVG eklenebilir)
3. **Avatars**: Gradient circles (gerçek fotoğraflar eklenebilir)
4. **Background Image**: Görseldeki peyzaj eklenemedi (public/ klasörüne eklenebilir)

## 📝 Sonraki Adımlar

1. `public/logo.svg` ekle → Navigation.tsx'te kullan
2. `public/avatars/` klasörüne profil fotoğrafları ekle
3. `public/hero-bg.jpg` ekle → app/hero/page.tsx'te kullan
4. Social icon SVG'leri ekle (lucide-react veya react-icons)

## 💰 Fiyatlandırma Özeti

> ⚠️ Detaylar için: [`docs/PRICING_STRATEGY.md`](./docs/PRICING_STRATEGY.md)

| Plan | Fiyat | Durum |
|------|-------|-------|
| 🌱 **Başlangıç** | ₺0 | ✅ Aktif |
| ⚡ **Odak** | ₺590/ay | ⏳ Yakında |
| 🚀 **Dönüşüm** | ₺3.900/ay | ✅ Aktif |

**Tek CTA Kuralı:** Tüm planlarda → `"Testi Çöz"`

## 🛠️ Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS v3
- Framer Motion
- Inter Font (Google Fonts)

## 🔥 Firebase (Backend hızlı başlangıç)

- Hizmetler: Firestore (Native), Storage, Auth (email), Functions.
- Ortam değişkenleri (.env.local):
  - NEXT_PUBLIC_FIREBASE_API_KEY
  - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  - NEXT_PUBLIC_FIREBASE_PROJECT_ID
  - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  - NEXT_PUBLIC_FIREBASE_APP_ID
  - FIREBASE_PROJECT_ID
  - FIREBASE_CLIENT_EMAIL
  - FIREBASE_PRIVATE_KEY (\\n ile kaçışlı)
  - FIREBASE_STORAGE_BUCKET
- Admin SDK, `app/api/*` route handler'larında quiz ve başvuru verilerini Firestore'a kaydetmek için kullanılır.


| Plan | Fiyat | Durum |
|------|-------|-------|
| 🌱 **Başlangıç** | ₺0 | ✅ Aktif |
| ⚡ **Odak** | ₺590/ay | ⏳ Yakında |
| 🚀 **Dönüşüm** | ₺3.900/ay | ✅ Aktif |

**Tek CTA Kuralı:** Tüm planlarda → `"Testi Çöz"`

## 🛠️ Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS v3
- Framer Motion
- Inter Font (Google Fonts)

## 🔥 Firebase (Backend hızlı başlangıç)

- Hizmetler: Firestore (Native), Storage, Auth (email), Functions.
- Ortam değişkenleri (.env.local):
  - NEXT_PUBLIC_FIREBASE_API_KEY
  - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  - NEXT_PUBLIC_FIREBASE_PROJECT_ID
  - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  - NEXT_PUBLIC_FIREBASE_APP_ID
  - FIREBASE_PROJECT_ID
  - FIREBASE_CLIENT_EMAIL
  - FIREBASE_PRIVATE_KEY (\\n ile kaçışlı)
  - FIREBASE_STORAGE_BUCKET
- Admin SDK, `app/api/*` route handler'larında quiz ve başvuru verilerini Firestore'a kaydetmek için kullanılır.

