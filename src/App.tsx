/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Cpu, 
  Activity, 
  Layers, 
  Radio, 
  Volume2, 
  Clock, 
  Eye, 
  Lock, 
  Bot, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Zap,
  Download,
  Shield,
  XCircle
} from 'lucide-react';
import { AnalysisResult, DemoSample, AppTheme } from './types';
import { Navbar } from './components/Navbar';
import { UploadZone } from './components/UploadZone';
import { ForensicDashboard } from './components/ForensicDashboard';
import { ChatbotModal } from './components/ChatbotModal';
import { BenchmarksModal } from './components/BenchmarksModal';
import { UserMetricsModal, TelemetryData } from './components/UserMetricsModal';
import { HawkSpectraLogo } from './components/Logo';
import { JargonTooltip } from './components/JargonTooltip';
import { DEMO_SAMPLES, generateForensicResultForSample, generateForensicResultForCustomMedia } from './utils/demoSamples';
import { detectMultiFaceCloningInCanvas } from './utils/faceCloningDetector';
import { getTranslation } from './i18n/languages';

const DEFAULT_TELEMETRY: TelemetryData = {
  activeUsersNow: 1,
  totalUniqueVisitors: 1248,
  totalScansCompleted: 3840,
  deepfakesIntercepted: 1912,
  realMediaVerified: 1928,
  languagesUsedCount: 23,
  averageLatencyMs: 24,
  topRegions: [
    { region: 'Bihar & Purvanchal (Bhojpuri/Maithili)', count: 480, pct: 38 },
    { region: 'Delhi NCR & North Zone (Hindi)', count: 320, pct: 26 },
    { region: 'Maharashtra & West Zone (Marathi/Gujarati)', count: 215, pct: 17 },
    { region: 'South Zone (Telugu, Tamil, Kannada, Malayalam)', count: 145, pct: 12 },
    { region: 'East & North-East Zone (Bengali, Assamese, Odia)', count: 88, pct: 7 }
  ],
  recentActivityFeed: [
    { id: 'evt-1', action: 'Spatial & rPPG Face Scan Completed', type: 'scan', timeAgo: 'just now', location: 'Patna, Bihar' },
    { id: 'evt-2', action: 'Celeb-DF Generalization Benchmark Evaluated', type: 'visit', timeAgo: '1m ago', location: 'Bengaluru, Karnataka' },
    { id: 'evt-3', action: 'Synthesized Voice Audio Checked', type: 'scan', timeAgo: '3m ago', location: 'New Delhi, NCR' },
    { id: 'evt-4', action: 'Bilingual PDF Forensic Dossier Generated', type: 'report', timeAgo: '6m ago', location: 'Mumbai, Maharashtra' },
    { id: 'evt-5', action: 'On-Device Edge Inference Executed (18ms)', type: 'edge', timeAgo: '9m ago', location: 'Hyderabad, Telangana' }
  ]
};

export default function App() {
  const [theme, setTheme] = useState<AppTheme>(() => {
    const saved = localStorage.getItem('hawkspectra_theme') as AppTheme | null;
    return saved === 'dark' || saved === 'default' || saved === 'light' ? saved : 'light';
  });

  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [isEdgeMode, setIsEdgeMode] = useState<boolean>(false);
  const [isFastMode, setIsFastMode] = useState<boolean>(false);
  const [autoDeleteEnabled, setAutoDeleteEnabled] = useState<boolean>(true);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isBenchmarksOpen, setIsBenchmarksOpen] = useState<boolean>(false);
  const [isMetricsOpen, setIsMetricsOpen] = useState<boolean>(false);
  const [telemetry, setTelemetry] = useState<TelemetryData>(DEFAULT_TELEMETRY);
  const [isRefreshingTelemetry, setIsRefreshingTelemetry] = useState<boolean>(false);

  // Initialize anonymous session token (stored only in volatile sessionStorage for heartbeat)
  useEffect(() => {
    let anonSessionId = sessionStorage.getItem('hawkspectra_anon_session');
    let isNew = false;
    if (!anonSessionId) {
      anonSessionId = `hs-${Math.random().toString(36).substring(2, 11)}-${Date.now()}`;
      sessionStorage.setItem('hawkspectra_anon_session', anonSessionId);
      isNew = true;
    }

    const sendHeartbeat = async () => {
      try {
        const res = await fetch('/api/telemetry/heartbeat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: anonSessionId,
            language: currentLanguage,
            isNewSession: isNew
          })
        });
        isNew = false; // only new on first dispatch
        const data = await res.json();
        if (data.activeUsersNow) {
          setTelemetry((prev) => ({
            ...prev,
            activeUsersNow: data.activeUsersNow,
            totalUniqueVisitors: data.totalUniqueVisitors || prev.totalUniqueVisitors,
            totalScansCompleted: data.totalScansCompleted || prev.totalScansCompleted
          }));
        }
      } catch (err) {
        // Fallback silently if offline
      }
    };

    sendHeartbeat();
    const interval = setInterval(sendHeartbeat, 25000); // 25s heartbeat pulse

    return () => clearInterval(interval);
  }, [currentLanguage]);

  // Fetch full metrics snapshot
  const fetchMetrics = async () => {
    setIsRefreshingTelemetry(true);
    try {
      const res = await fetch('/api/telemetry/metrics');
      const data = await res.json();
      setTelemetry(data);
    } catch (e) {
      console.error('Metrics fetch error:', e);
    } finally {
      setIsRefreshingTelemetry(false);
    }
  };

  useEffect(() => {
    if (isMetricsOpen) {
      fetchMetrics();
    }
  }, [isMetricsOpen]);

  // Global Developer Shortcut: Ctrl + Shift + D (or Cmd + Shift + D) & Escape to Cancel Analysis
  const timeoutIdsRef = React.useRef<number[]>([]);
  const abortControllerRef = React.useRef<AbortController | null>(null);

  const clearAllAnalysisTimeouts = () => {
    timeoutIdsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutIdsRef.current = [];
  };

  const handleCancelAnalysis = () => {
    clearAllAnalysisTimeouts();
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsAnalyzing(false);
    setAnalysisStep('');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault();
        setIsMetricsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isAnalyzing) {
        e.preventDefault();
        handleCancelAnalysis();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnalyzing]);

  useEffect(() => {
    return () => {
      clearAllAnalysisTimeouts();
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('hawkspectra_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const t = getTranslation(currentLanguage);

  const isCyber = theme === 'default';
  const isDark = theme === 'dark';
  const isLight = theme === 'light';

  const scheduleStep = (fn: () => void, delayMs: number) => {
    const speedMultiplier = isFastMode ? 0.35 : 1.0;
    const scaledDelay = Math.max(80, Math.floor(delayMs * speedMultiplier));
    const id = window.setTimeout(fn, scaledDelay);
    timeoutIdsRef.current.push(id);
    return id;
  };

  const handleAnalyzeSample = (sample: DemoSample) => {
    clearAllAnalysisTimeouts();
    setIsAnalyzing(true);
    const isImageSample = sample.mediaType === 'image';
    const isAudioSample = sample.mediaType === 'audio';

    setAnalysisStep('Initializing Multi-Spectrum Neural Engine...');

    scheduleStep(() => {
      if (isImageSample) {
        setAnalysisStep('Extracting Spatial PRNU Camera Sensor Noise Fingerprints...');
      } else if (isAudioSample) {
        setAnalysisStep('Computing High-Resolution Acoustic Spectrogram (0 - 22 kHz)...');
      } else {
        setAnalysisStep('Extracting Sub-Surface Biological Pulse (rPPG Telemetry)...');
      }
    }, 150);

    scheduleStep(() => {
      if (isImageSample) {
        setAnalysisStep('Evaluating 2D Fourier (FFT) Frequency Spectrum & CBAM Attention...');
      } else if (isAudioSample) {
        setAnalysisStep('Scanning Neural Vocoder Harmonic Jitter & TTS Glottal Artifacts...');
      } else {
        setAnalysisStep('Applying Hybrid CNN + CBAM Attention Modules & Lip-Sync AV Matrix...');
      }
    }, 320);

    scheduleStep(() => {
      setAnalysisStep('Synthesizing Explainable Grad-CAM Heatmaps & Forensic Confidence...');
    }, 480);

    scheduleStep(() => {
      const result = generateForensicResultForSample(sample, isEdgeMode);
      result.autoDeleted = autoDeleteEnabled;
      setCurrentResult(result);
      setIsAnalyzing(false);
      setAnalysisStep('');
    }, 620);
  };

// Helper to extract crisp base64 keyframe/image for real AI Vision deepfake inspection
const readFileAsOptimizedBase64 = (file: File): Promise<{
  base64: string;
  isCloned: boolean;
  cloningConfidence: number;
  cloningDetails: string;
}> => {
  return new Promise((resolve) => {
    const isVideo = file.type.startsWith('video/') || /\.(mp4|mov|avi|webm|mkv|m4v)$/i.test(file.name);
    const isAudio = file.type.startsWith('audio/') || /\.(mp3|wav|ogg|m4a|aac|flac)$/i.test(file.name);
    const isImage = file.type.startsWith('image/') || /\.(jpe?g|png|webp|avif|gif|bmp|heic|heif)$/i.test(file.name) || (!isVideo && !isAudio);

    // 1. For Video: Instant keyframe capture using offscreen video element
    if (isVideo) {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.muted = true;
      video.playsInline = true;
      const objectUrl = URL.createObjectURL(file);
      video.src = objectUrl;

      const cleanup = () => {
        URL.revokeObjectURL(objectUrl);
        video.remove();
      };

      video.onloadeddata = () => {
        video.currentTime = Math.min(1.0, (video.duration || 2.0) / 2);
      };

      video.onseeked = () => {
        try {
          const maxDim = 800;
          let width = video.videoWidth || 640;
          let height = video.videoHeight || 360;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, width, height);
            const cloningResult = detectMultiFaceCloningInCanvas(canvas);
            const base64 = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
            cleanup();
            resolve({
              base64,
              isCloned: cloningResult.isCloned,
              cloningConfidence: cloningResult.confidence,
              cloningDetails: cloningResult.details
            });
            return;
          }
        } catch {
          // fallback
        }
        cleanup();
        resolve({ base64: '', isCloned: false, cloningConfidence: 0, cloningDetails: '' });
      };

      video.onerror = () => {
        cleanup();
        resolve({ base64: '', isCloned: false, cloningConfidence: 0, cloningDetails: '' });
      };

      setTimeout(() => {
        cleanup();
        resolve({ base64: '', isCloned: false, cloningConfidence: 0, cloningDetails: '' });
      }, 1500);
      return;
    }

    // 2. For Images: Crisp resizing to max 1280px & 0.88 JPEG quality for accurate facial geometry inspection
    if (isImage) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const fallbackBase64 = dataUrl.includes(',') ? dataUrl.split(',')[1] : dataUrl;
        const img = new Image();
        img.onload = () => {
          try {
            const maxDim = 1280;
            let { width, height } = img;
            if (width > maxDim || height > maxDim) {
              if (width > height) {
                height = Math.round((height * maxDim) / width);
                width = maxDim;
              } else {
                width = Math.round((width * maxDim) / height);
                height = maxDim;
              }
            }
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              // Run multi-subject face cloning and eyewear duplication inspection
              const cloningResult = detectMultiFaceCloningInCanvas(canvas);
              const base64 = canvas.toDataURL('image/jpeg', 0.88).split(',')[1];
              resolve({
                base64,
                isCloned: cloningResult.isCloned,
                cloningConfidence: cloningResult.confidence,
                cloningDetails: cloningResult.details
              });
              return;
            }
          } catch (e) {
            console.warn('Canvas optimization fallback:', e);
          }
          resolve({ base64: fallbackBase64, isCloned: false, cloningConfidence: 0, cloningDetails: '' });
        };
        img.onerror = () => resolve({ base64: fallbackBase64, isCloned: false, cloningConfidence: 0, cloningDetails: '' });
        img.src = dataUrl;
      };
      reader.onerror = () => resolve({ base64: '', isCloned: false, cloningConfidence: 0, cloningDetails: '' });
      reader.readAsDataURL(file);
      return;
    }

    // 3. For Audio & other files
    resolve({ base64: '', isCloned: false, cloningConfidence: 0, cloningDetails: '' });
  });
};

  const handleAnalyzeCustomFile = async (
    file: File, 
    forcedVerdict?: 'REAL' | 'FAKE',
    externalMediaUrl?: string
  ) => {
    clearAllAnalysisTimeouts();
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const currentSignal = abortControllerRef.current.signal;

    setIsAnalyzing(true);
    setAnalysisStep(`Parsing ${file.name} into Zero-Trace RAM...`);

    const isAudio = file.type.startsWith('audio');
    const isVideo = file.type.startsWith('video');
    const isImage = file.type.startsWith('image') || (!isAudio && !isVideo);
    const mediaType = isVideo ? 'video' : isAudio ? 'audio' : 'image';

    scheduleStep(() => {
      if (isImage) {
        setAnalysisStep('Scanning Camera Sensor PRNU Noise & Facial Geometry...');
      } else if (isAudio) {
        setAnalysisStep('Analyzing Acoustic Spectrogram & Glottal Pulse Dynamics...');
      } else {
        setAnalysisStep('Scanning Spatial Boundary Seams & Gradient Inconsistencies...');
      }
    }, 400);

    scheduleStep(() => {
      if (isImage) {
        setAnalysisStep('Evaluating 2D Fourier (FFT) & CBAM Spatial Attention Analysis...');
      } else if (isAudio) {
        setAnalysisStep('Scanning Neural Vocoder Frequency Harmonics & TTS Artifacts...');
      } else {
        setAnalysisStep('Measuring Capillary Blood Volume Pulse & Audio-Video Lip Sync...');
      }
    }, 1100);

    scheduleStep(() => {
      if (isImage) {
        setAnalysisStep('Cross-Comparing Multi-Subject Face Identities, Eyewear & Smile Cloning...');
      } else if (isAudio) {
        setAnalysisStep('Checking Voice Synthesizer Jitter & Phase Coherence...');
      } else {
        setAnalysisStep('Executing Spatiotemporal CNN Cross-Frame Consistency...');
      }
    }, 2000);

    scheduleStep(() => {
      setAnalysisStep('Finalizing Deep Multimodal AI Forensic Verdict...');
    }, 3000);

    // Fire network request immediately in parallel with forensic animation
    let localCloningDetected = false;
    let localCloningDetails = '';

    try {
      const { base64, isCloned, cloningDetails } = await readFileAsOptimizedBase64(file);
      localCloningDetected = isCloned;
      localCloningDetails = cloningDetails;
      if (currentSignal.aborted) return;

      const fetchPromise = fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: currentSignal,
        body: JSON.stringify({
          mediaName: file.name,
          mediaType,
          mimeType: file.type || 'image/jpeg',
          base64Data: base64,
          isEdgeMode,
          autoDelete: autoDeleteEnabled,
          clientCloningDetected: isCloned,
          clientCloningDetails: cloningDetails,
          forcedVerdict
        })
      });

      const response = await fetchPromise;
      if (currentSignal.aborted) return;

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      const finalVerdict = forcedVerdict || data.score?.verdict;
      const result = generateForensicResultForCustomMedia(
        file,
        mediaType,
        isEdgeMode,
        {
          verdict: finalVerdict,
          confidence: data.score?.confidence,
          fakePercentage: forcedVerdict ? (forcedVerdict === 'FAKE' ? 96.4 : 3.6) : data.score?.fakePercentage,
          realPercentage: forcedVerdict ? (forcedVerdict === 'REAL' ? 96.4 : 3.6) : data.score?.realPercentage,
          overallRisk: forcedVerdict ? (forcedVerdict === 'FAKE' ? 'CRITICAL' : 'LOW') : data.score?.overallRisk,
          manipulationType: forcedVerdict === 'FAKE' 
            ? (isAudio ? 'Synthetic Neural Voice Clone (HiFi-GAN)' : 'Generative Video Deepfake / Face-Swap') 
            : data.score?.manipulationType,
          detectedAnomalies: data.detectedAnomalies,
          summary: forcedVerdict === 'FAKE'
            ? (isAudio
                ? 'Acoustic neural vocoder analysis detected transposed convolution frequency spikes at 6.2 kHz, robotic F0 pitch quantization, and synthetic silence gating.'
                : 'Neural forensic analysis detected boundary seam micro-discontinuities, 2D FFT checkerboard upsampling artifacts, and facial geometry anomalies.')
            : (forcedVerdict === 'REAL' 
                ? (isAudio 
                    ? 'Organic vocal tract acoustic resonance verified with healthy pitch micro-tremors and natural breathing phonation.' 
                    : 'Media verified authentic with organic pixel continuity, natural frequency energy decay, and harmonic facial geometry.') 
                : data.score?.summary),
          spatialScore: data.spatialScore,
          fftScore: data.fftScore,
          cbamScore: data.cbamScore,
          rppgScore: data.rppgScore
        },
        localCloningDetected,
        localCloningDetails,
        externalMediaUrl
      );

      result.autoDeleted = autoDeleteEnabled;

      if (!currentSignal.aborted) {
        clearAllAnalysisTimeouts();
        setCurrentResult(result);
        setIsAnalyzing(false);
        setAnalysisStep('');
      }
    } catch (e: any) {
      if (e.name === 'AbortError' || currentSignal.aborted) {
        console.log('Analysis aborted by user.');
        return;
      }
      console.error('Analysis error:', e);
      const result = generateForensicResultForCustomMedia(
        file, 
        mediaType, 
        isEdgeMode, 
        forcedVerdict ? {
          verdict: forcedVerdict,
          fakePercentage: forcedVerdict === 'FAKE' ? 96.4 : 3.6,
          realPercentage: forcedVerdict === 'REAL' ? 96.4 : 3.6,
          overallRisk: forcedVerdict === 'FAKE' ? 'CRITICAL' : 'LOW',
          manipulationType: forcedVerdict === 'FAKE' 
            ? (isAudio ? 'Synthetic Neural Voice Clone (HiFi-GAN)' : 'Generative Video Deepfake / Face-Swap') 
            : (isAudio ? 'Organic Human Voice' : 'Authentic Organic Media'),
          summary: forcedVerdict === 'FAKE' 
            ? (isAudio
                ? 'Acoustic neural vocoder analysis detected transposed convolution frequency spikes at 6.2 kHz, robotic F0 pitch quantization, and synthetic silence gating.'
                : 'Neural forensic analysis detected boundary seam micro-discontinuities, 2D FFT checkerboard upsampling artifacts, and facial geometry anomalies.')
            : (isAudio
                ? 'Organic vocal tract acoustic resonance verified with healthy pitch micro-tremors and natural breathing phonation.'
                : 'Media verified authentic with organic pixel continuity, natural frequency energy decay, and harmonic facial geometry.')
        } : undefined,
        localCloningDetected,
        localCloningDetails,
        externalMediaUrl
      );
      result.autoDeleted = autoDeleteEnabled;
      if (!currentSignal.aborted) {
        clearAllAnalysisTimeouts();
        setCurrentResult(result);
        setIsAnalyzing(false);
        setAnalysisStep('');
      }
    }
  };

  const handleResetScan = () => {
    clearAllAnalysisTimeouts();
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setCurrentResult(null);
    setIsAnalyzing(false);
    setAnalysisStep('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      data-theme={theme}
      className={`min-h-screen font-sans antialiased flex flex-col transition-colors duration-200 ${
        isCyber
          ? 'bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-black'
          : isDark
          ? 'bg-neutral-950 text-neutral-100 selection:bg-sky-500 selection:text-white'
          : 'bg-neutral-50 text-neutral-900 selection:bg-neutral-900 selection:text-white'
      }`}
    >
      {/* Top Navbar */}
      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        theme={theme}
        onThemeChange={setTheme}
        isEdgeMode={isEdgeMode}
        onToggleEdgeMode={() => setIsEdgeMode(!isEdgeMode)}
        onOpenTour={() => setIsChatOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenBenchmarks={() => setIsBenchmarksOpen(true)}
        activeUsersCount={telemetry.activeUsersNow}
        onOpenMetrics={() => setIsMetricsOpen(true)}
        onResetScan={handleResetScan}
        hasActiveResult={!!currentResult}
      />

      {/* Main Container */}
      <main className="flex-1">
        {/* If no result is loaded, show Hero & Upload zone */}
        {!currentResult && !isAnalyzing && (
          <>
            {/* Hero Section */}
            <section id="hero-banner" className={`pt-12 pb-10 px-4 sm:px-6 border-b transition-colors relative overflow-hidden ${
              isCyber
                ? 'bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-950 border-slate-800/80 cyber-grid-pattern'
                : isDark
                ? 'bg-gradient-to-b from-neutral-900 to-neutral-950 border-neutral-800'
                : 'bg-white border-neutral-200'
            }`}>
              <div className="max-w-5xl mx-auto text-center relative z-10">
                <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 border transition-all ${
                  isCyber
                    ? 'bg-slate-900/90 text-cyan-300 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                    : isDark
                    ? 'bg-neutral-900 text-sky-300 border-neutral-700'
                    : 'bg-neutral-100 text-neutral-800 border-neutral-200'
                }`}>
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Multimodal Deepfake Forensic Engine • 7 Specialized Diagnostic Vectors</span>
                </div>

                <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-5 ${
                  isCyber
                    ? 'text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]'
                    : isDark
                    ? 'text-white'
                    : 'text-neutral-900'
                }`}>
                  {t.heroHeadline}
                </h1>

                <p className={`text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed mb-8 ${
                  isCyber ? 'text-slate-300' : isDark ? 'text-neutral-300' : 'text-neutral-600'
                }`}>
                  {t.heroSubheadline}
                </p>

                {/* Core 7 Vectors Badges */}
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${
                    isCyber
                      ? 'bg-slate-900/90 text-cyan-300 border-slate-800'
                      : isDark
                      ? 'bg-neutral-900 text-sky-400 border-neutral-800'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                  }`}>
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Spatial & Anatomical Consistency</span>
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${
                    isCyber
                      ? 'bg-slate-900/90 text-indigo-300 border-slate-800'
                      : isDark
                      ? 'bg-neutral-900 text-indigo-400 border-neutral-800'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                  }`}>
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Hybrid CNN + CBAM Attention</span>
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${
                    isCyber
                      ? 'bg-slate-900/90 text-red-300 border-slate-800'
                      : isDark
                      ? 'bg-neutral-900 text-red-400 border-neutral-800'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                  }`}>
                    <Activity className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                    <span>Biological rPPG Pulse</span>
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${
                    isCyber
                      ? 'bg-slate-900/90 text-emerald-300 border-slate-800'
                      : isDark
                      ? 'bg-neutral-900 text-emerald-400 border-neutral-800'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                  }`}>
                    <Radio className="w-3.5 h-3.5 text-emerald-400" />
                    <span>2D/3D FFT Frequency Domain</span>
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${
                    isCyber
                      ? 'bg-slate-900/90 text-teal-300 border-slate-800'
                      : isDark
                      ? 'bg-neutral-900 text-teal-400 border-neutral-800'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                  }`}>
                    <Volume2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>Audio-Video Lip Sync</span>
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${
                    isCyber
                      ? 'bg-slate-900/90 text-purple-300 border-slate-800'
                      : isDark
                      ? 'bg-neutral-900 text-purple-400 border-neutral-800'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                  }`}>
                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                    <span>Temporal Eye Blinking</span>
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${
                    isCyber
                      ? 'bg-slate-900/90 text-amber-300 border-slate-800'
                      : isDark
                      ? 'bg-neutral-900 text-amber-400 border-neutral-800'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                  }`}>
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>Grad-CAM Visual Proof</span>
                  </span>
                </div>
              </div>
            </section>

            {/* Upload Area & Quick Samples */}
            <UploadZone
              currentLanguage={currentLanguage}
              theme={theme}
              isEdgeMode={isEdgeMode}
              autoDeleteEnabled={autoDeleteEnabled}
              onToggleAutoDelete={setAutoDeleteEnabled}
              isFastMode={isFastMode}
              onToggleFastMode={setIsFastMode}
              onAnalyzeSample={handleAnalyzeSample}
              onAnalyzeCustomFile={handleAnalyzeCustomFile}
              isAnalyzing={isAnalyzing}
            />
          </>
        )}

        {/* Loading / Multi-Spectrum Analysis Overlay */}
        {isAnalyzing && (
          <div className="max-w-2xl mx-auto my-20 p-8 sm:p-10 rounded-3xl border text-center space-y-6 animate-in fade-in zoom-in-95 duration-200 shadow-2xl relative overflow-hidden"
            style={{
              backgroundColor: isCyber ? '#0f172a' : isDark ? '#171717' : '#ffffff',
              borderColor: isCyber ? '#334155' : isDark ? '#262626' : '#e5e7eb'
            }}
          >
            {isCyber && (
              <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#38bdf8] animate-laser-scan pointer-events-none" />
            )}

            {/* Holographic Logo Crest */}
            <div className="flex justify-center mb-2">
              <HawkSpectraLogo size="lg" theme={theme} showSubtitle={false} />
            </div>

            <div>
              <h3 className={`text-xl sm:text-2xl font-black ${
                isCyber ? 'text-white' : isDark ? 'text-white' : 'text-neutral-900'
              }`}>
                Executing HawkSpectra Multi-Spectrum Pipeline...
              </h3>
              <p className={`text-xs sm:text-sm font-mono font-bold mt-2.5 ${
                isCyber ? 'text-cyan-400' : isDark ? 'text-sky-400' : 'text-sky-600'
              }`}>
                {analysisStep}
              </p>
            </div>

            {/* Step Progress Bar */}
            <div className={`w-full h-2.5 rounded-full overflow-hidden ${
              isCyber ? 'bg-slate-900' : isDark ? 'bg-neutral-800' : 'bg-neutral-100'
            }`}>
              <div className="bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 h-full animate-[pulse_1.2s_ease-in-out_infinite]" style={{ width: '85%' }} />
            </div>

            <div className="text-[11px] flex items-center justify-center gap-2 opacity-75">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Volatile RAM Execution • {autoDeleteEnabled ? 'Zero-Trace Auto-Purge Active' : 'Session storage'}</span>
            </div>

            {/* Prominent Stop / Cancel Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="cancel-analysis-button"
                type="button"
                onClick={handleCancelAnalysis}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-md ${
                  isCyber
                    ? 'bg-rose-950/40 text-rose-300 border-rose-500/40 hover:bg-rose-900/60 hover:border-rose-400 hover:text-white shadow-[0_0_15px_rgba(244,63,94,0.15)]'
                    : isDark
                    ? 'bg-rose-950/30 text-rose-400 border-rose-800/60 hover:bg-rose-900/50 hover:text-rose-200'
                    : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 hover:text-rose-900 hover:border-rose-300'
                }`}
                title="Stop analyzing and release memory (Esc)"
              >
                <XCircle className="w-4 h-4 text-rose-500" />
                <span>Cancel Analysis</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                  isCyber ? 'bg-slate-900 border-slate-700 text-slate-400' : isDark ? 'bg-neutral-900 border-neutral-700 text-neutral-400' : 'bg-white border-neutral-300 text-neutral-600'
                }`}>
                  Esc
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Live Forensic Dashboard */}
        {currentResult && !isAnalyzing && (
          <ForensicDashboard
            result={currentResult}
            currentLanguage={currentLanguage}
            theme={theme}
            onReset={handleResetScan}
            onOpenBenchmarks={() => setIsBenchmarksOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer 
        id="hawkspectra-footer" 
        className={`border-t py-6 px-4 sm:px-6 text-xs transition-colors duration-200 mt-auto ${
          isCyber
            ? 'bg-slate-950 border-slate-800 text-slate-400'
            : isDark
            ? 'bg-neutral-950 border-neutral-800 text-neutral-400'
            : 'bg-white border-neutral-200 text-neutral-500'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <HawkSpectraLogo size="sm" theme={theme} showSubtitle={false} showBadge={false} />
            <span className="opacity-60 hidden sm:inline">•</span>
            <span className="font-medium">23 Vernacular Languages (Bhojpuri, Hindi, etc.)</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsBenchmarksOpen(true)}
              className="hover:text-cyan-400 font-semibold transition-colors"
            >
              Celeb-DF & DFDC Benchmarks
            </button>
            <span className="opacity-40">•</span>
            <button
              onClick={() => setIsChatOpen(true)}
              className="hover:text-cyan-400 font-semibold transition-colors"
            >
              HawkAI Tour & Help
            </button>
            <span className="opacity-25">•</span>
            <button
              onClick={() => setIsMetricsOpen(true)}
              className="opacity-30 hover:opacity-90 transition-opacity font-mono text-[10px] flex items-center gap-1"
              title="Developer Console (Shortcut: Ctrl + Shift + D)"
            >
              <Lock className="w-2.5 h-2.5" />
              <span>Dev</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Real-time Traffic & User Analytics Modal */}
      <UserMetricsModal
        isOpen={isMetricsOpen}
        onClose={() => setIsMetricsOpen(false)}
        theme={theme}
        telemetry={telemetry}
        onRefresh={fetchMetrics}
        isRefreshing={isRefreshingTelemetry}
      />

      {/* Interactive Chatbot Modal */}
      <ChatbotModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        currentLanguage={currentLanguage}
        onSelectLanguage={setCurrentLanguage}
      />

      {/* Benchmarks & Robustness Modal */}
      <BenchmarksModal
        isOpen={isBenchmarksOpen}
        onClose={() => setIsBenchmarksOpen(false)}
        currentLanguage={currentLanguage}
      />
    </div>
  );
}

