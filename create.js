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

function showFullLoader(text) {
  const loader = document.getElementById("fullPageLoader");
  const txt = document.getElementById("loaderStepText");

  if (txt) txt.textContent = text;
  if (loader) loader.style.display = "flex";
}

function hideFullLoader() {
  const loader = document.getElementById("fullPageLoader");
  if (loader) loader.style.display = "none";
}

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

let thinkInterval = null;

function startThinking() {
  const think = document.getElementById("aiThinking");
  const dots = document.getElementById("thinkDots");
  let count = 0;
  think.style.display = "block";

  thinkInterval = setInterval(() => {
    count = (count + 1) % 4;
    dots.textContent = ".".repeat(count);
  }, 300);
}

function stopThinking() {
  const think = document.getElementById("aiThinking");
  think.style.display = "none";
  clearInterval(thinkInterval);
}
function playTypingSound() {
  const snd = document.getElementById("typeSound");
  snd.volume = 0.01;

  snd.loop = true;
  snd.play().catch(() => { });

}

function stopTypingSound() {
  const snd = document.getElementById("typeSound");
  snd.pause();
  snd.currentTime = 0;
}


// Typewriter animation
function typewriterEffect(text) {
  const bubble = document.getElementById("aiBubble");
  const cursor = document.getElementById("typingCursor");

  bubble.style.display = "block";
  bubble.textContent = "";
  cursor.style.display = "inline-block";

  let i = 0;

  const typing = setInterval(() => {
    bubble.textContent += text[i];
    i++;

    if (i >= text.length) {
      clearInterval(typing);
      cursor.style.display = "none";
      stopTypingSound();

      // COPY final AI text to textarea
      messageInput.value = text;
    }
  }, 35);

  playTypingSound();
}


// Combined animation: loader → typewriter
function animateAIGeneration(finalText) {
  startDotsAnimation();     // dots under message box
  startThinking();          // “AI is thinking…” ON

  setTimeout(() => {
    stopDotsAnimation();    // stop dots
    stopThinking();         // stop “AI is thinking…”
    typewriterEffect(finalText);  // begin typing bubble
  }, 1000);
}


// ================= AI WISH GENERATOR (CATEGORY + LANGUAGE) ================= //
const aiWishCategories = {

  // ENGLISH
  en: {
    love: [
      // ===== Rewritten OLD Wishes =====

      "May our love shine brighter than the fireworks this year, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you a year filled with love, warmth, and unforgettable memories, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Happy New Year my love! You make every moment magical, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "To the one who means everything to me—may this year bring us even closer, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May our hearts stay connected and our love grow deeper each day, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Cheers to another year of holding hands, sharing dreams, and loving endlessly, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing a romantic New Year to the one who holds my heart, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "This year, all I want is you beside me—today, tomorrow, and always, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "You are my today, my tomorrow, and all of my forever, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",

      // ===== 50 NEW AI-GENERATED LOVE WISHES =====

      "Another beautiful year with you feels like a blessing I never stop cherishing, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Your love is the spark that lights up everything around me. Here’s to us, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "With you in my life, every year becomes special automatically, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "I hope this year brings us even more laughter, late-night talks, and warm hugs, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Thank you for being my safe place and my greatest adventure, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "I wish for more moments where we forget the world and hold on to each other, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Every day with you feels like the start of something beautiful, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May this year be full of soft kisses, deep conversations, and endless affection between us, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "You make my world brighter simply by being in it, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "My favorite place will always be right next to you, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Here’s to a year of loving you louder, deeper, and with all my heart, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Your love is my most precious gift, and I pray our bond grows stronger this year, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "You make my ordinary days feel extraordinary, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "I’m grateful for every moment spent with you. Let’s make many more memories, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "I hope this year brings you the happiness you’ve brought into my life, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "You are my favorite thought, my favorite feeling, and my forever person, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May love wrap us in its warmth this year and always, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Every love story is special, but ours is my absolute favorite, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "My only resolution is to love you even more than last year, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "No matter how many years pass, loving you will always feel new and exciting, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Let’s start this year with a heart full of dreams and hands full of each other, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "You fill my life with colors I never knew existed, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Being loved by you is the sweetest blessing I have, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May this year overflow with romantic moments and pure happiness for us, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "With every heartbeat, I fall in love with you all over again, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "You are the dream I never want to wake up from, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Holding your hand makes every year feel perfect, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "I want to collect memories with you that will last a lifetime, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "You make my heart smile in ways no one else can, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Thank you for choosing me again this year and always, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "I want to love you in ways that make you feel cherished every single day, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Your love is my strength, my joy, and my favorite reason to smile, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Here’s to another year of loving, learning, and growing together, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "I hope the new year brings even more happiness to our beautiful journey, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "You are my heart’s permanent home, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Every moment with you is a moment worth living twice, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Loving you feels like the best decision I make every single day, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "I can’t wait to create more memories with you this year, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "You make my world feel right in every way, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Nothing makes me happier than imagining another year with you, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉"
    ],

    friendship: [
      // ===== Rewritten OLD Wishes =====

      "Cheers to another year of friendship, laughter, and unforgettable memories with you, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing my best friend a year full of joy, success, and moments we’ll remember forever, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May this year bring us even more reasons to smile together, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "You’re not just my friend—you’re my chosen family. Here’s to a beautiful year ahead, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Another 365 days of craziness, loyalty, and pure friendship—let’s make them legendary, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Thank you for being the friend who stays no matter what. Wishing you the best year ever, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "This year, let’s create memories that we’ll laugh about for years to come, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Having a friend like you makes life brighter every single day, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "To the friend who makes everything better—may this year be your best one yet, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",

      // ===== 50 NEW AI-GENERATED FRIENDSHIP WISHES =====

      "May our friendship continue to shine, inspire, and grow through every season of this new year, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Here’s to more adventures, late-night conversations, and unforgettable fun with you, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "You make every year meaningful simply by being in it. Stay close always, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Let’s welcome 2026 with open hearts and a promise to stay crazy together, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "A true friend is a treasure, and I’m grateful I found mine in you, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "No matter how life changes, I hope our friendship stays as strong as ever, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May this year give you reasons to smile as warm as your friendship has given me, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "You’re the person I can laugh with, cry with, and trust endlessly, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "We may not talk every day, but you’re always in my heart. Stay blessed, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Let this year bring us more inside jokes and unforgettable stories, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Thank you for being the friend who understands my silence more than my words, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May this New Year bring you happiness as big as your heart, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Real friendship is rare, and I’m blessed to experience it with you, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "In 2026, let’s be the same crazy duo—just with bigger dreams, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "You are the friend everyone wishes they had. Thank you for being mine, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "New Year, same bond, same madness, same best friend—forever grateful for you, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Our friendship is the kind of magic that never fades, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Here’s to another year of being each other’s partner-in-crime, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May this year bring you closer to everything you’ve dreamed of, my friend, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Through thick and thin, we’ve stayed together—and this year will be no different, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Friends like you make life brighter, sweeter, and easier to live, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May our friendship remain untouched by time and stronger with every passing year, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "I don’t know what I did to deserve a friend like you, but I’m grateful every day, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "If friendships had levels, ours would be legendary, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Thank you for the laughs, the support, and the memories—let’s make more this year, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Let this year bring success to your dreams and peace to your heart, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "No matter how far life takes us, you’ll always be my closest friend, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "I wish you strength, happiness, and moments that make your heart smile, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Real friends don’t drift apart. They grow together. Here’s to us, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Let’s celebrate 2026 with hope, faith, and our unbreakable bond, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Life becomes beautiful when shared with true friends like you, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Your friendship has been my biggest support—may this year support you in every way, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "You’re not just a friend—you’re a blessing I’m grateful for every year, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "I hope this year brings you joy that lasts and peace that stays, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "You make ordinary days feel extraordinary with your presence, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Let’s welcome 2026 with enthusiasm, positivity, and our signature madness, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "A friend like you is a treasure worth celebrating every year, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Even in silence, our friendship speaks louder than words, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Friends like you make the journey of life worth walking, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Thank you for supporting me even when the world didn’t understand me, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Let’s make this year as fun, crazy, and meaningful as our friendship, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "I pray this year brings you courage for your dreams and comfort for your heart, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May we continue lifting each other higher and cheering louder for one another, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Grateful for another year of sharing joy, growth, and friendship with you, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Our friendship is one of my life’s favorite gifts—thank you for being amazing, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉"
    ],
    family: [
      // ===== Rewritten OLD Wishes =====

      "Wishing you and our family a year filled with peace, joy, and togetherness, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May this year bring good health, love, and happiness to our family, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Family is the greatest blessing, and I’m thankful for you every day, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May our home be filled with warmth, unity, and love throughout the year, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Hoping this year strengthens the bond within our family more than ever, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "To the family that supports, loves, and inspires me—thank you, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May this New Year bring endless blessings to you and everyone you love, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Another year together is another blessing to cherish, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you a year full of harmony, laughter, and meaningful moments, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",

      // ===== 50 NEW AI-GENERATED FAMILY WISHES =====

      "May this year bring peace to your mind, love to your heart, and strength to your family, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "I pray this year fills your home with positivity and your life with beautiful blessings, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Family is where life begins and love never ends—wishing you all the happiness, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your home shine with warmth and your heart overflow with gratitude this year, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Hoping this year brings countless reasons for your family to smile together, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your home be blessed with unity, understanding, and pure joy, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "A strong family makes every year brighter—wishing you strength and love, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "I pray this year protects your family with peace and surrounds you with hope, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May every sunrise bring peace and every sunset bring comfort to your family, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing joy, blessings, and warmth to every member of your family, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Hoping this year brings your family closer to dreams and farther from worries, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May the bond you share with your loved ones grow stronger with each passing day, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Your family deserves a year full of good news and beautiful moments, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your home be a place of healing, happiness, and harmony in 2026, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "I pray this year brings your family everything they’ve been silently hoping for, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "A loving family is the biggest wealth—may yours always prosper, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your home be blessed with moments that turn into lifelong memories, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Let this year shower your family with peace, strength, and endless love, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "I hope 2026 brings your family more reasons to laugh and fewer reasons to worry, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May kindness, unity, and joy fill your family’s journey this year, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing a year of emotional healing and meaningful connections for your family, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Every family has a unique story—may yours be filled with blessings this year, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your home stay protected with peace and guided by love in 2026, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Let this year be gentle, kind, and generous to your loved ones, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you always find comfort in your home and strength in your family, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Your family’s happiness is a blessing worth praying for—may 2026 fulfill it, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "A peaceful home is the best gift—may yours be filled with it all year, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing your family protection from hardships and showers of blessings, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your family overcome challenges and rise stronger together this year, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Here’s to a year filled with compassion, joy, and family unity, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "As the year begins, may love wrap your family in its warm embrace, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Let this year be a beautiful chapter in your family’s story, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing good fortune, good health, and good moments to your loved ones, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉"
    ],
    funny: [
      "May your Wi-Fi be strong and your snacks never finish, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your resolutions last longer than your phone battery, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you more laughs and fewer 'reply later' messages, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your coffee be hot and your meetings be short, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your Netflix never buffer and your snacks always be nearby, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your pants always have an extra inch for dessert, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your alarm be kind and your snooze button truthful, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your group chats be active and your arguments funny, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your pizza always be perfectly cheesy, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your boss think 'good job' as often as you think 'I’ll do it tomorrow', {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you find one sock that never goes missing, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your memes always be on point and your mood boosted, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your phone battery last through every surprise call, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your coffee be stronger than your Monday, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you always hit green lights and good vibes, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you laugh until your stomach hurts (in a good way), {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your snacks never betray you and your fridge be generous, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your playlists be fire and your chores be optional, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your Wi-Fi password be easy and your downloads fast, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you always find the perfect GIF for every moment, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your online orders arrive faster than your patience, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your pizza delivery person be a magician, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you never press 'reply all' by mistake, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your snacks outnumber your problems, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your code run on first try and your coffee be bottomless, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your group photos hide no one and show all smiles, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your pizza be hot, your jokes land, and your naps be long, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your socks match and your Mondays be short, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you avoid spoilers and find the best sales, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your autocorrect behave and your texts be witty, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your coffee cup be full and your inbox nearly empty, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your mornings be bright and your pajamas comfortable, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your fridge be stocked and your plans be spontaneous, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your pizza be more consistent than your Wi-Fi, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your jokes land and your puns be appreciated, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your snacks be free and your naps guiltless, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you find extra fries at the bottom of the bag, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your meetings be emails and your emails be jokes, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your boss bring cake and your team bring compliments, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your phone never autocorrect 'yes' to 'yikes', {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your snacks be shared and your secrets safe, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your playlist always match your mood (and boost it), {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your coffee be strong and your Wi-Fi stronger, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your phone never die at the best part of a joke, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your weekends be long and your Mondays gentle, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your laugh be louder than your worries, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May every awkward silence turn into a funny story, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you always get the seat with the best legroom, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your snacks come with unlimited refills, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your jokes be evergreen and your puns be timeless, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your meetings include free coffee and zero slides, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your pizza be delivered before you finish deciding toppings, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your memes be top quality and your days meme-worthy, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your naps be long and your chores be short, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your playlists be fire and your problems cooling, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your pizza slices always be the biggest, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your selfies always find the right light, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your pizza be cheesy and your jokes cheesy in the best way, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you always find the remote under the couch on the first try, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your lost socks return home as heroes, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your coffee be hot, your phone charged, and your mood sunny, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your quarantine snacks be legendary and your jokes legendary too, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your autocorrect be merciful and your messages make sense, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your favorite song always come on shuffle, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your plans be flexible and your calories forgiven, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your pizza always be sliceable and your Wi-Fi always stable, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your snacks be unlimited and your chores invisible, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your jokes land like perfect punchlines, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your laughter be louder than any notification sound, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your naps feel short but recharge you fully, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your pizza arrive warm and your Wi-Fi never betray you, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉"
    ],
    emotional: [
      "May this year bring healing to every part of your heart that has waited too long for peace, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May the coming days unfold gently, filling your life with quiet strength and soft hope, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May every sunrise remind you that beginnings are always possible, no matter your past, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you walk into this year with courage, leaving behind what dimmed your light, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your heart find the peace it has been longing for in ways you never imagined, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your quiet prayers be answered with gentle, beautiful surprises, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May this year teach you how deeply you deserve love, respect and tenderness, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May every step you take lead you closer to the life your soul truly desires, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your spirit rise again from every place it once felt broken, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you rediscover the strength that difficult seasons tried to hide, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your days ahead be filled with calm certainty and warm comfort, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May the people meant for your heart find their way to you with pure intentions, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your life bloom in ways that even you didn’t expect, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you forgive yourself for the times you didn’t know better, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you feel proud of how far you’ve come and hopeful for how far you’ll go, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May this year hold moments that make your heart whisper, ‘Finally.’, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May the right people stay, the wrong people fade, and real love find you, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you feel held, supported, and understood in ways you never have before, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May clarity replace confusion and purpose replace doubt, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May this year fill your life with moments that make you quietly smile, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you learn to celebrate your small victories—they are shaping something great, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your tears turn into strength and your silence turn into wisdom, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May the softness in your heart never fade, even when the world feels harsh, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your healing be gentle, steady and exactly what your soul needs, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May love find you in the most unexpected and beautiful ways, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May every broken piece of your past transform into strength for your future, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your nights be peaceful and your mornings filled with purpose, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May the light inside you shine brighter than the shadows behind you, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you finally choose yourself the way you’ve chosen others, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you grow in confidence, compassion and contentment every day, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May the storms you faced last year become stories of strength this year, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May the weight on your heart become lighter with each passing day, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May blessings chase you, comfort find you and joy choose you, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your journey be filled with kindness—from others and from yourself, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May the right opportunities appear at the right moments, guiding you forward, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you feel surrounded by love even when sitting alone, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May this year rewrite every chapter that once brought you pain, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May calmness enter your life like a quiet sunrise, slowly and beautifully, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you be blessed with people who feel like home, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your heart open to new beginnings that feel safe and right, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you feel proud of how gracefully you survived the days you thought you couldn’t, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May the joy you give return to you in even greater measure, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May peace follow you like a shadow—soft, constant, and always near, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May the right words reach you at the right time to lift your soul, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May forgiveness free you from what has already passed, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May clarity guide your decisions and courage guide your heart, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your quiet strength shine louder than your fears, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May the universe rearrange itself in your favor this year, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you find rest from battles you no longer need to fight, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May the world be gentle with your heart, even when life feels heavy, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May courage sit beside you on days when hope feels far away, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you find meaning in small moments and magic in ordinary days, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May tenderness reach the parts of your heart that you keep hidden, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May this year soften your worries and strengthen your dreams, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you learn to rest without guilt and rise without fear, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May hope stay beside you like a quiet friend through every season, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your future speak gently, promising better days ahead, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your heart unlock new forms of joy that feel soft and safe, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your soul feel lighter than it did last year, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your dreams stretch, rise, and come closer than ever before, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May peace, love, and purpose find their way to your doorstep, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your heart bloom again in seasons where you feared it never would, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May joy surprise you often and sadness visit you rarely, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May the softness of this year balance the hardness of the last, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you trust the timing of your life more deeply this year, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your story unfold beautifully, page by page, month by month, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May this year bring you the kind of happiness that feels peaceful, not loud, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your dreams and destiny meet each other halfway this year, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you receive the love you give and the kindness you offer, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your soul feel seen, heard and cherished, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your year be filled with quiet victories that mean everything to your heart, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉"
    ],
    professional: [
      "Wishing you a year filled with strong progress, smart decisions, and meaningful achievements, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May every opportunity this year move you closer to your long-term goals, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your hard work translate into well-deserved recognition and growth, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you clarity in planning, confidence in execution, and excellence in results, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May every challenge you face turn into a stepping stone for greater success, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May integrity guide your decisions and dedication shape your achievements, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you a year of smart risks, bold ambitions, and steady accomplishments, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May new skills, new confidence, and new opportunities elevate your career, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you strong leadership, positive teamwork, and rewarding milestones, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your workplace bring learning, stability, and meaningful impact, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your productivity be high, your distractions be few, and your progress be consistent, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you growth that feels earned and success that feels fulfilling, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your professional relationships deepen with trust and mutual respect, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you unlock opportunities that match your talent and ambition, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you decisions that bring confidence, not confusion, in the year ahead, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your focus sharpen, your abilities expand, and your career thrive, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May success follow you consistently—quietly, steadily, and visibly, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you resilience in challenges and wisdom in every opportunity, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your work be purposeful, appreciated, and rewarded, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you professional stability, financial strength, and long-term fulfillment, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your career evolve with confidence, precision, and clear direction, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you strong discipline, impactful results, and meaningful recognition, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May this year open doors that were previously closed, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you strategic victories and steady advancement throughout the year, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your ideas be valued, your contributions respected, and your efforts rewarded, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you a workplace filled with positivity, cooperation, and growth, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you find clarity in your goals and strength in your talents, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you smooth workflows, successful outcomes, and satisfied clients, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your decisions be wise, your communication sharp, and your mindset confident, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you efficient days, productive weeks, and rewarding months ahead, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May every new project bring growth and every achievement bring pride, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you financial stability, professional respect, and meaningful progress, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your skillset deepen and your confidence rise with every new task, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you a year of strong breakthroughs and consistent improvement, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your goals align with your growth and your growth align with your dreams, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you a balanced year where productivity meets peace of mind, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you navigate challenges with calm professionalism and strategic focus, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you promotions that reflect your dedication and achievements, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May every lesson you learn this year empower your future, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you a network that supports, mentors, and uplifts you, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your professional journey be filled with purpose and direction, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you confidence in your abilities and pride in your progress, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your workplace acknowledge your contributions generously, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you meaningful collaborations and inspiring partnerships, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your year be filled with achievements that reflect your true potential, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you skillful execution and rewarding outcomes in all your endeavors, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your leadership inspire others and your dedication elevate your team, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you the drive to grow and the patience to evolve steadily, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your work environment be productive, encouraging, and aligned with your goals, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you long-term growth and short-term wins in perfect balance, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May every effort you make contribute to a future you’re proud of, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you valuable insights, clear strategies, and strong execution, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May this year bring you career clarity and financial comfort, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you consistency in work and celebration in achievements, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you stand out for your excellence and rise through your dedication, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you a year filled with new learning and professional fulfillment, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May success come to you steadily—never rushed, never delayed, always right on time, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you the mental strength to stay focused and the emotional strength to stay grounded, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your talent shine bright and your efforts shine even brighter, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you financial growth that matches your professional ambition, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May your team value your presence and your work speak louder than words, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you balanced days filled with purpose, productivity, and peace, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you attract the right roles, right mentors, and right results this year, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you endless motivation and remarkable achievements this year, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May you receive the appreciation your hard work truly deserves, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you confidence in challenges and pride in victories, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "May the path ahead bring you security, success, and satisfaction, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉",
      "Wishing you a year where your goals are clear, your actions consistent, and your achievements meaningful, {{receiver}} — {{sender}}\n🎉 Happy New Year 2026! 🎉"
    ]


  },

  // BENGALI
  bn: {
    love: [
      // ===== Rewritten OLD Bengali Wishes =====

      "এই নতুন বছরে আমাদের ভালোবাসা আরও গভীর হোক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার সাথে প্রতিটা মুহূর্ত আরও বিশেষ হয়ে উঠুক এই বছরে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমাকে পাশে পাওয়াই আমার সবচেয়ে বড় আশীর্বাদ, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছর আমাদের ভালোবাসা আরও শক্তিশালী হোক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার সাথে আগামী বছরের প্রতিটা দিন আরও সুন্দর হয়ে উঠুক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",

      // ===== 50 NEW AI-GENERATED LOVE WISHES =====

      "তোমাকে ছাড়া আমার নতুন বছর কখনোই সম্পূর্ণ নয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার ভালোবাসাই আমার জীবনের সবচেয়ে সুন্দর উপহার, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছরে আমাদের প্রেমের কাহিনি আরও মিষ্টি হয়ে উঠুক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমাকে ছুঁয়ে থাকা প্রতিটি মুহূর্ত আমার হৃদয়ে চিরস্থায়ী হোক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার সাথে কাটানো প্রতিটা সেকেন্ড আমার জন্য এক বিশেষ স্মৃতি, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তুমি থাকলে আমার সব নতুন শুরু আরও অর্থবহ হয়ে ওঠে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "আমাদের ভালোবাসা সময়ের সাথে আরও নিখুঁত হয়ে উঠুক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমাকে ভালোবাসা আমার জীবনের সবচেয়ে সহজ ও সুন্দর সিদ্ধান্ত, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার হাসি আমার নতুন বছরের প্রথম আলো হোক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমাকে পাশে পেয়ে প্রতিটা বছরই আমার কাছে বিশেষ, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "আমাদের ভালোবাসা যেন কখনো মলিন না হয়, বরং প্রতিদিন নতুন করে ফুটে ওঠে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার হাত ধরে নতুন বছর শুরু করাই আমার সবচেয়ে বড় আনন্দ, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তুমি আমার আজ, তুমি আমার আগামী—আর তুমি আমার ভবিষ্যৎও, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার ভালোবাসা আমাকে প্রতিদিন শক্তি দেয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই নতুন বছরে তোমাকে আগের থেকেও বেশি ভালোবাসতে চাই, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার সাথে থাকা মানেই শান্তি, সুখ আর সম্পূর্ণতা, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তুমি আমার জীবনের সবচেয়ে সুন্দর অধ্যায়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমাকে ছাড়া আমার নতুন বছরের স্বপ্নও অসম্পূর্ণ, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার ভালোবাসা আমার প্রতিদিনকে একটু করে আরও রঙিন করে তোলে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "আমাদের সম্পর্ক যেন আরও মজবুত, আরও গভীর হয় এই বছরে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তুমি আমার জীবনকে যে শান্তি দাও, তা ভাষায় প্রকাশ করা যায় না, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার সাথে নতুন বছর মানেই নতুন আশা আর নতুন স্বপ্ন, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তুমি পাশে থাকলে আমার পৃথিবী সবসময় ঠিক থাকে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার ভালোবাসা আমার কাছে ঈশ্বরের দেওয়া সবচেয়ে বড় উপহার, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉"
    ],
    friendship: [
      // ===== OLD (already rewritten earlier, keep that) =====
      // ===== Rewritten OLD Wishes =====

      "তোমার মতো একজন বন্ধুকে পেয়ে আমি সত্যিই ভাগ্যবান, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছরে আমাদের বন্ধুত্ব আরও গভীর ও শক্তিশালী হোক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার সাথে কাটানো প্রতিটা মুহূর্তই আমার কাছে বিশেষ, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "বন্ধু হিসেবে তোমার মতো মানুষ খুব কমই হয়—তাই তোমাকে ধন্যবাদ, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "আমাদের বন্ধুত্ব যেন এই বছর আরও হাসি, মজা আর মধুর স্মৃতিতে ভরে ওঠে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",

      // Below are ONLY 50 new ones

      "বন্ধুত্ব মানে শুধু একসাথে থাকা নয়, একে অপরকে বোঝা—তুমি সবসময়ই সেটা করো, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছরে আমাদের বন্ধুত্ব আরও অনেক সুন্দর মুহূর্ত তৈরি করুক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তুমি সেই বন্ধু যে আমার জীবনকে সহজ আর আনন্দময় করে তোলে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যাকে আমি যেকোনো সময় ফোন করতে পারি—সে তুমি। তোমার জন্য ভালোবাসা রইল, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "আমাদের বন্ধুত্ব যেন কখনো দূরত্বের কাছে হার মানে না, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার সাথে কাটানো প্রতিটা মুহূর্ত আমার কাছে সত্যিকারের সুখ, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যে বন্ধু মন খারাপের সময় পাশে দাঁড়ায়—তুমি ঠিক সেই মানুষ, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "আমাদের বন্ধুত্ব যেন আগের থেকে আরও রঙিন হয় এই বছর, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "বন্ধুত্বের মানে তুমি আমাকে শেখালে—নিঃস্বার্থ থাকা, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার সাথে কাটানো সময়ের মতো সত্যিকারের আনন্দ আর কোথাও পাই না, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছরেও আমরা একসাথে হাসবো, লড়বো আর এগিয়ে যাবো, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "বন্ধুত্ব মানে ভরসা—আর তোমার উপর ভরসা আমার সবচেয়ে শক্তিশালী দিক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "নতুন বছর, নতুন স্মৃতি—কিন্তু সেরা স্মৃতিগুলো হবে আবার তোমার সাথেই, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তুমি পাশে থাকলে প্রতিটা কঠিন পথই সহজ লাগে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "বন্ধুত্বের বন্ধন যেন আগের চেয়ে আরও গভীর হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার মত বন্ধু পেলে পৃথিবীটা আরও সুন্দর লাগে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তুমিই আমার সেই বন্ধু যে আমার গল্পগুলো মন দিয়ে শোনে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছরের সব হাসির মুহূর্তগুলো তোমার সাথে ভাগ করে নিতে চাই, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "আমাদের সম্পর্ক যেন আরও শক্তিশালী আর সত্যিকারের হয়ে ওঠে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "বন্ধুত্ব মানে তুমি—চিরদিনের জন্য, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার সাথে কাটানো ছোট ছোট মুহূর্তগুলোই আমার জন্য বড় আনন্দ, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "বন্ধুত্বের সুখ কথায় বোঝানো যায় না—তোমার সাথে সেটা অনুভব করি, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "লাখো মানুষের ভিড়ে তোমার মতো বন্ধু একটাই হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছর আমাদের বন্ধুত্ব আরও নির্ভেজাল হয়ে উঠুক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তুমি পাশে থাকলে আমার জীবনটা সহজ মনে হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যত সমস্যাই আসুক, আমাদের বন্ধুত্ব সবকিছুই সামলে নেবে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যে বন্ধুকে মনে পড়লে হাসি পায়—সে তুমি, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যে বন্ধু মনের কথা বুঝতে পারে কথা না বললেও—সে তুমি, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তুমি আমার জীবনের সেই সুন্দর অংশ যা কখনো বদলাতে চাই না, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "আমাদের বন্ধুত্ব যেন প্রতিটা বছরে আরও গভীর হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      " সত্যিকারের বন্ধু জীবন বদলে দেয়—তুমি তেমনই একজন, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমাকে বন্ধু বলে ডাকতে পারাটাই আমার বড় অর্জন, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার হাসিই আমার দিনের এনার্জি, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "বন্ধুত্ব মানে পাশে থাকা—আর তুমি সবসময়ই থেকেছো, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "নতুন বছরে আমাদের বন্ধুত্বে আরও আনন্দ যোগ হোক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তুমি সেই বন্ধু যে মন ভেঙে গেলে জুড়ে দেয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "দরকারের সময় যাকে পাওয়া যায়—সেই তো সত্যিকারের বন্ধু। তুমি সেইজনই, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "বন্ধুত্বের মানে তোমাকে ছাড়া অসম্পূর্ণ, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার মতো বন্ধু পাশে থাকলে জীবনটা সহজ হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তুমি সেই মানুষ যে আমার খারাপ দিনটাকেও সহনীয় করে তোলে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "বন্ধুত্ব থাকলে পৃথিবীটা একটু বেশি সুন্দর লাগে—তুমি তার প্রমাণ, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তুমি আমার দিনের সেই আলো, যা সব অন্ধকার দূর করে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যে বন্ধুত্ব বহু বছর পরও একইরকম থাকে—সেটাই সত্যিকারের বন্ধুত্ব। আমাদেরটা তেমনই থাকবে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছর তোমার সাফল্য আর হাসি আরও বেড়ে যাক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉"
    ],
    family: [
      // ===== OLD Bengali Family Wishes (already added earlier — keep yours) =====
      "পরিবারই আমাদের সবচেয়ে বড় শক্তি—এই বছরে তোমার পরিবারে সুখ-শান্তি নেমে আসুক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার এবং তোমার পরিবারের প্রতিটা দিন মঙ্গলময় হোক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "পরিবারের সাথে কাটানো সময়টাই সবচেয়ে মূল্যবান, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই নতুন বছরে তোমার পরিবারে ভালোবাসা আর একতা আরও বাড়ুক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      // Below are ONLY the full 50 new AI-generated Family wishes

      "তোমার পরিবারের প্রতিটা দিন শুভ, শান্তিময় আর ভালোবাসায় ভরে উঠুক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই নতুন বছরে তোমার পরিবারে হাসি আর সৌভাগ্য বর্ষিত হোক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "পরিবারের মানুষগুলো যেন সবসময় সুস্থ, নিরাপদ ও সুখে থাকে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার পরিবারের সদস্যদের মধ্যে ভালোবাসা আর একতা যেন আরও দৃঢ় হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "পরিবারেই আমাদের শান্তি—এই বছর সে শান্তি আরও বাড়ুক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "ঘরের প্রতিটা কোণে যেন সুখ আর আলো ছড়িয়ে পড়ে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার পরিবার যেন সব দুঃখ ভুলে নতুন আনন্দকে বরণ করে নেয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছর তোমার পরিবারে যেন হাসির শব্দ সবচেয়ে বেশি শোনা যায়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "পরিবারের সঙ্গে কাটানো সময়গুলো তোমার জীবনের সবচেয়ে সুন্দর স্মৃতি হয়ে উঠুক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "ঈশ্বর তোমার পরিবারকে সুস্থতা, সুখ আর সমৃদ্ধি দান করুন, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "পরিবারের প্রত্যেক সদস্য যেন আশীর্বাদে ঘেরা একটি বছর পায়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই নতুন বছরে পরিবারে সুখ-শান্তি যেন স্থায়ী হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "ঘরের ছোট থেকে বড়—সবাই যেন আনন্দে থাকে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার পরিবারের স্বপ্নগুলো এই বছরে বাস্তব রূপ পাক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "পরিবারে যেন সব ধরনের ভুল বোঝাবুঝি মিটে গিয়ে নতুন করে সম্পর্কগুলো আরও সুন্দর হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার পরিবারে ভালোবাসা আর মমতা যেন প্রতিদিন একটু করে বেড়ে যায়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যে পরিবার একসাথে হাসে, তাদের সুখও একসাথে বাড়ে—এই বছর যেন তেমনই হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "ঈশ্বর তোমার বাড়ির প্রতিটি কোণে আশীর্বাদ ছড়িয়ে দিন, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "পরিবারের সঙ্গে প্রতিটা দিন যেন আগের থেকে আরও বেশি সুখের হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছরে পরিবারে যেন কোনও কষ্ট তোমাদের ছুঁতে না পারে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার বাড়ির মানুষগুলো যেন সবসময় শান্তিতে ঘুমায় এবং হাসিমুখে জাগে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "পরিবারের সাথে কাটানো সময়গুলোই সত্যিকারের অমূল্য—এই নতুন বছরে সেই সময় আরও বাড়ুক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার পরিবারে যেন কখনো ভালোবাসার অভাব না হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার পরিবারের প্রত্যেকে যেন সুখে-স্বস্থ্যে আর শান্তিতে থাকে এই বছর, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার পরিবারে যেসব স্বপ্ন আছে—সেগুলো পূরণ হওয়ার জন্য এই বছরই হোক সেরা সময়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "পরিবারের প্রতিটি মানুষের মুখে যেন হাসি লেগে থাকে বছরভর, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার বাড়িটা যেন ভালোবাসা, আলো আর আনন্দে ভরে থাকে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "পরিবারের সাথে মিলেমিশে কাটানো প্রতিটা মুহূর্ত যেন মনে চিরস্থায়ী হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার পরিবার যেন সব বাধা অতিক্রম করে নতুন সাফল্যের পথে এগিয়ে যায়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "পরিবারে শান্তি থাকলে সবকিছুই সহজ—এই বছর তোমাদের শান্তি আরও গভীর হোক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "ঈশ্বর তোমাদের পরিবারের পথচলাকে সঠিক দিশা দেখান, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "ঘরের পরিবেশ যেন সবসময় আনন্দে ভরা থাকে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার পরিবারের মানুষগুলো যেন শুধু ভালো খবরই পায় এই বছর, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "কঠিন সময়েও পরিবার যেন শক্তির ভিত্তি হয়ে থাকে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "পরিবারের প্রতিটি সদস্য যেন তাদের স্বপ্নের দিকে আরও এক ধাপ এগিয়ে যায়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার বাড়িতে যেন সবসময় ভালোবাসার সুবাস ভেসে বেড়ায়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার পরিবারে যেন কোনো দুঃখ ঢুকতে না পারে—সবকিছুই সুখে ভরে উঠুক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "পরিবারের প্রতিটি সম্পর্ক যেন আরও স্নেহময় হয়ে ওঠে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার পরিবার যেন জীবনের প্রতিটি ক্ষেত্রে সাফল্য অর্জন করে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এ বছর যেন পরিবারে নতুন আশীর্বাদ আর নতুন আনন্দ আসে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার পরিবারের প্রতিটি হাসি যেন ঈশ্বরের আশীর্বাদ হয়ে আসে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "পরিবারের সাথে কাটানো মুহূর্তগুলোর মতো সুন্দর কিছু নেই—এই বছর সেরকম আরও মুহূর্ত তৈরি হোক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার বাড়িতে এই বছর সুখ, শান্তি আর সমৃদ্ধি স্থায়ী হোক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "পরিবারের প্রতিটি সদস্য যেন আনন্দে, সুস্থতায় আর ভালোবাসায় ভরে ওঠে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছর তোমাদের পরিবারের জীবনে যেন শুধু আলো আর সৌভাগ্য প্রবেশ করে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉"
    ],
    funny: [
      // ===== OLD Bengali Funny Wishes (you already added earlier — keep them) =====
      "নতুন বছরে যেন তোমার মোবাইলের ব্যাটারি লাইফ আমার ধৈর্যের মতো দীর্ঘ হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছর যেন তোমার ডায়েট প্ল্যান আমার ইচ্ছার মতো সফল হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার নতুন বছরের রিসল্যুশন যেন আমার মতোই টিকে থাকে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছর যেন তোমার ঘুম আমার মতো গভীর হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার নতুন বছরের পরিকল্পনা যেন আমার মতোই বাস্তবায়িত হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",

      // Below are ONLY the 50 new funny wishes

      "এই বছরে যেন তোমার টেনশন কমে আর তোমার খাওয়া বাড়ে—দুটোই ভালো জিনিস, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছর যেন তুমি অ্যালার্ম বন্ধ না করে সত্যিই ঘুম থেকে ওঠো, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার রিসল্যুশন যেন এইবার অন্তত ৩ দিন টিকে থাকে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যেন তোমার Wi-Fi সবসময় ফুল স্পিডে থাকে—মন, শরীর ও নেট—তিনটাই, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার স্ট্রেস যেন তোমার মোবাইল নেটওয়ার্কের মতো হঠাৎ গায়েব হয়ে যায়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার ঘুম যেন কাউকে ভয় না পায়—যেকোনো জায়গায়, যেকোনো সময় নামুক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "খাওয়ার সময় যেন কেউ তোমাকে ডিস্টার্ব না করে—এটাই আমার প্রার্থনা, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছর তুমি যেন বারবার ডায়েট শুরু করে বারবার বন্ধ না করো… বা করো, সমস্যা নেই, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার ফোন যেন কখনো ১% না দেখায়—মন মেজাজও না, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার ব্যাংক ব্যালেন্স যেন লোডিং লোডিং করে না থেকে সত্যিই বাড়ে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যেন এই বছরে তুমি কম ঘাবড়াও আর বেশি হাসো—বিশেষ করে আমার জোকসে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার লাইফ যেন বাফারিং ছাড়া ভালো চলে—Netflix-এর মতো স্মুথ হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছর যেন তোমার '5 minutes more' ঘুমটা সত্যিই ৫ মিনিট হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যেন কেউ তোমাকে নতুন বছরে ম্যাচমেকিং করে না দেয়—বাঁচো শান্তিতে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার মোবাইলে যেন সবসময় চার্জ থাকে—কিন্তু তোমার রাগে কখনো চার্জ না আসে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার খাবারের প্রতি ভালোবাসা যেন এই বছর আরও বেড়ে যায়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার লাইফ যেন ক্লাস টেস্টের মতো ভয়ঙ্কর না হয়ে বার্গারের মতো মজাদার হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার ঘুমানোর ক্ষমতা যেন নতুন লেভেলে পৌঁছে যায়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার টেনশন যেন স্কিপ অ্যাড বাটনের মতো এক সেকেন্ডে উধাও হয়ে যায়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছর যেন তুমি কম 'ভাবছি' আর বেশি 'করছি' মোডে থাকো, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যে দিন তুমি সকাল সকাল উঠবে—সেই দিনটা আমরা জাতীয় উৎসব ঘোষণা করব, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার লাইফ যেন Group Project-এর মতো না হয়—সব কাজ তোমাকেই করতে হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "নতুন বছর মানে নতুন আশা—কিন্তু তোমার পুরনো আলস্যটা যেন একই থাকে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছর যেন তোমার Crush তোমাকে 'সিন' না করে রিপ্লাইও দেয়! {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার ব্যাংক অ্যাকাউন্ট যেন তোমার খাওয়ার ইচ্ছের মতো বাড়তেই থাকে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছর যেন তোমার মোবাইলের নোটিফিকেশনগুলো শুধু ভালো খবরে ভরে থাকে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার রিসল্যুশন যেন তোমার ইগোর মতো শক্তিশালী হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "কাজের চাপ যেন তোমার মাথার ওপর না উঠে—বালিশের ওপর উঠুক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার জন্য নতুন বছরের শুভেচ্ছা—আর একটু বড় শুভেচ্ছা তোমার জন্য কফির, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যেন তোমার কানেকশন কখনো না কাটে—নেটওয়ার্কেরও না, সম্পর্কেরও না, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার হাসি যেন এই বছর আরও বেশি ঝলমল করে, যেমন তুমি সেলফিতে করো, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছর তুমি যেন কম 'ঘাবড়ে যাও' আর বেশি 'হ্যান্ডেল করতে পারি' মুডে থাকো, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার লাইফ যেন লোডশেডিং-প্রুফ হয়ে যায়—সবসময় আলো থাকুক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছর তুমি যেন সব নেগেটিভ মানুষকে আনফলো করে দাও—রিয়েল লাইফেও, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যেন কেউ তোমাকে জোর করে পড়তে না বসায়—নিজে নিজেই পড়ো বা না পড়ো, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যেন তোমার খিদে কম না হয়ে সবসময় বাড়তে থাকে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমাকে এই বছরের লক্ষ্য দিচ্ছি—অন্যের চার্জার চুরি না করা, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার জীবনে যেন সব সমস্যা সোজা হয়ে যায়—অন্তত তোমার হেয়ারফ্লিপের মতো, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "নতুন বছরে যেন তুমি কম 'ঘুম পাচ্ছে' আর বেশি 'চল শুরু করি' বলো, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার লাইফ যেন রিলসের মতো ছোট ছোট খুশিতে ভরে থাকে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যেন তোমার বাবা-মা তোমার ফোন ব্যবহার দেখে খুশি থাকে—কমপক্ষে একদিন, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার সব ভুল যেন মুছে যায়—কিন্তু তোমার গোপন মেমসগুলো যেন না মুছে যায়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছর তুমি যেন নিজের সাথে কম ঝগড়া করো আর নিজের যত্ন বেশি নাও, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার রাগ যেন তোমার ব্যাটারির মতো দ্রুত কমে যায়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যেন তোমার crush এবার তোমার স্টোরিতেও রিপ্লাই দেয়—তাও ফুল ইমোজি দিয়ে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছর যেন তুমি একবার হলেও gym যাও—সেলফি তুলতে হলেও, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তুমি যেন এই বছরেও সেই মজার, পাগলাটে, দারুণ মানুষটাই থেকো—যেমন তুমি আছো, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉"
    ],
    emotional: [
      // ===== OLD Emotional Wishes (already added earlier; keep them) =====
      "নতুন বছর তোমার জীবনে নতুন আশার আলো নিয়ে আসুক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার হৃদয়ে যেন নতুন বছর নতুন স্বপ্ন বয়ে আনে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই নতুন বছরে তোমার জীবনে সুখ আর শান্তি নেমে আসুক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার জীবনের প্রতিটি দিন যেন নতুন সম্ভাবনার সূচনা হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉 ",
      "নতুন বছর তোমার জীবনে নতুন অধ্যায়ের সূচনা হোক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",

      // Below are ONLY the 50 new emotional wishes

      "এই নতুন বছরে তোমার মন যেন শান্তিতে ভরে ওঠে—সব ক্লান্তি দূরে সরে যাক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যে স্বপ্নগুলো তোমার হৃদয়ে এখনো বেঁচে আছে—এই বছর সেগুলো সত্যি হোক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যা যা তুমি হারিয়েছো, এই বছর তার চেয়েও ভালো কিছু ফিরে আসুক তোমার জীবনে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার চোখের জল যেন হাসিতে বদলে যায়—এই নতুন বছরের আলোয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার হৃদয় যেন আগের থেকে আরও শক্তিশালী আর আলোয় ভরা হয়ে ওঠে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "কঠিন দিনগুলো যেন তোমাকে আর কষ্ট না দেয়—শুধু শেখায়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তুমি যেন এই বছরে নিজের মতো করে সুখ খুঁজে পাও—অন্য কারও নয়, নিজের জন্য, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার মন ভাঙা সব জায়গাগুলো এই বছর নতুন করে জুড়ে যাক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তুমি যেন অবশেষে সেই শান্তিটা পাও যেটা তুমি দীর্ঘদিন ধরে খুঁজছিলে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার জীবনে যেন শুধু সেই মানুষগুলো থাকে যারা তোমাকে সত্যিই ভালোবাসে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যে রাস্তাগুলো তোমাকে কষ্ট দিয়েছে, এই বছর সেগুলোই তোমাকে সাফল্যের পথে নিয়ে যাক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার জীবন যেন নতুন অধ্যায়ে নতুন আলোয় ভরে ওঠে—যেখানে শুধু সুখ থাকবে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার মনের অন্ধকারে যেন নতুন আশার আলো জ্বলে ওঠে এই বছরে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যা কিছু তোমাকে কষ্ট দিয়েছে—এই বছর যেন সেগুলোর কোনো চিহ্ন না থাকে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তুমি যেন নিজের ভেতরের শক্তিটা খুঁজে পাও এবং নিজের মতো করে জ্বলে ওঠো, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছর যেন তোমার জীবনে এমন মানুষ আসে যারা তোমাকে সত্যিই বুঝবে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার সব দুঃখ যেন নতুন সূচনায় মিলিয়ে যায় এবং সুখ এসে তোমাকে ঘিরে থাকে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "কিছু মানুষ আমাদের ভাঙে—কিন্তু তুমি যেন সেইসব অভিজ্ঞতা থেকে আরও শক্তিশালী হও, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তুমি যেন নিজের সত্যিকারের ভালোবাসা আর শান্তিটা খুঁজে পাও এই বছরে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার হাসিটা যেন এই বছর আরও উজ্জ্বল হয়, আর মনটা আরও হালকা হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার জীবনের সব অপূর্ণতা যেন এই বছর পূরণ হয়ে সুখের গল্পে বদলে যায়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "কঠিন সময় তোমাকে যতোই দুর্বল করুক, এই বছর তুমি আরও শক্তিশালী হয়ে উঠবে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যে মানুষগুলো তোমাকে কষ্ট দিয়েছে—এই বছর তারা আর তোমাকে ছুঁতে না পারে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার মন যেন নিজের স্বপ্নের পথে ফিরে যাওয়ার সাহস পায়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যে ভুলগুলো তোমাকে আজ এমন করেছে—সে ভুলগুলো থেকেই যেন তুমি আরও আলো পেয়ে ওঠো, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার যেসব ইচ্ছেগুলো পূরণ হয়নি—এই বছর যেন সেগুলো পূরণ হওয়ার শুরু হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার মন যেন সব সময় নিজের ভালো থাকার পথটাই বেছে নেয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যে ভালোবাসা তোমার প্রাপ্য—এই বছর যেন তা তোমার জীবনে এসে পৌঁছায়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যে সম্পর্কগুলো তোমার হৃদয় ভেঙেছে, এই বছর যেন সেগুলোর বদলে নতুন আশীর্বাদ আসে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার নিজের মূল্য যেন তুমি নিজেই বুঝতে পারো—এই বছরই হোক সেই বছর, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তুমি যেন নিজের প্রতি আরও ভালোবাসা দেখাতে শেখো, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যে স্বপ্নগুলোকে তুমি পিছনে ফেলে এসেছো—এই বছর যেন সেগুলো নতুন করে বাঁচতে শুরু করে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "বৃষ্টি শেষে রোদ যেমন আসে—তেমনি তোমার জীবনে সুখ এসে সব দুঃখ ঢেকে দিক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার জীবনে যেন এমন কেউ আসে, যে তোমার মনটা সত্যিই বুঝবে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যা কিছু তোমার ভিতরে আজও ব্যথা দেয়—এই বছর যেন তা নিরাময় হয়ে যায়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার ভেতরের আলো যেন আরও বেশি জ্বলে ওঠে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যে আশা তুমি হারিয়ে ফেলেছিলে—এই বছর যেন তা ফিরে আসে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যে শান্তি তোমার মন চায়—এই বছর যেন তা তোমার সঙ্গী হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার জীবনের প্রতিটা অন্ধকারে যেন আলো পৌঁছে যায়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যে পথগুলো তোমার সামনে বন্ধ ছিল—এই বছর যেন সেগুলো খুলে যায়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার ব্যথা যেন শক্তিতে বদলে যায়, আর কষ্টগুলো যেন পথ দেখায়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার প্রতিটা দিন যেন নতুন আশার আলোয় শুরু হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার মন যেন সবসময় নিজের সুখের দিকেই হাঁটে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "অতীতের ভুলগুলো যেন আর তোমাকে আটকে রাখতে না পারে—তুমি এগিয়ে যাও, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যে ভালোবাসা তুমি দিয়েছো—এই বছর যেন সেই ভালোবাসা দ্বিগুণ হয়ে তোমার কাছে ফিরে আসে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার ভয়ের জায়গায় যেন সাহস আসে, আর দুঃখের জায়গায় আনন্দ, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তুমি যেন জীবনের সবচেয়ে সুন্দর অধ্যায়ে প্রবেশ করো এই বছরে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যে হৃদয়টা এতদিন আঘাতে ভরা ছিল—এই বছর যেন সেটাই ভালোবাসায় ভরে ওঠে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉"
    ],
    professional: [
      // ===== OLD professional wishes already included earlier — keep them =====
      "নতুন বছরে তোমার ক্যারিয়ারে নতুন উচ্চতা স্পর্শ করো, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার পরিশ্রম যেন এই বছর সাফল্যের ফল দেয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার কাজের প্রতি নিষ্ঠা যেন তোমাকে নতুন সুযোগ এনে দেয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই নতুন বছরে তোমার ক্যারিয়ারে উন্নতির নতুন পথ খুলে যাক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার পেশাগত জীবনে নতুন সাফল্যের সূচনা হোক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",

      // ===== Below are the 50 brand-new professional Bengali wishes =====

      "এই নতুন বছরে তোমার ক্যারিয়ারে যেন নতুন দরজা খুলে যায়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "কাজের প্রতি তোমার নিষ্ঠা যেন এই বছরে আরও বড় সাফল্য এনে দেয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার প্রতিটা পরিশ্রমের সঠিক মূল্য যেন এই বছরে তুমি পাও, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার কর্মজীবনের প্রতিটা পদক্ষেপ যেন তোমাকে আরও এগিয়ে নিয়ে যায়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার লক্ষ্যগুলো এই বছর আরও স্পষ্ট হোক এবং অর্জন আরও সহজ হোক, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "নতুন বছর মানেই নতুন সুযোগ—সেগুলো যেন তোমার জীবনে সত্যিই কাজে আসে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যে স্বপ্নটা তুমি ক্যারিয়ারে দেখতে চেয়েছিলে—এই বছর যেন সেটাই শুরু হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার পরিশ্রম আর সৎ ইচ্ছা যেন সাফল্যের সিঁড়ি তৈরি করে দেয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছর যেন তুমি নিজের দক্ষতাকে নতুন স্তরে নিয়ে যেতে পারো, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার জীবনে যেন এমন কাজ আসে যা তোমাকে সত্যিই গর্বিত করে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার অফিস লাইফ যেন দুশ্চিন্তাহীন আর স্মার্ট সিদ্ধান্তে ভরা হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "কাজের চাপ যেন কমে এবং সফলতার পরিমাণ যেন বাড়ে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার ইনকাম গ্রাফ যেন এই বছর শুধু ওপরে ওঠে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যে প্রোজেক্টগুলো তুমি শেষ করতে চেয়েছিলে—এই বছর যেন সেগুলো সফল হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যে ছোট ছোট অগ্রগতি তুমি করবে, সেগুলোই যেন বড় সাফল্য বয়ে আনে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার ক্যারিয়ারের প্রতিটা বাঁধাকে যেন তুমি সুযোগে বদলে ফেলতে পারো, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার দরকারি মানুষ ও সঠিক সুযোগ যেন এই বছর সহজেই তোমার কাছে আসে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "কাজের জায়গায় তোমার সম্মান যেন আরও বাড়ে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার বস যেন তোমার কাজ দেখে খুশি হয়—আর তোমাকেও রিল্যাক্স করতে দেয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তুমি যেটা সত্যিই পছন্দ করো—এই বছর যেন সেই কাজটাকেই তুমি পাও, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার জীবন যেন ব্যালান্সড হয়—কাজ আর ব্যক্তিগত জীবন দুইই সুন্দরভাবে চলে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "ক্যারিয়ারে নতুন চিন্তা, নতুন শক্তি আর নতুন উৎসাহ আসুক তোমার জীবনে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার পরিশ্রম যেন বিফলে না যায়—ঈশ্বর যেন সেই কঠোর পরিশ্রমের সঠিক ফল দেন, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছর তুমি যেন নিজের স্বপ্নের জন্য আরও সাহসী হয়ে ওঠো, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "কাজের চাপ কম হোক, কিন্তু সাফল্যের লেভেল বাড়ুক—এই কামনা রইল, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যে গুণটা তোমাকে অনন্য করে তোলে—এই বছর যেন সেই গুণটাই তোমার সফলতার চাবিকাঠি হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার কাজে যেন সৃজনশীলতা আর দক্ষতা দুটোই আরও ফুটে ওঠে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যে সুযোগগুলো তোমার জীবনে আসছে—সেগুলো যেন তুমি সঠিকভাবে কাজে লাগাতে পারো, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার প্রতিটি ছোট অর্জন যেন বড় সাফল্যের পথ তৈরি করে দেয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "ক্যারিয়ারের প্রতিটা সিদ্ধান্ত যেন এই বছর সঠিক হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছরে নতুন দক্ষতা শেখার সুযোগ যেন তুমি হারিয়ে না ফেলো, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার প্রফেশনাল লাইফ যেন আগের থেকে আরও বেশি স্থির ও সফল হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যে কাজই তুমি করবে—সেটা যেন তোমাকে আনন্দ দেয় এবং তোমাকে সফল করে তোলে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যে সাফল্যের জন্য তুমি এত পরিশ্রম করছ—এই বছর যেন সেটা অবশ্যই পাও, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "যে বাধাগুলো তোমাকে ভয় দেখায়—এই বছর তুমি সেগুলোকে জয় করতে শিখবে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার জীবন যেন প্রয়োজনীয় গাইডেন্স আর সঠিক সিদ্ধান্তে ভরে ওঠে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "কাজের প্রতি তোমার আগ্রহ যেন কখনো কমে না—বরং আরও বাড়ে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তুমি যেন নিজের প্রতিভাকে নতুন উচ্চতায় নিয়ে যেতে পারো এই বছর, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছর যেন তুমি সেই সাফল্য অর্জন করো যেটার স্বপ্ন তুমি সবসময় দেখে এসেছো, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার জীবন যেন শুধুই ইতিবাচক মানুষের সাথে ভরে ওঠে—যারা তোমাকে উন্নতি করতে সাহায্য করবে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার জীবনে যেন আর্থিক অবস্থার উন্নতি হয় এবং তোমার পরিশ্রম তার সঠিক মূল্য পায়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "নিজের উপর বিশ্বাস রাখো—এই বছর সেই বিশ্বাসই তোমাকে সফলতার পথে নিয়ে যাবে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছর তুমি যেন নতুন উচ্চতায় পৌঁছে যাও তোমার ক্যারিয়ারে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার পরিশ্রমে যেন ঈশ্বর আশীর্বাদ দেন এবং তোমার পথ আরও উজ্জ্বল করে তোলেন, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছর যেন তোমার সমস্ত কঠোর পরিশ্রম সফলতার আলোয় ঝলমল করে ওঠে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "তোমার ভবিষ্যৎ যেন আগের থেকেও বেশি শক্তিশালী আর আলোকিত হয়, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "প্রতিটি চ্যালেঞ্জ যেন তোমাকে আরও সাহসী আর আত্মবিশ্বাসী করে তোলে, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉",
      "এই বছর তুমি যেন নিজের মেধা, পরিশ্রম এবং ইচ্ছাশক্তি দিয়ে সফলতার শিখরে পৌঁছে যাও, {{receiver}} — {{sender}}\n🎉 শুভ নববর্ষ ২০২৬! 🎉"
    ]

  },

  // HINDI
  hi: {
    love: [
      // ===== 50 NEW Hindi Love Wishes =====

      "इस नए साल में हमारी मोहब्बत और भी गहरी और मजबूत हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारे साथ बिताया हर पल मेरे दिल के बहुत करीब है। यह साल और भी खूबसूरत हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारी मुस्कान इस साल मेरे लिए सबसे बड़ा तोहफ़ा हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारा साथ मेरे हर कल को बेहतर बनाता है—ऐसे ही साथ निभाते रहो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "हमारी कहानी इस साल और भी खुबसूरत अध्याय लिखे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम मेरे आज भी हो, मेरे कल भी… और मेरी पूरी ज़िंदगी भी, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारा प्यार मेरे लिए हमेशा से सबसे कीमती रहा है—इस साल और बढ़ जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "ये साल तुम्हारी बाहों में शुरू हो और तुम्हारी ही मुस्कान पर खत्म हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "हमारी मोहब्बत इस साल और भी खिल उठे—जैसे बसंत की पहली खुशबू, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारा साथ मेरी दुनिया को पूरा करता है—ये साल भी तुम्हारे ही नाम हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल तुम्हें पहले से ज्यादा प्यार, सम्मान और खुशियां दूंगा/दूंगी, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारी आवाज मेरे लिए हर तनाव का इलाज है—इस साल और ज्यादा सुनना चाहता/चाहती हूँ, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "मेरे हर सपने में तुम हो—इस साल उन्हें सच करने का वक़्त है, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "हमारी मोहब्बत को किसी नज़र से बचाए रखे इस साल, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम मेरे जीवन की सबसे खूबसूरत वजह हो—हमेशा रहना, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारा हाथ पकड़कर इस साल की हर शुरुआत करना चाहता/चाहती हूँ, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "हमारी छोटी-छोटी खुशियाँ इस साल सबसे बड़ा सुख बनें, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारे बिना हर साल अधूरा है—यह साल पूरा हो सिर्फ तुम्हारी वजह से, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "मेरी हर धड़कन तुम्हारा नाम ले—इस साल और भी तेज़ी से, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारी मुस्कान मेरे जीवन का सबसे सुंदर हिस्सा है—इस साल और भी बढ़े, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "हमारी मोहब्बत हर मुश्किल को आसानी से पार कर जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारे साथ हर दिन को नई शुरुआत जैसा महसूस करता/करती हूँ, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आने वाला हर पल तुम्हारे साथ बिताना चाहता/चाहती हूँ, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम मेरे दिल की शांति हो—इस साल और भी गहरी हो जाओ, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "मेरे सभी सपनों में तुम ही हो—इस साल सब पूरे हों, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारे चेहरे की चमक हर दिन मेरे लिए नया सवेरा है, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "हमारी मोहब्बत इस साल हर तूफ़ान को हरा दे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हें प्यार करना मेरे जीवन का सबसे सुंदर फैसला है, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम मेरे दिल की दुनिया का सबसे प्यारा हिस्सा हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल हमारी नज़दीकियाँ और भी बढ़ें—दिल से दिल तक, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारी हर ख्वाहिश मेरी दुआ बन जाए इस नए साल में, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हें पाकर ही मैंने प्यार का असली मतलब जाना—इस साल और भी समझना चाहता/चाहती हूँ, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "हम दोनों के बीच की ये खूबसूरत डोर और भी मजबूत हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल तुम्हारी हर मुस्कान मेरे लिए एक दुआ साबित हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम मेरी धड़कनों का सबसे प्यारा संगीत हो—यूँ ही बने रहो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "हमारा रिश्ता इस साल नई रोशनी और नई खुशियों से भर जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम मेरे हर कल का सबसे सुंदर वादा हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "हमारी मोहब्बत इस साल हर दूरी को मिटा दे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हें हर दिन नया प्यार देना चाहता/चाहती हूँ इस साल, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारे बिना कोई पल पूरा महसूस नहीं होता—इस साल साथ रहना हमेशा, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम मेरे जीवन का वो हिस्सा हो जो हमेशा चमकता रहे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारे साथ हर साल खास था—2026 सबसे खास हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारी मौजूदगी मेरी ज़िंदगी को खूबसूरत बनाती है—इस साल और भी ज्यादा, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल मैं तुम्हें पहले से भी ज्यादा प्यार करना चाहता/चाहती हूँ, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारा हाथ थामकर चलना ही मेरी सबसे बड़ी खुशी है, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "हमारा साथ इस साल अनगिनत खूबसूरत पलों से भर जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम मेरी पहली और आखिरी प्यार की दुआ हो—इस साल और भी करीब आओ, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉"
    ],
    friendship: [
      // ===== 50 NEW Hindi Friendship Wishes =====

      "इस नए साल में हमारी दोस्ती और भी गहरी और मजबूत हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम जैसे सच्चे दोस्त के साथ हर साल खूबसूरत बन जाता है, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "हमारी दोस्ती पर कभी कोई दूरी या गलतफहमी हावी न हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारे जैसा दोस्त मिलना मेरे लिए किसी वरदान से कम नहीं, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल हम और भी ज्यादा हँसेंगे, घूमेंगे और यादें बनाएँगे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारी दोस्ती मेरे लिए हमेशा से ताकत रही है, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "हमारी दोस्ती पर समय का कोई असर न पड़े—ये साल और भी खूबसूरत हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "सच्ची दोस्ती वही होती है जो हर परिस्थिति में साथ रहे—तुम वैसे ही हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "किसी भी मुश्किल में सबसे पहले याद तुम ही आते हो—हमेशा साथ रहना, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल हमारी दोस्ती का रिश्ता और भी मजबूत हो जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम वह दोस्त हो जो मेरी खुशी को समझता है और दुख को बाँटता है, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "हमारी दोस्ती इस साल नई ऊर्जा और नए सपनों से भर जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल तुम्हें वो हर खुशी मिले जिसके तुम हकदार हो, मेरे दोस्त, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारे बिना मेरी लाइफ की आधी मस्ती ही कम हो जाती है, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "दोस्ती में कोई फॉर्मेलिटी नहीं—बस दिल से दुआ कि तुम हमेशा खुश रहो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल हमारी दोस्ती और भी शानदार यादों से भर जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "किस्मत वालों को ऐसे दोस्त मिलते हैं—मैं उन भाग्यशाली लोगों में हूँ, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल तुम्हारी लाइफ में सिर्फ पॉजिटिविटी और खुशी आए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारे साथ बिताया हर पल मेरे लिए खास है—इस साल और भी हों, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम मेरी लाइफ की वो हंसी हो जो कभी फीकी नहीं पड़ती, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "नई शुरुआत, नई उम्मीदें—पर दोस्ती वही पुरानी और मजबूत, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "मेरी हर परेशानी में तुम साथ खड़े होते हो—ईश्वर तुम्हें खुश रखे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "दोस्ती कोई खेल नहीं—लेकिन तुम मेरे सबसे बेस्ट प्लेयर हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल हमारी दोस्ती और भी प्यारी और मजबूत बनती जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम मेरे वो दोस्त हो जो हर दर्द को आधा और हर खुशी को दोगुना कर देते हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारी दोस्ती मेरे दिल के सबसे खास कोने में रहती है, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "हमारी दोस्ती पर समय, दूरी और परिस्थिति का कोई असर न पड़े, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "दोस्ती में दिल का कनेक्शन होता है—और हमारा कनेक्शन बहुत स्ट्रॉन्ग है, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल कोई भी टेंशन हमारी दोस्ती के रास्ते में न आए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "मेरी लाइफ के सबसे सुंदर रिश्तों में से एक—हमारी दोस्ती, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारे साथ की गई बातें हमेशा दिल को सुकून देती हैं, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल हम एक-दूसरे की और भी ज्यादा सपोर्ट बनें, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम मेरी लाइफ के वो दोस्त हो जो हर तूफ़ान में भी मेरे साथ रहता है, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "हमारी दोस्ती इस साल नई ऊंचाइयों को छुए—बिना किसी डर या शक के, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "मेरी दुआ है कि इस साल तुम्हें वो सब मिले जो तुम्हें सच्ची खुशी दे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "दोस्ती में कोई शर्त नहीं होती—बस दुआ कि तुम हमेशा मुस्कुराते रहो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "मेरी लाइफ की आधी टेंशन तुम्हारे एक जोक से दूर हो जाती है—हमेशा ऐसे ही रहना, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "हमारी दोस्ती उन रिश्तों में से है जो बातें कम और समझ ज्यादा रखते हैं, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "यह साल तुम्हारे करियर, स्वास्थ्य और खुशी सबमें सकारात्मक बदलाव लाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "दोस्ती तुम्हारी हो और साल नया—फिर तो मज़ा ही अलग है, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम मेरे वो दोस्त हो जिनका साथ मुझे हर साल चाहिए—हमेशा, हमेशा, हमेशा, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "कभी-कभी दोस्त ही परिवार बन जाते हैं—तुम वही हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल हमारी दोस्ती में और ज्यादा भरोसा, प्यार और खुशियाँ जुड़ें, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारे जैसा दोस्त मिलना मेरे लिए भगवान का सबसे बड़ा तोहफ़ा है, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "ये साल तुम्हारी लाइफ में बड़ी खुशियाँ और बड़ी उपलब्धियाँ लेकर आए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हें दोस्त कहने में मुझे गर्व महसूस होता है—हमेशा मुस्कुराते रहो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "हमारी दोस्ती आने वाले हर साल में और भी खूबसूरत बनती जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉"
    ],
    family: [
      // ===== 50 NEW Hindi Family Wishes =====

      "इस नए साल में आपके परिवार पर खुशियों की बरसात हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके घर में पूरे साल शांति, प्रेम और सौभाग्य बना रहे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके परिवार का हर सदस्य स्वस्थ, सुरक्षित और खुशहाल रहे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके परिवार में हर दिन नई मुस्कान और नई उम्मीद लेकर आए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "घर में आपसी प्यार और एकता इस साल और भी मजबूत हो जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके परिवार का हर कदम सफलता और समृद्धि की ओर बढ़े, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "घर के छोटे-बड़े सभी सदस्यों पर भगवान की कृपा बनी रहे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके परिवार में कोई भी दुख या परेशानी प्रवेश न करे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आप सभी के बीच का प्रेम और भी गहरा हो जाए इस वर्ष, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके घर में हर सुबह नई सकारात्मकता लेकर आए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके परिवार की हर इच्छा पूरी हो और हर सपना साकार हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "परिवार में हमेशा हंसी-खुशी का माहौल बना रहे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके घर के रिश्ते और भी मीठे और मजबूत हों, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल आपका परिवार हर कठिनाई पर जीत हासिल करे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके घर में हर कदम पर सुख-समृद्धि का वास हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके माता-पिता, भाई-बहन और सभी प्रियजनों का जीवन खुशियों से भर जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "प्यार, सम्मान और अपनापन हमेशा आपके परिवार के साथ बना रहे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके घर की खुशियाँ इस साल दोगुनी हो जाएँ, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "दूसरों की नजरें और नकारात्मकता आपके परिवार से दूर रहें, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके परिवार का हर सदस्य इस साल नई ऊंचाइयां छुए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "किस्मत आपके परिवार पर मुस्कुराए और खुशियाँ हर ओर फैल जाएँ, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "घर में कोई कमी न रहे—चाहे वो प्यार की हो या सुख की, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपका परिवार इस साल हर चुनौती को हिम्मत के साथ स्वीकार करे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके घर में भगवान का आशीर्वाद निरंतर बरसे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके परिवार का हर दिन उत्साह और खुशी से भरा रहे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके प्रियजनों के चेहरे हमेशा मुस्कुराते रहें, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपकी फैमिली में किसी भी तरह का तनाव न रहे—बस प्यार ही प्यार हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके परिवार का स्वास्थ्य पूरे साल उत्तम बना रहे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आप सभी के घर में समृद्धि का दीपक निरंतर जलता रहे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपका हर पारिवारिक सपना इस साल एक कदम और आगे बढ़े, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके घर का वातावरण हमेशा शांतिपूर्ण और सकारात्मक बना रहे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल परिवार में नई खुशियों का आगमन हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके रिश्तेदारों और परिजनों के साथ आपके संबंध और मीठे बनें, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके परिवार को हर दिन नई ऊर्जा और नई उम्मीद मिले, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "जो भी परेशानी पिछले साल आई थी—उसका अंत इस साल खुशियों से हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके बच्चों का भविष्य इस साल और उज्ज्वल हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल आपके घर की रसोई में कभी कमी न आए—हमेशा बरकत रहे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "घर के बुजुर्ग हमेशा स्वस्थ और खुश रहें—उनकी दुआएँ आपको मार्ग दिखाएँ, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके परिवार में शांति, धर्म और सौहार्द की भावना बढ़ती रहे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आप सबके जीवन में हर दिन नई सफलता का प्रकाश आए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपका घर हमेशा हंसी, खुशी और प्यार से गूंजता रहे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके परिवार के हर सदस्य की मेहनत इस साल भावनात्मक और आर्थिक दोनों रूप से सफल हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके घर में सौभाग्य का प्रवेश हो और दुर्भाग्य का नाश हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपकी फैमिली इस साल हर छोटी-बड़ी खुशी का जश्न मनाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके परिवार के बीच का अपनापन और भी मजबूत हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके घर का हर कमरा खुशी, शांति और प्रेम से भर जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके परिवार में इस साल सिर्फ अच्छे समाचार आए—हर दिशा से, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "ईश्वर करे इस साल आपका परिवार और भी अधिक खुश, स्वस्थ और सुरक्षित रहे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉"
    ],
    funny: [
      // ===== 50 NEW Hindi Funny Wishes =====

      "इस साल तुम्हारी टेंशन कम और खाना ज़्यादा हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "दुआ है कि इस साल तुम्हारा फ़ोन कभी 1% बैटरी पर न आए—जैसे तुम्हारा मूड, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस नए साल में तुम्हारा अलार्म भी तुम्हारी तरह मेहनती हो जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारी डाइट इस साल कम टूटे—या फिर बिल्कुल न शुरू हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "दुआ है कि इस साल तुम्हारी नींद किसी भी मीटिंग से ज़्यादा मज़बूत रहे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारी लाइफ़ का बफ़रिंग खत्म हो जाए और सिर्फ मज़े ही मज़े आएँ, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल तुम्हारी क्रश तुम्हें सिर्फ 'सीन' न करे—कभी-कभी रिप्लाई भी दे दे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "भगवान करे इस साल तुम्हारा बैंक बैलेंस भी तुम्हारे सपनों जैसा बड़ा हो जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारी किस्मत Wi-Fi की तरह हो—कभी न टूटने वाली, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारी लाइफ़ में 'लोडिंग' कम और 'हैप्पीनेस' ज़्यादा हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल तुम्हारे झूठ पकड़े न जाएँ—खासकर घर पर, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारी भूख और नींद दोनों बढ़ती रहें—बिना किसी रुकावट के, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल तुम जितना हँसो उतना कुछ भी बुरा न हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारी सेल्फी स्किल इस साल और भी शानदार हो जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "भगवान करे कि इस साल तुम्हारी इंटरनेट स्पीड तुम्हारी सोच से भी तेज़ हो जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल पकड़ में सिर्फ अच्छे मौके आएँ—ग्रुप प्रोजेक्ट वाले काम नहीं, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारी लाइफ़ में इस साल सिर्फ अच्छी वाइब्स आएँ—और बुरी आदतें जाएँ, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारा फिटनेस प्लान इस साल कम से कम तीन दिन तो चले, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "भगवान करे इस साल तुम्हें बिना पूछे चार्जर मिल जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारा गुस्सा इस साल बैटरी की तरह जल्द ही खत्म हो जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल किसी भी कुर्सी को तुमसे ज़्यादा आराम न मिले, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारी लाइफ में टेंशन की जगह चिप्स और मज़ा आए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल तुम्हारा आलस थोड़ा कम और सफलता थोड़ा ज़्यादा हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "भगवान करे इस साल तुम्हें बिना रीचार्ज के भी पॉजिटिव एनर्जी मिले, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल तुम्हारी लाइफ़ से ड्रामा कम और कोमेडी ज़्यादा हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारी आवाज़ इस साल कम से कम 20% मीठी हो जाए—खासकर गुस्से में, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल तुम्हारी पसंद का खाना हमेशा उपलब्ध रहे—बिना किसी बहाने के, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "भगवान करे तुम्हारी किस्मत इस साल ऑटो-अपडेट होकर सुधर जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल तुम्हारे पास पैसे भी हों और उनको ख़र्च करने के मौके भी, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारे घर का Wi-Fi और दिमाग—दोनों फुल स्पीड से चलें, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल तुम्हारी लाइफ़ का 'एयरप्लेन मोड' बंद रहे—हमसे जुड़े रहो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारी लाइफ में इस साल सिर्फ हैप्पी नोटिफिकेशन आएँ—बिल भरने वाले नहीं, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल तुम्हारी नींद किसी भी टेंशन से ज़्यादा पावरफुल हो जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारी हँसी इस साल किसी फिल्टर के बिना भी सबसे शानदार लगे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल तुम्हें कम काम और ज़्यादा छुट्टियाँ मिलें, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "भगवान करे तुम्हारी क्रश इस साल तुम्हें पहचान तो ले—नाम लेकर, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल तुम्हारी गोल-गोल टेंशन गोल-गोल गोलगप्पों में बदल जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारा दिमाग इस साल सिर्फ सही दिशा में घूमे—जैसे फैन, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारे सारे मुद्दे इस साल ऑटो-करेक्ट की तरह अपने आप ठीक हो जाएँ, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल तुम जितना खाओ उतना वजन न बढ़े—चमत्कार हो जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "तुम्हारा स्ट्रेस इस साल 'स्किप ऐड' की तरह एक सेकंड में गायब हो जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल तुम्हारी लाइफ में सिर्फ मस्ती चले—टेंशन का एंट्री बैन रहे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "भगवान करे इस साल तुम्हें मूड-स्विंग की जगह मूड-बूस्ट मिले, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "नई साल में तुम्हारी लाइफ इतनी खुशहाल हो कि पड़ोसी भी जलने लगें, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल तुम्हारा मोबाइल भी स्लो न चले—और तुम भी नहीं, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल तुम्हें बिना मेहनत के भी थोड़ी बहुत किस्मत मिल जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "साल भर तुम्हारे चेहरे पर वही स्माइल रहे—जो सेल्फी में रहती है, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल तुम्हारी लाइफ में 'रीबूट' की ज़रूरत न पड़े—सब स्मूद चले, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉"
    ],
    emotional: [
      "यह नया साल आपके जीवन में उम्मीदों की नई किरण लेकर आए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "जो सपने अब तक अधूरे थे, वे इस साल पूरे होने की राह पकड़ें, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके दिल में छुपा हर दर्द इस साल ख़ुशी में बदल जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "ईश्वर करे इस साल आपकी ज़िंदगी में शांति और सुकून का वास हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके चेहरे की मुस्कान कभी कम न हो—हर दिन एक नई शुरुआत बने, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "नई उम्मीदें, नया आत्मविश्वास और नई रोशनी आपके साथ रहे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "पुराने दुखों का अंत और नई खुशियों की बरसात हो इस साल, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके दिल की हर टुटन इस साल जुड़कर नई ताकत बने, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल आपकी मेहनत का हर फल आपको मनचाहा परिणाम दे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके जीवन में प्यार, शांति और सम्मान का फूल खिले, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपकी ज़िंदगी में वह सब आए जिसकी आप दिल से दुआ करते हैं, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "कठिनाइयाँ मिलें तो साहस मिले, और खुशियाँ मिलें तो दिल में अपनापन, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "हर नया दिन आपके लिए नई आशा लेकर आए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपका मन इस साल सारी नकारात्मकता छोड़कर नई ऊर्जा पाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके रिश्तों में और गहराई, और प्यार और अपनापन आए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "ईश्वर करे इस साल आपका आत्मविश्वास आपको नई ऊंचाइयों तक ले जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "बीते हुए साल के घाव मिट जाएं और नई शुरुआत में हौसला मिले, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपकी हर इच्छा, हर सपना और हर उम्मीद इस साल साकार हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "जो बातें दिल में बोझ बनकर थीं, इस साल हल्की होकर हवाओं में उड़ जाएँ, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपकी मेहनत का असर हर कदम पर साफ दिखाई दे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपको इस साल अपने लिए वक्त मिले—अपने मन की सुनने का वक्त, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपकी ज़िंदगी की हर टूटन एक मजबूत नींव बनकर उभरे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके आसपास हमेशा सच्चे और प्यारे लोग रहें, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "यह साल आपके दिल के हर अंधेरे को उजाले से भर दे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपकी जिंदगी का हर मोड़ आपको नई खुशियों की ओर ले जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके अंदर की रोशनी हर मुश्किल को मात देने की ताकत दे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपकी आंखों में इस साल सिर्फ खुशी के आँसू आएं, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपका हर दिन मन की शांति और दिल की खुशी से भरपूर हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आप जिस चीज़ के लिए तरस रहे हैं—वो इस साल आपकी दहलीज़ पर खड़ी मिले, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल आपको अपने सपनों पर यकीन और भी गहरा मिले, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "मुश्किल रास्तों पर भी उम्मीद की किरण आपकी राह रोशन करे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके दिल को इस साल वह शांति मिले जिसका आप लंबे समय से इंतज़ार कर रहे थे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "यह साल आपके रिश्तों में मिठास और दिल में अपनापन बढ़ाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपकी हर कठिनाई इस साल आपका अनुभव बन जाए—और अनुभव आपकी ताकत, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपको हर कदम पर सही दिशा और सही लोग मिलते रहें, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके भीतर की उदासी इस साल पूरी तरह मिट जाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपकी जिंदगी में ऐसे पल आए जो जीवन भर याद बन जाएँ, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "ईश्वर करे आपकी आत्मा इस साल और भी ज्यादा शांत और प्रसन्न रहे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके पास वो लोग आएं जो दिल से आपका भला चाहते हैं, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपकी हर यात्रा सुरक्षित और सफल हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके सपनों को उड़ान देने वाली हवा इस साल और भी तेज़ चले, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके दिल के ज़ख्म इस साल भर जाएं और नए सपने खिलें, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल आपको अपने भीतर छुपी खूबियों का एहसास हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "ईश्वर करे आप हर मोड़ पर सही निर्णय ले सकें और सही राह चुन सकें, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपकी ज़िंदगी से दुख और निराशा की परछाईं भी दूर रहे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपकी ज़िंदगी में वो लोग आएं जो आपको समझें, सराहें और खुश रखें, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपको वह खुशी मिले जिसकी आपने दिल से दुआ की है, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपका मन इस साल हर परिस्थिति में सकारात्मक बने रहे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपकी ज़िंदगी में प्यार, शांति और सम्मान का नया अध्याय शुरू हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉"
    ],
    professional: [
      "यह नया साल आपके करियर में नई ऊँचाइयों का रास्ता खोले, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपकी मेहनत इस साल हर मुश्किल को मात देकर सफलता में बदले, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "ईश्वर करे इस साल आपको वह अवसर मिलें जिनके आप लंबे समय से इंतजार कर रहे थे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपका कार्यक्षेत्र इस साल और अधिक स्थिर, खुशहाल और सफल हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके हर फैसले में बुद्धि और हर प्रयास में साहस बना रहे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपकी मेहनत का उचित सम्मान और पहचान आपको इस साल अवश्य मिले, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "काम के प्रति आपका समर्पण आपको नई उपलब्धियों तक पहुँचाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल आपके हर प्रोजेक्ट में सफलता और हर चुनौती में समाधान मिले, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके करियर में उन्नति की नई सीढ़ियाँ खुलें—एक के बाद एक, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपका परिश्रम इस साल आर्थिक रूप से भी बड़ा फल दे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "ईश्वर करे ऑफिस में आपका सम्मान और प्रभाव दोनों बढ़ें, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपकी प्रोफेशनल स्किल्स इस साल नए स्तर तक पहुँचे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "हर दिन आपको नए विचार, नई ऊर्जा और नई प्रेरणा मिले, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके कार्यक्षेत्र में आपकी क्षमताएँ सभी को प्रभावित करें, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "जिस लक्ष्य के लिए आप प्रयासरत हैं—इस साल वह आपकी वास्तविकता बने, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपकी करियर ग्रोथ का ग्राफ इस साल लगातार ऊपर की ओर रहे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके हर प्रयास में सफलता और हर चुनौती में धैर्य मिले, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आप काम और जीवन के बीच सही संतुलन बना पाएँ, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपकी नेतृत्व क्षमता इस साल और अधिक मजबूत और प्रभावी हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "किसी भी कठिन परिस्थिति में आपका मन स्थिर और निर्णय स्पष्ट रहे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपकी प्रोफेशनल जर्नी इस साल नई उपलब्धियों और नए अनुभवों से समृद्ध हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपकी योग्यता इस साल सही समय पर सही अवसर से मिले, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपकी मेहनत और इमानदारी का प्रभाव आपके पूरे करियर में दिखाई दे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "ऑफिस का तनाव कम और उपलब्धियाँ अधिक हों इस साल, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपका काम इस साल दूसरों के लिए प्रेरणा बने, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपको हर दिशा में प्रगति मिले—जॉब, बिज़नेस और जीवन में भी, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके प्रयास आपको वह सफलता दिलाएँ जिसका आप सपना देखते आए हैं, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके करियर में स्थिरता और विकास दोनों साथ-साथ रहें, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके विचारों में नई रचनात्मकता और निर्णयों में नई स्पष्टता आए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपका कार्य इस साल पहचान और सम्मान दोनों कमाए, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "जो मौके आप मिस कर चुके थे—इस साल वे बेहतर रूप में वापस आएँ, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपको अपने काम में नई दिशा, नए लोग और नया आत्मविश्वास मिले, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके प्रयासों को इस साल सही गाइडेंस और सही मार्गदर्शक मिले, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपका प्रमोशन और प्रगति इस साल निश्चित हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपकी इनकम में तेजी से और स्थिर वृद्धि हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके कार्य में आपकी लगन दूसरों को भी प्रेरित करे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "इस साल आपके काम में कोई बाधा न आए—सिर्फ अवसर बढ़ते जाएँ, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपका ऑफिस वातावरण सकारात्मक और सहयोगपूर्ण बना रहे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आप हर कठिन परिस्थिति का समाधान बुद्धिमानी से ढूँढ पाएं, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपकी जिम्मेदारियाँ इस साल सम्मान और पुरस्कार में बदलें, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आप जिस लक्ष्य का पीछा कर रहे हैं—उसके और करीब पहुँचें, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपकी मेहनत आपको ऐसी पहचान दिलाए जिस पर गर्व हो, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके सपनों को उड़ान देने वाले लोग और अवसर इस साल आपकी ओर बढ़कर आएँ, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपका करियर इस साल ठहराव नहीं बल्कि निरंतर प्रगति देखे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके फैसले इस साल आपको सफलता और संतोष दोनों दें, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपके प्रयासों में ईमानदारी और आपके परिणामों में उत्कृष्टता बनी रहे, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपको इस साल अपने करियर में वह पहचान मिले जिसके आप हकदार हैं, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉",
      "आपकी प्रोफेशनल लाइफ इस साल पहले से अधिक स्थिर, सफल और संतोषपूर्ण बने, {{receiver}} — {{sender}}\n🎉 नया साल 2026 मुबारक हो! 🎉"
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

  // SHOW full screen loader
  showFullLoader("Preparing…");

  // Step delays for animation look
  await new Promise(res => setTimeout(res, 700));


  try {
    let imgResult = null;

    // Upload Image
    if (file) {
      showFullLoader("Uploading…");

      imgResult = await uploadImageToCloudinary(file);
    }

    // Geo
    showFullLoader("Saving…");

    const geo = await getGeoInfo();
    showFullLoader("Done…");
    await new Promise(res => setTimeout(res, 600));

    // Hide loader and show popup
    hideFullLoader();
    successPopup.style.display = "flex";

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
    // Build Popup Wish List Buttons (ChatGPT-style animation)
    startThinking();
    stopThinking();

    popupWishList.innerHTML = "";

    selected.forEach((wishText, index) => {
      const btn = document.createElement("button");
      btn.className = "btn ai-wish";
      btn.style = "width:100%; margin-bottom:10px; text-align:left; white-space:normal;";
      btn.innerHTML = `<strong>Wish ${index + 1}:</strong><br>${wishText}`;

      // Select Wish
      btn.addEventListener("click", () => {
        document.getElementById("wishPopupInner").classList.remove("ai-popup-show");
        setTimeout(() => {
          wishPopup.style.display = "none";
        }, 200);

        animateAIGeneration(wishText);
      });

      popupWishList.appendChild(btn);

      // ChatGPT-style staggered reveal
      setTimeout(() => {
        btn.classList.add("ai-wish-show");
      }, 200 * (index + 1));
    });

    // POPUP SHOW FIX
    wishPopup.style.display = "flex";
    setTimeout(() => {
      document.getElementById("wishPopupInner").classList.add("ai-popup-show");
    }, 10);

  });
}

// Close Popup
if (closePopup) {
  closePopup.addEventListener("click", () => {
    document.getElementById("wishPopupInner").classList.remove("ai-popup-show");
    setTimeout(() => {
      wishPopup.style.display = "none";
    }, 200);
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

// Ripple Click Effect for Main Button
document.addEventListener("DOMContentLoaded", () => {
  const mainBtn = document.getElementById("generateBtn");

  mainBtn.addEventListener("click", function (e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement("span");

    ripple.classList.add("ripple");
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});
