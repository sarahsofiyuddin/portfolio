/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, FileCheck, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onRequestResume: () => void;
}

export default function Navbar({ onRequestResume }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('about');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navMenuItems = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Timeline', id: 'timeline' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Background glow trigger when scrolled down
      setIsScrolled(window.scrollY > 20);

      // Section spy implementation
      const sections = navMenuItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + 120;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(navMenuItems[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const section = document.getElementById(id);
    if (section) {
      const offset = 88; // Height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = section.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  return (
    <header
      id="navbar"
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-[#F5F5F7]/80 backdrop-blur-xl border-b border-[#E8E8ED] shadow-2xs'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo / Personal Brand */}
          <button
            onClick={() => scrollToSection('about')}
            className="flex items-center gap-2.5 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#1D1D1F] flex items-center justify-center text-white font-bold transition-transform duration-300 group-hover:scale-105 shadow-3xs">
              SS
            </div>
            <div>
              <span className="block font-bold text-[#1D1D1F] tracking-tight leading-4">
                Sarah Syazana
              </span>
            </div>
          </button>

          {/* Large Screen Desktop Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#E8E8ED]/50 border border-[#E8E8ED] rounded-full px-1.5 py-1 shadow-2xs backdrop-blur-md">
            {navMenuItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                    active
                      ? 'text-[#1D1D1F]'
                      : 'text-[#86868B] hover:text-[#1D1D1F]'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-white border border-[#E8E8ED] rounded-full -z-10 shadow-3xs"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Quick-Access CTA Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onRequestResume}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#1D1D1F] hover:bg-black text-white text-xs font-bold transition-all duration-300 transform active:scale-98 cursor-pointer group"
            >
              <FileCheck size={14} className="group-hover:translate-x-0.5 transition-transform" />
              <span>Request Resume</span>
            </button>
          </div>

          {/* Mobile Hamburguer Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onRequestResume}
              aria-label="Request Resume Mobile"
              className="p-2 rounded-full bg-[#E8E8ED] text-[#1D1D1F] transition-colors"
            >
              <FileCheck size={16} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-[#1D1D1F] hover:bg-[#E8E8ED] transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation Grid */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#E8E8ED] bg-[#F5F5F7]/98 backdrop-blur-xl overflow-hidden shadow-lg"
          >
            <div className="px-4 py-5 space-y-2.5">
              {navMenuItems.map((item) => {
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                      active
                        ? 'bg-[#E8E8ED] text-[#1D1D1F] border-l-4 border-[#1D1D1F]'
                        : 'text-[#86868B] hover:bg-[#E8E8ED]/50'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="pt-4 border-t border-[#E8E8ED] flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onRequestResume();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#1D1D1F] hover:bg-black text-white text-xs font-bold"
                >
                  <FileCheck size={14} />
                  <span>Request Resume</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
