/**
 * Browser-side PCM WAV Synthesizer for HawkSpectra
 * Generates genuine playable .wav audio buffers for testing:
 * 1. AI Cloned Voice (HiFi-GAN neural vocoder, robotic pitch quantization, high-frequency checkerboard harmonics)
 * 2. Natural Human Speech (Natural vocal tract formants, F0 micro-jitter, breathing dynamics)
 */

function encodeWAV(samples: Float32Array, sampleRate = 44100): Blob {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  // Helper to write string to DataView
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  /* RIFF identifier */
  writeString(0, 'RIFF');
  /* file length */
  view.setUint32(4, 36 + samples.length * 2, true);
  /* RIFF type */
  writeString(8, 'WAVE');
  /* format chunk identifier */
  writeString(12, 'fmt ');
  /* format chunk length */
  view.setUint32(16, 16, true);
  /* sample format (raw PCM) */
  view.setUint16(20, 1, true);
  /* channel count (mono) */
  view.setUint16(22, 1, true);
  /* sample rate */
  view.setUint32(24, sampleRate, true);
  /* byte rate (sampleRate * 2) */
  view.setUint32(28, sampleRate * 2, true);
  /* block align (channel count * bytes per sample) */
  view.setUint16(32, 2, true);
  /* bits per sample */
  view.setUint16(34, 16, true);
  /* data chunk identifier */
  writeString(36, 'data');
  /* data chunk length */
  view.setUint32(40, samples.length * 2, true);

  // Write 16-bit PCM samples
  let offset = 44;
  for (let i = 0; i < samples.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }

  return new Blob([view], { type: 'audio/wav' });
}

export function generateSyntheticWavSample(isFake: boolean): { blob: Blob; sampleName: string; durationSec: number } {
  const sampleRate = 44100;
  const durationSec = 3.6;
  const totalSamples = Math.floor(sampleRate * durationSec);
  const samples = new Float32Array(totalSamples);

  if (isFake) {
    // SYNTHETIC AI CLONED VOICE
    // Characteristics:
    // - Rigid, quantized pitch steps (no organic muscle jitter)
    // - Transposed convolution vocoder buzzing at 4kHz - 8kHz
    // - Robotic silence gating between speech syllables
    const baseFreqs = [185, 185, 220, 220, 196, 196, 165]; // Quantized frequency steps
    for (let i = 0; i < totalSamples; i++) {
      const t = i / sampleRate;
      const stepIdx = Math.min(baseFreqs.length - 1, Math.floor(t * 2));
      const f0 = baseFreqs[stepIdx];

      // Syllable envelope with artificial hard cuts
      const syllableGate = Math.sin(t * Math.PI * 4) > 0 ? 0.8 : 0.05;

      // Harmonic buzz (Vocoder harmonics)
      const fundamental = Math.sin(2 * Math.PI * f0 * t);
      const h2 = 0.5 * Math.sin(2 * Math.PI * f0 * 2 * t);
      const h3 = 0.35 * Math.sin(2 * Math.PI * f0 * 3 * t);
      const h4 = 0.25 * Math.sin(2 * Math.PI * f0 * 4 * t);
      // High frequency vocoder checkerboard spike (6.2 kHz)
      const vocoderSpike = 0.15 * Math.sin(2 * Math.PI * 6200 * t);

      samples[i] = (fundamental + h2 + h3 + h4 + vocoderSpike) * syllableGate * 0.4;
    }

    return {
      blob: encodeWAV(samples, sampleRate),
      sampleName: 'AI_Cloned_Emergency_Voice_Call.wav',
      durationSec
    };
  } else {
    // NATURAL HUMAN VOICE
    // Characteristics:
    // - Organic F0 micro-jitter & vocal cord tremor (vibrato)
    // - Warm resonant acoustic formants (320Hz, 780Hz, 2400Hz)
    // - Smooth breathing envelope and natural room acoustic noise floor
    const f0Base = 145; // Natural male/female vocal fundamental
    for (let i = 0; i < totalSamples; i++) {
      const t = i / sampleRate;
      // Natural pitch micro-jitter (subtle tremor)
      const jitter = Math.sin(t * 6.5) * 4.2 + (Math.sin(t * 19.3) * 1.5);
      const f0 = f0Base + jitter;

      // Smooth organic breathing envelope
      const breathEnvelope = Math.max(0, Math.sin(t * Math.PI * 1.2)) * 0.75 + 0.05;

      // Natural vocal tract resonances (Formants F1, F2, F3)
      const formant1 = 0.7 * Math.sin(2 * Math.PI * f0 * t);
      const formant2 = 0.35 * Math.sin(2 * Math.PI * (f0 * 2.2) * t);
      const formant3 = 0.18 * Math.sin(2 * Math.PI * (f0 * 4.8) * t);

      // Soft natural room ambiance
      const ambientRoomNoise = (Math.random() * 2 - 1) * 0.015;

      samples[i] = (formant1 + formant2 + formant3) * breathEnvelope * 0.5 + ambientRoomNoise;
    }

    return {
      blob: encodeWAV(samples, sampleRate),
      sampleName: 'Natural_Human_Speech_Sample.wav',
      durationSec
    };
  }
}
