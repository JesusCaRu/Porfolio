import React from 'react';

export type Language = 'es' | 'en';

export interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
  location?: string;
  roleType?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  certificate?: string;
  badge?: string;
  skills?: string[];
}

export interface Skill {
  name: string;
  icon: React.ReactNode;
  category: 'frontend' | 'backend' | 'tools';
  usageHint?: string;
  featured?: boolean;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  link?: string;
  demoLink?: string;
  category: 'fullstack' | 'ml' | 'backend';
  metrics?: string;
  highlights?: string[];
  architecture?: {
    frontend?: string;
    backend?: string;
    database?: string;
    features?: string;
  };
}