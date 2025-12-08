/**
 * DopaLive - DEHB Dopamin Haritası Quiz Sistemi
 * Nörokimyasal temelli, bilimsel DEHB değerlendirmesi
 * @module lib/quiz
 */

// ============================================
// DOPAMIN PROFİL TİPLERİ
// ============================================

export type DopamineProfileType = 
  | "seeker"      // Dopamin Avcısı - sürekli yenilik arayan
  | "sprinter"    // Hız Koşucusu - kısa süreli yoğun odak
  | "diver"       // Derin Dalıcı - hiperfokus eğilimli
  | "juggler"     // Hokkabaz - çoklu görev seven
  | "dreamer"     // Hayalci - iç dünyada kaybolabilen
  | "reactor";    // Reaktör - dışsal uyaranlara duyarlı

export type EnergyPattern = "morning" | "afternoon" | "evening" | "chaotic" | "unknown";

export type RegulationStyle = "external" | "internal" | "mixed";

// ============================================
// QUIZ SORU GRUPLARI
// ============================================

export interface QuizSection {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  text: string;
  subtext?: string;
  type: "scale" | "single" | "multi" | "slider";
  options?: QuizOption[];
  scaleLabels?: { left: string; right: string };
  category: "dopamine" | "attention" | "executive" | "emotion" | "time" | "energy" | "social";
}

export interface QuizOption {
  id: string;
  label: string;
  emoji?: string;
  description?: string;
  value: number;
}

// ============================================
// QUIZ CEVAPLARI
// ============================================

export interface QuizAnswers {
  // Dopamin Sistemi
  noveltySeekingScore: number;        // Yenilik arayışı (1-5)
  rewardSensitivityScore: number;     // Ödül duyarlılığı (1-5)
  boredomThresholdScore: number;      // Sıkılma eşiği (1-5)
  delayedGratificationScore: number;  // Gecikmiş ödül toleransı (1-5)
  
  // Dikkat Düzenleme
  sustainedAttentionScore: number;    // Sürdürülebilir dikkat (1-5)
  selectiveAttentionScore: number;    // Seçici dikkat (1-5)
  attentionShiftingScore: number;     // Dikkat geçişi (1-5)
  hyperfocusFrequency: number;        // Hiperfokus sıklığı (1-5)
  
  // Yürütücü İşlevler
  taskInitiationScore: number;        // Göreve başlama (1-5)
  planningScore: number;              // Planlama (1-5)
  workingMemoryScore: number;         // İşleyen bellek (1-5)
  inhibitionScore: number;            // Dürtü kontrolü (1-5)
  cognitiveFlexibilityScore: number;  // Bilişsel esneklik (1-5)
  
  // Duygusal Düzenleme
  emotionalReactivityScore: number;   // Duygusal tepkisellik (1-5)
  frustrationToleranceScore: number;  // Hayal kırıklığı toleransı (1-5)
  rejectionSensitivityScore: number;  // Reddedilme duyarlılığı (1-5)
  emotionalRecoveryScore: number;     // Duygusal toparlanma (1-5)
  
  // Zaman Algısı
  timeBlindnessScore: number;         // Zaman körlüğü (1-5)
  urgencyDependenceScore: number;     // Aciliyet bağımlılığı (1-5)
  estimationAccuracyScore: number;    // Tahmin doğruluğu (1-5)
  
  // Enerji Kalıpları
  energyPattern: EnergyPattern;
  energyConsistencyScore: number;     // Enerji tutarlılığı (1-5)
  peakHours: string[];                // En verimli saatler
  
  // Sosyal & Çevresel
  externalStructureNeed: number;      // Dış yapı ihtiyacı (1-5)
  socialAccountabilityScore: number;  // Sosyal hesap verebilirlik (1-5)
  environmentSensitivityScore: number;// Çevre duyarlılığı (1-5)
  
  // Temel Bilgiler
  ageRange: string;
  diagnosisStatus: "diagnosed" | "suspected" | "exploring" | "none";
  currentChallenges: string[];
  goals: string[];
}

// ============================================
// QUIZ BÖLÜM TANIMLARI
// ============================================

export const QUIZ_SECTIONS: QuizSection[] = [
  {
    id: "intro",
    title: "Hoş Geldin",
    subtitle: "Dopamin haritanı keşfetmeye hazır mısın?",
    icon: "🧠",
    questions: []
  },
  {
    id: "dopamine",
    title: "Dopamin Sistemi",
    subtitle: "Beyninin motivasyon ve ödül mekanizmalarını anlayalım",
    icon: "⚡",
    questions: [
      {
        id: "novelty_seeking",
        text: "Yeni bir şey keşfetmek bana enerji verir.",
        subtext: "Yeni hobiler, fikirler, yerler...",
        type: "scale",
        scaleLabels: { left: "Nadiren", right: "Her zaman" },
        category: "dopamine"
      },
      {
        id: "reward_sensitivity",
        text: "Küçük ödüller bile motivasyonumu artırır.",
        subtext: "İlerleme çubuğu, rozet, tamamlama hissi...",
        type: "scale",
        scaleLabels: { left: "Etkilemez", right: "Çok etkiler" },
        category: "dopamine"
      },
      {
        id: "boredom_threshold",
        text: "Monoton işlerde çabuk sıkılırım.",
        type: "scale",
        scaleLabels: { left: "Hayır", right: "Çok çabuk" },
        category: "dopamine"
      },
      {
        id: "delayed_gratification",
        text: "Uzun vadeli ödüller için beklemek bana zor gelir.",
        subtext: "Sonucu hemen görmek istiyorum",
        type: "scale",
        scaleLabels: { left: "Kolay beklerim", right: "Çok zor" },
        category: "dopamine"
      },
      {
        id: "interest_intensity",
        text: "İlgi duyduğum konularda kendimi kaybederim.",
        type: "scale",
        scaleLabels: { left: "Nadiren", right: "Sık sık" },
        category: "dopamine"
      }
    ]
  },
  {
    id: "attention",
    title: "Dikkat Düzenleme",
    subtitle: "Dikkatini nasıl yönettiğini inceleyelim",
    icon: "🎯",
    questions: [
      {
        id: "sustained_attention",
        text: "Sıkıcı ama gerekli işlere uzun süre odaklanabilirim.",
        type: "scale",
        scaleLabels: { left: "Çok zor", right: "Kolaylıkla" },
        category: "attention"
      },
      {
        id: "selective_attention",
        text: "Çevremdeki dikkat dağıtıcıları kolayca görmezden gelirim.",
        subtext: "Sesler, bildirimler, insanlar...",
        type: "scale",
        scaleLabels: { left: "Çok zor", right: "Kolaylıkla" },
        category: "attention"
      },
      {
        id: "attention_shifting",
        text: "Bir işten diğerine geçiş yapmak beni yorar.",
        type: "scale",
        scaleLabels: { left: "Hiç yormaz", right: "Çok yorar" },
        category: "attention"
      },
      {
        id: "hyperfocus",
        text: "Bazen saatlerce bir şeye odaklanıp zamanı kaybederim.",
        subtext: "\"Hiperfokus\" deneyimi",
        type: "scale",
        scaleLabels: { left: "Hiç olmaz", right: "Çok sık" },
        category: "attention"
      },
      {
        id: "mind_wandering",
        text: "Zihinsel olarak başka yerlere kayma sıklığım.",
        type: "scale",
        scaleLabels: { left: "Nadiren", right: "Sürekli" },
        category: "attention"
      }
    ]
  },
  {
    id: "executive",
    title: "Yürütücü İşlevler",
    subtitle: "Planlama, organize olma ve başlatma becerilerin",
    icon: "🗂️",
    questions: [
      {
        id: "task_initiation",
        text: "Bir işe başlamak, yapmaktan daha zor geliyor.",
        subtext: "Ne yapacağımı bilsem bile başlayamıyorum",
        type: "scale",
        scaleLabels: { left: "Hayır", right: "Kesinlikle" },
        category: "executive"
      },
      {
        id: "planning",
        text: "Karmaşık projeleri adımlara bölmekte zorlanırım.",
        type: "scale",
        scaleLabels: { left: "Kolaylıkla bölerim", right: "Çok zorlanırım" },
        category: "executive"
      },
      {
        id: "working_memory",
        text: "Aklımda birden fazla şeyi tutmak zor.",
        subtext: "Söylenenleri, yapılacakları, tarihleri...",
        type: "scale",
        scaleLabels: { left: "Kolay", right: "Çok zor" },
        category: "executive"
      },
      {
        id: "inhibition",
        text: "Aklıma geleni hemen söyler/yaparım.",
        subtext: "Dürtüsellik",
        type: "scale",
        scaleLabels: { left: "Önce düşünürüm", right: "Hemen hareket" },
        category: "executive"
      },
      {
        id: "flexibility",
        text: "Plan değişiklikleri beni strese sokar.",
        type: "scale",
        scaleLabels: { left: "Rahatça uyum sağlarım", right: "Çok zorlanırım" },
        category: "executive"
      },
      {
        id: "prioritization",
        text: "Neyin önemli olduğuna karar vermek zor.",
        subtext: "Her şey acil gibi hissediyorum",
        type: "scale",
        scaleLabels: { left: "Kolaylıkla belirlerim", right: "Çok zorlanırım" },
        category: "executive"
      }
    ]
  },
  {
    id: "emotion",
    title: "Duygusal Düzenleme",
    subtitle: "Duygularını nasıl deneyimlediğini anlayalım",
    icon: "💫",
    questions: [
      {
        id: "emotional_intensity",
        text: "Duygularım yoğun ve ani değişebiliyor.",
        type: "scale",
        scaleLabels: { left: "Dengeli hissederim", right: "Çok yoğun" },
        category: "emotion"
      },
      {
        id: "frustration_tolerance",
        text: "İşler ters gittiğinde çabuk sinirlenirim.",
        type: "scale",
        scaleLabels: { left: "Sakin kalırım", right: "Hemen tepki veririm" },
        category: "emotion"
      },
      {
        id: "rejection_sensitivity",
        text: "Eleştiri veya reddedilme beni derinden etkiler.",
        subtext: "Reddedilme duyarlılığı (RSD)",
        type: "scale",
        scaleLabels: { left: "Az etkiler", right: "Çok etkiler" },
        category: "emotion"
      },
      {
        id: "emotional_recovery",
        text: "Olumsuz duygulardan toparlanmam uzun sürer.",
        type: "scale",
        scaleLabels: { left: "Çabuk toplarım", right: "Uzun sürer" },
        category: "emotion"
      },
      {
        id: "overwhelm_frequency",
        text: "Bunalmış hissetme sıklığım.",
        type: "scale",
        scaleLabels: { left: "Nadiren", right: "Sık sık" },
        category: "emotion"
      }
    ]
  },
  {
    id: "time",
    title: "Zaman Algısı",
    subtitle: "Zamanla ilişkini inceleyelim",
    icon: "⏰",
    questions: [
      {
        id: "time_blindness",
        text: "Zaman su gibi akıp gidiyor, fark etmiyorum.",
        subtext: "\"Zaman körlüğü\" deneyimi",
        type: "scale",
        scaleLabels: { left: "Zamanı iyi takip ederim", right: "Sürekli yaşarım" },
        category: "time"
      },
      {
        id: "urgency_dependence",
        text: "Son dakikaya kalmadan motive olamıyorum.",
        subtext: "Aciliyet bağımlılığı",
        type: "scale",
        scaleLabels: { left: "Önceden başlarım", right: "Hep son dakika" },
        category: "time"
      },
      {
        id: "estimation",
        text: "İşlerin ne kadar süreceğini tahmin etmek zor.",
        type: "scale",
        scaleLabels: { left: "İyi tahmin ederim", right: "Hep yanılırım" },
        category: "time"
      },
      {
        id: "punctuality",
        text: "Randevulara/toplantılara zamanında yetişirim.",
        type: "scale",
        scaleLabels: { left: "Genelde geç kalırım", right: "Her zaman zamanında" },
        category: "time"
      }
    ]
  },
  {
    id: "energy",
    title: "Enerji Kalıpları",
    subtitle: "Günlük enerji ritmini keşfedelim",
    icon: "🔋",
    questions: [
      {
        id: "energy_consistency",
        text: "Enerji seviyem gün içinde tutarlı.",
        type: "scale",
        scaleLabels: { left: "Çok değişken", right: "Tutarlı" },
        category: "energy"
      },
      {
        id: "energy_pattern",
        text: "En enerjik olduğum zaman dilimi:",
        type: "single",
        options: [
          { id: "morning", label: "Sabah (06-12)", emoji: "🌅", value: 1 },
          { id: "afternoon", label: "Öğleden sonra (12-18)", emoji: "☀️", value: 2 },
          { id: "evening", label: "Akşam/Gece (18-00)", emoji: "🌙", value: 3 },
          { id: "chaotic", label: "Değişken/Tahmin edilemez", emoji: "🎲", value: 4 },
          { id: "unknown", label: "Bilmiyorum", emoji: "❓", value: 5 }
        ],
        category: "energy"
      },
      {
        id: "crash_frequency",
        text: "Gün içinde enerji çöküşü yaşama sıklığım.",
        type: "scale",
        scaleLabels: { left: "Nadiren", right: "Her gün" },
        category: "energy"
      },
      {
        id: "sleep_impact",
        text: "Uyku düzenim enerji seviyemi çok etkiler.",
        type: "scale",
        scaleLabels: { left: "Az etkiler", right: "Çok etkiler" },
        category: "energy"
      }
    ]
  },
  {
    id: "environment",
    title: "Çevre & Sosyal",
    subtitle: "Çevrenin ve diğerlerinin etkisi",
    icon: "🌍",
    questions: [
      {
        id: "external_structure",
        text: "Dış yapı olmadan (deadline, takip) üretken olmam zor.",
        type: "scale",
        scaleLabels: { left: "Kendi kendime yaparım", right: "Dış yapı şart" },
        category: "social"
      },
      {
        id: "accountability",
        text: "Birine söz verdiğimde daha iyi performans gösteririm.",
        type: "scale",
        scaleLabels: { left: "Fark etmez", right: "Çok fark eder" },
        category: "social"
      },
      {
        id: "environment_sensitivity",
        text: "Çalışma ortamı (ses, ışık, düzen) performansımı etkiler.",
        type: "scale",
        scaleLabels: { left: "Az etkiler", right: "Çok etkiler" },
        category: "social"
      },
      {
        id: "body_doubling",
        text: "Yanımda biri varken çalışmak daha kolay.",
        subtext: "Body doubling etkisi",
        type: "scale",
        scaleLabels: { left: "Fark etmez", right: "Çok yardımcı" },
        category: "social"
      }
    ]
  },
  {
    id: "context",
    title: "Senin Hikayenı",
    subtitle: "Seni daha iyi anlamamıza yardımcı ol",
    icon: "📖",
    questions: [
      {
        id: "diagnosis_status",
        text: "DEHB tanı durumun:",
        type: "single",
        options: [
          { id: "diagnosed", label: "Tanı aldım", emoji: "✅", value: 1 },
          { id: "suspected", label: "Şüpheleniyorum", emoji: "🤔", value: 2 },
          { id: "exploring", label: "Araştırıyorum", emoji: "🔍", value: 3 },
          { id: "none", label: "Sadece merak", emoji: "💭", value: 4 }
        ],
        category: "social"
      },
      {
        id: "age_range",
        text: "Yaş aralığın:",
        type: "single",
        options: [
          { id: "18-24", label: "18-24", emoji: "🎓", value: 1 },
          { id: "25-34", label: "25-34", emoji: "💼", value: 2 },
          { id: "35-44", label: "35-44", emoji: "🏠", value: 3 },
          { id: "45+", label: "45+", emoji: "🌟", value: 4 }
        ],
        category: "social"
      },
      {
        id: "main_challenges",
        text: "En çok zorlandığın alanlar (birden fazla seçebilirsin):",
        type: "multi",
        options: [
          { id: "focus", label: "Odaklanma", emoji: "🎯", value: 1 },
          { id: "motivation", label: "Motivasyon", emoji: "🔥", value: 2 },
          { id: "organization", label: "Organizasyon", emoji: "📁", value: 3 },
          { id: "time", label: "Zaman yönetimi", emoji: "⏰", value: 4 },
          { id: "emotions", label: "Duygusal düzenleme", emoji: "💫", value: 5 },
          { id: "relationships", label: "İlişkiler", emoji: "👥", value: 6 },
          { id: "sleep", label: "Uyku", emoji: "😴", value: 7 },
          { id: "work", label: "İş/Kariyer", emoji: "💼", value: 8 }
        ],
        category: "social"
      },
      {
        id: "goals",
        text: "DopaLive'dan beklentilerin (birden fazla seçebilirsin):",
        type: "multi",
        options: [
          { id: "understand", label: "Kendimi anlamak", emoji: "🧠", value: 1 },
          { id: "strategies", label: "Pratik stratejiler", emoji: "🛠️", value: 2 },
          { id: "coaching", label: "Koçluk desteği", emoji: "🎯", value: 3 },
          { id: "community", label: "Topluluk/Destek", emoji: "👥", value: 4 },
          { id: "tools", label: "Dijital araçlar", emoji: "📱", value: 5 },
          { id: "science", label: "Bilimsel bilgi", emoji: "🔬", value: 6 }
        ],
        category: "social"
      }
    ]
  }
];

// ============================================
// DOPAMİN PROFİL ARKETİPLERİ
// ============================================

export interface DopamineArchetype {
  key: DopamineProfileType;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  neuroscienceInsight: string;
  strengths: string[];
  challenges: string[];
  strategies: string[];
  idealCoachingStyle: string;
  recommendedTools: string[];
}

export const DOPAMINE_ARCHETYPES: Record<DopamineProfileType, DopamineArchetype> = {
  seeker: {
    key: "seeker",
    name: "Dopamin Avcısı",
    emoji: "🔮",
    tagline: "Yenilik senin yakıtın",
    description: "Beynin sürekli yeni uyaranlar arıyor. Keşfetmek, öğrenmek ve yenilik seni motive ediyor. Rutin ve monotonluk düşmanın, çeşitlilik en iyi arkadaşın.",
    neuroscienceInsight: "Dopamin reseptörlerinin yenilik uyaranlarına yüksek duyarlılığı var. Bu, D4 reseptör aktivitesiyle ilişkili olabilir - araştırmalar 'yenilik arayışı' genlerinin DEHB'de daha yaygın olduğunu gösteriyor.",
    strengths: [
      "Yaratıcı problem çözme",
      "Hızlı öğrenme kapasitesi",
      "Girişimci ruh",
      "Çok yönlü ilgi alanları",
      "Değişime uyum sağlama"
    ],
    challenges: [
      "Projeleri bitirmek",
      "Rutin işlere odaklanmak",
      "Taahhütlere sadık kalmak",
      "Parlak obje sendromu",
      "Uzun vadeli planlama"
    ],
    strategies: [
      "Rutin görevlere 'yenilik enjeksiyonları' ekle",
      "Mikro-değişikliklerle monotonluğu kır",
      "Öğrenme hedeflerini işlere entegre et",
      "Gamifikasyon kullan"
    ],
    idealCoachingStyle: "Dinamik, çeşitli yaklaşımlar; sık geri bildirim; yeni stratejiler denemeye açık",
    recommendedTools: ["Rastgele görev seçici", "Öğrenme izleyici", "Streak sistemi"]
  },
  sprinter: {
    key: "sprinter",
    name: "Hız Koşucusu",
    emoji: "⚡",
    tagline: "Kısa mesafe şampiyonu",
    description: "Yoğun, kısa süreli çalışma dönemlerinde parlıyorsun. Uzun maratonlar değil, sprint'ler senin için. Aciliyet seni harekete geçiriyor.",
    neuroscienceInsight: "Prefrontal korteks aktivasyonu kısa süreli yoğunlukta optimal. Norepinefrin ve dopamin seviyeleri 'aciliyet' durumunda dengeleniyor - bu yüzden deadline'lar motivasyon kaynağı.",
    strengths: [
      "Kriz anında performans",
      "Hızlı karar verme",
      "Yoğun üretkenlik dönemleri",
      "Son dakika başarıları",
      "Baskı altında yaratıcılık"
    ],
    challenges: [
      "Uzun vadeli projeler",
      "Tutarlı çalışma ritmi",
      "Erken başlamak",
      "Enerji yönetimi",
      "Tükenmişlik riski"
    ],
    strategies: [
      "Yapay deadline'lar oluştur",
      "Pomodoro tekniği (kısa sprint'ler)",
      "Büyük görevleri mikro-sprint'lere böl",
      "Toparlanma süreleri planla"
    ],
    idealCoachingStyle: "Kısa, yoğun seanslar; somut hedefler; enerji döngülerini takip",
    recommendedTools: ["Sprint zamanlayıcı", "Deadline oluşturucu", "Enerji takibi"]
  },
  diver: {
    key: "diver",
    name: "Derin Dalıcı",
    emoji: "🌊",
    tagline: "Derinliklerin efendisi",
    description: "Hiperfokus senin süper gücün. İlgini çeken konularda saatlerce kaybolabiliyorsun. Sorun: yüzeye çıkmak ve geçiş yapmak.",
    neuroscienceInsight: "Güçlü hiperfokus kapasitesi, prefrontal korteksin belirli uyaranlara 'kilitlenmesiyle' ilişkili. Default mode network ve task-positive network arasındaki geçişlerde zorlanma tipik.",
    strengths: [
      "Derin uzmanlık geliştirme",
      "Kaliteli, detaylı iş çıkarma",
      "Karmaşık problemlerde sebat",
      "Tutku odaklı öğrenme",
      "Flow state kolaylığı"
    ],
    challenges: [
      "Görevler arası geçiş",
      "Zaman algısı kayması",
      "Önceliklendirme",
      "İhtiyaçları ihmal etme",
      "Geri çekilme zorluğu"
    ],
    strategies: [
      "Geçiş ritüelleri oluştur",
      "Zamanlayıcı hatırlatmaları",
      "'Surface break' planla",
      "Öncelik matrisi kullan"
    ],
    idealCoachingStyle: "Derinlik sağlayan ama yüzey çıkışlarını destekleyen; geçiş stratejileri odaklı",
    recommendedTools: ["Akıllı hatırlatıcılar", "Geçiş zamanlayıcısı", "Öncelik matrisi"]
  },
  juggler: {
    key: "juggler",
    name: "Hokkabaz",
    emoji: "🎪",
    tagline: "Çoklu görev virtüözü",
    description: "Aynı anda birden fazla şeyle uğraşmak seni motive ediyor. Tek bir şeye odaklanmak sıkıcı, çeşitlilik şart. Sorun: hiçbirini bitirememek.",
    neuroscienceInsight: "Çoklu uyaran işleme kapasitesi yüksek. Ancak bu 'paralel işleme' illüzyonu olabilir - aslında hızlı geçişler yapıyorsun. Bu geçişler bilişsel kaynak tüketiyor.",
    strengths: [
      "Çoklu proje yönetimi",
      "Esneklik",
      "Bağlantı kurma yeteneği",
      "Çeşitli beceriler",
      "Adaptasyon"
    ],
    challenges: [
      "Tamamlama oranı",
      "Derinlik vs genişlik",
      "Bilişsel yorgunluk",
      "Önceliklendirme",
      "Dağılma"
    ],
    strategies: [
      "Maksimum 3 aktif proje kuralı",
      "Tema günleri (aynı tip işler)",
      "Bilinçli geçiş noktaları",
      "İlerleme görselleştirmesi"
    ],
    idealCoachingStyle: "Yapı sağlayan ama çeşitliliğe izin veren; önceliklendirme desteği",
    recommendedTools: ["Proje portföyü", "Tema planlayıcı", "İlerleme panosu"]
  },
  dreamer: {
    key: "dreamer",
    name: "Hayalci",
    emoji: "💭",
    tagline: "İç evrenin sonsuz",
    description: "Zengin bir iç dünyan var. Hayal kurmak, planlamak, düşünmek seni tatmin ediyor. Bazen dış dünyaya dönmek ve eyleme geçmek zorlaşıyor.",
    neuroscienceInsight: "Default Mode Network (DMN) aktivitesi yüksek. Bu yaratıcılık ve introspeksiyonla ilişkili ama dış görevlere odaklanmayı zorlaştırabilir. Zihin gezintisi sık ve yoğun.",
    strengths: [
      "Yaratıcı vizyon",
      "Büyük resmi görme",
      "İç motivasyon",
      "Empati ve duyarlılık",
      "Özgün düşünce"
    ],
    challenges: [
      "Eyleme geçmek",
      "Pratik detaylar",
      "Dikkat dağılması (içsel)",
      "Somut çıktılar",
      "Dış dünyayla bağlantı"
    ],
    strategies: [
      "Hayal-eylem köprüleri kur",
      "Mikro-eylemlerle başla",
      "Düşünceleri yakalama sistemi",
      "Dış hesap verebilirlik"
    ],
    idealCoachingStyle: "Vizyon destekleyen ama eyleme taşıyan; düşünce-aksiyon bağlantısı kuran",
    recommendedTools: ["Düşünce yakalayıcı", "Mikro-görev oluşturucu", "Vizyon panosu"]
  },
  reactor: {
    key: "reactor",
    name: "Reaktör",
    emoji: "🎯",
    tagline: "Tepki gücü yüksek",
    description: "Dış uyaranlara güçlü tepki veriyorsun. Çevre, insanlar, olaylar seni derinden etkiliyor. Bu duyarlılık hem güç hem zorluk.",
    neuroscienceInsight: "Amigdala ve duygusal işleme merkezleri daha reaktif. Çevresel uyaranlara ve sosyal ipuçlarına yüksek duyarlılık. Duygusal düzenleme prefrontal korteks desteği gerektiriyor.",
    strengths: [
      "Çevresel farkındalık",
      "Empati kapasitesi",
      "Hızlı tepki verme",
      "Sosyal duyarlılık",
      "Enerji okuma"
    ],
    challenges: [
      "Uyaran yönetimi",
      "Duygusal düzenleme",
      "Aşırı uyarılma",
      "Gürültü/kaos toleransı",
      "Sınır koyma"
    ],
    strategies: [
      "Çevre optimizasyonu",
      "Uyaran azaltma protokolleri",
      "Duygusal düzenleme teknikleri",
      "Enerji koruyan sınırlar"
    ],
    idealCoachingStyle: "Sakin, destekleyici; çevre stratejileri odaklı; duygu düzenleme desteği",
    recommendedTools: ["Ortam kontrolü", "Duygu izleyici", "Sınır planlayıcı"]
  }
};

// ============================================
// PROFİL HESAPLAMA
// ============================================

export interface DopamineProfile {
  id: string;
  archetypeKey: DopamineProfileType;
  archetype: DopamineArchetype;
  scores: {
    dopamineSystem: number;      // 0-100
    attentionRegulation: number;
    executiveFunction: number;
    emotionalRegulation: number;
    timePerception: number;
    energyManagement: number;
    externalSupport: number;
  };
  subScores: {
    noveltySeekingRaw: number;
    hyperfocusRaw: number;
    impulsivityRaw: number;
    timeBlindnessRaw: number;
    emotionalReactivityRaw: number;
  };
  insights: string[];
  recommendedPlan: "free" | "basic" | "pro" | "coaching";
  planReasoning: string;
  createdAt: Date;
}

export function calculateDopamineProfile(answers: Partial<QuizAnswers>): DopamineProfile {
  // Varsayılan değerlerle doldur
  const a = {
    noveltySeekingScore: 3,
    rewardSensitivityScore: 3,
    boredomThresholdScore: 3,
    delayedGratificationScore: 3,
    sustainedAttentionScore: 3,
    selectiveAttentionScore: 3,
    attentionShiftingScore: 3,
    hyperfocusFrequency: 3,
    taskInitiationScore: 3,
    planningScore: 3,
    workingMemoryScore: 3,
    inhibitionScore: 3,
    cognitiveFlexibilityScore: 3,
    emotionalReactivityScore: 3,
    frustrationToleranceScore: 3,
    rejectionSensitivityScore: 3,
    emotionalRecoveryScore: 3,
    timeBlindnessScore: 3,
    urgencyDependenceScore: 3,
    estimationAccuracyScore: 3,
    energyConsistencyScore: 3,
    externalStructureNeed: 3,
    socialAccountabilityScore: 3,
    environmentSensitivityScore: 3,
    ...answers
  };

  // Kategori skorlarını hesapla (0-100)
  const dopamineSystem = Math.round(
    ((a.noveltySeekingScore + a.rewardSensitivityScore + a.boredomThresholdScore + a.delayedGratificationScore) / 20) * 100
  );
  
  const attentionRegulation = Math.round(
    ((6 - a.sustainedAttentionScore) + (6 - a.selectiveAttentionScore) + a.attentionShiftingScore + a.hyperfocusFrequency) / 20 * 100
  );
  
  const executiveFunction = Math.round(
    ((a.taskInitiationScore + a.planningScore + a.workingMemoryScore + a.inhibitionScore + a.cognitiveFlexibilityScore) / 25) * 100
  );
  
  const emotionalRegulation = Math.round(
    ((a.emotionalReactivityScore + (6 - a.frustrationToleranceScore) + a.rejectionSensitivityScore + a.emotionalRecoveryScore) / 20) * 100
  );
  
  const timePerception = Math.round(
    ((a.timeBlindnessScore + a.urgencyDependenceScore + a.estimationAccuracyScore) / 15) * 100
  );
  
  const energyManagement = Math.round(
    ((6 - a.energyConsistencyScore) / 5) * 100
  );
  
  const externalSupport = Math.round(
    ((a.externalStructureNeed + a.socialAccountabilityScore + a.environmentSensitivityScore) / 15) * 100
  );

  // Arketip belirleme
  const signals: Record<DopamineProfileType, number> = {
    seeker: 0,
    sprinter: 0,
    diver: 0,
    juggler: 0,
    dreamer: 0,
    reactor: 0
  };

  // Seeker sinyalleri
  if (a.noveltySeekingScore >= 4) signals.seeker += 3;
  if (a.boredomThresholdScore >= 4) signals.seeker += 2;
  if (a.delayedGratificationScore >= 4) signals.seeker += 1;

  // Sprinter sinyalleri
  if (a.urgencyDependenceScore >= 4) signals.sprinter += 3;
  if (a.taskInitiationScore >= 4) signals.sprinter += 2;
  if (a.energyConsistencyScore <= 2) signals.sprinter += 1;

  // Diver sinyalleri
  if (a.hyperfocusFrequency >= 4) signals.diver += 3;
  if (a.attentionShiftingScore >= 4) signals.diver += 2;
  if (a.sustainedAttentionScore <= 2 && a.hyperfocusFrequency >= 4) signals.diver += 2;

  // Juggler sinyalleri
  if (a.cognitiveFlexibilityScore <= 2) signals.juggler += 2;
  if (a.boredomThresholdScore >= 4) signals.juggler += 2;
  if (a.attentionShiftingScore <= 2) signals.juggler += 2;

  // Dreamer sinyalleri
  if (a.taskInitiationScore >= 4) signals.dreamer += 2;
  if (a.sustainedAttentionScore <= 2) signals.dreamer += 2;
  if (a.planningScore >= 4) signals.dreamer += 1;

  // Reactor sinyalleri
  if (a.emotionalReactivityScore >= 4) signals.reactor += 3;
  if (a.environmentSensitivityScore >= 4) signals.reactor += 2;
  if (a.rejectionSensitivityScore >= 4) signals.reactor += 2;

  // En yüksek skoru bul
  let archetypeKey: DopamineProfileType = "seeker";
  let maxScore = 0;
  for (const [key, score] of Object.entries(signals)) {
    if (score > maxScore) {
      maxScore = score;
      archetypeKey = key as DopamineProfileType;
    }
  }

  const archetype = DOPAMINE_ARCHETYPES[archetypeKey];

  // Insights oluştur
  const insights: string[] = [];
  
  if (dopamineSystem >= 70) {
    insights.push("Dopamin sisteminiz yüksek aktivite gösteriyor - yenilik ve ödüle güçlü tepki veriyorsunuz.");
  }
  if (attentionRegulation >= 70) {
    insights.push("Dikkat düzenlemenizde zorluklar var - hiperfokus ve dikkat dağınıklığı arasında gel-git yaşıyorsunuz.");
  }
  if (executiveFunction >= 70) {
    insights.push("Yürütücü işlevlerde destek gerekiyor - başlama, planlama ve organize olma zorluk alanlarınız.");
  }
  if (emotionalRegulation >= 70) {
    insights.push("Duygusal düzenleme önemli bir çalışma alanı - duygularınız yoğun ve ani değişebiliyor.");
  }
  if (timePerception >= 70) {
    insights.push("Zaman algınız tipik DEHB örüntüsü gösteriyor - zaman körlüğü ve aciliyet bağımlılığı belirgin.");
  }

  // Plan önerisi
  let recommendedPlan: "free" | "basic" | "pro" | "coaching" = "basic";
  let planReasoning = "";

  const overallScore = (dopamineSystem + attentionRegulation + executiveFunction + emotionalRegulation + timePerception) / 5;
  
  if (overallScore >= 75 || emotionalRegulation >= 80) {
    recommendedPlan = "coaching";
    planReasoning = `${archetype.name} profili ve yüksek düzenleme ihtiyacınız göz önüne alındığında, birebir koçluk desteği en etkili olacaktır.`;
  } else if (overallScore >= 55) {
    recommendedPlan = "pro";
    planReasoning = `${archetype.name} profili için kapsamlı araçlar ve stratejiler içeren Pro plan önerilir.`;
  } else if (overallScore >= 35) {
    recommendedPlan = "basic";
    planReasoning = `Temel araçlar ve stratejilerle başlamak için Basic plan uygun görünüyor.`;
  } else {
    recommendedPlan = "free";
    planReasoning = `Ücretsiz planla başlayıp ihtiyaçlarınızı keşfedebilirsiniz.`;
  }

  return {
    id: `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    archetypeKey,
    archetype,
    scores: {
      dopamineSystem,
      attentionRegulation,
      executiveFunction,
      emotionalRegulation,
      timePerception,
      energyManagement,
      externalSupport
    },
    subScores: {
      noveltySeekingRaw: a.noveltySeekingScore,
      hyperfocusRaw: a.hyperfocusFrequency,
      impulsivityRaw: a.inhibitionScore,
      timeBlindnessRaw: a.timeBlindnessScore,
      emotionalReactivityRaw: a.emotionalReactivityScore
    },
    insights,
    recommendedPlan,
    planReasoning,
    createdAt: new Date()
  };
}

// ============================================
// LOCAL STORAGE
// ============================================

const QUIZ_PROGRESS_KEY = "dopalive_quiz_progress";
const PROFILE_KEY = "dopalive_profile";

export function saveQuizProgress(step: number, answers: Partial<QuizAnswers>): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(QUIZ_PROGRESS_KEY, JSON.stringify({ step, answers, savedAt: new Date().toISOString() }));
}

export function loadQuizProgress(): { step: number; answers: Partial<QuizAnswers> } | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(QUIZ_PROGRESS_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function clearQuizProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(QUIZ_PROGRESS_KEY);
}

export function saveProfile(profile: DopamineProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function loadProfile(): DopamineProfile | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(PROFILE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

// ============================================
// ANALYTICS
// ============================================

export type QuizAnalyticsEvent = 
  | { type: "quiz_started"; timestamp: Date }
  | { type: "section_completed"; sectionId: string; timestamp: Date }
  | { type: "quiz_completed"; duration: number; timestamp: Date }
  | { type: "profile_shown"; archetypeKey: DopamineProfileType; timestamp: Date }
  | { type: "plan_selected"; plan: string; timestamp: Date };

export function trackQuizEvent(event: QuizAnalyticsEvent): void {
  console.log("[DopaLive Quiz Analytics]", event);
}

// ============================================
// PRICING TIERS
// ============================================

export interface PricingTier {
  id: "free" | "basic" | "pro" | "coaching";
  name: string;
  price: number;
  priceAnnual: number;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "free",
    name: "Ücretsiz",
    price: 0,
    priceAnnual: 0,
    description: "Keşfet ve başla",
    features: [
      "Dopamin profil testi",
      "Temel içerikler",
      "Topluluk erişimi",
      "Haftalık newsletter"
    ],
    ctaText: "Ücretsiz Başla"
  },
  {
    id: "basic",
    name: "Temel",
    price: 99,
    priceAnnual: 79,
    description: "Günlük destek",
    features: [
      "Tüm ücretsiz özellikler",
      "AI odak asistanı",
      "Günlük planlayıcı",
      "Enerji takibi",
      "Temel stratejiler"
    ],
    ctaText: "Temel Plan"
  },
  {
    id: "pro",
    name: "Pro",
    price: 199,
    priceAnnual: 159,
    description: "Tam ekosistem",
    features: [
      "Tüm Temel özellikler",
      "Gelişmiş AI koçluğu",
      "Kişiselleştirilmiş stratejiler",
      "Body doubling oturumları",
      "Aylık grup koçluk",
      "Öncelikli destek"
    ],
    highlighted: true,
    ctaText: "Pro Plan"
  },
  {
    id: "coaching",
    name: "Koçluk",
    price: 599,
    priceAnnual: 499,
    description: "Birebir destek",
    features: [
      "Tüm Pro özellikler",
      "Haftalık 1:1 koçluk",
      "Kişisel DEHB koçu",
      "WhatsApp destek hattı",
      "Aile/partner seansları",
      "Yaşam alanı optimizasyonu"
    ],
    ctaText: "Koçluk Al"
  }
];
