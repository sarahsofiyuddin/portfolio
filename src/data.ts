/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, TimelineItem, SkillCategory } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'dental-app',
    title: 'Dental Disease Detection & Management Mobile Application',
    timeline: 'October 2024 – July 2025',
    category: 'Software Development & Data Science',
    impact: [
      { label: 'Model Accuracy', value: '87.29%' },
      { label: 'Disease Classes', value: '4 Classes' },
      { label: 'Training Images', value: '2818' },
      { label: 'Platform', value: 'Android Studio' }
    ],
    technologies: ['Java', 'Android Studio', 'TensorFlow Lite', 'Google Firebase', 'Python', 'Deep Learning'],
    achievements: [
      'Applied the SDLC methodology, including requirements analysis, system design, implementation (model integration), testing and validation to develop a deep learning-based Android application. ',
      'Performed data preprocessing on raw image datasets using Python, applying cleaning, transformation and normalization techniques to ensure high-quality data for model training and testing. ',
      'Conducted root cause analysis (RCA) on model prediction errors and performed system testing to identify prediction issues, improve reliability and ensure consistent system performance. '
    ],
    githubUrl: 'https://github.com/sarahsofiyuddin/SmartSmile',
    posterPdfUrl: 'https://drive.google.com/file/d/1sTxQIizPlaudjEkkccWw7f_55l7HTu5Y/preview'
  },
  {
    id: 'adaptability-dashboard',
    title: 'Students’ Online Adaptability Dashboard',
    timeline: 'April 2025 – July 2025',
    category: 'Data Analytics & Business Intelligence',
    impact: [
      { label: 'Dataset Size', value: '1205' },
      { label: 'Adaptability Factors', value: '4 Variables' },
      { label: 'Interactive Filters', value: 'Multi-Dimensional' },
      { label: 'Platform', value: 'Microsoft Power BI' }
    ],
    technologies: ['Microsoft Power BI', 'RapidMiner', 'Microsoft Excel', 'Data Visualization', 'Business Intelligence'],
    achievements: [
    'Cleaned, transformed and modelled raw datasets using RapidMiner, applying data preprocessing and validation techniques to ensure data integrity, consistency and accuracy prior to visualization. ',
    'Developed an interactive Power BI dashboard to present structured insights and support informed decision-making.'
    ],
    posterPdfUrl: 'https://drive.google.com/file/d/1BNV3BT2YPTBTCuPNso8gbYiuqRcBO4EL/preview'
  },
  {
    id: 'wildlife-app',
    title: 'Wildlife Watch Web-Based Application',
    timeline: 'October 2024 – February 2025',
    category: 'Software Development',
    impact: [
      { label: 'Relational Schema Normalization', value: '3NF Compliance' },
      { label: 'Architectural Hierarchy', value: 'MVC Framework' },
      { label: 'Core Modules', value: 'CRUD Operations' },
      { label: 'Programming Paradigm', value: 'Object-Oriented Design' }
    ],
    technologies: ['Java', 'MVC', 'NetBeans', 'MySQL', 'GitHub'],
    achievements: [
      'Developed and tested a Java-based web application for wildlife observation and tracking using OOP principles and the MVC in NetBeans IDE, ensuring correct functionality and structured data handling. ',
      'Utilized GitHub for version control and collaboration, ensuring efficient code management, change management and collaborative development. '
    ],
    githubUrl: 'https://github.com/sarahsofiyuddin/Wildlife-Watch'
  }
];

export const TIMELINE_ITEMS: TimelineItem[] = [
  // EXPERIENCE FIRST (Chronological - PwC is Sep 2025, Permintex is Aug 2022, KABK is Mar 2022)
  {
    id: 'exp-pwc',
    organization: 'PwC Malaysia',
    role: 'IT Risk Assurance – Digital Audit Intern',
    period: 'September 2025 – December 2025',
    highlights: [
      'Performed IT General Control (ITGC) testing across access management, change management and computer operations to evaluate control effectiveness and identify risk exposure within audit engagement.',
      'Analysed and transformed system-generated datasets using Microsoft Excel including advanced formulas (VLOOKUP) and Power Query to identify control exceptions and potential compliance gaps. ',
      'Prepared structured audit documentation and supporting evidence to ensure accuracy, traceability and alignment with professional audit standards.',
    ],
    type: 'experience',
    accent: '#86868B'
  },
  {
    id: 'exp-permintex',
    organization: 'Permintex Furukawa Autoparts Malaysia',
    role: 'Part-Time Operator',
    period: 'August 2022 – October 2022',
    highlights: [
      'Assembled automotive components while ensuring strict adherence to quality standards, emphasizing attention to detail and process accuracy.',
      'Identified minor process issues and collaborated with team members to improve production workflow, enhancing problem-solving and teamwork skills. '
    ],
    type: 'experience',
    accent: '#86868B'
  },
  {
    id: 'exp-kabk',
    organization: 'KABK Construction Sdn Bhd',
    role: 'Civil Engineering Intern',
    period: 'March 2022 – July 2022',
    highlights: [
      'Managed data collection from site inspections and material testing, ensuring accuracy and consistency in the data for subsequent analysis. ',
      'Analysed construction data including project timelines, material costs and labour efficiency and developed AutoCAD drawings to support feasibility evaluation and decision-making on design options. '
    ],
    type: 'experience',
    accent: '#86868B'
  },

  // EDUCATION (UiTM Bachelor is Oct 2022 - Mar 2026, UiTM Diploma is Oct 2019 - Aug 2022)
  {
    id: 'edu-uitm-degree',
    organization: 'Universiti Teknologi MARA (UiTM)',
    role: 'Bachelor of Computer Science (Hons.)',
    period: 'October 2022 – March 2026',
    highlights: [
      'Cumulative Grade Point Average (CGPA): First Class Honours',
      'Specialisation: Big Data Analytics',
    ],
    type: 'education',
    accent: '#86868B'
  },
  {
    id: 'edu-uitm-diploma',
    organization: 'Universiti Teknologi MARA (UiTM)',
    role: 'Diploma in Civil Engineering',
    period: 'October 2019 – August 2022',
    highlights: [
      'Cumulative Grade Point Average (CGPA): Second-Upper Class',
      'MUET Status: Band 4 (Fluent user in English listening, writing, and professional argumentation)',
    ],
    type: 'education',
    accent: '#86868B'
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'SQL', level: 'Advanced', projectsApplied: ['wildlife-app'] },
      { name: 'C++', level: 'Advanced', projectsApplied: [] },
      { name: 'Python', level: 'Intermediate', projectsApplied: ['dental-app'] },
      { name: 'Java', level: 'Intermediate', projectsApplied: ['dental-app', 'wildlife-app'] },
      { name: 'HTML', level: 'Intermediate', projectsApplied: ['wildlife-app'] },
      { name: 'CSS', level: 'Intermediate', projectsApplied: ['wildlife-app'] },
      { name: 'JavaScript', level: 'Intermediate', projectsApplied: ['wildlife-app'] },
      { name: 'PHP', level: 'Beginner', projectsApplied: [] },
      { name: 'XML', level: 'Beginner', projectsApplied: ['dental-app'] },
      { name: 'C#', level: 'Beginner', projectsApplied: [] }
    ]
  },
  {
    title: 'Software & Tools',
    skills: [
      { name: 'Microsoft Word', level: 'Advanced', projectsApplied: ['adaptability-dashboard', 'dental-app'] },
      { name: 'Microsoft Excel', level: 'Advanced', projectsApplied: ['adaptability-dashboard', 'exp-pwc'] },
      { name: 'Microsoft PowerPoint', level: 'Advanced', projectsApplied: ['exp-pwc'] },
      { name: 'Microsoft Power BI', level: 'Advanced', projectsApplied: ['adaptability-dashboard'] },
      { name: 'RapidMiner', level: 'Advanced', projectsApplied: ['adaptability-dashboard'] },
      { name: 'IBM SPSS', level: 'Advanced', projectsApplied: [] },
      { name: 'MySQL', level: 'Advanced', projectsApplied: ['wildlife-app'] },
      { name: 'Oracle', level: 'Advanced', projectsApplied: ['wildlife-app'] },
      { name: 'GitHub', level: 'Advanced', projectsApplied: ['dental-app', 'wildlife-app'] },
      { name: 'XAMPP', level: 'Advanced', projectsApplied: ['wildlife-app'] },
      { name: 'Canva', level: 'Advanced', projectsApplied: ['dental-app', 'adaptability-dashboard','wildlife-app'] },
      { name: 'Android Studio', level: 'Intermediate', projectsApplied: ['dental-app'] },
      { name: 'Google Firebase', level: 'Intermediate', projectsApplied: ['dental-app'] },
      { name: 'Jupyter Notebook', level: 'Intermediate', projectsApplied: ['dental-app'] },
      { name: 'React', level: 'Beginner', projectsApplied: [] },
    ]
  },
  {
    title: 'Personal Skills',
    skills: [
      { name: 'Critical Thinking', level: 'personal', projectsApplied: ['dental-app', 'adaptability-dashboard','wildlife-app', 'exp-pwc', 'exp-permintex'] },
      { name: 'Analytical Thinking', level: 'personal', projectsApplied: ['dental-app', 'adaptability-dashboard','wildlife-app', 'exp-pwc', 'exp-permintex'] },
      { name: 'Problem Solving', level: 'personal', projectsApplied: ['dental-app', 'adaptability-dashboard','wildlife-app', 'exp-pwc', 'exp-permintex'] },
      { name: 'Teamwork', level: 'personal', projectsApplied: ['dental-app', 'adaptability-dashboard','wildlife-app', 'exp-pwc', 'exp-permintex'] },
      { name: 'Communication', level: 'personal', projectsApplied: ['dental-app', 'adaptability-dashboard','wildlife-app', 'exp-pwc', 'exp-permintex'] },
      { name: 'Adaptability', level: 'personal', projectsApplied: ['dental-app', 'adaptability-dashboard','wildlife-app', 'exp-pwc', 'exp-permintex'] },
      { name: 'Leadership', level: 'personal', projectsApplied: ['dental-app', 'adaptability-dashboard','wildlife-app', 'exp-pwc', 'exp-permintex'] },
      { name: 'Time Management', level: 'personal', projectsApplied: ['dental-app', 'adaptability-dashboard','wildlife-app', 'exp-pwc', 'exp-permintex'] }
    ]
  }
];
