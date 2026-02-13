import React, { useRef } from 'react';
import { Download, Github, Linkedin, Code, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../context/LanguageContext';
import { PORTFOLIO_OWNER } from '../constants';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animaciones de entrada con clearProps para mantener visibilidad
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".hero-badge", { y: -20, opacity: 0, duration: 0.8, clearProps: "all" })
      .from(".hero-greeting", { x: -20, opacity: 0, duration: 0.5, clearProps: "all" }, "-=0.4")
      .from(".hero-char", {
        y: 50,
        opacity: 0,
        rotate: 10,
        stagger: 0.05,
        duration: 0.8,
        ease: "back.out(1.7)",
        clearProps: "all"
      }, "-=0.2")
      .from(".hero-role", { y: 20, opacity: 0, duration: 0.8, clearProps: "all" }, "-=0.5")
      .from(".hero-desc", { y: 20, opacity: 0, duration: 0.8, clearProps: "all" }, "-=0.6")
      .from(".hero-btn", { y: 20, opacity: 0, stagger: 0.1, duration: 0.6, clearProps: "all" }, "-=0.4")
      .from(".hero-social", { scale: 0, opacity: 0, stagger: 0.1, duration: 0.6, ease: "back.out(1.7)", clearProps: "all" }, "-=0.2");

    // Entrada de la tarjeta 3D
    gsap.from(cardRef.current, {
      x: 100,
      opacity: 0,
      rotateY: -30,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.5,
      clearProps: "all"
    });

    // Cursor parpadeante
    gsap.to(".cursor-blink", {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: "steps(1)"
    });

    // Animaciones flotantes continuas para los blobs
    gsap.to(blob1Ref.current, {
      x: "random(-20, 20)",
      y: "random(-20, 20)",
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(blob2Ref.current, {
      x: "random(-30, 30)",
      y: "random(-30, 30)",
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1
    });

    gsap.to(blob3Ref.current, {
      scale: 1.1,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Tarjetas flotantes
    gsap.to(".float-card-1", {
      y: -15,
      rotate: 5,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".float-card-2", {
      y: 15,
      rotate: -5,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1
    });

    // Indicador de scroll
    gsap.to(".scroll-indicator", {
      y: 10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Parallax con el mouse
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPos = (clientX / innerWidth - 0.5);
      const yPos = (clientY / innerHeight - 0.5);

      gsap.to(blob1Ref.current, {
        x: xPos * 50,
        y: yPos * 50,
        duration: 2,
        ease: "power2.out"
      });

      gsap.to(blob2Ref.current, {
        x: xPos * -70,
        y: yPos * -70,
        duration: 2,
        ease: "power2.out"
      });

      if (cardRef.current) {
        gsap.to(cardRef.current, {
          rotateY: xPos * 15,
          rotateX: -yPos * 15,
          duration: 1,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, { scope: containerRef });

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-slate-50 dark:bg-[#0B1120]"
    >
      {/* Elementos de fondo con parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          ref={blob1Ref}
          className="absolute -top-20 -left-20 w-96 h-96 bg-primary-400/30 rounded-full blur-[100px] dark:bg-primary-600/20 mix-blend-multiply dark:mix-blend-screen"
        ></div>
        <div
          ref={blob2Ref}
          className="absolute top-1/2 -right-20 w-80 h-80 bg-purple-400/30 rounded-full blur-[100px] dark:bg-purple-600/20 mix-blend-multiply dark:mix-blend-screen"
        ></div>
        <div
          ref={blob3Ref}
          className="absolute -bottom-20 left-1/3 w-80 h-80 bg-cyan-400/30 rounded-full blur-[100px] dark:bg-cyan-600/20 mix-blend-multiply dark:mix-blend-screen"
        ></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenido de texto */}
          <div className="text-center lg:text-left">
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-primary-600 dark:text-primary-400 text-sm font-medium mb-8 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              {t.hero.badge}
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
              <span className="hero-greeting block text-2xl lg:text-3xl font-medium text-slate-500 dark:text-slate-400 mb-2">{t.hero.greeting}</span>
              <div className="flex flex-wrap justify-center lg:justify-start gap-1">
                {PORTFOLIO_OWNER.split("").map((char, index) => (
                  <span
                    key={index}
                    className="hero-char inline-block text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 cursor-default"
                  >
                    {char}
                  </span>
                ))}
              </div>
            </h1>

            <h2 className="hero-role text-2xl lg:text-3xl font-semibold text-slate-700 dark:text-slate-200 mb-6 flex flex-col sm:flex-row gap-2 justify-center lg:justify-start">
              {t.hero.role} <span className="text-primary-500">{t.hero.roleSuffix}</span>
            </h2>

            <p className="hero-desc text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-10">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#projects"
                className="hero-btn group w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <Code size={20} />
                {t.hero.btnProjects}
              </a>
              <a
                href="/Jesús Canicio Ruiz CV.pdf"
                download="Jesús Canicio Ruiz CV.pdf"
                className="hero-btn group w-full sm:w-auto px-8 py-4 rounded-xl bg-white dark:bg-slate-800/50 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-700 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-3 backdrop-blur-sm"
              >
                <Download size={20} className="group-hover:animate-bounce" />
                {t.hero.btnCv}
              </a>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 mt-12 mb-20 text-slate-500 dark:text-slate-400">
              <a href="https://github.com/JesusCaRu" target="_blank" className="hero-social hover:text-primary-600 dark:hover:text-primary-400 transition-all hover:scale-110 transform duration-200 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                <Github size={28} />
              </a>
              <a href="https://www.linkedin.com/in/jesús-canicio-ruiz-184374262" target="_blank" className="hero-social hover:text-primary-600 dark:hover:text-primary-400 transition-all hover:scale-110 transform duration-200 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                <Linkedin size={28} />
              </a>
            </div>
          </div>

          {/* Visual 3D Interactiva */}
          <div className="hidden lg:block relative perspective-1000">
            <div
              ref={cardRef}
              className="relative w-full aspect-square max-w-md mx-auto preserve-3d"
            >
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

                <div className="cursor-blink absolute bottom-12 left-32 w-2 h-5 bg-primary-500" />
              </div>

              {/* Tarjetas flotantes */}
              <div className="float-card-1 absolute -bottom-10 -left-10 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-4 z-20">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-blue-500">
                  <img src="./images/react.svg" alt="React" className="w-8 h-8" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-lg">React</div>
                  <div className="text-xs text-slate-500 font-medium">Frontend</div>
                </div>
              </div>

              <div className="float-card-2 absolute -top-10 -right-10 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-4 z-20">
                <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-xl text-red-500">
                  <img src="./images/laravel.svg" alt="Laravel" className="w-8 h-8" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-lg">Laravel</div>
                  <div className="text-xs text-slate-500 font-medium">Backend</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-400 dark:text-slate-600 cursor-pointer hover:text-primary-500 transition-colors"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default Hero;