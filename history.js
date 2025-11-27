// NEW FILE: history.js
const firebaseConfig = {
  apiKey: "AIzaSyAHKe9YThgj5WSxNsaq4Rq8Fh32uktUd0b",
  authDomain: "happy-new-year-2026-7eac0.firebaseapp.com",
  projectId: "happy-new-year-2026-7eac0",
  storageBucket: "happy-new-year-2026-7eac0.appspot.com",
  messagingSenderId: "689012388330",
  appId: "1:689012388330:web:0dd468b6e6ce2c2f322d383",
};
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const tbody = document.getElementById("historyTbody");
const noGifts = document.getElementById("noGifts");
const creatorInfo = document.getElementById("creatorInfo");

const creatorId = localStorage.getItem("creatorId");
const creatorName = localStorage.getItem("creatorDisplayName") || "You";

creatorInfo.textContent = `Showing gifts created by: ${creatorName}`;

if (!creatorId) {
  noGifts.style.display = "block";
} else {
  db.collection("celebrations")
    .where("creatorId", "==", creatorId)
    .orderBy("createdAt", "desc")
    .get()
    .then((snap) => {
      if (snap.empty) {
        noGifts.style.display = "block";
        return;
      }

      snap.forEach((doc) => {
        const d = doc.data();
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${d.receiverName || ""}</td>
          <td>${d.createdAt?.toDate().toLocaleString() || ""}</td>
          <td>${d.photoUrl ? "Yes" : "No"}</td>
          <td><a href="celebrate.html?id=${doc.id}" target="_blank">Open</a></td>
        `;

        tbody.appendChild(tr);
      });
    });
}
