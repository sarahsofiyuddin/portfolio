import { motion } from 'motion/react';
import { Mail, Linkedin, Github, Globe, ArrowUp, Star, Sparkles } from 'lucide-react';

export default function Contact() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#F5F5F7] border-t border-[#E8E8ED]">
      {/* Absolute glow balls (iOS modern aurora backdrops) */}
      <div className="absolute top-[20%] right-[10%] w-[450px] h-[450px] bg-indigo-200/10 rounded-full blur-[130px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-sky-200/10 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10 animate-fade-in font-sans">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1D1D1F]"
          >
            Get In Touch
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="h-0.5 w-16 bg-[#1D1D1F] mx-auto rounded-full mt-4"
          />
        </div>

        {/* Core Glassmorphic Contact Card Block */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl mx-auto bg-white border border-[#E8E8ED] p-8 sm:p-12 rounded-3xl shadow-md overflow-hidden relative"
        >
          {/* Glossy shine element */}
          <div className="absolute inset-y-0 -inset-x-40 bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-20 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
            
            {/* Availability message column */}
            <div className="col-span-1 md:col-span-7 space-y-5">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] tracking-tight leading-tight">
                Let’s connect!
              </h3>
              
              <p className="text-[#86868B] text-sm sm:text-base leading-relaxed font-light">
                Available for{' '}
                <strong className="text-[#1D1D1F] font-semibold underline decoration-[#0071E3]/30 decoration-2">
                  Software Development, AI, Data Analytics
                </strong>{' '}
                and Technology-related opportunities. Reach out if you are recruiting for entry-level roles!
              </p>

              <div className="flex items-center gap-2.5 text-xs text-[#86868B] font-mono">
                <Globe size={14} className="text-[#0071E3] animate-pulse" />
                <span>Kedah | Perlis | Penang | Kuala Lumpur, Malaysia</span>
              </div>
            </div>

            {/* Direct interactive contact links column */}
            <div className="col-span-1 md:col-span-5 flex flex-col gap-3.5">
              
              {/* Email link */}
              <a
                href="mailto:sarahsofiyuddin@gmail.com"
                className="group flex items-center justify-between p-4 rounded-2xl bg-[#F5F5F7] border border-[#E8E8ED] hover:border-[#86868B] hover:bg-white shadow-3xs transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E8E8ED] text-[#1D1D1F] flex items-center justify-center transition-colors group-hover:bg-[#1D1D1F] group-hover:text-white">
                    <Mail size={16} />
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] font-mono font-bold text-[#86868B] uppercase tracking-widest">Email</span>
                    <span className="block text-[#1D1D1F] font-bold text-xs sm:text-sm font-mono truncate max-w-[160px] sm:max-w-[200px]">
                      sarahsofiyuddin@gmail.com
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-[#0071E3] font-bold group-hover:translate-x-1.5 transition-transform">→</span>
              </a>

              {/* LinkedIn Link */}
              <a
                href="https://linkedin.com/in/sarahsyazana"
                target="_blank"
                rel="noreferrer"
                referrerPolicy="no-referrer"
                className="group flex items-center justify-between p-4 rounded-2xl bg-[#F5F5F7] border border-[#E8E8ED] hover:border-[#86868B] hover:bg-white shadow-3xs transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E8E8ED] text-[#1D1D1F] flex items-center justify-center transition-colors group-hover:bg-[#1D1D1F] group-hover:text-white">
                    <Linkedin size={16} />
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] font-mono font-bold text-[#86868B] uppercase tracking-widest">LinkedIn</span>
                    <span className="block text-[#1D1D1F] font-bold text-xs sm:text-sm font-sans">
                      Sarah Syazana
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-[#0071E3] font-bold group-hover:translate-x-1.5 transition-transform">→</span>
              </a>

              {/* GitHub Link */}
              <a
                href="https://github.com/sarahsofiyuddin"
                target="_blank"
                rel="noreferrer"
                referrerPolicy="no-referrer"
                className="group flex items-center justify-between p-4 rounded-2xl bg-[#F5F5F7] border border-[#E8E8ED] hover:border-[#86868B] hover:bg-white shadow-3xs transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E8E8ED] text-[#1D1D1F] flex items-center justify-center transition-colors group-hover:bg-[#1D1D1F] group-hover:text-white">
                    <Github size={16} />
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] font-mono font-bold text-[#86868B] uppercase tracking-widest">GitHub</span>
                    <span className="block text-[#1D1D1F] font-bold text-xs sm:text-sm font-mono">
                      sarahsofiyuddin
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-[#0071E3] font-bold group-hover:translate-x-1.5 transition-transform">→</span>
              </a>

            </div>

          </div>

          {/* Micro Footer Trademark & Back-to-Top inline row */}
          <div className="mt-12 pt-6 border-t border-[#E8E8ED] flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
            <p className="text-[11px] font-sans text-[#86868B] font-normal">
              © {new Date().getFullYear()} Built with extreme attention to detail.
            </p>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
