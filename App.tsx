import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Analytics } from "@vercel/analytics/react"

// Inner component to use the language context
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

  // Scroll Progress Animation
  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Handle Scroll To Top Visibility
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

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 text-center">
        <p className="text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} {t.footer}
        </p>
      </footer>

      {/* Scroll To Top Button with Circular Progress */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            className="fixed bottom-6 left-6 z-40"
          >
            <button
              onClick={scrollToTop}
              className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-black/50 transition-transform hover:scale-110 active:scale-95"
              aria-label="Scroll to top"
            >
              {/* Circular Progress Indicator */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background Circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-slate-100 dark:text-slate-700"
                />
                {/* Progress Circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-primary-600 dark:text-primary-400 drop-shadow-sm"
                  style={{ pathLength: scrollProgress }}
                />
              </svg>

              {/* Arrow Icon */}
              <ArrowUp size={20} className="text-slate-700 dark:text-slate-200 relative z-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
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