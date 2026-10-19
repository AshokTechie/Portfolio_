import React, { useState, useEffect } from 'react';
import { MouseSpotlight } from './components/MouseSpotlight';
import { FloatingNavbar } from './components/FloatingNavbar';
import { Hero3DTourView } from './components/Hero3DTourView';
import { MildSugarPortfolioView } from './components/MildSugarPortfolioView';
import { InteractiveView } from './components/InteractiveView';
import { FastListView } from './components/FastListView';
import { StandaloneResumeView } from './components/StandaloneResumeView';
import { CommandPalette } from './components/CommandPalette';
import { AiAssistantModal } from './components/AiAssistantModal';
import { ResumeDrawerModal } from './components/ResumeDrawerModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { Toast } from './components/Toast';
import { sound } from './utils/audio';

export default function App() {
  // Default to Mild Sugar Japanese design aesthetic requested by user
  const [viewMode, setViewMode] = useState('mildsugar'); // 'mildsugar' | 'tour' | 'interactive' | 'list' | 'resume'
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [activeSection, setActiveSection] = useState('about');

  // Handle URL query parameters `?view=mildsugar`, `?view=tour`, `?view=bento`, `?view=list`, or `?view=resume`
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get('view');
    if (v === 'list') {
      setViewMode('list');
    } else if (v === 'bento' || v === 'interactive') {
      setViewMode('interactive');
    } else if (v === 'resume') {
      setViewMode('resume');
    } else if (v === 'tour' || v === '3d') {
      setViewMode('tour');
    } else if (v === 'mildsugar' || v === 'sugar' || v === 'jp') {
      setViewMode('mildsugar');
    }
  }, []);

  // Global keyboard shortcuts: Cmd+K (Palette), L (Cycle View Mode), Escape (Close Modals)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        sound.playClick();
        setIsCommandOpen(prev => !prev);
        return;
      }

      // Close all modals on Escape
      if (e.key === 'Escape') {
        setIsCommandOpen(false);
        setIsAiOpen(false);
        setIsResumeOpen(false);
        setSelectedCaseStudy(null);
        return;
      }

      // Cycle View Mode with 'L' when not inside an input/textarea
      if (e.key === 'l' || e.key === 'L') {
        const tag = document.activeElement?.tagName?.toLowerCase();
        if (tag === 'input' || tag === 'textarea') return;
        sound.playClick();
        if (viewMode === 'tour') {
          switchMode('interactive');
        } else if (viewMode === 'interactive') {
          switchMode('list');
        } else {
          switchMode('tour');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode]);

  // Scroll spy for active navigation item in bento mode
  useEffect(() => {
    if (viewMode !== 'interactive') return;

    const sections = ['about', 'metrics', 'experience', 'projects', 'simulator', 'skills', 'achievements', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewMode]);

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  const switchMode = (mode) => {
    setViewMode(mode);
    const newUrl = mode === 'mildsugar' ? window.location.pathname : `?view=${mode === 'interactive' ? 'bento' : mode}`;
    window.history.replaceState({}, '', newUrl);
    const labels = {
      mildsugar: 'Mild Sugar Japanese Portfolio',
      tour: '3D Isometric Campus City',
      interactive: 'Interactive Bento View',
      list: 'Fast Text List View'
    };
    showToast(`Switched to ${labels[mode] || mode}`);
  };

  const toggleSound = () => {
    sound.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    showToast(`Sound effects ${!soundEnabled ? 'enabled' : 'muted'}`);
  };

  if (viewMode === 'resume') {
    return <StandaloneResumeView />;
  }

  return (
    <div className="min-h-screen relative selection:bg-[#fea831] selection:text-white">
      
      {/* 1. MILD SUGAR JAPANESE DESIGN SYSTEM (Primary View) */}
      {viewMode === 'mildsugar' && (
        <MildSugarPortfolioView
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenAi={() => setIsAiOpen(true)}
          onOpenCaseStudy={(proj) => setSelectedCaseStudy(proj)}
          onSwitchTo3D={() => switchMode('tour')}
          onSwitchToList={() => switchMode('list')}
          onSwitchToBento={() => switchMode('interactive')}
        />
      )}

      {/* 2. 3D ISOMETRIC CAMPUS CITY VIEW */}
      {viewMode === 'tour' && (
        <Hero3DTourView
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenAi={() => setIsAiOpen(true)}
          onOpenCaseStudy={(proj) => setSelectedCaseStudy(proj)}
          onSwitchToList={() => switchMode('list')}
          onSwitchToBento={() => switchMode('interactive')}
          onSwitchToMildSugar={() => switchMode('mildsugar')}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
        />
      )}

      {/* 3. DOCUMENT / LIST MODES (Rendered with FloatingNavbar) */}
      {viewMode !== 'tour' && viewMode !== 'mildsugar' && (
        <>
          {/* Subtle Grid & Ambient Glows */}
          <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] z-0" />
          <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#41a6f6]/5 rounded-full blur-[140px] pointer-events-none -z-10" />
          <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-[#ffcd75]/5 rounded-full blur-[160px] pointer-events-none -z-10" />

          {/* Mouse Spotlight */}
          <MouseSpotlight />

          {/* Top Floating Glassmorphism Navbar */}
          <FloatingNavbar
            viewMode={viewMode}
            onSwitchToTour={() => switchMode('tour')}
            onSwitchToBento={() => switchMode('interactive')}
            onSwitchToList={() => switchMode('list')}
            soundEnabled={soundEnabled}
            onToggleSound={toggleSound}
            onOpenAi={() => setIsAiOpen(true)}
            onOpenResume={() => setIsResumeOpen(true)}
            onOpenCommand={() => setIsCommandOpen(true)}
          />

          {/* Main View Container */}
          <div className="relative z-10 pt-16">
            {viewMode === 'interactive' ? (
              <InteractiveView
                onOpenResume={() => setIsResumeOpen(true)}
                onOpenAi={() => setIsAiOpen(true)}
                onOpenCommand={() => setIsCommandOpen(true)}
                onCopyEmail={() => showToast('Email copied to clipboard!')}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
              />
            ) : (
              <FastListView
                onSwitchToTour={() => switchMode('tour')}
                onSwitchToInteractive={() => switchMode('interactive')}
                onOpenResume={() => setIsResumeOpen(true)}
              />
            )}
          </div>
        </>
      )}

      {/* Command Palette Modal (Cmd+K) */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onNavigate={(id) => {
          if (viewMode === 'tour') {
            switchMode('interactive');
          }
          setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenAi={() => setIsAiOpen(true)}
        onToggleView={() => switchMode(viewMode === 'tour' ? 'interactive' : 'tour')}
        viewMode={viewMode}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onCopyEmail={() => {
          navigator.clipboard.writeText('ashok.anjinappa@campusuvce.in');
          showToast('Email copied to clipboard!');
        }}
      />

      {/* Ask Ashok AI Assistant Modal */}
      <AiAssistantModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
      />

      {/* Tailored Multi-Resume Drawer Modal */}
      <ResumeDrawerModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        onDownloadToast={(msg) => showToast(msg)}
      />

      {/* Deep Architecture Case Study Modal (Accessible from both 3D Room and Bento view) */}
      <CaseStudyModal
        isOpen={!!selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        project={selectedCaseStudy}
      />

      {/* Floating Feedback Toast */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage('')}
      />
    </div>
  );
}
