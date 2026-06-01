/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Github, FileText, Calendar, Compass, ArrowRight, Award, BarChart, Database, Activity } from 'lucide-react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import ProjectPosterModal from './ProjectPosterModal';

export default function Projects() {
  const [selectedPosterProject, setSelectedPosterProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#F5F5F7] border-t border-[#E8E8ED]">
      {/* Background soft ambient lighting blobs */}
      <div className="absolute top-[10%] left-[5%] w-80 h-80 bg-indigo-200/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-[40%] right-[3%] w-96 h-96 bg-violet-200/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-80 h-80 bg-emerald-200/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1D1D1F]"
          >
            Featured Projects
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="h-1 w-12 bg-neutral-900 mx-auto rounded-full mt-5"
          />
        </div>

        {/* Project Cards Stack Layout */}
        <div className="space-y-12">
          {PROJECTS.map((project, idx) => {
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="group relative w-full rounded-[2.5rem] bg-white/40 hover:bg-white/60 backdrop-blur-xl border border-white/80 p-8 lg:p-12 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden text-left"
              >
                {/* 3D Glassmorphic Ambient Glow Spot behind card that glows on card hover */}
                <div className={`absolute -right-28 -top-28 w-96 h-96 bg-gradient-to-br ${
                  project.id === 'dental-app' 
                    ? 'from-blue-300/10 to-sky-400/25'
                    : project.id === 'adaptability-dashboard'
                    ? 'from-blue-300/10 to-sky-400/25'
                    : 'from-blue-300/10 to-sky-400/25'
                } rounded-full blur-[80px] group-hover:scale-110 pointer-events-none transition-transform duration-700`} />

                <div className="relative z-10 space-y-6">
                  {/* Case Study Meta row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200/40">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="inline-flex items-center gap-1.5 text-neutral-400 font-mono text-xs font-semibold">
                        <Calendar size={12} />
                        {project.timeline}
                      </span>
                    </div>

                    {/* Category Accent Badge with Soft Hover Glow */}
                    <span className={`px-4 py-1.5 rounded-full border text-xs font-mono font-black tracking-wide uppercase transition-all duration-300 ${
                      project.id === 'dental-app' 
                        ? 'bg-blue-50 text-blue-700 border-blue-200/65 group-hover:bg-blue-100 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                        : project.id === 'adaptability-dashboard'
                        ? 'bg-blue-50 text-blue-700 border-blue-200/65 group-hover:bg-blue-100 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                        : 'bg-blue-50 text-blue-700 border-blue-200/65 group-hover:bg-blue-100 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                    }`}>
                      {project.category || 'Engineering Works'}
                    </span>
                  </div>

                  {/* Title and core description overview */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1D1D1F] tracking-tight leading-tight">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-neutral-500 text-sm sm:text-base leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>

                  {/* 1. Measurable Outcomes and Impacts (Compact Metric bento cards) */}
                  {project.impact && project.impact.length > 0 && (
                    <div className="pt-2">
                      <h4 className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest mb-3.5">
                        Key Metrics:
                      </h4>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                        {project.impact.map((metric, mIdx) => (
                          <div 
                            key={mIdx} 
                            className="bg-white/45 backdrop-blur-xs border border-white/80 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/75 transition-colors duration-300 shadow-3xs"
                          >
                            <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-wide">
                              {metric.label}
                            </span>
                            <span className="text-xs sm:text-sm font-extrabold text-[#1D1D1F] font-mono mt-2.5">
                              {metric.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 2. Key Contributions and achievements checklist */}
                  <div className="space-y-3 pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {project.achievements.map((item, keyIdx) => (
                        <div 
                          key={keyIdx} 
                          className="flex items-start gap-3 bg-[#F5F5F7]/40 hover:bg-[#F5F5F7]/80 hover:border-neutral-200/50 border border-transparent rounded-2xl p-4 transition-all duration-300"
                        >
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            project.id === 'dental-app' 
                              ? 'bg-blue-100 text-blue-700'
                              : project.id === 'adaptability-dashboard'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            <ArrowRight size={11} className="group-hover/item:translate-x-0.5 transition-transform" />
                          </span>
                          <span className="text-[#1D1D1F]/80 text-xs sm:text-sm leading-relaxed font-light">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. Technology stack chips with high contrast layout */}
                  <div className="space-y-3 pt-2 pb-2">
                    <h4 className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                      Skills Applied:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="text-[10px] font-mono font-semibold text-neutral-700 bg-white/50 border border-neutral-200/60 hover:border-[#1D1D1F]/20 hover:text-[#1D1D1F] px-3.5 py-1.5 rounded-full transition-all duration-300 select-none hover:shadow-[0_0_12px_rgba(29,29,31,0.06)] hover:bg-white/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 4. Action links buttons */}
                  <div className="flex flex-wrap items-center gap-3.5 pt-6 border-t border-neutral-200/40 mt-4">
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        referrerPolicy="no-referrer"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#1D1D1F] hover:bg-black text-white text-xs font-bold transition-all duration-300 shadow-3xs"
                      >
                        <Github size={14} />
                        <span>GitHub Repository</span>
                      </motion.a>
                    )}
                    <motion.button
                      onClick={() => setSelectedPosterProject(project)}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#D2D2D7] hover:border-[#1D1D1F] hover:bg-[#F5F5F7] text-[#1D1D1F] text-xs font-bold transition-all duration-300 cursor-pointer shadow-3xs"
                    >
                      <FileText size={14} className="text-neutral-400" />
                      <span>View Technical Poster</span>
                    </motion.button>
                  </div>

                </div>
              </motion.article>
            );
          })}
        </div>

      </div>

      {/* Renders full screen PDF / Poster viewer modal if selected */}
      {selectedPosterProject && (
        <ProjectPosterModal
          project={selectedPosterProject}
          onClose={() => setSelectedPosterProject(null)}
        />
      )}

    </section>
  );
}
