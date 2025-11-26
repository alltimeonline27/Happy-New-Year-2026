// create.js - cleaned and optimized

// ===============================
// Firebase Initialization
// ===============================
const firebaseConfig = {
  apiKey: "AIzaSyAHKe9YThgj5WSxNsaq4Rq8Fh32uktUd0b",
  authDomain: "happy-new-year-2026-7eac0.firebaseapp.com",
  projectId: "happy-new-year-2026-7eac0",
  storageBucket: "happy-new-year-2026-7eac0.appspot.com",
  messagingSenderId: "689012388330",
  appId: "1:689012388330:web:0dd468b6e6ce2c2f322d383",
  measurementId: "G-KSZT2QEJP8"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();


// ===============================
// Cloudinary Settings
// ===============================
const CLOUD_NAME = "dfczitdpf";
const UPLOAD_PRESET = "newyear2026";


// ===============================
// DOM ELEMENTS
// ===============================
const senderNameInput = document.getElementById("senderName");
const friendNameInput = document.getElementById("friendName");
const messageInput = document.getElementById("customMessage");
const photoInput = document.getElementById("photo");
const generateBtn = document.getElementById("generateBtn");
const statusEl = document.getElementById("status");
const linkResultBlock = document.getElementById("linkResult");
const resultLinkEl = document.getElementById("resultLink");
const copyLinkBtn = document.getElementById("copyLinkBtn");
const openLinkBtn = document.getElementById("openLinkBtn");

// QR Elements
const qrSection = document.getElementById("qrSection");
const qrContainer = document.getElementById("qrcode");
const downloadQRBtn = document.getElementById("downloadQR");

// Share Buttons
const shareWhatsappBtn = document.getElementById("shareWhatsapp");
const shareTelegramBtn = document.getElementById("shareTelegram");
const shareFacebookBtn = document.getElementById("shareFacebook");

const langSelect = document.getElementById("wishLanguage");
const wishCategoryButtons = document.querySelectorAll("#wishCategories button");

// ===== AI Generation Animation System =====
let loaderInterval = null;

// Loading dots animation
function startDotsAnimation() {
  const loader = document.getElementById("aiLoader");
  const dots = document.getElementById("aiDots");
  let count = 0;

  loader.style.display = "block";

  loaderInterval = setInterval(() => {
    count = (count + 1) % 4;
    dots.textContent = ".".repeat(count);
  }, 300);
}

function stopDotsAnimation() {
  const loader = document.getElementById("aiLoader");
  loader.style.display = "none";
  clearInterval(loaderInterval);
}

// Typewriter animation
function typewriterEffect(text) {
  messageInput.value = "";
  let i = 0;

  const typing = setInterval(() => {
    messageInput.value += text[i];
    i++;

    if (i >= text.length) {
      clearInterval(typing);
    }
  }, 30);
}

// Combined animation: loader → typewriter
function animateAIGeneration(finalText) {
  startDotsAnimation();

  setTimeout(() => {
    stopDotsAnimation();
    typewriterEffect(finalText);
  }, 1000);
}

// ================= AI WISH GENERATOR (CATEGORY + LANGUAGE) ================= //
const aiWishCategories = {

  // ENGLISH
  en: {
    love: [
      "Every moment with you feels like a blessing. Happy New Year 2026, {{receiver}} — {{sender}}",
      "You make every year beautiful. Stay with me always {{receiver}} — {{sender}}",
      "May our bond grow stronger this year {{receiver}} — {{sender}}",
      "Your presence lights up my world. Happy New Year {{receiver}} — {{sender}}",
      "Your smile is the brightest part of my year. Happy New Year {{receiver}} — {{sender}}",
      "I hope 2026 brings us closer and fills our hearts with love {{receiver}} — {{sender}}",
      "With you, every moment becomes special. Happy New Year {{receiver}} — {{sender}}",
      "You are the first thought of my year and the last thought of my day {{receiver}} — {{sender}}",
      "I pray this year gives us unforgettable moments together {{receiver}} — {{sender}}"



    ],
    friendship: [
      "Cheers to another year of crazy memories! Happy New Year {{receiver}} — {{sender}}",
      "Thank you for being my true friend. Have a joyful 2026 {{receiver}} — {{sender}}",
      "Best friends forever! Let's make 2026 awesome {{receiver}} — {{sender}}",
      "Thank you for being my human support system. Happy New Year {{receiver}} — {{sender}}",
      "Let's create new crazy stories in 2026 {{receiver}} — {{sender}}",
      "You’re not just a friend — you're family. Happy New Year {{receiver}} — {{sender}}",
      "Cheers to late-night talks and endless laughs {{receiver}} — {{sender}}",
      "May our friendship shine brighter this year {{receiver}} — {{sender}}",
      "Here’s to more adventures and unforgettable moments {{receiver}} — {{sender}}"

    ],
    family: [
      "Family is the biggest blessing. Happy New Year {{receiver}} — {{sender}}",
      "Wishing peace, love and happiness for our family {{receiver}} — {{sender}}",
      "May God bless you with joy and health this year {{receiver}} — {{sender}}",
      "May our home always be filled with love and laughter {{receiver}} — {{sender}}",
      "Family makes every year beautiful. Happy New Year {{receiver}} — {{sender}}",
      "Wishing peace and blessings for you this year {{receiver}} — {{sender}}",
      "You are a precious soul in our family {{receiver}} — {{sender}}",
      "May God protect and guide you this year {{receiver}} — {{sender}}",
      "Grateful to have you in our family {{receiver}} — {{sender}}"

    ],
    funny: [
      "May 2026 bring success… and fewer stupid moments. Happy New Year {{receiver}} — {{sender}}",
      "New resolution: Be awesome like me. Try it {{receiver}} — {{sender}}",
      "Zero homework this year! Manifesting! Happy New Year {{receiver}} — {{sender}}",
      "May your grades and bank balance both improve this year {{receiver}} — {{sender}}",
      "May you get smarter, funnier, and less lazy this year {{receiver}} — {{sender}}",
      "New Year Resolution: Don't be annoying. Try it {{receiver}} — {{sender}}",
      "I hope this year your crush finally notices you {{receiver}} — {{sender}}",
      "May your Wi-Fi be strong and exams be easy {{receiver}} — {{sender}}"

    ],
    emotional: [
      "May this year heal your heart and bring peace. Happy New Year {{receiver}} — {{sender}}",
      "You deserve unlimited happiness. Wishing love & light {{receiver}} — {{sender}}",
      "May this year give you healing, hope, and new beginnings {{receiver}} — {{sender}}",
      "You are stronger than you think — wishing you a peaceful 2026 {{receiver}} — {{sender}}",
      "May your heart feel lighter and your soul shine brighter {{receiver}} — {{sender}}",
      "This year, walk with courage — good things are waiting {{receiver}} — {{sender}}"

    ],
    professional: [
      "May this year unlock new opportunities {{receiver}} — {{sender}}",
      "Wishing you success, progress and growth in 2026 {{receiver}} — {{sender}}",
      "May 2026 reward your hard work beyond expectations {{receiver}} — {{sender}}",
      "This year brings new opportunities your way {{receiver}} — {{sender}}",
      "Believe in your dreams — they are closer than you think {{receiver}} — {{sender}}",
      "May you achieve new milestones in 2026 {{receiver}} — {{sender}}"

    ]
  },

  // BENGALI
  bn: {
    love: [
      "তোমার সাথে প্রতিটি মুহূর্ত আশীর্বাদ। শুভ নববর্ষ ২০২৬, {{receiver}} — {{sender}}",
      "তুমি থাকলে বছরটা আরও সুন্দর হয় {{receiver}} — {{sender}}",
      "এই বছর আমাদের ভালবাসা আরও গভীর হোক {{receiver}} — {{sender}}",
      "তোমার হাসি আমার বছরটাকে আলোকিত করে {{receiver}} — {{sender}}",
      "২০২৬ আমাদের সম্পর্ককে আরও সুন্দর করুক {{receiver}} — {{sender}}",
      "তোমাকে পেয়ে প্রতিটি মুহূর্ত বিশেষ হয়ে ওঠে {{receiver}} — {{sender}}",
      "এই বছর তোমার সাথে আরও স্মৃতি তৈরি করতে চাই {{receiver}} — {{sender}}",
      "তুমি আমার জীবনের প্রথম এবং শেষ চিন্তা {{receiver}} — {{sender}}",
      "এই বছর আমাদের জন্য অবিস্মরণীয় মুহূর্ত নিয়ে আসুক {{receiver}} — {{sender}}"

    ],
    friendship: [
      "আরো পাগলাটে স্মৃতির জন্য প্রস্তুত! শুভ নববর্ষ {{receiver}} — {{sender}}",
      "সবসময় পাশে থাকার জন্য ধন্যবাদ {{receiver}} — {{sender}}",
      "সেরা বন্ধু! চল ২০২৬ কে অসাধারণ করি {{receiver}} — {{sender}}",
      "তুমি আমার জীবনের সবচেয়ে বড় সমর্থন। শুভ নববর্ষ {{receiver}} — {{sender}}",
      "২০২৬ এ আরও মজার গল্প তৈরি করব {{receiver}} — {{sender}}",
      "তুমি শুধু বন্ধু নও—তুমি আমার পরিবার। শুভ নববর্ষ {{receiver}} — {{sender}}",
      "রাত জাগা আলাপচারিতা এবং হাসির জন্য ধন্যবাদ {{receiver}} — {{sender}}",
      "এই বছর আমাদের বন্ধুত্ব আরও উজ্জ্বল হোক {{receiver}} — {{sender}}",
      "আরো অ্যাডভেঞ্চার এবং অবিস্মরণীয় মুহূর্তের জন্য {{receiver}} — {{sender}}",
      "তুমি শুধু বন্ধু নও, তুমি পরিবারের মতো {{receiver}} — {{sender}}",
      "চলো নতুন কিছু পাগলাটে স্মৃতি তৈরি করি {{receiver}} — {{sender}}",
      "সবসময় পাশে থাকার জন্য ধন্যবাদ {{receiver}} — {{sender}}",
      "হাসি-ঠাট্টা আর আড্ডার বছর হোক ২০২৬ {{receiver}} — {{sender}}"


    ],
    family: [
      "পরিবারই সবচেয়ে বড় শক্তি। শুভ নববর্ষ {{receiver}} — {{sender}}",
      "তোমার জীবনে শান্তি ও সুখ নেমে আসুক {{receiver}} — {{sender}}",
      "ঈশ্বর তোমাকে সুস্থ্য ও আনন্দময় জীবন দান করুন {{receiver}} — {{sender}}",
      "আমাদের ঘর সবসময় ভালোবাসা ও হাসিতে ভরে উঠুক {{receiver}} — {{sender}}",
      "পরিবারই জীবনের সবচেয়ে বড় আশীর্বাদ। শুভ নববর্ষ {{receiver}} — {{sender}}",
      "এই বছর তোমার জীবনে শান্তি ও সুখ আসুক {{receiver}} — {{sender}}",
      "তুমি আমাদের পরিবারের অমূল্য সদস্য {{receiver}} — {{sender}}",
      "ঈশ্বর তোমাকে সুরক্ষা ও পথ প্রদর্শন করুন {{receiver}} — {{sender}}",
      "তোমাকে পেয়ে আমরা কৃতজ্ঞ {{receiver}} — {{sender}}",
      "পরিবার আমাদের শক্তি। শুভ নববর্ষ {{receiver}} — {{sender}}",
      "তোমার জীবনে শান্তি, সুখ ও ভালোবাসা আসুক {{receiver}} — {{sender}}",
      "তুমি আমাদের পরিবারের অমূল্য অংশ {{receiver}} — {{sender}}",
      "এই বছর তোমার জন্য আশীর্বাদে ভরা হোক {{receiver}} — {{sender}}"

    ],
    funny: [
      "নতুন বছর মানে নতুন আশা… আর কম হোমওয়ার্ক! {{receiver}} — {{sender}}",
      "তোমার মার্কস আর ব্যাংক ব্যালেন্স—দুটোই বাড়ুক এবার {{receiver}} — {{sender}}",
      "এই বছর কম টেনশন, বেশি মজা! শুভ নববর্ষ {{receiver}} — {{sender}}",
      "তোমার স্মার্টনেস আর মজার ছলে সবাইকে চমকে দাও {{receiver}} — {{sender}}",
      "এই বছর তোমার স্মার্টনেস আর মজার ছলে সবাইকে চমকে দাও {{receiver}} — {{sender}}",
      "নতুন বছর রেজোলিউশন: বিরক্তিকর হওয়া বন্ধ করো। চেষ্টা করো {{receiver}} — {{sender}}",
      "এই বছর তোমার ক্রাশ তোমাকে লক্ষ্য করুক {{receiver}} — {{sender}}",
      "তোমার ওয়াই-ফাই শক্তিশালী এবং পরীক্ষাগুলো সহজ হোক {{receiver}} — {{sender}}",
      "নতুন বছর—কম টেনশন, বেশি মজা {{receiver}} — {{sender}}",
      "তোমার 'ক্রাশ' এবার যেন টের পায় {{receiver}} — {{sender}}",
      "এই বছর WIFI যেন কখনো না যায়! {{receiver}} — {{sender}}",
      "এক্সাম সহজ হোক—এটাই প্রার্থনা {{receiver}} — {{sender}}"

    ],
    emotional: [
      "তোমার মনটা এই বছর শান্তি খুঁজে পাক {{receiver}} — {{sender}}",
      "কষ্ট ভুলে নতুন পথচলা শুরু হোক {{receiver}} — {{sender}}",
      "এই বছর তোমার হৃদয় সুস্থ্য ও শান্তি পাক {{receiver}} — {{sender}}",
      "তুমি ভাবছো তার চেয়ে তুমি অনেক শক্তিশালী — শান্তিময় ২০২৬ হোক {{receiver}} — {{sender}}",
      "এই বছর তোমার হৃদয় হালকা এবং আত্মা উজ্জ্বল হোক {{receiver}} — {{sender}}",
      "এই বছর সাহসের সাথে এগিয়ে চলো—ভালো কিছু অপেক্ষা করছে {{receiver}} — {{sender}}",
      "তোমার মন যেন শান্তি খুঁজে পায় {{receiver}} — {{sender}}",
      "এই বছর নতুন আশা, নতুন স্বপ্ন আসুক {{receiver}} — {{sender}}",
      "তুমি অনেক শক্ত—এই বছর প্রমাণ করবে {{receiver}} — {{sender}}",
      "তোমার জন্য অনেক সুন্দর মুহূর্ত অপেক্ষা করছে {{receiver}} — {{sender}}"

    ],
    professional: [
      "তোমার পরিশ্রম এ বছর সেরা ফল দেবে {{receiver}} — {{sender}}",
      "সাফল্য ও উন্নতির বছর হোক ২০২৬ {{receiver}} — {{sender}}",
      "এই বছর তোমার কঠোর পরিশ্রম প্রত্যাশার চেয়ে বেশি ফল দেবে {{receiver}} — {{sender}}",
      "এই বছর নতুন সুযোগ আসুক তোমার পথে {{receiver}} — {{sender}}",
      "তোমার স্বপ্নগুলোকে বিশ্বাস করো—সেগুলো তোমার কাছাকাছি {{receiver}} — {{sender}}",
      "২০২৬ এ নতুন মাইলফলক অর্জন করো {{receiver}} — {{sender}}",
      "তোমার পরিশ্রম যেন সেরা ফল নিয়ে আসে {{receiver}} — {{sender}}",
      "২০২৬ তোমার কেরিয়ারের জন্য শুভ হোক {{receiver}} — {{sender}}",
      "তোমার লক্ষ্যে পৌঁছানোর বছর হোক {{receiver}} — {{sender}}",
      "নিজের উপর বিশ্বাস রাখো—সফলতা আসবেই {{receiver}} — {{sender}}"

    ]
  },

  // HINDI
  hi: {
    love: [
      "तुम्हारे साथ हर पल खूबसूरत है। नया साल मुबारक हो {{receiver}} — {{sender}}",
      "इस साल हमारा रिश्ता और मजबूत हो {{receiver}} — {{sender}}",
      "तुम्हारी मुस्कान मेरा नया साल रोशन कर देती है {{receiver}} — {{sender}}",
      "2026 में हमारा रिश्ता और भी मजबूत हो {{receiver}} — {{sender}}",
      "हर पल तुम्हारे साथ खूबसूरत लगता है {{receiver}} — {{sender}}",
      "इस साल हमारे बीच और प्यार बढ़े {{receiver}} — {{sender}}",
      "तुम्हारे साथ हर लम्हा खास है {{receiver}} — {{sender}}",
      "तुम मेरी जिंदगी की पहली और आखिरी सोच हो {{receiver}} — {{sender}}",
      "इस साल हमारे लिए यादगार पल लाए {{receiver}} — {{sender}}"

    ],
    friendship: [
      "एक और साल मस्ती का! नया साल मुबारक {{receiver}} — {{sender}}",
      "तुम जैसे दोस्त मिलना किस्मत की बात है {{receiver}} — {{sender}}",
      "साथ मिलकर 2026 को यादगार बनाते हैं {{receiver}} — {{sender}}",
      "तुम मेरी जिंदगी का सबसे बड़ा सहारा हो। नया साल मुबारक {{receiver}} — {{sender}}",
      "2026 में और मस्ती भरी कहानियाँ बनाएंगे {{receiver}} — {{sender}}",
      "तुम सिर्फ दोस्त नहीं, परिवार हो {{receiver}} — {{sender}}",
      "चलो 2026 में नई मस्ती करते हैं {{receiver}} — {{sender}}",
      "हर मुश्किल में साथ देने के लिए धन्यवाद {{receiver}} — {{sender}}",
      "इस साल हमारी दोस्ती और चमके {{receiver}} — {{sender}}",
      "और भी एडवेंचर और यादगार पल लाए {{receiver}} — {{sender}}"

    ],
    family: [
      "परिवार ही सबसे बड़ी ताकत है। नया साल मुबारक {{receiver}} — {{sender}}",
      "तुम्हारे जीवन में शांति और खुशियाँ आएं {{receiver}} — {{sender}}",
      "ईश्वर तुम्हें स्वस्थ और खुशहाल जीवन दे {{receiver}} — {{sender}}",
      "हमारा घर हमेशा प्यार और हँसी से भरा रहे {{receiver}} — {{sender}}",
      "परिवार हमारे जीवन का सबसे बड़ा आशीर्वाद है {{receiver}} — {{sender}}",
      "इस साल तुम्हारे जीवन में शांति और खुशियाँ आएं {{receiver}} — {{sender}}",
      "तुम हमारे परिवार के अनमोल सदस्य हो {{receiver}} — {{sender}}",
      "ईश्वर तुम्हारी रक्षा और मार्गदर्शन करें {{receiver}} — {{sender}}",
      "तुम्हारे होने के लिए हम कृतज्ञ हैं {{receiver}} — {{sender}}",
      "परिवार हमारी ताकत है। नया साल मुबारक {{receiver}} — {{sender}}",
      "तुम्हारे जीवन में शांति, खुशियाँ और प्यार आएं {{receiver}} — {{sender}}",
      "तुम हमारे परिवार का अनमोल हिस्सा हो {{receiver}} — {{sender}}",
      "इस साल तुम्हारे लिए आशीर्वादों से भरा हो {{receiver}} — {{sender}}",
      "परिवार के बिना जिंदगी अधूरी है। नया साल मुबारक {{receiver}} — {{sender}}",
      "ईश्वर तुम्हें खुशियाँ और शांति दें {{receiver}} — {{sender}}",
      "तुम हमारे परिवार की शान हो {{receiver}} — {{sender}}",
      "इस साल तुम्हें ढेर सारी खुशियाँ मिलें {{receiver}} — {{sender}}"

    ],
    funny: [
      "इस साल कम टेंशन, ज़्यादा फ़न! नया साल मुबारक {{receiver}} — {{sender}}",
      "तुम्हारी मार्कशीट और बैंक बैलेंस—दोनों सुधरें {{receiver}} — {{sender}}",
      "इस साल होमवर्क से छुट्टी! नया साल मुबारक {{receiver}} — {{sender}}",
      "इस साल तुम और स्मार्ट, मज़ेदार और कम आलसी बनो {{receiver}} — {{sender}}",
      "नया साल रिज़ॉल्यूशन: बोरिंग होना छोड़ो। कोशिश करो {{receiver}} — {{sender}}",
      "इस साल तुम्हारा क्रश तुम्हें नोटिस करे {{receiver}} — {{sender}}",
      "तुम्हारा वाई-फाई मजबूत और एग्ज़ाम आसान हो {{receiver}} — {{sender}}",
      "इस साल कम टेंशन, ज़्यादा मज़ा हो {{receiver}} — {{sender}}",
      "तुम्हारा क्रश इस साल तुम्हें नोटिस करे {{receiver}} — {{sender}}",
      "तुम्हारा वाई-फाई हमेशा तेज़ रहे! {{receiver}} — {{sender}}",
      "एग्ज़ाम आसान हो—यही दुआ है मेरी {{receiver}} — {{sender}}",
      "इस साल कम टेंशन, ज़्यादा फ़न {{receiver}} — {{sender}}",
      "तुम्हारा क्रश इस साल रिप्लाई करे—आमीन {{receiver}} — {{sender}}",
      "Wi-Fi स्ट्रॉन्ग रहे और एग्ज़ाम आसान हों {{receiver}} — {{sender}}"

    ],
    emotional: [
      "इस साल तुम्हारे दिल को सुकून मिले {{receiver}} — {{sender}}",
      "तुम्हारे लिए नया साल उम्मीदों से भरा हो {{receiver}} — {{sender}}",
      "इस साल तुम्हारा दिल स्वस्थ और शांत रहे {{receiver}} — {{sender}}",
      "तुम सोचते हो उससे ज़्यादा तुम मजबूत हो—शांतिपूर्ण 2026 हो {{receiver}} — {{sender}}",
      "इस साल तुम्हारा दिल हल्का और आत्मा चमकती रहे {{receiver}} — {{sender}}",
      "इस साल साहस के साथ आगे बढ़ो—अच्छी चीज़ें तुम्हारा इंतज़ार कर रही हैं {{receiver}} — {{sender}}",
      "तुम बहुत मजबूत हो—इस साल साबित करोगे {{receiver}} — {{sender}}",
      "इस साल तुम्हारे लिए नए सपने और उम्मीदें आएं {{receiver}} — {{sender}}",
      "तुम्हारे लिए इस साल बहुत सारे खूबसूरत पल आएं {{receiver}} — {{sender}}",
      "ये साल तुम्हें सुकून दे {{receiver}} — {{sender}}",
      "तुम जितना सोचते हो उससे ज्यादा मजबूत हो {{receiver}} — {{sender}}",
      "इस साल तुम्हारे दिल को राहत मिले {{receiver}} — {{sender}}",
      "नया साल तुम्हें नई उम्मीदें दे {{receiver}} — {{sender}}"

    ],
    professional: [
      "इस साल नई सफलता तुम्हें मिले {{receiver}} — {{sender}}",
      "मेहनत का फल 2026 में ज़रूर मिलेगा {{receiver}} — {{sender}}",
      "इस साल तुम्हारी मेहनत उम्मीद से ज़्यादा रंग लाए {{receiver}} — {{sender}}",
      "इस साल तुम्हारे रास्ते में नए अवसर आएं {{receiver}} — {{sender}}",
      "अपने सपनों पर विश्वास रखो—वे तुम्हारे करीब हैं {{receiver}} — {{sender}}",
      "2026 में नए मुकाम हासिल करो {{receiver}} — {{sender}}",
      "तुम्हारी मेहनत इस साल बेहतरीन परिणाम लाए {{receiver}} — {{sender}}",
      "2026 तुम्हारे करियर के लिए शुभ हो {{receiver}} — {{sender}}",
      "तुम्हारे लक्ष्य पूरे हों इस साल {{receiver}} — {{sender}}",
      "अपने ऊपर विश्वास रखो—सफलता ज़रूर मिलेगी {{receiver}} — {{sender}}",
      "2026 में तुम्हारी मेहनत रंग लाए {{receiver}} — {{sender}}",
      "तुम्हें नई सफलता मिले {{receiver}} — {{sender}}",
      "इस साल तुम अपने लक्ष्य पूरे करो {{receiver}} — {{sender}}",
      "आत्मविश्वास बनाए रखो—सफलता जरूर मिलेगी {{receiver}} — {{sender}}"

    ]
  }

};

// Replace placeholders with name
function replaceWish(str, sender, receiver) {
  return str
    .replace(/{{sender}}/g, sender || "Someone")
    .replace(/{{receiver}}/g, receiver || "You");
}




// ===============================
// Prefill sender (?sender=NAME)
// ===============================
(function prefillSender() {
  try {
    const params = new URLSearchParams(window.location.search);
    const s = params.get("sender");
    if (s && senderNameInput) senderNameInput.value = s;
  } catch (err) {
    console.warn("Prefill sender failed:", err);
  }
})();


// ===============================
// OPTIMIZED IMAGE COMPRESSION
// ===============================
function compressImage(file, maxWidth = 700, quality = 0.55) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => (img.src = e.target.result);
    reader.onerror = reject;

    reader.readAsDataURL(file);

    img.onload = () => {
      const ratio = Math.min(1, maxWidth / img.width);
      const newWidth = Math.round(img.width * ratio);
      const newHeight = Math.round(img.height * ratio);

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      canvas.toBlob(
        (blob) => resolve(blob),
        "image/jpeg",
        quality
      );
    };

    img.onerror = reject;
  });
}


// ===============================
// Upload to Cloudinary
// ===============================
async function uploadImageToCloudinary(file) {
  if (!file) return null;

  // Try compression
  let compressedBlob;
  try {
    compressedBlob = await compressImage(file, 700, 0.55);
  } catch (err) {
    console.warn("Compression failed:", err);
    compressedBlob = file;
  }

  const compressedFile = new File([compressedBlob], file.name, {
    type: "image/jpeg"
  });

  const formData = new FormData();
  formData.append("file", compressedFile);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData
    }
  );

  if (!res.ok) throw new Error("Image upload failed");

  const data = await res.json();
  return {
    url: data.secure_url,
    id: data.public_id
  };
}


// ===============================
// GET USER GEO INFO (Optional)
// ===============================
async function getGeoInfo() {
  const req = fetch("https://ipapi.co/json/");
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject("timeout"), 2000)
  );

  try {
    const res = await Promise.race([req, timeout]);
    if (!res || !res.ok) return {};
    const data = await res.json();
    return {
      ip: data.ip,
      country: data.country_name,
      city: data.city
    };
  } catch {
    return {};
  }
}


// ===============================
// BASE URL BUILDER
// ===============================
function getBaseUrl() {
  const origin = window.location.origin;
  const folder = window.location.pathname.replace(/[^/]*$/, "");
  return origin + folder;
}


// ===============================
// QR HELPERS
// ===============================
function clearQRCode() {
  if (qrContainer) qrContainer.innerHTML = "";
  if (qrSection) qrSection.style.display = "none";
}

function generateQRCode(url) {
  if (!window.QRCode) return;

  qrContainer.innerHTML = "";

  new QRCode(qrContainer, {
    text: url,
    width: 180,
    height: 180,
    colorDark: "#000",
    colorLight: "#fff",
    correctLevel: QRCode.CorrectLevel.H
  });

  qrSection.style.display = "block";
}

function setupDownloadQR() {
  if (!downloadQRBtn) return;

  downloadQRBtn.onclick = () => {
    const img = qrContainer.querySelector("img");
    if (!img) return alert("QR not ready");

    const link = document.createElement("a");
    link.href = img.src;
    link.download = "newyear_qr.png";
    link.click();
  };
}


// ===============================
// SHARE BUTTONS (Create Page)
// ===============================
function setupShareButtons(url, senderName) {
  if (shareWhatsappBtn) {
    shareWhatsappBtn.onclick = () => {
      const msg = `🎉 I created a New Year 2026 Gift for you!\nOpen your surprise: ${url}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`);
    };
  }

  if (shareTelegramBtn) {
    shareTelegramBtn.onclick = () => {
      const msg = `🎉 I created a New Year 2026 Gift for you!\nOpen your surprise: ${url}`;
      window.open(
        `https://t.me/share/url?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(msg)}`
      );
    };
  }

  if (shareFacebookBtn) {
    shareFacebookBtn.onclick = () => {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`
      );
    };
  }
}

// ========================= LEADERBOARD UPDATE ========================= //

function slugifyName(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "_");
}

async function incrementCreatorCount(name) {
  if (!name) return;

  const id = slugifyName(name);
  const ref = db.collection("creators").doc(id);

  await ref.set({
    displayName: name,
    count: firebase.firestore.FieldValue.increment(1)
  }, { merge: true });
}


// ===============================
// MAIN GENERATE HANDLER
// ===============================
async function handleGenerateClick() {
  const sender = senderNameInput.value.trim();
  const receiver = friendNameInput.value.trim();
  const customMsg = messageInput.value.trim();
  const file = photoInput.files[0];

  if (!sender || !receiver) {
    return alert("Enter both names");
  }

  generateBtn.disabled = true;
  clearQRCode();
  linkResultBlock.style.display = "none";
  statusEl.textContent = "Preparing your gift…";

  try {
    let imgResult = null;

    // Upload Image
    if (file) {
      statusEl.textContent = "Uploading photo…";
      imgResult = await uploadImageToCloudinary(file);
    }

    // Geo
    statusEl.textContent = "Finalizing…";
    const geo = await getGeoInfo();

    // Save to Firestore
    const docRef = await db.collection("celebrations").add({
      senderName: sender,
      receiverName: receiver,
      customMessage: customMsg,
      template: document.getElementById("templateSelect").value,
      music: document.getElementById("musicSelect").value,


      photoUrl: imgResult ? imgResult.url : null,
      cloudinaryId: imgResult ? imgResult.id : null,
      views: 0,
      shares: 0,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastOpened: firebase.firestore.FieldValue.serverTimestamp(),
      device: navigator.platform,
      ip: geo.ip || "",
      country: geo.country || "",
      city: geo.city || ""
    });

    // Build link
    const base = getBaseUrl();
    const finalUrl = `${base}celebrate.html?id=${encodeURIComponent(
      docRef.id
    )}`;

    // Display link
    resultLinkEl.innerHTML = `<a href="${finalUrl}" target="_blank">${finalUrl}</a>`;
    linkResultBlock.style.display = "block";
    statusEl.textContent = "Gift created successfully!";
    incrementCreatorCount(sender);
    loadLeaderboard(sender);


    // Copy Link
    copyLinkBtn.onclick = () =>
      navigator.clipboard
        .writeText(finalUrl)
        .then(() => (statusEl.textContent = "Copied!"))
        .catch(() => alert("Copy failed"));

    // Open Link
    openLinkBtn.onclick = () => window.open(finalUrl, "_blank");

    // Share Buttons
    setupShareButtons(finalUrl, sender);

    // QR Code
    generateQRCode(finalUrl);
    setupDownloadQR();
  } catch (err) {
    console.error(err);
    alert("Error creating gift");
  } finally {
    generateBtn.disabled = false;
  }
}

// CATEGORY BUTTON SELECTION + SINGLE WISH GENERATOR
wishCategoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    // Highlight selected category (fixed)
    wishCategoryButtons.forEach(b => b.classList.remove("active-cat"));
    btn.classList.add("active-cat");

    const category = btn.getAttribute("data-cat");
    const lang = langSelect.value;

    if (!lang) {
      statusEl.textContent = "Please select a language first.";
      return;
    }

    const sender = senderNameInput.value.trim() || "Someone";
    const receiver = friendNameInput.value.trim() || "Friend";

    const list = aiWishCategories[lang][category];
    const wish = replaceWish(
      list[Math.floor(Math.random() * list.length)],
      sender,
      receiver
    );

   animateAIGeneration(wish);

    statusEl.textContent =
      "Wish generated (" + category + " - " + lang.toUpperCase() + ")";
  });
});

// ========== GENERATE 3 WISHES + POPUP SELECTION ==========
const generateThreeBtn = document.getElementById("generateThreeBtn");
const wishPopup = document.getElementById("wishPopup");
const popupWishList = document.getElementById("popupWishList");
const closePopup = document.getElementById("closePopup");

if (generateThreeBtn) {
  generateThreeBtn.addEventListener("click", () => {

    // FIX: Detect category safely
    const activeCatBtn = document.querySelector("#wishCategories .active-cat");

    if (!activeCatBtn) {
      alert("Please select a category first."); // strong warning
      return;
    }

    const category = activeCatBtn.getAttribute("data-cat");

    // FIX: Language check
    const lang = langSelect.value;
    if (!lang) {
      alert("Please select a language first.");
      return;
    }

    const sender = senderNameInput.value.trim() || "Someone";
    const receiver = friendNameInput.value.trim() || "Friend";
    const list = aiWishCategories[lang][category];

    // Select 3 unique wishes
    let selected = [];
    let used = new Set();

    while (selected.length < 3 && used.size < list.length) {
      let i = Math.floor(Math.random() * list.length);
      if (!used.has(i)) {
        used.add(i);
        selected.push(replaceWish(list[i], sender, receiver));
      }
    }

    // Build Popup Wish List Buttons
    popupWishList.innerHTML = "";

    selected.forEach((wishText, index) => {
      const btn = document.createElement("button");
      btn.className = "btn";
      btn.style = "width:100%; margin-bottom:10px; text-align:left; white-space:normal;";
      btn.innerHTML = `<strong>Wish ${index + 1}:</strong><br>${wishText}`;

      btn.addEventListener("click", () => {
         wishPopup.style.display = "none";
     animateAIGeneration(wishText);


       
      });

      popupWishList.appendChild(btn);
    });

    // POPUP SHOW FIX
    wishPopup.style.display = "flex";
  });
}

// Close Popup
if (closePopup) {
  closePopup.addEventListener("click", () => {
    wishPopup.style.display = "none";
  });
}

// ========== RANDOM MIXED-LANGUAGE MODE ==========
const generateMixedBtn = document.getElementById("generateMixedBtn");
if (generateMixedBtn) {
  generateMixedBtn.addEventListener("click", () => {

    const category = document.querySelector("#wishCategories .active-cat")?.getAttribute("data-cat");

    if (!category) {
      statusEl.textContent = "Please select a category first.";
      

      return;
    }

    const sender = senderNameInput.value.trim() || "Someone";
    const receiver = friendNameInput.value.trim() || "Friend";

    // Choose random language
    const langs = ["en", "bn", "hi"];
    const randomLang = langs[Math.floor(Math.random() * langs.length)];

    // Pick random wish from that language
    const list = aiWishCategories[randomLang][category];
    const wish = replaceWish(
      list[Math.floor(Math.random() * list.length)],
      sender,
      receiver
    );

    animateAIGeneration(wish);

    statusEl.textContent =
      "Random Mixed-Language Wish (" + randomLang.toUpperCase() + ")";
  });
}



if (generateBtn) {
  generateBtn.addEventListener("click", handleGenerateClick);
}

// Init QR download listener
setupDownloadQR();

// ========================= LEADERBOARD LOGIC ========================= //

function slugifyName(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "_");
}

function getBadge(count) {
  if (count >= 30) return "🥇 Gold";
  if (count >= 15) return "🥈 Silver";
  if (count >= 5) return "🥉 Bronze";
  return null;
}

async function loadLeaderboard(currentSender = null) {
  const list = document.getElementById("leaderboard-list");
  const rankBox = document.getElementById("your-rank");
  if (!list) return;

  try {
    // fetch top 5 creators
    const snap = await db.collection("creators")
      .orderBy("count", "desc")
      .limit(5)
      .get();

    list.innerHTML = "";
    let rank = 1;
    let userRank = null;
    let userCount = 0;

    snap.forEach(doc => {
      const d = doc.data();
      const badge = getBadge(d.count);
      const isCurrent = currentSender && slugifyName(currentSender) === doc.id;

      if (isCurrent) {
        userRank = rank;
        userCount = d.count;
      }

      list.innerHTML += `
        <li class="${isCurrent ? 'highlight' : ''}">
          <div class="leader-name">${rank}. ${d.displayName}</div>
          <div class="leader-count">${d.count} ${badge ? '• ' + badge : ''}</div>
        </li>
      `;
      rank++;
    });

    // If sender not in top 5 → calculate their rank
    if (currentSender) {
      const sid = slugifyName(currentSender);
      const doc = await db.collection("creators").doc(sid).get();

      if (doc.exists) {
        const count = doc.data().count;
        const higher = await db.collection("creators")
          .where("count", ">", count)
          .get();
        userRank = higher.size + 1;
        userCount = count;

        // show user rank
        rankBox.textContent = `You are ranked #${userRank}`;
      }
    }

  } catch (e) {
    list.innerHTML = "<li>Leaderboard unavailable</li>";
  }
}

// ================== DARK / LIGHT THEME (Always default = Light) ================== //
const themeToggle = document.getElementById("themeToggle");

// Always apply LIGHT MODE on page load
function initTheme() {
  document.body.classList.remove("dark-mode");
  if (themeToggle) themeToggle.textContent = "🌙";
}

// When user clicks toggle
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-mode");

    if (isDark) {
      // Switch to Light
      document.body.classList.remove("dark-mode");
      themeToggle.textContent = "🌙";
    } else {
      // Switch to Dark
      document.body.classList.add("dark-mode");
      themeToggle.textContent = "☀️";
    }
  });
}
// Auto-apply fade-in animations
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".fade-in, .slide-up, .fade-scale")
    .forEach((el, index) => {
      el.style.animationDelay = (index * 0.05) + "s";
    });
});


// CALL INIT (Very Important — must run AFTER everything)
window.addEventListener("DOMContentLoaded", initTheme);
