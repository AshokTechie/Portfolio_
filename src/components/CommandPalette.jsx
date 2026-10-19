import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Terminal, 
  FileText, 
  Mail, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Layers, 
  ArrowRight,
  X
} from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { sound } from '../utils/audio';

export const CommandPalette = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenResume,
  onOpenAi,
  onToggleView,
  viewMode,
  soundEnabled,
  onToggleSound,
  onCopyEmail,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = [
    {
      category: "Navigation",
      items: [
        { id: "about", label: "Jump to About Section", icon: Terminal, action: () => onNavigate('about') },
        { id: "experience", label: "Jump to Work Experience (ConnectSecure)", icon: Layers, action: () => onNavigate('experience') },
        { id: "projects", label: "Jump to Flagship Case Studies", icon: Sparkles, action: () => onNavigate('projects') },
        { id: "simulator", label: "Jump to System Simulator", icon: Terminal, action: () => onNavigate('simulator') },
        { id: "skills", label: "Jump to Tech Arsenal & /uses", icon: Layers, action: () => onNavigate('skills') },
        { id: "contact", label: "Jump to Contact", icon: Mail, action: () => onNavigate('contact') },
      ]
    },
    {
      category: "Quick Actions",
      items: [
        { id: "ask-ai", label: "Open 'Ask Ashok AI' Assistant", icon: Sparkles, action: onOpenAi },
        { id: "resume", label: "Open Tailored Resume Hub", icon: FileText, action: onOpenResume },
        { id: "copy-email", label: "Copy Email (ashok.anjinappa@campusuvce.in)", icon: Mail, action: onCopyEmail },
        { id: "toggle-view", label: `Switch to ${viewMode === 'interactive' ? 'Fast List View (?view=list)' : 'Interactive Bento View'}`, icon: Layers, action: onToggleView },
        { id: "toggle-sound", label: `${soundEnabled ? 'Mute' : 'Enable'} Tactile Audio Clicks`, icon: soundEnabled ? VolumeX : Volume2, action: onToggleSound },
      ]
    },
    {
      category: "External Profiles",
      items: [
        { id: "github", label: "Open GitHub Profile (AshokTechie)", icon: Github, action: () => window.open('https://github.com/AshokTechie', '_blank') },
        { id: "linkedin", label: "Open LinkedIn Profile", icon: Linkedin, action: () => window.open('https://linkedin.com/in/ashok-h-75a0b82a9', '_blank') },
      ]
    }
  ];

  // Flatten filtered items
  const filteredActions = actions.map(group => ({
    ...group,
    items: group.items.filter(item => 
      item.label.toLowerCase().includes(query.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  const flattenedList = filteredActions.flatMap(group => group.items);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        sound.playClick();
        setSelectedIndex(prev => (prev + 1) % (flattenedList.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        sound.playClick();
        setSelectedIndex(prev => (prev - 1 + (flattenedList.length || 1)) % (flattenedList.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (flattenedList[selectedIndex]) {
          sound.playSuccess();
          flattenedList[selectedIndex].action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, flattenedList, onClose]);

  if (!isOpen) return null;

  let currentIndexTracker = 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-obsidian-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl glass-panel-elevated rounded-2xl shadow-2xl border border-white/10 overflow-hidden text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3 bg-obsidian-900/60">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search sections..."
            className="w-full bg-transparent border-none outline-none text-sm text-slate-100 placeholder-slate-500 font-sans"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono text-slate-400 bg-white/5 border border-white/10 rounded">
            ESC
          </kbd>
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-white/5 sm:hidden"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command Items List */}
        <div className="max-h-[360px] overflow-y-auto p-2 space-y-3">
          {flattenedList.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-500 font-mono">
              No matching commands found.
            </div>
          ) : (
            filteredActions.map((group) => (
              <div key={group.category} className="space-y-1">
                <div className="px-3 py-1 text-[11px] font-mono font-medium tracking-wider text-slate-500 uppercase">
                  {group.category}
                </div>
                {group.items.map((item) => {
                  const itemIndex = currentIndexTracker++;
                  const isSelected = itemIndex === selectedIndex;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        sound.playSuccess();
                        item.action();
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(itemIndex)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm transition-all duration-150 ${
                        isSelected 
                          ? 'bg-cyan-500/15 text-cyan-200 border border-cyan-500/30 shadow-glow-cyan' 
                          : 'text-slate-300 hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-0.5 text-cyan-400' : 'opacity-0'}`} />
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 border-t border-white/5 bg-obsidian-950/40 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-cyan-400/80">Command Palette</span>
        </div>
      </div>
    </div>
  );
};
