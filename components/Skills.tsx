import React, { useRef } from 'react';
import { SKILLS_DATA } from '../constants';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

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

    // Animación de las tarjetas con stagger
    gsap.from(".skill-card", {
      scrollTrigger: {
        trigger: ".skills-grid",
        start: "top 85%",
      },
      y: 50,
      opacity: 0,
      scale: 0.9,
      stagger: 0.05,
      duration: 0.6,
      ease: "back.out(1.2)",
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

  return (
    <section id="skills" ref={containerRef} className="py-32 bg-white dark:bg-[#0B1120] relative overflow-hidden">
      {/* Gradiente de fondo decorativo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-100/30 dark:bg-primary-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="skills-title text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            {t.skills.title}
          </h2>
          <p className="skills-subtitle text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t.skills.subtitle}
          </p>
        </div>

        <div className="skills-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {SKILLS_DATA.map((skill, index) => (
            <div
              key={index}
              className="skill-card group relative p-8 rounded-3xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 hover:border-primary-500/50 dark:hover:border-primary-500/50 transition-all duration-500 backdrop-blur-sm flex flex-col items-center justify-center hover:-translate-y-2 hover:shadow-xl hover:shadow-primary-500/10"
            >
              <div className="flex flex-col items-center justify-center text-center z-10 relative w-full">
                <div className="mb-6 p-5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700 group-hover:scale-110 transition-transform duration-500 ease-out">
                  <div className="skill-icon">
                    {skill.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{skill.name}</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900/50 px-3 py-1 rounded-full border border-slate-100 dark:border-slate-700/50">{skill.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;