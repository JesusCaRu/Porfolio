import React from 'react';
import { ExperienceItem, Project, Skill, EducationItem } from './types';

export const PORTFOLIO_OWNER = "Jesús";

// Shared Skills with Official High-Quality Logos
export const SKILLS_DATA: Skill[] = [
  {
    name: 'React',
    icon: (
      <img src="./images/react.svg" alt="React" className="w-10 h-10" />
    ),
    category: 'frontend'
  },
  {
    name: 'TypeScript',
    icon: (
      <img src="./images/typescript.svg" alt="TypeScript" className="w-10 h-10" />
    ),
    category: 'frontend'
  },
  {
    name: 'HTML',
    icon: (
      <img src="./images/html5.svg" alt="HTML5" className="w-10 h-10" />
    ),
    category: 'frontend'
  },
  {
    name: 'CSS',
    icon: (
      <img src="./images/css3.svg" alt="CSS3" className="w-10 h-10" />
    ),
    category: 'frontend'
  },
  {
    name: 'Laravel',
    icon: (
      <img src="./images/laravel.svg" alt="Laravel" className="w-10 h-10" />
    ),
    category: 'backend'
  },
  {
    name: 'PHP',
    icon: (
      <img src="./images/php.svg" alt="PHP" className="w-10 h-10" />
    ),
    category: 'backend'
  },
  {
    name: 'Python',
    icon: (
      <img src="./images/python.svg" alt="Python" className="w-10 h-10" />
    ),
    category: 'backend'
  },
  {
    name: 'Java',
    icon: (
      <img src="./images/java.svg" alt="Java" className="w-10 h-10" />
    ),
    category: 'backend'
  },
  {
    name: 'Docker',
    icon: (
      <img src="./images/docker.svg" alt="Docker" className="w-10 h-10" />
    ),
    category: 'backend'
  },
  {
    name: 'SQL / MongoDB',
    icon: (
      <img src="./images/mongodb.svg" alt="MongoDB" className="w-10 h-10" />
    ),
    category: 'backend'
  },
];

// Content Dictionary
export const CONTENT = {
  es: {
    nav: {
      home: 'Inicio',
      skills: 'Habilidades',
      experience: 'Experiencia',
      projects: 'Proyectos',
      contact: 'Contacto',
      toggleTheme: ['Cambiar a Claro', 'Cambiar a Oscuro'],
    },
    hero: {
      badge: 'Disponible para trabajar',
      greeting: 'Hola, soy',
      role: 'Desarrollador Full Stack',
      roleSuffix: '',
      description: 'Apasionado por el código y la arquitectura de software. Transformo ideas en soluciones web reales utilizando React, Laravel y Python. Enfocado en crear aplicaciones escalables y de alto rendimiento.',
      btnProjects: 'Ver Proyectos',
      btnCv: 'Descargar CV',
      codeWindow: {
        devClass: 'Desarrollador',
        passion: 'pasion',
        method: 'programar',
        comment: '// Creando soluciones robustas',
        return: 'Innovacion'
      }
    },
    skills: {
      title: 'Habilidades',
      subtitle: 'Tecnologías que utilizo.',
    },
    experience: {
      title: 'Experiencia',
      subtitle: 'Formación sólida y experiencia práctica.',
      workTitle: 'Experiencia Profesional',
      eduTitle: 'Formación Académica',
      softSkillsTitle: 'Enfoque Profesional',
      softSkillsDesc: 'Mi compromiso y capacidad de aprendizaje son absolutos. Me adapto rápido a nuevos entornos y siempre busco la excelencia técnica y las mejores prácticas en cada línea de código.',
      list: [
        {
          id: 1,
          title: "Desarrollador Full Stack (FCT Grado Superior)",
          company: "Ideade Pinoso",
          period: "Marzo - Junio (2025)",
          description: "Inmersión profesional en desarrollo web. Contribuí activamente en el desarrollo de backend con PHP y Laravel, además de crear interfaces dinámicas con React. Aplicación de metodologías ágiles y colaboración en proyectos reales.",
          tags: ["PHP", "Laravel", "React", "Desarrollo Web"]
        },
        {
          id: 2,
          title: "Técnico Sistemas y Redes (FCT Grado Medio)",
          company: "Ayuntamiento de Pinoso",
          period: "Marzo - Junio (2023)",
          description: "Soporte técnico y gestión de infraestructura IT. Mantenimiento de CMS (WordPress) y aseguramiento de la conectividad de redes locales en un entorno administrativo.",
          tags: ["WordPress", "Redes", "Hardware", "Soporte IT"]
        }
      ] as ExperienceItem[],
      education: [
        {
          degree: "Curso de especialización de Desarrollo de aplicaciones en lenguaje Python",
          institution: "IES Severo Ochoa (Elche)",
          year: "2025 - 2026"
        },
        {
          degree: "Grado Superior en Desarrollo de Aplicaciones Web (DAW)",
          institution: "IES Enric Valor (Monóvar)",
          year: "2023 - 2025"
        },
        {
          degree: "Grado Medio en Sistemas Microinformáticos y Redes (SMR)",
          institution: "IES Enric Valor (Monóvar)",
          year: "2021 - 2023"
        },
        {
          degree: "Educación Secundaria Obligatoria (ESO)",
          institution: "IES José Marhuenda Prats (Pinoso)",
          year: "2017 - 2021"
        }
      ] as EducationItem[]
    },
    projects: {
      badge: 'Portafolio',
      title: 'Proyectos Destacados',
      subtitle: 'Código que resuelve problemas reales.',
      viewCode: 'Ver Código Fuente',
      list: [
        {
          id: 1,
          title: "StockFlow - Gestión Robótica",
          description: "Sistema integral diseñado para optimizar la gestión de inventario en entornos de robótica. Implementa control de stock en tiempo real y gestión de recursos.",
          tech: ["React", "Laravel", "MySQL", "Tailwind", "API REST"],
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop",
          link: "https://github.com/JesusCaRu/ProyectoFinal"
        }
      ] as Project[]
    },
    contact: {
      title: 'Contacto',
      desc: 'Estoy disponible para nuevas oportunidades profesionales. ¡Hablemos de cómo puedo aportar valor a tu equipo!',
      email: 'Email',
      phone: 'Teléfono',
      location: 'Ubicación',
      availability: 'Disponible para jornada completa',
      form: {
        name: 'Nombre',
        namePlaceholder: 'Tu nombre',
        email: 'Email',
        emailPlaceholder: 'tu@email.com',
        message: 'Mensaje',
        messagePlaceholder: 'Hola Jesús, me gustaría hablar contigo sobre...',
        btnSend: 'Enviar Mensaje'
      }
    },
    footer: 'Jesús Canicio. Hecho con React y Tailwind.',
    ai: {
      initialMessage: '¡Hola! Soy el asistente virtual de este portafolio. Pregúntame sobre la experiencia de Jesús con React, PHP o Laravel.',
      error: 'Hubo un error al conectar con la IA. Inténtalo de nuevo más tarde.',
      placeholder: 'Escribe una pregunta...',
      systemPrompt: `
Eres el asistente virtual del portafolio de Jesús, un Desarrollador Full Stack profesional y apasionado.
Tu objetivo es responder preguntas sobre su perfil profesional en ESPAÑOL.

PERFIL:
- Jesús es un programador competente enfocado en la calidad y la escalabilidad.
- Tiene experiencia práctica reciente en Ideade Pinoso trabajando con stacks modernos.

TECNOLOGÍAS PRINCIPALES:
- Frontend: React, TypeScript, HTML5, CSS3, Tailwind.
- Backend: PHP (Laravel), Python, Java, Docker.
- Bases de Datos: SQL, MongoDB.

EXPERIENCIA DETALLADA:
1. Ideade Pinoso (2025): Desarrollo Full Stack (PHP/Laravel + React) durante sus prácticas del Grado Superior (DAW).
2. Ayuntamiento de Pinoso (2023): Mantenimiento de sistemas, redes y WordPress durante sus prácticas del Grado Medio (SMR) de Marzo a Junio.

EDUCACIÓN:
- Curso de especialización en Desarrollo de aplicaciones en Python (2025-2026) en IES Enric Valor (Monóvar).
- Grado Superior DAW (2023-2025) en IES Enric Valor (Monóvar).
- Grado Medio SMR (2021-2023) en IES Enric Valor (Monóvar).
- ESO (2017-2021) en IES José Marhuenda Prats (Pinoso).

PROYECTO ESTRELLA:
- StockFlow: Un sistema de gestión de inventario para robots. Disponible en GitHub.

Estilo: Profesional, seguro y conciso. Evita usar el término "Junior".
`
    }
  },
  en: {
    nav: {
      home: 'Home',
      skills: 'Skills',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact',
      toggleTheme: ['Switch to Light', 'Switch to Dark'],
    },
    hero: {
      badge: 'Available for hire',
      greeting: "Hi, I'm",
      role: 'Full Stack Developer',
      roleSuffix: '',
      description: 'Passionate about code and software architecture. I transform ideas into real web solutions using React, Laravel, and Python. Focused on building scalable and high-performance applications.',
      btnProjects: 'View Projects',
      btnCv: 'Download CV',
      codeWindow: {
        devClass: 'Developer',
        passion: 'passion',
        method: 'code',
        comment: '// Creating robust solutions',
        return: 'Innovation'
      }
    },
    skills: {
      title: 'Skills',
      subtitle: 'Technologies I use.',
    },
    experience: {
      title: 'Experience',
      subtitle: 'Solid education and practical experience.',
      workTitle: 'Professional Experience',
      eduTitle: 'Education',
      softSkillsTitle: 'Professional Approach',
      softSkillsDesc: 'My commitment and learning capacity are absolute. I adapt quickly to new environments and always strive for technical excellence and best practices in every line of code.',
      list: [
        {
          id: 1,
          title: "Full Stack Developer (Internship)",
          company: "Ideade Pinoso",
          period: "March - June (2025)",
          description: "Professional immersion in web development. Actively contributed to backend development with PHP and Laravel, as well as creating dynamic interfaces with React. Applied agile methodologies and collaborated on real projects.",
          tags: ["PHP", "Laravel", "React", "Web Development"]
        },
        {
          id: 2,
          title: "Systems & Networks Technician (Internship)",
          company: "Pinoso City Hall",
          period: "March - June (2023)",
          description: "Technical support and IT infrastructure management. Maintenance of CMS (WordPress) and ensuring local network connectivity in an administrative environment.",
          tags: ["WordPress", "Networks", "Hardware", "IT Support"]
        }
      ] as ExperienceItem[],
      education: [
        {
          degree: "Specialization Course in Python Application Development",
          institution: "IES Enric Valor (Monóvar)",
          year: "2025 - 2026"
        },
        {
          degree: "Higher Technician in Web Application Development (DAW)",
          institution: "IES Enric Valor (Monóvar)",
          year: "2023 - 2025"
        },
        {
          degree: "Technician in Microcomputer Systems and Networks (SMR)",
          institution: "IES Enric Valor (Monóvar)",
          year: "2021 - 2023"
        },
        {
          degree: "Compulsory Secondary Education (ESO)",
          institution: "IES José Marhuenda Prats (Pinoso)",
          year: "2017 - 2021"
        }
      ] as EducationItem[]
    },
    projects: {
      badge: 'Projects',
      title: 'Featured Projects',
      subtitle: 'Code that solves real problems.',
      viewCode: 'View Source Code',
      list: [
        {
          id: 1,
          title: "StockFlow - Robotic Management",
          description: "Comprehensive system designed to optimize inventory management in robotics environments. Implements real-time stock control and resource management.",
          tech: ["React", "Laravel", "MySQL", "Tailwind", "REST API"],
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop",
          link: "https://github.com/JesusCaRu/ProyectoFinal"
        }
      ] as Project[]
    },
    contact: {
      title: 'Contact',
      desc: 'I am available for new professional opportunities. Let\'s talk about how I can add value to your team!',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      availability: 'Available for full-time',
      form: {
        name: 'Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'you@email.com',
        message: 'Message',
        messagePlaceholder: 'Hi Jesús, I would like to talk to you about...',
        btnSend: 'Send Message'
      }
    },
    footer: 'Jesús Canicio. Made with React and Tailwind.',
    ai: {
      initialMessage: 'Hello! I am the virtual assistant of this portfolio. Ask me about Jesús\' experience with React, PHP, or Laravel.',
      error: 'There was an error connecting to AI. Please try again later.',
      placeholder: 'Type a question...',
      systemPrompt: `
You are the virtual assistant for Jesús's portfolio, a professional and passionate Full Stack Developer.
Your goal is to answer questions about his professional profile in ENGLISH.

PROFILE:
- Jesús is a competent programmer focused on quality and scalability.
- He has recent practical experience at Ideade Pinoso working with modern stacks.

MAIN TECHNOLOGIES:
- Frontend: React, TypeScript, HTML5, CSS3, Tailwind.
- Backend: PHP (Laravel), Python, Java, Docker.
- Databases: SQL, MongoDB.

DETAILED EXPERIENCE:
1. Ideade Pinoso (2025): Full Stack Development (PHP/Laravel + React) during his Higher Degree internship (DAW).
2. Pinoso City Hall (2023): Systems maintenance, networks, and WordPress during his Intermediate Degree internship (SMR) from March to June.

EDUCATION:
- Specialization Course in Python Application Development (2025-2026) at IES Enric Valor (Monóvar).
- Higher Degree DAW (2023-2025) at IES Enric Valor (Monóvar).
- Intermediate Degree SMR (2021-2023) at IES Enric Valor (Monóvar).
- ESO (2017-2021) at IES José Marhuenda Prats (Pinoso).

STAR PROJECT:
- StockFlow: A robot inventory management system. Available on GitHub.

Style: Professional, confident, and concise. Avoid using the term "Junior".
`
    }
  }
};