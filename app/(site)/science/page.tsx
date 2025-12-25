'use client';

import Link from 'next/link';
import {
  Zap,
  ArrowRight,
  Target,
  FlaskConical,
  Atom,
  Sun,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================
// HERO SECTION
// ============================================
const HeroSection = () => {
  return (
    <section className="relative py-24 lg:py-32 px-5 md:px-8">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="mb-8">
          <div className="rounded-full px-4 py-2 inline-flex items-center gap-2 bg-primary/10 border border-primary/20">
            <FlaskConical className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
              Nörobilim Destekli Yaklaşım
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-foreground mb-6 font-display text-3xl md:text-4xl lg:text-5xl font-bold">
          Beyninin diline göre
          <br />
          <span className="text-primary">tasarlandı.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          DopaLive, <span className="text-primary font-medium">dopamin</span>–<span className="text-success font-medium">serotonin</span>–<span className="text-secondary font-medium">noradrenalin</span> döngülerini,
          davranış bilimi ve birlikte odaklanma prensipleriyle odak ve tamamlama için tasarlandı.
        </p>

        {/* Neurotransmitter pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          {[
            { name: 'Dopamin', color: '#FF6B6B', desc: 'Motivasyon' },
            { name: 'Serotonin', color: '#10B981', desc: 'Denge' },
            { name: 'Noradrenalin', color: '#8B5CF6', desc: 'Odak' },
          ].map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border"
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-foreground text-sm">{item.name}</span>
              <span className="text-muted-foreground text-xs">({item.desc})</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12">
          <Link
            href="/start"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-warm text-white font-bold text-lg hover:opacity-90 transition-all shadow-warm-lg"
          >
            DEHB Testi
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

// ============================================
// NEUROTRANSMITTER DATA
// ============================================
const neurotransmitters = [
  {
    name: 'Dopamin',
    subtitle: 'Motivasyon Molekülü',
    color: '#FF6B6B',
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
    icon: Sun,
    description: 'Ruh hali, uyku ve duygusal dengeyi düzenler. Düşük seviyeleri anksiyete ve dürtüselliğe yol açabilir.',
    role: 'Duygusal regülasyon ve sabır',
    inDopaLive: [
      'Topluluk desteği ile sosyal bağ',
      'Düzenli mikro rutin önerileri',
    ],
  },
  {
    name: 'Noradrenalin',
    subtitle: 'Odak Molekülü',
    color: '#8B5CF6',
    icon: Target,
    description: 'Dikkat, uyanıklık ve odaklanmayı kontrol eder. Stres tepkisi ve "savaş ya da kaç" mekanizmasında rol oynar.',
    role: 'Konsantrasyon ve dikkat sürdürme',
    inDopaLive: [
      'Canlı odak seansları',
      'Body doubling ile tetiklenmiş odak',
    ],
  },
];

// ============================================
// NEUROTRANSMITTER SECTION
// ============================================
const NeurotransmitterSection = () => {
  return (
    <section className="relative py-24 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Atom className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Nörokimya</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-display">
            Üç Nörotransmitter, <span className="text-primary">Bir Sistem</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            ADHD beyninin ihtiyaç duyduğu nörokimyasal dengeyi anlamak,
            etkili çözümler üretmenin ilk adımıdır.
          </p>
        </div>

        {/* Neurotransmitter Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {neurotransmitters.map((nt) => (
            <div key={nt.name} className="group relative">
              <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-warm-sm">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: nt.color }} />
                      <h3 className="text-xl font-semibold text-foreground">{nt.name}</h3>
                    </div>
                    <p className="text-sm font-medium" style={{ color: nt.color }}>{nt.subtitle}</p>
                  </div>
                  <div
                    className="p-2.5 rounded-xl"
                    style={{ backgroundColor: `${nt.color}15` }}
                  >
                    <nt.icon className="w-5 h-5" style={{ color: nt.color }} />
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {nt.description}
                </p>

                {/* Role */}
                <div className="mb-4 p-3 rounded-lg bg-muted border border-border">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Rolü</span>
                  <p className="text-foreground/80 text-sm">{nt.role}</p>
                </div>

                {/* DopaLive Integration */}
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">DopaLive&apos;da</span>
                  <ul className="space-y-2">
                    {nt.inDopaLive.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: nt.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// MAIN PAGE
// ============================================
export default function SciencePage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-background">
      {/* Ambient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px]" />
      </div>

      {/* Content - No custom navigation, using global SiteHeader from layout */}
      <HeroSection />
      <NeurotransmitterSection />
      
      {/* Final CTA */}
      <section className="py-24 px-5 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Odak ve dikkat profilini keşfetmeye hazır mısın?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
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
      </section>
    </main>
  );
}
