import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Menu, X, Globe } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Animaciones para la cabecera
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".nav-logo", {
      x: -20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      clearProps: "all"
    })
      .from(".nav-link", {
        y: -10,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
        clearProps: "all"
      }, "-=0.4")
      .from(".nav-action", {
        x: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        clearProps: "all"
      }, "-=0.4");
  }, { scope: navRef });

  // Animaciones para dispositivos moviles
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isOpen) {
        gsap.to(mobileMenuRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
          display: "block"
        });
        gsap.fromTo(".mobile-nav-link",
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.05, duration: 0.3, delay: 0.1 }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-lg shadow-lg border-b border-slate-200/50 dark:border-slate-800/50'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="nav-logo flex-shrink-0 font-bold text-2xl bg-gradient-to-r from-primary-600 to-cyan-500 bg-clip-text text-transparent cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Jesús<span className="text-slate-700 dark:text-slate-300">Dev</span>
          </div>

          {/* Menu para desktop */}
          <div className="hidden md:flex items-center space-x-1 ml-10">
            {navLinks.map((link, i) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className="nav-link text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-full text-sm font-medium transition-all hover:bg-slate-100 dark:hover:bg-white/5"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Acciones */}
          <div className="hidden md:flex items-center gap-3 ml-4">
            <button
              onClick={toggleLanguage}
              className="nav-action flex items-center gap-1 px-3 py-2 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-sm font-medium ring-1 ring-slate-200 dark:ring-slate-700"
            >
              <Globe size={16} />
              <span>{language.toUpperCase()}</span>
            </button>

            <button
              onClick={toggleDarkMode}
              className="nav-action p-2.5 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-800 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all focus:outline-none ring-1 ring-slate-200 dark:ring-slate-700"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Boton del menu movil */}
          <div className="-mr-2 flex md:hidden items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 text-xs font-bold"
            >
              {language.toUpperCase()}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu movil */}
      <div
        ref={mobileMenuRef}
        style={{ height: 0, opacity: 0, display: 'none', overflow: 'hidden' }}
        className="md:hidden bg-white dark:bg-[#0B1120] border-b border-slate-200 dark:border-slate-800"
      >
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              className="mobile-nav-link text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-3 rounded-md text-base font-medium"
            >
              {link.name}
            </a>
          ))}
          <div className="mt-4 px-3 pt-4 border-t border-slate-200 dark:border-slate-800 flex gap-4">
            <button
              onClick={() => { toggleDarkMode(); setIsOpen(false); }}
              className="mobile-nav-link flex items-center gap-3 flex-1 py-2 text-slate-700 dark:text-slate-300"
            >
              {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} />}
              <span className="font-medium">{darkMode ? t.nav.toggleTheme[0] : t.nav.toggleTheme[1]}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
