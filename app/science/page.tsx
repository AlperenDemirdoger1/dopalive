'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import {
  Brain,
  Heart,
  Sparkles,
  Zap,
  Users,
  ArrowRight,
  Activity,
  Target,
  Clock,
  Shield,
  Lightbulb,
  TrendingUp,
  BookOpen,
  FlaskConical,
  Atom,
  Waves,
  Sun,
  Moon,
  CircleDot,
  Network,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatCard, StatsRow } from '@/components/StatCard';
import Accordion from '@/components/Accordion';

// ============================================
// HERO SECTION
// ============================================
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-5 md:px-8 py-32">
      {/* Neural network background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated neurotransmitter paths */}
        <svg className="absolute w-full h-full opacity-[0.04]" viewBox="0 0 1000 1000">
          <defs>
            <linearGradient id="dopamineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="100%" stopColor="#FF8E53" />
            </linearGradient>
            <linearGradient id="serotoninGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
            <linearGradient id="noradrenalineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
          </defs>
          
          {/* Neural pathways */}
          <path d="M100,400 Q300,200 500,400 T900,400" stroke="url(#dopamineGrad)" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M100,500 Q350,300 600,500 T1000,500" stroke="url(#serotoninGrad)" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M0,600 Q250,400 500,600 T1000,600" stroke="url(#noradrenalineGrad)" strokeWidth="2" fill="none" opacity="0.6" />
          
          {/* Synaptic nodes */}
          {[
            { cx: 100, cy: 400, color: '#FF6B6B' },
            { cx: 300, cy: 300, color: '#FF6B6B' },
            { cx: 500, cy: 400, color: '#FF6B6B' },
            { cx: 700, cy: 300, color: '#FF6B6B' },
            { cx: 900, cy: 400, color: '#FF6B6B' },
            { cx: 200, cy: 500, color: '#10B981' },
            { cx: 450, cy: 400, color: '#10B981' },
            { cx: 700, cy: 500, color: '#10B981' },
            { cx: 950, cy: 450, color: '#10B981' },
            { cx: 150, cy: 600, color: '#8B5CF6' },
            { cx: 400, cy: 500, color: '#8B5CF6' },
            { cx: 650, cy: 600, color: '#8B5CF6' },
            { cx: 850, cy: 550, color: '#8B5CF6' },
          ].map((node, i) => (
            <circle key={i} cx={node.cx} cy={node.cy} r="5" fill={node.color} opacity="0.4">
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
        
        {/* Central brain glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B]/10 via-[#10B981]/10 to-[#8B5CF6]/10 rounded-full blur-[100px]" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="rounded-full px-4 py-2 inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.06]">
            <FlaskConical className="w-4 h-4 text-[#FF6B6B]/70" />
            <span className="text-white/50 text-xs font-medium tracking-wider uppercase">
              Nörobilim Destekli Yaklaşım
            </span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-white mb-6"
          style={{
            fontSize: 'clamp(28px, 5.5vw, 56px)',
            lineHeight: '1.15',
            letterSpacing: '-0.03em',
            fontWeight: 300,
          }}
        >
          Beyninin diline göre
          <br />
          <span className="text-gradient">tasarlandı.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-white/40 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed"
        >
          DopaLive, <span className="text-[#FF6B6B]">dopamin</span>–<span className="text-[#10B981]">serotonin</span>–<span className="text-[#8B5CF6]">noradrenalin</span> döngülerini,
          davranış bilimini ve birlikte odaklanma (co-regulation) prensiplerini
          bir araya getiren bilimsel bir sistemdir.
        </motion.p>

        {/* Neurotransmitter pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-8"
        >
          {[
            { name: 'Dopamin', color: '#FF6B6B', desc: 'Motivasyon' },
            { name: 'Serotonin', color: '#10B981', desc: 'Denge' },
            { name: 'Noradrenalin', color: '#8B5CF6', desc: 'Odak' },
          ].map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/[0.05]"
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-white/70 text-sm">{item.name}</span>
              <span className="text-white/30 text-xs">({item.desc})</span>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-white/20"
          >
            <span className="text-xs tracking-wider uppercase">Bilimi keşfet</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// NEUROTRANSMITTER SECTION
// ============================================
const neurotransmitters = [
  {
    name: 'Dopamin',
    subtitle: 'Motivasyon Molekülü',
    color: '#FF6B6B',
    bgColor: 'bg-[#FF6B6B]',
    icon: Zap,
    description: 'Ödül beklentisi ve motivasyonu yöneten nörotransmitter. ADHD beyinlerinde genellikle düşük seviyededir.',
    role: 'Proje başlatma ve sürdürme motivasyonu',
    inDopaLive: [
      'Mikro-ödül sistemi ile dopamin döngüsünü destekler',
      'İlerleme görselleştirmesi ile anlık tatmin sağlar',
      'Hedef odaklı görev bölümlemesi',
    ],
  },
  {
    name: 'Serotonin',
    subtitle: 'Denge Molekülü',
    color: '#10B981',
    bgColor: 'bg-emerald-500',
    icon: Sun,
    description: 'Ruh hali, uyku ve duygusal dengeyi düzenler. Düşük seviyeleri anksiyete ve dürtüselliğe yol açabilir.',
    role: 'Duygusal regülasyon ve sabır',
    inDopaLive: [
      'Topluluk desteği ile sosyal bağ güçlendirir',
      'Düzenli rutinler önerir ve destekler',
      'Başarı kutlamaları ile pozitif güçlendirme',
    ],
  },
  {
    name: 'Noradrenalin',
    subtitle: 'Odak Molekülü',
    color: '#8B5CF6',
    bgColor: 'bg-violet-500',
    icon: Target,
    description: 'Dikkat, uyanıklık ve odaklanmayı kontrol eder. Stres tepkisi ve "savaş ya da kaç" mekanizmasında rol oynar.',
    role: 'Konsantrasyon ve dikkat sürdürme',
    inDopaLive: [
      'Odak seansları ile dikkat süresini optimize eder',
      'Body doubling ile noradrenerjik aktivasyonu artırır',
      'Uygun stres seviyesi için tempo ayarı',
    ],
  },
];

const NeurotransmitterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 px-5 md:px-8">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[400px] bg-[#FF6B6B] opacity-[0.02] top-0 left-0 rounded-full blur-[150px]" />
        <div className="absolute w-[600px] h-[400px] bg-[#10B981] opacity-[0.02] top-1/2 right-0 rounded-full blur-[150px]" />
        <div className="absolute w-[600px] h-[400px] bg-[#8B5CF6] opacity-[0.02] bottom-0 left-1/3 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Atom className="w-5 h-5 text-[#FF6B6B]" />
            <span className="text-[#FF6B6B] text-sm font-medium">Nörokimya</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-tight">
            Üç Nörotransmitter, <span className="text-gradient">Bir Sistem</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto">
            ADHD beyninin ihtiyaç duyduğu nörokimyasal dengeyi anlamak,
            etkili çözümler üretmenin ilk adımıdır.
          </p>
        </motion.div>

        {/* Neurotransmitter Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {neurotransmitters.map((nt, index) => (
            <motion.div
              key={nt.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                style={{ backgroundColor: nt.color, opacity: 0.1 }}
              />
              
              <div className="h-full p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-300">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: nt.color }} />
                      <h3 className="text-xl font-medium text-white">{nt.name}</h3>
                    </div>
                    <p className="text-sm" style={{ color: nt.color }}>{nt.subtitle}</p>
                  </div>
                  <div
                    className="p-2.5 rounded-xl"
                    style={{ backgroundColor: `${nt.color}15` }}
                  >
                    <nt.icon className="w-5 h-5" style={{ color: nt.color }} />
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/50 text-sm mb-4 leading-relaxed">
                  {nt.description}
                </p>

                {/* Role */}
                <div className="mb-4 p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                  <span className="text-[10px] uppercase tracking-wider text-white/30 block mb-1">Rolü</span>
                  <p className="text-white/70 text-sm">{nt.role}</p>
                </div>

                {/* DopaLive Integration */}
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-white/30 block mb-2">DopaLive'da</span>
                  <ul className="space-y-2">
                    {nt.inDopaLive.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/50">
                        <div className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ backgroundColor: nt.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// CO-REGULATION SECTION
// ============================================
const CoRegulationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-[#10B981]" />
              <span className="text-[#10B981] text-sm font-medium">Co-Regulation</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-tight">
              Birlikte odaklanmak,
              <br />
              <span className="text-gradient">yalnız kalmamak.</span>
            </h2>

            <div className="space-y-4 text-white/50 leading-relaxed">
              <p>
                <span className="text-white/70 font-medium">Co-regulation (birlikte düzenleme)</span>, 
                bir kişinin sinir sisteminin başka birinin varlığıyla dengelenmesi sürecidir.
                Bu, bebeklikten itibaren gelişen temel bir insan ihtiyacıdır.
              </p>
              
              <p>
                ADHD bireyler için co-regulation özellikle önemlidir çünkü:
              </p>

              <ul className="space-y-3 pl-4">
                {[
                  'Dış düzenleme, iç düzenlemeyi tetikler',
                  'Sosyal ipuçları odağı korumaya yardımcı olur',
                  'Hesap verebilirlik motivasyonu artırır',
                  '"Yalnız değilim" hissi anksiyeteyi azaltır',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p>
                <span className="text-[#10B981]">Body doubling</span> (beden eşliği), 
                co-regulation'ın pratik bir uygulamasıdır—yanında biri çalışırken 
                odaklanmanın daha kolay olması bu yüzdendir.
              </p>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Connection visualization */}
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Central glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-[#10B981]/10 rounded-full blur-2xl" />
              </div>

              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                <defs>
                  <linearGradient id="connectionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                {/* Center to surrounding connections */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const x = 200 + Math.cos(rad) * 120;
                  const y = 200 + Math.sin(rad) * 120;
                  return (
                    <line
                      key={i}
                      x1="200"
                      y1="200"
                      x2={x}
                      y2={y}
                      stroke="url(#connectionGrad)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="0;8"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </line>
                  );
                })}
              </svg>

              {/* People icons */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x = 50 + Math.cos(rad) * 30;
                const y = 50 + Math.sin(rad) * 30;
                return (
                  <motion.div
                    key={i}
                    className="absolute w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  >
                    <Users className="w-5 h-5 text-white/40" />
                  </motion.div>
                );
              })}

              {/* Center "You" */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-[#10B981] font-medium">Sen</span>
              </motion.div>

              {/* Label */}
              <motion.div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <p className="text-white/30 text-sm">Topluluk ile co-regulation</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// BEHAVIORAL SCIENCE SECTION
// ============================================
const behaviorPrinciples = [
  {
    icon: Activity,
    title: 'Değişken Ödül Oranı',
    description: 'Öngörülemeyen ödüller dopamin salınımını artırır. DopaLive, beklenmedik başarı rozeti ve kutlamalarla bu prensibi uygular.',
    source: 'B.F. Skinner, Operant Conditioning',
  },
  {
    icon: Target,
    title: 'Hedef Yakınlık Etkisi',
    description: 'Hedefe yaklaştıkça motivasyon artar. İlerleme çubukları ve "az kaldı" bildirimleri bu etkiyi kullanır.',
    source: 'Goal Gradient Theory',
  },
  {
    icon: Clock,
    title: 'Zamansal Çerçeveleme',
    description: 'ADHD beyni "şimdi" ve "şimdi değil" arasında düşünür. Görevleri küçük, acil parçalara bölmek başlamayı kolaylaştırır.',
    source: 'Dr. Russell Barkley',
  },
  {
    icon: Shield,
    title: 'Uygulama Niyetleri',
    description: '"X olduğunda Y yapacağım" formatındaki planlar, otomatik davranış oluşturur ve başlama sürtünmesini azaltır.',
    source: 'Peter Gollwitzer',
  },
  {
    icon: Network,
    title: 'Sosyal Kolaylaştırma',
    description: 'Başkalarının varlığında performans artar. Body doubling ve pod çalışmaları bu fenomeni kullanır.',
    source: 'Social Facilitation Theory',
  },
  {
    icon: Lightbulb,
    title: 'Çevre Tasarımı',
    description: 'İrade yerine çevreyi değiştirmek daha etkilidir. Dikkat dağıtıcıları azaltan arayüz tasarımı buna örnektir.',
    source: 'Choice Architecture',
  },
];

const BehavioralScienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 px-5 md:px-8">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[800px] h-[400px] bg-[#f5d4a0] opacity-[0.015] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-[#f5d4a0]" />
            <span className="text-[#f5d4a0] text-sm font-medium">Davranış Bilimi</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-tight">
            Kanıtlanmış <span className="text-gradient">prensipler</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto">
            Her özellik, onlarca yıllık psikoloji ve davranış bilimi araştırmalarına dayanır.
          </p>
        </motion.div>

        {/* Principles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {behaviorPrinciples.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#f5d4a0]/20 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-[#f5d4a0]/10 group-hover:bg-[#f5d4a0]/15 transition-colors">
                  <principle.icon className="w-5 h-5 text-[#f5d4a0]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-2">{principle.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-3">
                    {principle.description}
                  </p>
                  <p className="text-white/20 text-xs italic">{principle.source}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// STATS SECTION
// ============================================
const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 px-5 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-tight">
            Ölçülebilir <span className="text-gradient">sonuçlar</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Metodolojimizin koçluk pratiği ve kullanıcı araştırmalarından elde edilen sonuçları.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          <StatCard
            value={73}
            suffix="%"
            label="Proje Tamamlama"
            sublabel="ADHD bireylerde %23 baseline'a karşı"
            icon={TrendingUp}
            variant="coral"
            delay={0}
          />
          <StatCard
            value={3}
            suffix="x"
            label="Görev Başlatma"
            sublabel="Zorlu görevlerde başlama süresinde iyileşme"
            icon={Zap}
            variant="success"
            delay={0.15}
          />
          <StatCard
            value={68}
            suffix="%"
            label="Öz-Yeterlik Artışı"
            sublabel="Projeleri tamamlayabileceğine inanç"
            icon={Sparkles}
            variant="highlight"
            delay={0.3}
          />
        </div>

        {/* Methodology note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-white/30 text-xs mt-8"
        >
          Pratisyen raporları ve ön kullanıcı araştırmalarına dayanmaktadır. Tam doğrulama çalışması devam etmektedir.
        </motion.p>
      </div>
    </section>
  );
};

// ============================================
// DEEP DIVE ACCORDION
// ============================================
const DeepDiveSection = () => {
  const accordionItems = [
    {
      id: 'adhd-brain',
      title: 'ADHD Beyni Nasıl Çalışır?',
      icon: <Brain className="w-5 h-5 text-[#FF6B6B]" />,
      content: (
        <div className="space-y-4">
          <p>
            ADHD (Dikkat Eksikliği Hiperaktivite Bozukluğu), beyindeki prefrontal korteks ve 
            bazal ganglionların işleyişindeki farklılıklarla karakterize edilir.
          </p>
          <div className="grid md:grid-cols-3 gap-4 my-4">
            {[
              { title: 'Prefrontal Korteks', desc: 'Planlama, karar verme, dürtü kontrolü' },
              { title: 'Bazal Ganglionlar', desc: 'Hareket başlatma, motivasyon' },
              { title: 'Limbik Sistem', desc: 'Duygusal düzenleme, ödül işleme' },
            ].map((area) => (
              <div key={area.title} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                <p className="text-white/70 text-sm font-medium">{area.title}</p>
                <p className="text-white/40 text-xs mt-1">{area.desc}</p>
              </div>
            ))}
          </div>
          <p>
            Bu bölgelerdeki dopamin ve noradrenalin iletimi tipik beyinlere göre farklıdır, 
            bu da dikkat, motivasyon ve dürtü kontrolü ile ilgili zorlukları açıklar.
          </p>
        </div>
      ),
    },
    {
      id: 'dopamine-cycle',
      title: 'Dopamin Döngüsü ve Motivasyon',
      icon: <Zap className="w-5 h-5 text-[#FF6B6B]" />,
      content: (
        <div className="space-y-4">
          <p>
            Dopamin sadece "zevk" hormonu değildir—asıl işlevi <span className="text-[#FF6B6B]">motivasyon</span> ve 
            <span className="text-[#FF6B6B]"> ödül beklentisi</span> oluşturmaktır.
          </p>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <p className="text-white/60 text-sm italic">
              "Dopamin, ödülü aldığınızda değil, ödülü <strong>beklediğinizde</strong> salınır. 
              Bu yüzden ADHD beyinleri için uzak ödüller motive edici değildir—anında geri bildirim gerekir."
            </p>
            <p className="text-white/30 text-xs mt-2">— Dr. Andrew Huberman</p>
          </div>
          <p>
            DopaLive, görevleri küçük, ölçülebilir parçalara bölerek ve her aşamada 
            geri bildirim sağlayarak dopamin döngüsünü destekler.
          </p>
        </div>
      ),
    },
    {
      id: 'body-doubling',
      title: 'Body Doubling Neden İşe Yarar?',
      icon: <Users className="w-5 h-5 text-[#10B981]" />,
      content: (
        <div className="space-y-4">
          <p>
            Body doubling, başka birinin fiziksel veya sanal varlığında çalışma pratiğidir. 
            ADHD topluluğunda yaygın olarak kullanılan bu yöntemin arkasında sağlam bir nörobilim vardır:
          </p>
          <ul className="space-y-2">
            {[
              'Sosyal beyin devreleri aktive olur → dikkat artar',
              'Ayna nöronlar çalışma davranışını tetikler',
              'Sosyal hesap verebilirlik dürtüselliği azaltır',
              'Co-regulation sinir sistemini düzenler',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-2 shrink-0" />
                <span className="text-white/60">{item}</span>
              </li>
            ))}
          </ul>
          <p>
            Araştırmalar, body doubling'in özellikle başlama güçlüğü ve görev sürdürmede 
            belirgin iyileşme sağladığını göstermektedir.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section className="relative py-24 px-5 md:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-tight">
            Derine <span className="text-gradient">dal</span>
          </h2>
          <p className="text-white/40">Bilimi daha yakından incele.</p>
        </motion.div>

        <Accordion items={accordionItems} allowMultiple defaultOpen={['adhd-brain']} />
      </div>
    </section>
  );
};

// ============================================
// CTA SECTION
// ============================================
const CTASection = () => {
  return (
    <section className="relative py-32 px-5 md:px-8">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[800px] h-[400px] bg-[#FF6B6B] opacity-[0.03] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-5xl font-light text-white mb-6 tracking-tight">
          Bilimi <span className="text-gradient">deneyimle</span>
        </h2>
        <p className="text-white/40 text-lg mb-10 max-w-lg mx-auto">
          Nörobilim destekli araçlarımızı keşfet ve beynine uygun çalışmaya başla.
        </p>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/hero"
            className={cn(
              'inline-flex items-center gap-3 px-8 py-4 rounded-xl',
              'bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53]',
              'text-white text-base font-medium',
              'transition-all duration-300',
              'hover:shadow-lg hover:shadow-[#FF6B6B]/20'
            )}
          >
            <span>Erken Erişim</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        <p className="text-white/20 text-sm mt-6">
          Ücretsiz • Kredi kartı gerekmez
        </p>
      </motion.div>
    </section>
  );
};

// ============================================
// NAVIGATION
// ============================================
const ScienceNavigation = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-5 md:px-8 py-5"
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/hero" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center"
          >
            <div className="w-3 h-3 rounded-full border border-[#FF6B6B]/60" />
          </motion.div>
          <span className="text-white/80 text-base font-light tracking-tight">dopalive</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/hero" className="text-white/40 text-sm hover:text-white/70 transition-colors">
            Ana Sayfa
          </Link>
          <Link href="/science" className="text-[#FF6B6B] text-sm">
            Bilim
          </Link>
        </div>

        {/* CTA */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/hero"
            className={cn(
              'px-4 py-2 rounded-lg text-sm',
              'bg-[#FF6B6B]/[0.1] border border-[#FF6B6B]/20',
              'text-white/70 hover:text-[#FF6B6B]',
              'hover:border-[#FF6B6B]/30 transition-all duration-300'
            )}
          >
            Erken Erişim
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
};

// ============================================
// MAIN PAGE
// ============================================
export default function SciencePage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0a0a0a]">
      {/* Ambient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-[#0a0a0a] to-[#050505]" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute w-[600px] h-[300px] bg-[#FF6B6B] opacity-[0.02] top-[-100px] left-1/2 -translate-x-1/2 rounded-full blur-[120px]"
        />

        <div className="absolute w-[400px] h-[400px] bg-[#10B981] opacity-[0.015] top-[20%] left-[-150px] rounded-full blur-[100px]" />
        <div className="absolute w-[400px] h-[400px] bg-[#8B5CF6] opacity-[0.015] top-[40%] right-[-150px] rounded-full blur-[100px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Navigation */}
      <ScienceNavigation />

      {/* Content */}
      <HeroSection />
      <NeurotransmitterSection />
      <CoRegulationSection />
      <BehavioralScienceSection />
      <StatsSection />
      <DeepDiveSection />
      <CTASection />

      {/* Footer spacer */}
      <div className="h-20" />
    </main>
  );
}

