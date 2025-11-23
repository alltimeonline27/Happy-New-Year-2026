// Firebase config (same as other files)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const ADMIN_EMAIL = "alltimeonline@gmail.com";

// DOM
const adminSubtitle = document.getElementById("adminSubtitle");
const adminUserInfo = document.getElementById("adminUserInfo");
const adminSignInBtn = document.getElementById("adminSignInBtn");
const adminSignOutBtn = document.getElementById("adminSignOutBtn");

const adminAccessDenied = document.getElementById("adminAccessDenied");
const adminContent = document.getElementById("adminContent");

const statTotalCelebrations = document.getElementById("statTotalCelebrations");
const statTotalViews = document.getElementById("statTotalViews");
const statTotalShares = document.getElementById("statTotalShares");
const statTotalCreates = document.getElementById("statTotalCreates");
const celebrationsTableBody = document.getElementById("celebrationsTableBody");

let currentUser = null;

// Auth buttons
adminSignInBtn.addEventListener("click", () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).catch(console.error);
});

adminSignOutBtn.addEventListener("click", () => {
    auth.signOut().catch(console.error);
});

auth.onAuthStateChanged(async (user) => {
    currentUser = user || null;

    if (!currentUser) {
        adminUserInfo.textContent = "Not signed in";
        adminSignInBtn.style.display = "inline-block";
        adminSignOutBtn.style.display = "none";
        adminAccessDenied.style.display = "block";
        adminContent.style.display = "none";
        adminSubtitle.textContent = "Please sign in with the admin email.";
        return;
    }

    adminUserInfo.textContent = `Signed in as ${currentUser.email}`;
    adminSignInBtn.style.display = "none";
    adminSignOutBtn.style.display = "inline-block";

    if (currentUser.email !== ADMIN_EMAIL) {
        adminAccessDenied.style.display = "block";
        adminContent.style.display = "none";
        adminSubtitle.textContent = "This account is not authorised for admin access.";
        return;
    }

    adminAccessDenied.style.display = "none";
    adminContent.style.display = "block";
    adminSubtitle.textContent = "Admin access granted. Loading analytics…";

    await loadStats();
    await loadRecentCelebrations();
});

// Load aggregated stats
async function loadStats() {
    const celebrationsSnap = await db.collection("celebrations").get();
    statTotalCelebrations.textContent = celebrationsSnap.size;

    const viewsSnap = await db.collection("events").where("type", "==", "view").get();
    const sharesSnap = await db.collection("events").where("type", "==", "share").get();
    const createsSnap = await db.collection("events").where("type", "==", "create").get();

    statTotalViews.textContent = viewsSnap.size;
    statTotalShares.textContent = sharesSnap.size;
    statTotalCreates.textContent = createsSnap.size;
}

// Load recent celebrations
async function loadRecentCelebrations() {
    celebrationsTableBody.innerHTML = "<tr><td colspan='5'>Loading…</td></tr>";

    const snap = await db
        .collection("celebrations")
        .orderBy("createdAt", "desc")
        .limit(20)
        .get();

    if (snap.empty) {
        celebrationsTableBody.innerHTML = "<tr><td colspan='5'>No celebrations yet.</td></tr>";
        return;
    }

    celebrationsTableBody.innerHTML = "";

    snap.forEach((doc) => {
        const data = doc.data();
        const tr = document.createElement("tr");

        const createdAt = data.createdAt?.toDate
            ? data.createdAt.toDate().toLocaleString()
            : "-";

        tr.innerHTML = `
            <td>${data.receiverName || "-"}</td>
            <td>${data.senderName || "-"}</td>
            <td>${createdAt}</td>
            <td>${data.photoUrl ? "<span class='badge'>Yes</span>" : "<span class='badge'>No</span>"}</td>
            <td>
                <button class="btn-small danger" data-id="${doc.id}" data-photo="${data.photoUrl || ""}">
                    Delete
                </button>
            </td>
        `;
        celebrationsTableBody.appendChild(tr);
    });

    celebrationsTableBody.querySelectorAll("button[data-id]").forEach((btn) => {
        btn.addEventListener("click", async () => {
            const id = btn.getAttribute("data-id");
            const photoUrl = btn.getAttribute("data-photo");
            const confirmDelete = window.confirm(
                `Delete celebration ${id}? This will also delete the photo (if exists).`
            );
            if (!confirmDelete) return;

            await deleteCelebrationAndPhoto(id, photoUrl);
            await loadStats();
            await loadRecentCelebrations();
        });
    });
}

// Delete celebration + storage photo + related events
async function deleteCelebrationAndPhoto(id, photoUrl) {
    try {
        if (photoUrl) {
            try {
                const ref = storage.refFromURL(photoUrl);
                await ref.delete();
            } catch (err) {
                console.error("Error deleting photo:", err);
            }
        }

        await db.collection("celebrations").doc(id).delete();

        const eventsSnap = await db
            .collection("events")
            .where("celebrationId", "==", id)
            .get();

        const batch = db.batch();
        eventsSnap.forEach((doc) => batch.delete(doc.ref));
        await batch.commit();
    } catch (err) {
        console.error("Error deleting celebration:", err);
        alert("Error deleting celebration. Check console.");
    }
}
