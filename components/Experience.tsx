import React, { useRef } from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const Experience: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Header
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

    // Línea de tiempo vertical
    gsap.from(".exp-line", {
      scrollTrigger: {
        trigger: ".exp-list",
        start: "top 70%",
      },
      scaleY: 0,
      transformOrigin: "top",
      duration: 1.5,
      ease: "power3.inOut",
      clearProps: "all"
    });

    // Items de experiencia
    gsap.utils.toArray(".exp-item").forEach((item: any, i) => {
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
    gsap.utils.toArray(".edu-item").forEach((item: any, i) => {
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

    // Soft Skills card
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
          {/* Work Experience */}
          <div className="exp-list">
            <div className="flex items-center gap-4 mb-12">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600 shadow-inner">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{t.experience.workTitle}</h3>
            </div>

            <div className="relative pl-8 md:pl-10 space-y-12">
              {/* Animated vertical line */}
              <div className="exp-line absolute left-[0px] md:left-[6.5px] top-2 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 to-slate-200 dark:to-slate-800 origin-top"></div>

              {t.experience.list.map((job, index) => (
                <div key={job.id} className="exp-item relative">
                  {/* Timeline Dot */}
                  <span className="timeline-dot absolute -left-[41px] md:-left-[42px] top-2 w-5 h-5 rounded-full border-4 border-white dark:border-slate-900 bg-blue-500 z-10 shadow-md"></span>

                  <div className="group bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex flex-wrap justify-between items-start mb-4 gap-2">
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{job.title}</h4>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                        {job.period}
                      </span>
                    </div>

                    <div className="text-blue-600 dark:text-blue-400 font-semibold mb-4 text-lg">{job.company}</div>
                    <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
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
                  className="edu-item bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all group hover:-translate-x-1"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors leading-tight">{edu.degree}</h4>
                    <span className="shrink-0 px-3 py-1 rounded-full text-xs font-bold bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-100 dark:border-green-800">
                      {edu.year}
                    </span>
                  </div>
                  <div className="flex items-center text-slate-500 dark:text-slate-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 mr-3"></span>
                    {edu.institution}
                  </div>
                </div>
              ))}
            </div>

            <div className="soft-skills-card mt-12 p-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 relative z-10">{t.experience.softSkillsTitle}</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed relative z-10">
                {t.experience.softSkillsDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;