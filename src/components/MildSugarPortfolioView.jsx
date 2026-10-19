import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Mail, 
  Download, 
  Sun,
  Moon,
  Play,
  Pause,
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { Github, Linkedin, Leetcode } from './Icons';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';

// =========================================================================
// INTERACTIVE ANIMATED AGENTIC RAG SYSTEM COMPONENT
// =========================================================================
const AgenticRagVisualizer = ({ compact = false }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const steps = [
    {
      id: 1,
      badge: 'Node 01',
      title: 'Speech & User Query I/O',
      detail: 'Multimodal input ingestion with speech recognition & goal extraction.',
      stat: 'Voice & Text',
      icon: '🎤'
    },
    {
      id: 2,
      badge: 'Node 02',
      title: 'Chunking & Embedding',
      detail: '500-token sliding windows with HuggingFace 384-dim dense vector generation.',
      stat: '384-dim Vector',
      icon: '📄'
    },
    {
      id: 3,
      badge: 'Node 03',
      title: 'Qdrant Vector DB Search',
      detail: 'Cosine similarity retrieval on 50+ indexed technical document chunks.',
      stat: 'sub-200ms Latency',
      icon: '⚡'
    },
    {
      id: 4,
      badge: 'Node 04',
      title: 'LangGraph Cyclic State Router',
      detail: 'Cyclic state routing, context grading, and automated self-correcting backtrack.',
      stat: '95%+ Accuracy',
      icon: '🔄'
    },
    {
      id: 5,
      badge: 'Node 05',
      title: 'Gemini API Grounded Synthesis',
      detail: 'Prompt-engineered generation with strict citation validation & zero hallucination.',
      stat: 'Grounded Output',
      icon: '✨'
    },
    {
      id: 6,
      badge: 'Node 06',
      title: 'Voice Waveform Stream',
      detail: 'Natural speech synthesis stream delivering real-time auditory responses.',
      stat: 'Full Voice I/O',
      icon: '🔊'
    }
  ];

  const terminalLogs = [
    { time: '00:00.040', tag: 'INPUT', msg: 'User speech query received -> "Explain the station-level gas custody billing engine."' },
    { time: '00:00.110', tag: 'CHUNKER', msg: 'Document chunking: split into 500-token semantic chunks with 50-token overlap.' },
    { time: '00:00.190', tag: 'EMBED', msg: 'HuggingFace all-MiniLM-L6-v2 generated 384-dimensional dense semantic vector.' },
    { time: '00:00.270', tag: 'QDRANT', msg: 'Qdrant similarity search: 142ms latency | 3 chunks retrieved (cosine: 0.94).' },
    { time: '00:00.350', tag: 'ROUTER', msg: 'LangGraph Cyclic Router: context evaluation score 0.94 -> State: PROCEED_TO_GENERATION.' },
    { time: '00:00.440', tag: 'GEMINI', msg: 'Gemini API grounded synthesis with strict citation validation [Doc #12, Pg 4].' },
    { time: '00:00.520', tag: 'VOICE', msg: 'Synthesizing voice waveform stream -> Output dispatched with 0% hallucination.' }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, steps.length]);

  return (
    <div className={`rounded-2xl sm:rounded-3xl bg-[#1e1d1a] text-white shadow-2xl border border-white/10 select-none ${
      compact ? 'p-3.5 sm:p-5 space-y-3 sm:space-y-3.5' : 'p-6 sm:p-9 space-y-7'
    }`}>
      {/* Header with Control Buttons */}
      <div className={`flex flex-wrap items-center justify-between gap-3 border-b border-white/10 ${compact ? 'pb-2.5' : 'pb-5'}`}>
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#fea831] animate-ping" />
          <h4 className={`font-extrabold tracking-tight text-white ${compact ? 'text-sm sm:text-base' : 'text-xl sm:text-2xl'}`} style={{ fontFamily: 'Righteous, cursive' }}>
            Autonomous Agentic RAG Simulation
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoPlaying((prev) => !prev)}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {isAutoPlaying ? <Pause className="w-3 h-3 text-[#fea831]" /> : <Play className="w-3 h-3 text-[#fea831]" />}
            <span>{isAutoPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <button
            onClick={() => {
              setActiveStep(0);
              sound.playClick();
            }}
            className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            title="Reset Simulation"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 6-Node Animated Horizontal/Grid Pipeline Flow */}
      <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 ${compact ? 'gap-2' : 'gap-3'}`}>
        {steps.map((s, idx) => {
          const isActive = activeStep === idx;
          return (
            <div
              key={s.id}
              onClick={() => {
                setActiveStep(idx);
                sound.playClick();
              }}
              className={`rounded-xl sm:rounded-2xl transition-all cursor-pointer flex flex-col justify-between border ${
                compact ? 'p-2 sm:p-2.5' : 'p-4'
              } ${
                isActive
                  ? 'bg-[#fea831] text-[#3c3728] border-[#fea831] shadow-lg scale-102 sm:scale-105 z-10'
                  : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-base mb-1.5">
                  <span className={compact ? 'text-sm sm:text-base' : 'text-lg'}>{s.icon}</span>
                  <span className={`font-mono font-bold px-1.5 py-0.2 rounded-full ${
                    compact ? 'text-[9px]' : 'text-[10px] px-2 py-0.5'
                  } ${
                    isActive ? 'bg-[#3c3728] text-white' : 'bg-white/10 text-white/70'
                  }`}>
                    {s.badge}
                  </span>
                </div>
                <h5 className={`font-bold leading-tight ${compact ? 'text-[11px]' : 'text-xs'} ${isActive ? 'text-[#3c3728]' : 'text-white'}`}>
                  {s.title}
                </h5>
              </div>

              <div className="mt-2 pt-1.5 border-t border-current/10">
                <span className={`font-mono font-extrabold block ${compact ? 'text-[9px]' : 'text-[10px]'}`}>
                  {s.stat}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Detail Card for Active Node + Audio Waveform */}
      <div className={`rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 ${
        compact ? 'p-2.5 sm:p-3' : 'p-4 sm:p-5'
      }`}>
        <div className="flex items-center gap-2.5">
          <span className={compact ? 'text-xl sm:text-2xl' : 'text-3xl'}>{steps[activeStep].icon}</span>
          <div>
            <span className="text-[10px] sm:text-xs font-mono font-bold text-[#fea831] block">
              ACTIVE STAGE: {steps[activeStep].badge}
            </span>
            <p className={`font-medium text-white/90 ${compact ? 'text-xs sm:text-sm' : 'text-sm'}`}>
              {steps[activeStep].detail}
            </p>
          </div>
        </div>

        {/* Audio Waveform Animation (Voice I/O) */}
        <div className="flex items-center gap-1 shrink-0 h-5 sm:h-6">
          {[40, 75, 100, 60, 90, 45, 80, 65].map((h, i) => (
            <span
              key={i}
              className="w-1 bg-[#fea831] rounded-full transition-all duration-300"
              style={{
                height: isAutoPlaying ? `${(h * ((activeStep + 1) / steps.length)).toFixed(0)}%` : '30%',
                opacity: 0.6 + (i % 3) * 0.2
              }}
            />
          ))}
        </div>
      </div>

      {/* Compact vs Full Execution Trace */}
      {compact ? (
        <div className="px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] flex items-center justify-between overflow-x-auto text-white/80">
          <div className="flex items-center gap-2 truncate">
            <span className="text-[#fea831] font-bold shrink-0">[{terminalLogs[activeStep].tag}]</span>
            <span className="truncate">{terminalLogs[activeStep].msg}</span>
          </div>
          <span className="text-white/40 text-[10px] shrink-0 ml-2">{terminalLogs[activeStep].time}</span>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs space-y-1.5 overflow-x-auto">
          <div className="flex items-center justify-between text-[11px] text-white/50 border-b border-white/10 pb-2 mb-2">
            <span>CYCLIC LANGGRAPH EXECUTION TRACE</span>
            <span className="text-[#fea831] font-bold">STATE: AUTONOMOUS ROUTING</span>
          </div>
          {terminalLogs.map((log, i) => {
            const isCurrentLog = i <= activeStep;
            return (
              <div
                key={i}
                className={`flex items-start gap-2.5 transition-opacity duration-300 ${
                  isCurrentLog ? 'opacity-100' : 'opacity-25'
                }`}
              >
                <span className="text-white/40 text-[10px] shrink-0">{log.time}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded shrink-0 ${
                  log.tag === 'QDRANT' || log.tag === 'GEMINI' ? 'bg-[#fea831] text-[#3c3728]' : 'bg-white/10 text-[#fea831]'
                }`}>
                  {log.tag}
                </span>
                <span className="text-white/80">{log.msg}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Flagship Metrics & GitHub Link */}
      <div className={`flex flex-wrap items-center justify-between gap-3 ${compact ? 'pt-1' : 'pt-2'}`}>
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
          <span className="px-2.5 py-1 rounded-full bg-[#fea831]/20 text-[#fea831] border border-[#fea831]/30 font-bold">
            ⚡ &lt;200ms Latency
          </span>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
            ✓ 95%+ Benchmark Accuracy
          </span>
          <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold">
            🔄 5-Node Cyclic Routing
          </span>
        </div>

        <a
          href="https://github.com/AshokTechie"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fea831] text-[#3c3728] font-bold text-xs hover:bg-[#e09124] transition-all shadow-md"
        >
          <Github className="w-3.5 h-3.5 fill-current" />
          <span>View on GitHub (@AshokTechie)</span>
          <ExternalLink className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
};

// =========================================================================
// MAIN PORTFOLIO COMPONENT
// =========================================================================
export const MildSugarPortfolioView = ({
  onOpenResume,
  onOpenCaseStudy,
  onOpenAi,
  onSwitchTo3D,
  onSwitchToList,
  onSwitchToBento,
}) => {
  // Navigation states: 'home' | 'cases'
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedDetailCase, setSelectedDetailCase] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Starts in 'night' mode by default matching the user's video at 00:00
  const [timeMode, setTimeMode] = useState('night'); // 'night' | 'afternoon'
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Character Wake-Up state
  const [isWakingUp, setIsWakingUp] = useState(false);
  const [hasWokenUp, setHasWokenUp] = useState(false);
  const [heyPopActive, setHeyPopActive] = useState(false);

  // Signature full-screen orange curtain wipe transition
  const [isCurtainActive, setIsCurtainActive] = useState(false);

  // Mouse stalker state
  const [stalkerPos, setStalkerPos] = useState({ x: -200, y: -200 });
  const [stalkerMode, setStalkerMode] = useState('none'); // 'none' | 'hey' | 'detail'
  const stalkerRef = useRef({ targetX: -200, targetY: -200, curX: -200, curY: -200 });

  // Preloader timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Enforce zero Picture-in-Picture across all videos in Chrome/Edge
  useEffect(() => {
    const disablePiP = () => {
      document.querySelectorAll('video').forEach((v) => {
        try {
          v.disablePictureInPicture = true;
          v.setAttribute('disablepictureinpicture', 'true');
          v.setAttribute('controlslist', 'nodownload nofullscreen noremoteplayback nopictureinpicture');
          v.removeAttribute('controls');
          if (document.pictureInPictureElement === v) {
            document.exitPictureInPicture().catch(() => {});
          }
        } catch (_) {}
      });
    };
    disablePiP();
    const observer = new MutationObserver(disablePiP);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  // Smooth mouse stalker lerp loop
  useEffect(() => {
    let reqId;
    const updateStalker = () => {
      const s = stalkerRef.current;
      s.curX += (s.targetX - s.curX) * 0.18;
      s.curY += (s.targetY - s.curY) * 0.18;
      setStalkerPos({ x: s.curX, y: s.curY });
      reqId = requestAnimationFrame(updateStalker);
    };
    reqId = requestAnimationFrame(updateStalker);

    const handleMouseMove = (e) => {
      stalkerRef.current.targetX = e.clientX;
      stalkerRef.current.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Signature Mild Sugar Orange Curtain Wipe Transition
  const triggerTransition = (action) => {
    setStalkerMode('none');
    sound.playSwoosh();
    setIsCurtainActive(true);
    setTimeout(() => {
      action();
      setStalkerMode('none');
      setTimeout(() => {
        setIsCurtainActive(false);
      }, 380);
    }, 380);
  };

  // Character Click to Wake Up (00:03 in video)
  const handleCharacterClick = () => {
    setStalkerMode('none');
    if (hasWokenUp) {
      sound.playPop();
      return;
    }
    sound.playPop();
    setHeyPopActive(true);
    setIsWakingUp(true);

    // After 2.4s (character finishes stretch and chair spin to face front), show white profile card
    setTimeout(() => {
      setHasWokenUp(true);
      setHeyPopActive(false);
      setStalkerMode('none');
    }, 2400);
  };

  // Wheel navigation on Cases page
  useEffect(() => {
    if (currentPage !== 'cases' || selectedDetailCase !== null) return;

    let isThrottled = false;
    const handleWheel = (e) => {
      if (isThrottled) return;
      if (Math.abs(e.deltaY) > 25) {
        isThrottled = true;
        setStalkerMode('none');
        if (e.deltaY > 0) {
          setActiveCaseIdx((prev) => (prev < CASES_DATA.length - 1 ? prev + 1 : prev));
        } else {
          setActiveCaseIdx((prev) => (prev > 0 ? prev - 1 : prev));
        }
        sound.playSwoosh();
        setTimeout(() => {
          isThrottled = false;
        }, 650);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentPage, selectedDetailCase]);

  // Keyboard navigation on Cases page
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedDetailCase !== null) {
          triggerTransition(() => setSelectedDetailCase(null));
        } else if (isMenuOpen) {
          setIsMenuOpen(false);
        }
        return;
      }
      if (currentPage === 'cases' && selectedDetailCase === null) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          setStalkerMode('none');
          setActiveCaseIdx((prev) => (prev < CASES_DATA.length - 1 ? prev + 1 : prev));
          sound.playSwoosh();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          setStalkerMode('none');
          setActiveCaseIdx((prev) => (prev > 0 ? prev - 1 : prev));
          sound.playSwoosh();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, selectedDetailCase, isMenuOpen]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.identity.email);
    setCopiedEmail(true);
    sound.playSuccess();
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // =========================================================================
  // THE 5 CORE CONTENT SECTIONS (Requested by User)
  // 1: My Space (Personal Hobbies & Lifestyle)
  // 2: Experience (ConnectSecure Developing Experience)
  // 3: Projects (Conversational AI Agent – Agentic RAG with Animation)
  // 4: Skills (Technical Arsenal & Capabilities)
  // 5: Connect (Direct Channels: Email, GitHub, LinkedIn, LeetCode)
  // =========================================================================
  const CASES_DATA = [
    {
      id: 'myspace',
      navLabel: 'My Space',
      badge: 'Personal Life & Hobbies',
      marqueeText: 'beyond the code • my cozy room • books, music, travel & feline friends • ',
      title: 'Beyond the Code: My Cozy Corner & Hobbies',
      shortTitle: 'My Space & Hobbies',
      tagline: 'When I step away from terminal screens, here is what brings me joy, peace, and curiosity.',
      type: 'video',
      src: '/mildsugar/video/case/about.webm',
      descriptionLine1: 'Beyond the code: my cozy personal corner, passions, and life outside work.',
      descriptionLine2: 'Where late-night lo-fi music, book collections, travel dreams, and cat cuddles come together.',
      tags: ['Personal Space', 'Hobbies', 'Lifestyle', 'Cat Lover', 'Avid Reader'],
      meta: {
        role: 'Personal Life & Passion Projects',
        period: 'Everyday Life',
        location: 'Bengaluru, India',
        stack: 'Lo-Fi Music, Literature, Travel, Cats'
      },
      content: {
        background: 'Software engineering is my craft, but my curiosity extends into books, quiet reflective evenings, discovering cultures across the globe, and spending time with my friendly cat. This personal space keeps me balanced, grounded, and endlessly creative.',
        challenges: [
          'Balancing deep technical problem-solving with creative mindfulness and healthy lifestyle habits.',
          'Carving out time for lifelong learning across literature, philosophy, and history.',
          'Keeping a peaceful, joyful work-from-home corner with playful feline energy.'
        ],
        solution: 'Creating a dedicated space that blends work and relaxation: a trusted laptop for creative pursuits and music, an expansive bookshelf for constant learning, a globe inspiring future explorations, and a warm furry friend by my side.',
        outcomes: [
          'Avid reader of non-fiction, thought-provoking literature, and biographies.',
          'Curiosity-driven explorer passionate about global geography, culture, and architecture.',
          'Proud cat enthusiast who cherishes the playful, calming presence of a purring companion.'
        ]
      },
      hobbies: [
        {
          icon: '💻',
          title: 'The Laptop (Digital Playground & Lo-Fi Chill)',
          desc: 'My personal retreat after hours — unwinding with soothing lo-fi beats, watching thoughtful sci-fi films, exploring creative hobbies, and casual side hacking on weekend ideas.'
        },
        {
          icon: '📚',
          title: 'The Bookshelf (Curious Reader & Lifelong Learner)',
          desc: 'Far beyond technical textbooks — an eclectic personal library of non-fiction, inspiring memoirs, science, philosophy, and essays that nurture broad, human-centered perspectives.'
        },
        {
          icon: '🌍',
          title: 'The Globe (Wanderlust & Geography Enthusiast)',
          desc: 'A lifelong fascination with world maps, global history, varied cultures, and travel dreams. Inspires me to look at the world with curiosity and openness.'
        },
        {
          icon: '🐱',
          title: 'The Friendly Cat (The Purrfect Furry Companion)',
          desc: 'A true cat lover at heart! An affectionate, playful companion who sits nearby during late-night coding sessions, bringing warmth, humor, and calm to my everyday routine.'
        }
      ]
    },
    {
      id: 'experience',
      navLabel: 'Experience',
      badge: 'Enterprise Engineering',
      marqueeText: 'software engineer at connectsecure • building real-time cgd platform • ',
      title: 'Software Engineer @ ConnectSecure',
      shortTitle: 'ConnectSecure Experience',
      tagline: 'Architecting real-time City Gas Distribution monitoring dashboards in Angular 20, sub-second WebSockets, and Python microservices on Azure AKS.',
      type: 'image',
      src: '/mildsugar/images/case/icon-case1.png',
      descriptionLine1: 'Real-time operations platform tracking hundreds of BPCL retail outlets.',
      descriptionLine2: 'Angular 20, PrimeNG, ApexCharts, and sub-second WebSockets alert streaming.',
      tags: ['ConnectSecure', 'Angular 20', 'WebSockets', 'Python (Flask)', 'Azure AKS'],
      meta: {
        role: 'Frontend & Systems Architect (ConnectSecure)',
        period: 'Feb 2026 — Present',
        location: 'On-site • Bengaluru, Karnataka',
        stack: 'Angular 20, TypeScript, Python (Flask), Azure AKS, Cosmos DB'
      },
      content: {
        background: 'At ConnectSecure, I architect mission-critical operations dashboards for Bharat Petroleum Corporation Limited (BPCL) City Gas Distribution (CGD) across hundreds of retail outlets. Station operators and central executives rely on this platform for real-time visibility into CNG dispenser sales, mass flow meter (MFM) telemetry, and emergency alerts.',
        challenges: [
          'High-frequency telemetry bursts from hundreds of stations caused heavy RxJS change-detection re-renders on Angular canvas, leading to UI thread blocking and screen freeze.',
          'Sub-second emergency shutdown (ESD) and safety alert propagation required across geographically distributed retail outlets.',
          'Complex multi-station spatial filtering, date-range analytical queries, and custody volume reconciliation.'
        ],
        solution: 'Architected scalable real-time dashboards in Angular 20 with PrimeNG and ApexCharts. Optimized Angular change-detection and integrated WebSockets (Flask-SocketIO) for live geospatial streaming without UI thread freezes. Built station-level Gas Custody Reconciliation Billing Engine in Python, automating conversions (kg, SCM, MMBTU) and penalty guardrails (≤90% / ≥110%).',
        outcomes: [
          'Live CNG dispenser sales and MFM telemetry tracked across hundreds of BPCL Retail Outlets.',
          'Sub-second emergency shutdown alert delivery eliminating UI freezing completely.',
          '100% automated station-level daily volume reconciliation and provisional PDF statement generation.',
          'Automated zero-downtime CI/CD containerized deployments across multi-cluster Azure Kubernetes Service (DEV, QA, PROD).'
        ]
      }
    },
    {
      id: 'projects',
      navLabel: 'Projects',
      badge: 'Flagship Project',
      marqueeText: 'flagship agentic rag pipeline • langgraph cyclic routing • qdrant engine • ',
      title: 'Conversational AI Agent – Agentic RAG System',
      shortTitle: 'Conversational AI Agent',
      tagline: 'Production-grade agentic RAG with 5-node cyclic LangGraph state machine, sub-200ms Qdrant vector retrieval, and Gemini API grounding.',
      type: 'image',
      src: '/mildsugar/images/case/icon-case3.png',
      descriptionLine1: 'Flagship Conversational AI Agent with 5-node cyclic LangGraph routing.',
      descriptionLine2: 'Sub-200ms Qdrant vector retrieval, HuggingFace embeddings, and Gemini API grounding.',
      tags: ['Flagship Project', 'Agentic RAG', 'LangGraph', 'Qdrant Vector DB', 'Voice I/O'],
      isAnimatedProject: true,
      meta: {
        role: 'Sole Developer & AI Systems Engineer',
        period: 'GitHub Flagship Project (@AshokTechie)',
        location: 'Bengaluru, India',
        stack: 'Python, LangChain, LangGraph, Qdrant, HuggingFace, Gemini API, Voice I/O'
      },
      content: {
        background: 'Traditional linear Retrieval-Augmented Generation (RAG) pipelines fail when queries require multi-step reasoning, retrieval produces irrelevant context, or complex technical documents (PDFs) contain contradictory information.',
        challenges: [
          'Linear RAG pipelines cannot backtrack or self-correct when initial document retrieval is poor.',
          'Sub-200ms latency requirement for dense semantic vector search over large document sets.',
          'Eliminating hallucinations through citation validation while maintaining natural conversational voice I/O.'
        ],
        solution: 'Designed a LangGraph agentic pipeline with cyclic state routing, goal decomposition, and 5 decoupled nodes: Ingestion, Chunking, Embedding, Retrieval, and Generation. Stored vectors in Qdrant for semantic similarity search with HuggingFace embeddings. Connected Gemini API for grounded generation with prompt engineering, output validation, and speech recognition/synthesis for full voice I/O.',
        outcomes: [
          'Sub-200ms vector retrieval latency on 50+ indexed documents in Qdrant.',
          '95%+ accuracy across 20+ benchmark test evaluation scenarios.',
          'Shipped end-to-end working agentic application with observable pipeline stages and structured error handling.'
        ]
      }
    },
    {
      id: 'skills',
      navLabel: 'Skills',
      badge: 'Technical Arsenal',
      marqueeText: 'technical arsenal • cloud microservices • core computer science • ',
      title: 'Technical Arsenal & Production Stack',
      shortTitle: 'Skills & Capabilities',
      tagline: 'Full-spectrum engineering stack across Angular 20, Python, Azure AKS, Cosmos DB, Docker, and distributed databases.',
      type: 'image',
      src: '/mildsugar/images/case/icon-case4.png',
      descriptionLine1: 'Enterprise software toolkit across Angular 20, Python, TypeScript, and Azure AKS.',
      descriptionLine2: 'Containerized microservices, Cosmos DB, and automated Azure DevOps CI/CD.',
      tags: ['Technical Arsenal', 'Full Stack', 'Cloud & DevOps', 'Core CS'],
      meta: {
        role: 'Full-Spectrum Engineering Arsenal',
        period: 'Continuously Evolving',
        location: 'Enterprise & Open Source',
        stack: 'Angular 20, Python, TypeScript, Azure AKS, Cosmos DB, Qdrant, Docker'
      },
      content: {
        background: 'Ashok’s technical capabilities span the entire engineering lifecycle, from responsive UI interfaces to high-throughput cloud microservices, containerized deployments, and vector search systems.',
        challenges: [
          'Maintaining high code quality and testability across multi-tier microservices architectures.',
          'Deploying zero-downtime rolling releases across DEV, QA, and PROD Kubernetes environments.'
        ],
        solution: 'Leverages modern tools: Angular 20, TypeScript, Python (Flask), FastAPI, Node.js, Express, Docker, and Azure DevOps CI/CD. Employs strong fundamentals in Object Oriented Programming, Computer Networks, Operating Systems, and Data Structures & Algorithms.',
        outcomes: [
          'Databases: Azure Cosmos DB, Qdrant, MongoDB, MySQL, Firebase.',
          'Frameworks: Angular 20, Flask, LangChain, LangGraph, React, Node.js, Express, FastAPI, Tailwind CSS.',
          'Languages: Python, TypeScript, JavaScript, C, C++, Java, SQL.',
          'Tools: Azure Kubernetes Service (AKS), Azure IoT, GCP, Docker, Linux, Postman, GitHub, CI/CD, Kubernetes.',
          'Academic Distinction: UVCE B.Tech ECE (CGPA: 8.76 / 10 distinction graduate).'
        ]
      }
    },
    {
      id: 'connect',
      navLabel: 'Connect',
      badge: 'Get In Touch',
      marqueeText: 'reach out to ashok • email, linkedin, github & leetcode • ',
      title: 'Get in Touch with Ashok',
      shortTitle: 'Connect & Socials',
      tagline: 'Direct channels to get in touch, inspect source code, or explore software engineering opportunities.',
      type: 'image',
      src: '/mildsugar/images/case/icon-case5.png',
      descriptionLine1: 'Open for high-impact Software Engineer, Full-Stack, and Cloud Microservices roles.',
      descriptionLine2: 'Send an email or connect directly on LinkedIn / GitHub / LeetCode.',
      tags: ['Direct Channels', 'Email', 'LinkedIn', 'GitHub', 'LeetCode', 'Resume PDF'],
      meta: {
        role: 'Available for Software Engineering Roles',
        period: 'Immediate Availability',
        location: 'Bengaluru, Karnataka (Open to Remote/Relocation)',
        stack: 'Email, LinkedIn, GitHub, LeetCode, Resume PDF'
      },
      content: {
        background: 'Looking for a disciplined, high-impact Software Engineer who understands distributed systems from the register level up to the Kubernetes cluster? Let’s connect!',
        challenges: [
          'Hiring an engineer with proven enterprise cloud microservices experience.',
          'Validating real hands-on contributions across Angular 20, Python, and WebSockets.'
        ],
        solution: 'Direct verified source code repositories on GitHub (@AshokTechie), active algorithmic practice on LeetCode (@Ashok_H), and 1-click single-source-of-truth ATS resume download.',
        outcomes: [
          'Email: ashok.anjinappa@campusuvce.in',
          'Phone: +91 9741854203',
          'GitHub: github.com/AshokTechie',
          'LinkedIn: linkedin.com/in/ashok-h-75a0b82a9',
          'LeetCode: leetcode.com/u/Ashok_H/'
        ]
      }
    }
  ];

  const currentCase = CASES_DATA[activeCaseIdx];

  // Helper for Next Case on Detail Page (cycles through cases: 0-4)
  const currentDetailIdx = selectedDetailCase ? CASES_DATA.findIndex((c) => c.id === selectedDetailCase.id) : 0;
  const nextCase = CASES_DATA[(currentDetailIdx + 1) % CASES_DATA.length];

  return (
    <div className="relative min-h-screen bg-[#f7f5f1] text-[#3c3728] font-sans overflow-x-hidden selection:bg-[#fea831] selection:text-white">
      
      {/* =================================================================== */}
      {/* 0. SIGNATURE MILD SUGAR ORANGE CURTAIN TRANSITION                   */}
      {/* =================================================================== */}
      {isCurtainActive && (
        <div 
          className="fixed inset-0 z-[100] bg-[#fea831] pointer-events-none animate-curtain"
        />
      )}

      {/* =================================================================== */}
      {/* 1. PRELOADER (Exact Mild Sugar replica)                             */}
      {/* =================================================================== */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f7f5f1] transition-opacity duration-500">
          <div className="relative flex flex-col items-center justify-center text-center">
            <p className="text-sm font-medium tracking-wide text-[#3c3728]/70 leading-relaxed">
              Don’t be shy.<br />
              Feel free to say
            </p>
            <p className="text-3xl font-extrabold text-[#3c3728] tracking-tight mt-1" style={{ fontFamily: 'Righteous, cursive' }}>
              “Hey!”
            </p>
            <img 
              src="/mildsugar/images/home/loading.svg" 
              alt="Loading" 
              className="w-40 h-40 mt-4 animate-spin-slow"
            />
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. TOP HEADER (Brand & 56px Orange 3-Dot Menu Button)               */}
      {/* =================================================================== */}
      <header className="fixed top-6 sm:top-6 left-0 right-0 z-40 flex items-start justify-between px-6 sm:px-10 pointer-events-none">
        
        {/* Brand & Sub-List */}
        <div className="pointer-events-auto select-none">
          <button 
            onClick={() => {
              sound.playPop();
              triggerTransition(() => {
                setSelectedDetailCase(null);
                setCurrentPage('home');
              });
            }}
            className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#3c3728] hover:text-[#fea831] transition-colors text-left block cursor-pointer"
            style={{ fontFamily: 'Righteous, cursive' }}
          >
            Ashok H
          </button>
          
          <div className="text-[11px] sm:text-xs text-[#3c3728]/65 font-medium leading-relaxed mt-1.5 hidden sm:block">
            <p>Software & Systems Engineer</p>
            <p>Enterprise Cloud Microservices</p>
            <p>Industrial Telemetry & WebSockets</p>
            <p>Conversational Agentic AI</p>
          </div>
        </div>

        {/* View Switchers + 56px 3-Vertical-White-Dot Button */}
        <div className="pointer-events-auto flex items-center gap-3">
          
          {/* Day / Night Mode Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setTimeMode((prev) => (prev === 'night' ? 'afternoon' : 'night'));
            }}
            className="w-10 h-10 rounded-full bg-white/90 border border-[#3c3728]/15 flex items-center justify-center text-[#3c3728] hover:bg-white transition-all shadow-sm cursor-pointer"
            title={`Switch to ${timeMode === 'night' ? 'Afternoon' : 'Night'} Room`}
          >
            {timeMode === 'night' ? (
              <Moon className="w-4 h-4 text-[#fea831]" />
            ) : (
              <Sun className="w-4 h-4 text-[#fea831]" />
            )}
          </button>

          {/* Mild Sugar 56px Menu Button with 3 vertical white dots */}
          <button
            onClick={() => {
              sound.playClick();
              setIsMenuOpen((prev) => !prev);
            }}
            className="relative w-14 h-14 rounded-full bg-[#fea831] shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center pointer-events-auto"
            aria-label="Toggle navigation menu"
          >
            <span className="absolute w-1.5 h-1.5 rounded-full bg-white -translate-y-2.5" />
            <span className="absolute w-1.5 h-1.5 rounded-full bg-white" />
            <span className="absolute w-1.5 h-1.5 rounded-full bg-white translate-y-2.5" />
          </button>
        </div>
      </header>

      {/* =================================================================== */}
      {/* 3. COMPACT FLOATING ORANGE MENU PILL (Exact mildsugardesign.jp)     */}
      {/* 212px width x 398px height, rounded-[28px], top-right floating     */}
      {/* =================================================================== */}
      {isMenuOpen && (
        <>
          {/* Transparent dismiss backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-transparent cursor-default"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Floating Rounded Orange Menu Card */}
          <div 
            className="fixed top-6 right-4 sm:right-10 z-50 w-[212px] h-[398px] bg-[#fea831] text-white rounded-[28px] shadow-2xl p-7 flex flex-col justify-between select-none animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            style={{ fontFamily: 'Righteous, cursive' }}
          >
            {/* Top Close Button (White X in top right) */}
            <div className="flex justify-end -mt-1 -mr-1">
              <button
                onClick={() => {
                  sound.playClick();
                  setIsMenuOpen(false);
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/90 hover:text-white transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-3.5 my-auto text-base">
              <div className="space-y-2.5">
                <div>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      triggerTransition(() => {
                        setSelectedDetailCase(null);
                        setCurrentPage('home');
                      });
                    }}
                    className={`block transition-opacity text-left cursor-pointer ${
                      currentPage === 'home' ? 'opacity-50 pointer-events-none' : 'hover:opacity-75'
                    }`}
                  >
                    Home
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      triggerTransition(() => {
                        setSelectedDetailCase(null);
                        setCurrentPage('cases');
                        setActiveCaseIdx(0);
                      });
                    }}
                    className={`block transition-opacity text-left cursor-pointer ${
                      currentPage === 'cases' && activeCaseIdx === 0 && selectedDetailCase === null ? 'opacity-50 pointer-events-none' : 'hover:opacity-75'
                    }`}
                  >
                    My Space
                  </button>
                </div>
              </div>

              {/* Explore Section */}
              <div className="space-y-2 pt-1 border-t border-white/20">
                <span className="block text-[11px] text-white/70 font-sans font-medium tracking-wider uppercase">
                  Explore
                </span>
                <div className="pl-2 space-y-2">
                  {CASES_DATA.slice(1, 5).map((c, idx) => {
                    const actualIdx = idx + 1;
                    const isActive = currentPage === 'cases' && activeCaseIdx === actualIdx && selectedDetailCase === null;
                    return (
                      <button
                        key={c.id}
                        onClick={() => {
                          setIsMenuOpen(false);
                          triggerTransition(() => {
                            setSelectedDetailCase(null);
                            setCurrentPage('cases');
                            setActiveCaseIdx(actualIdx);
                          });
                        }}
                        className={`block transition-opacity text-left cursor-pointer ${
                          isActive ? 'opacity-50 pointer-events-none' : 'hover:opacity-75'
                        }`}
                      >
                        {c.navLabel}
                      </button>
                    );
                  })}
                </div>
              </div>
            </nav>
          </div>
        </>
      )}

      {/* =================================================================== */}
      {/* 4. HOME ROOM VIEW (Exact replica of video 00:00 - 00:12)            */}
      {/* Zero Letterboxing, Edge-to-Edge Cover, Character Stays at Desk     */}
      {/* =================================================================== */}
      {currentPage === 'home' && (
        <main className="relative w-full h-screen overflow-hidden flex items-center justify-center select-none bg-[#f7f5f1]">
          
          {/* Room + Character Stage Container (Pans left smoothly on wake up) */}
          <div 
            className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden transition-transform duration-700 ease-out"
            style={{
              transform: hasWokenUp ? 'translateX(-12%)' : 'translateX(0)'
            }}
          >
            {/* Edge-to-Edge Room Background */}
            <div className="absolute inset-0 w-full h-full">
              {timeMode === 'night' ? (
                <img
                  src="/mildsugar/images/home/room_night.jpg"
                  alt="Room Night"
                  className="w-full h-full min-w-full min-h-full object-cover pointer-events-none select-none"
                />
              ) : (
                <video
                  key="room-afternoon-video"
                  src="/mildsugar/video/room_afternoon.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  disablePictureInPicture={true}
                  controls={false}
                  controlsList="nodownload nofullscreen noremoteplayback nopictureinpicture"
                  tabIndex={-1}
                  className="w-full h-full min-w-full min-h-full object-cover pointer-events-none select-none"
                />
              )}
            </div>

            {/* Interactive Character at Desk */}
            <div 
              className="absolute z-10 flex items-center justify-center pointer-events-none"
              style={{
                top: '58%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {timeMode === 'night' ? (
                /* NIGHT ROOM CHARACTER */
                <div className="relative flex items-center justify-center">
                  {!isWakingUp && !hasWokenUp ? (
                    <div 
                      onClick={handleCharacterClick}
                      onMouseEnter={() => {
                        if (!hasWokenUp && !isWakingUp) setStalkerMode('hey');
                      }}
                      onMouseLeave={() => setStalkerMode('none')}
                      className="relative cursor-pointer group flex items-center justify-center pointer-events-auto"
                    >
                      {/* Sleeping Character Body */}
                      <img
                        src="/mildsugar/video/character/character_sleep.png"
                        alt="Sleeping Character"
                        className="w-[320px] sm:w-[420px] md:w-[480px] h-auto object-contain drop-shadow-lg"
                      />

                      {/* Floating ZZZ Animation */}
                      <video
                        src="/mildsugar/video/sleep_icon.webm"
                        autoPlay
                        loop
                        muted
                        playsInline
                        disablePictureInPicture={true}
                        controls={false}
                        controlsList="nodownload nofullscreen noremoteplayback nopictureinpicture"
                        tabIndex={-1}
                        className="absolute -top-10 right-4 sm:right-10 w-20 h-20 pointer-events-none"
                      />

                      {/* Spinning Circular SVG Badge over sleeping character */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="relative flex items-center justify-center">
                          <svg 
                            viewBox="0 0 200 200" 
                            className="w-48 h-48 sm:w-60 sm:h-60 animate-spin-slow drop-shadow-md"
                          >
                            <path
                              id="circlePathHomeNight"
                              d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                              fill="none"
                            />
                            <text className="fill-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em]">
                              <textPath href="#circlePathHomeNight" startOffset="0%">
                                Click me! Welcome to my room. Click me! Welcome to my room.
                              </textPath>
                            </text>
                          </svg>

                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                            <p className="text-[10px] sm:text-[11px] font-medium leading-tight text-white/90">
                              Don’t be shy.<br />Feel free to say
                            </p>
                            <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5" style={{ fontFamily: 'Righteous, cursive' }}>
                              “Hey!”
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <video
                      key="waking-night-video"
                      src="/mildsugar/video/character/night_click-pose.webm"
                      autoPlay
                      playsInline
                      muted
                      disablePictureInPicture={true}
                      controls={false}
                      controlsList="nodownload nofullscreen noremoteplayback nopictureinpicture"
                      tabIndex={-1}
                      className="w-[320px] sm:w-[420px] md:w-[480px] h-auto object-contain drop-shadow-2xl pointer-events-auto"
                    />
                  )}

                  {/* Popping Orange 'Hey!' Circle at 00:03 */}
                  {heyPopActive && (
                    <div className="absolute z-30 pointer-events-none animate-in zoom-in-50 fade-in duration-300">
                      <div 
                        className="w-24 h-24 rounded-full bg-[#fea831] text-white flex items-center justify-center text-2xl font-extrabold shadow-2xl"
                        style={{ fontFamily: 'Righteous, cursive' }}
                      >
                        Hey!
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* AFTERNOON ROOM CHARACTER */
                <div className="relative flex items-center justify-center">
                  {!isWakingUp && !hasWokenUp ? (
                    <div 
                      onClick={handleCharacterClick}
                      onMouseEnter={() => {
                        if (!hasWokenUp && !isWakingUp) setStalkerMode('hey');
                      }}
                      onMouseLeave={() => setStalkerMode('none')}
                      className="relative cursor-pointer group flex items-center justify-center pointer-events-auto"
                    >
                      {/* Character Typing at Laptop in Day Mode */}
                      <video
                        key="character-typing-video"
                        src="/mildsugar/video/character/typing.webm"
                        autoPlay
                        loop
                        muted
                        playsInline
                        disablePictureInPicture={true}
                        controls={false}
                        controlsList="nodownload nofullscreen noremoteplayback nopictureinpicture"
                        tabIndex={-1}
                        className="w-[300px] sm:w-[390px] md:w-[450px] h-auto object-contain drop-shadow-xl"
                      />

                      {/* Spinning Circular SVG Badge over typing character */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="relative flex items-center justify-center">
                          <svg 
                            viewBox="0 0 200 200" 
                            className="w-48 h-48 sm:w-60 sm:h-60 animate-spin-slow drop-shadow-md"
                          >
                            <path
                              id="circlePathHomeDay"
                              d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                              fill="none"
                            />
                            <text className="fill-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em]">
                              <textPath href="#circlePathHomeDay" startOffset="0%">
                                Click me! Welcome to my room. Click me! Welcome to my room.
                              </textPath>
                            </text>
                          </svg>

                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                            <p className="text-[10px] sm:text-[11px] font-medium leading-tight text-white/90">
                              Don’t be shy.<br />Feel free to say
                            </p>
                            <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5" style={{ fontFamily: 'Righteous, cursive' }}>
                              “Hey!”
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <video
                      key="waking-afternoon-video"
                      src="/mildsugar/video/character/click-pose.webm"
                      autoPlay
                      playsInline
                      muted
                      disablePictureInPicture={true}
                      controls={false}
                      controlsList="nodownload nofullscreen noremoteplayback nopictureinpicture"
                      tabIndex={-1}
                      className="w-[320px] sm:w-[420px] md:w-[480px] h-auto object-contain drop-shadow-2xl pointer-events-auto"
                    />
                  )}

                  {/* Popping Orange 'Hey!' Circle at 00:03 */}
                  {heyPopActive && (
                    <div className="absolute z-30 pointer-events-none animate-in zoom-in-50 fade-in duration-300">
                      <div 
                        className="w-24 h-24 rounded-full bg-[#fea831] text-white flex items-center justify-center text-2xl font-extrabold shadow-2xl"
                        style={{ fontFamily: 'Righteous, cursive' }}
                      >
                        Hey!
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* White Profile Side Drawer */}
          {hasWokenUp && (
            <div 
              onMouseEnter={() => setStalkerMode('none')}
              className="fixed top-0 right-0 h-full w-[640px] max-w-[92vw] bg-[#f7f5f1] border-l border-[#3c3728]/10 rounded-l-[40px] p-8 sm:p-14 shadow-2xl z-30 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-500"
            >
              <div className="space-y-6">
                <div>
                  <h2 className="text-5xl sm:text-7xl font-extrabold text-[#3c3728] tracking-tight" style={{ fontFamily: 'Righteous, cursive' }}>
                    Hey! 🤝
                  </h2>
                  <p className="text-xl sm:text-2xl font-bold text-[#3c3728] mt-2 leading-snug">
                    I’m a software engineer working under the name Ashok H.
                  </p>
                </div>

                <div className="text-sm sm:text-base text-[#3c3728]/80 leading-relaxed space-y-3 font-normal">
                  <p>
                    Software Engineer at <strong>ConnectSecure</strong>, architecting real-time City Gas Distribution monitoring dashboards in Angular 20, WebSockets alert streaming, and Python microservices on Azure AKS.
                  </p>
                  <p>
                    Electronics & Communication Engineering distinction graduate from <strong>University of Visvesvaraya College of Engineering (UVCE, 8.76 CGPA)</strong>. Flagship projects in Agentic RAG (LangGraph & Qdrant) and distributed systems.
                  </p>
                </div>

                <div className="pt-2">
                  <img
                    src="/mildsugar/images/home/bemildtoday_once.gif"
                    alt="Be Mild Today"
                    className="w-44 h-auto rounded-xl"
                  />
                </div>
              </div>

              {/* Signature 'Get to know me ↗' typography link */}
              <div className="pt-8">
                <button
                  onClick={() => triggerTransition(() => {
                    setStalkerMode('none');
                    setCurrentPage('cases');
                    setActiveCaseIdx(0);
                  })}
                  className="group flex items-center gap-4 text-3xl sm:text-5xl font-extrabold text-[#3c3728] hover:text-[#fea831] transition-colors cursor-pointer"
                  style={{ fontFamily: 'Righteous, cursive' }}
                >
                  <span>Get to know me</span>
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 fill-[#fea831] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" viewBox="0 0 40 40">
                    <path d="M33.6508 10.7936L5.47619 39.0476C4.84127 39.6825 4.08677 40 3.2127 40C2.34074 40 1.5873 39.6825 0.95238 39.0476C0.317459 38.4127 0 37.6582 0 36.7841C0 35.9122 0.317459 35.1587 0.95238 34.5238L29.2064 6.34921H5.07936C4.17989 6.34921 3.4254 6.0455 2.81587 5.43809C2.20847 4.82857 1.90476 4.07407 1.90476 3.1746C1.90476 2.27513 2.20847 1.52064 2.81587 0.911112C3.4254 0.303704 4.17989 0 5.07936 0H36.8254C37.7249 0 38.4783 0.303704 39.0857 0.911112C39.6952 1.52064 40 2.27513 40 3.1746V34.9206C40 35.8201 39.6952 36.5735 39.0857 37.181C38.4783 37.7905 37.7249 38.0952 36.8254 38.0952C35.9259 38.0952 35.1725 37.7905 34.5651 37.181C33.9556 36.5735 33.6508 35.8201 33.6508 34.9206V10.7936Z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </main>
      )}

      {/* =================================================================== */}
      {/* 5. CASES FEED VIEW (Exact replica of mildsugardesign.jp /cases/)    */}
      {/* Exactly matches user's Second Image on ALL pages!                   */}
      {/* =================================================================== */}
      {currentPage === 'cases' && selectedDetailCase === null && (
        <main className="relative w-full h-screen overflow-hidden flex flex-col justify-between p-6 sm:p-10 select-none">
          
          {/* Main Content Area: Centered Vertically */}
          <div className="my-auto w-full flex flex-col items-center justify-center">
            
            {/* Top Label: 'My Space', 'Experience', 'Projects', etc. */}
            <h2 
              className="text-4xl sm:text-6xl font-extrabold text-[#3c3728] tracking-tight mb-2 select-none" 
              style={{ fontFamily: 'Righteous, cursive' }}
            >
              {currentCase.navLabel}
            </h2>

            {/* ============================================================= */}
            {/* UPPER HERO AREA (STRICTLY ABOVE THE RED LINE!)                */}
            {/* Hovering triggers 'View Detail ↗' stalker.                    */}
            {/* Exactly matches user's Second Image!                          */}
            {/* ============================================================= */}
            <div 
              className="relative w-full max-w-5xl h-[280px] sm:h-[340px] flex items-center justify-center select-none cursor-pointer"
              onMouseEnter={() => setStalkerMode('detail')}
              onMouseLeave={() => setStalkerMode('none')}
              onClick={() => triggerTransition(() => setSelectedDetailCase(currentCase))}
            >
              {/* Giant Solid Orange Background Marquee Text */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
                <div 
                  className="whitespace-nowrap flex animate-marquee text-mildsugar-marquee text-7xl sm:text-9xl select-none"
                >
                  <span className="mr-8">{currentCase.marqueeText}</span>
                  <span className="mr-8">{currentCase.marqueeText}</span>
                </div>
              </div>

              {/* 3D Asset in front */}
              <div className="relative z-10 flex items-center justify-center pointer-events-none w-52 h-52 sm:w-64 sm:h-64">
                {currentCase.type === 'video' ? (
                  <video
                    key={currentCase.src}
                    src={currentCase.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture={true}
                    controls={false}
                    controlsList="nodownload nofullscreen noremoteplayback nopictureinpicture"
                    tabIndex={-1}
                    className="w-full h-full object-contain drop-shadow-xl"
                  />
                ) : (
                  <img
                    key={currentCase.src}
                    src={currentCase.src}
                    alt={currentCase.title}
                    className="w-full h-full object-contain drop-shadow-xl"
                  />
                )}
              </div>
            </div>

            {/* ============================================================= */}
            {/* BELOW THE RED LINE BOUNDARY: Clean 2-Line English Description */}
            {/* Stalker is FORBIDDEN below this line!                         */}
            {/* ============================================================= */}
            <div 
              onMouseEnter={() => setStalkerMode('none')}
              className="text-center mt-5 space-y-1.5 select-none z-10 max-w-xl px-4"
            >
              <p className="text-sm sm:text-base font-semibold text-[#3c3728] leading-relaxed">
                {currentCase.descriptionLine1}
              </p>
              <p className="text-xs sm:text-sm text-[#3c3728]/70 leading-relaxed font-normal">
                {currentCase.descriptionLine2}
              </p>
            </div>
          </div>

          {/* Bottom Footer: Left Copyright & Right Vertical Dot Navigation */}
          <footer 
            onMouseEnter={() => setStalkerMode('none')}
            className="w-full flex items-end justify-between text-xs text-[#3c3728]/60 font-mono select-none"
          >
            <div>
              <span>© Ashok H</span>
            </div>

            {/* Vertical Dot Navigation on Bottom Right */}
            <nav className="fixed right-6 sm:right-10 bottom-6 sm:bottom-8 z-30 flex flex-col items-end gap-1.5 font-mono text-[11px] select-none">
              {CASES_DATA.map((c, idx) => {
                const isActive = activeCaseIdx === idx;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      sound.playClick();
                      setStalkerMode('none');
                      setActiveCaseIdx(idx);
                    }}
                    className={`flex items-center gap-2 transition-all cursor-pointer ${
                      isActive ? 'text-[#3c3728] font-bold' : 'text-[#3c3728]/35 hover:text-[#3c3728]'
                    }`}
                  >
                    <span>{c.navLabel}</span>
                    <span 
                      className={`w-2 h-2 rounded-full transition-transform ${
                        isActive ? 'bg-[#fea831] scale-125' : 'bg-[#fea831]/30'
                      }`} 
                    />
                  </button>
                );
              })}
            </nav>
          </footer>
        </main>
      )}

      {/* =================================================================== */}
      {/* 6. FULL CASE STUDY DETAIL PAGE VIEW (Cases 0 through 4)             */}
      {/* =================================================================== */}
      {selectedDetailCase !== null && (
        <main 
          onMouseEnter={() => setStalkerMode('none')}
          className="relative min-h-screen bg-[#f7f5f1] text-[#3c3728] p-6 sm:p-16 pt-28 sm:pt-36 max-w-4xl mx-auto space-y-12 animate-in fade-in duration-300"
        >
          {/* Headline & Title */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {selectedDetailCase.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1 rounded-full bg-[#fea831] text-white text-xs font-semibold shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>

            <h1 
              className="text-3xl sm:text-5xl font-extrabold text-[#3c3728] leading-tight"
              style={{ fontFamily: 'Righteous, cursive' }}
            >
              {selectedDetailCase.title}
            </h1>

            <p className="text-base sm:text-lg text-[#3c3728]/75 leading-relaxed font-medium">
              {selectedDetailCase.tagline}
            </p>
          </div>

          {/* Metadata Table (Role & Deliverables, Timeline, Stack) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-white border border-[#3c3728]/10 text-xs font-mono">
            <div>
              <span className="text-[#fea831] font-bold block mb-1">Context</span>
              <p className="text-[#3c3728] font-sans font-semibold">{selectedDetailCase.meta.role}</p>
            </div>
            <div>
              <span className="text-[#fea831] font-bold block mb-1">Timeline</span>
              <p className="text-[#3c3728] font-sans font-semibold">{selectedDetailCase.meta.period}</p>
            </div>
            <div>
              <span className="text-[#fea831] font-bold block mb-1">Focus & Stack</span>
              <p className="text-[#3c3728] font-sans font-semibold">{selectedDetailCase.meta.stack}</p>
            </div>
          </div>

          {/* DEDICATED ANIMATED AGENTIC RAG SYSTEM FOR SECTION 3 (PROJECTS) */}
          {selectedDetailCase.isAnimatedProject && (
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#fea831]">
                  Live System Architecture
                </span>
              </div>
              <AgenticRagVisualizer />
            </section>
          )}

          {/* DEDICATED PERSONAL HOBBIES CARDS FOR SECTION 1 (MY SPACE) */}
          {selectedDetailCase.hobbies && (
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#3c3728] border-b border-[#3c3728]/15 pb-2 flex items-center gap-2">
                <span>Passions & Everyday Life</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {selectedDetailCase.hobbies.map((h, idx) => (
                  <div 
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-[#3c3728]/10 shadow-sm hover:border-[#fea831] transition-all space-y-2.5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{h.icon}</span>
                      <h3 className="font-bold text-base text-[#3c3728] leading-tight">
                        {h.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#3c3728]/75 leading-relaxed">
                      {h.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 1: Background & Story */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#3c3728] border-b border-[#3c3728]/15 pb-2 flex items-center gap-2">
              <span>{selectedDetailCase.id === 'myspace' ? 'The Personal Philosophy' : 'Background & Context'}</span>
            </h2>
            <p className="text-sm sm:text-base text-[#3c3728]/85 leading-relaxed">
              {selectedDetailCase.content.background}
            </p>
          </section>

          {/* Section 2: Challenges */}
          {selectedDetailCase.content.challenges.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#3c3728] border-b border-[#3c3728]/15 pb-2 flex items-center gap-2">
                <span>{selectedDetailCase.id === 'myspace' ? 'Focus & Balance' : 'Technical Challenges'}</span>
              </h2>
              <ul className="list-disc list-outside ml-5 space-y-2 text-sm sm:text-base text-[#3c3728]/85 leading-relaxed">
                {selectedDetailCase.content.challenges.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Section 3: Architecture & Solution */}
          {selectedDetailCase.content.solution && (
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#3c3728] border-b border-[#3c3728]/15 pb-2 flex items-center gap-2">
                <span>{selectedDetailCase.id === 'myspace' ? 'Daily Rhythm' : 'Architecture & Implementation'}</span>
              </h2>
              <p className="text-sm sm:text-base text-[#3c3728]/85 leading-relaxed">
                {selectedDetailCase.content.solution}
              </p>
            </section>
          )}

          {/* Section 4: Verified Outcomes */}
          {selectedDetailCase.content.outcomes.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#3c3728] border-b border-[#3c3728]/15 pb-2 flex items-center gap-2">
                <span>{selectedDetailCase.id === 'myspace' ? 'Key Takeaways' : 'Engineering Outcomes & Benchmarks'}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                {selectedDetailCase.content.outcomes.map((o, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-[#3c3728]/10 space-y-1">
                    <div className="w-2 h-2 rounded-full bg-[#fea831] mb-2" />
                    <p className="text-xs sm:text-sm text-[#3c3728] font-medium leading-snug">{o}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ADDITIONAL & UPCOMING PROJECTS SECTION FOR SECTION 3 (PROJECTS) */}
          {selectedDetailCase.id === 'projects' && (
            <section className="space-y-4 pt-4 border-t border-[#3c3728]/15">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#3c3728] flex items-center gap-2">
                  <span>Additional & Production Systems</span>
                </h2>
                <span className="text-xs font-mono font-bold text-[#fea831]">
                  More Projects Coming Soon
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* BPCL CGD Enterprise Platform */}
                <div className="p-5 rounded-2xl bg-white border border-[#3c3728]/10 shadow-sm hover:border-[#fea831] transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#fea831] uppercase">Enterprise Platform</span>
                    <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full font-bold">Production</span>
                  </div>
                  <h3 className="font-bold text-base text-[#3c3728]">BPCL City Gas Distribution Platform</h3>
                  <p className="text-xs text-[#3c3728]/75 leading-relaxed">
                    Real-time IoT telemetry pipelines and Angular 20 monitoring dashboards tracking hundreds of BPCL retail outlets with sub-second WebSockets.
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {['Angular 20', 'Python (Flask)', 'Azure AKS', 'WebSockets'].map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-[#f7f5f1] text-[10px] font-mono text-[#3c3728]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Smart Agriculture ML System */}
                <div className="p-5 rounded-2xl bg-white border border-[#3c3728]/10 shadow-sm hover:border-[#fea831] transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#fea831] uppercase">ML & Cloud</span>
                    <span className="text-[10px] font-mono bg-blue-500/10 text-blue-600 px-2 py-0.5 rounded-full font-bold">Open Source</span>
                  </div>
                  <h3 className="font-bold text-base text-[#3c3728]">Smart Agriculture ML System</h3>
                  <p className="text-xs text-[#3c3728]/75 leading-relaxed">
                    Predictive crop disease classification and soil telemetry monitoring pipeline with automated cloud inference endpoints.
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {['Python', 'TensorFlow', 'FastAPI', 'Docker'].map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-[#f7f5f1] text-[10px] font-mono text-[#3c3728]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}


          {/* Next Case Section (Exact replica of mildsugardesign.jp .p-single-next) */}
          <div className="pt-12 border-t border-[#3c3728]/15">
            <p className="text-xs font-mono uppercase tracking-widest text-[#3c3728]/50 text-center mb-6">
              Next Section
            </p>
            <div 
              onClick={() => triggerTransition(() => setSelectedDetailCase(nextCase))}
              className="group cursor-pointer p-6 sm:p-8 rounded-3xl bg-white border border-[#3c3728]/10 hover:border-[#fea831] shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-center gap-6"
            >
              <div className="w-28 h-28 flex items-center justify-center shrink-0">
                {nextCase.type === 'video' ? (
                  <video
                    src={nextCase.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture={true}
                    controls={false}
                    controlsList="nodownload nofullscreen noremoteplayback nopictureinpicture"
                    tabIndex={-1}
                    className="w-full h-full object-contain drop-shadow"
                  />
                ) : (
                  <img
                    src={nextCase.src}
                    alt={nextCase.title}
                    className="w-full h-full object-contain drop-shadow"
                  />
                )}
              </div>
              <div className="space-y-1 text-center sm:text-left flex-1">
                <span className="text-xs font-mono font-bold text-[#fea831]">
                  {nextCase.navLabel}
                </span>
                <h3 className="text-lg sm:text-2xl font-extrabold text-[#3c3728] group-hover:text-[#fea831] transition-colors" style={{ fontFamily: 'Righteous, cursive' }}>
                  {nextCase.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#3c3728]/70">
                  {nextCase.descriptionLine1}
                </p>
              </div>
              <span className="text-2xl text-[#fea831] transition-transform group-hover:translate-x-1">
                ↗
              </span>
            </div>
          </div>

          {/* Bottom Back Button: ↖ Back to the list */}
          <div className="py-16 text-center border-t border-[#3c3728]/15">
            <button
              onClick={() => triggerTransition(() => setSelectedDetailCase(null))}
              className="inline-flex items-center gap-3 text-2xl sm:text-4xl font-extrabold text-[#3c3728] hover:text-[#fea831] transition-colors cursor-pointer"
              style={{ fontFamily: 'Righteous, cursive' }}
            >
              <span className="text-[#fea831]">↖</span>
              <span>Back to the list</span>
            </button>
          </div>
        </main>
      )}

      {/* =================================================================== */}
      {/* 7. MOUSE STALKER BUBBLE (Exact replica of mildsugardesign.jp)        */}
      {/* Strictly rendered ONLY inside the Hero area above the red line!     */}
      {/* NEVER renders on Detail Page!                                      */}
      {/* =================================================================== */}
      {stalkerMode === 'detail' && selectedDetailCase === null && currentPage === 'cases' && (
        <div
          className="fixed pointer-events-none z-50 w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-[#fea831] text-white flex items-center justify-center font-extrabold text-base sm:text-lg shadow-2xl transition-transform duration-75 select-none"
          style={{
            left: `${stalkerPos.x}px`,
            top: `${stalkerPos.y}px`,
            transform: 'translate(-50%, -50%)',
            fontFamily: 'Righteous, cursive',
          }}
        >
          <div className="flex items-center gap-1.5">
            <span>View Detail</span>
            <span className="text-xl">↗</span>
          </div>
        </div>
      )}

      {/* Floating 'Hey!' Stalker on Home Room Sleeping / Typing Character */}
      {stalkerMode === 'hey' && !hasWokenUp && !isWakingUp && currentPage === 'home' && (
        <div
          className="fixed pointer-events-none z-50 w-20 h-20 rounded-full bg-[#fea831] text-white flex items-center justify-center font-extrabold text-base shadow-2xl transition-transform duration-75 select-none"
          style={{
            left: `${stalkerPos.x}px`,
            top: `${stalkerPos.y}px`,
            transform: 'translate(-50%, -50%)',
            fontFamily: 'Righteous, cursive',
          }}
        >
          Hey!
        </div>
      )}
    </div>
  );
};
