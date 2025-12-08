# DopaLive Deployment Guide - dopa.live

## 🚀 Deployment Öncesi Kontrol Listesi

### ✅ Tamamlanan İşlemler
- [x] Duplicate import'lar temizlendi
- [x] Build hataları düzeltildi (küçük type hataları kaldı)
- [x] Firebase yapılandırması hazır
- [x] API route'ları oluşturuldu
- [x] Environment variables yapılandırıldı

### ⚠️ Düzeltilmesi Gerekenler
- [ ] TypeScript type hataları (motion variants)
- [ ] Build'in tamamen başarılı olması

## 📋 Deployment İçin Gerekli Bilgiler

### 1. Vercel Deployment (Önerilen)

#### Gerekli Adımlar:
1. **Vercel Hesabı Oluştur**
   - https://vercel.com adresinden hesap oluştur
   - GitHub/GitLab/Bitbucket ile bağla

2. **Projeyi Vercel'e Bağla**
   ```bash
   # Vercel CLI ile
   npm i -g vercel
   vercel login
   vercel
   ```

3. **Environment Variables Ekle**
   Vercel Dashboard > Project Settings > Environment Variables:
   
   **Firebase Client SDK:**
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

   **Firebase Admin SDK:**
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY` (base64 encoded veya multiline string)
   - `FIREBASE_STORAGE_BUCKET`

   **Email (Opsiyonel - Resend):**
   - `RESEND_API_KEY`

4. **Domain Bağlama (dopa.live)**
   - Vercel Dashboard > Project Settings > Domains
   - "Add Domain" butonuna tıkla
   - `dopa.live` ve `www.dopa.live` ekle
   - GoDaddy DNS ayarlarını yap (aşağıya bak)

### 2. GoDaddy DNS Ayarları

GoDaddy'de DNS kayıtlarını şu şekilde güncelle:

**A Record:**
- Type: A
- Name: @ (veya boş)
- Value: Vercel'in verdiği IP adresi (genellikle 76.76.21.21)

**CNAME Record:**
- Type: CNAME
- Name: www
- Value: cname.vercel-dns.com

**Veya Vercel'in verdiği nameserver'ları kullan:**
- GoDaddy > Domain Settings > Nameservers
- Vercel'in verdiği nameserver'ları ekle (örn: ns1.vercel-dns.com)

### 3. Firebase Yapılandırması

Firebase Console'da:
1. **Firestore Rules** - `firestore.rules` dosyasını deploy et
2. **Storage Rules** - `storage.rules` dosyasını deploy et
3. **Indexes** - `firestore.indexes.json` dosyasını deploy et

```bash
firebase deploy --only firestore:rules,firestore:indexes,storage:rules
```

### 4. Build Komutu

Vercel otomatik olarak algılar, ama manuel ayar için:
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

## 🔧 Alternatif Deployment Yöntemleri

### Netlify
- Benzer şekilde environment variables ekle
- Build command: `npm run build`
- Publish directory: `.next`

### Self-Hosted (VPS)
- Node.js 18+ kurulumu gerekli
- PM2 veya systemd ile process management
- Nginx reverse proxy
- SSL sertifikası (Let's Encrypt)

## 📝 Kontrol Edilmesi Gerekenler

1. **Environment Variables**
   - Tüm Firebase değişkenleri doğru mu?
   - Private key formatı doğru mu? (base64 veya multiline)

2. **API Routes**
   - `/api/quiz/submit` - Quiz sonuçları
   - `/api/forms/early-access` - Erken erişim formu
   - `/api/forms/experts` - Uzman başvuru formu
   - `/api/matches/request` - Eşleşme istekleri
   - `/api/contact` - İletişim formu

3. **Firebase Collections**
   - `quiz_profiles` - Quiz sonuçları
   - `early_access_signups` - Erken erişim başvuruları
   - `expert_applications` - Uzman başvuruları
   - `matches` - Eşleşme istekleri
   - `contact_messages` - İletişim mesajları

4. **Email Gönderimi**
   - Resend API key eklendi mi?
   - Test email gönderimi yapıldı mı?

## 🐛 Bilinen Sorunlar

1. **TypeScript Type Hataları**
   - Motion variants type hatası var (build'i engellemez ama düzeltilmeli)

2. **Build Warnings**
   - Baseline browser mapping uyarısı (önemli değil)

## 📞 İletişim

Deployment sırasında sorun yaşarsan:
- Vercel Support: https://vercel.com/support
- Firebase Support: https://firebase.google.com/support

