/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { Github, Linkedin, Mail, ArrowRight, FileText, GraduationCap } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import sarahProfilePhoto from '../assets/images/profile.png';

// Highly detailed physical 2D/3D Lanyard Card with drag-to-swing and cursor relative tilt
function LanyardCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track continuous position using motion values for the lanyard's dynamic anchor center
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Smooth springs with realistic inertia coefficients
  const springX = useSpring(dragX, { stiffness: 100, damping: 14 });
  const springY = useSpring(dragY, { stiffness: 100, damping: 14 });

  // Custom states for hovering/tilting when not dragging
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Dynamic rotations bound to the actual coordinates
  // When dragging, Z-axis swings depending on X speed displacement
  const rotateZ = useTransform(springX, [-150, 150], [-25, 25]);
  
  // Create beautiful curve path of the lanyard strap linked dynamically to physical position of badge hanger
  const strapPath = useTransform([springX, springY], ([xVal, yVal]) => {
    // Canvas middle is at X=162.5 (325px wide container). Anchor of strap top is top center (162.5, 0).
    // The connector ring is on the card around (162.5 + xVal, 110 + yVal)
    const cardClipX = 162.5 + (xVal as number) * 0.9;
    const cardClipY = 110 + (yVal as number) * 0.9;
    
    // Smooth bezier curve representing hanging fabric or ribbon
    return `M 162.5 0 C 162.5 45, ${cardClipX} 50, ${cardClipX} ${cardClipY}`;
  });

  // Track cursor tilt coordinates relative to the card dimensions when not dragging
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalised relative coordinates (-1 to 1) multiplied by max tilt angle
    const tiltX = ((e.clientY - centerY) / (rect.height / 2)) * 14;
    const tiltY = -((e.clientX - centerX) / (rect.width / 2)) * 14;
    
    setRotateX(tiltX);
    setRotateY(tiltY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-[325px] h-[480px] flex flex-col items-center justify-end select-none cursor-grab active:cursor-grabbing"
      style={{ perspective: '1200px' }}
    >
      {/* 1. LANYARD STRAP: Render natural gravity strap curvature */}
      <svg
        className="absolute inset-0 w-full h-[120px] pointer-events-none z-10"
        viewBox="0 0 325 120"
        fill="none"
      >
        {/* Under strap shadow line */}
        <motion.path
          d={strapPath}
          stroke="#000000"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.12"
          style={{ translateZ: '-10px' }}
        />
        {/* Main luxury woven strap */}
        <motion.path
          d={strapPath}
          stroke="#1D1D1F"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        {/* High-contrast silver stitching inside strap for supreme visual premium Apple event vibe */}
        <motion.path
          d={strapPath}
          stroke="#8E8E93"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="4 3"
          opacity="0.8"
        />
      </svg>

      {/* 2. THE METAL SECURITY CLIP: Sandwiched connector hanger */}
      <motion.div
        className="absolute w-5 h-8 bg-gradient-to-b from-zinc-300 to-zinc-600 rounded-b-md border border-neutral-300 shadow-xs z-20"
        style={{
          x: springX,
          y: useTransform(springY, (y) => (y as number) * 0.95),
          rotate: rotateZ,
          top: '102px',
          transformOrigin: 'top center',
        }}
      >
        {/* Brass rivets details */}
        <div className="absolute top-1 left-1.5 w-2 h-2 rounded-full bg-zinc-400 border border-zinc-200/50" />
        <div className="absolute top-4 left-1.5 w-2.5 h-1 bg-zinc-800 rounded-[1px]" />
      </motion.div>

      {/* 3. PHYSICAL ID PORTFOLIO BADGE (Sleek Apple Space Gray Aluminum Panel with Chrome Accents) */}
      <motion.div
        drag
        dragElastic={0.7}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragTransition={{ bounceStiffness: 140, bounceDamping: 10 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        style={{
          x: springX,
          y: springY,
          rotateX: isDragging ? 0 : rotateX,
          rotateY: isDragging ? 0 : rotateY,
          rotateZ: rotateZ,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered && !isDragging ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-[290px] h-[375px] rounded-[2rem] bg-gradient-to-b from-[#1D1D1F] to-[#0A0A0B] border border-neutral-800 p-5.5 shadow-md relative overflow-hidden text-left flex flex-col justify-between"
      >
        {/* Inner Card Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] select-none pointer-events-none bg-[radial-gradient(#FFF_1px,transparent_1px)] [background-size:12px_12px]" />

        {/* Lanyard card slot hanger hole cutout */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-8 h-2.5 rounded-full bg-black border-2 border-neutral-800 shadow-inner opacity-90" />

        {/* Dynamic glossy holographic foil overlay */}
        <motion.div
          className="absolute inset-x-0 -top-40 -bottom-40 bg-gradient-to-tr from-transparent via-white/8 to-transparent pointer-events-none"
          style={{
            rotate: useTransform(springX, [-100, 100], [-30, 30]),
            x: useTransform(springX, [-100, 100], [-50, 50]),
          }}
        />

        {/* Top container representing high-contrast White ceramic insert card */}
        <div className="bg-white rounded-2xl p-4.5 shadow-xs border border-white/90 space-y-4.5 mt-2">
          
          {/* Executive Row */}
          <div className="flex items-center justify-between">
            {/* Elegant physical micro chip representation */}
            <div className="relative w-8 h-6.5 rounded-md bg-gradient-to-tr from-[#E8E8ED] to-white border border-[#D2D2D7] flex items-center justify-center p-0.5">
              <div className="w-full h-full border border-neutral-300 rounded-xs grid grid-cols-3 gap-0.5 pointer-events-none">
                <div className="border-r border-b border-neutral-300" />
                <div className="border-r border-b border-neutral-300" />
                <div className="border-b border-neutral-300" />
                <div className="border-r border-neutral-300" />
                <div className="border-r border-neutral-300" />
                <div className="bg-neutral-100" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              
              <span className="text-[7px] uppercase font-mono tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-100 font-extrabold px-2.5 py-0.5 rounded-full">
                ACTIVE
              </span>
            </div>
          </div>

          <div className="flex gap-4 items-start text-left">
            <div className="space-y-1.5 flex-1 min-w-0">
              <h3 className="text-sm font-bold text-[#1D1D1F] tracking-tight leading-tight">
                Sarah Syazana
              </h3>
              <p className="text-[#86868B] text-[9.5px] font-light leading-relaxed">
                Bachelor of Computer Science (Hons.)
              </p>
            </div>

            {/* Profile Photo Element */}
            <div className="relative w-15 h-15 rounded-xl border border-neutral-200 overflow-hidden bg-neutral-50 flex-shrink-0 shadow-3xs group/photo mt-0.5">
              <img
                src={sarahProfilePhoto}
                alt="Sarah Syazana"
                className="w-full h-full object-cover transition-transform duration-300 group-hover/photo:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 border border-black/5 rounded-xl pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Bottom stats inside the luxury block */}
        <div className="mt-4 px-1 flex items-end justify-between text-white pb-1">
          <div>
            <span className="block text-[7.5px] font-mono tracking-widest uppercase text-neutral-400 font-semibold">ROLE</span>
            <span className="text-sm font-extrabold font-mono tracking-tight text-white block leading-none mt-1">ENTRY-LEVEL</span>
          </div>

          {/* Hologram Circle Badge reflection element (Apple Tech security seal layout) */}
          <div className="relative w-7 h-7 rounded-full bg-gradient-to-tr from-[#0071E3] via-[#8625FF] to-[#FF2F92] border border-white/10 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 uppercase font-mono text-[4px] tracking-tighter text-white/50 flex items-center justify-center animate-spin" style={{ animationDuration: '10s' }}>
              UIT•SECURE•UIT•SECURE
            </div>
            <div className="w-2 h-2 rounded-full bg-white/40 blur-xs" />
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold text-white block leading-none mt-1">KEDAH, MY</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface HeroProps {
  onContactClick: () => void;
  onProjectsClick: () => void;
  onRequestResume: () => void;
}

export default function Hero({ onContactClick, onProjectsClick, onRequestResume }: HeroProps) {
  return (
    <section
      id="about"
      className="relative min-h-screen pt-36 pb-24 flex flex-col justify-center overflow-hidden bg-[#F5F5F7]"
    >
      {/* Decorative luxury-tint ambient glowing backdrops representing Apple-like simplicity (iOS/macOS modern aura) */}
      <div className="absolute top-[8%] left-[5%] w-[450px] h-[450px] bg-indigo-200/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[2%] w-[550px] h-[550px] bg-sky-200/10 rounded-full blur-[160px] pointer-events-none" />
      
      {/* Exquisite hairline matrix pattern for a premium engineered vibe */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1D1D1F_1.5px,transparent_1.5px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10 w-full space-y-24">
        
        {/* ================= STAGE 1: HERO TOP FOLD ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Introduction Row (7 cols) */}
          <div className="col-span-1 lg:col-span-8 space-y-8 text-left">
            
            {/* Minimalist Tech badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8E8ED] border border-[#D2D2D7] text-[#1D1D1F] text-[10px] font-semibold tracking-widest font-mono uppercase shadow-3xs"
            >
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span>Available for Software & Data Roles</span>
            </motion.div>

            {/* Premium Typography Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#1D1D1F]"
              >
                Hi, I'm <br />
                <span className="font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#1D1D1F] via-[#0071E3] to-[#8625FF]">
                  Sarah Syazana
                </span>
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm md:text-base font-mono font-semibold text-[#86868B] flex flex-wrap items-center gap-3"
              >
                <span>Computer Science Graduate</span>
                <span className="text-[#D2D2D7]">•</span>
                <span>Big Data Analytics Specialist</span>
              </motion.h2>
            </div>

            {/* Apple style high-converting pitch sentence */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-[#86868B] text-base md:text-lg leading-relaxed max-w-3xl font-light"
            >
              I bridge software engineering precision with predictive deep learning models to synthesize complex datasets into secure digital pipelines. My domain experience spans full-stack software development, bespoke AI integration, data analytics and IT Audit.
            </motion.p>

            {/* Premium Action Keys */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <button
                onClick={onProjectsClick}
                className="flex items-center gap-2.5 px-6.5 py-3 rounded-full bg-[#1D1D1F] hover:bg-black text-white font-bold text-xs transition-all duration-300 transform active:scale-98 cursor-pointer group"
              >
                <span>View My Work</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-white/80" />
              </button>

              <button
                onClick={onContactClick}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#E8E8ED] hover:bg-[#D2D2D7] text-[#1D1D1F] font-bold text-xs transition-all duration-300 cursor-pointer border border-[#D2D2D7]"
              >
                <span>Contact Me</span>
              </button>

              <button
                onClick={onRequestResume}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-[#D2D2D7] hover:bg-[#F5F5F7] text-[#0071E3] font-bold text-xs transition-all duration-300 cursor-pointer"
              >
                <FileText size={14} />
                <span>Request Resume</span>
              </button>
            </motion.div>

            {/* Solid minimalistic links line */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-5 pt-8 border-t border-[#E8E8ED]"
            >
              <span className="text-[10px] font-mono font-bold text-[#86868B] uppercase tracking-widest">
                Connect:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/sarahsofiyuddin"
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full bg-[#E8E8ED] border border-[#D2D2D7] flex items-center justify-center text-[#1D1D1F] hover:text-black hover:border-black hover:bg-white shadow-3xs transition-all duration-300 hover:scale-105"
                  aria-label="GitHub"
                >
                  <Github size={16} />
                </a>
                <a
                  href="https://linkedin.com/in/sarahsyazana"
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full bg-[#E8E8ED] border border-[#D2D2D7] flex items-center justify-center text-[#1D1D1F] hover:text-[#0071E3] hover:border-[#0071E3] hover:bg-white shadow-3xs transition-all duration-300 hover:scale-105"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href="mailto:sarahsofiyuddin@gmail.com"
                  className="w-10 h-10 rounded-full bg-[#E8E8ED] border border-[#D2D2D7] flex items-center justify-center text-[#1D1D1F] hover:text-[#0071E3] hover:border-[#0071E3] hover:bg-white shadow-3xs transition-all duration-300 hover:scale-105"
                  aria-label="Email"
                >
                  <Mail size={16} />
                </a>
              </div>
            </motion.div>

          </div>

          {/* Right Visual interactive card (4 cols) with physical Lanyard simulation */}
          <div className="col-span-1 lg:col-span-4 flex items-center justify-center relative mt-8 lg:mt-0 min-h-[500px]">
            <LanyardCard />
          </div>

        </div>

      </div>
    </section>
  );
}
