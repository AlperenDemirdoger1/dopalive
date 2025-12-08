# Vercel Environment Variables - Hızlı Kopyala Yapıştır

Vercel Dashboard > Project Settings > Environment Variables bölümüne git ve şunları ekle:

## 🔥 Firebase Client SDK (NEXT_PUBLIC_*)

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCYf08oqDm29djDPDuME8W_gP4zyM5QGsQ
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=dopalive-backend.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=dopalive-backend
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=dopalive-backend.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=517548329946
NEXT_PUBLIC_FIREBASE_APP_ID=1:517548329946:web:883a684da3821ecfa40ee3
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-3735BSRXQ7
```

## 🔐 Firebase Admin SDK

```
FIREBASE_PROJECT_ID=dopalive-backend
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@dopalive-backend.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCpjAb/Y3DO1WCCeC1MChRRUsefw9OYrz9tcSRmU2S6byK2SDjl9UC8nwUWA3xC0opn86uNoMwyywMafK6YHuWckGUQtjfgdB00Kypxi1km3CB+EAkfjuizGoSpF+lnNuNUpe7PgJcOjhpbUFOAkWi38UFe5vU0FTQV3maoN4vd+5O0TpkzhTpWvdr/CgzUVBRDMUICPGlm0UZpMiX9umRsyvHe/Br+e/X3Blh9fxnSOhfuSm9lJJXn90fPQ6/rxblokhS2LV3es0SzLfSAIDR25QHZ36GHpVZVMFV2i1fKfA67yWMURASsXSnm/7pIpYexWo28cSDL0KKXMhJKi/DAgMBAAECggEAAXBzMsHOWFh5XEIsPZlW+NBsv2TIgWL4yoi2WA6x1on7pR58f9SS0HHCd6BfSACaNNhdsXMW/gC5LbAMmgqmb6t4ytPb1Oecw9pF9Ewhh/HrGLGG0kzCmZqfsQEcoHKtKq/J6jBbl+pe5judMqNUTKtSSddLHbBdt/MLe444CfZwIUfZElbz7mrn4OKKmLme+YYmwvu5s2t+pZdjpxidZSDxfQgMdNPXjR0OgZ0bJ+bUkHWD6kEDHYsIFFuPtRs+yU7TzEmCy/fw/BeM7Lil5mlKqFh4XVmUuM3Ob3oc/UGvdz007NlRoZOd9MO4p2oO28PLvbjzfwL0TNgCINsJCQKBgQDWCPyg1ACff/SplPP0mQXNvAPIlvhkrj8isv//jchjjde3eh9DtdfknYR1CA+tITCz94gCfXSAPVtDWBaNgxwHxnUYWOK6H2HUm88f5W5k+p2srSKAGHnFKVuW/Wsyq338R/UfEGzMsJ0KHRYrqQNdNu/owAYBeg+L0zt2fu0k9wKBgQDKyg8H6qzQ9zPbgsihw5veZKkkacjpZAIuXIDvKafulqUGfW5lcb0/tMVVgmsYDTHpk0GzPni1+CYY6JmqzbLb8X35AwWWp/p36aE/cvq9BXnYfOAzH0n54myN6ltwLZv5qLxJ8qcl+zKKk5FKNw0mlLRyzsyGKKrYF8Y4soq0lQKBgQCNh5PFpWpkDfBy0pQegbFcwZ6e3XWS3cXR5BtzmQWRDxI9uPtDgtMn0SDtYk87ZF8YIe5F9z86LVhTx8Ph/3hhi9GSL/R8rpO6Su1DYisFitMIg9P0cDrVLOvrg9eGwe+lCtADopDPKVoufd1TMYeP8+vgNFnEUDpHc342dOfLMQKBgCV7HTYYYOKqnhIXZR/I+LktH7oUN0cz7mMAd/A8YcaOX2gIrOvhDtqEfeilF0g1wCDsz7ridAsmF1yJOUXBiSpvwxnQPisvVvLs4pnIlaF0LqYdxo6MXO7rs6azRz0/oNGPJ2X/jHdPq3LDfZoa/LpBx+xkXpb5U0JneoKmNU7VAoGAG/sMl1mxh8XD2DeVksrTrsTv3rhgX6EEUQX798SS9uc5uhLS+sR7mP29Vqe++3upQGerOwGX0S47m5scelE0oScznwInWQ1cAZ0uYruq0d3P13/NvOKULeGw6xhNCvhwgEk8RZBW5jtUf56sg6xlQgsCYDfR35V9uyeJRw7Nj+k=\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=dopalive-backend.appspot.com
```

## 📧 Email Service (Opsiyonel - Resend)

```
RESEND_API_KEY=your_resend_api_key_here
```

## ⚠️ ÖNEMLİ NOTLAR

1. **FIREBASE_PRIVATE_KEY** için:
   - Tırnak içinde yaz
   - `\n` karakterlerini koru (multiline string)
   - Veya base64 encoded kullan (daha güvenli)

2. **Environment Variables ekledikten sonra:**
   - "Redeploy" yap veya yeni bir deployment tetikle
   - Vercel Dashboard > Deployments > "Redeploy"

3. **Domain ekleme:**
   - Vercel Dashboard > Project Settings > Domains
   - `dopa.live` ekle
   - `www.dopa.live` otomatik eklenir

## 🔗 Vercel Dashboard

Proje URL: https://vercel.com/alperen-demirdogers-projects/dopalive-adhd

