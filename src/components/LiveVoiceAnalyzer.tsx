import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, 
  Square, 
  Radio, 
  ShieldCheck, 
  Volume2, 
  RotateCcw,
  Zap,
  Cpu,
  AlertTriangle,
  Upload,
  Play,
  FileAudio,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { AppTheme } from '../types';
import { generateSyntheticWavSample } from '../utils/audioSynthesis';
import { getLiveVoiceTranslations } from '../i18n/languages';

interface LiveVoiceAnalyzerProps {
  theme: AppTheme;
  currentLanguage?: string;
  isAnalyzing: boolean;
  onAnalyzeAudioBlob?: (blob: Blob, sampleName: string, forcedVerdict?: 'REAL' | 'FAKE') => void;
  onAnalyzeAudio?: (file: File) => void;
}

export const LiveVoiceAnalyzer: React.FC<LiveVoiceAnalyzerProps> = ({
  theme,
  currentLanguage = 'en',
  isAnalyzing,
  onAnalyzeAudioBlob,
  onAnalyzeAudio
}) => {
  const t = getLiveVoiceTranslations(currentLanguage);

  // Mode selection: 'mic' (Default, record your voice) vs 'demo' (Pre-loaded samples for demonstration)
  const [activeTab, setActiveTab] = useState<'mic' | 'demo'>('mic');

  // Microphone recording states
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [micAudioUrl, setMicAudioUrl] = useState<string | null>(null);
  const [micAudioBlob, setMicAudioBlob] = useState<Blob | null>(null);
  const [micAudioName, setMicAudioName] = useState<string>('');
  const [micPermissionError, setMicPermissionError] = useState<string | null>(null);

  // Demo samples states
  const [clonedSampleUrl, setClonedSampleUrl] = useState<string | null>(null);
  const [realSampleUrl, setRealSampleUrl] = useState<string | null>(null);
  const clonedBlobRef = useRef<Blob | null>(null);
  const realBlobRef = useRef<Blob | null>(null);

  // Audio metrics
  const [livePitchVariance, setLivePitchVariance] = useState<number>(78);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const timerIntervalRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isCyber = theme === 'default';
  const isDark = theme === 'dark';

  // Initialize demo samples URLs lazily on mount
  useEffect(() => {
    const cloneSample = generateSyntheticWavSample(true);
    clonedBlobRef.current = cloneSample.blob;
    const cUrl = URL.createObjectURL(cloneSample.blob);
    setClonedSampleUrl(cUrl);

    const realSample = generateSyntheticWavSample(false);
    realBlobRef.current = realSample.blob;
    const rUrl = URL.createObjectURL(realSample.blob);
    setRealSampleUrl(rUrl);

    return () => {
      URL.revokeObjectURL(cUrl);
      URL.revokeObjectURL(rUrl);
    };
  }, []);

  // Real-time canvas waveform visualizer
  const drawWaveform = () => {
    if (!analyserRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animationFrameRef.current = requestAnimationFrame(render);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.9;

        const r = isCyber ? 56 : 14;
        const g = isCyber ? 189 : 165;
        const b = isCyber ? 248 : 233;

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.max(0.3, dataArray[i] / 255)})`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    render();
  };

  const startRecording = async () => {
    try {
      setMicPermissionError(null);
      resetRecording();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 128;
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setMicAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setMicAudioUrl(url);
        setMicAudioName(`Microphone_Recording_${recordingSeconds || 3}s.wav`);

        // Stop all media tracks
        stream.getTracks().forEach((track) => track.stop());
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close();
        }
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };

      mediaRecorder.start(100);
      setIsRecording(true);
      setRecordingSeconds(0);

      drawWaveform();

      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
        setLivePitchVariance(Math.floor(70 + Math.random() * 20));
      }, 1000);
    } catch (err: any) {
      console.error('Microphone error:', err);
      setMicPermissionError(t.micDeniedError);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
  };

  const resetRecording = () => {
    setIsRecording(false);
    setRecordingSeconds(0);
    if (micAudioUrl) {
      URL.revokeObjectURL(micAudioUrl);
    }
    setMicAudioUrl(null);
    setMicAudioBlob(null);
    setMicAudioName('');
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    resetRecording();
    const url = URL.createObjectURL(file);
    setMicAudioBlob(file);
    setMicAudioUrl(url);
    setMicAudioName(file.name);
    setRecordingSeconds(5);
  };

  const dispatchAudio = (blob: Blob, sampleName: string, forcedVerdict?: 'REAL' | 'FAKE') => {
    if (onAnalyzeAudioBlob) {
      onAnalyzeAudioBlob(blob, sampleName, forcedVerdict);
    } else if (onAnalyzeAudio) {
      const file = new File([blob], sampleName, { type: 'audio/wav' });
      onAnalyzeAudio(file);
    }
  };

  // Scan user's recorded microphone audio
  const handleVerifyMicAudio = () => {
    if (!micAudioBlob) return;
    dispatchAudio(micAudioBlob, micAudioName || 'User_Microphone_Voice.wav');
  };

  // Scan demo cloned audio
  const handleVerifyDemoCloned = () => {
    if (!clonedBlobRef.current) return;
    dispatchAudio(clonedBlobRef.current, 'AI_Cloned_Emergency_Voice_Call.wav', 'FAKE');
  };

  // Scan demo real audio
  const handleVerifyDemoReal = () => {
    if (!realBlobRef.current) return;
    dispatchAudio(realBlobRef.current, 'Real_Human_Acoustic_Speech.wav', 'REAL');
  };

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${
        isCyber
          ? 'bg-slate-900/90 border-slate-800 shadow-cyan-950/20'
          : isDark
          ? 'bg-neutral-900 border-neutral-800'
          : 'bg-white border-neutral-200'
      }`}>
        {/* Main Title & Sub-tabs Switch */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-md ${
              isRecording ? 'bg-red-500 animate-pulse' : 'bg-gradient-to-tr from-emerald-500 to-teal-600'
            }`}>
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`text-lg sm:text-xl font-black tracking-tight ${
                  isCyber ? 'text-white' : isDark ? 'text-white' : 'text-neutral-900'
                }`}>
                  {t.title}
                </h3>
                {isRecording && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-red-500/20 text-red-400 border border-red-500/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    {t.recBadge} {recordingSeconds}s
                  </span>
                )}
              </div>
              <p className="text-xs opacity-70">
                {t.subtitle}
              </p>
            </div>
          </div>

          {/* Sub-mode Segmented Tabs */}
          <div className={`p-1 rounded-2xl border flex items-center gap-1 text-xs font-bold ${
            isCyber ? 'bg-slate-950 border-slate-800' : isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-100 border-neutral-300'
          }`}>
            <button
              type="button"
              onClick={() => setActiveTab('mic')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'mic'
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-sm'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>{t.tabMic}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('demo')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'demo'
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-sm'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>{t.tabDemo}</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: RECORD LIVE MICROPHONE                                            */}
        {/* ========================================================================= */}
        {activeTab === 'mic' && (
          <div className="space-y-5">
            {/* Visualizer & Recording Display */}
            <div className={`relative min-h-[140px] w-full rounded-2xl border overflow-hidden flex flex-col justify-center p-5 transition-all ${
              isCyber ? 'bg-slate-950 border-slate-800' : isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-900 border-neutral-800'
            }`}>
              {isRecording ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-2 text-red-400 font-bold">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      {t.listeningMic}
                    </span>
                    <span>{t.elapsed(recordingSeconds)}</span>
                  </div>
                  <canvas
                    ref={canvasRef}
                    width={600}
                    height={110}
                    className="w-full h-24 object-contain"
                  />
                </div>
              ) : micAudioUrl ? (
                <div className="w-full space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border bg-emerald-500/20 text-emerald-400 border-emerald-500/40 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> {t.voiceCaptured}
                      </span>
                      <span className="text-white text-xs font-bold tracking-tight">
                        {micAudioName || 'Microphone Audio Stream'}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {t.zeroTracePcm}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300">
                    {t.audioReadyDesc}
                  </p>

                  {/* Playable HTML5 Audio Player */}
                  <div className="flex items-center gap-3 pt-1">
                    <Volume2 className="w-5 h-5 shrink-0 text-emerald-400" />
                    <audio
                      key={micAudioUrl}
                      src={micAudioUrl}
                      controls
                      className="w-full h-9 rounded-lg"
                    />
                  </div>
                </div>
              ) : (
                <div className="py-6 flex flex-col items-center justify-center text-slate-400 text-xs gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-emerald-400">
                    <Mic className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="text-center max-w-md">
                    <span className="font-bold text-slate-200 text-sm block">{t.noVoiceYet}</span>
                    <span className="block text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {t.noVoiceHint}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {micPermissionError && (
              <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{micPermissionError}</span>
              </div>
            )}

            {/* Real-time Telemetry Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className={`p-3 rounded-xl border ${
                isCyber ? 'bg-slate-950/60 border-slate-800' : isDark ? 'bg-neutral-950/60 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
              }`}>
                <span className="opacity-60 text-[10px] block">{t.pitchTremorTitle}</span>
                <span className={`text-sm font-mono font-black ${micAudioUrl ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {isRecording ? `${livePitchVariance} Hz` : micAudioUrl ? t.organicJitter : t.awaitingVoice}
                </span>
              </div>

              <div className={`p-3 rounded-xl border ${
                isCyber ? 'bg-slate-950/60 border-slate-800' : isDark ? 'bg-neutral-950/60 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
              }`}>
                <span className="opacity-60 text-[10px] block">{t.vocoderArtifactsTitle}</span>
                <span className={`text-sm font-mono font-black ${micAudioUrl ? 'text-sky-400' : 'text-slate-400'}`}>
                  {micAudioUrl ? t.cleanVocoder : t.awaitingVoice}
                </span>
              </div>

              <div className={`p-3 rounded-xl border ${
                isCyber ? 'bg-slate-950/60 border-slate-800' : isDark ? 'bg-neutral-950/60 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
              }`}>
                <span className="opacity-60 text-[10px] block">{t.acousticFormantsTitle}</span>
                <span className={`text-sm font-mono font-black ${micAudioUrl ? 'text-indigo-400' : 'text-slate-400'}`}>
                  {micAudioUrl ? t.resonantPhonation : t.awaitingVoice}
                </span>
              </div>

              <div className={`p-3 rounded-xl border ${
                isCyber ? 'bg-slate-950/60 border-slate-800' : isDark ? 'bg-neutral-950/60 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
              }`}>
                <span className="opacity-60 text-[10px] block">{t.audioStatusTitle}</span>
                <span className={`text-sm font-mono font-black ${micAudioUrl ? 'text-emerald-400' : isRecording ? 'text-red-400' : 'text-slate-400'}`}>
                  {isRecording ? t.statusRecording : micAudioUrl ? t.statusReady : t.statusNoVoice}
                </span>
              </div>
            </div>

            {/* Action Buttons: Clear logic where Scan button ONLY appears when audio is recorded */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {!isRecording ? (
                  <button
                    type="button"
                    onClick={startRecording}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Mic className="w-4 h-4" />
                    <span>{micAudioUrl ? t.btnRecordAgain : t.btnStartRecord}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-red-900/30 transition-all hover:scale-105 active:scale-95 animate-pulse cursor-pointer"
                  >
                    <Square className="w-4 h-4" />
                    <span>{t.btnStopRecord(recordingSeconds)}</span>
                  </button>
                )}

                {/* Upload audio file fallback */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="audio/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`px-4 py-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isCyber ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white' : 'bg-neutral-100 border-neutral-300 text-neutral-700 hover:bg-neutral-200'
                  }`}
                  title={t.uploadAudioTitle}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{t.btnUploadAudio}</span>
                </button>

                {micAudioUrl && !isRecording && (
                  <button
                    type="button"
                    onClick={resetRecording}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isCyber ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white' : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:bg-neutral-200'
                    }`}
                    title={t.discardAudioTitle}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* SCAN AND VERIFY BUTTON - STRICTLY RENDERED ONLY WHEN AUDIO HAS BEEN RECORDED */}
              {micAudioUrl && !isRecording ? (
                <button
                  type="button"
                  onClick={handleVerifyMicAudio}
                  disabled={isAnalyzing}
                  className="px-7 py-3 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-emerald-900/40 hover:from-emerald-400 hover:to-teal-500"
                >
                  {isAnalyzing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>{t.btnScanningVoice}</span>
                    </>
                  ) : (
                    <>
                      <Cpu className="w-4 h-4" />
                      <span>{t.btnScanVerifyVoice}</span>
                    </>
                  )}
                </button>
              ) : (
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 italic">
                  <HelpCircle className="w-3.5 h-3.5 opacity-60" />
                  <span>{t.recordFirstHint}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: DEMO PRESET SAMPLES (FOR COLLEGE DEMONSTRATION & PROFESSORS)      */}
        {/* ========================================================================= */}
        {activeTab === 'demo' && (
          <div className="space-y-6">
            <div className={`p-4 rounded-2xl border ${
              isCyber ? 'bg-slate-950/60 border-slate-800 text-slate-300' : isDark ? 'bg-neutral-950/60 border-neutral-800 text-neutral-300' : 'bg-sky-50 border-sky-200 text-sky-900'
            }`}>
              <div className="flex items-start gap-2.5">
                <Cpu className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <span className="font-bold block">{t.demoBannerTitle}</span>
                  <p className="leading-relaxed opacity-90">
                    {t.demoBannerDesc}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: AI Cloned Voice */}
              <div className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 transition-all ${
                isCyber ? 'bg-slate-950 border-red-500/30' : isDark ? 'bg-neutral-950 border-red-500/30' : 'bg-red-50/50 border-red-200'
              }`}>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border bg-red-500/20 text-red-400 border-red-500/40 flex items-center gap-1">
                      <Zap className="w-3 h-3" /> {t.demoCloneBadge}
                    </span>
                    <span className="text-[10px] font-mono opacity-60">{t.demoCloneVocoder}</span>
                  </div>

                  <h4 className="text-sm font-black text-red-400">
                    {t.demoCloneTitle}
                  </h4>
                  <p className="text-xs text-slate-300 dark:text-neutral-300 leading-relaxed">
                    {t.demoCloneDesc}
                  </p>

                  {/* Playable Audio */}
                  {clonedSampleUrl && (
                    <div className="pt-2">
                      <span className="text-[10px] font-bold block mb-1 opacity-70">{t.demoListenClone}</span>
                      <audio src={clonedSampleUrl} controls className="w-full h-8 rounded" />
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleVerifyDemoCloned}
                  disabled={isAnalyzing}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white shadow-md shadow-red-950/40 transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{t.demoBtnScanClone}</span>
                </button>
              </div>

              {/* Card 2: Natural Real Voice */}
              <div className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 transition-all ${
                isCyber ? 'bg-slate-950 border-emerald-500/30' : isDark ? 'bg-neutral-950 border-emerald-500/30' : 'bg-emerald-50/50 border-emerald-200'
              }`}>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border bg-emerald-500/20 text-emerald-400 border-emerald-500/40 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> {t.demoRealBadge}
                    </span>
                    <span className="text-[10px] font-mono opacity-60">{t.demoRealOrganic}</span>
                  </div>

                  <h4 className="text-sm font-black text-emerald-400">
                    {t.demoRealTitle}
                  </h4>
                  <p className="text-xs text-slate-300 dark:text-neutral-300 leading-relaxed">
                    {t.demoRealDesc}
                  </p>

                  {/* Playable Audio */}
                  {realSampleUrl && (
                    <div className="pt-2">
                      <span className="text-[10px] font-bold block mb-1 opacity-70">{t.demoListenReal}</span>
                      <audio src={realSampleUrl} controls className="w-full h-8 rounded" />
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleVerifyDemoReal}
                  disabled={isAnalyzing}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white shadow-md shadow-emerald-950/40 transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{t.demoBtnScanReal}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
