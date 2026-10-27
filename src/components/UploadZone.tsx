import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileVideo, 
  FileAudio, 
  Image as ImageIcon, 
  Shield, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  Camera, 
  Mic, 
  Play, 
  ArrowRight,
  Info,
  Layers,
  Radio,
  Eye,
  Link as LinkIcon,
  Zap,
  Clock
} from 'lucide-react';
import { DEMO_SAMPLES } from '../utils/demoSamples';
import { DemoSample, AnalysisResult, AppTheme } from '../types';
import { JargonTooltip } from './JargonTooltip';
import { UrlLinkScanner } from './UrlLinkScanner';
import { LiveVoiceAnalyzer } from './LiveVoiceAnalyzer';
import { getTranslation, getLocalizedSampleData, getLiveVoiceTranslations } from '../i18n/languages';

interface UploadZoneProps {
  currentLanguage: string;
  theme?: AppTheme;
  isEdgeMode: boolean;
  autoDeleteEnabled: boolean;
  onToggleAutoDelete: (enabled: boolean) => void;
  isFastMode?: boolean;
  onToggleFastMode?: (enabled: boolean) => void;
  onAnalyzeSample: (sample: DemoSample) => void;
  onAnalyzeCustomFile: (file: File, forcedVerdict?: 'REAL' | 'FAKE', externalMediaUrl?: string) => void;
  isAnalyzing: boolean;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  currentLanguage,
  theme = 'default',
  isEdgeMode,
  autoDeleteEnabled,
  onToggleAutoDelete,
  isFastMode = false,
  onToggleFastMode,
  onAnalyzeSample,
  onAnalyzeCustomFile,
  isAnalyzing
}) => {
  const [scanTool, setScanTool] = useState<'file' | 'link' | 'mic'>('file');
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = getTranslation(currentLanguage);

  const isCyber = theme === 'default';
  const isDark = theme === 'dark';
  const isLight = theme === 'light';

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      onAnalyzeCustomFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onAnalyzeCustomFile(file);
    }
  };

  const voiceT = getLiveVoiceTranslations(currentLanguage);
  const socialTabLabel = currentLanguage === 'hi' ? 'सोशल लिंक फैक्ट-चेक'
    : currentLanguage === 'bho' ? 'सोशल लिंक फैक्ट-चेक'
    : currentLanguage === 'bn' ? 'সোশ্যাল লিঙ্ক ফ্যাক্ট-চেক'
    : currentLanguage === 'te' ? 'సోషల్ లింక్ ఫ్యాక్ట్-చెక్'
    : currentLanguage === 'mr' ? 'सोशल लिंक फॅक्ट-चेक'
    : currentLanguage === 'ta' ? 'சமூக இணைப்பு சரிபார்ப்பு'
    : currentLanguage === 'ur' ? 'سوشل لنک فیکٹ چیک'
    : currentLanguage === 'gu' ? 'સોશિયલ લિંક ફેક્ટ-ચેક'
    : currentLanguage === 'kn' ? 'ಸೋಷಿಯಲ್ ಲಿಂಕ್ ತಪಾಸಣೆ'
    : currentLanguage === 'ml' ? 'സോഷ്യൽ ലിങ്ക് ഫാക്റ്റ്-ചെക്ക്'
    : currentLanguage === 'pa' ? 'ਸੋਸ਼ਲ ਲਿੰਕ ਫੈਕਟ-ਚੈੱਕ'
    : currentLanguage === 'or' ? 'ସୋସିଆଲ ଲିଙ୍କ୍ ଯାଞ୍ଚ'
    : currentLanguage === 'as' ? 'ছ’চিয়েল লিংক ফেক্ট-চেক'
    : currentLanguage === 'mai' ? 'सोशल लिंक फैक्ट-चेक'
    : currentLanguage === 'sat' ? 'ᱥᱳᱥᱤᱭᱟᱞ ᱞᱤᱝᱠ ᱯᱚᱨᱠᱷᱟᱣ'
    : currentLanguage === 'ks' ? 'سوشل لنک فیکٹ چیک'
    : currentLanguage === 'ne' ? 'सामाजिक लिङ्क तथ्य-जाँच'
    : currentLanguage === 'kok' ? 'सोशल लिंक फॅक्ट-चेक'
    : currentLanguage === 'sd' ? 'سوشل لنڪ جاچ'
    : currentLanguage === 'doi' ? 'सोशल लिंक फैक्ट-चेक'
    : currentLanguage === 'mni' ? 'সোসিএল লিঙ্ক চাংয়েং'
    : currentLanguage === 'brx' ? 'सोसিয়ेल लिंक बिजिरनाय'
    : currentLanguage === 'sa' ? 'सामाजिक-सम्पर्क-शोधनम्'
    : 'Social Link Fact-Check';

  const voiceTabLabel = currentLanguage === 'hi' ? 'लाइव वॉइस क्लोन टेस्ट'
    : currentLanguage === 'bho' ? 'लाइव आवाज क्लोन टेस्ट'
    : currentLanguage === 'bn' ? 'লাইভ ভয়েস ক্লোন টেস্ট'
    : currentLanguage === 'te' ? 'లైవ్ వాయిస్ క్లోన్ టెస్ట్'
    : currentLanguage === 'mr' ? 'थेट व्हॉइस क्लोन टेस्ट'
    : currentLanguage === 'ta' ? 'நேரலை குரல் குளோன் ஆய்வு'
    : currentLanguage === 'ur' ? 'لائیو وائس کلون ٹیسٹ'
    : currentLanguage === 'gu' ? 'લાઈવ વોઈસ ક્લોન ટેસ્ટ'
    : currentLanguage === 'kn' ? 'ಲೈವ್ ವಾಯ್ಸ್ ಕ್ಲೋನ್ ಪರೀಕ್ಷೆ'
    : currentLanguage === 'ml' ? 'ലൈവ് വോയ്സ് ക്ലോൺ ടെസ്റ്റ്'
    : currentLanguage === 'pa' ? 'ਲਾਈਵ ਵੌਇਸ ਕਲੋਨ ਟੈਸਟ'
    : currentLanguage === 'or' ? 'ଲାଇଭ୍ ଭଏସ୍ କ୍ଲୋନ୍ ଟେଷ୍ଟ'
    : currentLanguage === 'as' ? 'লাইভ ভইচ ক্ল’ন টেষ্ট'
    : currentLanguage === 'mai' ? 'लाइव आवाज क्लोन टेस्ट'
    : currentLanguage === 'sat' ? 'ᱞᱟᱭᱤᱵᱽ ᱟᱲᱟᱝ ᱠᱞᱳᱱ ᱴᱮᱥᱴ'
    : currentLanguage === 'ks' ? 'لائیو آواز کلون ٹیسٹ'
    : currentLanguage === 'ne' ? 'लाइभ भ्वाइस क्लोन टेस्ट'
    : currentLanguage === 'kok' ? 'थेट व्हॉइस क्लोन टेस्ट'
    : currentLanguage === 'sd' ? 'لائيو وائس ڪلون ٽيسٽ'
    : currentLanguage === 'doi' ? 'लाइव आवाज क्लोन टेस्ट'
    : currentLanguage === 'mni' ? 'লাইভ খোঞ্জেল ক্লোন তেষ্ট'
    : currentLanguage === 'brx' ? 'लायभ राव क्ल\'न आनजाद'
    : currentLanguage === 'sa' ? 'सजीव-ध्वनि-प्रतिकृति-परीक्षणम्'
    : 'Live Voice Clone Test';

  const fileTabLabel = currentLanguage === 'hi' ? 'फ़ाइल अपलोड करें'
    : currentLanguage === 'bho' ? 'फाइल अपलोड करीं'
    : currentLanguage === 'bn' ? 'ফাইল আপলোড করুন'
    : currentLanguage === 'te' ? 'ఫైల్ అప్‌లోడ్ చేయండి'
    : currentLanguage === 'mr' ? 'फाईल अपलोड करा'
    : currentLanguage === 'ta' ? 'கோப்பைப் பதிவேற்றவும்'
    : currentLanguage === 'ur' ? 'فائل اپ لوڈ کریں'
    : currentLanguage === 'gu' ? 'ફાઇલ અપલોડ કરો'
    : currentLanguage === 'kn' ? 'ಫೈಲ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ'
    : currentLanguage === 'ml' ? 'ഫയൽ അപ്‌ലോഡ് ചെയ്യുക'
    : currentLanguage === 'pa' ? 'ਫ਼ਾਈਲ ਅੱਪਲੋਡ ਕਰੋ'
    : currentLanguage === 'or' ? 'ଫାଇଲ୍ ଅପଲୋଡ୍ କରନ୍ତୁ'
    : currentLanguage === 'as' ? 'ফাইল আপলোড কৰক'
    : currentLanguage === 'mai' ? 'फाइल अपलोड करू'
    : currentLanguage === 'sat' ? 'ᱯᱷᱟᱭᱤᱞ ᱟᱯᱞᱳᱰ ᱢᱮ'
    : currentLanguage === 'ks' ? 'فائل اَپلوڈ کٔریو'
    : currentLanguage === 'ne' ? 'फाइल अपलोड गर्नुहोस्'
    : currentLanguage === 'kok' ? 'फाईल अपलोड करात'
    : currentLanguage === 'sd' ? 'فائل اپلوڊ ڪريو'
    : currentLanguage === 'doi' ? 'फाइल अपलोड करो'
    : currentLanguage === 'mni' ? 'ফাইল অপলোড তৌউ'
    : currentLanguage === 'brx' ? 'फाइल आपल\'ड खालाम'
    : currentLanguage === 'sa' ? 'सञ्चिकाम् आरोपयन्तु'
    : 'Upload File';

  return (
    <section id="upload-zone-section" className="py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
      {/* Privacy Zero-Trace Guarantee Banner */}
      <div className={`p-4 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs transition-colors ${
        isCyber
          ? 'bg-gradient-to-r from-emerald-950/60 via-slate-900/80 to-cyan-950/60 border-emerald-500/30 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.08)]'
          : isDark
          ? 'bg-neutral-900 border-neutral-800 text-neutral-200'
          : 'bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border-emerald-200/80 text-emerald-900'
      }`}>
        <div className="flex items-start gap-3">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
            isCyber ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : isDark ? 'bg-neutral-800 text-emerald-400' : 'bg-emerald-600 text-white'
          }`}>
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold uppercase tracking-wider ${
                isCyber ? 'text-emerald-300' : isDark ? 'text-emerald-400' : 'text-emerald-950'
              }`}>
                {t.autoDeleteBadge}
              </span>
              <JargonTooltip termKey="Zero-Trace" />
            </div>
            <p className={`text-xs mt-0.5 leading-relaxed ${
              isCyber ? 'text-slate-300' : isDark ? 'text-neutral-400' : 'text-emerald-900/90'
            }`}>
              {t.autoDeleteDesc}
            </p>
          </div>
        </div>

        {/* Dual Control Switch: Ephemeral Auto-Delete + Quick 10s Verdict */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {/* Quick 10-Second Verdict Toggle */}
          {onToggleFastMode && (
            <label className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border shadow-xs cursor-pointer select-none transition-all shrink-0 ${
              isFastMode
                ? 'bg-amber-500/20 border-amber-400/50 text-amber-300'
                : isCyber
                ? 'bg-slate-900/90 border-slate-700 hover:border-slate-600 text-slate-300'
                : isDark
                ? 'bg-neutral-800 border-neutral-700 text-neutral-300'
                : 'bg-white border-neutral-300 hover:bg-neutral-50 text-neutral-800'
            }`}>
              <input
                type="checkbox"
                checked={isFastMode}
                onChange={(e) => onToggleFastMode(e.target.checked)}
                className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500 border-neutral-400"
              />
              <div className="text-left">
                <span className="block text-xs font-bold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  {currentLanguage === 'hi' ? '10s त्वरित परिणाम' : currentLanguage === 'bho' ? '10s तुरंत फैसला' : '10s Quick Verdict'}
                </span>
                <span className={`block text-[10px] ${isFastMode ? 'text-amber-300' : 'opacity-60'}`}>
                  {isFastMode 
                    ? (currentLanguage === 'hi' ? 'टर्बो मोड' : currentLanguage === 'bho' ? 'टर्बो मोड' : 'Turbo Mode')
                    : (currentLanguage === 'hi' ? 'डीप वेक्टर स्कैन' : currentLanguage === 'bho' ? 'डीप वेक्टर स्कैन' : 'Deep Vector Scan')}
                </span>
              </div>
            </label>
          )}

          {/* Privacy Ephemeral Auto-Delete Toggle */}
          <label className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border shadow-xs cursor-pointer select-none transition-all shrink-0 ${
            isCyber
              ? 'bg-slate-900/90 border-emerald-500/40 hover:border-emerald-400 text-white'
              : isDark
              ? 'bg-neutral-800 border-neutral-700 hover:border-neutral-600 text-white'
              : 'bg-white border-emerald-300 hover:bg-emerald-50/50 text-neutral-900'
          }`}>
            <input
              type="checkbox"
              checked={autoDeleteEnabled}
              onChange={(e) => onToggleAutoDelete(e.target.checked)}
              className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500 border-neutral-400"
            />
            <div className="text-left">
              <span className="block text-xs font-bold">
                {t.autoDeleteLabel.split('(')[0] || 'Ephemeral Auto-Delete'}
              </span>
              <span className={`block text-[10px] ${isCyber ? 'text-emerald-400' : isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {autoDeleteEnabled 
                  ? (currentLanguage === 'hi' ? 'RAM से तुरंत हटाएं' : currentLanguage === 'bho' ? 'RAM से तुरंत मिटाईं' : 'Purge from RAM instantly')
                  : (currentLanguage === 'hi' ? 'वर्तमान सत्र में रखें' : currentLanguage === 'bho' ? 'सत्र में रखीं' : 'Retain in current session')}
              </span>
            </div>
            <Trash2 className={`w-3.5 h-3.5 ${autoDeleteEnabled ? 'text-emerald-400' : 'text-neutral-500'}`} />
          </label>
        </div>
      </div>

      {/* 3 Interactive Ingestion Tabs: File Drop vs Social Link Fact-Check vs Live Voice Clone */}
      <div className={`p-1.5 rounded-2xl border flex items-center justify-center gap-2 max-w-xl mx-auto shadow-xs ${
        isCyber ? 'bg-slate-900/90 border-slate-800' : isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
      }`}>
        <button
          onClick={() => setScanTool('file')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            scanTool === 'file'
              ? isCyber
                ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                : 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
              : 'opacity-70 hover:opacity-100'
          }`}
        >
          <UploadCloud className="w-3.5 h-3.5 text-cyan-400" />
          <span>{fileTabLabel}</span>
        </button>

        <button
          onClick={() => setScanTool('link')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            scanTool === 'link'
              ? isCyber
                ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                : 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
              : 'opacity-70 hover:opacity-100'
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5 text-emerald-400" />
          <span>{socialTabLabel}</span>
        </button>

        <button
          onClick={() => setScanTool('mic')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            scanTool === 'mic'
              ? isCyber
                ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                : 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
              : 'opacity-70 hover:opacity-100'
          }`}
        >
          <Mic className="w-3.5 h-3.5 text-pink-400" />
          <span>{voiceTabLabel}</span>
        </button>
      </div>

      {/* RENDER SELECTED INGESTION TOOL */}
      {scanTool === 'link' && (
        <UrlLinkScanner 
          theme={theme}
          currentLanguage={currentLanguage}
          onAnalyzeUrl={(url: string, title?: string, forcedVerdict?: 'REAL' | 'FAKE') => {
            const platformTag = (url.includes('youtube.com') || url.includes('youtu.be')) ? 'YouTube' :
                                url.includes('instagram.com') ? 'Instagram' :
                                url.includes('tiktok.com') ? 'TikTok' :
                                (url.includes('x.com') || url.includes('twitter.com')) ? 'X (Twitter)' : 'Social Stream';
            
            // Format title cleanly for UI display
            let cleanTitle = title?.trim() || '';
            if (!cleanTitle || cleanTitle.startsWith('Social Stream (http') || cleanTitle.startsWith('Social Stream (www')) {
              cleanTitle = `${platformTag} Media Stream`;
            }
            // Strip technical URL prefixes if leaked into title
            cleanTitle = cleanTitle.replace(/^https?:\/\//i, '').replace(/^www\./i, '');
            if (cleanTitle.length > 60) {
              cleanTitle = cleanTitle.slice(0, 57) + '...';
            }

            const fileName = `${cleanTitle}`;
            const file = new File([new Blob([`URL_STREAM:${url}`], { type: 'video/mp4' })], fileName, { type: 'video/mp4' });
            onAnalyzeCustomFile(file, forcedVerdict, url);
          }}
          isAnalyzing={isAnalyzing}
        />
      )}

      {scanTool === 'mic' && (
        <LiveVoiceAnalyzer
          theme={theme}
          currentLanguage={currentLanguage}
          onAnalyzeAudioBlob={(blob: Blob, sampleName: string, forcedVerdict?: 'REAL' | 'FAKE') => {
            const fileName = sampleName || (forcedVerdict === 'FAKE' ? 'Synthetic_AI_Voice_Clone.wav' : 'Real_Voice_Recording.wav');
            const file = new File([blob], fileName, { type: 'audio/wav' });
            onAnalyzeCustomFile(file, forcedVerdict);
          }}
          isAnalyzing={isAnalyzing}
        />
      )}

      {/* Main Upload Drop Box with HUD Laser Scanner */}
      {scanTool === 'file' && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all overflow-hidden ${
          isDragOver
            ? 'border-cyan-400 bg-cyan-950/30 ring-4 ring-cyan-500/20 scale-[1.005]'
            : isCyber
            ? 'border-slate-700/80 hover:border-cyan-400/70 bg-gradient-to-b from-slate-900/90 via-slate-950/90 to-slate-900/90 shadow-2xl shadow-black/60 cyber-grid-pattern'
            : isDark
            ? 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/80 shadow-2xl'
            : 'border-neutral-300 hover:border-neutral-400 bg-white hover:bg-neutral-50/50 shadow-sm'
        }`}
      >
        {/* Animated Cyber Laser Scanner Bar */}
        {(isCyber || isDragOver) && (
          <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#38bdf8] animate-laser-scan pointer-events-none" />
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="video/*,image/*,audio/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="max-w-xl mx-auto flex flex-col items-center relative z-10">
          {/* Animated Center Hologram Upload Crest */}
          <div className={`w-18 h-18 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-200 shadow-xl ${
            isCyber
              ? 'bg-gradient-to-b from-cyan-900/80 to-slate-950 text-cyan-400 border border-cyan-500/40 shadow-cyan-950/60'
              : isDark
              ? 'bg-neutral-800 text-sky-400 border border-neutral-700'
              : 'bg-neutral-900 text-white shadow-neutral-900/10'
          }`}>
            <UploadCloud className="w-9 h-9" />
          </div>

          <h3 className={`text-xl sm:text-2xl font-black tracking-tight mb-2 ${
            isCyber ? 'text-white' : isDark ? 'text-neutral-100' : 'text-neutral-900'
          }`}>
            {t.dropPrompt}
          </h3>
          <p className={`text-xs sm:text-sm mb-6 max-w-md ${
            isCyber ? 'text-slate-400' : isDark ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            {t.uploadAreaSubtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-lg transition-all hover:scale-105 active:scale-95 ${
                isCyber
                  ? 'bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black shadow-cyan-900/40'
                  : isDark
                  ? 'bg-sky-500 hover:bg-sky-400 text-neutral-950 font-black'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-white'
              }`}
            >
              {t.selectFile}
            </button>

            {/* Auto Delete Quick Indicator */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-semibold ${
              isCyber
                ? 'bg-slate-900/90 border-slate-800 text-slate-300'
                : isDark
                ? 'bg-neutral-800 border-neutral-700 text-neutral-300'
                : 'bg-neutral-100 border-neutral-200 text-neutral-700'
            }`}>
              <Shield className={`w-3.5 h-3.5 ${autoDeleteEnabled ? 'text-emerald-400' : 'text-amber-400'}`} />
              <span>{autoDeleteEnabled ? 'Zero-Trace Ephemeral' : 'Session Retained'}</span>
            </div>
          </div>

          {/* Supported Format Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 text-xs">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border ${
              isCyber
                ? 'bg-slate-900/90 text-cyan-300 border-slate-800'
                : isDark
                ? 'bg-neutral-800/80 text-neutral-300 border-neutral-700'
                : 'bg-neutral-100 text-neutral-700 border-neutral-200'
            }`}>
              <FileVideo className="w-3.5 h-3.5 text-sky-400" /> Video (MP4, WebM, MOV)
            </span>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border ${
              isCyber
                ? 'bg-slate-900/90 text-indigo-300 border-slate-800'
                : isDark
                ? 'bg-neutral-800/80 text-neutral-300 border-neutral-700'
                : 'bg-neutral-100 text-neutral-700 border-neutral-200'
            }`}>
              <ImageIcon className="w-3.5 h-3.5 text-indigo-400" /> Image (JPG, PNG, WebP)
            </span>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border ${
              isCyber
                ? 'bg-slate-900/90 text-emerald-300 border-slate-800'
                : isDark
                ? 'bg-neutral-800/80 text-neutral-300 border-neutral-700'
                : 'bg-neutral-100 text-neutral-700 border-neutral-200'
            }`}>
              <FileAudio className="w-3.5 h-3.5 text-emerald-400" /> Audio (WAV, MP3, AAC)
            </span>
          </div>
        </div>
      </div>
      )}

      {/* Instant Demo Test Samples (1-Click Evaluation) */}
      <div className="mt-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h4 className={`text-base font-bold flex items-center gap-2 ${
              isCyber ? 'text-white' : isDark ? 'text-neutral-100' : 'text-neutral-900'
            }`}>
              <Sparkles className="w-4 h-4 text-cyan-400" />
              {t.trySampleMedia}
            </h4>
            <p className={`text-xs ${isCyber ? 'text-slate-400' : isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              {t.sampleMediaSubtitle}
            </p>
          </div>
          <span className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg border ${
            isCyber
              ? 'bg-slate-900 text-cyan-400 border-slate-800'
              : isDark
              ? 'bg-neutral-900 text-neutral-400 border-neutral-800'
              : 'bg-neutral-100 text-neutral-600 border-neutral-200'
          }`}>
            6 Curated Multi-Format Tests
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {DEMO_SAMPLES.map((sample) => {
            const isFake = sample.expectedVerdict === 'FAKE';
            const loc = getLocalizedSampleData(sample.id, currentLanguage);
            const title = loc?.title || sample.title;
            const category = loc?.category || sample.category;
            const description = loc?.description || sample.description;
            const tags = loc?.tags || sample.tags;

            const isAudioSample = sample.mediaType === 'audio';
            const isImageSample = sample.mediaType === 'image';
            const isVideoSample = sample.mediaType === 'video';

            return (
              <div
                key={sample.id}
                onClick={() => onAnalyzeSample(sample)}
                className={`group relative rounded-2xl border overflow-hidden cursor-pointer transition-all duration-200 flex flex-col justify-between hover:scale-[1.02] ${
                  isCyber
                    ? 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/50 shadow-lg shadow-black/40 hover:shadow-cyan-950/40'
                    : isDark
                    ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700 shadow-lg hover:shadow-black'
                    : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-xs hover:shadow-md'
                }`}
              >
                {/* Thumbnail Header */}
                <div className="relative h-32 w-full bg-neutral-950 overflow-hidden">
                  <img
                    src={sample.thumbnailUrl}
                    alt={title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Format Pill (Video, Photo, Audio) */}
                  <div className="absolute top-2 right-2">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-white border border-white/20">
                      {isVideoSample ? '🎬 Video' : isImageSample ? '📸 Photo' : '🎙️ Audio'}
                    </span>
                  </div>

                  {/* Verdict Badge */}
                  <div className="absolute top-2 left-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isFake ? 'bg-red-500/90 text-white' : 'bg-emerald-500/90 text-white'
                    }`}>
                      {isFake ? t.verdictFake.split('/')[0] : t.verdictReal} ({sample.fakePercentage > 50 ? `${sample.fakePercentage}% Fake` : `${sample.realPercentage}% Real`})
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white">
                    <span className="text-[11px] font-medium truncate">{category}</span>
                    <Play className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h5 className={`font-bold text-xs line-clamp-1 transition-colors ${
                      isCyber
                        ? 'text-white group-hover:text-cyan-300'
                        : isDark
                        ? 'text-neutral-100 group-hover:text-sky-400'
                        : 'text-neutral-900 group-hover:text-sky-600'
                    }`}>
                      {title}
                    </h5>
                    <p className={`text-[11px] mt-1 line-clamp-2 leading-relaxed ${
                      isCyber ? 'text-slate-400' : isDark ? 'text-neutral-400' : 'text-neutral-500'
                    }`}>
                      {description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-neutral-200/20 flex flex-wrap gap-1">
                    {tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${
                        isCyber
                          ? 'bg-slate-800 text-cyan-300'
                          : isDark
                          ? 'bg-neutral-800 text-neutral-300'
                          : 'bg-neutral-100 text-neutral-600'
                      }`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

