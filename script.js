/* ===== HAMBURGER ===== */
const hamburger = document.querySelector('.hamburger');
const dropdown = document.querySelector('.mobile-dropdown');

if (hamburger && dropdown) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    dropdown.classList.toggle('active');
  });
}

/* ===== TERMÉK CAROUSEL (MÁS OLDAL) ===== */
const imgEl = document.getElementById("carousel-image");
const titleEl = document.getElementById("carousel-title");
const textEl = document.getElementById("carousel-text");

const carouselData = [
  {
    img: "pic/greecomfortpro3.5.png",
    title: "Gree Comfort Pro 3.5kW",
    text: "Hűtőteljesítménye: 3.5kW, fűtőteljesítménye: 3.8kW, max zajszint: 21dB, wifi: igen."
  },
  {
    img: "pic/syenc35.png",
    title: "Syen Charm 3.5kW",
    text: "Hűtőteljesítménye: 3.2kW, fűtőteljesítménye: 3.4kW, max zajszint: 52dB, wifi: igen."
  },
  {
    img: "pic/gree25.png",
    title: "Gree Comfort Pro 2.5kW",
    text: "Hűtőteljesítménye: 2.7kW, fűtőteljesítménye: 3kW, max zajszint: 51dB, wifi: igen."
  },
  {
    img: "pic/daikin25.png",
    title: "Daikin FTXC25E / RXC25E",
    text: "Hűtőteljesítmény: 2.57kW, fűtőteljesítmény: 2.23kW, max zajszint: 38dB, wifi: igen."
  },
  {
    img: "pic/daikin35.png",
    title: "Daikin FTXC35E / RXC35E",
    text: "Hűtőteljesítmény: 3.44kW, fűtőteljesítmény: 2.24kW, max zajszint: 41dB, wifi: igen."
  },
  {
    img: "pic/syenm27.png",
    title: "Syen Muse Next 2.7kW",
    text: "Hűtőteljesítmény: 2.7kW, fűtőteljesítmény: 3kW, max zajszint: 50dB."
  },
  {
    img: "pic/syenm27.png",
    title: "Syen Muse Next 3.5kW",
    text: "Hűtőteljesítmény: 3.5kW, fűtőteljesítmény: 3.8kW, max zajszint: 43dB."
  },
  {
    img: "pic/mitsu.png",
    title: "Mitsubishi MSZ/MUZ-HR35VFK",
    text: "Hűtőteljesítmény: 3.4kW, fűtőteljesítmény: 3.6kW, max zajszint: 43dB."
  }
];


let carouselIndex = 0;

function renderCarousel() {
  if (!imgEl || !titleEl || !textEl) return; // ⬅️ EZ A KULCS
  const item = carouselData[carouselIndex];
  imgEl.src = item.img;
  titleEl.textContent = item.title;
  textEl.textContent = item.text;
}

const upArrow = document.querySelector(".carousel-arrow.up");
const downArrow = document.querySelector(".carousel-arrow.down");

if (upArrow && downArrow && imgEl) {
  upArrow.onclick = () => {
    carouselIndex = (carouselIndex - 1 + carouselData.length) % carouselData.length;
    renderCarousel();
  };

  downArrow.onclick = () => {
    carouselIndex = (carouselIndex + 1) % carouselData.length;
    renderCarousel();
  };

  renderCarousel();
}

/* ================= COOKIE CONSENT ================= */

document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept");
  const declineBtn = document.getElementById("cookie-decline");

  if (!banner) return;

  const consent = localStorage.getItem("cookieConsent");

  if (!consent) {
    banner.classList.remove("hidden");
  }

  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "accepted");
    document.cookie = "cookie_consent=accepted; path=/; max-age=31536000";
    banner.classList.add("hidden");
  });

  declineBtn.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "rejected");
    document.cookie = "cookie_consent=rejected; path=/; max-age=31536000";
    banner.classList.add("hidden");
  });
});



/* ================= PAGE LOADER CONTROL ================= */

window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");
  const navbar = document.querySelector(".navbar");

  if (!loader) return;

  // kis késleltetés, hogy szép legyen az átmenet
  setTimeout(() => {
    loader.classList.add("hidden");

    // NAVBAR animáció CSAK MOST induljon
    if (navbar) {
      navbar.classList.add("load");
    }

  }, 400);
});




// Add hozzá a script.js fájlhoz
document.addEventListener('DOMContentLoaded', function() {
  // Kép sáv animáció sebességének beállítása
  const kepsavTrack = document.querySelector('.kepsav-track');
  if (!kepsavTrack) return;
  
  function calculateKepsavSpeed() {
    const screenWidth = window.innerWidth;
    let speed = 40; // alap sebesség másodpercben
    
    // Nagyobb képernyőkön lassabb
    if (screenWidth >= 5120) speed = 55;
    else if (screenWidth >= 3840) speed = 50;
    else if (screenWidth >= 3440) speed = 45;
    else if (screenWidth >= 2560) speed = 40;
    else if (screenWidth >= 1920) speed = 35;
    else if (screenWidth <= 900) speed = 40; // mobilon lassabb
    
    kepsavTrack.style.animationDuration = speed + 's';
  }
  
  // Futás az oldal betöltésekor és ablak átméretezésekor
  calculateKepsavSpeed();
  window.addEventListener('resize', calculateKepsavSpeed);
  
  // Hover pause
  const kepsavContainer = document.querySelector('.kepsav-container');
  if (kepsavContainer) {
    kepsavContainer.addEventListener('mouseenter', () => {
      kepsavTrack.style.animationPlayState = 'paused';
    });
    
    kepsavContainer.addEventListener('mouseleave', () => {
      kepsavTrack.style.animationPlayState = 'running';
    });
  }
});