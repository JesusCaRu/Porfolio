import React from 'react';
import { ExperienceItem, Project, Skill, EducationItem, LanguageSkill } from './types';

export const PORTFOLIO_OWNER = "Jesús Canicio Ruiz";
export const SHORT_NAME = "Jesús";

// Logos de las habilidades con metadatos contextuales
export const SKILLS_DATA: Skill[] = [
  {
    name: 'React',
    icon: (
      <img src="./images/react.svg" alt="React" className="w-10 h-10" />
    ),
    category: 'frontend',
    usageHint: 'React 19, Hooks, Context, Componentes Modulares',
    featured: true
  },
  {
    name: 'TypeScript',
    icon: (
      <img src="./images/typescript.svg" alt="TypeScript" className="w-10 h-10" />
    ),
    category: 'frontend',
    usageHint: 'Tipado estricto, Interfaces, Arquitectura Segura',
    featured: true
  },
  {
    name: 'HTML5 & CSS3',
    icon: (
      <img src="./images/html5.svg" alt="HTML5" className="w-10 h-10" />
    ),
    category: 'frontend',
    usageHint: 'Semántica Web, Accesibilidad, Tailwind CSS 4',
    featured: false
  },
  {
    name: 'Kotlin & Jetpack Compose',
    icon: (
      <img src="./images/kotlin.svg" alt="Kotlin" className="w-10 h-10" />
    ),
    category: 'frontend',
    usageHint: 'Desarrollo Android moderno, UI declarativa, Corrutinas',
    featured: true
  },
  {
    name: 'Laravel',
    icon: (
      <img src="./images/laravel.svg" alt="Laravel" className="w-10 h-10" />
    ),
    category: 'backend',
    usageHint: 'APIs RESTful, Eloquent ORM, Autenticación, Middleware',
    featured: true
  },
  {
    name: 'PHP',
    icon: (
      <img src="./images/php.svg" alt="PHP" className="w-10 h-10" />
    ),
    category: 'backend',
    usageHint: 'POO avanzada, Patrones MVC, Plugins y Extensiones',
    featured: false
  },
  {
    name: 'Python',
    icon: (
      <img src="./images/python.svg" alt="Python" className="w-10 h-10" />
    ),
    category: 'backend',
    usageHint: 'Machine Learning (LightGBM, XGBoost, Scikit-Learn), Scripts',
    featured: true
  },
  {
    name: 'Java (Spring Boot)',
    icon: (
      <img src="./images/java.svg" alt="Java" className="w-10 h-10" />
    ),
    category: 'backend',
    usageHint: 'Java 21, Spring Boot 3, Control de concurrencia (@Version)',
    featured: true
  },
  {
    name: 'MySQL & SQL Relacional',
    icon: (
      <img src="./images/mysql.svg" alt="MySQL Database" className="w-10 h-10" />
    ),
    category: 'backend',
    usageHint: 'Diseño relacional, Transacciones ACID, Optimización de queries',
    featured: true
  },
  {
    name: 'MongoDB',
    icon: (
      <img src="./images/mongodb.svg" alt="MongoDB NoSQL" className="w-10 h-10" />
    ),
    category: 'backend',
    usageHint: 'Bases de datos NoSQL, Documentos JSON, Agregaciones',
    featured: false
  },
  {
    name: 'Docker',
    icon: (
      <img src="./images/docker.svg" alt="Docker" className="w-10 h-10" />
    ),
    category: 'tools',
    usageHint: 'Contenerización de microservicios, Docker Compose',
    featured: false
  },
  {
    name: 'Git & GitHub',
    icon: (
      <img src="./images/git.svg" alt="Git" className="w-10 h-10" />
    ),
    category: 'tools',
    usageHint: 'Flujos Gitflow, CI/CD, Colaboración ágil',
    featured: false
  },
  {
    name: 'WordPress & Plugins PHP',
    icon: (
      <img src="./images/wordpress.svg" alt="WordPress" className="w-10 h-10" />
    ),
    category: 'tools',
    usageHint: 'Desarrollo de plugins a medida, Mantenimiento CMS y Hooks',
    featured: false
  },
];

// Diccionario Español - Inglés
export const CONTENT = {
  es: {
    nav: {
      home: 'Inicio',
      skills: 'Habilidades',
      experience: 'Experiencia',
      projects: 'Proyectos',
      contact: 'Contacto',
      commandK: 'Comandos',
      quickSearch: 'Buscar...',
      available: 'Disponible',
      toggleTheme: ['Cambiar a Modo Claro', 'Cambiar a Modo Oscuro'],
    },
    hero: {
      badge: 'Disponible para trabajar',
      youthGuaranteeBadge: 'Garantía Juvenil · Bonificación contratación',
      youthGuaranteeDesc: 'Beneficiario de la Garantía Juvenil: mi contratación puede dar acceso a bonificaciones en la cuota de la Seguridad Social para la empresa.',
      greeting: 'Hola, soy',
      role: 'Desarrollador Web Full Stack',
      roleSuffix: '',
      location: 'Pinoso (Alicante), España',
      timezoneLabel: 'Hora local (CET)',
      description: 'Desarrollo aplicaciones web completas, modernas y escalables con Laravel, React y Python. Especializado en lógica de backend robusta, interfaces interactivas y pipelines de Machine Learning.',
      btnProjects: 'Ver Proyectos',
      btnCv: 'Descargar CV',
      btnContact: 'Contactar',
      stats: {
        experience: '4+ Años',
        experienceLabel: 'Formación y Práctica Técnica',
        projects: '4 Grandes',
        projectsLabel: 'Proyectos Principales',
        focus: '100%',
        focusLabel: 'Full Stack & Clean Code'
      },
      codeWindow: {
        devClass: 'Desarrollador',
        passion: 'pasion',
        method: 'programar',
        comment: '// Creando soluciones robustas y escalables',
        return: 'Innovacion'
      }
    },
    skills: {
      badge: 'Stack Tecnológico',
      title: 'Habilidades & Dominio Técnico',
      subtitle: 'Tecnologías modernas aplicadas en arquitecturas reales, APIs de alto rendimiento y soluciones de datos.',
      filterAll: 'Todos',
      filterFrontend: 'Frontend',
      filterBackend: 'Backend',
      filterTools: 'Herramientas & DevOps',
      appliedIn: 'Aplicado en:'
    },
    experience: {
      badge: 'Trayectoria Profesional',
      title: 'Experiencia & Formación',
      subtitle: 'Sólida base técnica desde la administración de sistemas hasta el desarrollo full stack y la inteligencia artificial.',
      workTitle: 'Experiencia Profesional',
      eduTitle: 'Formación Académica & Certificaciones',
      languagesTitle: 'Competencias Lingüísticas',
      languages: [
        { name: 'Español', level: 'Nativo', native: true },
        { name: 'Inglés', level: 'Nivel básico', native: false }
      ] as LanguageSkill[],
      softSkillsTitle: 'Filosofía & Método de Trabajo',
      softSkillsDesc: 'Curioso por naturaleza y apasionado por resolver problemas técnicos complejos. Priorizo escribir código limpio, modular y fácil de mantener a largo plazo, comprendiendo tanto la infraestructura del servidor como la experiencia visual del usuario.',
      viewCert: 'Ver Certificado',
      validatedSkills: 'Habilidades Validadas',
      downloadCert: 'Descargar Certificado',
      openOriginal: 'Ver en Nueva Pestaña',
      metrics: [
        { label: 'Arquitectura Limpia', desc: 'Patrones SOLID y código mantenible' },
        { label: 'Visión Full Stack', desc: 'Desde la base de datos hasta el UI/UX' },
        { label: 'Aprendizaje Ágil', desc: 'Adopción rápida de nuevas tecnologías' }
      ],
      list: [
        {
          id: 1,
          title: "Desarrollador Web Freelance",
          company: "Profesional Independiente",
          period: "Septiembre 2025 – Actualidad",
          location: "Pinoso, España",
          roleType: "Freelance",
          isCurrent: true,
          description: "Desarrollo integral de soluciones web para clientes y administración pública, cubriendo desde la toma de requerimientos y arquitectura hasta el despliegue y mantenimiento.",
          bullets: [
            "Mantenimiento y renovación de la página de autoliquidaciones del Ayuntamiento de Pinoso, actualizando funcionalidades y corrigiendo incidencias para garantizar su correcto funcionamiento.",
            "Desarrollo en curso, para una empresa cliente, de una plataforma de reseñas y menús digitales para restaurantes basada en tarjetas NFC, con redirección multiplataforma, panel de administración y suscripción recurrente.",
            "Gestión de forma autónoma de la relación con clientes, los plazos de entrega y el ciclo completo de desarrollo, desde el análisis de requisitos hasta el despliegue."
          ],
          tags: ["Freelance", "React", "PHP", "NFC & IoT", "SaaS", "Stripe", "WordPress", "Autoliquidaciones"]
        },
        {
          id: 2,
          title: "Desarrollador Web",
          company: "Ideade Creatives",
          period: "Marzo 2025 – Junio 2025",
          location: "Pinoso, España",
          roleType: "Prácticas Profesionales",
          isCurrent: false,
          description: "Desarrollo y mantenimiento de aplicaciones web en entorno de producción real, participando tanto en frontend como backend y extensiones CMS.",
          bullets: [
            "Actualicé aplicaciones web existentes migrándolas a las últimas versiones de React y Laravel, garantizando compatibilidad y mejor rendimiento tras la migración.",
            "Desarrollé sitios web a medida para distintos clientes, cubriendo tanto el diseño frontend como la lógica backend, y añadí nuevas funcionalidades a proyectos ya en producción.",
            "Diseñé y desarrollé un plugin personalizado en PHP para WordPress, ampliando las capacidades estándar del CMS según los requisitos del cliente.",
            "Trabajé directamente sobre proyectos en producción, lo que me permitió ganar agilidad resolviendo incidencias del día a día bajo plazos reales."
          ],
          tags: ["PHP", "Laravel", "React", "TypeScript", "MySQL", "WordPress Plugins", "Git"]
        },
        {
          id: 3,
          title: "Becario de Soporte Técnico",
          company: "Ayuntamiento de Pinoso",
          period: "Marzo 2023 – Junio 2023",
          location: "Pinoso, España",
          roleType: "Prácticas Profesionales",
          isCurrent: false,
          description: "Soporte técnico a usuarios, mantenimiento de infraestructuras IT municipales y gestión del portal web institucional.",
          bullets: [
            "Formé parte del equipo de soporte técnico, resolviendo incidencias informáticas de forma diaria para los distintos departamentos municipales.",
            "Realicé tareas de montaje, configuración y mantenimiento de equipos informáticos.",
            "Colaboré en el mantenimiento y actualización de la página web municipal (WordPress), corrigiendo fallos del sitio y modificando contenidos y elementos visuales para mantenerla al día."
          ],
          tags: ["Soporte IT", "WordPress", "Redes & VLAN", "Hardware", "Linux/Windows"]
        }
      ] as ExperienceItem[],
      education: [
        {
          degree: "Curso de Especialización en Desarrollo de Aplicaciones con Python",
          institution: "IES Severo Ochoa (Elche)",
          year: "2025 - 2026",
          badge: "Especialización Avanzada",
          skills: ["Python 3", "Machine Learning", "Scikit-Learn", "FastAPI", "Data Analysis"]
        },
        {
          degree: "Grado Superior en Desarrollo de Aplicaciones Web (DAW)",
          institution: "IES Enric Valor (Monóvar)",
          year: "2023 - 2025",
          badge: "Técnico Superior",
          skills: ["React", "Laravel", "PHP", "Java", "Bases de Datos Relacionales", "JavaScript/TS"]
        },
        {
          degree: "Grado Medio en Sistemas Microinformáticos y Redes (SMR)",
          institution: "IES Enric Valor (Monóvar)",
          year: "2021 - 2023",
          badge: "Técnico Medio",
          skills: ["Redes", "Sistemas Operativos", "Seguridad Informática", "Servicios de Red"]
        },
        {
          degree: "Certificación Profesional en SEO",
          institution: "HubSpot Academy",
          year: "2026",
          badge: "Certificación Oficial",
          certificate: "/images/SEO Jesús Canicio Ruiz.png",
          skills: ["Technical SEO", "Web Performance", "Keyword Research", "On-Page Optimization"]
        }
      ] as EducationItem[]
    },
    projects: {
      badge: 'Portafolio de Proyectos',
      title: 'Proyectos Destacados',
      subtitle: 'Software funcional y escalable que resuelve problemas reales de arquitectura y análisis de datos.',
      viewCode: 'Código Fuente',
      viewDemo: 'Demo en Vivo',
      archBreakdown: 'Detalles de Arquitectura',
      hideDetails: 'Ocultar Detalles',
      filterAll: 'Todos',
      filterFullstack: 'Full Stack',
      filterML: 'Machine Learning',
      filterBackend: 'Backend & APIs',
      list: [
        {
          id: 1,
          title: "StockFlow — Gestión Robótica",
          description: "Sistema integral diseñado para la optimización de inventarios en entornos de robótica industrial. Incluye control de stock en tiempo real, gestión de componentes y API REST robusta.",
          tech: ["React", "Laravel", "MySQL", "Tailwind CSS", "REST API"],
          image: "/images/StockFlow.webp",
          link: "https://github.com/JesusCaRu/ProyectoFinal",
          demoLink: "https://github.com/JesusCaRu/ProyectoFinal",
          category: "fullstack",
          metrics: "Stock en Tiempo Real",
          highlights: [
            "Lógica de servidor desacoplada en Laravel con autenticación JWT y políticas de acceso.",
            "Panel de control interactivo en React optimizado para operadores industriales.",
            "Modelo de base de datos relacional en MySQL normalizado para alta consistencia."
          ],
          architecture: {
            frontend: "React 19, Tailwind CSS, Lucide Icons",
            backend: "Laravel (PHP 8.2), API RESTful, Middleware de autorización",
            database: "MySQL con transacciones atómicas para movimientos de stock",
            features: "Monitoreo en vivo de inventario y trazabilidad de componentes"
          }
        },
        {
          id: 2,
          title: "Building Energy Efficiency ML",
          description: "Pipeline completo de Machine Learning para predecir con alta precisión el consumo y demanda térmica en edificaciones mediante ingeniería de variables y ensamble multimodelo.",
          tech: ["Python", "LightGBM", "XGBoost", "CatBoost", "Scikit-Learn", "AutoGluon"],
          image: "/images/building_energy_ml.png",
          link: "https://github.com/JesusCaRu/building-energy-efficiency-ml",
          demoLink: "https://github.com/JesusCaRu/building-energy-efficiency-ml",
          category: "ml",
          metrics: "Stacking Ensemble Multimodelo",
          highlights: [
            "Ingeniería de características térmicas avanzadas y reducción de varianza.",
            "Stacking Ensemble combinando LightGBM, XGBoost y CatBoost para mínimo error MAE.",
            "Pipeline modular reproducible con validación cruzada y análisis SHAP de explicabilidad."
          ],
          architecture: {
            frontend: "Jupyter / Visualización Matplotlib & Seaborn",
            backend: "Python 3.11, Scikit-Learn, LightGBM, XGBoost, CatBoost",
            database: "Datasets energéticos tabulares procesados con Pandas y NumPy",
            features: "Optimización de hiperparámetros y validación cruzada estratificada"
          }
        },
        {
          id: 3,
          title: "TikTok Wrapped — Analítica Interactiva",
          description: "Aplicación web privada e interactiva para visualizar el resumen anual de TikTok directamente en el navegador. Experiencia inmersiva con historias dinámicas, locución por IA y mapa de actividad.",
          tech: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Motion", "Web Audio API"],
          image: "/images/tiktokwrapper.png",
          link: "https://github.com/JesusCaRu/Tiktok-Wrapper",
          demoLink: "https://tiktok-wrapper.vercel.app",
          category: "fullstack",
          metrics: "100% Client-Side & Privado",
          highlights: [
            "Procesamiento JSON en el navegador sin enviar datos a ningún servidor (privacidad total).",
            "Visor de historias dinámico estilo Instagram/TikTok con transiciones en Framer Motion.",
            "Mapa circadiano de actividad de 365 días y modo versus/duelo analítico."
          ],
          architecture: {
            frontend: "React 19, TypeScript, Tailwind CSS, Motion (Framer)",
            backend: "Serverless / Client-Side Processing con Web Audio API",
            database: "Procesamiento de volcado JSON en memoria local",
            features: "Efectos sonoros hápticos, locución IA y visualizaciones interactivas"
          }
        },
        {
          id: 4,
          title: "Resource Booking Concurrency API",
          description: "API REST de alto rendimiento en Java 21 y Spring Boot 3 con control de concurrencia optimista (@Version) para eliminar condiciones de carrera y sobre-reservas en entornos concurrentes.",
          tech: ["Java 21", "Spring Boot 3", "PostgreSQL", "RabbitMQ", "Docker", "JWT", "Swagger"],
          image: "/images/resource_booking_api.png",
          link: "https://github.com/JesusCaRu/resource-booking-concurrency-api",
          demoLink: "https://github.com/JesusCaRu/resource-booking-concurrency-api",
          category: "backend",
          metrics: "Control de Concurrencia Optimista",
          highlights: [
            "Eliminación de condiciones de carrera con control optimista (@Version) y reintentos automáticos.",
            "Mensajería asíncrona desacoplada con RabbitMQ para eventos de reserva.",
            "Contenerización completa con Docker Compose y documentación interactiva OpenAPI/Swagger."
          ],
          architecture: {
            frontend: "Swagger UI / OpenAPI Documentation",
            backend: "Java 21, Spring Boot 3, Spring Security con JWT, RabbitMQ",
            database: "PostgreSQL con índices optimizados y bloqueos no bloqueantes",
            features: "Manejo de transacciones atómicas y métricas de rendimiento"
          }
        }
      ] as Project[]
    },
    contact: {
      badge: 'Contacto Directo',
      title: '¿Tienes un proyecto en mente?',
      desc: 'Estoy abierto a nuevas oportunidades laborales y colaboraciones en proyectos interesantes. Cuéntame qué necesitas y nos pondremos manos a la obra.',
      email: 'Correo Electrónico',
      phone: 'Teléfono Directo',
      location: 'Ubicación',
      locationVal: 'Pinoso (Alicante), España (Presencial / Remoto / Híbrido)',
      availability: 'Disponible para incorporación inmediata',
      youthGuaranteeTitle: 'Incentivo de Contratación (Garantía Juvenil)',
      youthGuaranteeDesc: 'Beneficiario del Sistema Nacional de Garantía Juvenil: mi contratación puede dar acceso a bonificaciones directas en las cuotas de la Seguridad Social para la empresa.',
      copyEmail: 'Copiar Email',
      emailCopied: '¡Email copiado al portapapeles!',
      responseTime: 'Respuesta garantizada en menos de 24h',
      form: {
        name: 'Tu Nombre',
        namePlaceholder: 'Ej. Laura Martínez',
        email: 'Tu Correo Electrónico',
        emailPlaceholder: 'laura@empresa.com',
        subject: 'Asunto o Motivo',
        subjectPlaceholder: 'Propuesta de trabajo / Proyecto web...',
        message: 'Mensaje',
        messagePlaceholder: 'Hola Jesús, nos gustaría hablar contigo acerca de...',
        btnSend: 'Enviar Mensaje',
        sending: 'Enviando mensaje...'
      },
      feedback: {
        success: '¡Mensaje enviado con éxito! Te responderé lo antes posible.',
        error: 'Hubo un error al enviar el mensaje. Por favor intenta de nuevo o escríbeme directamente a jesuscanicio33@gmail.com.'
      }
    },
    commandPalette: {
      title: 'Paleta de Comandos',
      placeholder: 'Escribe un comando o busca secciones, proyectos...',
      navigation: 'Navegación Rápida',
      actions: 'Acciones del Sistema',
      projects: 'Explorar Proyectos',
      toggleTheme: 'Alternar Modo Oscuro / Claro',
      toggleLang: 'Switch to English (Cambiar a Inglés)',
      downloadCv: 'Descargar Curriculum Vitae (PDF)',
      copyEmail: 'Copiar correo a portapapeles',
      copiedEmailToast: 'Email copiado: jesuscanicio33@gmail.com',
      noResults: 'No se encontraron resultados para',
      hint: 'Usa ↑ ↓ para moverte, Enter para ejecutar y ESC para cerrar'
    },
    footer: {
      copyright: 'Jesús Canicio Ruiz — Diseñado y desarrollado con pasión por la ingeniería de software.',
      techStack: 'Construido con React 19, TypeScript, Tailwind CSS 4, GSAP & Motion.',
      status: 'Todos los sistemas operativos'
    }
  },
  en: {
    nav: {
      home: 'Home',
      skills: 'Skills',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact',
      commandK: 'Commands',
      quickSearch: 'Search...',
      available: 'Available',
      toggleTheme: ['Switch to Light Mode', 'Switch to Dark Mode'],
    },
    hero: {
      badge: 'Available for hire & projects',
      youthGuaranteeBadge: 'Youth Guarantee · Hiring Incentive',
      youthGuaranteeDesc: 'Beneficiary of the National Youth Guarantee System: hiring gives employers direct access to substantial Social Security tax relief and bonuses.',
      greeting: "Hi, I'm",
      role: 'Full Stack Web Developer',
      roleSuffix: '',
      location: 'Pinoso (Alicante), Spain',
      timezoneLabel: 'Local Time (CET)',
      description: 'I build complete, modern, and scalable web applications with Laravel, React, and Python. Specialized in robust backend logic, interactive user interfaces, and Machine Learning pipelines.',
      btnProjects: 'Explore Projects',
      btnCv: 'Download CV',
      btnContact: "Let's Talk",
      stats: {
        experience: '4+ Years',
        experienceLabel: 'Technical Training & Practice',
        projects: '4 Major',
        projectsLabel: 'Core Projects',
        focus: '100%',
        focusLabel: 'Full Stack & Clean Code'
      },
      codeWindow: {
        devClass: 'Developer',
        passion: 'passion',
        method: 'code',
        comment: '// Building robust and scalable solutions',
        return: 'Innovation'
      }
    },
    skills: {
      badge: 'Tech Stack',
      title: 'Skills & Technical Mastery',
      subtitle: 'Modern technologies applied in production systems, scalable architectures, high-performance APIs and data solutions.',
      filterAll: 'All',
      filterFrontend: 'Frontend',
      filterBackend: 'Backend',
      filterTools: 'Tools & DevOps',
      appliedIn: 'Applied in:'
    },
    experience: {
      badge: 'Career & Trajectory',
      title: 'Experience & Education',
      subtitle: 'Solid technical background spanning IT infrastructure, full stack engineering and artificial intelligence.',
      workTitle: 'Professional Experience',
      eduTitle: 'Academic Education & Certifications',
      languagesTitle: 'Language Proficiency',
      languages: [
        { name: 'Spanish', level: 'Native', native: true },
        { name: 'English', level: 'Basic Level', native: false }
      ] as LanguageSkill[],
      softSkillsTitle: 'Philosophy & Work Methodology',
      softSkillsDesc: 'Naturally curious and passionate about tackling complex engineering challenges. I focus on writing clean, modular, and maintainable code for the long term, understanding both server infrastructure and delightful end-user experiences.',
      viewCert: 'View Certificate',
      validatedSkills: 'Validated Skills',
      downloadCert: 'Download Certificate',
      openOriginal: 'Open in New Tab',
      metrics: [
        { label: 'Clean Architecture', desc: 'SOLID principles and maintainable design' },
        { label: 'Full Stack Vision', desc: 'From database schema to fluid UI/UX' },
        { label: 'Agile Learning', desc: 'Rapid adoption of cutting-edge tech' }
      ],
      list: [
        {
          id: 1,
          title: "Freelance Web Developer",
          company: "Independent Professional",
          period: "September 2025 – Present",
          location: "Pinoso, Spain",
          roleType: "Freelance",
          isCurrent: true,
          description: "End-to-end web engineering for direct clients and municipal administration, overseeing requirements analysis, architecture, deployment, and ongoing operation.",
          bullets: [
            "Maintained and renewed the self-assessment tax platform for Pinoso City Hall, updating features and resolving incidents to guarantee reliable operation.",
            "In active development of a restaurant reviews and digital menus platform based on smart NFC cards, with multi-platform redirection, admin portal, and recurring subscriptions.",
            "Autonomously managed customer relationships, delivery timelines, and the full development lifecycle from specification to production deployment."
          ],
          tags: ["Freelance", "React", "PHP", "NFC & IoT", "SaaS", "Stripe", "WordPress", "Tax Platform"]
        },
        {
          id: 2,
          title: "Web Developer",
          company: "Ideade Creatives",
          period: "March 2025 – June 2025",
          location: "Pinoso, Spain",
          roleType: "Professional Internship",
          isCurrent: false,
          description: "Developed and maintained web applications in production environments, contributing to frontend, backend, and CMS extensions.",
          bullets: [
            "Upgraded existing web applications by migrating them to the latest versions of React and Laravel, ensuring compatibility and optimal performance.",
            "Developed tailor-made websites for multiple clients, delivering fluid frontend interfaces and robust backend logic with new features in production.",
            "Designed and built a custom PHP plugin for WordPress, expanding the core CMS capabilities to meet specific client requirements.",
            "Worked directly on live production systems, swiftly resolving technical day-to-day bugs under real deadlines."
          ],
          tags: ["PHP", "Laravel", "React", "TypeScript", "MySQL", "WordPress Plugins", "Git"]
        },
        {
          id: 3,
          title: "IT Support Technician Intern",
          company: "Pinoso City Hall",
          period: "March 2023 – June 2023",
          location: "Pinoso, Spain",
          roleType: "Professional Internship",
          isCurrent: false,
          description: "Provided IT support to municipal departments, maintained IT infrastructure, and assisted in updating the municipal web portal.",
          bullets: [
            "Served in the IT support unit, resolving computer, network, and hardware incidents daily for municipal municipal departments.",
            "Assembled, configured, and maintained computer workstations and hardware equipment.",
            "Collaborated in maintaining and updating the municipal website (WordPress), fixing site errors and adjusting visual elements and contents."
          ],
          tags: ["IT Support", "WordPress", "Networks & VLAN", "Hardware", "Linux/Windows"]
        }
      ] as ExperienceItem[],
      education: [
        {
          degree: "Specialization Course in Python Application Development",
          institution: "IES Severo Ochoa (Elche)",
          year: "2025 - 2026",
          badge: "Advanced Specialization",
          skills: ["Python 3", "Machine Learning", "Scikit-Learn", "FastAPI", "Data Analysis"]
        },
        {
          degree: "Higher Technician in Web Application Development (DAW)",
          institution: "IES Enric Valor (Monóvar)",
          year: "2023 - 2025",
          badge: "Higher Vocational Degree",
          skills: ["React", "Laravel", "PHP", "Java", "Relational Databases", "JavaScript/TS"]
        },
        {
          degree: "Technician in Microcomputer Systems and Networks (SMR)",
          institution: "IES Enric Valor (Monóvar)",
          year: "2021 - 2023",
          badge: "Vocational Degree",
          skills: ["Networking", "Operating Systems", "Cybersecurity", "Network Services"]
        },
        {
          degree: "SEO Professional Certification",
          institution: "HubSpot Academy",
          year: "2026",
          badge: "Official Certification",
          certificate: "/images/SEO Jesús Canicio Ruiz.png",
          skills: ["Technical SEO", "Web Performance", "Keyword Research", "On-Page Optimization"]
        }
      ] as EducationItem[]
    },
    projects: {
      badge: 'Engineering Showcase',
      title: 'Featured Projects',
      subtitle: 'Production-ready, scalable software solving real-world challenges in architecture and data analytics.',
      viewCode: 'Source Code',
      viewDemo: 'Live Demo',
      archBreakdown: 'Architecture & Details',
      hideDetails: 'Hide Details',
      filterAll: 'All',
      filterFullstack: 'Full Stack',
      filterML: 'Machine Learning',
      filterBackend: 'Backend & APIs',
      list: [
        {
          id: 1,
          title: "StockFlow — Robotic Management",
          description: "Comprehensive system engineered to optimize warehouse inventory in robotics manufacturing. Features real-time stock tracking, component management, and a robust REST API.",
          tech: ["React", "Laravel", "MySQL", "Tailwind CSS", "REST API"],
          image: "/images/StockFlow.webp",
          link: "https://github.com/JesusCaRu/ProyectoFinal",
          demoLink: "https://github.com/JesusCaRu/ProyectoFinal",
          category: "fullstack",
          metrics: "Real-Time Stock Engine",
          highlights: [
            "Decoupled Laravel server with JWT auth and fine-grained authorization policies.",
            "Interactive React dashboard optimized for shop floor operators.",
            "Normalized MySQL relational schema ensuring absolute transactional consistency."
          ],
          architecture: {
            frontend: "React 19, Tailwind CSS, Lucide Icons",
            backend: "Laravel (PHP 8.2), RESTful API, Authorization Middleware",
            database: "MySQL with atomic ACID transactions for stock balance",
            features: "Real-time inventory monitoring and component traceability"
          }
        },
        {
          id: 2,
          title: "Building Energy Efficiency ML",
          description: "End-to-end Machine Learning pipeline predicting building thermal consumption with minimal error using domain feature engineering and multi-model stacking ensemble.",
          tech: ["Python", "LightGBM", "XGBoost", "CatBoost", "Scikit-Learn", "AutoGluon"],
          image: "/images/building_energy_ml.png",
          link: "https://github.com/JesusCaRu/building-energy-efficiency-ml",
          demoLink: "https://github.com/JesusCaRu/building-energy-efficiency-ml",
          category: "ml",
          metrics: "Multi-Model Stacking Ensemble",
          highlights: [
            "Domain-specific thermal feature engineering minimizing target variance.",
            "Multi-model stacking combining LightGBM, XGBoost, and CatBoost for lowest MAE.",
            "Reproducible pipeline with stratified cross-validation and SHAP explainability."
          ],
          architecture: {
            frontend: "Jupyter / Matplotlib & Seaborn Visualizations",
            backend: "Python 3.11, Scikit-Learn, LightGBM, XGBoost, CatBoost",
            database: "Tabular energy datasets processed with Pandas and NumPy",
            features: "Hyperparameter tuning and stratified cross-validation"
          }
        },
        {
          id: 3,
          title: "TikTok Wrapped — Interactive Analytics",
          description: "Private and interactive client-side web application visualizing your yearly TikTok recap in browser. Includes dynamic stories, AI voice narration, and a 365-day activity heatmap.",
          tech: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Motion", "Web Audio API"],
          image: "/images/tiktokwrapper.png",
          link: "https://github.com/JesusCaRu/Tiktok-Wrapper",
          demoLink: "https://tiktok-wrapper.vercel.app",
          category: "fullstack",
          metrics: "100% Client-Side & Private",
          highlights: [
            "Zero-server JSON parser running entirely in-browser for complete privacy.",
            "Instagram/TikTok style story viewer with Framer Motion spring physics.",
            "365-day circadian heatmap and interactive versus duel analyzer."
          ],
          architecture: {
            frontend: "React 19, TypeScript, Tailwind CSS, Motion (Framer)",
            backend: "Serverless / Client-Side Processing with Web Audio API",
            database: "In-memory local JSON stream parser",
            features: "Haptic audio effects, AI speech synthesis, and reactive graphs"
          }
        },
        {
          id: 4,
          title: "Resource Booking Concurrency API",
          description: "High-performance REST API built with Java 21 & Spring Boot 3 featuring Optimistic Concurrency Control (@Version) to prevent race conditions and overbooking in high-throughput environments.",
          tech: ["Java 21", "Spring Boot 3", "PostgreSQL", "RabbitMQ", "Docker", "JWT", "Swagger"],
          image: "/images/resource_booking_api.png",
          link: "https://github.com/JesusCaRu/resource-booking-concurrency-api",
          demoLink: "https://github.com/JesusCaRu/resource-booking-concurrency-api",
          category: "backend",
          metrics: "Optimistic Concurrency Control",
          highlights: [
            "Eliminated race conditions using optimistic locking (@Version) and auto-retry logic.",
            "Decoupled asynchronous event messaging with RabbitMQ broker.",
            "Full containerization with Docker Compose and OpenAPI/Swagger documentation."
          ],
          architecture: {
            frontend: "Swagger UI / OpenAPI Documentation",
            backend: "Java 21, Spring Boot 3, Spring Security with JWT, RabbitMQ",
            database: "PostgreSQL with optimized indexes and non-blocking locks",
            features: "Atomic transactions management and performance benchmarks"
          }
        }
      ] as Project[]
    },
    contact: {
      badge: 'Direct Contact',
      title: 'Have an exciting project or role?',
      desc: "I am open to new career opportunities and high-impact collaborations. Tell me about what you are building, and let's make it happen.",
      email: 'Email Address',
      phone: 'Direct Phone',
      location: 'Location',
      locationVal: 'Pinoso (Alicante), Spain (On-site / Remote / Hybrid · Full Availability)',
      availability: 'Available for immediate joining',
      youthGuaranteeTitle: 'Hiring Incentive (Youth Guarantee)',
      youthGuaranteeDesc: 'Beneficiary of the National Youth Guarantee System: hiring gives employers direct access to substantial Social Security tax relief and bonuses.',
      copyEmail: 'Copy Email',
      emailCopied: 'Email copied to clipboard!',
      responseTime: 'Guaranteed response in under 24h',
      form: {
        name: 'Your Name',
        namePlaceholder: 'e.g. Sarah Jenkins',
        email: 'Your Email Address',
        emailPlaceholder: 'sarah@company.com',
        subject: 'Subject / Role',
        subjectPlaceholder: 'Job opportunity / Web project...',
        message: 'Message',
        messagePlaceholder: 'Hi Jesús, we would love to talk to you about...',
        btnSend: 'Send Message',
        sending: 'Sending message...'
      },
      feedback: {
        success: 'Message sent successfully! I will get back to you shortly.',
        error: 'Failed to send message. Please try again or reach out directly at jesuscanicio33@gmail.com.'
      }
    },
    commandPalette: {
      title: 'Command Palette',
      placeholder: 'Type a command or search sections, projects...',
      navigation: 'Quick Navigation',
      actions: 'System Actions',
      projects: 'Explore Projects',
      toggleTheme: 'Toggle Dark / Light Mode',
      toggleLang: 'Cambiar a Español (Switch to Spanish)',
      downloadCv: 'Download Resume (PDF)',
      copyEmail: 'Copy email to clipboard',
      copiedEmailToast: 'Email copied: jesuscanicio33@gmail.com',
      noResults: 'No results found for',
      hint: 'Use ↑ ↓ to navigate, Enter to select and ESC to close'
    },
    footer: {
      copyright: 'Jesús Canicio Ruiz — Crafted with dedication to software engineering excellence.',
      techStack: 'Built with React 19, TypeScript, Tailwind CSS 4, GSAP & Motion.',
      status: 'All systems operational'
    }
  }
};