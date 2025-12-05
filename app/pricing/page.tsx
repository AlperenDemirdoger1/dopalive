'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Check, X, Sparkles, Users, Zap, ArrowRight, ChevronDown, 
  Star, Brain, Target, Clock, MessageCircle, Headphones,
  Activity, Heart, Eye, Flame, Coffee, Radio
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Nörokimyasal değer önerisi için ikonlar ve açıklamalar
const neurochemicalBenefits = [
  {
    icon: Flame,
    title: "Dopamin Döngüsü",
    description: "Küçük kazanımlarla sürekli dopamin salgısı",
    color: "#f5d4a0"
  },
  {
    icon: Heart,
    title: "Oksitosin Bağı",
    description: "Body Doubling ile sosyal bağlantı hissi",
    color: "#ff6b9d"
  },
  {
    icon: Activity,
    title: "Norepinefrin Odağı",
    description: "AI koçluk ile anlık dikkat desteği",
    color: "#4ecdc4"
  }
];

// Plan yapısı - AI Araçları ve Body Doubling net ayrımı
const plans = [
  {
    id: "free",
    name: "Başlangıç",
    tagline: "AI ile tanış",
    monthlyPrice: 0,
    annualPrice: 0,
    category: "ai",
    highlight: false,
    features: {
      ai: [
        { text: "AI Odak Koçu", detail: "Günde 10 mesaj", included: true },
        { text: "Temel odak araçları", detail: "Pomodoro, görev listesi", included: true },
        { text: "Günlük check-in hatırlatıcı", detail: "", included: true },
        { text: "3 proje takibi", detail: "", included: true },
      ],
      bodyDoubling: [
        { text: "Topluluk erişimi", detail: "Salt okunur", included: "limited" },
        { text: "Canlı odak oturumları", detail: "", included: false },
        { text: "Body Doubling eşleşme", detail: "", included: false },
        { text: "Grup accountability", detail: "", included: false },
      ]
    },
    cta: "Ücretsiz Başla",
    ctaVariant: "outline"
  },
  {
    id: "focus",
    name: "Odak",
    tagline: "Sınırsız AI gücü",
    monthlyPrice: 149,
    annualPrice: 99,
    category: "ai",
    highlight: false,
    badge: "En Popüler",
    features: {
      ai: [
        { text: "Sınırsız AI Koç erişimi", detail: "7/24 destek", included: true },
        { text: "Tüm odak araçları", detail: "20+ şablon dahil", included: true },
        { text: "Akıllı görev parçalama", detail: "AI destekli", included: true },
        { text: "Sınırsız proje", detail: "", included: true },
        { text: "İlerleme analitiği", detail: "Haftalık raporlar", included: true },
        { text: "Kişiselleştirilmiş öneriler", detail: "DEHB profiline göre", included: true },
      ],
      bodyDoubling: [
        { text: "Topluluk erişimi", detail: "Tam erişim", included: true },
        { text: "Canlı odak oturumları", detail: "Haftalık 2 saat", included: "limited" },
        { text: "Body Doubling eşleşme", detail: "", included: false },
        { text: "Grup accountability", detail: "", included: false },
      ]
    },
    cta: "7 Gün Ücretsiz Dene",
    ctaVariant: "primary"
  },
  {
    id: "together",
    name: "Birlikte",
    tagline: "AI + İnsan gücü",
    monthlyPrice: 349,
    annualPrice: 249,
    category: "hybrid",
    highlight: true,
    badge: "Maksimum Etki",
    features: {
      ai: [
        { text: "Odak planındaki her şey", detail: "", included: true },
        { text: "Öncelikli AI yanıtları", detail: "Hızlı response", included: true },
        { text: "Gelişmiş analitik", detail: "Nörokimyasal içgörüler", included: true },
      ],
      bodyDoubling: [
        { text: "Sınırsız canlı odak oturumları", detail: "Her gün", included: true },
        { text: "1:1 Body Doubling eşleşme", detail: "Kişiselleştirilmiş", included: true },
        { text: "4 kişilik Pod grubu", detail: "Haftalık check-in", included: true },
        { text: "Aylık 1:1 koçluk", detail: "İnsan koç ile", included: true },
        { text: "Öncelikli destek", detail: "24 saat içinde yanıt", included: true },
      ]
    },
    cta: "Pod'uma Katıl",
    ctaVariant: "accent"
  }
];

// Feature karşılaştırma tablosu
const featureCategories = [
  {
    name: "🤖 AI Odak Araçları",
    description: "Dopamin optimizasyonu için AI destekli araçlar",
    features: [
      { name: "AI Odak Koçu", free: "10/gün", focus: "Sınırsız", together: "Sınırsız + Öncelik" },
      { name: "Akıllı görev parçalama", free: false, focus: true, together: true },
      { name: "Kişiselleştirilmiş öneriler", free: false, focus: true, together: true },
      { name: "İlerleme analitiği", free: "Temel", focus: "Gelişmiş", together: "Nörokimyasal" },
      { name: "Odak şablonları", free: "5", focus: "20+", together: "20+ Özel" },
      { name: "Proje takibi", free: "3", focus: "Sınırsız", together: "Sınırsız" },
    ]
  },
  {
    name: "👥 Body Doubling & İnsan Bağlantısı",
    description: "Oksitosin ve sosyal hesap verebilirlik",
    features: [
      { name: "Topluluk erişimi", free: "Salt okunur", focus: "Tam", together: "Tam + VIP" },
      { name: "Canlı odak oturumları", free: false, focus: "2 saat/hafta", together: "Sınırsız" },
      { name: "Body Doubling eşleşme", free: false, focus: false, together: "1:1 Eşleşme" },
      { name: "Accountability Pod", free: false, focus: false, together: "4 kişi" },
      { name: "İnsan koçluk", free: false, focus: false, together: "Aylık 1:1" },
      { name: "Öncelikli destek", free: false, focus: false, together: "24 saat" },
    ]
  }
];

// SSS
const faqs = [
  {
    question: "Body Doubling tam olarak nedir?",
    answer: "Body Doubling, başka birinin yanında çalışarak odaklanmayı kolaylaştıran bir tekniktir. DEHB'li bireyler için özellikle etkilidir çünkü sosyal varlık, beynin dikkat sistemini aktive eder ve oksitosin salınımını tetikler. DopaLive'da hem canlı video oturumları hem de eşleştirilmiş çalışma arkadaşları ile bu deneyimi yaşarsınız."
  },
  {
    question: "AI Koç ile insan koç arasındaki fark nedir?",
    answer: "AI Koçumuz 7/24 erişilebilir, anlık görev parçalama ve motivasyon desteği sağlar - dopamin döngünüzü optimize eder. İnsan koçumuz ise daha derin stratejik planlama, duygusal destek ve uzun vadeli hedef belirleme için aylık 1:1 seanslar sunar. Birlikte planında ikisinin gücünü birleştirirsiniz."
  },
  {
    question: "Nörokimyasal içgörüler ne anlama geliyor?",
    answer: "Birlikte planında, çalışma paternlerinizi analiz ederek dopamin, norepinefrin ve oksitosin seviyelerinizi optimize edecek öneriler sunuyoruz. Örneğin: en verimli saatleriniz, ideal mola süreleri, Body Doubling'in sizde yarattığı etki gibi içgörüler."
  },
  {
    question: "Pod grubu nasıl çalışıyor?",
    answer: "4 kişilik Pod grubunuz, benzer hedefler ve çalışma tarzına sahip kişilerle eşleştirilir. Haftalık check-in'lerde birbirinize hesap verirsiniz, kazanımları kutlarsınız ve zorluklarda destek olursunuz. Bu sosyal bağ, beynin ödül sistemini aktive ederek motivasyonu artırır."
  },
  {
    question: "Ücretsiz deneme nasıl işliyor?",
    answer: "Odak ve Birlikte planları için 7 günlük ücretsiz deneme sunuyoruz. Kredi kartı bilgisi istiyoruz ancak deneme süresince ücret almıyoruz. İptal etmezseniz, 7. günden sonra seçtiğiniz plan başlar."
  },
  {
    question: "Planlar arasında geçiş yapabilir miyim?",
    answer: "Evet! İstediğiniz zaman yükseltme veya düşürme yapabilirsiniz. Değişiklik bir sonraki fatura döneminde geçerli olur. Yıllık plandan aylığa geçerseniz, kalan süre için kredi alırsınız."
  },
  {
    question: "Para iade garantisi var mı?",
    answer: "Evet, tüm ücretli planlar için 30 gün para iade garantisi sunuyoruz. DopaLive sizin için çalışmıyorsa, soru sormadan paranızı iade ediyoruz."
  }
];

// Testimonials
const testimonials = [
  {
    quote: "AI Koç beni anlıyor, Body Doubling ise yalnız olmadığımı hissettiriyor. 2 yıldır ertelediğim projeyi 3 haftada bitirdim.",
    author: "Ayşe K.",
    role: "Freelance Tasarımcı",
    plan: "Birlikte",
    avatar: "A",
    metric: "3 hafta"
  },
  {
    quote: "Sabah Pod arkadaşlarımla check-in yapmak, kahvemden bile önce geliyor artık. Bu hesap verebilirlik hissi inanılmaz.",
    author: "Mehmet T.",
    role: "Yazılım Geliştirici",
    plan: "Birlikte",
    avatar: "M",
    metric: "%94 görev tamamlama"
  },
  {
    quote: "Sınırsız AI erişimi tek başına bile çok değerli. Görevlerimi parçalayınca her şey yapılabilir hale geliyor.",
    author: "Zeynep A.",
    role: "İçerik Üreticisi",
    plan: "Odak",
    avatar: "Z",
    metric: "10x verimlilik"
  }
];

// Components
const BillingToggle = ({ isAnnual, setIsAnnual }: { isAnnual: boolean; setIsAnnual: (v: boolean) => void }) => (
  <div className="flex items-center justify-center gap-4">
    <span className={cn(
      "text-sm transition-colors duration-300",
      !isAnnual ? "text-white" : "text-white/40"
    )}>Aylık</span>
    
    <button
      onClick={() => setIsAnnual(!isAnnual)}
      className={cn(
        "relative w-16 h-8 rounded-full transition-all duration-300",
        "bg-white/[0.06] border border-white/[0.08]",
        isAnnual && "bg-[#4ecdc4]/20 border-[#4ecdc4]/30"
      )}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn(
          "absolute top-1 w-6 h-6 rounded-full shadow-lg",
          isAnnual 
            ? "left-[34px] bg-[#4ecdc4]" 
            : "left-1 bg-white/80"
        )}
      />
    </button>
    
    <div className="flex items-center gap-2">
      <span className={cn(
        "text-sm transition-colors duration-300",
        isAnnual ? "text-white" : "text-white/40"
      )}>Yıllık</span>
      <span className="text-xs px-2 py-0.5 rounded-full bg-[#4ecdc4]/20 text-[#4ecdc4] border border-[#4ecdc4]/30">
        %33 Tasarruf
      </span>
    </div>
  </div>
);

const FeatureItem = ({ text, detail, included }: { text: string; detail?: string; included: boolean | string }) => {
  const getIcon = () => {
    if (included === true) return <Check className="w-4 h-4 text-[#4ecdc4]" />;
    if (included === "limited") return <Check className="w-4 h-4 text-[#f5d4a0]" />;
    return <X className="w-4 h-4 text-white/20" />;
  };

  return (
    <li className="flex items-start gap-3 text-sm">
      <span className="mt-0.5 flex-shrink-0">{getIcon()}</span>
      <div>
        <span className={cn(
          included ? "text-white/80" : "text-white/30"
        )}>{text}</span>
        {detail && (
          <span className={cn(
            "ml-1 text-xs",
            included ? "text-white/40" : "text-white/20"
          )}>({detail})</span>
        )}
      </div>
    </li>
  );
};

const PricingCard = ({ plan, isAnnual, index }: { plan: typeof plans[0]; isAnnual: boolean; index: number }) => {
  const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
  const isFree = plan.monthlyPrice === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "relative group rounded-2xl transition-all duration-500",
        "border backdrop-blur-xl overflow-hidden",
        plan.highlight
          ? "bg-gradient-to-b from-[#4ecdc4]/[0.08] via-[#f5d4a0]/[0.04] to-transparent border-[#4ecdc4]/30"
          : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]"
      )}
    >
      {/* Category indicator */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-1",
        plan.category === "ai" && "bg-gradient-to-r from-[#f5d4a0] to-[#f5d4a0]/50",
        plan.category === "hybrid" && "bg-gradient-to-r from-[#f5d4a0] via-[#ff6b9d] to-[#4ecdc4]"
      )} />
      
      {/* Badge */}
      {plan.badge && (
        <div className={cn(
          "absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium",
          plan.highlight
            ? "bg-[#4ecdc4] text-[#0a0a0a]"
            : "bg-[#f5d4a0]/20 text-[#f5d4a0] border border-[#f5d4a0]/20"
        )}>
          {plan.badge}
        </div>
      )}
      
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <p className="text-xs text-white/40 uppercase tracking-wider mb-1">{plan.tagline}</p>
          <h3 className={cn(
            "text-2xl font-bold",
            plan.highlight ? "text-[#4ecdc4]" : "text-white"
          )}>{plan.name}</h3>
        </div>
        
        {/* Price */}
        <div className="mb-8">
          <div className="flex items-baseline gap-1">
            {!isFree && <span className="text-white/40 text-lg">₺</span>}
            <motion.span
              key={price}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-white"
            >
              {isFree ? "Ücretsiz" : price}
            </motion.span>
            {!isFree && <span className="text-white/40 text-sm">/ay</span>}
          </div>
          {isAnnual && !isFree && (
            <p className="text-xs text-white/40 mt-2">
              Yıllık ₺{price * 12} · Aylık ₺{plan.monthlyPrice}'den tasarruf
            </p>
          )}
        </div>
        
        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "w-full py-3.5 rounded-xl font-medium text-sm transition-all duration-300 mb-8",
            plan.ctaVariant === "accent" && "bg-[#4ecdc4] text-[#0a0a0a] hover:bg-[#45b8b0] shadow-lg shadow-[#4ecdc4]/20",
            plan.ctaVariant === "primary" && "bg-[#f5d4a0] text-[#0a0a0a] hover:bg-[#e8c87a] shadow-lg shadow-[#f5d4a0]/20",
            plan.ctaVariant === "outline" && "bg-white/5 text-white hover:bg-white/10 border border-white/10"
          )}
        >
          {plan.cta}
        </motion.button>
        
        {/* AI Features */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-4 h-4 text-[#f5d4a0]" />
            <span className="text-xs font-medium text-[#f5d4a0] uppercase tracking-wider">AI Araçları</span>
          </div>
          <ul className="space-y-2.5">
            {plan.features.ai.map((feature, i) => (
              <FeatureItem key={i} {...feature} />
            ))}
          </ul>
        </div>
        
        {/* Body Doubling Features */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-[#ff6b9d]" />
            <span className="text-xs font-medium text-[#ff6b9d] uppercase tracking-wider">Body Doubling</span>
          </div>
          <ul className="space-y-2.5">
            {plan.features.bodyDoubling.map((feature, i) => (
              <FeatureItem key={i} {...feature} />
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const NeurochemicalCard = ({ benefit, index }: { benefit: typeof neurochemicalBenefits[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl group hover:border-white/[0.12] transition-all"
  >
    <div 
      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
      style={{ backgroundColor: `${benefit.color}15`, borderColor: `${benefit.color}30`, borderWidth: 1 }}
    >
      <benefit.icon className="w-6 h-6" style={{ color: benefit.color }} />
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
    <p className="text-sm text-white/50">{benefit.description}</p>
  </motion.div>
);

const FeatureTable = () => (
  <div className="overflow-x-auto -mx-4 md:mx-0">
    {featureCategories.map((category, catIndex) => (
      <div key={catIndex} className="mb-8">
        <div className="mb-4 px-4 md:px-0">
          <h3 className="text-lg font-semibold text-white mb-1">{category.name}</h3>
          <p className="text-sm text-white/40">{category.description}</p>
        </div>
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left py-3 px-4 text-sm font-medium text-white/50 w-1/4">Özellik</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-white/50 w-1/4">Başlangıç</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-[#f5d4a0] w-1/4">Odak</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-[#4ecdc4] w-1/4">Birlikte</th>
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
                className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-3 px-4 text-sm text-white/70">{feature.name}</td>
                <td className="py-3 px-4 text-center">
                  <TableValue value={feature.free} />
                </td>
                <td className="py-3 px-4 text-center bg-[#f5d4a0]/[0.02]">
                  <TableValue value={feature.focus} highlight="gold" />
                </td>
                <td className="py-3 px-4 text-center bg-[#4ecdc4]/[0.02]">
                  <TableValue value={feature.together} highlight="teal" />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
  </div>
);

const TableValue = ({ value, highlight }: { value: boolean | string; highlight?: "gold" | "teal" }) => {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className={cn(
        "w-5 h-5 mx-auto",
        highlight === "gold" && "text-[#f5d4a0]",
        highlight === "teal" && "text-[#4ecdc4]",
        !highlight && "text-green-400"
      )} />
    ) : (
      <X className="w-5 h-5 mx-auto text-white/20" />
    );
  }
  return (
    <span className={cn(
      "text-sm",
      highlight === "gold" && "text-[#f5d4a0]",
      highlight === "teal" && "text-[#4ecdc4]",
      !highlight && "text-white/70"
    )}>
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
      className="border-b border-white/[0.06]"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="text-white/90 font-medium pr-4 group-hover:text-[#f5d4a0] transition-colors">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-white/40 flex-shrink-0" />
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
            <p className="pb-5 text-white/50 leading-relaxed">
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
    className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-[#f5d4a0] text-[#f5d4a0]" />
        ))}
      </div>
      <span className={cn(
        "text-xs px-2 py-1 rounded-full",
        testimonial.plan === "Birlikte" 
          ? "bg-[#4ecdc4]/20 text-[#4ecdc4]" 
          : "bg-[#f5d4a0]/20 text-[#f5d4a0]"
      )}>
        {testimonial.plan} Planı
      </span>
    </div>
    <p className="text-white/70 leading-relaxed mb-4 italic">"{testimonial.quote}"</p>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#f5d4a0]/10 border border-[#f5d4a0]/20 flex items-center justify-center text-[#f5d4a0] font-medium">
          {testimonial.avatar}
        </div>
        <div>
          <p className="text-white/90 text-sm font-medium">{testimonial.author}</p>
          <p className="text-white/40 text-xs">{testimonial.role}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[#4ecdc4] text-sm font-semibold">{testimonial.metric}</p>
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
    className="fixed top-0 left-0 right-0 z-50 px-5 md:px-8 py-5"
  >
    <div className="max-w-[1200px] mx-auto flex items-center justify-between">
      <Link href="/hero" className="flex items-center gap-2 group">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center"
        >
          <div className="w-3 h-3 rounded-full border border-[#f5d4a0]/60" />
        </motion.div>
        <span className="text-white/80 text-base font-light tracking-tight">dopalive</span>
      </Link>

      <Link href="/hero">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "group px-4 py-2 rounded-lg",
            "bg-white/[0.04] border border-white/[0.06]",
            "hover:border-white/[0.12] transition-all duration-300"
          )}
        >
          <span className="text-xs text-white/60 group-hover:text-white/80 transition-colors">
            ← Ana Sayfa
          </span>
        </motion.button>
      </Link>
    </div>
  </motion.nav>
);

// Main Page
export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  
  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0a0a0a]">
      {/* Ambient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-[#0a0a0a] to-[#050505]" />
        
        {/* AI glow - gold */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute w-[500px] h-[300px] bg-[#f5d4a0] opacity-[0.03] top-[-100px] left-[20%] rounded-full blur-[120px]"
        />
        
        {/* Body Doubling glow - pink */}
        <div className="absolute w-[400px] h-[400px] bg-[#ff6b9d] opacity-[0.02] top-[30%] right-[-100px] rounded-full blur-[100px]" />
        
        {/* Hybrid glow - teal */}
        <div className="absolute w-[600px] h-[300px] bg-[#4ecdc4] opacity-[0.02] bottom-[20%] left-[-200px] rounded-full blur-[100px]" />
        
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      </div>
      
      <PricingNav />
      
      {/* Hero */}
      <section className="pt-32 pb-12 px-5 md:px-8">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs text-white/60">
              <Sparkles className="w-3.5 h-3.5 text-[#f5d4a0]" />
              DEHB beyni için optimize edildi
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Planını seç,{" "}
            <span className="bg-gradient-to-r from-[#f5d4a0] via-[#ff6b9d] to-[#4ecdc4] bg-clip-text text-transparent">
              odağını bul.
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            AI araçlarıyla dopamin döngünü optimize et, Body Doubling ile sosyal hesap verebilirlik kazan.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <BillingToggle isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
          </motion.div>
        </div>
      </section>
      
      {/* Neurochemical Value Props */}
      <section className="py-12 px-5 md:px-8">
        <div className="max-w-[900px] mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            {neurochemicalBenefits.map((benefit, i) => (
              <NeurochemicalCard key={i} benefit={benefit} index={i} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Cards */}
      <section className="py-12 px-5 md:px-8">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <PricingCard key={plan.id} plan={plan} isAnnual={isAnnual} index={i} />
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-xs text-white/40">
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 rounded bg-gradient-to-r from-[#f5d4a0] to-[#f5d4a0]/50" />
              <span>AI Odak Araçları</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 rounded bg-gradient-to-r from-[#f5d4a0] via-[#ff6b9d] to-[#4ecdc4]" />
              <span>AI + Body Doubling Hibrit</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Feature Comparison */}
      <section className="py-24 px-5 md:px-8 border-t border-white/[0.04]">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Detaylı Karşılaştırma
            </h2>
            <p className="text-white/50">
              AI araçları ve Body Doubling özelliklerini yan yana görün
            </p>
          </motion.div>
          
          <FeatureTable />
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-24 px-5 md:px-8 border-t border-white/[0.04]">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Kullanıcılarımız Ne Diyor?
            </h2>
            <p className="text-white/50">
              DEHB'li üreticiler DopaLive ile projelerini bitiriyor
            </p>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-4 mb-12"
          >
            {[
              { value: "2,400+", label: "Tamamlanan proje", color: "#f5d4a0" },
              { value: "%94", label: "Görev tamamlama", color: "#4ecdc4" },
              { value: "4.9/5", label: "Kullanıcı puanı", color: "#ff6b9d" },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <p className="text-2xl md:text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-xs md:text-sm text-white/40">{stat.label}</p>
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
      <section className="py-24 px-5 md:px-8 border-t border-white/[0.04]">
        <div className="max-w-[700px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Sık Sorulan Sorular
            </h2>
            <p className="text-white/50">
              Merak ettiğin her şeyin cevabı burada
            </p>
          </motion.div>
          
          <div>
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-24 px-5 md:px-8 border-t border-white/[0.04]">
        <div className="max-w-[600px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#f5d4a0]/20 via-[#ff6b9d]/10 to-[#4ecdc4]/20 border border-white/[0.06] flex items-center justify-center">
              <Target className="w-10 h-10 text-[#f5d4a0]" />
            </div>
            
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Projelerini bitirmeye hazır mısın?
            </h2>
            <p className="text-white/50 mb-8 leading-relaxed">
              2 dakikalık testimizi çöz, sana en uygun planı önerelim.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#f5d4a0] to-[#4ecdc4] text-[#0a0a0a] font-medium hover:opacity-90 transition-all shadow-lg"
            >
              Testi Çöz
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <p className="text-xs text-white/30 mt-4">
              Kredi kartı gerekmez · 7 gün ücretsiz deneme
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-5 md:px-8 border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full border border-[#f5d4a0]/60" />
            </div>
            <span className="text-white/40 text-sm">dopalive</span>
          </div>
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} DopaLive. DEHB beyni için tasarlandı.
          </p>
        </div>
      </footer>
    </main>
  );
}
