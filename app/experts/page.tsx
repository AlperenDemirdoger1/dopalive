'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import {
  ArrowRight,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  CheckCircle2,
  Brain,
  Heart,
  Clock,
  Shield,
  Award,
  Zap,
  Globe,
  Flame,
  Target,
  BarChart3,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// ============================================
// ANIMATION VARIANTS
// ============================================

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

// ============================================
// MARKET DATA (Research-backed)
// ============================================

const marketStats = [
  {
    value: "₺2.5 Milyar",
    label: "Türkiye Mental Sağlık Pazarı",
    detail: "2025'e kadar %23 büyüme bekleniyor",
    icon: TrendingUp,
    color: "primary"
  },
  {
    value: "4+ Milyon",
    label: "DEHB'li Yetişkin (Türkiye)",
    detail: "Yalnızca %10'u profesyonel destek alıyor",
    icon: Users,
    color: "accent"
  },
  {
    value: "%340",
    label: "Online Koçluk Talebi Artışı",
    detail: "Son 3 yılda (2021-2024)",
    icon: BarChart3,
    color: "success"
  },
  {
    value: "8-12x",
    label: "Talep/Arz Dengesizliği",
    detail: "Her DEHB uzmanına 8-12 bekleyen danışan",
    icon: Target,
    color: "warning"
  }
];

// ============================================
// BENEFITS
// ============================================

const benefits = [
  {
    icon: DollarSign,
    title: "Esnek & Rekabetçi Gelir",
    description: "Kendi fiyatlarını ve programını belirle. Hibrit model ile 1:1 ve grup seanslarını birleştir, uzmanlığını ölçeklendir."
  },
  {
    icon: Calendar,
    title: "Nörobilim Tabanlı Eşleşme",
    description: "Danışanlar dopamin profiline göre eşleşir. Uzmanlık alanına uygun, hazır motivasyonlu danışan akışı."
  },
  {
    icon: Users,
    title: "Hazır Danışan Akışı",
    description: "Pazarlama ve müşteri bulma derdini biz çözüyoruz. Profiline uygun danışanlarla eşleştiriliyorsun."
  },
  {
    icon: Brain,
    title: "AI Destekli Koçluk",
    description: "AI asistanımız seans notları, ilerleme takibi ve danışan iletişiminde sana destek oluyor. Daha az admin, daha çok etki."
  },
  {
    icon: Award,
    title: "Profesyonel Gelişim",
    description: "Ücretsiz DEHB uzmanlık eğitimleri, süpervizyon, vaka tartışmaları ve sertifika programlarına erişim."
  },
  {
    icon: Heart,
    title: "Anlamlı İş",
    description: "DEHB'li bireylerin hayatlarını değiştir. Her tamamlanan proje, senin eserin. Gerçek etki yarat."
  }
];

// ============================================
// REQUIREMENTS
// ============================================

const requirements = [
  {
    title: "Eğitim & Sertifikasyon",
    items: [
      "Psikoloji, PDR, Koçluk veya ilgili alanda lisans/yüksek lisans",
      "Koçluk sertifikası (ICF, CCE veya eşdeğer) tercih sebebi",
      "DEHB alanında eğitim veya deneyim"
    ]
  },
  {
    title: "Deneyim",
    items: [
      "En az 2 yıl koçluk/danışmanlık deneyimi",
      "DEHB veya nörodivergent bireylerle çalışma deneyimi artı",
      "Online seans deneyimi"
    ]
  },
  {
    title: "Teknik",
    items: [
      "Stabil internet bağlantısı",
      "Sessiz çalışma ortamı",
      "Zoom/Google Meet kullanım becerisi"
    ]
  }
];

// ============================================
// EXPERT PROFILES
// ============================================

const expertProfiles = [
  {
    name: "Ömer Evren Yılmaz",
    title: "Psikolog",
    university: "Dokuz Eylül Üniversitesi",
    specialties: ["BDT", "Aile Terapisti"],
    experience: "3+ yıl DEHB deneyimi",
    image: "/experts/evren.jpg"
  },
  {
    name: "Simay Selek",
    title: "Bilişsel ve Hesaplamalı Sinirbilimci",
    university: "ODTÜ",
    specialties: ["Sertifikalı BDT Terapisti"],
    experience: "2+ yıl DEHB deneyimi",
    image: "/experts/simay.jpg"
  },
  {
    name: "Görkem Demirdöğer",
    title: "Klinik Psikolog",
    university: "Boğaziçi Üniversitesi",
    specialties: ["Klinik Uzmanlık"],
    experience: "15+ yıl DEHB deneyimi",
    image: "/experts/gorkem.jpg"
  }
];

// ============================================
// PROCESS STEPS
// ============================================

const processSteps = [
  {
    step: 1,
    title: "Başvur",
    description: "5 dakikalık başvuru formunu doldur",
    icon: Sparkles
  },
  {
    step: 2,
    title: "Değerlendirme",
    description: "Ekibimiz başvurunu 48 saat içinde inceler",
    icon: Shield
  },
  {
    step: 3,
    title: "Onboarding",
    description: "Kabul edilirsen 1 saatlik onboarding eğitimi",
    icon: Zap
  },
  {
    step: 4,
    title: "Başla",
    description: "Profilini oluştur, danışan kabul etmeye başla",
    icon: Target
  }
];

// ============================================
// COMPONENTS
// ============================================

const StatCard = ({ stat, index }: { stat: typeof marketStats[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all group"
  >
        <div className={cn(
      "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
      stat.color === "primary" && "bg-primary/10",
      stat.color === "accent" && "bg-accent/10",
      stat.color === "success" && "bg-success/10",
      stat.color === "warning" && "bg-warning/10"
    )}>
      <stat.icon className={cn(
        "w-6 h-6",
        stat.color === "primary" && "text-primary",
        stat.color === "accent" && "text-accent",
        stat.color === "success" && "text-success",
        stat.color === "warning" && "text-warning"
      )} />
        </div>
    <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400 mb-2">
      {stat.value}
    </p>
    <p className="text-foreground font-medium mb-1">{stat.label}</p>
    <p className="text-sm text-muted-foreground">{stat.detail}</p>
  </motion.div>
);

const BenefitCard = ({ benefit, index }: { benefit: typeof benefits[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="p-6 rounded-2xl border bg-card border-border hover:border-primary/20 transition-all"
  >
    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-muted">
      <benefit.icon className="w-6 h-6 text-primary" />
    </div>
    <h3 className="text-lg font-display font-bold text-foreground mb-2">{benefit.title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
  </motion.div>
);

const ExpertProfileCard = ({ expert, index }: { expert: typeof expertProfiles[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="p-6 rounded-2xl bg-card border border-border h-full flex flex-col items-center text-center"
  >
    {/* Profile Image */}
    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary/20">
      <img 
        src={expert.image} 
        alt={expert.name}
        className="w-full h-full object-cover"
    />
  </div>
    
    {/* Name & Title */}
    <h3 className="text-foreground font-bold text-lg mb-1">{expert.name}</h3>
    <p className="text-primary text-sm font-medium mb-2">{expert.title}</p>
    
    {/* University */}
    <p className="text-muted-foreground text-xs mb-3">{expert.university}</p>
    
    {/* Specialties */}
    <div className="flex flex-wrap gap-2 justify-center mb-3">
      {expert.specialties.map((specialty, i) => (
        <span key={i} className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs">
          {specialty}
        </span>
      ))}
    </div>
    
    {/* Experience */}
    <p className="text-sm text-primary font-semibold mt-auto">
      {expert.experience}
    </p>
  </motion.div>
);

// ============================================
// MAIN PAGE
// ============================================

export default function ExpertsPage() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-200px] left-[-200px] w-[520px] h-[520px] bg-primary/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[520px] h-[520px] bg-accent/10 rounded-full blur-[140px]" />
      </div>

    {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-5 md:px-8">
        <div className="max-w-5xl mx-auto text-center">
      <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Uzman Ağı Başvuruları Açık
          </span>
        </motion.div>
        
        <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6"
        >
            DEHB Uzmanlığını
          <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
              Etkiye Dönüştür
            </span>
        </motion.h1>
        
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Türkiye'nin en hızlı büyüyen DEHB koçluk platformuna katıl. 
            Esnek çalış, adil kazan, gerçek hayatlar değiştir.
        </motion.p>
        
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/experts/apply"
              className="group inline-flex flex-col items-center justify-center px-10 py-5 rounded-2xl bg-gradient-warm text-white hover:opacity-90 transition-all shadow-warm-lg hover:scale-[1.02]"
            >
              <span className="flex items-center gap-2 text-lg font-bold tracking-wide">
                UZMAN AĞINA KATIL
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-white/80 text-sm font-normal mt-1">
                başvuru formu 5 dakika
              </span>
          </Link>
        </motion.div>
        </div>
    </section>
    
    {/* Market Stats */}
      <section ref={statsRef} className="py-20 px-5 md:px-8 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs text-accent font-medium mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              Pazar Verileri
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Büyüyen Bir Sektör, Sınırsız Fırsat
          </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              DEHB farkındalığı artıyor, profesyonel destek talebi patlama yaşıyor. 
              Arz, talebin çok gerisinde.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketStats.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
    
    {/* Benefits */}
      <section className="py-20 px-5 md:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Neden DopaLive?
          </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sadece bir platform değil, koçluk kariyerini destekleyen bir ekosistem.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
              <BenefitCard key={i} benefit={benefit} index={i} />
            ))}
          </div>
        </div>
      </section>


      {/* Expert Profiles */}
      <section className="py-20 px-5 md:px-8 border-t border-border">
        <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Örnek Uzmanlarımız
            </h2>
            <p className="text-muted-foreground">
              Platformumuzdaki DEHB uzmanları
              </p>
            </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {expertProfiles.map((expert, i) => (
              <ExpertProfileCard key={i} expert={expert} index={i} />
          ))}
        </div>
      </div>
    </section>
    
    {/* Requirements */}
      <section className="py-20 px-5 md:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Aranan Nitelikler
          </h2>
            <p className="text-muted-foreground">
              Kaliteli bir uzman ağı için temel beklentilerimiz
          </p>
        </motion.div>
        
          <div className="grid md:grid-cols-3 gap-6">
            {requirements.map((req, i) => (
        <motion.div
                key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <h3 className="font-display font-bold text-foreground mb-4">{req.title}</h3>
                <ul className="space-y-3">
                  {req.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
            ))}
          </div>
      </div>
    </section>
    
      {/* Process */}
    <section className="py-20 px-5 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Başvuru Süreci
          </h2>
            <p className="text-muted-foreground">
              4 basit adımda ağımıza katıl
            </p>
        </motion.div>
        
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="h-full"
              >
                <div className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl border border-border bg-card shadow-sm h-full">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-foreground text-sm font-semibold">
                    {step.step}
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-gradient-warm flex items-center justify-center shadow-warm-md">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-sm md:text-base">{step.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
      </div>
    </section>
    
    {/* Final CTA */}
      <section className="py-24 px-5 md:px-8 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
            <div className="w-20 h-20 rounded-3xl bg-gradient-warm flex items-center justify-center mx-auto mb-8 shadow-warm-lg">
          <Flame className="w-10 h-10 text-white" />
        </div>
        
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Uzmanlığını Etkiye Dönüştürmeye Hazır mısın?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Başvurular 48 saat içinde değerlendiriliyor. 
              Kaliteyi koruyoruz.
            </p>
            
            <Link
              href="/experts/apply"
              className="group inline-flex flex-col items-center justify-center px-10 py-5 rounded-2xl bg-gradient-warm text-white hover:opacity-90 transition-all shadow-warm-lg hover:scale-[1.02]"
            >
              <span className="flex items-center gap-2 text-lg font-bold tracking-wide">
                UZMAN AĞINA KATIL
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
              <span className="text-white/80 text-sm font-normal mt-1">
                başvuru formu 5 dakika
            </span>
            </Link>
            
            <div className="flex items-center justify-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Shield className="w-4 h-4" />
                <span>Bağlayıcı değil</span>
          </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Globe className="w-4 h-4" />
                <span>Türkiye geneli</span>
              </div>
                </div>
          </motion.div>
      </div>
      </section>
    </main>
  );
}
