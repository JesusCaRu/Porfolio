import React, { useRef } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Animación de la cabecera
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      },
      defaults: { clearProps: "all" }
    });

    tl.from(".projects-badge", {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.7)"
    })
      .from(".projects-title", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.3")
      .from(".projects-subtitle", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4");

    // Animación de las tarjetas
    gsap.from(".project-card", {
      scrollTrigger: {
        trigger: ".projects-grid",
        start: "top 80%",
      },
      y: 100,
      opacity: 0,
      rotationX: -15,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
      clearProps: "all"
    });

  }, { scope: containerRef });

  // Logica de la tarjeta 3D
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    requestAnimationFrame(() => {
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  return (
    <section id="projects" ref={containerRef} className="py-32 bg-white dark:bg-[#0B1120] overflow-hidden">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="projects-badge inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-primary-600 uppercase bg-primary-50 dark:bg-primary-900/20 rounded-full border border-primary-100 dark:border-primary-900/50">
            {t.projects.badge}
          </div>
          <h2 className="projects-title text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            {t.projects.title}
          </h2>
          <p className="projects-subtitle text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t.projects.subtitle}
          </p>
        </div>

        <div className="projects-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 justify-center perspective-1000">
          {t.projects.list.map((project, i) => (
            <div
              key={i}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="project-card h-full will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="glow-card bg-slate-50/60 dark:bg-[#0f172a]/40 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary-500/10 border border-slate-200/60 dark:border-slate-800/80 hover:border-primary-500/40 dark:hover:border-primary-500/40 transition-all duration-500 group flex flex-col h-full relative">
                {/* Glow decorativo de fondo */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-primary-500/5 rounded-full blur-3xl group-hover:bg-primary-500/15 group-hover:scale-150 transition-all duration-700 pointer-events-none -z-10" />

                {/* Imagen del proyecto con badge numérico */}
                <div className="p-3.5 pb-0 z-10 shrink-0">
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200/60 dark:border-slate-800/80 h-48 sm:h-44 md:h-48">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Badge con número de proyecto */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/60 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-white shadow-sm">
                      0{i + 1}
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow relative z-10">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 mb-6 text-xs leading-relaxed flex-grow line-clamp-4">
                    {project.description}
                  </p>

                  <div className="space-y-5 mt-auto">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((techItem, idx) => (
                        <span key={idx} className="px-2 py-1 text-[9px] uppercase font-bold tracking-wider rounded-md bg-white dark:bg-[#0c101b] text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800/80 group-hover:border-primary-500/30 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-300">
                          {techItem}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800 flex justify-between items-center gap-2">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all group/link"
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
                          className="inline-flex items-center gap-1 text-xs font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-all group/link"
                        >
                          <ExternalLink size={15} />
                          {t.projects.viewDemo}
                          <ArrowRight size={13} className="transform group-hover/link:translate-x-0.5 transition-transform" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;