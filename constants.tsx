import React from 'react';
import { ExperienceItem, Project, Skill, EducationItem } from './types';

export const PORTFOLIO_OWNER = "Jesús";

// Logos de las habilidades
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

// Diccionario Español - Inglés
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
      description: 'Me apasiona dar vida a ideas a través del código. Construyo aplicaciones web que funcionan bien, se ven mejor y están listas para crecer. Me gusta estar encima de todo el proceso, desde la lógica del servidor hasta que el usuario pulsa un botón.',
      btnProjects: 'Mis Proyectos',
      btnCv: 'Mi Curriculum',
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
      softSkillsTitle: 'Mi enfoque personal',
      softSkillsDesc: 'Soy curioso por naturaleza y me encanta el reto de aprender herramientas nuevas sobre la marcha. Mi prioridad es escribir código que no solo funcione hoy, sino que sea fácil de entender y mejorar mañana.',
      list: [
        {
          id: 1,
          title: "Desarrollador Full Stack (FCT Grado Superior)",
          company: "Ideade Pinoso",
          period: "Marzo - Junio (2025)",
          description: "Trabajé en proyectos reales usando Laravel para la lógica interna y React para las pantallas. Me enfoqué en construir sistemas robustos y colaboré de cerca con el equipo mediante metodologías ágiles para sacar el trabajo adelante.",
          tags: ["PHP", "Laravel", "React", "Desarrollo Web"]
        },
        {
          id: 2,
          title: "Técnico Sistemas y Redes (FCT Grado Medio)",
          company: "Ayuntamiento de Pinoso",
          period: "Marzo - Junio (2023)",
          description: "Estuve al cargo de que la infraestructura tecnológica funcionara sin problemas. Gestioné portales en WordPress, configuré redes locales y solucioné incidencias técnicas para asegurar el ritmo de trabajo de la administración.",
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
      desc: '¿Buscas a alguien que se sume a tu equipo o tienes una idea para un proyecto? Cuéntame un poco más y vemos cómo podemos colaborar.',
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
      },
      feedback: {
        success: '¡Mensaje enviado! Te responderé en cuanto lo lea.',
        error: 'Algo ha fallado al enviar el mensaje. ¿Lo intentas de nuevo?'
      }
    },
    footer: 'Jesús Canicio. Portafolio creado con React y Tailwind.'
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
      description: 'I love bringing ideas to life through code. I build web apps that are fast, reliable, and smooth. My focus is on the whole picture—making sure everything works perfectly from the server logic to what the user sees.',
      btnProjects: 'My Projects',
      btnCv: 'My CV',
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
      softSkillsTitle: 'My personal approach',
      softSkillsDesc: 'I am naturally curious and enjoy the challenge of learning new tech on the fly. I aim for clean code that stays easy to maintain as the projects grow.',
      list: [
        {
          id: 1,
          title: "Full Stack Developer (Internship)",
          company: "Ideade Pinoso",
          period: "March - June (2025)",
          description: "Worked on real-world projects using a modern stack. I focused on building solid server logic with Laravel and high-quality interfaces with React, always following agile methods to stay organized.",
          tags: ["PHP", "Laravel", "React", "Web Development"]
        },
        {
          id: 2,
          title: "Systems & Networks Technician (Internship)",
          company: "Pinoso City Hall",
          period: "March - June (2023)",
          description: "I kept the IT infrastructure up and running. I managed WordPress sites, set up local networks, and fixed technical issues that were critical for day-to-day operations.",
          tags: ["WordPress", "Networks", "Hardware", "IT Support"]
        }
      ] as ExperienceItem[],
      education: [
        {
          degree: "Specialization Course in Python Application Development",
          institution: "IES Severo Ochoa (Elche)",
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
      desc: 'Looking for a new developer for your team or have a project in mind? Drop me a line and let\'s talk!',
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
      },
      feedback: {
        success: 'Message sent! I\'ll get back to you as soon as I can.',
        error: 'Something went wrong. Could you try sending it again?'
      }
    },
    footer: 'Jesús Canicio. Made with React and Tailwind.'
  }
};