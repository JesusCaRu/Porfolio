import React, { useRef, useState } from 'react';
import { SKILLS_DATA } from '../constants';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Layers, Cpu, Wrench, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'frontend' | 'backend' | 'tools'>('all');

  useGSAP(() => {
    gsap.from(".skills-badge", {
      scrollTrigger: {
        trigger: ".skills-header",
        start: "top 80%",
      },
      y: 10,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      clearProps: "all"
    });

    gsap.from(".skills-title", {
      scrollTrigger: {
        trigger: ".skills-header",
        start: "top 80%",
      },
      y: 20,
      opacity: 0,
      duration: 0.6,
      delay: 0.1,
      ease: "power2.out",
      clearProps: "all"
    });

    gsap.from(".skills-subtitle", {
      scrollTrigger: {
        trigger: ".skills-header",
        start: "top 80%",
      },
      y: 15,
      opacity: 0,
      duration: 0.6,
      delay: 0.2,
      ease: "power2.out",
      clearProps: "all"
    });
  }, { scope: containerRef });

  const filteredSkills = SKILLS_DATA.filter(
    (skill) => activeFilter === 'all' || skill.category === activeFilter
  );

  const filters = [
    { key: 'all' as const, label: t.skills.filterAll, icon: <Layers size={13} /> },
    { key: 'frontend' as const, label: t.skills.filterFrontend, icon: <Sparkles size={13} /> },
    { key: 'backend' as const, label: t.skills.filterBackend, icon: <Cpu size={13} /> },
    { key: 'tools' as const, label: t.skills.filterTools, icon: <Wrench size={13} /> }
  ];

  return (
    <section id="skills" ref={containerRef} className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-[#090C13] border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabecera de la sección */}
        <div className="skills-header text-center mb-12">
          <div className="skills-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full card-surface text-cyan-600 dark:text-cyan-400 text-xs font-mono font-medium mb-4">
            <Sparkles size={12} className="text-cyan-500" />
            <span>{t.skills.badge}</span>
          </div>
          <h2 className="skills-title text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-slate-900 dark:text-white mb-4 tracking-tight">
            {t.skills.title}
          </h2>
          <p className="skills-subtitle text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t.skills.subtitle}
          </p>
        </div>

        {/* Selector de Filtros estilo Segmented Control */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          <div className="p-1 rounded-full card-surface inline-flex gap-1">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.key;
              return (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all relative cursor-pointer ${
                    isActive
                      ? 'text-white dark:text-slate-950 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillFilter"
                      className="absolute inset-0 bg-slate-900 dark:bg-white rounded-full"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      style={{ zIndex: 0 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {filter.icon}
                    {filter.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid de Habilidades */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                transition={{ duration: 0.2 }}
                key={skill.name}
                className="card-surface group relative p-5 rounded-2xl flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 cursor-default"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                      {skill.icon}
                    </div>
                    {skill.featured && (
                      <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 text-[10px] font-mono font-medium">
                        Core Stack
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-1.5 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {skill.name}
                  </h3>

                  {skill.usageHint && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      {skill.usageHint}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bloque complementario: Idiomas & Metodología */}
        <div className="mt-12 pt-8 border-t border-slate-200/70 dark:border-slate-800/70 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <Globe size={14} className="text-cyan-500" />
            <span className="font-semibold text-slate-900 dark:text-white">
              {language === 'es' ? 'Competencias Lingüísticas:' : 'Languages:'}
            </span>
            <span>{language === 'es' ? 'Español (Nativo)' : 'Spanish (Native)'}</span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span>{language === 'es' ? 'Inglés (Básico / Técnico A2)' : 'English (Basic / Technical A2)'}</span>
          </div>
          <div className="text-slate-500 dark:text-slate-400">
            {language === 'es' ? 'Control de versiones con Git & GitHub Flow' : 'Version control with Git & GitHub Flow'}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;