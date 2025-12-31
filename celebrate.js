// Firebase (Compat)
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

// ===== UNIQUE USER ID FOR REVIEWS =====
if (!localStorage.getItem("ny2026_userId")) {
  localStorage.setItem("ny2026_userId", "user_" + Math.random().toString(36).substring(2));
}
const userId = localStorage.getItem("ny2026_userId");

// Track if PWA already installed
let appInstalled = false;

window.addEventListener("appinstalled", () => {
  console.log("PWA installed!");
  appInstalled = true;

  const installBubble = document.getElementById("installBubble");
  if (installBubble) installBubble.style.display = "none";
});
const shareGiftWrapper = document.getElementById("shareGiftWrapper");
if (shareGiftWrapper) shareGiftWrapper.style.display = "none";

// DOM references
const headline = document.getElementById("headline");
const senderLine = document.getElementById("senderLine");
const revealBlock = document.getElementById("revealBlock");
const receiverNameTitle = document.getElementById("receiverNameTitle");
const wishText = document.getElementById("wishText");
const photoImg = document.getElementById("friendPhotoDisplay");
const photoFallback = document.getElementById("photoFallback");
const balloonArea = document.getElementById("balloonArea");
const giftBox = document.getElementById("giftBox");
const afterGiftActions = document.getElementById("afterGiftActions");
const shareForwardBtn = document.getElementById("shareForwardBtn");
const bgMusic = document.getElementById("bgMusic");
const celebrateCanvas = document.getElementById("celebrateCanvas");
const loaderOverlay = document.getElementById("loader");
const countdownOverlay = document.getElementById("countdownOverlay");

let senderName = "";
let receiverName = "";

// Show floating buttons after delay
function showFloatingButtons() {
  const installBubble = document.getElementById("installBubble");
  const createGiftWrapper = document.getElementById("createGiftWrapper");
  const shareGiftWrapper = document.getElementById("shareGiftWrapper");

  if (createGiftWrapper) createGiftWrapper.style.display = "block";

  if (shareGiftWrapper) {
    shareGiftWrapper.style.display = "flex";
    shareGiftWrapper.classList.add("show");
  }

  if (!appInstalled && deferredPrompt && installBubble) {
    installBubble.style.display = "flex";
  }
}




// Loader helpers
function hideLoader() {
  if (!loaderOverlay) return;
  loaderOverlay.style.opacity = "0";
  setTimeout(() => {
    loaderOverlay.style.display = "none";
  }, 400);
}

function showLoaderMessage(msg) {
  if (!loaderOverlay) return;
  const textEl = loaderOverlay.querySelector(".loader-text");
  if (textEl) textEl.textContent = msg;
}

// Add retry behaviour to loader overlay (useful on error)
if (loaderOverlay) {
  loaderOverlay.addEventListener('click', () => window.location.reload());
}

// Music
function tryPlayMusic() {

  bgMusic.volume = 0;
  bgMusic.play().then(() => {
    let v = 0;
    const fade = setInterval(() => {
      v += 0.05;
      bgMusic.volume = v;
      if (v >= 0.8) clearInterval(fade);
    }, 120);
  });

}

function setSelectedMusic(type) {
  if (!bgMusic) return;

  let file = "assets/newyear2026.mp3";

  if (type === "happy") file = "assets/happy.mp3";
  if (type === "romantic") file = "assets/romantic.mp3";
  if (type === "party") file = "assets/party.mp3";
  if (type === "none") file = "";

  bgMusic.src = file;
}

// Add a global click listener just in case
document.addEventListener("click", () => {
  if (bgMusic && bgMusic.paused) tryPlayMusic();
}, { once: true });

// URL params
function getGiftIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Background fireworks
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

    for (let i = 0; i < 80; i++) {
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

  function loop() {
    ctx.clearRect(0, 0, celebrateCanvas.width, celebrateCanvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.03;
      p.life -= 0.015;
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
  // slower interval to help low-end devices
  setInterval(spawnBurst, 1600);
}

// Balloons
function createBalloons() {
  if (!balloonArea) return;
  balloonArea.innerHTML = "";
  const count = window.innerWidth < 500 ? 10 : 18;
  for (let i = 0; i < count; i++) {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.style.left = Math.random() * 90 + "%";
    balloon.style.animationDelay = (Math.random() * 4).toFixed(2) + "s";
    balloonArea.appendChild(balloon);
  }
}

// Gift data rendering
function applyGiftData(data) {
  senderName = data.senderName || "Someone";
  receiverName = data.receiverName || "You";

  if (headline) headline.textContent = "Happy New Year 2026!";
  if (senderLine)
    senderLine.textContent = `${senderName} sent you a Happy New Year 2026 gift! 🎁`;

  if (data.photoUrl) {
    if (photoImg) {
      photoImg.src = data.photoUrl;
      photoImg.style.display = "block";
    }
    if (photoFallback) {
      photoFallback.style.display = "none";
    }
  } else {
    if (photoImg) photoImg.style.display = "none";
    if (photoFallback) photoFallback.style.display = "flex";
  }

  if (receiverNameTitle) receiverNameTitle.textContent = receiverName;

  const msg =
    data.customMessage && data.customMessage.trim() !== ""
      ? `${data.customMessage}\n\n— ${senderName}`
      : `May this year heal your worries, strengthen your heart, and bring you the peace and happiness you truly deserve. \nWishing you new beginnings filled with hope, love, and growth.\nHappy New Year 2026!\n\n— ${senderName}`;

  if (wishText) wishText.textContent = msg;
}

// Countdown
function runCountdown() {
  return new Promise((resolve) => {
    if (!countdownOverlay) {
      resolve();
      return;
    }
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
    }, 800);
  });
}

// Gift click handler
async function handleGiftOpen() {
  if (!giftBox) return;
  tryPlayMusic();
  giftBox.classList.add("open");

  // Hide tap hint + arrow once gift is opened
  document.body.classList.add("gift-opened");

  const tapText = document.getElementById("tapToOpen");
  const tapArrow = document.querySelector(".tap-arrow");

  if (tapText) {
    tapText.style.opacity = "0";
    tapText.style.transform = "translateY(10px)";
    tapText.style.pointerEvents = "none";
  }

  if (tapArrow) {
    tapArrow.style.opacity = "0";
    tapArrow.style.transform = "translateY(10px)";
    tapArrow.style.pointerEvents = "none";
  }

  giftBox.style.pointerEvents = "none";
  giftBox.classList.remove("fade-scale", "fade-in", "slide-up");

  setTimeout(() => { giftBox.style.opacity = "0"; }, 500);
  await runCountdown();

  revealBlock.style.opacity = "1";
  revealBlock.style.transform = "translateY(0)";
  revealBlock.style.pointerEvents = "auto";

  afterGiftActions.style.opacity = "1";
  startFireworksV2();

  afterGiftActions.style.pointerEvents = "auto";

  // 🚀 =========== NEW CODE ==========  
  // Hide floating buttons at first
  const installBubble = document.getElementById("installBubble");
  const createGiftWrapper = document.getElementById("createGiftWrapper");
  const shareGiftWrapper = document.getElementById("shareGiftWrapper");

  if (installBubble) installBubble.style.display = "none";
  if (createGiftWrapper) createGiftWrapper.style.display = "none";
  if (shareGiftWrapper) shareGiftWrapper.style.display = "none";

  // Show after 10 seconds
  setTimeout(showFloatingButtons, 10000);

}

// Load celebration
async function loadCelebration() {
  const giftId = getGiftIdFromUrl();
  if (!giftId) {
    showLoaderMessage("This gift link is invalid.");
    hideLoader();
    return;
  }

  try {
    const docRef = db.collection("celebrations").doc(giftId);
    const snap = await docRef.get();

    if (!snap.exists) {
      showLoaderMessage("This gift link is invalid or expired.");
      hideLoader();
      return;
    }

    const data = snap.data();
    applyGiftData(data);
    // set celebrationId, enable review submission and load reviews
    celebrationId = getGiftIdFromUrl();

    // enable submit button (guard: element may exist)
    if (submitReviewBtn) submitReviewBtn.disabled = false;

    // load reviews now that we have a valid id
    loadReviews();

    // Like / Dislike Handler
    document.addEventListener("click", async (e) => {
      const id = celebrationId || getGiftIdFromUrl();
      if (!id) return;

      // LIKE
      if (e.target.classList.contains("like-btn")) {
        const reviewId = e.target.dataset.review;

        const reviewRef = db.collection("celebrations")
          .doc(id)
          .collection("reviews")
          .doc(reviewId);

        await db.runTransaction(async (t) => {
          const snap = await t.get(reviewRef);
          if (!snap.exists) return;

          const d = snap.data();

          let newLikes = d.likes || 0;
          let newDislikes = d.dislikes || 0;

          // If user already liked → remove like
          if (d.userReaction === userId && d.lastReaction === "like") {
            newLikes -= 1;
            t.update(reviewRef, {
              likes: newLikes,
              userReaction: null,
              lastReaction: null
            });
            return;
          }

          // If user disliked before → remove dislike
          if (d.lastReaction === "dislike") newDislikes -= 1;

          t.update(reviewRef, {
            likes: newLikes + 1,
            dislikes: newDislikes,
            userReaction: userId,
            lastReaction: "like"
          });
        });

        loadReviews();
      }

      // DISLIKE
      if (e.target.classList.contains("dislike-btn")) {
        const reviewId = e.target.dataset.review;

        const reviewRef = db.collection("celebrations")
          .doc(id)
          .collection("reviews")
          .doc(reviewId);

        await db.runTransaction(async (t) => {
          const snap = await t.get(reviewRef);
          if (!snap.exists) return;

          const d = snap.data();

          let newLikes = d.likes || 0;
          let newDislikes = d.dislikes || 0;

          // If user already disliked → remove dislike
          if (d.userReaction === userId && d.lastReaction === "dislike") {
            newDislikes -= 1;
            t.update(reviewRef, {
              dislikes: newDislikes,
              userReaction: null,
              lastReaction: null
            });
            return;
          }

          // If user liked before → revert like
          if (d.lastReaction === "like") newLikes -= 1;

          t.update(reviewRef, {
            likes: newLikes,
            dislikes: newDislikes + 1,
            userReaction: userId,
            lastReaction: "dislike"
          });
        });

        loadReviews();
      }
    });



    loadLeaderboard(data.senderName);
    applyTheme(data.template);
    // Set music based on user's choice
    setSelectedMusic(data.music);



    createBalloons();
    startBackgroundEffects();

    // Fire & Forget update
    docRef.update({
      views: firebase.firestore.FieldValue.increment(1),
      lastOpened: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(e => console.log("Stat update failed", e));

    hideLoader();
  } catch (err) {
    console.error("Error loading celebration:", err);
    showLoaderMessage("Error loading your gift. Tap to retry.");
    // loader overlay has click -> reload bound earlier
    hideLoader();
  }
}

// Share-forward button
if (shareForwardBtn) {
  shareForwardBtn.addEventListener("click", () => {
    const baseUrl = window.location.origin + window.location.pathname.replace("celebrate.html", "");
    const cleanBase = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";
    const createUrl = `${cleanBase}create.html?sender=${encodeURIComponent(receiverName || "")}`;
    window.location.href = createUrl;
  });
}

// Gift click
if (giftBox) {
  giftBox.addEventListener("click", handleGiftOpen);
}

// ================= FIREWORKS 2.0 (tsParticles) ================= //
async function startFireworksV2() {
  await tsParticles.load("fireworks-container", {
    fullScreen: { enable: true, zIndex: -1 },
    particles: {
      number: { value: 0 },
    },
    emitters: [
      {
        life: { duration: 0.1, count: 1 },
        rate: { delay: 0.15, quantity: 8 },
        position: { x: 50, y: 100 },
        particles: {
          move: { speed: 25, angle: { min: 0, max: 360 } },
          size: { value: { min: 2, max: 4 } },
          color: { value: ["#ff0049", "#00eaff", "#ffe600", "#00ff6a"] },
        }
      }
    ]
  });
}
// ================= APPLY TEMPLATE THEME ================= //
function applyTheme(theme) {
  const body = document.body;

  body.classList.remove("theme-love", "theme-friendship", "theme-family", "theme-professional", "theme-neon");

  if (!theme || theme === "default") return;

  body.classList.add(`theme-${theme}`);
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
  // Set OG URL dynamically (for correct share previews)
  const ogUrl = document.getElementById("ogUrlTag");
  if (ogUrl) {
    ogUrl.setAttribute("content", window.location.href);
  }

});


// CALL INIT (Very Important — must run AFTER everything)
window.addEventListener("DOMContentLoaded", initTheme);


// Init
window.addEventListener("DOMContentLoaded", () => {
  loadCelebration();
});

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

// ================= SOUND TOGGLE ================= //
let soundOn = true;

const soundToggle = document.getElementById("soundToggle");

if (soundToggle && bgMusic) {
  soundToggle.addEventListener("click", () => {
    soundOn = !soundOn;

    if (soundOn) {
      bgMusic.volume = 0.8;
      bgMusic.play();
      soundToggle.textContent = "🔊 Sound On";
    } else {
      bgMusic.pause();
      soundToggle.textContent = "🔇 Sound Off";
    }
  });
}
/* =========================================
      SIMPLE REACTION SYSTEM (ONLY)
========================================= */

// Reaction document
const reactionDoc = db.collection("reactions").doc("totalReactions");

// Create document if it does not exist
reactionDoc.get().then(doc => {
  if (!doc.exists) {
    reactionDoc.set({
      heart: 0,
      laugh: 0,
      wow: 0,
      party: 0
    });
  }
});

// Handle button clicks
document.querySelectorAll(".react-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.type;
    reactionDoc.update({
      [type]: firebase.firestore.FieldValue.increment(1)
    });
  });
});

// Live update reaction counts
const countsEl = document.getElementById("reaction-counts");
reactionDoc.onSnapshot(doc => {
  const d = doc.data() || {};
  countsEl.innerHTML = `
    ❤️ ${d.heart || 0} &nbsp;&nbsp;
    😂 ${d.laugh || 0} &nbsp;&nbsp;
    😮 ${d.wow || 0} &nbsp;&nbsp;
    🎉 ${d.party || 0}
  `;
});
// ========== RATING + REVIEW SYSTEM ==========
const ratingStars = document.getElementById("ratingStars");
const reviewTextInput = document.getElementById("reviewText");
const submitReviewBtn = document.getElementById("submitReviewBtn");
const deleteReviewBtn = document.getElementById("deleteReviewBtn");
const allReviewsBox = document.getElementById("allReviews");
const avgRatingEl = document.getElementById("avgRating");
// disable submit until celebrationId is known
if (submitReviewBtn) submitReviewBtn.disabled = true;


// const userId = localStorage.getItem("creatorId") || "guest_user";
let selectedStars = 0;
let celebrationId = null;  // <-- ADD THIS

// let celebrationId = getGiftIdFromUrl();

// Highlight stars on hover/click
// NEW FIXED STAR CLICK LOGIC
ratingStars.addEventListener("click", (e) => {
  if (!e.target.classList.contains("star")) return;

  selectedStars = parseInt(e.target.dataset.value);

  const stars = ratingStars.querySelectorAll(".star");
  stars.forEach((star, i) => {
    star.textContent = i < selectedStars ? "★" : "☆";
  });
});


// Robust Submit Review handler (use URL fallback)
if (submitReviewBtn) {
  submitReviewBtn.addEventListener("click", async () => {
    // determine the id: prefer global, fallback to URL param
    const id = celebrationId || getGiftIdFromUrl();
    if (!id) {
      alert("Gift ID not found. Please open this gift via a valid link.");
      return;
    }

    if (!selectedStars) {
      alert("Please select a rating.");
      return;
    }

    const text = reviewTextInput.value.trim();

    try {
      await db.collection("celebrations")
        .doc(id)
        .collection("reviews")
        .doc(userId)
        .set({
          rating: selectedStars,
          reviewText: text,
          reviewerName: receiverName || "Anonymous",
          reviewerId: userId,
          likes: 0,
          dislikes: 0,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });


      alert("Review submitted.");
      // refresh reviews (use the id we used)
      loadReviews();
    } catch (err) {
      console.error("Submit review failed:", err);
      alert("Failed to submit review. Check console.");
    }
  });
}


// Robust Delete Review handler
if (deleteReviewBtn) {
  deleteReviewBtn.addEventListener("click", async () => {
    const id = celebrationId || getGiftIdFromUrl();
    if (!id) {
      alert("Gift ID not found. Please open this gift via a valid link.");
      return;
    }

    try {
      await db.collection("celebrations")
        .doc(id)
        .collection("reviews")
        .doc(userId)
        .delete();

      alert("Review deleted.");
      selectedStars = 0;
      // reset stars visually
      const stars = ratingStars.querySelectorAll(".star");
      if (stars) stars.forEach(s => (s.textContent = "☆"));
      if (ratingStars) ratingStars.style.pointerEvents = "auto";
      if (reviewTextInput) reviewTextInput.value = "";

      loadReviews();
    } catch (err) {
      console.error("Delete review failed:", err);
      alert("Failed to delete review. Check console.");
    }
  });
}
// Load reviews function
async function loadReviews() {
  const giftId = celebrationId || getGiftIdFromUrl();
  if (!giftId) return;

  const snap = await db.collection("celebrations")
    .doc(giftId)
    .collection("reviews")
    .orderBy("createdAt", "desc")
    .get();

  allReviewsBox.innerHTML = "";
  avgRatingEl.textContent = "—";

  if (snap.empty) {
    allReviewsBox.innerHTML = "<p>No reviews yet.</p>";
    return;
  }

  let total = 0;
  let count = 0;

  snap.forEach((doc) => {
    const data = doc.data();

    // COUNT ALL REVIEWS
    total += data.rating;
    count++;

    // BUILD REVIEW CARD
    const card = document.createElement("div");
    card.classList.add("ratingReviewCard");

    card.innerHTML = `
      <strong style="color:#fff; font-size:16px;">${data.reviewerName || "User"}</strong>

      <div style="font-size:18px; color:#f9c851; margin-top:5px;">
        ${"★".repeat(data.rating)}${"☆".repeat(5 - data.rating)}
      </div>

      <p style="margin-top:6px;">${data.reviewText || ""}</p>

      <div style="margin-top:8px;">
        <button class="like-btn" data-review="${doc.id}">👍 ${data.likes || 0}</button>
        <button class="dislike-btn" data-review="${doc.id}">👎 ${data.dislikes || 0}</button>
      </div>

      ${data.adminReply ? `
        <p style="color:#4cd964; margin-top:6px;">
          <strong>Admin Reply:</strong> ${data.adminReply}
        </p>
      ` : ""}
    `;

    allReviewsBox.appendChild(card);
  });

  // SET AVERAGE RATING
  const avg = (total / count).toFixed(1);
  avgRatingEl.textContent = avg;
}
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // Do NOT show installBubble now 
  // It will be shown ONLY after gift open + 10 sec.
});


document.getElementById("installBubble")?.addEventListener("click", async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  const outcome = await deferredPrompt.userChoice;

  if (outcome.outcome === "accepted") {
    console.log("PWA Installed");
  }

  deferredPrompt = null;
});

document.getElementById("createGiftBubble").onclick = () => {
  window.location.href = "create.html";
};

// =====================
// Floating Share System
// =====================

const shareBubble = document.getElementById("shareGiftBubble");
const shareMenu = document.getElementById("shareMenu");

if (shareBubble) {
  shareBubble.addEventListener("click", () => {
    shareMenu.style.display =
      shareMenu.style.display === "flex" ? "none" : "flex";
  });
}

function getShareUrl() {
  return window.location.href;
}

function getShareText() {
  return "🎁 You got a Happy New Year 2026 gift! Open it here:";
}

document.querySelectorAll("#shareMenu button").forEach(btn => {
  btn.addEventListener("click", () => {
    const platform = btn.dataset.platform;
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(getShareText());

    let shareUrl = "";

    if (platform === "whatsapp") {
      shareUrl = `https://wa.me/?text=${text}%20${url}`;
    }
    if (platform === "telegram") {
      shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
    }
    if (platform === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    }
    if (platform === "instagram") {
      alert("Instagram does not support direct link sharing.\nUse 'More' to copy or system share.");
      return;
    }
    if (platform === "system") {
      if (navigator.share) {
        navigator.share({
          title: "Happy New Year 2026 Gift",
          text: "Someone sent you a special New Year gift!",
          url: window.location.href
        });
        return;
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
        return;
      }
    }

    window.open(shareUrl, "_blank");
  });
});
// =====================
// DOWNLOAD GIFT IMAGE
// =====================
const downloadBtn = document.getElementById("downloadGiftBtn");

if (downloadBtn) {
  downloadBtn.addEventListener("click", async () => {
    const capture = document.getElementById("captureArea");

    if (!capture || revealBlock.style.opacity !== "1") {
      alert("Please open the gift first 🎁");
      return;
    }

    // Smooth UI hide
    downloadBtn.textContent = "📸 Creating…";

    const canvas = await html2canvas(capture, {
      scale: 2,
      useCORS: true,
      backgroundColor: null
    });

    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = `Happy-New-Year-${receiverName || "Gift"}.png`;
    link.click();

    // Show toast
    const toast = document.getElementById("saveToast");
    if (toast) {
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2500);
    }


    // Auto open Share menu after download
    const shareMenu = document.getElementById("shareMenu");
    if (shareMenu) shareMenu.style.display = "flex";


    downloadBtn.textContent = "⬇️";


  });
}
