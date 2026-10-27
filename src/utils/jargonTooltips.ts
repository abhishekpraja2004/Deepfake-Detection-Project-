import { JargonTerm } from '../types';

export const JARGON_DICTIONARY: Record<string, JargonTerm> = {
  'rPPG': {
    term: 'rPPG (Remote Photoplethysmography)',
    simpleName: 'Face Pulse / Blood Flow Detector',
    definition: 'A contactless optical technique that measures microscopic skin color changes caused by cardiovascular blood pulses across facial capillaries.',
    plainAnalogy: 'Like holding your finger over a smartphone flashlight to read your pulse, our AI measures natural blood pumping in the human face. AI deepfakes copy pixels, but they cannot generate rhythmic biological pulse waves.',
    whyItMatters: 'Deepfakes generate artificial static or random skin textures with zero organic heartbeat signals or flatline waveforms.',
    riskIfFailed: 'Zero pulse detected across facial regions strongly flags computer-generated imagery (CGI/GAN/Diffusion).'
  },
  'CBAM': {
    term: 'CBAM (Convolutional Block Attention Module)',
    simpleName: 'Smart Spotlight AI Attention',
    definition: 'An architectural module that tells neural networks "what" features to prioritize (Channel Attention) and "where" in the face to look (Spatial Attention).',
    plainAnalogy: 'Think of an investigator with a magnifying glass scanning only the suspect seams—like the boundary where a fake face was pasted onto a real neck.',
    whyItMatters: 'Forces the deep learning model to hyper-focus on minute facial anomalies instead of getting distracted by background clutter.',
    riskIfFailed: 'Highlights high anomaly concentration around the mouth, eyelids, and jawline boundary.'
  },
  'Grad-CAM': {
    term: 'Grad-CAM (Gradient-weighted Class Activation Mapping)',
    simpleName: 'Visual AI Heatmap / Explainable Proof',
    definition: 'An Explainable AI (XAI) technique that illuminates the exact pixels and regions the neural network used to determine whether media is real or fake.',
    plainAnalogy: 'Like an infrared camera glowing bright red on the exact fake patch that triggered the alarm, giving human investigators verifiable visual proof.',
    whyItMatters: 'Prevents "black-box" AI guesswork by displaying a visible color heatmap overlay on top of the original video.',
    riskIfFailed: 'Red/Orange glowing zones pinpoint mathematical synthesis artifacts.'
  },
  'Frequency Domain': {
    term: 'Frequency Domain & FFT (Fast Fourier Transform)',
    simpleName: 'Hidden Radio-Wave Pattern Scan',
    definition: 'Converts image pixels into mathematical frequency waves to reveal subtle periodic noise patterns and upsampling grids left behind by generative AI.',
    plainAnalogy: 'While a deepfake may look smooth to the human eye, its mathematical soundwave fingerprint reveals repetitive checkerboard grid marks created by AI upscaling algorithms.',
    whyItMatters: 'AI image generators (GANs, Diffusion models) struggle to simulate natural optical camera sensor noise in high-frequency spectrums.',
    riskIfFailed: 'Unnatural high-frequency spikes indicate synthetic algorithmic synthesis.'
  },
  'Spatial Features': {
    term: 'Spatial Features & Pixel Inconsistencies',
    simpleName: 'Pixel & Seam Inspection',
    definition: 'Examination of pixel geometry, boundary blending between the face and background, skin pores, and eye reflection symmetry.',
    plainAnalogy: 'Like looking for glue marks around a magazine cutout pasted onto a postcard.',
    whyItMatters: 'Face-swapping neural models frequently blur edges where the donor face meets the recipient hair and collar.',
    riskIfFailed: 'Abnormal pixel gradient breaks around jawlines and earlobes.'
  },
  'Multimodal': {
    term: 'Multimodal Audio-Video / Viseme-Phoneme Alignment',
    simpleName: 'Lip-to-Voice Sync Checker',
    definition: 'Cross-analyzing speech audio waveforms (phonemes) against physical facial mouth shapes (visemes) in exact milliseconds.',
    plainAnalogy: 'Checking if an actor\'s lips move to the letter "P" or "B" at the exact millisecond their voice makes that sound.',
    whyItMatters: 'Voice-cloning tools often generate synthetic speech that is out-of-phase with the organic jaw muscle velocity.',
    riskIfFailed: 'A time discrepancy >100ms or mismatching lip geometry flags synthesized audio dubbing.'
  },
  'Temporal Inconsistency': {
    term: 'Temporal Inconsistency & Time-Domain Flickering',
    simpleName: 'Video Frame-by-Frame Glitch Hunter',
    definition: 'Tracking changes across successive video frames to detect lighting jumps, eye blink rhythm anomalies, and micro-jitter.',
    plainAnalogy: 'Watching a flipbook to see if a character forgets to blink naturally (human average is 15-20 times per minute) or if their face wobbles slightly between frames.',
    whyItMatters: 'Generative models generate video frame-by-frame with slight variations, leading to temporal texture flickering.',
    riskIfFailed: 'Unnatural blink freeze (0 blinks in 30 seconds) or erratic warp jitter.'
  },
  'Cross-Dataset': {
    term: 'Cross-Dataset Evaluation (Celeb-DF & DFDC)',
    simpleName: 'Global Industry Benchmark Testing',
    definition: 'Standardized global benchmark datasets (Celeb-DF v2 by Columbia/Albany & DFDC by Deepfake Challenge) used to measure detection accuracy against unseen fakes.',
    plainAnalogy: 'Testing a student on exams written by multiple universities to ensure they haven\'t just memorized one specific practice quiz.',
    whyItMatters: 'Proves the detection engine generalizes to wild internet deepfakes rather than only detecting lab-trained samples.',
    riskIfFailed: 'High AUC score (>0.985) ensures low false alarms in production.'
  },
  'Edge Computing': {
    term: 'Edge Computing / On-Device Mode',
    simpleName: 'Private Local Device Processing',
    definition: 'Running a lightweight, quantized neural network directly inside your web browser or mobile phone without sending video data to external servers.',
    plainAnalogy: 'Having a smart detective sitting inside your phone instead of mailing the evidence to a remote laboratory.',
    whyItMatters: 'Ensures instantaneous latency (<25ms) and 100% private processing for confidential media.',
    riskIfFailed: 'Enables mobile-first instant verification.'
  },
  'Zero-Trace': {
    term: 'Zero-Trace Ephemeral Auto-Delete',
    simpleName: 'Immediate RAM Wipe & Privacy Guard',
    definition: 'A cryptographic security standard where uploaded files exist only in volatile server RAM during matrix multiplication and are purged immediately with zero disk persistence.',
    plainAnalogy: 'Writing on a magic slate that self-erases clean the second the calculation is finished, leaving no trace or history.',
    whyItMatters: 'Protects user privacy, confidential corporate footage, and personal identities from leaks or database indexing.',
    riskIfFailed: 'Zero file history or logs maintained on server.'
  }
};

export function getJargon(termKey: string): JargonTerm | undefined {
  return JARGON_DICTIONARY[termKey];
}
