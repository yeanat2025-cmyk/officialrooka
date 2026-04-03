import { db, collection, getDocs, addDoc } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

// ── AUTH CHECK ─────────────────────────────────────────
const userId = localStorage.getItem("rookaId");
if (!userId) {
  window.location.href = "login.html";
}

// ── SLIDER ────────────────────────────────────────────
try {
  const sliderSnap = await getDoc(doc(db, "media", "slider"));
  if (sliderSnap.exists() && sliderSnap.data().images?.length) {
    const images  = sliderSnap.data().images;
    const slideEl = document.getElementById("slide");
    let i = 0;
    slideEl.src = images[0];
    setInterval(() => {
      i = (i + 1) % images.length;
      slideEl.src = images[i];
    }, 2000);
  }
} catch (e) { console.log("Slider error:", e); }

// ── MAIN IMAGE ────────────────────────────────────────
try {
  const mainSnap = await getDoc(doc(db, "media", "mainImg"));
  if (mainSnap.exists() && mainSnap.data().url) {
    document.getElementById("mainImg").src = mainSnap.data().url;
  }
} catch (e) { console.log("Main image error:", e); }

// ── GRID IMAGES ───────────────────────────────────────
try {
  const gridSnap = await getDoc(doc(db, "media", "gridImgs"));
  if (gridSnap.exists() && gridSnap.data().urls?.length) {
    const urls = gridSnap.data().urls;
    if (urls[0]) document.getElementById("g1").src = urls[0];
    if (urls[1]) document.getElementById("g2").src = urls[1];
  }
} catch (e) { console.log("Grid error:", e); }

// ── APPLY FORM ────────────────────────────────────────
const applyForm = document.getElementById("applyForm");
const msg       = document.getElementById("msg");

if (applyForm) {
  applyForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name     = document.getElementById("name").value.trim();
    const phone    = document.getElementById("phone").value.trim();
    const position = document.getElementById("position").value;

    if (!name || !phone) return;

    try {
      await addDoc(collection(db, "applications"), {
        name,
        phone,
        position,
        userId,
        timestamp: new Date()
      });
      msg.style.color = "green";
      msg.textContent = "Submitted! ✅";
      applyForm.reset();
    } catch (err) {
      msg.style.color = "red";
      msg.textContent = "Error ❌";
      console.error(err);
    }
  });
}
