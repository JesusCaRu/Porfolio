import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Menu, X, Globe, Command, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../context/LanguageContext';
import { SHORT_NAME } from '../constants';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onOpenCommandPalette?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode, onOpenCommandPalette }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".nav-container", {
      y: -25,
      opacity: 0,
      duration: 0.9,
      clearProps: "all"
    })
    .from(".nav-item", {
      y: -10,
      opacity: 0,
      stagger: 0.06,
      duration: 0.5,
      clearProps: "all"
    }, "-=0.5");
  }, { scope: navRef });

  // Animaciones para dispositivos moviles
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isOpen) {
        gsap.to(mobileMenuRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.35,
          ease: "power3.out",
          display: "block"
        });
        gsap.fromTo(".mobile-nav-link",
          { x: -15, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.04, duration: 0.25, delay: 0.05 }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.25,
          ease: "power3.in",
          onComplete: () => {
            if (mobileMenuRef.current) mobileMenuRef.current.style.display = "none";
          }
        });
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: t.nav.home, id: 'hero' },
    { name: t.nav.skills, id: 'skills' },
    { name: t.nav.experience, id: 'experience' },
    { name: t.nav.projects, id: 'projects' },
    { name: t.nav.contact, id: 'contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="nav-container glass-dock rounded-2xl md:rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-300">
          
          {/* Logo limpio con indicador en vivo reactivo */}
          <div
            className="nav-item flex items-center gap-2.5 cursor-pointer group select-none"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="flex flex-col">
              <span className="font-heading font-bold text-base md:text-lg text-slate-900 dark:text-white tracking-tight leading-none group-hover:text-primary-600 dark:group-hover:text-cyan-400 transition-colors">
                {SHORT_NAME}<span className="text-cyan-500">.dev</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {t.nav?.available || (language === 'es' ? 'Disponible' : 'Available')}
              </span>
            </div>
          </div>

          {/* Enlaces Desktop */}
          <nav className="hidden lg:flex items-center space-x-1 font-sans">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className="nav-item text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-cyan-400 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all hover:bg-slate-100/80 dark:hover:bg-white/5 cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Botones de acción & Herramientas */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Buscador / Command Palette Trigger */}
            <button
              onClick={onOpenCommandPalette}
              className="nav-item hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/70 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all text-xs font-medium border border-slate-200/80 dark:border-slate-700/60 cursor-pointer group"
              title="Abrir Command Palette"
            >
              <Command className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover:text-primary-500 transition-colors" />
              <span className="hidden md:inline text-[11px] text-slate-500 dark:text-slate-400">{t.nav.quickSearch}</span>
              <kbd className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Idioma Switcher */}
            <button
              onClick={toggleLanguage}
              className="nav-item flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/70 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all text-xs font-bold border border-slate-200/80 dark:border-slate-700/60 cursor-pointer"
              aria-label="Cambiar idioma"
            >
              <Globe className="w-3.5 h-3.5 text-primary-500" />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* Dark Mode Switcher */}
            <button
              onClick={toggleDarkMode}
              className="nav-item p-2 rounded-full bg-slate-100 dark:bg-slate-800/70 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-yellow-400 transition-all focus:outline-none border border-slate-200/80 dark:border-slate-700/60 cursor-pointer hover:rotate-12 duration-300"
              aria-label="Alternar modo oscuro"
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Botón Menú Móvil */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none cursor-pointer"
              aria-label="Menú"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      <div
        ref={mobileMenuRef}
        style={{ height: 0, opacity: 0, display: 'none', overflow: 'hidden' }}
        className="lg:hidden max-w-7xl mx-auto px-4 mt-2"
      >
        <div className="glass-dock rounded-2xl p-4 shadow-xl space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              className="mobile-nav-link text-slate-800 dark:text-slate-200 hover:text-primary-600 dark:hover:text-cyan-400 block px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            >
              {link.name}
            </a>
          ))}

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 px-2">
            <button
              onClick={() => {
                setIsOpen(false);
                if (onOpenCommandPalette) onOpenCommandPalette();
              }}
              className="flex items-center gap-2 py-2 px-3 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl flex-1 justify-center"
            >
              <Command size={14} />
              {t.nav.commandK} (⌘K)
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

