export interface SocialLinkPresetText {
  title: string;
  sourceText: string;
  category: string;
}

export interface SocialLinkTexts {
  title: string;
  subtitle: string;
  placeholder: string;
  errEmpty: string;
  errInvalidProtocol: string;
  btnAnalyze: string;
  btnExtracting: string;
  supportedPlatforms: string;
  platformYoutube: string;
  platformInstagram: string;
  platformTwitter: string;
  platformWhatsapp: string;
  trendingCasesTitle: string;
  verifiedTestLinks: string;
  badgeDeepfakeTest: string;
  badgeAuthenticVideo: string;
  btnVerifyNow: string;
  presets: {
    politicalSpeech: SocialLinkPresetText;
    celebEndorsement: SocialLinkPresetText;
    pressConference: SocialLinkPresetText;
    whatsappEmergency: SocialLinkPresetText;
  };
}

export const socialLinkTranslations: Record<string, SocialLinkTexts> = {
  en: {
    title: 'Direct Social Media & Video Link Fact-Checker',
    subtitle: 'Paste any Instagram Reel, YouTube Short, X (Twitter) video, TikTok, or direct media URL for instant forensic breakdown.',
    placeholder: 'https://instagram.com/reel/... or https://youtube.com/shorts/...',
    errEmpty: 'Please paste a valid video, reel, or media link.',
    errInvalidProtocol: 'URL must start with https:// or http://',
    btnAnalyze: 'Analyze Link',
    btnExtracting: 'Extracting Frames...',
    supportedPlatforms: 'Supported Platforms:',
    platformYoutube: 'YouTube Shorts & Videos',
    platformInstagram: 'Instagram Reels',
    platformTwitter: 'X (Twitter) Media',
    platformWhatsapp: 'WhatsApp CDN Direct Links',
    trendingCasesTitle: 'Trending Social Media Viral Cases (1-Click Test)',
    verifiedTestLinks: 'Verified Test Links',
    badgeDeepfakeTest: 'Deepfake Test',
    badgeAuthenticVideo: 'Authentic Video',
    btnVerifyNow: 'Verify Link Now',
    presets: {
      politicalSpeech: {
        title: 'Viral Political Leader Speech in 5 Regional Languages',
        sourceText: 'YouTube Shorts • AI Voice Dubbing + Wav2Lip Facial Replacement',
        category: 'Electoral Disinformation'
      },
      celebEndorsement: {
        title: 'Celebrity Instant Crypto Scheme Endorsement Reel',
        sourceText: 'Instagram Reel • Neural Face Swap + ElevenLabs Cloned Audio',
        category: 'Financial Scam'
      },
      pressConference: {
        title: 'Live Official Ministry Press Briefing & Q&A',
        sourceText: 'X (Twitter) Broadcast • Unaltered Real-Time Camera Stream',
        category: 'Verified Human Stream'
      },
      whatsappEmergency: {
        title: 'Emergency Family Member Voice Call Plea (Forwarded)',
        sourceText: 'WhatsApp Audio Note • VALL-E Zero-Shot Synthetic Voice Clone',
        category: 'Audio Impersonation'
      }
    }
  },

  hi: {
    title: 'डायरेक्ट सोशल मीडिया व वीडियो लिंक फैक्ट-चेकर',
    subtitle: 'किसी भी इंस्टाग्राम रील, यूट्यूब शॉर्ट, X (ट्विटर) वीडियो या मीडिया लिंक को पेस्ट करके त्वरित फोरेंसिक जांच करें।',
    placeholder: 'https://instagram.com/reel/... या https://youtube.com/shorts/...',
    errEmpty: 'कृपया एक मान्य वीडियो, रील या मीडिया लिंक दर्ज करें।',
    errInvalidProtocol: 'URL https:// या http:// से शुरू होना चाहिए।',
    btnAnalyze: 'लिंक की जांच करें',
    btnExtracting: 'फ्रेम्स निकाले जा रहे हैं...',
    supportedPlatforms: 'समर्थित प्लेटफॉर्म:',
    platformYoutube: 'YouTube शॉर्ट्स और वीडियो',
    platformInstagram: 'Instagram रील्स',
    platformTwitter: 'X (Twitter) मीडिया',
    platformWhatsapp: 'WhatsApp CDN डायरेक्ट लिंक्स',
    trendingCasesTitle: 'ट्रेंडिंग सोशल मीडिया वायरल मामले (1-क्लिक टेस्ट)',
    verifiedTestLinks: 'सत्यापित परीक्षण लिंक',
    badgeDeepfakeTest: 'डीपफेक टेस्ट',
    badgeAuthenticVideo: 'असली वीडियो',
    btnVerifyNow: 'लिंक सत्यापित करें',
    presets: {
      politicalSpeech: {
        title: 'वायरल राजनीतिक नेता का भाषण (5 क्षेत्रीय भाषाओं में)',
        sourceText: 'YouTube Shorts • AI वॉइस डबिंग + Wav2Lip चेहरा बदलाव',
        category: 'चुनावी दुष्प्रचार'
      },
      celebEndorsement: {
        title: 'सेलिब्रिटी त्वरित क्रिप्टो योजना विज्ञापन रील',
        sourceText: 'Instagram Reel • न्यूरल फेस स्वैप + क्लोन की गई ऑडियो',
        category: 'वित्तीय धोखाधड़ी'
      },
      pressConference: {
        title: 'लाइव आधिकारिक मंत्रालय प्रेस ब्रीफिंग और प्रश्नोत्तरी',
        sourceText: 'X (Twitter) लाइव • बिना छेड़छाड़ वाला असली कैमरा स्ट्रीम',
        category: 'सत्यापित मानव स्ट्रीम'
      },
      whatsappEmergency: {
        title: 'आपातकालीन रिश्तेदार की मदद की गुहार वॉइस कॉल (फॉरवर्डेड)',
        sourceText: 'WhatsApp ऑडियो • VALL-E सिंथेटिक वॉइस क्लोन',
        category: 'आवाज प्रतिरूपण'
      }
    }
  },

  bho: {
    title: 'सोशल मीडिया आ वीडियो लिंक फैक्ट-चेकर',
    subtitle: 'कवनो इंस्टाग्राम रील, यूट्यूब शॉर्ट, ट्विटर वीडियो भा मीडिया लिंक पेस्ट क\'के तुरंत डीपफेक जांच करीं।',
    placeholder: 'https://instagram.com/reel/... भा https://youtube.com/shorts/...',
    errEmpty: 'कृपया कवनो सही वीडियो, रील भा मीडिया लिंक डालीं।',
    errInvalidProtocol: 'लिंक https:// भा http:// से शुरू होखे के चाहीं।',
    btnAnalyze: 'लिंक जांचीं',
    btnExtracting: 'फ्रेम निकालल जा रहल बा...',
    supportedPlatforms: 'सपोर्टेड प्लेटफॉर्म:',
    platformYoutube: 'YouTube शॉर्ट्स आ वीडियो',
    platformInstagram: 'Instagram रील्स',
    platformTwitter: 'X (Twitter) वीडियो',
    platformWhatsapp: 'WhatsApp डायरेक्ट लिंक',
    trendingCasesTitle: 'वायरल सोशल मीडिया केस (1-क्लिक टेस्ट)',
    verifiedTestLinks: 'सत्यापित टेस्ट लिंक',
    badgeDeepfakeTest: 'डीपफेक टेस्ट',
    badgeAuthenticVideo: 'एकदम असली वीडियो',
    btnVerifyNow: 'तुरंत जांचीं',
    presets: {
      politicalSpeech: {
        title: 'वायरल नेता जी के भाषण (5 गो भाषा में)',
        sourceText: 'YouTube Shorts • बनावटी आवाज + Wav2Lip से चेहरा बदलल',
        category: 'चुनावी अफवाह'
      },
      celebEndorsement: {
        title: 'हीरो/हिरोइन के क्रिप्टो घोटाला वाला विज्ञापन रील',
        sourceText: 'Instagram Reel • नकली चेहरा + AI आवाज क्लोन',
        category: 'पैसा के धोखाधड़ी'
      },
      pressConference: {
        title: 'सरकारी मंत्रालय के असली लाइव प्रेस कांफ्रेंस',
        sourceText: 'X लाइव • बिना छेड़छाड़ वाला असली कैमरा वीडियो',
        category: 'सत्यापित असली स्ट्रीम'
      },
      whatsappEmergency: {
        title: 'रिश्तेदार के नाम पर इमरजेंसी मदद मँगवावे वाला वॉइस नोट',
        sourceText: 'WhatsApp ऑडियो • VALL-E से बनावल क्लोन आवाज',
        category: 'आवाज के धोखा'
      }
    }
  },

  bn: {
    title: 'ডাইরেক্ট সোশ্যাল মিডিয়া ও ভিডিও লিঙ্ক ফ্যাক্ট-চেকার',
    subtitle: 'যেকোনো ইনস্টাগ্রাম রিল, ইউটিউব শর্টস বা টুইটার ভিডিও লিঙ্ক পেস্ট করে তাৎক্ষণিক ফরেনসিক বিশ্লেষণ করুন।',
    placeholder: 'https://instagram.com/reel/... অথবা https://youtube.com/shorts/...',
    errEmpty: 'দয়া করে একটি বৈধ ভিডিও বা রিল লিঙ্ক দিন।',
    errInvalidProtocol: 'ইউআরএল অবশ্যই https:// বা http:// দিয়ে শুরু হতে হবে।',
    btnAnalyze: 'লিঙ্ক বিশ্লেষণ করুন',
    btnExtracting: 'ফ্রেম সংগ্রহ করা হচ্ছে...',
    supportedPlatforms: 'সমর্থিত প্ল্যাটফর্ম:',
    platformYoutube: 'YouTube শর্টস ও ভিডিও',
    platformInstagram: 'Instagram রিলস',
    platformTwitter: 'X (Twitter) মিডিয়া',
    platformWhatsapp: 'WhatsApp সরাসরি লিঙ্ক',
    trendingCasesTitle: 'ভাইরাল সোশ্যাল মিডিয়া কেস (১-ক্লিক টেস্ট)',
    verifiedTestLinks: 'যাচাইকৃত পরীক্ষার লিঙ্ক',
    badgeDeepfakeTest: 'ডিপফেক টেস্ট',
    badgeAuthenticVideo: 'খাঁটি ভিডিও',
    btnVerifyNow: 'এখনই যাচাই করুন',
    presets: {
      politicalSpeech: {
        title: 'ভাইরাল রাজনৈতিক নেতার ৫ ভাষায় ডাবিং বক্তৃতা',
        sourceText: 'YouTube Shorts • AI ভয়েস ডাবিং + ফেস সোয়াপ',
        category: 'নির্বাচনী বিভ্রান্তি'
      },
      celebEndorsement: {
        title: 'তারকাদের ক্রিপ্টো স্ক্যাম প্রচারমূলক রিল',
        sourceText: 'Instagram Reel • নিউরাল ফেস সোয়াপ + ক্লোন অডিও',
        category: 'আর্থিক জালিয়াতি'
      },
      pressConference: {
        title: 'অফিসিয়াল মন্ত্রণালয়ের সরাসরি প্রেস ব্রিফিং',
        sourceText: 'X ব্রডকাস্ট • অবিকৃত রিয়েল-টাইম ক্যামেরা স্ট্রিম',
        category: 'যাচাইকৃত মানব স্ট্রিম'
      },
      whatsappEmergency: {
        title: 'জরুরি পারিবারিক সাহায্যের আবেদন ভয়েস নোট',
        sourceText: 'WhatsApp অডিও • সিন্থেটিক ভয়েস ক্লোন',
        category: 'কণ্ঠ অনুকরণ প্রতারণা'
      }
    }
  },

  te: {
    title: 'డైరెక్ట్ సోషల్ మీడియా & వీడియో లింక్ ఫ్యాక్ట్-చెకర్',
    subtitle: 'ఏదైనా Instagram రీల్, YouTube షార్ట్ లేదా వీడియో లింక్‌ను పేస్ట్ చేసి తక్షణ ఫోరెన్సిక్ విశ్లేషణ పొందండి.',
    placeholder: 'https://instagram.com/reel/... లేదా https://youtube.com/shorts/...',
    errEmpty: 'దయచేసి సరైన వీడియో లేదా రీల్ లింక్‌ను నమోదు చేయండి.',
    errInvalidProtocol: 'URL తప్పనిసరిగా https:// లేదా http:// తో ప్రారంభం కావాలి.',
    btnAnalyze: 'లింక్‌ను విశ్లేషించండి',
    btnExtracting: 'ఫ్రేమ్‌లను సేకరిస్తోంది...',
    supportedPlatforms: 'మద్దతు ఉన్న ప్లాట్‌ఫారమ్‌లు:',
    platformYoutube: 'YouTube షార్ట్స్ & వీడియోలు',
    platformInstagram: 'Instagram రీల్స్',
    platformTwitter: 'X (Twitter) మీడియా',
    platformWhatsapp: 'WhatsApp ప్రత్యక్ష లింకులు',
    trendingCasesTitle: 'ట్రెండింగ్ సోషల్ మీడియా వైరల్ కేసులు (1-క్లిక్ టెస్ట్)',
    verifiedTestLinks: 'ధృవీకరించబడిన టెస్ట్ లింకులు',
    badgeDeepfakeTest: 'డీప్‌ఫేక్ టెస్ట్',
    badgeAuthenticVideo: 'నిజమైన వీడియో',
    btnVerifyNow: 'ఇప్పుడే ధృవీకరించండి',
    presets: {
      politicalSpeech: {
        title: '5 ప్రాంతీయ భాషల్లో వైరల్ రాజకీయ నాయకుడి ప్రసంగం',
        sourceText: 'YouTube Shorts • AI వాయిస్ డబ్బింగ్ + ఫేస్ రీప్లేస్‌మెంట్',
        category: 'ఎన్నికల తప్పుడు సమాచారం'
      },
      celebEndorsement: {
        title: 'సెలబ్రిటీ క్రిప్టో స్కీమ్ ఎండార్స్‌మెంట్ రీల్',
        sourceText: 'Instagram Reel • న్యూరల్ ఫేస్ స్వాప్ + క్లోన్ ఆడియో',
        category: 'ఆర్థిక మోసం'
      },
      pressConference: {
        title: 'అధికారిక మంత్రిత్వ శాఖ ప్రత్యక్ష ప్రెస్ మీట్',
        sourceText: 'X బ్రాడ్‌కాస్ట్ • సహజమైన రియల్-టైమ్ కెమెరా స్ట్రీమ్',
        category: 'ధృవీకరించబడిన మానవ స్ట్రీమ్'
      },
      whatsappEmergency: {
        title: 'కుటుంబ సభ్యుడి అత్యవసర సహాయ వాయిస్ నోట్',
        sourceText: 'WhatsApp ఆడియో • సింథటిక్ వాయిస్ క్లోన్',
        category: 'ఆడియో అనుకరణ మోసం'
      }
    }
  },

  mr: {
    title: 'थेट सोशल मीडिया आणि व्हिडिओ लिंक फॅक्ट-चेकर',
    subtitle: 'कोणतीही इंस्टाग्राम रील, यूट्यूब शॉर्ट किंवा व्हिडिओ लिंक टाकून त्वरित फॉरेन्सिक तपासणी करा.',
    placeholder: 'https://instagram.com/reel/... किंवा https://youtube.com/shorts/...',
    errEmpty: 'कृपया वैध व्हिडिओ किंवा रील लिंक टाका.',
    errInvalidProtocol: 'URL https:// किंवा http:// ने सुरू व्हायला हवी.',
    btnAnalyze: 'लिंक तपासा',
    btnExtracting: 'फ्रेम्स काढत आहे...',
    supportedPlatforms: 'समर्थित प्लॅटफॉर्म:',
    platformYoutube: 'YouTube शॉर्ट्स आणि व्हिडिओ',
    platformInstagram: 'Instagram रील्स',
    platformTwitter: 'X (Twitter) मीडिया',
    platformWhatsapp: 'WhatsApp थेट लिंक्स',
    trendingCasesTitle: 'व्हायरल सोशल मीडिया केसेस (१-क्लिक चाचणी)',
    verifiedTestLinks: 'सत्यापित चाचणी लिंक्स',
    badgeDeepfakeTest: 'डीपफेक चाचणी',
    badgeAuthenticVideo: 'अस्सल व्हिडिओ',
    btnVerifyNow: 'आता सत्यापित करा',
    presets: {
      politicalSpeech: {
        title: '५ प्रादेशिक भाषांमधील राजकीय नेत्याचे व्हायरल भाषण',
        sourceText: 'YouTube Shorts • AI व्हॉइस डबिंग + चेहरा बदल',
        category: 'निवडणूक गैरसमज'
      },
      celebEndorsement: {
        title: 'प्रसिद्ध व्यक्तीची बनावट क्रिप्टो योजना जाहिरात रील',
        sourceText: 'Instagram Reel • न्यूरल फेस स्वॅप + क्लोन आवाज',
        category: 'आर्थिक फसवणूक'
      },
      pressConference: {
        title: 'अधिकृत मंत्रालयाची थेट पत्रकार परिषद',
        sourceText: 'X थेट • मूळ रिअल-टाइम कॅमेरा प्रवाह',
        category: 'सत्यापित मानवी प्रवाह'
      },
      whatsappEmergency: {
        title: 'कुटुंबातील सदस्याचा आपत्कालीन मदतीचा व्हॉइस मेसेज',
        sourceText: 'WhatsApp ऑडिओ • कृत्रिम व्हॉइस क्लोन',
        category: 'आवाज फसवणूक'
      }
    }
  },

  ta: {
    title: 'நேரடி சமூக ஊடக & வீடியோ இணைப்பு உண்மை சரிபார்ப்பு',
    subtitle: 'Instagram ரீல், YouTube ஷார்ட்ஸ் அல்லது வீடியோ இணைப்பை வழங்கி உடனடி தடயவியல் ஆய்வு செய்திடுங்கள்.',
    placeholder: 'https://instagram.com/reel/... அல்லது https://youtube.com/shorts/...',
    errEmpty: 'சரியான வீடியோ அல்லது ரீல் இணைப்பை உள்ளிடவும்.',
    errInvalidProtocol: 'URL https:// அல்லது http:// உடன் தொடங்க வேண்டும்.',
    btnAnalyze: 'இணைப்பை ஆய்வு செய்',
    btnExtracting: 'பிரேம்கள் பிரித்தெடுக்கப்படுகின்றன...',
    supportedPlatforms: 'ஆதரிக்கப்படும் தளங்கள்:',
    platformYoutube: 'YouTube ஷார்ட்ஸ் & வீடியோக்கள்',
    platformInstagram: 'Instagram ரீல்ஸ்',
    platformTwitter: 'X (Twitter) மீடியா',
    platformWhatsapp: 'WhatsApp நேரடி இணைப்புகள்',
    trendingCasesTitle: 'வைரல் சமூக ஊடக வழக்குகள் (1-கிளிக் சோதனை)',
    verifiedTestLinks: 'சரிபார்க்கப்பட்ட சோதனை இணைப்புகள்',
    badgeDeepfakeTest: 'டீப்ஃபேக் சோதனை',
    badgeAuthenticVideo: 'உண்மையான வீடியோ',
    btnVerifyNow: 'இப்போதே சரிபார்',
    presets: {
      politicalSpeech: {
        title: '5 மொழிகளில் அரசியல் தலைவர் உரை (வைரல்)',
        sourceText: 'YouTube Shorts • AI குரல் டப்பிங் + முக மாற்றம்',
        category: 'தேர்தல் தவறான தகவல்'
      },
      celebEndorsement: {
        title: 'பிரபலத்தின் கிரிப்டோ மோசடி ஆதரவு ரீல்',
        sourceText: 'Instagram Reel • முக மாற்றம் + குளோன் செய்யப்பட்ட குரல்',
        category: 'நிதி மோசடி'
      },
      pressConference: {
        title: 'அமைச்சகத்தின் நேரடி பத்திரிகையாளர் சந்திப்பு',
        sourceText: 'X நேரலை • மாற்றப்படாத நேரடி கேமரா ஸ்ட்ரீம்',
        category: 'சரிபார்க்கப்பட்ட மனித ஸ்ட்ரீம்'
      },
      whatsappEmergency: {
        title: 'உறவினரின் அவசர உதவி குரல் பதிவு (பார்வர்ட்)',
        sourceText: 'WhatsApp ஆடியோ • செயற்கை குரல் குளோன்',
        category: 'குரல் ஆள்மாறாட்டம்'
      }
    }
  },

  ur: {
    title: 'ڈائریکٹ سوشل میڈیا اور ویڈیو لنک فیکٹ چیکر',
    subtitle: 'کسی بھی انسٹاگرام ریل، یوٹیوب شارٹ یا میڈیا لنک کو چسپاں کر کے فوری فارنزک جانچ کریں۔',
    placeholder: 'https://instagram.com/reel/... یا https://youtube.com/shorts/...',
    errEmpty: 'براہ کرم ایک درست ویڈیو یا ریل لنک درج کریں۔',
    errInvalidProtocol: 'URL کا آغاز https:// یا http:// سے ہونا ضروری ہے۔',
    btnAnalyze: 'لنک کا تجزیہ کریں',
    btnExtracting: 'فریمز نکالے جا رہے ہیں...',
    supportedPlatforms: 'معاون پلیٹ فارمز:',
    platformYoutube: 'YouTube شارٹس اور ویڈیوز',
    platformInstagram: 'Instagram ریلز',
    platformTwitter: 'X (Twitter) میڈیا',
    platformWhatsapp: 'WhatsApp براہ راست لنکس',
    trendingCasesTitle: 'ٹرینڈنگ سوشل میڈیا وائرل کیسز (1-کلک ٹیسٹ)',
    verifiedTestLinks: 'تصدیق شدہ ٹیسٹ لنکس',
    badgeDeepfakeTest: 'ڈیپ فیک ٹیسٹ',
    badgeAuthenticVideo: 'اصلی ویڈیو',
    btnVerifyNow: 'ابھی تصدیق کریں',
    presets: {
      politicalSpeech: {
        title: '5 علاقائی زبانوں میں وائرل سیاسی رہنما کا خطاب',
        sourceText: 'YouTube Shorts • AI وائس ڈبنگ + چہرہ تبدیلی',
        category: 'انتخابی گمراہ کن پروپیگنڈا'
      },
      celebEndorsement: {
        title: 'مشہور شخصیت کا جعلی کرپٹو اسکیم اشتہار ریل',
        sourceText: 'Instagram Reel • نیورل فیس سویپ + کلون آڈیو',
        category: 'مالیاتی فراڈ'
      },
      pressConference: {
        title: 'سرکاری وزارت کی براہ راست پریس بریفنگ',
        sourceText: 'X لائیو • اصل اور غیر تبدیل شدہ کیمرہ اسٹریم',
        category: 'تصدیق شدہ انسانی اسٹریم'
      },
      whatsappEmergency: {
        title: 'خاندان کے فرد کی ہنگامی مدد کی اپیل والی وائس کال',
        sourceText: 'WhatsApp آڈیو • مصنوعی وائس کلون',
        category: 'آواز کی جعلسازی'
      }
    }
  },

  gu: {
    title: 'ડાયરેક્ટ સોશિયલ મીડિયા અને વિડિઓ લિંક ફેક્ટ-ચેકર',
    subtitle: 'કોઈપણ ઇન્સ્ટાગ્રામ રીલ, યૂટ્યૂબ શોર્ટ અથવા મીડિયા લિંક પેસ્ટ કરીને ત્વરિત ફોરેન્સિક તપાસ કરો.',
    placeholder: 'https://instagram.com/reel/... અથવા https://youtube.com/shorts/...',
    errEmpty: 'કૃપા કરીને માન્ય વિડિઓ અથવા રીલ લિંક દાખલ કરો.',
    errInvalidProtocol: 'URL https:// અથવા http:// થી શરૂ થવી જોઈએ.',
    btnAnalyze: 'લિંક તપાસો',
    btnExtracting: 'ફ્રેમ્સ અલગ કરવામાં આવી રહી છે...',
    supportedPlatforms: 'સપોર્ટેડ પ્લેટફોર્મ્સ:',
    platformYoutube: 'YouTube શોર્ટ્સ અને વિડિઓઝ',
    platformInstagram: 'Instagram રીલ્સ',
    platformTwitter: 'X (Twitter) મીડિયા',
    platformWhatsapp: 'WhatsApp ડાયરેક્ટ લિંક્સ',
    trendingCasesTitle: 'ટ્રેન્ડિંગ સોશિયલ મીડિયા વાયરલ કેસ (1-ક્લિક ટેસ્ટ)',
    verifiedTestLinks: 'ચકાસાયેલ ટેસ્ટ લિંક્સ',
    badgeDeepfakeTest: 'ડીપફેક ટેસ્ટ',
    badgeAuthenticVideo: 'અસલી વિડિઓ',
    btnVerifyNow: 'હમણાં ચકાસો',
    presets: {
      politicalSpeech: {
        title: '૫ પ્રાદેશિક ભાષાઓમાં વાયરલ રાજકીય નેતાનું ભાષણ',
        sourceText: 'YouTube Shorts • AI વોઈસ ડબિંગ + ફેસ સ્વેપ',
        category: 'ચૂંટણી ભ્રામકતા'
      },
      celebEndorsement: {
        title: 'સેલિબ્રિટી ક્રિપ્ટો સ્કીમ એન્ડોર્સમેન્ટ રીલ',
        sourceText: 'Instagram Reel • ન્યુરલ ફેસ સ્વેપ + ક્લોન ઓડિયો',
        category: 'નાણાકીય છેતરપિંડી'
      },
      pressConference: {
        title: 'અધિકૃત મંત્રાલય પ્રેસ બ્રીફિંગ લાઈવ',
        sourceText: 'X લાઈવ • અસલી રીઅલ-ટાઇમ કેમેરા પ્રવાહ',
        category: 'ચકાસાયેલ માનવ પ્રવાહ'
      },
      whatsappEmergency: {
        title: 'કટોકટીમાં સગાની મદદ માંગતી વૉઇસ કૉલ નોંધ',
        sourceText: 'WhatsApp ઓડિયો • સિન્થેટિક વોઈસ ક્લોન',
        category: 'વોઈસ છેતરપિંડી'
      }
    }
  },

  kn: {
    title: 'ನೇರ ಸೋಷಿಯಲ್ ಮೀಡಿಯಾ & ವಿಡಿಯೋ ಲಿಂಕ್ ಸತ್ಯಾಸತ್ಯತೆ ಪರೀಕ್ಷಕ',
    subtitle: 'ಯಾವುದೇ ಇನ್‌ಸ್ಟಾಗ್ರಾಮ್ ರೀಲ್, ಯೂಟ್ಯೂಬ್ ಶಾರ್ಟ್ ಅಥವಾ ವಿಡಿಯೋ ಲಿಂಕ್ ಹಾಕಿ ತಕ್ಷಣವೇ ವಿಧಿವಿಜ್ಞಾನ ಪರೀಕ್ಷೆ ನಡೆಸಿ.',
    placeholder: 'https://instagram.com/reel/... ಅಥವಾ https://youtube.com/shorts/...',
    errEmpty: 'ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ ವಿಡಿಯೋ ಅಥವಾ ರೀಲ್ ಲಿಂಕ್ ನಮೂದಿಸಿ.',
    errInvalidProtocol: 'URL https:// ಅಥವಾ http:// ನೊಂದಿಗೆ ಪ್ರಾರಂಭವಾಗಬೇಕು.',
    btnAnalyze: 'ಲಿಂಕ್ ವಿಶ್ಲೇಷಿಸಿ',
    btnExtracting: 'ಫ್ರೇಮ್‌ಗಳನ್ನು ಹೊರತೆಗೆಯಲಾಗುತ್ತಿದೆ...',
    supportedPlatforms: 'ಬೆಂಬಲಿತ ವೇದಿಕೆಗಳು:',
    platformYoutube: 'YouTube ಶಾರ್ಟ್ಸ್ & ವಿಡಿಯೋಗಳು',
    platformInstagram: 'Instagram ರೀಲ್ಸ್',
    platformTwitter: 'X (Twitter) ಮೀಡಿಯಾ',
    platformWhatsapp: 'WhatsApp ನೇರ ಲಿಂಕ್‌ಗಳು',
    trendingCasesTitle: 'ವೈರಲ್ ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ಪ್ರಕರಣಗಳು (1-ಕ್ಲಿಕ್ ಪರೀಕ್ಷೆ)',
    verifiedTestLinks: 'ದೃಢೀಕರಿಸಿದ ಪರೀಕ್ಷಾ ಲಿಂಕ್‌ಗಳು',
    badgeDeepfakeTest: 'ಡೀಪ್‌ಫೇಕ್ ಪರೀಕ್ಷೆ',
    badgeAuthenticVideo: 'ನೈಜ ವಿಡಿಯೋ',
    btnVerifyNow: 'ಈಗಲೇ ಪರಿಶೀಲಿಸಿ',
    presets: {
      politicalSpeech: {
        title: '5 ಪ್ರಾದೇಶಿಕ ಭಾಷೆಗಳಲ್ಲಿ ವೈರಲ್ ರಾಜಕೀಯ ಮುಖಂಡರ ಭಾಷಣ',
        sourceText: 'YouTube Shorts • AI ಧ್ವನಿ ಡಬ್ಬಿಂಗ್ + ಮುಖ ಬದಲಿ',
        category: 'ಚುನಾವಣಾ ಸುಳ್ಳು ಮಾಹಿತಿ'
      },
      celebEndorsement: {
        title: 'ಸೆಲೆಬ್ರಿಟಿ ಕ್ರಿಪ್ಟೋ ಸ್ಕೀಮ್ ಪ್ರಚಾರ ರೀಲ್',
        sourceText: 'Instagram Reel • ನ್ಯೂರಲ್ ಫೇಸ್ ಸ್ವಾಪ್ + ಕ್ಲೋನ್ ಆಡಿಯೋ',
        category: 'ಹಣಕಾಸು ವಂಚನೆ'
      },
      pressConference: {
        title: 'ಅಧಿಕೃತ ಸಚಿವಾಲಯದ ನೇರ ಪತ್ರಿಕಾಗೋಷ್ಠಿ',
        sourceText: 'X ಲೈವ್ • ನೈಜ-ಸಮಯದ ಕ್ಯಾಮೆರಾ ಸ್ಟ್ರೀಮ್',
        category: 'ದೃಢೀಕೃತ ಮಾನವ ಸ್ಟ್ರೀಮ್'
      },
      whatsappEmergency: {
        title: 'ಕುಟುಂಬದ ಸದಸ್ಯರ ತುರ್ತು ಸಹಾಯ ಕೋರಿಕೆಯ ಧ್ವನಿ ಸಂದೇಶ',
        sourceText: 'WhatsApp ಆಡಿಯೋ • ಸಿಂಥೆಟಿಕ್ ಧ್ವನಿ ಕ್ಲೋನ್',
        category: 'ಧ್ವನಿ ಸೋಗು ವಂಚನೆ'
      }
    }
  },

  ml: {
    title: 'സോഷ്യൽ മീഡിയ & വീഡിയോ ലിങ്ക് ഫാക്റ്റ്-ചെക്കർ',
    subtitle: 'ഏതെങ്കിലും ഇൻസ്റ്റാഗ്രാം റീൽ, യൂട്യൂബ് ഷോർട്ട് അല്ലെങ്കിൽ വീഡിയോ ലിങ്ക് ഒട്ടിച്ച് ഫോറൻസിക് പരിശോധന നടത്തുക.',
    placeholder: 'https://instagram.com/reel/... അല്ലെങ്കിൽ https://youtube.com/shorts/...',
    errEmpty: 'സാധുവായ ഒരു വീഡിയോ അല്ലെങ്കിൽ റീൽ ലിങ്ക് നൽകുക.',
    errInvalidProtocol: 'URL https:// അല്ലെങ്കിൽ http:// ഉപയോഗിച്ച് ആരംഭിക്കണം.',
    btnAnalyze: 'ലിങ്ക് പരിശോധിക്കുക',
    btnExtracting: 'ഫ്രെയിമുകൾ വേർതിരിക്കുന്നു...',
    supportedPlatforms: 'പിന്തുണയ്ക്കുന്ന പ്ലാറ്റ്‌ഫോമുകൾ:',
    platformYoutube: 'YouTube ഷോർട്ട്സ് & വീഡിയോകൾ',
    platformInstagram: 'Instagram റീലുകൾ',
    platformTwitter: 'X (Twitter) മീഡിയ',
    platformWhatsapp: 'WhatsApp ഡയറക്റ്റ് ലിങ്കുകൾ',
    trendingCasesTitle: 'വൈറൽ സോഷ്യൽ മീഡിയ കേസുകൾ (1-ക്ലിക്ക് ടെസ്റ്റ്)',
    verifiedTestLinks: 'സ്ഥിരീകരിച്ച പരീക്ഷണ ലിങ്കുകൾ',
    badgeDeepfakeTest: 'ഡീപ്ഫേക്ക് ടെസ്റ്റ്',
    badgeAuthenticVideo: 'യഥാർത്ഥ വീഡിയോ',
    btnVerifyNow: 'ഇപ്പോൾ പരിശോധിക്കുക',
    presets: {
      politicalSpeech: {
        title: '5 പ്രാദേശിക ഭാഷകളിലെ രാഷ്ട്രീയ നേതാവിന്റെ പ്രസംഗം',
        sourceText: 'YouTube Shorts • AI വോയ്സ് ഡബ്ബിംഗ് + മുഖം മാറ്റൽ',
        category: 'തെരഞ്ഞെടുപ്പ് വ്യാജ പ്രചാരണം'
      },
      celebEndorsement: {
        title: 'സെലിബ്രിറ്റി ക്രിപ്റ്റോ തട്ടിപ്പ് പ്രമോഷൻ റീൽ',
        sourceText: 'Instagram Reel • ന്യൂറൽ ഫെയ്സ് സ്വാപ്പ് + ക്ലോൺ ശബ്ദം',
        category: 'സാമ്പത്തിക തട്ടിപ്പ്'
      },
      pressConference: {
        title: 'ഔദ്യോഗിക മന്ത്രാലയ ലൈവ് പത്രസമ്മേളനം',
        sourceText: 'X ലൈവ് • മാറ്റമില്ലാത്ത യഥാർത്ഥ ക്യാമറ സ്ട്രീം',
        category: 'യഥാർത്ഥ ഹ്യൂമൻ സ്ട്രീം'
      },
      whatsappEmergency: {
        title: 'കുടുംബാംഗത്തിന്റെ അടിയന്തര സഹായ അഭ്യർത്ഥന ശബ്ദസന്ദേശം',
        sourceText: 'WhatsApp ഓഡിയോ • സിന്തറ്റിക് വോയ്സ് ക്ലോൺ',
        category: 'ശബ്ദ ആൾമാറാട്ടം'
      }
    }
  },

  pa: {
    title: 'ਡਾਇਰੈਕਟ ਸੋਸ਼ਲ ਮੀਡੀਆ ਅਤੇ ਵੀਡੀਓ ਲਿੰਕ ਫੈਕਟ-ਚੈਕਰ',
    subtitle: 'ਕਿਸੇ ਵੀ ਇੰਸਟਾਗ੍ਰਾਮ ਰੀਲ, ਯੂਟਿਊਬ ਸ਼ਾਰਟ ਜਾਂ ਵੀਡੀਓ ਲਿੰਕ ਨੂੰ ਪੇਸਟ ਕਰਕੇ ਤੁਰੰਤ ਫੋਰੈਂਸਿਕ ਜਾਂਚ ਕਰੋ।',
    placeholder: 'https://instagram.com/reel/... ਜਾਂ https://youtube.com/shorts/...',
    errEmpty: 'ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਸਹੀ ਵੀਡੀਓ ਜਾਂ ਰੀਲ ਲਿੰਕ ਪਾਓ।',
    errInvalidProtocol: 'URL https:// ਜਾਂ http:// ਨਾਲ ਸ਼ੁਰੂ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ।',
    btnAnalyze: 'ਲਿੰਕ ਦੀ ਜਾਂਚ ਕਰੋ',
    btnExtracting: 'ਫਰੇਮ ਕੱਢੇ ਜਾ ਰਹੇ ਹਨ...',
    supportedPlatforms: 'ਸਮਰਥਿਤ ਪਲੇਟਫਾਰਮ:',
    platformYoutube: 'YouTube ਸ਼ਾਰਟਸ ਅਤੇ ਵੀਡੀਓ',
    platformInstagram: 'Instagram ਰੀਲਜ਼',
    platformTwitter: 'X (Twitter) ਮੀਡੀਆ',
    platformWhatsapp: 'WhatsApp ਸਿੱਧੇ ਲਿੰਕ',
    trendingCasesTitle: 'ਵਾਇਰਲ ਸੋਸ਼ਲ ਮੀਡੀਆ ਕੇਸ (1-ਕਲਿੱਕ ਟੈਸਟ)',
    verifiedTestLinks: 'ਤਸਦੀਕਸ਼ੁਦਾ ਟੈਸਟ ਲਿੰਕ',
    badgeDeepfakeTest: 'ਡੀਪਫੇਕ ਟੈਸਟ',
    badgeAuthenticVideo: 'ਅਸਲੀ ਵੀਡੀਓ',
    btnVerifyNow: 'ਹੁਣੇ ਜਾਂਚੋ',
    presets: {
      politicalSpeech: {
        title: '5 ਖੇਤਰੀ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਸਿਆਸੀ ਆਗੂ ਦਾ ਵਾਇਰਲ ਭਾਸ਼ਣ',
        sourceText: 'YouTube Shorts • AI ਆਵਾਜ਼ ਡਬਿੰਗ + ਚਿਹਰਾ ਬਦਲ',
        category: 'ਚੋਣ ਗੁੰਮਰਾਹਕੁੰਨ ਪ੍ਰਚਾਰ'
      },
      celebEndorsement: {
        title: 'ਮਸ਼ਹੂਰ ਹਸਤੀ ਦੀ ਜਾਅਲੀ ਕ੍ਰਿਪਟੋ ਸਕੀਮ ਰੀਲ',
        sourceText: 'Instagram Reel • ਫੇਸ ਸਵੈਪ + ਕਲੋਨ ਆਡੀਓ',
        category: 'ਵਿੱਤੀ ਧੋਖਾਧੜੀ'
      },
      pressConference: {
        title: 'ਅਧਿਕਾਰਤ ਮੰਤਰਾਲੇ ਦੀ ਲਾਈਵ ਪ੍ਰੈਸ ਕਾਨਫਰੰਸ',
        sourceText: 'X ਲਾਈਵ • ਅਸਲ ਰੀਅਲ-ਟਾਈਮ ਕੈਮਰਾ ਸਟ੍ਰੀਮ',
        category: 'ਤਸਦੀਕਸ਼ੁਦਾ ਅਸਲੀ ਸਟ੍ਰੀਮ'
      },
      whatsappEmergency: {
        title: 'ਪਰਿਵਾਰਕ ਮੈਂਬਰ ਦੀ ਐਮਰਜੈਂਸੀ ਮਦਦ ਵਾਲੀ ਵੌਇਸ ਕਾਲ',
        sourceText: 'WhatsApp ਆਡੀਓ • ਨਕਲੀ ਵੌਇਸ ਕਲੋਨ',
        category: 'ਆਵਾਜ਼ ਦਾ ਧੋਖਾ'
      }
    }
  },

  or: {
    title: 'ସୋସିଆଲ ମିଡିଆ ଓ ଭିଡିଓ ଲିଙ୍କ୍ ଫ୍ୟାକ୍ଟ-ଚେକର୍',
    subtitle: 'ଯେକୌଣସି ଇନଷ୍ଟାଗ୍ରାମ ରିଲ୍, ୟୁଟ୍ୟୁବ୍ ସର୍ଟ କିମ୍ବା ଭିଡିଓ ଲିଙ୍କ୍ ଦେଇ ତୁରନ୍ତ ଫୋରେନସିକ୍ ଯାଞ୍ଚ କରନ୍ତୁ।',
    placeholder: 'https://instagram.com/reel/... କିମ୍ବା https://youtube.com/shorts/...',
    errEmpty: 'ଦୟାକରି ଏକ ବୈଧ ଭିଡିଓ ବା ରିଲ୍ ଲିଙ୍କ୍ ଦିଅନ୍ତୁ।',
    errInvalidProtocol: 'URL ନିଶ୍ଚିତ ଭାବେ https:// ବା http:// ରୁ ଆରମ୍ଭ ହେବା ଉଚିତ।',
    btnAnalyze: 'ଲିଙ୍କ୍ ଯାଞ୍ଚ କରନ୍ତୁ',
    btnExtracting: 'ଫ୍ରେମ୍ ବାହାର କରାଯାଉଛି...',
    supportedPlatforms: 'ସମର୍ଥିତ ପ୍ଲାଟଫର୍ମ:',
    platformYoutube: 'YouTube ସର୍ଟସ୍ ଓ ଭିଡିଓ',
    platformInstagram: 'Instagram ରିଲ୍ସ',
    platformTwitter: 'X (Twitter) ମିଡିଆ',
    platformWhatsapp: 'WhatsApp ସିଧାସଳଖ ଲିଙ୍କ୍',
    trendingCasesTitle: 'ଭାଇରାଲ ସୋସିଆଲ ମିଡିଆ ମାମଲା (୧-କ୍ଲିକ୍ ଟେଷ୍ଟ)',
    verifiedTestLinks: 'ପ୍ରମାଣିତ ପରୀକ୍ଷଣ ଲିଙ୍କ୍',
    badgeDeepfakeTest: 'ଡିପଫେକ୍ ଟେଷ୍ଟ',
    badgeAuthenticVideo: 'ପ୍ରକୃତ ଭିଡିଓ',
    btnVerifyNow: 'ଏବେ ଯାଞ୍ଚ କରନ୍ତୁ',
    presets: {
      politicalSpeech: {
        title: '୫ଟି ଆଞ୍ଚଳିକ ଭାଷାରେ ରାଜନୈତିକ ନେତାଙ୍କ ଭାଷଣ',
        sourceText: 'YouTube Shorts • AI ଭଏସ୍ ଡବିଂ + ମୁହଁ ପରିବର୍ତ୍ତନ',
        category: 'ନିର୍ବାଚନୀ ଗୁଜବ'
      },
      celebEndorsement: {
        title: 'ସେଲିବ୍ରିଟିଙ୍କ କ୍ରିପ୍ଟୋ ସ୍କାମ୍ ବିଜ୍ଞାପନ ରିଲ୍',
        sourceText: 'Instagram Reel • ନ୍ୟୁରାଲ ଫେସ୍ ସ୍ୱାପ୍ + କ୍ଲୋନ୍ ଅଡିଓ',
        category: 'ଆର୍ଥିକ ଠକେଇ'
      },
      pressConference: {
        title: 'ମନ୍ତ୍ରଣାଳୟର ସିଧାସଳଖ ପ୍ରେସମିଟ୍',
        sourceText: 'X ଲାଇଭ୍ • ଅବିକଳ ପ୍ରକୃତ କ୍ୟାମେରା ଷ୍ଟ୍ରିମ୍',
        category: 'ପ୍ରମାଣିତ ମାନବ ଷ୍ଟ୍ରିମ୍'
      },
      whatsappEmergency: {
        title: 'ପରିବାର ସଦସ୍ୟଙ୍କ ଜରୁରୀ ସାହାଯ୍ୟ ଭଏସ୍ ନୋଟ୍',
        sourceText: 'WhatsApp ଅଡିଓ • ସିନ୍ଥେଟିକ୍ ଭଏସ୍ କ୍ଲୋନ୍',
        category: 'ଭଏସ୍ ପ୍ରତାରଣା'
      }
    }
  },

  as: {
    title: 'ছ’চিয়েল মিডিয়া আৰু ভিডিঅ’ লিংক ফেক্ট-চেকাৰ',
    subtitle: 'যিকোনো ইনষ্টাগ্ৰাম ৰিল, ইউটিউব শ্বৰ্ট বা ভিডিঅ’ লিংক পেষ্ট কৰি তাৎক্ষণিক ফৰেনচিক বিশ্লেষণ কৰক।',
    placeholder: 'https://instagram.com/reel/... অথবা https://youtube.com/shorts/...',
    errEmpty: 'অনুগ্ৰহ কৰি এক বৈধ ভিডিঅ’ বা ৰিল লিংক প্ৰদান কৰক।',
    errInvalidProtocol: 'URL নিশ্চয়কৈ https:// বা http:// ৰে আৰম্ভ হ’ব লাগিব।',
    btnAnalyze: 'লিংক পৰীক্ষা কৰক',
    btnExtracting: 'ফ্ৰেম সংগ্ৰহ চলি আছে...',
    supportedPlatforms: 'সমৰ্থিত প্লেটফৰ্ম:',
    platformYoutube: 'YouTube শ্বৰ্টছ আৰু ভিডিঅ’',
    platformInstagram: 'Instagram ৰিলছ',
    platformTwitter: 'X (Twitter) মিডিয়া',
    platformWhatsapp: 'WhatsApp পোনপটীয়া লিংক',
    trendingCasesTitle: 'ভাইৰেল ছ’চিয়েল মিডিয়া ঘটনা (১-ক্লিক পৰীক্ষা)',
    verifiedTestLinks: 'প্ৰমাণিত পৰীক্ষা লিংক',
    badgeDeepfakeTest: 'ডিপফেক টেষ্ট',
    badgeAuthenticVideo: 'প্ৰকৃত ভিডিঅ’',
    btnVerifyNow: 'এতিয়াই পৰীক্ষা কৰক',
    presets: {
      politicalSpeech: {
        title: '৫টা আঞ্চলিক ভাষাত ৰাজনৈতিক নেতাৰ ভাইৰেল ভাষণ',
        sourceText: 'YouTube Shorts • AI ভইচ ডাবিং + মুখ সলনি',
        category: 'নিৰ্বাচনী ভুৱা প্ৰচাৰ'
      },
      celebEndorsement: {
        title: 'তাৰকাৰ ক্ৰিপ্টো কেলেংকাৰী বিজ্ঞাপন ৰিল',
        sourceText: 'Instagram Reel • ফেস স্বাপ + ক্ল’ন কৰা অডিঅ’',
        category: 'বিত্তীয় প্ৰৱঞ্চনা'
      },
      pressConference: {
        title: 'চৰকাৰী মন্ত্ৰালয়ৰ পোনপটীয়া প্ৰেছ ব্ৰিফিং',
        sourceText: 'X লাইভ • অবিকৃত প্ৰকৃত কেমেৰা প্ৰৱাহ',
        category: 'প্ৰমাণিত মানৱ প্ৰৱাহ'
      },
      whatsappEmergency: {
        title: 'পৰিয়ালৰ সদস্যৰ জৰুৰী সাহায্যৰ অনুৰোধ ভইচ কল',
        sourceText: 'WhatsApp অডিঅ’ • কৃত্ৰিম ভইচ ক্ল’ন',
        category: 'কণ্ঠ নকল প্ৰৱঞ্চনা'
      }
    }
  },

  mai: {
    title: 'डायरेक्ट सोशल मीडिया आ वीडियो लिंक फैक्ट-चेकर',
    subtitle: 'कोनो इंस्टाग्राम रील, यूट्यूब शॉर्ट, ट्विटर वीडियो वा मीडिया लिंक पेस्ट क\'के तुरंत फोरेंसिक जांच करू।',
    placeholder: 'https://instagram.com/reel/... वा https://youtube.com/shorts/...',
    errEmpty: 'कृपया एकटा मान्य वीडियो वा रील लिंक दर्ज करू।',
    errInvalidProtocol: 'URL https:// वा http:// सँ शुरू होएबाक चाही।',
    btnAnalyze: 'लिंक जाँचू',
    btnExtracting: 'फ्रेम्स निकालल जा रहल अछि...',
    supportedPlatforms: 'समर्थित प्लेटफॉर्म:',
    platformYoutube: 'YouTube शॉर्ट्स आ वीडियो',
    platformInstagram: 'Instagram रील्स',
    platformTwitter: 'X (Twitter) मीडिया',
    platformWhatsapp: 'WhatsApp डायरेक्ट लिंक्स',
    trendingCasesTitle: 'वायरल सोशल मीडिया प्रकरण (1-क्लिक टेस्ट)',
    verifiedTestLinks: 'सत्यापित टेस्ट लिंक्स',
    badgeDeepfakeTest: 'डीपफेक टेस्ट',
    badgeAuthenticVideo: 'असली वीडियो',
    btnVerifyNow: 'एखने सत्यापित करू',
    presets: {
      politicalSpeech: {
        title: '5 क्षेत्रीय भाषा मे वायरल राजनीतिक नेताक भाषण',
        sourceText: 'YouTube Shorts • AI आवाज डबिंग + चेहरा बदलाव',
        category: 'चुनावी अफवाह'
      },
      celebEndorsement: {
        title: 'सेलिब्रिटीक क्रिप्टो घोटाला विज्ञापन रील',
        sourceText: 'Instagram Reel • न्यूरल फेस स्वैप + क्लोन आवाज',
        category: 'वित्तीय धोखाधड़ी'
      },
      pressConference: {
        title: 'आधिकारिक मंत्रालयक लाइव प्रेस ब्रीफिंग',
        sourceText: 'X लाइव • बिना छेड़छाड़क असली कैमरा स्ट्रीम',
        category: 'सत्यापित मानव स्ट्रीम'
      },
      whatsappEmergency: {
        title: 'परिवारक सदस्यक आपातकालीन सहायता वॉयस नोट',
        sourceText: 'WhatsApp ऑडियो • सिंथेटिक आवाज क्लोन',
        category: 'आवाजक नकल'
      }
    }
  },

  sat: {
    title: 'ᱥᱳᱥᱤᱭᱟᱞ ᱢᱤᱰᱤᱭᱟ ᱟᱨ ᱵᱷᱤᱰᱤᱭᱳ ᱞᱤᱝᱠ ᱥᱟᱹᱨᱤ ᱯᱚᱨᱠᱷᱟᱣ',
    subtitle: 'ᱡᱟᱦᱟᱸᱱᱟᱜ Instagram ᱨᱤᱞ, YouTube ᱠᱷᱟᱴᱚ ᱵᱷᱤᱰᱤᱭᱳ ᱞᱤᱝᱠ ᱮᱢ ᱠᱟᱛᱮ ᱞᱚᱜᱚᱱ ᱯᱚᱨᱠᱷᱟᱣ ᱢᱮ ᱾',
    placeholder: 'https://instagram.com/reel/... ᱵᱟᱝᱠᱷᱟᱱ https://youtube.com/shorts/...',
    errEmpty: 'ᱫᱟᱭᱟᱠᱟᱛᱮ ᱢᱤᱫ ᱥᱟᱹᱨᱤ ᱵᱷᱤᱰᱤᱭᱳ ᱞᱤᱝᱠ ᱮᱢ ᱢᱮ ᱾',
    errInvalidProtocol: 'URL ᱫᱚ https:// ᱵᱟᱝᱠᱷᱟᱱ http:// ᱛᱮ ᱮᱛᱚᱦᱚᱵ ᱦᱩᱭᱩᱜ-ᱟ ᱾',
    btnAnalyze: 'ᱞᱤᱝᱠ ᱯᱚᱨᱠᱷᱟᱣ ᱢᱮ',
    btnExtracting: 'ᱯᱷᱨᱮᱢ ᱚᱰᱚᱠᱚᱜ ᱠᱟᱱᱟ...',
    supportedPlatforms: 'ᱥᱟᱯᱳᱨᱴ ᱟᱠᱟᱱ ᱯᱞᱮᱴᱯᱷᱚᱨᱢ:',
    platformYoutube: 'YouTube ᱠᱷᱟᱴᱚ ᱵᱷᱤᱰᱤᱭᱳ',
    platformInstagram: 'Instagram ᱨᱤᱞᱥ',
    platformTwitter: 'X (Twitter) ᱢᱤᱰᱤᱭᱟ',
    platformWhatsapp: 'WhatsApp ᱥᱚᱡᱷᱮ ᱞᱤᱝᱠ',
    trendingCasesTitle: 'ᱵᱷᱟᱭᱨᱟᱞ ᱥᱳᱥᱤᱭᱟᱞ ᱢᱤᱰᱤᱭᱟ ᱠᱮᱥ (᱑-ᱠᱞᱤᱠ ᱴᱮᱥᱴ)',
    verifiedTestLinks: 'ᱯᱚᱨᱠᱷᱟᱣ ᱟᱠᱟᱱ ᱞᱤᱝᱠ',
    badgeDeepfakeTest: 'ᱰᱤᱯᱯᱷᱮᱠ ᱴᱮᱥᱴ',
    badgeAuthenticVideo: 'ᱥᱟᱹᱨᱤ ᱵᱷᱤᱰᱤᱭᱳ',
    btnVerifyNow: 'ᱱᱤᱛ ᱜᱮ ᱯᱚᱨᱠᱷᱟᱣ ᱢᱮ',
    presets: {
      politicalSpeech: {
        title: '᱕ ᱯᱟᱹᱨᱥᱤ ᱛᱮ ᱨᱟᱡᱽᱟᱹᱨᱤ ᱱᱮᱛᱟ ᱣᱟᱜ ᱵᱷᱟᱭᱨᱟᱞ ᱨᱚᱲ',
        sourceText: 'YouTube Shorts • AI ᱟᱲᱟᱝ ᱰᱟᱵᱤᱝ + ᱢᱮᱫᱦᱟ ᱵᱚᱫᱚᱞ',
        category: 'ᱵᱟᱪᱷᱱᱟᱣ ᱮᱲᱮ ᱠᱟᱛᱷᱟ'
      },
      celebEndorsement: {
        title: 'ᱧᱩᱛᱩᱢᱟᱱ ᱦᱚᱲᱟᱜ ᱠᱨᱤᱯᱴᱳ ᱮᱲᱮ ᱨᱤᱞ',
        sourceText: 'Instagram Reel • ᱢᱮᱫᱦᱟ ᱵᱚᱫᱚᱞ + ᱠᱞᱳᱱ ᱟᱲᱟᱝ',
        category: 'ᱴᱟᱠᱟ-ᱯᱩᱭᱥᱟᱹ ᱮᱲᱮ'
      },
      pressConference: {
        title: 'ᱥᱚᱨᱠᱟᱨᱤ ᱢᱚᱱᱛᱨᱤ ᱢᱟᱰᱮᱨᱟᱜ ᱞᱟᱭᱤᱵᱽ ᱯᱨᱮᱥ ᱠᱟᱛᱷᱟ',
        sourceText: 'X ᱞᱟᱭᱤᱵᱽ • ᱵᱟᱝ ᱵᱚᱫᱚᱞ ᱟᱠᱟᱱ ᱠᱮᱢᱮᱨᱟ ᱥᱴᱨᱤᱢ',
        category: 'ᱥᱟᱹᱨᱤ ᱢᱟᱹᱱᱢᱤ ᱥᱴᱨᱤᱢ'
      },
      whatsappEmergency: {
        title: 'ᱜᱷᱟᱨᱚᱸᱡᱽ ᱦᱚᱲᱟᱜ ᱞᱟᱹᱠᱛᱤᱭᱟᱱ ᱜᱚᱲᱚ ᱟᱲᱟᱝ ᱱᱳᱴ',
        sourceText: 'WhatsApp ᱚᱰᱤᱭᱳ • ᱵᱮᱱᱟᱣᱟᱜ ᱟᱲᱟᱝ ᱠᱞᱳᱱ',
        category: 'ᱟᱲᱟᱝ ᱮᱲᱮ'
      }
    }
  },

  ks: {
    title: 'سوشل میڈیا تہٕ ویڈیو لنک فیکٹ چیکر',
    subtitle: 'کونٛہہ تہِ انسٹاگرام ریل، یوٹیوب شارٹ یا میڈیا لنک درج کٔرتھ فوری فرانزک تجزیہ کٔریو۔',
    placeholder: 'https://instagram.com/reel/... یا https://youtube.com/shorts/...',
    errEmpty: 'مہر call بانی کٔرتھ صحیح ویڈیو یا ریل لنک دِیو۔',
    errInvalidProtocol: 'URL پزِ https:// یا http:// پؠٹھ شروع گژھُن۔',
    btnAnalyze: 'لنک جانچِیو',
    btnExtracting: 'فریم کڈنہٕ یوان چھِ...',
    supportedPlatforms: 'معاون پلیٹ فارم:',
    platformYoutube: 'YouTube شارٹس تہٕ ویڈیوز',
    platformInstagram: 'Instagram ریلز',
    platformTwitter: 'X (Twitter) میڈیا',
    platformWhatsapp: 'WhatsApp ڈائریکٹ لنکس',
    trendingCasesTitle: 'وائرل سوشل میڈیا کیسز (1-کلک ٹیسٹ)',
    verifiedTestLinks: 'تصدیق شدہ ٹیسٹ لنکس',
    badgeDeepfakeTest: 'ڈیپ فیک ٹیسٹ',
    badgeAuthenticVideo: 'اصلی ویڈیو',
    btnVerifyNow: 'فوری تصدیق کٔریو',
    presets: {
      politicalSpeech: {
        title: '5 زبانن منٛز وائرل سیاسی لیڈر سنٛد خطاب',
        sourceText: 'YouTube Shorts • AI آواز تہٕ چہرہ بدلاو',
        category: 'انتخابی غلط بیانی'
      },
      celebEndorsement: {
        title: 'مشہور شخصیت سنٛد فریب کرپٹو ریل',
        sourceText: 'Instagram Reel • فیس سویپ + کلون آواز',
        category: 'مالیاتی دھوکہ'
      },
      pressConference: {
        title: 'وزارتٕچ براہ راست پریس بریفنگ',
        sourceText: 'X لائیو • اصلی کیمرہ سٹریم',
        category: 'تصدیق شدہ اصلی سٹریم'
      },
      whatsappEmergency: {
        title: 'خاندانٕکؠ فردٕ سنٛز مددٕچ آواز کال',
        sourceText: 'WhatsApp آڈیو • مصنوعی وائس کلون',
        category: 'آواز دھوکہ'
      }
    }
  },

  ne: {
    title: 'प्रत्यक्ष सामाजिक सञ्जाल र भिडियो लिङ्क तथ्य-परीक्षक',
    subtitle: 'कुनै पनि इन्स्टाग्राम रील, युट्युब सर्ट वा भिडियो लिङ्क टाँसेर तत्काल फोरेन्सिक विश्लेषण गर्नुहोस्।',
    placeholder: 'https://instagram.com/reel/... वा https://youtube.com/shorts/...',
    errEmpty: 'कृपया मान्य भिडियो वा रील लिङ्क प्रविष्ट गर्नुहोस्।',
    errInvalidProtocol: 'URL https:// वा http:// बाट सुरु हुनुपर्छ।',
    btnAnalyze: 'लिङ्क विश्लेषण गर्नुहोस्',
    btnExtracting: 'फ्रेमहरू निकालिँदैछ...',
    supportedPlatforms: 'समर्थित प्लेटफर्महरू:',
    platformYoutube: 'YouTube सर्ट्स र भिडियोहरू',
    platformInstagram: 'Instagram रील्स',
    platformTwitter: 'X (Twitter) मिडिया',
    platformWhatsapp: 'WhatsApp प्रत्यक्ष लिङ्कहरू',
    trendingCasesTitle: 'भाइरल सामाजिक सञ्जाल केसहरू (१-क्लिक परीक्षण)',
    verifiedTestLinks: 'प्रमाणित परीक्षण लिङ्कहरू',
    badgeDeepfakeTest: 'डीपफेक परीक्षण',
    badgeAuthenticVideo: 'वास्तविक भिडियो',
    btnVerifyNow: 'अहिले प्रमाणित गर्नुहोस्',
    presets: {
      politicalSpeech: {
        title: '५ क्षेत्रीय भाषामा भाइरल राजनीतिक नेताको भाषण',
        sourceText: 'YouTube Shorts • AI आवाज डबिङ + अनुहार परिवर्तन',
        category: 'निर्वाचनी भ्रम'
      },
      celebEndorsement: {
        title: 'सेलिब्रिटीको क्रिप्टो ठगी प्रवर्द्धन रील',
        sourceText: 'Instagram Reel • न्युरल फेस स्वाप + क्लोन गरिएको अडियो',
        category: 'वित्तीय ठगी'
      },
      pressConference: {
        title: 'आधिकारिक मन्त्रालयको प्रत्यक्ष पत्रकार सम्मेलन',
        sourceText: 'X प्रत्यक्ष • अपरिवर्तित वास्तविक क्यामेरा स्ट्रिम',
        category: 'प्रमाणित मानव स्ट्रिम'
      },
      whatsappEmergency: {
        title: 'परिवारको सदस्यको आपतकालीन सहयोग माग्ने अडियो सन्देश',
        sourceText: 'WhatsApp अडियो • सिन्थेटिक भ्वाइस क्लोन',
        category: 'आवाज ठगी'
      }
    }
  },

  kok: {
    title: 'थेट सोशल मीडिया आनी व्हिडिओ लिंक फॅक्ट-चेकर',
    subtitle: 'कसलीच इन्स्टाग्राम रील, यूट्यूब शॉर्ट वा व्हिडिओ लिंक घालून बेगोबेग फॉरेन्सिक तपासणी करात.',
    placeholder: 'https://instagram.com/reel/... वा https://youtube.com/shorts/...',
    errEmpty: 'उपकार करून खरी व्हिडिओ वा रील लिंक दियात.',
    errInvalidProtocol: 'URL https:// वा http:// न सुरू जावंक जाय.',
    btnAnalyze: 'लिंक तपासात',
    btnExtracting: 'फ्रेम्स काडटा...',
    supportedPlatforms: 'समर्थित प्लॅटफॉर्म:',
    platformYoutube: 'YouTube शॉर्ट्स आनी व्हिडिओ',
    platformInstagram: 'Instagram रील्स',
    platformTwitter: 'X (Twitter) मीडिया',
    platformWhatsapp: 'WhatsApp थेट लिंक्स',
    trendingCasesTitle: 'व्हायरल सोशल मीडिया प्रकरण (१-क्लिक चांचणी)',
    verifiedTestLinks: 'तपाशिल्ल्यो चांचणी लिंक्स',
    badgeDeepfakeTest: 'डीपफेक चांचणी',
    badgeAuthenticVideo: 'खरो व्हिडिओ',
    btnVerifyNow: 'आतांच खात्री करात',
    presets: {
      politicalSpeech: {
        title: '५ प्रादेशिक भासांनी राजकीय फुढाऱ्याचें व्हायरल उलोवप',
        sourceText: 'YouTube Shorts • AI आवाज डबिंग + तोंड बदलोप',
        category: 'निवडणूक गैरसमज'
      },
      celebEndorsement: {
        title: 'प्रसिद्ध व्यक्तीची बनावट क्रिप्टो येवजण रील',
        sourceText: 'Instagram Reel • फेस स्वॅप + क्लोन आवाज',
        category: 'पैशांची फसवणूक'
      },
      pressConference: {
        title: 'अधिकृत मंत्रालयाची थेट पत्रकार परिशद',
        sourceText: 'X थेट • मूळ कॅमेरा प्रवाह',
        category: 'सत्यापित मानवी प्रवाह'
      },
      whatsappEmergency: {
        title: 'घरच्या मनशाचो तातडीच्या आदाराचो व्हॉइस मेसेज',
        sourceText: 'WhatsApp ऑडिओ • बनावटी व्हॉइस क्लोन',
        category: 'आवाज फसवणूक'
      }
    }
  },

  sd: {
    title: 'سوشل ميڊيا ۽ وڊيو لنڪ حقيقت جاچيندڙ',
    subtitle: 'ڪنهن به انسٽاگرام ريل، يوٽيوب شارٽ يا وڊيو لنڪ مان فوري فرانزڪ تجزيو حاصل ڪريو.',
    placeholder: 'https://instagram.com/reel/... يا https://youtube.com/shorts/...',
    errEmpty: 'مھرباني ڪري صحيح وڊيو يا ريل لنڪ داخل ڪريو.',
    errInvalidProtocol: 'URL لازمي طور https:// يا http:// سان شروع ٿئي.',
    btnAnalyze: 'لنڪ جو تجزيو ڪريو',
    btnExtracting: 'فريم ڪڍيا پيا وڃن...',
    supportedPlatforms: 'مددگار پليٽ فارم:',
    platformYoutube: 'YouTube شارٽس ۽ وڊيوز',
    platformInstagram: 'Instagram ريلز',
    platformTwitter: 'X (Twitter) ميڊيا',
    platformWhatsapp: 'WhatsApp سڌيون لنڪون',
    trendingCasesTitle: 'وائرل سوشل ميڊيا ڪيس (1-ڪلڪ ٽيسٽ)',
    verifiedTestLinks: 'تصديق ٿيل ٽيسٽ لنڪون',
    badgeDeepfakeTest: 'ڊيپ فيڪ ٽيسٽ',
    badgeAuthenticVideo: 'اصلي وڊيو',
    btnVerifyNow: 'هاڻي تصديق ڪريو',
    presets: {
      politicalSpeech: {
        title: '5 علائقائي ٻولين ۾ وائرل سياسي اڳواڻ جو خطاب',
        sourceText: 'YouTube Shorts • AI وائس ڊبنگ + چهرو تبديلي',
        category: 'چونڊ غلط معلومات'
      },
      celebEndorsement: {
        title: 'مشهور شخصيت جو جعلي ڪرپٽو اسڪيم ريل',
        sourceText: 'Instagram Reel • فيس سويپ + ڪلون آڊيو',
        category: 'مالي فراڊ'
      },
      pressConference: {
        title: 'سرڪاري وزارت جي سڌي ريت پريس بريفنگ',
        sourceText: 'X لائيو • اصلي ۽ اڻ بدلجندڙ ڪئميرا اسٽريم',
        category: 'تصديق ٿيل انساني اسٽريم'
      },
      whatsappEmergency: {
        title: 'خاندان جي ميمبر جي هنگامي مدد وارو وائس ميسيج',
        sourceText: 'WhatsApp آڊيو • مصنوعي وائس ڪلون',
        category: 'آواز جي ٺڳي'
      }
    }
  },

  doi: {
    title: 'सोशल मीडिया ते वीडियो लिंक फैक्ट-चेकर',
    subtitle: 'कुसै बी इंस्टाग्राम रील, यूट्यूब शार्ट या वीडियो लिंक गी पाईयै तुरंत फोरेंसिक जांच करो।',
    placeholder: 'https://instagram.com/reel/... या https://youtube.com/shorts/...',
    errEmpty: 'कृपा करियै सही वीडियो या रील लिंक पाओ।',
    errInvalidProtocol: 'URL https:// या http:// कन्नै शुरू होना लोड़दा ऐ।',
    btnAnalyze: 'लिंक जांचो',
    btnExtracting: 'फ्रेम कड्ढे जा करदे न...',
    supportedPlatforms: 'समर्थित प्लेटफॉर्म:',
    platformYoutube: 'YouTube शार्ट्स ते वीडियो',
    platformInstagram: 'Instagram रील्स',
    platformTwitter: 'X (Twitter) मीडिया',
    platformWhatsapp: 'WhatsApp डायरेक्ट लिंक्स',
    trendingCasesTitle: 'वायरल सोशल मीडिया मामले (1-क्लिक टेस्ट)',
    verifiedTestLinks: 'सत्यापित टेस्ट लिंक्स',
    badgeDeepfakeTest: 'डीपफेक टेस्ट',
    badgeAuthenticVideo: 'असली वीडियो',
    btnVerifyNow: 'हुने सत्यापित करो',
    presets: {
      politicalSpeech: {
        title: '5 क्षेत्रीय भाषाएं च वायरल नेता दा भाषण',
        sourceText: 'YouTube Shorts • AI आवाज डबिंग + चेहरा बदलाव',
        category: 'चुनावी अफवाह'
      },
      celebEndorsement: {
        title: 'मशहूर हस्ती दी नकली क्रिप्टो योजना रील',
        sourceText: 'Instagram Reel • फेस स्वैप + क्लोन आवाज',
        category: 'वित्तीय धोखाधड़ी'
      },
      pressConference: {
        title: 'सरकारी मंत्रालय दी लाइव प्रेस कान्फ्रेंस',
        sourceText: 'X लाइव • बिना छेड़छाड़ वाला असली कैमरा प्रवाह',
        category: 'सत्यापित असली प्रवाह'
      },
      whatsappEmergency: {
        title: 'रिश्तेदार दे नांऽ पर मदद मंगने वाला वॉयस नोट',
        sourceText: 'WhatsApp ऑडियो • बनावटी आवाज क्लोन',
        category: 'आवाज दी धोखाधड़ी'
      }
    }
  },

  mni: {
    title: 'সোসিএল মিডিয়া অমসুং ভিদিও লিঙ্ক ফেক্ট-চেকার',
    subtitle: 'Instagram রিল, YouTube সোর্ত নত্রগা ভিদিও লিঙ্ক হাপ্লগা মতম চানা ফোরেন্সিক চাংয়েং তৌবিয়ু।',
    placeholder: 'https://instagram.com/reel/... নত্রগা https://youtube.com/shorts/...',
    errEmpty: 'চুম্বা ভিদিও নত্রগা রিল লিঙ্ক অমা পিবিয়ু।',
    errInvalidProtocol: 'URL অসি https:// নত্রগা http:// দগী হৌগদবনি।',
    btnAnalyze: 'লিঙ্ক নৈনবিয়ু',
    btnExtracting: 'ফ্রেমশিং লৌথোক্লি...',
    supportedPlatforms: 'সপোর্ত তৌবা প্লেটফোর্মশিং:',
    platformYoutube: 'YouTube সোর্তশিং অমসুং ভিদিওশিং',
    platformInstagram: 'Instagram রিলশিং',
    platformTwitter: 'X (Twitter) মিডিয়া',
    platformWhatsapp: 'WhatsApp দাইরেক্ট লিঙ্কশিং',
    trendingCasesTitle: 'ভাইরেল সোসিএল মিডিয়া কেসশিং (১-ক্লিক তেষ্ট)',
    verifiedTestLinks: 'চুম্লবা তেষ্ট লিঙ্কশিং',
    badgeDeepfakeTest: 'দিপফেক তেষ্ট',
    badgeAuthenticVideo: 'অশেংবা ভিদিও',
    btnVerifyNow: 'হৌজিক চাংয়েং তৌউ',
    presets: {
      politicalSpeech: {
        title: 'মখল ৫গী লমদমগী লোলদা পোলিতিকেল লুচিংবগী ৱারোল',
        sourceText: 'YouTube Shorts • AI খোঞ্জেল দবিং + মাইথোং ওন্থোকপা',
        category: 'মীখলগী অরানবা ৱাফম'
      },
      celebEndorsement: {
        title: 'মমিং চৎলবা মীওইগী অরানবা কৃপ্তো স্কিম রিল',
        sourceText: 'Instagram Reel • মাইথোং ওন্থোকপা + ক্লোন খোঞ্জেল',
        category: 'শেন-থুমগী লান্না তৌবা'
      },
      pressConference: {
        title: 'মিনিষ্ট্রিগী অচুম্বা লাইভ প্রেস কনফরেন্স',
        sourceText: 'X লাইভ • হোংদবা অশেংবা কেমেরা স্ত্রীম',
        category: 'চুম্লবা মীওইবগী স্ত্রীম'
      },
      whatsappEmergency: {
        title: 'ইমুংগী মীওইগী অৱাবা মতেং নিজবা খোঞ্জেল মেসেজ',
        sourceText: 'WhatsApp ওদিও • সিন্থেটিক খোঞ্জেল ক্লোন',
        category: 'খোঞ্জেল শক্খঙহন্দুনা লান্না তৌবা'
      }
    }
  },

  brx: {
    title: 'सोसিয়ेल मिडिया आरो भिदिঅ\' लिंक सैथो बिजिरग्रा',
    subtitle: 'Instagram रिल, YouTube स\'र्ट एबा भिदिঅ\' लिंक होनानै हरखाब फरेन्सिक बिजिरनाय खालाम।',
    placeholder: 'https://instagram.com/reel/... एबा https://youtube.com/shorts/...',
    errEmpty: 'अननानै थि भिदिঅ\' एबा रिल लिंक हो।',
    errInvalidProtocol: 'URL आ https:// एबा http:// जों जागायनांगोन।',
    btnAnalyze: 'लिंक बिजिर',
    btnExtracting: 'फ्रेमफोर दिहुनगासिनो...',
    supportedPlatforms: 'मदद होनाय प्लेतफर्मफोर:',
    platformYoutube: 'YouTube स\'र्टस आरो भिदिঅ\'फोर',
    platformInstagram: 'Instagram रिल्स',
    platformTwitter: 'X (Twitter) मिडिया',
    platformWhatsapp: 'WhatsApp थोंजों लिंकफोर',
    trendingCasesTitle: 'भाइरेल सोसিয়ेल मिडिया जाथायफोर (१-क्लिक आनजाद)',
    verifiedTestLinks: 'थार आनजाद लिंकफोर',
    badgeDeepfakeTest: 'दिपफेक आनजाद',
    badgeAuthenticVideo: 'सैथो भिदिঅ\'',
    btnVerifyNow: 'दानो आनजाद खालाम',
    presets: {
      politicalSpeech: {
        title: '५ टा ओनसोलारि रावफोराव राजखान्थियारि दैदेनगिरिनि बिबुंथि',
        sourceText: 'YouTube Shorts • AI राव डाबिं + महर सोलायनाय',
        category: 'बिसायख\'थि नंखाय खौरां'
      },
      celebEndorsement: {
        title: 'मुंखां सुबुंनि नंखाय क्रिपट\' फावथाय रिल',
        sourceText: 'Instagram Reel • महर सोलायनाय + क्ल\'न अरडियो',
        category: 'रांखान्थियारि फावथाय'
      },
      pressConference: {
        title: 'सोरखारि मन्थ्रि बिफाननि लायभ खौरां बिबुंथि',
        sourceText: 'X लायभ • सोलायहैयि सैथो केमेरा प्रबाह',
        category: 'सैथो सुबुं प्रबाह'
      },
      whatsappEmergency: {
        title: 'नख\'रनि सुबुंनि गोनांथार मदद लुबैनाय राव मेसेज',
        sourceText: 'WhatsApp अरडियो • बानायनाय राव क्ल\'न',
        category: 'राव फावथाय'
      }
    }
  },

  sa: {
    title: 'प्रत्यक्ष-सामाजिक-माध्यम तथा चलचित्र-सम्पर्क सत्य-शोधकम्',
    subtitle: 'कस्यापि इंस्टाग्राम-रील, यूट्यूब-शॉर्ट अथवा चलचित्र-सम्पर्कं संस्थाप्य त्वरित-फोरेंसिक-परीक्षणं कुरुत।',
    placeholder: 'https://instagram.com/reel/... अथवा https://youtube.com/shorts/...',
    errEmpty: 'कृपया उचितं चलचित्र-सम्पर्कं प्रविशन्तु।',
    errInvalidProtocol: 'URL https:// अथवा http:// इत्यनेन प्रारब्धव्यम्।',
    btnAnalyze: 'सम्पर्कं परीक्षध्वम्',
    btnExtracting: 'चित्रांशाः निष्कास्यन्ते...',
    supportedPlatforms: 'समर्थितानि मञ्चानि:',
    platformYoutube: 'YouTube शॉर्ट्स तथा चलचित्राणि',
    platformInstagram: 'Instagram रील्स',
    platformTwitter: 'X (Twitter) माध्यमानि',
    platformWhatsapp: 'WhatsApp प्रत्यक्ष-सम्पर्काः',
    trendingCasesTitle: 'प्रसिद्धाः सामाजिक-माध्यम-घटनाः (१-क्लिक परीक्षणम्)',
    verifiedTestLinks: 'सत्यापिताः परीक्षण-सम्पर्काः',
    badgeDeepfakeTest: 'डीपफेक परीक्षणम्',
    badgeAuthenticVideo: 'यथार्थ-चलचित्रम्',
    btnVerifyNow: 'इदानीमेव परीक्षध्वम्',
    presets: {
      politicalSpeech: {
        title: 'पञ्च-क्षेत्रीय-भाषासु प्रचारितं राजनैतिक-नेतुः भाषणम्',
        sourceText: 'YouTube Shorts • AI ध्वनि-डबिंग + मुख-परिवर्तनम्',
        category: 'निर्वाचन-भ्रामकता'
      },
      celebEndorsement: {
        title: 'प्रसिद्ध-अभिनेतुः कल्पित-क्रिप्टो-योजना विज्ञापनम्',
        sourceText: 'Instagram Reel • न्यूरल मुख-परिवर्तनम् + प्रतिकृति-ध्वनिः',
        category: 'आर्थिक-प्रतारणा'
      },
      pressConference: {
        title: 'मन्त्रालयस्य प्रत्यक्ष-पत्रकार-सम्मेलनम्',
        sourceText: 'X प्रत्यक्षम् • अविकृतः वास्तविक-कॅमरा-प्रवाहः',
        category: 'सत्यापित-मानव-प्रवाहः'
      },
      whatsappEmergency: {
        title: 'पारिवारिक-जनस्य आपत्कालीन-साहाय्य-ध्वनि-सन्देशः',
        sourceText: 'WhatsApp ध्वनिः • कृत्रिम-ध्वनि-प्रतिकृतिः',
        category: 'ध्वनि-छद्मवेषः'
      }
    }
  }
};

export function getSocialLinkTranslations(language: string = 'en'): SocialLinkTexts {
  return socialLinkTranslations[language] || socialLinkTranslations.en;
}
