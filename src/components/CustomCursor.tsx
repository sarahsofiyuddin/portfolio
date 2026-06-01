/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Use motion values with spring physics for butter-smooth Apple-style lagging movement
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 320, mass: 0.55 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Exclude mobile and tablet touch devices
    if (typeof window !== 'undefined') {
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      if (isTouch) return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        // Elements that trigger custom hover expansions
        const checkInteractive = (el: HTMLElement | null): boolean => {
          if (!el) return false;
          const tag = el.tagName.toLowerCase();
          const role = el.getAttribute('role');
          const hasHoverClass = el.className && typeof el.className === 'string' && el.className.includes('hover:');
          const isInteractive = 
            tag === 'a' || 
            tag === 'button' || 
            tag === 'input' || 
            tag === 'textarea' || 
            tag === 'select' ||
            role === 'button' ||
            el.hasAttribute('onclick') ||
            hasHoverClass;
          
          if (isInteractive) return true;
          return checkInteractive(el.parentElement);
        };

        if (checkInteractive(target)) {
          setIsHovered(true);
        } else {
          setIsHovered(false);
        }
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleOver);
    };
  }, [isVisible, cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Apple Outer Fluid Capsule / Drag Ring with Backdrop Blur */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 border border-neutral-900/10 bg-neutral-900/6 backdrop-blur-[1px] flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          width: '20px',
          height: '20px',
        }}
        animate={{
          scale: isHovered ? 2.5 : 1,
          backgroundColor: isHovered ? 'rgba(17, 17, 17, 0.08)' : 'rgba(17, 17, 17, 0.06)',
          borderColor: isHovered ? 'rgba(17, 17, 17, 0.15)' : 'rgba(17, 17, 17, 0.10)',
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      />

      {/* Apple Precision Core Dot - fades out elegantly when outer container takes prominence on interactive items */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#111111] rounded-full pointer-events-none z-50"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
