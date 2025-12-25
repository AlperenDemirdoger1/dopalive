# Firebase Hosting Deployment Guide

## Önkoşullar

1. Firebase CLI kurulu olmalı:
```bash
npm install -g firebase-tools
```

2. Firebase'e giriş yap:
```bash
firebase login
```

3. Firebase projesini başlat (eğer daha önce yapmadıysan):
```bash
firebase init hosting
```

## Deployment Adımları

### 1. Build Oluştur

```bash
npm run build
```

Bu komut `out/` klasöründe static dosyaları oluşturur.

### 2. Firebase'e Deploy Et

```bash
firebase deploy --only hosting
```

## Önemli Notlar

- **Static Export**: Next.js `output: 'export'` modunda çalışıyor, bu yüzden API routes çalışmayacak.
- **API Routes**: Eğer API routes kullanıyorsan, bunları Firebase Functions'a taşıman gerekecek.
- **Environment Variables**: Firebase Hosting'de environment variables kullanmak için Firebase Functions gerekir.

## Alternatif: Firebase Functions ile API Routes

Eğer API routes'ları kullanmak istiyorsan:

1. Firebase Functions kur:
```bash
firebase init functions
```

2. API routes'ları Functions'a taşı
3. `firebase.json`'da rewrites ekle

## Domain Ayarları

1. Firebase Console > Hosting > Add custom domain
2. `dopa.live` domain'ini ekle
3. DNS kayıtlarını GoDaddy'de güncelle

## Sorun Giderme

- Build hatası alıyorsan: `npm run build` çıktısını kontrol et
- Deploy hatası alıyorsan: `firebase deploy --only hosting --debug` ile debug yap




