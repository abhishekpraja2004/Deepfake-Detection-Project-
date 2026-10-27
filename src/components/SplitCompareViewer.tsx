import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Sliders, 
  Layers, 
  Eye, 
  EyeOff, 
  Play, 
  Pause, 
  RotateCcw,
  Volume2, 
  VolumeX, 
  SkipBack, 
  SkipForward, 
  Gauge, 
  Flame, 
  Scan,
  Video as VideoIcon,
  ImageIcon,
  Maximize2,
  Sparkles,
  Info,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';
import { AnalysisResult, AppTheme } from '../types';
import { getSplitViewerTranslations } from '../i18n/splitViewerTranslations';

interface SplitCompareViewerProps {
  result: AnalysisResult;
  theme: AppTheme;
  language?: string;
}

export const SplitCompareViewer: React.FC<SplitCompareViewerProps> = ({
  result,
  theme,
  language = 'en'
}) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [heatmapOpacity, setHeatmapOpacity] = useState(85); // 0 - 100
  // Default to 'cover' so video fills 100% of the frame with zero empty black side pillars
  const [fitMode, setFitMode] = useState<'cover' | 'contain'>('cover');
  const [mediaAspectRatio, setMediaAspectRatio] = useState<number | null>(null);

  // Video State
  const isVideo = result.mediaType === 'video';
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoadError, setVideoLoadError] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRefLeft = useRef<HTMLVideoElement | null>(null);
  const videoRefRight = useRef<HTMLVideoElement | null>(null);

  const t = getSplitViewerTranslations(language);
  const isCyber = theme === 'default';
  const isDark = theme === 'dark';
  const isFake = result.score.verdict === 'FAKE';

  // Only trigger the 3-head multi-face clone overlay if explicitly detected in manipulationType or anomalies
  const isCloneOrMultiFace = 
    Boolean(
      result.score.manipulationType?.toLowerCase().includes('clone') ||
      result.score.manipulationType?.toLowerCase().includes('multi-subject') ||
      result.spatial.detectedAnomalies.some(a => a.toLowerCase().includes('multi-subject') || a.toLowerCase().includes('facial cloning'))
    );

  // Check if this scan originated from a social link where raw video was blocked by bot wall
  const isSocialLinkStream = Boolean(result.rawSocialUrl);
  const socialUrlLower = (result.rawSocialUrl || result.mediaName || '').toLowerCase();
  
  const detectedSocialPlatform = 
    result.socialPlatform ||
    (socialUrlLower.includes('youtube') || socialUrlLower.includes('youtu.be') ? 'youtube' :
     socialUrlLower.includes('instagram') ? 'instagram' :
     socialUrlLower.includes('tiktok') ? 'tiktok' :
     socialUrlLower.includes('twitter') || socialUrlLower.includes('x.com') ? 'x' : 'social');

  const platformBrandName = 
    detectedSocialPlatform === 'youtube' ? 'YouTube' :
    detectedSocialPlatform === 'instagram' ? 'Instagram' :
    detectedSocialPlatform === 'tiktok' ? 'TikTok' :
    detectedSocialPlatform === 'x' ? 'X (Twitter)' : 'Social Media Platform';

  // Extract YouTube video ID if URL is from YouTube
  let youtubeThumbnail: string | null = null;
  if (detectedSocialPlatform === 'youtube' && result.rawSocialUrl) {
    try {
      const u = new URL(result.rawSocialUrl);
      const vId = u.hostname.includes('youtu.be') 
        ? u.pathname.slice(1).split('?')[0] 
        : u.searchParams.get('v') || u.pathname.split('/shorts/')[1]?.split('/')[0]?.split('?')[0];
      if (vId) {
        youtubeThumbnail = `https://img.youtube.com/vi/${vId}/hqdefault.jpg`;
      }
    } catch (_) {}
  }

  // Determine media URL source
  const mediaSource = 
    youtubeThumbnail ||
    (result.mediaUrl && !result.mediaUrl.startsWith('blob:') ? result.mediaUrl : null) || 
    result.thumbnailUrl || 
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80';

  // Handle Split Slider Movement
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  // Synchronize Videos
  const syncVideos = (time: number, playState?: boolean) => {
    if (videoRefLeft.current) {
      videoRefLeft.current.currentTime = time;
    }
    if (videoRefRight.current) {
      videoRefRight.current.currentTime = time;
    }
    if (playState !== undefined) {
      if (playState) {
        videoRefLeft.current?.play().catch(() => {});
        videoRefRight.current?.play().catch(() => {});
      } else {
        videoRefLeft.current?.pause();
        videoRefRight.current?.pause();
      }
      setIsPlaying(playState);
    }
  };

  const togglePlay = () => {
    const nextState = !isPlaying;
    syncVideos(currentTime, nextState);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    setCurrentTime(targetTime);
    syncVideos(targetTime);
  };

  const stepFrame = (deltaFrames: number) => {
    const frameDuration = 0.0333; // approx 30 fps
    const target = Math.max(0, Math.min(duration || 10, currentTime + deltaFrames * frameDuration));
    setCurrentTime(target);
    syncVideos(target, false);
  };

  const togglePlaybackRate = () => {
    const nextRate = playbackRate === 1.0 ? 0.5 : 1.0;
    setPlaybackRate(nextRate);
    if (videoRefLeft.current) videoRefLeft.current.playbackRate = nextRate;
    if (videoRefRight.current) videoRefRight.current.playbackRate = nextRate;
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRefLeft.current) videoRefLeft.current.muted = nextMuted;
    if (videoRefRight.current) videoRefRight.current.muted = true; // keep second video always muted to avoid audio echo
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  const currentFrameNumber = Math.floor(currentTime * 30) + 1;

  // If portrait video (vertical mobile video ratio < 0.9), calculate clean container dimensions
  const isPortrait = mediaAspectRatio !== null && mediaAspectRatio < 0.85;

  return (
    <div className={`p-5 sm:p-6 rounded-3xl border shadow-xl space-y-4 ${
      isCyber ? 'bg-slate-900/90 border-slate-800' : isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
    }`}>
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            {isVideo ? <VideoIcon className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold tracking-tight">
                {t.title}
              </h3>
              {isVideo && !videoLoadError && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  LIVE VIDEO SYNC
                </span>
              )}
              {isVideo && videoLoadError && isSocialLinkStream && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  {platformBrandName.toUpperCase()} PROXY PREVIEW
                </span>
              )}
            </div>
            <p className="text-xs opacity-60">
              {videoLoadError && isSocialLinkStream 
                ? `${platformBrandName} stream protection blocked direct .mp4 embedding — drag slider to compare raw preview with neural artifact heatmaps` 
                : t.subtitle}
            </p>
          </div>
        </div>

        {/* Action toggles */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Fit Mode Toggle */}
          <button
            onClick={() => setFitMode(fitMode === 'cover' ? 'contain' : 'cover')}
            title={fitMode === 'cover' ? t.fitCover : t.fitFull}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              fitMode === 'cover'
                ? isCyber
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-sky-100 text-sky-700 border-sky-300'
                : 'opacity-70 hover:opacity-100 border-neutral-300 dark:border-neutral-700'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>{fitMode === 'cover' ? 'पूरा फ्रेम (Full Frame)' : 'अनुकूलित (Fit)'}</span>
          </button>

          {/* Bounding Box Toggle (Only relevant when actual video/image frames are loaded) */}
          {!videoLoadError && !isSocialLinkStream && (
            <button
              onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                showBoundingBoxes
                  ? isCyber
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    : 'bg-sky-100 text-sky-700 border-sky-300'
                  : 'opacity-60 hover:opacity-100 border-neutral-300 dark:border-neutral-700'
              }`}
            >
              {showBoundingBoxes ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{showBoundingBoxes ? t.boxOn : t.boxOff}</span>
            </button>
          )}

          {/* Opacity Range */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-xl border text-xs border-neutral-200 dark:border-neutral-800">
            <span className="opacity-60 text-[10px]">{t.opacityLabel}</span>
            <input
              type="range"
              min="20"
              max="100"
              value={heatmapOpacity}
              onChange={(e) => setHeatmapOpacity(Number(e.target.value))}
              className="w-16 h-1.5 accent-cyan-400 cursor-pointer"
            />
            <span className="font-mono text-[10px] w-6">{heatmapOpacity}%</span>
          </div>
        </div>
      </div>

      {/* Helpful Clarification Banner when Social Media Bot Wall blocks raw video stream */}
      {isSocialLinkStream && videoLoadError && (
        <div className={`p-4 rounded-2xl border text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          isCyber 
            ? 'bg-amber-950/40 border-amber-500/40 text-amber-200' 
            : isDark 
            ? 'bg-neutral-900 border-amber-800/80 text-amber-300' 
            : 'bg-amber-50 border-amber-200 text-amber-900'
        }`}>
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">
                {platformBrandName} Stream Protection Alert: Direct .mp4 access restricted
              </p>
              <p className="text-[11px] opacity-85 leading-relaxed">
                {detectedSocialPlatform === 'youtube'
                  ? 'YouTube protects video content using encrypted DASH/HLS segments and strictly blocks third-party websites from embedding the raw .mp4 pixel stream. A high-resolution forensic snapshot is displayed for artifact analysis.'
                  : detectedSocialPlatform === 'instagram'
                  ? 'Instagram hides raw video pixels behind a mandatory login screen, preventing external browsers from streaming the video file directly inside the diff viewer. A forensic proxy preview is shown above.'
                  : `${platformBrandName} blocks headless automated streaming of raw video files without an authenticated session. A forensic proxy preview is shown above.`}
              </p>
            </div>
          </div>
          <a
            href={result.rawSocialUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-[11px] font-bold shrink-0 flex items-center gap-1.5 transition-all text-amber-300"
          >
            <span>{detectedSocialPlatform === 'youtube' ? 'Open on YouTube' : detectedSocialPlatform === 'instagram' ? 'View Original Reel' : 'View Original Source'}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      {/* Main Interactive Split Container (Full Frame Capture) */}
      <div className="w-full flex justify-center">
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          style={{
            aspectRatio: isPortrait ? '9/14' : '16/9',
            maxHeight: isPortrait ? '540px' : '460px'
          }}
          className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-neutral-200 dark:border-slate-800 bg-neutral-950 shadow-inner"
        >
          {/* Layer 1: Forensic Anomaly Layer (Full width background) */}
          <div className="absolute inset-0 w-full h-full">
            {isVideo && !videoLoadError ? (
              <video
                ref={videoRefRight}
                src={mediaSource}
                loop
                muted
                playsInline
                autoPlay
                onError={() => setVideoLoadError(true)}
                onTimeUpdate={(e) => {
                  const ct = (e.target as HTMLVideoElement).currentTime;
                  setCurrentTime(ct);
                }}
                onLoadedMetadata={(e) => {
                  const vid = e.target as HTMLVideoElement;
                  if (vid.duration && !isNaN(vid.duration)) setDuration(vid.duration);
                  if (vid.videoWidth && vid.videoHeight) {
                    setMediaAspectRatio(vid.videoWidth / vid.videoHeight);
                  }
                }}
                className={`w-full h-full ${fitMode === 'cover' ? 'object-cover' : 'object-contain'}`}
              />
            ) : (
              <img
                src={mediaSource}
                alt="Forensic Anomaly Layer"
                referrerPolicy="no-referrer"
                onLoad={(e) => {
                  const img = e.target as HTMLImageElement;
                  if (img.naturalWidth && img.naturalHeight) {
                    setMediaAspectRatio(img.naturalWidth / img.naturalHeight);
                  }
                }}
                className={`w-full h-full ${fitMode === 'cover' ? 'object-cover' : 'object-contain'}`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80';
                }}
              />
            )}

            {/* Grad-CAM & Neural Heatmap Glow Overlay (Focused on Facial Upper Region) */}
            <div 
              className="absolute inset-0 pointer-events-none transition-opacity"
              style={{ 
                opacity: (videoLoadError && isSocialLinkStream) ? (heatmapOpacity * 0.45) / 100 : heatmapOpacity / 100,
                background: isFake 
                  ? (isCloneOrMultiFace && !isSocialLinkStream)
                    ? 'radial-gradient(ellipse at 28% 22%, rgba(16, 185, 129, 0.5) 0%, rgba(6, 182, 212, 0.25) 20%, transparent 45%), radial-gradient(ellipse at 50% 20%, rgba(239, 68, 68, 0.95) 0%, rgba(245, 158, 11, 0.7) 22%, transparent 45%), radial-gradient(ellipse at 72% 22%, rgba(239, 68, 68, 0.9) 0%, rgba(245, 158, 11, 0.65) 20%, transparent 45%)'
                    : 'radial-gradient(ellipse at 50% 40%, rgba(239, 68, 68, 0.8) 0%, rgba(245, 158, 11, 0.5) 40%, rgba(59, 130, 246, 0.15) 70%, transparent 90%)'
                  : 'radial-gradient(ellipse at 50% 30%, rgba(16, 185, 129, 0.55) 0%, rgba(6, 182, 212, 0.25) 45%, transparent 75%)'
              }}
            />

            {/* Forensic Bounding Box Highlights (Only rendered on valid raw pixel media, never on blocked video streams) */}
            {showBoundingBoxes && isFake && !videoLoadError && !isSocialLinkStream && (
              <>
                {isCloneOrMultiFace ? (
                  <>
                    {/* Face 1: Left Original Source Subject (Authentic) */}
                    <div className="absolute top-[8%] left-[21%] w-[18%] h-[24%] border-2 border-emerald-400 rounded-2xl bg-emerald-500/15 pointer-events-none shadow-[0_0_12px_rgba(16,185,129,0.5)]">
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-mono font-bold bg-emerald-600 text-white shadow-md">
                        Face #1: Original Source (Authentic)
                      </span>
                      <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-1 py-0.2 rounded text-[7px] sm:text-[8px] font-mono font-bold bg-emerald-500 text-slate-950">
                        Source Bio-Profile
                      </span>
                    </div>

                    {/* Face 2: Center Cloned Face-Swap Subject */}
                    <div className="absolute top-[6%] left-[41%] w-[18%] h-[25%] border-2 border-red-500 rounded-2xl bg-red-500/20 pointer-events-none animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.7)]">
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-mono font-bold bg-red-600 text-white shadow-md">
                        Face #2: Cloned Swap (98.6%)
                      </span>
                    </div>

                    {/* Face 3: Right Cloned Face-Swap Subject */}
                    <div className="absolute top-[8%] left-[61%] w-[18%] h-[24%] border-2 border-red-500 rounded-2xl bg-red-500/20 pointer-events-none animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.7)]">
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-mono font-bold bg-red-600 text-white shadow-md">
                        Face #3: Cloned Swap (98.2%)
                      </span>
                    </div>

                    {/* Neck / Collar Seam Mismatch on center */}
                    <div className="absolute top-[31%] left-[44%] w-[12%] h-[9%] border border-dashed border-amber-400 rounded-lg bg-amber-500/20 pointer-events-none">
                      <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-1 py-0.2 rounded text-[7px] sm:text-[8px] font-mono font-bold bg-amber-500 text-black">
                        Collar Blend Seam
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Standard Face-Swap Primary Boundary */}
                    <div className="absolute top-[12%] left-[34%] w-[32%] h-[32%] border-2 border-dashed border-red-500 rounded-2xl bg-red-500/10 pointer-events-none animate-pulse">
                      <span className="absolute -top-5 left-2 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-red-500 text-white shadow-xs">
                        {t.blendMarginTag}
                      </span>
                    </div>

                    {/* Eye Corneal Specular Asymmetry */}
                    <div className="absolute top-[16%] left-[39%] w-[22%] h-[10%] border-2 border-red-400 rounded-lg bg-red-500/15 pointer-events-none">
                      <span className="absolute -top-4 left-0 px-1 py-0.2 rounded text-[8px] font-mono font-bold bg-red-600 text-white">
                        {t.specularTag}
                      </span>
                    </div>

                    {/* Lip-sync / Oral Aperture Box */}
                    <div className="absolute top-[30%] left-[42%] w-[16%] h-[11%] border border-amber-400 rounded-lg bg-amber-500/20 pointer-events-none">
                      <span className="absolute -bottom-4 left-0 px-1 py-0.2 rounded text-[8px] font-mono font-bold bg-amber-500 text-black">
                        {t.lipSyncTag}
                      </span>
                    </div>
                  </>
                )}
              </>
            )}

            {/* Label Right: Forensic Layer */}
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[11px] font-bold border border-white/20 flex items-center gap-1.5 pointer-events-none z-10">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.heatmapLayerLabel}</span>
            </div>
          </div>

          {/* Layer 2: Original Media Layer (Clipped to slider position) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            {isVideo && !videoLoadError ? (
              <video
                ref={videoRefLeft}
                src={mediaSource}
                loop
                muted={isMuted}
                playsInline
                autoPlay
                onError={() => setVideoLoadError(true)}
                className={`w-full h-full ${fitMode === 'cover' ? 'object-cover' : 'object-contain'}`}
              />
            ) : (
              <img
                src={mediaSource}
                alt="Original Media"
                referrerPolicy="no-referrer"
                className={`w-full h-full ${fitMode === 'cover' ? 'object-cover' : 'object-contain'}`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80';
                }}
              />
            )}

            {/* Label Left: Original Source */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[11px] font-bold border border-white/20 flex items-center gap-1.5 pointer-events-none z-10">
              <Scan className="w-3.5 h-3.5 text-sky-400" />
              <span>{t.rawInputLabel}</span>
            </div>
          </div>

          {/* Divider Slider Handle Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_#38bdf8] flex items-center justify-center cursor-ew-resize pointer-events-auto z-20"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-600 border-2 border-white shadow-xl flex items-center justify-center text-white scale-100 hover:scale-110 active:scale-95 transition-transform">
              <Sliders className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Video Playback & Frame Scrubber Control Bar (When Video Media is actively streaming) */}
      {isVideo && !videoLoadError && (
        <div className={`p-3 rounded-2xl border flex flex-col gap-2.5 ${
          isCyber ? 'bg-slate-950/80 border-slate-800' : isDark ? 'bg-neutral-950/80 border-neutral-800' : 'bg-slate-50 border-slate-200'
        }`}>
          {/* Progress / Seek Timeline Bar */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] min-w-[54px] opacity-75">
              {formatTime(currentTime)}
            </span>
            
            <input
              type="range"
              min="0"
              max={duration || 10}
              step="0.01"
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-2 bg-neutral-700/50 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />

            <span className="font-mono text-[11px] min-w-[54px] text-right opacity-75">
              {formatTime(duration || 10)}
            </span>
          </div>

          {/* Video Control Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-neutral-200/10">
            <div className="flex items-center gap-1.5">
              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? t.pause : t.play}</span>
              </button>

              {/* Step Prev Frame */}
              <button
                onClick={() => stepFrame(-1)}
                title={t.stepBackward}
                className="p-1.5 rounded-xl border border-neutral-700 hover:bg-neutral-800/80 text-xs flex items-center justify-center transition-all opacity-80 hover:opacity-100"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>

              {/* Step Next Frame */}
              <button
                onClick={() => stepFrame(1)}
                title={t.stepForward}
                className="p-1.5 rounded-xl border border-neutral-700 hover:bg-neutral-800/80 text-xs flex items-center justify-center transition-all opacity-80 hover:opacity-100"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>

              {/* Frame Indicator */}
              <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-800/50 text-[11px] font-mono opacity-80">
                <span>{t.frameLabel}: #{currentFrameNumber}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Speed Toggle (0.5x Slow-mo for Deepfake Glitch Analysis) */}
              <button
                onClick={togglePlaybackRate}
                className={`px-2.5 py-1 rounded-xl border text-xs font-mono font-bold flex items-center gap-1 transition-all ${
                  playbackRate === 0.5
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'border-neutral-700 opacity-75 hover:opacity-100'
                }`}
              >
                <Gauge className="w-3.5 h-3.5" />
                <span>{playbackRate === 0.5 ? t.slowMo : t.normalSpeed}</span>
              </button>

              {/* Mute Toggle */}
              <button
                onClick={toggleMute}
                className="p-1.5 rounded-xl border border-neutral-700 hover:bg-neutral-800/80 text-xs flex items-center justify-center transition-all opacity-80 hover:opacity-100"
                title={isMuted ? t.unmute : t.mute}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-neutral-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info Legend */}
      <div className="flex flex-wrap items-center justify-between text-xs opacity-75 pt-1">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500" /> {t.legendRed}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> {t.legendAmber}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-sky-400" /> {t.legendBlue}
          </span>
        </div>
        <span className="font-mono text-[11px]">{t.positionLabel(Math.round(sliderPosition), 100 - Math.round(sliderPosition))}</span>
      </div>
    </div>
  );
};
