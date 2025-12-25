#!/bin/bash

# Hızlı Environment Variables Görüntüleme
# Firebase Console'a kopyalayıp yapıştırmak için

ENV_FILE="../.env.local"
[ ! -f "$ENV_FILE" ] && echo "❌ .env.local bulunamadı!" && exit 1

echo "🔥 Firebase Functions Environment Variables"
echo ""
echo "🌐 Firebase Console: https://console.firebase.google.com/project/dopalive-backend/functions/config"
echo ""
echo "📋 Aşağıdaki değerleri 'Environment variables' sekmesine ekleyin:"
echo ""

grep -E "^(FIREBASE_|RESEND_)" "$ENV_FILE" | while IFS='=' read -r key value; do
  # Remove quotes
  value=$(echo "$value" | tr -d '"' | tr -d "'")
  echo "$key=$value"
done

echo ""
echo "✅ Her değişkeni 'Add variable' butonuna tıklayıp ekleyin"




