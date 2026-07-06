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
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <section id="projects" ref={containerRef} className="py-32 bg-white dark:bg-[#0B1120] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center perspective-1000">
          {t.projects.list.map((project, i) => (
            <div
              key={i}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="project-card h-full will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="glow-card bg-slate-50/50 dark:bg-[#0f172a]/30 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-primary-500/5 border border-slate-200/50 dark:border-slate-800 transition-all duration-500 group flex flex-col h-full relative">
                {/* Glow decorativo de fondo */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl group-hover:bg-primary-500/10 group-hover:scale-150 transition-all duration-700 pointer-events-none -z-10" />

                <div className="p-4 pb-0 z-10 shrink-0">
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200/60 dark:border-slate-800/80 h-52">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow relative z-10">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  <div className="space-y-6 mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((techItem, idx) => (
                        <span key={idx} className="px-2.5 py-1.5 text-[10px] uppercase font-bold tracking-wider rounded-lg bg-white dark:bg-[#0c101b] text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800/80 group-hover:border-primary-500/30 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-300">
                          {techItem}
                        </span>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all group/link"
                        >
                          <Github size={16} />
                          {t.projects.viewCode}
                        </a>
                      )}

                      {project.demoLink && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 dark:text-primary-400 hover:text-primary-750 dark:hover:text-primary-300 transition-all group/link"
                        >
                          <ExternalLink size={16} />
                          {t.projects.viewDemo}
                          <ArrowRight size={14} className="transform group-hover/link:translate-x-0.5 transition-transform" />
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