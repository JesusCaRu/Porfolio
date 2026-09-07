import React, { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof CONTENT['es'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Obtiene el idioma del navegador o local storage
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      if (saved && (saved === 'es' || saved === 'en')) return saved;

      // Si no hay idioma guardado, revisamos el idioma del navegador
      const browserLang = navigator.language || '';
      // Si el navegador empieza por 'es' (ej. es-ES, es-MX), mostramos español
      if (browserLang.toLowerCase().startsWith('es')) {
        return 'es';
      }
      // Para cualquier otro idioma (ej. en-US, fr-FR), ponemos inglés por defecto
      return 'en';
    }
    return 'en';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  }, []);

  const t = useMemo(() => CONTENT[language], [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
