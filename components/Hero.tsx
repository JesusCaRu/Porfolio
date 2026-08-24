import React, { useRef, useState, useEffect } from 'react';
import { Download, Github, Linkedin, Code2, ArrowDown, Sparkles, MapPin, Clock, Terminal as TerminalIcon, FileCode, CheckCircle2, MessageSquare } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../context/LanguageContext';
import { PORTFOLIO_OWNER } from '../constants';

const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Reloj en tiempo real (Hora de Alicante / Madrid - CET/CEST)
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Madrid',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setLocalTime(now.toLocaleTimeString('es-ES', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Terminal Simulator States
  const [activeTab, setActiveTab] = useState<'about' | 'stack' | 'bash'>('about');
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<Array<{ text: string, type: 'input' | 'output' | 'system' }>>([
    { text: 'system_initialize --env=production --status=ready', type: 'system' },
    { text: 'Jesús Canicio Ruiz [Full Stack Developer] workspace loaded.', type: 'output' },
    { text: "Escribe 'help' o 'ayuda' para ver comandos disponibles.", type: 'system' }
  ]);
  const [commandInput, setCommandInput] = useState("");
  const terminalContentRef = useRef<HTMLDivElement>(null);

  const files = {
    about: {
      name: 'profile.json',
      lang: 'json',
      content: language === 'es' ? `{
  "desarrollador": "Jesús Canicio Ruiz",
  "rol": "Desarrollador Full Stack",
  "ubicacion": "Alicante, España",
  "educacion": [
    "DAW — Grado Superior Web",
    "SMR — Grado Medio Redes",
    "Especialización Python (Severo Ochoa)"
  ],
  "stack": {
    "frontend": ["React 19", "TypeScript", "Tailwind CSS", "HTML5/CSS3"],
    "backend": ["Laravel", "PHP", "Python", "Java 21 Spring Boot"],
    "bases_datos": ["MySQL", "PostgreSQL", "MongoDB"],
    "herramientas": ["Git", "GitHub", "Docker", "REST APIs"]
  },
  "estado": "Disponible para trabajar",
  "contacto": "jesuscanicio33@gmail.com"
}` : `{
  "developer": "Jesús Canicio Ruiz",
  "role": "Full Stack Developer",
  "location": "Alicante, Spain",
  "education": [
    "DAW — Higher Vocational Web",
    "SMR — Vocational Systems & Networks",
    "Python AI Specialization (Severo Ochoa)"
  ],
  "stack": {
    "frontend": ["React 19", "TypeScript", "Tailwind CSS", "HTML5/CSS3"],
    "backend": ["Laravel", "PHP", "Python", "Java 21 Spring Boot"],
    "databases": ["MySQL", "PostgreSQL", "MongoDB"],
    "tools": ["Git", "GitHub", "Docker", "REST APIs"]
  },
  "status": "Available for hire",
  "contact": "jesuscanicio33@gmail.com"
}`
    },
    stack: {
      name: 'stack.sh',
      lang: 'bash',
      content: `#!/usr/bin/env bash
# Verificando entorno de desarrollo de Jesús Canicio...
echo "[✓] React 19 + TypeScript (Frontend)"
echo "[✓] Laravel + PHP (Backend & REST APIs)"
echo "[✓] Python (Machine Learning & Data)"
echo "[✓] Java 21 + Spring Boot (Concurrencia)"
echo "[✓] MySQL / PostgreSQL / Docker (Storage & DevOps)"
echo ">> Estado: Listo para construir proyectos completos."`
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
        const nextChars = content.substring(index, index + 4);
        index += 4;
        if (index >= content.length) {
          clearInterval(timer);
          setIsTyping(false);
          return content;
        }
        return prev + nextChars;
      });
    }, 12);

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
        ? "Comandos disponibles:\n  about        - Ver perfil profesional (JSON)\n  stack        - Ver tecnologías y entorno (SH)\n  projects     - Ver proyectos destacados\n  cv           - Descargar currículum en PDF\n  contact      - Abrir sección de contacto\n  theme        - Alternar tema claro/oscuro\n  clear        - Limpiar consola"
        : "Available commands:\n  about        - View professional profile (JSON)\n  stack        - View tech stack & environment (SH)\n  projects     - Scroll to featured projects\n  cv           - Download resume (PDF)\n  contact      - Go to contact section\n  theme        - Toggle dark/light theme\n  clear        - Clear console";
    } else if (cmd === 'about' || cmd === 'sobremi') {
      response = files.about.content;
    } else if (cmd === 'stack' || cmd === 'skills' || cmd === 'habilidades') {
      response = files.stack.content;
    } else if (cmd === 'cv' || cmd === 'curriculum') {
      const link = document.createElement('a');
      link.href = '/Jesus_Canicio_Ruiz_CV.pdf';
      link.download = 'Jesus_Canicio_Ruiz_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      response = language === 'es' ? "Descargando Jesús_Canicio_Ruiz_CV.pdf..." : "Downloading Jesús_Canicio_Ruiz_CV.pdf...";
    } else if (cmd === 'projects' || cmd === 'proyectos') {
      response = language === 'es' ? "Navegando a proyectos..." : "Scrolling to projects...";
      setTimeout(() => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else if (cmd === 'contact' || cmd === 'contacto') {
      response = language === 'es' ? "Navegando a contacto..." : "Scrolling to contact...";
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else if (cmd === 'theme' || cmd === 'tema') {
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
      response = language === 'es' ? "Tema de color actualizado." : "Color theme toggled.";
    } else if (cmd === 'clear' || cmd === 'limpiar') {
      setTerminalHistory([]);
      return;
    } else {
      response = language === 'es'
        ? `Comando no reconocido: '${cmd}'. Escribe 'help' para ver la lista de comandos.`
        : `Command not found: '${cmd}'. Type 'help' to see available commands.`;
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
          .replace(/(".*?")(\s*:)/g, '<span class="text-cyan-600 dark:text-cyan-400 font-semibold">$1</span>$2')
          .replace(/(:\s*)(".*?")/g, '$1<span class="text-emerald-600 dark:text-emerald-400">$2</span>')
          .replace(/(:\s*)(\d+|true|false)/g, '$1<span class="text-indigo-600 dark:text-indigo-400 font-bold">$2</span>');
        return (
          <div key={idx} className="flex gap-3">
            <span className="text-slate-400 dark:text-slate-600 select-none w-5 text-right font-mono text-[11px]">{idx + 1}</span>
            <span className="font-mono text-[12px] leading-relaxed" dangerouslySetInnerHTML={{ __html: highlighted || '&nbsp;' }} />
          </div>
        );
      });
    } else if (lang === 'bash') {
      return text.split('\n').map((line, idx) => {
        let highlighted = line;
        if (line.startsWith('#')) {
          highlighted = `<span class="text-slate-400 dark:text-slate-500 italic">${line}</span>`;
        } else if (line.startsWith('echo')) {
          highlighted = `<span class="text-indigo-600 dark:text-indigo-400 font-bold">echo</span> <span class="text-emerald-600 dark:text-emerald-400">${line.substring(5)}</span>`;
        }
        return (
          <div key={idx} className="flex gap-3">
            <span className="text-slate-400 dark:text-slate-600 select-none w-5 text-right font-mono text-[11px]">{idx + 1}</span>
            <span className="font-mono text-[12px] leading-relaxed" dangerouslySetInnerHTML={{ __html: highlighted || '&nbsp;' }} />
          </div>
        );
      });
    }
    return text;
  };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".hero-top-badge", { y: -20, opacity: 0, duration: 0.7, clearProps: "all" })
      .from(".hero-headline", { y: 25, opacity: 0, duration: 0.8, clearProps: "all" }, "-=0.4")
      .from(".hero-role-title", { y: 20, opacity: 0, duration: 0.7, clearProps: "all" }, "-=0.5")
      .from(".hero-description", { y: 20, opacity: 0, duration: 0.7, clearProps: "all" }, "-=0.5")
      .from(".hero-stats-box", { scale: 0.95, opacity: 0, duration: 0.6, clearProps: "all" }, "-=0.4")
      .from(".hero-cta-btn", { y: 15, opacity: 0, stagger: 0.1, duration: 0.5, clearProps: "all" }, "-=0.3")
      .from(".hero-social-pill", { scale: 0.8, opacity: 0, stagger: 0.08, duration: 0.4, clearProps: "all" }, "-=0.2");

    gsap.from(cardRef.current, {
      x: 60,
      opacity: 0,
      rotateY: -15,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.3,
      clearProps: "all"
    });

    // Animación suave de flotación
    gsap.to(".hero-float-1", {
      y: -8,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".hero-float-2", {
      y: 8,
      duration: 4.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.4
    });

    // Parallax suave al mover el ratón
    const handleMouseMove = (e: MouseEvent) => {
      if (!window.matchMedia('(hover: hover)').matches) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPos = (clientX / innerWidth - 0.5);
      const yPos = (clientY / innerHeight - 0.5);

      if (cardRef.current) {
        gsap.to(cardRef.current, {
          rotateY: xPos * 10,
          rotateX: -yPos * 10,
          duration: 0.8,
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
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden engineered-grid bg-slate-50/60 dark:bg-[#07090E]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Columna Izquierda: Información Principal */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            {/* Badges superiores: Estado y Reloj en vivo */}
            <div className="hero-top-badge flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-6">
              {/* Badge de disponibilidad */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold tracking-wide backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                {t.hero.badge}
              </div>

              {/* Badge de Ubicación y Reloj Local */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs font-mono font-medium">
                <MapPin size={13} className="text-cyan-500 shrink-0" />
                <span>{t.hero.location}</span>
                <span className="text-slate-300 dark:text-slate-600">|</span>
                <Clock size={13} className="text-indigo-400 shrink-0" />
                <span className="text-slate-800 dark:text-slate-200 font-semibold">{localTime || '17:00'}</span>
              </div>
            </div>

            {/* Nombre y Título */}
            <div className="hero-headline mb-4">
              <span className="text-sm md:text-base font-mono text-cyan-600 dark:text-cyan-400 font-semibold tracking-wider uppercase block mb-1">
                {t.hero.greeting}
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight leading-[1.08]">
                {PORTFOLIO_OWNER}
              </h1>
            </div>

            {/* Rol */}
            <h2 className="hero-role-title text-xl sm:text-2xl lg:text-3xl font-bold font-display text-slate-700 dark:text-slate-200 mb-6">
              <span className="text-gradient-cyan">{t.hero.role}</span>
            </h2>

            {/* Descripción */}
            <p className="hero-description text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
              {t.hero.description}
            </p>

            {/* Bento Stats */}
            <div className="hero-stats-box grid grid-cols-3 gap-3 max-w-xl mx-auto lg:mx-0 mb-8 p-3 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-center p-2">
                <div className="text-lg sm:text-xl font-heading font-extrabold text-cyan-600 dark:text-cyan-400">{t.hero.stats.experience}</div>
                <div className="text-[11px] font-sans text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{t.hero.stats.experienceLabel}</div>
              </div>
              <div className="text-center p-2 border-x border-slate-200 dark:border-slate-800">
                <div className="text-lg sm:text-xl font-heading font-extrabold text-indigo-600 dark:text-indigo-400">{t.hero.stats.projects}</div>
                <div className="text-[11px] font-sans text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{t.hero.stats.projectsLabel}</div>
              </div>
              <div className="text-center p-2">
                <div className="text-lg sm:text-xl font-heading font-extrabold text-emerald-600 dark:text-emerald-400">{t.hero.stats.focus}</div>
                <div className="text-[11px] font-sans text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{t.hero.stats.focusLabel}</div>
              </div>
            </div>

            {/* Botones de acción principales */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 mb-8">
              <a
                href="#projects"
                className="hero-cta-btn w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-sm shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Code2 size={18} />
                {t.hero.btnProjects}
              </a>

              <a
                href="/Jesus_Canicio_Ruiz_CV.pdf"
                download="Jesus_Canicio_Ruiz_CV.pdf"
                className="hero-cta-btn w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-800 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2.5 shadow-xs cursor-pointer group"
              >
                <Download size={17} className="text-cyan-500 group-hover:translate-y-0.5 transition-transform" />
                {t.hero.btnCv}
              </a>

              <a
                href="#contact"
                className="hero-cta-btn w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare size={17} className="text-indigo-400" />
                {t.hero.btnContact}
              </a>
            </div>

            {/* Enlaces Sociales */}
            <div className="flex items-center justify-center lg:justify-start gap-3 text-slate-600 dark:text-slate-400">
              <a
                href="https://github.com/JesusCaRu"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-pill p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:text-cyan-500 hover:border-cyan-500/40 transition-all hover:scale-105 shadow-2xs"
                title="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/jesús-canicio-ruiz-184374262"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-pill p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:text-indigo-400 hover:border-indigo-500/40 transition-all hover:scale-105 shadow-2xs"
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Columna Derecha: Cockpit de Desarrollo Interactivo (3D Sandbox) */}
          <div className="lg:col-span-5 relative perspective-1000">
            <div
              ref={cardRef}
              className="relative w-full max-w-xl mx-auto preserve-3d"
            >
              <div
                className="w-full bg-white dark:bg-[#0A0D15] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden select-none"
                onClick={handleSkipTyping}
              >
                {/* Header de la Terminal */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 dark:bg-[#07090F] border-b border-slate-200 dark:border-slate-800 shrink-0">
                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors cursor-pointer" onClick={() => setActiveTab('bash')} title="Terminal"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  </div>
                  <div className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <TerminalIcon size={13} className="text-cyan-500" />
                    <span>{activeTab === 'bash' ? 'bash - 80x24' : files[activeTab].name}</span>
                  </div>
                  <div className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    {activeTab === 'bash' ? 'SH' : files[activeTab].lang.toUpperCase()}
                  </div>
                </div>

                {/* Barra de pestañas */}
                <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-[#06080D] text-xs font-mono overflow-x-auto shrink-0">
                  {(['about', 'stack', 'bash'] as const).map((tab) => {
                    const isActive = activeTab === tab;
                    const meta = {
                      about: { label: 'profile.json', color: 'text-cyan-500' },
                      stack: { label: 'stack.sh', color: 'text-emerald-400' },
                      bash: { label: 'terminal >_', color: 'text-amber-400' }
                    }[tab];

                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2.5 border-r border-slate-200 dark:border-slate-800 transition-all flex items-center gap-2 cursor-pointer font-medium whitespace-nowrap ${
                          isActive
                            ? 'bg-white dark:bg-[#0A0D15] text-slate-900 dark:text-white border-b-2 border-b-cyan-500 font-bold'
                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/40'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-cyan-500' : 'bg-slate-400 dark:bg-slate-600'}`}></span>
                        {meta.label}
                      </button>
                    );
                  })}
                </div>

                {/* Visor de código / Consola */}
                <div
                  ref={terminalContentRef}
                  className="p-5 h-[350px] overflow-y-auto font-mono text-slate-700 dark:text-slate-300 leading-relaxed text-[12px] bg-slate-50/40 dark:bg-[#0A0D15]"
                >
                  {activeTab !== 'bash' ? (
                    <div className="space-y-1">
                      {highlightCode(typedText, files[activeTab].lang)}
                      {isTyping && (
                        <div className="flex gap-3">
                          <span className="text-slate-400 select-none w-5"></span>
                          <span className="w-2 h-4 bg-cyan-500 animate-pulse inline-block align-middle" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3 font-mono">
                      {terminalHistory.map((line, idx) => (
                        <div key={idx} className="whitespace-pre-wrap">
                          {line.type === 'input' ? (
                            <span className="text-slate-900 dark:text-white font-bold">{line.text}</span>
                          ) : line.type === 'system' ? (
                            <span className="text-cyan-600 dark:text-cyan-400 italic text-[11px]">{line.text}</span>
                          ) : (
                            <span className="text-slate-600 dark:text-slate-300">{line.text}</span>
                          )}
                        </div>
                      ))}

                      <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-1">
                        <span className="text-emerald-500 dark:text-emerald-400 font-bold shrink-0">visitor@jesus-dev:~$</span>
                        <input
                          type="text"
                          value={commandInput}
                          onChange={(e) => setCommandInput(e.target.value)}
                          className="bg-transparent text-slate-900 dark:text-white focus:outline-none flex-grow w-full font-mono text-xs"
                          autoFocus
                          placeholder="help..."
                        />
                      </form>
                    </div>
                  )}
                </div>

                {/* Footer de la terminal interactiva */}
                <div className="px-5 py-2.5 bg-slate-50/80 dark:bg-[#07090F] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                  <span>UTF-8</span>
                  <span>Jesús Canicio Workspace</span>
                </div>
              </div>

              {/* Floating Badge: React */}
              <div className="hero-float-1 absolute -bottom-3 -left-3 bg-white dark:bg-[#0F1424] p-3 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 flex items-center gap-2.5 z-20 pointer-events-none">
                <img src="./images/react.svg" alt="React" className="w-6 h-6" />
                <span className="font-bold text-slate-900 dark:text-white text-xs">React</span>
              </div>

              {/* Floating Badge: Laravel */}
              <div className="hero-float-2 absolute -top-3 -right-3 bg-white dark:bg-[#0F1424] p-3 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 flex items-center gap-2.5 z-20 pointer-events-none">
                <img src="./images/laravel.svg" alt="Laravel" className="w-6 h-6" />
                <span className="font-bold text-slate-900 dark:text-white text-xs">Laravel</span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Indicador de scroll */}
      <div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-slate-400 hover:text-cyan-500 transition-colors cursor-pointer animate-bounce"
        onClick={() => {
          document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        }}
        title="Scroll Down"
      >
        <ArrowDown size={22} />
      </div>
    </section>
  );
};

export default Hero;