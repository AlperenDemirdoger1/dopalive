# Google Forms + Google Sheets Setup Guide

## Adım 1: Google Forms Oluşturma

1. Tarayıcınızda **[forms.new](https://forms.new)** adresine gidin
2. Form başlığını "DopaLive Waitlist" yapın
3. Tek bir soru ekleyin:
   - Soru: "E-posta Adresiniz"
   - Tip: Kısa cevap
   - Zorunlu: Evet
4. Sağ üstteki **⚙️ (Ayarlar)** ikonuna tıklayın
5. **"Yanıtlar"** sekmesine gidin
6. **"Yanıtları Google Sheets'e gönder"** seçeneğini açın
7. Yeni bir Google Sheets oluşturun veya mevcut birini seçin

## Adım 2: Form Response URL'sini Bulma

Form gönderim URL'si şu formatta olmalı:
```
https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse
```

**Nasıl bulunur:**
1. Formunuzu bir tarayıcıda açın
2. Tarayıcı konsolunu açın (F12 veya Cmd+Option+I)
3. Network sekmesine gidin
4. Formu test olarak gönderin
5. Network sekmesinde `formResponse` isimli bir istek göreceksiniz
6. O isteğin URL'sini kopyalayın

## Adım 3: Entry ID'sini Bulma

Google Forms'da her soru bir "entry" ID'sine sahiptir. İlk sorunuz genellikle `entry.0` olur, ama kontrol etmek için:

1. Formunuzu açın
2. Kaynak kodunu görüntüleyin (Sağ tık > "Sayfa kaynağını görüntüle")
3. `entry.` kelimesini arayın
4. İlk sorunuz için entry ID'sini bulun (örneğin: `entry.123456789`)

## Adım 4: Hero.tsx'i Güncelleme

`Hero.tsx` dosyasında şu satırları bulun ve güncelleyin:

```typescript
const GOOGLE_FORM_URL = 'HENÜZ_URL_YOK' // <--- Form response URL'nizi buraya yapıştırın
```

VE

```typescript
formData.append('entry.0', email) // entry.0 yerine bulduğunuz gerçek entry ID'sini kullanın
```

## Test Etme

1. Formu test olarak gönderin
2. Google Sheets'inizi açın
3. E-posta adresinizin eklendiğini kontrol edin

## Sorun Giderme

**CORS hatası alıyorsanız:**
- `mode: 'no-cors'` zaten ekli, bu normal
- Form gönderimi çalışıyor ama response göremiyorsunuz (bu normal)

**E-posta Google Sheets'e gitmiyorsa:**
- Entry ID'sinin doğru olduğundan emin olun
- Form URL'sinin `formResponse` ile bittiğinden emin olun
- Formun "Yanıtları Google Sheets'e gönder" ayarının açık olduğundan emin olun

