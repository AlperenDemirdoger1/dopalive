# Agent Collaboration Rules

Bu doküman, paralel çalışan ajanların çakışmadan ve tutarlı bir deneyimle ilerlemesi için tek referanstır. Lütfen tüm ajanlar başında okusun, değişiklik gerektiğinde burada güncellensin.

## Sahiplik (Ownership)
- **Core UI / Layout Agent (tek otorite):**
  - `components/ui/**`, `components/shared/**`
  - `app/layout.tsx`, `app/globals.css`, `tailwind.config.ts`
  - Design tokenlar (renk, tipografi, spacing, radius, shadow), global animasyonlar, header/footer/nav, tema ayarları
- **Sayfa Ajanları (Home, Coaching, Science, Pricing, Blog):**
  - Yalnızca kendi `app/<page>/page.tsx` ve o sayfaya özel küçük bileşenler
  - UI primitiflerini **tüketir**, değiştirmez
- **Copy QA Agent:**
  - UTF-8 Türkçe karakter kontrolü, copy tutarlılığı, kırık link/CTA, meta title/description kontrolü
- **Build/QA Agent:**
  - `npm run lint`, `npm run build`
  - Nav/CTA smoke test (404 kontrolü)

## Rota ve CTA Standardı
- Kullanılabilir rotalar: `/start`, `/pricing`, `/coaching`, `/science`, `/blog`
- **Kullanmayın:** `/get-started`, `/login`, `/podcast` (sayfalar yok)
- Nav ve CTA hedefleri bu listeyle tutarlı olmalı; yeni rota eklemeden önce PM/Lead ile konuşun.

## Dil ve Karakter
- Türkçe UTF-8 kullanın; ASCII kaçış yapmayın (örn. “ç, ğ, ı, ö, ş, ü” gerçek karakterlerle).
- Kopya tutarlılığı: “koç”, “görüşme”, “çalıştığını” vb. doğru yazım.

## Dosya Değiştirme Sınırları
- Core UI’ya ait dosyalara yalnızca Core UI agentı dokunur. İhtiyaç varsa önce sync alın.
- Sayfa ajanları shared/global dosyaları değiştirmez; kendi sayfa bileşenleriyle sınırlı kalır.
- Yeni stil/token eklemek gerekiyorsa Core UI agentına ticket/sync açın.

## İşleyiş / Merge Sırası
1) Core UI/Layout güncellemeleri (tokens, nav, header/footer)  
2) Sayfa ajanları (sadece kendi sayfaları) paralel çalışır  
3) Copy QA turu (karakter, link, meta)  
4) Build/QA: `npm run lint` + `npm run build`, nav/CTA smoke test  

## QA Kontrol Listesi (kısa)
- Linkler: Nav ve tüm CTA’lar tanımlı rotalara gidiyor mu? 404 yok.
- Copy: Türkçe karakterler doğru, ASCII yok.
- SEO: Title/description mevcut ve sayfaya uygun.
- UI: Sayfa bileşenleri `@/components/ui` primitiflerini kullanıyor; inline custom stil yok (zorunlu değilse).
- Build: `npm run lint` ve `npm run build` temiz.

## İletişim
- Paylaşılan dosyalara dokunmanız gerekiyorsa önce Core UI agentı veya Lead ile sync alın.
- Kurala uymayan değişiklikler geldiğinde, merge etmeden önce bu dokümana referans gösterin.




Bu doküman, paralel çalışan ajanların çakışmadan ve tutarlı bir deneyimle ilerlemesi için tek referanstır. Lütfen tüm ajanlar başında okusun, değişiklik gerektiğinde burada güncellensin.

## Sahiplik (Ownership)
- **Core UI / Layout Agent (tek otorite):**
  - `components/ui/**`, `components/shared/**`
  - `app/layout.tsx`, `app/globals.css`, `tailwind.config.ts`
  - Design tokenlar (renk, tipografi, spacing, radius, shadow), global animasyonlar, header/footer/nav, tema ayarları
- **Sayfa Ajanları (Home, Coaching, Science, Pricing, Blog):**
  - Yalnızca kendi `app/<page>/page.tsx` ve o sayfaya özel küçük bileşenler
  - UI primitiflerini **tüketir**, değiştirmez
- **Copy QA Agent:**
  - UTF-8 Türkçe karakter kontrolü, copy tutarlılığı, kırık link/CTA, meta title/description kontrolü
- **Build/QA Agent:**
  - `npm run lint`, `npm run build`
  - Nav/CTA smoke test (404 kontrolü)

## Rota ve CTA Standardı
- Kullanılabilir rotalar: `/start`, `/pricing`, `/coaching`, `/science`, `/blog`
- **Kullanmayın:** `/get-started`, `/login`, `/podcast` (sayfalar yok)
- Nav ve CTA hedefleri bu listeyle tutarlı olmalı; yeni rota eklemeden önce PM/Lead ile konuşun.

## Dil ve Karakter
- Türkçe UTF-8 kullanın; ASCII kaçış yapmayın (örn. “ç, ğ, ı, ö, ş, ü” gerçek karakterlerle).
- Kopya tutarlılığı: “koç”, “görüşme”, “çalıştığını” vb. doğru yazım.

## Dosya Değiştirme Sınırları
- Core UI’ya ait dosyalara yalnızca Core UI agentı dokunur. İhtiyaç varsa önce sync alın.
- Sayfa ajanları shared/global dosyaları değiştirmez; kendi sayfa bileşenleriyle sınırlı kalır.
- Yeni stil/token eklemek gerekiyorsa Core UI agentına ticket/sync açın.

## İşleyiş / Merge Sırası
1) Core UI/Layout güncellemeleri (tokens, nav, header/footer)  
2) Sayfa ajanları (sadece kendi sayfaları) paralel çalışır  
3) Copy QA turu (karakter, link, meta)  
4) Build/QA: `npm run lint` + `npm run build`, nav/CTA smoke test  

## QA Kontrol Listesi (kısa)
- Linkler: Nav ve tüm CTA’lar tanımlı rotalara gidiyor mu? 404 yok.
- Copy: Türkçe karakterler doğru, ASCII yok.
- SEO: Title/description mevcut ve sayfaya uygun.
- UI: Sayfa bileşenleri `@/components/ui` primitiflerini kullanıyor; inline custom stil yok (zorunlu değilse).
- Build: `npm run lint` ve `npm run build` temiz.

## İletişim
- Paylaşılan dosyalara dokunmanız gerekiyorsa önce Core UI agentı veya Lead ile sync alın.
- Kurala uymayan değişiklikler geldiğinde, merge etmeden önce bu dokümana referans gösterin.





