# DopaLive Authentication System

## Genel Bakış

DopaLive için minimum sürtünmeli ama sağlam bir signup & authentication sistemi.

### Özellikler

- 🔐 **Çoklu Auth Yöntemi**: Google OAuth, Apple OAuth, Telefon OTP, E-posta Magic Link
- 🔗 **Account Linking**: Aynı email/phone ile farklı yöntemlerden giriş yapan kullanıcılar otomatik birleştirilir
- 🛡️ **Güvenlik**: Rate limiting, brute force koruması, yeni cihaz algısı
- 📊 **Analytics**: Tüm auth akışı için funnel ölçümü
- 🧠 **DEHB Dostu UX**: Şifresiz giriş, state restore, kısa/destekleyici hata mesajları

---

## Akış Diyagramı

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTH MODAL AÇILDI                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  YÖNTEM SEÇİMİ                              │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│  │ Google  │ │  Apple  │ │ Telefon │ │ E-posta │           │
│  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘           │
└───────┼───────────┼───────────┼───────────┼─────────────────┘
        │           │           │           │
        ▼           ▼           ▼           ▼
   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
   │  OAuth  │ │  OAuth  │ │OTP Gönder│ │Link Gön.│
   │  Popup  │ │  Popup  │ └────┬────┘ └────┬────┘
   └────┬────┘ └────┬────┘      │           │
        │           │           ▼           ▼
        │           │      ┌─────────┐ ┌─────────┐
        │           │      │OTP Doğr.│ │Link Tık.│
        │           │      └────┬────┘ └────┬────┘
        │           │           │           │
        └─────────┬─┴───────────┴───────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│              FIREBASE AUTH DOĞRULAMA                        │
└─────────────────────────────────────────────────────────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
        ▼                   ▼
   ┌─────────┐         ┌─────────┐
   │Yeni User│         │Mevcut   │
   │ Create  │         │  User   │
   └────┬────┘         └────┬────┘
        │                   │
        ▼                   │
┌─────────────┐             │
│ ONBOARDING  │             │
│ (tek ekran) │             │
└──────┬──────┘             │
       │                    │
       └────────┬───────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────────┐
│                    GİRİŞ TAMAMLANDI                         │
└─────────────────────────────────────────────────────────────┘
```

---

## Dosya Yapısı

```
lib/auth/
├── types.ts          # TypeScript tip tanımları
├── utils.ts          # Yardımcı fonksiyonlar (normalize, rate-limit, etc.)
├── firebase-auth.ts  # Firebase Auth işlemleri
├── context.tsx       # React Context ve hooks
├── analytics.ts      # Event tracking
├── guards.ts         # Güvenlik guard'ları
└── index.ts          # Barrel export

components/auth/
├── AuthModal.tsx        # Ana auth modal
├── AuthMethodSelector.tsx  # Yöntem seçim ekranı
├── PhoneAuth.tsx        # Telefon OTP akışı
├── EmailAuth.tsx        # Magic link akışı
├── OnboardingModal.tsx  # Tek ekran onboarding
├── AuthButton.tsx       # Header için auth butonu
└── index.ts

app/api/auth/
├── session/route.ts     # Session CRUD
├── user/route.ts        # User profile updates
└── rate-limit/route.ts  # Rate limiting

app/auth/
└── email-callback/page.tsx  # Magic link callback
```

---

## Veri Modelleri

### User

```typescript
interface User {
  uid: string;                    // Firebase UID
  email: string | null;           // Normalize edilmiş
  emailVerified: boolean;
  phone: string | null;           // E.164 format
  phoneVerified: boolean;
  displayName: string | null;
  photoURL: string | null;
  providers: AuthProviderLink[];  // Bağlı auth yöntemleri
  signupMethod: AuthMethod;       // İlk kayıt yöntemi
  onboardingCompleted: boolean;
  goals: UserGoal[];
  notificationPreferences: NotificationPreferences;
  status: 'active' | 'suspended' | 'deleted';
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date;
  lastDevice: DeviceInfo | null;
}
```

### Session

```typescript
interface Session {
  id: string;
  userId: string;
  device: DeviceInfo;
  accessTokenHash: string;      // Hash olarak saklanır
  refreshTokenHash: string;
  accessTokenExpiresAt: Date;
  refreshTokenExpiresAt: Date;
  status: 'active' | 'expired' | 'revoked';
  createdAt: Date;
  lastActivityAt: Date;
  revokedAt: Date | null;
}
```

---

## Güvenlik Önlemleri

### Rate Limiting

| Tip | Max Deneme | Pencere | Blok Süresi |
|-----|------------|---------|-------------|
| OTP Gönderimi | 5 | 1 saat | 1 saat |
| OTP Doğrulama | 5 | 5 dakika | 15 dakika |
| Magic Link | 5 | 1 saat | 1 saat |
| Login Denemesi | 10 | 15 dakika | 30 dakika |

### Brute Force Koruması

- Client-side: In-memory tracking
- Server-side: Firestore ile distributed rate limiting
- Identifier: Phone/Email + IP kombinasyonu

### Yeni Cihaz Algısı

```typescript
// Device fingerprint bileşenleri
- User Agent
- Screen resolution
- Timezone
- Language
```

### Token Güvenliği

- Access token: 1 saat ömür, sessiz refresh
- Refresh token: 7 gün ömür
- Logout: Tüm tokenlar revoke edilir
- Tokenlar sessionStorage'da (tab kapatılınca silinir)

---

## Kullanım

### AuthProvider Kurulumu

```tsx
// app/layout.tsx veya providers.tsx
import { AuthProvider } from '@/lib/auth';

export function Providers({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
```

### Auth Hooks

```tsx
import { useAuth, useUser, useIsAuthenticated, useNeedsOnboarding } from '@/lib/auth';

function MyComponent() {
  const { user, loading, error, signInWithGoogle, logout } = useAuth();
  const isAuthenticated = useIsAuthenticated();
  const needsOnboarding = useNeedsOnboarding();
  
  // ...
}
```

### Auth Modal

```tsx
import { AuthModal } from '@/components/auth';

function LoginButton() {
  const [showAuth, setShowAuth] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowAuth(true)}>Giriş Yap</button>
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onSuccess={() => setShowAuth(false)}
      />
    </>
  );
}
```

---

## Analytics Events

| Event | Açıklama |
|-------|----------|
| `auth_method_selected` | Kullanıcı yöntem seçti |
| `auth_started` | Auth akışı başladı |
| `auth_otp_sent` | OTP gönderildi |
| `auth_otp_verified` | OTP doğrulandı (success/fail) |
| `auth_magic_link_sent` | Magic link gönderildi |
| `auth_magic_link_verified` | Magic link doğrulandı |
| `auth_oauth_started` | OAuth başladı |
| `auth_oauth_completed` | OAuth tamamlandı |
| `auth_user_created` | Yeni kullanıcı oluşturuldu |
| `auth_user_login` | Mevcut kullanıcı giriş yaptı |
| `auth_account_linked` | Hesap birleştirildi |
| `auth_error` | Auth hatası |
| `onboarding_started` | Onboarding başladı |
| `onboarding_goals_selected` | Hedefler seçildi |
| `onboarding_notifications_decided` | Bildirim tercihi |
| `onboarding_completed` | Onboarding tamamlandı |
| `auth_logout` | Çıkış yapıldı |

---

## Firestore Koleksiyonları

### users

```javascript
/users/{userId}
{
  uid: string,
  email: string | null,
  phone: string | null,
  displayName: string | null,
  providers: [{...}],
  // ... diğer alanlar
}
```

### sessions

```javascript
/sessions/{sessionId}
{
  userId: string,
  device: {...},
  status: 'active' | 'expired' | 'revoked',
  // ... diğer alanlar
}
```

### rate_limits

```javascript
/rate_limits/{type:identifier}
{
  type: string,
  identifier: string,
  attempts: number,
  blocked: boolean,
  blockedUntil: timestamp | null,
  // ...
}
```

---

## Hata Mesajları (DEHB Dostu)

| Kod | Mesaj |
|-----|-------|
| `auth/invalid-email` | E-posta adresi geçersiz görünüyor. |
| `auth/user-not-found` | Henüz bir hesabın yok, hemen oluşturalım! |
| `auth/invalid-verification-code` | Kod eşleşmedi, tekrar deneyelim. |
| `auth/code-expired` | Kod süresi doldu, yeni kod gönderelim. |
| `auth/too-many-requests` | Çok fazla deneme! Biraz bekle ve tekrar dene. |
| `auth/network-request-failed` | İnternet bağlantısını kontrol eder misin? |
| `auth/popup-closed-by-user` | Giriş penceresi kapandı, tekrar deneyelim. |

---

## Geliştirme Notları

### Firebase Console Ayarları

1. Authentication > Sign-in providers:
   - Google: Etkinleştir
   - Apple: Etkinleştir (Apple Developer hesabı gerekli)
   - Phone: Etkinleştir
   - Email/Password: Devre dışı
   - Email link: Etkinleştir

2. Authentication > Settings:
   - Authorized domains: Uygulamanın domain'ini ekle

### Environment Variables

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Server-side
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

### Test Hesapları

Firebase Console > Authentication > Users > Test Phone Numbers eklenebilir.

---

## Gelecek İyileştirmeler

- [ ] Biometric authentication (mobile)
- [ ] Session management UI (aktif oturumları görme/sonlandırma)
- [ ] Account deletion flow
- [ ] Email change verification
- [ ] Phone change verification
- [ ] 2FA desteği (optional)

