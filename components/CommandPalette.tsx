import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Search, Moon, Sun, Globe, Download, Copy, ExternalLink, ArrowRight, X, Command, Code2, Briefcase, GraduationCap, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  onCopyEmail?: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: 'navigation' | 'actions' | 'projects';
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  darkMode,
  toggleDarkMode,
  onCopyEmail
}) => {
  const { t, language, setLanguage } = useLanguage();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    onClose();
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('jesuscanicio33@gmail.com');
    if (onCopyEmail) onCopyEmail();
    onClose();
  };

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Jesus_Canicio_Ruiz_CV.pdf';
    link.download = 'Jesus_Canicio_Ruiz_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  const toggleLang = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
    onClose();
  };

  const commandItems: CommandItem[] = useMemo(() => [
    // Navegación
    {
      id: 'nav-hero',
      title: t.nav.home,
      category: 'navigation',
      icon: <Sparkles className="w-4 h-4 text-cyan-500" />,
      action: () => scrollTo('hero'),
      shortcut: 'H'
    },
    {
      id: 'nav-skills',
      title: t.nav.skills,
      category: 'navigation',
      icon: <Code2 className="w-4 h-4 text-primary-500" />,
      action: () => scrollTo('skills'),
      shortcut: 'S'
    },
    {
      id: 'nav-experience',
      title: t.nav.experience,
      category: 'navigation',
      icon: <Briefcase className="w-4 h-4 text-indigo-500" />,
      action: () => scrollTo('experience'),
      shortcut: 'E'
    },
    {
      id: 'nav-projects',
      title: t.nav.projects,
      category: 'navigation',
      icon: <ExternalLink className="w-4 h-4 text-blue-500" />,
      action: () => scrollTo('projects'),
      shortcut: 'P'
    },
    {
      id: 'nav-contact',
      title: t.nav.contact,
      category: 'navigation',
      icon: <Copy className="w-4 h-4 text-emerald-500" />,
      action: () => scrollTo('contact'),
      shortcut: 'C'
    },

    // Acciones rápidas
    {
      id: 'action-theme',
      title: darkMode ? t.nav.toggleTheme[0] : t.nav.toggleTheme[1],
      category: 'actions',
      icon: darkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-indigo-500" />,
      action: () => { toggleDarkMode(); onClose(); },
      shortcut: 'T'
    },
    {
      id: 'action-lang',
      title: language === 'es' ? 'Switch to English' : 'Cambiar a Español',
      category: 'actions',
      icon: <Globe className="w-4 h-4 text-cyan-400" />,
      action: toggleLang,
      shortcut: 'L'
    },
    {
      id: 'action-cv',
      title: t.commandPalette?.downloadCv || 'Descargar CV (PDF)',
      category: 'actions',
      icon: <Download className="w-4 h-4 text-emerald-400" />,
      action: downloadCV,
      shortcut: 'CV'
    },
    {
      id: 'action-email',
      title: t.commandPalette?.copyEmail || 'Copiar Email (jesuscanicio33@gmail.com)',
      category: 'actions',
      icon: <Copy className="w-4 h-4 text-slate-400" />,
      action: copyEmailToClipboard
    },

    // Proyectos
    ...t.projects.list.map((proj) => ({
      id: `proj-${proj.id}`,
      title: proj.title,
      category: 'projects' as const,
      icon: <Code2 className="w-4 h-4 text-cyan-400" />,
      action: () => {
        if (proj.link) window.open(proj.link, '_blank');
        onClose();
      }
    }))
  ], [t, darkMode, language]);

  const filteredItems = useMemo(() => {
    const term = query.toLowerCase().trim();
    if (!term) return commandItems;
    return commandItems.filter(item => item.title.toLowerCase().includes(term));
  }, [commandItems, query]);

  // Manejador de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  // Asegura que el elemento seleccionado siempre sea visible al navegar
  useEffect(() => {
    if (listRef.current) {
      const selectedEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[99999] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-2xl bg-white dark:bg-[#0E121B] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[75vh]"
            onClick={e => e.stopPropagation()}
          >
            {/* Input de búsqueda */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800/80 gap-3">
              <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder={t.commandPalette?.placeholder || 'Escribe un comando o busca secciones, proyectos...'}
                className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm md:text-base focus:outline-none font-sans"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <kbd className="px-1.5 py-0.5 text-[11px] font-mono font-semibold bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 text-slate-500">ESC</kbd>
              </button>
            </div>

            {/* Lista de resultados */}
            <div ref={listRef} className="overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/40 font-sans">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-sm">
                  {t.commandPalette?.noResults || 'No se encontraron resultados para'} <span className="font-semibold text-slate-700 dark:text-slate-300">"{query}"</span>
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredItems.map((item, idx) => {
                    const isSelected = selectedIndex === idx;
                    return (
                      <button
                        key={item.id}
                        data-index={idx}
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer ${
                          isSelected
                            ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-900 dark:text-primary-200 ring-1 ring-primary-500/20'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/50'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`p-2 rounded-lg shrink-0 ${
                            isSelected ? 'bg-primary-100 dark:bg-primary-900/40' : 'bg-slate-100 dark:bg-slate-800/80'
                          }`}>
                            {item.icon}
                          </div>
                          <span className="text-sm font-medium truncate">{item.title}</span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 ml-3">
                          {item.shortcut && (
                            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                              {item.shortcut}
                            </span>
                          )}
                          {isSelected && (
                            <ArrowRight className="w-4 h-4 text-primary-500 animate-pulse" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer con atajos */}
            <div className="px-4 py-2.5 bg-slate-50 dark:bg-[#0A0D14] border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="hidden sm:inline font-mono">{t.commandPalette?.hint || 'Usa ↑ ↓ para navegar y Enter para seleccionar'}</span>
              <div className="flex items-center gap-2 font-mono text-[11px] ml-auto">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 bg-slate-200 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700">↵</kbd> Ejecutar
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CommandPalette;
