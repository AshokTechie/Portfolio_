import React, { useState } from 'react';
import { 
  Activity, 
  MapPin, 
  Wifi, 
  Cpu, 
  Database, 
  Cloud, 
  CheckCircle2, 
  Play, 
  Radio, 
  Layers,
  ArrowRight,
  ShieldCheck,
  Bot,
  Search,
  Sparkles,
  RefreshCw,
  GitBranch,
  Terminal
} from 'lucide-react';
import { sound } from '../utils/audio';

export const ProjectVisualPreview = ({ projectId }) => {
  // BPCL Interactive State
  const [activeStation, setActiveStation] = useState(0);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState(null);

  // SmartLoad Interactive State
  const [modbusPulsing, setModbusPulsing] = useState(false);
  const [pulseLog, setPulseLog] = useState('Standby • Ready to poll 0x03 registers');

  // Agentic RAG Pipeline Interactive State
  const [ragState, setRagState] = useState({
    step: 0,
    running: false,
    query: 'Analyze custody transfer reconciliation penalty rules in CGD billing PDF',
    tokens: '',
    citations: []
  });

  const stations = [
    { id: "RO-BLR-104", name: "Hebbal Junction", pressure: "94.2 Bar", flow: "182.4 kg/hr", temp: "28.4°C", status: "Optimal", coords: "13.0358°N, 77.5970°E" },
    { id: "RO-BLR-218", name: "Whitefield Inner", pressure: "98.0 Bar", flow: "210.1 kg/hr", temp: "29.1°C", status: "Optimal", coords: "12.9698°N, 77.7499°E" },
    { id: "RO-MYS-032", name: "Mysuru Highway", pressure: "91.5 Bar", flow: "145.8 kg/hr", temp: "27.8°C", status: "Normal", coords: "12.8710°N, 77.4912°E" }
  ];

  const handleSimulateAudit = () => {
    sound.playClick();
    setIsAuditing(true);
    setAuditResult(null);

    setTimeout(() => {
      sound.playSuccess();
      setIsAuditing(false);
      setAuditResult({
        volumeConverted: "4,280 SCM (168.2 MMBTU)",
        imbalanceRate: "99.4%",
        penaltyStatus: "Zero Penalty Breach (Within <= 90% / >= 110% Guardrail)",
        signature: "Verified by Custody Transfer Engine"
      });
    }, 600);
  };

  const handleModbusPulse = () => {
    sound.playClick();
    setModbusPulsing(true);
    setPulseLog("Polling RS-485 Modbus Holding Register 0x0020...");

    setTimeout(() => {
      setPulseLog("CRC-16 Verified (0x4B12) -> Committed to ESP32 NVS Flash Storage");
    }, 400);

    setTimeout(() => {
      sound.playSuccess();
      setModbusPulsing(false);
      setPulseLog("Azure IoT Hub MQTT: PUBACK Received (QoS 1) • Sub-35ms stream delivery");
    }, 900);
  };

  const handleSimulateRag = () => {
    sound.playClick();
    setRagState(prev => ({ ...prev, running: true, step: 1, tokens: '', citations: [] }));

    // Step 1: LangGraph Query Rewriting
    setTimeout(() => {
      setRagState(prev => ({ 
        ...prev, 
        step: 2, 
        tokens: 'LangGraph Supervisor: Transforming user query -> "BPCL City Gas Distribution Custody Imbalance Penalties <=90% or >=110% SCM MMBTU"' 
      }));
    }, 450);

    // Step 2: Qdrant Hybrid Vector Search
    setTimeout(() => {
      setRagState(prev => ({ 
        ...prev, 
        step: 3, 
        tokens: 'Qdrant: Hybrid dense (768d) retrieval completed in 18ms across 50+ indexed documents. Matched doc: cgd_billing_standard_v2.pdf (score: 0.984)' 
      }));
    }, 950);

    // Step 3: Self-Correction Grader
    setTimeout(() => {
      setRagState(prev => ({ 
        ...prev, 
        step: 4, 
        tokens: 'Citation Guardrail: 100% grounded in document context. Zero hallucination detected.' 
      }));
    }, 1450);

    // Step 4: Final Synthesis & Citations
    setTimeout(() => {
      sound.playSuccess();
      setRagState(prev => ({
        ...prev,
        step: 5,
        running: false,
        tokens: 'According to the CGD Custody Transfer standard, daily station deliveries falling <=90% or >=110% of scheduled volume trigger automated provisional billing penalties in SCM and MMBTU with immediate operator alerts.',
        citations: ['cgd_billing_standard_v2.pdf:Clause 4.2', 'bpcl_reconciliation_rules.pdf']
      }));
    }, 2000);
  };

  // 1. BPCL CGD Enterprise Platform Preview
  if (projectId === 'bpcl-cgd-platform') {
    const cur = stations[activeStation];
    return (
      <div className="rounded-xl border border-white/10 bg-obsidian-950/70 p-4 space-y-3.5 text-xs font-mono">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-semibold">BPCL Telemetry Live Monitor</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
              Socket.IO WebSockets • 14ms
            </span>
          </div>
          <span className="text-[10px] text-slate-400">Angular 20 GIS Console</span>
        </div>

        {/* Stations Tabs */}
        <div className="grid grid-cols-3 gap-1.5">
          {stations.map((st, i) => (
            <button
              key={st.id}
              onClick={() => {
                sound.playClick();
                setActiveStation(i);
              }}
              className={`p-2 rounded-lg text-left transition-all cursor-pointer ${
                activeStation === i
                  ? 'bg-cyan-500/15 border border-cyan-500/30 text-white'
                  : 'bg-white/5 border border-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[11px]">{st.id}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <div className="text-[10px] text-slate-400 truncate">{st.name}</div>
            </button>
          ))}
        </div>

        {/* Active Station Metrics Panel */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 rounded-lg bg-obsidian-900 border border-white/5">
          <div>
            <div className="text-[10px] text-slate-500 uppercase">Line Pressure</div>
            <div className="text-sm font-bold text-cyan-300">{cur.pressure}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase">Mass Flow Rate</div>
            <div className="text-sm font-bold text-emerald-300">{cur.flow}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase">Probe Temp</div>
            <div className="text-sm font-bold text-slate-200">{cur.temp}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase">GIS Coordinates</div>
            <div className="text-[11px] font-mono text-slate-400 truncate">{cur.coords}</div>
          </div>
        </div>

        {/* Custody Transfer Reconciliation Engine Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-white/5">
          <div className="text-[11px] text-slate-400">
            Station Reconciliation Engine:
            {auditResult && (
              <span className="text-emerald-300 font-semibold ml-1.5">
                {auditResult.penaltyStatus}
              </span>
            )}
          </div>
          <button
            onClick={handleSimulateAudit}
            disabled={isAuditing}
            className="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-200 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Activity className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
            <span>{isAuditing ? 'Running Conversion...' : 'Run Custody Reconcile'}</span>
          </button>
        </div>
      </div>
    );
  }

  // 2. SmartLoad Modbus-RTU Telemetry Gateway Preview
  if (projectId === 'smartload-gateway') {
    return (
      <div className="rounded-xl border border-white/10 bg-obsidian-950/70 p-4 space-y-3.5 text-xs font-mono">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-white font-semibold">Relcon ESP32 Gateway Architecture</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
            ● 13 Commits (Lead Author)
          </span>
        </div>

        {/* Hardware-to-Cloud Visual Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <div className={`p-2.5 rounded-lg border transition-all ${modbusPulsing ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-200 shadow-glow-cyan' : 'bg-white/5 border-white/5 text-slate-300'}`}>
            <div className="text-[10px] text-slate-500">Node 01: RS-485</div>
            <div className="font-bold text-[11px]">Modbus RTU</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Poll 0x03 Registers</div>
          </div>

          <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-slate-300">
            <div className="text-[10px] text-slate-500">Node 02: Storage</div>
            <div className="font-bold text-[11px]">ESP32 NVS Flash</div>
            <div className="text-[10px] text-cyan-400 mt-0.5">Reboot Persistence</div>
          </div>

          <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-slate-300">
            <div className="text-[10px] text-slate-500">Node 03: Auth</div>
            <div className="font-bold text-[11px]">SAS Token Engine</div>
            <div className="text-[10px] text-violet-300 mt-0.5">HMAC-SHA256 Sign</div>
          </div>

          <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-slate-300">
            <div className="text-[10px] text-slate-500">Node 04: Cloud</div>
            <div className="font-bold text-[11px]">Azure IoT Hub</div>
            <div className="text-[10px] text-emerald-300 mt-0.5">MQTT QoS 1 Socket</div>
          </div>
        </div>

        {/* Live Packet Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-white/5">
          <div className="text-[11px] text-slate-400 truncate max-w-sm">
            <span className="text-cyan-400 mr-1.5">Bus Log:</span>
            <span>{pulseLog}</span>
          </div>
          <button
            onClick={handleModbusPulse}
            disabled={modbusPulsing}
            className="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-200 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Play className={`w-3.5 h-3.5 ${modbusPulsing ? 'animate-pulse' : ''}`} />
            <span>{modbusPulsing ? 'Polling Bus...' : 'Simulate Modbus Frame'}</span>
          </button>
        </div>
      </div>
    );
  }

  // 3. Tokheim-C2 Industrial Controller Preview
  if (projectId === 'tokheim-controller') {
    return (
      <div className="rounded-xl border border-white/10 bg-obsidian-950/70 p-4 space-y-3.5 text-xs font-mono">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-white font-semibold">Forecourt LoRa Subsystem & UART Architecture</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20 text-violet-300">
            ● 4 Commits (Tokheim Board)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-slate-300">
            <div className="text-[10px] text-slate-500">Forecourt Wireless</div>
            <div className="font-bold text-[11px]">LoRa SX1262 Link</div>
            <div className="text-[10px] text-cyan-400 mt-0.5">868MHz Long Range</div>
          </div>

          <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-slate-300">
            <div className="text-[10px] text-slate-500">Dispenser Serial</div>
            <div className="font-bold text-[11px]">UART Buffer Handshake</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">Breakdown Crash Resolved</div>
          </div>

          <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-slate-300">
            <div className="text-[10px] text-slate-500">Firmware Lifecycle</div>
            <div className="font-bold text-[11px]">Dual-Partition OTA</div>
            <div className="text-[10px] text-violet-300 mt-0.5">16MB Flash TBoard Profile</div>
          </div>
        </div>
      </div>
    );
  }

  // 4. Agentic RAG Pipeline Preview
  if (projectId === 'agentic-rag-pipeline') {
    return (
      <div className="rounded-xl border border-white/10 bg-obsidian-950/70 p-4 space-y-3.5 text-xs font-mono">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2">
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-white font-semibold">LangGraph Cyclic Agentic Pipeline</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
            ● Qdrant Hybrid Vector DB (96% Recall)
          </span>
        </div>

        {/* Cyclic Multi-Step State Flow Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className={`p-2.5 rounded-lg border transition-all ${
            ragState.step === 1 || ragState.step === 2
              ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-200 shadow-glow-cyan'
              : 'bg-white/5 border-white/5 text-slate-300'
          }`}>
            <div className="text-[10px] text-slate-500">Node 01: Agent</div>
            <div className="font-bold text-[11px]">Query Rewriter</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Cyclic expansion</div>
          </div>

          <div className={`p-2.5 rounded-lg border transition-all ${
            ragState.step === 3
              ? 'bg-violet-500/15 border-violet-500/40 text-violet-200 shadow-glow-violet'
              : 'bg-white/5 border-white/5 text-slate-300'
          }`}>
            <div className="text-[10px] text-slate-500">Node 02: Retrieval</div>
            <div className="font-bold text-[11px]">Qdrant Hybrid</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Dense + BM25 Sparse</div>
          </div>

          <div className={`p-2.5 rounded-lg border transition-all ${
            ragState.step === 4
              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
              : 'bg-white/5 border-white/5 text-slate-300'
          }`}>
            <div className="text-[10px] text-slate-500">Node 03: Guardrail</div>
            <div className="font-bold text-[11px]">Self-Correction</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Hallucination check</div>
          </div>

          <div className={`p-2.5 rounded-lg border transition-all ${
            ragState.step === 5
              ? 'bg-amber-500/15 border-amber-500/40 text-amber-200'
              : 'bg-white/5 border-white/5 text-slate-300'
          }`}>
            <div className="text-[10px] text-slate-500">Node 04: Synthesis</div>
            <div className="font-bold text-[11px]">Gemini 2.5 API</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Stream + Citations</div>
          </div>
        </div>

        {/* Live Simulation Output Box */}
        <div className="p-3 rounded-lg bg-obsidian-900 border border-white/5 space-y-1.5">
          <div className="text-[10px] text-slate-500 uppercase flex items-center justify-between">
            <span>Agentic Execution Trace</span>
            {ragState.running && <span className="text-cyan-400 animate-pulse">Running cycle...</span>}
          </div>
          <div className="text-[11px] text-slate-300 leading-relaxed min-h-[38px] font-sans">
            {ragState.tokens || 'Ready. Click simulate to trace LangGraph multi-step reasoning cycle.'}
          </div>
          {ragState.citations.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1 border-t border-white/5">
              <span className="text-[10px] text-slate-500">Citations:</span>
              {ragState.citations.map((c, i) => (
                <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Simulation Button */}
        <div className="flex justify-end pt-1 border-t border-white/5">
          <button
            onClick={handleSimulateRag}
            disabled={ragState.running}
            className="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-200 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className={`w-3.5 h-3.5 ${ragState.running ? 'animate-spin' : ''}`} />
            <span>{ragState.running ? 'Reasoning In Progress...' : 'Simulate Agentic Cycle'}</span>
          </button>
        </div>
      </div>
    );
  }

  // 5. Smart Agriculture ML System Preview
  if (projectId === 'smart-agriculture-ml') {
    return (
      <div className="rounded-xl border border-white/10 bg-obsidian-950/70 p-4 space-y-3.5 text-xs font-mono">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-white font-semibold">End-to-End AgriTech ML Pipeline</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
            ● 85%+ Accuracy • Zero Data Loss
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-slate-300">
            <div className="text-[10px] text-slate-500">Stage 01: Edge Collect</div>
            <div className="font-bold text-[11px]">ESP32 Sensor Array</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">100+ readings/min</div>
          </div>
          <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-slate-300">
            <div className="text-[10px] text-slate-500">Stage 02: Ingest</div>
            <div className="font-bold text-[11px]">REST API & Firebase</div>
            <div className="text-[10px] text-cyan-400 mt-0.5">Time-Series Store</div>
          </div>
          <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-slate-300">
            <div className="text-[10px] text-slate-500">Stage 03: ML Inference</div>
            <div className="font-bold text-[11px]">GCP Cloud Models</div>
            <div className="text-[10px] text-violet-400 mt-0.5">Predictive Analytics</div>
          </div>
          <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-slate-300">
            <div className="text-[10px] text-slate-500">Stage 04: Delivery</div>
            <div className="font-bold text-[11px]">Mobile Delivery</div>
            <div className="text-[10px] text-amber-400 mt-0.5">&lt; 2s End-to-End</div>
          </div>
        </div>
      </div>
    );
  }

  // 6. Car Rental Platform Preview
  if (projectId === 'car-rental-platform') {
    return (
      <div className="rounded-xl border border-white/10 bg-obsidian-950/70 p-4 space-y-3.5 text-xs font-mono">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-white font-semibold">Modular REST API Backend Architecture</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
            ● 12+ REST Endpoints • Docker Containerized
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-slate-300">
            <div className="text-[10px] text-slate-500">Security & Auth</div>
            <div className="font-bold text-[11px]">JWT & RBAC</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">Role-Based Access</div>
          </div>
          <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-slate-300">
            <div className="text-[10px] text-slate-500">Service Layer</div>
            <div className="font-bold text-[11px]">Node.js / Express</div>
            <div className="text-[10px] text-cyan-400 mt-0.5">Structured Error Handlers</div>
          </div>
          <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-slate-300">
            <div className="text-[10px] text-slate-500">Deployment</div>
            <div className="font-bold text-[11px]">Docker Container</div>
            <div className="text-[10px] text-violet-400 mt-0.5">Zero Defects Deployed</div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
