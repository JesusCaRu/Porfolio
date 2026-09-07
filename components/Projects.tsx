import React, { useRef, useState } from 'react';
import { ExternalLink, ArrowRight, Layers, Cpu, Database, ChevronDown, ChevronUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { Github } from './SocialIcons';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'fullstack' | 'ml' | 'backend'>('all');
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);

  useGSAP(() => {
    gsap.from(".projects-badge", {
      scrollTrigger: {
        trigger: ".projects-header",
        start: "top 80%",
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.7)",
      clearProps: "all"
    });

    gsap.from(".projects-title", {
      scrollTrigger: {
        trigger: ".projects-header",
        start: "top 80%",
      },
      y: 25,
      opacity: 0,
      duration: 0.7,
      delay: 0.1,
      ease: "power3.out",
      clearProps: "all"
    });

    gsap.from(".projects-subtitle", {
      scrollTrigger: {
        trigger: ".projects-header",
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const toggleExpand = (id: number) => {
    setExpandedProjectId(prev => prev === id ? null : id);
  };

  const filteredProjects = t.projects.list.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  );

  const categories = [
    { key: 'all' as const, label: t.projects.filterAll },
    { key: 'fullstack' as const, label: t.projects.filterFullstack },
    { key: 'ml' as const, label: t.projects.filterML },
    { key: 'backend' as const, label: t.projects.filterBackend }
  ];

  return (
    <section id="projects" ref={containerRef} className="py-28 relative overflow-hidden bg-white dark:bg-[#0C101B] border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabecera */}
        <div className="projects-header text-center mb-12">
          <div className="projects-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/30 text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={13} />
            {t.projects.badge}
          </div>
          <h2 className="projects-title text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-slate-900 dark:text-white mb-4 tracking-tight">
            {t.projects.title}
          </h2>
          <p className="projects-subtitle text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Filtros por Categoría */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-14 flex-wrap">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all relative cursor-pointer ${
                  isActive
                    ? 'text-white shadow-md shadow-indigo-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeProjFilter"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-primary-600 to-indigo-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    style={{ zIndex: 0 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Grid de Proyectos */}
        <motion.div
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const isExpanded = expandedProjectId === project.id;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  key={project.id}
                  onMouseMove={handleMouseMove}
                  className="h-full"
                >
                  <div className="glow-card bg-white/90 dark:bg-[#0E121B]/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 shadow-xl hover:shadow-2xl hover:border-cyan-500/40 dark:hover:border-cyan-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
                    
                    {/* Header Imagen con Badge de Métrica */}
                    <div className="p-4 pb-0 relative">
                      <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>

                        {/* Métrica / Badge flotante */}
                        {project.metrics && (
                          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-cyan-400 font-mono font-bold text-xs flex items-center gap-1.5 shadow-lg">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                            {project.metrics}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Contenido del Proyecto */}
                    <div className="p-6 flex flex-col flex-grow">
                      
                      {/* Título */}
                      <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>

                      {/* Descripción */}
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                        {project.description}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tech.map((techItem, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 text-[11px] font-mono font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/60"
                          >
                            {techItem}
                          </span>
                        ))}
                      </div>

                      {/* Acordeón de Arquitectura & Detalles */}
                      {project.architecture && (
                        <div className="mb-6">
                          <button
                            onClick={() => toggleExpand(project.id)}
                            className="w-full flex items-center justify-between py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              <Layers size={14} className="text-cyan-500" />
                              {isExpanded ? (t.projects.hideDetails || 'Ocultar Detalles') : (t.projects.archBreakdown || 'Detalles de Arquitectura')}
                            </span>
                            {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden mt-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/80 text-xs space-y-2 font-mono"
                              >
                                {project.architecture.frontend && (
                                  <div>
                                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Frontend:</span>
                                    <span className="text-slate-800 dark:text-slate-200">{project.architecture.frontend}</span>
                                  </div>
                                )}
                                {project.architecture.backend && (
                                  <div>
                                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Backend:</span>
                                    <span className="text-slate-800 dark:text-slate-200">{project.architecture.backend}</span>
                                  </div>
                                )}
                                {project.architecture.database && (
                                  <div>
                                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Base de Datos:</span>
                                    <span className="text-slate-800 dark:text-slate-200">{project.architecture.database}</span>
                                  </div>
                                )}
                                {project.highlights && project.highlights.length > 0 && (
                                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block mb-1">Highlights:</span>
                                    <ul className="space-y-1 font-sans text-[11px] text-slate-600 dark:text-slate-300">
                                      {project.highlights.map((item, hIdx) => (
                                        <li key={hIdx} className="flex items-start gap-1.5">
                                          <span className="text-cyan-500 font-bold">›</span>
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}

                      {/* Botones de acción (GitHub & Live Demo) */}
                      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer group/link"
                          >
                            <Github size={15} />
                            {t.projects.viewCode}
                          </a>
                        )}

                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors cursor-pointer group/link"
                          >
                            <ExternalLink size={15} />
                            {t.projects.viewDemo}
                            <ArrowRight size={13} className="transform group-hover/link:translate-x-1 transition-transform" />
                          </a>
                        )}
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;