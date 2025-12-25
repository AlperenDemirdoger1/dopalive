'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  Heart, 
  Users, 
  Brain, 
  Sparkles, 
  Mail,
  ArrowRight,
  Quote,
  CheckCircle2
} from 'lucide-react';

// ============================================
// ANIMATION VARIANTS
// ============================================
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

// ============================================
// MAIN PAGE
// ============================================
export default function AboutPage() {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Gönderim başarısız');
      }

      setIsSubmitted(true);
      setFormData({ email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error(err);
      alert('Gönderirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-5 md:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium mb-6">
              <Heart className="w-4 h-4" />
              Hikayemiz
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Neden <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">DopaLive</span>?
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Neurodivergent zihinler için, neurodivergent zihinler tarafından kuruldu.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder's Story */}
      <section className="py-16 px-5 md:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg max-w-none"
          >
            {/* Opening Quote */}
            <div className="relative p-8 rounded-2xl bg-muted/50 border border-border mb-12">
              <Quote className="absolute top-4 left-4 w-8 h-8 text-primary/20" />
              <p className="text-xl md:text-2xl font-light text-foreground italic text-center px-8">
                "Forge meaning, build identity."
              </p>
              <p className="text-center text-muted-foreground text-sm mt-2">- Andrew Solomon</p>
            </div>

            {/* Story Content */}
            <div className="space-y-6 text-foreground/80 leading-relaxed">
              <p>
                Üniversite sınavına 2 ay kala hâlâ ders çalışamıyordum. Annem ağlayarak "seni iple sandalyeye mi bağlasak?" demişti. Ertesi gün psikiyatristten DEHB tanısı aldım.
              </p>
              
              <p>
                İşe yaradı diyebilirim, ucuz atlattım. Ama bu durumu kafamdan hiç çıkaramadım. Özgüven eksikliğim, dikkat dağınıklıklarım, sürekli hareket etme isteği... Neden ders çalışamıyordum halbuki hırslı biriydim? Neden sürekli fikir değiştiriyordum?
              </p>

              <p>
                14 yıl boyunca bu soruların peşinden koştum. 6 psikolog, 8 psikiyatrist. Türkiye'nin en iyi doktorları. Sadece "ben bir yerimden uydurmuyorum, değil mi?" diyebilmek için. Her seferinde yenik düştüm ve "biraz daha çabalarsam geçer" sandım.
              </p>

              <div className="p-6 rounded-xl bg-card border border-border my-8">
                <p className="text-foreground font-medium mb-2">DEHB sadece dikkat dağınıklığı değil.</p>
                <p className="text-muted-foreground text-sm">
                  Beynin ödül mekanizmasının ve dopaminerjik sistemin "farklı" çalışması. Davranışsal etkileri hayatın her alanına yansıyor - depresyon, anksiyete, ilişkiler, iş hayatı... Normal modunda neler yapabileceğinin farkında olan bir ruh için bu dalgalanmalar işkenceye dönüşebiliyor.
                </p>
              </div>

              <p>
                Hayat bana hep cömert davrandı. Süper bir aile, harika arkadaşlar, iyi okullar, güzel işler. Ama dünyadaki en acı şey belki de şu: her şeye sahip olsan da, insan olmanın özünde bir acı var ve bu bireysellikle çözülebilecek bir şey değil.
              </p>

              <p>
                Yıllardır bu problemi anlatmaya çalıştım - aileme, arkadaşlarıma, sevgililerime. Ama yaşamayan birinin anlaması mümkün değil. Kimseyi suçlamıyorum. Ama bizden birini görünce... o karşılıklı anlayış, o derin muhabbet, yarattığı umut ve mutluluk göz ardı edilemez.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-5 md:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Misyonumuz
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Brain,
                title: "Bilimsel Yaklaşım",
                desc: "Neurodivergent insanlara bilimin en güncel haliyle kanıtlanmış yöntemlerle destek sunmak."
              },
              {
                icon: Heart,
                title: "Umut Olmak",
                desc: "Umutların tükendiği yerde yanlarında olmak, yalnız hissetmemelerini sağlamak."
              },
              {
                icon: Users,
                title: "Topluluk Oluşturmak",
                desc: "Birbirini anlayan insanların buluştuğu, destekleyici bir ekosistem yaratmak."
              },
              {
                icon: Sparkles,
                title: "Farkındalık Yaratmak",
                desc: "Toplumda DEHB ve neurodivergence hakkında doğru bilgiyi yaymak."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-foreground font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Team / Advisory */}
      <section className="py-16 px-5 md:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Arkamızdaki Ekip
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              DopaLive, alanında uzman bir danışma kurulu tarafından destekleniyor.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-card border border-border"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { field: "Psikiyatri", detail: "Ege Üniversitesi" },
                { field: "Klinik Psikoloji", detail: "Mental Health Lead" },
                { field: "AI & ML", detail: "PhD Researcher" },
                { field: "Business", detail: "Startup Advisor" },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-foreground font-semibold text-sm">{item.field}</p>
                  <p className="text-muted-foreground text-xs">{item.detail}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-center text-muted-foreground text-sm leading-relaxed">
                Sinirbilimciler, psikiyatristler, psikologlar, hukukçular ve teknoloji uzmanlarından oluşan 
                multidisipliner bir ekiple çalışıyoruz. Her adımımız bilimsel kanıtlara ve klinik deneyime dayanıyor.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 px-5 md:px-8 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-foreground/80 leading-relaxed"
          >
            <h2 className="text-2xl font-display font-bold text-foreground mb-6 text-center">
              Ne Yapıyoruz?
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-card border border-border">
                <p className="text-foreground font-medium mb-1">📊 Kişiselleştirilmiş Değerlendirme</p>
                <p className="text-muted-foreground text-sm">Working memory ve DSM kriterlerine uygun anketlerle DEHB tarzınızı belirliyoruz. Grafikler ve istatistiklerle sonuç, gelecekte neleri nasıl düzeltebileceğinize dair ipuçları.</p>
              </div>
              
              <div className="p-4 rounded-xl bg-card border border-border">
                <p className="text-foreground font-medium mb-1">🧠 Uzman Koçluk</p>
                <p className="text-muted-foreground text-sm">Neurocoaching uzmanlarımız DEHB zihinlerin doğasına uygun dikkat geliştirme programları, meditasyonlar ve üretkenlik stratejileri sunuyor.</p>
              </div>
              
              <div className="p-4 rounded-xl bg-card border border-border">
                <p className="text-foreground font-medium mb-1">👥 Topluluk</p>
                <p className="text-muted-foreground text-sm">Sizi anlayan insanlarla bağlanın. Body doubling seansları, pod grupları ve destekleyici bir komunite.</p>
              </div>
              
              <div className="p-4 rounded-xl bg-card border border-border">
                <p className="text-foreground font-medium mb-1">🔬 İleri Teknoloji</p>
                <p className="text-muted-foreground text-sm">AI destekli araçlar, VR çalışmaları, TMS ve neurofeedback gibi kanıta dayalı yöntemlerle geleceğin tedavi yaklaşımları.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-5 md:px-8">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Mail className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                İletişime Geç
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Sorularınız, önerileriniz veya sadece merhaba demek için bize ulaşın.
              </p>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-xl bg-success/10 border-2 border-success/20 text-center"
              >
                <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Mesajınız Başarıyla Gönderildi!
                </h3>
                <p className="text-muted-foreground text-sm">
                  En kısa sürede size dönüş yapacağız.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    E-posta Adresiniz
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ornek@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Konu
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Mesajınızın konusu"
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Mesajınız
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Mesajınızı buraya yazın..."
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 text-white font-semibold hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
                  {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                </button>
              </form>
            )}

            {!isSubmitted && (
              <p className="text-muted-foreground text-sm mt-6 text-center">
                Genellikle 24-48 saat içinde yanıt veriyoruz.
              </p>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}


