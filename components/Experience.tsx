import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Briefcase, GraduationCap, X, FileBadge, Download, ExternalLink, Sparkles, Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const Experience: React.FC = () => {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const [selectedCert, setSelectedCert] = useState<{ certificate: string, degree: string, institution: string, skills?: string[] } | null>(null);

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

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCert]);

  useGSAP(() => {
    gsap.from(".exp-badge", {
      scrollTrigger: {
        trigger: ".experience-header",
        start: "top 80%",
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.7)",
      clearProps: "all"
    });

    gsap.from(".exp-title", {
      scrollTrigger: {
        trigger: ".experience-header",
        start: "top 80%",
      },
      y: 25,
      opacity: 0,
      duration: 0.7,
      delay: 0.1,
      ease: "power3.out",
      clearProps: "all"
    });

    gsap.from(".exp-subtitle", {
      scrollTrigger: {
        trigger: ".experience-header",
        start: "top 80%",
      },
      y: 20,
      opacity: 0,
      duration: 0.7,
      delay: 0.2,
      ease: "power3.out",
      clearProps: "all"
    });

    // Línea de tiempo vertical
    gsap.fromTo(".exp-line", 
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: {
          trigger: ".exp-timeline-list",
          start: "top 70%",
          end: "bottom 85%",
          scrub: true
        }
      }
    );

    gsap.utils.toArray(".exp-card-item").forEach((item: any, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
        },
        x: -30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: i * 0.1,
        clearProps: "all"
      });
    });

    gsap.utils.toArray(".edu-card-item").forEach((item: any, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
        },
        x: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: i * 0.1,
        clearProps: "all"
      });
    });

    gsap.from(".philosophy-bento", {
      scrollTrigger: {
        trigger: ".philosophy-bento",
        start: "top 85%",
      },
      y: 35,
      opacity: 0,
      duration: 0.7,
      ease: "back.out(1.5)",
      clearProps: "all"
    });

  }, { scope: containerRef });

  return (
    <section id="experience" ref={containerRef} className="py-28 relative overflow-hidden bg-slate-50 dark:bg-[#07090E] border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabecera */}
        <div className="experience-header text-center mb-16">
          <div className="exp-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={13} />
            {t.experience.badge || 'Trayectoria Profesional'}
          </div>
          <h2 className="exp-title text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-slate-900 dark:text-white mb-4 tracking-tight">
            {t.experience.title}
          </h2>
          <p className="exp-subtitle text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t.experience.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Columna 1: Experiencia Profesional */}
          <div className="exp-timeline-list">
            <div className="flex items-center gap-3.5 mb-8">
              <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                  {t.experience.workTitle}
                </h3>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Práctica real en producción</span>
              </div>
            </div>

            <div className="relative pl-6 sm:pl-8 space-y-8">
              {/* Línea de tiempo vertical */}
              <div className="exp-line absolute left-0 top-3 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 via-indigo-500 to-slate-300 dark:to-slate-800 origin-top"></div>

              {t.experience.list.map((job) => (
                <div key={job.id} className="exp-card-item relative">
                  {/* Nodo de la línea */}
                  <span className="absolute -left-[30px] sm:-left-[38px] top-3 w-4 h-4 rounded-full border-3 border-white dark:border-[#0A0D15] bg-cyan-500 shadow-md shadow-cyan-500/40"></span>

                  <div
                    onMouseMove={handleMouseMove}
                    className="glow-card p-6 sm:p-7 rounded-2xl bg-white/90 dark:bg-[#0E121B]/90 border border-slate-200/80 dark:border-slate-800/80 shadow-lg hover:shadow-xl hover:border-cyan-500/30 transition-all duration-300 group"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                      <h4 className="text-lg font-bold font-heading text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {job.title}
                      </h4>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {job.isCurrent && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            {language === 'es' ? 'En curso' : 'Current'}
                          </span>
                        )}
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border border-cyan-200/60 dark:border-cyan-800/60">
                          {job.period}
                        </span>
                      </div>
                    </div>

                    <div className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm mb-3">
                      {job.company} {job.location && <span className="text-slate-400 font-normal">· {job.location}</span>}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {job.description}
                    </p>

                    {/* Hitos detallados (CV) */}
                    {job.bullets && job.bullets.length > 0 && (
                      <ul className="space-y-2 mb-5 pl-0.5">
                        {job.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0"></span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex flex-wrap gap-1.5">
                      {job.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-[10px] font-mono font-semibold rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Columna 2: Educación & Certificaciones */}
          <div>
            <div className="flex items-center gap-3.5 mb-8">
              <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                  {t.experience.eduTitle}
                </h3>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Titulación oficial y especializaciones</span>
              </div>
            </div>

            <div className="space-y-4">
              {t.experience.education.map((edu, index) => (
                <div
                  key={index}
                  onMouseMove={handleMouseMove}
                  onClick={() => edu.certificate && setSelectedCert({
                    certificate: edu.certificate,
                    degree: edu.degree,
                    institution: edu.institution,
                    skills: edu.skills
                  })}
                  className={`edu-card-item glow-card p-5 sm:p-6 rounded-2xl bg-white/90 dark:bg-[#0E121B]/90 border border-slate-200/80 dark:border-slate-800/80 shadow-lg hover:shadow-xl transition-all duration-300 group ${
                    edu.certificate
                      ? 'cursor-pointer hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:-translate-y-0.5'
                      : 'hover:border-indigo-500/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      {edu.certificate && (
                        <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-500 shrink-0">
                          <Award size={16} />
                        </span>
                      )}
                      <h4 className="text-base font-bold font-heading text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {edu.degree}
                      </h4>
                    </div>
                    <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                      {edu.year}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-3">
                    {edu.institution} {edu.badge && <span className="text-indigo-600 dark:text-indigo-400 font-semibold font-mono">· {edu.badge}</span>}
                  </div>

                  {edu.skills && (
                    <div className="flex flex-wrap gap-1.5">
                      {edu.skills.map((skillItem, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400"
                        >
                          {skillItem}
                        </span>
                      ))}
                    </div>
                  )}

                  {edu.certificate && (
                    <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <span className="flex items-center gap-1.5">
                        <FileBadge size={14} />
                        {t.experience.viewCert || 'Ver Certificado Oficial'}
                      </span>
                      <span className="text-[11px] font-mono group-hover:translate-x-1 transition-transform">Ver preview ›</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Tarjeta de Competencias Lingüísticas (Idiomas del CV) */}
            {t.experience.languages && (
              <div
                onMouseMove={handleMouseMove}
                className="languages-card glow-card mt-5 p-5 rounded-2xl bg-white/90 dark:bg-[#0E121B]/90 border border-slate-200/80 dark:border-slate-800/80 shadow-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                      <Sparkles size={16} />
                    </div>
                    <h4 className="text-sm font-bold font-heading text-slate-900 dark:text-white">
                      {t.experience.languagesTitle || 'Competencias Lingüísticas'}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">CV Oficial</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {t.experience.languages.map((lang, lIdx) => (
                    <div
                      key={lIdx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between"
                    >
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{lang.name}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold ${
                        lang.native
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                          : 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30'
                      }`}>
                        {lang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bento de Filosofía y Enfoque Personal */}
            <div
              onMouseMove={handleMouseMove}
              className="philosophy-bento glow-card mt-6 p-6 rounded-2xl bg-gradient-to-br from-white/90 via-slate-50/90 to-cyan-50/40 dark:from-[#0E121B] dark:via-[#0F1424] dark:to-[#0A1020] border border-slate-200/80 dark:border-slate-800/80 shadow-lg"
            >
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-cyan-500" />
                <h4 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                  {t.experience.softSkillsTitle}
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {t.experience.softSkillsDesc}
              </p>

              {t.experience.metrics && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-slate-200/60 dark:border-slate-800">
                  {t.experience.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="p-2 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 text-center">
                      <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200">{metric.label}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{metric.desc}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Modal de Certificados Responsivo montado directamente en document.body */}
        {typeof document !== 'undefined' && createPortal(
          <AnimatePresence>
            {selectedCert && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
                onClick={() => setSelectedCert(null)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 15 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="relative max-w-4xl w-full max-h-[90vh] bg-white dark:bg-[#0E121B] rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row overflow-hidden my-auto"
                  onClick={e => e.stopPropagation()}
                >
                  {/* Botón Cerrar Flotante */}
                  <button
                    className="absolute top-3 right-3 z-30 p-2.5 bg-slate-900/80 hover:bg-slate-950 text-white rounded-full transition-all border border-white/20 shadow-xl cursor-pointer backdrop-blur-md"
                    onClick={() => setSelectedCert(null)}
                    aria-label="Cerrar modal"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Imagen del Certificado */}
                  <div className="w-full md:flex-1 bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6 relative min-h-[180px] sm:min-h-[260px] overflow-hidden">
                    <img
                      src={selectedCert.certificate}
                      alt={selectedCert.degree}
                      className="w-full h-auto max-h-[35vh] md:max-h-[60vh] object-contain rounded-lg sm:rounded-xl shadow-md"
                    />
                  </div>

                  {/* Detalles y Acciones */}
                  <div className="w-full md:w-80 p-5 sm:p-6 md:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 overflow-y-auto max-h-[50vh] md:max-h-none">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 inline-block">
                        HubSpot Certified
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 dark:text-white mt-3 mb-1">
                        {selectedCert.degree}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-4">
                        {selectedCert.institution}
                      </p>

                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        {t.experience.validatedSkills || 'Habilidades Validadas'}
                      </h4>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {['Technical SEO', 'Performance Web', 'Keyword Research', 'Auditoría SEO'].map((item, i) => (
                          <span key={i} className="px-2 py-0.5 text-[10px] sm:text-[11px] font-mono rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-2 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                      <a
                        href={selectedCert.certificate}
                        download
                        className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs shadow-md cursor-pointer hover:opacity-90 transition-opacity"
                      >
                        <Download size={14} />
                        {t.experience.downloadCert || 'Descargar Certificado'}
                      </a>
                      <a
                        href={selectedCert.certificate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      >
                        <ExternalLink size={14} />
                        {t.experience.openOriginal || 'Ver en Nueva Pestaña'}
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      </div>
    </section>
  );
};

export default Experience;