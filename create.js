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

  try {
    let imgResult = null;

    // Upload Image
    if (file) {
      statusEl.textContent = "Uploading photo…";
      imgResult = await uploadImageToCloudinary(file);
    }

    // Geo
    statusEl.textContent = "Finalizing…";
    const geo = await getGeoInfo();

    // Save to Firestore
    const docRef = await db.collection("celebrations").add({
      senderName: sender,
      receiverName: receiver,
      customMessage: customMsg,
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

if (generateBtn) {
  generateBtn.addEventListener("click", handleGenerateClick);
}

// Init QR download listener
setupDownloadQR();
