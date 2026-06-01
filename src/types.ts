/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  overview: string;
  description: string;
  technologies: string[];
  timeline: string;
  achievements: string[];
  githubUrl?: string;
  posterBgColor: string; // for rendering a gorgeous custom visual slide poster
  posterSlides: PosterSlide[];
  posterPdfUrl?: string; // link to user's real PDF project poster
  category?: string;
  status?: string;
  impact?: { label: string; value: string }[];
}

export interface PosterSlide {
  title: string;
  subtitle: string;
  bullets: string[];
  stats?: { label: string; value: string }[];
  accentColor: string;
  visualLayout: 'dashboard' | 'mobile' | 'web' | 'analytics';
}

export interface TimelineItem {
  id: string;
  organization: string;
  role: string;
  period: string;
  highlights: string[];
  type: 'experience' | 'education';
  accent?: string;
  details?: string[];
}

export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    level: 'Advanced' | 'Intermediate' | 'Beginner' | 'personal';
    projectsApplied: string[]; // Project IDs where this skill was used
  }[];
}
