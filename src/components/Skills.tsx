/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Wrench, Sparkles, FolderGit, Check } from 'lucide-react';
import { SKILLS_DATA, PROJECTS, TIMELINE_ITEMS} from '../data';
import { SkillCategory } from '../types';

export default function Skills() {
  const [activeTab, setActiveTab] = useState<'all' | 'languages' | 'tools' | 'personal'>('all');
  const [selectedSkill, setSelectedSkill] = useState<{ name: string; projectsApplied: string[] } | null>(null);

  // Parse skill category mapping
  const tabs = [
    { label: 'All Tech & Skills', id: 'all', icon: Sparkles },
    { label: 'Languages', id: 'languages', icon: Brain },
    { label: 'Software & Tools', id: 'tools', icon: Wrench },
    { label: 'Core Personal Strengths', id: 'personal', icon: Sparkles },
  ] as const;

  const getFilteredCategories = (): SkillCategory[] => {
    if (activeTab === 'all') return SKILLS_DATA;
    if (activeTab === 'languages') return [SKILLS_DATA[0]];
    if (activeTab === 'tools') return [SKILLS_DATA[1]];
    if (activeTab === 'personal') return [SKILLS_DATA[2]];
    return SKILLS_DATA;
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Advanced':
        return 'text-emerald-700 bg-emerald-50 border-emerald-100';
      case 'Intermediate':
        return 'text-[#0071E3] bg-[#E8F3FF] border-[#B2D7FF]';
      case 'Beginner':
        return 'text-[#86868B] bg-[#F5F5F7] border-[#E8E8ED]';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200/50';
    }
  };

  const handleSkillClick = (skillName: string, projects: string[]) => {
    // If clicked, toggle selected state
    if (selectedSkill?.name === skillName) {
      setSelectedSkill(null);
    } else {
      setSelectedSkill({ name: skillName, projectsApplied: projects });
    }
  };

  // Find linked project objects based on selected skill
  const linkedProjects = selectedSkill
    ? PROJECTS.filter((proj) => selectedSkill.projectsApplied.includes(proj.id))
    : [];

  const linkedTimelineItems = selectedSkill
  ? TIMELINE_ITEMS.filter((item) =>
      selectedSkill.projectsApplied.includes(item.id)
    )
  : [];

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#F5F5F7] border-t border-[#E8E8ED]">
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-200/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1D1D1F]"
          >
            Technical & Personal Skills
          </motion.h2>

          <p className="text-[#86868B] text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-light"> 
            <span className="block font-semibold text-[#0071E3] mt-1.5"> Click any tagged chip with an active project dot to trace where it was applied!</span>
          </p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="h-0.5 w-16 bg-[#1D1D1F] mx-auto rounded-full mt-4"
          />
        </div>

        {/* Tab Selection Filter Controls */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedSkill(null); // Clear selected connections
                }}
                className={`flex items-center gap-2.5 px-5.5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                  active
                    ? 'bg-[#1D1D1F] border border-[#1D1D1F] text-white shadow-xs'
                    : 'bg-white/60 border border-[#D2D2D7] text-[#86868B] hover:bg-[#E8E8ED] hover:text-[#1D1D1F]'
                }`}
              >
                <Icon size={14} className={active ? 'text-white' : 'text-[#86868B]'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Categories Stack */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* List of Chips Column */}
          <div className={`col-span-1 transition-all duration-500 ${selectedSkill && (linkedProjects.length > 0 || linkedTimelineItems.length > 0) ? 'md:col-span-8' : 'md:col-span-12'}`}>
            <div className="space-y-10">
              {getFilteredCategories().map((cat, catIdx) => (
                <motion.div
                  key={catIdx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: catIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  <h3 className="text-[#1D1D1F] font-bold text-sm font-mono flex items-center gap-2 text-left uppercase tracking-wider pb-2.5 border-b border-[#E8E8ED]">
                    <span className="w-1.5 h-3 bg-[#1D1D1F] rounded-xs" />
                    {cat.title}
                  </h3>

                  <div className="flex flex-wrap gap-3 justify-start">
                    {cat.skills.map((skill, skillIdx) => {
                      const hasProjects = skill.projectsApplied && skill.projectsApplied.length > 0;
                      const isSelected = selectedSkill?.name === skill.name;
                      const lvlColor = getLevelColor(skill.level);

                       return (
                        <motion.button
                          key={skillIdx}
                          onClick={() => handleSkillClick(skill.name, skill.projectsApplied)}
                          className={`group relative flex items-center gap-2.5 pl-4.5 pr-3 py-2 rounded-full transition-all border duration-200 cursor-pointer select-none ${
                            isSelected
                              ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] scale-103 shadow-sm'
                              : 'bg-white border-[#E8E8ED] hover:border-[#86868B] hover:bg-[#F5F5F7]/40 text-[#1D1D1F]'
                          }`}
                          whileHover={{ y: -2 }}
                          transition={{ duration: 0.15 }}
                        >
                          <span className="font-semibold text-xs sm:text-sm pr-1">{skill.name}</span>
                          
                          {/* Competency Level Tag */}
                          {skill.level !== 'personal' && (
                            <span className={`text-[8px] font-bold font-mono uppercase px-2 py-0.5 rounded-full border ${
                              isSelected ? 'bg-[#333333] border-white/25 text-[#F5F5F7]' : lvlColor
                            }`}>
                               {skill.level}
                            </span>
                          )}

                          {/* Applied Indicator Dot */}
                          {hasProjects && (
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              isSelected ? 'bg-white animate-pulse' : 'bg-[#0071E3]/60 group-hover:bg-[#0071E3]'
                            }`} />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Interactive Project Association Drawer (Slide Out) */}
          <AnimatePresence>
            {selectedSkill && (linkedProjects.length > 0 || linkedTimelineItems.length > 0) && (
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 25 }}
                className="col-span-1 md:col-span-4"
              >
                <div className="sticky top-28 bg-white border border-[#E8E8ED] p-6 rounded-2xl shadow-md relative overflow-hidden text-left">
                  <div className="absolute -top-12 -left-12 w-24 h-24 bg-[#0071E3]/5 rounded-full blur-xl" />
                  
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-[#1D1D1F] font-extrabold text-base tracking-tight flex items-center gap-2">
                      <FolderGit className="text-[#0071E3]" size={18} />
                      <span>Skill Traceability</span>
                    </h4>
                    <button
                      onClick={() => setSelectedSkill(null)}
                      className="text-xs font-mono font-medium text-[#86868B] hover:text-[#1D1D1F] cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>

                  <p className="text-xs text-[#86868B] leading-relaxed mb-4">
                    Sarah applied <strong className="text-[#0071E3] font-bold font-mono">{selectedSkill.name}</strong> across academic projects and professional experiences:
                  </p>

                  <div className="space-y-6">

                    {/* PROJECTS */}
                    {linkedProjects.length > 0 && (
                      <div>
                        <div className="mb-3 text-[10px] font-mono uppercase tracking-widest text-[#0071E3]">
                          Projects
                        </div>

                        <div className="space-y-3">
                          {linkedProjects.map((proj, idx) => (
                            <motion.a
                              key={idx}
                              href="#projects"
                              onClick={() => {
                                const el = document.getElementById('projects');
                                if (el) {
                                  el.scrollIntoView({
                                    behavior: 'smooth',
                                  });
                                }
                              }}
                              className="block p-4 rounded-xl bg-[#F5F5F7] border border-[#E8E8ED] hover:border-[#86868B] hover:bg-white transition-all"
                              whileHover={{ x: 5 }}
                            >
                              <h5 className="font-bold text-[#1D1D1F] text-sm mb-1 flex justify-between items-center">
                                <span>{proj.title}</span>
                                <Check
                                  size={14}
                                  className="text-emerald-500 flex-shrink-0"
                                />
                              </h5>

                              <p className="text-[11px] text-[#86868B] line-clamp-2">
                                {proj.overview}
                              </p>

                              <span className="inline-block mt-2 text-[10px] font-mono font-bold text-[#0071E3] uppercase">
                                View Project
                              </span>
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* EXPERIENCE & EDUCATION */}
                    {linkedTimelineItems.length > 0 && (
                      <div>
                        <div className="mb-3 text-[10px] font-mono uppercase tracking-widest text-[#cb4c28]">
                          Experience & Education
                        </div>

                        <div className="space-y-3">
                          {linkedTimelineItems.map((item, idx) => (
                            <motion.a
                              key={idx}
                              href="#experience"
                              onClick={() => {
                                const el = document.getElementById('experience');

                                if (el) {
                                  el.scrollIntoView({
                                    behavior: 'smooth',
                                  });
                                }
                              }}
                              className="block p-4 rounded-xl bg-[#F5F5F7] border border-[#E8E8ED] hover:border-[#86868B] hover:bg-white transition-all"
                              whileHover={{ x: 5 }}
                            >
                              <h5 className="font-bold text-[#1D1D1F] text-sm mb-1 flex justify-between items-center">
                                <span>{item.role}</span>
                                <Check
                                  size={14}
                                  className="text-emerald-500 flex-shrink-0"
                                />
                              </h5>

                              <p className="text-[11px] text-[#86868B]">
                                {item.organization}
                              </p>

                              <p className="text-[10px] text-[#0071E3] font-mono mt-1">
                                {item.period}
                              </p>

                              <span className="inline-block mt-2 text-[10px] font-mono font-bold text-[#cb4c28] uppercase">
                                View Timeline
                              </span>
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
