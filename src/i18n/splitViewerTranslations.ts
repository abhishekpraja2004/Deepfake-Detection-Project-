export interface SplitViewerTexts {
  title: string;
  subtitle: string;
  boxOn: string;
  boxOff: string;
  opacityLabel: string;
  rawInputLabel: string;
  heatmapLayerLabel: string;
  blendMarginTag: string;
  specularTag: string;
  lipSyncTag: string;
  legendRed: string;
  legendAmber: string;
  legendBlue: string;
  positionLabel: (orig: number, anom: number) => string;
  play: string;
  pause: string;
  slowMo: string;
  normalSpeed: string;
  stepForward: string;
  stepBackward: string;
  mute: string;
  unmute: string;
  frameLabel: string;
  fitFull: string;
  fitCover: string;
  fitModeLabel: string;
}

export function getSplitViewerTranslations(language: string = 'en'): SplitViewerTexts {
  switch (language) {
    case 'doi':
      return {
        title: 'इंटरैक्टिव स्प्लिट-फ्रेम तुलना दर्शक (Diff Viewer)',
        subtitle: 'मूल कैमरा इनपुट ते AI न्यूरल हीटमैप दी तुलना लेई बिचले स्लाइडर गी खिन्नो',
        boxOn: 'बाउंडिंग बॉक्स चालू (ON)',
        boxOff: 'बाउंडिंग बॉक्स बंद (OFF)',
        opacityLabel: 'हीटमैप दृश्यता:',
        rawInputLabel: 'मूल इनपुट (Original)',
        heatmapLayerLabel: 'फोरेंसिक हीटमैप लेयर (AI Anomaly)',
        blendMarginTag: 'चेहरे दे जोड़ पर विसंगति (98.4%)',
        specularTag: 'अक्खीं च असमान परछाईं',
        lipSyncTag: 'बुल्ल ते आवाज दा तालमेल खराब (Desync)',
        legendRed: 'लाल: उच्च बनावटी/फेक संभावना',
        legendAmber: 'पीला: समय अंतराल विसंगति',
        legendBlue: 'नीला: कुदरती मानवीय आधार',
        positionLabel: (orig, anom) => `स्प्लिट: ${orig}% मूल / ${anom}% खराबी`,
        play: 'चलाओ (Play)',
        pause: 'रोको (Pause)',
        slowMo: 'धीमी गति (0.5x)',
        normalSpeed: 'सामान्य गति (1.0x)',
        stepForward: 'अगला फ्रेम (+1)',
        stepBackward: 'पिछला फ्रेम (-1)',
        mute: 'म्यूट',
        unmute: 'आवाज चालू',
        frameLabel: 'फ्रेम',
        fitFull: 'पूरा फ्रेम (No Crop)',
        fitCover: 'स्क्रीन भरो (Fill)',
        fitModeLabel: 'व्यू मोड'
      };

    case 'pa':
      return {
        title: 'ਇੰਟਰਐਕਟਿਵ ਸਪਲਿਟ-ਫਰੇਮ ਤੁਲਨਾ ਦਰਸ਼ਕ (Diff Viewer)',
        subtitle: 'ਅਸਲ ਕੈਮਰਾ ਇਨਪੁੱਟ ਅਤੇ AI ਨਿਊਰਲ ਹੀਟਮੈਪ ਦੀ ਤੁਲਨਾ ਲਈ ਸਲਾਈਡਰ ਖਿੱਚੋ',
        boxOn: 'ਬਾਊਂਡਿੰਗ ਬਾਕਸ ਚਾਲੂ',
        boxOff: 'ਬਾਊਂਡਿੰਗ ਬਾਕਸ ਬੰਦ',
        opacityLabel: 'ਹੀਟਮੈਪ ਦਿੱਖ:',
        rawInputLabel: 'ਅਸਲ ਇਨਪੁੱਟ',
        heatmapLayerLabel: 'ਫੋਰੈਂਸਿਕ ਹੀਟਮੈਪ ਲੇਅਰ',
        blendMarginTag: 'ਚਿਹਰੇ ਦੇ ਜੋੜ ਤੇ ਖਰਾਬੀ (98.4%)',
        specularTag: 'ਅੱਖਾਂ ਵਿੱਚ ਅਸਮਾਨ ਰੌਸ਼ਨੀ',
        lipSyncTag: 'ਬੁੱਲ੍ਹ ਅਤੇ ਆਵਾਜ਼ ਦਾ ਅਸੰਤੁਲਨ',
        legendRed: 'ਲਾਲ: ਉੱਚ ਨਕਲੀ ਸੰਭਾਵਨਾ',
        legendAmber: 'ਪੀਲਾ: ਸਮਾਂ ਅੰਤਰਾਲ ਖਰਾਬੀ',
        legendBlue: 'ਨੀਲਾ: ਕੁਦਰਤੀ ਮਨੁੱਖੀ ਆਧਾਰ',
        positionLabel: (orig, anom) => `ਸਪਲਿਟ: ${orig}% ਅਸਲ / ${anom}% ਖਰਾਬੀ`,
        play: 'ਚਲਾਓ',
        pause: 'ਰੋਕੋ',
        slowMo: 'ਹੌਲੀ ਗਤੀ (0.5x)',
        normalSpeed: 'ਆਮ ਗਤੀ (1.0x)',
        stepForward: 'ਅਗਲਾ ਫਰੇਮ',
        stepBackward: 'ਪਿਛਲਾ ਫਰੇਮ',
        mute: 'ਮਿਊਟ',
        unmute: 'ਆਵਾਜ਼ ਚਾਲੂ',
        frameLabel: 'ਫਰੇਮ',
        fitFull: 'ਪੂਰਾ ਫਰੇਮ (No Crop)',
        fitCover: 'ਸਕਰੀਨ ਭਰੋ',
        fitModeLabel: 'ਵਿਊ ਮੋਡ'
      };

    case 'hi':
      return {
        title: 'इंटरैक्टिव स्प्लिट-फ्रेम तुलना दर्शक (Diff Viewer)',
        subtitle: 'मूल कैमरा इनपुट और AI न्यूरल हीटमैप की तुलना करने के लिए बीच के स्लाइडर को खींचें',
        boxOn: 'बाउंडिंग बॉक्स चालू (ON)',
        boxOff: 'बाउंडिंग बॉक्स बंद (OFF)',
        opacityLabel: 'हीटमैप दृश्यता:',
        rawInputLabel: 'मूल इनपुट (Original)',
        heatmapLayerLabel: 'फोरेंसिक हीटमैप लेयर (AI Anomaly)',
        blendMarginTag: 'चेहरे के जोड़ पर विसंगति (98.4%)',
        specularTag: 'आंखों में असमान परावर्तन',
        lipSyncTag: 'होंठ और आवाज का असंतुलन (Desync)',
        legendRed: 'लाल: उच्च कृत्रिम/फेक संभावना',
        legendAmber: 'पीला: समय अंतराल विसंगति',
        legendBlue: 'नीला: प्राकृतिक मानवीय आधार',
        positionLabel: (orig, anom) => `स्प्लिट: ${orig}% मूल / ${anom}% एनोमली`,
        play: 'चलाएं (Play)',
        pause: 'रोकें (Pause)',
        slowMo: 'धीमी गति (0.5x)',
        normalSpeed: 'सामान्य गति (1.0x)',
        stepForward: 'अगला फ्रेम (+1 Frame)',
        stepBackward: 'पिछला फ्रेम (-1 Frame)',
        mute: 'म्यूट',
        unmute: 'आवाज चालू',
        frameLabel: 'फ्रेम',
        fitFull: 'पूरा फ्रेम (No Crop)',
        fitCover: 'स्क्रीन भरें (Fill)',
        fitModeLabel: 'व्यू मोड'
      };

    case 'bho':
      return {
        title: 'इंटरैक्टिव स्प्लिट-फ्रेम तुलना दर्शक (Diff Viewer)',
        subtitle: 'असली कैमरा इनपुट आ AI न्यूरल हीटमैप के तुलना खातिर बीच के स्लाइडर घसकाईं',
        boxOn: 'बाउंडिंग बॉक्स चालू',
        boxOff: 'बाउंडिंग बॉक्स बंद',
        opacityLabel: 'हीटमैप दृश्यता:',
        rawInputLabel: 'मूल इनपुट (Original)',
        heatmapLayerLabel: 'फोरेंसिक हीटमैप लेयर (AI Anomaly)',
        blendMarginTag: 'चेहरा के जोड़ पर गड़बड़ी (98.4%)',
        specularTag: 'आंख के चमक में अंतर',
        lipSyncTag: 'होंठ आ आवाज के तालमेल गड़बड़',
        legendRed: 'लाल: जादा बनावटी/फेक संभावना',
        legendAmber: 'पीला: तालमेल विसंगति',
        legendBlue: 'नीला: प्राकृतिक इंसान आधार',
        positionLabel: (orig, anom) => `स्प्लिट: ${orig}% मूल / ${anom}% एनोमली`,
        play: 'चलाईं (Play)',
        pause: 'रोकीं (Pause)',
        slowMo: 'धीमा (0.5x)',
        normalSpeed: 'सामान्य (1.0x)',
        stepForward: 'अगिला फ्रेम (+1)',
        stepBackward: 'पिछिला फ्रेम (-1)',
        mute: 'म्यूट',
        unmute: 'आवाज चालू',
        frameLabel: 'फ्रेम',
        fitFull: 'पूरा फ्रेम (No Crop)',
        fitCover: 'स्क्रीन भरल',
        fitModeLabel: 'व्यू मोड'
      };

    case 'bn':
      return {
        title: 'ইন্টারেক্টিভ স্প্লিট-ফ্রেম ডিফারেন্স ভিউয়ার',
        subtitle: 'আসল ক্যামেরা ইনপুট এবং AI নিউরাল হিটম্যাপের তুলনা করতে মাঝের স্লাইডারটি টানুন',
        boxOn: 'বাউন্ডিং বক্স চালু (ON)',
        boxOff: 'বাউন্ডিং বক্স বন্ধ (OFF)',
        opacityLabel: 'হিটম্যাপ অপাসিটি:',
        rawInputLabel: 'মূল ইনপুট (Original)',
        heatmapLayerLabel: 'ফরেনসিক হিটম্যাপ লেয়ার (AI Anomaly)',
        blendMarginTag: 'মুখমণ্ডলের সীমানায় অসঙ্গতি (৯৮.৪%)',
        specularTag: 'চোখের আলোর অসামঞ্জস্য',
        lipSyncTag: 'ঠোঁট ও কণ্ঠের অসঙ্গতি (Desync)',
        legendRed: 'লাল: উচ্চ কৃত্রিম সম্ভাবনা',
        legendAmber: 'হলুদ: টাইমিং অসঙ্গতি',
        legendBlue: 'নীল: প্রাকৃতিক ভিত্তি',
        positionLabel: (orig, anom) => `স্প্লিট: ${orig}% আসল / ${anom}% ত্রুটি`,
        play: 'প্লে করুন',
        pause: 'পজ করুন',
        slowMo: 'ধীর গতি (0.5x)',
        normalSpeed: 'স্বাভাবিক (1.0x)',
        stepForward: 'পরবর্তী ফ্রেম',
        stepBackward: 'পূর্ববর্তী ফ্রেম',
        mute: 'মিউট',
        unmute: 'আনমিউট',
        frameLabel: 'ফ্রেম',
        fitFull: 'সম্পূর্ণ ফ্রেম (No Crop)',
        fitCover: 'স্ক্রিন পূর্ণ করুন',
        fitModeLabel: 'ভিউ মোড'
      };

    case 'te':
      return {
        title: 'ఇంటరాక్టివ్ స్ప్లిట్-ఫ్రేమ్ డిఫ్ వ్యూయర్',
        subtitle: 'కెమెరా ఇన్‌పుట్ మరియు AI హీట్‌మ్యాప్‌లను సరిపోల్చడానికి స్లైడర్‌ను లాగండి',
        boxOn: 'బౌండింగ్ బాక్స్‌లు ఆన్',
        boxOff: 'బౌండింగ్ బాక్స్‌లు ఆఫ్',
        opacityLabel: 'హీట్‌మ్యాప్ అస్పష్టత:',
        rawInputLabel: 'అసలు ఇన్‌పుట్',
        heatmapLayerLabel: 'ఫోరెన్సిక్ హీట్‌మ్యాప్ లేయర్',
        blendMarginTag: 'ముఖం సరిహద్దు అసమానత (98.4%)',
        specularTag: 'కంటి ప్రతిబింబ అసమానత',
        lipSyncTag: 'లిప్-సింక్ అసమతుల్యత',
        legendRed: 'ఎరుపు: అధిక సింథటిక్ సంభావ్యత',
        legendAmber: 'పసుపు: సమయ అసమతుల్యత',
        legendBlue: 'నీలం: సహజ మానవ ఆధారం',
        positionLabel: (orig, anom) => `స్ప్లిట్: ${orig}% అసలు / ${anom}% వ్యత్యాసం`,
        play: 'ప్లే చేయండి',
        pause: 'పాజ్ చేయండి',
        slowMo: 'నెమ్మది (0.5x)',
        normalSpeed: 'సాధారణం (1.0x)',
        stepForward: 'తదుపరి ఫ్రేమ్',
        stepBackward: 'మునుపటి ఫ్రేమ్',
        mute: 'మ్యూట్',
        unmute: 'అన్‌మ్యూట్',
        frameLabel: 'ఫ్రేమ్',
        fitFull: 'పూర్తి ఫ్రేమ్ (No Crop)',
        fitCover: 'స్క్రీన్ నింపండి',
        fitModeLabel: 'వ్యూ మోడ్'
      };

    case 'ta':
      return {
        title: 'இன்டராக்டிவ் ஸ்பிளிட்-பிரேம் டிஃப் வியூவர்',
        subtitle: 'கேமரா உள்ளீடு மற்றும் AI ஹீட்மேப்பை ஒப்பிட ஸ்லைடரை இழுக்கவும்',
        boxOn: 'எல்லை பெட்டிகள் ஆன்',
        boxOff: 'எல்லை பெட்டிகள் ஆஃப்',
        opacityLabel: 'ஹீட்மேப் ஒளிபுகாநிலை:',
        rawInputLabel: 'அசல் உள்ளீடு',
        heatmapLayerLabel: 'தடயவியல் ஹீட்மேப் அடுக்கு',
        blendMarginTag: 'முக எல்லை முரண்பாடு (98.4%)',
        specularTag: 'கண் பிரதிபலிப்பு சமச்சீரற்ற தன்மை',
        lipSyncTag: 'உதடு-ஒலி ஒத்திசைவின்மை',
        legendRed: 'சிவப்பு: அதிக செயற்கை சாத்தியம்',
        legendAmber: 'மஞ்சள்: நேர முரண்பாடு',
        legendBlue: 'நீலம்: இயற்கை மனித அடிப்படை',
        positionLabel: (orig, anom) => `பிளவு: ${orig}% அசல் / ${anom}% மாறுபாடு`,
        play: 'இயக்கு',
        pause: 'இடைநிறுத்து',
        slowMo: 'மெதுவான (0.5x)',
        normalSpeed: 'இயல்பான (1.0x)',
        stepForward: 'அடுத்த பிரேம்',
        stepBackward: 'முந்தைய பிரேம்',
        mute: 'ஒலியடக்கு',
        unmute: 'ஒலி இயக்கு',
        frameLabel: 'பிரேம்',
        fitFull: 'முழு பிரேம் (No Crop)',
        fitCover: 'திரை நிரப்பு',
        fitModeLabel: 'பார்வை முறை'
      };

    case 'mr':
      return {
        title: 'इंटरअॅक्टिव्ह स्प्लिट-फ्रेम तुलना दर्शक',
        subtitle: 'कॅमेरा इनपुट आणि AI न्यूरल हीटमॅपची तुलना करण्यासाठी स्लाइडर ड्रॅग करा',
        boxOn: 'बाउंडिंग बॉक्सेस चालू',
        boxOff: 'बाउंडिंग बॉक्सेस बंद',
        opacityLabel: 'हीटमॅप दृश्यता:',
        rawInputLabel: 'मूळ इनपुट',
        heatmapLayerLabel: 'फॉरेन्सिक हीटमॅप लेयर',
        blendMarginTag: 'चेहऱ्याच्या सीमेवरील विसंगती (९८.४%)',
        specularTag: 'डोळ्यांमधील असमान परावर्तन',
        lipSyncTag: 'ओठ आणि आवाज विसंगती',
        legendRed: 'लाल: उच्च बनावट शक्यता',
        legendAmber: 'पिवळा: वेळ विसंगती',
        legendBlue: 'निळा: नैसर्गिक मानवी आधार',
        positionLabel: (orig, anom) => `स्प्लिट: ${orig}% मूळ / ${anom}% विसंगती`,
        play: 'सुरू करा',
        pause: 'थांबवा',
        slowMo: 'हळू गती (0.5x)',
        normalSpeed: 'सामान्य गती (1.0x)',
        stepForward: 'पुढील फ्रेम',
        stepBackward: 'मागील फ्रेम',
        mute: 'म्यूट',
        unmute: 'अनम्यूट',
        frameLabel: 'फ्रेम',
        fitFull: 'पूर्ण फ्रेम (No Crop)',
        fitCover: 'स्क्रीन भरा',
        fitModeLabel: 'दृश्य मोड'
      };

    case 'gu':
      return {
        title: 'ઇન્ટરેક્ટિવ સ્પ્લિટ-ફ્રેમ ડિફ વ્યૂઅર',
        subtitle: 'કેમેરા ઇનપુટ અને AI હીટમેપની સરખામણી કરવા માટે સ્લાઇડર ખેંચો',
        boxOn: 'બાઉન્ડિંગ બોક્સ ચાલુ',
        boxOff: 'બાઉન્ડિંગ બોક્સ બંધ',
        opacityLabel: 'હીટમેપ દૃશ્યતા:',
        rawInputLabel: 'મૂળ ઇનપુટ',
        heatmapLayerLabel: 'ફોરેન્સિક હીટમેપ લેયર',
        blendMarginTag: 'ચહેરાની સીમા પર વિસંગતતા',
        specularTag: 'આંખના પ્રતિબિંબમાં તફાવત',
        lipSyncTag: 'હોઠ-અવાજ અસંતુલન',
        legendRed: 'લાલ: ઉચ્ચ સિન્થેટીક સંભાવના',
        legendAmber: 'પીળો: સમય વિસંગતતા',
        legendBlue: 'વાદળી: કુદરતી માનવ આધાર',
        positionLabel: (orig, anom) => `સ્પ્લિટ: ${orig}% મૂળ / ${anom}% વિસંગતતા`,
        play: 'ચલાવો',
        pause: 'રોકો',
        slowMo: 'ધીમી ગતિ (0.5x)',
        normalSpeed: 'સામાન્ય (1.0x)',
        stepForward: 'આગલી ફ્રેમ',
        stepBackward: 'પાછલી ફ્રેમ',
        mute: 'મ્યૂટ',
        unmute: 'અનમ્યૂટ',
        frameLabel: 'ફ્રેમ',
        fitFull: 'સંપૂર્ણ ફ્રેમ (No Crop)',
        fitCover: 'સ્ક્રીન ભરો',
        fitModeLabel: 'દૃશ્ય મોડ'
      };

    case 'ur':
      return {
        title: 'انٹرایکٹو اسپلٹ فریم موازنہ ویور',
        subtitle: 'اصلی کیمرہ ان پٹ اور AI ہیٹ میپ کا موازنہ کرنے کے لیے سلائیڈر کو گھسیٹیں',
        boxOn: 'باؤنڈنگ باکس آن',
        boxOff: 'باؤنڈنگ باکس آف',
        opacityLabel: 'ہیٹ میپ کی شفافیت:',
        rawInputLabel: 'اصلی ان پٹ',
        heatmapLayerLabel: 'فارنزک ہیٹ میپ لیئر',
        blendMarginTag: 'چہرے کے جوڑ میں عدم مطابقت (98.4%)',
        specularTag: 'آنکھوں کی چمک میں فرق',
        lipSyncTag: 'ہونٹوں اور آواز کا عدم توازن',
        legendRed: 'سرخ: زیادہ مصنوعی/جعلی امکان',
        legendAmber: 'پیلا: وقتی عدم مطابقت',
        legendBlue: 'نیلا: قدرتی انسانی بنیاد',
        positionLabel: (orig, anom) => `اسپلٹ: ${orig}% اصلی / ${anom}% خرابی`,
        play: 'چلائیں',
        pause: 'روکیں',
        slowMo: 'سست رفتار (0.5x)',
        normalSpeed: 'عام رفتار (1.0x)',
        stepForward: 'اگلا فریم',
        stepBackward: 'پچھلا فریم',
        mute: 'میوٹ',
        unmute: 'آواز آن',
        frameLabel: 'فریم',
        fitFull: 'مکمل فریم (No Crop)',
        fitCover: 'اسکرین بھریں',
        fitModeLabel: 'ویو موڈ'
      };

    default:
      return {
        title: 'Interactive Split-Frame Diff Viewer',
        subtitle: 'Drag the center slider to compare raw camera input against neural artifact heatmaps',
        boxOn: 'Bounding Boxes ON',
        boxOff: 'Bounding Boxes OFF',
        opacityLabel: 'Heatmap Opacity:',
        rawInputLabel: 'Original Raw Input',
        heatmapLayerLabel: 'Forensic Heatmap Layer',
        blendMarginTag: 'Blend Margin Inconsistency (98.4%)',
        specularTag: 'Specular Asymmetry',
        lipSyncTag: 'Wav2Lip Viseme Desync',
        legendRed: 'Red: High Synthetic Probability',
        legendAmber: 'Amber: Temporal Desync',
        legendBlue: 'Blue: Natural Human Base',
        positionLabel: (orig, anom) => `Split: ${Math.round(orig)}% Original / ${100 - Math.round(orig)}% Anomaly`,
        play: 'Play',
        pause: 'Pause',
        slowMo: 'Slow-Mo (0.5x)',
        normalSpeed: 'Normal (1.0x)',
        stepForward: '+1 Frame',
        stepBackward: '-1 Frame',
        mute: 'Mute',
        unmute: 'Unmute',
        frameLabel: 'Frame',
        fitFull: 'Fit Full Frame (No Crop)',
        fitCover: 'Fill Container',
        fitModeLabel: 'Display'
      };
  }
}
