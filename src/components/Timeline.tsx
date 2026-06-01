/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Briefcase, GraduationCap, Calendar, Award, Star, ShieldAlert } from 'lucide-react';
import { TIMELINE_ITEMS } from '../data';
import { TimelineItem } from '../types';

export default function Timeline() {
  const experiences = TIMELINE_ITEMS.filter((item) => item.type === 'experience');
  const educations = TIMELINE_ITEMS.filter((item) => item.type === 'education');

  const getTimelineIcon = (role: string) => {
    return <Briefcase className="w-4 h-4" />;
  };

  return (
    <section id="timeline" className="py-24 relative overflow-hidden bg-[#F5F5F7] border-t border-[#E8E8ED]">
      {/* Background vector styling */}
      <div className="absolute top-[40%] left-[-15%] w-96 h-96 bg-indigo-200/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-sky-200/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10 animate-fade-in">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1D1D1F]"
          >
            Experience & Education Timeline
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="h-0.5 w-16 bg-[#1D1D1F] mx-auto rounded-full mt-4"
          />
        </div>

        {/* Unified Two-Column Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-start">
          
          {/* COLUMN 1: EXPERIENCES */}
          <div className="space-y-8 text-left">
            <div className="flex items-center gap-3.5 mb-6 bg-white p-3.5 rounded-2xl border border-[#E8E8ED] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#1D1D1F] text-white flex items-center justify-center font-bold">
                <Briefcase size={18} />
              </div>
              <div>
                <h3 className="font-bold text-[#1D1D1F] text-sm md:text-base leading-tight font-sans">Experience</h3>
                <p className="text-[10px] text-[#86868B] font-mono uppercase tracking-wider">Internship & Professional</p>
              </div>
            </div>

            <div className="relative border-l border-[#E8E8ED] pl-6 sm:pl-8 ml-4 space-y-12">
              {experiences.map((exp, idx) => (
                <motion.article
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative space-y-3"
                >
                  
                  {/* Glowing vertical connector node anchor */}
                  <span className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-7 h-7 rounded-full bg-white border border-[#E8E8ED] flex items-center justify-center text-[#0071E3] shadow-3xs hover:scale-110 hover:border-[#0071E3] transition-transform">
                    {getTimelineIcon(exp.role)}
                  </span>

                  {/* Period tag */}
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#0071E3]">
                    <Calendar size={12} />
                    <span>{exp.period}</span>
                  </div>

                  {/* Core copy */}
                  <div className="glass-panel-card p-6 rounded-2xl text-left transition-all duration-300">
                    <h4 className="font-bold text-[#1D1D1F] text-base font-sans tracking-tight leading-tight">
                      {exp.role}
                    </h4>
                    
                    {/* Organization subtag containing custom corporate accent badge */}
                    <div className="flex items-center gap-2 mt-1 mb-4">
                      <span className="text-xs font-mono font-bold text-[#86868B]">at</span>
                      <span
                        className="text-xs font-bold tracking-tight"
                        style={{ color: exp.accent || '#0071E3' }}
                      >
                        {exp.organization}
                      </span>
                    </div>

                    <ul className="space-y-2 mt-2">
                       {exp.highlights.map((hlt, hIdx) => (
                        <li key={hIdx} className="text-[#86868B] text-xs sm:text-sm leading-relaxed flex items-start gap-2.5 font-light">
                          <span className="w-1.5 h-1.5 bg-[#0071E3] rounded-full shrink-0 mt-2" />
                          <span>{hlt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </motion.article>
              ))}
            </div>
          </div>

          {/* COLUMN 2: ACADEMIC TIMELINE */}
          <div className="space-y-8 text-left">
            <div className="flex items-center gap-3.5 mb-6 bg-white p-3.5 rounded-2xl border border-[#E8E8ED] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#1D1D1F] text-white flex items-center justify-center font-bold">
                <GraduationCap size={18} />
              </div>
              <div>
                <h3 className="font-bold text-[#1D1D1F] text-sm md:text-base leading-tight font-sans">Education Track</h3>
                <p className="text-[10px] text-[#86868B] font-mono uppercase tracking-wider">Qualifications & Certification</p>
              </div>
            </div>

            <div className="relative border-l border-[#E8E8ED] pl-6 sm:pl-8 ml-4 space-y-12">
              {educations.map((edu, idx) => (
                <motion.article
                  key={edu.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative space-y-3"
                >
                  
                  {/* Glowing vertical connector node anchor */}
                  <span className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-7 h-7 rounded-full bg-white border border-[#E8E8ED] flex items-center justify-center text-[#0071E3] shadow-3xs hover:scale-110 hover:border-[#0071E3] transition-transform">
                    <GraduationCap className="w-4 h-4" />
                  </span>

                  {/* Period tag */}
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#0071E3]">
                    <Calendar size={12} />
                    <span>{edu.period}</span>
                  </div>

                  {/* Core copy */}
                  <div className="glass-panel-card p-6 rounded-2xl text-left transition-all duration-300">
                    <h4 className="font-bold text-[#1D1D1F] text-base font-sans tracking-tight leading-tight">
                      {edu.role}
                    </h4>
                    
                    <div className="flex items-center gap-2 mt-1 mb-4">
                      <span className="text-xs font-mono font-bold text-[#86868B]">
                        at
                      </span>

                      <span
                        className="text-xs font-bold tracking-tight"
                        style={{ color: edu.accent || '#0071E3' }}
                      >
                        {edu.organization}
                      </span>
                    </div>

                    <ul className="space-y-2 mt-2">
                      {edu.highlights.map((hlt, hIdx) => {
                        const isCgpa = hlt.includes('CGPA') || hlt.includes('Grade Point');
                        return (
                          <li
                            key={hIdx}
                            className={`text-[#86868B] text-xs sm:text-sm leading-relaxed flex items-start gap-2.5 font-light ${
                              isCgpa ? 'bg-[#E8F3FF] p-2.5 border border-[#B2D7FF] rounded-xl text-[#0071E3] font-semibold' : ''
                            }`}
                          >
                            {isCgpa ? (
                              <Award size={15} className="text-[#0071E3] shrink-0 mt-0.5" />
                            ) : (
                              <span className="w-1.5 h-1.5 bg-[#0071E3] rounded-full shrink-0 mt-2" />
                            )}
                            <span>{hlt}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                </motion.article>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
