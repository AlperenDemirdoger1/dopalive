# Mindloop Hero Page

Pixel-perfect hero section implementation. Görsele çok yakın, modern ve sofistike tasarım.

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

## 🛠️ Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS v3
- Framer Motion
- Inter Font (Google Fonts)

