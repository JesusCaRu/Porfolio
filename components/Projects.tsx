import React, { useRef, useState, useMemo } from 'react';
import { ExternalLink, ArrowUpRight, Sparkles, ChevronDown, ChevronUp, Layers, CheckCircle2 } from 'lucide-react';
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
      y: 10,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      clearProps: "all"
    });

    gsap.from(".projects-title", {
      scrollTrigger: {
        trigger: ".projects-header",
        start: "top 80%",
      },
      y: 20,
      opacity: 0,
      duration: 0.6,
      delay: 0.1,
      ease: "power2.out",
      clearProps: "all"
    });

    gsap.from(".projects-subtitle", {
      scrollTrigger: {
        trigger: ".projects-header",
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

  const toggleExpand = (id: number) => {
    setExpandedProjectId(prev => prev === id ? null : id);
  };

  const filteredProjects = useMemo(() => {
    return t.projects.list.filter(
      (p) => activeCategory === 'all' || p.category === activeCategory
    );
  }, [t.projects.list, activeCategory]);

  const categories = [
    { key: 'all' as const, label: t.projects.filterAll },
    { key: 'fullstack' as const, label: t.projects.filterFullstack },
    { key: 'ml' as const, label: t.projects.filterML },
    { key: 'backend' as const, label: t.projects.filterBackend }
  ];

  const projectDomains: Record<number, string> = {
    1: 'fittrack-fitness.app',
    2: 'energy-prediction.ai',
    3: 'taskflow-collab.io',
    4: 'stockflow-core.internal'
  };

  return (
    <section id="projects" ref={containerRef} className="py-24 relative overflow-hidden bg-white dark:bg-[#080B11] border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabecera */}
        <div className="projects-header text-center mb-12">
          <div className="projects-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full card-surface text-cyan-600 dark:text-cyan-400 text-xs font-mono font-medium mb-4">
            <Sparkles size={12} className="text-cyan-500" />
            <span>{t.projects.badge}</span>
          </div>
          <h2 className="projects-title text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-slate-900 dark:text-white mb-4 tracking-tight">
            {t.projects.title}
          </h2>
          <p className="projects-subtitle text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Filtros por Categoría */}
        <div className="flex justify-center gap-2 mb-14 flex-wrap">
          <div className="p-1 rounded-full card-surface inline-flex gap-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all relative cursor-pointer ${
                    isActive
                      ? 'text-white dark:text-slate-950 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProjFilter"
                      className="absolute inset-0 bg-slate-900 dark:bg-white rounded-full"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      style={{ zIndex: 0 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid de Proyectos */}
        <motion.div
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-7"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const isExpanded = expandedProjectId === project.id;
              const domain = projectDomains[project.id] || 'project.local';

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  key={project.id}
                  onMouseMove={handleMouseMove}
                  className="h-full"
                >
                  <div className="card-surface glow-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
                    
                    {/* Marco de Aplicación / Ventana */}
                    <div className="p-3 sm:p-4 pb-0">
                      <div className="rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-900/90">
                        {/* Barra superior de la ventana */}
                        <div className="px-3.5 py-2 bg-slate-100/90 dark:bg-slate-900 border-b border-slate-200/70 dark:border-slate-800/70 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                          </div>
                          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                            {domain}
                          </span>
                          <div className="w-8"></div>
                        </div>

                        {/* Contenedor de la Imagen */}
                        <div className="relative h-52 sm:h-60 overflow-hidden bg-slate-950">
                          <img
                            src={project.image}
                            alt={project.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover object-top transform group-hover:scale-103 transition-transform duration-500 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>

                          {/* Métrica en vivo flotante */}
                          {project.metrics && (
                            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/85 backdrop-blur-md border border-white/10 text-cyan-400 font-mono font-medium text-[11px] flex items-center gap-1.5 shadow-md">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                              {project.metrics}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Cuerpo del Proyecto */}
                    <div className="p-5 sm:p-6 flex flex-col flex-grow">
                      
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 flex-grow font-sans">
                        {project.description}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.tech.map((techItem, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-[11px] font-mono rounded-md bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800"
                          >
                            {techItem}
                          </span>
                        ))}
                      </div>

                      {/* Botón de desglose técnico / Highlights */}
                      {project.architecture && (
                        <div className="mb-5">
                          <button
                            onClick={() => toggleExpand(project.id)}
                            className="w-full flex items-center justify-between py-2 px-3 rounded-lg bg-slate-50 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200/70 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400 transition-colors cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              <Layers size={13} className="text-cyan-500" />
                              {isExpanded ? (t.projects.hideDetails || 'Ocultar Desglose') : (t.projects.archBreakdown || 'Arquitectura & Métricas')}
                            </span>
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden mt-2 p-3.5 rounded-lg bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 text-xs space-y-2 font-mono"
                              >
                                {project.architecture.frontend && (
                                  <div>
                                    <span className="text-slate-400 uppercase tracking-wider text-[10px] block font-semibold">Frontend:</span>
                                    <span className="text-slate-800 dark:text-slate-200">{project.architecture.frontend}</span>
                                  </div>
                                )}
                                {project.architecture.backend && (
                                  <div>
                                    <span className="text-slate-400 uppercase tracking-wider text-[10px] block font-semibold">Backend:</span>
                                    <span className="text-slate-800 dark:text-slate-200">{project.architecture.backend}</span>
                                  </div>
                                )}
                                {project.architecture.database && (
                                  <div>
                                    <span className="text-slate-400 uppercase tracking-wider text-[10px] block font-semibold">Database:</span>
                                    <span className="text-slate-800 dark:text-slate-200">{project.architecture.database}</span>
                                  </div>
                                )}
                                {project.highlights && project.highlights.length > 0 && (
                                  <div className="pt-2 border-t border-slate-200/70 dark:border-slate-800">
                                    <span className="text-slate-400 uppercase tracking-wider text-[10px] block mb-1 font-semibold">Highlights:</span>
                                    <ul className="space-y-1 font-sans text-[11px] text-slate-600 dark:text-slate-300">
                                      {project.highlights.map((item, hIdx) => (
                                        <li key={hIdx} className="flex items-start gap-1.5">
                                          <CheckCircle2 size={12} className="text-cyan-500 shrink-0 mt-0.5" />
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

                      {/* Enlaces de Acción Directos */}
                      <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800/70 flex items-center justify-between gap-3 mt-auto">
                        <div className="flex items-center gap-2">
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-lg card-surface text-xs font-mono font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Github size={14} />
                              <span>{t.projects.viewCode || 'GitHub'}</span>
                            </a>
                          )}
                        </div>

                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-xs font-medium flex items-center gap-1.5 transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
                          >
                            <span>{t.projects.viewDemo || 'Live Demo'}</span>
                            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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