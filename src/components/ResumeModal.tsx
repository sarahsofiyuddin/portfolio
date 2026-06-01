/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, AlertCircle, Building2, User, Mail, Briefcase, MessageSquare } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    position: '',
    message: ''
  });

  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset form status on reopen
  const handleClose = () => {
    setFormData({
      fullName: '',
      email: '',
      company: '',
      position: '',
      message: ''
    });
    setError('');
    setIsSubmitted(false);
    onClose();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Verification
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.company.trim()) {
      setError('Please provide your corporate name, email address, and company name to route this request.');
      return;
    }

    // Compose prefilled mailto string
    const emailTo = 'sarahsofiyuddin@gmail.com';
    const emailSubject = `Resume Request – Sarah Syazana`;
    const emailBody = `Hello Sarah,

I would like to request a copy of your resume for review. Below are my contact details and the role details:

Full Name: ${formData.fullName}
Email Address: ${formData.email}
Company Name: ${formData.company}
Position Offered: ${formData.position || 'Not specified'}

Message:
${formData.message || 'No additional message.'}

Kind regards,
${formData.fullName}
${formData.company}`;

    // Standard URL query escaping
    const href = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Set submitted animation
    setIsSubmitted(true);

    // Open native client redirect safely
    setTimeout(() => {
      window.location.href = href;
    }, 800);

    // Auto-close modal after success animation completes
    setTimeout(() => {
      handleClose();
    }, 3800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Transparent blur background overlay */}
          <motion.div
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Core Glassmorphism Popup Wrapper */}
          <motion.div
            className="relative w-full max-w-lg bg-white/95 rounded-2xl border border-white p-6 sm:p-8 shadow-2xl relative overflow-hidden text-left"
            initial={{ scale: 0.93, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.93, opacity: 0, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
          >
            {/* Ambient visual gradient decorations */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-violet-400/10 rounded-full blur-2xl" />

            {/* Header controls */}
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4 select-none">
              <h3 className="font-extrabold text-slate-950 text-xl font-sans tracking-tight flex items-center gap-2">
                <span>Request My Resume</span>
              </h3>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                aria-label="Cancel Modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Render Switch depending on state: Success Check vs. Input Form */}
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-4 text-left"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {error && (
                    <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200/50 rounded-xl text-red-700 text-xs font-medium">
                      <AlertCircle size={15} className="shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* 1. Full Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 uppercase tracking-widest font-mono">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Rachel Green"
                        className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-slate-900 placeholder-slate-400 text-sm"
                      />
                    </div>
                  </div>

                  {/* 2. Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-widest font-mono">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. recruiter@company.com"
                        className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-slate-900 placeholder-slate-400 text-sm"
                      />
                    </div>
                  </div>

                  {/* 3. Company */}
                  <div className="space-y-1.5">
                    <label htmlFor="company" className="block text-xs font-bold text-slate-700 uppercase tracking-widest font-mono">
                      Company / Organization *
                    </label>
                    <div className="relative">
                      <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        id="company"
                        type="text"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="e.g. PwC Malaysia"
                        className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-slate-900 placeholder-slate-400 text-sm"
                      />
                    </div>
                  </div>

                  {/* 4. Position */}
                  <div className="space-y-1.5">
                    <label htmlFor="position" className="block text-xs font-bold text-slate-700 uppercase tracking-widest font-mono">
                      Position Offered <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Briefcase size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        id="position"
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        placeholder="e.g. Software Developer"
                        className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-slate-900 placeholder-slate-400 text-sm"
                      />
                    </div>
                  </div>

                  {/* 5. Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-widest font-mono">
                      Short Message <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <MessageSquare size={15} className="absolute left-3.5 top-3 text-slate-400" />
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Introduce your team, project requirements, or details here..."
                        className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-slate-900 placeholder-slate-400 text-sm resize-none"
                      />
                    </div>
                  </div>

                  {/* Footer CTA Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100 select-none">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-violet-500/10 cursor-pointer group"
                    >
                      <Send size={13} className="group-hover:translate-x-0.5 transition-transform" />
                      <span>Send Request</span>
                    </button>
                  </div>

                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className="py-12 text-center space-y-5"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Bouncy glowing success check mark */}
                  <div className="flex justify-center relative justify-center">
                    <motion.div
                      className="absolute w-20 h-20 bg-emerald-100/50 rounded-full blur-xl"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      className="relative text-emerald-500"
                    >
                      <CheckCircle2 size={72} className="drop-shadow-[0_4px_10px_rgba(16,185,129,0.3)]" />
                    </motion.div>
                  </div>

                  <div className="space-y-2 max-w-xs mx-auto">
                    <h4 className="font-extrabold text-slate-900 text-lg tracking-tight font-sans">
                      Request Routed!
                    </h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-sans font-normal">
                      Excellent. We are triggering your professional email client with details formatted for Sarah. Thank you!
                    </p>
                  </div>

                  <div className="pt-4 flex justify-center">
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider">
                      <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-ping" />
                      Auto-returning shortly...
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
