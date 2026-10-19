import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight, 
  FileText, 
  Sparkles, 
  Bot, 
  Terminal, 
  ExternalLink, 
  Clock, 
  Check, 
  Copy,
  ChevronRight,
  Shield,
  Layers,
  Award,
  BookOpen
} from 'lucide-react';
import { motion } from 'motion/react';
import { Github, Linkedin } from './Icons';
import { portfolioData } from '../data/portfolioData';
import { SystemSimulator } from './SystemSimulator';
import { ProjectVisualPreview } from './ProjectVisualPreview';
import { CaseStudyModal } from './CaseStudyModal';
import { sound } from '../utils/audio';

export const InteractiveView = ({
  onOpenResume,
  onOpenAi,
  onOpenCommand,
  onCopyEmail,
  activeSection,
  setActiveSection,
}) => {
  const [bengaluruTime, setBengaluruTime] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  // Live Bengaluru Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setBengaluruTime(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'metrics', label: 'Impact Metrics' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Case Studies' },
    { id: 'simulator', label: 'Live Sandbox' },
    { id: 'skills', label: 'Tech Arsenal' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollTo = (id) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const handleCopyEmail = () => {
    sound.playSuccess();
    navigator.clipboard.writeText(portfolioData.identity.email);
    setCopiedEmail(true);
    onCopyEmail();
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
      <div className="lg:flex lg:justify-between lg:gap-14">
        
        {/* ======================================================== */}
        {/* LEFT STICKY SIDEBAR (Brittany Chiang style)              */}
        {/* ======================================================== */}
        <header className="lg:sticky lg:top-16 lg:flex lg:max-h-[calc(100vh-8rem)] lg:w-5/12 lg:flex-col lg:justify-between">
          <div className="space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{portfolioData.identity.currentRole}</span>
            </div>

            {/* Title & Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
                {portfolioData.identity.name}
              </h1>
              <h2 className="text-lg sm:text-xl font-medium text-cyan-400 font-mono">
                {portfolioData.identity.title}
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm pt-1">
                {portfolioData.identity.tagline}
              </p>
            </div>

            {/* Live Bengaluru Time Widget */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 max-w-fit">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Bengaluru, IN • {bengaluruTime || '12:45 PM'} IST</span>
            </div>

            {/* Quick Actions (AI Assistant + Resume Drawer) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenAi();
                }}
                className="px-4 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-obsidian-950 text-xs font-bold transition-all shadow-glow-cyan flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-obsidian-950" />
                <span>Ask Ashok AI</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onOpenResume();
                }}
                className="px-4 py-2.5 rounded-xl bg-obsidian-800 hover:bg-obsidian-750 border border-obsidian-700 text-slate-200 text-xs font-mono transition-all flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-violet-400" />
                <span>Tailored Resumes</span>
              </button>
            </div>

            {/* Scroll Navigation Indicators */}
            <nav className="hidden lg:block pt-8 space-y-1.5" aria-label="Page navigation">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="group flex items-center py-1.5 text-xs font-mono tracking-wider uppercase transition-all"
                  >
                    <span
                      className={`mr-4 h-px transition-all ${
                        isActive
                          ? 'w-16 bg-cyan-400'
                          : 'w-6 bg-slate-600 group-hover:w-12 group-hover:bg-slate-400'
                      }`}
                    />
                    <span
                      className={`${
                        isActive
                          ? 'text-cyan-300 font-bold'
                          : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Social Links & Command Palette Trigger */}
          <div className="mt-8 lg:mt-0 space-y-4">
            <div className="flex items-center gap-4 text-slate-400">
              <a
                href={portfolioData.identity.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors p-1"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={portfolioData.identity.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors p-1"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <button
                onClick={handleCopyEmail}
                className="hover:text-cyan-400 transition-colors p-1 flex items-center gap-1.5 text-xs font-mono"
                title="Copy Email"
              >
                <Mail className="w-5 h-5" />
                <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
              </button>
              <a
                href={`tel:${portfolioData.identity.phone}`}
                className="hover:text-cyan-400 transition-colors p-1"
                aria-label="Phone Number"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            <div 
              onClick={onOpenCommand}
              className="hidden sm:flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 text-xs font-mono text-slate-400 hover:text-cyan-300 cursor-pointer transition-all max-w-xs"
            >
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Quick Actions</span>
              </div>
              <kbd className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-slate-300 border border-white/10">
                Cmd+K
              </kbd>
            </div>
          </div>
        </header>

        {/* ======================================================== */}
        {/* RIGHT SCROLLING CONTENT                                  */}
        {/* ======================================================== */}
        <main className="lg:w-7/12 pt-16 lg:pt-0 space-y-24 cards-container">

          {/* 1. ABOUT SECTION */}
          <section id="about" className="scroll-mt-20 space-y-5 text-slate-300 leading-relaxed text-sm sm:text-base">
            <h2 className="text-xl font-bold text-white font-sans flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">// 01.</span>
              Engineering Philosophy
            </h2>

            <p>
              I am a <span className="text-white font-semibold">Software Engineer</span> based in Bengaluru, specializing in architecting <span className="text-cyan-300 font-medium">scalable microservices, high-throughput cloud backends, and reactive real-time frontend architectures</span>.
            </p>

            <p>
              At <span className="text-cyan-300 font-medium">ConnectSecure</span>, I lead full-stack software development and telemetry pipelines for mission-critical enterprise platforms, notably the <span className="text-white font-semibold">Bharat Petroleum (BPCL) City Gas Distribution & CNG Platform</span>. I engineer distributed microservices in <span className="text-violet-300 font-mono">Python (Flask)</span> deployed on <span className="text-cyan-400 font-mono">Azure Kubernetes Service (AKS)</span>, build GIS monitoring dashboards in <span className="text-cyan-300 font-mono">Angular 20 & RxJS</span>, and implement real-time <span className="text-emerald-300 font-mono">WebSocket</span> alert streaming across hundreds of retail outlet topologies.
            </p>

            <p>
              Holding a B.Tech in Electronics & Communication from <span className="text-cyan-300 font-medium">UVCE</span> (CGPA 8.76) and with deep systems experience across <span className="text-white font-mono">digipetro-ph</span> edge telemetry gateways (ESP32 Modbus-RTU & LoRa), I bridge low-level protocol determinism with cloud-scale distributed software to build resilient systems that never drop state.
            </p>
          </section>

          {/* 2. IMPACT METRICS TICKER (Hard numbers) */}
          <section id="metrics" className="scroll-mt-20 space-y-6">
            <h2 className="text-xl font-bold text-white font-sans flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">// 02.</span>
              Quantified Impact
            </h2>

            <div className="grid grid-cols-2 gap-3.5">
              {portfolioData.metrics.map((m, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="glass-panel p-5 rounded-2xl border border-white/10 dim-target hover:border-cyan-500/40 hover:shadow-glow-cyan transition-all"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 font-mono">
                    {m.value}
                  </div>
                  <div className="text-sm font-semibold text-slate-200 mt-1">{m.label}</div>
                  <div className="text-xs text-slate-400 font-mono mt-1 leading-snug">{m.subtext}</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 3. WORK EXPERIENCE (ConnectSecure) */}
          <section id="experience" className="scroll-mt-20 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-white font-sans flex items-center gap-2">
                <span className="text-cyan-400 font-mono text-sm">// 03.</span>
                Work Experience
              </h2>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Single Source of Truth Verified</span>
              </div>
            </div>

            <div className="space-y-6">
              {portfolioData.experiences.map((exp) => (
                <div 
                  key={exp.id}
                  className="glass-panel p-6 rounded-2xl border border-white/10 dim-target hover:border-white/20 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        {exp.role}
                        {exp.isCurrent && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                            Present
                          </span>
                        )}
                      </h3>
                      <div className="text-sm text-cyan-400 font-mono">
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                      {exp.period} • {exp.location}
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed list-disc list-outside ml-4">
                    {(exp.bullets || []).map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.technologies.map((t, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-[11px] font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Education Sub-Card */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 dim-target space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>Formal Education</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h4 className="font-bold text-slate-100 text-sm">{portfolioData.education[0].institution}</h4>
                  <p className="text-xs text-slate-300 font-mono">{portfolioData.education[0].degree}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold">
                    {portfolioData.education[0].score}
                  </span>
                  <p className="text-[11px] text-slate-500 font-mono mt-1">{portfolioData.education[0].period}</p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. FLAGSHIP CASE STUDIES (Decoupled, non-generic) */}
          <section id="projects" className="scroll-mt-20 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white font-sans flex items-center gap-2">
                <span className="text-cyan-400 font-mono text-sm">// 04.</span>
                Flagship Case Studies
              </h2>
              <span className="text-xs font-mono text-slate-400">
                Architectural Breakdown
              </span>
            </div>

            <div className="space-y-8">
              {portfolioData.projects.map((proj) => (
                <motion.div 
                  key={proj.id}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/10 dim-target hover:border-cyan-500/30 transition-all space-y-6"
                >
                  {/* Title & Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                        {proj.category}
                      </span>
                      <h3 className="text-lg font-bold text-white mt-0.5">{proj.title}</h3>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/30 self-start sm:self-center">
                      {proj.badge}
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {proj.summary}
                  </p>

                  {/* Interactive Visual Architecture & Telemetry Preview */}
                  <ProjectVisualPreview projectId={proj.id} />

                  {/* Problem vs Solution Split */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-red-500/5 border border-red-500/15 text-slate-300 space-y-1">
                      <div className="font-mono text-red-400 font-semibold flex items-center gap-1">
                        <span>⚠ The Core Constraint</span>
                      </div>
                      <p className="leading-relaxed">{proj.problem}</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-slate-300 space-y-1">
                      <div className="font-mono text-emerald-400 font-semibold flex items-center gap-1">
                        <span>✓ Architectural Solution</span>
                      </div>
                      <p className="leading-relaxed">{proj.solution}</p>
                    </div>
                  </div>

                  {/* Architecture Sequence Nodes */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Decoupled Data Flow Pipeline:</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {proj.architectureNodes.map((node, nIdx) => (
                        <React.Fragment key={nIdx}>
                          <div className="px-3 py-1.5 rounded-xl bg-obsidian-900 border border-white/10 text-xs font-mono">
                            <span className="text-white font-medium">{node.name}</span>
                            <span className="text-[10px] text-cyan-400 block">{node.note}</span>
                          </div>
                          {nIdx < proj.architectureNodes.length - 1 && (
                            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Trade-Off Decision Matrix */}
                  <div className="p-4 rounded-xl bg-obsidian-900/80 border border-white/5 space-y-2 text-xs">
                    <div className="font-mono text-slate-400 text-[11px] uppercase tracking-wider">
                      // Architectural Trade-Off Decisions
                    </div>
                    {proj.tradeoffs.map((t, tidx) => (
                      <div key={tidx} className="space-y-0.5">
                        <span className="font-mono text-cyan-300 font-semibold">{t.decision}:</span>
                        <p className="text-slate-400 font-sans">{t.reason}</p>
                      </div>
                    ))}
                  </div>

                  {/* Hard Metrics & Actions Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.techStack.map((tech, i) => (
                        <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2.5">
                      {/* Deep-Dive Case Study Button */}
                      <button
                        onClick={() => {
                          sound.playClick();
                          setSelectedCaseStudy(proj);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/15 to-violet-500/15 hover:from-cyan-500/25 hover:to-violet-500/25 border border-cyan-500/30 hover:border-cyan-400/50 text-cyan-200 text-xs font-mono font-medium transition-all shadow-glow-cyan cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Read Case Study & ADR</span>
                      </button>

                      {/* NDA vs Source Indicator */}
                      {proj.githubUrl && proj.githubUrl.includes('digipetro-ph') ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-400" title="Proprietary Enterprise Code (NDA protected)">
                          <Shield className="w-3 h-3 text-cyan-400" />
                          <span>Enterprise NDA</span>
                        </span>
                      ) : (
                        <a
                          href={proj.githubUrl || portfolioData.identity.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Source Repo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 5. INTERACTIVE LIVE PIPELINE SANDBOX */}
          <section id="simulator" className="scroll-mt-20 space-y-4">
            <h2 className="text-xl font-bold text-white font-sans flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">// 05.</span>
              Interactive Pipeline Sandbox
            </h2>
            <SystemSimulator />
          </section>

          {/* 6. SKILLS ARSENAL & /USES */}
          <section id="skills" className="scroll-mt-20 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white font-sans flex items-center gap-2">
                <span className="text-cyan-400 font-mono text-sm">// 06.</span>
                Technical Arsenal & /uses
              </h2>
              <span className="text-xs font-mono text-slate-400">Production Tested</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries({
                "Programming Languages": portfolioData.skillsArsenal.languages,
                "Frontend & GIS Telemetry": portfolioData.skillsArsenal.frontend,
                "Backend & Cloud Microservices": portfolioData.skillsArsenal.backendCloud,
                "IoT & Embedded Hardware": portfolioData.skillsArsenal.iotEmbedded,
                "Simulator & Protocol Testing": portfolioData.skillsArsenal.verificationTesting,
                "Databases & Cloud Storage": portfolioData.skillsArsenal.databases,
                "Developer Workbench & DevOps": portfolioData.skillsArsenal.dailyTools,
              }).map(([category, skills], i) => (
                <div key={i} className="glass-panel p-5 rounded-2xl border border-white/10 dim-target space-y-3">
                  <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200 hover:border-cyan-500/40 hover:text-cyan-200 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 7. ACHIEVEMENTS & LEADERSHIP */}
          <section id="achievements" className="scroll-mt-20 space-y-6">
            <h2 className="text-xl font-bold text-white font-sans flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">// 07.</span>
              Recognitions & Leadership
            </h2>

            <div className="space-y-3.5">
              {portfolioData.achievements.map((ach, idx) => (
                <div key={idx} className="glass-panel p-5 rounded-2xl border border-white/10 dim-target flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0 mt-0.5">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="font-bold text-sm text-slate-100">{ach.title}</h3>
                      <span className="text-xs font-mono text-slate-400">{ach.year}</span>
                    </div>
                    <p className="text-xs font-mono text-cyan-400">{ach.issuer}</p>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">{ach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 8. CONTACT SECTION (One-click copy, frictionless) */}
          <section id="contact" className="scroll-mt-20 space-y-6 pt-4">
            <div className="glass-panel p-8 rounded-3xl border border-cyan-500/20 shadow-glow-cyan space-y-6 text-center sm:text-left">
              <div className="space-y-2">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  // 08. Let's Build Together
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Get in Touch
                </h2>
                <p className="text-sm text-slate-300 max-w-lg leading-relaxed">
                  Whether you're hiring for a high-impact Software Engineer, AI Systems, or Distributed Backend role, or want to discuss low-latency system design, my inbox is open.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleCopyEmail}
                  className="px-5 py-3 rounded-xl bg-cyan-500 text-obsidian-950 font-semibold text-xs font-mono hover:bg-cyan-400 transition-all flex items-center gap-2 shadow-glow-cyan"
                >
                  {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedEmail ? 'Email Copied to Clipboard!' : portfolioData.identity.email}</span>
                </button>

                <a
                  href={`tel:${portfolioData.identity.phone}`}
                  className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-mono text-slate-200 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{portfolioData.identity.phone}</span>
                </a>

                <a
                  href={portfolioData.identity.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-mono text-slate-200 transition-colors flex items-center gap-2"
                >
                  <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Quick Keyboard Navigation Pill */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-slate-400 bg-white/5 border border-white/10 rounded-full py-1.5 px-4 mx-auto max-w-fit">
              <span className="text-cyan-400 font-semibold">⌘K / Ctrl+K</span>
              <span>Command Palette</span>
              <span className="text-slate-600">•</span>
              <span className="text-cyan-400 font-semibold">L</span>
              <span>Toggle List View</span>
              <span className="text-slate-600">•</span>
              <span className="text-cyan-400 font-semibold">Esc</span>
              <span>Close Modals</span>
            </div>

            {/* Footer Credit */}
            <footer className="pt-6 pb-4 text-center text-xs font-mono text-slate-500 space-y-1">
              <p>Designed & engineered by Ashok H • ConnectSecure & UVCE</p>
              <p className="text-[11px] text-slate-600">Built with React, Vite, Tailwind CSS • 100/100 Core Web Vitals</p>
            </footer>
          </section>

        </main>
      </div>

      {/* Flagship Engineering Case Study Deep-Dive Modal */}
      <CaseStudyModal 
        isOpen={!!selectedCaseStudy} 
        onClose={() => setSelectedCaseStudy(null)} 
        project={selectedCaseStudy} 
      />
    </div>
  );
};
