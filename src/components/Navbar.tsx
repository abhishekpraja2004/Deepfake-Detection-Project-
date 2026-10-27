import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Globe, 
  Cpu, 
  Bot, 
  HelpCircle, 
  ChevronDown, 
  Sparkles, 
  Zap,
  Search,
  Check,
  Sun,
  Moon,
  Monitor,
  Shield,
  Activity,
  Users,
  RotateCcw
} from 'lucide-react';
import { LANGUAGES, LanguageOption } from '../i18n/languages';
import { AppTheme } from '../types';
import { HawkSpectraLogo } from './Logo';

interface NavbarProps {
  currentLanguage: string;
  onLanguageChange: (langCode: string) => void;
  theme: AppTheme;
  onThemeChange: (theme: AppTheme) => void;
  isEdgeMode: boolean;
  onToggleEdgeMode: () => void;
  onOpenTour: () => void;
  onOpenChat: () => void;
  onOpenBenchmarks: () => void;
  activeUsersCount?: number;
  onOpenMetrics?: () => void;
  onResetScan?: () => void;
  hasActiveResult?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  theme,
  onThemeChange,
  isEdgeMode,
  onToggleEdgeMode,
  onOpenTour,
  onOpenChat,
  onOpenBenchmarks,
  activeUsersCount = 1,
  onOpenMetrics,
  onResetScan,
  hasActiveResult = false
}) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentLangObj = LANGUAGES.find((l) => l.code === currentLanguage) || LANGUAGES[0];

  const filteredLanguages = LANGUAGES.filter((l) => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const themeOptions: { id: AppTheme; label: string; icon: any; desc: string }[] = [
    { 
      id: 'light', 
      label: 'Light Mode (Default)', 
      icon: Sun, 
      desc: 'Crisp Studio Light Theme' 
    },
    { 
      id: 'dark', 
      label: 'Dark Mode', 
      icon: Moon, 
      desc: 'Midnight Obsidian Dark' 
    },
    { 
      id: 'default', 
      label: 'Cyber Mode', 
      icon: Shield, 
      desc: 'Tactical HUD Military Dark' 
    }
  ];

  const currentThemeIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Shield;
  const CurrentIconComponent = currentThemeIcon;

  return (
    <header 
      id="hawkspectra-navbar" 
      className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-200 ${
        theme === 'default'
          ? 'bg-slate-950/90 border-slate-800 text-white shadow-lg shadow-black/40'
          : theme === 'dark'
          ? 'bg-neutral-950/90 border-neutral-800 text-neutral-100 shadow-lg shadow-black/60'
          : 'bg-white/95 border-neutral-200 text-neutral-900 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 min-h-[4.5rem] flex items-center justify-between gap-4">
        {/* Brand Logo with Hawk, Camera Eye, and HS Monogram */}
        <div className="cursor-pointer py-1" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <HawkSpectraLogo size="md" theme={theme} showSubtitle={true} showBadge={true} />
        </div>

        {/* Center & Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Always Available New Scan Button in Navbar when inspecting a result */}
          {hasActiveResult && onResetScan && (
            <button
              onClick={onResetScan}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm border ${
                theme === 'default'
                  ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 border-cyan-400 font-black shadow-cyan-950/40 hover:scale-105 active:scale-95'
                  : theme === 'dark'
                  ? 'bg-sky-500 text-neutral-950 border-sky-400 font-bold hover:bg-sky-400'
                  : 'bg-neutral-900 text-white border-neutral-900 font-bold hover:bg-neutral-800'
              }`}
              title="Start a new media or link scan"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>New Scan</span>
            </button>
          )}

          {/* Benchmarks link */}
          <button
            onClick={onOpenBenchmarks}
            className={`hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              theme === 'default'
                ? 'bg-slate-900/80 text-cyan-300 border-slate-700 hover:bg-slate-800 hover:border-cyan-500/50'
                : theme === 'dark'
                ? 'bg-neutral-900 text-neutral-200 border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700'
                : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Celeb-DF & DFDC</span>
          </button>

          {/* Edge Computing Toggle */}
          <button
            onClick={onToggleEdgeMode}
            className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              isEdgeMode
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 ring-2 ring-emerald-500/20'
                : theme === 'default'
                ? 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800'
                : theme === 'dark'
                ? 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:bg-neutral-800'
                : 'bg-neutral-100 text-neutral-700 border-neutral-200 hover:bg-neutral-200'
            }`}
            title="Toggle lightweight on-device neural inference"
          >
            <Cpu className={`w-3.5 h-3.5 ${isEdgeMode ? 'text-emerald-400 animate-pulse' : theme === 'light' ? 'text-neutral-500' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">
              {isEdgeMode ? 'Edge (18ms)' : 'Cloud Hybrid'}
            </span>
            <span className="sm:hidden">
              {isEdgeMode ? 'Edge' : 'Cloud'}
            </span>
          </button>

          {/* 3-Way Theme Switcher (Default / Dark / Light) */}
          <div className="relative">
            <button
              onClick={() => {
                setIsThemeMenuOpen(!isThemeMenuOpen);
                setIsLangMenuOpen(false);
              }}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                theme === 'default'
                  ? 'bg-slate-900 text-cyan-300 border-slate-700 hover:bg-slate-800 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                  : theme === 'dark'
                  ? 'bg-neutral-900 text-neutral-200 border-neutral-800 hover:bg-neutral-800'
                  : 'bg-neutral-100 text-neutral-800 border-neutral-200 hover:bg-neutral-200'
              }`}
              title="Switch Theme (Default Cyber / Dark / Light)"
            >
              <CurrentIconComponent className={`w-3.5 h-3.5 ${
                theme === 'default' ? 'text-cyan-400' : theme === 'dark' ? 'text-sky-400' : 'text-amber-500'
              }`} />
              <span className="hidden md:inline capitalize font-medium">
                {theme === 'light' ? 'Light (Default)' : theme === 'dark' ? 'Dark' : 'Cyber'}
              </span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {isThemeMenuOpen && (
              <div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs md:absolute md:inset-auto md:top-full md:right-0 md:mt-2 md:w-56 md:bg-transparent md:p-0 md:backdrop-blur-none"
                onClick={() => setIsThemeMenuOpen(false)}
              >
                <div 
                  className={`w-full max-w-xs rounded-2xl shadow-2xl border p-2 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-150 ${
                    theme === 'default'
                      ? 'bg-slate-950 border-slate-800 text-white'
                      : theme === 'dark'
                      ? 'bg-neutral-950 border-neutral-800 text-white'
                      : 'bg-white border-neutral-200 text-neutral-900'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-2.5 py-1.5 border-b border-neutral-200/20 text-[10px] uppercase font-mono tracking-wider opacity-60">
                    Display Theme
                  </div>
                  {themeOptions.map((opt) => {
                    const isSelected = theme === opt.id;
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          onThemeChange(opt.id);
                          setIsThemeMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                          isSelected
                            ? theme === 'default'
                              ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 font-bold'
                              : theme === 'dark'
                              ? 'bg-neutral-800 text-white font-bold'
                              : 'bg-neutral-900 text-white font-bold'
                            : 'hover:bg-white/5 opacity-80 hover:opacity-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className={`w-3.5 h-3.5 ${
                            opt.id === 'default' ? 'text-cyan-400' : opt.id === 'dark' ? 'text-sky-400' : 'text-amber-500'
                          }`} />
                          <div>
                            <span className="block">{opt.label}</span>
                            <span className="block text-[10px] opacity-60">{opt.desc}</span>
                          </div>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 23+ Language Picker */}
          <div className="relative">
            <button
              onClick={() => {
                setIsLangMenuOpen(!isLangMenuOpen);
                setIsThemeMenuOpen(false);
              }}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                theme === 'default'
                  ? 'bg-slate-900 text-slate-200 border-slate-700 hover:bg-slate-800'
                  : theme === 'dark'
                  ? 'bg-neutral-900 text-neutral-200 border-neutral-800 hover:bg-neutral-800'
                  : 'bg-neutral-100 text-neutral-800 border-neutral-200 hover:bg-neutral-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-medium">{currentLangObj.nativeName}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {isLangMenuOpen && (
              <div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs md:absolute md:inset-auto md:top-full md:right-0 md:mt-2 md:w-80 md:bg-transparent md:p-0 md:backdrop-blur-none"
                onClick={() => setIsLangMenuOpen(false)}
              >
                <div 
                  className={`w-full max-w-sm rounded-2xl shadow-2xl border p-3 max-h-[80vh] flex flex-col animate-in fade-in zoom-in-95 duration-150 ${
                    theme === 'default'
                      ? 'bg-slate-950 border-slate-800 text-white'
                      : theme === 'dark'
                      ? 'bg-neutral-950 border-neutral-800 text-white'
                      : 'bg-white border-neutral-200 text-neutral-900'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-200/20">
                    <span className="text-xs font-bold flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-sky-400" /> Choose Language
                    </span>
                    <span className="text-[10px] bg-sky-500/15 text-sky-400 font-semibold px-2 py-0.5 rounded-md">
                      23+ Languages
                    </span>
                  </div>

                  {/* Search filter */}
                  <div className="relative mb-2">
                    <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search language (Bhojpuri, Hindi, etc.)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-sky-500 ${
                        theme === 'default'
                          ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                          : theme === 'dark'
                          ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500'
                          : 'bg-white border-neutral-200 text-neutral-900 placeholder-neutral-400'
                      }`}
                    />
                  </div>

                  {/* Language options list */}
                  <div className="overflow-y-auto space-y-1 flex-1 pr-1">
                    {filteredLanguages.map((lang) => {
                      const isSelected = lang.code === currentLanguage;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => {
                            onLanguageChange(lang.code);
                            setIsLangMenuOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-semibold shadow-xs'
                              : 'hover:bg-white/10 opacity-80 hover:opacity-100'
                          }`}
                        >
                          <div>
                            <span className="font-semibold mr-1.5">{lang.nativeName}</span>
                            <span className={isSelected ? 'text-sky-200' : 'opacity-60 text-[11px]'}>
                              ({lang.name})
                            </span>
                            <span className="block text-[10px] opacity-75">{lang.region}</span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tour Guide Button */}
          <button
            onClick={onOpenTour}
            className={`p-2 rounded-xl transition-colors ${
              theme === 'default'
                ? 'text-slate-400 hover:text-white hover:bg-slate-900'
                : theme === 'dark'
                ? 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
            title="Interactive Website Tour & Guide"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* HawkAI Assistant Button */}
          <button
            onClick={onOpenChat}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-md shadow-sky-900/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Bot className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">HawkAI</span>
          </button>
        </div>
      </div>
    </header>
  );
};

