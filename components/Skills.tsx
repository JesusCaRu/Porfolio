import React, { useRef, useState } from 'react';
import { SKILLS_DATA } from '../constants';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Layers, Cpu, Wrench } from 'lucide-react';

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
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.7)",
      clearProps: "all"
    });

    gsap.from(".skills-title", {
      scrollTrigger: {
        trigger: ".skills-header",
        start: "top 80%",
      },
      y: 25,
      opacity: 0,
      duration: 0.7,
      delay: 0.1,
      ease: "power3.out",
      clearProps: "all"
    });

    gsap.from(".skills-subtitle", {
      scrollTrigger: {
        trigger: ".skills-header",
        start: "top 80%",
      },
      y: 20,
      opacity: 0,
      duration: 0.7,
      delay: 0.2,
      ease: "power3.out",
      clearProps: "all"
    });
  }, { scope: containerRef });

  const filteredSkills = SKILLS_DATA.filter(
    (skill) => activeFilter === 'all' || skill.category === activeFilter
  );

  const filters = [
    { key: 'all' as const, label: t.skills.filterAll, icon: <Layers size={14} /> },
    { key: 'frontend' as const, label: t.skills.filterFrontend, icon: <Sparkles size={14} /> },
    { key: 'backend' as const, label: t.skills.filterBackend, icon: <Cpu size={14} /> },
    { key: 'tools' as const, label: t.skills.filterTools, icon: <Wrench size={14} /> }
  ];

  return (
    <section id="skills" ref={containerRef} className="py-28 relative overflow-hidden bg-white dark:bg-[#0C101B] border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabecera de la sección */}
        <div className="skills-header text-center mb-14">
          <div className="skills-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={13} />
            {t.skills.badge}
          </div>
          <h2 className="skills-title text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-slate-900 dark:text-white mb-4 tracking-tight">
            {t.skills.title}
          </h2>
          <p className="skills-subtitle text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t.skills.subtitle}
          </p>
        </div>

        {/* Selector de Filtros */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-12 flex-wrap">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.key;
            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all relative cursor-pointer ${
                  isActive
                    ? 'text-white shadow-md shadow-cyan-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillFilter"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-primary-600 to-indigo-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
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

        {/* Grid de Habilidades */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 15 }}
                transition={{ duration: 0.2 }}
                key={skill.name}
                className="group relative p-6 rounded-2xl bg-slate-50 dark:bg-[#0A0D15] border border-slate-200 dark:border-slate-800/90 hover:border-cyan-500/50 dark:hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl cursor-default overflow-hidden"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs group-hover:scale-105 group-hover:border-cyan-500/40 transition-all duration-300">
                      {skill.icon}
                    </div>
                  </div>

                  <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {skill.name}
                  </h3>

                  {skill.usageHint && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {skill.usageHint}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
