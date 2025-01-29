// Supported languages
export const SUPPORTED_LANGUAGES = {
  en: 'English',
  hi: 'हिंदी',
  mr: 'मराठी',
  gu: 'ગુજરાતી',
  bn: 'বাংলা',
  ta: 'தமிழ்'
} as const;

export type Language = keyof typeof SUPPORTED_LANGUAGES;

// Translation strings
export const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    inventory: 'Inventory',
    ratings: 'Ratings',
    sustainability: 'Sustainability',
    settings: 'Settings',
    logout: 'Logout',

    // Dashboard
    welcomeMessage: "Welcome back! Here's what's happening with your store today.",
    addNewItem: 'Add New Item',
    totalOrders: 'Total Orders',
    totalRevenue: 'Total Revenue',
    averageOrder: 'Average Order',
    activeCustomers: 'Active Customers',
    fromLastMonth: 'from last month',
    recentOrders: 'Recent Orders',
    viewAll: 'View All',
    lowStockItems: 'Low Stock Items',
    orderStatus: {
      pending: 'Pending',
      confirmed: 'Confirmed',
      completed: 'Completed',
      cancelled: 'Cancelled'
    },
    stockStatus: {
      inStock: 'In Stock',
      lowStock: 'Low Stock',
      outOfStock: 'Out of Stock'
    },
    customer: 'Customer',
    items: 'Items',
    total: 'Total',
    status: 'Status',
    pickupTime: 'Pickup Time',
    actions: 'Actions',
    quantity: 'Quantity',
    unit: 'Unit',
    price: 'Price',
    search: 'Search',
    filter: 'Filter',
    filterByStatus: 'Filter by status',
    all: 'All',

    // Inventory
    productName: 'Product Name',
    category: 'Category',
    stock: 'Stock',
    edit: 'Edit',
    delete: 'Delete',

    // Common
    save: 'Save',
    cancel: 'Cancel',
    selectLanguage: 'Select Language',
    description: 'Description',
    date: 'Date',

    // Ratings
    vendorRating: 'Vendor Rating',
    reviews: 'reviews',
    metrics: {
      quality: 'Quality',
      pricing: 'Pricing',
      freshness: 'Freshness',
      cleanliness: 'Cleanliness',
      service: 'Service'
    },
    qualityBadges: 'Quality Badges',
    visibility: {
      high: 'High Visibility',
      normal: 'Normal Visibility',
      reduced: 'Reduced Visibility',
      limited: 'Limited Visibility',
      score: 'Score'
    },
    priceCompetitiveness: {
      title: 'Price Competitiveness',
      status: {
        low: 'Low',
        moderate: 'Moderate',
        high: 'High'
      },
      score: 'Comparison Score'
    },
    warningFlags: {
      title: 'Warning Flags',
      priceInflation: 'Price Inflation',
      lastReported: 'Last Reported'
    },
    improvement: {
      title: 'Improvement Suggestions',
      pricing: 'Consider adjusting prices to be more competitive',
      stock: 'Maintain consistent stock of popular items'
    },
    reviews: {
      title: 'Customer Reviews',
      verified: 'Verified Purchase',
      helpful: 'Helpful',
      reply: 'Reply',
      report: 'Report'
    },
    priceReports: {
      title: 'Price Reports',
      item: 'Item',
      price: 'Price',
      previousPrice: 'Previous Price',
      reportType: {
        increase: 'Price Increase',
        regular: 'Regular Update'
      },
      reportedAt: 'Reported At',
      verified: 'Verified'
    }
  },
  hi: {
    // Navigation
    dashboard: 'डैशबोर्ड',
    inventory: 'इन्वेंटरी',
    ratings: 'रेटिंग्स',
    sustainability: 'सस्टेनेबिलिटी',
    settings: 'सेटिंग्स',
    logout: 'लॉग आउट',

    // Dashboard
    welcomeMessage: 'वापस स्वागत है! आज आपकी दुकान में क्या हो रहा है।',
    addNewItem: 'नया आइटम जोड़ें',
    totalOrders: 'कुल ऑर्डर',
    totalRevenue: 'कुल राजस्व',
    averageOrder: 'औसत ऑर्डर',
    activeCustomers: 'सक्रिय ग्राहक',
    fromLastMonth: 'पिछले महीने से',
    recentOrders: 'हाल के ऑर्डर',
    viewAll: 'सभी देखें',
    lowStockItems: 'कम स्टॉक वाले आइटम',
    orderStatus: {
      pending: 'लंबित',
      confirmed: 'पुष्टि की गई',
      completed: 'पूर्ण',
      cancelled: 'रद्द'
    },
    stockStatus: {
      inStock: 'स्टॉक में',
      lowStock: 'कम स्टॉक',
      outOfStock: 'स्टॉक खत्म'
    },
    customer: 'ग्राहक',
    items: 'आइटम',
    total: 'कुल',
    status: 'स्थिति',
    pickupTime: 'पिकअप का समय',
    actions: 'कार्रवाई',
    quantity: 'मात्रा',
    unit: 'इकाई',
    price: 'कीमत',
    search: 'खोजें',
    filter: 'फ़िल्टर',
    filterByStatus: 'स्थिति के अनुसार फ़िल्टर करें',
    all: 'सभी',

    // Common
    save: 'सेव करें',
    cancel: 'रद्द करें',
    selectLanguage: 'भाषा चुनें',
    description: 'विवरण',
    date: 'तारीख',

    // Ratings
    vendorRating: 'विक्रेता रेटिंग',
    reviews: 'समीक्षाएं',
    metrics: {
      quality: 'गुणवत्ता',
      pricing: 'मूल्य निर्धारण',
      freshness: 'ताज़गी',
      cleanliness: 'स्वच्छता',
      service: 'सेवा'
    },
    qualityBadges: 'गुणवत्ता बैज',
    visibility: {
      high: 'उच्च दृश्यता',
      normal: 'सामान्य दृश्यता',
      reduced: 'कम दृश्यता',
      limited: 'सीमित दृश्यता',
      score: 'स्कोर'
    },
    priceCompetitiveness: {
      title: 'मूल्य प्रतिस्पर्धा',
      status: {
        low: 'कम',
        moderate: 'मध्यम',
        high: 'उच्च'
      },
      score: 'तुलना स्कोर'
    },
    warningFlags: {
      title: 'चेतावनी फ्लैग',
      priceInflation: 'मूल्य वृद्धि',
      lastReported: 'अंतिम रिपोर्ट'
    },
    improvement: {
      title: 'सुधार सुझाव',
      pricing: 'कीमतों को अधिक प्रतिस्पर्धी बनाने पर विचार करें',
      stock: 'लोकप्रिय वस्तुओं का स्टॉक बनाए रखें'
    },
    reviews: {
      title: 'ग्राहक समीक्षाएं',
      verified: 'सत्यापित खरीद',
      helpful: 'सहायक',
      reply: 'जवाब दें',
      report: 'रिपोर्ट'
    },
    priceReports: {
      title: 'मूल्य रिपोर्ट',
      item: 'वस्तु',
      price: 'कीमत',
      previousPrice: 'पिछली कीमत',
      reportType: {
        increase: 'मूल्य वृद्धि',
        regular: 'नियमित अपडेट'
      },
      reportedAt: 'रिपोर्ट की गई',
      verified: 'सत्यापित'
    }
  },
  mr: {
    // Navigation
    dashboard: 'डॅशबोर्ड',
    inventory: 'इन्व्हेंटरी',
    ratings: 'रेटिंग्स',
    sustainability: 'सस्टेनेबिलिटी',
    settings: 'सेटिंग्स',
    logout: 'लॉग आउट',

    // Dashboard
    welcomeMessage: 'पुन्हा स्वागत आहे! आज तुमच्या दुकानात काय चालू आहे.',
    addNewItem: 'नवीन आयटम जोडा',
    totalOrders: 'एकूण ऑर्डर्स',
    totalRevenue: 'एकूण महसूल',
    averageOrder: 'सरासरी ऑर्डर',
    activeCustomers: 'सक्रिय ग्राहक',
    fromLastMonth: 'मागील महिन्यापासून',
    recentOrders: 'अलीकडील ऑर्डर्स',
    viewAll: 'सर्व पहा',
    lowStockItems: 'कमी स्टॉक असलेले आयटम्स',
    orderStatus: {
      pending: 'प्रलंबित',
      confirmed: 'पुष्टी केली',
      completed: 'पूर्ण',
      cancelled: 'रद्द'
    },
    stockStatus: {
      inStock: 'स्टॉक मध्ये',
      lowStock: 'कमी स्टॉक',
      outOfStock: 'स्टॉक संपला'
    },
    customer: 'ग्राहक',
    items: 'आयटम्स',
    total: 'एकूण',
    status: 'स्थिती',
    pickupTime: 'पिकअप वेळ',
    actions: 'क्रिया',
    quantity: 'प्रमाण',
    unit: 'युनिट',
    price: 'किंमत',
    search: 'शोधा',
    filter: 'फिल्टर',
    filterByStatus: 'स्थितीनुसार फिल्टर करा',
    all: 'सर्व',

    // Common
    save: 'सेव करा',
    cancel: 'रद्द करा',
    selectLanguage: 'भाषा निवडा',
    description: 'वर्णन',
    date: 'तारीख',

    // Ratings
    vendorRating: 'विक्रेता रेटिंग',
    reviews: 'रिव्ह्यूज',
    metrics: {
      quality: 'गुणवत्ता',
      pricing: 'किंमत',
      freshness: 'ताजेपणा',
      cleanliness: 'स्वच्छता',
      service: 'सेवा'
    },
    qualityBadges: 'गुणवत्ता बॅजेस',
    visibility: {
      high: 'उच्च दृश्यमानता',
      normal: 'सामान्य दृश्यमानता',
      reduced: 'कमी दृश्यमानता',
      limited: 'मर्यादित दृश्यमानता',
      score: 'स्कोअर'
    },
    priceCompetitiveness: {
      title: 'किंमत स्पर्धात्मकता',
      status: {
        low: 'कमी',
        moderate: 'मध्यम',
        high: 'उच्च'
      },
      score: 'तुलना स्कोअर'
    },
    warningFlags: {
      title: 'चेतावणी फ्लॅग्स',
      priceInflation: 'किंमत वाढ',
      lastReported: 'शेवटची नोंद'
    },
    improvement: {
      title: 'सुधारणा सूचना',
      pricing: 'किंमती अधिक स्पर्धात्मक करण्याचा विचार करा',
      stock: 'लोकप्रिय वस्तूंचा स्टॉक सातत्याने ठेवा'
    },
    reviews: {
      title: 'ग्राहक रिव्ह्यूज',
      verified: 'सत्यापित खरेदी',
      helpful: 'उपयुक्त',
      reply: 'उत्तर द्या',
      report: 'तक्रार करा'
    },
    priceReports: {
      title: 'किंमत अहवाल',
      item: 'वस्तू',
      price: 'किंमत',
      previousPrice: 'मागील किंमत',
      reportType: {
        increase: 'किंमत वाढ',
        regular: 'नियमित अपडेट'
      },
      reportedAt: 'नोंदणी वेळ',
      verified: 'सत्यापित'
    }
  },
  gu: {
    // Navigation
    dashboard: 'ડેશબોર્ડ',
    inventory: 'ઇન્વેન્ટરી',
    ratings: 'રેટિંગ્સ',
    sustainability: 'સ્થિરતા',
    settings: 'સેટિંગ્સ',
    logout: 'લૉગ આઉટ',

    // Dashboard
    welcomeMessage: 'પાછા આવ્યા! આજે તમારી દુકાનમાં શું થઈ રહ્યું છે.',
    addNewItem: 'નવી વસ્તુ ઉમેરો',
    totalOrders: 'કુલ ઓર્ડર',
    totalRevenue: 'કુલ આવક',
    averageOrder: 'સરેરાશ ઓર્ડર',
    activeCustomers: 'સક્રિય ગ્રાહકો',
    fromLastMonth: 'ગયા મહિનાથી',
    recentOrders: 'તાજેતરના ઓર્ડર',
    viewAll: 'બધા જુઓ',
    lowStockItems: 'ઓછો સ્ટોક ધરાવતી વસ્તુઓ',
    orderStatus: {
      pending: 'બાકી',
      confirmed: 'પુષ્ટિ કરેલ',
      completed: 'પૂર્ણ',
      cancelled: 'રદ'
    },
    stockStatus: {
      inStock: 'સ્ટોકમાં',
      lowStock: 'ઓછો સ્ટોક',
      outOfStock: 'સ્ટોક ખતમ'
    },
    customer: 'ગ્રાહક',
    items: 'વસ્તુઓ',
    total: 'કુલ',
    status: 'સ્થિતિ',
    pickupTime: 'પિકઅપ સમય',
    actions: 'ક્રિયાઓ',
    quantity: 'જથ્થો',
    unit: 'એકમ',
    price: 'કિંમત',
    search: 'શોધો',
    filter: 'ફિલ્ટર',
    filterByStatus: 'સ્થિતિ દ્વારા ફિલ્ટર કરો',
    all: 'બધા',

    // Common
    save: 'સેવ કરો',
    cancel: 'રદ કરો',
    selectLanguage: 'ભાષા પસંદ કરો',
    description: 'વર્ણન',
    date: 'તારીખ',

    // Ratings
    vendorRating: 'વિક્રેતા રેટિંગ',
    reviews: 'રિવ્યુઝ',
    metrics: {
      quality: 'ગુણવત્તા',
      pricing: 'કિંમત',
      freshness: 'તાજગી',
      cleanliness: 'સ્વચ્છતા',
      service: 'સેવા'
    },
    qualityBadges: 'ગુણવત્તા બેજ',
    visibility: {
      high: 'ઉચ્ચ દૃશ્યતા',
      normal: 'સામાન્ય દૃશ્યતા',
      reduced: 'ઘટેલી દૃશ્યતા',
      limited: 'મર્યાદિત દૃશ્યતા',
      score: 'સ્કોર'
    },
    priceCompetitiveness: {
      title: 'કિંમત સ્પર્ધાત્મકતા',
      status: {
        low: 'નીચી',
        moderate: 'મધ્યમ',
        high: 'ઉચ્ચ'
      },
      score: 'તુલના સ્કોર'
    },
    warningFlags: {
      title: 'ચેતવણી ફ્લેગ્સ',
      priceInflation: 'કિંમત વધારો',
      lastReported: 'છેલ્લી નોંધ'
    },
    improvement: {
      title: 'સુધારણા સૂચનો',
      pricing: 'કિંમતોને વધુ સ્પર્ધાત્મક બનાવવા વિચારો',
      stock: 'લોકપ્રિય વસ્તુઓનો સ્ટોક જાળવો'
    },
    reviews: {
      title: 'ગ્રાહક રિવ્યુઝ',
      verified: 'ચકાસાયેલ ખરીદી',
      helpful: 'મદદરૂપ',
      reply: 'જવાબ',
      report: 'રિપોર્ટ'
    },
    priceReports: {
      title: 'કિંમત રિપોર્ટ્સ',
      item: 'વસ્તુ',
      price: 'કિંમત',
      previousPrice: 'અગાઉની કિંમત',
      reportType: {
        increase: 'કિંમત વધારો',
        regular: 'નિયમિત અપડેટ'
      },
      reportedAt: 'નોંધાયેલ સમય',
      verified: 'ચકાસાયેલ'
    }
  },
  bn: {
    // Navigation
    dashboard: 'ড্যাশবোর্ড',
    inventory: 'ইনভেন্টরি',
    ratings: 'রেটিংস',
    sustainability: 'সাস্টেইনেবিলিটি',
    settings: 'সেটিংস',
    logout: 'লগ আউট',

    // Dashboard
    welcomeMessage: 'ফিরে আসার জন্য স্বাগতম! আজ আপনার দোকানে কী ঘটছে।',
    addNewItem: 'নতুন আইটেম যোগ করুন',
    totalOrders: 'মোট অর্ডার',
    totalRevenue: 'মোট রাজস্ব',
    averageOrder: 'গড় অর্ডার',
    activeCustomers: 'সক্রিয় গ্রাহক',
    fromLastMonth: 'গত মাস থেকে',
    recentOrders: 'সাম্প্রতিক অর্ডার',
    viewAll: 'সব দেখুন',
    lowStockItems: 'কম স্টক আইটেম',
    orderStatus: {
      pending: 'অপেক্ষমান',
      confirmed: 'নিশ্চিত',
      completed: 'সম্পন্ন',
      cancelled: 'বাতিল'
    },
    stockStatus: {
      inStock: 'স্টকে আছে',
      lowStock: 'কম স্টক',
      outOfStock: 'স্টক শেষ'
    },
    customer: 'গ্রাহক',
    items: 'আইটেম',
    total: 'মোট',
    status: 'স্থিতি',
    pickupTime: 'পিকআপ সময়',
    actions: 'কার্যক্রম',
    quantity: 'পরিমাণ',
    unit: 'একক',
    price: 'মূল্য',
    search: 'অনুসন্ধান',
    filter: 'ফিল্টার',
    filterByStatus: 'স্থিতি অনুযায়ী ফিল্টার',
    all: 'সব',

    // Common
    save: 'সেভ করুন',
    cancel: 'বাতিল করুন',
    selectLanguage: 'ভাষা নির্বাচন করুন',
    description: 'বিবরণ',
    date: 'তারিখ',

    // Ratings
    vendorRating: 'বিক্রেতা রেটিং',
    reviews: 'রিভিউ',
    metrics: {
      quality: 'গুণমান',
      pricing: 'মূল্য',
      freshness: 'তাজা',
      cleanliness: 'পরিচ্ছন্নতা',
      service: 'সেবা'
    },
    qualityBadges: 'গুণমান ব্যাজ',
    visibility: {
      high: 'উচ্চ দৃশ্যমানতা',
      normal: 'সাধারণ দৃশ্যমানতা',
      reduced: 'হ্রাসকৃত দৃশ্যমানতা',
      limited: 'সীমিত দৃশ্যমানতা',
      score: 'স্কোর'
    },
    priceCompetitiveness: {
      title: 'মূল্য প্রতিযোগিতা',
      status: {
        low: 'কম',
        moderate: 'মাঝারি',
        high: 'উচ্চ'
      },
      score: 'তুলনামূলক স্কোর'
    },
    warningFlags: {
      title: 'সতর্কতা ফ্ল্যাগ',
      priceInflation: 'মূল্য বৃদ্ধি',
      lastReported: 'সর্বশেষ রিপোর্ট'
    },
    improvement: {
      title: 'উন্নতির পরামর্শ',
      pricing: 'মূল্য আরও প্রতিযোগিতামূলক করার বিবেচনা করুন',
      stock: 'জনপ্রিয় পণ্যের স্টক বজায় রাখুন'
    },
    reviews: {
      title: 'গ্রাহক রিভিউ',
      verified: 'যাচাইকৃত ক্রয়',
      helpful: 'সহায়ক',
      reply: 'উত্তর',
      report: 'রিপোর্ট'
    },
    priceReports: {
      title: 'মূল্য রিপোর্ট',
      item: 'পণ্য',
      price: 'মূল্য',
      previousPrice: 'পূর্ববর্তী মূল্য',
      reportType: {
        increase: 'মূল্য বৃদ্ধি',
        regular: 'নিয়মিত আপডেট'
      },
      reportedAt: 'রিপোর্ট করার সময়',
      verified: 'যাচাইকৃত'
    }
  },
  ta: {
    // Navigation
    dashboard: 'டாஷ்போர்டு',
    inventory: 'சரக்கு',
    ratings: 'மதிப்பீடுகள்',
    sustainability: 'நிலைத்தன்மை',
    settings: 'அமைப்புகள்',
    logout: 'வெளியேறு',

    // Dashboard
    welcomeMessage: 'மீண்டும் வரவேற்கிறோம்! இன்று உங்கள் கடையில் என்ன நடக்கிறது.',
    addNewItem: 'புதிய பொருளைச் சேர்',
    totalOrders: 'மொத்த ஆர்டர்கள்',
    totalRevenue: 'மொத்த வருவாய்',
    averageOrder: 'சராசரி ஆர்டர்',
    activeCustomers: 'செயலில் உள்ள வாடிக்கையாளர்கள்',
    fromLastMonth: 'கடந்த மாதத்திலிருந்து',
    recentOrders: 'சமீபத்திய ஆர்டர்கள்',
    viewAll: 'அனைத்தையும் காட்டு',
    lowStockItems: 'குறைந்த இருப்பு பொருட்கள்',
    orderStatus: {
      pending: 'நிலுவையில்',
      confirmed: 'உறுதி செய்யப்பட்டது',
      completed: 'முடிந்தது',
      cancelled: 'ரத்து செய்யப்பட்டது'
    },
    stockStatus: {
      inStock: 'கையிருப்பில்',
      lowStock: 'குறைந்த இருப்பு',
      outOfStock: 'இருப்பு இல்லை'
    },
    customer: 'வாடிக்கையாளர்',
    items: 'பொருட்கள்',
    total: 'மொத்தம்',
    status: 'நிலை',
    pickupTime: 'பிக்கப் நேரம்',
    actions: 'செயல்கள்',
    quantity: 'அளவு',
    unit: 'அலகு',
    price: 'விலை',
    search: 'தேடு',
    filter: 'வடிகட்டு',
    filterByStatus: 'நிலை மூலம் வடிகட்டு',
    all: 'அனைத்தும்',

    // Common
    save: 'சேமிக்கவும்',
    cancel: 'ரத்து செய்யவும்',
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    description: 'விளக்கம்',
    date: 'தேதி',

    // Ratings
    vendorRating: 'விற்பனையாளர் மதிப்பீடு',
    reviews: 'விமர்சனங்கள்',
    metrics: {
      quality: 'தரம்',
      pricing: 'விலை',
      freshness: 'புதுமை',
      cleanliness: 'தூய்மை',
      service: 'சேவை'
    },
    qualityBadges: 'தர பேட்ஜ்கள்',
    visibility: {
      high: 'உயர் தெரிவுநிலை',
      normal: 'சாதாரண தெரிவுநிலை',
      reduced: 'குறைந்த தெரிவுநிலை',
      limited: 'வரையறுக்கப்பட்ட தெரிவுநிலை',
      score: 'மதிப்பெண்'
    },
    priceCompetitiveness: {
      title: 'விலை போட்டித்தன்மை',
      status: {
        low: 'குறைவு',
        moderate: 'மிதமான',
        high: 'உயர்'
      },
      score: 'ஒப்பீட்டு மதிப்பெண்'
    },
    warningFlags: {
      title: 'எச்சரிக்கை குறிகள்',
      priceInflation: 'விலை உயர்வு',
      lastReported: 'கடைசியாக புகாரளிக்கப்பட்டது'
    },
    improvement: {
      title: 'மேம்பாட்டு பரிந்துரைகள்',
      pricing: 'விலைகளை அதிக போட்டித்தன்மை கொண்டதாக மாற்ற பரிசீலிக்கவும்',
      stock: 'பிரபலமான பொருட்களின் இருப்பை பராமரிக்கவும்'
    },
    reviews: {
      title: 'வாடிக்கையாளர் விமர்சனங்கள்',
      verified: 'சரிபார்க்கப்பட்ட வாங்குதல்',
      helpful: 'பயனுள்ளது',
      reply: 'பதில்',
      report: 'புகார்'
    },
    priceReports: {
      title: 'விலை அறிக்கைகள்',
      item: 'பொருள்',
      price: 'விலை',
      previousPrice: 'முந்தைய விலை',
      reportType: {
        increase: 'விலை உயர்வு',
        regular: 'வழக்கமான புதுப்பிப்பு'
      },
      reportedAt: 'புகாரளிக்கப்பட்ட நேரம்',
      verified: 'சரிபார்க்கப்பட்டது'
    }
  }
} as const;
