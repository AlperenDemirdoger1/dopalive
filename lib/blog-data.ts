// Blog Types and Sample Data

export interface Author {
  name: string;
  avatar: string;
  role: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  tags: string[];
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  coverImage: string;
  readingTime: number;
  featured?: boolean;
}

// DopaLive içerik merkezi odağı: ADHD & Body Doubling
export type BlogCategory = 'science' | 'experience' | 'insight' | 'focus-tools';

export const categoryLabels: Record<BlogCategory, string> = {
  science: 'Bilim',
  experience: 'Deneyim',
  insight: 'İçgörü',
  'focus-tools': 'Odak Araçları',
};

export const categoryColors: Record<BlogCategory, { bg: string; text: string; border: string }> = {
  science: { bg: 'bg-accent/10', text: 'text-accent', border: 'border-accent/30' },
  experience: { bg: 'bg-success/10', text: 'text-success', border: 'border-success/30' },
  insight: { bg: 'bg-secondary/15', text: 'text-secondary', border: 'border-secondary/30' },
  'focus-tools': { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/30' },
};

// Default authors
export const authors: Record<string, Author> = {
  'duru-kaya': {
    name: 'Duru Kaya',
    avatar: '/authors/duru.jpg',
    role: 'Nörobilim & ADHD',
  },
  'mert-aksu': {
    name: 'Mert Aksu',
    avatar: '/authors/mert.jpg',
    role: 'Body Doubling Kolaylaştırıcısı',
  },
  'selin-tan': {
    name: 'Selin Tan',
    avatar: '/authors/selin.jpg',
    role: 'Ürün & Odak Araçları',
  },
};

// Sample blog posts
export const blogPosts: BlogPost[] = [
  {
    slug: 'adhd-body-doubling-baslangic-kiti',
    title: 'ADHD & Body Doubling Başlangıç Kiti',
    subtitle: 'Bilim, uygulama ve ilk 30 dakikanız',
    excerpt: 'Body doubling nedir, neden işe yarar ve ilk 30 dakikada nasıl kendi oturumunuzu kurarsınız? Bilimsel zemin + basit adımlar.',
    content: `
# ADHD & Body Doubling Başlangıç Kiti

Body doubling (yanında birinin varlığıyla odakta kalma) ADHD için en düşük sürtünmeli odak araçlarından biri. Çalışma belleğini destekler, görev geçiş yükünü azaltır ve sosyal sorumluluk hissi yaratır.

## Neden çalışıyor?
- **Sosyal kolaylaştırma:** Beyin, "birlikte" modunda daha uzun odak tutuyor.
- **Dış yürütücü işlev:** Yanınızdaki kişi, yapılacak işi görünür kılıyor; öncelik kararı tek başınıza değil.
- **Dopamin dengesi:** Hafif sosyallik + küçük mikro hedefler, ödül devresini besliyor.

## 5 dakikada kurulum
1) **Hedefi küçült:** 25 dakikalık tek bir çıktı (örn. giriş paragrafı).  
2) **Ortak seç:** Aynı anda çevrim içi olabilecek bir kişi. Kamera opsiyonel, mikrofon sessiz.  
3) **Kuralları yaz:** Açılış (2 dk) — Hedef, blokaj, başarı tanımı.  
4) **Zamanlayıcıyı paylaş:** 25/5 veya 40/10; akışı bozmayacak kadar esnek.  
5) **Kapanış:** 2 dakikalık rapor. "Bir sonraki adımım şu."

## İlk oturum için hazır metin
- Açılış: "25 dakikada taslak giriş yazıyorum. Blokaj yok. Timer başlattım."
- Kapanış: "Giriş bitti, sonraki adım başlıkları maddeleyeceğim."

## Başlarken hatırlatmalar
- Mükemmellik bekleme; görünürlük > hız.
- Kamerayı açmak zorunda değilsin; varlık hissi yeterli.
- Tekrarlanan saat blokları alışkanlığı güçlendirir.
    `,
    category: 'science',
    tags: ['body doubling', 'ADHD', 'başlangıç', 'odak'],
    author: authors['duru-kaya'],
    publishedAt: '2025-01-05',
    coverImage: '/blog/body-doubling-starter.jpg',
    readingTime: 7,
    featured: true,
  },
  {
    slug: 'neden-body-doubling-beyinde-isliyor',
    title: 'Body Doubling Beyinde Nasıl İşliyor?',
    subtitle: 'PFC desteği, sosyal ödül ve dopamin dengesi',
    excerpt: 'Prefrontal korteks yükünü paylaşan, dopamin döngüsünü dengeleyen ve dikkat ağlarını sabitleyen üç mekanizma.',
    content: `
# Body Doubling Beyinde Nasıl İşliyor?

## 1) Prefrontal korteks (PFC) desteği
- Yürütücü işlevler (planlama, öncelik, başlatma) PFC'de yoğunlaşır.
- Yanındaki kişi, görevin sınırlarını netleştirir; bilişsel yük düşer.

## 2) Sosyal ödül devresi
- Hafif sosyal varlık, ventral striatumda ödül beklentisini artırır.
- "Biri görüyor" hissi, erteleme maliyetini büyütür, başlatma eşiği düşer.

## 3) Dikkat ağlarını sabitleme
- Dış ses/görüntü, varsayılan mod ağından (DMN) görev-pozitif ağa geçişi hızlandırır.
- Mikro check-in'ler, dikkat kaydını geri çağırma (attentional recall) kolaylaştırır.

### Mikro protokol (10 saniye)
- "Hedefim X, 25 dakika içindeyim, timer başladı."
- Bu kısa cümle, görev bağlamını sabitler ve PFC'ye başlangıç işareti verir.

### Kapanışta neden 2 dakika?
- PFC, tamamlanma sinyali alır; hafıza izleri güçlenir.
- Bir sonraki adımın söylenmesi, görev geçişini yumuşatır.
    `,
    category: 'science',
    tags: ['nörobilim', 'ödül devresi', 'PFC', 'ADHD', 'body doubling'],
    author: authors['duru-kaya'],
    publishedAt: '2025-01-04',
    coverImage: '/blog/brain-body-doubling.jpg',
    readingTime: 6,
  },
  {
    slug: 'deneyim-30-dakika-yaninda-oturan-birinin-gucu',
    title: 'Deneyim: 30 Dakika Yanında Oturan Birinin Gücü',
    subtitle: 'Gerçek oturum notları ve çıkan dersler',
    excerpt: 'İki kişilik 30 dakikalık seanslardan üç gözlem: daha erken başlama, daha kısa kaçışlar, daha net bitiş.',
    content: `
# Deneyim: 30 Dakika Yanında Oturan Birinin Gücü

Geçen hafta 6 oturum yaptık (toplam 3 saat). Notlar:

1) **Başlatma süresi kısaldı.** Katılımcılar tek başına 8-10 dakika oyalanırken, birlikteyken ilk 2 dakikada başlıyor.
2) **Kaçış süresi küçüldü.** Sekme kaçışları 90 saniye altına indi; "geri dön" demek yetti.
3) **Tamamlama hissi arttı.** Kapanış cümlesi, "bitirdim" dopaminini veriyor.

### En çok işe yarayan üç uygulama
- Kamera kapalı, mikrofon sessiz; yalnızca açılış ve kapanışta konuşma.
- Tek cümle hedef: "25 dakikada veri temizliğinin %50'si."
- Ortak timer linki (Cron/Sunsama/Notion butonu) ile görünür zaman.

### Karşılaşılan engeller
- **Geç gelme:** 3 dakikayı geçince oturum iptal; disiplin artıyor.
- **Görev belirsizliği:** Hedefi cümleye dökmek süreyi %15 kısaltıyor.
    `,
    category: 'experience',
    tags: ['deneyim', 'oturum', 'body doubling', 'alışkanlık'],
    author: authors['mert-aksu'],
    publishedAt: '2025-01-03',
    coverImage: '/blog/experience-body-doubling.jpg',
    readingTime: 5,
  },
  {
    slug: 'iceriden-icgoru-yaninizdaki-kisinin-rolu',
    title: 'İçgörü: Yanınızdaki Kişinin Rolü',
    subtitle: 'Uyarıcı mı, ayna mı, sakinleştirici mi?',
    excerpt: 'Body doubling partnerinin rolünü seçmek performansı değiştiriyor. Üç rol ve hangi görevde hangisi?',
    content: `
# İçgörü: Yanınızdaki Kişinin Rolü

## 1) Uyarıcı rol
- Enerjik, hızlı konuşan biri.
- **Ne zaman?** Başlangıç direnci yüksek, yapılacak iş kısa sprint gerektiriyorsa.

## 2) Ayna rolü
- Sessiz, sadece başlıkları tekrar eden, not tutan biri.
- **Ne zaman?** Derin yazı/yapılandırma, zihinsel model kurma gereken anlarda.

## 3) Sakinleştirici rol
- Nefes, tempo, beden farkındalığı hatırlatan biri.
- **Ne zaman?** Gerginlik, sınav/teslim kaygısı, hata yapma korkusu yüksekse.

### Nasıl seçilir?
- Görev tipini yaz: Üretim, planlama, derin okuma.
- İhtiyacı yaz: Enerji mi, netlik mi, sakinlik mi?
- Rolü önceden söyle: "Bugün ayna rolünde olur musun?"
    `,
    category: 'insight',
    tags: ['rol', 'içgörü', 'partner seçimi', 'body doubling'],
    author: authors['mert-aksu'],
    publishedAt: '2025-01-02',
    coverImage: '/blog/partner-roles.jpg',
    readingTime: 4,
  },
  {
    slug: 'odak-araclari-body-doubling-icin-teknik-setup',
    title: 'Odak Araçları: Body Doubling İçin Teknik Setup',
    subtitle: 'Zoom, kamera, timer ve şablon linkleri',
    excerpt: '10 dakikada kurulacak hafif bir teknik stack: Zoom/Meet ayarları, ortak timer linki, Notion şablonu.',
    content: `
# Odak Araçları: Teknik Setup

## 1) Video/meet
- Zoom/Meet: Kamera opsiyonel, mikrofon varsayılan sessiz.
- Arka plan gürültüsü için: Krisp veya sistem gürültü engelleme.

## 2) Ortak timer
- Link paylaş: crontimer, sunsama veya focusmate benzeri.
- Kural: Timer paylaşılamıyorsa seans başlamaz.

## 3) Notion şablonu (kopyala-kullan)
- Bölüm 1: Hedef (tek cümle)
- Bölüm 2: Blokaj (varsa)
- Bölüm 3: Çıktı (tek satır)
- Bölüm 4: Sonraki adım

## 4) Sinyaller
- Açılış emojisi: 🟢 başlattım
- Ortada kontrol: 👀 10 dk kaldı
- Kapanış: ✅ bitti / ⏭️ devredildi
    `,
    category: 'focus-tools',
    tags: ['araçlar', 'setup', 'timer', 'notion', 'zoom'],
    author: authors['selin-tan'],
    publishedAt: '2025-01-01',
    coverImage: '/blog/tools-body-doubling.jpg',
    readingTime: 5,
  },
  {
    slug: 'odak-kurtaran-3-mikro-rituel',
    title: 'Odak Kurtaran 3 Mikro Ritüel',
    subtitle: 'Ön-orta-son cümleleri ile',
    excerpt: 'Seansın başı, ortası ve sonu için üç kısa cümle: zihni sabitle, ilerlemeyi görünür kıl, kapanışı kutla.',
    content: `
# Odak Kurtaran 3 Mikro Ritüel

## Başlangıç (10 saniye)
- "Hedefim: 25 dakikada taslak giriş."
- Neden işe yarar? Görev bağlamı sabitlenir, PFC başlatma sinyali alır.

## Ortası (10 saniye)
- "Şu an 2/4 madde tamam, 10 dk kaldı."
- Neden? Dikkat kaydığı anlarda geri çağırma tetiklenir.

## Bitiş (20 saniye)
- "Giriş bitti, sonraki adım: örnek eklemek."
- Neden? Tamamlama dopamini, bir sonraki adıma köprü kurar.
    `,
    category: 'insight',
    tags: ['ritüel', 'mikro alışkanlık', 'odak', 'body doubling'],
    author: authors['mert-aksu'],
    publishedAt: '2024-12-30',
    coverImage: '/blog/micro-rituals.jpg',
    readingTime: 3,
  },
  {
    slug: 'remote-ekiplerde-body-doubling',
    title: 'Remote Ekiplerde Body Doubling',
    subtitle: 'Asenkron + senkron harmanı',
    excerpt: 'Slack/Discord kanalı, günlük 2 pencere, haftalık retro ile ekip ritüeli kurma rehberi.',
    content: `
# Remote Ekiplerde Body Doubling

## Kanal ve kurallar
- Tek kanal: #focus-room
- Giriş formatı: "🟢 40/10, görev: X"
- Çıkış formatı: "✅ çıktı: link / not"

## Günlük iki pencere
- Sabah 10:00-10:45 (ısıtma)
- Öğleden sonra 14:00-14:45 (derin çalışma)

## Haftalık retro (15 dk)
- Ne çalıştı? (2 dk)
- Nerede koptuk? (2 dk)
- Önümüzdeki hafta tek deney: (5 dk)
- Sorumlular ve slotlar: (6 dk)

## Ölçülebilir metrikler
- Katılım oranı
- Başlatma süresi (ilk 5 dk içinde başlama yüzdesi)
- Tamamlama bildirimi sayısı
    `,
    category: 'experience',
    tags: ['remote', 'ekip', 'ritüel', 'body doubling'],
    author: authors['selin-tan'],
    publishedAt: '2024-12-28',
    coverImage: '/blog/remote-body-doubling.jpg',
    readingTime: 6,
  },
];

// Helper functions
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

export function getFeaturedPost(): BlogPost | undefined {
  return blogPosts.find(post => post.featured);
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];
  
  return blogPosts
    .filter(post => post.slug !== currentSlug)
    .filter(post => 
      post.category === currentPost.category || 
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .slice(0, limit);
}

export function getPopularPosts(limit: number = 5): BlogPost[] {
  // In a real app, this would be based on actual analytics
  return blogPosts.slice(0, limit);
}

export function searchPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

export function getAllCategories(): BlogCategory[] {
  return ['science', 'experience', 'insight', 'focus-tools'];
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  blogPosts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort();
}

// Pagination helper
export function paginatePosts(posts: BlogPost[], page: number, perPage: number = 6) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return {
    posts: posts.slice(start, end),
    totalPages: Math.ceil(posts.length / perPage),
    currentPage: page,
    hasMore: end < posts.length,
  };
}
