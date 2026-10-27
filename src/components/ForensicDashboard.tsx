import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Activity, 
  Layers, 
  Radio, 
  Volume2, 
  Clock, 
  Download, 
  Eye, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  Info, 
  RotateCcw,
  Zap,
  BarChart3,
  Cpu,
  Lock,
  Award,
  Sliders,
  Users,
  Send,
  Copy,
  Check,
  Share2,
  BookOpen,
  Flame,
  ExternalLink
} from 'lucide-react';
import { AnalysisResult, AppTheme } from '../types';
import { JargonTooltip } from './JargonTooltip';
import { GradCamVisualizer } from './GradCamVisualizer';
import { SplitCompareViewer } from './SplitCompareViewer';
import { TemporalCbamHeatmap } from './TemporalCbamHeatmap';
import { TrustSealModal } from './TrustSealModal';
import { MethodologyModal } from './MethodologyModal';
import { generateForensicPdfReport } from '../utils/pdfGenerator';
import { getTranslation, getLocalizedFindings } from '../i18n/languages';
import { getCitizenSafetyData } from '../i18n/citizenTranslations';

interface ForensicDashboardProps {
  result: AnalysisResult;
  currentLanguage: string;
  theme?: AppTheme;
  onReset: () => void;
  onOpenBenchmarks: () => void;
}

export const ForensicDashboard: React.FC<ForensicDashboardProps> = ({
  result,
  currentLanguage,
  theme = 'default',
  onReset,
  onOpenBenchmarks
}) => {
  const isCyber = theme === 'default';
  const isDark = theme === 'dark';
  const isLight = theme === 'light';

  const isImage = result.mediaType === 'image';
  const isAudio = result.mediaType === 'audio';
  const isVideo = !isImage && !isAudio;
  const isSocialLinkScan = Boolean(result.rawSocialUrl);

  const [viewMode, setViewMode] = useState<'citizen' | 'expert'>('citizen');
  const [showTrustSeal, setShowTrustSeal] = useState(false);
  const [showMethodology, setShowMethodology] = useState(false);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);

  const defaultTab = isImage ? 'split' : isAudio ? 'frequency' : (isSocialLinkScan ? 'spatial' : 'temporal-cbam');
  const [activeTab, setActiveTab] = useState<'split' | 'spatial' | 'frequency' | 'cbam' | 'rppg' | 'multimodal' | 'temporal' | 'gradcam' | 'temporal-cbam'>(defaultTab);

  React.useEffect(() => {
    if (isSocialLinkScan && activeTab === 'split') {
      setActiveTab('spatial');
    } else if (isImage && (activeTab === 'rppg' || activeTab === 'multimodal' || activeTab === 'temporal' || activeTab === 'temporal-cbam')) {
      setActiveTab('split');
    } else if (isAudio && (activeTab === 'rppg' || activeTab === 'cbam' || activeTab === 'gradcam' || activeTab === 'temporal' || activeTab === 'split' || activeTab === 'temporal-cbam')) {
      setActiveTab('frequency');
    }
  }, [result.mediaType, isImage, isAudio, isSocialLinkScan, activeTab]);

  const t = getTranslation(currentLanguage);

  const isFake = result.score.verdict === 'FAKE';
  const isReal = result.score.verdict === 'REAL';
  const isSuspicious = result.score.verdict === 'SUSPICIOUS';

  const findings = getLocalizedFindings(currentLanguage, isFake, result.mediaType);

  const citizenData = getCitizenSafetyData(
    currentLanguage,
    isFake,
    result.mediaType,
    result.mediaName,
    result.score.fakePercentage,
    result.score.realPercentage
  );

  const handleShareWhatsApp = () => {
    const encoded = encodeURIComponent(citizenData.whatsAppText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const handleCopySummary = () => {
    const text = `HawkSpectra Verification: "${result.mediaName}" is ${isFake ? 'FAKE' : 'REAL'} (${isFake ? result.score.fakePercentage : result.score.realPercentage}% confidence). Hash: ${result.sha256Hash.slice(0, 12)}...`;
    navigator.clipboard.writeText(text);
    setCopiedWhatsApp(true);
    setTimeout(() => setCopiedWhatsApp(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Executive Summary & PDF Actions Card */}
      <div className={`rounded-3xl border p-6 sm:p-8 transition-all relative overflow-hidden ${
        isCyber
          ? isFake
            ? 'bg-gradient-to-r from-red-950/70 via-slate-900/90 to-slate-950/90 border-red-500/40 shadow-2xl shadow-red-950/30'
            : isReal
            ? 'bg-gradient-to-r from-emerald-950/70 via-slate-900/90 to-slate-950/90 border-emerald-500/40 shadow-2xl shadow-emerald-950/30'
            : 'bg-gradient-to-r from-amber-950/70 via-slate-900/90 to-slate-950/90 border-amber-500/40 shadow-2xl shadow-amber-950/30'
          : isDark
          ? isFake
            ? 'bg-neutral-900 border-red-800/80 shadow-xl'
            : isReal
            ? 'bg-neutral-900 border-emerald-800/80 shadow-xl'
            : 'bg-neutral-900 border-amber-800/80 shadow-xl'
          : isFake 
          ? 'bg-red-50/60 border-red-200 shadow-sm' 
          : isReal 
          ? 'bg-emerald-50/60 border-emerald-200 shadow-sm' 
          : 'bg-amber-50/60 border-amber-200 shadow-sm'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 relative z-10">
          {/* Left Verdict & Metadata Section */}
          <div className="flex items-start gap-4 sm:gap-5 min-w-0 flex-1">
            <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
              isFake 
                ? 'bg-gradient-to-br from-red-500 to-red-700 text-white shadow-red-500/30 ring-4 ring-red-500/20' 
                : isReal 
                ? 'bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-emerald-500/30 ring-4 ring-emerald-500/20' 
                : 'bg-gradient-to-br from-amber-500 to-orange-700 text-white shadow-amber-500/30 ring-4 ring-amber-500/20'
            }`}>
              {isFake ? <ShieldAlert className="w-8 h-8 sm:w-9 sm:h-9" /> : <ShieldCheck className="w-8 h-8 sm:w-9 sm:h-9" />}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
                <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                  isFake 
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40' 
                    : isReal 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                }`}>
                  {isFake ? t.verdictFake : isReal ? t.verdictReal : t.verdictSuspicious}
                </span>

                <span className={`text-xs px-2.5 py-1 rounded-lg border font-bold ${
                  isCyber
                    ? 'bg-slate-900 text-cyan-300 border-slate-700'
                    : isDark
                    ? 'bg-neutral-800 text-neutral-200 border-neutral-700'
                    : 'bg-white text-neutral-800 border-neutral-300 shadow-2xs'
                }`}>
                  {isSocialLinkScan 
                    ? '🔗 Social Link Fact-Check'
                    : (isImage ? '📸 Photo Mode: 4 Tailored Vectors' : isAudio ? '🎙️ Audio Mode: 3 Tailored Vectors' : '🎬 Video Mode: 7 Multimodal Vectors')}
                </span>

                <span className={`text-xs px-2.5 py-1 rounded-lg border font-mono ${
                  isCyber
                    ? 'bg-slate-900/80 text-slate-300 border-slate-800'
                    : isDark
                    ? 'bg-neutral-800 text-neutral-300 border-neutral-700'
                    : 'bg-white text-neutral-700 border-neutral-200'
                }`}>
                  {result.isEdgeInference ? '⚡ Edge AI (18ms)' : '🛡️ Cloud Hybrid v4.2'}
                </span>

                {result.autoDeleted && (
                  <span className="text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1">
                    <Lock className="w-3 h-3" /> {t.ephemeralWipeRAM}
                  </span>
                )}

                {result.rawSocialUrl && (
                  <a
                    href={result.rawSocialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs bg-sky-500/15 text-sky-400 hover:text-sky-300 border border-sky-500/30 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Live Source Stream Verified</span>
                  </a>
                )}
              </div>

              <h2 className={`text-xl sm:text-2xl font-black tracking-tight break-words ${
                isCyber ? 'text-white' : isDark ? 'text-neutral-100' : 'text-neutral-900'
              }`} title={result.mediaName}>
                {result.mediaName}
              </h2>
              <p className={`text-xs sm:text-sm max-w-3xl mt-1.5 leading-relaxed break-words ${
                isCyber ? 'text-slate-300' : isDark ? 'text-neutral-300' : 'text-neutral-600'
              }`}>
                {currentLanguage === 'en' ? result.score.summary : findings.executiveSummary}
              </p>
              <p className={`text-[11px] font-semibold mt-2 flex items-center gap-1.5 ${
                isCyber ? 'text-cyan-400/90' : isDark ? 'text-sky-400' : 'text-neutral-500'
              }`}>
                <Info className="w-3.5 h-3.5 shrink-0" />
                {isSocialLinkScan
                  ? 'Social Stream Audit: Remote metadata verification, 2D FFT spatial analysis, and neural synthetic artifact profiling.'
                  : (isImage 
                    ? 'Static Image Audit: Evaluates Camera Sensor PRNU Noise, 2D FFT Spectrum, CBAM Attention, & Grad-CAM (Video temporal tests bypassed).'
                    : isAudio
                    ? 'Acoustic Audio Audit: Evaluates Acoustic Spectrogram FFT, Voice Biomarkers, & Vocoder Phase (Visual tests bypassed).'
                    : 'Spatiotemporal Video Audit: Full multimodal analysis testing all biological, temporal, and spatial vectors.')}
              </p>

              {/* Quick Heatmap Action Button */}
              {isVideo && !isSocialLinkScan && (
                <div className="mt-3">
                  <button
                    onClick={() => {
                      setViewMode('expert');
                      setActiveTab('temporal-cbam');
                    }}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border shadow-sm ${
                      isFake
                        ? 'bg-red-500/20 text-red-300 border-red-500/40 hover:bg-red-500/30'
                        : isCyber
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/30'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>
                      {isFake
                        ? `Hybrid CNN+CBAM flagged ${result.cbamAttention.peakAnomalyProbability ? `Frame #${result.cbamAttention.peakAnomalyFrame} (${result.cbamAttention.peakAnomalyProbability}%)` : 'critical frame anomalies'} — Scrub Video Heatmap →`
                        : 'Scrub Video Frame Heatmap (CNN+CBAM) →'}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Scores Gauge Box */}
          <div className={`flex items-center justify-around sm:justify-center gap-6 p-4 sm:p-5 rounded-2xl border shrink-0 min-w-[260px] ${
            isCyber
              ? 'bg-slate-900/90 border-slate-800 shadow-xl'
              : isDark
              ? 'bg-neutral-800/90 border-neutral-700 shadow-xl'
              : 'bg-white border-neutral-200/90 shadow-xs'
          }`}>
            {/* Real vs Fake Gauge Numbers */}
            <div className="text-center">
              <span className={`block text-[11px] font-bold uppercase tracking-wider ${
                isCyber ? 'text-slate-400' : isDark ? 'text-neutral-400' : 'text-neutral-400'
              }`}>
                {t.realScore}
              </span>
              <span className={`text-2xl sm:text-3xl font-black ${
                isReal ? 'text-emerald-400' : isCyber ? 'text-slate-500' : isDark ? 'text-neutral-500' : 'text-neutral-500'
              }`}>
                {result.score.realPercentage}%
              </span>
            </div>

            <div className={`h-10 w-px ${isCyber ? 'bg-slate-800' : isDark ? 'bg-neutral-700' : 'bg-neutral-200'}`} />

            <div className="text-center">
              <span className={`block text-[11px] font-bold uppercase tracking-wider ${
                isCyber ? 'text-slate-400' : isDark ? 'text-neutral-400' : 'text-neutral-400'
              }`}>
                {t.fakeScore}
              </span>
              <span className={`text-2xl sm:text-3xl font-black ${
                isFake ? 'text-red-400' : isCyber ? 'text-slate-500' : isDark ? 'text-neutral-500' : 'text-neutral-500'
              }`}>
                {result.score.fakePercentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Action Toolbar Row - Fully visible, responsive, guaranteed no cutoff */}
        <div className="mt-6 pt-5 border-t border-neutral-200/20 flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowMethodology(true)}
              className={`inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95 ${
                isCyber
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30'
                  : isDark
                  ? 'bg-sky-600/30 text-sky-300 border border-sky-500/40 hover:bg-sky-600/40'
                  : 'bg-indigo-50 text-indigo-800 border border-indigo-300 hover:bg-indigo-100'
              }`}
              title="AI Forensic Methodology: CNN+CBAM & Biological rPPG"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Methodology</span>
            </button>

            <button
              onClick={() => setShowTrustSeal(true)}
              className={`inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95 ${
                isCyber
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                  : isDark
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/40'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
              }`}
              title="Generate Cryptographic Digital Trust Seal"
            >
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>Digital Trust Seal</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => generateForensicPdfReport(result, currentLanguage)}
              className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg transition-all hover:scale-105 active:scale-95 ${
                isCyber
                  ? 'bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black shadow-cyan-950/50'
                  : isDark
                  ? 'bg-sky-500 hover:bg-sky-400 text-neutral-950 font-bold shadow-sky-950/40'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-white shadow-sm'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.downloadReport}</span>
            </button>

            <button
              onClick={onReset}
              className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md hover:scale-105 active:scale-95 border ${
                isCyber
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 hover:bg-cyan-400 font-black shadow-cyan-950/60'
                  : isDark
                  ? 'bg-neutral-700 hover:bg-neutral-600 text-white border-neutral-600'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-900'
              }`}
              title="Scan another file or link"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.newScanBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dual Perspective View Switcher (Citizen vs Expert) */}
      <div className={`p-2 rounded-2xl border flex items-center justify-between gap-3 shadow-sm ${
        isCyber ? 'bg-slate-900/80 border-slate-800' : isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
      }`}>
        <div className="flex items-center gap-2 px-2">
          <span className="text-xs font-bold opacity-70">Perspective:</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowMethodology(true)}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
              isCyber
                ? 'bg-slate-800/80 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20'
                : isDark
                ? 'bg-neutral-800 text-sky-300 border-neutral-700 hover:bg-neutral-700'
                : 'bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-50 shadow-2xs'
            }`}
            title="Educational Deep Dive: How Hybrid CNN+CBAM & rPPG work"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Methodology</span>
          </button>

          <button
            onClick={() => setViewMode('citizen')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              viewMode === 'citizen'
                ? isCyber
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                  : 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>Citizen Mode (Aam Nagrik)</span>
          </button>

          <button
            onClick={() => setViewMode('expert')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              viewMode === 'expert'
                ? isCyber
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                  : 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-sky-400" />
            <span>Forensic Expert Mode (Cyber Lab)</span>
          </button>
        </div>
      </div>

      {/* CITIZEN MODE VIEW: Simple, Instant Verdict & WhatsApp Advisory */}
      {viewMode === 'citizen' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${
            isCyber
              ? isFake
                ? 'bg-red-950/40 border-red-500/40'
                : 'bg-emerald-950/40 border-emerald-500/40'
              : isDark
              ? 'bg-neutral-900 border-neutral-800'
              : isFake
              ? 'bg-red-50/80 border-red-200'
              : 'bg-emerald-50/80 border-emerald-200'
          }`}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-black uppercase px-3 py-1 rounded-full ${
                    isFake ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
                  }`}>
                    {citizenData.badgeText}
                  </span>
                  <span className="text-xs opacity-70">
                    Confidence: {citizenData.confidenceLabel}
                  </span>
                </div>

                <h3 className={`text-xl sm:text-2xl font-black ${
                  isCyber ? 'text-white' : isDark ? 'text-white' : 'text-neutral-900'
                }`}>
                  {citizenData.headline}
                </h3>

                <p className="text-xs sm:text-sm leading-relaxed max-w-2xl opacity-90">
                  {citizenData.description}
                </p>
              </div>

              {/* WhatsApp & Social Share Rebuttal */}
              <div className="flex flex-col gap-2.5 shrink-0 w-full sm:w-auto">
                <button
                  onClick={handleShareWhatsApp}
                  className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all hover:scale-105 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>{citizenData.shareWhatsAppBtn}</span>
                </button>

                <button
                  onClick={handleCopySummary}
                  className={`px-5 py-2.5 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    copiedWhatsApp
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                      : isCyber
                      ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                      : 'bg-white border-neutral-300 text-neutral-800'
                  }`}
                >
                  {copiedWhatsApp ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedWhatsApp ? citizenData.copiedBtn : citizenData.copySummaryBtn}</span>
                </button>
              </div>
            </div>

            {/* 4 Plain-Language Citizen Checkpoints (Context-aware for Audio, Image, Video) */}
            <div className="mt-8 pt-6 border-t border-neutral-200/20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {citizenData.checkpoints.map((cp, idx) => {
                const IconComp = 
                  cp.iconType === 'pulse' || cp.iconType === 'breathing' ? Activity :
                  cp.iconType === 'eyes' || cp.iconType === 'lighting' ? Eye :
                  cp.iconType === 'lips' || cp.iconType === 'harmonics' ? Volume2 :
                  cp.iconType === 'voice_clone' || cp.iconType === 'prnu' ? Radio :
                  cp.iconType === 'diffusion' ? Sparkles : Zap;

                return (
                  <div key={idx} className={`p-4 rounded-2xl border ${
                    isCyber ? 'bg-slate-950/60 border-slate-800' : isDark ? 'bg-neutral-950/60 border-neutral-800' : 'bg-white border-neutral-200'
                  }`}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <IconComp className={`w-4 h-4 ${isFake ? 'text-red-400' : 'text-emerald-400'}`} />
                      <span className="text-xs font-bold">{cp.title}</span>
                    </div>
                    <p className="text-[11px] opacity-75 leading-relaxed">
                      {cp.statusText}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Embedded Split Compare Preview in Citizen Mode (Image & Uploaded Video only - hidden for Social Link Scans) */}
          {!isAudio && !isSocialLinkScan && (
            <div className="space-y-6">
              <SplitCompareViewer result={result} theme={theme} language={currentLanguage} />
            </div>
          )}

          {/* Audio Forensic Player in Citizen Mode */}
          {isAudio && (
            <div className={`p-6 sm:p-7 rounded-3xl border shadow-xl ${
              isCyber
                ? 'bg-slate-900/90 border-slate-800 shadow-cyan-950/20'
                : isDark
                ? 'bg-neutral-900 border-neutral-800'
                : 'bg-white border-neutral-200'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-md ${
                    isFake ? 'bg-gradient-to-tr from-red-600 to-rose-700' : 'bg-gradient-to-tr from-emerald-500 to-teal-600'
                  }`}>
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={`text-base sm:text-lg font-black tracking-tight ${
                        isCyber ? 'text-white' : isDark ? 'text-white' : 'text-neutral-900'
                      }`}>
                        Acoustic Speech & Voice Waveform Player
                      </h3>
                      <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                        isFake ? 'bg-red-500/20 text-red-400 border-red-500/40' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      }`}>
                        {isFake ? 'Neural Vocoder Clone' : 'Authentic Phonation'}
                      </span>
                    </div>
                    <p className="text-xs opacity-70">
                      Playback the analyzed audio file to verify vocal cord micro-tremors versus synthetic TTS artifacts.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono px-3 py-1 rounded-xl border ${
                    isCyber ? 'bg-slate-950 text-slate-300 border-slate-800' : 'bg-neutral-100 text-neutral-700 border-neutral-200'
                  }`}>
                    {result.mediaName}
                  </span>
                </div>
              </div>

              {/* HTML5 Audio Player */}
              <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center gap-4 ${
                isCyber ? 'bg-slate-950/70 border-slate-800' : isDark ? 'bg-neutral-950/70 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
              }`}>
                <div className="flex items-center gap-2 text-xs font-mono opacity-80 shrink-0">
                  <Radio className={`w-4 h-4 ${isFake ? 'text-red-400' : 'text-emerald-400'} animate-pulse`} />
                  <span>Acoustic Waveform:</span>
                </div>
                {result.mediaUrl && (
                  <audio
                    src={result.mediaUrl}
                    controls
                    className="w-full h-10 rounded-xl"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* EXPERT MODE: Multi-Spectrum Tab Navigation */}
      {viewMode === 'expert' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className={`border-b flex overflow-x-auto gap-1.5 pb-2 scrollbar-none ${
            isCyber ? 'border-slate-800' : isDark ? 'border-neutral-800' : 'border-neutral-200'
          }`}>
            {/* Split Diff Slider Tab (Image & Uploaded Video only - hidden for Social Link Scans) */}
            {!isAudio && !isSocialLinkScan && (
              <button
                onClick={() => setActiveTab('split')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === 'split'
                    ? isCyber
                      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-black'
                      : isDark
                      ? 'bg-sky-500 text-neutral-950 font-bold'
                      : 'bg-neutral-900 text-white shadow-xs'
                    : isCyber
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    : isDark
                    ? 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>Split Diff Slider</span>
              </button>
            )}

            {/* Video-Only: Temporal CNN+CBAM Anomaly Heatmap */}
            {isVideo && (
              <button
                onClick={() => setActiveTab('temporal-cbam')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === 'temporal-cbam'
                    ? isCyber
                      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-black'
                      : isDark
                      ? 'bg-sky-500 text-neutral-950 font-bold'
                      : 'bg-neutral-900 text-white shadow-xs'
                    : isCyber
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    : isDark
                    ? 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-cyan-400" />
                <span>Temporal Heatmap (CNN+CBAM)</span>
                {isFake && (
                  <span className="px-1.5 py-0.2 rounded-sm bg-red-500/30 text-red-300 text-[9px] font-mono font-bold">
                    ANOMALY
                  </span>
                )}
              </button>
            )}

            {/* Video-Only: Biological rPPG */}
            {isVideo && (
              <button
                onClick={() => setActiveTab('rppg')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === 'rppg'
                    ? isCyber
                      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-black'
                      : isDark
                      ? 'bg-sky-500 text-neutral-950 font-bold'
                      : 'bg-neutral-900 text-white shadow-xs'
                    : isCyber
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    : isDark
                    ? 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                <Activity className="w-3.5 h-3.5 text-red-400" />
                <span>{t.tabRPPG}</span>
              </button>
            )}

            {/* Image & Video: CBAM Attention */}
            {!isAudio && (
              <button
                onClick={() => setActiveTab('cbam')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === 'cbam'
                    ? isCyber
                      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-black'
                      : isDark
                      ? 'bg-sky-500 text-neutral-950 font-bold'
                      : 'bg-neutral-900 text-white shadow-xs'
                    : isCyber
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    : isDark
                    ? 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                <span>{t.tabCBAM}</span>
              </button>
            )}

            {/* Image & Video: Grad-CAM Explainable AI */}
            {!isAudio && (
              <button
                onClick={() => setActiveTab('gradcam')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === 'gradcam'
                    ? isCyber
                      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-black'
                      : isDark
                      ? 'bg-sky-500 text-neutral-950 font-bold'
                      : 'bg-neutral-900 text-white shadow-xs'
                    : isCyber
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    : isDark
                    ? 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.viewGradCam}</span>
              </button>
            )}

            {/* All Modalities: Spatial & Sensor Noise / Vocoder Phase */}
            <button
              onClick={() => setActiveTab('spatial')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'spatial'
                  ? isCyber
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-black'
                    : isDark
                    ? 'bg-sky-500 text-neutral-950 font-bold'
                    : 'bg-neutral-900 text-white shadow-xs'
                  : isCyber
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  : isDark
                  ? 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              <span>{isAudio ? 'Acoustic Phase & Vocoder' : isImage ? 'Spatial Sensor & PRNU' : t.tabSpatial}</span>
            </button>

            {/* All Modalities: Frequency FFT Spectrum */}
            <button
              onClick={() => setActiveTab('frequency')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'frequency'
                  ? isCyber
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-black'
                    : isDark
                    ? 'bg-sky-500 text-neutral-950 font-bold'
                    : 'bg-neutral-900 text-white shadow-xs'
                  : isCyber
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  : isDark
                  ? 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isAudio ? 'Acoustic FFT Spectrum' : t.tabFrequency}</span>
            </button>

            {/* Video-Only: Multimodal Lip-Sync */}
            {isVideo && (
              <button
                onClick={() => setActiveTab('multimodal')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === 'multimodal'
                    ? isCyber
                      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-black'
                      : isDark
                      ? 'bg-sky-500 text-neutral-950 font-bold'
                      : 'bg-neutral-900 text-white shadow-xs'
                    : isCyber
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    : isDark
                    ? 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5 text-pink-400" />
                <span>{t.tabMultimodal}</span>
              </button>
            )}

            {/* Video-Only: Temporal Inconsistency */}
            {isVideo && (
              <button
                onClick={() => setActiveTab('temporal')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === 'temporal'
                    ? isCyber
                      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-black'
                      : isDark
                      ? 'bg-sky-500 text-neutral-950 font-bold'
                      : 'bg-neutral-900 text-white shadow-xs'
                    : isCyber
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    : isDark
                    ? 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                <span>{t.tabTemporal}</span>
              </button>
            )}

            {/* Quick Methodology deep dive button on the tab bar */}
            <button
              onClick={() => setShowMethodology(true)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 ml-auto ${
                isCyber
                  ? 'bg-slate-900/80 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/15 shadow-sm'
                  : isDark
                  ? 'bg-neutral-800 text-sky-300 border-neutral-700 hover:bg-neutral-700'
                  : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
              }`}
              title="Educational Methodology: How CNN+CBAM & Biological rPPG identify synthetic features"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI Methodology</span>
            </button>
          </div>

          {/* Tab: Dedicated Temporal CNN+CBAM Heatmap */}
          {activeTab === 'temporal-cbam' && isVideo && (
            <TemporalCbamHeatmap 
              result={result} 
              theme={theme} 
              currentLanguage={currentLanguage} 
            />
          )}

          {/* Tab 0: Split Diff Slider (Image & Uploaded Video only - hidden for Social Link Scans) */}
          {activeTab === 'split' && !isAudio && !isSocialLinkScan && (
            <SplitCompareViewer result={result} theme={theme} language={currentLanguage} />
          )}

          {/* Tab 1: Biological Signals (rPPG - Heartbeat Pulse) */}
      {activeTab === 'rppg' && (
        <div className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${
          isCyber ? 'bg-slate-900/90 border-slate-800 text-slate-200 shadow-xl' : isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-200' : 'bg-white border-neutral-200 text-neutral-900'
        }`}>
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${
            isCyber ? 'border-slate-800' : isDark ? 'border-neutral-800' : 'border-neutral-100'
          }`}>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-bold bg-red-500/20 text-red-400 border border-red-500/30 px-2.5 py-0.5 rounded-md">
                  Cardiovascular Telemetry
                </span>
                <JargonTooltip termKey="rPPG" />
              </div>
              <h3 className={`text-xl font-black mt-1 ${isCyber ? 'text-white' : isDark ? 'text-white' : 'text-neutral-900'}`}>
                Biological Signals: Remote Photoplethysmography (rPPG)
              </h3>
              <p className={`text-xs ${isCyber ? 'text-slate-400' : isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {t.rppgSubtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className={`p-3.5 rounded-2xl border text-right ${
                isCyber ? 'bg-slate-950 border-slate-800' : isDark ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-50 border-neutral-200'
              }`}>
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">{t.pulseRate}</span>
                <span className={`text-2xl font-black font-mono ${
                  result.biologicalRPPG.rppgDetected ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {result.biologicalRPPG.rppgDetected ? `${result.biologicalRPPG.estimatedBPM} BPM` : '0 BPM (Flatline)'}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive rPPG Blood Perfusion Waveform */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className={`text-xs font-bold flex items-center gap-1.5 ${
                isCyber ? 'text-slate-200' : isDark ? 'text-neutral-200' : 'text-neutral-800'
              }`}>
                <Activity className="w-4 h-4 text-red-500 animate-pulse" />
                {t.bvpWaveformTitle}
              </span>
              <span className="text-[11px] font-mono opacity-70">
                {t.samplingRate}
              </span>
            </div>

            {/* Custom SVG Waveform Visualizer */}
            <div className="h-44 w-full bg-slate-950 rounded-2xl p-4 flex flex-col justify-between border border-slate-800 relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:16px_16px]" />

              <svg className="w-full h-full relative z-10" viewBox="0 0 400 100" preserveAspectRatio="none">
                {/* Zero line */}
                <line x1="0" y1="50" x2="400" y2="50" stroke="#334155" strokeDasharray="3,3" />

                {/* Pulse wave line */}
                <path
                  d={result.biologicalRPPG.signalWaveform.reduce((acc, point, index) => {
                    const x = (index / (result.biologicalRPPG.signalWaveform.length - 1)) * 400;
                    const y = 50 - point.bloodPerfusion * 40;
                    return `${acc} ${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                  }, '')}
                  fill="none"
                  stroke={result.biologicalRPPG.rppgDetected ? '#10b981' : '#ef4444'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>

              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 z-10">
                <span>0.0s (Forehead / Cheek ROI)</span>
                <span className="text-xs font-bold text-slate-200">
                  {findings.bloodFlowConsistency}
                </span>
                <span>4.0s (Temporal Buffer)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className={`p-4 rounded-2xl border ${
              isCyber ? 'bg-slate-950/80 border-slate-800' : isDark ? 'bg-neutral-800/80 border-neutral-700' : 'bg-neutral-50 border-neutral-200'
            }`}>
              <span className={`font-bold block mb-1 ${isCyber ? 'text-white' : isDark ? 'text-white' : 'text-neutral-900'}`}>{t.pqiTitle}</span>
              <p className="opacity-80 leading-relaxed">
                {result.biologicalRPPG.pulseQualityIndex}% — {result.biologicalRPPG.pulseQualityIndex > 60 ? t.pqiHigh : t.pqiLow}
              </p>
            </div>

            <div className={`p-4 rounded-2xl border ${
              isCyber ? 'bg-slate-950/80 border-slate-800' : isDark ? 'bg-neutral-800/80 border-neutral-700' : 'bg-neutral-50 border-neutral-200'
            }`}>
              <span className={`font-bold block mb-1 ${isCyber ? 'text-white' : isDark ? 'text-white' : 'text-neutral-900'}`}>{t.vasomotorTitle}</span>
              <p className="opacity-80 leading-relaxed">
                {findings.bloodFlowConsistency}
              </p>
            </div>

            <div className={`p-4 rounded-2xl border ${
              isCyber ? 'bg-slate-950/80 border-slate-800' : isDark ? 'bg-neutral-800/80 border-neutral-700' : 'bg-neutral-50 border-neutral-200'
            }`}>
              <span className={`font-bold block mb-1 ${isCyber ? 'text-white' : isDark ? 'text-white' : 'text-neutral-900'}`}>{t.forensicVerdictTitle}</span>
              <p className="opacity-80 leading-relaxed">
                {findings.rppgExplanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Hybrid CNN + CBAM Attention */}
      {activeTab === 'cbam' && (
        <div className="space-y-6">
          {/* Video Temporal Heatmap Embed */}
          {isVideo && (
            <TemporalCbamHeatmap 
              result={result} 
              theme={theme} 
              currentLanguage={currentLanguage} 
            />
          )}

          <div className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${
            isCyber ? 'bg-slate-900/90 border-slate-800 text-slate-200 shadow-xl' : isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-200' : 'bg-white border-neutral-200 text-neutral-900'
          }`}>
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${
              isCyber ? 'border-slate-800' : isDark ? 'border-neutral-800' : 'border-neutral-100'
            }`}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30 px-2.5 py-0.5 rounded-md">
                    Neural Attention Modules
                  </span>
                  <JargonTooltip termKey="CBAM" />
                </div>
                <h3 className={`text-xl font-black mt-1 ${isCyber ? 'text-white' : isDark ? 'text-white' : 'text-neutral-900'}`}>
                  Hybrid CNN + CBAM (Convolutional Block Attention Module)
                </h3>
                <p className={`text-xs ${isCyber ? 'text-slate-400' : isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  {t.cbamSubtitle}
                </p>
              </div>

              <div className="text-right">
                <span className={`text-xs font-black px-3.5 py-1.5 rounded-full border ${
                  isCyber
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                    : isDark
                    ? 'bg-neutral-800 text-sky-400 border-neutral-700'
                    : 'text-sky-800 bg-sky-100 border-sky-200'
                }`}>
                  {t.attentionConcentration} {result.cbamAttention.attentionConcentrationRatio}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-5 rounded-2xl border space-y-3 ${
                isCyber ? 'bg-slate-950/80 border-slate-800' : isDark ? 'bg-neutral-800/80 border-neutral-700' : 'bg-neutral-50 border-neutral-200'
              }`}>
                <h4 className="font-bold text-xs uppercase tracking-wider opacity-90">
                  {t.channelAttentionTitle}
                </h4>
                <p className="text-xs opacity-75 leading-relaxed">
                  {t.channelAttentionDesc}
                </p>
                <div className={`p-3 rounded-xl border text-xs ${
                  isCyber ? 'bg-slate-900 border-slate-800' : isDark ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-neutral-200'
                }`}>
                  <span className="font-bold block mb-0.5">{t.dominantChannelFeaturesTitle}</span>
                  <span className="text-sky-400 font-medium">{findings.cbamChannelDominance}</span>
                </div>
              </div>

              <div className={`p-5 rounded-2xl border space-y-3 ${
                isCyber ? 'bg-slate-950/80 border-slate-800' : isDark ? 'bg-neutral-800/80 border-neutral-700' : 'bg-neutral-50 border-neutral-200'
              }`}>
                <h4 className="font-bold text-xs uppercase tracking-wider opacity-90">
                  {t.spatialAttentionTitle}
                </h4>
                <p className="text-xs opacity-75 leading-relaxed">
                  {t.spatialAttentionDesc}
                </p>
                <div className={`p-3 rounded-xl border text-xs ${
                  isCyber ? 'bg-slate-900 border-slate-800' : isDark ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-neutral-200'
                }`}>
                  <span className="font-bold block mb-0.5">{t.spatialAttentionHotspotTitle}</span>
                  <span className="text-sky-400 font-medium">{findings.cbamSpatialFocus}</span>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border text-xs ${
              isCyber 
                ? 'bg-sky-950/30 border-sky-800/50 text-sky-200' 
                : isDark 
                ? 'bg-neutral-800 border-neutral-700 text-neutral-300' 
                : 'bg-sky-50/70 border-sky-200 text-sky-950'
            }`}>
              <span className="font-bold block mb-1">{t.architectureSummaryTitle}</span>
              <p className="leading-relaxed">{findings.cbamExplanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Grad-CAM Explainable AI */}
      {activeTab === 'gradcam' && (
        <GradCamVisualizer result={result} currentLanguage={currentLanguage} />
      )}

      {/* Tab 4: Spatial & Pixel Anomalies */}
      {activeTab === 'spatial' && (
        <div className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${
          isCyber ? 'bg-slate-900/90 border-slate-800 text-slate-200 shadow-xl' : isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-200' : 'bg-white border-neutral-200 text-neutral-900'
        }`}>
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${
            isCyber ? 'border-slate-800' : isDark ? 'border-neutral-800' : 'border-neutral-100'
          }`}>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2.5 py-0.5 rounded-md">
                  Pixel Morphology
                </span>
                <JargonTooltip termKey="Spatial Features" />
              </div>
              <h3 className={`text-xl font-black mt-1 ${isCyber ? 'text-white' : isDark ? 'text-white' : 'text-neutral-900'}`}>
                Spatial Inconsistencies & Boundary Seams
              </h3>
              <p className={`text-xs ${isCyber ? 'text-slate-400' : isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {t.spatialSubtitle}
              </p>
            </div>

            <div className="text-right">
              <span className={`text-xs font-black px-3.5 py-1.5 rounded-full border ${
                result.spatial.score > 50 
                  ? 'bg-red-500/20 text-red-400 border-red-500/40' 
                  : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              }`}>
                {t.threatIndex} {result.spatial.score}/100
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={`p-4 rounded-2xl border ${
              isCyber ? 'bg-slate-950/80 border-slate-800' : isDark ? 'bg-neutral-800/80 border-neutral-700' : 'bg-neutral-50 border-neutral-200'
            }`}>
              <span className={`text-xs font-bold block mb-2 ${isCyber ? 'text-white' : isDark ? 'text-white' : 'text-neutral-900'}`}>
                {t.detectedSpatialArtifactsTitle}
              </span>
              <ul className="space-y-2 text-xs">
                {findings.spatialAnomalies.map((anom, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{anom}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-4 rounded-2xl border ${
              isCyber ? 'bg-slate-950/80 border-slate-800' : isDark ? 'bg-neutral-800/80 border-neutral-700' : 'bg-neutral-50 border-neutral-200'
            }`}>
              <span className={`text-xs font-bold block mb-2 ${isCyber ? 'text-white' : isDark ? 'text-white' : 'text-neutral-900'}`}>
                {t.compressionNoiseTitle}
              </span>
              <p className="text-xs opacity-80 leading-relaxed mb-3">
                {findings.spatialCompression}
              </p>
              <div className="text-[11px] font-mono opacity-70">
                {t.boundaryBlendingTitle} {result.spatial.boundaryBlendingAnomalies}%
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border text-xs ${
            isCyber ? 'bg-slate-950/80 border-slate-800 text-slate-300' : isDark ? 'bg-neutral-800/80 border-neutral-700 text-neutral-300' : 'bg-neutral-50 border-neutral-200 text-neutral-700'
          }`}>
            <span className={`font-bold block mb-1 ${isCyber ? 'text-white' : isDark ? 'text-white' : 'text-neutral-900'}`}>{t.spatialFindingTitle}</span>
            <p className="leading-relaxed">{findings.spatialExplanation}</p>
          </div>
        </div>
      )}

      {/* Tab 5: Frequency Domain (FFT/DCT) */}
      {activeTab === 'frequency' && (
        <div className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${
          isCyber ? 'bg-slate-900/90 border-slate-800 text-slate-200 shadow-xl' : isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-200' : 'bg-white border-neutral-200 text-neutral-900'
        }`}>
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${
            isCyber ? 'border-slate-800' : isDark ? 'border-neutral-800' : 'border-neutral-100'
          }`}>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-md">
                  Spectral Decomposition
                </span>
                <JargonTooltip termKey="Frequency Domain" />
              </div>
              <h3 className={`text-xl font-black mt-1 ${isCyber ? 'text-white' : isDark ? 'text-white' : 'text-neutral-900'}`}>
                Frequency Domain & 2D Fast Fourier Transform (FFT)
              </h3>
              <p className={`text-xs ${isCyber ? 'text-slate-400' : isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {t.frequencySubtitle}
              </p>
            </div>

            <div className="text-right">
              <span className={`text-xs font-black px-3.5 py-1.5 rounded-full border ${
                result.frequency.checkerboardArtifactsDetected 
                  ? 'bg-red-500/20 text-red-400 border-red-500/40' 
                  : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              }`}>
                {findings.fftEnergyDistribution}
              </span>
            </div>
          </div>

          {/* Simulated FFT Power Spectrum Peaks */}
          <div className="p-5 bg-slate-950 text-white rounded-2xl border border-slate-800 shadow-inner">
            <span className="text-xs font-bold block mb-3 text-slate-300">
              {t.spectralPowerDistributionTitle}
            </span>
            <div className="grid grid-cols-5 gap-2.5">
              {result.frequency.frequencyPeaks.map((peak, idx) => (
                <div key={idx} className="bg-slate-900 p-3 rounded-xl text-center border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block">{peak.freq} Hz</span>
                  <div className="h-16 flex items-end justify-center my-2">
                    <div
                      className={`w-5 rounded-t transition-all ${peak.isNatural ? 'bg-emerald-500' : 'bg-red-500'}`}
                      style={{ height: `${peak.power}%` }}
                    />
                  </div>
                  <span className={`text-[10px] font-bold ${peak.isNatural ? 'text-emerald-400' : 'text-red-400'}`}>
                    {peak.power}% Pwr
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-4 rounded-2xl border text-xs ${
            isCyber ? 'bg-slate-950/80 border-slate-800 text-slate-300' : isDark ? 'bg-neutral-800/80 border-neutral-700 text-neutral-300' : 'bg-neutral-50 border-neutral-200 text-neutral-700'
          }`}>
            <span className={`font-bold block mb-1 ${isCyber ? 'text-white' : isDark ? 'text-white' : 'text-neutral-900'}`}>{t.spectralAnalysisTitle}</span>
            <p className="leading-relaxed">{findings.frequencyExplanation}</p>
          </div>
        </div>
      )}

      {/* Tab 6: Multimodal Audio-Video Sync */}
      {activeTab === 'multimodal' && (
        <div className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${
          isCyber ? 'bg-slate-900/90 border-slate-800 text-slate-200 shadow-xl' : isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-200' : 'bg-white border-neutral-200 text-neutral-900'
        }`}>
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${
            isCyber ? 'border-slate-800' : isDark ? 'border-neutral-800' : 'border-neutral-100'
          }`}>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-bold bg-teal-500/20 text-teal-400 border border-teal-500/30 px-2.5 py-0.5 rounded-md">
                  Cross-Modal Alignment
                </span>
                <JargonTooltip termKey="Multimodal" />
              </div>
              <h3 className={`text-xl font-black mt-1 ${isCyber ? 'text-white' : isDark ? 'text-white' : 'text-neutral-900'}`}>
                Multimodal Audio-Video Synchronization (Phoneme-Viseme)
              </h3>
              <p className={`text-xs ${isCyber ? 'text-slate-400' : isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {t.multimodalSubtitle}
              </p>
            </div>

            <div className="text-right">
              <span className={`text-xs font-black px-3.5 py-1.5 rounded-full border ${
                result.multimodal.audioVideoDesyncMs > 50 
                  ? 'bg-red-500/20 text-red-400 border-red-500/40' 
                  : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              }`}>
                {t.desyncOffset} {result.multimodal.audioVideoDesyncMs > 0 ? `+${result.multimodal.audioVideoDesyncMs}ms` : `${result.multimodal.audioVideoDesyncMs}ms`}
              </span>
            </div>
          </div>

          {/* Sync Timeline Bars */}
          <div className={`p-4 rounded-2xl border ${
            isCyber ? 'bg-slate-950/80 border-slate-800' : isDark ? 'bg-neutral-800/80 border-neutral-700' : 'bg-neutral-50 border-neutral-200'
          }`}>
            <span className={`text-xs font-bold block mb-3 ${isCyber ? 'text-slate-200' : isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
              {t.crossModalAlignmentTitle}
            </span>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {result.multimodal.syncTimeline.map((item, idx) => (
                <div key={idx} className={`flex items-center gap-3 text-xs p-2.5 rounded-xl border ${
                  isCyber ? 'bg-slate-900 border-slate-800' : isDark ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-neutral-200'
                }`}>
                  <span className="w-12 font-mono text-[10px] opacity-70">{item.timestamp}s</span>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="w-1/2 bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-sky-400 h-full" style={{ width: `${item.lipOpening}%` }} />
                    </div>
                    <div className="w-1/2 bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-teal-400 h-full" style={{ width: `${item.speechEnergy}%` }} />
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    item.isSynced 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {item.isSynced ? t.syncedBadge : t.mismatchBadge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-4 rounded-2xl border text-xs ${
            isCyber ? 'bg-slate-950/80 border-slate-800 text-slate-300' : isDark ? 'bg-neutral-800/80 border-neutral-700 text-neutral-300' : 'bg-neutral-50 border-neutral-200 text-neutral-700'
          }`}>
            <span className={`font-bold block mb-1 ${isCyber ? 'text-white' : isDark ? 'text-white' : 'text-neutral-900'}`}>{t.crossModalConclusionTitle}</span>
            <p className="leading-relaxed">{findings.multimodalExplanation}</p>
          </div>
        </div>
      )}

      {/* Tab 7: Temporal Inconsistency */}
      {activeTab === 'temporal' && (
        <div className="space-y-6">
          {/* Video Temporal CNN+CBAM Anomaly Heatmap Embed */}
          {isVideo && (
            <TemporalCbamHeatmap 
              result={result} 
              theme={theme} 
              currentLanguage={currentLanguage} 
            />
          )}

          <div className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${
            isCyber ? 'bg-slate-900/90 border-slate-800 text-slate-200 shadow-xl' : isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-200' : 'bg-white border-neutral-200 text-neutral-900'
          }`}>
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${
              isCyber ? 'border-slate-800' : isDark ? 'border-neutral-800' : 'border-neutral-100'
            }`}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2.5 py-0.5 rounded-md">
                    Time-Domain Dynamics
                  </span>
                  <JargonTooltip termKey="Temporal Inconsistency" />
                </div>
                <h3 className={`text-xl font-black mt-1 ${isCyber ? 'text-white' : isDark ? 'text-white' : 'text-neutral-900'}`}>
                  Temporal Inconsistency & Eye Blink Analysis
                </h3>
                <p className={`text-xs ${isCyber ? 'text-slate-400' : isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  {t.temporalSubtitle}
                </p>
              </div>

              <div className="text-right">
                <span className={`text-xs font-black px-3.5 py-1.5 rounded-full border ${
                  isCyber
                    ? 'bg-slate-800 text-purple-300 border-slate-700'
                    : isDark
                    ? 'bg-neutral-800 text-purple-300 border-neutral-700'
                    : 'bg-neutral-100 text-neutral-800 border-neutral-200'
                }`}>
                  {findings.eyeBlinkPattern}
                </span>
              </div>
            </div>

            {/* Eye Aspect Ratio (EAR) Timeline */}
            <div className="p-5 bg-slate-950 text-white rounded-2xl border border-slate-800 shadow-inner">
              <span className="text-xs font-bold block mb-2 text-slate-300">
                {t.temporalBlinkTimelineTitle}
              </span>
              <div className="h-28 flex items-end gap-1.5 overflow-x-auto pb-2">
                {result.temporal.earTimeline.map((item, i) => (
                  <div key={i} className="flex flex-col items-center shrink-0">
                    <div
                      className={`w-3 rounded-t transition-all ${
                        item.isBlink ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'bg-indigo-500'
                      }`}
                      style={{ height: `${item.eyeAspectRatio * 240}px` }}
                    />
                    <span className="text-[8px] font-mono text-slate-400 mt-1">F{item.frame}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`p-4 rounded-2xl border text-xs ${
              isCyber ? 'bg-slate-950/80 border-slate-800 text-slate-300' : isDark ? 'bg-neutral-800/80 border-neutral-700 text-neutral-300' : 'bg-neutral-50 border-neutral-200 text-neutral-700'
            }`}>
              <span className={`font-bold block mb-1 ${isCyber ? 'text-white' : isDark ? 'text-white' : 'text-neutral-900'}`}>{t.temporalFindingTitle}</span>
              <p className="leading-relaxed">{findings.temporalExplanation}</p>
            </div>
          </div>
        </div>
      )}
        </div>
      )}

      {/* Cryptographic Digital Trust Seal Certificate Modal */}
      <TrustSealModal
        isOpen={showTrustSeal}
        onClose={() => setShowTrustSeal(false)}
        result={result}
        theme={theme}
        currentLanguage={currentLanguage}
      />

      {/* Educational AI Methodology & Architecture Overlay */}
      <MethodologyModal
        isOpen={showMethodology}
        onClose={() => setShowMethodology(false)}
        result={result}
        theme={theme}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};
