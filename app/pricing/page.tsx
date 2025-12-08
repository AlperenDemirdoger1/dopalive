'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Check, X, Sparkles, Users, Zap, ArrowRight, ChevronDown, 
  Star, Brain, Target, Clock, MessageCircle, Headphones,
  Activity, Heart, Eye, Flame, Coffee, Radio, Cpu,
  Shield, Award, TrendingUp, Calendar, Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Plan yapısı - Coaching odaklı gerçekçi fiyatlandırma
const plans = [
  {
    id: "explorer",
    name: "Keşfet",
    tagline: "AI araçlarını dene",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Dopamin odaklı AI araçlarını keşfet, topluluğu tanı.",
    highlight: false,
    features: [
      { text: "AI Dopamin Koçu", detail: "Günde 5 mesaj", included: true },
      { text: "Temel odak araçları", included: true },
      { text: "Topluluk erişimi", detail: "Salt okunur", included: "limited" },
      { text: "Body Doubling seansları", included: false },
      { text: "Akran Pod grubu", included: false },
      { text: "1:1 İnsan koçluk", included: false },
    ],
    cta: "Ücretsiz Başla",
    ctaVariant: "outline"
  },
  {
    id: "focus",
    name: "Odak",
    tagline: "AI + Body Doubling",
    monthlyPrice: 1190,
    annualPrice: 990,
    description: "Sınırsız AI desteği ve canlı Body Doubling seanslarıyla odaklan.",
    highlight: false,
    features: [
      { text: "Sınırsız AI Dopamin Koçu", detail: "7/24", included: true },
      { text: "Tüm odak araçları & şablonlar", included: true },
      { text: "Topluluk erişimi", detail: "Tam", included: true },
      { text: "Body Doubling seansları", detail: "Günlük 4+ seans", included: true },
      { text: "Akran Pod grubu", included: false },
      { text: "1:1 İnsan koçluk", included: false },
    ],
    cta: "7 Gün Ücretsiz Dene",
    ctaVariant: "secondary"
  },
  {
    id: "coaching",
    name: "Koçluk",
    tagline: "Tam sistem",
    monthlyPrice: 3900,
    annualPrice: 3900,
    description: "DEHB uzmanı koç + AI + Body Doubling + Pod. Projeni bitirmenin garantisi.",
    highlight: true,
    badge: "En Etkili",
    features: [
      { text: "Haftalık 1:1 koç seansları", detail: "45 dakika", included: true, premium: true },
      { text: "DEHB sertifikalı uzman koç", included: true, premium: true },
      { text: "Sınırsız AI Dopamin Koçu", included: true },
      { text: "Sınırsız Body Doubling", included: true },
      { text: "Eşleştirilmiş Pod grubu", detail: "4-5 kişi", included: true, premium: true },
      { text: "Öncelikli destek", detail: "24 saat", included: true },
      { text: "Dopamin haritası analizi", included: true, premium: true },
      { text: "İstediğin zaman iptal", included: true },
    ],
    cta: "Koçunla Eşleş",
    ctaVariant: "primary",
    savings: "₺8.000-12.000 geleneksel koçluktan %70 tasarruf"
  }
];

// Feature karşılaştırma tablosu
const featureCategories = [
  {
    name: "👤 İnsan Koçluk",
    description: "ADHD uzmanı sertifikalı koçlarla 1:1 çalışma",
    features: [
      { name: "Haftalık 1:1 koç seansları", explorer: false, focus: false, coaching: "45 dk/hafta" },
      { name: "ADHD sertifikalı koç", explorer: false, focus: false, coaching: true },
      { name: "Kişisel dopamin haritası", explorer: false, focus: false, coaching: true },
      { name: "Özelleştirilmiş strateji planı", explorer: false, focus: false, coaching: true },
    ]
  },
  {
    name: "🤖 AI Dopamin Koçu",
    description: "7/24 yanınızda olan akıllı asistan",
    features: [
      { name: "AI koç mesajları", explorer: "5/gün", focus: "Sınırsız", coaching: "Sınırsız + Öncelik" },
      { name: "Akıllı görev parçalama", explorer: false, focus: true, coaching: true },
      { name: "Düşük enerji desteği", explorer: false, focus: true, coaching: true },
      { name: "Kişiselleştirilmiş öneriler", explorer: "Temel", focus: "Gelişmiş", coaching: "Premium" },
    ]
  },
  {
    name: "👥 Body Doubling & Pod",
    description: "Birlikte çalışmanın gücü",
    features: [
      { name: "Canlı Body Doubling seansları", explorer: false, focus: "Günlük 4+", coaching: "Sınırsız" },
      { name: "Akran Pod grubu", explorer: false, focus: false, coaching: "4-5 kişi" },
      { name: "Haftalık Pod check-in", explorer: false, focus: false, coaching: true },
      { name: "Topluluk erişimi", explorer: "Salt okunur", focus: "Tam", coaching: "Tam + VIP" },
    ]
  },
  {
    name: "📊 Araçlar & Analitik",
    description: "Odak ve ilerleme takibi",
    features: [
      { name: "Odak araçları & şablonlar", explorer: "Temel", focus: "Tümü", coaching: "Tümü + Özel" },
      { name: "İlerleme dashboard'u", explorer: false, focus: true, coaching: true },
      { name: "Haftalık raporlar", explorer: false, focus: true, coaching: "Detaylı" },
      { name: "Dopamin analitikleri", explorer: false, focus: false, coaching: true },
    ]
  }
];

// SSS
const faqs = [
  {
    question: "İnsan koç ile AI koç arasındaki fark nedir?",
    answer: "AI Dopamin Koçumuz 7/24 erişilebilir, anlık görev parçalama ve motivasyon desteği sağlar. İnsan koçunuz ise ADHD sertifikalı bir uzman olup haftalık 45 dakikalık 1:1 seanslarla derin strateji çalışması, duygusal destek ve uzun vadeli hedef belirleme sunar. Koçluk planında ikisini birlikte kullanırsınız."
  },
  {
    question: "Koçlar gerçekten ADHD uzmanı mı?",
    answer: "Evet. Tüm koçlarımız en az 3 yıl koçluk deneyimine sahip, akredite sertifikalı profesyonellerdir. Ek olarak 40 saatlik ADHD uzmanlık programımızı tamamlarlar. Başvuranların sadece %8'ini kabul ediyoruz. Çoğunun kendisi de ADHD deneyimi var."
  },
  {
    question: "Body Doubling nedir ve nasıl çalışır?",
    answer: "Body Doubling, başka birinin yanında çalışarak odaklanmayı kolaylaştıran kanıtlanmış bir ADHD tekniğidir. Canlı video seanslarımızda dünya genelinden insanlarla birlikte çalışırsınız. Günde 4+ seans (sabah, öğle, akşam, gece), 30-60-90 dakikalık bloklar halinde."
  },
  {
    question: "Pod grubu nasıl çalışıyor?",
    answer: "Koçluk planında 4-5 kişilik bir Pod grubuna atanırsınız. Benzer hedefler ve çalışma tarzına sahip kişilerle eşleştirilirsiniz. Haftalık check-in'lerde birbirinize hesap verirsiniz, kazanımları kutlarsınız ve zorluklarda destek olursunuz."
  },
  {
    question: "Geleneksel koçluktan neden bu kadar uygun?",
    answer: "Geleneksel 1:1 ADHD koçluğu seans başına ₺2.000-3.000, ayda ₺8.000-12.000 tutar. Biz uzman koçluğu AI desteği, body doubling ve akran hesap verebilirliğiyle birleştirerek maliyeti düşürüyor, etkinliği artırıyoruz. Üstelik sadece 1:1 değil, tam bir ekosistem alıyorsunuz."
  },
  {
    question: "Ücretsiz deneme nasıl işliyor?",
    answer: "Odak planı için 7 günlük ücretsiz deneme sunuyoruz. Kredi kartı bilgisi istiyoruz ancak deneme süresince ücret almıyoruz. İptal etmezseniz, 7. günden sonra seçtiğiniz plan başlar. Koçluk planında deneme yerine 30 gün para iade garantisi var."
  },
  {
    question: "İstediğim zaman iptal edebilir miyim?",
    answer: "Evet. Tüm planlar aylık faturalandırılır ve bir sonraki fatura döngünüzden önce istediğiniz zaman iptal edebilirsiniz. Koçluk planında ayrıca 30 gün para iade garantisi var — memnun kalmazsanız soru sormadan iade."
  }
];

// Testimonials - Koçluk odaklı
const testimonials = [
  {
    quote: "Elif koçum olmadan bu uygulamayı asla çıkaramazdım. 2 yıldır erteliyordum, 8 haftada production'a çıktı.",
    author: "Mert K.",
    role: "Indie Developer",
    plan: "Koçluk",
    avatar: "M",
    result: "Uygulama lansmanı"
  },
  {
    quote: "Body Doubling seansları tek başına bile buna değer. Ama AI + koç kombinasyonu bambaşka bir seviye.",
    author: "Selin A.",
    role: "UX Designer",
    plan: "Koçluk",
    avatar: "S",
    result: "3 freelance proje"
  },
  {
    quote: "Pod grubum artık gerçek arkadaşlarım. Birbirimizi her hafta sorumlu tutuyoruz.",
    author: "Can T.",
    role: "Content Creator",
    plan: "Koçluk",
    avatar: "C",
    result: "YouTube kanalı açıldı"
  }
];

// Components
const FeatureItem = ({ text, detail, included, premium }: { text: string; detail?: string; included: boolean | string; premium?: boolean }) => {
  const getIcon = () => {
    if (included === true) return <Check className={cn("w-4 h-4", premium ? "text-primary" : "text-emerald-400")} />;
    if (included === "limited") return <Check className="w-4 h-4 text-warning" />;
    return <X className="w-4 h-4 text-muted-foreground" />;
  };

  return (
    <li className="flex items-start gap-3 text-sm">
      <span className="mt-0.5 flex-shrink-0">{getIcon()}</span>
      <div>
        <span className={cn(
          included ? "text-foreground/80" : "text-muted-foreground",
          premium && "font-medium"
        )}>{text}</span>
        {detail && (
          <span className={cn(
            "ml-1 text-xs",
            included ? (premium ? "text-primary/60" : "text-muted-foreground") : "text-muted-foreground"
          )}>({detail})</span>
        )}
      </div>
    </li>
  );
};

const PricingCard = ({ plan, index }: { plan: typeof plans[0]; index: number }) => {
  const price = plan.monthlyPrice;
  const isFree = plan.monthlyPrice === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "relative group rounded-2xl transition-all duration-500 flex flex-col",
        "border backdrop-blur-xl overflow-hidden",
        plan.highlight
          ? "bg-gradient-to-b from-primary/[0.08] via-accent/[0.04] to-transparent border-primary/40 md:scale-105"
          : "bg-card border-border hover:border-primary/30"
      )}
    >
      {/* Top accent */}
      {plan.highlight && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
      )}
      
      {/* Badge */}
      {plan.badge && (
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium bg-gradient-warm text-white">
          {plan.badge}
        </div>
      )}
      
      <div className="p-6 md:p-8 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{plan.tagline}</p>
          <h3 className={cn(
            "text-2xl font-semibold",
            plan.highlight ? "text-foreground" : "text-foreground"
          )}>{plan.name}</h3>
        </div>
        
        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline gap-1">
            {!isFree && <span className="text-muted-foreground text-lg">₺</span>}
            <motion.span
              key={price}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "font-bold text-foreground",
                plan.highlight ? "text-5xl" : "text-4xl"
              )}
            >
              {isFree ? "Ücretsiz" : price.toLocaleString('tr-TR')}
            </motion.span>
            {!isFree && <span className="text-muted-foreground text-sm">/ay</span>}
          </div>
        </div>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {plan.description}
        </p>
        
        {/* Savings badge for coaching */}
        {plan.savings && (
          <div className="mb-6 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-xs text-emerald-400">{plan.savings}</p>
          </div>
        )}
        
        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "w-full py-3.5 rounded-xl font-medium text-sm transition-all duration-300 mb-6",
            plan.ctaVariant === "primary" && "bg-gradient-to-r from-primary to-accent text-foreground shadow-lg shadow-primary/20",
            plan.ctaVariant === "secondary" && "bg-white/10 text-foreground hover:bg-white/15 border border-white/10",
            plan.ctaVariant === "outline" && "bg-transparent text-foreground/70 hover:text-foreground border border-white/10 hover:border-white/20"
          )}
        >
          {plan.cta}
        </motion.button>
        
        {/* Features */}
        <ul className="space-y-3 flex-1">
          {plan.features.map((feature, i) => (
            <FeatureItem key={i} {...feature} />
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const FeatureTable = () => (
  <div className="overflow-x-auto -mx-4 md:mx-0">
    {featureCategories.map((category, catIndex) => (
      <div key={catIndex} className="mb-8">
        <div className="mb-4 px-4 md:px-0">
          <h3 className="text-lg font-semibold text-foreground mb-1">{category.name}</h3>
          <p className="text-sm text-muted-foreground">{category.description}</p>
        </div>
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground w-2/5">Özellik</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground w-1/5">Keşfet</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground w-1/5">Odak</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-primary w-1/5">Koçluk</th>
            </tr>
          </thead>
          <tbody>
            {category.features.map((feature, i) => (
              <motion.tr
                key={feature.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-border hover:bg-card transition-colors"
              >
                <td className="py-3 px-4 text-sm text-foreground/70">{feature.name}</td>
                <td className="py-3 px-4 text-center">
                  <TableValue value={feature.explorer} />
                </td>
                <td className="py-3 px-4 text-center">
                  <TableValue value={feature.focus} />
                </td>
                <td className="py-3 px-4 text-center bg-gradient-warm/[0.02]">
                  <TableValue value={feature.coaching} highlight />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
  </div>
);

const TableValue = ({ value, highlight }: { value: boolean | string; highlight?: boolean }) => {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className={cn("w-5 h-5 mx-auto", highlight ? "text-primary" : "text-emerald-400")} />
    ) : (
      <X className="w-5 h-5 mx-auto text-muted-foreground" />
    );
  }
  return (
    <span className={cn("text-sm", highlight ? "text-primary font-medium" : "text-foreground/70")}>
      {value}
    </span>
  );
};

const FAQItem = ({ faq, index }: { faq: typeof faqs[0]; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-border"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="text-foreground font-medium pr-4 group-hover:text-primary transition-colors">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-muted-foreground leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="p-6 rounded-2xl bg-card border border-border backdrop-blur-xl"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
        ))}
      </div>
      <span className="text-xs px-2 py-1 rounded-full bg-gradient-warm/20 text-primary">
        {testimonial.plan}
      </span>
    </div>
    <p className="text-foreground/70 leading-relaxed mb-4 italic">"{testimonial.quote}"</p>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 flex items-center justify-center text-primary font-medium">
          {testimonial.avatar}
        </div>
        <div>
          <p className="text-foreground text-sm font-medium">{testimonial.author}</p>
          <p className="text-muted-foreground text-xs">{testimonial.role}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-emerald-400 text-xs font-medium">{testimonial.result}</p>
      </div>
    </div>
  </motion.div>
);

// Navigation
const PricingNav = () => (
  <motion.nav
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="fixed top-0 left-0 right-0 z-50 px-5 md:px-8 py-5 bg-background/80 backdrop-blur-xl border-b border-border"
  >
    <div className="max-w-[1200px] mx-auto flex items-center justify-between">
      <Link href="/hero" className="flex items-center gap-2 group">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center"
        >
          <Flame className="w-5 h-5 text-white" />
        </motion.div>
        <span className="text-foreground text-lg font-medium tracking-tight">
          Dopa<span className="text-primary">Live</span>
        </span>
      </Link>

      <div className="flex items-center gap-3">
        <Link href="/coaching">
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Koçluk Nasıl Çalışır?
          </motion.button>
        </Link>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "px-5 py-2.5 rounded-xl",
            "bg-gradient-to-r from-primary to-accent",
            "text-foreground text-sm font-medium",
            "shadow-lg shadow-primary/20"
          )}
        >
          Koç Bul
        </motion.button>
      </div>
    </div>
  </motion.nav>
);

// Main Page
export default function PricingPage() {
  const isAnnual = false;
  
  return (
    <main className="min-h-screen relative overflow-hidden bg-background">
      {/* Ambient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute w-[800px] h-[400px] bg-gradient-warm opacity-[0.03] top-[-150px] left-1/2 -translate-x-1/2 rounded-full blur-[150px]"
        />
        <div className="absolute w-[500px] h-[500px] bg-accent opacity-[0.02] top-[40%] left-[-200px] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px]" />
      </div>
      
      {/* Navigation provided by global SiteHeader from layout */}
      
      {/* Hero */}
      <section className="pt-32 pb-8 px-5 md:px-8">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-warm/[0.08] border border-primary/15 text-xs text-primary/90">
              <Activity className="w-3.5 h-3.5" />
              Dopamin Odaklı Koçluk Sistemi
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6 tracking-tight"
          >
            İnsan koç + AI + Body Doubling
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-medium">
              tam sistem.
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            Geleneksel ADHD koçluğunun %70 altında fiyatla, 3 kat daha etkili bir sistem.
            <br />
            <span className="text-muted-foreground">Projelerini bitirmenin zamanı geldi.</span>
          </motion.p>
          
        </div>
      </section>
      
      {/* Pricing Cards */}
      <section className="py-12 px-5 md:px-8">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan, i) => (
              <PricingCard key={plan.id} plan={plan} isAnnual={isAnnual} index={i} />
            ))}
          </div>
        </div>
      </section>
      
      {/* What's included in Coaching - Highlight */}
      <section className="py-16 px-5 md:px-8">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/[0.08] to-accent/[0.04] border border-primary/20"
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-light text-foreground mb-3">
                Koçluk planında neler var?
              </h2>
              <p className="text-muted-foreground font-light">
                ₺3.900/ay — geleneksel koçluğun 3'te 1'i fiyatına
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Users,
                  title: "Haftalık 1:1 Koç Seansları",
                  description: "ADHD sertifikalı uzman koçunuzla 45 dakikalık derin çalışma seansları. Strateji, hesap verebilirlik ve duygusal destek.",
                  highlight: true
                },
                {
                  icon: Cpu,
                  title: "7/24 AI Dopamin Koçu",
                  description: "Anlık görev parçalama, motivasyon desteği ve düşük enerji anlarında yol gösterici. Her zaman yanınızda.",
                  highlight: false
                },
                {
                  icon: Eye,
                  title: "Sınırsız Body Doubling",
                  description: "Günde 4+ canlı odak seansı. Dünya genelinden insanlarla birlikte çalışarak anında hesap verebilirlik.",
                  highlight: false
                },
                {
                  icon: MessageCircle,
                  title: "Eşleştirilmiş Pod Grubu",
                  description: "4-5 kişilik destek grubunuz. Haftalık check-in'ler, zafer kutlamaları ve zorluklarda destek.",
                  highlight: true
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={cn(
                    "p-5 rounded-xl transition-all",
                    item.highlight 
                      ? "bg-gradient-warm/[0.08] border border-primary/20" 
                      : "bg-card border border-border"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                      item.highlight ? "bg-gradient-warm/20" : "bg-muted"
                    )}>
                      <item.icon className={cn(
                        "w-5 h-5",
                        item.highlight ? "text-primary" : "text-muted-foreground"
                      )} />
                    </div>
                    <div>
                      <h3 className="text-foreground font-medium mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm font-light leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Link
                href="/start"
                className="group inline-flex flex-col items-center justify-center px-10 py-5 rounded-2xl bg-gradient-warm text-white hover:opacity-90 transition-all shadow-warm-lg hover:scale-[1.02] mx-auto"
              >
                <span className="flex items-center gap-2 text-lg font-bold tracking-wide">
                  KOÇUNLA EŞLEŞ
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-white/80 text-sm font-normal mt-1">
                  30 gün para iade garantisi
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Feature Comparison */}
      <section className="py-20 px-5 md:px-8 border-t border-border">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4">
              Detaylı Karşılaştırma
            </h2>
            <p className="text-muted-foreground font-light">
              Her planda tam olarak ne alıyorsun
            </p>
          </motion.div>
          
          <FeatureTable />
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 px-5 md:px-8 border-t border-border">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4">
              Koçluk üyelerimiz ne diyor?
            </h2>
            <p className="text-muted-foreground font-light">
              Gerçek projeler, gerçekten bitirilmiş
            </p>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12"
          >
            {[
              { value: "87%", label: "8 haftada bitirir" },
              { value: "4.9", label: "Koç puanı" },
              { value: "2.3x", label: "Tek başına çalışmaktan hızlı" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-4xl font-light">{stat.value}</p>
                <p className="text-muted-foreground text-sm font-light mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard key={i} testimonial={testimonial} index={i} />
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-20 px-5 md:px-8 border-t border-border">
        <div className="max-w-[700px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4">
              Sık Sorulan Sorular
            </h2>
          </motion.div>
          
          <div>
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-24 px-5 md:px-8 border-t border-border">
        <div className="max-w-[600px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 flex items-center justify-center">
              <Target className="w-10 h-10 text-primary" />
            </div>
            
            <h2 className="text-2xl md:text-4xl font-light text-foreground mb-4">
              Projelerini bitirmeye hazır mısın?
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed font-light">
              5 dakikalık eşleştirme testini çöz, 48 saat içinde koçunla tanış.
            </p>
            
            <Link
              href="/start"
              className="group inline-flex flex-col items-center justify-center px-10 py-5 rounded-2xl bg-gradient-warm text-white hover:opacity-90 transition-all shadow-warm-lg hover:scale-[1.02]"
            >
              <span className="flex items-center gap-2 text-lg font-bold tracking-wide">
                KOÇUNLA EŞLEŞ
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-white/80 text-sm font-normal mt-1">
                30 gün para iade garantisi
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-5 md:px-8 border-t border-border">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <span className="text-muted-foreground text-sm font-medium">DopaLive</span>
          </div>
          <p className="text-muted-foreground text-xs font-light">
            © {new Date().getFullYear()} DopaLive. ADHD beyni için tasarlandı.
          </p>
        </div>
      </footer>
    </main>
  );
}
