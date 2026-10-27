import React, { useState } from 'react';
import { 
  Eye, 
  Layers, 
  Sliders, 
  Sparkles, 
  Square, 
  Info, 
  ZoomIn, 
  CheckCircle,
  AlertOctagon
} from 'lucide-react';
import { AnalysisResult } from '../types';
import { JargonTooltip } from './JargonTooltip';
import { getTranslation } from '../i18n/languages';

interface GradCamVisualizerProps {
  result: AnalysisResult;
  currentLanguage?: string;
}

export const GradCamVisualizer: React.FC<GradCamVisualizerProps> = ({ 
  result,
  currentLanguage = 'en'
}) => {
  const [heatmapOpacity, setHeatmapOpacity] = useState(75);
  const [selectedLayer, setSelectedLayer] = useState<'spatial_cbam' | 'conv4' | 'logits'>('spatial_cbam');
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [showThresholdMask, setShowThresholdMask] = useState(false);

  const t = getTranslation(currentLanguage);
  const isFake = result.score.verdict === 'FAKE';
  const isCloneOrMultiFace = 
    Boolean(result.score.manipulationType?.toLowerCase().includes('clone')) ||
    Boolean(result.score.manipulationType?.toLowerCase().includes('multi')) ||
    result.spatial.detectedAnomalies.some(a => a.toLowerCase().includes('clone') || a.toLowerCase().includes('duplicate') || a.toLowerCase().includes('face') || a.toLowerCase().includes('identical')) ||
    Boolean(result.score.summary?.toLowerCase().includes('clone')) ||
    Boolean(result.score.summary?.toLowerCase().includes('multi'));

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
              Explainable AI (XAI)
            </span>
            <JargonTooltip termKey="Grad-CAM" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900 mt-1">
            {t.gradcamTitle}
          </h3>
          <p className="text-xs text-neutral-500">
            {t.gradcamSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
            isFake ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
          }`}>
            {isFake ? <AlertOctagon className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
            {isFake ? t.gradcamHotspotsFound : t.gradcamNaturalActivations}
          </span>
        </div>
      </div>

      {/* Main Canvas & Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visualizer Frame */}
        <div className="lg:col-span-8 flex flex-col items-center">
          <div className="relative w-full max-w-lg aspect-4/3 rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-inner group">
            {/* Base Image */}
            <img
              src={result.mediaUrl}
              alt="Analyzed Media"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />

            {/* Grad-CAM Heatmap Overlay Simulation */}
            <div
              className={`absolute inset-0 transition-opacity duration-200 pointer-events-none ${
                showThresholdMask ? 'mix-blend-color-burn' : 'mix-blend-screen'
              }`}
              style={{
                opacity: heatmapOpacity / 100,
                background: isFake
                  ? isCloneOrMultiFace
                    ? 'radial-gradient(circle at 22% 20%, rgba(239, 68, 68, 0.95) 0%, rgba(245, 158, 11, 0.6) 24%, transparent 45%), radial-gradient(circle at 50% 18%, rgba(239, 68, 68, 0.95) 0%, rgba(245, 158, 11, 0.6) 24%, transparent 45%), radial-gradient(circle at 74% 20%, rgba(239, 68, 68, 0.95) 0%, rgba(245, 158, 11, 0.6) 24%, transparent 45%)'
                    : selectedLayer === 'spatial_cbam'
                    ? 'radial-gradient(circle at 50% 65%, rgba(255, 0, 0, 0.9) 0%, rgba(255, 120, 0, 0.7) 25%, rgba(255, 255, 0, 0.4) 45%, rgba(0, 255, 255, 0.1) 70%, transparent 100%), radial-gradient(circle at 40% 40%, rgba(255, 30, 0, 0.8) 0%, rgba(255, 160, 0, 0.5) 20%, transparent 50%)'
                    : 'radial-gradient(circle at 50% 50%, rgba(255, 0, 80, 0.85) 0%, rgba(255, 140, 0, 0.6) 35%, transparent 75%)'
                  : 'radial-gradient(circle at 50% 45%, rgba(0, 150, 255, 0.4) 0%, rgba(0, 200, 100, 0.2) 50%, transparent 80%)'
              }}
            />

            {/* Simulated Bounding Box for High-Anomaly Focus */}
            {showBoundingBoxes && isFake && (
              <>
                {isCloneOrMultiFace ? (
                  <>
                    {/* Cloned Face 1 (Left Subject) */}
                    <div className="absolute top-[8%] left-[12%] w-[22%] h-[28%] border-2 border-red-500 rounded-xl bg-red-500/15 animate-pulse">
                      <div className="absolute -top-5 left-0 whitespace-nowrap bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                        Cloned Face #1: 98.6%
                      </div>
                    </div>

                    {/* Cloned Face 2 (Center Subject) */}
                    <div className="absolute top-[6%] left-[39%] w-[22%] h-[29%] border-2 border-red-500 rounded-xl bg-red-500/20 animate-pulse">
                      <div className="absolute -top-5 left-0 whitespace-nowrap bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                        Cloned Face #2: 99.2%
                      </div>
                    </div>

                    {/* Cloned Face 3 (Right Subject) */}
                    <div className="absolute top-[8%] left-[64%] w-[22%] h-[28%] border-2 border-red-500 rounded-xl bg-red-500/15 animate-pulse">
                      <div className="absolute -top-5 left-0 whitespace-nowrap bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                        Cloned Face #3: 98.8%
                      </div>
                    </div>

                    {/* Neck / Collar Seam Mismatch */}
                    <div className="absolute top-[34%] left-[44%] w-[12%] h-[9%] border border-dashed border-amber-400 rounded bg-amber-500/20">
                      <div className="absolute -bottom-4 left-0 whitespace-nowrap bg-amber-500 text-black text-[7px] font-bold px-1 py-0.2 rounded">
                        Neck Blend Seam
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Lower Face / Jaw / Lip Box */}
                    <div className="absolute top-[52%] left-[28%] w-[44%] h-[35%] border-2 border-red-500 rounded bg-red-500/10 animate-pulse">
                      <div className="absolute -top-5 left-0 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                        CBAM Anomaly: Jaw Seam (94.2%)
                      </div>
                    </div>

                    {/* Periorbital Eye Box */}
                    <div className="absolute top-[32%] left-[26%] w-[22%] h-[18%] border border-amber-400 rounded bg-amber-400/10">
                      <div className="absolute -top-4 left-0 bg-amber-500 text-black text-[8px] font-bold px-1 py-0.2 rounded">
                        Iris Asymmetry
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {/* Scale Bar */}
            <div className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-xs text-white px-2.5 py-1 rounded text-[10px] font-mono flex items-center gap-2">
              <div className="w-16 h-2 rounded-sm bg-gradient-to-r from-blue-600 via-yellow-400 to-red-600" />
              <span>{isFake ? t.gradcamHotspotLegend : t.gradcamNormalLegend}</span>
            </div>
          </div>

          <div className="mt-3 text-center text-xs text-neutral-500">
            {isFake ? t.gradcamFakeExpl : t.gradcamRealExpl}
          </div>
        </div>

        {/* Heatmap Controls Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            <h4 className="text-xs font-bold text-neutral-900 flex items-center gap-1.5 mb-3">
              <Sliders className="w-3.5 h-3.5 text-indigo-600" /> {t.gradcamIntensityTitle}
            </h4>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold text-neutral-700 mb-1">
                  <span>{t.gradcamOverlayOpacity}</span>
                  <span>{heatmapOpacity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={heatmapOpacity}
                  onChange={(e) => setHeatmapOpacity(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Toggles */}
              <div className="pt-2 border-t border-neutral-200/80 space-y-2">
                <label className="flex items-center justify-between text-xs font-medium text-neutral-700 cursor-pointer">
                  <span>{t.gradcamHighlightBoxes}</span>
                  <input
                    type="checkbox"
                    checked={showBoundingBoxes}
                    onChange={(e) => setShowBoundingBoxes(e.target.checked)}
                    className="w-3.5 h-3.5 text-indigo-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between text-xs font-medium text-neutral-700 cursor-pointer">
                  <span>{t.gradcamThresholdFilter}</span>
                  <input
                    type="checkbox"
                    checked={showThresholdMask}
                    onChange={(e) => setShowThresholdMask(e.target.checked)}
                    className="w-3.5 h-3.5 text-indigo-600 rounded"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Layer Selector */}
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            <h4 className="text-xs font-bold text-neutral-900 flex items-center gap-1.5 mb-2.5">
              <Layers className="w-3.5 h-3.5 text-sky-600" /> {t.gradcamInspectionLayer}
            </h4>

            <div className="space-y-1.5">
              <button
                onClick={() => setSelectedLayer('spatial_cbam')}
                className={`w-full text-left p-2.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedLayer === 'spatial_cbam'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{t.layerSpatialTitle}</span>
                  <span className="text-[10px] font-mono opacity-80">Block4_Spatial</span>
                </div>
                <p className="text-[10px] font-normal opacity-75 mt-0.5">
                  {t.layerSpatialDesc}
                </p>
              </button>

              <button
                onClick={() => setSelectedLayer('conv4')}
                className={`w-full text-left p-2.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedLayer === 'conv4'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{t.layerConvTitle}</span>
                  <span className="text-[10px] font-mono opacity-80">ResNet_C4</span>
                </div>
                <p className="text-[10px] font-normal opacity-75 mt-0.5">
                  {t.layerConvDesc}
                </p>
              </button>

              <button
                onClick={() => setSelectedLayer('logits')}
                className={`w-full text-left p-2.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedLayer === 'logits'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{t.layerLogitsTitle}</span>
                  <span className="text-[10px] font-mono opacity-80">Softmax_Output</span>
                </div>
                <p className="text-[10px] font-normal opacity-75 mt-0.5">
                  {t.layerLogitsDesc}
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
