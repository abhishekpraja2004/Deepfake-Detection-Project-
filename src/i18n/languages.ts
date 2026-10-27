import { TranslationStrings } from './types';
import { en } from './locales/en';
import { bho } from './locales/bho';
import { hi } from './locales/hi';
import { bn } from './locales/bn';
import { te } from './locales/te';
import { mr } from './locales/mr';
import { ta } from './locales/ta';
import { ur } from './locales/ur';
import { gu } from './locales/gu';
import { kn } from './locales/kn';
import { ml } from './locales/ml';
import { or } from './locales/or';
import { pa } from './locales/pa';
import { as } from './locales/as';
import { mai } from './locales/mai';
import { sat } from './locales/sat';
import { ks } from './locales/ks';
import { ne } from './locales/ne';
import { kok } from './locales/kok';
import { sd } from './locales/sd';
import { doi } from './locales/doi';
import { mni } from './locales/mni';
import { brx } from './locales/brx';
import { sa } from './locales/sa';

export { type TranslationStrings } from './types';
export { getLocalizedFindings } from './findings';
export { getLiveVoiceTranslations, type LiveVoiceTexts } from './liveVoiceTranslations';
export { getSocialLinkTranslations, type SocialLinkTexts } from './socialLinkTranslations';

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  region: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', region: 'Global / India', flag: '🌐' },
  { code: 'bho', name: 'Bhojpuri', nativeName: 'भोजपुरी', region: 'Bihar, UP, Jharkhand, Purvanchal', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', region: 'Northern & Central India', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', region: 'West Bengal, Tripura, Assam', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', region: 'Andhra Pradesh, Telangana', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', region: 'Maharashtra, Goa', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', region: 'Tamil Nadu, Puducherry', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', region: 'Jammu & Kashmir, Telangana, UP', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', region: 'Gujarat, Daman & Diu', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', region: 'Karnataka', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', region: 'Kerala, Lakshadweep', flag: '🇮🇳' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', region: 'Odisha', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', region: 'Punjab, Chandigarh, Delhi', flag: '🇮🇳' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', region: 'Assam', flag: '🇮🇳' },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली', region: 'Mithila, Bihar, Jharkhand', flag: '🇮🇳' },
  { code: 'sat', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ', region: 'Jharkhand, Odisha, West Bengal', flag: '🇮🇳' },
  { code: 'ks', name: 'Kashmiri', nativeName: 'کٲشُر', region: 'Jammu & Kashmir', flag: '🇮🇳' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', region: 'Sikkim, West Bengal, Assam', flag: '🇮🇳' },
  { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी', region: 'Goa, Maharashtra, Karnataka', flag: '🇮🇳' },
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي / सिंधी', region: 'Gujarat, Maharashtra, Rajasthan', flag: '🇮🇳' },
  { code: 'doi', name: 'Dogri', nativeName: 'डोगरी', region: 'Jammu, Himachal Pradesh', flag: '🇮🇳' },
  { code: 'mni', name: 'Manipuri', nativeName: 'মৈতৈলোন্', region: 'Manipur', flag: '🇮🇳' },
  { code: 'brx', name: 'Bodo', nativeName: 'बड़ो', region: 'Bodoland, Assam', flag: '🇮🇳' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', region: 'India (Classical)', flag: '🇮🇳' }
];

export const localeMap: Record<string, TranslationStrings> = {
  en,
  bho,
  hi,
  bn,
  te,
  mr,
  ta,
  ur,
  gu,
  kn,
  ml,
  or,
  pa,
  as,
  mai,
  sat,
  ks,
  ne,
  kok,
  sd,
  doi,
  mni,
  brx,
  sa
};

export function getTranslation(languageCode: string): TranslationStrings {
  return localeMap[languageCode] || localeMap.en;
}

// Localized demo sample cards for upload zone
export function getLocalizedSampleData(sampleId: string, language: string) {
  const t = getTranslation(language);

  const samples: Record<string, { title: string; category: string; description: string; tags: string[] }> = {
    'sample-faceswap-speech': {
      title: language === 'bho' ? 'राजनीतिक भाषण फेस-स्वैप (Deepfake)' : language === 'hi' ? 'राजनीतिक भाषण फेस-स्वैप डीपफेक' : language === 'bn' ? 'রাজনৈতিক বক্তৃতা ফেস-সোয়াপ ডিপফেক' : 'Political Keynote Face-Swap',
      category: t.verdictFake,
      description: language === 'bho' ? 'न्यूरल ऑटोएनकोडर से असली वीडियो पर दोसर आदमी के चेहरा चिपकावल गइल बा।' : language === 'hi' ? 'न्यूरल ऑटोएनकोडर द्वारा पुराने वीडियो पर नया चेहरा प्रत्यारोपित किया गया है।' : `${t.spatialSubtitle} ${t.pqiLow}`,
      tags: ['Face-Swap', t.pqiLow, 'CBAM Alert', 'Celeb-DF Sample']
    },
    'sample-voice-dubbing': {
      title: language === 'bho' ? 'एग्जीक्यूटिव आवाज-होंठ मिसमैच' : language === 'hi' ? 'एग्जीक्यूटिव ऑडियो-वीडियो लिप डब' : language === 'bn' ? 'এক্সিকিউটিভ অডিও-ভিডিও লিপ ডাবিং' : 'Executive Audio-Video Lip Dub',
      category: t.tabMultimodal,
      description: language === 'bho' ? 'क्लोन कइल आवाज आ बनावटी होंठ के हरकत में 180ms के अंतर बा।' : language === 'hi' ? 'क्लोन की गई आवाज और न्यूरल लिप सिंथेसिस में 180ms का समय अंतर है।' : `${t.multimodalSubtitle} (${t.desyncOffset} > 140ms)`,
      tags: [t.desyncOffset, 'Cloned Voice', 'DFDC Dataset']
    },
    'sample-authentic-broadcast': {
      title: language === 'bho' ? 'एकदम असली स्टूडियो ब्रॉडकास्ट' : language === 'hi' ? 'प्रामाणिक स्टूडियो लाइव प्रसारण' : language === 'bn' ? 'প্রামাণিক লাইভ সম্প্রচার' : 'Authentic Studio Live Keynote',
      category: t.verdictReal,
      description: language === 'bho' ? 'बिना छेड़छाड़ के ओरिजिनल वीडियो। 72 BPM के नस में धड़कन आ स्वाभाविक पलक झपकाव।' : language === 'hi' ? 'असंपीड़ित प्रसारण। 72 BPM रक्त पल्स, 18/मिनट पलक झपकना और शून्य ग्रिड स्पाइक्स।' : `${t.vasomotorTitle} (72 BPM). ${t.pqiHigh}. ${t.syncedBadge}.`,
      tags: ['72 BPM Pulse', t.syncedBadge, 'Verified Original']
    },
    'sample-diffusion-avatar': {
      title: language === 'bho' ? 'डिफ्यूजन AI से बनल बनावटी फोटो' : language === 'hi' ? 'डिफ्यूजन एआई जनरेटेड पोर्ट्रेट' : language === 'bn' ? 'ডিফিউশন এআই প্রতিকৃতি' : 'Diffusion AI Generated Portrait',
      category: t.verdictFake,
      description: language === 'bho' ? 'टेक्स्ट से बनल AI फोटो जवना में आंख के पुतली आ स्पेक्ट्रम में AI ग्रिड मिलल बा।' : language === 'hi' ? 'टेक्स्ट-टू-इमेज जनरेशन जिसमें आंखों में प्रकाश विषमता और चेकरबोर्ड स्पेक्ट्रम ग्रिड है।' : `${t.frequencySubtitle} ${t.gradcamHotspotsFound}`,
      tags: ['Diffusion Artifact', 'Asymmetric Pupils', 'FFT Grid Spike']
    },
    'sample-social-compression': {
      title: language === 'bho' ? 'व्हाट्सएप कम्प्रेश कइल असली वीडियो' : language === 'hi' ? 'व्हाट्सएप संपीड़ित प्रामाणिक वीडियो' : language === 'bn' ? 'হোয়াটসঅ্যাপ সংকুচিত ভিডিও' : 'WhatsApp Compressed Authentic Video',
      category: t.tabRobustness,
      description: language === 'bho' ? 'व्हाट्सएप पर भारी कम्प्रेशन के बाद भी हॉकविज़न असली खून के धड़कन पहचान लिहलस।' : language === 'hi' ? 'भारी संपीड़ित सोशल वीडियो। हॉकविज़न कम्प्रेशन शोर को डीपफेक से अलग पहचानता है।' : `${t.benchmarksWhatsappDesc}. ${t.pqiHigh}.`,
      tags: ['Social Re-compression', 'Resilient rPPG', 'CRF-28 Passed']
    }
  };

  return samples[sampleId] || null;
}
