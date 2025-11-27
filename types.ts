import React from 'react';

export type Language = 'es' | 'en';

export interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
}

export interface Skill {
  name: string;
  icon: React.ReactNode;
  // level removed as requested
  category: 'frontend' | 'backend' | 'tools';
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  link?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}