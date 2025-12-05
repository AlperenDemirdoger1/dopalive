'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
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

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Animated section wrapper
const AnimatedSection = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

// Custom Tabs Component
const TabButton = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={cn(
      "px-4 py-2.5 rounded-lg text-sm font-light transition-all duration-300",
      active 
        ? "bg-[#FF6B6B]/10 text-[#FF6B6B]" 
        : "text-white/40 hover:text-white/60"
    )}
  >
    {children}
  </button>
);

// Custom Accordion Component
const AccordionItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) => (
  <div className="rounded-xl overflow-hidden bg-white/[0.02] border border-white/[0.05] data-[state=open]:border-white/[0.08] transition-colors">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-5 py-4 text-left group"
    >
      <span className="text-white/70 text-sm md:text-base font-light group-hover:text-white/90 transition-colors pr-4">
        {question}
      </span>
      <ChevronDown className={cn(
        "w-5 h-5 text-white/30 flex-shrink-0 transition-transform duration-300",
        isOpen && "rotate-180"
      )} />
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
          <div className="px-5 pb-5">
            <p className="text-white/40 text-sm font-light leading-relaxed">
              {answer}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// ADHD Challenge pills data - Dopamin odaklı
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
    description: "ADHD sertifikalı koçunuzla haftalık 45 dakikalık seanslar. Gerçek hesap verebilirlik, sadece tavsiye değil.",
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
    title: "Sürdürülebilir Odak",
    description: "Dopamin dengenizi koruyarak uzun vadeli odak becerileri geliştirin. Sonuçları haftalarca görün.",
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
    question: "ADHD tanısı olmadan katılabilir miyim?",
    answer: "Evet. Koçluğumuz odaklanma, erteleme ve projeleri bitirme konusunda zorluk çeken herkes için tasarlandı. Birçok üyemiz süreçte ADHD olabileceğini keşfediyor, ancak tanı hiçbir zaman zorunlu değil."
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
    answer: "Body Doubling, başka birinin yanında çalışarak odaklanmayı kolaylaştıran kanıtlanmış bir ADHD tekniğidir. Canlı seanslarımızda dünya genelinden insanlarla birlikte çalışırsınız — sanki bir kütüphanede oturuyormuşsunuz gibi ama evinizden."
  },
  {
    question: "Bu normal ADHD koçluğundan farkı ne?",
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
  const [activeTab, setActiveTab] = useState('today');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0a0a0a]">
      {/* Ambient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-[#0a0a0a] to-[#050505]" />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute w-[800px] h-[400px] bg-[#FF6B6B] opacity-[0.03] top-[-150px] left-1/2 -translate-x-1/2 rounded-full blur-[150px]"
        />
        <div className="absolute w-[500px] h-[500px] bg-[#FF8E53] opacity-[0.02] top-[40%] left-[-200px] rounded-full blur-[120px]" />
        <div className="absolute w-[500px] h-[500px] bg-[#f5d4a0] opacity-[0.02] top-[60%] right-[-200px] rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-5 md:px-8 py-5 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.03]"
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center"
            >
              <Flame className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-white/90 text-lg font-medium tracking-tight">
              Dopa<span className="text-[#FF6B6B]">Live</span>
            </span>
          </Link>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "px-5 py-2.5 rounded-xl",
              "bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53]",
              "text-white text-sm font-medium",
              "transition-all duration-300",
              "flex items-center gap-2",
              "shadow-lg shadow-[#FF6B6B]/20"
            )}
          >
            <span>Koç Bul</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.nav>

      {/* ====== HERO SECTION ====== */}
      <section className="min-h-screen flex flex-col items-center justify-center px-5 md:px-8 lg:px-16 pt-28 pb-16">
        <div className="max-w-[900px] w-full flex flex-col items-center text-center">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <div className="rounded-full px-4 py-2 inline-flex items-center gap-2 bg-[#FF6B6B]/[0.08] border border-[#FF6B6B]/15">
              <Activity className="w-3.5 h-3.5 text-[#FF6B6B]" />
              <span className="text-[#FF6B6B]/90 text-xs font-medium tracking-wide">
                Dopamin Odaklı Koçluk Sistemi
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-white mb-0"
            style={{
              fontSize: 'clamp(32px, 6vw, 60px)',
              lineHeight: '1.1',
              letterSpacing: '-0.03em',
              fontWeight: 300,
            }}
          >
            AI + İnsan Koçluğu ile
            <br />
            <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] bg-clip-text text-transparent">
              sürdürülebilir odak.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-white/45 max-w-[550px] mt-6 font-light"
            style={{ fontSize: 'clamp(14px, 1.8vw, 17px)', lineHeight: '1.7' }}
          >
            Dopamin düzenleme bilimi + ADHD uzman koçlar + AI asistan + Body Doubling.
            <br />
            <span className="text-white/60">Projelerini bitirmenin yeni yolu.</span>
          </motion.p>

          {/* What's Included Checklist */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            {[
              { icon: Users, text: "ADHD Uzman Koç" },
              { icon: Cpu, text: "AI Dopamin Koçu" },
              { icon: Eye, text: "Body Doubling" },
              { icon: MessageCircle, text: "Akran Pod Grubu" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#FF6B6B]/20 transition-colors"
              >
                <item.icon className="w-4 h-4 text-[#FF6B6B]/70" />
                <span className="text-white/55 text-sm font-light">{item.text}</span>
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
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "px-8 py-4 rounded-xl",
                "bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53]",
                "text-white text-base font-medium",
                "transition-all duration-300",
                "hover:shadow-xl hover:shadow-[#FF6B6B]/25",
                "flex items-center gap-3"
              )}
            >
              <span>Koçunla eşleş</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <p className="text-white/25 text-xs mt-3">5 dakika • 48 saat içinde başla</p>
          </motion.div>

          {/* Visual: Dopamin Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 w-full max-w-[750px]"
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.06] p-6 md:p-8">
              {/* Mockup Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FF6B6B]/30 to-[#FF8E53]/30 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-[#FF6B6B]" />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm font-medium">Dopamin Durumun</p>
                    <p className="text-white/30 text-xs">Bugün • Optimal bölgede</p>
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-emerald-400/80 text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Odak modunda
                  </span>
                </div>
              </div>
              
              {/* Energy Graph Mockup */}
              <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="flex justify-between text-xs mb-3">
                  <span className="text-white/40">Enerji Seviyesi</span>
                  <span className="text-[#FF6B6B]/80">Yüksek</span>
                </div>
                <div className="flex items-end gap-1 h-16">
                  {[40, 55, 35, 70, 85, 90, 75, 88, 92, 85, 78].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.5, delay: 0.8 + i * 0.05 }}
                      className={cn(
                        "flex-1 rounded-sm",
                        i >= 8 ? "bg-gradient-to-t from-[#FF6B6B] to-[#FF8E53]" : "bg-white/10"
                      )}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-white/20 mt-2">
                  <span>9:00</span>
                  <span>Şimdi</span>
                </div>
              </div>

              {/* Today's Session */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#FF6B6B]/[0.05] border border-[#FF6B6B]/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-[#FF6B6B]/70" />
                    <span className="text-white/40 text-xs">14:00 — Koç Seansı</span>
                  </div>
                  <p className="text-white/70 text-sm font-light">Elif ile haftalık check-in</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-4 h-4 text-white/40" />
                    <span className="text-white/40 text-xs">16:00 — Body Doubling</span>
                  </div>
                  <p className="text-white/70 text-sm font-light">Derin çalışma seansı (90dk)</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== ADHD CHALLENGES SECTION ====== */}
      <AnimatedSection className="py-20 px-5 md:px-8 lg:px-16">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-white/90 text-2xl md:text-3xl font-light tracking-tight mb-3">
              Tanıdık geliyor mu?
            </h2>
            <p className="text-white/40 text-sm md:text-base font-light max-w-[450px] mx-auto">
              Düşük dopamin döngüsünün yarattığı günlük zorluklar
            </p>
          </div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
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
                    ? "border-[#FF6B6B]/30 bg-[#FF6B6B]/[0.05]" 
                    : "border-white/[0.06] hover:border-white/10"
                )}
              >
                <challenge.icon className={cn(
                  "w-5 h-5 md:w-6 md:h-6 mb-3 transition-colors",
                  selectedChallenge === index ? "text-[#FF6B6B]" : "text-white/40"
                )} />
                <p className={cn(
                  "text-sm md:text-base font-light transition-colors",
                  selectedChallenge === index ? "text-white/90" : "text-white/60"
                )}>
                  {challenge.label}
                </p>
                {selectedChallenge === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#FF6B6B]"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ====== DOPAMIN BİLİMİ SECTION ====== */}
      <AnimatedSection className="py-20 px-5 md:px-8 lg:px-16 bg-gradient-to-b from-transparent via-[#FF6B6B]/[0.02] to-transparent">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF6B6B]/[0.08] border border-[#FF6B6B]/15 mb-4">
              <Brain className="w-3.5 h-3.5 text-[#FF6B6B]" />
              <span className="text-[#FF6B6B]/80 text-xs font-medium">Bilim Destekli</span>
            </div>
            <h2 className="text-white/90 text-2xl md:text-3xl font-light tracking-tight mb-4">
              Neden çoğu üretkenlik aracı<br />
              <span className="text-white/50">ADHD için işe yaramıyor?</span>
            </h2>
            <p className="text-white/40 text-sm md:text-base font-light max-w-[500px] mx-auto">
              ADHD beyni farklı çalışır. Dopamin düzenleme sistemi farklı ihtiyaçlar taşır.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Activity,
                title: "Dopamin Dalgalanmaları",
                description: "ADHD'de dopamin seviyeleri gün içinde daha çok dalgalanır. Sistemimiz bu dalgaları öngörür ve planınızı buna göre optimize eder.",
                stat: "47%",
                statLabel: "daha az enerji çöküşü"
              },
              {
                icon: Eye,
                title: "Body Doubling Etkisi",
                description: "Başkalarının varlığında çalışmak ADHD beyninin odaklanmasını %40 artırır. Canlı seanslarımızla bu etkiyi yaratıyoruz.",
                stat: "2.3x",
                statLabel: "daha uzun odak süreleri"
              },
              {
                icon: Heart,
                title: "Duygusal Düzenleme",
                description: "Başarısızlık korkusu ve utanç, ADHD'de daha yoğun hissedilir. Koçlarımız bu duyguları yönetmenize yardımcı olur.",
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
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-[#FF6B6B]/15 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-[#FF6B6B]/[0.08] flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-[#FF6B6B]/80" />
                </div>
                <h3 className="text-white/80 text-lg font-light mb-2">{item.title}</h3>
                <p className="text-white/35 text-sm font-light leading-relaxed mb-4">{item.description}</p>
                <div className="pt-4 border-t border-white/[0.05]">
                  <span className="text-[#FF6B6B] text-2xl font-light">{item.stat}</span>
                  <span className="text-white/30 text-xs ml-2">{item.statLabel}</span>
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
            <h2 className="text-white/90 text-2xl md:text-3xl font-light tracking-tight mb-3">
              Koçluk nasıl işliyor?
            </h2>
            <p className="text-white/40 text-sm md:text-base font-light max-w-[500px] mx-auto">
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
                className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.08] transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-white/10 text-3xl font-light">{step.step}</span>
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                    style={{ backgroundColor: `${step.accent}15` }}
                  >
                    <step.icon className="w-5 h-5" style={{ color: step.accent }} />
                  </div>
                </div>
                <h3 className="text-white/80 text-lg font-light mb-2 group-hover:text-white/90 transition-colors">
                  {step.title}
                </h3>
                <p className="text-white/35 text-sm font-light leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ====== BODY DOUBLING SPOTLIGHT ====== */}
      <AnimatedSection className="py-20 px-5 md:px-8 lg:px-16 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF8E53]/[0.1] border border-[#FF8E53]/20 mb-4">
                <Eye className="w-3.5 h-3.5 text-[#FF8E53]" />
                <span className="text-[#FF8E53]/90 text-xs font-medium">Premium Özellik</span>
              </div>
              <h2 className="text-white/90 text-2xl md:text-3xl font-light tracking-tight mb-4">
                Body Doubling ile<br />
                <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] bg-clip-text text-transparent">anında odak.</span>
              </h2>
              <p className="text-white/40 text-sm md:text-base font-light leading-relaxed mb-6">
                Başka insanların yanında çalışmak ADHD beyni için güçlü bir motivasyon kaynağıdır. 
                Canlı video seanslarımızda dünya genelinden insanlarla birlikte çalışın.
              </p>
              <ul className="space-y-3">
                {[
                  "Günde 4+ canlı seans (sabah, öğle, akşam, gece)",
                  "30, 60 veya 90 dakikalık odak blokları",
                  "Sessiz veya müzikli ortam seçenekleri",
                  "Küçük gruplar (max 12 kişi) — samimi atmosfer"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#FF6B6B]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#FF6B6B]" />
                    </div>
                    <span className="text-white/55 text-sm font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Body Doubling Visual */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.06] p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#FF6B6B] animate-pulse" />
                    <span className="text-white/50 text-xs">Canlı • Derin Çalışma Seansı</span>
                  </div>
                  <span className="text-white/30 text-xs">8/12 katılımcı</span>
                </div>
                
                {/* Participant Grid */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[...Array(8)].map((_, i) => (
                    <div 
                      key={i}
                      className={cn(
                        "aspect-square rounded-lg",
                        i === 0 
                          ? "bg-gradient-to-br from-[#FF6B6B]/20 to-[#FF8E53]/20 border-2 border-[#FF6B6B]/30" 
                          : "bg-white/[0.03] border border-white/[0.05]"
                      )}
                    >
                      {i === 0 && (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-white/60 text-xs">Sen</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Timer */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4 text-[#FF6B6B]/70" />
                    <span className="text-white/60 text-sm">Kalan süre</span>
                  </div>
                  <span className="text-[#FF6B6B] text-lg font-mono">47:23</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ====== WHAT YOU'LL UNLOCK ====== */}
      <AnimatedSection className="py-20 px-5 md:px-8 lg:px-16">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-white/90 text-2xl md:text-3xl font-light tracking-tight mb-3">
              Ne başaracaksın?
            </h2>
            <p className="text-white/40 text-sm md:text-base font-light max-w-[450px] mx-auto">
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
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-[#FF6B6B]/20 transition-all duration-300 text-center group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FF6B6B]/[0.06] flex items-center justify-center mx-auto mb-3 group-hover:bg-[#FF6B6B]/10 transition-colors">
                  <item.icon className="w-6 h-6 text-[#FF6B6B]/70 group-hover:text-[#FF6B6B] transition-colors" />
                </div>
                <h4 className="text-white/70 text-sm font-medium mb-1 group-hover:text-white/90 transition-colors">
                  {item.label}
                </h4>
                <p className="text-white/30 text-xs font-light">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ====== RESULTS & CASE STUDY ====== */}
      <AnimatedSection className="py-20 px-5 md:px-8 lg:px-16 bg-gradient-to-b from-transparent via-[#FF6B6B]/[0.02] to-transparent">
        <div className="max-w-[1000px] mx-auto">
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16">
            {[
              { value: "87%", label: "8 haftada bitirir" },
              { value: "4.9", label: "Koç puanı" },
              { value: "2.3x", label: "Tek başına çalışmaktan hızlı" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center"
              >
                <p className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] bg-clip-text text-transparent text-4xl md:text-5xl font-light tracking-tight">{stat.value}</p>
                <p className="text-white/40 text-sm font-light mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Case Study */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.06]"
          >
            <div className="p-6 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-5 h-5 text-[#FF6B6B]" />
                <span className="text-[#FF6B6B]/80 text-sm font-medium tracking-wide uppercase">Başarı Hikayesi</span>
              </div>
              
              <h3 className="text-white/90 text-xl md:text-2xl font-light mb-8">
                Elif'in E-ticaret Lansmanı
              </h3>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Before */}
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-rose-400/60" />
                    <span className="text-rose-400/70 text-xs font-medium uppercase tracking-wide">Öncesi</span>
                  </div>
                  <p className="text-white/50 text-sm font-light leading-relaxed">
                    "2 yıldır aklımda olan bir e-ticaret fikri vardı. 4 kez başladım, hepsinde 2-3 hafta sonra bıraktım. Notion'da planlar vardı ama hiçbiri hayata geçmedi. Kendimi sürekli suçluyordum."
                  </p>
                </div>

                {/* After */}
                <div className="p-5 rounded-xl bg-[#FF6B6B]/[0.04] border border-[#FF6B6B]/10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-emerald-400/80 text-xs font-medium uppercase tracking-wide">Sonrası</span>
                  </div>
                  <p className="text-white/60 text-sm font-light leading-relaxed">
                    "6 haftada sitemı açtım. Koçum Ayşe, fazla özellik eklememi engelledi. Body Doubling seanslarında ürün fotoğraflarını çektim. Şimdi ayda 23 sipariş alıyorum."
                  </p>
                </div>
              </div>

              {/* How it worked */}
              <div className="mt-8 p-5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <p className="text-white/30 text-xs font-medium uppercase tracking-wide mb-3">Nasıl başardı?</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: Users, text: "Haftalık koç seansları" },
                    { icon: Eye, text: "Günlük Body Doubling" },
                    { icon: Cpu, text: "AI görev bölümleme" },
                    { icon: MessageCircle, text: "Pod desteği" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03]">
                      <item.icon className="w-4 h-4 text-[#FF6B6B]/60" />
                      <span className="text-white/50 text-xs">{item.text}</span>
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
            <h2 className="text-white/90 text-2xl md:text-3xl font-light tracking-tight mb-3">
              Güvenebileceğin koçlar
            </h2>
            <p className="text-white/40 text-sm md:text-base font-light max-w-[500px] mx-auto">
              Titizlikle seçilmiş, ADHD konusunda uzmanlaşmış
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
                title: "ADHD Uzmanlığı",
                description: "Tüm koçlar 40 saatlik ADHD uzmanlık programımızı tamamlar. Çoğunun kendisi de ADHD deneyimi var.",
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
                  "p-6 rounded-2xl border border-white/[0.05]",
                  "bg-gradient-to-br",
                  item.accent
                )}
              >
                <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white/60" />
                </div>
                <h3 className="text-white/80 text-lg font-light mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm font-light leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ====== ACTION PLAN TIMELINE (CUSTOM TABS) ====== */}
      <AnimatedSection className="py-20 px-5 md:px-8 lg:px-16 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-white/90 text-2xl md:text-3xl font-light tracking-tight mb-3">
              Aksiyon planın
            </h2>
            <p className="text-white/40 text-sm md:text-base font-light max-w-[450px] mx-auto">
              Kayıttan ilk projeyi bitirmeye — işte tam olarak ne olacak
            </p>
          </div>

          <div className="w-full">
            <div className="flex justify-center gap-1 mb-8 p-1.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
              {Object.keys(timelineContent).map((key) => (
                <TabButton 
                  key={key}
                  active={activeTab === key}
                  onClick={() => setActiveTab(key)}
                >
                  {timelineContent[key as keyof typeof timelineContent].title}
                </TabButton>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05]"
              >
                <h3 className="text-white/80 text-lg font-light mb-6">
                  {timelineContent[activeTab as keyof typeof timelineContent].title}
                </h3>
                <div className="space-y-4">
                  {timelineContent[activeTab as keyof typeof timelineContent].items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#FF6B6B]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-[#FF6B6B]/80" />
                      </div>
                      <p className="text-white/60 text-sm font-light">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </AnimatedSection>

      {/* ====== ECOSYSTEM VALUE ====== */}
      <AnimatedSection className="py-20 px-5 md:px-8 lg:px-16">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-white/90 text-2xl md:text-3xl font-light tracking-tight mb-3">
              Daha büyük bir ekosistemin parçası
            </h2>
            <p className="text-white/40 text-sm md:text-base font-light max-w-[500px] mx-auto">
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
                title: "ADHD Araç Kütüphanesi",
                description: "Şablonlar, iş akışları ve sistemler — ADHD beyni için özel olarak tasarlanmış.",
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
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.08] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#FF6B6B]/[0.06] flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#FF6B6B]/70" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400/80 text-xs">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-white/80 text-lg font-light mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm font-light leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ====== PRICE & CTA ====== */}
      <AnimatedSection className="py-24 px-5 md:px-8 lg:px-16 bg-gradient-to-b from-transparent via-[#FF6B6B]/[0.03] to-transparent">
        <div className="max-w-[600px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.06]"
          >
            <div className="mb-6">
              <p className="text-white/40 text-sm font-light mb-2">Koçluk + AI + Body Doubling + Pod</p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-white/90 text-5xl md:text-6xl font-light">₺2.997</span>
                <span className="text-white/40 text-lg font-light">/ay</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px flex-1 bg-white/[0.06]" />
              <span className="text-white/30 text-xs">vs ₺8.000-12.000 geleneksel koçluk</span>
              <div className="h-px flex-1 bg-white/[0.06]" />
            </div>

            <ul className="space-y-3 text-left mb-8">
              {[
                "Haftalık 45 dakika 1:1 koçluk seansları",
                "7/24 AI Dopamin Koçu desteği",
                "Sınırsız Body Doubling seansları",
                "Eşleştirilmiş akran Pod grubu (4-5 kişi)",
                "Tam ekosistem erişimi",
                "İstediğin zaman iptal"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#FF6B6B]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#FF6B6B]" />
                  </div>
                  <span className="text-white/60 text-sm font-light">{item}</span>
                </li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full px-8 py-4 rounded-xl",
                "bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53]",
                "text-white text-base font-medium",
                "transition-all duration-300",
                "hover:shadow-xl hover:shadow-[#FF6B6B]/25",
                "flex items-center justify-center gap-3"
              )}
            >
              <span>Koçunla eşleş</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <p className="text-white/30 text-xs mt-4 font-light">
              5 dakika sürer • 48 saat içinde başla
            </p>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ====== FAQ (CUSTOM ACCORDION) ====== */}
      <AnimatedSection className="py-20 px-5 md:px-8 lg:px-16">
        <div className="max-w-[700px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-white/90 text-2xl md:text-3xl font-light tracking-tight mb-3">
              Sıkça sorulan sorular
            </h2>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openFaq === index}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ====== FINAL CTA ====== */}
      <AnimatedSection className="py-24 px-5 md:px-8 lg:px-16">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="text-white/90 text-2xl md:text-3xl font-light tracking-tight mb-4">
            Sonunda bitirmeye hazır mısın?
          </h2>
          <p className="text-white/40 text-sm md:text-base font-light mb-8 max-w-[400px] mx-auto">
            Projen yeterince bekledi. Hayata geçirmenin zamanı geldi.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "px-8 py-4 rounded-xl",
              "bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53]",
              "text-white text-base font-medium",
              "transition-all duration-300",
              "hover:shadow-xl hover:shadow-[#FF6B6B]/25",
              "flex items-center gap-3 mx-auto"
            )}
          >
            <span>Koçunla eşleş</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="py-12 px-5 md:px-8 border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <span className="text-white/50 text-sm font-medium">DopaLive</span>
          </div>
          <p className="text-white/20 text-xs font-light">
            © 2024 DopaLive. Anlayan insanlar tarafından yapıldı.
          </p>
        </div>
      </footer>
    </main>
  );
}
