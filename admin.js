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
const adminContent = document.getElementById("adminContent");
const totalCelebrationsEl = document.getElementById("totalCelebrations");
const celebrationsTableBody = document.getElementById("celebrationsTableBody");

const ADMIN_EMAIL = "alltimeonline.official@gmail.com";

adminLoginBtn.addEventListener("click", () => {
  const email = adminEmailInput.value.trim().toLowerCase();
  if (email === ADMIN_EMAIL) {
    adminStatus.textContent = "Admin access granted.";
    loadAdminData();
  } else {
    adminStatus.textContent = "Invalid admin email.";
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
}
