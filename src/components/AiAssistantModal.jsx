import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, X, Bot, User, CornerDownLeft, RefreshCw, Terminal, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../utils/audio';

export const AiAssistantModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I am Ashok's autonomous portfolio assistant. Ask me anything about his enterprise work for Bharat Petroleum (BPCL), distributed Python microservices on Azure AKS, low-level ESP32 firmware, or his LangGraph RAG systems."
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState({});
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const suggestedQuestions = [
    "Why hire Ashok for a Software Engineer role?",
    "What was the hardest bug Ashok resolved in production?",
    "Explain the BPCL CGD architecture & microservices",
    "What are his core IoT & firmware contributions?",
    "Does he have experience with Docker, AKS & CI/CD?",
    "How can our team schedule an interview with Ashok?"
  ];

  const knowledgeBase = [
    {
      keywords: ["why hire", "hire ashok", "candidate", "fit", "strongest", "value"],
      answer: "Three concrete reasons to hire Ashok:\n1. Full-Stack Systems & Cloud Depth: Experienced in developing responsive Angular 20 web applications and scalable Python (Flask) microservices on Azure AKS.\n2. Proven Enterprise Telemetry Scale: Architected real-time monitoring and gas custody reconciliation billing engines for Bharat Petroleum (BPCL) City Gas Distribution across hundreds of retail outlets.\n3. High Engineering Rigor & AI Innovation: 8.76 CGPA from UVCE, built production-grade Agentic RAG pipelines with LangGraph & Qdrant achieving 95%+ evaluation accuracy, and shipped an end-to-end AI system with zero data loss."
    },
    {
      keywords: ["hardest bug", "war story", "challenge", "debugging", "outage", "problem"],
      answer: "Ashok's Top Production Debugging Feat:\n• BPCL Telemetry Burst Optimization: High-frequency telemetry bursts across hundreds of BPCL retail outlets and modal dialog interactions were causing UI thread blocking and screen freeze. He integrated WebSockets with optimized Angular change-detection strategies, eliminating UI blocking entirely and maintaining responsive 60fps rendering during peak bursts."
    },
    {
      keywords: ["bpcl", "cgd", "connectsecure", "company", "gas", "reconciliation", "billing"],
      answer: "At ConnectSecure, Ashok engineered the BPCL City Gas Distribution platform:\n• Frontend: Scalable real-time monitoring dashboards using Angular 20, PrimeNG, and ApexCharts tracking CNG dispenser sales, line pressures, and mass flow meter (MFM) telemetry across hundreds of BPCL Retail Outlets.\n• Change Detection & WebSockets: Live geospatial alert streaming without UI thread freezes.\n• IoT Router & Telemetry Microservices: Python microservices ingesting raw Modbus register payloads, accurately resolving Retail Outlet IDs (ROIDs), and automating safety threshold alerts.\n• Custody Transfer Billing Engine: Automated volume reconciliation (kg, SCM, MMBTU) with penalty guardrails (<= 90% / >= 110%) and provisional PDF billing statements.\n• AKS Deployment: Docker containerization & Azure DevOps CI/CD across multi-cluster Azure Kubernetes Service (AKS)."
    },
    {
      keywords: ["iot", "firmware", "smartload", "esp32", "modbus", "telemetry", "hardware", "agriculture"],
      answer: "Ashok's Telemetry & IoT Systems Engineering:\n• Enterprise IoT Router: Python microservices ingesting raw Modbus register payloads, ROID resolution, and safety/emergency shutdown alerts.\n• Dynamic Admin Tooling: High-performance searchable autocomplete filters and dynamic Modbus register mapping interfaces for rapid device onboarding.\n• Smart Agriculture ML System: Full data pipeline with ESP32 sensor collection -> REST API ingestion -> Firebase time-series store -> GCP ML inference -> mobile delivery, processing 100+ readings/minute with zero data loss."
    },
    {
      keywords: ["devops", "docker", "kubernetes", "aks", "ci/cd", "cloud", "azure"],
      answer: "Ashok's DevOps & Cloud Infrastructure:\n• Containerization: Multi-stage Docker builds for microservices and frontend SPAs.\n• Orchestration: Multi-cluster Azure Kubernetes Service (AKS) deployments (DEV, QA, PROD).\n• CI/CD: Automated Azure DevOps pipelines ensuring automated, zero-downtime releases.\n• Observability: Structured JSON logging, Postman automated test suites, and Linux system/network tracing."
    },
    {
      keywords: ["ai", "rag", "langgraph", "qdrant", "vector", "gemini", "agent"],
      answer: "Ashok's Conversational AI Agent (Agentic RAG System):\n• Designed a LangGraph agentic pipeline with conditional routing, cyclic state graph, and 5 decoupled nodes (ingestion, chunking, embedding, retrieval, generation).\n• Qdrant vector database for semantic similarity search with HuggingFace embeddings, achieving sub-200ms retrieval latency on 50+ indexed documents.\n• Gemini API connected for grounded response generation with prompt engineering, output validation, and speech recognition/synthesis for full voice I/O.\n• Automated evaluation workflows covering 20+ test scenarios, achieving 95%+ benchmark accuracy."
    },
    {
      keywords: ["education", "uvce", "cgpa", "college", "degree", "school"],
      answer: "Academic Credentials:\n• Institution: University of Visvesvaraya College of Engineering (UVCE), Bengaluru.\n• Degree: B.Tech – Electronics & Communication Engineering (2022 – 2026).\n• CGPA: 8.76 / 10.0.\n• Coursework: Object Oriented Programming, Computer Networks, Data Structures & Algorithms, Operating Systems.\n• Awards & Achievements: Shipped an end-to-end AI system with real sensor data and deployed ML models under competition conditions."
    },
    {
      keywords: ["interview", "contact", "reach", "email", "phone", "hire", "schedule", "availability"],
      answer: "Contact & Interview Scheduling:\n• Email: ashok.anjinappa@campusuvce.in (Direct 1-click copy available)\n• Phone: +91 9741854203\n• LinkedIn: linkedin.com/in/ashok-h-75a0b82a9\n• GitHub: github.com/AshokTechie\n• Location: Bengaluru, Karnataka, India\nAshok is actively open to high-impact Software Engineer, Full-Stack, and Backend Systems opportunities!"
    }
  ];

  const handleSend = (textToSend = input) => {
    const queryText = (textToSend || '').trim();
    if (!queryText) return;

    sound.playClick();
    const userMsg = { sender: 'user', text: queryText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      sound.playSuccess();
      const lower = queryText.toLowerCase();
      let matched = knowledgeBase.find(kb => 
        kb.keywords.some(k => lower.includes(k))
      );

      const aiResponse = matched 
        ? matched.answer 
        : `Ashok is a Software Engineer at ConnectSecure specializing in full-stack cloud systems (Angular 20, Python Flask, Azure AKS) and deterministic embedded firmware (ESP32, Modbus RTU). He architected real-time telemetry for Bharat Petroleum (BPCL) across 100+ stations. Feel free to click any of the prompt pills below to learn more about his impact!`;

      // Simulate Token Streaming
      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
      setIsTyping(false);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-obsidian-950/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="w-full max-w-2xl glass-panel-elevated rounded-2xl shadow-2xl border border-cyan-500/20 overflow-hidden text-slate-200 flex flex-col h-[580px] max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between bg-obsidian-900/90 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 shadow-glow-cyan">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-slate-100 flex items-center gap-2">
                  Ask Ashok AI
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online • Systems Knowledge Base
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400 font-mono">
                  Autonomous conversational agent trained on Ashok's production engineering career
                </p>
              </div>
            </div>

            <button 
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans">
            {messages.map((msg, i) => {
              const isAi = msg.sender === 'ai';
              return (
                <div 
                  key={i}
                  className={`flex gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
                >
                  {isAi && (
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div 
                    className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed whitespace-pre-line ${
                      isAi 
                        ? 'bg-obsidian-900/90 border border-white/10 text-slate-200' 
                        : 'bg-gradient-to-r from-cyan-600 to-violet-600 text-white font-medium shadow-glow-cyan'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {!isAi && (
                    <div className="w-7 h-7 rounded-lg bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-violet-300 shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex gap-3 items-center text-slate-400 text-xs font-mono">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-slate-400 ml-1">Analyzing knowledge base...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Pills */}
          <div className="px-4 py-2 border-t border-white/5 bg-obsidian-950/70 overflow-x-auto scrollbar-none shrink-0 flex items-center gap-1.5">
            <span className="text-[10px] font-mono text-slate-500 shrink-0 uppercase tracking-wider">Try:</span>
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 text-[11px] font-mono text-slate-300 hover:text-cyan-200 transition-all shrink-0 cursor-pointer text-left"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3.5 border-t border-white/10 bg-obsidian-900/90 shrink-0">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about BPCL platform, Modbus firmware, Azure AKS, or hiring..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50 transition-colors font-sans"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:brightness-110 disabled:opacity-40 text-white transition-all cursor-pointer shadow-glow-cyan shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
