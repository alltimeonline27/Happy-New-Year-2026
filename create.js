// === Firebase Config (REPLACE with your values) ===
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
const storage = firebase.storage();

// DOM
const createForm = document.getElementById("createForm");
const senderNameInput = document.getElementById("senderName");
const friendNameInput = document.getElementById("friendName");
const friendPhotoInput = document.getElementById("friendPhoto");
const customMessageInput = document.getElementById("customMessage");
const createResult = document.getElementById("createResult");
const shareLinkInput = document.getElementById("shareLinkInput");
const copyLinkBtn = document.getElementById("copyLinkBtn");
const whatsappShareBtn = document.getElementById("whatsappShareBtn");
const bgCanvas = document.getElementById("bgCanvas");

let friendPhotoFile = null;

// Auto-fill your name from ?sender= (previous receiver)
(function prefillSender() {
    const p = new URLSearchParams(window.location.search);
    const s = p.get("sender");
    if (s) senderNameInput.value = s;
})();

// File handler (optional photo)
if (friendPhotoInput) {
    friendPhotoInput.addEventListener("change", (e) => {
        const file = e.target.files && e.target.files[0];
        friendPhotoFile = file || null;
    });
}

// Soft animated background
if (bgCanvas) {
    const ctx = bgCanvas.getContext("2d");
    function resize() {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    const sparks = [];
    function spawnSpark() {
        const w = bgCanvas.width;
        const h = bgCanvas.height;
        const x = Math.random() * w;
        const y = Math.random() * h * 0.5;
        const color = `hsl(${Math.random() * 360}, 80%, 60%)`;
        for (let i = 0; i < 22; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3 + 1;
            sparks.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                color
            });
        }
    }

    function loop() {
        ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
        for (let i = sparks.length - 1; i >= 0; i--) {
            const s = sparks[i];
            s.x += s.vx;
            s.y += s.vy;
            s.vy += 0.04;
            s.life -= 0.015;
            if (s.life <= 0) {
                sparks.splice(i, 1);
                continue;
            }
            ctx.globalAlpha = s.life;
            ctx.fillStyle = s.color;
            ctx.beginPath();
            ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
            ctx.fill();
        }
        requestAnimationFrame(loop);
    }

    setInterval(spawnSpark, 1200);
    loop();
}

// Handle form submit: create doc + link
createForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const senderName = senderNameInput.value.trim();
    const friendName = friendNameInput.value.trim();
    const customMessage = customMessageInput.value.trim();

    if (!senderName || !friendName) return;

    createForm.querySelector("button[type='submit']").disabled = true;

    try {
        const docRef = db.collection("celebrations").doc();
        const docId = docRef.id;

        let photoUrl = null;
        if (friendPhotoFile) {
            const storageRef = storage.ref().child(`celebration-photos/${docId}`);
            await storageRef.put(friendPhotoFile);
            photoUrl = await storageRef.getDownloadURL();
        }

        await docRef.set({
            senderName,
            receiverName: friendName,
            photoUrl: photoUrl,
            customMessage: customMessage || null,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Build link (works on local Live Server and deploy)
        const currentPath = window.location.pathname;
        const basePath = currentPath.replace(/create\.html.*$/i, "");
        const link = `${window.location.origin}${basePath}celebrate.html?id=${docId}`;

        shareLinkInput.value = link;
        createResult.style.display = "block";

        // log create event (optional analytics)
        await db.collection("events").add({
            type: "create",
            celebrationId: docId,
            senderName,
            receiverName: friendName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (err) {
        console.error("Error creating celebration:", err);
        alert("Error creating gift. Please try again.");
    } finally {
        createForm.querySelector("button[type='submit']").disabled = false;
    }
});

// Copy link
copyLinkBtn.addEventListener("click", async () => {
    const link = shareLinkInput.value;
    if (!link) return;
    try {
        await navigator.clipboard.writeText(link);
        alert("Link copied to clipboard");
    } catch {
        window.prompt("Copy this link:", link);
    }
});

// WhatsApp share
whatsappShareBtn.addEventListener("click", () => {
    const link = shareLinkInput.value;
    if (!link) return;
    const text = encodeURIComponent("Your New Year 2026 gift is ready! Open it: " + link);
    window.open("https://wa.me/?text=" + text, "_blank");
});

// (Optional) register service worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
}
