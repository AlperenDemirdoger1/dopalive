# Firebase Functions - API Routes

Bu klasör Firebase Functions ile API routes'ları içerir.

## Kurulum

```bash
cd functions
npm install
npm run build
```

## Environment Variables

Functions için environment variables'ları Firebase Console'dan veya CLI ile ayarlayın:

```bash
firebase functions:config:set \
  firebase.project_id="dopalive-backend" \
  firebase.client_email="firebase-adminsdk-fbsvc@dopalive-backend.iam.gserviceaccount.com" \
  firebase.private_key_base64="<base64-encoded-private-key>" \
  firebase.storage_bucket="dopalive-backend.appspot.com" \
  resend.api_key="<resend-api-key>"
```

Veya Firebase Console'dan:
1. Firebase Console → Functions → Configuration
2. Environment variables sekmesine git
3. Gerekli değişkenleri ekle

**Not:** Functions içinde environment variables'a `functions.config().firebase.project_id` şeklinde erişilir, ancak biz direkt `process.env` kullanıyoruz. Firebase Functions v2'de environment variables otomatik olarak `process.env`'e yüklenir.

## Deploy

```bash
# Sadece functions
firebase deploy --only functions

# Hem hosting hem functions
firebase deploy
```

## API Endpoints

- `POST /api/contact` - İletişim formu
- `POST /api/forms/early-access` - Erken erişim formu
- `POST /api/forms/experts` - Uzman başvuru formu
- `POST /api/quiz/submit` - Quiz sonuçları
- `POST /api/matches/request` - Eşleşme isteği

## Test

Local test için emulator kullanın:

```bash
firebase emulators:start --only functions
```




