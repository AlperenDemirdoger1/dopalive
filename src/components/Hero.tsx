import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Twitter, Linkedin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/dopalive_logo.png'
import heroBackground from '../assets/dopalive_hero_background_v6.webp'

const Hero = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Lütfen e-posta adresinizi girin')
      return
    }

    if (!validateEmail(email)) {
      setError('Geçerli bir e-posta adresi girin')
      return
    }

    setIsSubmitting(true)

    try {
      // !! ÖNEMLİ !! Google Forms URL'nizi buraya yapıştırın
      // Örnek format: https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse
      const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdslR9hSqOh_MwJg9iXaS8lRqMl0Tbep5TZBOsG2EQUQHtr5A/formResponse'
      
      // Google Forms'a gönder
      // Formunuzdaki "Email" sorusu için entry ID'si genellikle entry.0 veya entry.XXXXXXX olur
      // Eğer çalışmazsa, formun kaynak kodundan entry ID'sini bulmanız gerekebilir
      const formData = new FormData()
      
      // Email sorusu için entry ID'si
      formData.append('entry.1771892372', email)
      
      // İkinci soru (Mail) boş bırakılıyor - sadece email gönderiyoruz
      // formData.append('entry.1', '') // Gerekirse ekleyin
      
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors', // CORS sorununu önlemek için
        body: formData,
      })
      
      // no-cors modunda response göremeyiz, bu yüzden başarılı varsayıyoruz
      // Eğer Google Sheets'e veri gitmiyorsa, entry ID'sini kontrol edin

      setIsSuccess(true)
      setEmail('')
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.')
      console.error('Waitlist submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitAnother = () => {
    setIsSuccess(false)
    setEmail('')
    setError('')
  }

  // Parallax hesaplaması (çok subtle)
  const parallaxX = typeof window !== 'undefined' 
    ? (mousePosition.x / window.innerWidth - 0.5) * -8 
    : 0
  const parallaxY = typeof window !== 'undefined' 
    ? (mousePosition.y / window.innerHeight - 0.5) * -8 
    : 0

  // Fade-in animasyonları (staggered)
  const fadeInUp = (delay: number) => ({
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.4, 0.0, 0.2, 1],
        delay 
      }
    },
  })

  const backgroundStyle = {
    backgroundImage: `url(${heroBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden">
      {/* Background with subtle parallax */}
      <motion.div
        className="absolute inset-0"
        style={backgroundStyle}
        animate={{
          x: parallaxX,
          y: parallaxY,
          scale: 1.02,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 50, 
          damping: 20 
        }}
      />
      <div className="absolute inset-0 bg-night-blue/40"></div>

      {/* Navigation Bar */}
      <nav className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
          {/* Left: Logo */}
          <motion.div
            variants={fadeInUp(0.3)}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 justify-start"
          >
            <img 
              src={logo} 
              alt="DopaLive Logo" 
              className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
            />
            <span className="text-xl sm:text-2xl font-satoshi font-bold text-off-white">
              dopalive
            </span>
          </motion.div>

          {/* Center: "Yalnız Değilsin" + Social Icons - Perfectly Centered */}
          <motion.div
            variants={fadeInUp(0.5)}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center gap-2"
          >
            <p className="text-sm sm:text-base text-off-white/80 italic font-inter font-light text-center">
              Yalnız Değilsin
            </p>
            <div className="flex items-center justify-center gap-2">
              <motion.a
                href="https://twitter.com/dopalive"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-effect rounded-lg p-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-off-white" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/company/dopalive"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-effect rounded-lg p-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-off-white" />
              </motion.a>
            </div>
          </motion.div>

          {/* Right: Navigation Links */}
          <motion.div
            variants={fadeInUp(0.7)}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-6 justify-end"
          >
            <Link 
              to="/nasil-calisir" 
              className="text-sm font-inter text-off-white/90 hover:text-white transition-colors duration-300"
            >
              Nasıl Çalışır
            </Link>
            <span className="text-off-white/30">|</span>
            <a 
              href="#story" 
              className="text-sm font-inter text-off-white/90 hover:text-white transition-colors duration-300"
            >
              Hikaye
            </a>
          </motion.div>
        </div>
      </nav>

      {/* Central Content */}
      <div className="relative z-10 flex-1 flex items-start justify-center px-4 sm:px-6 lg:px-8 pt-2 sm:pt-3">
        <div className="max-w-4xl mx-auto text-center pt-[12vh] sm:pt-[10vh] md:pt-[8vh]">
          {/* Main Headline Line 1 */}
          <motion.h1
            variants={fadeInUp(0.9)}
            initial="hidden"
            animate="visible"
            className="text-[29px] sm:text-[33px] md:text-[35px] lg:text-[37px] font-satoshi font-bold text-off-white mb-2 sm:mb-2.5 leading-tight"
          >
            Zihnin Dünya'dan Hızlı,
          </motion.h1>

          {/* Main Headline Line 2 */}
          <motion.h2
            variants={fadeInUp(0.9)}
            initial="hidden"
            animate="visible"
            className="text-[27px] sm:text-[31px] md:text-[33px] lg:text-[35px] font-satoshi font-bold text-off-white mb-3 sm:mb-4 md:mb-4 leading-tight"
          >
            Seni Anlıyoruz.
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={fadeInUp(1.1)}
            initial="hidden"
            animate="visible"
            className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[15px] font-inter text-off-white/90 mb-4 sm:mb-5 md:mb-5 max-w-2xl mx-auto leading-relaxed"
          >
            Dikkat ve odak yönetimi için tasarlanmış ilk bütünsel platform.
          </motion.p>

          {/* Success Message or Form */}
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
                className="glass-effect rounded-3xl p-8 sm:p-10 max-w-lg mx-auto"
              >
                <p className="text-sm sm:text-base md:text-lg font-inter text-off-white/90 mb-4 leading-relaxed">
                  Ne yazık ki biz de mükemmelliyetçilik kurbanıyız... Bu yüzden en iyi deneyimi yaratana kadar durmayacağız. Çok yakında görüşürüz.
                </p>
                <button
                  onClick={handleSubmitAnother}
                  className="text-xs sm:text-sm text-off-white/70 hover:text-white underline transition-colors duration-300 mt-2"
                >
                  Başka bir e-posta gönder
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                variants={fadeInUp(1.3)}
                initial="hidden"
                animate="visible"
                className="max-w-lg mx-auto"
              >
                <form 
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 mb-3 sm:mb-3.5"
                >
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setError('')
                      }}
                      placeholder="E-posta adresin"
                      required
                      className={`w-full px-5 py-3 rounded-full glass-input text-off-white placeholder-off-white/60 focus:outline-none focus:ring-2 transition-all duration-300 text-sm sm:text-base ${
                        error 
                          ? 'focus:ring-red-400/50 border-red-400/50' 
                          : 'focus:ring-lavender/50'
                      }`}
                      disabled={isSubmitting}
                    />
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-300 mt-2 text-left ml-5"
                      >
                        {error}
                      </motion.p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-full glass-button text-off-white font-inter font-semibold hover:bg-lavender/30 focus:outline-none focus:ring-2 focus:ring-lavender/50 transition-all duration-300 text-sm sm:text-base whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? 'Gönderiliyor...' : 'Listeye Katıl'}
                  </motion.button>
                </form>
                <p className="text-[11px] sm:text-[12px] md:text-[13px] lg:text-[13px] font-inter text-off-white/70 max-w-2xl mx-auto mt-2">
                  <em>DEHB'li</em> zihinler için yaratıldı, <em>herkes</em> için çalışır.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Hero
