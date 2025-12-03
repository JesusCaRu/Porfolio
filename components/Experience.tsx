import React from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

const Experience: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-32 bg-slate-50 dark:bg-slate-950/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">{t.experience.title}</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{t.experience.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Work Experience */}
          <div>
            <div className="flex items-center gap-4 mb-12">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600 shadow-inner">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{t.experience.workTitle}</h3>
            </div>

            <div className="relative pl-8 md:pl-10 space-y-12">
              {/* Animated vertical line */}
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute left-[30px] md:left-[6.5px] top-2 w-[2px] bg-gradient-to-b from-blue-500 to-slate-200 dark:to-slate-800"
              ></motion.div>

              {t.experience.list.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + (index * 0.2), type: "spring" }}
                    className="absolute -left-[41px] md:-left-[42px] top-2 w-5 h-5 rounded-full border-4 border-white dark:border-slate-900 bg-blue-500 z-10 shadow-md"
                  ></motion.span>

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
                </motion.div>
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
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all group hover:-translate-x-1"
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
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-12 p-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 relative z-10">{t.experience.softSkillsTitle}</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed relative z-10">
                {t.experience.softSkillsDesc}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;