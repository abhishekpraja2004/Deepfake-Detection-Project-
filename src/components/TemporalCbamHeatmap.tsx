import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Flame, 
  Layers, 
  Eye, 
  Sliders, 
  ZoomIn, 
  AlertTriangle, 
  CheckCircle2, 
  Target, 
  Activity, 
  Sparkles, 
  Clock, 
  ShieldAlert,
  ChevronRight,
  Info,
  Maximize2,
  Minimize2,
  RefreshCw,
  Zap,
  Gauge
} from 'lucide-react';
import { AnalysisResult, AppTheme, CbamTemporalFrame, CbamFlaggedRegion } from '../types';
import { JargonTooltip } from './JargonTooltip';
import { getTranslation } from '../i18n/languages';

interface TemporalCbamHeatmapProps {
  result: AnalysisResult;
  theme?: AppTheme;
  currentLanguage?: string;
  onSelectFrame?: (frameNumber: number) => void;
}

export const TemporalCbamHeatmap: React.FC<TemporalCbamHeatmapProps> = ({
  result,
  theme = 'default',
  currentLanguage = 'en',
  onSelectFrame
}) => {
  const isCyber = theme === 'default';
  const isDark = theme === 'dark';
  const isLight = theme === 'light';

  const t = getTranslation(currentLanguage);
  const isFake = result.score.verdict === 'FAKE';
  const frames: CbamTemporalFrame[] = result.cbamAttention.temporalHeatmapFrames || [];
  
  // Default to peak anomaly frame if available, else first frame
  const initialFrame = result.cbamAttention.peakAnomalyFrame && result.cbamAttention.peakAnomalyFrame <= frames.length
    ? result.cbamAttention.peakAnomalyFrame
    : 1;

  const [currentFrameNumber, setCurrentFrameNumber] = useState<number>(initialFrame);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0); // 0.5x, 1x, 2x
  const [heatmapOpacity, setHeatmapOpacity] = useState<number>(80);
  const [colormap, setColormap] = useState<'jet' | 'plasma' | 'cbam-cyber' | 'threshold'>('cbam-cyber');
  const [attentionLayer, setAttentionLayer] = useState<'joint' | 'spatial' | 'channel'>('joint');
  const [showBoundingBoxes, setShowBoundingBoxes] = useState<boolean>(true);
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [zoomInspectMode, setZoomInspectMode] = useState<boolean>(false);

  const playTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Active frame data
  const currentFrame = useMemo(() => {
    if (!frames.length) return null;
    return frames.find((f) => f.frameNumber === currentFrameNumber) || frames[0];
  }, [frames, currentFrameNumber]);

  // List of peak anomaly frames for quick jump
  const peakFrames = useMemo(() => {
    return frames.filter((f) => f.isKeyPeakFrame || f.anomalySeverity === 'CRITICAL');
  }, [frames]);

  // Play / Pause timer effect
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.round(150 / playbackSpeed); // ~6.6 fps scaled
      playTimerRef.current = setInterval(() => {
        setCurrentFrameNumber((prev) => {
          if (prev >= frames.length) {
            return 1; // loop
          }
          return prev + 1;
        });
      }, intervalMs);
    } else {
      if (playTimerRef.current) {
        clearInterval(playTimerRef.current);
        playTimerRef.current = null;
      }
    }

    return () => {
      if (playTimerRef.current) {
        clearInterval(playTimerRef.current);
      }
    };
  }, [isPlaying, playbackSpeed, frames.length]);

  const handleFrameChange = (frameNum: number) => {
    const clamped = Math.max(1, Math.min(frames.length, frameNum));
    setCurrentFrameNumber(clamped);
    setSelectedRegionId(null);
    if (onSelectFrame) {
      onSelectFrame(clamped);
    }
  };

  const handlePrevFrame = () => {
    handleFrameChange(currentFrameNumber - 1);
  };

  const handleNextFrame = () => {
    handleFrameChange(currentFrameNumber + 1);
  };

  const handleJumpToPeak = (frameNum: number) => {
    setIsPlaying(false);
    handleFrameChange(frameNum);
  };

  // Keyboard navigation for precision scrubbing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevFrame();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextFrame();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentFrameNumber, frames.length]);

  if (!frames.length) {
    return (
      <div className={`p-6 rounded-2xl border text-center ${
        isCyber ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-neutral-50 border-neutral-200 text-neutral-500'
      }`}>
        <Info className="w-6 h-6 mx-auto mb-2 opacity-50" />
        <p className="text-xs">Temporal frame sequence is only available for multi-frame video media streams.</p>
      </div>
    );
  }

  // Dynamic Heatmap Gradient Generator depending on colormap & active frame hotspots
  const getHeatmapBackground = () => {
    if (!currentFrame) return 'none';
    const prob = currentFrame.syntheticProbability;
    const isHigh = prob > 70;
    const isMedium = prob > 40 && prob <= 70;

    if (!isHigh && !isMedium) {
      // Natural organic diffuse attention
      return 'radial-gradient(circle at 50% 45%, rgba(6, 182, 212, 0.25) 0%, rgba(16, 185, 129, 0.15) 45%, transparent 75%)';
    }

    // High anomaly frame with targeted hotspots
    const hotspots = currentFrame.flaggedRegions;
    if (colormap === 'cbam-cyber') {
      if (hotspots.length > 0) {
        const topH = hotspots[0];
        const cx = `${topH.left + topH.width / 2}%`;
        const cy = `${topH.top + topH.height / 2}%`;
        return `radial-gradient(circle at ${cx} ${cy}, rgba(239, 68, 68, 0.95) 0%, rgba(249, 115, 22, 0.75) 25%, rgba(234, 179, 8, 0.45) 50%, rgba(6, 182, 212, 0.15) 75%, transparent 100%)`;
      }
      return 'radial-gradient(circle at 50% 65%, rgba(239, 68, 68, 0.9) 0%, rgba(249, 115, 22, 0.65) 30%, rgba(6, 182, 212, 0.2) 65%, transparent 95%)';
    } else if (colormap === 'jet') {
      return 'radial-gradient(circle at 50% 60%, rgba(255, 0, 0, 0.9) 0%, rgba(255, 255, 0, 0.7) 35%, rgba(0, 255, 255, 0.4) 65%, rgba(0, 0, 255, 0.2) 85%, transparent 100%)';
    } else if (colormap === 'plasma') {
      return 'radial-gradient(circle at 50% 60%, rgba(240, 249, 33, 0.9) 0%, rgba(204, 71, 120, 0.8) 35%, rgba(126, 3, 168, 0.5) 70%, rgba(13, 8, 135, 0.2) 90%, transparent 100%)';
    } else {
      // Threshold High-Pass Mask
      return 'radial-gradient(circle at 50% 62%, rgba(255, 0, 80, 0.95) 0%, rgba(255, 0, 0, 0.8) 40%, transparent 80%)';
    }
  };

  const getSeverityBadgeClass = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-500/20 text-red-400 border-red-500/50 shadow-xs shadow-red-900/30';
      case 'HIGH':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'MEDIUM':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      default:
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
    }
  };

  return (
    <div className={`rounded-3xl border p-5 sm:p-7 space-y-6 shadow-xl transition-all ${
      isCyber 
        ? 'bg-slate-900/90 border-slate-800 text-slate-200' 
        : isDark 
        ? 'bg-neutral-900 border-neutral-800 text-neutral-200' 
        : 'bg-white border-neutral-200 text-neutral-900 shadow-sm'
    }`}>
      {/* Header with Title, Jargon & Peak Anomaly Jump */}
      <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b pb-5 ${
        isCyber ? 'border-slate-800' : isDark ? 'border-neutral-800' : 'border-neutral-100'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2.5 py-0.5 rounded-md flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-cyan-400" />
              Temporal CNN+CBAM Anomaly Inspector
            </span>
            <JargonTooltip termKey="CBAM" />
          </div>
          <h3 className={`text-xl font-black mt-1 ${isCyber ? 'text-white' : isDark ? 'text-white' : 'text-neutral-900'}`}>
            Video Frame Heatmap & Attention Anomaly Overlay
          </h3>
          <p className={`text-xs ${isCyber ? 'text-slate-400' : isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Scrub across video frames to inspect spatial boundary shears and channel attention spikes detected by Hybrid CNN+CBAM.
          </p>
        </div>

        {/* Peak Anomaly Quick-Jump Badges */}
        {peakFrames.length > 0 && isFake && (
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-[11px] font-bold opacity-70 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Peak Anomalies:
            </span>
            {peakFrames.map((pk) => (
              <button
                key={pk.frameNumber}
                onClick={() => handleJumpToPeak(pk.frameNumber)}
                className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1.5 transition-all ${
                  currentFrameNumber === pk.frameNumber
                    ? 'bg-red-500 text-white border-red-400 shadow-md shadow-red-950/40 ring-2 ring-red-400/40 scale-105'
                    : isCyber
                    ? 'bg-slate-950 text-red-400 border-red-900/60 hover:border-red-500 hover:bg-red-950/40'
                    : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                }`}
                title={`Jump to Frame #${pk.frameNumber} (${pk.timestampSec}s) - ${pk.syntheticProbability}% Synthetic Anomaly`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                <span>F#{pk.frameNumber} [{pk.syntheticProbability}%]</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Visualizer Area: Canvas Screen + Side Telemetry Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Video Frame with Dynamic CBAM Heatmap & Bounding Box Overlays (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-3">
          {/* Visualizer Canvas Container */}
          <div className={`relative w-full aspect-16/10 rounded-2xl overflow-hidden border shadow-2xl flex items-center justify-center select-none group ${
            isCyber ? 'bg-slate-950 border-slate-800' : isDark ? 'bg-black border-neutral-800' : 'bg-neutral-900 border-neutral-300'
          }`}>
            {/* Background Media Frame */}
            <img
              src={result.mediaUrl}
              alt="Video Frame Under Forensic Inspection"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-transform duration-300 ${
                zoomInspectMode ? 'scale-135 cursor-crosshair' : 'scale-100'
              }`}
            />

            {/* Simulated Frame Scanlines / Grid lines overlay */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Real-time Dynamic CBAM Heatmap Layer */}
            <div
              className={`absolute inset-0 transition-all duration-150 pointer-events-none ${
                colormap === 'threshold' ? 'mix-blend-color-burn' : 'mix-blend-screen'
              }`}
              style={{
                opacity: heatmapOpacity / 100,
                background: getHeatmapBackground()
              }}
            />

            {/* Interactive Flagged Bounding Boxes for Active Frame */}
            {showBoundingBoxes && currentFrame && currentFrame.flaggedRegions.map((region) => {
              const isSelected = selectedRegionId === region.id;
              return (
                <div
                  key={region.id}
                  onClick={() => setSelectedRegionId(isSelected ? null : region.id)}
                  className={`absolute rounded-md cursor-pointer transition-all duration-200 border-2 ${
                    isSelected 
                      ? 'border-cyan-400 bg-cyan-400/20 ring-4 ring-cyan-400/30 z-20 scale-102' 
                      : 'border-red-500 bg-red-500/15 hover:bg-red-500/25 animate-pulse z-10'
                  }`}
                  style={{
                    top: `${region.top}%`,
                    left: `${region.left}%`,
                    width: `${region.width}%`,
                    height: `${region.height}%`
                  }}
                >
                  {/* Floating Anomaly Label Pill */}
                  <div className="absolute -top-6 left-0 bg-neutral-900/90 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-md border border-red-500/60 shadow-lg flex items-center gap-1 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span>{region.label}</span>
                    <span className="text-red-400 font-black">{region.anomalyProbability}%</span>
                  </div>

                  {/* Corner Target Reticles */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white" />
                </div>
              );
            })}

            {/* Top Canvas Badges (Frame No, Timestamp, Current Severity) */}
            <div className="absolute top-3 left-3 flex items-center gap-2 z-20">
              <span className="bg-neutral-900/90 backdrop-blur-xs text-white font-mono text-[11px] font-bold px-3 py-1 rounded-lg border border-neutral-700 shadow-md">
                Frame #{currentFrameNumber.toString().padStart(2, '0')} / {frames.length}
              </span>
              <span className="bg-neutral-900/90 backdrop-blur-xs text-cyan-300 font-mono text-[11px] font-bold px-3 py-1 rounded-lg border border-cyan-700/60 shadow-md flex items-center gap-1">
                <Clock className="w-3 h-3 text-cyan-400" />
                {currentFrame ? `${currentFrame.timestampSec.toFixed(1)}s` : '0.0s'}
              </span>
            </div>

            {/* Top Right Live Synthetic Gauge Indicator */}
            <div className="absolute top-3 right-3 z-20">
              {currentFrame && (
                <span className={`text-[11px] font-bold font-mono px-3 py-1 rounded-lg border backdrop-blur-xs flex items-center gap-1.5 shadow-md ${getSeverityBadgeClass(currentFrame.anomalySeverity)}`}>
                  {currentFrame.anomalySeverity === 'CRITICAL' || currentFrame.anomalySeverity === 'HIGH' ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400 animate-bounce" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                  <span>{currentFrame.syntheticProbability}% Synthetic Anomaly</span>
                </span>
              )}
            </div>

            {/* Bottom Canvas Controls Bar */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2 rounded-xl bg-neutral-950/85 backdrop-blur-md border border-neutral-800 text-white z-20 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-neutral-400 font-mono hidden sm:inline">
                  Layer: {attentionLayer === 'joint' ? 'CBAM Joint Map' : attentionLayer === 'spatial' ? '7x7 Spatial' : '1x1 Channel'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 border transition-all ${
                    showBoundingBoxes 
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' 
                      : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                  }`}
                  title="Toggle Anomaly Bounding Boxes"
                >
                  <Target className="w-3 h-3" />
                  <span>Boxes {showBoundingBoxes ? 'ON' : 'OFF'}</span>
                </button>

                <button
                  onClick={() => setZoomInspectMode(!zoomInspectMode)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 border transition-all ${
                    zoomInspectMode 
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' 
                      : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                  }`}
                  title="Zoom Pixel Inspection"
                >
                  {zoomInspectMode ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
                  <span>{zoomInspectMode ? 'Reset Zoom' : 'Loupe'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Scrubber Playback Controls & Speed Bar */}
          <div className={`p-3.5 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
            isCyber ? 'bg-slate-950/80 border-slate-800' : isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
          }`}>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevFrame}
                className={`p-2 rounded-xl border text-xs transition-colors ${
                  isCyber ? 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-200' : 'bg-white border-neutral-300 hover:bg-neutral-100 text-neutral-700'
                }`}
                title="Previous Frame (Left Arrow)"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
                  isPlaying
                    ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                    : isCyber
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                }`}
                title="Play / Pause Frame Scrubbing (Spacebar)"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? 'Pause' : 'Play Video Scrub'}</span>
              </button>

              <button
                onClick={handleNextFrame}
                className={`p-2 rounded-xl border text-xs transition-colors ${
                  isCyber ? 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-200' : 'bg-white border-neutral-300 hover:bg-neutral-100 text-neutral-700'
                }`}
                title="Next Frame (Right Arrow)"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <div className="hidden sm:flex items-center gap-1 ml-2 text-[10px] font-bold">
                {[0.5, 1.0, 2.0].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-2 py-1 rounded-md border transition-all ${
                      playbackSpeed === spd
                        ? isCyber ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-neutral-900 text-white border-neutral-900'
                        : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

            {/* Opacity & Colormap Selectors */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs">
                <Sliders className="w-3.5 h-3.5 opacity-70" />
                <span className="text-[11px] font-mono opacity-80">{heatmapOpacity}%</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={heatmapOpacity}
                  onChange={(e) => setHeatmapOpacity(Number(e.target.value))}
                  className="w-20 accent-cyan-500 cursor-pointer h-1.5 bg-neutral-700 rounded-lg"
                />
              </div>

              <select
                value={colormap}
                onChange={(e) => setColormap(e.target.value as any)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                  isCyber ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-neutral-300 text-neutral-800'
                }`}
              >
                <option value="cbam-cyber">CBAM Cyber Glow</option>
                <option value="jet">Jet Colormap</option>
                <option value="plasma">Plasma/Magma</option>
                <option value="threshold">Threshold Mask</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right: Real-time Frame Anomaly Telemetry Inspector (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {currentFrame && (
            <div className={`p-5 rounded-2xl border space-y-4 shadow-md ${
              isCyber ? 'bg-slate-950/90 border-slate-800' : isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
            }`}>
              {/* Frame Severity Card */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200/15">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                    Frame Telemetry
                  </span>
                  <h4 className={`text-base font-black ${isCyber ? 'text-white' : isDark ? 'text-white' : 'text-neutral-900'}`}>
                    Frame #{currentFrame.frameNumber} @ {currentFrame.timestampSec.toFixed(1)}s
                  </h4>
                </div>

                <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${getSeverityBadgeClass(currentFrame.anomalySeverity)}`}>
                  {currentFrame.anomalySeverity}
                </span>
              </div>

              {/* Manipulation Probability Gauge */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-bold flex items-center gap-1 opacity-80">
                    <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                    Synthetic Probability
                  </span>
                  <span className={`font-mono font-black text-sm ${
                    currentFrame.syntheticProbability > 70 ? 'text-red-400' : 'text-emerald-400'
                  }`}>
                    {currentFrame.syntheticProbability}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
                  <div
                    className={`h-full rounded-full transition-all duration-200 ${
                      currentFrame.syntheticProbability > 85 
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 shadow-sm shadow-red-500/50' 
                        : currentFrame.syntheticProbability > 50 
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
                        : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    }`}
                    style={{ width: `${currentFrame.syntheticProbability}%` }}
                  />
                </div>
              </div>

              {/* Attention Focus & Dominance */}
              <div className="space-y-2 text-xs">
                <div className={`p-3 rounded-xl border ${
                  isCyber ? 'bg-slate-900 border-slate-800' : isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
                }`}>
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-0.5">
                    Channel Attention Dominance
                  </span>
                  <span className="font-bold text-sky-400">
                    {currentFrame.channelDominance}
                  </span>
                </div>

                {/* Spatial vs Channel Attention Split */}
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className={`p-2.5 rounded-xl border text-center ${
                    isCyber ? 'bg-slate-900 border-slate-800' : 'bg-white border-neutral-200'
                  }`}>
                    <span className="text-[10px] opacity-70 block">Spatial Attention</span>
                    <span className="font-mono font-bold text-xs text-indigo-400">
                      {currentFrame.spatialAttentionScore}%
                    </span>
                  </div>
                  <div className={`p-2.5 rounded-xl border text-center ${
                    isCyber ? 'bg-slate-900 border-slate-800' : 'bg-white border-neutral-200'
                  }`}>
                    <span className="text-[10px] opacity-70 block">Channel Attention</span>
                    <span className="font-mono font-bold text-xs text-teal-400">
                      {currentFrame.channelAttentionScore}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Plain-English Evidence Explanation */}
              <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                isCyber 
                  ? 'bg-slate-900/80 border-slate-800 text-slate-300' 
                  : 'bg-white border-neutral-200 text-neutral-700'
              }`}>
                <span className="font-bold text-[11px] block mb-1 flex items-center gap-1.5 text-cyan-400">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Forensic Evidence Summary:
                </span>
                <p>{currentFrame.evidenceDescription}</p>
              </div>

              {/* Selected Region Micro-Detail (if user clicked a box) */}
              {selectedRegionId && (() => {
                const reg = currentFrame.flaggedRegions.find((r) => r.id === selectedRegionId);
                if (!reg) return null;
                return (
                  <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-xs space-y-1 animate-in fade-in">
                    <span className="font-bold text-cyan-300 block">{reg.label}</span>
                    <p className="text-[11px] text-cyan-100 opacity-90">{reg.description}</p>
                    <span className="text-[10px] font-mono text-cyan-400 block pt-1">
                      Local Activation: {reg.anomalyProbability}%
                    </span>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>

      {/* Interactive Full-Width Temporal Heatmap Scrubbing Bar */}
      <div className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
        isCyber ? 'bg-slate-950/90 border-slate-800' : isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
      }`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className={`text-xs font-bold ${isCyber ? 'text-white' : isDark ? 'text-white' : 'text-neutral-900'}`}>
              Temporal Heatmap & Anomaly Distribution (0.0s – 4.0s)
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono opacity-80">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> &lt;30% (Authentic)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> 30-70% (Suspicious)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500" /> &gt;70% (Synthetic)
            </span>
          </div>
        </div>

        {/* Heatmap Bar Strip with Clickable Columns & Scrubber Needle */}
        <div className="relative pt-6 pb-2 select-none">
          {/* Background Probability Histogram Bars */}
          <div className="h-20 w-full flex items-end gap-1 sm:gap-1.5 px-1 bg-slate-900/60 rounded-xl p-2 border border-slate-800 relative">
            {frames.map((f) => {
              const isActive = f.frameNumber === currentFrameNumber;
              const prob = f.syntheticProbability;
              const isPeak = f.isKeyPeakFrame;

              let barColor = 'bg-emerald-500';
              if (prob > 85) barColor = 'bg-red-500 shadow-sm shadow-red-500/50';
              else if (prob > 65) barColor = 'bg-orange-500';
              else if (prob > 35) barColor = 'bg-amber-400';

              return (
                <div
                  key={f.frameNumber}
                  onClick={() => handleFrameChange(f.frameNumber)}
                  className="flex-1 h-full flex flex-col items-center justify-end cursor-pointer group relative"
                >
                  {/* Peak Marker Flag */}
                  {isPeak && isFake && (
                    <div className="absolute -top-5 flex flex-col items-center pointer-events-none z-10">
                      <span className="text-[8px] font-black font-mono bg-red-600 text-white px-1 py-0.2 rounded-xs shadow-xs animate-bounce">
                        PEAK
                      </span>
                    </div>
                  )}

                  {/* Probability Height Bar */}
                  <div
                    className={`w-full rounded-t-sm transition-all duration-150 ${barColor} ${
                      isActive ? 'ring-2 ring-white scale-y-105 opacity-100' : 'opacity-70 group-hover:opacity-100 group-hover:scale-y-102'
                    }`}
                    style={{ height: `${Math.max(12, prob)}%` }}
                  />

                  {/* Hover Floating Tooltip */}
                  <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center bg-neutral-900 text-white text-[10px] p-2 rounded-lg border border-neutral-700 shadow-xl z-30 pointer-events-none whitespace-nowrap">
                    <span className="font-bold text-cyan-300">Frame #{f.frameNumber} ({f.timestampSec.toFixed(1)}s)</span>
                    <span>Synthetic: <strong className={prob > 70 ? 'text-red-400' : 'text-emerald-400'}>{prob}%</strong></span>
                    <span className="text-neutral-400 text-[9px]">{f.channelDominance}</span>
                  </div>
                </div>
              );
            })}

            {/* Scrubber Needle Indicator */}
            {currentFrame && (
              <div
                className="absolute top-0 bottom-0 pointer-events-none z-20 flex flex-col items-center transition-all duration-150"
                style={{
                  left: `${((currentFrameNumber - 0.5) / frames.length) * 100}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                <div className="w-2.5 h-2.5 bg-cyan-400 rotate-45 shadow-md shadow-cyan-400/80 -mt-1" />
                <div className="w-0.5 flex-1 bg-cyan-400 shadow-xs shadow-cyan-400/50" />
              </div>
            )}
          </div>

          {/* Continuous Range Slider Controller */}
          <div className="mt-2.5">
            <input
              type="range"
              min="1"
              max={frames.length}
              value={currentFrameNumber}
              onChange={(e) => handleFrameChange(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
          </div>

          {/* Time & Frame Axis Ticks */}
          <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 pt-1">
            <span>0.0s (Frame 01)</span>
            <span>1.0s (Frame 10)</span>
            <span>2.0s (Frame 20)</span>
            <span>3.0s (Frame 30)</span>
            <span>4.0s (Frame 40)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
