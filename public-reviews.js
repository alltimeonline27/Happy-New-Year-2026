// Firebase config (same as celebrate.js)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAHKe9YThgj5WSxNsaq4Rq8Fh32uktUd0b",
  authDomain: "happy-new-year-2026-7eac0.firebaseapp.com",
  projectId: "happy-new-year-2026-7eac0",
  storageBucket: "happy-new-year-2026-7eac0.appspot.com",
  messagingSenderId: "689012388330",
  appId: "1:689012388330:web:0dd468b6e6ce2c2f322d383",
  measurementId: "G-KSZT2QEJP8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const reviewsList = document.getElementById("reviewsList");
const filterButtons = document.querySelectorAll(".filters button[data-filter]");
const sortSelect = document.getElementById("sortSelect");

let allReviews = [];

// Load all reviews from all gifts
async function loadAllReviews() {
  reviewsList.innerHTML = "Loading...";

  allReviews = [];

  const celebrationsSnap = await getDocs(collection(db, "celebrations"));

  for (const giftDoc of celebrationsSnap.docs) {
    const giftId = giftDoc.id;

    const reviewsSnap = await getDocs(
      query(collection(db, "celebrations", giftId, "reviews"), orderBy("createdAt", "desc"))
    );

    reviewsSnap.forEach((doc) => {
      const data = doc.data();
      allReviews.push({
        giftId,
        ...data
      });
    });
  }

  renderReviews();
}

function renderReviews() {
  let filtered = [...allReviews];

  // Apply filter
  const activeFilter = document.querySelector(".filters button.active").dataset.filter;

  if (activeFilter !== "all") {
    if (activeFilter === "admin") {
      filtered = filtered.filter(r => r.adminReply);
    } else {
      const starNum = Number(activeFilter);
      filtered = filtered.filter(r => r.rating === starNum);
    }
  }

  // Apply sorting
  const sortType = sortSelect.value;

  if (sortType === "newest") {
    filtered.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
  }
  if (sortType === "oldest") {
    filtered.sort((a, b) => a.createdAt?.seconds - b.createdAt?.seconds);
  }
  if (sortType === "top") {
    filtered.sort((a, b) => b.rating - a.rating);
  }
  if (sortType === "low") {
    filtered.sort((a, b) => a.rating - b.rating);
  }
  if (sortType === "liked") {
    filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
  }

  // Render
  if (filtered.length === 0) {
    reviewsList.innerHTML = "<p>No reviews available.</p>";
    return;
  }

  reviewsList.innerHTML = "";

  filtered.forEach((r) => {
    const card = document.createElement("div");
    card.className = "reviewCard";

    card.innerHTML = `
      <strong>${r.reviewerName || "User"}</strong>
      
      <div class="stars">
        ${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}
      </div>

      <p>${r.reviewText || ""}</p>

      <div class="like-dislike">
        👍 ${r.likes || 0}  
        👎 ${r.dislikes || 0}
      </div>

      ${r.adminReply
        ? `<p style="color:#4cd964;"><strong>Admin:</strong> ${r.adminReply}</p>`
        : ""}

      <a class="openGiftBtn" href="celebrate.html?id=${r.giftId}" target="_blank">
        Open Gift
      </a>
    `;

    reviewsList.appendChild(card);
  });
}

// FILTERS
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderReviews();
  });
});

// SORT
sortSelect.addEventListener("change", renderReviews);

// Load everything
loadAllReviews();
