import React, { useState, useEffect } from 'react';
import { Printer, Download, ArrowLeft, Code2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { 
  getTailoredResumeData, 
  downloadLatexFile,
  printLatexResume,
  generateDirectATSResumePdf 
} from '../utils/latexResumeGenerator';

export const StandaloneResumeView = () => {
  const [isExporting, setIsExporting] = useState(false);
  const tailored = getTailoredResumeData();
  const p = portfolioData.identity;
  const edu = portfolioData.education[0];

  const handleDownloadDirectPdf = () => {
    setIsExporting(true);
    const filename = `Ashok_H_Software_Engineer_Resume.pdf`;
    generateDirectATSResumePdf('software', filename);
    setTimeout(() => {
      setIsExporting(false);
    }, 350);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col items-center p-4 sm:p-8">
      {/* Top Floating Action Bar (Hidden when printing) */}
      <div className="w-full max-w-[800px] mb-6 flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl shadow-md border border-slate-200 print:hidden">
        <a 
          href="/"
          className="text-xs font-mono font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </a>

        {/* Verified Resume Badge */}
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-mono text-emerald-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold">Single Source of Truth Resume</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => downloadLatexFile('software')}
            className="px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-mono text-slate-700 flex items-center gap-1.5 cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>.tex File</span>
          </button>
          <button
            onClick={handleDownloadDirectPdf}
            disabled={isExporting}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-mono font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Download className={`w-3.5 h-3.5 ${isExporting ? 'animate-bounce' : ''}`} />
            <span>{isExporting ? 'Generating...' : 'Download ATS PDF'}</span>
          </button>
          <button
            onClick={() => printLatexResume('software')}
            className="p-1.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 transition-all flex items-center justify-center cursor-pointer"
            title="Browser Print Preview"
          >
            <Printer className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Pure White A4 LaTeX Paper Sheet */}
      <div 
        id="standalone-printable-resume"
        className="w-full max-w-[800px] bg-white text-slate-900 shadow-xl rounded-sm p-8 sm:p-12 font-serif border border-slate-200"
        style={{ fontFamily: "'Times New Roman', Times, 'Georgia', serif" }}
      >
        {/* Header */}
        <header className="text-center pb-3 mb-3 border-b-2 border-slate-900">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wider uppercase text-slate-950 mb-1">
            {p.name}
          </h1>
          <div className="text-xs sm:text-sm font-bold uppercase tracking-wide text-slate-800 mb-2">
            {tailored.roleTitle}
          </div>
          <div className="text-xs text-slate-600 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
            <span>{p.location}</span>
            <span>•</span>
            <a href={`mailto:${p.email}`} className="text-blue-700 hover:underline">{p.email}</a>
            <span>•</span>
            <a href={`tel:+919741854203`} className="text-blue-700 hover:underline">{p.phone}</a>
            <span>•</span>
            <a href={p.linkedin} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
              {p.linkedin.replace('https://', '')}
            </a>
            <span>•</span>
            <a href={p.github} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
              {p.github.replace('https://', '')}
            </a>
          </div>
        </header>

        {/* Summary */}
        <section className="mt-4 mb-1">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 border-b border-slate-900 pb-0.5 mb-2">
            Professional Summary
          </h2>
          <p className="text-xs sm:text-[13px] text-slate-800 text-justify leading-relaxed">
            {tailored.summary}
          </p>
        </section>

        {/* Education */}
        <section className="mt-4 mb-1">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 border-b border-slate-900 pb-0.5 mb-2">
            Education
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[13px]">
            <span className="font-bold text-slate-950">{edu.institution}</span>
            <span className="text-slate-600 italic text-xs shrink-0">{edu.location}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[13px] mt-0.5">
            <span className="text-slate-700 italic">
              {edu.degree} (<strong className="text-slate-950 font-semibold">CGPA: 8.76 / 10.0</strong>)
            </span>
            <span className="text-slate-600 italic text-xs shrink-0">{edu.period}</span>
          </div>
        </section>

        {/* Technical Skills */}
        <section className="mt-4 mb-1">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 border-b border-slate-900 pb-0.5 mb-2">
            Technical Skills
          </h2>
          <div className="space-y-1.5 text-xs sm:text-[13px]">
            {tailored.skills.map((s, idx) => (
              <div key={idx} className="flex leading-normal">
                <span className="font-bold min-w-[160px] text-slate-950 shrink-0">{s.label}:</span>
                <span className="text-slate-800">{s.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mt-4 mb-1">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 border-b border-slate-900 pb-0.5 mb-2">
            Professional Experience
          </h2>
          <div className="space-y-3.5">
            {tailored.experience.map((exp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[13px]">
                  <div className="font-bold text-slate-950">
                    {exp.role} <span className="font-normal italic text-slate-700">— {exp.company}</span>
                  </div>
                  <div className="text-slate-600 italic text-xs shrink-0">
                    {exp.period} • {exp.location}
                  </div>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-1.5 text-xs sm:text-[12.5px] leading-relaxed text-slate-800">
                  {exp.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mt-4 mb-1">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 border-b border-slate-900 pb-0.5 mb-2">
            Projects
          </h2>
          <div className="space-y-3">
            {tailored.projects.map((proj, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[13px]">
                  <div className="font-bold text-slate-950">
                    {proj.title}
                  </div>
                  <div className="text-slate-600 italic text-xs">
                    {proj.tech}
                  </div>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-1.5 text-xs sm:text-[12.5px] leading-relaxed text-slate-800">
                  {proj.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Awards & Achievements */}
        {tailored.awardsAndAchievements && tailored.awardsAndAchievements.length > 0 && (
          <section className="mt-4 mb-1">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 border-b border-slate-900 pb-0.5 mb-2">
              Awards & Achievements
            </h2>
            <ul className="list-disc list-outside ml-4 space-y-1.5 text-xs sm:text-[12.5px] leading-relaxed text-slate-800">
              {tailored.awardsAndAchievements.map((award, aIdx) => (
                <li key={aIdx}>{award}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};
