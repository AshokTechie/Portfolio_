import React, { useState } from 'react';
import { FileText, Download, Code2, Copy, X, Check, ExternalLink, Sparkles, Printer, CheckCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { 
  getTailoredResumeData, 
  downloadLatexFile, 
  generatePlaintextATS,
  printLatexResume,
  generateDirectATSResumePdf
} from '../utils/latexResumeGenerator';

export const ResumeDrawerModal = ({ isOpen, onClose, onDownloadToast }) => {
  const [hasCopied, setHasCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const d = getTailoredResumeData();

  const handleCopyPlaintext = () => {
    sound.playClick();
    const text = generatePlaintextATS();
    navigator.clipboard.writeText(text);
    setHasCopied(true);
    onDownloadToast?.('Copied ATS plain text to clipboard!');
    setTimeout(() => setHasCopied(false), 2000);
  };

  const handleDownloadLatex = () => {
    sound.playSuccess();
    downloadLatexFile();
    onDownloadToast?.('Downloaded Overleaf .tex template for Ashok H Software Engineer Resume!');
  };

  const handleDownloadDirectPdf = () => {
    sound.playSuccess();
    setIsExporting(true);
    onDownloadToast?.('Generating 1-Page ATS PDF directly...');
    
    const filename = `Ashok_H_Software_Engineer_Resume.pdf`;
    generateDirectATSResumePdf(filename);
    
    setTimeout(() => {
      setIsExporting(false);
      onDownloadToast?.(`Downloaded ${filename} to your Downloads folder!`);
    }, 350);
  };

  const handlePrintPdf = () => {
    sound.playClick();
    onDownloadToast?.('Opening print preview...');
    printLatexResume();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-obsidian-950/90 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-4xl h-[92vh] max-h-[900px] glass-panel-elevated rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Control Bar */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-obsidian-900/90 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-violet-500/15 border border-violet-500/30 text-violet-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm sm:text-base text-slate-100">
                  Ashok H — Software Engineer Resume
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Single Source of Truth
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono hidden sm:block">
                Exact resume • ConnectSecure • 8.76 CGPA • Overleaf compatible • Single-page ATS standard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyPlaintext}
              className="px-3 py-1.5 rounded-xl border border-white/10 hover:bg-white/5 text-xs font-mono text-slate-300 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Copy ATS plaintext for job applications"
            >
              {hasCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span className="hidden sm:inline">{hasCopied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handleDownloadLatex}
              className="px-3 py-1.5 rounded-xl bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/30 text-xs font-mono text-violet-200 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Download raw .tex file for Overleaf"
            >
              <Code2 className="w-3.5 h-3.5 text-violet-400" />
              <span>Download .tex</span>
            </button>

            <button
              onClick={handleDownloadDirectPdf}
              disabled={isExporting}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:brightness-110 disabled:opacity-50 text-white text-xs font-semibold font-mono transition-all shadow-glow-cyan flex items-center gap-1.5 cursor-pointer"
              title="Direct download 1-Page ATS PDF"
            >
              <Download className={`w-3.5 h-3.5 ${isExporting ? 'animate-bounce' : ''}`} />
              <span>{isExporting ? 'Generating PDF...' : 'Download PDF'}</span>
            </button>

            <button
              onClick={handlePrintPdf}
              className="p-1.5 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 transition-all flex items-center justify-center cursor-pointer"
              title="Browser Print Preview (Ctrl+P)"
            >
              <Printer className="w-4 h-4 text-slate-400 hover:text-slate-200" />
            </button>

            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live LaTeX ATS Paper Preview Canvas */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-obsidian-950 flex justify-center items-start">
          <div 
            id="printable-ats-resume"
            className="w-full max-w-[800px] bg-white text-slate-900 shadow-2xl rounded-sm p-8 sm:p-12 font-serif border border-slate-200"
            style={{ fontFamily: "'Times New Roman', 'Georgia', serif" }}
          >
            {/* Header */}
            <header className="text-center pb-3 mb-2 border-b-2 border-slate-900">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-wider text-slate-950 mb-1">
                {d.name}
              </h1>
              <div className="text-xs text-slate-700 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                <span>{d.phone}</span>
                <span>•</span>
                <a href={`mailto:${d.email}`} className="text-blue-700 hover:underline">{d.email}</a>
                <span>•</span>
                <a href={`https://linkedin.com/in/${d.linkedin}`} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                  {d.linkedin}
                </a>
                <span>•</span>
                <a href={`https://github.com/${d.github}`} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                  {d.github}
                </a>
                <span>•</span>
                <span>{d.location}</span>
              </div>
            </header>

            {/* Professional Summary */}
            <section className="mt-3 mb-1">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 border-b border-slate-900 pb-0.5 mb-1.5">
                Professional Summary
              </h2>
              <p className="text-xs sm:text-[12.5px] text-slate-800 text-justify leading-relaxed">
                {d.summary}
              </p>
            </section>

            {/* Work Experience */}
            <section className="mt-3 mb-1">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 border-b border-slate-900 pb-0.5 mb-1.5">
                Work Experience
              </h2>
              {d.experience.map((exp, idx) => (
                <div key={idx} className="space-y-1 mb-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[13px]">
                    <div className="font-bold text-slate-950">
                      {exp.role} <span className="font-normal text-slate-700">| {exp.employmentType}</span>
                    </div>
                    <div className="text-slate-600 text-xs shrink-0">
                      {exp.period}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[12.5px] text-slate-700">
                    <span className="italic">{exp.company}</span>
                    <span className="text-xs shrink-0">{exp.location}</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-xs sm:text-[12px] leading-relaxed text-slate-800">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                  <p className="text-xs sm:text-[11.5px] text-slate-900 pt-1">
                    <strong>Technologies / Skills Used :</strong> {exp.technologies}
                  </p>
                </div>
              ))}
            </section>

            {/* Education */}
            <section className="mt-3 mb-1">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 border-b border-slate-900 pb-0.5 mb-1.5">
                Education
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[13px]">
                <span className="font-bold text-slate-950">{d.education.institution}</span>
                <span className="text-slate-600 text-xs shrink-0">{d.education.period}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[12.5px] mt-0.5">
                <span className="text-slate-700 italic">
                  {d.education.degree}
                </span>
                <span className="font-bold text-slate-950 text-xs shrink-0">CGPA : {d.education.cgpa}</span>
              </div>
            </section>

            {/* Projects */}
            <section className="mt-3 mb-1">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 border-b border-slate-900 pb-0.5 mb-1.5">
                Projects
              </h2>
              <div className="space-y-2.5">
                {d.projects.map((proj, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="font-bold text-slate-950 text-xs sm:text-[13px]">
                      {proj.title}
                    </div>
                    <div className="text-slate-600 italic text-xs">
                      {proj.role}
                    </div>
                    <ul className="list-disc list-outside ml-4 space-y-1 text-xs sm:text-[12px] leading-relaxed text-slate-800">
                      {proj.bullets.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                    <p className="text-xs sm:text-[11.5px] text-slate-900 pt-0.5">
                      <strong>Technologies / Tools Used :</strong> {proj.technologies}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section className="mt-3 mb-1">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 border-b border-slate-900 pb-0.5 mb-1.5">
                Skills
              </h2>
              <div className="space-y-1 text-xs sm:text-[12px]">
                {d.skills.map((s, idx) => (
                  <div key={idx} className="flex leading-normal">
                    <span className="font-bold min-w-[170px] text-slate-950 shrink-0">{s.label} :</span>
                    <span className="text-slate-800">{s.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Awards & Achievements */}
            <section className="mt-3 mb-1">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 border-b border-slate-900 pb-0.5 mb-1.5">
                Awards & Achievements
              </h2>
              <ul className="list-disc list-outside ml-4 text-xs sm:text-[12px] leading-relaxed text-slate-800">
                {d.awardsAndAchievements.map((a, idx) => (
                  <li key={idx}>{a}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-white/5 bg-obsidian-900/70 flex items-center justify-between text-xs font-mono text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Single Source of Truth • Verified Candidate Data</span>
          </div>
          <div className="text-[11px] text-slate-500 hidden sm:block">
            Overleaf Ready • Zero Extraneous Content
          </div>
        </div>
      </div>
    </div>
  );
};
