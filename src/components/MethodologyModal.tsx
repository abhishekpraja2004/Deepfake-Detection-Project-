import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  BrainCircuit, 
  HeartPulse, 
  Layers, 
  Radio, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Eye, 
  Activity, 
  Volume2,
  Clock,
  Info
} from 'lucide-react';
import { AnalysisResult, AppTheme } from '../types';
import { getMethodologyTranslation } from '../i18n/methodologyTranslations';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
  result?: AnalysisResult;
  theme?: AppTheme;
  currentLanguage?: string;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({
  isOpen,
  onClose,
  result,
  theme = 'default',
  currentLanguage = 'en'
}) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'cbam' | 'rppg' | 'fft' | 'case_audit'>('cbam');
  const tm = getMethodologyTranslation(currentLanguage);

  if (!isOpen) return null;

  const isCyber = theme === 'default';
  const isDark = theme === 'dark';
  const isFake = result?.score.verdict === 'FAKE';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className={`w-full max-w-5xl rounded-3xl shadow-2xl border flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${
          isCyber
            ? 'bg-slate-950 border-cyan-500/30 text-slate-100 shadow-cyan-950/40'
            : isDark
            ? 'bg-neutral-900 border-neutral-700 text-neutral-100'
            : 'bg-white border-neutral-200 text-neutral-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`p-5 sm:p-6 border-b flex items-center justify-between shrink-0 ${
          isCyber 
            ? 'bg-slate-900/90 border-slate-800' 
            : isDark 
            ? 'bg-neutral-800/90 border-neutral-700' 
            : 'bg-neutral-50 border-neutral-200'
        }`}>
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg sm:text-xl tracking-tight">
                  {tm.title}
                </h3>
                <span className="hidden sm:inline-flex text-[10px] uppercase font-mono font-bold tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  {tm.versionBadge}
                </span>
              </div>
              <p className={`text-xs mt-0.5 ${isCyber ? 'text-slate-400' : isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {tm.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors ${
              isCyber
                ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                : isDark
                ? 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200'
            }`}
            title={tm.closeBtn}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className={`px-4 sm:px-6 py-2.5 border-b flex items-center gap-2 overflow-x-auto shrink-0 ${
          isCyber 
            ? 'bg-slate-900/50 border-slate-800' 
            : isDark 
            ? 'bg-neutral-800/50 border-neutral-700' 
            : 'bg-neutral-100/80 border-neutral-200'
        }`}>
          <button
            onClick={() => setActiveSection('cbam')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeSection === 'cbam'
                ? isCyber
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-black'
                  : 'bg-indigo-600 text-white shadow-sm'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>{tm.tabs.cbam}</span>
          </button>

          <button
            onClick={() => setActiveSection('rppg')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeSection === 'rppg'
                ? isCyber
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-black'
                  : 'bg-indigo-600 text-white shadow-sm'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5" />
            <span>{tm.tabs.rppg}</span>
          </button>

          <button
            onClick={() => setActiveSection('fft')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeSection === 'fft'
                ? isCyber
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-black'
                  : 'bg-indigo-600 text-white shadow-sm'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>{tm.tabs.fft}</span>
          </button>

          <button
            onClick={() => setActiveSection('overview')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeSection === 'overview'
                ? isCyber
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-black'
                  : 'bg-indigo-600 text-white shadow-sm'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{tm.tabs.pipeline}</span>
          </button>

          {result && (
            <button
              onClick={() => setActiveSection('case_audit')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ml-auto ${
                activeSection === 'case_audit'
                  ? isCyber
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'bg-amber-600 text-white shadow-sm'
                  : 'text-amber-400 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{tm.tabs.caseAudit}</span>
            </button>
          )}
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">

          {/* SECTION 1: HYBRID CNN + CBAM */}
          {activeSection === 'cbam' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className={`p-5 rounded-2xl border ${
                isCyber ? 'bg-slate-900/60 border-slate-800' : isDark ? 'bg-neutral-800/60 border-neutral-700' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shrink-0">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-base sm:text-lg">{tm.cbamSection.header}</h4>
                    <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${isCyber ? 'text-slate-300' : isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                      {tm.cbamSection.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sub-components breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Channel Attention */}
                <div className={`p-5 rounded-2xl border flex flex-col justify-between ${
                  isCyber ? 'bg-slate-900/40 border-slate-800' : isDark ? 'bg-neutral-800/40 border-neutral-700' : 'bg-white border-neutral-200'
                }`}>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-xs font-mono font-bold">1</span>
                      <h5 className="font-bold text-sm">{tm.cbamSection.channelTitle}</h5>
                    </div>
                    <p className={`text-xs leading-relaxed ${isCyber ? 'text-slate-300' : isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                      {tm.cbamSection.channelDesc}
                    </p>
                    <div className={`mt-3 p-3 rounded-xl font-mono text-[11px] ${
                      isCyber ? 'bg-slate-950 border border-slate-800 text-cyan-300' : 'bg-neutral-100 text-neutral-800'
                    }`}>
                      <strong>Channel Attention Weighting Formula:</strong><br />
                      M_c(F) = σ( MLP(AvgPool(F)) + MLP(MaxPool(F)) )
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/60 text-[11px] opacity-80">
                    🔍 <strong>Forensic Target:</strong> {tm.cbamSection.channelTarget}
                  </div>
                </div>

                {/* Spatial Attention */}
                <div className={`p-5 rounded-2xl border flex flex-col justify-between ${
                  isCyber ? 'bg-slate-900/40 border-slate-800' : isDark ? 'bg-neutral-800/40 border-neutral-700' : 'bg-white border-neutral-200'
                }`}>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center text-xs font-mono font-bold">2</span>
                      <h5 className="font-bold text-sm">{tm.cbamSection.spatialTitle}</h5>
                    </div>
                    <p className={`text-xs leading-relaxed ${isCyber ? 'text-slate-300' : isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                      {tm.cbamSection.spatialDesc}
                    </p>
                    <div className={`mt-3 p-3 rounded-xl font-mono text-[11px] ${
                      isCyber ? 'bg-slate-950 border border-slate-800 text-cyan-300' : 'bg-neutral-100 text-neutral-800'
                    }`}>
                      <strong>Spatial Masking Attention Formula:</strong><br />
                      M_s(F) = σ( Conv7×7([AvgPool(F); MaxPool(F)]) )
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/60 text-[11px] opacity-80">
                    🎯 <strong>Forensic Target:</strong> {tm.cbamSection.spatialTarget}
                  </div>
                </div>
              </div>

              {/* How it unmasks face-swaps and multi-face cloning */}
              <div className={`p-5 rounded-2xl border ${
                isCyber ? 'bg-red-950/20 border-red-500/30' : isDark ? 'bg-red-950/30 border-red-800' : 'bg-red-50 border-red-200'
              }`}>
                <h5 className="font-bold text-sm text-red-400 flex items-center gap-2 mb-2">
                  <ShieldAlert className="w-4 h-4" />
                  {tm.cbamSection.cloneBoxHeader}
                </h5>
                <ul className="text-xs space-y-2 leading-relaxed opacity-90 list-disc list-inside">
                  {tm.cbamSection.clonePoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* SECTION 2: BIOLOGICAL rPPG */}
          {activeSection === 'rppg' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className={`p-5 rounded-2xl border ${
                isCyber ? 'bg-slate-900/60 border-slate-800' : isDark ? 'bg-neutral-800/60 border-neutral-700' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-base sm:text-lg">{tm.rppgSection.header}</h4>
                    <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${isCyber ? 'text-slate-300' : isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                      {tm.rppgSection.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-4 rounded-2xl border ${
                  isCyber ? 'bg-slate-900/40 border-slate-800' : isDark ? 'bg-neutral-800/40 border-neutral-700' : 'bg-white border-neutral-200'
                }`}>
                  <div className="font-bold text-xs uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {tm.rppgSection.humanTitle}
                  </div>
                  <p className="text-xs leading-relaxed opacity-85">
                    {tm.rppgSection.humanDesc}
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${
                  isCyber ? 'bg-slate-900/40 border-slate-800' : isDark ? 'bg-neutral-800/40 border-neutral-700' : 'bg-white border-neutral-200'
                }`}>
                  <div className="font-bold text-xs uppercase tracking-wider text-red-400 mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> {tm.rppgSection.fakeTitle}
                  </div>
                  <p className="text-xs leading-relaxed opacity-85">
                    {tm.rppgSection.fakeDesc}
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${
                  isCyber ? 'bg-slate-900/40 border-slate-800' : isDark ? 'bg-neutral-800/40 border-neutral-700' : 'bg-white border-neutral-200'
                }`}>
                  <div className="font-bold text-xs uppercase tracking-wider text-sky-400 mb-2 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" /> {tm.rppgSection.chromTitle}
                  </div>
                  <p className="text-xs leading-relaxed opacity-85">
                    {tm.rppgSection.chromDesc}
                  </p>
                </div>
              </div>

              {/* Mathematical Extraction Pipeline */}
              <div className={`p-5 rounded-2xl border ${
                isCyber ? 'bg-slate-950 border-slate-800' : 'bg-neutral-100 border-neutral-300'
              }`}>
                <h5 className="font-bold text-xs uppercase tracking-wider text-cyan-400 mb-3">
                  {tm.rppgSection.pipelineHeader}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] font-mono text-cyan-400 block mb-1">Step 1</span>
                    <span className="font-bold text-xs block">{tm.rppgSection.steps.step1Title}</span>
                    <span className="text-[10px] opacity-70">{tm.rppgSection.steps.step1Desc}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] font-mono text-cyan-400 block mb-1">Step 2</span>
                    <span className="font-bold text-xs block">{tm.rppgSection.steps.step2Title}</span>
                    <span className="text-[10px] opacity-70">{tm.rppgSection.steps.step2Desc}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] font-mono text-cyan-400 block mb-1">Step 3</span>
                    <span className="font-bold text-xs block">{tm.rppgSection.steps.step3Title}</span>
                    <span className="text-[10px] opacity-70">{tm.rppgSection.steps.step3Desc}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] font-mono text-cyan-400 block mb-1">Step 4</span>
                    <span className="font-bold text-xs block">{tm.rppgSection.steps.step4Title}</span>
                    <span className="text-[10px] opacity-70">{tm.rppgSection.steps.step4Desc}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: 2D/3D FFT FREQUENCY DOMAIN */}
          {activeSection === 'fft' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className={`p-5 rounded-2xl border ${
                isCyber ? 'bg-slate-900/60 border-slate-800' : isDark ? 'bg-neutral-800/60 border-neutral-700' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 shrink-0">
                    <Radio className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-base sm:text-lg">{tm.fftSection.header}</h4>
                    <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${isCyber ? 'text-slate-300' : isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                      {tm.fftSection.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className={`p-5 rounded-2xl border ${
                  isCyber ? 'bg-slate-900/40 border-slate-800' : isDark ? 'bg-neutral-800/40 border-neutral-700' : 'bg-white border-neutral-200'
                }`}>
                  <h5 className="font-bold text-sm text-emerald-400 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> {tm.fftSection.naturalTitle}
                  </h5>
                  <p className="text-xs leading-relaxed opacity-85">
                    {tm.fftSection.naturalDesc}
                  </p>
                </div>

                <div className={`p-5 rounded-2xl border ${
                  isCyber ? 'bg-slate-900/40 border-slate-800' : isDark ? 'bg-neutral-800/40 border-neutral-700' : 'bg-white border-neutral-200'
                }`}>
                  <h5 className="font-bold text-sm text-red-400 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> {tm.fftSection.syntheticTitle}
                  </h5>
                  <p className="text-xs leading-relaxed opacity-85">
                    {tm.fftSection.syntheticDesc}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: FULL 7-VECTOR PIPELINE OVERVIEW */}
          {activeSection === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className={`p-5 rounded-2xl border ${
                isCyber ? 'bg-slate-900/60 border-slate-800' : isDark ? 'bg-neutral-800/60 border-neutral-700' : 'bg-slate-50 border-slate-200'
              }`}>
                <h4 className="font-black text-base sm:text-lg mb-2">{tm.pipelineSection.header}</h4>
                <p className={`text-xs sm:text-sm leading-relaxed ${isCyber ? 'text-slate-300' : isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                  {tm.pipelineSection.description}
                </p>
              </div>

              <div className="space-y-3">
                {/* Vector 1 */}
                <div className="p-4 rounded-xl border border-cyan-500/30 bg-cyan-500/10 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500 text-slate-950 font-black text-xs shrink-0">V1</div>
                  <div>
                    <span className="font-bold text-xs uppercase tracking-wider text-cyan-400">{tm.pipelineSection.vectors.v1Title}</span>
                    <p className="text-xs mt-0.5 opacity-85">{tm.pipelineSection.vectors.v1Desc}</p>
                  </div>
                </div>

                {/* Vector 2 */}
                <div className="p-4 rounded-xl border border-sky-500/30 bg-sky-500/10 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-sky-500 text-slate-950 font-black text-xs shrink-0">V2</div>
                  <div>
                    <span className="font-bold text-xs uppercase tracking-wider text-sky-400">{tm.pipelineSection.vectors.v2Title}</span>
                    <p className="text-xs mt-0.5 opacity-85">{tm.pipelineSection.vectors.v2Desc}</p>
                  </div>
                </div>

                {/* Vector 3 */}
                <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500 text-slate-950 font-black text-xs shrink-0">V3</div>
                  <div>
                    <span className="font-bold text-xs uppercase tracking-wider text-emerald-400">{tm.pipelineSection.vectors.v3Title}</span>
                    <p className="text-xs mt-0.5 opacity-85">{tm.pipelineSection.vectors.v3Desc}</p>
                  </div>
                </div>

                {/* Vector 4 */}
                <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500 text-white font-black text-xs shrink-0">V4</div>
                  <div>
                    <span className="font-bold text-xs uppercase tracking-wider text-indigo-400">{tm.pipelineSection.vectors.v4Title}</span>
                    <p className="text-xs mt-0.5 opacity-85">{tm.pipelineSection.vectors.v4Desc}</p>
                  </div>
                </div>

                {/* Vector 5 */}
                <div className="p-4 rounded-xl border border-teal-500/30 bg-teal-500/10 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-teal-500 text-slate-950 font-black text-xs shrink-0">V5</div>
                  <div>
                    <span className="font-bold text-xs uppercase tracking-wider text-teal-400">{tm.pipelineSection.vectors.v5Title}</span>
                    <p className="text-xs mt-0.5 opacity-85">{tm.pipelineSection.vectors.v5Desc}</p>
                  </div>
                </div>

                {/* Vector 6 */}
                <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-500/10 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-500 text-white font-black text-xs shrink-0">V6</div>
                  <div>
                    <span className="font-bold text-xs uppercase tracking-wider text-purple-400">{tm.pipelineSection.vectors.v6Title}</span>
                    <p className="text-xs mt-0.5 opacity-85">{tm.pipelineSection.vectors.v6Desc}</p>
                  </div>
                </div>

                {/* Vector 7 */}
                <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500 text-slate-950 font-black text-xs shrink-0">V7</div>
                  <div>
                    <span className="font-bold text-xs uppercase tracking-wider text-amber-400">{tm.pipelineSection.vectors.v7Title}</span>
                    <p className="text-xs mt-0.5 opacity-85">{tm.pipelineSection.vectors.v7Desc}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: CURRENT CASE AUDIT */}
          {activeSection === 'case_audit' && result && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className={`p-5 rounded-2xl border ${
                isFake
                  ? isCyber ? 'bg-red-950/40 border-red-500/40' : 'bg-red-50 border-red-200'
                  : isCyber ? 'bg-emerald-950/40 border-emerald-500/40' : 'bg-emerald-50 border-emerald-200'
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-xl text-white ${isFake ? 'bg-red-600' : 'bg-emerald-600'}`}>
                    {isFake ? <ShieldAlert className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-black text-base">
                      {tm.caseSection.whyFlaggedHeader} {result.score.verdict}:
                    </h4>
                    <span className="text-xs opacity-75 font-mono">
                      Confidence: {isFake ? result.score.fakePercentage : result.score.realPercentage}% | Manipulation: {result.score.manipulationType || 'None'}
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm mt-3 leading-relaxed opacity-90">
                  {result.score.summary}
                </p>
              </div>

              {/* Detected Anomalies specific to this file */}
              <div className={`p-5 rounded-2xl border ${
                isCyber ? 'bg-slate-900/60 border-slate-800' : isDark ? 'bg-neutral-800/60 border-neutral-700' : 'bg-white border-neutral-200'
              }`}>
                <h5 className="font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-cyan-400" />
                  {tm.caseSection.anomaliesHeader}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.spatial.detectedAnomalies.map((anomaly, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-semibold ${
                        isFake
                          ? 'bg-red-500/10 border-red-500/20 text-red-300'
                          : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                      }`}
                    >
                      {isFake ? <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      <span>{anomaly}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className={`p-3 rounded-xl border ${isCyber ? 'bg-slate-900 border-slate-800' : 'bg-neutral-100 border-neutral-200'}`}>
                  <span className="text-[10px] uppercase font-bold text-cyan-400 block">{tm.caseSection.metricsHeader.spatial}</span>
                  <span className="text-xl font-black">{result.spatial.score}%</span>
                </div>
                <div className={`p-3 rounded-xl border ${isCyber ? 'bg-slate-900 border-slate-800' : 'bg-neutral-100 border-neutral-200'}`}>
                  <span className="text-[10px] uppercase font-bold text-indigo-400 block">{tm.caseSection.metricsHeader.cbam}</span>
                  <span className="text-xl font-black">{result.cbamAttention.score}%</span>
                </div>
                <div className={`p-3 rounded-xl border ${isCyber ? 'bg-slate-900 border-slate-800' : 'bg-neutral-100 border-neutral-200'}`}>
                  <span className="text-[10px] uppercase font-bold text-sky-400 block">{tm.caseSection.metricsHeader.fft}</span>
                  <span className="text-xl font-black">{result.frequency.score}%</span>
                </div>
                <div className={`p-3 rounded-xl border ${isCyber ? 'bg-slate-900 border-slate-800' : 'bg-neutral-100 border-neutral-200'}`}>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block">{tm.caseSection.metricsHeader.rppg}</span>
                  <span className="text-xl font-black">{result.biologicalRPPG.score}%</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className={`p-4 sm:p-5 border-t flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 ${
          isCyber 
            ? 'bg-slate-900/80 border-slate-800' 
            : isDark 
            ? 'bg-neutral-800/80 border-neutral-700' 
            : 'bg-neutral-50 border-neutral-200'
        }`}>
          <div className="flex items-center gap-2 text-xs opacity-75">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{tm.footerNote}</span>
          </div>

          <button
            onClick={onClose}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
              isCyber
                ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black shadow-cyan-950/40'
                : isDark
                ? 'bg-neutral-700 hover:bg-neutral-600 text-white'
                : 'bg-neutral-900 hover:bg-neutral-800 text-white'
            }`}
          >
            {tm.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
