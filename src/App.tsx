/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Set page titles dynamically upon startup
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = 'Sarah Syazana | Portfolio';
    }
  }, []);

  const scrollToSection = (id: string) => {
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
    }
  };

  return (
    <>
      {/* 1. Custom Pointer Cursor */}
      <CustomCursor />

      {/* 2. Interactive Preloader Overlay */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* 3. Main Web Application layout */}
      {!isLoading && (
        <motion.div
          id="portfolio-root"
          className="min-h-screen flex flex-col justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Header Sticky Navigation */}
          <Navbar onRequestResume={() => setIsResumeOpen(true)} />

          {/* Main Sections container */}
          <main className="flex-1">
            <Hero
              onContactClick={() => scrollToSection('contact')}
              onProjectsClick={() => scrollToSection('projects')}
              onRequestResume={() => setIsResumeOpen(true)}
            />
            
            <Skills />
            
            <Projects />
            
            <Timeline />
            
            <Contact />
          </main>

          {/* Core Recruiter Resume Request popup dialog */}
          <ResumeModal
            isOpen={isResumeOpen}
            onClose={() => setIsResumeOpen(false)}
          />
        </motion.div>
      )}
    </>
  );
}
