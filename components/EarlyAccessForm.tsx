'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { CheckCircle2, Loader2, X, Bot, Users, Brain, Target, Heart, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface EarlyAccessFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const interestedFeatures = [
  { id: 'ai-coach', label: 'Doppa - AI Dopamin Koçu', emoji: '🤖', icon: Bot },
  { id: 'body-doubling', label: 'Body Doubling Seansları', emoji: '👥', icon: Users },
  { id: 'expert-coaching', label: 'Uzman Koç Desteği', emoji: '🎯', icon: Target },
  { id: 'adhd-platform', label: 'DEHB Odaklı Platform', emoji: '🧠', icon: Brain },
  { id: 'community', label: 'Topluluk ve Destek', emoji: '💚', icon: Heart },
  { id: 'tools', label: 'Odak Araçları ve Şablonlar', emoji: '✨', icon: Sparkles },
];

const EarlyAccessForm = ({ isOpen, onClose }: EarlyAccessFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interestedFeatures: [] as string[],
    comments: '',
  });

  const toggleFeature = (id: string) => {
    setFormData(prev => ({
      ...prev,
      interestedFeatures: prev.interestedFeatures.includes(id)
        ? prev.interestedFeatures.filter(f => f !== id)
        : [...prev.interestedFeatures, id]
    }));
  };

  const formatPhone = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format: 05XX XXX XX XX
    if (digits.length <= 4) {
      return digits;
    } else if (digits.length <= 7) {
      return `${digits.slice(0, 4)} ${digits.slice(4)}`;
    } else if (digits.length <= 9) {
      return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
    } else {
      return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9, 11)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email.includes('@') || formData.interestedFeatures.length === 0) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/forms/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          interestedFeatures: formData.interestedFeatures,
          comments: formData.comments,
        }),
      });

      if (!res.ok) {
        throw new Error('Başvuru kaydedilemedi');
      }

      // Generate random queue number
      const randomQueue = Math.floor(Math.random() * 200) + 50;
      
      // Close modal and redirect to success page
      onClose();
      router.push(`/early-access/success?queue=${randomQueue}`);
    } catch (err) {
      console.error(err);
      alert('Gönderirken bir hata oluştu. Lütfen tekrar dene.');
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[500px] bg-background border border-border rounded-2xl p-6 md:p-8 relative max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
                <div>
                  <h3 className="text-foreground text-xl font-display font-bold mb-1">
                    Erken Erişim Başvurusu
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Size ulaşabilmemiz için bilgilerinizi paylaşın
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="early-access-name" className="block text-sm font-medium text-foreground mb-2">
                    Ad Soyad <span className="text-primary">*</span>
                  </label>
                  <input
                    id="early-access-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => {
                      e.stopPropagation();
                      setFormData(prev => ({ ...prev, name: e.target.value }));
                    }}
                    onFocus={(e) => e.target.select()}
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Adınız ve soyadınız"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="early-access-email" className="block text-sm font-medium text-foreground mb-2">
                    E-posta <span className="text-primary">*</span>
                  </label>
                  <input
                    id="early-access-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={formData.email}
                    onChange={(e) => {
                      e.stopPropagation();
                      setFormData(prev => ({ ...prev, email: e.target.value }));
                    }}
                    onFocus={(e) => e.target.select()}
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="ornek@email.com"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="early-access-phone" className="block text-sm font-medium text-foreground mb-2">
                    Telefon <span className="text-primary">*</span>
                  </label>
                  <input
                    id="early-access-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="numeric"
                    value={formData.phone}
                    onChange={(e) => {
                      e.stopPropagation();
                      handlePhoneChange(e);
                    }}
                    onFocus={(e) => e.target.select()}
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="05XX XXX XX XX"
                    maxLength={15}
                    required
                  />
                </div>

                {/* Interested Features - Multi Select */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    En çok ilginizi çeken kısım <span className="text-primary">*</span>
                  </label>
                  <p className="text-xs text-muted-foreground mb-3">Birden fazla seçebilirsin</p>
                  <div className="grid grid-cols-2 gap-3">
                    {interestedFeatures.map((feature) => {
                      const selected = formData.interestedFeatures.includes(feature.id);
                      const Icon = feature.icon;
                      return (
                        <motion.button
                          key={feature.id}
                          type="button"
                          whileHover={{ scale: selected ? 1.05 : 1.02 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleFeature(feature.id)}
                          className={cn(
                            "relative px-4 py-3 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 text-left",
                            selected
                              ? "bg-primary/15 border-primary text-foreground shadow-lg ring-2 ring-primary/30 scale-105"
                              : "bg-card border-border text-muted-foreground hover:bg-muted hover:border-muted-foreground/30"
                          )}
                        >
                          {selected && (
                            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center z-10">
                              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                            </span>
                          )}
                          <Icon className={cn("w-5 h-5 shrink-0", selected ? "text-primary" : "text-muted-foreground")} />
                          <span className={cn("text-xs font-semibold leading-tight", selected && "text-foreground")}>
                            {feature.label}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Comments */}
                <div>
                  <label htmlFor="early-access-comments" className="block text-sm font-medium text-foreground mb-2">
                    Ek yorumlar (opsiyonel)
                  </label>
                  <textarea
                    id="early-access-comments"
                    value={formData.comments}
                    onChange={e => setFormData({ ...formData, comments: e.target.value })}
                    rows={3}
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    placeholder="Eklemek istediğiniz bir şey var mı?"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!formData.email.includes('@') || formData.interestedFeatures.length === 0 || isLoading}
                  className={cn(
                    "w-full py-3.5 rounded-lg text-sm font-medium transition-all",
                    "bg-gradient-warm text-white",
                    "disabled:opacity-40 disabled:cursor-not-allowed",
                    "flex items-center justify-center gap-2",
                    "hover:opacity-90"
                  )}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Gönderiliyor...</span>
                    </>
                  ) : (
                    'Başvuruyu Gönder'
                  )}
                </button>
              </motion.form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EarlyAccessForm;
