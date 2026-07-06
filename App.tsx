import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Analytics } from "@vercel/analytics/react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PortfolioContent = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const { t } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollBtnRef = useRef<HTMLDivElement>(null);
  const progressCircleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Progreso de scroll & Boton de visibilidad
  useGSAP(() => {
    const radius = 46;
    const circumference = 2 * Math.PI * radius;

    if (progressCircleRef.current) {
      gsap.set(progressCircleRef.current, {
        strokeDasharray: circumference,
        strokeDashoffset: circumference
      });

      ScrollTrigger.create({
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          if (progressCircleRef.current) {
            gsap.to(progressCircleRef.current, {
              strokeDashoffset: circumference * (1 - self.progress),
              overwrite: true,
              ease: "none",
              duration: 0.1
            });
          }
        }
      });
    }

    if (scrollBtnRef.current) {
      if (showScrollTop) {
        gsap.to(scrollBtnRef.current, {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.7)"
        });
      } else {
        gsap.to(scrollBtnRef.current, {
          y: 20,
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        });
      }
    }
  }, [showScrollTop]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 font-sans selection:bg-blue-500 selection:text-white">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <footer className="bg-slate-50/50 dark:bg-[#0f172a]/20 border-t border-slate-200/50 dark:border-slate-900/80 py-16 backdrop-blur-md relative overflow-hidden">
        {/* Glow decorativo */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
            {/* Logo e Info */}
            <div className="text-center md:text-left">
              <div className="font-display font-extrabold text-2xl text-slate-900 dark:text-white tracking-tight">
                Jesús<span className="text-primary-500">.</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-2 uppercase tracking-widest font-bold">
                Full Stack Developer
              </p>
            </div>

            {/* Enlaces de navegacion cortos */}
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
              <a href="#contact" className="text-slate-500 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                {t.nav?.contact || 'Contacto'}
              </a>
              <a href="#projects" className="text-slate-500 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                {t.nav?.projects || 'Proyectos'}
              </a>
              <a href="#experience" className="text-slate-500 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                {t.nav?.experience || 'Experiencia'}
              </a>
              <a href="#skills" className="text-slate-500 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                {t.nav?.skills || 'Habilidades'}
              </a>
            </div>

            {/* Redes sociales */}
            <div className="flex items-center justify-center md:justify-end gap-3.5">
              <a 
                href="https://github.com/JesusCaRu" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 rounded-xl bg-white dark:bg-[#0c101b] border border-slate-200/60 dark:border-slate-800/80 text-slate-655 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
              >
                <Github size={18} />
              </a>
              <a 
                href="https://linkedin.com/in/jesús-canicio-ruiz-a461b12b5" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 rounded-xl bg-white dark:bg-[#0c101b] border border-slate-200/60 dark:border-slate-800/80 text-slate-655 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="mailto:jesuscanicio33@gmail.com" 
                className="p-3 rounded-xl bg-white dark:bg-[#0c101b] border border-slate-200/60 dark:border-slate-800/80 text-slate-655 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-slate-200/60 dark:border-slate-900/60 text-center">
            <p className="text-xs text-slate-450 dark:text-slate-500 font-medium">
              © {new Date().getFullYear()} {t.footer}
            </p>
          </div>
        </div>
      </footer>

      {/* Boton de scroll con progreso circular */}
      <div
        ref={scrollBtnRef}
        className="fixed bottom-6 right-6 z-40 opacity-0 scale-0 transform translate-y-4"
      >
        <button
          onClick={scrollToTop}
          className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-lg shadow-slate-200/30 dark:shadow-black/40 border border-slate-200/60 dark:border-slate-700/60 transition-all hover:scale-110 active:scale-95 group cursor-pointer"
          aria-label="Scroll to top"
        >
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-slate-100 dark:text-slate-800"
            />
            <circle
              ref={progressCircleRef}
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-primary-600 dark:text-primary-400 drop-shadow-sm"
              strokeLinecap="round"
            />
          </svg>
          <ArrowUp size={20} className="text-slate-700 dark:text-slate-200 relative z-10 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <PortfolioContent />
      <Analytics />
    </LanguageProvider>
  );
}

export default App;