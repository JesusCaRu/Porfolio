import React from 'react';
import { SKILLS_DATA } from '../constants';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

const Skills: React.FC = () => {
  const { t } = useLanguage();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 50, damping: 10 }
    }
  };

  return (
    <section id="skills" className="py-32 bg-white dark:bg-[#0B1120] relative overflow-hidden">
      {/* Decorative Background Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-100/30 dark:bg-primary-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight"
          >
            {t.skills.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            {t.skills.subtitle}
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {SKILLS_DATA.map((skill, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative p-8 rounded-3xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 hover:border-primary-500/50 dark:hover:border-primary-500/50 transition-all duration-500 backdrop-blur-sm flex flex-col items-center justify-center hover:-translate-y-2 hover:shadow-xl hover:shadow-primary-500/10"
            >
              <div className="flex flex-col items-center justify-center text-center z-10 relative w-full">
                <div className="mb-6 p-5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700 group-hover:scale-110 transition-transform duration-500 ease-out">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                  >
                    {skill.icon}
                  </motion.div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{skill.name}</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900/50 px-3 py-1 rounded-full border border-slate-100 dark:border-slate-700/50">{skill.category}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;