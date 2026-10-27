export type MediaType = 'video' | 'image' | 'audio';
export type AppTheme = 'default' | 'dark' | 'light';

export interface ForensicScore {
  verdict: 'REAL' | 'FAKE' | 'SUSPICIOUS';
  confidence: number; // 0 to 100
  fakePercentage: number;
  realPercentage: number;
  overallRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  summary: string;
  manipulationType?: string;
}

export interface SpatialAnalysis {
  score: number; // 0 (authentic) - 100 (fake)
  boundaryBlendingAnomalies: number; // percentage
  pixelInconsistency: number;
  compressionArtifacts: string;
  detectedAnomalies: string[];
  explanation: string;
}

export interface FrequencyAnalysis {
  score: number;
  fftEnergyDistribution: 'Normal Natural Decay' | 'High-Frequency Anomaly (GAN artifact)' | 'Inconsistent Periodic Peaks';
  dctDiscrepancy: number; // 0-100
  checkerboardArtifactsDetected: boolean;
  frequencyPeaks: { freq: number; power: number; isNatural: boolean }[];
  explanation: string;
}

export interface CbamFlaggedRegion {
  id: string;
  label: string; // e.g. "Jawline Boundary Seam", "Eyelid Warp / Blink Desync", "Lip Viseme Lag", "Corneal Specular Glitch"
  top: number; // %
  left: number; // %
  width: number; // %
  height: number; // %
  anomalyProbability: number; // % (e.g. 96.4)
  heatmapIntensity: number; // 0 to 1.0
  description: string;
}

export interface CbamTemporalFrame {
  frameNumber: number;
  timestampSec: number;
  syntheticProbability: number; // 0 - 100%
  spatialAttentionScore: number; // 0 - 100%
  channelAttentionScore: number; // 0 - 100%
  channelDominance: string; // e.g. "Jawline & Periorbital"
  anomalySeverity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'NORMAL';
  flaggedRegions: CbamFlaggedRegion[];
  evidenceDescription: string;
  isKeyPeakFrame?: boolean;
}

export interface CBAMAttentionAnalysis {
  score: number;
  channelAttentionDominance: string; // e.g. "Facial Boundaries & Eyes"
  spatialAttentionFocus: string; // e.g. "Mouth & Periorbital region"
  activeLayer: string; // "Block4_CBAM_Spatial"
  attentionConcentrationRatio: number; // 0-100%
  explanation: string;
  temporalHeatmapFrames?: CbamTemporalFrame[];
  peakAnomalyFrame?: number;
  peakAnomalyProbability?: number;
}

export interface BiologicalSignalsAnalysis {
  score: number;
  rppgDetected: boolean;
  estimatedBPM: number;
  pulseQualityIndex: number; // 0-100%
  signalWaveform: { time: number; bloodPerfusion: number; syntheticExpected: number }[];
  bloodFlowConsistency: 'Healthy Human Vasomotor' | 'Synthetic / Pulse Absent' | 'Noisy Artificial Jitter';
  explanation: string;
}

export interface MultimodalAnalysis {
  score: number;
  audioVideoDesyncMs: number; // e.g. +140ms
  phonemeVisemeMatchRatio: number; // 0-100%
  voiceNaturalnessScore: number;
  detectedLinguisticMismatch: boolean;
  syncTimeline: { timestamp: number; lipOpening: number; speechEnergy: number; isSynced: boolean }[];
  explanation: string;
}

export interface TemporalAnalysis {
  score: number;
  flickeringIntensity: number; // 0-100
  eyeBlinkPattern: 'Natural Stochastic (15-20 blinks/min)' | 'Unnatural Freeze / No Blinking' | 'Random Asymmetric Spikes';
  headPoseJitterScore: number;
  earTimeline: { frame: number; eyeAspectRatio: number; isBlink: boolean }[];
  explanation: string;
}

export interface RobustnessMetrics {
  whatsappCompressionAUC: number;
  xTwitterTranscodingAUC: number;
  tiktokBlurAUC: number;
  gaussianNoiseTolerance: number;
  h264CRF28Score: number;
  realWorldStressVerdict: string;
}

export interface CrossDatasetBenchmarking {
  celebDF_AUC: number;
  celebDF_EER: number;
  dfdc_AUC: number;
  dfdc_EER: number;
  faceForensics_AUC: number;
  wildDeepfake_AUC: number;
  averageInferenceMs: number;
}

export interface AnalysisResult {
  id: string;
  mediaName: string;
  mediaType: MediaType;
  mediaUrl: string;
  thumbnailUrl?: string;
  fileSizeBytes: number;
  sha256Hash: string;
  analyzedAt: string;
  isEdgeInference: boolean;
  inferenceDurationMs: number;
  score: ForensicScore;
  spatial: SpatialAnalysis;
  frequency: FrequencyAnalysis;
  cbamAttention: CBAMAttentionAnalysis;
  biologicalRPPG: BiologicalSignalsAnalysis;
  multimodal: MultimodalAnalysis;
  temporal: TemporalAnalysis;
  robustness: RobustnessMetrics;
  benchmarks: CrossDatasetBenchmarking;
  gradCamHeatmapUrl?: string;
  autoDeleted: boolean;
  rawSocialUrl?: string;
  socialPlatform?: 'instagram' | 'youtube' | 'x' | 'tiktok' | 'direct';
}

export interface DemoSample {
  id: string;
  title: string;
  category: string;
  mediaType: MediaType;
  mediaUrl: string;
  thumbnailUrl: string;
  description: string;
  expectedVerdict: 'REAL' | 'FAKE' | 'SUSPICIOUS';
  fakePercentage: number;
  realPercentage: number;
  tags: string[];
}

export interface JargonTerm {
  term: string;
  simpleName: string;
  definition: string;
  plainAnalogy: string;
  whyItMatters: string;
  riskIfFailed: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedPrompts?: string[];
  technicalTopic?: string;
  isStreaming?: boolean;
  isQueued?: boolean;
  statusPhase?: string;
}
