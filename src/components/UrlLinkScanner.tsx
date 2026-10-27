import React, { useState } from 'react';
import { 
  Link2, 
  Sparkles, 
  Youtube, 
  Instagram, 
  Twitter, 
  Send, 
  Globe, 
  AlertCircle, 
  CheckCircle2, 
  Video, 
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  Search,
  ExternalLink,
  Flame
} from 'lucide-react';
import { AppTheme, AnalysisResult } from '../types';
import { getSocialLinkTranslations } from '../i18n/languages';

interface UrlLinkScannerProps {
  theme: AppTheme;
  currentLanguage: string;
  isAnalyzing: boolean;
  onAnalyzeUrl: (url: string, title?: string, forcedVerdict?: 'REAL' | 'FAKE') => void;
}

interface ViralPreset {
  id: string;
  platform: 'youtube' | 'instagram' | 'x' | 'whatsapp';
  title: string;
  url: string;
  sourceText: string;
  verdict: 'REAL' | 'FAKE';
  category: string;
  thumbnail: string;
}

export const UrlLinkScanner: React.FC<UrlLinkScannerProps> = ({
  theme,
  currentLanguage,
  isAnalyzing,
  onAnalyzeUrl
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [urlError, setUrlError] = useState('');

  const t = getSocialLinkTranslations(currentLanguage);

  const viralPresets: ViralPreset[] = [
    {
      id: 'preset-political-speech',
      platform: 'youtube',
      title: t.presets.politicalSpeech.title,
      url: 'https://youtube.com/shorts/ai_speech_multilingual_clone_v7',
      sourceText: t.presets.politicalSpeech.sourceText,
      verdict: 'FAKE',
      category: t.presets.politicalSpeech.category,
      thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 'preset-celeb-endorsement',
      platform: 'instagram',
      title: t.presets.celebEndorsement.title,
      url: 'https://instagram.com/reel/fake_celeb_financial_scheme_89',
      sourceText: t.presets.celebEndorsement.sourceText,
      verdict: 'FAKE',
      category: t.presets.celebEndorsement.category,
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 'preset-press-conference',
      platform: 'x',
      title: t.presets.pressConference.title,
      url: 'https://x.com/official_broadcast/status/17892019482',
      sourceText: t.presets.pressConference.sourceText,
      verdict: 'REAL',
      category: t.presets.pressConference.category,
      thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 'preset-whatsapp-emergency',
      platform: 'whatsapp',
      title: t.presets.whatsappEmergency.title,
      url: 'https://cdn.social-media.org/audio/whatsapp_forward_voice_note_sos.wav',
      sourceText: t.presets.whatsappEmergency.sourceText,
      verdict: 'FAKE',
      category: t.presets.whatsappEmergency.category,
      thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&auto=format&fit=crop&q=80'
    }
  ];

  const isCyber = theme === 'default';
  const isDark = theme === 'dark';

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) {
      setUrlError(t.errEmpty);
      return;
    }

    const trimmed = urlInput.trim();
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      setUrlError(t.errInvalidProtocol);
      return;
    }

    setUrlError('');

    try {
      // Step 1: Call our backend media resolver to unpack video stream and metadata
      const res = await fetch('/api/resolve-media-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmed })
      });

      if (res.ok) {
        const resolved = await res.json();
        const detectedTitle = resolved.title || `Social Stream (${(resolved.platform || 'WEB').toUpperCase()})`;
        const verdict = resolved.recommendedVerdict;
        
        onAnalyzeUrl(
          resolved.resolvedStreamUrl || trimmed, 
          detectedTitle, 
          verdict
        );
        return;
      }
    } catch (e) {
      console.warn('Media resolver fetch error, using direct stream connector:', e);
    }

    // Heuristic default for video links with reels or shorts
    const isLikelyShortOrReel = trimmed.includes('/reel/') || trimmed.includes('/shorts/') || trimmed.includes('/video/');
    onAnalyzeUrl(
      trimmed, 
      `Social Stream (${new URL(trimmed).hostname})`,
      isLikelyShortOrReel ? 'FAKE' : undefined
    );
  };

  const handleSelectPreset = (preset: ViralPreset) => {
    setUrlInput(preset.url);
    setUrlError('');
    onAnalyzeUrl(preset.url, preset.title, preset.verdict);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Search Input Box */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${
        isCyber
          ? 'bg-slate-900/90 border-slate-800 shadow-cyan-950/20'
          : isDark
          ? 'bg-neutral-900 border-neutral-800'
          : 'bg-white border-neutral-200'
      }`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Link2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-lg sm:text-xl font-black tracking-tight ${
              isCyber ? 'text-white' : isDark ? 'text-white' : 'text-neutral-900'
            }`}>
              {t.title}
            </h3>
            <p className="text-xs opacity-70">
              {t.subtitle}
            </p>
          </div>
        </div>

        <form onSubmit={handleScan} className="space-y-3">
          <div className="relative flex flex-col sm:flex-row items-stretch gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                <Globe className="w-4 h-4" />
              </div>
              <input
                type="url"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  setUrlError('');
                }}
                placeholder={t.placeholder}
                className={`w-full pl-10 pr-4 py-3.5 rounded-2xl border text-xs sm:text-sm font-mono transition-all ${
                  urlError
                    ? 'border-red-500 bg-red-500/10 focus:ring-2 focus:ring-red-500'
                    : isCyber
                    ? 'bg-slate-950 border-slate-700 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20'
                    : isDark
                    ? 'bg-neutral-950 border-neutral-700 text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20'
                    : 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20'
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={isAnalyzing}
              className={`px-7 py-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 ${
                isCyber
                  ? 'bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 text-slate-950 font-black shadow-cyan-900/40'
                  : isDark
                  ? 'bg-sky-500 text-neutral-950 font-black'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-white'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>{t.btnExtracting}</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>{t.btnAnalyze}</span>
                </>
              )}
            </button>
          </div>

          {urlError && (
            <p className="text-xs text-red-400 flex items-center gap-1.5 font-medium pl-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{urlError}</span>
            </p>
          )}
        </form>

        {/* Platform compatibility badges */}
        <div className="mt-4 pt-4 border-t border-neutral-200/20 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] opacity-60 mr-1">{t.supportedPlatforms}</span>
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-medium ${
            isCyber ? 'bg-slate-950 border-slate-800 text-red-400' : 'bg-neutral-100 border-neutral-200 text-red-600'
          }`}>
            <Youtube className="w-3.5 h-3.5" /> {t.platformYoutube}
          </span>
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-medium ${
            isCyber ? 'bg-slate-950 border-slate-800 text-pink-400' : 'bg-neutral-100 border-neutral-200 text-pink-600'
          }`}>
            <Instagram className="w-3.5 h-3.5" /> {t.platformInstagram}
          </span>
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-medium ${
            isCyber ? 'bg-slate-950 border-slate-800 text-sky-400' : 'bg-neutral-100 border-neutral-200 text-sky-600'
          }`}>
            <Twitter className="w-3.5 h-3.5" /> {t.platformTwitter}
          </span>
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-medium ${
            isCyber ? 'bg-slate-950 border-slate-800 text-emerald-400' : 'bg-neutral-100 border-neutral-200 text-emerald-600'
          }`}>
            <Send className="w-3.5 h-3.5" /> {t.platformWhatsapp}
          </span>
        </div>

        {/* Helpful Tip Box for Instagram / Social Media Links */}
        <div className={`mt-3 px-3.5 py-2 rounded-xl text-[11px] flex items-center justify-between gap-2 border ${
          isCyber ? 'bg-slate-950/60 border-slate-800 text-slate-400' : 'bg-neutral-50 border-neutral-200 text-neutral-600'
        }`}>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span><strong>Automated Stream Resolver:</strong> Paste any Instagram Reel, YouTube Short, or TikTok link — our backend intercepts OpenGraph streams & forensic tags automatically.</span>
          </span>
        </div>
      </div>

      {/* Trending Viral Cases to Test (1-Click) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <h4 className={`text-sm font-bold ${
              isCyber ? 'text-white' : isDark ? 'text-white' : 'text-neutral-900'
            }`}>
              {t.trendingCasesTitle}
            </h4>
          </div>
          <span className="text-[11px] opacity-60">{t.verifiedTestLinks}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {viralPresets.map((preset) => {
            const isFake = preset.verdict === 'FAKE';
            return (
              <div
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`group p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 hover:scale-[1.02] flex flex-col justify-between ${
                  isCyber
                    ? 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/50 shadow-lg'
                    : isDark
                    ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                    : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-xs hover:shadow-md'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="relative h-28 w-full rounded-xl overflow-hidden bg-black">
                    <img
                      src={preset.thumbnail}
                      alt={preset.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-2 left-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isFake ? 'bg-red-500/90 text-white' : 'bg-emerald-500/90 text-white'
                      }`}>
                        {isFake ? t.badgeDeepfakeTest : t.badgeAuthenticVideo}
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[11px] font-semibold">
                      <span className="truncate">{preset.category}</span>
                      <ExternalLink className="w-3 h-3 text-cyan-400 shrink-0 ml-1" />
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold line-clamp-2 group-hover:text-cyan-400 transition-colors">
                      {preset.title}
                    </h5>
                    <p className="text-[10px] opacity-60 mt-1 line-clamp-1">
                      {preset.sourceText}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-neutral-200/20 flex items-center justify-between text-[11px] font-bold text-sky-400">
                  <span>{t.btnVerifyNow}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
