export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  region: string;
  flag: string;
}

export interface TranslationStrings {
  brandName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  uploadAreaTitle: string;
  uploadAreaSubtitle: string;
  dropPrompt: string;
  selectFile: string;
  autoDeleteLabel: string;
  autoDeleteBadge: string;
  autoDeleteDesc: string;
  edgeModeLabel: string;
  edgeModeDesc: string;
  trySampleMedia: string;
  sampleMediaSubtitle: string;
  realScore: string;
  fakeScore: string;
  verdictReal: string;
  verdictFake: string;
  verdictSuspicious: string;
  downloadReport: string;
  viewGradCam: string;
  tourGuide: string;
  chatbotTitle: string;
  tabSpatial: string;
  tabFrequency: string;
  tabCBAM: string;
  tabRPPG: string;
  tabMultimodal: string;
  tabTemporal: string;
  tabRobustness: string;
  tabCrossDataset: string;
  jargonTooltipTitle: string;

  // Detailed dashboard explanations underneath headlines
  rppgSubtitle: string;
  pulseRate: string;
  bvpWaveformTitle: string;
  samplingRate: string;
  pqiTitle: string;
  pqiHigh: string;
  pqiLow: string;
  vasomotorTitle: string;
  forensicVerdictTitle: string;
  cbamSubtitle: string;
  channelAttentionTitle: string;
  channelAttentionDesc: string;
  spatialAttentionTitle: string;
  spatialAttentionDesc: string;
  spatialSubtitle: string;
  frequencySubtitle: string;
  multimodalSubtitle: string;
  temporalSubtitle: string;

  // Headers and labels under bold titles
  dominantChannelFeaturesTitle: string;
  spatialAttentionHotspotTitle: string;
  architectureSummaryTitle: string;
  detectedSpatialArtifactsTitle: string;
  compressionNoiseTitle: string;
  boundaryBlendingTitle: string;
  spatialFindingTitle: string;
  spectralPowerDistributionTitle: string;
  spectralAnalysisTitle: string;
  crossModalAlignmentTitle: string;
  crossModalConclusionTitle: string;
  temporalBlinkTimelineTitle: string;
  temporalFindingTitle: string;
  ephemeralWipeRAM: string;
  newScanBtn: string;
  attentionConcentration: string;
  threatIndex: string;
  desyncOffset: string;
  syncedBadge: string;
  mismatchBadge: string;

  // Benchmarks Modal keys
  benchmarksModalTitle: string;
  benchmarksModalSubtitle: string;
  benchmarksCrossDatasetTitle: string;
  benchmarksCrossDatasetSubtitle: string;
  benchmarksRocAuc: string;
  benchmarksEer: string;
  benchmarksRobustnessTitle: string;
  benchmarksRobustnessSubtitle: string;
  benchmarksWhatsappTitle: string;
  benchmarksWhatsappDesc: string;
  benchmarksTwitterTitle: string;
  benchmarksTwitterDesc: string;
  benchmarksTiktokTitle: string;
  benchmarksTiktokDesc: string;
  benchmarksResilience: string;
  benchmarksCloseBtn: string;

  // Grad-CAM Visualizer keys
  gradcamTitle: string;
  gradcamSubtitle: string;
  gradcamHotspotsFound: string;
  gradcamNaturalActivations: string;
  gradcamIntensityTitle: string;
  gradcamOverlayOpacity: string;
  gradcamHighlightBoxes: string;
  gradcamThresholdFilter: string;
  gradcamInspectionLayer: string;
  gradcamHotspotLegend: string;
  gradcamNormalLegend: string;
  gradcamFakeExpl: string;
  gradcamRealExpl: string;
  layerSpatialTitle: string;
  layerSpatialDesc: string;
  layerConvTitle: string;
  layerConvDesc: string;
  layerLogitsTitle: string;
  layerLogitsDesc: string;

  // Chatbot modal keys
  chatWelcome: string;
  chatPrompts: string[];
}

export interface LocalizedFindings {
  executiveSummary: string;
  spatialExplanation: string;
  spatialCompression: string;
  spatialAnomalies: string[];
  frequencyExplanation: string;
  fftEnergyDistribution: string;
  cbamExplanation: string;
  cbamChannelDominance: string;
  cbamSpatialFocus: string;
  rppgExplanation: string;
  bloodFlowConsistency: string;
  multimodalExplanation: string;
  temporalExplanation: string;
  eyeBlinkPattern: string;
}

export interface MethodologyTranslations {
  title: string;
  subtitle: string;
  versionBadge: string;
  closeBtn: string;
  tabs: {
    cbam: string;
    rppg: string;
    fft: string;
    pipeline: string;
    caseAudit: string;
  };
  cbamSection: {
    header: string;
    description: string;
    channelTitle: string;
    channelDesc: string;
    channelTarget: string;
    spatialTitle: string;
    spatialDesc: string;
    spatialTarget: string;
    cloneBoxHeader: string;
    clonePoints: string[];
  };
  rppgSection: {
    header: string;
    description: string;
    humanTitle: string;
    humanDesc: string;
    fakeTitle: string;
    fakeDesc: string;
    chromTitle: string;
    chromDesc: string;
    pipelineHeader: string;
    steps: {
      step1Title: string;
      step1Desc: string;
      step2Title: string;
      step2Desc: string;
      step3Title: string;
      step3Desc: string;
      step4Title: string;
      step4Desc: string;
    };
  };
  fftSection: {
    header: string;
    description: string;
    naturalTitle: string;
    naturalDesc: string;
    syntheticTitle: string;
    syntheticDesc: string;
  };
  pipelineSection: {
    header: string;
    description: string;
    vectorsHeader: string;
    vectors: {
      v1Title: string;
      v1Desc: string;
      v2Title: string;
      v2Desc: string;
      v3Title: string;
      v3Desc: string;
      v4Title: string;
      v4Desc: string;
      v5Title: string;
      v5Desc: string;
      v6Title: string;
      v6Desc: string;
      v7Title: string;
      v7Desc: string;
    };
  };
  caseSection: {
    whyFlaggedHeader: string;
    anomaliesHeader: string;
    metricsHeader: {
      spatial: string;
      cbam: string;
      fft: string;
      rppg: string;
    };
  };
  footerNote: string;
}

