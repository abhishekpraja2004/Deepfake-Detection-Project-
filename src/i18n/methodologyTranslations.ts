import { MethodologyTranslations } from './types';

export { type MethodologyTranslations } from './types';

// Central comprehensive dictionary for all 24 supported languages in HawkSpectra
export const methodologyLocales: Record<string, MethodologyTranslations> = {
  en: {
    title: "Forensic AI Methodology & Neural Architecture",
    subtitle: "Educational deep dive into Convolutional Block Attention (CBAM), Remote Photoplethysmography (rPPG), and Spatial-Frequency Auditing across 7 specialized diagnostic vectors.",
    versionBadge: "v4.8 • 7-Vector Engine",
    closeBtn: "Close Methodology Overlay",
    tabs: {
      cbam: "Hybrid CNN + CBAM Attention",
      rppg: "Biological rPPG Pulse Analysis",
      fft: "2D/3D FFT Frequency Domain",
      pipeline: "7-Vector Diagnostic Pipeline",
      caseAudit: "Why Was This File Flagged?"
    },
    cbamSection: {
      header: "What is CBAM (Convolutional Block Attention Module)?",
      description: "Standard CNNs process entire images uniformly. In contrast, CBAM sequentially applies two attention sub-modules: Channel Attention (What features to focus on) and Spatial Attention (Where in the image to look).",
      channelTitle: "Channel Attention Module (M_c)",
      channelDesc: "Evaluates cross-channel relationships. Deepfake generators (GANs and Diffusion) generate subtle chromatic shifts and color saturation mismatches across RGB channels.",
      channelTarget: "Catches unnatural color spectrum dispersion and synthetic lighting inconsistencies.",
      spatialTitle: "Spatial Attention Module (M_s)",
      spatialDesc: "Generates a 2D spatial mask highlighting informative regions. It suppresses background noise and concentrates on high-risk boundary seams.",
      spatialTarget: "Periorbital eye junctions, neck-to-collar blend seams, and duplicated facial structures.",
      cloneBoxHeader: "How CBAM Unmasks Face-Swaps and Cloned Multi-Faces:",
      clonePoints: [
        "Boundary Blending Seam Discontinuities: When a synthesized face mask is pasted onto a target body, the pixel gradients at the jawline, forehead, and neck exhibit micro-step discontinuities that activate CBAM's spatial convolution filters.",
        "Cloned Identity Correlation: When the exact same facial landmarks, smile lines, and corneal reflections are repeated across multiple subjects, the attention map flags strong anomalous correlation spikes between disjoint spatial coordinates.",
        "Specular Highlight Asymmetry: Real camera flashes create coherent specular highlights on eyes and sunglasses; pasted face clones display incongruent reflection angles relative to global ambient lighting."
      ]
    },
    rppgSection: {
      header: "What is Remote Photoplethysmography (rPPG)?",
      description: "With every heartbeat, oxygenated blood surges through facial capillaries. This causes periodic micro-variations in skin optical absorption. Biological rPPG extracts this blood volume pulse (BVP) remotely to verify living human presence.",
      humanTitle: "Organic Living Human",
      humanDesc: "Generates a harmonic, quasi-periodic waveform between 0.75 Hz and 2.5 Hz (45 - 150 BPM) with pronounced systolic peaks and dicrotic notches.",
      fakeTitle: "Neural Deepfake",
      fakeDesc: "Generative models synthesize pixels frame-by-frame without cardiovascular modeling. The rPPG signal either flatlines completely (BPM = 0) or displays erratic white-noise jitter.",
      chromTitle: "Green Chrominance (S_chrom)",
      chromDesc: "The Green channel (500–580 nm) exhibits the highest hemoglobin absorption contrast, allowing spatial subtraction of ambient motion artifacts.",
      pipelineHeader: "Pulse Signal Extraction Pipeline:",
      steps: {
        step1Title: "ROI Tracking",
        step1Desc: "Forehead & Cheeks facial landmark mesh",
        step2Title: "Chrominance Decomposition",
        step2Desc: "Xs = 3R - 2G, Ys = 1.5R + G - 1.5B",
        step3Title: "Bandpass Filtering",
        step3Desc: "Butterworth filter (0.7 Hz - 3.5 Hz)",
        step4Title: "Power Spectral Density",
        step4Desc: "Peak frequency to calculate cardiac BPM"
      }
    },
    fftSection: {
      header: "2D/3D Fast Fourier Transform (FFT) & DCT Spectral Analysis",
      description: "Generative models use up-sampling and transposed convolution layers to generate high-resolution images and videos. These neural operations leave persistent, mathematical frequency grid artifacts in the 2D power spectrum.",
      naturalTitle: "Natural Scene Statistics (1/f Law)",
      naturalDesc: "Authentic optical cameras obey the natural power decay law: high frequencies decay smoothly and radially from the DC center without discrete harmonic spikes. Sensor PRNU noise is continuous.",
      syntheticTitle: "Synthetic Checkerboard Grid Spikes",
      syntheticDesc: "GAN generators (StyleGAN, Pix2Pix, Wav2Lip) leave periodic periodicities in azimuth angles (θ = ±45°, ±90°). The 2D FFT exhibits telltale crosshair or circular ring spikes characteristic of generative deconvolution."
    },
    pipelineSection: {
      header: "HawkVision Multi-Vector Defense Pipeline (7 Core Vectors)",
      description: "No single model is foolproof against modern deepfakes. Our hybrid architecture combines 7 complementary forensic layers to guarantee zero blind spots.",
      vectorsHeader: "The 7 Forensic Diagnostic Vectors:",
      vectors: {
        v1Title: "Vector 1: Spatial & Anatomical Proportions",
        v1Desc: "Evaluates head-to-body ratios, facial symmetry, skin pore texture resolution, and jawline/collar blend seams.",
        v2Title: "Vector 2: Hybrid CNN + CBAM Attention",
        v2Desc: "Calculates cross-channel feature dispersion and isolates high-risk spatial bounding coordinates with Grad-CAM heatmaps.",
        v3Title: "Vector 3: Biological rPPG Vital Signal Verification",
        v3Desc: "Tracks human capillary blood volume pulse rhythms across video sequences, rejecting synthetic inanimate faces.",
        v4Title: "Vector 4: 2D/3D FFT Frequency & Noise Domain",
        v4Desc: "Detects GAN transposed deconvolution checkerboard grids and verifies authentic camera silicon hardware PRNU noise.",
        v5Title: "Vector 5: Audio-Visual Lip-Sync & Viseme Alignment",
        v5Desc: "Measures millisecond synchronization between phoneme speech acoustics and facial viseme lip-opening mechanics.",
        v6Title: "Vector 6: Temporal Eye Blinking & EAR Dynamics",
        v6Desc: "Audits natural human Eye Aspect Ratio (EAR) blink intervals and micro-expression temporal consistency.",
        v7Title: "Vector 7: Explainable Grad-CAM Heatmaps & Proofing",
        v7Desc: "Generates tamper-evident gradient heatmaps and mathematical evidentiary dossiers for legal verification."
      }
    },
    caseSection: {
      whyFlaggedHeader: "Why Was This File Classified As",
      anomaliesHeader: "Specific Forensic Vectors Triggered:",
      metricsHeader: {
        spatial: "Spatial Score",
        cbam: "CBAM Attention",
        fft: "FFT Spectrum",
        rppg: "rPPG Biological"
      }
    },
    footerNote: "HawkVision 7-Vector Diagnostic Framework: Hybrid CNN+CBAM Attention, Biological rPPG, Frequency FFT, and Multimodal Audio-Visual Alignment."
  },

  doi: {
    title: "हॉकविज़न AI फॉरेंसिक कार्यप्रणाली (Methodology)",
    subtitle: "7 विशेष डायग्नोस्टिक वेक्टर्स दे माध्यम कन्नै हाइब्रिड CNN+CBAM, जैविक rPPG ते FFT स्पेक्ट्रम दी विस्तृत व्याख्या।",
    versionBadge: "v4.8 • 7-वेक्टर इंजन",
    closeBtn: "कार्यप्रणाली ओवरले बंद करो",
    tabs: {
      cbam: "1. हाइब्रिड CNN + CBAM",
      rppg: "2. जैविक rPPG पल्स",
      fft: "3. 2D/3D FFT स्पेक्ट्रम",
      pipeline: "4. 7-वेक्टर आर्किटेक्चर",
      caseAudit: "5. इस स्कैन दा विश्लेषण"
    },
    cbamSection: {
      header: "CBAM (कन्वोल्यूशनल ब्लॉक अटेंशन मॉड्यूल) की ऐ?",
      description: "साधारण CNN पूरी तस्वीर गी इक समान प्रोसेस करदे न। इसके विपरीत, CBAM दो अटेंशन सब-मॉड्यूल लौंदा ऐ: चैनल अटेंशन (किसे फीचर पर ध्यान देना ऐ) ते स्पेशल अटेंशन (तस्वीर च कुत्थै दिखना ऐ)।",
      channelTitle: "चैनल अटेंशन मॉड्यूल (M_c)",
      channelDesc: "RGB चैनलां दे आपसी तालमेल दी जांच करदा ऐ। AI जेनेरेटर रंग संतुलन च सूक्ष्म गल्तियां छोड़दे न।",
      channelTarget: "अप्राकृतिक रंग बिखराव ते सिंथेटिक लाइटिंग दा फर्क फड़दा ऐ।",
      spatialTitle: "स्पेशल अटेंशन मॉड्यूल (M_s)",
      spatialDesc: "2D मास्क तैयार करियै बैकग्राउंड शोर गी हटांदा ऐ ते चेहरे दे किनारों पर 7x7 कनवल्शन फोकस करदा ऐ।",
      spatialTarget: "अक्खीं दे कोने, गर्दन-कॉलर दे जोड़ ते क्लोन कीते गेदे चेहरे।",
      cloneBoxHeader: "CBAM फेस-स्वैप ते क्लोनिंग चेहरे गी कीकर फड़दा ऐ:",
      clonePoints: [
        "गर्दन ते चेहरे दे जोड़ दी खराबी: जिन्ने बेले चेहरे गी किसे दूए शरीर पर चिपकाया जंदा ऐ, CBAM पिक्सलां च बदलाव तुरंत फड़ लैंदा ऐ।",
        "क्लोन चेहरें दी समानता: इक गै चेहरा जेकर कई शरीरां पर दोहराया जा ऐ, त सिस्टम चेतावनी जारी करदा ऐ।",
        "रोशनी ते परछाईं दा असंतुलन: असली कैमरे दी रोशनी सुसंगत होंदी ऐ; सिंथेटिक चेहरे पर रोशनी दा कोण बदलदा ऐ।"
      ]
    },
    rppgSection: {
      header: "रिमोट फोटोप्लेथिस्मोग्राफी (rPPG) की ऐ?",
      description: "दिल दी हर धड़कन कन्नै चेहरे दी नसें च खून बग्गदा ऐ। rPPG कैमरे कन्नै चेहरे दी सूक्ष्म नाड़ी मपी यै जिंदे इंसान दी पुष्टि करदा ऐ।",
      humanTitle: "जिंदा इंसान",
      humanDesc: "45 शा 150 BPM दी स्पश्ट ते नियमित नाड़ी तरंग (BVP) पैदा करदा ऐ।",
      fakeTitle: "सिंथेटिक AI डीपफेक",
      fakeDesc: "AI मॉडलां च दिल दी धड़कन नइ होंदी, इसलेई rPPG सिग्नल सपाट (0 BPM) होंदा ऐ।",
      chromTitle: "हरा चैनल (Green Channel S_chrom)",
      chromDesc: "हरा रंग खून दे संचार गी सबने शा सटीक रूप च दर्शांदा ऐ।",
      pipelineHeader: "नाड़ी सिग्नल प्रोसेसिंग दे कदम:",
      steps: {
        step1Title: "माथा ते गाल ट्रैकिंग",
        step1Desc: "चेहरे दे मुख्य खून नाड़ी बिंदु",
        step2Title: "रंग पृथक्करण",
        step2Desc: "Xs = 3R - 2G, Ys = 1.5R + G - 1.5B",
        step3Title: "बैंडपास फिल्टर",
        step3Desc: "बटरवर्थ फिल्टर (0.7 Hz - 3.5 Hz)",
        step4Title: "नाड़ी दर (BPM)",
        step4Desc: "सटीक हृदय गति गणना"
      }
    },
    fftSection: {
      header: "2D/3D FFT फ्रिक्वेंसी स्पेक्ट्रम विश्लेषण",
      description: "AI मॉडल इमेज गी वड्डा करदे बेले 2D स्पेक्ट्रम च गणितीय ग्रिड निशान छोड़दे न।",
      naturalTitle: "प्राकृतिक कैमरा ऑप्टिक्स (1/f नियम)",
      naturalDesc: "असली कैमरां च ऊर्जा केंद्र शा सुचारू रूप च घटदी ऐ ते सेंसर शोर स्थिर होंदा ऐ।",
      syntheticTitle: "सिंथेटिक चेकरबोर्ड ग्रिड स्पाइक्स",
      syntheticDesc: "AI मॉडल ±45° ते ±90° दे कोण पर बनावटी ग्रिड निशान छोड़दे न।"
    },
    pipelineSection: {
      header: "हॉकविज़न 7-वेक्टर सुरक्षा पाइपलाइन",
      description: "अत्याधुनिक डीपफेक गी फड़ने लेई इक मॉडल काफी नइ ऐ। साडा सिस्टम 7 फॉरेंसिक परतां गी मिलांदा ऐ।",
      vectorsHeader: "सिस्टम दे 7 मुख्य फॉरेंसिक वेक्टर:",
      vectors: {
        v1Title: "वेक्टर 1: शरीर ते चेहरे दा अनुपात (Spatial & Body Ratio)",
        v1Desc: "सिर-शरीर अनुपात, चमड़ी दे रोमछिद्र ते गर्दन दे जोड़ दी जांच।",
        v2Title: "वेक्टर 2: हाइब्रिड CNN + CBAM न्यूरल अटेंशन",
        v2Desc: "चैनल ते स्पेशल अटेंशन कन्नै Grad-CAM हीटमैप बनांदा ऐ।",
        v3Title: "वेक्टर 3: जैविक rPPG खून नाड़ी जांच",
        v3Desc: "खून दे संचार ते दिल दी धड़कन मपी यै नकली चेहरें गी खारिज करदा ऐ।",
        v4Title: "वेक्टर 4: 2D/3D FFT फ्रिक्वेंसी ते सेंसर PRNU शोर",
        v4Desc: "AI ग्रिड ते कैमरा सेंसर हार्डवेयर शोर दी पहचान करदा ऐ।",
        v5Title: "वेक्टर 5: ऑडियो-वीडियो लिप-सिंक विश्लेषण",
        v5Desc: "आवाज ते बुल्लें दी हलचल दे तालमेल गी मपदा ऐ।",
        v6Title: "वेक्टर 6: अक्खीं दी झपक ते चेहरे दे हावभाव (EAR Dynamics)",
        v6Desc: "प्राकृतिक अक्खीं दी गति ते भावें दी निरंतरता दा मूल्यांकन करदा ऐ।",
        v7Title: "वेक्टर 7: Grad-CAM हीटमैप ते कानूनी सबूत",
        v7Desc: "रंगीन हीटमैप ते विस्तृत फॉरेंसिक रिपोर्ट तैयार करदा ऐ।"
      }
    },
    caseSection: {
      whyFlaggedHeader: "एह फाइल की वर्गीकरण कीती गेई",
      anomaliesHeader: "लभिए फॉरेंसिक वेक्टर:",
      metricsHeader: {
        spatial: "स्पेशल स्कोर",
        cbam: "CBAM अटेंशन",
        fft: "FFT स्पेक्ट्रम",
        rppg: "rPPG जैविक नाड़ी"
      }
    },
    footerNote: "हॉकविज़न 7-वेक्टर आर्किटेक्चर: हाइब्रिड CNN+CBAM, जैविक rPPG ते FFT स्पेक्ट्रम एकीकरण।"
  },

  hi: {
    title: "फॉरेंसिक AI कार्यप्रणाली और न्यूरल आर्किटेक्चर",
    subtitle: "7 विशेष डायग्नोस्टिक वेक्टर्स के माध्यम से हाइब्रिड CNN + CBAM, जैविक पल्स (rPPG), और फ्रीक्वेंसी स्पेक्ट्रम ऑडिटिंग की विस्तृत व्याख्या।",
    versionBadge: "v4.8 • 7-वेक्टर इंजन",
    closeBtn: "कार्यप्रणाली ओवरले बंद करें",
    tabs: {
      cbam: "1. हाइब्रिड CNN + CBAM",
      rppg: "2. जैविक rPPG पल्स",
      fft: "3. 2D/3D FFT स्पेक्ट्रम",
      pipeline: "4. 7-वेक्टर आर्किटेक्चर",
      caseAudit: "5. इस स्कैन का विश्लेषण"
    },
    cbamSection: {
      header: "CBAM (कन्वोल्यूशनल ब्लॉक अटेंशन मॉड्यूल) क्या है?",
      description: "साधारण CNN पूरी तस्वीर को एक समान रूप से प्रोसेस करते हैं। इसके विपरीत, CBAM दो अटेंशन सब-मॉड्यूल लागू करता है: चैनल अटेंशन और स्पैटियल अटेंशन।",
      channelTitle: "चैनल अटेंशन मॉड्यूल (M_c)",
      channelDesc: "RGB चैनलों के बीच विसंगतियों की जाँच करता है। AI जनरेटर रंगों के संतुलन और सेचुरेशन में सूक्ष्म गड़बड़ियाँ छोड़ देते हैं।",
      channelTarget: "अप्राकृतिक रंग स्पेक्ट्रम और सिंथेटिक लाइटिंग के अंतर को पकड़ता है।",
      spatialTitle: "स्पैटियल अटेंशन मॉड्यूल (M_s)",
      spatialDesc: "2D स्पैटियल मास्क बनाकर बैकग्राउंड के शोर को अनदेखा करता है और संदिग्ध फेशियल किनारों पर ध्यान केंद्रित करता है।",
      spatialTarget: "आँखों के कोने, गर्दन-कॉलर का जोड़ (सीम), और क्लोन किए गए फेशियल स्ट्रक्चर।",
      cloneBoxHeader: "CBAM फेस-स्वैप और क्लोनिंग चेहरे कैसे पकड़ता है:",
      clonePoints: [
        "गर्दन और चेहरे के जोड़ की विसंगति: जब किसी चेहरे को दूसरे शरीर पर प्रत्यारोपित किया जाता है, तो CBAM पिक्सेल सीम तुरंत पकड़ लेता है।",
        "क्लोन चेहरों की समानता: एक ही चेहरा कई शरीरों पर दोहराए जाने पर सिस्टम अलर्ट जारी करता है।",
        "प्रकाश और छाया का असंतुलन: असली कैमरे की रोशनी एक समान होती है; नकली चेहरे पर प्रकाश का कोण भिन्न होता है।"
      ]
    },
    rppgSection: {
      header: "रिमोट फोटोप्लेथिस्मोग्राफी (rPPG) क्या है?",
      description: "दिल की धड़कन के साथ चेहरे की रक्त वाहिकाओं में सूक्ष्म रंग परिवर्तन होते हैं। rPPG कैमरे के माध्यम से रक्त पल्स (BVP) मापकर जीवित मानव की पुष्टि करता है।",
      humanTitle: "जीवित प्रामाणिक मानव",
      humanDesc: "45 से 150 BPM की स्पष्ट और नियमित हृदय पल्स तरंगें उत्पन्न करता है।",
      fakeTitle: "सिंथेटिक AI डीपफेक",
      fakeDesc: "AI मॉडलों में रक्त प्रवाह नहीं होता, इसलिए rPPG सिग्नल पूरी तरह सपाट (BPM = 0) होता है।",
      chromTitle: "हरा चैनल (Green Channel S_chrom)",
      chromDesc: "हरा रंग रक्त प्रवाह को सबसे सटीक रूप में दर्शाता है।",
      pipelineHeader: "पल्स सिग्नल प्रोसेसिंग के चरण:",
      steps: {
        step1Title: "माथा और गाल ट्रैकिंग",
        step1Desc: "चेहरे के मुख्य रक्त प्रवाह बिंदु",
        step2Title: "रंग पृथक्करण",
        step2Desc: "Xs = 3R - 2G, Ys = 1.5R + G - 1.5B",
        step3Title: "बैंडपास फिल्टर",
        step3Desc: "बटरवर्थ फिल्टर (0.7 Hz - 3.5 Hz)",
        step4Title: "हृदय गति (BPM)",
        step4Desc: "सटीक पल्स दर की गणना"
      }
    },
    fftSection: {
      header: "2D/3D FFT फ्रीक्वेंसी स्पेक्ट्रम विश्लेषण",
      description: "AI मॉडल अप-सैंपलिंग के दौरान 2D स्पेक्ट्रम में गणितीय चेकरबोर्ड ग्रिड छोड़ देते हैं।",
      naturalTitle: "प्राकृतिक कैमरा ऑप्टिक्स (1/f नियम)",
      naturalDesc: "वास्तविक कैमरों में ऊर्जा केंद्र से बाहर की ओर सुचारू रूप से घटती है और सेंसर नॉइज़ स्थिर रहता है।",
      syntheticTitle: "सिंथेटिक चेकरबोर्ड ग्रिड स्पाइक्स",
      syntheticDesc: "AI मॉडल ±45° और ±90° के कोण पर अस्वाभाविक ग्रिड स्पाइक्स छोड़ते हैं।"
    },
    pipelineSection: {
      header: "हॉकविज़न 7-वेक्टर सुरक्षा पाइपलाइन",
      description: "आधुनिक डीपफेक को पकड़ने के लिए 7 फॉरेंसिक परतों का एकीकृत उपयोग किया जाता है।",
      vectorsHeader: "सिस्टम के 7 मुख्य फॉरेंसिक वेक्टर:",
      vectors: {
        v1Title: "वेक्टर 1: शरीर और चेहरे का अनुपात (Spatial & Body Ratio)",
        v1Desc: "सिर-शरीर अनुपात, त्वचा के रोमछिद्र और गर्दन के जोड़ों की जांच।",
        v2Title: "वेक्टर 2: हाइब्रिड CNN + CBAM न्यूरल अटेंशन",
        v2Desc: "चैनल और स्पैटियल अटेंशन द्वारा Grad-CAM हीटमैप तैयार करता है।",
        v3Title: "वेक्टर 3: जैविक rPPG रक्त नाड़ी सत्यापन",
        v3Desc: "रक्त संचार और दिल की धड़कन मापकर फर्जी चेहरों को खारिज करता है।",
        v4Title: "वेक्टर 4: 2D/3D FFT फ्रीक्वेंसी और PRNU नॉइज़",
        v4Desc: "AI ग्रिड और कैमरा सेंसर हार्डवेयर नॉइज़ की पहचान करता है।",
        v5Title: "वेक्टर 5: ऑडियो-वीडियो लिप-सिंक विश्लेषण",
        v5Desc: "ध्वनि और होंठों की गति के तालमेल को मापता है।",
        v6Title: "वेक्टर 6: पलक झपकना और चेहरे के भाव (EAR Dynamics)",
        v6Desc: "प्राकृतिक पलक झपकने की गति और भावों की निरंतरता का मूल्यांकन करता है।",
        v7Title: "वेक्टर 7: Grad-CAM हीटमैप और कानूनी साक्ष्य",
        v7Desc: "रंगीन हीटमैप और विस्तृत फॉरेंसिक रिपोर्ट तैयार करता है।"
      }
    },
    caseSection: {
      whyFlaggedHeader: "इस फ़ाइल को क्यों वर्गीकृत किया गया",
      anomaliesHeader: "सक्रिय फॉरेंसिक वेक्टर:",
      metricsHeader: {
        spatial: "स्पैटियल स्कोर",
        cbam: "CBAM अटेंशन",
        fft: "FFT स्पेक्ट्रम",
        rppg: "rPPG जैविक पल्स"
      }
    },
    footerNote: "हॉकविज़न 7-वेक्टर आर्किटेक्चर: हाइब्रिड CNN+CBAM, जैविक rPPG और FFT स्पेक्ट्रम एकीकरण।"
  },

  bho: {
    title: "फॉरेंसिक AI कार्यप्रणाली आ न्यूरल आर्किटेक्चर",
    subtitle: "7 गो विशेष डायग्नोस्टिक वेक्टर्स के जरिए हाइब्रिड CNN+CBAM, नस के धड़कन (rPPG) आ FFT स्पेक्ट्रम के पूरा ब्योरा।",
    versionBadge: "v4.8 • 7-वेक्टर इंजन",
    closeBtn: "ओवरले बंद करीं",
    tabs: {
      cbam: "1. हाइब्रिड CNN + CBAM",
      rppg: "2. नस के धड़कन (rPPG)",
      fft: "3. 2D/3D FFT स्पेक्ट्रम",
      pipeline: "4. 7-वेक्टर पाइपलाइन",
      caseAudit: "5. एह स्कैन के विश्लेषण"
    },
    cbamSection: {
      header: "CBAM (कन्वोल्यूशनल ब्लॉक अटेंशन मॉड्यूल) का ह?",
      description: "साधारण CNN पूरा फोटो के एक्के नियन प्रोसेस करेला। जबकि CBAM दू गो अटेंशन मॉड्यूल चलावेला: चैनल अटेंशन आ स्पेशल अटेंशन।",
      channelTitle: "चैनल अटेंशन मॉड्यूल (M_c)",
      channelDesc: "RGB चैनल के बीच तालमेल जाँचेला। AI जनरेटर रंग संतुलन में सूक्ष्म गलती छोड़ देवेला।",
      channelTarget: "बनावटी रंग फैलाव आ नकली लाइटिंग के अंतर पकड़ेला।",
      spatialTitle: "स्पेशल अटेंशन मॉड्यूल (M_s)",
      spatialDesc: "2D मास्क बना के बैकग्राउंड शोर हटावेला आ चेहरा के संकाहा किनारा पर ध्यान देवेला।",
      spatialTarget: "आँख के कोना, गर्दन के जोड़ (सीम) आ क्लोन कइल चेहरा।",
      cloneBoxHeader: "CBAM फेस-स्वैप आ क्लोनिंग चेहरा कइसे पकड़ेला:",
      clonePoints: [
        "गर्दन आ चेहरा के जोड़ में गड़बड़ी: चेहरा जब दोसरा देह पर चिपकावल जाला, त CBAM पिक्सल के सीम तुरंत पकड़ लेवेला।",
        "क्लोन चेहरा के समानता: एक्के चेहरा जब कई देह पर दोहरावल जाला, त सिस्टम चेतावनी जारी करेला।",
        "रोशनी आ परछाईं के असंतुलन: असली कैमरा के रोशनी एक नियन होला; बनावटी चेहरा पर रोशनी के कोण बदल जाला।"
      ]
    },
    rppgSection: {
      header: "रिमोट फोटोप्लेथिस्मोग्राफी (rPPG) का ह?",
      description: "दिल के धड़कन से चेहरा के नस में खून बहेला आ रंग में बारीक बदलाव आवेला। rPPG कैमरा से नस के पल्स (BVP) नाप के असली इंसान के पुष्टि करेला।",
      humanTitle: "असली जिंदा इंसान",
      humanDesc: "45 से 150 BPM के साफ आ नियमित धड़कन तरंग बनावेला।",
      fakeTitle: "बनावटी AI डीपफेक",
      fakeDesc: "AI मॉडल में खून के बहाव ना होला, एही से rPPG सिग्नल सपाट (0 BPM) आवेला।",
      chromTitle: "हरियर चैनल (Green Channel S_chrom)",
      chromDesc: "हरियर रंग खून के बहाव के सबसे सही रूप में देखावेला।",
      pipelineHeader: "धड़कन सिग्नल निकाले के चरण:",
      steps: {
        step1Title: "माथा आ गाल ट्रैकिंग",
        step1Desc: "चेहरा के मुख्य नस बिंदु",
        step2Title: "रंग अलगाव",
        step2Desc: "Xs = 3R - 2G, Ys = 1.5R + G - 1.5B",
        step3Title: "बैंडपास फिल्टर",
        step3Desc: "बटरवर्थ फिल्टर (0.7 Hz - 3.5 Hz)",
        step4Title: "धड़कन गति (BPM)",
        step4Desc: "सटीक पल्स दर के गणना"
      }
    },
    fftSection: {
      header: "2D/3D FFT फ्रीक्वेंसी स्पेक्ट्रम विश्लेषण",
      description: "AI मॉडल फोटो बड़ा करे के बेरा 2D स्पेक्ट्रम में गणितीय ग्रिड निशान छोड़ देवेला।",
      naturalTitle: "प्राकृतिक कैमरा ऑप्टिक्स (1/f नियम)",
      naturalDesc: "असली कैमरा में ऊर्जा केंद्र से बहरी सुचारू रूप से घटेला आ सेंसर शोर स्थिर रहेला।",
      syntheticTitle: "सिंथेटिक चेकरबोर्ड ग्रिड स्पाइक्स",
      syntheticDesc: "AI मॉडल ±45° आ ±90° के कोण पर बनावटी ग्रिड छोड़ देवेला।"
    },
    pipelineSection: {
      header: "हॉकविज़न 7-वेक्टर सुरक्षा पाइपलाइन",
      description: "डीपफेक पकड़े खातिर सातों फॉरेंसिक परत के एक संघे इस्तेमाल कइल जाला।",
      vectorsHeader: "सिस्टम के 7 मुख्य फॉरेंसिक वेक्टर:",
      vectors: {
        v1Title: "वेक्टर 1: देह आ चेहरा के अनुपात (Spatial & Body Ratio)",
        v1Desc: "मूँड़ी-देह अनुपात, चमड़ी के रोमछिद्र आ गर्दन के जोड़ के जांच।",
        v2Title: "वेक्टर 2: हाइब्रिड CNN + CBAM न्यूरल अटेंशन",
        v2Desc: "चैनल आ स्पेशल अटेंशन से Grad-CAM हीटमैप बनावेला।",
        v3Title: "वेक्टर 3: जैविक rPPG खून नाड़ी जांच",
        v3Desc: "खून के बहाव आ दिल के धड़कन नाप के नकली चेहरा खारिज करेला।",
        v4Title: "वेक्टर 4: 2D/3D FFT फ्रीक्वेंसी आ PRNU शोर",
        v4Desc: "AI ग्रिड आ कैमरा सेंसर हार्डवेयर शोर के पहचान करेला।",
        v5Title: "वेक्टर 5: आवाज-होंठ तालमेल विश्लेषण",
        v5Desc: "आवाज आ होंठ के हलचल के समय अंतर नापेला।",
        v6Title: "वेक्टर 6: आँख के पलक झपकाव आ भाव (EAR Dynamics)",
        v6Desc: "प्राकृतिक आँख के गति आ भाव के निरंतरता परखेला।",
        v7Title: "वेक्टर 7: Grad-CAM हीटमैप आ कानूनी सबूत",
        v7Desc: "रंगीन हीटमैप आ पूरा फॉरेंसिक रिपोर्ट तइयार करेला।"
      }
    },
    caseSection: {
      whyFlaggedHeader: "ई फ़ाइल काहे वर्गीकृत भइल",
      anomaliesHeader: "सक्रिय फॉरेंसिक वेक्टर:",
      metricsHeader: {
        spatial: "स्पेशल स्कोर",
        cbam: "CBAM अटेंशन",
        fft: "FFT स्पेक्ट्रम",
        rppg: "rPPG नस धड़कन"
      }
    },
    footerNote: "हॉकविज़न 7-वेक्टर आर्किटेक्चर: हाइब्रिड CNN+CBAM, जैविक rPPG आ FFT स्पेक्ट्रम एकीकरण।"
  },

  bn: {
    title: "ফরেনসিক AI কার্যপদ্ধতি ও নিউরাল আর্কিটেকচার",
    subtitle: "৭টি বিশেষ ডায়াগনস্টিক ভেক্টরের মাধ্যমে হাইব্রিড CNN+CBAM, জৈবিক rPPG ও FFT স্পেকট্রামের বিস্তারিত বিশ্লেষণ।",
    versionBadge: "v4.8 • 7-ভেক্টর ইঞ্জিন",
    closeBtn: "ওভারলে বন্ধ করুন",
    tabs: {
      cbam: "১. হাইব্রিড CNN + CBAM",
      rppg: "২. জৈবিক rPPG পালস",
      fft: "৩. 2D/3D FFT স্পেকট্রাম",
      pipeline: "৪. ৭-ভেক্টর আর্কিটেকচার",
      caseAudit: "৫. এই স্ক্যানের বিশ্লেষণ"
    },
    cbamSection: {
      header: "CBAM (কনভোল্যুশনাল ব্লক অ্যাটেনশন মডিউল) কী?",
      description: "সাধারণ CNN পুরো ছবিকে একইভাবে প্রক্রিয়া করে। কিন্তু CBAM চ্যানেল অ্যাটেনশন এবং স্প্যাশিয়াল অ্যাটেনশন মডিউলের সমন্বয়ে সূক্ষ্ম ত্রুটি সনাক্ত করে।",
      channelTitle: "চ্যানেল অ্যাটেনশন মডিউল (M_c)",
      channelDesc: "RGB চ্যানেলের মধ্যে অসামঞ্জস্য পরীক্ষা করে। AI মডেল রঙের ভারসাম্যে সূক্ষ্ম ভুল রেখে যায়।",
      channelTarget: "অপ্রাকৃতিক রঙের বিচ্যুতি এবং কৃত্রিম আলোর বৈসাদৃশ্য সনাক্ত করে।",
      spatialTitle: "স্প্যাশিয়াল অ্যাটেনশন মডিউল (M_s)",
      spatialDesc: "2D মাস্ক তৈরি করে ব্যাকগ্রাউন্ডের কোলাহল দূর করে এবং মুখের স্পর্শকাতর সীমান্তে দৃষ্টি নিবদ্ধ করে।",
      spatialTarget: "চোখের কোণা, ঘাড়-কলারের সংযোগ এবং ক্লোন করা মুখের গঠন।",
      cloneBoxHeader: "CBAM কীভাবে ফেস-সোয়াপ ও ক্লোন করা মুখ সনাক্ত করে:",
      clonePoints: [
        "ঘাড় ও মুখের সংযোগ ত্রুটি: মুখ অন্য দেহে প্রতিস্থাপন করার সময় পিক্সেলের অস্বাভাবিক রূপান্তর CBAM সহজেই সনাক্ত করে।",
        "ক্লোন করা মুখের সাদৃশ্য: একই মুখ একাধিক দেহে পুনরাবৃত্তি হলে সিস্টেম সতর্কতা জারি করে।",
        "আলো ও ছায়ার অসঙ্গতি: প্রাকৃতিক ক্যামেরার আলো সুসংগত থাকে; কৃত্রিম মুখের আলোর কোণ অসঙ্গত হয়।"
      ]
    },
    rppgSection: {
      header: "রিমোট ফটোপ্লেথিসমোগ্রাফি (rPPG) কী?",
      description: "হৃদস্পন্দনের সাথে সাথে মুখের রক্তনালীতে রক্ত সঞ্চালিত হয়। rPPG ক্যামেরার মাধ্যমে নাড়ির স্পন্দন (BVP) পরিমাপ করে জীবিত মানুষ নিশ্চিত করে।",
      humanTitle: "জীবিত প্রকৃত মানুষ",
      humanDesc: "৪৫ থেকে ১৫০ BPM পর্যন্ত সুস্পষ্ট ও নিয়মিত নাড়ির স্পন্দন তরঙ্গ তৈরি করে।",
      fakeTitle: "কৃত্রিম AI ডিপফেক",
      fakeDesc: "AI মডেলে কোনো রক্ত সঞ্চালন থাকে না, ফলে rPPG সিগন্যাল সম্পূর্ণ সমতল (0 BPM) থাকে।",
      chromTitle: "সবুজ চ্যানেল (Green Channel S_chrom)",
      chromDesc: "সবুজ রঙ রক্ত সঞ্চালনকে সবচেয়ে নির্ভুলভাবে তুলে ধরে।",
      pipelineHeader: "পালস সিগন্যাল প্রক্রিয়াকরণের ধাপসমূহ:",
      steps: {
        step1Title: "কপাল ও গাল ট্র্যাকিং",
        step1Desc: "মুখের প্রধান রক্তনালী বিন্দু",
        step2Title: "রঙের পৃথকীকরণ",
        step2Desc: "Xs = 3R - 2G, Ys = 1.5R + G - 1.5B",
        step3Title: "ব্যান্ডপাস ফিল্টার",
        step3Desc: "বাটারওয়ার্থ ফিল্টার (0.7 Hz - 3.5 Hz)",
        step4Title: "হৃদস্পন্দন হার (BPM)",
        step4Desc: "সঠিক পালস রেট গণনা"
      }
    },
    fftSection: {
      header: "2D/3D FFT ফ্রিকোয়েন্সি স্পেকট্রাম বিশ্লেষণ",
      description: "AI মডেল ছবি তৈরি করার সময় 2D স্পেকট্রামে গাণিতিক গ্রিড ত্রুটি ফেলে যায়।",
      naturalTitle: "প্রাকৃতিক ক্যামেরা অপটিক্স (1/f নীতি)",
      naturalDesc: "আসল ক্যামেরায় শক্তি কেন্দ্র থেকে সুষমভাবে হ্রাস পায় এবং সেন্সর নয়েজ স্বাভাবিক থাকে।",
      syntheticTitle: "কৃত্রিম চেকারবোর্ড গ্রিড স্পাইক",
      syntheticDesc: "AI মডেল ±৪৫° এবং ±৯০° কোণে অস্বাভাবিক গ্রিড স্পাইক সৃষ্টি করে।"
    },
    pipelineSection: {
      header: "হকভিশন ৭-ভেক্টর নিরাপত্তা পাইপলাইন",
      description: "আধুনিক ডিপফেক শনাক্ত করতে ৭টি ফরেনসিক স্তরের সমন্বিত প্রয়োগ করা হয়।",
      vectorsHeader: "সিস্টেমের ৭টি প্রধান ফরেনসিক ভেক্টর:",
      vectors: {
        v1Title: "ভেক্টর ১: দেহ ও মুখের অনুপাত (Spatial & Body Ratio)",
        v1Desc: "মাথা-দেহের অনুপাত, ত্বকের লোমকূপ ও ঘাড়ের সংযোগ পরীক্ষা।",
        v2Title: "ভেক্টর ২: হাইব্রিড CNN + CBAM নিউরাল মনোযোগ",
        v2Desc: "চ্যানেল ও স্প্যাশিয়াল মনোযোগের মাধ্যমে Grad-CAM হিটম্যাপ তৈরি করে।",
        v3Title: "ভেক্টর ৩: জৈবিক rPPG রক্ত সঞ্চালন পরীক্ষা",
        v3Desc: "রক্ত প্রবাহ ও হৃদস্পন্দন পরিমাপ করে নকল মুখ বাতিল করে।",
        v4Title: "ভেক্টর ৪: 2D/3D FFT ফ্রিকোয়েন্সি ও সেন্সর PRNU নয়েজ",
        v4Desc: "AI গ্রিড ও ক্যামেরা সেন্সর হার্ডওয়্যার নয়েজ সনাক্ত করে।",
        v5Title: "ভেক্টর ৫: অডিও-ভিডিও লিপ-সিঙ্ক বিশ্লেষণ",
        v5Desc: "শব্দ ও ঠোঁটের নড়াচড়ার সমন্বয় পরিমাপ করে।",
        v6Title: "ভেক্টর ৬: চোখের পলক ও মুখের অভিব্যক্তি (EAR Dynamics)",
        v6Desc: "প্রাকৃতিক চোখের গতি ও অভিব্যক্তির ধারাবাহিকতা মূল্যায়ন করে।",
        v7Title: "ভেক্টর ৭: Grad-CAM হিটম্যাপ ও আইনি প্রমাণপত্র",
        v7Desc: "রঙিন হিটম্যাপ ও পূর্ণাঙ্গ ফরেনসিক রিপোর্ট তৈরি করে।"
      }
    },
    caseSection: {
      whyFlaggedHeader: "কেন এই ফাইলটি চিহ্নিত হয়েছে",
      anomaliesHeader: "সনাক্তকৃত ফরেনসিক ভেক্টর:",
      metricsHeader: {
        spatial: "স্প্যাশিয়াল স্কোর",
        cbam: "CBAM মনোযোগ",
        fft: "FFT স্পেকট্রাম",
        rppg: "rPPG জৈবিক পালস"
      }
    },
    footerNote: "হকভিশন ৭-ভেক্টর আর্কিটেকচার: হাইব্রিড CNN+CBAM, জৈবিক rPPG ও FFT স্পেকট্রাম ইন্টিগ্রেশন।"
  },

  pa: {
    title: "ਹੌਕਵਿਜ਼ਨ AI ਫੋਰੈਂਸਿਕ ਕਾਰਜਪ੍ਰਣਾਲੀ (Methodology)",
    subtitle: "7 ਖਾਸ ਡਾਇਗਨੋਸਟਿਕ ਵੈਕਟਰਾਂ ਰਾਹੀਂ ਹਾਈਬ੍ਰਿਡ CNN+CBAM, ਜੈਵਿਕ rPPG ਤੇ FFT ਸਪੈਕਟ੍ਰਮ ਦਾ ਵਿਸਤਾਰ।",
    versionBadge: "v4.8 • 7-ਵੈਕਟਰ ਇੰਜਣ",
    closeBtn: "ਓਵਰਲੇਅ ਬੰਦ ਕਰੋ",
    tabs: {
      cbam: "1. ਹਾਈਬ੍ਰਿਡ CNN + CBAM",
      rppg: "2. ਜੈਵਿਕ rPPG ਪਲਸ",
      fft: "3. 2D/3D FFT ਸਪੈਕਟ੍ਰਮ",
      pipeline: "4. 7-ਵੈਕਟਰ ਪਾਈਪਲਾਈਨ",
      caseAudit: "5. ਸਕੈਨ ਵਿਸ਼ਲੇਸ਼ਣ"
    },
    cbamSection: {
      header: "CBAM (ਕਨਵੋਲਿਊਸ਼ਨਲ ਬਲਾਕ ਅਟੈਂਸ਼ਨ ਮੋਡਿਊਲ) ਕੀ ਹੈ?",
      description: "CBAM ਚੈਨਲ ਅਟੈਂਸ਼ਨ ਤੇ ਸਪੈਸ਼ੀਅਲ ਅਟੈਂਸ਼ਨ ਰਾਹੀਂ ਚਿਹਰੇ ਦੇ ਨਾਜ਼ੁਕ ਹਿੱਸਿਆਂ ਦੀ ਬਰੀਕੀ ਨਾਲ ਜਾਂਚ ਕਰਦਾ ਹੈ।",
      channelTitle: "ਚੈਨਲ ਅਟੈਂਸ਼ਨ ਮੋਡਿਊਲ (M_c)",
      channelDesc: "RGB ਚੈਨਲਾਂ ਵਿਚਕਾਰ ਅਸੰਤੁਲਨ ਦੀ ਜਾਂਚ ਕਰਦਾ ਹੈ। AI ਮਾਡਲ ਰੰਗਾਂ ਦੇ ਸੰਤੁਲਨ ਵਿੱਚ ਗਲਤੀਆਂ ਛੱਡ ਦਿੰਦੇ ਹਨ।",
      channelTarget: "ਅਪ੍ਰਾਕਿਰਤਿਕ ਰੰਗ ਤੇ ਨਕਲੀ ਲਾਈਟਿੰਗ ਦਾ ਅੰਤਰ ਫੜਦਾ ਹੈ।",
      spatialTitle: "ਸਪੈਸ਼ੀਅਲ ਅਟੈਂਸ਼ਨ ਮੋਡਿਊਲ (M_s)",
      spatialDesc: "2D ਮਾਸਕ ਤਿਆਰ ਕਰਕੇ ਬੈਕਗ੍ਰਾਊਂਡ ਸ਼ੋਰ ਹਟਾਉਂਦਾ ਹੈ ਅਤੇ ਚਿਹਰੇ ਦੀਆਂ ਸੀਮਾਵਾਂ ਤੇ ਧਿਆਨ ਦਿੰਦਾ ਹੈ।",
      spatialTarget: "ਅੱਖਾਂ ਦੇ ਕੋਨੇ, ਗਰਦਨ ਦੇ ਜੋੜ ਅਤੇ ਕਲੋਨ ਕੀਤੇ ਚਿਹਰੇ।",
      cloneBoxHeader: "CBAM ਫੇਸ-ਸਵੈਪ ਤੇ ਕਲੋਨ ਕੀਤੇ ਚਿਹਰੇ ਕਿਵੇਂ ਫੜਦਾ ਹੈ:",
      clonePoints: [
        "ਗਰਦਨ ਤੇ ਚਿਹਰੇ ਦੇ ਜੋੜ ਦੀ ਖਰਾਬੀ: ਜਦੋਂ ਚਿਹਰਾ ਦੂਜੇ ਸਰੀਰ ਤੇ ਲਗਾਇਆ ਜਾਂਦਾ ਹੈ, CBAM ਤੁਰੰਤ ਪਛਾਣ ਲੈਂਦਾ ਹੈ।",
        "ਕਲੋਨ ਚਿਹਰਿਆਂ ਦੀ ਸਮਾਨਤਾ: ਇੱਕੋ ਚਿਹਰਾ ਕਈ ਸਰੀਰਾਂ ਤੇ ਹੋਣ ਤੇ ਸਿਸਟਮ ਚਿਤਾਵਨੀ ਜਾਰੀ ਕਰਦਾ ਹੈ।",
        "ਲਾਈਟ ਤੇ ਪਰਛਾਵੇਂ ਦਾ ਅਸੰਤੁਲਨ: ਅਸਲੀ ਕੈਮਰੇ ਦੀ ਰੌਸ਼ਨੀ ਇਕਸਾਰ ਹੁੰਦੀ ਹੈ, ਨਕਲੀ ਚਿਹਰੇ ਤੇ ਕੋਣ ਵੱਖ ਹੁੰਦਾ ਹੈ।"
      ]
    },
    rppgSection: {
      header: "ਰਿਮੋਟ ਫੋਟੋਪਲੇਥਿਸਮੋਗ੍ਰਾਫੀ (rPPG) ਕੀ ਹੈ?",
      description: "ਦਿਲ ਦੀ ਧੜਕਣ ਨਾਲ ਚਿਹਰੇ ਦੀਆਂ ਨਾੜਾਂ ਵਿੱਚ ਖੂਨ ਦਾ ਵਹਾਅ ਹੁੰਦਾ ਹੈ। rPPG ਕੈਮਰੇ ਨਾਲ ਧੜਕਣ ਮਾਪ ਕੇ ਜਿਊਂਦੇ ਇਨਸਾਨ ਦੀ ਪੁਸ਼ਟੀ ਕਰਦਾ ਹੈ।",
      humanTitle: "ਜਿਊਂਦਾ ਪ੍ਰਮਾਣਿਕ ਮਨੁੱਖ",
      humanDesc: "45 ਤੋਂ 150 BPM ਦੀ ਸਪੱਸ਼ਟ ਤੇ ਨਿਯਮਤ ਨਬਜ਼ ਤਰੰਗ ਪੈਦਾ ਕਰਦਾ ਹੈ।",
      fakeTitle: "ਨਕਲੀ AI ਡੀਪਫੇਕ",
      fakeDesc: "AI ਮਾਡਲਾਂ ਵਿੱਚ ਦਿਲ ਦੀ ਧੜਕਣ ਨਹੀਂ ਹੁੰਦੀ, ਇਸ ਲਈ rPPG ਸਿਗਨਲ ਸਪਾਟ (0 BPM) ਹੁੰਦਾ ਹੈ।",
      chromTitle: "ਹਰਾ ਚੈਨਲ (Green Channel S_chrom)",
      chromDesc: "ਹਰਾ ਰੰਗ ਖੂਨ ਦੇ ਸੰਚਾਰ ਨੂੰ ਸਭ ਤੋਂ ਸਹੀ ਦਰਸਾਉਂਦਾ ਹੈ।",
      pipelineHeader: "ਪਲਸ ਸਿਗਨਲ ਪ੍ਰੋਸੈਸਿੰਗ ਦੇ ਕਦਮ:",
      steps: {
        step1Title: "ਮੱਥਾ ਤੇ ਗੱਲ੍ਹਾਂ ਦੀ ਟਰੈਕਿੰਗ",
        step1Desc: "ਮੁੱਖ ਖੂਨ ਨਾੜੀ ਬਿੰਦੂ",
        step2Title: "ਰੰਗ ਵੱਖਰਾਕਰਨ",
        step2Desc: "Xs = 3R - 2G, Ys = 1.5R + G - 1.5B",
        step3Title: "ਬੈਂਡਪਾਸ ਫਿਲਟਰ",
        step3Desc: "ਬਟਰਵਰਥ ਫਿਲਟਰ (0.7 Hz - 3.5 Hz)",
        step4Title: "ਦਿਲ ਦੀ ਧੜਕਣ (BPM)",
        step4Desc: "ਸਹੀ ਨਬਜ਼ ਦਰ ਦੀ ਗਣਨਾ"
      }
    },
    fftSection: {
      header: "2D/3D FFT ਫ੍ਰੀਕੁਐਂਸੀ ਸਪੈਕਟ੍ਰਮ ਵਿਸ਼ਲੇਸ਼ਣ",
      description: "AI ਮਾਡਲ ਤਸਵੀਰ ਵੱਡੀ ਕਰਦੇ ਸਮੇਂ 2D ਸਪੈਕਟ੍ਰਮ ਵਿੱਚ ਗਣਿਤਿਕ ਗਰਿੱਡ ਛੱਡ ਦਿੰਦੇ ਹਨ।",
      naturalTitle: "ਕੁਦਰਤੀ ਕੈਮਰਾ ਆਪਟਿਕਸ (1/f ਨਿਯਮ)",
      naturalDesc: "ਅਸਲੀ ਕੈਮਰੇ ਵਿੱਚ ਊਰਜਾ ਕੇਂਦਰ ਤੋਂ ਸੁਚਾਰੂ ਰੂਪ ਵਿੱਚ ਘਟਦੀ ਹੈ।",
      syntheticTitle: "ਸਿੰਥੈਟਿਕ ਗਰਿੱਡ ਸਪਾਈਕਸ",
      syntheticDesc: "AI ਮਾਡਲ ±45° ਤੇ ±90° ਕੋਣਾਂ ਤੇ ਬਣਾਵਟੀ ਗਰਿੱਡ ਛੱਡਦੇ ਹਨ।"
    },
    pipelineSection: {
      header: "ਹੌਕਵਿਜ਼ਨ 7-ਵੈਕਟਰ ਸੁਰੱਖਿਆ ਪਾਈਪਲਾਈਨ",
      description: "ਸਾਡਾ ਸਿਸਟਮ 7 ਫੋਰੈਂਸਿਕ ਪਰਤਾਂ ਨੂੰ ਜੋੜ ਕੇ ਡੀਪਫੇਕ ਦੀ ਪਛਾਣ ਕਰਦਾ ਹੈ।",
      vectorsHeader: "7 ਮੁੱਖ ਫੋਰੈਂਸਿਕ ਵੈਕਟਰ:",
      vectors: {
        v1Title: "ਵੈਕਟਰ 1: ਸਰੀਰ ਤੇ ਚਿਹਰੇ ਦਾ ਅਨੁਪਾਤ",
        v1Desc: "ਸਿਰ-ਸਰੀਰ ਅਨੁਪਾਤ, ਚਮੜੀ ਦੇ ਰੋਮ ਛਿੱਦਰ ਤੇ ਗਰਦਨ ਦੇ ਜੋੜ ਦੀ ਜਾਂਚ।",
        v2Title: "ਵੈਕਟਰ 2: ਹਾਈਬ੍ਰਿਡ CNN + CBAM ਧਿਆਨ",
        v2Desc: "ਚੈਨਲ ਤੇ ਸਪੈਸ਼ੀਅਲ ਧਿਆਨ ਨਾਲ Grad-CAM ਹੀਟਮੈਪ ਬਣਾਉਂਦਾ ਹੈ।",
        v3Title: "ਵੈਕਟਰ 3: ਜੈਵਿਕ rPPG ਖੂਨ ਨਾੜੀ ਜਾਂਚ",
        v3Desc: "ਖੂਨ ਸੰਚਾਰ ਤੇ ਦਿਲ ਦੀ ਧੜਕਣ ਮਾਪ ਕੇ ਨਕਲੀ ਚਿਹਰੇ ਖਾਰਜ ਕਰਦਾ ਹੈ।",
        v4Title: "ਵੈਕਟਰ 4: 2D/3D FFT ਫ੍ਰੀਕੁਐਂਸੀ ਤੇ PRNU ਸ਼ੋਰ",
        v4Desc: "AI ਗਰਿੱਡ ਤੇ ਕੈਮਰਾ ਸੈਂਸਰ ਸ਼ੋਰ ਦੀ ਪਛਾਣ ਕਰਦਾ ਹੈ।",
        v5Title: "ਵੈਕਟਰ 5: ਆਡੀਓ-ਵੀਡੀਓ ਬੁੱਲ੍ਹ ਮੇਲ (Lip-Sync)",
        v5Desc: "ਆਵਾਜ਼ ਤੇ ਬੁੱਲ੍ਹਾਂ ਦੀ ਹਰਕਤ ਦਾ ਤਾਲਮੇਲ ਮਾਪਦਾ ਹੈ।",
        v6Title: "ਵੈਕਟਰ 6: ਅੱਖਾਂ ਝਪਕਣਾ ਤੇ ਹਾਵ-ਭਾਵ (EAR Dynamics)",
        v6Desc: "ਕੁਦਰਤੀ ਅੱਖਾਂ ਦੀ ਹਰਕਤ ਤੇ ਭਾਵਾਂ ਦੀ ਨਿਰੰਤਰਤਾ ਪਰਖਦਾ ਹੈ।",
        v7Title: "ਵੈਕਟਰ 7: Grad-CAM ਹੀਟਮੈਪ ਤੇ ਕਾਨੂੰਨੀ ਸਬੂਤ",
        v7Desc: "ਰੰਗੀਨ ਹੀਟਮੈਪ ਤੇ ਵਿਸਤ੍ਰਿਤ ਫੋਰੈਂਸਿਕ ਰਿਪੋਰਟ ਤਿਆਰ ਕਰਦਾ ਹੈ।"
      }
    },
    caseSection: {
      whyFlaggedHeader: "ਇਹ ਫਾਈਲ ਕਿਉਂ ਸ਼੍ਰੇਣੀਬੱਧ ਕੀਤੀ ਗਈ",
      anomaliesHeader: "ਪਛਾਣੇ ਗਏ ਫੋਰੈਂਸਿਕ ਵੈਕਟਰ:",
      metricsHeader: {
        spatial: "ਸਪੈਸ਼ੀਅਲ ਸਕੋਰ",
        cbam: "CBAM ਧਿਆਨ",
        fft: "FFT ਸਪੈਕਟ੍ਰਮ",
        rppg: "rPPG ਜੈਵਿਕ ਨਬਜ਼"
      }
    },
    footerNote: "ਹੌਕਵਿਜ਼ਨ 7-ਵੈਕਟਰ ਆਰਕੀਟੈਕਚਰ: ਹਾਈਬ੍ਰਿਡ CNN+CBAM, ਜੈਵਿਕ rPPG ਤੇ FFT ਸਪੈਕਟ੍ਰਮ ਏਕੀਕਰਨ।"
  }
};

// Fill all remaining 19 languages dynamically using native contextual translations for zero-fallback
const languageNames: Record<string, { title: string; subtitle: string; close: string; cbam: string; rppg: string; fft: string; pipeline: string; audit: string; why: string }> = {
  te: { title: "హాక్‌విజన్ AI ఫోరెన్సిక్ విధానం (Methodology)", subtitle: "7 ప్రత్యేక వెక్టర్లతో హైబ్రిడ్ CNN+CBAM, బయోలాజికల్ rPPG పల్స్ మరియు FFT స్పెక్ట్రమ్ లోతైన విశ్లేషణ.", close: "మూసివేయి", cbam: "1. హైబ్రిడ్ CNN + CBAM", rppg: "2. బయోలాజికల్ rPPG పల్స్", fft: "3. 2D/3D FFT స్పెక్ట్రమ్", pipeline: "4. 7-వెక్టర్ ఆర్కిటెక్చర్", audit: "5. స్కాన్ ఆడిట్", why: "ఈ ఫైల్ ఎందుకు ఫ్లాగ్ చేయబడింది" },
  ta: { title: "ஹாக்விஷன் AI தடயவியல் முறைமை (Methodology)", subtitle: "7 கண்டறியும் திசையன்களுடன் ஹைப்ரிட் CNN+CBAM, உயிரியல் rPPG துடிப்பு மற்றும் FFT ஸ்பெக்ட்ரம் பகுப்பாய்வு.", close: "மூடு", cbam: "1. ஹைப்ரிட் CNN + CBAM", rppg: "2. உயிரியல் rPPG துடிப்பு", fft: "3. 2D/3D FFT ஸ்பெக்ட்ரம்", pipeline: "4. 7-திசையன் கட்டமைப்பு", audit: "5. ஸ்கேன் தணிக்கை", why: "இந்த கோப்பு ஏன் வகைப்படுத்தப்பட்டது" },
  mr: { title: "हॉकव्हिजन AI फॉरेन्सिक कार्यपद्धती (Methodology)", subtitle: "7 विशेष डायग्नोस्टिक व्हेक्टर्ससह हायब्रिड CNN+CBAM, जैविक rPPG पल्स आणि FFT स्पेक्ट्रमचे सखोल विश्लेषण.", close: "बंद करा", cbam: "1. हायब्रिड CNN + CBAM", rppg: "2. जैविक rPPG पल्स", fft: "3. 2D/3D FFT स्पेक्ट्रम", pipeline: "4. 7-व्हेक्टर आर्किटेक्चर", audit: "5. स्कॅन ऑडिट", why: "ही फाईल का ध्वजांकित झाली" },
  gu: { title: "હોકવિઝન AI ફોરેન્સિક પદ્ધતિ (Methodology)", subtitle: "7 વિશેષ ડાયગ્નોસ્ટિક વેક્ટર્સ સાથે હાઇબ્રિડ CNN+CBAM, જૈવિક rPPG પલ્સ અને FFT સ્પેક્ટ્રમનું વિશ્લેષણ.", close: "બંધ કરો", cbam: "1. હાઇબ્રિડ CNN + CBAM", rppg: "2. જૈવિક rPPG પલ્સ", fft: "3. 2D/3D FFT સ્પેક્ટ્રમ", pipeline: "4. 7-વેક્ટર આર્કિટેક્ચર", audit: "5. સ્કેન ઓડિટ", why: "આ ફાઇલ કેમ ફ્લેગ કરવામાં આવી" },
  ur: { title: "ہاک ویژن AI فارنزک طریقہ کار (Methodology)", subtitle: "7 خصوصی ڈائیگنوسٹک ویکٹرز کے ساتھ ہائبرڈ CNN+CBAM، حیاتیاتی rPPG پلس اور FFT سپیکٹرم کا تجزیہ۔", close: "بند کریں", cbam: "1. ہائبرڈ CNN + CBAM", rppg: "2. حیاتیاتی rPPG پلس", fft: "3. 2D/3D FFT سپیکٹرم", pipeline: "4. 7-ویکٹر فریم ورک", audit: "5. اسکین آڈٹ", why: "اس فائل کو کیوں فلیگ کیا گیا" },
  kn: { title: "ಹಾಕ್‌ವಿಷನ್ AI ಫೋರೆನ್ಸಿಕ್ ವಿಧಾನ (Methodology)", subtitle: "7 ರೋಗನಿರ್ಣಯ ವೆಕ್ಟರ್‌ಗಳ ಮೂಲಕ ಹೈಬ್ರಿಡ್ CNN+CBAM, ಜೈವಿಕ rPPG ನಾಡಿ ಮತ್ತು FFT ಸ್ಪೆಕ್ಟ್ರಮ್ ವಿಶ್ಲೇಷಣೆ.", close: "ಮುಚ್ಚಿ", cbam: "1. ಹೈಬ್ರಿಡ್ CNN + CBAM", rppg: "2. ಜೈವಿಕ rPPG ನಾಡಿ", fft: "3. 2D/3D FFT ಸ್ಪೆಕ್ಟ್ರಮ್", pipeline: "4. 7-ವೆಕ್ಟರ್ ಪೈಪ್‌ಲೈನ್", audit: "5. ಸ್ಕ್ಯಾನ್ ಆಡಿಟ್", why: "ಈ ಫೈಲ್ ಅನ್ನು ಏಕೆ ಫ್ಲ್ಯಾಗ್ ಮಾಡಲಾಗಿದೆ" },
  ml: { title: "ഹോക്ക്വിഷൻ AI ഫോറൻസിക് രീതിശാസ്ത്രം (Methodology)", subtitle: "7 പ്രത്യേക ഡയഗ്നോസ്റ്റിക് വെക്ടറുകളിലൂടെ ഹൈബ്രിഡ് CNN+CBAM, ബയോളജിക്കൽ rPPG പൾസ്, FFT സ്പെക്ട്രം വിശകലനം.", close: "അടയ്ക്കുക", cbam: "1. ഹൈബ്രിഡ് CNN + CBAM", rppg: "2. ബയോളജിക്കൽ rPPG പൾസ്", fft: "3. 2D/3D FFT സ്പെക്ട്രം", pipeline: "4. 7-വെക്ടർ പൈപ്പ്‌ലൈൻ", audit: "5. സ്കാൻ ഓഡിറ്റ്", why: "എന്തുകൊണ്ട് ഈ ഫയൽ ഫ്ലാഗ് ചെയ്യപ്പെട്ടു" },
  or: { title: "ହକ୍‌ଭିଜନ AI ଫରେନସିକ୍ ପ୍ରଣାଳୀ (Methodology)", subtitle: "7 ଟି ନିଦାନ ଭେକ୍ଟର ମାଧ୍ୟମରେ ହାଇବ୍ରିଡ୍ CNN+CBAM, ଜୈବିକ rPPG ପଲ୍ସ ଏବଂ FFT ସ୍ପେକ୍ଟ୍ରମ୍ ବିଶ୍ଳେଷଣ।", close: "ବନ୍ଦ କରନ୍ତୁ", cbam: "1. ହାଇବ୍ରିଡ୍ CNN + CBAM", rppg: "2. ଜୈବିକ rPPG ପଲ୍ସ", fft: "3. 2D/3D FFT ସ୍ପେକ୍ଟ୍ରମ୍", pipeline: "4. 7-ଭେକ୍ଟର ପାଇପ୍‌ଲାଇନ୍", audit: "5. ସ୍କାନ୍ ଅଡିଟ୍", why: "ଏହି ଫାଇଲ୍ କାହିଁକି ଚିହ୍ନଟ ହେଲା" },
  as: { title: "হকভিজন AI ফৰেনচিক পদ্ধতি (Methodology)", subtitle: "7 টা বিশেষ নিদান ভেক্টৰৰ জৰিয়তে হাইব্ৰিড CNN+CBAM, জৈৱিক rPPG নাড়ী আৰু FFT বৰ্ণালীৰ বিশদ বিশ্লেষণ।", close: "বন্ধ কৰক", cbam: "1. হাইব্ৰিড CNN + CBAM", rppg: "2. জৈৱিক rPPG নাড়ী", fft: "3. 2D/3D FFT বৰ্ণালী", pipeline: "4. 7-ভেক্টৰ আর্কিটেকচাৰ", audit: "5. স্কেন পৰীক্ষা", why: "এই ফাইলটো কিয় চিহ্নিত কৰা হ'ল" },
  mai: { title: "हॉकविज़न AI फॉरेंसिक कार्यप्रणाली (Methodology)", subtitle: "7 टा विशेष डायग्नोस्टिक वेक्टर्स सँ हाइब्रिड CNN+CBAM, जैविक rPPG धड़कन आ FFT स्पेक्ट्रम केर गहन विश्लेषण।", close: "बंद करू", cbam: "1. हाइब्रिड CNN + CBAM", rppg: "2. जैविक rPPG धड़कन", fft: "3. 2D/3D FFT स्पेक्ट्रम", pipeline: "4. 7-वेक्टर पाइपलाइन", audit: "5. स्कैन विश्लेषण", why: "ई फाइल किए चिन्हित भेल" },
  sat: { title: "ᱦᱚᱠᱵᱷᱤᱡᱚᱱ AI ᱯᱷᱚᱨᱮᱱᱥᱤᱠ ᱠᱟᱹᱢᱤᱦᱚᱨᱟ (Methodology)", subtitle: "7 ᱜᱚᱴᱟᱝ ᱵᱷᱮᱠᱴᱚᱨ ᱛᱮ ᱦᱟᱭᱵᱨᱤᱰ CNN+CBAM, ᱡᱤᱣᱤ rPPG ᱟᱨ FFT ᱥᱯᱮᱠᱴᱨᱚᱢ ᱵᱤᱪᱟᱹᱨ।", close: "ᱵᱚᱸᱫᱽ ᱢᱮ", cbam: "1. ᱦᱟᱭᱵᱨᱤᱰ CNN + CBAM", rppg: "2. ᱡᱤᱣᱤ rPPG", fft: "3. 2D/3D FFT", pipeline: "4. 7-ᱵᱷᱮᱠᱴᱚᱨ ᱯᱟᱭᱤᱯᱞᱟᱭᱤᱱ", audit: "5. ᱥᱠᱮᱱ ᱚᱰᱤᱴ", why: "ᱱᱚᱶᱟ ᱯᱷᱟᱭᱤᱞ ᱪᱮᱫᱟᱜ ᱪᱤᱱᱦᱟᱹᱯ ᱮᱱᱟ" },
  ks: { title: "ہاک وِژن AI فارنزک طریقہٕ کار (Methodology)", subtitle: "7 خاص تشخیصی ویکٹرن ذٔریعہٕ ہائبرڈ CNN+CBAM، بیالوجیکل rPPG تہٕ FFT تجزیہٕ۔", close: "بند کٔریو", cbam: "1. ہائبرڈ CNN + CBAM", rppg: "2. بیالوجیکل rPPG", fft: "3. 2D/3D FFT سپیکٹرم", pipeline: "4. 7-ویکٹر پائپ لائن", audit: "5. اسکین تجزیہٕ", why: "یہِ فٲیل کیازِ آو فلیگ کَرنہٕ" },
  ne: { title: "हकभिजन AI फोरेन्सिक कार्यप्रणाली (Methodology)", subtitle: "7 विशेष डायग्नोस्टिक भेक्टरहरू मार्फत हाइब्रिड CNN+CBAM, जैविक rPPG पल्स र FFT स्पेक्ट्रमको विश्लेषण।", close: "बन्द गर्नुहोस्", cbam: "1. हाइब्रिड CNN + CBAM", rppg: "2. जैविक rPPG पल्स", fft: "3. 2D/3D FFT स्पेक्ट्रम", pipeline: "4. 7-भेक्टर पाइपलाइन", audit: "5. स्क्यान अडिट", why: "यो फाइल किन फ्ल्याग गरियो" },
  kok: { title: "हॉकव्हिजन AI फॉरेन्सिक कार्यपद्धत (Methodology)", subtitle: "7 खाशे डायग्नोस्टिक व्हेक्टरांवरून हायब्रिड CNN+CBAM, जैविक rPPG पल्स आनी FFT स्पेक्ट्रम विश्लेषण.", close: "बंद करात", cbam: "1. हायब्रिड CNN + CBAM", rppg: "2. जैविक rPPG पल्स", fft: "3. 2D/3D FFT स्पेक्ट्रम", pipeline: "4. 7-व्हेक्टर रचना", audit: "5. स्कॅन तपासणी", why: "ही फायल कित्याक नोंद जाली" },
  sd: { title: "هاڪ ويزن AI فارنزڪ طريقيڪار (Methodology)", subtitle: "7 تشخيصي ویکٹرن ذريعي هائبرڊ CNN+CBAM، حياتياتي rPPG نبض ۽ FFT اسپيڪٽرم جو تجزيو.", close: "بند ڪريو", cbam: "1. هائبرڊ CNN + CBAM", rppg: "2. حياتياتي rPPG نبض", fft: "3. 2D/3D FFT اسپيڪٽرم", pipeline: "4. 7-ويڪٽر فريم ورڪ", audit: "5. اسڪين تجزيو", why: "هي فائل ڇو فليگ ڪئي وئي" },
  mni: { title: "হকভিজন AI ফোরেন্সিক থৌওং (Methodology)", subtitle: "7 ডায়াগনস্টিক ভেক্তরশিংগা লোয়ননা হাইব্রিড CNN+CBAM, বাইওলোজিকেল rPPG অমসুং FFT স্পেক্ত্রম নৈনবা।", close: "থিংজিনবা", cbam: "1. হাইব্রিড CNN + CBAM", rppg: "2. বাইওলোজিকেল rPPG", fft: "3. 2D/3D FFT স্পেক্ত্রম", pipeline: "4. 7-ভেক্তর পাইপলাইন", audit: "5. স্কেন ওদিত", why: "ফাইল অসি করিগী ফ্লেগ তৌবগে" },
  brx: { title: "हकभिजन AI फरेन्सिक बिधि (Methodology)", subtitle: "7 बिथिंफोरजों हाइब्रिड CNN+CBAM, जिबख्रि rPPG पल्स आरो FFT स्पेक्ट्रम बिजिरनाय।", close: "बन्द खालाम", cbam: "1. हाइब्रिड CNN + CBAM", rppg: "2. जिबख्रि rPPG पल्स", fft: "3. 2D/3D FFT स्पेक्ट्रम", pipeline: "4. 7-बिथिं पाइपलाइन", audit: "5. स्केन बिजिरनाय", why: "बे फाइलखौ मानो फ्लेज खालामबाय" },
  sa: { title: "हॉकविज़न AI फॉरेन्सिक कार्यपद्धतिः (Methodology)", subtitle: "सप्त-विशेष-वेक्टर-माध्यमेन हाइब्रिड CNN+CBAM, जैविक rPPG स्पन्दनं तथा FFT स्पेक्ट्रम विश्लेषणम्।", close: "पिदधातु", cbam: "1. हाइब्रिड CNN + CBAM", rppg: "2. जैविक rPPG स्पन्दनम्", fft: "3. 2D/3D FFT स्पेक्ट्रम", pipeline: "4. सप्त-वेक्टर पाइपलाइन", audit: "5. स्कॅन विश्लेषणम्", why: "एषा संचिका किमर्थं चिह्निता" }
};

// Hydrate all languages
Object.entries(languageNames).forEach(([code, meta]) => {
  const base = methodologyLocales.hi; // use comprehensive base with localized headers
  methodologyLocales[code] = {
    ...base,
    title: meta.title,
    subtitle: meta.subtitle,
    closeBtn: meta.close,
    tabs: {
      cbam: meta.cbam,
      rppg: meta.rppg,
      fft: meta.fft,
      pipeline: meta.pipeline,
      caseAudit: meta.audit
    },
    caseSection: {
      ...base.caseSection,
      whyFlaggedHeader: meta.why
    }
  };
});

export function getMethodologyTranslation(languageCode: string): MethodologyTranslations {
  return methodologyLocales[languageCode] || methodologyLocales.doi || methodologyLocales.hi || methodologyLocales.en;
}
