/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, Minimize2, X, FileText, ExternalLink } from 'lucide-react';
import { Project } from '../types';

interface ProjectPosterModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectPosterModal({ project, onClose }: ProjectPosterModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, onClose]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const pdfUrl = project.posterPdfUrl || '';

  return (
    <AnimatePresence>
      <motion.div
        id="poster-modal-overlay"
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Core Modal Frame */}
        <motion.div
          id="poster-modal-container"
          ref={posterRef}
          className={`bg-slate-900 border border-slate-700/50 rounded-2xl flex flex-col shadow-2xl overflow-hidden transition-all duration-300 ${
            isFullscreen ? 'fixed inset-0 w-full h-full rounded-none border-none' : 'w-full max-w-5xl h-[88vh] relative'
          }`}
          initial={{ scale: 0.96, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 15 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header Controls Bar */}
          <div className="bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-3 select-none">
            
            {/* Title & Technical Metadata */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 bg-violet-950/50 border border-violet-800/40 rounded-lg shrink-0">
                <FileText className="text-violet-400" size={16} />
              </div>
              <div className="text-left min-w-0">
                <h4 className="text-white font-bold text-xs sm:text-sm truncate leading-tight">
                  {project.title}
                </h4>
              </div>
            </div>

            {/* Quick Actions (Full screen, Open New Tab, Close) */}
            <div className="flex items-center gap-2 shrink-0">
              {pdfUrl && (
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600/90 hover:bg-indigo-600 text-white text-[11px] font-bold transition-all shadow-md active:scale-98"
                  title="Open PDF directly in a new window"
                >
                  <ExternalLink size={13} />
                  <span className="hidden sm:inline">Open in New Tab</span>
                </a>
              )}

              <button
                onClick={toggleFullscreen}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg border border-slate-800/80 transition-colors cursor-pointer"
                title={isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
              >
                {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>
              
              <button
                onClick={onClose}
                className="p-1.5 bg-red-950/40 hover:bg-red-900 border border-red-900/40 text-red-400 hover:text-white rounded-lg transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X size={15} />
              </button>
            </div>

          </div>

          {/* IFrame Center Workspace */}
          <div className="flex-1 bg-slate-950 p-4 flex items-center justify-center relative">
            {pdfUrl ? (
              <div className="w-full h-full bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative min-h-[300px]">
                <iframe
                  src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                  className="w-full h-full bg-white border-none block rounded-xl"
                  title={`${project.title} PDF Document`}
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
                <FileText className="text-slate-600 animate-pulse" size={48} />
                <p className="text-slate-400 font-sans text-sm">
                  Document archive is currently unavailable for this project.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
