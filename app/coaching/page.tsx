'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowRight, 
  Check, 
  Users, 
  Cpu, 
  Calendar,
  Target,
  Zap,
  Clock,
  Brain,
  Repeat,
  AlertCircle,
  Play,
  Pause,
  Flag,
  Sparkles,
  Shield,
  Heart,
  TrendingUp,
  Rocket,
  BookOpen,
  Music,
  Code,
  Palette,
  Video,
  Mic,
  FileText,
  ChevronDown,
  MessageCircle,
  Star,
  Award,
  Globe,
  Lock,
  Headphones,
  BarChart3,
  Layers,
  CircleDot,
  Activity,
  Flame,
  Eye,
  Timer,
  Battery,
  Wifi
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { fadeInUp, staggerContainer, staggerItem, viewportAnimation } from '@/lib/motion';

// Animated section wrapper
const AnimatedSection = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  return (
    <motion.section
      ref={ref}
      {...viewportAnimation(fadeInUp, { margin: "-100px" })}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

// DEHB Challenge pills data - Dopamin odaklı
const adhdChallenges = [
  { icon: Battery, label: "Düşük enerji döngüleri", color: "from-rose-500/20 to-rose-500/5" },
  { icon: Play, label: "Başlayamama", color: "from-emerald-500/20 to-emerald-500/5" },
  { icon: Pause, label: "Ortada takılıp kalma", color: "from-amber-500/20 to-amber-500/5" },
  { icon: Flag, label: "Bitirememe", color: "from-violet-500/20 to-violet-500/5" },
  { icon: Clock, label: "Zaman körlüğü", color: "from-cyan-500/20 to-cyan-500/5" },
  { icon: AlertCircle, label: "Başarısızlık korkusu", color: "from-orange-500/20 to-orange-500/5" },
  { icon: Brain, label: "Dikkat dağınıklığı", color: "from-pink-500/20 to-pink-500/5" },
  { icon: Repeat, label: "Erteleme döngüsü", color: "from-yellow-500/20 to-yellow-500/5" },
];

// Coaching process cards - Dopamin düzenleme odaklı
const coachingSteps = [
  {
    step: "01",
    title: "Dopamin Haritası",
    description: "Kişisel dopamin tetikleyicilerini ve enerji döngülerini haritalıyoruz. Beyninizin nasıl çalıştığını anlıyoruz.",
    icon: Activity,
    accent: "#FF6B6B"
  },
  {
    step: "02", 
    title: "Uzman Koç Eşleşmesi",
    description: "DEHB sertifikalı koçunuzla haftalık 45 dakikalık seanslar. Gerçek hesap verebilirlik, sadece tavsiye değil.",
    icon: Users,
    accent: "#FF8E53"
  },
  {
    step: "03",
    title: "AI Dopamin Koçu",
    description: "7/24 yanınızda olan AI asistanınız. Düşük enerji anlarında bile sizi yolda tutar.",
    icon: Cpu,
    accent: "#f5d4a0"
  },
  {
    step: "04",
    title: "Body Doubling Seansları",
    description: "Canlı odaklanma seanslarıyla birlikte çalışın. Yalnız olmadığınızı hissedin, anında motivasyon.",
    icon: Eye,
    accent: "#FF6B6B"
  },
  {
    step: "05",
    title: "Akran Pod Grubu",
    description: "4-5 kişilik destek grubunuz. Aynı yolculuktaki insanlarla zaferlerinizi ve zorluklarınızı paylaşın.",
    icon: MessageCircle,
    accent: "#FF8E53"
  },
  {
    step: "06",
    title: "Aktif Koç Takibi",
    description: "Koçunuz ilerlemenizi haftalık takip eder, hedeflerinizi güncellersiniz. Sürekli destek, sürekli gelişim.",
    icon: TrendingUp,
    accent: "#f5d4a0"
  }
];

// Benefits/Unlocks
const unlockItems = [
  { icon: Rocket, label: "Startup'ını başlat", description: "MVP'ni sonunda çıkar" },
  { icon: BookOpen, label: "Kitabını bitir", description: "Son bölümü yaz" },
  { icon: Code, label: "Uygulamanı ship et", description: "Production'a çık" },
  { icon: Music, label: "Müziğini yayınla", description: "Dünyayla paylaş" },
  { icon: Palette, label: "Sanatını tamamla", description: "Portföyün hazır" },
  { icon: Video, label: "Kanalını aç", description: "Yayınla butonuna bas" },
  { icon: Mic, label: "Podcast'ini başlat", description: "İlk bölümü kaydet" },
  { icon: FileText, label: "Kursunu oluştur", description: "Başkalarına öğret" },
];

// FAQ items
const faqItems = [
  {
    question: "DEHB tanısı olmadan katılabilir miyim?",
    answer: "Evet. Koçluğumuz odaklanma, erteleme ve projeleri bitirme konusunda zorluk çeken herkes için tasarlandı. Birçok üyemiz süreçte DEHB olabileceğini keşfediyor, ancak tanı hiçbir zaman zorunlu değil."
  },
  {
    question: "Projeyi yarıda değiştirmek istersem ne olur?",
    answer: "Olabilir! Koçunuz, değiştirmenin doğru hamle mi yoksa kaçınma mı olduğunu değerlendirmenize yardımcı olacak. Bazen pivot yapmak akıllıca — bunu birlikte çözeceğiz ve planınızı buna göre ayarlayacağız."
  },
  {
    question: "Pod grubum bana uygun değilse ne olur?",
    answer: "Pod'ları hedeflere, programlara ve iletişim stillerine göre dikkatle eşleştiriyoruz. 2 hafta sonra işe yaramıyorsa, sizi hiçbir ek ücret ödemeden farklı bir Pod'a taşıyacağız."
  },
  {
    question: "Body Doubling ne demek?",
    answer: "Body Doubling, başka birinin yanında çalışarak odaklanmayı kolaylaştıran kanıtlanmış bir DEHB tekniğidir. Canlı seanslarımızda dünya genelinden insanlarla birlikte çalışırsınız — sanki bir kütüphanede oturuyormuşsunuz gibi ama evinizden."
  },
  {
    question: "Bu normal DEHB koçluğundan farkı ne?",
    answer: "Geleneksel koçluk 1:1'dir ve pahalıdır (seans başına $300-500). Biz uzman koçluğu AI desteği, body doubling ve akran hesap verebilirliğiyle birleştiriyoruz — daha etkili ve 3 kat daha uygun fiyatlı."
  },
  {
    question: "Bir seansı kaçırırsam ne olur?",
    answer: "Hayat oluyor. Seanslar 24 saat öncesine kadar yeniden planlanabilir. AI yardımcınız her zaman mevcut ve Pod'unuz sizi desteklemeye devam ediyor. Kötü bir hafta geçirdiğiniz için sizi asla cezalandırmayız."
  },
  {
    question: "İstediğim zaman iptal edebilir miyim?",
    answer: "Evet. Bir sonraki fatura döngünüzden önce istediğiniz zaman iptal edin. Programa yeterince güveniyoruz ki sizi kilitlememize gerek yok. Çoğu üye sonuç gördüğü için 3+ ay kalıyor."
  }
];

// Action Plan Timeline content
const timelineContent = {
  today: {
    title: "Bugün",
    items: [
      "5 dakikalık eşleştirme testini tamamla",
      "Projen ve hedeflerin hakkında bilgi ver",
      "48 saat içinde koçunla eşleş",
      "Pod grubuna atanmanı al"
    ]
  },
  beforeFirst: {
    title: "İlk Seanstan Önce",
    items: [
      "Koçunun tanışma mesajını incele",
      "Proje netlik formunu doldur",
      "Pod'unun tanışma konuşmasına katıl",
      "AI dopamin koçu tercihlerini ayarla"
    ]
  },
  firstSession: {
    title: "İlk Seans",
    items: [
      "Proje vizyonunu derinlemesine keşfet",
      "En büyük engelleyicilerini belirle",
      "8 haftalık kilometre taşı haritanı oluştur",
      "Hesap verebilirlik ritminizi belirle"
    ]
  },
  ongoing: {
    title: "Süreç",
    items: [
      "Haftalık 45 dakika koçluk seansları",
      "Günlük AI check-in'leri (isteğe bağlı)",
      "Haftalık Pod senkron aramaları",
      "Günlük Body Doubling seansları",
      "Aylık ilerleme değerlendirmeleri"
    ]
  }
};

export default function CoachingPage() {
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null);

  return (
    <main className="min-h-screen relative overflow-hidden bg-background">
      {/* Ambient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px]" />
      </div>

      {/* No custom navigation - using global SiteHeader from layout */}

      {/* ====== HERO SECTION ====== */}
      <section className="py-24 lg:py-32 px-5 md:px-8 lg:px-16">
        <div className="max-w-[900px] w-full mx-auto flex flex-col items-center text-center">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
          <div className="rounded-full px-4 py-2 inline-flex items-center gap-2 bg-primary/10 border border-primary/20">
            <Activity className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary text-xs font-medium tracking-wide">
                Dopamin Odaklı Koçluk Sistemi
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-foreground mb-0 font-display"
            style={{
              fontSize: 'clamp(32px, 6vw, 60px)',
              lineHeight: '1.1',
              letterSpacing: '-0.03em',
              fontWeight: 700,
            }}
          >
            Kaosun içinde kaybolma.
            <br />
            <span className="text-primary">
              Zihninin pilot koltuğuna geç.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-muted-foreground max-w-[550px] mt-6 font-light"
            style={{ fontSize: 'clamp(14px, 1.8vw, 17px)', lineHeight: '1.7' }}
          >
            Sadece "odaklan" demiyoruz, nasıl yapacağını gösteriyoruz.
            <br />
            <span className="text-muted-foreground">Türkçe konuşan odak koçları ve AI asistanla kontrolü geri al.</span>
          </motion.p>

          {/* What's Included Checklist */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            {[
              { icon: Users, text: "DEHB Uzman Koç" },
              { icon: Cpu, text: "AI Dopamin Koçu" },
              { icon: Eye, text: "Body Doubling" },
              { icon: MessageCircle, text: "Akran Pod Grubu" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-card border border-border hover:border-primary/20 transition-colors"
              >
                <item.icon className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground text-sm font-light">{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10"
          >
            <Link
              href="/start"
              className="group inline-flex flex-col items-center justify-center px-10 py-5 rounded-2xl bg-gradient-warm text-white hover:opacity-90 transition-all shadow-warm-lg hover:scale-[1.02]"
            >
              <span className="flex items-center gap-2 text-lg font-bold tracking-wide">
                TESTİ ÇÖZ
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-white/80 text-sm font-normal mt-1">
                koçluk için erken erişim kazan
              </span>
            </Link>
          </motion.div>

          {/* Visual: Dopamin Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 w-full max-w-[750px]"
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-border p-6 md:p-8">
              {/* Mockup Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-warm/30 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-medium">Dopamin Durumun</p>
                    <p className="text-muted-foreground text-xs">Bugün • Optimal bölgede</p>
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 shadow-sm shadow-emerald-500/20">
                  <span className="text-emerald-500 text-xs font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-400" />
                    Odak modunda
                  </span>
                </div>
              </div>
              
              {/* Günlük Odak Skoru */}
              <div className="mb-6 p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-foreground text-sm font-medium">Günlük Odak Skoru</span>
                  <span className="text-2xl font-bold text-primary">78<span className="text-sm text-muted-foreground font-normal">/100</span></span>
                </div>
                
                {/* Progress bar */}
                <div className="relative h-3 bg-muted rounded-full overflow-hidden mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '78%' }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
                  />
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-muted/50">
                    <p className="text-lg font-semibold text-foreground">3.5</p>
                    <p className="text-[10px] text-muted-foreground">Saat odak</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50">
                    <p className="text-lg font-semibold text-foreground">4</p>
                    <p className="text-[10px] text-muted-foreground">Görev tamamlandı</p>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <p className="text-lg font-semibold text-emerald-600">↑12%</p>
                    <p className="text-[10px] text-muted-foreground">Dünden</p>
                  </div>
                </div>
              </div>

              {/* Today's Session */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground text-xs">14:00 — Koç Seansı</span>
                  </div>
                  <p className="text-foreground text-sm font-light">Elif ile haftalık check-in</p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground text-xs">16:00 — Body Doubling</span>
                  </div>
                  <p className="text-foreground text-sm font-light">Derin çalışma seansı (90dk)</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== DEHB CHALLENGES SECTION ====== */}
      <AnimatedSection className="py-20 px-5 md:px-8 lg:px-16">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-foreground text-2xl md:text-3xl font-light tracking-tight mb-3">
              Tanıdık geliyor mu?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base font-light max-w-[450px] mx-auto">
              Düşük dopamin döngüsünün yarattığı günlük zorluklar
            </p>
          </div>
          
          <motion.div 
            variants={staggerContainer()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          >
            {adhdChallenges.map((challenge, index) => (
              <motion.button
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedChallenge(selectedChallenge === index ? null : index)}
                className={cn(
                  "relative p-4 md:p-5 rounded-2xl text-left transition-all duration-300",
                  "bg-gradient-to-br",
                  challenge.color,
                  "border",
                  selectedChallenge === index 
                    ? "border-primary/30 bg-primary/5" 
                    : "border-border hover:border-white/10"
                )}
              >
                <challenge.icon className={cn(
                  "w-5 h-5 md:w-6 md:h-6 mb-3 transition-colors",
                  selectedChallenge === index ? "text-primary" : "text-muted-foreground"
                )} />
                <p className={cn(
                  "text-sm md:text-base font-light transition-colors",
                  selectedChallenge === index ? "text-foreground" : "text-muted-foreground"
                )}>
                  {challenge.label}
                </p>
                {selectedChallenge === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ====== DOPAMIN BİLİMİ SECTION ====== */}
      <AnimatedSection className="py-20 px-5 md:px-8 lg:px-16 bg-gradient-to-b from-transparent via-primary/10 to-transparent">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Brain className="w-3.5 h-3.5 text-primary" />
              <span className="text-primary text-xs font-medium">Bilim Destekli</span>
            </div>
            <h2 className="text-foreground text-2xl md:text-3xl font-light tracking-tight mb-4">
              Neden çoğu üretkenlik aracı<br />
              <span className="text-muted-foreground">DEHB için işe yaramıyor?</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base font-light max-w-[500px] mx-auto">
              DEHB beyni farklı çalışır. Dopamin düzenleme sistemi farklı ihtiyaçlar taşır.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Activity,
                title: "Dopamin Dalgalanmaları",
                description: "DEHB'de dopamin seviyeleri gün içinde daha çok dalgalanır. Sistemimiz bu dalgaları öngörür ve planınızı buna göre optimize eder.",
                stat: "47%",
                statLabel: "daha az enerji çöküşü"
              },
              {
                icon: Eye,
                title: "Body Doubling Etkisi",
                description: "Başkalarının varlığında çalışmak DEHB beyninin odaklanmasını %40 artırır. Canlı seanslarımızla bu etkiyi yaratıyoruz.",
                stat: "2.3x",
                statLabel: "daha uzun odak süreleri"
              },
              {
                icon: Heart,
                title: "Duygusal Düzenleme",
                description: "Başarısızlık korkusu ve utanç, DEHB'de daha yoğun hissedilir. Koçlarımız bu duyguları yönetmenize yardımcı olur.",
                stat: "89%",
                statLabel: "üyelerde azalan utanç"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/15 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/[0.08] flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-primary/80" />
                </div>
                <h3 className="text-foreground text-lg font-light mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm font-light leading-relaxed mb-4">{item.description}</p>
                <div className="pt-4 border-t border-border">
                  <span className="text-primary text-2xl font-light">{item.stat}</span>
                  <span className="text-muted-foreground text-xs ml-2">{item.statLabel}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ====== WHAT COACHING LOOKS LIKE ====== */}
      <AnimatedSection className="py-20 px-5 md:px-8 lg:px-16">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-foreground text-2xl md:text-3xl font-light tracking-tight mb-3">
              Koçluk nasıl işliyor?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base font-light max-w-[500px] mx-auto">
              Dopamin dengenizi koruyarak projelerinizi bitirmenin yol haritası
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {coachingSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="relative p-6 rounded-2xl bg-card border border-border hover:border-border transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-muted-foreground/20 text-3xl font-light">{step.step}</span>
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                    style={{ backgroundColor: `${step.accent}15` }}
                  >
                    <step.icon className="w-5 h-5" style={{ color: step.accent }} />
                  </div>
                </div>
                <h3 className="text-foreground text-lg font-light mb-2 group-hover:text-foreground transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm font-light leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ====== WHAT YOU'LL UNLOCK ====== */}
      <AnimatedSection className="py-20 px-5 md:px-8 lg:px-16">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-foreground text-2xl md:text-3xl font-light tracking-tight mb-3">
              Ne başaracaksın?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base font-light max-w-[450px] mx-auto">
              Gerçek projeler, gerçekten bitirilmiş. Seninkini seç.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {unlockItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.03 }}
                className="p-5 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300 text-center group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/[0.06] flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 transition-colors">
                  <item.icon className="w-6 h-6 text-primary/70 group-hover:text-primary transition-colors" />
                </div>
                <h4 className="text-foreground text-sm font-medium mb-1 group-hover:text-foreground transition-colors">
                  {item.label}
                </h4>
                <p className="text-muted-foreground text-xs font-light">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ====== RESULTS & CASE STUDY ====== */}
      <AnimatedSection className="py-20 px-5 md:px-8 lg:px-16 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent">
        <div className="max-w-[1000px] mx-auto">
          {/* Case Study */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-border"
          >
            <div className="p-6 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-5 h-5 text-primary" />
                <span className="text-primary/80 text-sm font-medium tracking-wide uppercase">Başarı Hikayesi</span>
              </div>
              
              <h3 className="text-foreground text-xl md:text-2xl font-light mb-8">
                Elif'in E-ticaret Lansmanı
              </h3>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Before */}
                <div className="p-5 rounded-xl bg-card border border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-rose-400/60" />
                    <span className="text-rose-400/70 text-xs font-medium uppercase tracking-wide">Öncesi</span>
                  </div>
                  <p className="text-muted-foreground text-sm font-light leading-relaxed">
                    "2 yıldır aklımda olan bir e-ticaret fikri vardı. 4 kez başladım, hepsinde 2-3 hafta sonra bıraktım. Notion'da planlar vardı ama hiçbiri hayata geçmedi. Kendimi sürekli suçluyordum."
                  </p>
                </div>

                {/* After */}
                <div className="p-5 rounded-xl bg-primary/[0.04] border border-primary/10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-emerald-400/80 text-xs font-medium uppercase tracking-wide">Sonrası</span>
                  </div>
                  <p className="text-muted-foreground text-sm font-light leading-relaxed">
                    "6 haftada sitemı açtım. Koçum Ayşe, fazla özellik eklememi engelledi. Body Doubling seanslarında ürün fotoğraflarını çektim. Şimdi ayda 23 sipariş alıyorum."
                  </p>
                </div>
              </div>

              {/* How it worked */}
              <div className="mt-8 p-5 rounded-xl bg-card border border-border">
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-3">Nasıl başardı?</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: Users, text: "Haftalık koç seansları" },
                    { icon: Eye, text: "Günlük Body Doubling" },
                    { icon: Cpu, text: "AI görev bölümleme" },
                    { icon: MessageCircle, text: "Pod desteği" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card">
                      <item.icon className="w-4 h-4 text-primary/60" />
                      <span className="text-muted-foreground text-xs">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ====== COACH VETTING & SAFETY ====== */}
      <AnimatedSection className="py-20 px-5 md:px-8 lg:px-16">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-foreground text-2xl md:text-3xl font-light tracking-tight mb-3">
              Güvenebileceğin koçlar
            </h2>
            <p className="text-muted-foreground text-sm md:text-base font-light max-w-[500px] mx-auto">
              Titizlikle seçilmiş, DEHB konusunda uzmanlaşmış
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Shield,
                title: "Sertifikalı & Deneyimli",
                description: "Her koçun en az 3 yıl deneyimi ve akredite koçluk sertifikası var. Başvuranların sadece %8'ini kabul ediyoruz.",
                accent: "from-emerald-500/20 to-emerald-500/5"
              },
              {
                icon: Brain,
                title: "DEHB Uzmanlığı",
                description: "Tüm koçlar 40 saatlik DEHB uzmanlık programımızı tamamlar. Çoğunun kendisi de DEHB deneyimi var.",
                accent: "from-violet-500/20 to-violet-500/5"
              },
              {
                icon: Globe,
                title: "Çeşitli Deneyimler",
                description: "Teknoloji, sanat, akademi ve girişimcilik alanlarından koçlar. Sizin dünyanızı anlayan biriyle eşleşin.",
                accent: "from-amber-500/20 to-amber-500/5"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "p-6 rounded-2xl border border-border",
                  "bg-gradient-to-br",
                  item.accent
                )}
              >
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="text-foreground text-lg font-light mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm font-light leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ====== ACTION PLAN TIMELINE (DESIGN SYSTEM TABS) ====== */}
      <AnimatedSection className="py-20 px-5 md:px-8 lg:px-16 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-foreground text-2xl md:text-3xl font-light tracking-tight mb-3">
              Aksiyon planın
            </h2>
            <p className="text-muted-foreground text-sm md:text-base font-light max-w-[450px] mx-auto">
              Kayıttan ilk projeyi bitirmeye — işte tam olarak ne olacak
            </p>
          </div>

          <Tabs defaultValue="today" className="w-full">
            <TabsList className="flex justify-center gap-1 mb-8 p-1.5 rounded-xl bg-card border border-border">
              {Object.keys(timelineContent).map((key) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="text-sm font-light data-[state=active]:text-primary data-[state=active]:bg-primary/10 data-[state=inactive]:text-muted-foreground"
                >
                  {timelineContent[key as keyof typeof timelineContent].title}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(timelineContent).map(([key, content]) => (
              <TabsContent
                key={key}
                value={key}
                className="p-6 md:p-8 rounded-2xl bg-card border border-border text-center"
              >
                <h3 className="text-foreground text-lg font-light mb-6">{content.title}</h3>
                <div className="space-y-4 max-w-[700px] mx-auto flex flex-col items-center">
                  {content.items.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={staggerItem}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="flex items-start gap-3 justify-center"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <p className="text-muted-foreground text-sm font-light text-left md:text-center">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </AnimatedSection>

      {/* ====== ECOSYSTEM VALUE ====== */}
      <AnimatedSection className="py-20 px-5 md:px-8 lg:px-16">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-foreground text-2xl md:text-3xl font-light tracking-tight mb-3">
              Daha büyük bir ekosistemin parçası
            </h2>
            <p className="text-muted-foreground text-sm md:text-base font-light max-w-[500px] mx-auto">
              Koçluk sadece başlangıç. Tam ekosisteme erişim kazanıyorsun.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: Eye,
                title: "Body Doubling Seansları",
                description: "Günlük canlı çalışma seansları. Başkalarıyla birlikte çalışarak anında hesap verebilirlik.",
                badge: "Dahil"
              },
              {
                icon: Layers,
                title: "DEHB Araç Kütüphanesi",
                description: "Şablonlar, iş akışları ve sistemler — DEHB beyni için özel olarak tasarlanmış.",
                badge: "Dahil"
              },
              {
                icon: BarChart3,
                title: "İlerleme Dashboard'u",
                description: "Kazanımlarını, serileri ve proje kilometre taşlarını takip et. Küçük zaferleri kutla.",
                badge: "Dahil"
              },
              {
                icon: MessageCircle,
                title: "Topluluk",
                description: "Binlerce anlayan insanla bağlan. Kazanımları paylaş, soru sor, işbirliği yap.",
                badge: "Dahil"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-border transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/[0.06] flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary/70" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400/80 text-xs">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-foreground text-lg font-light mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm font-light leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ====== PRICE & CTA ====== */}
      <AnimatedSection className="py-24 px-5 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-foreground text-2xl md:text-3xl lg:text-4xl font-light tracking-tight mb-4">
              Fiyatlandırma
            </h2>
            <p className="text-muted-foreground text-base">
              Önce testi çöz, sana en uygun planı önerelim.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Başlangıç - Free */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-3xl bg-card border border-border flex flex-col"
            >
              <div className="text-2xl mb-2">🌱</div>
              <h3 className="text-foreground font-semibold text-xl mb-1">Başlangıç</h3>
              <p className="text-muted-foreground text-sm mb-4">&quot;Kendini tanı&quot;</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">₺0</span>
                <span className="text-muted-foreground text-sm ml-1">sonsuza kadar</span>
              </div>
              <ul className="space-y-3 mb-6 flex-grow">
                {[
                  "AI Koç (5 mesaj/gün)",
                  "Temel odak araçları",
                  "Topluluk erişimi (okuma)",
                  "Dikkat & Odak testi",
                  "Kişisel odak profili"
                ].map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-muted-foreground text-sm">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/start"
                className="group flex flex-col items-center justify-center w-full py-4 rounded-xl bg-muted text-foreground hover:bg-muted/80 border border-border transition-all mt-auto"
              >
                <span className="font-bold">TESTİ ÇÖZ</span>
                <span className="text-muted-foreground text-xs mt-0.5">erken erişim kazan</span>
              </Link>
            </motion.div>
            
            {/* Odak */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-3xl bg-card border border-border flex flex-col"
            >
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="text-foreground font-semibold text-xl mb-1">Odak</h3>
              <p className="text-muted-foreground text-sm mb-4">&quot;AI ile odaklan&quot;</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">₺590</span>
                <span className="text-muted-foreground">/ay</span>
              </div>
              <ul className="space-y-3 mb-6 flex-grow">
                {[
                  "Sınırsız AI Koç (7/24)",
                  "Akıllı görev parçalama",
                  "Günlük body doubling",
                  "Tam topluluk erişimi",
                  "Haftalık ilerleme raporu",
                  "Kişiselleştirilmiş öneriler"
                ].map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-muted-foreground text-sm">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/start"
                className="group flex flex-col items-center justify-center w-full py-4 rounded-xl bg-muted text-foreground hover:bg-muted/80 border border-border transition-all mt-auto"
              >
                <span className="font-bold">TESTİ ÇÖZ</span>
                <span className="text-muted-foreground text-xs mt-0.5">erken erişim kazan</span>
              </Link>
            </motion.div>
            
            {/* Dönüşüm - Premium */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-3xl bg-gradient-to-b from-primary/15 to-transparent border-2 border-primary/40 relative flex flex-col shadow-lg shadow-primary/10"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-warm text-foreground text-xs font-bold shadow-warm-md">
                🔥 Gerçek Dönüşüm
              </div>
              <div className="text-2xl mb-2">🚀</div>
              <h3 className="text-foreground font-semibold text-xl mb-1">Dönüşüm</h3>
              <p className="text-muted-foreground text-sm mb-4">&quot;Uzmanınla bitir&quot;</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">₺3.900</span>
                <span className="text-muted-foreground">/ay</span>
              </div>
              <ul className="space-y-3 mb-6 flex-grow">
                {[
                  "Haftalık 1:1 uzman seansları",
                  "Eşleştirilmiş pod grubu",
                  "Kişisel odak haritası",
                  "Sınırsız AI Koç + öncelik",
                  "Sınırsız body doubling",
                  "Öncelikli destek"
                ].map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-muted-foreground text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/start"
                className="block w-full py-4 rounded-xl text-center font-bold bg-gradient-warm text-foreground hover:opacity-90 transition-all shadow-warm-md mt-auto"
              >
                Testi Çöz
              </Link>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ====== FAQ ====== */}
      <AnimatedSection className="py-20 px-5 md:px-8 lg:px-16">
        <div className="max-w-[700px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-foreground text-2xl md:text-3xl font-light tracking-tight mb-3">
              Sıkça sorulan sorular
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-foreground text-sm md:text-base font-light">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-foreground text-sm font-light leading-relaxed">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </AnimatedSection>

      {/* ====== FINAL CTA ====== */}
      <AnimatedSection className="py-24 px-5 md:px-8 lg:px-16">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="text-foreground text-2xl md:text-4xl font-light tracking-tight mb-4">
            Odak ve dikkat profilini keşfetmeye hazır mısın?
          </h2>
          <p className="text-muted-foreground text-base mb-10 max-w-[450px] mx-auto">
            5 dakikalık ücretsiz test ile beyninin motivasyon, dikkat ve enerji sistemlerini anla.
          </p>
          <Link
            href="/start"
            className="group inline-flex flex-col items-center justify-center px-10 py-5 rounded-2xl bg-gradient-warm text-white hover:opacity-90 transition-all shadow-warm-lg hover:scale-[1.02]"
          >
            <span className="flex items-center gap-2 text-lg font-bold tracking-wide">
              TESTİ ÇÖZ
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="text-white/80 text-sm font-normal mt-1">
              erken erişim biletini kap
            </span>
          </Link>
        </div>
      </AnimatedSection>

      {/* Footer is provided by global SiteFooter from layout */}
    </main>
  );
}
