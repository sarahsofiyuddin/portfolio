/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal, Activity } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LOADING_MESSAGES = [
  'Loading portfolio...',
  'Initializing projects...',
  'Connecting data sources...',
  'Building experiences...',
  'Preparing dashboards...',
  'Loading AI models...'
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Cycle through messages
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 450);

    return () => clearInterval(messageInterval);
  }, []);

  // Increment progress bar smoothly
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Wait briefly, then trigger fadeout
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              onComplete();
            }, 600); // Wait for the fadeout animation to complete
          }, 350);
          return 100;
        }
        // Increment exponentially fast first, then slow down near 100
        const remaining = 100 - prev;
        const step = Math.max(1, Math.min(15, Math.floor(remaining * 0.15 + Math.random() * 5)));
        return prev + step;
      });
    }, 120);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          id="loading-screen"
          className="fixed inset-0 bg-[#F5F5F7] flex flex-col items-center justify-center z-50 px-4 select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Subtle background ambient soft lighting representing Apple-like simplicity (iOS/macOS modern aurora) */}
          <div className="absolute top-[25%] left-[15%] w-80 h-80 bg-indigo-200/25 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[25%] right-[15%] w-96 h-96 bg-sky-200/20 rounded-full blur-[140px] pointer-events-none" />

          {/* Core Sleek Card Container (Cupertino frosted glass card style) */}
          <motion.div
            className="w-full max-w-sm bg-white/80 border border-[#E8E8ED] backdrop-blur-xl p-8 rounded-[2rem] shadow-xl shadow-black/5 relative overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Elegant Cupertino-style Squircle Logo Icon */}
            <div className="flex flex-col items-center mb-7 text-center space-y-3">
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-b from-[#1D1D1F] to-[#0A0A0B] flex items-center justify-center text-white font-extrabold text-base border border-neutral-800 shadow-md overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                <span className="relative tracking-wider">SS</span>
              </div>
              <div className="space-y-0.5">
                <h3 className="text-[#1D1D1F] font-extrabold font-sans text-sm tracking-tight">
                  Sarah Syazana
                </h3>
              </div>
            </div>

            {/* Display rotating messages */}
            <div className="h-6 overflow-hidden mb-4 relative flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={msgIndex}
                  className="font-mono text-[10px] text-[#86868B] tracking-wider uppercase font-semibold flex items-center gap-1.5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {LOADING_MESSAGES[msgIndex]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Micro Progress Bar Container */}
            <div className="w-full h-1 bg-[#E8E8ED] rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-[#1D1D1F] rounded-full"
                style={{ width: `${progress}%` }}
                layoutId="progressBar"
                transition={{ type: 'spring', stiffness: 50, damping: 15 }}
              />
            </div>

            {/* Elegant bottom label */}
            <div className="mt-6 flex justify-between items-center text-[9px] font-mono text-[#86868B] uppercase tracking-widest font-bold">
              <span>System Initialized</span>
              <span>{progress}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
