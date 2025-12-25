'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Brain,
  Flame,
  Heart,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Users,
  Sparkles,
  Target,
  Clock,
  Zap,
  Play,
  Timer,
  Bot,
  Calendar,
  BarChart3,
  Layers,
  Video,
  Focus,
  List
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { fadeInUp } from '@/lib/motion';

/**
 * Testimonial Card Component
 */
const TestimonialCard = ({ 
  quote, 
  author, 
  role
}: { 
  quote: string; 
  author: string; 
  role: string; 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
    className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
  >
    <p className="text-foreground/70 text-[15px] leading-relaxed mb-5">&quot;{quote}&quot;</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-warm flex items-center justify-center text-white font-semibold text-sm">
        {author.charAt(0)}
      </div>
      <div>
        <p className="text-foreground font-medium text-sm">{author}</p>
        <p className="text-muted-foreground text-xs">{role}</p>
      </div>
    </div>
  </motion.div>
);

export default function Home() {
  return (
    <main className="relative">
      
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20 px-5 md:px-8 overflow-hidden">
        {/* Warm ambient background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-primary/10 rounded-full blur-[180px]" />
          <div className="absolute bottom-0 right-0 w-[700px] h-[500px] bg-secondary/12 rounded-full blur-[150px]" />
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px]" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
              >
                <Brain className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium">DopaLive • ADHD/DEHB Koçluk (Beta)</span>
              </motion.div>
              
              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.8, 0.25, 1] }}
                className="text-4xl md:text-5xl lg:text-[3.3rem] font-bold text-foreground leading-[1.1] tracking-tight mb-6 font-display"
              >
                ADHD/DEHB için kişisel koç, alışkanlık ve sistem tasarımı
              </motion.h1>
              
              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.8, 0.25, 1] }}
                className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
              >
                DopaLive, 350M+ ADHD/DEHB’li yetişkin için tasarlanmış koçluk ve araç ekosistemi.
                Sana özel koç, beceri kazanımı, alışkanlık kurma ve kişisel sistemler.
                <span className="text-foreground/80"> Beta: sınırlı kontenjan, daha erişilebilir ürün yolda.</span>
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <Link
                  href="/start"
                  className="group inline-flex flex-col items-center justify-center px-10 py-5 rounded-2xl bg-gradient-warm text-white hover:opacity-90 transition-all shadow-warm-lg hover:scale-[1.02]"
                >
                  <span className="flex items-center gap-2 text-lg font-bold tracking-wide">
                    Zihin Profili Testi
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-white/80 text-sm font-normal mt-1">
                    erken erişim biletini kap
                  </span>
                </Link>
                
                <Link
                  href="/science"
                  className="inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-muted border border-border text-foreground/80 font-medium text-lg hover:bg-muted/80 transition-all"
                >
                  <Play className="w-5 h-5" />
                  Odaklanma Rehberi
                </Link>
              </motion.div>
              
              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Ücretsiz başla</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Nörobilim tabanlı</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>DEHB uzmanları</span>
                </div>
              </motion.div>
            </div>
            
            {/* App Mockup - Clean symmetric design */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.8, 0.25, 1] }}
              className="relative hidden lg:block"
            >
              {/* Outer glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-[2rem] blur-xl" />
              
              {/* Main Card with symmetric border */}
              <div className="relative p-8 rounded-[2rem] bg-card/80 backdrop-blur-xl border-2 border-border/50 shadow-2xl">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border/50">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-warm flex items-center justify-center shadow-warm-md">
                    <Bot className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-foreground font-bold text-lg">Dopa</span>
                      <span className="px-2 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-semibold">AI</span>
                    </div>
                    <p className="text-muted-foreground text-sm">Kişisel Dopamin Koçun</p>
                  </div>
                </div>
                
                {/* Chat */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-end">
                    <div className="max-w-[85%] p-4 rounded-2xl rounded-tr-md bg-primary/10 border border-primary/20">
                      <p className="text-foreground text-sm">
                        Başlamam gereken bir proje var ama elim gitmiyor 😩
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[85%] p-4 rounded-2xl rounded-tl-md bg-muted border border-border">
                      <p className="text-foreground/80 text-sm leading-relaxed">
                        Anlıyorum! Şimdi sadece <span className="text-primary font-medium">1 mikro-adım</span> seçelim. 
                        Projenin en küçük parçası ne olabilir?
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-2">
                  <button className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-medium hover:bg-primary/15 transition-colors">
                    ✨ Parçala
                  </button>
                  <button className="p-3 rounded-xl bg-secondary/10 border border-secondary/20 text-secondary text-xs font-medium hover:bg-secondary/15 transition-colors">
                    ⚡ Odaklan
                  </button>
                  <button className="p-3 rounded-xl bg-success/10 border border-success/20 text-success text-xs font-medium hover:bg-success/15 transition-colors">
                    🎯 Başla
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROBLEM - 5 Cards including Erteleme */}
      <section className="py-24 lg:py-32 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Tanıdık geliyor mu?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 font-display">
              &quot;Neden herkes yapabiliyor da ben yapamıyorum?&quot;
            </h2>
            <p className="text-muted-foreground text-lg">
              Bu düşünce DEHB&apos;li bireylerin en sık yaşadığı düşüncelerden biri. 
              Ama sorun sende değil - beynin farklı çalışıyor.
            </p>
          </motion.div>
          
          {/* 9 Cards - Grid Layout (3 cols mobile and desktop) */}
          <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto">
            {[
              {
                icon: Sparkles,
                title: "Başlayamama",
                desc: "Yapman gerekeni biliyorsun ama başlayamıyorsun."
              },
              {
                icon: Clock,
                title: "Zaman Körlüğü",
                desc: "5 dakika da 5 saat de aynı hissettiriyor."
              },
              {
                icon: Target,
                title: "Dağılan Odak",
                desc: "Bir şeye başlıyorsun, üç yerde buluyorsun kendini."
              },
              {
                icon: Zap,
                title: "Tükenmişlik",
                desc: "Hep 'daha çok çabala' duydun. Yoruldun."
              },
              {
                icon: Timer,
                title: "Erteleme",
                desc: "Son dakikaya kadar bırakıp panikle bitiriyorsun."
              },
              {
                icon: Focus,
                title: "Hyperfocus",
                desc: "İlgini çeken bir şeye saatlerce takılıp kalıyorsun, zamanı unutuyorsun."
              },
              {
                icon: Brain,
                title: "Unutkanlık",
                desc: "Önemli şeyleri unutuyorsun, aklında tutmak zor geliyor."
              },
              {
                icon: Heart,
                title: "Duygu Regülasyonu",
                desc: "Duyguların yoğun ve ani değişiyor, kontrol etmek zorlaşıyor."
              },
              {
                icon: Zap,
                title: "Dürtüsellik",
                desc: "Aklına geleni hemen yapıyorsun, düşünmeden hareket ediyorsun."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, ease: [0.25, 0.8, 0.25, 1] }}
                className="p-5 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-warm-sm h-full"
              >
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-foreground/70" />
                  </div>
                  <h3 className="text-foreground font-bold text-base mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-muted-foreground mt-12 max-w-2xl mx-auto"
          >
            Geleneksel yöntemler DEHB beyni için tasarlanmadı.{' '}
            <span className="text-primary font-medium">DopaLive farklı.</span>
          </motion.p>
        </div>
      </section>

      {/* SOLUTION - Updated features */}
      <section id="features" className="py-24 lg:py-32 px-5 md:px-8 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Brain className="w-4 h-4" />
              Neden DopaLive?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 font-display">
              DEHB beyni için <span className="text-gradient">tasarlandı</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Nörobilim tabanlı araçlar, AI koçluk ve gerçek insan desteği bir arada.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Bot,
                title: "Doppa - AI Dopamin Koçu",
                desc: "7/24 aktif, beyninin nasıl çalıştığını bilen AI asistan. Görev parçalama, motivasyon desteği ve kişisel stratejiler.",
                highlight: true
              },
              {
                icon: Video,
                title: "Body Doubling Seansları",
                desc: "Günlük canlı çalışma odaları. Dünya genelinden insanlarla birlikte çalış, yalnız olmadığını hisset. DEHB beyninin odaklanmasını %40 artıran kanıtlanmış teknik.",
                highlight: false
              },
              {
                icon: Users,
                title: "Destekleyici Topluluk",
                desc: "Seni anlayan insanlarla bağlan. Deneyimlerini paylaş, motivasyonunu artır, yalnız olmadığını hisset.",
                highlight: false
              },
              {
                icon: Target,
                title: "Kişisel Dopamin Profili",
                desc: "Nörokimyasal analizle güçlü yanlarını ve zorluklarını keşfet. Sana özel stratejiler oluştur.",
                highlight: false
              },
              {
                icon: Layers,
                title: "Akıllı Görev Parçalama",
                desc: "Büyük projeleri yönetilebilir mikro-adımlara böl. DEHB beyni için optimize edilmiş iş akışları.",
                highlight: false
              },
              {
                icon: Calendar,
                title: "1:1 Uzman Koçluk",
                desc: "DEHB sertifikalı koçlarla haftalık seanslar. Projelerin bitmesi için gerçek hesap verebilirlik.",
                highlight: false
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, ease: [0.25, 0.8, 0.25, 1] }}
                className={cn(
                  "p-6 rounded-2xl border transition-all duration-300",
                  item.highlight 
                    ? "bg-gradient-to-b from-primary/10 to-transparent border-2 border-orange-400/80 hover:border-orange-500 shadow-warm-sm"
                    : "bg-card border-border hover:border-primary/20"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                  item.highlight ? "bg-primary/20" : "bg-muted"
                )}>
                  <item.icon className={cn("w-6 h-6", item.highlight ? "text-primary" : "text-muted-foreground")} />
                </div>
                <h3 className="text-foreground font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 lg:py-32 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 text-secondary-foreground text-sm font-medium mb-6">
              <Heart className="w-4 h-4 text-primary" />
              Gerçek Hikayeler
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 font-display">
              Kullanıcılarımız ne diyor?
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard
              quote="Dopa sayesinde artık projelere başlamak o kadar da zor gelmiyor. Mikro-adım yaklaşımı hayatımı değiştirdi."
              author="Elif K."
              role="Yazılım Mühendisi"
            />
            <TestimonialCard
              quote="Body doubling seansları inanılmaz. Yalnız çalışamıyordum, şimdi her gün odaklanabiliyorum."
              author="Mert T."
              role="Girişimci"
            />
            <TestimonialCard
              quote="Topluluk muhteşem. Beni anlayan insanlarla tanışmak, yalnız olmadığımı hissetmek çok değerli."
              author="Zeynep A."
              role="Üniversite Öğrencisi"
            />
          </div>
        </div>
      </section>

      {/* PRICING - Updated with real pricing */}
      <section className="py-24 lg:py-32 px-5 md:px-8 bg-gradient-to-b from-transparent via-secondary/[0.03] to-transparent">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 font-display">
              Fiyatlandırma
            </h2>
            <p className="text-muted-foreground text-lg">
              Önce testi çöz, sana en uygun planı önerelim.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Başlangıç - Free */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0, ease: [0.25, 0.8, 0.25, 1] }}
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
                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/start"
                className="group flex flex-col items-center justify-center w-full py-4 rounded-xl bg-muted text-foreground hover:bg-muted/80 border border-border transition-all mt-auto"
              >
                <span className="font-bold">TESTİ ÇÖZ</span>
                <span className="text-muted-foreground text-xs mt-0.5">erken erişime katıl</span>
              </Link>
            </motion.div>
            
            {/* Odak */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, ease: [0.25, 0.8, 0.25, 1] }}
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
                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/start"
                className="group flex flex-col items-center justify-center w-full py-4 rounded-xl bg-muted text-foreground hover:bg-muted/80 border border-border transition-all mt-auto"
              >
                <span className="font-bold">TESTİ ÇÖZ</span>
                <span className="text-muted-foreground text-xs mt-0.5">erken erişime katıl</span>
              </Link>
            </motion.div>
            
            {/* Dönüşüm - Premium */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, ease: [0.25, 0.8, 0.25, 1] }}
              className="p-6 rounded-3xl bg-gradient-to-b from-primary/15 to-transparent border-2 border-primary/50 relative flex flex-col shadow-lg shadow-primary/10"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-warm text-white text-xs font-bold shadow-warm-md">
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
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/start"
                className="group flex flex-col items-center justify-center w-full py-4 rounded-xl bg-gradient-warm text-white hover:opacity-90 transition-all shadow-warm-md mt-auto"
              >
                <span className="font-bold">TESTİ ÇÖZ</span>
                <span className="text-white/70 text-xs mt-0.5">erken erişime katıl</span>
              </Link>
            </motion.div>
          </div>
          
          {/* Price comparison */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12 p-6 rounded-2xl bg-muted/50 border border-border max-w-lg mx-auto"
          >
            <p className="text-muted-foreground text-sm mb-2">Geleneksel ADHD koçluk: ₺8.000-12.000/ay</p>
            <p className="text-foreground font-semibold">DopaLive Dönüşüm ile <span className="text-success">%60-70 tasarruf</span></p>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 lg:py-32 px-5 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.25, 0.8, 0.25, 1] }}
          >
            <div className="w-24 h-24 rounded-3xl bg-gradient-warm flex items-center justify-center mx-auto mb-10 shadow-warm-xl">
              <Flame className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-display">
              Dopamin haritanı keşfetmeye hazır mısın?
            </h2>
            
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12">
              5 dakikalık ücretsiz test ile beyninin motivasyon, dikkat ve enerji sistemlerini anla.
            </p>
            
        <Link 
              href="/start"
              className="inline-flex items-center justify-center gap-3 px-12 py-6 rounded-2xl bg-gradient-warm text-white font-bold text-xl hover:opacity-90 transition-all shadow-warm-xl"
        >
              Testi Çöz
              <ArrowRight className="w-6 h-6" />
        </Link>
          </motion.div>
      </div>
      </section>
    </main>
  );
}
