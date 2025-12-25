'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, Check, Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExpertFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const expertiseAreas = [
  { id: 'psychologist', label: 'Psikolog' },
  { id: 'psychiatrist', label: 'Psikiyatrist' },
  { id: 'adhd-coach', label: 'ADHD Koçu' },
  { id: 'pdr', label: 'PDR Uzmanı' },
  { id: 'therapist', label: 'Terapist' },
  { id: 'other', label: 'Diğer' },
];

const workModes = [
  { id: 'online', label: 'Online' },
  { id: 'in-person', label: 'Yüz yüze' },
  { id: 'hybrid', label: 'Hibrit' },
];

const expectations = [
  'Dijital platformda danışan bulmak',
  'ADHD odaklı çalışmak',
  'Esnek çalışma saatleri',
  'Topluluk etkisi yaratmak',
  'Yeni metodlar öğrenmek',
];

// Basit e-posta doğrulama (RFC uyumlu temel desen)
const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const ExpertForm = ({ isOpen, onClose }: ExpertFormProps) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    expertise: '',
    experience: '',
    workMode: '',
    linkedin: '',
    expectation: '',
  });

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.name || !formData.name.trim()) {
      alert('Lütfen adınızı girin.');
      setIsLoading(false);
      return;
    }
    if (!formData.email || !isValidEmail(formData.email)) {
      alert('Lütfen geçerli bir e-posta adresi girin (ör: ad@site.com).');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        contact: {
          full_name: formData.name.trim(),
          email: formData.email.trim(),
          ...(formData.phone?.trim() && { phone: formData.phone.trim() }),
        },
        education: {},
        experience: {
          ...(formData.experience && { coaching_years: formData.experience }),
          ...(formData.expertise && { adhd_experience: formData.expertise }),
        },
        approach: {
          specialties: [],
          ...(formData.expectation && { why_adhd: formData.expectation }),
        },
        availability: {
          expectations: expectations || [],
        },
      };

      const res = await fetch('/api/forms/experts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({ error: 'Response parse error' }));

      if (!res.ok) {
        console.error('API Error:', {
          status: res.status,
          statusText: res.statusText,
          data,
          payload: payload,
        });
        
        // Show validation errors if available
        if (data.details && Array.isArray(data.details)) {
          const errorMessages = data.details.map((err: any) => 
            `${err.path.join('.')}: ${err.message}`
          ).join('\n');
          throw new Error(`Form hatası:\n${errorMessages}`);
        }
        
        throw new Error(data.error || `Başvuru kaydedilemedi (${res.status})`);
      }

      // Close modal and redirect to success page
      onClose();
      router.push('/experts/apply/success');
    } catch (err) {
      console.error('Expert form submission error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Gönderirken bir hata oluştu. Lütfen tekrar dene.';
      alert(errorMessage);
      setIsLoading(false);
    }
  };

  const canProceed = () => {
    if (step === 1) return !!formData.name.trim() && isValidEmail(formData.email);
    if (step === 2) return formData.expertise && formData.experience;
    if (step === 3) return formData.workMode;
    return true;
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
          className="w-full max-w-[420px] bg-[#0f0f0f] border border-white/[0.06] rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/30 hover:text-white/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Progress */}
          <div className="flex gap-1 mb-6">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className={cn(
                  "h-0.5 flex-1 rounded-full transition-colors",
                  i <= step ? "bg-[#f5d4a0]/60" : "bg-white/10"
                )}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <>
                {/* Step 1: Contact Info */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-white/90 text-lg font-light mb-1">Uzman Ağına Katıl</h3>
                    <p className="text-white/40 text-xs mb-5">Önce seni tanıyalım.</p>
                    
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Ad Soyad *"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2.5 text-white/80 text-sm placeholder:text-white/25 focus:outline-none focus:border-[#f5d4a0]/20"
                      />
                      <input
                        type="email"
                        placeholder="E-posta *"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2.5 text-white/80 text-sm placeholder:text-white/25 focus:outline-none focus:border-[#f5d4a0]/20"
                      />
                      <input
                        type="tel"
                        placeholder="Telefon (opsiyonel)"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2.5 text-white/80 text-sm placeholder:text-white/25 focus:outline-none focus:border-[#f5d4a0]/20"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Expertise */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-white/90 text-lg font-light mb-1">Uzmanlık alanın</h3>
                    <p className="text-white/40 text-xs mb-5">Deneyimini paylaş.</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-white/50 text-xs mb-2">Alan *</p>
                        <div className="grid grid-cols-2 gap-2">
                          {expertiseAreas.map(area => (
                            <button
                              key={area.id}
                              onClick={() => setFormData({ ...formData, expertise: area.id })}
                              className={cn(
                                "py-2 rounded-lg text-xs font-light transition-all",
                                formData.expertise === area.id
                                  ? "bg-[#f5d4a0]/10 border border-[#f5d4a0]/20 text-white/80"
                                  : "bg-white/[0.02] border border-white/[0.05] text-white/40 hover:border-white/10"
                              )}
                            >
                              {area.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-white/50 text-xs mb-2">Deneyim (yıl) *</p>
                        <div className="flex gap-2">
                          {['0-2', '3-5', '6-10', '10+'].map(exp => (
                            <button
                              key={exp}
                              onClick={() => setFormData({ ...formData, experience: exp })}
                              className={cn(
                                "flex-1 py-2 rounded-lg text-xs font-light transition-all",
                                formData.experience === exp
                                  ? "bg-[#f5d4a0]/10 border border-[#f5d4a0]/20 text-white/80"
                                  : "bg-white/[0.02] border border-white/[0.05] text-white/40 hover:border-white/10"
                              )}
                            >
                              {exp}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Work Mode */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-white/90 text-lg font-light mb-1">Çalışma tercihin</h3>
                    <p className="text-white/40 text-xs mb-5">Nasıl çalışmak istersin?</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-white/50 text-xs mb-2">Çalışma şekli *</p>
                        <div className="flex gap-2">
                          {workModes.map(mode => (
                            <button
                              key={mode.id}
                              onClick={() => setFormData({ ...formData, workMode: mode.id })}
                              className={cn(
                                "flex-1 py-2.5 rounded-lg text-xs font-light transition-all",
                                formData.workMode === mode.id
                                  ? "bg-[#f5d4a0]/10 border border-[#f5d4a0]/20 text-white/80"
                                  : "bg-white/[0.02] border border-white/[0.05] text-white/40 hover:border-white/10"
                              )}
                            >
                              {mode.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <input
                        type="url"
                        placeholder="LinkedIn veya web sitesi (opsiyonel)"
                        value={formData.linkedin}
                        onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2.5 text-white/80 text-sm placeholder:text-white/25 focus:outline-none focus:border-[#f5d4a0]/20"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Expectation */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-white/90 text-lg font-light mb-1">Dopalive'dan beklentin?</h3>
                    <p className="text-white/40 text-xs mb-4">Birini seç veya kendi cümleni yaz.</p>
                    
                    {/* Suggestion chips */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {expectations.map((exp, i) => (
                        <button
                          key={i}
                          onClick={() => setFormData({ ...formData, expectation: exp })}
                          className={cn(
                            "px-2.5 py-1.5 rounded-full text-[11px] font-light transition-all",
                            formData.expectation === exp
                              ? "bg-[#f5d4a0]/15 border border-[#f5d4a0]/25 text-[#f5d4a0]/90"
                              : "bg-white/[0.02] border border-white/[0.05] text-white/40 hover:border-white/10"
                          )}
                        >
                          {exp}
                        </button>
                      ))}
                    </div>
                    
                    <textarea
                      placeholder="Ya da kendi beklentini yaz..."
                      value={formData.expectation}
                      onChange={e => setFormData({ ...formData, expectation: e.target.value })}
                      rows={3}
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2.5 text-white/80 text-sm placeholder:text-white/25 focus:outline-none focus:border-[#f5d4a0]/20 resize-none"
                    />
                    
                    <p className="text-white/20 text-[10px] mt-3">
                      Başvurun incelendikten sonra seninle iletişime geçeceğiz.
                    </p>
                  </motion.div>
                )}

                {/* Navigation */}
                <div className="flex gap-2 mt-6">
                  {step > 1 && (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/50 text-sm hover:border-white/10 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => step === 4 ? handleSubmit() : setStep(step + 1)}
                    disabled={!canProceed() || isLoading}
                    className={cn(
                      "flex-1 py-2.5 rounded-lg text-sm font-medium transition-all",
                      "bg-gradient-to-r from-[#f5d4a0] to-[#e8c87a] text-[#1a1a1a]",
                      "disabled:opacity-40 disabled:cursor-not-allowed",
                      "flex items-center justify-center gap-2"
                    )}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : step === 4 ? (
                      'Başvur'
                    ) : (
                      <>
                        <span>Devam</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
            </>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExpertForm;
