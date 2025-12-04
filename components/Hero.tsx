import React, { useState, useEffect, useRef } from 'react';
import { Download, Github, Linkedin, Code, ChevronDown, MousePointer2 } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { PORTFOLIO_OWNER } from '../constants';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  const blob1X = useTransform(mouseX, [-0.5, 0.5], [20, -20]);
  const blob1Y = useTransform(mouseY, [-0.5, 0.5], [20, -20]);
  const blob2X = useTransform(mouseX, [-0.5, 0.5], [-30, 30]);
  const blob2Y = useTransform(mouseY, [-0.5, 0.5], [-30, 30]);

  // Text Reveal Animation
  const letterContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.5 }
    }
  };

  const letterAnimation = {
    hidden: { opacity: 0, y: 50, rotate: 10 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 }
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-slate-50 dark:bg-[#0B1120]"
    >
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ x: blob1X, y: blob1Y }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-primary-400/30 rounded-full blur-[100px] dark:bg-primary-600/20 mix-blend-multiply dark:mix-blend-screen"
        ></motion.div>
        <motion.div
          style={{ x: blob2X, y: blob2Y }}
          className="absolute top-1/2 -right-20 w-80 h-80 bg-purple-400/30 rounded-full blur-[100px] dark:bg-purple-600/20 mix-blend-multiply dark:mix-blend-screen"
        ></motion.div>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-20 left-1/3 w-80 h-80 bg-cyan-400/30 rounded-full blur-[100px] dark:bg-cyan-600/20 mix-blend-multiply dark:mix-blend-screen"
        ></motion.div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Text Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-primary-600 dark:text-primary-400 text-sm font-medium mb-8 backdrop-blur-md shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              {t.hero.badge}
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
              <span className="block text-2xl lg:text-3xl font-medium text-slate-500 dark:text-slate-400 mb-2">{t.hero.greeting}</span>
              <motion.div
                variants={letterContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap justify-center lg:justify-start gap-1"
              >
                {PORTFOLIO_OWNER.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={letterAnimation}
                    className="inline-block text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 cursor-default"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </h1>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="text-2xl lg:text-3xl font-semibold text-slate-700 dark:text-slate-200 mb-6 flex flex-col sm:flex-row gap-2 justify-center lg:justify-start"
            >
              {t.hero.role} <span className="text-primary-500">{t.hero.roleSuffix}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-10"
            >
              {t.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="#projects"
                className="group w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <Code size={20} />
                {t.hero.btnProjects}
              </a>
              <a
                href="/cv.pdf"
                download="CV_Jesus_FullStack.pdf"
                className="group w-full sm:w-auto px-8 py-4 rounded-xl bg-white dark:bg-slate-800/50 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-700 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-3 backdrop-blur-sm"
              >
                <Download size={20} className="group-hover:animate-bounce" />
                {t.hero.btnCv}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="flex items-center justify-center lg:justify-start gap-6 mt-12 mb-20 text-slate-500 dark:text-slate-400"
            >
              <a href="https://github.com/JesusCaRu" target="_blank" className="hover:text-primary-600 dark:hover:text-primary-400 transition-all hover:scale-110 transform duration-200 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                <Github size={28} />
              </a>
              <a href="https://www.linkedin.com/in/jesús-canicio-ruiz-184374262" target="_blank" className="hover:text-primary-600 dark:hover:text-primary-400 transition-all hover:scale-110 transform duration-200 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                <Linkedin size={28} />
              </a>
            </motion.div>
          </div>

          {/* Interactive 3D Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
            className="hidden lg:block relative perspective-1000"
          >
            <motion.div
              style={{ rotateX: useTransform(mouseY, [-0.5, 0.5], [5, -5]), rotateY: useTransform(mouseX, [-0.5, 0.5], [-5, 5]) }}
              className="relative w-full aspect-square max-w-md mx-auto preserve-3d"
            >
              {/* Decorative Code Window */}
              <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl p-6 transform transition-all duration-500 hover:shadow-primary-500/20">
                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="ml-4 text-xs text-slate-400 font-mono">portfolio.tsx</div>
                </div>

                <div className="space-y-3 font-mono text-sm leading-relaxed">
                  <div className="flex gap-4">
                    <span className="text-slate-400 select-none">1</span>
                    <span className="text-purple-500 dark:text-purple-400">class</span> <span className="text-yellow-600 dark:text-yellow-300">{t.hero.codeWindow.devClass}</span> <span className="text-slate-900 dark:text-white">{'{'}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-400 select-none">2</span>
                    <div className="pl-4">
                      <span className="text-blue-500 dark:text-blue-300">constructor</span>() {'{'}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-400 select-none">3</span>
                    <div className="pl-8">
                      <span className="text-red-500 dark:text-red-400">this</span>.name = <span className="text-green-600 dark:text-green-400">'{PORTFOLIO_OWNER}'</span>;
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-400 select-none">4</span>
                    <div className="pl-8">
                      <span className="text-red-500 dark:text-red-400">this</span>.stack = [<span className="text-green-600 dark:text-green-400">'React'</span>, <span className="text-green-600 dark:text-green-400">'Laravel'</span>];
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-400 select-none">5</span>
                    <div className="pl-4 text-slate-900 dark:text-white">{'}'}</div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-400 select-none">6</span>
                    <div className="pl-4">
                      <span className="text-blue-500 dark:text-blue-300">{t.hero.codeWindow.method}</span>() {'{'}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-400 select-none">7</span>
                    <div className="pl-8 text-slate-400 italic">{t.hero.codeWindow.comment}</div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-400 select-none">8</span>
                    <div className="pl-8">
                      <span className="text-purple-500 dark:text-purple-400">return</span> <span className="text-green-600 dark:text-green-400">'{t.hero.codeWindow.return}'</span>;
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-400 select-none">9</span>
                    <div className="pl-4 text-slate-900 dark:text-white">{'}'}</div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-400 select-none">10</span>
                    <span className="text-slate-900 dark:text-white">{'}'}</span>
                  </div>
                </div>

                {/* Cursor Decoration */}
                <motion.div
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute bottom-12 left-32 w-2 h-5 bg-primary-500"
                />
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-4 z-20"
              >
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-blue-500">
                  <img src="./images/react.svg" alt="React" className="w-8 h-8" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-lg">React</div>
                  <div className="text-xs text-slate-500 font-medium">Frontend</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-10 -right-10 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-4 z-20"
              >
                <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-xl text-red-500">
                  <img src="./images/laravel.svg" alt="Laravel" className="w-8 h-8" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-lg">Laravel</div>
                  <div className="text-xs text-slate-500 font-medium">Backend</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 3 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-400 dark:text-slate-600 cursor-pointer hover:text-primary-500 transition-colors"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;