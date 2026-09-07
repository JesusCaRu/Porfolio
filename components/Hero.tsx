import React, { useRef, useState, useEffect } from 'react';
import { Download, ArrowRight, Sparkles, MapPin, Clock, Layers, Cpu, Smartphone, Database, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../context/LanguageContext';
import { PORTFOLIO_OWNER } from '../constants';

const LiveClock: React.FC = React.memo(() => {
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

  return (
    <span className="text-slate-800 dark:text-slate-200 font-semibold font-mono">
      {localTime || '17:00:00'}
    </span>
  );
});

const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [activeLayer, setActiveLayer] = useState<number>(0);

  const stackLayers = language === 'es' ? [
    {
      id: 'frontend',
      title: 'Frontend & UI Engineering',
      icon: <Layers size={18} className="text-cyan-500" />,
      techs: ['React 19', 'TypeScript', 'Tailwind CSS 4', 'Vite'],
      description: 'Interfaces interactivas ultraligeras, accesibilidad estricta y animaciones de alto rendimiento.',
      metric: 'Modern SPA & Component Driven'
    },
    {
      id: 'backend',
      title: 'Backend, APIs & CMS',
      icon: <Cpu size={18} className="text-indigo-400" />,
      techs: ['Laravel 13', 'PHP', 'WordPress Plugins', 'Java 21 Spring Boot'],
      description: 'Arquitecturas RESTful modulares, ORM optimizado, control de concurrencia y extensiones custom.',
      metric: 'Clean Code & SOLID Principles'
    },
    {
      id: 'mobile',
      title: 'Desarrollo Mobile Android',
      icon: <Smartphone size={18} className="text-emerald-400" />,
      techs: ['Kotlin', 'Jetpack Compose', 'Corrutinas', 'MVVM'],
      description: 'Aplicaciones Android nativas declarativas con sincronización reactiva de estado y arquitectura limpia.',
      metric: 'Native Performance & Clean Arch'
    },
    {
      id: 'data',
      title: 'Datos, Machine Learning & DevOps',
      icon: <Database size={18} className="text-amber-400" />,
      techs: ['Python (ML)', 'MySQL', 'MongoDB', 'Docker'],
      description: 'Modelos predictivos supervisados (LightGBM/XGBoost), modelado de datos relacional y contenedores.',
      metric: 'Pipelines & Containerization'
    }
  ] : [
    {
      id: 'frontend',
      title: 'Frontend & UI Engineering',
      icon: <Layers size={18} className="text-cyan-500" />,
      techs: ['React 19', 'TypeScript', 'Tailwind CSS 4', 'Vite'],
      description: 'High-performance interactive interfaces, strict accessibility, and fluid micro-animations.',
      metric: 'Modern SPA & Component Driven'
    },
    {
      id: 'backend',
      title: 'Backend, APIs & CMS',
      icon: <Cpu size={18} className="text-indigo-400" />,
      techs: ['Laravel 13', 'PHP', 'WordPress Plugins', 'Java 21 Spring Boot'],
      description: 'Modular RESTful architectures, optimized ORM, concurrency management, and custom extensions.',
      metric: 'Clean Code & SOLID Principles'
    },
    {
      id: 'mobile',
      title: 'Android Mobile Development',
      icon: <Smartphone size={18} className="text-emerald-400" />,
      techs: ['Kotlin', 'Jetpack Compose', 'Coroutines', 'MVVM'],
      description: 'Declarative native Android applications with reactive state synchronization and clean architecture.',
      metric: 'Native Performance & Clean Arch'
    },
    {
      id: 'data',
      title: 'Data, Machine Learning & DevOps',
      icon: <Database size={18} className="text-amber-400" />,
      techs: ['Python (ML)', 'MySQL', 'MongoDB', 'Docker'],
      description: 'Supervised predictive models (LightGBM/XGBoost), relational database design, and containers.',
      metric: 'Pipelines & Containerization'
    }
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    requestAnimationFrame(() => {
      cardRef.current?.style.setProperty('--mouse-x', `${x}px`);
      cardRef.current?.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".hero-status-capsule", {
      y: -15,
      opacity: 0,
      duration: 0.6,
      delay: 0.1
    })
    .from(".hero-headline", {
      y: 20,
      opacity: 0,
      duration: 0.7
    }, "-=0.35")
    .from(".hero-role-title", {
      y: 15,
      opacity: 0,
      duration: 0.6
    }, "-=0.4")
    .from(".hero-description", {
      y: 15,
      opacity: 0,
      duration: 0.6
    }, "-=0.35")
    .from(".hero-cta-group", {
      y: 15,
      opacity: 0,
      duration: 0.6
    }, "-=0.35")
    .from(".hero-right-showcase", {
      x: 25,
      opacity: 0,
      duration: 0.8
    }, "-=0.5");
  }, { scope: containerRef });

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-20 overflow-hidden subtle-dot-grid bg-slate-50/70 dark:bg-[#080B11]"
    >
      {/* Luz ambiental sutil en el fondo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/8 dark:bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-indigo-500/6 dark:bg-indigo-500/8 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Columna Izquierda: Información Principal */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            {/* Badges superiores modulares: Estado, Ubicación y Garantía Juvenil */}
            <div className="hero-status-capsule flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-8 text-xs font-mono">
              {/* Badge de disponibilidad activa */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full card-surface text-emerald-700 dark:text-emerald-300 font-semibold shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{t.hero.badge}</span>
              </div>

              {/* Ubicación y Reloj */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full card-surface text-slate-600 dark:text-slate-300 shadow-2xs">
                <MapPin size={13} className="text-cyan-500 shrink-0" />
                <span>Pinoso (Alicante)</span>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <Clock size={13} className="text-slate-400 shrink-0" />
                <LiveClock />
              </div>

              {/* Garantía Juvenil / Youth Guarantee (dinámico y traducido) */}
              {t.hero.youthGuaranteeBadge && (
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full card-surface text-amber-700 dark:text-amber-300 shadow-2xs"
                  title={t.hero.youthGuaranteeDesc}
                >
                  <ShieldCheck size={13} className="text-amber-500 shrink-0" />
                  <span>{t.hero.youthGuaranteeBadge}</span>
                </div>
              )}
            </div>

            {/* Nombre y Titular Principal */}
            <div className="hero-headline mb-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight leading-[1.06]">
                {PORTFOLIO_OWNER}
              </h1>
            </div>

            {/* Rol Especializado */}
            <h2 className="hero-role-title text-xl sm:text-2xl lg:text-3xl font-bold font-display text-slate-700 dark:text-slate-200 mb-6">
              <span className="text-gradient-cyan">{t.hero.role}</span>
            </h2>

            {/* Descripción / Propuesta de Valor */}
            <p className="hero-description text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
              {t.hero.description}
            </p>

            {/* Botones de Acción y Redes */}
            <div className="hero-cta-group flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 mb-10">
              <a
                href="#projects"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-semibold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>{t.hero.btnProjects}</span>
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="/Jesus_Canicio_Ruiz_CV.pdf"
                download="Jesus_Canicio_Ruiz_CV.pdf"
                className="w-full sm:w-auto px-5 py-3 rounded-xl card-surface text-slate-700 dark:text-white font-medium text-sm hover:border-slate-300 dark:hover:border-slate-600 transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer group"
              >
                <Download size={15} className="text-cyan-500 group-hover:translate-y-0.5 transition-transform" />
                <span>{t.hero.btnCv}</span>
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto px-5 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail size={15} />
                <span>{t.hero.btnContact}</span>
              </a>

              {/* Redes directas */}
              <div className="flex items-center gap-2 pt-2 sm:pt-0 sm:pl-2 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-800">
                <a
                  href="https://github.com/JesusCaRu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl card-surface text-slate-600 dark:text-slate-400 hover:text-cyan-500 hover:border-cyan-500/40 transition-all hover:scale-105"
                  title="GitHub Profile"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/jesús-canicio-ruiz-184374262"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl card-surface text-slate-600 dark:text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 transition-all hover:scale-105"
                  title="LinkedIn Profile"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

            {/* Métricas clave sutiles */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-cyan-500" />
                <span>React 19 & TypeScript</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-indigo-400" />
                <span>Laravel 13 & PHP</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>Kotlin & Android</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Vitrina Técnica de Arquitectura (Showcase Elegante) */}
          <div className="hero-right-showcase lg:col-span-5 w-full">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              className="card-surface glow-card rounded-2xl p-6 sm:p-7 shadow-xl relative overflow-hidden"
            >
              {/* Header de la vitrina técnica */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-200/80 dark:border-slate-800/80 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {language === 'es' ? 'Especialidades & Arquitectura' : 'Technical Stack & Architecture'}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-medium">
                  v2026.ready
                </span>
              </div>

              {/* Lista interactiva de capas de stack */}
              <div className="space-y-3">
                {stackLayers.map((layer, index) => {
                  const isSelected = activeLayer === index;
                  return (
                    <div
                      key={layer.id}
                      onClick={() => setActiveLayer(index)}
                      className={`p-4 rounded-xl transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-slate-100/80 dark:bg-slate-800/70 border-cyan-500/40 dark:border-cyan-500/50 shadow-xs'
                          : 'bg-slate-50/50 dark:bg-slate-900/40 border-transparent hover:border-slate-200 dark:hover:border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 card-surface">
                            {layer.icon}
                          </div>
                          <h3 className="text-sm font-bold font-display text-slate-900 dark:text-white">
                            {layer.title}
                          </h3>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          {layer.metric}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {layer.techs.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-950 text-[11px] font-mono text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {isSelected && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60 leading-relaxed animate-fadeIn">
                          {layer.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Footer de la tarjeta con resumen de disponibilidad */}
              <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={13} className="text-amber-500" />
                  {language === 'es' ? 'Contratación inmediata' : 'Immediate Availability'}
                </span>
                <a
                  href="#contact"
                  className="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold flex items-center gap-1"
                >
                  {language === 'es' ? 'Contactar' : 'Connect'}
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;