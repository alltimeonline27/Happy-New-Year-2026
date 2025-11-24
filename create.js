// Firebase (Compat) Initialization
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

// Cloudinary Settings
const CLOUD_NAME = "dfczitdpf";
const UPLOAD_PRESET = "newyear2026"; // Ensure this is "Unsigned" in Cloudinary settings

// DOM Elements
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

// Prefill sender if coming from friend's share (?sender=...)
(function prefillSender() {
  try {
    const params = new URLSearchParams(window.location.search);
    const s = params.get("sender");
    if (s && senderNameInput) senderNameInput.value = s;
  } catch (e) {
    console.warn("Could not prefill sender:", e);
  }
})();

// ==============================
// OPTIMIZED IMAGE COMPRESSION (v2)
// ==============================
function compressImage(file, maxWidth = 700, quality = 0.55) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (event) => {
      img.src = event.target.result;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const scale = maxWidth / img.width;
      const newWidth = Math.min(maxWidth, img.width);
      const newHeight = img.height * scale;

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



// Helpers
async function uploadImageToCloudinary(file) {
  if (!file) return null;

  // Auto compress image before uploading
  const compressedBlob = await compressImage(file, 700, 0.55);
  const compressedFile = new File([compressedBlob], file.name, { type: "image/jpeg" });

  const formData = new FormData();
  formData.append("file", compressedFile);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData
  });

  if (!res.ok) {
    console.error("Cloudinary upload failed.");
    throw new Error("Image upload failed");
  }

  const data = await res.json();
  return data.secure_url;
}



// Fetch Geo Info with a Timeout so the app doesn't freeze
async function getGeoInfo() {
  const fetchGeo = fetch("https://ipapi.co/json/");
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), 2000)
  );

  try {
    const res = await Promise.race([fetchGeo, timeout]);
    if (!res.ok) return {};
    const data = await res.json();
    return {
      ip: data.ip || "",
      country: data.country_name || "",
      countryCode: data.country || "",
      region: data.region || "",
      city: data.city || ""
    };
  } catch (err) {
    console.warn("Geo lookup skipped:", err);
    return {}; // Return empty object on failure/timeout
  }
}

function getBaseUrl() {
  // Return origin + folder path ensuring trailing slash
  const origin = window.location.origin;
  const path = window.location.pathname;
  const folder = path.replace(/[^/]*$/, '');
  return `${origin}${folder}`;
}

// Main Handler
async function handleGenerateClick() {
  const senderName = senderNameInput ? senderNameInput.value.trim() : "";
  const receiverName = friendNameInput ? friendNameInput.value.trim() : "";
  const customMsg = messageInput ? messageInput.value.trim() : "";
  const file = photoInput && photoInput.files ? photoInput.files[0] : null;

  if (!senderName || !receiverName) {
    alert("Please enter both your name and your friend’s name.");
    return;
  }

  generateBtn.disabled = true;
  linkResultBlock.style.display = "none";
  statusEl.textContent = "Creating your New Year gift… Please wait.";

  try {
    let photoUrl = null;
    if (file) {
      statusEl.textContent = "Uploading photo…";
      photoUrl = await uploadImageToCloudinary(file);
    }

    statusEl.textContent = "Finalizing gift…";
    const geo = await getGeoInfo();

    const docRef = await db.collection("celebrations").add({
      senderName,
      receiverName,
      customMessage: customMsg,
      photoUrl: photoUrl || null,
      views: 0,
      shares: 0,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastOpened: firebase.firestore.FieldValue.serverTimestamp(),
      device: navigator.platform || "",
      ip: geo.ip || "",
      country: geo.country || "",
      city: geo.city || ""
    });

    const baseUrl = getBaseUrl();
    const cleanBase = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";
    const celebrationUrl = `${cleanBase}celebrate.html?id=${encodeURIComponent(docRef.id)}`;

    resultLinkEl.innerHTML = `<a href="${celebrationUrl}" target="_blank">${celebrationUrl}</a>`;
    linkResultBlock.style.display = "block";
    statusEl.textContent = "Link generated successfully! Share it with your friend.";

    resultLinkEl.innerHTML = `<a href="${celebrationUrl}" target="_blank">${celebrationUrl}</a>`;

    // SHARE BUTTONS
    document.getElementById("shareWhatsapp").onclick = () => {
      const msg = `🎉 I created a New Year 2026 Gift for you!\nOpen your surprise: ${celebrationUrl}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
    };

    document.getElementById("shareTelegram").onclick = () => {
      const msg = `🎉 I created a New Year 2026 Gift for you!\nOpen your surprise: ${celebrationUrl}`;
      window.open(`https://t.me/share/url?url=${encodeURIComponent(celebrationUrl)}&text=${encodeURIComponent(msg)}`, "_blank");
    };

    document.getElementById("shareFacebook").onclick = () => {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(celebrationUrl)}`, "_blank");
    };

    document.getElementById("shareCopy").onclick = () => {
      navigator.clipboard.writeText(celebrationUrl);
      alert("Your gift link copied!");
    };

    // Generate QR Code
    const qrContainer = document.getElementById("qrcode");
    qrContainer.innerHTML = ""; // reset previous

    new QRCode(qrContainer, {
      text: celebrationUrl,
      width: 180,
      height: 180,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });

    document.getElementById("qrSection").style.display = "block";

    // Download QR
    document.getElementById("downloadQR").onclick = () => {
      const img = qrContainer.querySelector("img");
      const link = document.createElement("a");
      link.href = img.src;
      link.download = "newyear_qr.png";
      link.click();
    };




    // Enable copy/open buttons
    if (copyLinkBtn) copyLinkBtn.onclick = () => {
      navigator.clipboard.writeText(celebrationUrl).then(() => {
        statusEl.textContent = 'Link copied to clipboard.';
      }).catch(() => {
        alert('Copy failed. Please copy manually.');
      });
    };

    if (openLinkBtn) openLinkBtn.onclick = () => window.open(celebrationUrl, '_blank');

  } catch (err) {
    console.error("Error creating gift:", err);
    statusEl.textContent = "Error creating link. Please try again.";
    alert("Something went wrong. Please check your internet connection.");
  } finally {
    generateBtn.disabled = false;
  }
}

if (generateBtn) {
  generateBtn.addEventListener("click", handleGenerateClick);
}
