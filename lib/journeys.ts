/**
 * DopaLive - Journey & Personalization Data
 * 
 * Contains archetype-specific journey recommendations and daily tips.
 * @module lib/journeys
 */

import { DopamineProfileType } from './quiz';

// ============================================
// JOURNEY TYPES
// ============================================

export interface Journey {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  /** Duration in days */
  duration: number;
  /** Difficulty level */
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  /** Category/theme */
  category: JourneyCategory;
  /** Icon name from lucide-react */
  icon: string;
  /** Gradient colors for card */
  gradient: string;
  /** Tags for filtering */
  tags: string[];
  /** Number of lessons */
  lessonCount: number;
  /** Estimated minutes per day */
  minutesPerDay: number;
}

export type JourneyCategory = 
  | 'focus'           // Odaklanma
  | 'productivity'    // Üretkenlik
  | 'emotions'        // Duygusal düzenleme
  | 'time'            // Zaman yönetimi
  | 'habits'          // Alışkanlıklar
  | 'work'            // İş/Kariyer
  | 'relationships'   // İlişkiler
  | 'self-care';      // Öz bakım

export interface DailyTip {
  id: string;
  text: string;
  /** Highlighted part of the text */
  highlight?: string;
  /** Category of the tip */
  category: 'strategy' | 'mindset' | 'tool' | 'reminder';
  /** Source/credit if any */
  source?: string;
}

// ============================================
// JOURNEY CATALOG
// ============================================

export const ALL_JOURNEYS: Journey[] = [
  // Focus Journeys
  {
    id: 'focus-fundamentals',
    title: 'Odaklanma Temelleri',
    subtitle: 'DEHB beyni için temel stratejiler',
    description: 'DEHB beyninin odaklanma mekanizmalarını anla ve günlük hayatta kullanabileceğin pratik stratejiler öğren.',
    duration: 7,
    difficulty: 'beginner',
    category: 'focus',
    icon: 'Target',
    gradient: 'from-blue-500 to-cyan-400',
    tags: ['odak', 'temel', 'başlangıç'],
    lessonCount: 7,
    minutesPerDay: 10,
  },
  {
    id: 'deep-work-mastery',
    title: 'Derin Çalışma Ustası',
    subtitle: 'Hiperfokusu kontrollü kullan',
    description: 'Hiperfokus süper gücünü kontrol altına al. Derin çalışma seansları için ortam ve zihin hazırlığı.',
    duration: 14,
    difficulty: 'intermediate',
    category: 'focus',
    icon: 'Brain',
    gradient: 'from-purple-500 to-indigo-500',
    tags: ['hiperfokus', 'derin çalışma', 'flow'],
    lessonCount: 14,
    minutesPerDay: 15,
  },
  {
    id: 'distraction-defense',
    title: 'Dikkat Dağıtıcı Savunması',
    subtitle: 'Çevresel ve içsel dikkat dağıtıcıları yönet',
    description: 'Telefon, bildirimler ve içsel düşünceler gibi dikkat dağıtıcılarla başa çıkma stratejileri.',
    duration: 7,
    difficulty: 'beginner',
    category: 'focus',
    icon: 'Shield',
    gradient: 'from-emerald-500 to-teal-500',
    tags: ['dikkat', 'çevre', 'bildirimler'],
    lessonCount: 7,
    minutesPerDay: 8,
  },
  
  // Productivity Journeys
  {
    id: 'task-initiation',
    title: 'Göreve Başlama Sanatı',
    subtitle: 'Duvarı aş ve başla',
    description: '"Biliyorum ama başlayamıyorum" duygusunu aş. Mikro-başlangıç teknikleri ve motivasyon stratejileri.',
    duration: 10,
    difficulty: 'beginner',
    category: 'productivity',
    icon: 'Rocket',
    gradient: 'from-orange-500 to-amber-400',
    tags: ['başlama', 'motivasyon', 'prokrastinasyon'],
    lessonCount: 10,
    minutesPerDay: 10,
  },
  {
    id: 'sprint-productivity',
    title: 'Sprint Üretkenlik',
    subtitle: 'Kısa patlamalarla maksimum verim',
    description: 'Pomodoro ve benzeri sprint teknikleriyle kısa ama yoğun çalışma seansları oluştur.',
    duration: 7,
    difficulty: 'beginner',
    category: 'productivity',
    icon: 'Zap',
    gradient: 'from-yellow-500 to-orange-500',
    tags: ['sprint', 'pomodoro', 'hız'],
    lessonCount: 7,
    minutesPerDay: 12,
  },
  {
    id: 'project-completion',
    title: 'Proje Bitirici',
    subtitle: 'Başladığını tamamla',
    description: 'Yarım kalan projeler için tamamlama stratejileri. Son aşama motivasyonu ve kutlama ritüelleri.',
    duration: 14,
    difficulty: 'intermediate',
    category: 'productivity',
    icon: 'CheckCircle',
    gradient: 'from-green-500 to-emerald-500',
    tags: ['tamamlama', 'proje', 'motivasyon'],
    lessonCount: 14,
    minutesPerDay: 15,
  },
  
  // Time Management
  {
    id: 'time-blindness',
    title: 'Zaman Körlüğü Rehberi',
    subtitle: 'Zamanla yeni bir ilişki kur',
    description: 'DEHB\'nin zaman algısı zorluklarını anla ve pratik araçlarla zamanı daha iyi yönet.',
    duration: 10,
    difficulty: 'beginner',
    category: 'time',
    icon: 'Clock',
    gradient: 'from-rose-500 to-pink-500',
    tags: ['zaman', 'planlama', 'tahmin'],
    lessonCount: 10,
    minutesPerDay: 10,
  },
  {
    id: 'deadline-mastery',
    title: 'Deadline Ustası',
    subtitle: 'Son dakika stresinden kurtul',
    description: 'Yapay deadline\'lar oluştur ve aciliyet bağımlılığını sağlıklı bir şekilde yönet.',
    duration: 7,
    difficulty: 'intermediate',
    category: 'time',
    icon: 'Timer',
    gradient: 'from-red-500 to-orange-500',
    tags: ['deadline', 'aciliyet', 'planlama'],
    lessonCount: 7,
    minutesPerDay: 12,
  },
  
  // Emotional Regulation
  {
    id: 'emotional-surfing',
    title: 'Duygu Sörfçüsü',
    subtitle: 'Duygusal dalgaları yönet',
    description: 'DEHB\'nin duygusal yoğunluğuyla başa çıkma. Duygu düzenleme teknikleri ve öz-şefkat pratikleri.',
    duration: 14,
    difficulty: 'intermediate',
    category: 'emotions',
    icon: 'Heart',
    gradient: 'from-pink-500 to-rose-500',
    tags: ['duygular', 'düzenleme', 'öz-şefkat'],
    lessonCount: 14,
    minutesPerDay: 15,
  },
  {
    id: 'rejection-sensitivity',
    title: 'RSD ile Yaşamak',
    subtitle: 'Reddedilme duyarlılığını anla',
    description: 'Rejection Sensitive Dysphoria (RSD) nedir ve nasıl yönetilir? Pratik başa çıkma stratejileri.',
    duration: 10,
    difficulty: 'intermediate',
    category: 'emotions',
    icon: 'Shield',
    gradient: 'from-violet-500 to-purple-500',
    tags: ['RSD', 'duyarlılık', 'başa çıkma'],
    lessonCount: 10,
    minutesPerDay: 12,
  },
  
  // Work & Career
  {
    id: 'remote-work-adhd',
    title: 'Evden Çalışma ve DEHB',
    subtitle: 'Home office stratejileri',
    description: 'Evden çalışırken yapı oluşturma, dikkat yönetimi ve iş-yaşam dengesi.',
    duration: 10,
    difficulty: 'beginner',
    category: 'work',
    icon: 'Home',
    gradient: 'from-sky-500 to-blue-500',
    tags: ['uzaktan', 'ev', 'iş'],
    lessonCount: 10,
    minutesPerDay: 10,
  },
  {
    id: 'meeting-mastery',
    title: 'Toplantı Ustası',
    subtitle: 'Toplantılarda odaklan ve katkı sağla',
    description: 'Uzun toplantılarda dikkat yönetimi, not alma teknikleri ve aktif katılım stratejileri.',
    duration: 5,
    difficulty: 'beginner',
    category: 'work',
    icon: 'Users',
    gradient: 'from-indigo-500 to-blue-500',
    tags: ['toplantı', 'iş', 'dikkat'],
    lessonCount: 5,
    minutesPerDay: 8,
  },
  
  // Habits
  {
    id: 'habit-stacking',
    title: 'Alışkanlık Zincirleme',
    subtitle: 'Küçük adımlarla büyük değişimler',
    description: 'DEHB-dostu alışkanlık oluşturma teknikleri. Habit stacking ve mikro-alışkanlıklar.',
    duration: 21,
    difficulty: 'intermediate',
    category: 'habits',
    icon: 'Link',
    gradient: 'from-amber-500 to-yellow-500',
    tags: ['alışkanlık', 'rutin', 'değişim'],
    lessonCount: 21,
    minutesPerDay: 10,
  },
  {
    id: 'morning-routine',
    title: 'Sabah Ritüeli',
    subtitle: 'Güne güçlü başla',
    description: 'DEHB-dostu sabah rutini oluştur. Enerji yönetimi ve günü organize etme.',
    duration: 7,
    difficulty: 'beginner',
    category: 'habits',
    icon: 'Sun',
    gradient: 'from-orange-400 to-amber-300',
    tags: ['sabah', 'rutin', 'enerji'],
    lessonCount: 7,
    minutesPerDay: 8,
  },
  
  // Self-Care
  {
    id: 'energy-management',
    title: 'Enerji Yönetimi',
    subtitle: 'Enerjini tanı ve yönet',
    description: 'Günlük enerji döngülerini anla ve peak performans saatlerini keşfet.',
    duration: 7,
    difficulty: 'beginner',
    category: 'self-care',
    icon: 'Battery',
    gradient: 'from-green-500 to-lime-500',
    tags: ['enerji', 'performans', 'döngü'],
    lessonCount: 7,
    minutesPerDay: 10,
  },
  {
    id: 'burnout-prevention',
    title: 'Tükenmişlik Önleme',
    subtitle: 'Sürdürülebilir üretkenlik',
    description: 'DEHB\'nin tükenmişlik riskini anla ve önleyici stratejiler geliştir.',
    duration: 10,
    difficulty: 'intermediate',
    category: 'self-care',
    icon: 'Flame',
    gradient: 'from-red-400 to-orange-400',
    tags: ['tükenmişlik', 'dinlenme', 'denge'],
    lessonCount: 10,
    minutesPerDay: 12,
  },
];

// ============================================
// ARCHETYPE-BASED JOURNEY RECOMMENDATIONS
// ============================================

/**
 * Journey recommendations for each dopamine archetype
 * Ordered by relevance (most relevant first)
 */
export const ARCHETYPE_JOURNEYS: Record<DopamineProfileType, Journey[]> = {
  // Seeker: Novelty-driven, gets bored easily
  seeker: [
    ALL_JOURNEYS.find(j => j.id === 'habit-stacking')!,
    ALL_JOURNEYS.find(j => j.id === 'project-completion')!,
    ALL_JOURNEYS.find(j => j.id === 'distraction-defense')!,
    ALL_JOURNEYS.find(j => j.id === 'energy-management')!,
  ],
  
  // Sprinter: Urgency-dependent, short bursts
  sprinter: [
    ALL_JOURNEYS.find(j => j.id === 'sprint-productivity')!,
    ALL_JOURNEYS.find(j => j.id === 'deadline-mastery')!,
    ALL_JOURNEYS.find(j => j.id === 'task-initiation')!,
    ALL_JOURNEYS.find(j => j.id === 'burnout-prevention')!,
  ],
  
  // Diver: Hyperfocus-prone, deep work
  diver: [
    ALL_JOURNEYS.find(j => j.id === 'deep-work-mastery')!,
    ALL_JOURNEYS.find(j => j.id === 'time-blindness')!,
    ALL_JOURNEYS.find(j => j.id === 'energy-management')!,
    ALL_JOURNEYS.find(j => j.id === 'project-completion')!,
  ],
  
  // Juggler: Multi-tasking, context switching
  juggler: [
    ALL_JOURNEYS.find(j => j.id === 'focus-fundamentals')!,
    ALL_JOURNEYS.find(j => j.id === 'project-completion')!,
    ALL_JOURNEYS.find(j => j.id === 'distraction-defense')!,
    ALL_JOURNEYS.find(j => j.id === 'habit-stacking')!,
  ],
  
  // Dreamer: Rich inner world, action difficulty
  dreamer: [
    ALL_JOURNEYS.find(j => j.id === 'task-initiation')!,
    ALL_JOURNEYS.find(j => j.id === 'focus-fundamentals')!,
    ALL_JOURNEYS.find(j => j.id === 'morning-routine')!,
    ALL_JOURNEYS.find(j => j.id === 'habit-stacking')!,
  ],
  
  // Reactor: Environmentally sensitive, emotional
  reactor: [
    ALL_JOURNEYS.find(j => j.id === 'emotional-surfing')!,
    ALL_JOURNEYS.find(j => j.id === 'rejection-sensitivity')!,
    ALL_JOURNEYS.find(j => j.id === 'distraction-defense')!,
    ALL_JOURNEYS.find(j => j.id === 'burnout-prevention')!,
  ],
};

// ============================================
// ARCHETYPE-BASED DAILY TIPS
// ============================================

export const ARCHETYPE_TIPS: Record<DopamineProfileType, DailyTip[]> = {
  seeker: [
    {
      id: 'seeker-1',
      text: 'Sıkıcı bir göreve başlamadan önce, içine küçük bir "yenilik enjeksiyonu" ekle - yeni bir müzik, farklı bir ortam, ya da görevi oyunlaştır.',
      highlight: 'yenilik enjeksiyonu',
      category: 'strategy',
    },
    {
      id: 'seeker-2',
      text: 'Bugün bir işi tamamladığında, kendine yeni bir şey öğrenme ödülü ver. Beynin yeniliği seviyor!',
      highlight: 'yeni bir şey öğrenme ödülü',
      category: 'mindset',
    },
    {
      id: 'seeker-3',
      text: 'Projelerin arasında "atlama" isteği geldiğinde, 5 dakika daha devam et. Parlak obje sendromunu küçük adımlarla yönetebilirsin.',
      highlight: '5 dakika daha',
      category: 'strategy',
    },
    {
      id: 'seeker-4',
      text: 'Rutin görevler için "keşif modu" aç: Her seferinde farklı bir yöntem dene. Aynı sonuç, farklı yolculuk.',
      highlight: 'keşif modu',
      category: 'tool',
    },
    {
      id: 'seeker-5',
      text: 'Merak duyduğun her şeyi not al ama hemen dalma. "Keşif listesi" oluştur ve planlı zamanlarda keşfet.',
      highlight: 'Keşif listesi',
      category: 'tool',
    },
  ],
  
  sprinter: [
    {
      id: 'sprinter-1',
      text: 'Büyük görevleri 25 dakikalık sprint\'lere böl. Son dakika enerjisini yapay deadline\'larla her an kullanabilirsin.',
      highlight: '25 dakikalık sprint\'ler',
      category: 'strategy',
    },
    {
      id: 'sprinter-2',
      text: 'Enerji çöküşlerini önceden planla. Sprint\'ler arasında 5-10 dakika gerçek mola ver - telefon değil, hareket.',
      highlight: 'gerçek mola',
      category: 'reminder',
    },
    {
      id: 'sprinter-3',
      text: 'Bugün en önemli 3 görevi belirle ve ilkini en enerjik olduğun saatte sprint\'le. Geri kalanı bonus.',
      highlight: 'en önemli 3 görev',
      category: 'strategy',
    },
    {
      id: 'sprinter-4',
      text: 'Aciliyet bağımlılığın var ama bu bir güç de olabilir. Yapay deadline\'lar oluştur ve "oyunu" oyna.',
      highlight: 'Yapay deadline\'lar',
      category: 'mindset',
    },
    {
      id: 'sprinter-5',
      text: 'Sprint sonrası kutlama ritüeli oluştur. Küçük bir kahve, kısa bir yürüyüş - beynine "tamamladın" sinyali ver.',
      highlight: 'kutlama ritüeli',
      category: 'tool',
    },
  ],
  
  diver: [
    {
      id: 'diver-1',
      text: 'Hiperfokus süper gücün ama dalış öncesi zamanlayıcı kur. "Yüzeye çıkma" hatırlatıcısı hayat kurtarır.',
      highlight: 'Yüzeye çıkma hatırlatıcısı',
      category: 'tool',
    },
    {
      id: 'diver-2',
      text: 'Bugün derin dalışa girmeden önce temel ihtiyaçlarını karşıla: su, atıştırmalık, tuvalet. Daldıktan sonra hatırlamayacaksın.',
      highlight: 'temel ihtiyaçlarını karşıla',
      category: 'reminder',
    },
    {
      id: 'diver-3',
      text: 'Görevler arası geçiş zorsa, "geçiş ritüeli" oluştur. 5 dakikalık yürüyüş, su içme, nefes - beyni resetle.',
      highlight: 'geçiş ritüeli',
      category: 'strategy',
    },
    {
      id: 'diver-4',
      text: 'Derin çalışma seanslarını planla ama "acil olmayan" işler için. Gerçek aciller hiperfokusu bozar.',
      highlight: 'acil olmayan',
      category: 'strategy',
    },
    {
      id: 'diver-5',
      text: 'Flow state harika ama sürdürülebilir olmalı. Günde maksimum 2-3 derin dalış hedefle, arada yüzeye çık.',
      highlight: 'maksimum 2-3 derin dalış',
      category: 'mindset',
    },
  ],
  
  juggler: [
    {
      id: 'juggler-1',
      text: 'Çoklu görev illüzyonunu kır: Aslında hızlı geçişler yapıyorsun ve bu enerji tüketiyor. Bilinçli geçişler planla.',
      highlight: 'Bilinçli geçişler',
      category: 'mindset',
    },
    {
      id: 'juggler-2',
      text: 'Maksimum 3 aktif proje kuralı: Diğerlerini "beklemede" listesine al. Her şeyi aynı anda yapmak zorunda değilsin.',
      highlight: '3 aktif proje kuralı',
      category: 'strategy',
    },
    {
      id: 'juggler-3',
      text: 'Bugün "tema günü" dene: Benzer görevleri grupla. Bağlam değişikliği azalınca enerji artar.',
      highlight: 'tema günü',
      category: 'tool',
    },
    {
      id: 'juggler-4',
      text: 'Her geçiş bir maliyet. Telefonu kontrol etmek de bir geçiş. Bildirimleri kapat ve planlı "kontrol zamanları" belirle.',
      highlight: 'planlı kontrol zamanları',
      category: 'strategy',
    },
    {
      id: 'juggler-5',
      text: 'İlerleme görselleştirmesi kur. Tüm projelerini görebileceğin bir pano yarım kalma anksiyetesini azaltır.',
      highlight: 'İlerleme görselleştirmesi',
      category: 'tool',
    },
  ],
  
  dreamer: [
    {
      id: 'dreamer-1',
      text: 'Hayal kurmak güzel ama eyleme köprü kur: Her hayalin için "ilk 2 dakikalık adım" belirle.',
      highlight: 'ilk 2 dakikalık adım',
      category: 'strategy',
    },
    {
      id: 'dreamer-2',
      text: 'Bugün aklına gelen fikirleri hemen yakalayacak bir sistem kur - not defteri, sesli not, app. Sonra düzenle.',
      highlight: 'hemen yakalayacak',
      category: 'tool',
    },
    {
      id: 'dreamer-3',
      text: '"Mükemmel anı bekleme" tuzağından kaçın. Başlamak için ideal koşullar asla gelmez. Şimdi, olduğun gibi başla.',
      highlight: 'Şimdi başla',
      category: 'mindset',
    },
    {
      id: 'dreamer-4',
      text: 'Dış hesap verebilirlik kur: Birine söz ver, body doubling yap, ya da sesli düşün. İç motivasyon yetmeyebilir.',
      highlight: 'Dış hesap verebilirlik',
      category: 'strategy',
    },
    {
      id: 'dreamer-5',
      text: 'Hayal zamanını planla: Gün içinde "serbest düşünme" için zaman ayır. Geri kalanında eylem modunda kal.',
      highlight: 'serbest düşünme zamanı',
      category: 'tool',
    },
  ],
  
  reactor: [
    {
      id: 'reactor-1',
      text: 'Çevresel uyaranlar seni derinden etkiliyor. Bugün çalışma ortamını optimize et: gürültü, ışık, düzen.',
      highlight: 'çalışma ortamını optimize et',
      category: 'strategy',
    },
    {
      id: 'reactor-2',
      text: 'Duygusal yoğunluk hissettiğinde, 90 saniye bekle. Nörokimyasal dalga bu sürede geçer. Sonra tepki ver.',
      highlight: '90 saniye bekle',
      category: 'tool',
    },
    {
      id: 'reactor-3',
      text: 'Eleştiri veya ret aldığında: "Bu benim değerimle ilgili değil, sadece bir geri bildirim" mantrasını tekrarla.',
      highlight: 'sadece bir geri bildirim',
      category: 'mindset',
    },
    {
      id: 'reactor-4',
      text: 'Enerji koruyan sınırlar koy. Hayır demek bencillik değil, sürdürülebilirlik. Kendine öncelik ver.',
      highlight: 'Enerji koruyan sınırlar',
      category: 'strategy',
    },
    {
      id: 'reactor-5',
      text: 'Günde en az 10 dakika "uyaran azaltma" zamanı ayır. Sessizlik, karanlık, yalnızlık - sistemi resetle.',
      highlight: 'uyaran azaltma',
      category: 'tool',
    },
  ],
};

// ============================================
// GENERIC TIPS (for users without profile)
// ============================================

export const GENERIC_TIPS: DailyTip[] = [
  {
    id: 'generic-1',
    text: 'Büyük bir görevi 10 dakikalık parçalara böl. Başlamak için mükemmel anı bekleme - sadece ilk 10 dakikayı tamamla.',
    highlight: '10 dakikalık parçalar',
    category: 'strategy',
  },
  {
    id: 'generic-2',
    text: 'DEHB beyni "ilginç" olanı yapar, "önemli" olanı değil. Önemli görevleri ilginç hale getirmenin yollarını bul.',
    highlight: 'ilginç hale getir',
    category: 'mindset',
  },
  {
    id: 'generic-3',
    text: 'Dopamin sisteminle çalış, ona karşı değil. Küçük ödüller, ilerleme göstergeleri ve kutlamalar motivasyonu artırır.',
    highlight: 'Küçük ödüller',
    category: 'strategy',
  },
  {
    id: 'generic-4',
    text: 'Dış yapı iç disiplinden daha etkili. Hesap verebilirlik partneri, zamanlayıcılar ve rutinler kullan.',
    highlight: 'Dış yapı',
    category: 'tool',
  },
  {
    id: 'generic-5',
    text: 'Kendine şefkatli ol. DEHB bir karakter kusuru değil, nörolojik bir farklılık. Zor günler normal.',
    highlight: 'Kendine şefkatli ol',
    category: 'mindset',
  },
];

// ============================================
// FEATURED EVENTS (Mock Data)
// ============================================

export interface FeaturedEvent {
  id: string;
  title: string;
  description?: string;
  type: 'body-doubling' | 'workshop' | 'community' | 'coaching';
  date: string;
  time: string;
  duration: number; // minutes
  host?: string;
  participants?: number;
  maxParticipants?: number;
  tags?: string[];
  isFeatured?: boolean;
  imageUrl?: string;
}

export const MOCK_EVENTS: FeaturedEvent[] = [
  {
    id: 'event-1',
    title: 'Task Initiation: How to Climb the Wall and Get Started',
    description: 'DEHB\'nin en büyük zorluklarından biri olan göreve başlama konusunda pratik stratejiler öğrenin.',
    type: 'workshop',
    date: 'Bugün',
    time: '21:00',
    duration: 60,
    host: 'Dr. Simay',
    participants: 24,
    maxParticipants: 50,
    tags: ['başlama', 'strateji', 'workshop'],
    isFeatured: true,
  },
  {
    id: 'event-2',
    title: '60 min Body Doubling',
    type: 'body-doubling',
    date: 'Bugün',
    time: '18:00',
    duration: 60,
    participants: 12,
    maxParticipants: 30,
  },
  {
    id: 'event-3',
    title: '60 min Body Doubling',
    type: 'body-doubling',
    date: 'Bugün',
    time: '20:00',
    duration: 60,
    participants: 8,
    maxParticipants: 30,
  },
  {
    id: 'event-4',
    title: '60 min Body Doubling',
    type: 'body-doubling',
    date: 'Pzt, 27 Ara',
    time: '18:00',
    duration: 60,
    participants: 5,
    maxParticipants: 30,
  },
];

/**
 * Get events sorted by relevance for a user
 * Body doubling events prioritized if bodyDoublingRecommended is true
 */
export function getPersonalizedEvents(bodyDoublingRecommended: boolean): FeaturedEvent[] {
  const events = [...MOCK_EVENTS];
  
  if (bodyDoublingRecommended) {
    // Sort body doubling events first
    events.sort((a, b) => {
      if (a.type === 'body-doubling' && b.type !== 'body-doubling') return -1;
      if (a.type !== 'body-doubling' && b.type === 'body-doubling') return 1;
      return 0;
    });
  }
  
  return events;
}

