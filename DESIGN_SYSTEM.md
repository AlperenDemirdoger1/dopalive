# DopaLive Design System

> **Bu döküman tüm agentlar için zorunlu referanstır.**  
> Yeni sayfa veya component oluştururken bu kurallara uyulmalıdır.  
> Çakışma/ownership kuralları için ayrıca [`AGENTS_RULES.md`](./AGENTS_RULES.md) okunmalıdır.

---

## Marka Kimliği (Brand Identity)

### Marka Adı

| Kullanım | Format |
|----------|--------|
| **Resmi Ad** | DopaLive |
| **Logo Yazımı** | Dopa**Live** (Live vurgulu) |
| **Slogan** | "DEHB beyninizi anlayan platform" |
| **Metadata Title** | "DopaLive - ADHD Koçluk ve Odak Platformu" |

### Logo

Logo SVG olarak `components/SiteHeader.tsx` ve `components/SiteFooter.tsx` içinde tanımlıdır.

**Logo Gradient Renkleri:**
```tsx
// ✅ DOĞRU - Marka Renkleri
<linearGradient>
  <stop offset="0%" stopColor="#E8735A" />   // Primary (Coral)
  <stop offset="100%" stopColor="#F5D4A0" /> // Secondary (Peach)
</linearGradient>

// ❌ YANLIŞ - Eski Renkler (KULLANILMAMALI)
<stop stopColor="#7C3AED" />  // Violet
<stop stopColor="#06B6D4" />  // Cyan
```

**Logo Text:**
```tsx
// ✅ DOĞRU
<span className="font-bold text-lg text-foreground">
  Dopa<span className="text-primary">Live</span>
</span>

// ❌ YANLIŞ
<span className="text-violet-400">Live</span>
```

### Marka Sesi (Tone of Voice)

| Özellik | Açıklama |
|---------|----------|
| **Sıcak** | Samimi, destekleyici, yargısız |
| **Bilimsel** | Nörobilim temelli, kanıta dayalı |
| **Güçlendirici** | "Sorun sende değil, beynin farklı çalışıyor" |
| **ADHD-Dostu** | Kısa cümleler, net hiyerarşi, taranabilir |

### Hedef Kitle Dili

```tsx
// ✅ DOĞRU - Samimi, destekleyici
"Seni gerçekten anlayan bir DEHB koçu"
"Beynine uygun stratejiler"
"Artık yalnız değilsin"

// ❌ YANLIŞ - Soğuk, kurumsal
"ADHD koçluk hizmetlerimiz"
"Profesyonel destek paketi"
```

### Sosyal Medya ve İletişim

| Platform | URL |
|----------|-----|
| Twitter | `https://twitter.com/dopalive` |
| Instagram | `https://instagram.com/dopalive` |
| LinkedIn | `https://linkedin.com/company/dopalive` |
| E-posta | `merhaba@dopalive.app` |

### Metadata (SEO)

```tsx
// app/layout.tsx için
export const metadata: Metadata = {
  title: "DopaLive - ADHD Koçluk ve Odak Platformu",
  description: "DEHB'yi bilen uzman koçlar, accountability ve odak araçlarıyla projelerini bitir.",
  keywords: ["ADHD", "DEHB", "koçluk", "coaching", "body doubling", "odak"],
};
```

---

## Arka Plan ve Temalar

### Sayfa Arka Planı

```tsx
// ✅ DOĞRU - Sıcak koyu tema
className="bg-background"  // CSS Variable: hsl(30 8% 11%) → #1E1C1A

// ❌ YANLIŞ - Soğuk siyah
className="bg-[#050508]"
className="bg-[#0a0a0a]"
```

### Ambient Gradientler

Sayfaların üst kısmında hafif renk glow'ları kullanılır:

```tsx
// ✅ DOĞRU
<div className="absolute top-0 w-[800px] h-[400px] bg-primary/8 rounded-full blur-[150px]" />
<div className="absolute bottom-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]" />

// ❌ YANLIŞ
<div className="bg-[#FF6B6B] opacity-[0.03]" />
<div className="bg-[#7C3AED] opacity-[0.10]" />
```

---

## Renk Paleti

### Ana Renkler

| Token | HEX | Tailwind Class | Kullanım |
|-------|-----|----------------|----------|
| **Primary** | `#E8735A` | `text-primary`, `bg-primary` | Ana marka rengi, CTA butonları |
| **Secondary** | `#F5D4A0` | `text-secondary`, `bg-secondary` | Sıcak aksanlar, yıldızlar |
| **Accent** | `#5B8DEF` | `text-accent`, `bg-accent` | Odaklanma durumları, focus |
| **Success** | `#4ADE80` | `text-success`, `bg-success` | Başarı, ödül, dopamin |
| **Destructive** | `#EF6B6B` | `text-destructive` | Hata, uyarı |

### Gradientlar

```tsx
// Ana gradient - CTA butonları için
className="bg-gradient-warm"  // from-primary to-secondary

// Focus gradient
className="bg-gradient-focus" // from-accent to-accent-light

// Reward gradient  
className="bg-gradient-reward" // from-success to-success-light
```

### YASAK - Hardcoded Renkler

```tsx
// ❌ YANLIŞ
className="bg-[#FF6B6B]"
className="text-violet-400"
className="from-cyan-500"

// ✅ DOĞRU
className="bg-primary"
className="text-primary"
className="bg-gradient-warm"
```

---

## Tipografi

### Font Aileleri

| Token | Font | Tailwind Class | Kullanım |
|-------|------|----------------|----------|
| Display | Syne | `font-display` | Başlıklar (h1-h4) |
| Body | DM Sans | `font-body` veya `font-sans` | Paragraflar, UI metinleri |
| Mono | JetBrains Mono | `font-mono` | Kod, sayılar |

### Boyut Skalası

```tsx
// Başlıklar
className="text-display-2xl"  // 4rem - Hero başlıkları
className="text-display-xl"   // 3.25rem - Section başlıkları
className="text-display-lg"   // 2.5rem - Alt başlıklar
className="text-display-md"   // 2rem
className="text-display-sm"   // 1.5rem

// Body
className="text-body-xl"      // 1.25rem
className="text-body-lg"      // 1.125rem
className="text-body-md"      // 1rem - Varsayılan
className="text-body-sm"      // 0.9375rem
className="text-body-xs"      // 0.8125rem
```

### Örnek Kullanım

```tsx
<h1 className="text-display-xl font-display font-bold text-foreground">
  Başlık
</h1>

<p className="text-body-md text-muted-foreground leading-relaxed">
  Paragraf metni
</p>
```

---

## Component Kullanımı

### Button

**Import:**
```tsx
import { Button } from '@/components/ui/button';
```

**Varyantlar:**
```tsx
// Ana CTA
<Button variant="primary" size="lg" rightIcon={ArrowRight}>
  Başla
</Button>

// İkincil aksiyon
<Button variant="secondary" size="md">
  Daha Fazla
</Button>

// Minimal
<Button variant="ghost" size="sm">
  İptal
</Button>

// Çerçeveli
<Button variant="outline">
  Detaylar
</Button>

// Başarı/Ödül
<Button variant="success">
  Tamamlandı
</Button>
```

**Boyutlar:** `sm`, `md`, `lg`, `xl`, `icon`, `icon-sm`, `icon-lg`

**Props:**
- `leftIcon` / `rightIcon` - Lucide icon component
- `isLoading` - Loading durumu
- `loadingText` - Loading metni
- `asChild` - Link wrapper için

### Card

**Import:**
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
```

**Varyantlar:**
```tsx
// Varsayılan
<Card variant="default">...</Card>

// Cam efekti
<Card variant="glass">...</Card>

// Gölgeli
<Card variant="elevated">...</Card>

// Vurgulu (marka rengi)
<Card variant="warm">...</Card>

// Başarı durumu
<Card variant="reward" withRewardGlow>...</Card>

// Hover efektli
<Card variant="interactive" withHover>...</Card>
```

### Tabs

**Import:**
```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
```

**Kullanım:**
```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">İçerik 1</TabsContent>
  <TabsContent value="tab2">İçerik 2</TabsContent>
</Tabs>
```

### Accordion

**Import:**
```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
```

**Kullanım:**
```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Soru 1</AccordionTrigger>
    <AccordionContent>Cevap 1</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Dialog

**Import:**
```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
```

### Toast

**Import:**
```tsx
import { toast } from '@/lib/use-toast';
```

**Kullanım:**
```tsx
toast.success({ title: "Başarılı!", description: "İşlem tamamlandı." });
toast.error({ title: "Hata", description: "Bir sorun oluştu." });
toast.info({ title: "Bilgi", description: "Mesajınız gönderildi." });
```

### Spinner

**Import:**
```tsx
import { Spinner, PulseDots, Skeleton } from '@/components/ui/spinner';
```

---

## Animasyonlar

### ZORUNLU: lib/motion.ts Kullanımı

```tsx
import { fadeInUp, staggerContainer, staggerItem, hoverScale } from '@/lib/motion';
```

### Kullanılabilir Animasyonlar

| Animasyon | Kullanım |
|-----------|----------|
| `fadeInUp` | Section girişleri |
| `fadeInDown` | Üstten gelen elementler |
| `fadeIn` | Basit fade |
| `scaleIn` | Pop efekti |
| `staggerContainer` | Liste container'ı |
| `staggerItem` | Liste item'ları |
| `hoverScale` | Hover efekti |
| `hoverLift` | Kart hover'ı |
| `rewardPop` | Başarı animasyonu |
| `slideInRight` | Mobil menü |
| `modalVariants` | Dialog animasyonu |

### Örnek Kullanım

```tsx
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

// Section animasyonu
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={fadeInUp}
>
  İçerik
</motion.div>

// Liste animasyonu
<motion.ul variants={staggerContainer(0.1)} initial="hidden" animate="visible">
  {items.map((item) => (
    <motion.li key={item.id} variants={staggerItem}>
      {item.content}
    </motion.li>
  ))}
</motion.ul>
```

### YASAK - Inline Animasyonlar

```tsx
// ❌ YANLIŞ
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

// ✅ DOĞRU
import { fadeInUp } from '@/lib/motion';
```

---

## Sayfa Yapısı

### Container Kullanımı

```tsx
// Dar içerik (blog, form)
<div className="container-tight">  // max-w-3xl

// Geniş içerik (feature grid)
<div className="container-wide">   // max-w-6xl

// Varsayılan container
<div className="container">        // max-w-screen-2xl
```

### Section Padding

```tsx
// Standart section
<section className="section-padding">  // py-16 md:py-24 lg:py-32

// Küçük section
<section className="section-padding-sm">  // py-12 md:py-16 lg:py-20
```

### Section Template

```tsx
<section className="section-padding px-5 md:px-8">
  <div className="container-wide">
    {/* Section Header */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="text-center mb-16 max-w-3xl mx-auto"
    >
      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
        <Icon className="w-4 h-4" />
        Badge Text
      </span>
      <h2 className="text-display-lg font-display font-bold text-foreground mb-4">
        Section Başlığı
      </h2>
      <p className="text-muted-foreground text-body-lg">
        Açıklama metni
      </p>
    </motion.div>

    {/* Section Content */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Cards */}
    </div>
  </div>
</section>
```

---

## Utility Class'lar

### Glass Efekti

```tsx
className="glass"        // bg-card/80 backdrop-blur-xl border
className="glass-warm"   // Marka rengi ile glass
```

### Text Gradient

```tsx
className="text-gradient"        // Coral → Peach gradient
className="text-gradient-focus"  // Blue gradient
```

### Focus Ring

```tsx
className="focus-ring"  // Erişilebilir focus state
```

### Hover Efektleri

```tsx
className="hover-lift"   // -translate-y-1
className="hover-scale"  // scale-[1.02]
className="hover-glow"   // shadow-warm-lg
```

### Shadow'lar

```tsx
className="shadow-warm-sm"   // Hafif sıcak gölge
className="shadow-warm-md"   // Orta sıcak gölge
className="shadow-warm-lg"   // Güçlü sıcak gölge
className="shadow-card"      // Kart gölgesi
className="shadow-card-hover" // Hover gölgesi
```

---

## Erişilebilirlik

### Focus States

Tüm interaktif elementlerde `focus-ring` class'ı kullanılmalı:

```tsx
<button className="focus-ring">Buton</button>
<a href="#" className="focus-ring">Link</a>
```

### ARIA Labels

```tsx
<button aria-label="Menüyü aç">
  <Menu className="w-5 h-5" />
</button>

<section aria-labelledby="features-title">
  <h2 id="features-title">Özellikler</h2>
</section>
```

### Reduced Motion

Animasyonlar otomatik olarak `prefers-reduced-motion` ayarına uyar.

---

## Dosya Yapısı

```
components/
├── ui/
│   ├── accordion.tsx    # Radix Accordion
│   ├── button.tsx       # Button variants
│   ├── card.tsx         # Card variants
│   ├── dialog.tsx       # Radix Dialog
│   ├── spinner.tsx      # Loading indicators
│   ├── tabs.tsx         # Radix Tabs
│   ├── toast.tsx        # Toast notifications
│   └── index.ts         # Barrel export
├── SiteHeader.tsx       # Global header
├── SiteFooter.tsx       # Global footer
└── Providers.tsx        # Context providers

lib/
├── motion.ts           # Animation variants (ZORUNLU)
├── utils.ts            # cn() helper
└── use-toast.ts        # Toast hook

app/
├── globals.css         # Global styles, CSS variables
└── layout.tsx          # Root layout
```

---

## Checklist - Yeni Sayfa Oluştururken

- [ ] `lib/motion.ts`'den animasyonlar import edildi
- [ ] `components/ui/`'den componentler import edildi
- [ ] Hardcoded renk yok, Tailwind token'ları kullanıldı
- [ ] `font-display` başlıklarda kullanıldı
- [ ] `container-wide` veya `container-tight` kullanıldı
- [ ] `section-padding` kullanıldı
- [ ] Focus states eklendi (`focus-ring`)
- [ ] ARIA label'lar eklendi
- [ ] Responsive test edildi

---

## Örnek Import Bloğu

```tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Brain, Star } from 'lucide-react';

// Design System imports
import { cn } from '@/lib/utils';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
```

---

## Bilinen Tutarsızlıklar (Düzeltilmesi Gereken)

> **DİKKAT:** Aşağıdaki dosyalarda marka standartlarına uymayan kodlar bulunmaktadır.  
> Her agent kendi alanındaki dosyaları güncellerken bu listeyi referans almalıdır.

### Kritik - Logo ve Header/Footer

| Dosya | Sorun | Çözüm |
|-------|-------|-------|
| `components/SiteHeader.tsx` | Logo `#7C3AED`/`#06B6D4` kullanıyor | `#E8735A`/`#F5D4A0` olmalı |
| `components/SiteHeader.tsx` | Arka plan `#050508` | `bg-background` olmalı |
| `components/SiteFooter.tsx` | Aynı logo sorunu | Logo gradient güncellenmeli |
| `app/layout.tsx` | Title "LaunchPod" yazıyor | "DopaLive" olmalı |

### Sayfalar - Hardcoded Renkler

| Dosya | Sorun Sayısı | Örnek Sorunlar |
|-------|--------------|----------------|
| `app/coaching/page.tsx` | ~30+ | `#FF6B6B`, `#FF8E53`, `#0a0a0a` |
| `app/pricing/page.tsx` | ~50+ | `#FF6B6B`, `#FF8E53`, `#f5d4a0` |

### UI Componentler - Token Kullanımı

| Dosya | Sorun | Çözüm |
|-------|-------|-------|
| `components/ui/tabs.tsx` | `#FF6B6B`, `#FF8E53` hardcoded | `primary`, `bg-gradient-warm` |
| `components/ui/accordion.tsx` | `#f5d4a0`, `#FF6B6B` hardcoded | `secondary`, `primary` |
| `components/ui/dialog.tsx` | `#FF6B6B`, `#111` hardcoded | `primary`, `background` |
| `components/ui/toast.tsx` | `#FF6B6B` hardcoded | `primary` |
| `components/StatCard.tsx` | `#f5d4a0`, `#FF6B6B` hardcoded | `secondary`, `primary` |

### Renk Eşleştirme Tablosu

Bu tabloya göre hardcoded renkleri değiştirin:

| Eski (YANLIŞ) | Yeni (DOĞRU) | Tailwind Class |
|---------------|--------------|----------------|
| `#FF6B6B` | `#E8735A` | `primary` |
| `#FF8E53` | (gradient mid) | `bg-gradient-warm` |
| `#f5d4a0` | `#F5D4A0` | `secondary` |
| `#7C3AED` | ❌ Kullanılmayacak | - |
| `#06B6D4` | ❌ Kullanılmayacak | - |
| `#050508` | `#1E1C1A` | `background` |
| `#0a0a0a` | `#1E1C1A` | `background` |
| `#0f0f0f` | `#1E1C1A` | `background` |
| `violet-400` | - | `primary` |
| `cyan-400/500` | - | `secondary` veya `accent` |

---

## Güncelleme Geçmişi

| Tarih | Değişiklik |
|-------|------------|
| 2024-12-05 | Branding bölümü ve tutarsızlık listesi eklendi |
| 2024-12 | İlk versiyon oluşturuldu |

---

> **Not:** Bu döküman değiştirildiğinde tüm agentlar bilgilendirilmelidir.

