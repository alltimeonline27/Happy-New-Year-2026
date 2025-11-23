// === Firebase Config (same as create.js) ===
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// DOM
const headline = document.getElementById("headline");
const senderLine = document.getElementById("senderLine");
const revealBlock = document.getElementById("revealBlock");
const receiverNameTitle = document.getElementById("receiverNameTitle");
const wishText = document.getElementById("wishText");
const photoCircle = document.getElementById("photoCircle");
const photoImg = document.getElementById("friendPhotoDisplay");
const photoFallback = document.getElementById("photoFallback");
const balloonArea = document.getElementById("balloonArea");
const giftBox = document.getElementById("giftBox");
const giftTextEl = document.getElementById("giftText");
const afterGiftActions = document.getElementById("afterGiftActions");
const shareForwardBtn = document.getElementById("shareForwardBtn");
const bgMusic = document.getElementById("bgMusic");
const celebrateCanvas = document.getElementById("celebrateCanvas");
const loader = document.getElementById("loader");
const countdownOverlay = document.getElementById("countdownOverlay");
const langSelect = document.getElementById("langSelect");

let celebrationDocId = null;
let senderName = "";
let receiverName = "";
let loadedData = null;

// === MULTILINGUAL STRINGS ===
const LANG = {
    en: {
        title: "Happy New Year 2026!",
        brand: "Happy New Year 2026",
        giftFrom: (s) => `${s} sent you a Happy New Year 2026 gift! 🎁`,
        defaultWish:
            "Wishing you a year full of joy, success and beautiful moments.\nHappy New Year 2026!",
        openGift: "Open Your Gift",
        sendGiftBtn: "🎁 Send a Gift to Your Friend"
    },
    hi: {
        title: "नया साल 2026 मुबारक हो!",
        brand: "नया साल 2026",
        giftFrom: (s) => `${s} ने आपके लिए नया साल 2026 का तोहफ़ा भेजा है! 🎁`,
        defaultWish:
            "आपके जीवन में खुशियाँ, सफलता और ढेर सारे नए मौके आएं।\nनया साल 2026 मुबारक हो!",
        openGift: "अपना गिफ्ट खोलें",
        sendGiftBtn: "🎁 अपने दोस्त को गिफ्ट भेजें"
    },
    bn: {
        title: "শুভ নববর্ষ ২০২৬!",
        brand: "শুভ নববর্ষ ২০২৬",
        giftFrom: (s) => `${s} আপনার জন্য নববর্ষ ২০২৬ এর উপহার পাঠিয়েছে! 🎁`,
        defaultWish:
            "তোমার জীবন ভরে উঠুক আনন্দ, সাফল্য আর সুন্দর মুহূর্তে।\nশুভ নববর্ষ ২০২৬!",
        openGift: "তোমার গিফট খুলে দেখো",
        sendGiftBtn: "🎁 তোমার বন্ধুকে গিফট পাঠাও"
    }
};

let currentLang = localStorage.getItem("ny2026_lang") || "en";
if (!LANG[currentLang]) currentLang = "en";
langSelect.value = currentLang;

// Utility
function getStrings() {
    return LANG[currentLang] || LANG.en;
}

function setLanguage(langCode) {
    if (!LANG[langCode]) return;
    currentLang = langCode;
    localStorage.setItem("ny2026_lang", langCode);
    langSelect.value = langCode;
    renderTexts();
}

langSelect.addEventListener("change", (e) => {
    setLanguage(e.target.value);
});

// === MUSIC AUTOPLAY HANDLER ===
function enableMusic() {
    if (!bgMusic) return;
    bgMusic.volume = 0.7;
    bgMusic.play().catch(() => {
        console.log("Autoplay blocked, waiting for user interaction.");
    });
}

// ensure music tries at load & on first click
document.addEventListener("click", enableMusic, { once: true });

// === LOAD CELEBRATION DATA ===
function getParams() {
    const p = new URLSearchParams(window.location.search);
    return { id: p.get("id") };
}

async function loadCelebration() {
    const { id } = getParams();
    if (!id) {
        senderLine.textContent = "This gift link is invalid.";
        hideLoader();
        return;
    }
    celebrationDocId = id;

    try {
        const snap = await db.collection("celebrations").doc(id).get();
        if (!snap.exists) {
            senderLine.textContent = "This gift link is invalid or expired.";
            hideLoader();
            return;
        }
        const data = snap.data();
        senderName = data.senderName || "Someone";
        receiverName = data.receiverName || "You";

        loadedData = data;
        setupPhoto(data);
        renderTexts();

        createBalloons();
        startBackgroundEffects();
        animateIntro();
        enableMusic();
        hideLoader();

        // log view event
        await db.collection("events").add({
            type: "view",
            celebrationId: id,
            senderName,
            receiverName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (err) {
        console.error("Error loading celebration:", err);
        senderLine.textContent = "Error loading your gift.";
        hideLoader();
    }
}

function setupPhoto(data) {
    if (data.photoUrl) {
        photoImg.src = data.photoUrl;
        photoImg.style.display = "block";
        photoFallback.style.display = "none";
    } else {
        photoImg.style.display = "none";
        photoFallback.style.display = "flex";
    }
}

// Render all texts according to selected language + data
function renderTexts() {
    const L = getStrings();
    // brand in header
    const brandEl = document.querySelector(".logo-text");
    if (brandEl) brandEl.textContent = L.brand;

    if (!loadedData) {
        // initial state while loading
        headline.textContent = L.title;
        senderLine.textContent = "";
        giftTextEl.textContent = L.openGift;
        shareForwardBtn.textContent = L.sendGiftBtn;
        return;
    }

    headline.textContent = L.title;
    senderLine.textContent = L.giftFrom(senderName);
    receiverNameTitle.textContent = receiverName;
    giftTextEl.textContent = L.openGift;
    shareForwardBtn.textContent = L.sendGiftBtn;

    if (loadedData.customMessage) {
        wishText.textContent = `${loadedData.customMessage}\n— ${senderName}`;
    } else {
        wishText.textContent = `${L.defaultWish}\n— ${senderName}`;
    }
}

function hideLoader() {
    if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 400);
    }
}

// === BALLOONS ===
function createBalloons() {
    balloonArea.innerHTML = "";
    const count = 18;
    for (let i = 0; i < count; i++) {
        const balloon = document.createElement("div");
        balloon.classList.add("balloon");
        const left = Math.random() * 90;
        balloon.style.left = left + "%";
        balloon.style.animationDelay = (Math.random() * 4).toFixed(2) + "s";
        balloonArea.appendChild(balloon);
    }
}

// === INTRO ANIMATIONS ===
function animateIntro() {
    gsap.from(headline, { duration: 1, y: -30, opacity: 0, ease: "back.out(1.7)" });
    gsap.from(senderLine, { duration: 1, y: 20, opacity: 0, delay: 0.3, ease: "power3.out" });

    gsap.to(headline, { y: -6, repeat: -1, yoyo: true, duration: 2, ease: "sine.inOut" });
    gsap.to(senderLine, { y: 4, repeat: -1, yoyo: true, duration: 2.4, ease: "sine.inOut" });

    gsap.to(giftBox, {
        y: -5,
        rotation: 1,
        repeat: -1,
        yoyo: true,
        duration: 1.4,
        ease: "sine.inOut"
    });
}

// === ADVANCED FIREWORKS + PARTICLES ===
function startBackgroundEffects() {
    if (!celebrateCanvas) return;
    const ctx = celebrateCanvas.getContext("2d");

    function resize() {
        celebrateCanvas.width = window.innerWidth;
        celebrateCanvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    const particles = [];

    function spawnBurst() {
        const w = celebrateCanvas.width;
        const h = celebrateCanvas.height;
        const x = Math.random() * w * 0.8 + w * 0.1;
        const y = Math.random() * h * 0.4 + h * 0.1;
        const baseHue = Math.random() * 360;

        for (let i = 0; i < 90; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 4 + 2;
            particles.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                radius: Math.random() * 2 + 1,
                color: `hsl(${baseHue + Math.random() * 40}, 90%, 60%)`
            });
        }
    }

    // extra comet-type fireworks
    function spawnComet() {
        const w = celebrateCanvas.width;
        const startX = Math.random() * w;
        const startY = celebrateCanvas.height;
        const targetX = Math.random() * w * 0.8 + w * 0.1;
        const targetY = Math.random() * celebrateCanvas.height * 0.4 + 80;
        const steps = 40;
        for (let i = 0; i < steps; i++) {
            const t = i / steps;
            const x = startX + (targetX - startX) * t;
            const y = startY + (targetY - startY) * t;
            particles.push({
                x,
                y,
                vx: 0,
                vy: -0.5,
                life: 0.5,
                radius: 1.5,
                color: "rgba(255,255,255,0.9)"
            });
        }
    }

    function loop() {
        ctx.clearRect(0, 0, celebrateCanvas.width, celebrateCanvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.03;
            p.life -= 0.012;
            if (p.life <= 0) {
                particles.splice(i, 1);
                continue;
            }
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        requestAnimationFrame(loop);
    }
    loop();
    setInterval(spawnBurst, 1100);
    setInterval(spawnComet, 3000);

    // continuous confetti
    particlesJS("particles-js", {
        particles: {
            number: { value: 90 },
            color: { value: ["#ffb347", "#ff7a18", "#ff4b74", "#8be9fd", "#f1fa8c"] },
            shape: { type: "circle" },
            opacity: { value: 0.8 },
            size: { value: 3, random: true },
            move: { enable: true, speed: 2, direction: "bottom", out_mode: "out" },
            line_linked: { enable: false }
        },
        interactivity: { events: { onhover: { enable: false }, onclick: { enable: false } } },
        retina_detect: true
    });
}

// === COUNTDOWN BEFORE GIFT REVEAL ===
function runCountdown() {
    return new Promise((resolve) => {
        let n = 3;
        countdownOverlay.style.display = "flex";
        countdownOverlay.textContent = n;

        const timer = setInterval(() => {
            n--;
            if (n > 0) {
                countdownOverlay.textContent = n;
            } else if (n === 0) {
                countdownOverlay.textContent = "🎉";
            } else {
                clearInterval(timer);
                countdownOverlay.style.display = "none";
                resolve();
            }
        }, 700);
    });
}

// === GIFT REVEAL ANIMATION (Option D + Countdown) ===
giftBox.addEventListener("click", async () => {
    giftBox.style.pointerEvents = "none";

    // countdown first
    await runCountdown();

    const tl = gsap.timeline();

    tl.to(giftBox, {
        duration: 0.25,
        scale: 1.1,
        rotation: 5,
        ease: "power2.inOut"
    })
        .to(giftBox, {
            duration: 0.35,
            scale: 0.9,
            rotation: -8,
            ease: "power2.inOut",
            yoyo: true,
            repeat: 1
        })
        .add(() => {
            const flash = document.createElement("div");
            flash.style.position = "fixed";
            flash.style.inset = "0";
            flash.style.background =
                "radial-gradient(circle at center, rgba(255,255,255,0.9), transparent 60%)";
            flash.style.zIndex = "30";
            document.body.appendChild(flash);
            gsap.to(flash, {
                duration: 0.5,
                opacity: 0,
                ease: "power3.out",
                onComplete: () => flash.remove()
            });
        })
        .to(
            ".gift-lid",
            {
                duration: 0.5,
                y: -80,
                rotation: -25,
                ease: "power3.out"
            },
            "-=0.2"
        )
        .to(
            ".gift-body",
            {
                duration: 0.3,
                y: 10,
                ease: "power1.inOut"
            },
            "-=0.2"
        )
        .to(
            revealBlock,
            {
                duration: 0.7,
                opacity: 1,
                y: -10,
                ease: "back.out(1.4)",
                onStart: () => {
                    revealBlock.style.pointerEvents = "auto";
                }
            },
            "-=0.1"
        )
        .from(
            photoCircle,
            {
                duration: 0.7,
                scale: 0,
                rotation: 30,
                ease: "elastic.out(1, 0.7)"
            },
            "-=0.4"
        )
        .from(
            receiverNameTitle,
            {
                duration: 0.6,
                scale: 0.8,
                opacity: 0,
                y: 20,
                ease: "back.out(1.6)"
            },
            "-=0.35"
        )
        .from(
            wishText,
            {
                duration: 0.7,
                opacity: 0,
                y: 25,
                ease: "power3.out"
            },
            "-=0.3"
        )
        .to(afterGiftActions, {
            duration: 0.5,
            opacity: 1,
            y: -4,
            ease: "power2.out",
            onStart: () => {
                afterGiftActions.style.pointerEvents = "auto";
            }
        });

    // Extra confetti burst
    particlesJS("particles-js", {
        particles: {
            number: { value: 160 },
            color: { value: ["#ffb347", "#ff7a18", "#ff4b74", "#8be9fd", "#f1fa8c"] },
            shape: { type: "circle" },
            opacity: { value: 0.95 },
            size: { value: 4, random: true },
            move: { enable: true, speed: 3, direction: "bottom", out_mode: "out" },
            line_linked: { enable: false }
        },
        interactivity: { events: { onhover: { enable: false }, onclick: { enable: false } } },
        retina_detect: true
    });

    // log gift open
    if (celebrationDocId) {
        await db.collection("events").add({
            type: "gift_open",
            celebrationId: celebrationDocId,
            senderName,
            receiverName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
});

// Share forward: receiver becomes next sender
shareForwardBtn.addEventListener("click", () => {
    const currentPath = window.location.pathname;
    const basePath = currentPath.replace(/celebrate\.html.*$/i, "");
    const url = `${window.location.origin}${basePath}create.html?sender=${encodeURIComponent(
        receiverName
    )}`;
    window.location.href = url;
});

// Init
window.addEventListener("DOMContentLoaded", () => {
    // initial text
    renderTexts();
    loadCelebration();
    // try autoplay once on load
    enableMusic();
});
