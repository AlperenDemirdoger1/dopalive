#!/bin/bash
# GitHub'a push için script

echo "GitHub repository URL'ini girin (örn: https://github.com/username/dopalive.git):"
read REPO_URL

if [ -z "$REPO_URL" ]; then
  echo "Hata: Repository URL gerekli!"
  exit 1
fi

# Remote ekle
git remote add origin $REPO_URL 2>/dev/null || git remote set-url origin $REPO_URL

# Push yap
git branch -M main
git push -u origin main

echo "✅ Push tamamlandı!"
