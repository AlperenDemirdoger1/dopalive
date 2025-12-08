# 🚀 Hızlı Deployment - dopa.live

## Adım 1: GitHub Repository Oluştur

1. https://github.com/new adresine git
2. Repository adı: `dopalive`
3. **Private** seç (güvenlik için)
4. "Create repository" butonuna tıkla
5. **ÖNEMLİ:** "Initialize with README" seçme!

## Adım 2: GitHub'a Push Et

Terminal'de şu komutları çalıştır:

```bash
cd /Users/alperendemirdoger/XX

# GitHub repo URL'ini ekle (YOUR_USERNAME'i değiştir)
git remote add origin https://github.com/YOUR_USERNAME/dopalive.git

# Push yap
git branch -M main
git push -u origin main
```

**Veya script'i kullan:**
```bash
./push_to_github.sh
```

## Adım 3: Vercel Deployment

1. **Vercel'e Git**: https://vercel.com/new
2. **GitHub ile Giriş Yap** (eğer yapmadıysan)
3. **"Import Git Repository"** > `dopalive` repo'sunu seç
4. **Framework Preset**: Next.js (otomatik)
5. **"Deploy"** butonuna tıkla

## Adım 4: Environment Variables Ekle

Deployment sonrası Vercel Dashboard > Project Settings > Environment Variables:

### Tüm Environment Variables'ları Ekle:

**Firebase Client:**
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

**Firebase Admin:**
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY` (multiline string, tırnak içinde)
- `FIREBASE_STORAGE_BUCKET`

**Email (Opsiyonel):**
- `RESEND_API_KEY`

**ÖNEMLİ:** Environment variables ekledikten sonra **"Redeploy"** yap!

## Adım 5: Domain Bağlama (dopa.live)

1. Vercel Dashboard > Project Settings > Domains
2. "Add" butonuna tıkla
3. `dopa.live` yaz ve "Add" tıkla
4. Vercel'in verdiği DNS kayıtlarını not al

## Adım 6: GoDaddy DNS Ayarları

### En Kolay Yöntem: Nameserver Değiştirme

1. GoDaddy > My Products > dopa.live > DNS
2. "Change" butonuna tıkla (Nameservers)
3. "Custom" seç
4. Vercel'in verdiği nameserver'ları ekle (genellikle):
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
   - (Vercel dashboard'da tam listeyi göreceksin)

5. "Save" tıkla

**DNS değişiklikleri 24-48 saat içinde aktif olur.**

## ✅ Kontrol

1. Deployment başarılı mı? → Vercel Dashboard
2. Site çalışıyor mu? → Vercel'in verdiği URL'yi test et
3. Domain çalışıyor mu? → `dopa.live` adresini test et (DNS propagation sonrası)

## 🆘 Sorun Giderme

**Build hatası:**
- Environment variables'ları kontrol et
- Vercel logs'u kontrol et (Deployments > Logs)

**Domain çalışmıyor:**
- DNS propagation bekleniyor olabilir (24-48 saat)
- `dig dopa.live` ile DNS kayıtlarını kontrol et

**API route'lar çalışmıyorsa:**
- Firebase Admin SDK variables'larını kontrol et
- Vercel function logs'u kontrol et

