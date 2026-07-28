import React, { useRef, useState, useEffect } from 'react';
import { Download, Github, Linkedin, Code, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../context/LanguageContext';
import { PORTFOLIO_OWNER } from '../constants';

const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Terminal Simulator States
  const [activeTab, setActiveTab] = useState<'about' | 'skills' | 'projects' | 'bash'>('about');
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<Array<{ text: string, type: 'input' | 'output' | 'system' }>>([
    { text: 'system_initialize --status=success', type: 'system' },
    { text: 'welcome to jesuscanicio@portfolio:~$ help', type: 'output' }
  ]);
  const [commandInput, setCommandInput] = useState("");
  const terminalContentRef = useRef<HTMLDivElement>(null);

  const files = {
    about: {
      name: 'about.json',
      lang: 'json',
      content: language === 'es' ? `{
  "nombre": "Jesús Canicio Ruiz",
  "puesto": "Desarrollador Full Stack",
  "ubicacion": "Pinoso, Alicante, España",
  "intereses": ["Apps Web", "Inteligencia Artificial", "Robótica"],
  "enfoque": "Código limpio y mantenible"
}` : `{
  "name": "Jesús Canicio Ruiz",
  "role": "Full Stack Developer",
  "location": "Pinoso, Alicante, Spain",
  "interests": ["Web Apps", "AI", "Robotics"],
  "focus": "Clean and maintainable code"
}`
    },
    skills: {
      name: 'skills.sh',
      lang: 'bash',
      content: language === 'es' ? `#!/bin/bash
echo "Cargando tecnologías principales..."
# ----------
# Frontend:   React, TypeScript, HTML, CSS
# Backend:    Laravel, PHP, Python, Java
# Herramientas: Docker, Git, SQL, MongoDB
# ----------
echo "Listo para construir grandes proyectos!"` : `#!/bin/bash
echo "Loading core technologies..."
# ----------
# Frontend:   React, TypeScript, HTML, CSS
# Backend:    Laravel, PHP, Python, Java
# Tools:      Docker, Git, SQL, MongoDB
# ----------
echo "Ready to build amazing projects!"`
    },
    projects: {
      name: 'proyectos.md',
      lang: 'markdown',
      content: language === 'es' ? `# Proyectos Destacados

1. **StockFlow** - Gestión Robótica
   - Tech: React, Laravel, MySQL, REST API
2. **Building Energy Efficiency ML** - Predicción Energética IA
   - Tech: Python, LightGBM, XGBoost, CatBoost, AutoGluon` : `# Featured Projects

1. **StockFlow** - Robotic Management
   - Tech: React, Laravel, MySQL, REST API
2. **Building Energy Efficiency ML** - Energy Prediction AI
   - Tech: Python, LightGBM, XGBoost, CatBoost, AutoGluon`
    }
  };

  // Typing animation effect
  useEffect(() => {
    if (activeTab === 'bash') return;

    setIsTyping(true);
    setTypedText("");
    const content = files[activeTab].content;
    let index = 0;

    const timer = setInterval(() => {
      setTypedText((prev) => {
        const nextChars = content.substring(index, index + 3);
        index += 3;
        if (index >= content.length) {
          clearInterval(timer);
          setIsTyping(false);
          return content;
        }
        return prev + nextChars;
      });
    }, 15);

    return () => clearInterval(timer);
  }, [activeTab, language]);

  const handleSkipTyping = () => {
    if (isTyping && activeTab !== 'bash') {
      setIsTyping(false);
      setTypedText(files[activeTab].content);
    }
  };

  // Command submission parser
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    const cmd = commandInput.trim().toLowerCase();
    const newHistory = [...terminalHistory, { text: `visitor@jesus-dev:~$ ${commandInput}`, type: 'input' as const }];
    setCommandInput("");

    let response = "";
    if (cmd === 'help' || cmd === 'ayuda') {
      response = language === 'es'
        ? "Comandos disponibles:\n  about     - Muestra información personal (JSON)\n  skills    - Ejecuta script de habilidades (SH)\n  projects  - Muestra proyectos destacados (MD)\n  contact   - Desplazar hasta sección de contacto\n  theme     - Alternar modo claro/oscuro\n  clear     - Limpiar pantalla"
        : "Available commands:\n  about     - Display personal information (JSON)\n  skills    - Execute skills shell script (SH)\n  projects  - Show featured projects (MD)\n  contact   - Scroll to contact section\n  theme     - Toggle light/dark mode\n  clear     - Clear screen";
    } else if (cmd === 'about' || cmd === 'sobremi') {
      response = files.about.content;
    } else if (cmd === 'skills' || cmd === 'habilidades') {
      response = files.skills.content;
    } else if (cmd === 'projects' || cmd === 'proyectos') {
      response = files.projects.content;
    } else if (cmd === 'clear' || cmd === 'limpiar') {
      setTerminalHistory([]);
      return;
    } else if (cmd === 'contact' || cmd === 'contacto') {
      response = language === 'es' ? "Redirigiendo a contacto..." : "Scrolling to contact...";
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } else if (cmd === 'theme' || cmd === 'tema') {
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
      response = language === 'es' ? "Tema de color cambiado." : "Color theme updated.";
    } else {
      response = language === 'es'
        ? `Error: comando no encontrado: '${cmd}'. Escribe 'help' para ayuda.`
        : `Command not found: '${cmd}'. Type 'help' for support.`;
    }

    setTerminalHistory([...newHistory, { text: response, type: 'output' as const }]);
  };

  useEffect(() => {
    if (activeTab === 'bash' && terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [terminalHistory, activeTab]);

  // Syntax highlighting parser
  const highlightCode = (text: string, lang: string) => {
    if (lang === 'json') {
      return text.split('\n').map((line, idx) => {
        const highlighted = line
          .replace(/(".*?")(\s*:)/g, '<span class="text-blue-500 dark:text-blue-400">$1</span>$2')
          .replace(/(:\s*)(".*?")/g, '$1<span class="text-green-600 dark:text-green-400">$2</span>')
          .replace(/(:\s*)(\d+|true|false)/g, '$1<span class="text-amber-500 dark:text-amber-400">$2</span>');
        return (
          <div key={idx} className="flex gap-4">
            <span className="text-slate-400 dark:text-slate-600 select-none w-5 text-right font-mono text-xs">{idx + 1}</span>
            <span className="font-mono text-xs md:text-sm" dangerouslySetInnerHTML={{ __html: highlighted || '&nbsp;' }} />
          </div>
        );
      });
    } else if (lang === 'bash') {
      return text.split('\n').map((line, idx) => {
        let highlighted = line;
        if (line.startsWith('#')) {
          highlighted = `<span class="text-slate-400 dark:text-slate-500 italic">${line}</span>`;
        } else if (line.startsWith('echo')) {
          highlighted = `<span class="text-purple-600 dark:text-purple-400">echo</span> <span class="text-green-600 dark:text-green-400">${line.substring(5)}</span>`;
        }
        return (
          <div key={idx} className="flex gap-4">
            <span className="text-slate-400 dark:text-slate-600 select-none w-5 text-right font-mono text-xs">{idx + 1}</span>
            <span className="font-mono text-xs md:text-sm" dangerouslySetInnerHTML={{ __html: highlighted || '&nbsp;' }} />
          </div>
        );
      });
    } else if (lang === 'markdown') {
      return text.split('\n').map((line, idx) => {
        let highlighted = line;
        if (line.startsWith('#')) {
          highlighted = `<span class="text-primary-600 dark:text-primary-400 font-bold">${line}</span>`;
        } else if (line.trim().startsWith('-') || line.trim().match(/^\d+\./)) {
          highlighted = line
            .replace(/(\*\*.*?\*\*)/g, '<span class="text-slate-900 dark:text-white font-bold">$1</span>')
            .replace(/(`.*?`)/g, '<span class="text-red-500 dark:text-red-400 font-mono bg-slate-100 dark:bg-slate-800/80 px-1 rounded">$1</span>');
        }
        return (
          <div key={idx} className="flex gap-4">
            <span className="text-slate-400 dark:text-slate-600 select-none w-5 text-right font-mono text-xs">{idx + 1}</span>
            <span className="font-mono text-xs md:text-sm" dangerouslySetInnerHTML={{ __html: highlighted || '&nbsp;' }} />
          </div>
        );
      });
    }
    return text;
  };

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
      y: -8,
      rotate: 3,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".float-card-2", {
      y: 8,
      rotate: -3,
      duration: 4.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.5
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
      if (!window.matchMedia('(hover: hover)').matches) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPos = (clientX / innerWidth - 0.5);
      const yPos = (clientY / innerHeight - 0.5);

      gsap.to(blob1Ref.current, {
        x: xPos * 50,
        y: yPos * 50,
        duration: 2,
        ease: "power2.out",
        overwrite: "auto"
      });

      gsap.to(blob2Ref.current, {
        x: xPos * -70,
        y: yPos * -70,
        duration: 2,
        ease: "power2.out",
        overwrite: "auto"
      });

      if (cardRef.current) {
        gsap.to(cardRef.current, {
          rotateY: xPos * 15,
          rotateX: -yPos * 15,
          duration: 1,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
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
                href="/Jesus_Canicio_Ruiz_CV.pdf"
                download="Jesus_Canicio_Ruiz_CV.pdf"
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
              className="relative w-full aspect-square max-w-lg mx-auto preserve-3d"
            >
              <div
                className="absolute inset-0 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden select-none hover:shadow-primary-500/10 transition-shadow duration-300"
                onClick={handleSkipTyping}
              >
                {/* Cabecera de la terminal */}
                <div className="flex items-center justify-between px-6 py-4 bg-slate-50/80 dark:bg-slate-900/50 border-b border-slate-200/60 dark:border-slate-800/60 shrink-0">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-600 transition-colors cursor-pointer" onClick={() => setActiveTab('bash')} title="Terminal"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="text-xs text-slate-400 font-mono font-medium">
                    {activeTab === 'bash' ? 'bash' : files[activeTab].name}
                  </div>
                  <div className="w-12"></div>
                </div>

                {/* Barra de pestañas */}
                <div className="flex border-b border-slate-200/60 dark:border-slate-800/60 bg-slate-50/30 dark:bg-slate-900/10 text-xs font-mono shrink-0">
                  {(['about', 'skills', 'projects', 'bash'] as const).map((tab) => {
                    const isActive = activeTab === tab;
                    const labels = {
                      about: { label: 'about.json', icon: '{ }', color: 'text-blue-500' },
                      skills: { label: 'skills.sh', icon: '$_', color: 'text-green-500' },
                      projects: { label: 'proyectos.md', icon: '#', color: 'text-purple-500' },
                      bash: { label: 'terminal', icon: '>_', color: 'text-cyan-500' }
                    };
                    const item = labels[tab];
                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-3 border-r border-slate-200/60 dark:border-slate-800/60 transition-all flex items-center gap-1.5 cursor-pointer font-medium ${isActive
                          ? 'bg-white dark:bg-[#0f172a] text-slate-900 dark:text-white border-b border-b-white dark:border-b-[#0f172a]'
                          : 'text-slate-500 hover:bg-slate-100/50 dark:hover:bg-slate-800/20'
                          }`}
                      >
                        <span className={`${item.color} font-bold`}>{item.icon}</span>
                        {item.label}
                      </button>
                    );
                  })}
                </div>

                {/* Contenedor del contenido */}
                <div ref={terminalContentRef} className="p-6 flex-grow overflow-y-auto font-mono text-xs md:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {activeTab !== 'bash' ? (
                    <div className="space-y-1">
                      {highlightCode(typedText, files[activeTab].lang)}
                      {isTyping && (
                        <div className="flex gap-4">
                          <span className="text-slate-400 select-none w-5"></span>
                          <span className="w-1.5 h-4 bg-primary-500 animate-pulse inline-block align-middle" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {terminalHistory.map((line, idx) => (
                        <div key={idx} className="whitespace-pre-wrap">
                          {line.type === 'input' ? (
                            <span className="text-slate-800 dark:text-slate-200 font-bold">{line.text}</span>
                          ) : line.type === 'system' ? (
                            <span className="text-slate-400 dark:text-slate-500 italic">{line.text}</span>
                          ) : (
                            <span className="text-slate-600 dark:text-slate-400">{line.text}</span>
                          )}
                        </div>
                      ))}

                      <form onSubmit={handleCommandSubmit} className="flex items-center gap-2">
                        <span className="text-primary-500 dark:text-primary-400 font-bold shrink-0">visitor@jesus-dev:~$</span>
                        <input
                          type="text"
                          value={commandInput}
                          onChange={(e) => setCommandInput(e.target.value)}
                          className="bg-transparent text-slate-800 dark:text-slate-200 focus:outline-none flex-grow w-full font-mono text-xs md:text-sm"
                          autoFocus
                          placeholder="help..."
                        />
                      </form>
                    </div>
                  )}
                </div>
              </div>

              {/* Tarjetas flotantes */}
              <div className="float-card-1 absolute -bottom-5 -left-5 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-xl p-3.5 rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-3 z-20 pointer-events-none">
                <div className="p-2.5 bg-blue-500/10 dark:bg-blue-400/10 rounded-xl text-blue-500 shrink-0">
                  <img src="./images/react.svg" alt="React" className="w-7 h-7" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm leading-snug">React</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Frontend</div>
                </div>
              </div>

              <div className="float-card-2 absolute -top-5 -right-5 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-xl p-3.5 rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-3 z-20 pointer-events-none">
                <div className="p-2.5 bg-red-500/10 dark:bg-red-400/10 rounded-xl text-red-500 shrink-0">
                  <img src="./images/laravel.svg" alt="Laravel" className="w-8 h-8" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm leading-snug">Laravel</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Backend</div>
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