import React, { useRef, useState, useEffect } from 'react';
import { Briefcase, GraduationCap, X, FileBadge, Download, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const Experience: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const [selectedCert, setSelectedCert] = useState<{ certificate: string, degree: string, institution: string } | null>(null);

  // Mouse move effect for glow cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
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
    // Cabecera
    gsap.from(".experience-header", {
      scrollTrigger: {
        trigger: ".experience-header",
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      clearProps: "all"
    });

    // Línea de tiempo vertical con progreso de scroll (scrub)
    gsap.fromTo(".exp-line", 
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: {
          trigger: ".exp-list",
          start: "top 60%",
          end: "bottom 85%",
          scrub: true
        }
      }
    );

    // Items de experiencia
    gsap.utils.toArray(".exp-item").forEach((item: HTMLElement, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
        },
        x: -50,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: i * 0.1,
        clearProps: "all"
      });

      // Animación del punto de la línea de tiempo
      gsap.from(item.querySelector(".timeline-dot"), {
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
        },
        scale: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
        delay: 0.5 + (i * 0.1),
        clearProps: "all"
      });
    });

    // Items de educación
    gsap.utils.toArray(".edu-item").forEach((item: HTMLElement, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
        },
        x: 50,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: i * 0.1,
        clearProps: "all"
      });
    });

    // Card de habilidades
    gsap.from(".soft-skills-card", {
      scrollTrigger: {
        trigger: ".soft-skills-card",
        start: "top 85%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.5)",
      clearProps: "all"
    });

  }, { scope: containerRef });

  return (
    <section id="experience" ref={containerRef} className="py-32 bg-slate-50 dark:bg-slate-950/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="experience-header text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">{t.experience.title}</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{t.experience.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Experiencia laboral */}
          <div className="exp-list">
            <div className="flex items-center gap-4 mb-12">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600 shadow-inner">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{t.experience.workTitle}</h3>
            </div>

            <div className="relative pl-8 md:pl-10 space-y-12">
              {/* Línea de tiempo vertical */}
              <div className="exp-line absolute left-[0px] md:left-[6.5px] top-2 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 to-slate-200 dark:to-slate-800 origin-top"></div>

              {t.experience.list.map((job, index) => (
                <div key={job.id} className="exp-item relative">
                  {/* Punto de la línea de tiempo */}
                  <span className="timeline-dot absolute -left-[41px] md:-left-[42px] top-2 w-5 h-5 rounded-full border-4 border-white dark:border-slate-900 bg-blue-500 z-10 shadow-md"></span>

                  <div 
                    onMouseMove={handleMouseMove}
                    className="group glow-card bg-slate-50/50 dark:bg-[#0f172a]/30 border border-slate-200/50 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:shadow-primary-500/5 p-8 rounded-3xl transition-all duration-500 hover:-translate-y-1 overflow-hidden relative"
                  >
                    {/* Glow decorativo de fondo */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl group-hover:bg-primary-500/10 group-hover:scale-150 transition-all duration-700 pointer-events-none -z-10" />

                    <div className="flex flex-wrap justify-between items-start mb-4 gap-2 relative z-10">
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{job.title}</h4>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                        {job.period}
                      </span>
                    </div>

                    <div className="text-blue-600 dark:text-blue-400 font-semibold mb-4 text-lg relative z-10">{job.company}</div>
                    <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6 relative z-10">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-2 relative z-10">
                      {job.tags.map((tag, idx) => (
                        <span key={idx} className="px-2.5 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider bg-white dark:bg-[#0c101b] text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800/80 group-hover:border-primary-500/30 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Educación */}
          <div>
            <div className="flex items-center gap-4 mb-12">
              <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-2xl text-green-600 shadow-inner">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{t.experience.eduTitle}</h3>
            </div>

            <div className="space-y-8">
              {t.experience.education.map((edu, index) => (
                <div
                  key={index}
                  onMouseMove={handleMouseMove}
                  className={`edu-item glow-card relative p-8 rounded-3xl bg-slate-50/50 dark:bg-[#0f172a]/30 border border-slate-200/50 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:shadow-green-500/5 transition-all duration-500 group overflow-hidden ${edu.certificate ? 'cursor-pointer hover:-translate-y-1' : 'hover:-translate-x-1'}`}
                  onClick={() => edu.certificate && setSelectedCert({ certificate: edu.certificate, degree: edu.degree, institution: edu.institution })}
                >
                  {/* Glow decorativo de fondo */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 group-hover:scale-150 transition-all duration-700 pointer-events-none -z-10" />

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2 relative z-10">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors leading-tight">{edu.degree}</h4>
                    <span className="shrink-0 px-3 py-1 rounded-full text-xs font-bold bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-100 dark:border-green-800">
                      {edu.year}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 font-medium relative z-10">
                    <div className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 mr-3"></span>
                      {edu.institution}
                    </div>
                    {edu.certificate && (
                      <span className="text-sm text-green-600 dark:text-green-400 font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <FileBadge className="w-4 h-4" />
                        {t.experience.workTitle === 'Experiencia Profesional' ? 'Ver Certificado' : 'View Certificate'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div 
              onMouseMove={handleMouseMove}
              className="soft-skills-card glow-card mt-12 p-8 bg-slate-50/50 dark:bg-[#0f172a]/30 border border-slate-200/50 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:shadow-primary-500/5 rounded-3xl relative overflow-hidden transition-all duration-500 group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl group-hover:bg-primary-500/10 group-hover:scale-150 transition-all duration-700 pointer-events-none -z-10" />
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 relative z-10">{t.experience.softSkillsTitle}</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed relative z-10">
                {t.experience.softSkillsDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Modal para certificados */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
              onClick={() => setSelectedCert(null)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="relative max-w-4xl w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden flex flex-col md:flex-row"
                onClick={e => e.stopPropagation()}
              >
                {/* Visualizador del certificado (Izquierda) */}
                <div className="flex-1 bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-6 relative min-h-[300px]">
                  {/* Botón X integrado elegantemente */}
                  <button 
                    className="absolute top-4 right-4 z-10 p-2 bg-slate-950/40 hover:bg-slate-950/80 backdrop-blur-md text-white hover:text-green-400 rounded-full transition-all duration-200 border border-white/10 shadow-lg hover:scale-110 active:scale-95 cursor-pointer"
                    onClick={() => setSelectedCert(null)}
                    aria-label="Close modal"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <img 
                    src={selectedCert.certificate} 
                    alt={selectedCert.degree} 
                    className="w-full h-auto max-h-[65vh] object-contain rounded-xl shadow-md"
                  />
                </div>
                
                {/* Detalles y Habilidades (Derecha) */}
                <div className="w-full md:w-80 bg-white dark:bg-slate-900 p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full border border-green-100 dark:border-green-800/40">
                      HubSpot Certified
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-4 mb-2 leading-snug">
                      {selectedCert.degree}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-6">
                      {selectedCert.institution}
                    </p>

                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                      {t.experience.workTitle === 'Experiencia Profesional' ? 'Habilidades Validadas' : 'Acquired Skills'}
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {['SEO', 'Web Optimization', 'Keywords Research', 'Digital Strategy'].map((skillName, idx) => (
                        <span key={idx} className="px-2.5 py-1 text-xs rounded-lg font-medium bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700/60">
                          {skillName}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <a 
                      href={selectedCert.certificate} 
                      download 
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:opacity-90 transition-opacity cursor-pointer text-sm shadow-md"
                    >
                      <Download className="w-4 h-4" />
                      {t.experience.workTitle === 'Experiencia Profesional' ? 'Descargar' : 'Download'}
                    </a>
                    <a 
                      href={selectedCert.certificate} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-white font-semibold hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t.experience.workTitle === 'Experiencia Profesional' ? 'Ver Original' : 'View Original'}
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Experience;