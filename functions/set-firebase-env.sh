#!/bin/bash

# Firebase Functions Environment Variables Setup Script
# .env.local dosyasından değerleri okuyup Firebase Functions'a ayarlar

set -e

echo "🔥 Firebase Functions Environment Variables Ayarlanıyor..."
echo ""

# .env.local dosyasını kontrol et
ENV_FILE="../.env.local"
if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Hata: .env.local dosyası bulunamadı!"
  echo "   Lütfen proje kök dizininde .env.local dosyasının olduğundan emin olun."
  exit 1
fi

echo "✅ .env.local dosyası bulundu"
echo ""

# Değerleri oku
FIREBASE_PROJECT_ID=$(grep "^FIREBASE_PROJECT_ID=" "$ENV_FILE" | cut -d '=' -f2- | tr -d '"' | tr -d "'")
FIREBASE_CLIENT_EMAIL=$(grep "^FIREBASE_CLIENT_EMAIL=" "$ENV_FILE" | cut -d '=' -f2- | tr -d '"' | tr -d "'")
FIREBASE_PRIVATE_KEY_BASE64=$(grep "^FIREBASE_PRIVATE_KEY_BASE64=" "$ENV_FILE" | cut -d '=' -f2- | tr -d '"' | tr -d "'")
FIREBASE_STORAGE_BUCKET=$(grep "^FIREBASE_STORAGE_BUCKET=" "$ENV_FILE" | cut -d '=' -f2- | tr -d '"' | tr -d "'")
RESEND_API_KEY=$(grep "^RESEND_API_KEY=" "$ENV_FILE" | cut -d '=' -f2- | tr -d '"' | tr -d "'" || echo "")

# Değerlerin boş olup olmadığını kontrol et
if [ -z "$FIREBASE_PROJECT_ID" ]; then
  echo "⚠️  Uyarı: FIREBASE_PROJECT_ID bulunamadı"
fi
if [ -z "$FIREBASE_CLIENT_EMAIL" ]; then
  echo "⚠️  Uyarı: FIREBASE_CLIENT_EMAIL bulunamadı"
fi
if [ -z "$FIREBASE_PRIVATE_KEY_BASE64" ]; then
  echo "⚠️  Uyarı: FIREBASE_PRIVATE_KEY_BASE64 bulunamadı"
fi
if [ -z "$FIREBASE_STORAGE_BUCKET" ]; then
  echo "⚠️  Uyarı: FIREBASE_STORAGE_BUCKET bulunamadı"
fi

echo ""
echo "📋 Bulunan Environment Variables:"
echo "   FIREBASE_PROJECT_ID: ${FIREBASE_PROJECT_ID:0:20}..."
echo "   FIREBASE_CLIENT_EMAIL: ${FIREBASE_CLIENT_EMAIL:0:30}..."
echo "   FIREBASE_PRIVATE_KEY_BASE64: ${FIREBASE_PRIVATE_KEY_BASE64:0:20}..."
echo "   FIREBASE_STORAGE_BUCKET: $FIREBASE_STORAGE_BUCKET"
if [ -n "$RESEND_API_KEY" ]; then
  echo "   RESEND_API_KEY: ${RESEND_API_KEY:0:20}..."
else
  echo "   RESEND_API_KEY: (bulunamadı - opsiyonel)"
fi

echo ""
echo "🌐 Firebase Console'dan ayarlamak için:"
echo "   1. https://console.firebase.google.com/project/dopalive-backend/functions/config adresine git"
echo "   2. 'Environment variables' sekmesine tıkla"
echo "   3. Aşağıdaki değerleri ekle:"
echo ""
echo "   FIREBASE_PROJECT_ID = $FIREBASE_PROJECT_ID"
echo "   FIREBASE_CLIENT_EMAIL = $FIREBASE_CLIENT_EMAIL"
echo "   FIREBASE_PRIVATE_KEY_BASE64 = $FIREBASE_PRIVATE_KEY_BASE64"
echo "   FIREBASE_STORAGE_BUCKET = $FIREBASE_STORAGE_BUCKET"
if [ -n "$RESEND_API_KEY" ]; then
  echo "   RESEND_API_KEY = $RESEND_API_KEY"
fi

echo ""
echo "💡 Alternatif: Firebase CLI ile ayarlamak için:"
echo "   firebase functions:config:set firebase.project_id=\"$FIREBASE_PROJECT_ID\""
echo "   firebase functions:config:set firebase.client_email=\"$FIREBASE_CLIENT_EMAIL\""
echo "   firebase functions:config:set firebase.private_key_base64=\"$FIREBASE_PRIVATE_KEY_BASE64\""
echo "   firebase functions:config:set firebase.storage_bucket=\"$FIREBASE_STORAGE_BUCKET\""
if [ -n "$RESEND_API_KEY" ]; then
  echo "   firebase functions:config:set resend.api_key=\"$RESEND_API_KEY\""
fi

echo ""
echo "✅ Script tamamlandı!"
echo ""
echo "📝 Not: Firebase Functions v2 için environment variables'ları Firebase Console'dan ayarlamanız gerekiyor."
echo "   CLI ile ayarlama için yukarıdaki komutları kullanabilirsiniz."




