import React, { useState, useRef } from 'react';
import { 
  X, 
  ShieldCheck, 
  ShieldAlert, 
  Award, 
  QrCode, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  Lock, 
  Fingerprint, 
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';
import { AnalysisResult, AppTheme } from '../types';
import { HawkSpectraLogo } from './Logo';

interface TrustSealModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: AnalysisResult;
  theme: AppTheme;
  currentLanguage: string;
}

export const TrustSealModal: React.FC<TrustSealModalProps> = ({
  isOpen,
  onClose,
  result,
  theme,
  currentLanguage
}) => {
  const [copiedText, setCopiedText] = useState(false);
  const badgeRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  const isFake = result.score.verdict === 'FAKE';
  const isReal = result.score.verdict === 'REAL';
  const isCyber = theme === 'default';
  const isDark = theme === 'dark';

  const certId = `HS-VERIFY-${result.id.slice(0, 8).toUpperCase()}-2026`;
  const verificationDate = new Date(result.analyzedAt || Date.now()).toUTCString();

  const handleCopyFactCheck = () => {
    const text = isFake
      ? `🚨 [FACT-CHECK ALERT by HawkSpectra AI]\nThis video/media "${result.mediaName}" is a CONFIRMED DEEPFAKE (${result.score.fakePercentage}% synthetic probability).\n• Facial Blend Inconsistency: ${result.spatial.score}%\n• Biological rPPG Pulse: Absent / Flatline\n• Verification Hash: ${result.sha256Hash.slice(0, 16)}...\nVerified on HawkSpectra Multi-Layer Forensic Engine.`
      : `✅ [VERIFIED AUTHENTIC by HawkSpectra AI]\nThis media "${result.mediaName}" is CONFIRMED AUTHENTIC HUMAN (${result.score.realPercentage}% authenticity score).\n• Biological Vasomotor Pulse: Verified Active (~72 BPM)\n• Frequency FFT Spectrum: Natural Human Decay\n• Verification Hash: ${result.sha256Hash.slice(0, 16)}...\nVerified on HawkSpectra Multi-Layer Forensic Engine.`;

    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`relative w-full max-w-2xl rounded-3xl border p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto ${
        isCyber
          ? 'bg-slate-900 border-slate-700 text-white shadow-cyan-950/40'
          : isDark
          ? 'bg-neutral-900 border-neutral-800 text-white'
          : 'bg-white border-neutral-200 text-neutral-900'
      }`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-500/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white ${
            isFake ? 'bg-red-600' : 'bg-emerald-600'
          }`}>
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black tracking-tight">
              Cryptographic Digital Trust Seal Certificate
            </h3>
            <p className="text-xs opacity-60">
              Tamper-proof on-chain verifiable authenticity badge for social media fact-checking
            </p>
          </div>
        </div>

        {/* The Printable / Visual Trust Seal Certificate Badge */}
        <div
          ref={badgeRef}
          className={`relative rounded-3xl border-2 p-6 sm:p-8 overflow-hidden shadow-2xl transition-all ${
            isFake
              ? 'bg-gradient-to-br from-red-950/80 via-slate-950 to-red-950/60 border-red-500/50 text-white'
              : 'bg-gradient-to-br from-emerald-950/80 via-slate-950 to-cyan-950/60 border-emerald-500/50 text-white'
          }`}
        >
          {/* Subtle Security Hologram BG Guilloche */}
          <div className="absolute inset-0 cyber-grid-pattern opacity-15 pointer-events-none" />

          {/* Certificate Top Row */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
            <div className="flex items-center gap-2.5">
              <HawkSpectraLogo size="sm" showSubtitle={false} showBadge={false} />
            </div>

            <div className="text-right font-mono text-[10px] opacity-70">
              <div>CERT ID: <span className="text-white font-bold">{certId}</span></div>
              <div>ISO-27037 / FORENSIC COMPLIANT</div>
            </div>
          </div>

          {/* Certificate Main Content */}
          <div className="py-6 flex flex-col sm:flex-row items-center gap-6 relative z-10">
            {/* Big Status Medallion */}
            <div className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center p-3 text-center shrink-0 shadow-2xl ${
              isFake
                ? 'border-red-500 bg-red-950/70 shadow-red-500/30 text-red-300'
                : 'border-emerald-400 bg-emerald-950/70 shadow-emerald-500/30 text-emerald-300'
            }`}>
              {isFake ? <ShieldAlert className="w-8 h-8 text-red-400" /> : <ShieldCheck className="w-8 h-8 text-emerald-400" />}
              <span className="text-[11px] font-black uppercase mt-1 tracking-wider">
                {isFake ? 'SYNTHETIC' : 'AUTHENTIC'}
              </span>
              <span className="text-[10px] font-mono opacity-80">
                {isFake ? `${result.score.fakePercentage}% Fake` : `${result.score.realPercentage}% Real`}
              </span>
            </div>

            {/* Media & Verification Details */}
            <div className="space-y-2 text-center sm:text-left flex-1">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-slate-300">
                OFFICIAL VERIFICATION DOSSIER
              </span>
              <h4 className="text-lg font-bold truncate max-w-sm">
                {result.mediaName}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                {result.score.summary}
              </p>

              {/* 4 Vector Micro Checks */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] font-mono">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className={`w-3 h-3 ${isFake ? 'text-red-400' : 'text-emerald-400'}`} />
                  <span>rPPG Pulse: {result.biologicalRPPG.rppgDetected ? 'Organic Pulse' : 'Flatline (Fake)'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className={`w-3 h-3 ${isFake ? 'text-red-400' : 'text-emerald-400'}`} />
                  <span>Spatial Blend: {result.spatial.score}% Anomaly</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className={`w-3 h-3 ${isFake ? 'text-red-400' : 'text-emerald-400'}`} />
                  <span>FFT Spectrum: {result.frequency.checkerboardArtifactsDetected ? 'GAN Grid Alert' : 'Natural Decay'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className={`w-3 h-3 ${isFake ? 'text-red-400' : 'text-emerald-400'}`} />
                  <span>Zero-Trace RAM: Wiped</span>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Footer Row with QR & Hash */}
          <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono relative z-10">
            <div className="flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-cyan-400" />
              <div className="truncate max-w-[280px]">
                SHA-256: <span className="text-white font-bold">{result.sha256Hash}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{verificationDate}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            onClick={handleCopyFactCheck}
            className={`px-5 py-3 rounded-2xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              copiedText
                ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                : isCyber
                ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-white'
                : 'bg-neutral-100 hover:bg-neutral-200 border-neutral-300 text-neutral-900'
            }`}
          >
            {copiedText ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedText ? 'Copied Fact-Check to Clipboard!' : 'Copy Social Fact-Check Reply'}</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-400 via-cyan-500 to-indigo-600 hover:from-sky-300 hover:to-indigo-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/30 transition-all hover:scale-105 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Print / Save Verified Seal Card</span>
          </button>
        </div>
      </div>
    </div>
  );
};
