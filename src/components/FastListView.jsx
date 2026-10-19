import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Printer, 
  Copy, 
  Check, 
  ExternalLink,
  Download,
  BookOpen
} from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { portfolioData } from '../data/portfolioData';
import { CaseStudyModal } from './CaseStudyModal';
import { sound } from '../utils/audio';

export const FastListView = ({ onSwitchToTour, onSwitchToInteractive, onOpenResume }) => {
  const [copied, setCopied] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  const handleCopy = () => {
    sound.playSuccess();
    navigator.clipboard.writeText(portfolioData.identity.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-slate-200 font-sans space-y-12">
      
      {/* Top Bar Switcher (Matching CoderDigvijay) */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-control bg-hero-scrim p-1 ring-1 ring-white/10 shadow-lg">
            <button
              onClick={() => {
                sound.playClick();
                onSwitchToTour?.();
              }}
              className="inline-flex min-h-9 items-center whitespace-nowrap rounded-control px-3.5 text-xs font-bold text-slate-300 hover:text-white transition-colors"
            >
              Tour
            </button>
            <button
              className="inline-flex min-h-9 items-center whitespace-nowrap rounded-control px-3.5 text-xs font-bold text-[#14151f] bg-[#22e6ff] shadow-sm"
            >
              Read as page
            </button>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onSwitchToTour?.();
            }}
            className="text-xs font-mono text-[#22e6ff] hover:underline underline-offset-4 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to the tour</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-control bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-mono text-slate-300 flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print View</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onOpenResume?.();
            }}
            className="px-3.5 py-1.5 rounded-control bg-[#22e6ff] text-[#14151f] font-bold text-xs font-mono hover:bg-[#66b8f8] flex items-center gap-1.5 transition-all shadow-glow-cyan"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Resume</span>
          </button>
        </div>
      </div>

      {/* Header Profile */}
      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          {portfolioData.identity.name}
        </h1>
        <p className="text-base text-cyan-400 font-mono">
          {portfolioData.identity.title} • {portfolioData.identity.currentRole}
        </p>
        <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
          {portfolioData.identity.tagline}
        </p>

        {/* Contact Strip */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2">
          <button onClick={handleCopy} className="hover:text-cyan-300 flex items-center gap-1.5 text-slate-300">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{portfolioData.identity.email}</span>
          </button>
          <span>•</span>
          <a href={`tel:${portfolioData.identity.phone}`} className="hover:text-cyan-300">
            {portfolioData.identity.phone}
          </a>
          <span>•</span>
          <a href={portfolioData.identity.github} target="_blank" rel="noreferrer" className="hover:text-cyan-300 flex items-center gap-1">
            <span>github.com/{portfolioData.identity.githubUsername}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span>•</span>
          <a href={portfolioData.identity.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-300 flex items-center gap-1">
            <span>LinkedIn Profile</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </header>

      {/* Key Metrics Bar */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-white/10 bg-obsidian-900/50 rounded-xl px-4">
        {portfolioData.metrics.map((m, i) => (
          <div key={i} className="text-center sm:text-left">
            <div className="text-2xl font-bold font-mono text-cyan-400">{m.value}</div>
            <div className="text-xs text-slate-300 font-medium">{m.label}</div>
            <div className="text-[10px] text-slate-500 font-mono">{m.subtext}</div>
          </div>
        ))}
      </section>

      {/* Work Experience */}
      <section className="space-y-6">
        <h2 className="text-lg font-bold font-mono text-cyan-400 uppercase tracking-wider border-b border-white/10 pb-2">
          Professional Experience
        </h2>

        <div className="space-y-6">
          {portfolioData.experiences.map((exp) => (
            <div key={exp.id} className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">{exp.role}</h3>
                  <p className="text-sm text-cyan-300 font-mono">{exp.company} • {exp.location}</p>
                </div>
                <div className="text-xs font-mono text-slate-400">{exp.period}</div>
              </div>

              <ul className="list-disc list-outside ml-4 space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {(exp.bullets || []).map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>

              <div className="text-xs font-mono text-slate-400 pt-1">
                <span className="text-slate-500">Skills Used:</span> {exp.technologies.join(' • ')}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flagship Projects */}
      <section className="space-y-6">
        <h2 className="text-lg font-bold font-mono text-cyan-400 uppercase tracking-wider border-b border-white/10 pb-2">
          Selected Engineering Case Studies
        </h2>

        <div className="space-y-6">
          {portfolioData.projects.map((proj) => (
            <div key={proj.id} className="space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <h3 className="text-base font-bold text-white">{proj.title}</h3>
                <span className="text-xs font-mono text-violet-400">{proj.badge}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {proj.summary}
              </p>

              <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-xs font-mono space-y-1 text-slate-300">
                <div><span className="text-red-400">Core Constraint:</span> {proj.problem}</div>
                <div><span className="text-emerald-400">Solution:</span> {proj.solution}</div>
              </div>

              <div className="text-xs font-mono text-slate-400">
                <span className="text-slate-500">Verified Metrics:</span> {proj.metrics.join(' • ')}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="text-xs font-mono text-cyan-400">
                  <span className="text-slate-500">Stack:</span> {proj.techStack.join(' • ')}
                </div>
                <button
                  onClick={() => {
                    sound.playClick();
                    setSelectedCaseStudy(proj);
                  }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-mono transition-all cursor-pointer"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>Deep-Dive Case Study & ADR</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Achievements */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-white/10 pt-6">
        <div className="space-y-3">
          <h2 className="text-sm font-bold font-mono text-cyan-400 uppercase tracking-wider">
            Education
          </h2>
          {portfolioData.education.map((edu, idx) => (
            <div key={idx} className="space-y-1 text-xs">
              <div className="font-bold text-slate-100">{edu.institution}</div>
              <div className="text-slate-300 font-mono">{edu.degree}</div>
              <div className="text-cyan-400 font-mono">{edu.score} • {edu.period}</div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-bold font-mono text-cyan-400 uppercase tracking-wider">
            Key Honors & Achievements
          </h2>
          <ul className="space-y-2 text-xs text-slate-300 list-disc list-outside ml-4">
            {portfolioData.achievements.map((ach, idx) => (
              <li key={idx}>
                <span className="font-semibold text-slate-100">{ach.title}</span> ({ach.year}) — {ach.issuer}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-8 border-t border-white/10 text-center text-xs font-mono text-slate-500">
        Ashok H • Portfolio Executive View • Contact: ashok.anjinappa@campusuvce.in
      </footer>

      {/* Case Study Modal */}
      <CaseStudyModal
        isOpen={!!selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        project={selectedCaseStudy}
      />
    </div>
  );
};
