import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Layers, 
  Cpu, 
  Cloud, 
  CheckCircle2, 
  AlertTriangle, 
  Terminal, 
  GitBranch, 
  ShieldCheck, 
  Activity, 
  ArrowRight,
  ExternalLink,
  BookOpen,
  Bug
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../utils/audio';

export const CaseStudyModal = ({ isOpen, onClose, project }) => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'architecture' | 'war-story'

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-obsidian-950/85 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="w-full max-w-4xl max-h-[92vh] glass-panel-elevated rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden text-slate-200 my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-obsidian-900/90 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    {project.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                    • 4 min deep dive
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-100 font-sans mt-0.5">
                  {project.title}
                </h2>
              </div>
            </div>

            <button 
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="px-6 py-2.5 bg-obsidian-950/80 border-b border-white/5 flex items-center gap-2 overflow-x-auto shrink-0">
            {[
              { id: 'overview', label: 'Overview & Impact', icon: Activity },
              { id: 'architecture', label: 'Architecture & Decisions', icon: Layers },
              { id: 'war-story', label: 'Debugging War Story', icon: Bug },
            ].map(tab => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveTab(tab.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-400/40 text-cyan-200 shadow-glow-cyan'
                      : 'bg-white/5 border border-white/5 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm leading-relaxed">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Executive Summary */}
                <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-semibold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Executive Summary</span>
                  </div>
                  <p className="text-slate-300 text-sm">
                    {project.summary}
                  </p>
                </div>

                {/* Key Metrics Grid */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Quantified Engineering Outcomes
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(project.metrics || []).map((m, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-200 leading-snug">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Engineering Bullets */}
                {project.bullets && project.bullets.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Core Implementation & Deliverables
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed list-disc list-outside ml-4">
                      {project.bullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Problem vs Solution */}
                {(project.problem || project.solution) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.problem && (
                      <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-2">
                        <div className="flex items-center gap-2 text-rose-300 font-mono text-xs font-semibold uppercase">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>The Industrial Challenge</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {project.problem}
                        </p>
                      </div>
                    )}

                    {project.solution && (
                      <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                        <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs font-semibold uppercase">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Engineered Solution</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {project.solution}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Tech Stack Chips */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Production Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(project.techStack || project.technologies || []).map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-cyan-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="space-y-6">
                {/* Visual Pipeline Flow */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    System Architecture Flow
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
                    {(project.architectureNodes || []).map((node, i) => (
                      <div key={i} className="p-3 rounded-xl bg-obsidian-900 border border-cyan-500/20 space-y-1 relative">
                        <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                          Node 0{i + 1} • {node.type}
                        </div>
                        <div className="font-semibold text-xs text-slate-100">
                          {node.name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono leading-tight">
                          {node.note}
                        </div>
                        {i < (project.architectureNodes || []).length - 1 && (
                          <div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-cyan-400/60">
                            →
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Architectural Trade-offs & Decision Log */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Key Trade-Offs & Architectural Decision Log (ADRs)
                  </h4>
                  <div className="space-y-3">
                    {(project.tradeoffs || []).map((item, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-violet-300">
                          <GitBranch className="w-3.5 h-3.5 text-violet-400" />
                          <span>{item.decision}</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed pl-5">
                          {item.reason}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'war-story' && (
              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider">
                    <Bug className="w-4 h-4 text-amber-400" />
                    <span>The Hardest Bug / Root Cause Analysis (War Story)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {project.warStory}
                  </p>
                </div>

                {/* Diagnostic Runbook Console */}
                <div className="rounded-xl border border-white/10 bg-obsidian-950 p-4 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 text-slate-400 text-[11px]">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                      <span>rca_diagnostic_log.sh</span>
                    </div>
                    <span className="text-emerald-400">● RCA Complete</span>
                  </div>
                  <div className="space-y-1 text-slate-400 pt-1 text-[11px]">
                    <p className="text-cyan-400">$ ./trace_subsystem --target {project.id}</p>
                    <p className="text-slate-300">[INFO] Attaching logic analyzer & memory dump probes...</p>
                    <p className="text-amber-400">[WARN] Bottleneck identified in high-throughput data path.</p>
                    <p className="text-emerald-400">[FIX] Applied decoupled state queue & memory buffer management.</p>
                    <p className="text-slate-200">[PASS] Soak test: 72 hours continuous operation with zero dropped packets.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-3 border-t border-white/10 bg-obsidian-900/80 flex items-center justify-between text-xs font-mono shrink-0">
            <span className="text-slate-400">
              Role Focus: <strong className="text-cyan-300 capitalize">{project.roleTarget} Systems</strong>
            </span>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 transition-colors cursor-pointer"
            >
              Close Deep Dive
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
