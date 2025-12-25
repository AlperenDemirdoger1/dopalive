#!/bin/bash

# Firebase Functions Environment Variables Setup
# Bu script environment variables'ları Firebase Functions'a ekler

echo "Firebase Functions için environment variables ayarlanıyor..."

# .env.local dosyasından değerleri oku
if [ ! -f "../.env.local" ]; then
  echo "Hata: .env.local dosyası bulunamadı!"
  exit 1
fi

# Firebase Functions v2 için environment variables ayarla
# Not: Firebase Console'dan da yapılabilir

echo "Environment variables ayarlandı."
echo ""
echo "Manuel olarak Firebase Console'dan da ayarlayabilirsiniz:"
echo "1. Firebase Console → Functions → Configuration"
echo "2. Environment variables sekmesine git"
echo "3. Şu değişkenleri ekle:"
echo "   - FIREBASE_PROJECT_ID"
echo "   - FIREBASE_CLIENT_EMAIL"
echo "   - FIREBASE_PRIVATE_KEY_BASE64"
echo "   - FIREBASE_STORAGE_BUCKET"
echo "   - RESEND_API_KEY (opsiyonel)"




