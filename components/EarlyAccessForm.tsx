'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EarlyAccessFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const struggles = [
  { id: 'procrastination', label: 'Sürekli erteliyorum' },
  { id: 'focus', label: 'Odaklanamıyorum' },
  { id: 'motivation', label: 'Motivasyon bulamıyorum' },
  { id: 'finishing', label: 'Başladığımı bitiremiyorum' },
  { id: 'overwhelm', label: 'Her şey çok bunaltıcı' },
];

const ageGroups = [
  { id: '14-18', label: '14-18' },
  { id: '19-25', label: '19-25' },
  { id: '26-35', label: '26-35' },
  { id: '36+', label: '36+' },
];

const expectations = [
  'Odaklanmayı öğrenmek',
  'Ertelemeyi yenmek',
  'Günlük rutin oluşturmak',
  'Benzer insanlarla tanışmak',
  'Profesyonel destek almak',
];

const EarlyAccessForm = ({ isOpen, onClose }: EarlyAccessFormProps) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    ageGroup: '',
    struggles: [] as string[],
    hasDiagnosis: '',
    expectation: '',
  });

  const toggleStruggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      struggles: prev.struggles.includes(id)
        ? prev.struggles.filter(s => s !== id)
        : [...prev.struggles, id]
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/forms/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          struggles: formData.struggles,
          ageRange: formData.ageGroup,
          diagnosis: formData.hasDiagnosis,
          expectation: formData.expectation,
          expectationOptions: expectations,
        }),
      });

      if (!res.ok) {
        throw new Error('Başvuru kaydedilemedi');
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Gönderirken bir hata oluştu. Lütfen tekrar dene.');
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = () => {
    if (step === 1) return formData.email.includes('@');
    if (step === 2) return formData.struggles.length > 0;
    if (step === 3) return formData.ageGroup !== '';
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
          className="w-full max-w-[400px] bg-[#0f0f0f] border border-white/[0.06] rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto"
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
          {!isSubmitted && (
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
          )}

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-12 h-12 rounded-xl bg-[#f5d4a0]/10 flex items-center justify-center mx-auto mb-4"
                >
                  <Check className="w-6 h-6 text-[#f5d4a0]" />
                </motion.div>
                <h3 className="text-white/90 text-lg font-light mb-2">Harika!</h3>
                <p className="text-white/40 text-sm font-light">
                  Seni listeye ekledik. Yakında görüşürüz.
                </p>
              </motion.div>
            ) : (
              <>
                {/* Step 1: Email & Name */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-white/90 text-lg font-light mb-1">Merhaba 👋</h3>
                    <p className="text-white/40 text-xs mb-5">Seninle tanışalım.</p>
                    
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="E-posta *"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2.5 text-white/80 text-sm placeholder:text-white/25 focus:outline-none focus:border-[#f5d4a0]/20"
                      />
                      <input
                        type="text"
                        placeholder="İsim (opsiyonel)"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2.5 text-white/80 text-sm placeholder:text-white/25 focus:outline-none focus:border-[#f5d4a0]/20"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Struggles */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-white/90 text-lg font-light mb-1">En çok ne zorluyor?</h3>
                    <p className="text-white/40 text-xs mb-5">Birden fazla seçebilirsin.</p>
                    
                    <div className="space-y-2">
                      {struggles.map(item => (
                        <button
                          key={item.id}
                          onClick={() => toggleStruggle(item.id)}
                          className={cn(
                            "w-full text-left px-3 py-2.5 rounded-lg text-sm font-light transition-all",
                            formData.struggles.includes(item.id)
                              ? "bg-[#f5d4a0]/10 border border-[#f5d4a0]/20 text-white/80"
                              : "bg-white/[0.02] border border-white/[0.05] text-white/50 hover:border-white/10"
                          )}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Age & Diagnosis */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-white/90 text-lg font-light mb-1">Birkaç soru daha</h3>
                    <p className="text-white/40 text-xs mb-5">Seni daha iyi anlamamız için.</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-white/50 text-xs mb-2">Yaş aralığın</p>
                        <div className="flex gap-2">
                          {ageGroups.map(age => (
                            <button
                              key={age.id}
                              onClick={() => setFormData({ ...formData, ageGroup: age.id })}
                              className={cn(
                                "flex-1 py-2 rounded-lg text-xs font-light transition-all",
                                formData.ageGroup === age.id
                                  ? "bg-[#f5d4a0]/10 border border-[#f5d4a0]/20 text-white/80"
                                  : "bg-white/[0.02] border border-white/[0.05] text-white/40 hover:border-white/10"
                              )}
                            >
                              {age.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-white/50 text-xs mb-2">ADHD tanısı var mı?</p>
                        <div className="flex gap-2">
                          {['Evet', 'Hayır', 'Şüpheliyim'].map(option => (
                            <button
                              key={option}
                              onClick={() => setFormData({ ...formData, hasDiagnosis: option })}
                              className={cn(
                                "flex-1 py-2 rounded-lg text-xs font-light transition-all",
                                formData.hasDiagnosis === option
                                  ? "bg-[#f5d4a0]/10 border border-[#f5d4a0]/20 text-white/80"
                                  : "bg-white/[0.02] border border-white/[0.05] text-white/40 hover:border-white/10"
                              )}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
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
                      'Tamamla'
                    ) : (
                      <>
                        <span>Devam</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EarlyAccessForm;

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EarlyAccessFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const struggles = [
  { id: 'procrastination', label: 'Sürekli erteliyorum' },
  { id: 'focus', label: 'Odaklanamıyorum' },
  { id: 'motivation', label: 'Motivasyon bulamıyorum' },
  { id: 'finishing', label: 'Başladığımı bitiremiyorum' },
  { id: 'overwhelm', label: 'Her şey çok bunaltıcı' },
];

const ageGroups = [
  { id: '14-18', label: '14-18' },
  { id: '19-25', label: '19-25' },
  { id: '26-35', label: '26-35' },
  { id: '36+', label: '36+' },
];

const expectations = [
  'Odaklanmayı öğrenmek',
  'Ertelemeyi yenmek',
  'Günlük rutin oluşturmak',
  'Benzer insanlarla tanışmak',
  'Profesyonel destek almak',
];

const EarlyAccessForm = ({ isOpen, onClose }: EarlyAccessFormProps) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    ageGroup: '',
    struggles: [] as string[],
    hasDiagnosis: '',
    expectation: '',
  });

  const toggleStruggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      struggles: prev.struggles.includes(id)
        ? prev.struggles.filter(s => s !== id)
        : [...prev.struggles, id]
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/forms/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          struggles: formData.struggles,
          ageRange: formData.ageGroup,
          diagnosis: formData.hasDiagnosis,
          expectation: formData.expectation,
          expectationOptions: expectations,
        }),
      });

      if (!res.ok) {
        throw new Error('Başvuru kaydedilemedi');
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Gönderirken bir hata oluştu. Lütfen tekrar dene.');
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = () => {
    if (step === 1) return formData.email.includes('@');
    if (step === 2) return formData.struggles.length > 0;
    if (step === 3) return formData.ageGroup !== '';
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
          className="w-full max-w-[400px] bg-[#0f0f0f] border border-white/[0.06] rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto"
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
          {!isSubmitted && (
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
          )}

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-12 h-12 rounded-xl bg-[#f5d4a0]/10 flex items-center justify-center mx-auto mb-4"
                >
                  <Check className="w-6 h-6 text-[#f5d4a0]" />
                </motion.div>
                <h3 className="text-white/90 text-lg font-light mb-2">Harika!</h3>
                <p className="text-white/40 text-sm font-light">
                  Seni listeye ekledik. Yakında görüşürüz.
                </p>
              </motion.div>
            ) : (
              <>
                {/* Step 1: Email & Name */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-white/90 text-lg font-light mb-1">Merhaba 👋</h3>
                    <p className="text-white/40 text-xs mb-5">Seninle tanışalım.</p>
                    
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="E-posta *"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2.5 text-white/80 text-sm placeholder:text-white/25 focus:outline-none focus:border-[#f5d4a0]/20"
                      />
                      <input
                        type="text"
                        placeholder="İsim (opsiyonel)"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2.5 text-white/80 text-sm placeholder:text-white/25 focus:outline-none focus:border-[#f5d4a0]/20"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Struggles */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-white/90 text-lg font-light mb-1">En çok ne zorluyor?</h3>
                    <p className="text-white/40 text-xs mb-5">Birden fazla seçebilirsin.</p>
                    
                    <div className="space-y-2">
                      {struggles.map(item => (
                        <button
                          key={item.id}
                          onClick={() => toggleStruggle(item.id)}
                          className={cn(
                            "w-full text-left px-3 py-2.5 rounded-lg text-sm font-light transition-all",
                            formData.struggles.includes(item.id)
                              ? "bg-[#f5d4a0]/10 border border-[#f5d4a0]/20 text-white/80"
                              : "bg-white/[0.02] border border-white/[0.05] text-white/50 hover:border-white/10"
                          )}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Age & Diagnosis */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-white/90 text-lg font-light mb-1">Birkaç soru daha</h3>
                    <p className="text-white/40 text-xs mb-5">Seni daha iyi anlamamız için.</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-white/50 text-xs mb-2">Yaş aralığın</p>
                        <div className="flex gap-2">
                          {ageGroups.map(age => (
                            <button
                              key={age.id}
                              onClick={() => setFormData({ ...formData, ageGroup: age.id })}
                              className={cn(
                                "flex-1 py-2 rounded-lg text-xs font-light transition-all",
                                formData.ageGroup === age.id
                                  ? "bg-[#f5d4a0]/10 border border-[#f5d4a0]/20 text-white/80"
                                  : "bg-white/[0.02] border border-white/[0.05] text-white/40 hover:border-white/10"
                              )}
                            >
                              {age.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-white/50 text-xs mb-2">ADHD tanısı var mı?</p>
                        <div className="flex gap-2">
                          {['Evet', 'Hayır', 'Şüpheliyim'].map(option => (
                            <button
                              key={option}
                              onClick={() => setFormData({ ...formData, hasDiagnosis: option })}
                              className={cn(
                                "flex-1 py-2 rounded-lg text-xs font-light transition-all",
                                formData.hasDiagnosis === option
                                  ? "bg-[#f5d4a0]/10 border border-[#f5d4a0]/20 text-white/80"
                                  : "bg-white/[0.02] border border-white/[0.05] text-white/40 hover:border-white/10"
                              )}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
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
                      'Tamamla'
                    ) : (
                      <>
                        <span>Devam</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

