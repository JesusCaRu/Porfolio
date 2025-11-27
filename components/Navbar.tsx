import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to handle smooth scroll with offset for fixed header
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Header height approx
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-lg shadow-lg border-b border-slate-200/50 dark:border-slate-800/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0 font-bold text-2xl bg-gradient-to-r from-primary-600 to-cyan-500 bg-clip-text text-transparent cursor-pointer" 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
            Jesús<span className="text-slate-700 dark:text-slate-300">Dev</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 ml-10">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className="text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-full text-sm font-medium transition-all hover:bg-slate-100 dark:hover:bg-white/5"
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Actions */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="hidden md:flex items-center gap-3 ml-4"
          >
             {/* Language Toggle */}
             <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-2 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-sm font-medium ring-1 ring-slate-200 dark:ring-slate-700"
            >
              <Globe size={16} />
              <span>{language.toUpperCase()}</span>
            </button>

             {/* Theme Toggle */}
             <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-800 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all focus:outline-none ring-1 ring-slate-200 dark:ring-slate-700"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </motion.div>

          {/* Mobile menu button */}
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-[#0B1120] border-b border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className="text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-3 rounded-md text-base font-medium"
                >
                  {link.name}
                </a>
              ))}
               <div className="mt-4 px-3 pt-4 border-t border-slate-200 dark:border-slate-800 flex gap-4">
                  <button
                    onClick={() => { toggleDarkMode(); setIsOpen(false); }}
                    className="flex items-center gap-3 flex-1 py-2 text-slate-700 dark:text-slate-300"
                  >
                    {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} />}
                    <span className="font-medium">{darkMode ? t.nav.toggleTheme[0] : t.nav.toggleTheme[1]}</span>
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
