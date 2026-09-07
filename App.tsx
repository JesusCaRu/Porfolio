import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { ArrowUp, Mail, Command, Sparkles, Check } from 'lucide-react';
import { Github, Linkedin } from './components/SocialIcons';
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
import { SHORT_NAME } from './constants';

const CommandPalette = lazy(() => import('./components/CommandPalette'));

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
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  // Manejador global de atajos de teclado para Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Progreso de scroll (instanciado una única vez al montar)
  useGSAP(() => {
    const radius = 44;
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
  }, []);

  // Animación del botón scroll to top (solo al alternar visibilidad)
  useGSAP(() => {
    if (scrollBtnRef.current) {
      if (showScrollTop) {
        gsap.to(scrollBtnRef.current, {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.35,
          ease: "back.out(1.7)"
        });
      } else {
        gsap.to(scrollBtnRef.current, {
          y: 20,
          scale: 0,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in"
        });
      }
    }
  }, [showScrollTop]);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 300;
      setShowScrollTop(prev => prev !== shouldShow ? shouldShow : prev);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300 font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* Barra de Navegación Flotante */}
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Paleta de Comandos Global (Cmd+K / Ctrl+K) cargada bajo demanda */}
      <Suspense fallback={null}>
        {isCommandPaletteOpen && (
          <CommandPalette
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            onCopyEmail={() => showToast(t.commandPalette?.copiedEmailToast || 'Email copiado: jesuscanicio33@gmail.com')}
          />
        )}
      </Suspense>

      {/* Contenido Principal */}
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* Footer Amplio y Elegante */}
      <footer className="bg-slate-50 dark:bg-black border-t border-slate-200 dark:border-slate-800/90 py-24 sm:py-28 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center">
            
            {/* Logo e Info (5 cols) */}
            <div className="md:col-span-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
                  {SHORT_NAME}<span className="text-cyan-500">.dev</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-mono mt-2 uppercase tracking-widest font-semibold">
                Desarrollador Full Stack
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 max-w-sm mx-auto md:mx-0">
                Construyendo experiencias web completas, escalables y optimizadas.
              </p>
            </div>

            {/* Enlaces Rápidos (4 cols) */}
            <div className="md:col-span-5 flex flex-wrap justify-center md:justify-center gap-6 sm:gap-8 text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider">
              <a href="#hero" className="text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                {t.nav?.home || 'Inicio'}
              </a>
              <a href="#skills" className="text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                {t.nav?.skills || 'Habilidades'}
              </a>
              <a href="#experience" className="text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                {t.nav?.experience || 'Experiencia'}
              </a>
              <a href="#projects" className="text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                {t.nav?.projects || 'Proyectos'}
              </a>
              <a href="#contact" className="text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                {t.nav?.contact || 'Contacto'}
              </a>
            </div>

            {/* Redes y Atajo (3 cols) */}
            <div className="md:col-span-3 flex items-center justify-center md:justify-end gap-3">
              <button
                onClick={() => setIsCommandPaletteOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs font-mono font-semibold hover:border-cyan-500/40 transition-colors cursor-pointer shadow-2xs"
                title="Abrir Command Palette"
              >
                <Command size={14} className="text-cyan-500" />
                <span>⌘K</span>
              </button>

              <a 
                href="https://github.com/JesusCaRu" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 hover:border-cyan-500/40 transition-all hover:-translate-y-0.5 shadow-2xs cursor-pointer"
                title="GitHub"
              >
                <Github size={19} />
              </a>
              <a 
                href="https://www.linkedin.com/in/jesús-canicio-ruiz-184374262" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 transition-all hover:-translate-y-0.5 shadow-2xs cursor-pointer"
                title="LinkedIn"
              >
                <Linkedin size={19} />
              </a>
              <a 
                href="mailto:jesuscanicio33@gmail.com" 
                className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 hover:border-cyan-500/40 transition-all hover:-translate-y-0.5 shadow-2xs cursor-pointer"
                title="Email"
              >
                <Mail size={19} />
              </a>
            </div>

          </div>

          <div className="pt-12 mt-12 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 dark:text-slate-500 font-mono">
            <p>
              © {new Date().getFullYear()} {t.footer?.copyright || 'Jesús Canicio Ruiz. Todos los derechos reservados.'}
            </p>
            <div className="flex items-center gap-2 text-emerald-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>{t.footer?.status || 'All systems operational'}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast Notification Flotante */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-2xl border border-slate-700/50 dark:border-slate-200 text-xs font-mono font-bold animate-in fade-in slide-in-from-bottom-3">
          <Check size={15} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Botón flotante Scroll-To-Top con progreso circular */}
      <div
        ref={scrollBtnRef}
        className="fixed bottom-6 right-6 z-40 opacity-0 scale-0 transform translate-y-4"
      >
        <button
          onClick={scrollToTop}
          className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white/95 dark:bg-[#0E121B]/95 backdrop-blur-md shadow-xl border border-slate-200/80 dark:border-slate-800 transition-all hover:scale-110 active:scale-95 group cursor-pointer"
          aria-label="Volver arriba"
        >
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="currentColor"
              strokeWidth="7"
              className="text-slate-100 dark:text-slate-800"
            />
            <circle
              ref={progressCircleRef}
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="currentColor"
              strokeWidth="7"
              className="text-cyan-500 dark:text-cyan-400 drop-shadow-sm"
              strokeLinecap="round"
            />
          </svg>
          <ArrowUp size={18} className="text-slate-700 dark:text-slate-200 relative z-10 group-hover:-translate-y-0.5 transition-transform duration-200" />
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