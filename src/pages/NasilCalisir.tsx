import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../assets/dopalive_logo.png'

const NasilCalisir = () => {
  // Fade-in animations (staggered)
  const fadeInUp = (delay: number) => ({
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.4, 0.0, 0.2, 1],
        delay 
      }
    },
  })

  return (
    <div className="w-full min-h-screen bg-night-blue">
      {/* Navigation Bar */}
      <nav className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="DopaLive Logo" 
              className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
            />
            <span className="text-xl sm:text-2xl font-satoshi font-bold text-off-white">
              dopalive
            </span>
          </Link>

          {/* Back to Home Link */}
          <Link 
            to="/" 
            className="text-sm font-inter text-off-white/90 hover:text-white transition-colors duration-300"
          >
            Ana Sayfa
          </Link>
        </div>
      </nav>

      {/* Section 1: Hero / Introduction */}
      <section className="relative w-full py-20 sm:py-24 md:py-32 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-night-blue via-lavender/20 to-coral/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-night-blue/80 via-transparent to-transparent"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Main Headline */}
            <motion.h1
              variants={fadeInUp(0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-satoshi font-bold text-off-white mb-4 sm:mb-6 leading-tight"
            >
              3 Adımda Doğru Profesyoneli Bul
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp(0.4)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-base sm:text-lg md:text-xl font-inter text-off-white/90 mb-12 sm:mb-16 md:mb-20 max-w-2xl mx-auto"
            >
              Test yap, sonucunu gör, profesyonelini bul. 15 dakika.
            </motion.p>

            {/* Three Step Indicators */}
            <motion.div
              variants={fadeInUp(0.6)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 md:gap-16"
            >
              {/* Step 1 */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full glass-effect flex items-center justify-center border-2 border-lavender/40">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-satoshi font-bold text-lavender">1</span>
                  </div>
                </div>
              </div>

              {/* Connector Line/Arrow */}
              <div className="hidden sm:block flex-1 max-w-32 md:max-w-40">
                <svg 
                  className="w-full h-1 text-lavender/30" 
                  fill="none" 
                  viewBox="0 0 200 4"
                  preserveAspectRatio="none"
                >
                  <line 
                    x1="0" 
                    y1="2" 
                    x2="200" 
                    y2="2" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  <polygon 
                    points="190,0 200,2 190,4" 
                    fill="currentColor"
                  />
                </svg>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full glass-effect flex items-center justify-center border-2 border-lavender/40">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-satoshi font-bold text-lavender">2</span>
                  </div>
                </div>
              </div>

              {/* Connector Line/Arrow */}
              <div className="hidden sm:block flex-1 max-w-32 md:max-w-40">
                <svg 
                  className="w-full h-1 text-lavender/30" 
                  fill="none" 
                  viewBox="0 0 200 4"
                  preserveAspectRatio="none"
                >
                  <line 
                    x1="0" 
                    y1="2" 
                    x2="200" 
                    y2="2" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  <polygon 
                    points="190,0 200,2 190,4" 
                    fill="currentColor"
                  />
                </svg>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full glass-effect flex items-center justify-center border-2 border-lavender/40">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-satoshi font-bold text-lavender">3</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Problem (Empathy) */}
      <section className="relative w-full py-20 sm:py-24 md:py-32 bg-off-white/5 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Headline */}
            <motion.h2
              variants={fadeInUp(0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-satoshi font-bold text-off-white mb-12 sm:mb-16 md:mb-20"
            >
              Kafan Karışık mı?
            </motion.h2>

            {/* Questions - Elegant Text Blocks */}
            <div className="space-y-8 sm:space-y-10 md:space-y-12">
              <motion.p
                variants={fadeInUp(0.3)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="text-lg sm:text-xl md:text-2xl font-inter italic text-off-white/80 leading-relaxed"
              >
                Psikiyatriste mi gitmem lazım, psikologa mı, koça mı?
              </motion.p>

              <motion.p
                variants={fadeInUp(0.4)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="text-lg sm:text-xl md:text-2xl font-inter italic text-off-white/80 leading-relaxed"
              >
                ADHD'im var mı yok mu nasıl anlarım?
              </motion.p>

              <motion.p
                variants={fadeInUp(0.5)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="text-lg sm:text-xl md:text-2xl font-inter italic text-off-white/80 leading-relaxed"
              >
                Hangi profesyonel bana uygun?
              </motion.p>

              <motion.p
                variants={fadeInUp(0.6)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="text-lg sm:text-xl md:text-2xl font-inter italic text-off-white/80 leading-relaxed"
              >
                Nerede bulacağım bu kişileri?
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section - Link back to Hero */}
      <section className="relative w-full py-16 sm:py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeInUp(0.3)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <p className="text-lg sm:text-xl md:text-2xl font-inter text-off-white/90">
              Hazır mısın?
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/"
                className="inline-block px-8 py-4 rounded-full glass-button text-off-white font-inter font-semibold hover:bg-lavender/30 focus:outline-none focus:ring-2 focus:ring-lavender/50 transition-all duration-300 text-base sm:text-lg"
              >
                Listeye Katıl
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default NasilCalisir

