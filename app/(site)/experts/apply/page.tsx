'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowLeft,
  Flame,
  Sparkles,
  CheckCircle2,
  Brain,
  Heart,
  Users,
  Award,
  Clock,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Target,
  Shield,
  Mail,
  Phone,
  User,
  FileText,
  Send
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// ============================================
// ANIMATION VARIANTS
// ============================================

const pageVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.3 } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 }
};

// ============================================
// QUIZ SECTIONS
// ============================================

interface QuizQuestion {
  id: string;
  text: string;
  subtext?: string;
  type: 'single' | 'multi' | 'text' | 'textarea' | 'scale';
  options?: Array<{ id: string; label: string; emoji?: string; description?: string }>;
  scaleLabels?: { left: string; right: string };
  placeholder?: string;
  required?: boolean;
}

interface QuizSection {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  questions: QuizQuestion[];
}

const QUIZ_SECTIONS: QuizSection[] = [
  {
    id: "contact",
    title: "İletişim Bilgileri",
    subtitle: "Seninle nasıl iletişime geçebiliriz?",
    icon: User,
    questions: [
      {
        id: "full_name",
        text: "Ad Soyad",
        type: "text",
        placeholder: "Adınız Soyadınız",
        required: true
      },
      {
        id: "email",
        text: "E-posta Adresi",
        type: "text",
        placeholder: "ornek@email.com",
        required: true
      },
      {
        id: "phone",
        text: "Telefon Numarası",
        type: "text",
        placeholder: "05XX XXX XX XX",
        required: true
      },
      {
        id: "city",
        text: "Yaşadığın Şehir",
        type: "text",
        placeholder: "İstanbul",
        required: true
      }
    ]
  },
  {
    id: "education",
    title: "Eğitim & Sertifikasyon",
    subtitle: "Akademik geçmişin ve sertifikalarını öğrenelim",
    icon: GraduationCap,
    questions: [
      {
        id: "education_level",
        text: "En Yüksek Eğitim Seviyesi",
        type: "single",
        options: [
          { id: "bachelor", label: "Lisans", emoji: "🎓" },
          { id: "master", label: "Yüksek Lisans", emoji: "📚" },
          { id: "phd", label: "Doktora", emoji: "🎯" },
          { id: "other", label: "Diğer", emoji: "📝" }
        ]
      },
      {
        id: "field_of_study",
        text: "Eğitim Alanı",
        type: "single",
        options: [
          { id: "psychology", label: "Psikoloji", emoji: "🧠" },
          { id: "clinical_psych", label: "Klinik Psikoloji", emoji: "🏥" },
          { id: "pdr", label: "PDR", emoji: "🤝" },
          { id: "psychiatry", label: "Psikiyatri", emoji: "⚕️" },
          { id: "neuroscience", label: "Nörobilim", emoji: "🔬" },
          { id: "coaching", label: "Koçluk/NLP", emoji: "🎯" },
          { id: "other", label: "Diğer İlgili Alan", emoji: "📖" }
        ]
      },
      {
        id: "certifications",
        text: "Sahip Olduğun Sertifikalar",
        subtext: "Birden fazla seçebilirsin",
        type: "multi",
        options: [
          { id: "icf", label: "ICF (ACC/PCC/MCC)", emoji: "🏅" },
          { id: "cce", label: "CCE Sertifikası", emoji: "📜" },
          { id: "adhd_coach", label: "ADHD Koçluk Sertifikası", emoji: "🎯" },
          { id: "cbt", label: "BDT Eğitimi", emoji: "💡" },
          { id: "mindfulness", label: "Mindfulness Eğitimi", emoji: "🧘" },
          { id: "none", label: "Henüz Sertifikam Yok", emoji: "📝" }
        ]
      }
    ]
  },
  {
    id: "experience",
    title: "Deneyim",
    subtitle: "Profesyonel deneyimini değerlendirelim",
    icon: Briefcase,
    questions: [
      {
        id: "coaching_years",
        text: "Koçluk/Danışmanlık Deneyimi",
        type: "single",
        options: [
          { id: "0-1", label: "0-1 yıl", description: "Yeni başlıyorum" },
          { id: "1-3", label: "1-3 yıl", description: "Deneyim kazanıyorum" },
          { id: "3-5", label: "3-5 yıl", description: "Deneyimliyim" },
          { id: "5+", label: "5+ yıl", description: "Uzmanım" }
        ]
      },
      {
        id: "adhd_experience",
        text: "DEHB/Nörodivergent Bireylerle Çalışma Deneyimi",
        type: "single",
        options: [
          { id: "none", label: "Henüz yok", description: "Ama öğrenmeye hazırım" },
          { id: "some", label: "Birkaç danışan", description: "1-10 kişi" },
          { id: "moderate", label: "Orta düzey", description: "10-50 kişi" },
          { id: "extensive", label: "Kapsamlı", description: "50+ kişi" }
        ]
      },
      {
        id: "online_experience",
        text: "Online Seans Deneyimi",
        type: "single",
        options: [
          { id: "none", label: "Hiç yapmadım" },
          { id: "some", label: "Birkaç seans" },
          { id: "regular", label: "Düzenli olarak yapıyorum" },
          { id: "primary", label: "Ağırlıklı olarak online çalışıyorum" }
        ]
      },
      {
        id: "current_clients",
        text: "Şu An Aktif Danışan Sayın",
        type: "single",
        options: [
          { id: "0", label: "0 (Yeni başlıyorum)" },
          { id: "1-5", label: "1-5 danışan" },
          { id: "5-15", label: "5-15 danışan" },
          { id: "15+", label: "15+ danışan" }
        ]
      }
    ]
  },
  {
    id: "approach",
    title: "Yaklaşım & Uzmanlık",
    subtitle: "Çalışma tarzını ve uzmanlık alanlarını anlayalım",
    icon: Brain,
    questions: [
      {
        id: "specialties",
        text: "Uzmanlık Alanların",
        subtext: "En güçlü olduğun alanları seç (max 4)",
        type: "multi",
        options: [
          { id: "focus", label: "Odak & Dikkat", emoji: "🎯" },
          { id: "procrastination", label: "Erteleme", emoji: "⏰" },
          { id: "project_completion", label: "Proje Tamamlama", emoji: "🚀" },
          { id: "time_management", label: "Zaman Yönetimi", emoji: "📅" },
          { id: "emotional_regulation", label: "Duygu Düzenleme", emoji: "💜" },
          { id: "career", label: "Kariyer Koçluğu", emoji: "💼" },
          { id: "student", label: "Öğrenci Koçluğu", emoji: "📚" },
          { id: "parenting", label: "Ebeveyn Desteği", emoji: "👨‍👩‍👧" },
          { id: "relationships", label: "İlişkiler", emoji: "❤️" },
          { id: "entrepreneurship", label: "Girişimcilik", emoji: "🌟" }
        ]
      },
      {
        id: "coaching_style",
        text: "Koçluk Tarzın",
        type: "single",
        options: [
          { id: "directive", label: "Yönlendirici", description: "Aktif rehberlik, net adımlar" },
          { id: "exploratory", label: "Keşifçi", description: "Sorularla içgörü oluşturma" },
          { id: "mixed", label: "Karma", description: "Duruma göre uyarlayan" },
          { id: "structured", label: "Yapılandırılmış", description: "Belirli metodoloji takibi" }
        ]
      },
      {
        id: "why_adhd",
        text: "Neden DEHB alanında çalışmak istiyorsun?",
        subtext: "Motivasyonunu anlamamıza yardımcı ol",
        type: "textarea",
        placeholder: "DEHB'li bireylerle çalışmak isteme nedenlerini, varsa kişisel bağlantını paylaş..."
      }
    ]
  },
  {
    id: "availability",
    title: "Müsaitlik & Beklentiler",
    subtitle: "Çalışma tercihlerin ve DopaLive'dan beklentilerin",
    icon: Clock,
    questions: [
      {
        id: "weekly_hours",
        text: "Haftalık Ayırabileceğin Saat",
        type: "single",
        options: [
          { id: "5-10", label: "5-10 saat", description: "Yarı zamanlı" },
          { id: "10-20", label: "10-20 saat", description: "Orta yoğunluk" },
          { id: "20-30", label: "20-30 saat", description: "Tam zamana yakın" },
          { id: "30+", label: "30+ saat", description: "Tam zamanlı" }
        ]
      },
      {
        id: "preferred_schedule",
        text: "Tercih Ettiğin Seans Saatleri",
        subtext: "Birden fazla seçebilirsin",
        type: "multi",
        options: [
          { id: "morning", label: "Sabah (08-12)", emoji: "🌅" },
          { id: "afternoon", label: "Öğlen (12-17)", emoji: "☀️" },
          { id: "evening", label: "Akşam (17-21)", emoji: "🌆" },
          { id: "night", label: "Gece (21-00)", emoji: "🌙" },
          { id: "weekend", label: "Hafta sonu", emoji: "📅" }
        ]
      },
      {
        id: "expectations",
        text: "DopaLive'dan Beklentilerin",
        subtext: "En önemli 3'ünü seç",
        type: "multi",
        options: [
          { id: "clients", label: "Hazır danışan akışı", emoji: "👥" },
          { id: "income", label: "Düzenli gelir", emoji: "💰" },
          { id: "flexibility", label: "Esnek çalışma", emoji: "🌈" },
          { id: "community", label: "Uzman topluluğu", emoji: "🤝" },
          { id: "training", label: "Eğitim & gelişim", emoji: "📚" },
          { id: "ai_tools", label: "AI destekli araçlar", emoji: "🤖" },
          { id: "supervision", label: "Süpervizyon desteği", emoji: "🎓" }
        ]
      },
      {
        id: "start_date",
        text: "Ne Zaman Başlayabilirsin?",
        type: "single",
        options: [
          { id: "immediately", label: "Hemen", emoji: "🚀" },
          { id: "1-2weeks", label: "1-2 hafta içinde", emoji: "📅" },
          { id: "1month", label: "1 ay içinde", emoji: "🗓️" },
          { id: "exploring", label: "Henüz keşfediyorum", emoji: "🔍" }
        ]
      }
    ]
  }
];

const TOTAL_STEPS = QUIZ_SECTIONS.length;

// ============================================
// COMPONENTS
// ============================================

const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  const progress = Math.round((current / total) * 100);
  
  return (
    <div className="w-full max-w-lg mx-auto mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-muted-foreground text-sm">
          Bölüm {current} / {total}
        </span>
        <span className="text-primary text-sm font-semibold">%{progress}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-warm rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

const TextInput = ({
  value,
  onChange,
  placeholder,
  type = "text"
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) => (
  <input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className={cn(
      "w-full px-5 py-4 rounded-xl border-2 transition-all duration-200",
      "bg-card border-border text-foreground placeholder:text-muted-foreground",
      "focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
    )}
  />
);

const TextareaInput = ({
  value,
  onChange,
  placeholder
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    rows={4}
    className={cn(
      "w-full px-5 py-4 rounded-xl border-2 transition-all duration-200 resize-none",
      "bg-card border-border text-foreground placeholder:text-muted-foreground",
      "focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
    )}
  />
);

const SingleSelect = ({
  options,
  value,
  onChange,
}: {
  options: Array<{ id: string; label: string; emoji?: string; description?: string }>;
  value: string | undefined;
  onChange: (value: string) => void;
}) => (
  <div className="grid gap-3">
    {options.map((option) => (
      <motion.button
        key={option.id}
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => onChange(option.id)}
        className={cn(
          "w-full p-4 rounded-2xl border-2 text-left transition-all duration-200",
          "flex items-center gap-4",
          value === option.id
            ? "bg-primary/10 border-primary shadow-warm-sm"
            : "bg-card border-border hover:bg-muted hover:border-muted-foreground/30"
        )}
      >
        {option.emoji && (
          <span className="text-2xl">{option.emoji}</span>
        )}
        <div className="flex-1">
          <p className={cn(
            "font-semibold",
            value === option.id ? "text-foreground" : "text-foreground/80"
          )}>
            {option.label}
          </p>
          {option.description && (
            <p className="text-sm text-muted-foreground mt-0.5">{option.description}</p>
          )}
        </div>
        <div className={cn(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0",
          value === option.id ? "border-primary bg-primary" : "border-muted-foreground/30"
        )}>
          {value === option.id && <CheckCircle2 className="w-4 h-4 text-primary-foreground" />}
        </div>
      </motion.button>
    ))}
  </div>
);

const MultiSelect = ({
  options,
  values,
  onChange,
  maxSelections
}: {
  options: Array<{ id: string; label: string; emoji?: string }>;
  values: string[];
  onChange: (values: string[]) => void;
  maxSelections?: number;
}) => {
  const toggle = (id: string) => {
    if (values.includes(id)) {
      onChange(values.filter(v => v !== id));
    } else {
      if (maxSelections && values.length >= maxSelections) return;
      onChange([...values, id]);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {options.map((option) => {
        const selected = values.includes(option.id);
        const disabled = !selected && maxSelections && values.length >= maxSelections;
        
        return (
          <motion.button
            key={option.id}
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            onClick={() => !disabled && toggle(option.id)}
            aria-pressed={selected}
            className={cn(
              "px-4 py-3 rounded-xl border-2 transition-all duration-200",
              "flex items-center gap-2 relative",
              selected
                ? "bg-primary/10 border-primary text-foreground shadow-md ring-2 ring-primary/30"
                : disabled
                  ? "bg-muted border-border text-muted-foreground opacity-50 cursor-not-allowed"
                  : "bg-card border-border text-muted-foreground hover:bg-muted hover:border-muted-foreground/30"
            )}
          >
            {option.emoji && <span className="text-lg">{option.emoji}</span>}
            <span className="text-sm font-medium">{option.label}</span>
            {selected && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-primary" />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

const QuestionStep = ({
  section,
  answers,
  onAnswer,
}: {
  section: QuizSection;
  answers: Record<string, string | string[]>;
  onAnswer: (questionId: string, value: string | string[]) => void;
}) => {
  const Icon = section.icon;
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-2xl mx-auto"
    >
      {/* Section Header */}
      <motion.div variants={itemVariants} className="text-center mb-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-warm flex items-center justify-center mx-auto mb-4 shadow-warm-md">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">
          {section.title}
        </h2>
        <p className="text-muted-foreground">{section.subtitle}</p>
      </motion.div>
      
      {/* Questions */}
      <motion.div variants={containerVariants} className="space-y-8">
        {section.questions.map((question, idx) => (
          <motion.div 
            key={question.id}
            variants={itemVariants}
            className="p-6 rounded-2xl bg-card border border-border"
          >
            <div className="mb-4">
              <p className="text-foreground font-medium text-lg mb-1">
                {question.text}
                {question.required && <span className="text-destructive ml-1">*</span>}
              </p>
              {question.subtext && (
                <p className="text-muted-foreground text-sm">{question.subtext}</p>
              )}
            </div>

            {question.type === "text" && (
              <TextInput
                value={(answers[question.id] as string) || ""}
                onChange={(v) => onAnswer(question.id, v)}
                placeholder={question.placeholder}
              />
            )}

            {question.type === "textarea" && (
              <TextareaInput
                value={(answers[question.id] as string) || ""}
                onChange={(v) => onAnswer(question.id, v)}
                placeholder={question.placeholder}
              />
            )}

            {question.type === "single" && question.options && (
              <SingleSelect
                options={question.options}
                value={answers[question.id] as string | undefined}
                onChange={(v) => onAnswer(question.id, v)}
              />
            )}

            {question.type === "multi" && question.options && (
              <MultiSelect
                options={question.options}
                values={(answers[question.id] as string[]) || []}
                onChange={(v) => onAnswer(question.id, v)}
              />
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function ExpertApplyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  // Her adımda sayfanın en üstüne kaydır
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  const handleAnswer = useCallback((questionId: string, value: string | string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  }, []);

  const currentSection = QUIZ_SECTIONS[step - 1];

  const canProceed = useCallback(() => {
    if (!currentSection) return false;
    
    return currentSection.questions.every(q => {
      if (!q.required && q.type !== "multi") return true;
      
      const answer = answers[q.id];
      if (q.type === "text" || q.type === "textarea") {
        return typeof answer === "string" && answer.trim().length > 0;
      }
      if (q.type === "single") {
        return typeof answer === "string" && answer.length > 0;
      }
      if (q.type === "multi") {
        return Array.isArray(answer) && answer.length > 0;
      }
      return false;
    });
  }, [currentSection, answers]);

  const handleNext = useCallback(async () => {
    if (!canProceed()) return;
    
    if (step === TOTAL_STEPS) {
      setIsSubmitting(true);
      try {
        const payload = {
          contact: {
            full_name: (answers.full_name as string) || "",
            email: (answers.email as string) || "",
            phone: (answers.phone as string) || "",
            city: (answers.city as string) || "",
          },
          education: {
            education_level: (answers.education_level as string) || "",
            field_of_study: (answers.field_of_study as string) || "",
            certifications: (answers.certifications as string[]) || [],
          },
          experience: {
            coaching_years: (answers.coaching_years as string) || "",
            adhd_experience: (answers.adhd_experience as string) || "",
            online_experience: (answers.online_experience as string) || "",
            current_clients: (answers.current_clients as string) || "",
          },
          approach: {
            specialties: (answers.specialties as string[]) || [],
            coaching_style: (answers.coaching_style as string) || "",
            why_adhd: (answers.why_adhd as string) || "",
          },
          availability: {
            weekly_hours: (answers.weekly_hours as string) || "",
            preferred_schedule: (answers.preferred_schedule as string[]) || [],
            expectations: (answers.expectations as string[]) || [],
            start_date: (answers.start_date as string) || "",
          },
        };

        const res = await fetch("/api/forms/experts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error("Başvuru kaydedilemedi");
        }

        setIsSubmitted(true);
      } catch (err) {
        console.error(err);
        alert("Gönderirken bir hata oluştu. Lütfen tekrar dene.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setStep(step + 1);
    }
  }, [step, canProceed, answers]);

  const handleBack = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    }
  }, [step]);

  // Submitting state
  if (isSubmitting) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-16 h-16 rounded-full border-4 border-muted border-t-primary mx-auto mb-6"
          />
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            Başvurun gönderiliyor...
          </h2>
          <p className="text-muted-foreground">
            Bilgilerini kaydediyoruz
          </p>
        </motion.div>
      </main>
    );
  }

  // Success state
  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg"
        >
          <div className="w-20 h-20 rounded-3xl bg-success/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>
          <h2 className="font-display font-bold text-3xl text-foreground mb-4">
            Başvurun Alındı! 🎉
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Teşekkürler! Başvurunu <strong>48 saat</strong> içinde değerlendireceğiz. 
            Sonuç e-posta ile bildirilecek.
          </p>
          
          <div className="p-6 rounded-2xl bg-card border border-border mb-8">
            <h3 className="font-semibold text-foreground mb-4">Sonraki Adımlar</h3>
            <ul className="space-y-3 text-left">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">1</span>
                <span>Başvurun değerlendirilecek (48 saat)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">2</span>
                <span>Onaylanırsan 30 dakikalık tanışma görüşmesi</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">3</span>
                <span>Onboarding eğitimi ve profil oluşturma</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">4</span>
                <span>Danışan kabul etmeye başla!</span>
              </li>
            </ul>
          </div>
          
          <Link href="/">
            <Button variant="primary" size="lg" rightIcon={ArrowRight}>
              Ana Sayfaya Dön
            </Button>
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px]" />
      </div>
      
      {/* Back to Experts Link */}
      <div className="fixed top-6 left-5 md:left-8 z-50">
        <Link
          href="/experts"
          className="text-muted-foreground hover:text-foreground text-sm transition-colors bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Geri
        </Link>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col pt-24 pb-32 px-5 md:px-8">
        {/* Progress Bar */}
        <ProgressBar current={step} total={TOTAL_STEPS} />
        
        {/* Step Content */}
        <div className="flex-1 flex items-center justify-center py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <QuestionStep
                section={currentSection}
                answers={answers}
                onAnswer={handleAnswer}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 z-40 py-5 px-5 md:px-8">
        <div className="max-w-2xl mx-auto flex items-center gap-4 rounded-2xl bg-card/95 border border-border shadow-lg shadow-primary/10 backdrop-blur-lg px-4 py-3">
          {step > 1 && (
            <Button
              variant="ghost"
              size="lg"
              leftIcon={ArrowLeft}
              onClick={handleBack}
              className="px-6"
            >
              Geri
            </Button>
          )}

          <Button
            variant="primary"
            size="xl"
            rightIcon={step === TOTAL_STEPS ? Send : ArrowRight}
            onClick={handleNext}
            disabled={!canProceed()}
            className={cn(
              "flex-1 px-10 py-4 text-lg font-semibold bg-gradient-to-r from-primary to-orange-400 shadow-warm-lg",
              step === 1 && "w-full"
            )}
          >
            {step === TOTAL_STEPS ? "Başvuruyu Gönder" : "Devam Et"}
          </Button>
        </div>
      </div>
    </main>
  );
}
