import React, { useRef, useState } from 'react';
import { SKILLS_DATA } from '../constants';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'frontend' | 'backend' | 'tools'>('all');

  // Mouse move effect for glow cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    requestAnimationFrame(() => {
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  useGSAP(() => {
    // Animación del título
    gsap.from(".skills-title", {
      scrollTrigger: {
        trigger: ".skills-title",
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      clearProps: "all"
    });

    gsap.from(".skills-subtitle", {
      scrollTrigger: {
        trigger: ".skills-subtitle",
        start: "top 80%",
      },
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.1,
      ease: "power3.out",
      clearProps: "all"
    });

    // Animación flotante continua para los iconos
    gsap.utils.toArray(".skill-icon").forEach((icon: any, i) => {
      gsap.to(icon, {
        y: -5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2
      });
    });

  }, { scope: containerRef });

  const filteredSkills = SKILLS_DATA.filter(
    (skill) => activeFilter === 'all' || skill.category === activeFilter
  );

  return (
    <section id="skills" ref={containerRef} className="py-32 bg-white dark:bg-[#0B1120] relative overflow-hidden">
      {/* Gradiente de fondo decorativo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-100/30 dark:bg-primary-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="skills-title text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            {t.skills.title}
          </h2>
          <p className="skills-subtitle text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t.skills.subtitle}
          </p>
        </div>

        {/* Botones de Filtro Dinámico */}
        <div className="flex justify-center gap-3 mb-16 flex-wrap">
          {(['all', 'frontend', 'backend', 'tools'] as const).map((filter) => {
            const label = {
              all: language === 'es' ? 'Todos' : 'All',
              frontend: 'Frontend',
              backend: 'Backend',
              tools: language === 'es' ? 'Herramientas' : 'Tools'
            }[filter];
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all relative cursor-pointer ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100/50 dark:bg-slate-800/30'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-primary-600 dark:bg-primary-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    style={{ zIndex: 0 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            );
          })}
        </div>

        {/* Grid de habilidades animada */}
        <motion.div
          layout
          className="skills-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={skill.name}
                onMouseMove={handleMouseMove}
                className="skill-card group glow-card relative p-8 rounded-3xl bg-slate-50/50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/60 hover:border-primary-500/40 dark:hover:border-primary-500/40 transition-all duration-500 backdrop-blur-sm flex flex-col items-center justify-center hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-500/5 cursor-default overflow-hidden"
              >
                {/* Glow decorativo de fondo */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/5 rounded-full blur-2xl group-hover:bg-primary-500/10 group-hover:scale-125 transition-all duration-700 pointer-events-none -z-10" />

                <div className="flex flex-col items-center justify-center text-center z-10 relative w-full">
                  <div className="mb-6 p-5 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 group-hover:bg-slate-50 dark:group-hover:bg-slate-950 group-hover:shadow-md group-hover:shadow-primary-500/5 group-hover:border-primary-500/30 transition-all duration-500 ease-out">
                    <div className="skill-icon">
                      {skill.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{skill.name}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900/50 px-3 py-1 rounded-full border border-slate-100 dark:border-slate-700/50">
                    {skill.category === 'tools' && language === 'es' ? 'herramientas' : skill.category}
                  </span>
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