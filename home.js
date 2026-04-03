// ✅ firebase.js already load kora ache HTML e
// tai ekhane config ar initializeApp lagbe na

const db = firebase.firestore();

// ── AUTH CHECK ─────────────────────────────────────────
const userId = localStorage.getItem("rookaId");
if (!userId) {
  window.location.href = "login.html";
}

// ── SLIDER ────────────────────────────────────────────
db.collection('media').doc('slider').get().then(doc => {
  if (doc.exists && doc.data().images?.length) {
    const images  = doc.data().images;
    const slideEl = document.getElementById('slide');
    let i = 0;
    slideEl.src = images[0];
    setInterval(() => {
      i = (i + 1) % images.length;
      slideEl.src = images[i];
    }, 2000);
  }
}).catch(err => console.log("Slider error:", err));

// ── MAIN IMAGE ────────────────────────────────────────
db.collection('media').doc('mainImg').get().then(doc => {
  if (doc.exists && doc.data().url) {
    document.getElementById('mainImg').src = doc.data().url;
  }
}).catch(err => console.log("Main image error:", err));

// ── GRID IMAGES ───────────────────────────────────────
db.collection('media').doc('gridImgs').get().then(doc => {
  if (doc.exists && doc.data().urls?.length) {
    const urls = doc.data().urls;
    if (urls[0]) document.getElementById('g1').src = urls[0];
    if (urls[1]) document.getElementById('g2').src = urls[1];
  }
}).catch(err => console.log("Grid error:", err));

// ── APPLY FORM ────────────────────────────────────────
const applyForm = document.getElementById('applyForm');
const msg       = document.getElementById('msg');

if (applyForm) {
  applyForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name     = document.getElementById('name').value.trim();
    const phone    = document.getElementById('phone').value.trim();
    const position = document.getElementById('position').value;

    if (!name || !phone) return;

    try {
      await db.collection('applications').add({
        name,
        phone,
        position,
        userId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
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
