let isAdmin = false;

// ===== ADMIN SECURITY =====
const ADMIN_PIN = "4052";             // change to any secret number
const ADMIN_PASSWORD = "Ny2026@vip";  // change to any strong password
let pinVerified = false;


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

const adminEmailInput = document.getElementById("adminEmail");
const adminLoginBtn = document.getElementById("adminLoginBtn");
const adminStatus = document.getElementById("adminStatus");
const adminPinInput = document.getElementById("adminPin");
const pinSubmitBtn = document.getElementById("pinSubmitBtn");
const pinStatus = document.getElementById("pinStatus");
const realLogin = document.getElementById("realLogin");
const pinLock = document.getElementById("pinLock");
const adminPassInput = document.getElementById("adminPass");

const adminContent = document.getElementById("adminContent");
const totalCelebrationsEl = document.getElementById("totalCelebrations");
const celebrationsTableBody = document.getElementById("celebrationsTableBody");

const ADMIN_EMAIL = "happynewyear2026@gmail.com";

pinSubmitBtn.addEventListener("click", () => {
  if (adminPinInput.value === ADMIN_PIN) {
    pinVerified = true;
    pinLock.style.display = "none";
    realLogin.style.display = "block";
    pinStatus.textContent = "PIN Verified";
  } else {
    pinStatus.textContent = "Wrong PIN";
  }
});

adminLoginBtn.addEventListener("click", () => {

  if (!pinVerified) {
    adminStatus.textContent = "Enter PIN first";
    return;
  }

  const email = adminEmailInput.value.trim().toLowerCase();
  const pass = adminPassInput.value;

  if (email === ADMIN_EMAIL && pass === ADMIN_PASSWORD) {
    adminStatus.textContent = "Admin Access Granted";

    document.getElementById("adminContent").style.display = "block";
    document.getElementById("adminReviewsSection").style.display = "block";

    isAdmin = true;
    loadAdminData();
    loadAllReviewsAdmin();
  } else {
    adminStatus.textContent = "Invalid Email or Password";
    adminContent.style.display = "none";
  }
});

async function loadAdminData() {
  adminContent.style.display = "block";
  celebrationsTableBody.innerHTML = "";
  totalCelebrationsEl.textContent = "…";

  const snap = await db
    .collection("celebrations")
    .orderBy("createdAt", "desc")
    .limit(50)
    .get();

  totalCelebrationsEl.textContent = snap.size;

  snap.forEach((doc) => {
    const data = doc.data();
    const tr = document.createElement("tr");

    const created =
      data.createdAt && data.createdAt.toDate
        ? data.createdAt.toDate().toLocaleString()
        : "";

    tr.innerHTML = `
      <td>${data.senderName || ""}</td>
      <td>${data.receiverName || ""}</td>
      <td>${created}</td>
      <td>${data.photoUrl ? "Yes" : "No"}</td>
      <td><a href="celebrate.html?id=${encodeURIComponent(doc.id)}" target="_blank">Open</a></td>
      <td><button data-id="${doc.id}" class="btn tiny danger-btn">Delete</button></td>
    `;
    celebrationsTableBody.appendChild(tr);
  });

  // Event delegation for deletes (persistent)
  celebrationsTableBody.addEventListener("click", async (e) => {
    const btn = e.target.closest("button[data-id]");
    if (!btn) return;
    const id = btn.getAttribute("data-id");
    if (!confirm("Delete this celebration record? (Cloudinary image won't be auto-deleted)")) return;
    try {
      await db.collection("celebrations").doc(id).delete();
      btn.closest("tr").remove();
    } catch (err) {
      console.error('Delete failed', err);
      alert('Delete failed. Check console.');
    }
  });
  loadLeaderboard(null);

}


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

// ========== ADMIN REVIEW REPLY ==========
async function openReplyBox(giftId, userId, existingText = "") {
  const reply = prompt("Enter your reply:", existingText);
  if (reply === null) return;

  await db.collection("celebrations")
    .doc(giftId)
    .collection("reviews")
    .doc(userId)
    .update({ adminReply: reply });

  alert("Reply saved!");
  loadAdminData();
}

async function loadAllReviewsForAdmin() {
  const container = document.createElement("section");
  container.classList.add("card");
  container.style.marginTop = "20px";
  container.innerHTML = "<h2>All Reviews</h2>";

  const celebrationsSnap = await db.collection("celebrations").get();

  celebrationsSnap.forEach(async (celeDoc) => {
    const reviewsSnap = await celeDoc.ref.collection("reviews").get();
    if (reviewsSnap.empty) return;

    reviewsSnap.forEach(doc => {
      const d = doc.data();
      const div = document.createElement("div");
      div.style.padding = "10px";
      div.style.border = "1px solid #444";
      div.style.borderRadius = "6px";
      div.style.marginBottom = "10px";

      div.innerHTML = `
        <strong>Gift ID:</strong> ${celeDoc.id}<br>
        <strong>User ID:</strong> ${doc.id}<br>
        <strong>Rating:</strong> ${d.rating} ★<br>
        <strong>Review:</strong> ${d.reviewText || "(empty)"}<br>
        ${d.adminReply ? `<strong style='color:#0f0;'>Admin Reply:</strong> ${d.adminReply}<br>` : ""}
        ${isAdmin ? `
  <button onclick="adminReplyPrompt('${giftId}', '${reviewDoc.id}', '${data.adminReply || ""}')"
    class="btn small" style="margin-top:8px;">
    Reply as Admin
  </button>
` : ``}

        <hr>
      `;
      container.appendChild(div);
    });
  });

  document.querySelector("main").appendChild(container);
}

// Load admin reviews automatically
loadAllReviewsForAdmin();

// =========================
// ADMIN: LOAD ALL REVIEWS
// =========================
async function loadAllReviewsAdmin() {
  const container = document.getElementById("adminReviewsContainer");
  container.innerHTML = "<p>Loading...</p>";

  const reviewsHTML = [];
  const celebrationsSnap = await db.collection("celebrations").get();

  for (const giftDoc of celebrationsSnap.docs) {
    const giftId = giftDoc.id;
    const reviewSnap = await giftDoc.ref.collection("reviews").get();

    reviewSnap.forEach((reviewDoc) => {
      const data = reviewDoc.data();

      reviewsHTML.push(`
        <div style="border:1px solid #444; padding:12px; border-radius:8px; margin-bottom:12px;">
          <strong>Gift ID:</strong> ${giftId}<br>
          <strong>User ID:</strong> ${reviewDoc.id}<br>
          <strong>Rating:</strong> ${data.rating} ★<br>
          <strong>Review:</strong> ${data.reviewText || "(no text)"}<br>

          ${data.adminReply
          ? `<p style="color:#0f0;"><strong>Admin Reply:</strong> ${data.adminReply}</p>`
          : `<p style="color:#aaa;"><em>No admin reply yet</em></p>`
        }

          <button onclick="adminReplyPrompt('${giftId}', '${reviewDoc.id}', '${data.adminReply || ""}')"
            class="btn small" style="margin-top:8px;">
            Reply as Admin
          </button>
        </div>
      `);
    });
  }

  if (reviewsHTML.length === 0) {
    container.innerHTML = "<p>No reviews found.</p>";
  } else {
    container.innerHTML = reviewsHTML.join("");
  }
}

// =========================
// ADMIN REPLY POPUP
// =========================
async function adminReplyPrompt(giftId, userId, existingReply) {
  if (!isAdmin) {
    alert("Access denied. Only admin can reply.");
    return;
  }

  const reply = prompt(
    "Enter your reply:",
    existingReply || ""
  );
  if (reply === null) return;

  await db.collection("celebrations")
    .doc(giftId)
    .collection("reviews")
    .doc(userId)
    .update({
      adminReply: reply
    });

  alert("Reply saved!");
  loadAllReviewsAdmin();
}

// Load reviews automatically on admin page load
loadAllReviewsAdmin();


// Auto-apply fade-in animations
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".fade-in, .slide-up, .fade-scale")
    .forEach((el, index) => {
      el.style.animationDelay = (index * 0.05) + "s";
    });
});


// CALL INIT (Very Important — must run AFTER everything)
window.addEventListener("DOMContentLoaded", initTheme);

