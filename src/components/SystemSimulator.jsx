import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Cpu, Cloud, CheckCircle, Database, Network, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

export const SystemSimulator = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('bpcl'); // 'bpcl' or 'rag'
  const [logs, setLogs] = useState([
    "[READY] Simulator initialized. Ready to execute pipeline."
  ]);

  const pipelineSteps = mode === 'bpcl' ? [
    { name: "Modbus Register Ingest", icon: Cpu, latency: "1.4ms", status: "Raw telemetry & ROID resolution" },
    { name: "Python Telemetry Router", icon: Network, latency: "3.8ms", status: "Safety rule engine & ESD check" },
    { name: "Gas Custody Engine", icon: Database, latency: "7.2ms", status: "kg, SCM, MMBTU conversion" },
    { name: "WebSocket Broadcast", icon: Cloud, latency: "14.5ms", status: "Sub-second GIS alert streaming" },
    { name: "AKS Cosmos DB Sink", icon: CheckCircle, latency: "28.0ms", status: "Zero UI freeze • Provisional PDF" }
  ] : [
    { name: "Goal Decomposer", icon: Cpu, latency: "2.1ms", status: "LangGraph supervisor planning" },
    { name: "HuggingFace Chunking", icon: Database, latency: "8.4ms", status: "Vector embedding generator" },
    { name: "Qdrant Hybrid Search", icon: Network, latency: "18.2ms", status: "Sub-200ms semantic similarity" },
    { name: "Citation Guardrail", icon: Cloud, latency: "12.0ms", status: "Groundedness validation (95%+)" },
    { name: "Gemini API + Voice I/O", icon: CheckCircle, latency: "42.0ms", status: "Multimodal speech output synthesis" }
  ];

  const runSimulation = () => {
    if (isRunning) return;
    sound.playClick();
    setIsRunning(true);
    setActiveStep(1);
    setLogs([`[EXEC] Starting ${mode.toUpperCase()} pipeline execution...`]);

    let step = 1;
    const interval = setInterval(() => {
      step++;
      if (step <= pipelineSteps.length) {
        sound.playClick();
        setActiveStep(step);
        const currentPipelineStep = pipelineSteps[step - 1];
        setLogs(prev => [
          ...prev, 
          `[STEP ${step}] ${currentPipelineStep.name} -> ${currentPipelineStep.status} (latency: ${currentPipelineStep.latency})`
        ]);
      } else {
        clearInterval(interval);
        sound.playSuccess();
        setIsRunning(false);
        setLogs(prev => [...prev, `[SUCCESS] Pipeline completed with 100% data integrity.`]);
      }
    }, 700);
  };

  const resetSimulation = () => {
    sound.playClick();
    setIsRunning(false);
    setActiveStep(0);
    setLogs(["[RESET] Pipeline state cleared. Click 'Run Pipeline' to benchmark."]);
  };

  useEffect(() => {
    resetSimulation();
  }, [mode]);

  return (
    <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-5">
      {/* Simulator Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-base text-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Interactive Pipeline Sandbox
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              Live Interactive
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Test and benchmark Ashok's decoupled architecture patterns
          </p>
        </div>

        {/* Pipeline Mode Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-obsidian-900 border border-white/10">
          <button
            onClick={() => {
              sound.playClick();
              setMode('bpcl');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              mode === 'bpcl' 
                ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            BPCL Telemetry & Billing
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setMode('rag');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              mode === 'rag' 
                ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Agentic RAG State Machine
          </button>
        </div>
      </div>

      {/* Pipeline Visual Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
        {pipelineSteps.map((s, idx) => {
          const stepNumber = idx + 1;
          const isPassed = activeStep > stepNumber;
          const isCurrent = activeStep === stepNumber;
          const Icon = s.icon;

          return (
            <div
              key={idx}
              className={`p-3 rounded-xl border transition-all flex flex-col justify-between ${
                isCurrent 
                  ? 'bg-cyan-500/15 border-cyan-400 shadow-glow-cyan scale-[1.02]' 
                  : isPassed
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                  : 'bg-white/5 border-white/5 text-slate-400 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-slate-400">Node {stepNumber}</span>
                <Icon className={`w-4 h-4 ${isCurrent ? 'text-cyan-400 animate-bounce' : isPassed ? 'text-emerald-400' : 'text-slate-500'}`} />
              </div>
              <div className="space-y-1">
                <div className="font-medium text-xs text-slate-200 leading-tight">{s.name}</div>
                <div className="text-[10px] font-mono text-slate-400">{s.status}</div>
              </div>
              <div className="mt-2 pt-2 border-t border-white/5 text-[10px] font-mono text-cyan-300">
                {s.latency}
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Log Window */}
      <div className="p-3 rounded-xl bg-obsidian-900 border border-white/10 font-mono text-xs space-y-1 max-h-24 overflow-y-auto">
        <div className="flex items-center justify-between text-[10px] text-slate-500 pb-1 border-b border-white/5 mb-1">
          <span>// STREAMING DIAGNOSTIC LOGS</span>
          <span>Status: {isRunning ? 'EXECUTING...' : 'IDLE'}</span>
        </div>
        {logs.map((log, i) => (
          <div key={i} className={log.includes('SUCCESS') ? 'text-emerald-400' : log.includes('EXEC') ? 'text-cyan-400' : 'text-slate-300'}>
            {log}
          </div>
        ))}
      </div>

      {/* Simulator Action Controls */}
      <div className="flex items-center justify-between pt-1">
        <div className="text-xs font-mono text-slate-400">
          Architecture: <span className="text-slate-200 font-semibold">{mode === 'telemetry' ? 'Zero-Copy LittleFS Queue' : 'LangGraph Self-Correction DAG'}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetSimulation}
            disabled={isRunning}
            className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-slate-400 hover:text-slate-200 hover:bg-white/5 disabled:opacity-40 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={runSimulation}
            disabled={isRunning}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-medium text-xs hover:brightness-110 disabled:opacity-50 transition-all shadow-glow-cyan flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? 'Running...' : 'Run Pipeline'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
