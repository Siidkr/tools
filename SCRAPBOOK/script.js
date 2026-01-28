const lockScreen = document.getElementById("lockScreen");
const intro = document.getElementById("intro");
const book = document.getElementById("book");
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

// PASSWORD
function unlockBook() {
  const pass = document.getElementById("passInput").value;
  if (pass === "143") { // GANTI kode rahasia
    lockScreen.style.display = "none";
    intro.classList.remove("hidden");
    setTimeout(() => {
      intro.style.display = "none";
      book.classList.remove("hidden");
      music.play();
      typeLetter();
      startCountdown();
    }, 3000);
  } else {
    document.getElementById("lockMsg").innerText = "Kode salah 😢";
  }
}

// MUSIC CONTROL
musicBtn.onclick = () => {
  if (music.paused) {
    music.play();
    musicBtn.innerText = "🎵";
  } else {
    music.pause();
    musicBtn.innerText = "🔇";
  }
};

// LOVE LETTER TYPE EFFECT
const letterText = "Aku bersyukur bisa mencintai kamu. Setiap hari bersamamu adalah hadiah terindah dalam hidupku. Happy Anniversary, sayang ❤️";
let i = 0;
function typeLetter() {
  if (i < letterText.length) {
    document.getElementById("letterText").innerHTML += letterText.charAt(i);
    i++;
    setTimeout(typeLetter, 40);
  }
}

// COUNTDOWN ANNIVERSARY
function startCountdown() {
  const targetDate = new Date("2026-12-01"); // GANTI tanggal anniversary
  setInterval(() => {
    const now = new Date();
    const diff = targetDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("countdown").innerHTML =
      `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
}

// SECRET MESSAGE
function showSecret() {
  document.getElementById("secretText").innerText =
    "Kalau aku boleh memilih lagi, aku tetap memilih kamu ❤️";
}
