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




// JavaScript kód - TELJESEN ÚJ MEGKÖZELÍTÉS

document.addEventListener('DOMContentLoaded', function() {
  const kepsavTrack = document.querySelector('.kepsav-track');
  const kepsavContainer = document.querySelector('.kepsav-container');
  const images = document.querySelectorAll('.kepsav-item img');
  
  if (!kepsavTrack || !kepsavContainer) return;
  
  // Változók a mozgáshoz
  let isDragging = false;
  let dragStartX = 0;
  let currentPosition = 0;
  let animationId = null;
  let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  let isAutoScrolling = true;
  let autoScrollSpeed = 0.5; // Pixel per frame
  
  // Változók a kép nagyításhoz
  let currentZoomIndex = 0;
  let zoomOverlay = null;
  const DRAG_THRESHOLD = 10;
  
  // Track méretek
  const itemWidth = 240 + 16; // kép szélesség + gap
  const originalItemsCount = 12;
  const visibleItemsCount = Math.ceil(kepsavContainer.clientWidth / itemWidth);
  const totalWidth = originalItemsCount * itemWidth;
  
  // Kikapcsoljuk a CSS animációt és beállítjuk a kezdő pozíciót
  kepsavTrack.style.animation = 'none';
  kepsavTrack.style.transform = 'translateX(0px)';
  
  // Nagyító ikonok létrehozása
  function createZoomIcons() {
    images.forEach((img, index) => {
      const item = img.closest('.kepsav-item');
      
      if (!item.querySelector('.zoom-icon')) {
        const zoomIcon = document.createElement('div');
        zoomIcon.className = 'zoom-icon';
        zoomIcon.title = 'Kép nagyítása';
        item.appendChild(zoomIcon);
        
        zoomIcon.addEventListener('click', (e) => {
          e.stopPropagation();
          openZoom(index % originalItemsCount);
        });
        
        if (isTouchDevice) {
          zoomIcon.addEventListener('touchstart', (e) => {
            e.stopPropagation();
          }, { passive: true });
          
          zoomIcon.addEventListener('touchend', (e) => {
            e.stopPropagation();
            e.preventDefault();
            openZoom(index % originalItemsCount);
          });
        }
      }
    });
  }
  
  // Automatikus scroll animáció (JavaScript-tel)
  function startAutoScroll() {
    if (!isAutoScrolling || isDragging) return;
    
    function animate() {
      if (!isDragging && isAutoScrolling) {
        currentPosition -= autoScrollSpeed;
        
        // Ha túlmutatunk a duplikált résznél, ugrunk vissza
        if (currentPosition <= -totalWidth) {
          currentPosition += totalWidth;
        }
        
        kepsavTrack.style.transform = `translateX(${currentPosition}px)`;
        animationId = requestAnimationFrame(animate);
      }
    }
    
    animationId = requestAnimationFrame(animate);
  }
  
  function stopAutoScroll() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }
  
  // Drag and drop funkciók
  function startDrag(e) {
    if (e.target.closest('.zoom-icon')) {
      return;
    }
    
    // Stop auto scroll
    stopAutoScroll();
    isAutoScrolling = false;
    
    dragStartX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    
    if (e.type === 'mousedown') {
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
    } else {
      document.addEventListener('touchmove', handleDragMove, { passive: false });
      document.addEventListener('touchend', handleDragEnd);
    }
    
    e.preventDefault();
  }
  
  function handleDragMove(e) {
    const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    
    if (!isDragging) {
      const deltaX = Math.abs(currentX - dragStartX);
      
      if (deltaX > DRAG_THRESHOLD) {
        isDragging = true;
        kepsavTrack.classList.add('dragging');
        
        if (e.cancelable) e.preventDefault();
      } else {
        return;
      }
    }
    
    if (isDragging) {
      if (e.cancelable) e.preventDefault();
      
      const deltaX = currentX - dragStartX;
      dragStartX = currentX;
      
      // Update position
      currentPosition += deltaX;
      
      // Limit position to prevent empty space
      const maxPosition = 0;
      const minPosition = -totalWidth + (visibleItemsCount * itemWidth);
      
      if (currentPosition > maxPosition) {
        currentPosition = maxPosition;
      } else if (currentPosition < minPosition) {
        currentPosition = minPosition;
      }
      
      kepsavTrack.style.transform = `translateX(${currentPosition}px)`;
    }
  }
  
  function handleDragEnd(e) {
    // Clean up
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
    document.removeEventListener('touchmove', handleDragMove);
    document.removeEventListener('touchend', handleDragEnd);
    
    if (isDragging) {
      kepsavTrack.classList.remove('dragging');
      isDragging = false;
      
      // Inertia effect
      applyInertia(e);
    } else {
      // Resume auto scroll after a short delay
      setTimeout(() => {
        if (!isDragging) {
          isAutoScrolling = true;
          startAutoScroll();
        }
      }, 300);
    }
  }
  
  function applyInertia(e) {
    let velocity = 0;
    
    if (e.type === 'mouseup') {
      const endX = e.clientX;
      // Calculate velocity based on last movement
      velocity = (dragStartX - endX) * 0.2;
    }
    
    if (Math.abs(velocity) > 1) {
      let inertiaId = null;
      let deceleration = 0.95;
      
      function applyInertiaFrame() {
        velocity *= deceleration;
        currentPosition += velocity;
        
        // Limit position
        const maxPosition = 0;
        const minPosition = -totalWidth + (visibleItemsCount * itemWidth);
        
        if (currentPosition > maxPosition) {
          currentPosition = maxPosition;
          velocity = 0;
        } else if (currentPosition < minPosition) {
          currentPosition = minPosition;
          velocity = 0;
        }
        
        kepsavTrack.style.transform = `translateX(${currentPosition}px)`;
        
        if (Math.abs(velocity) > 0.1) {
          inertiaId = requestAnimationFrame(applyInertiaFrame);
        } else {
          // Start auto scroll after inertia stops
          setTimeout(() => {
            isAutoScrolling = true;
            startAutoScroll();
          }, 500);
        }
      }
      
      applyInertiaFrame();
    } else {
      // Start auto scroll immediately if no inertia
      setTimeout(() => {
        isAutoScrolling = true;
        startAutoScroll();
      }, 500);
    }
  }
  
  // Add drag event listeners
  kepsavTrack.addEventListener('mousedown', startDrag);
  kepsavTrack.addEventListener('touchstart', startDrag, { passive: false });
  
  // Hover pause only on desktop
  if (!isTouchDevice) {
    kepsavContainer.addEventListener('mouseenter', () => {
      if (!isDragging) {
        stopAutoScroll();
        isAutoScrolling = false;
      }
    });
    
    kepsavContainer.addEventListener('mouseleave', () => {
      if (!isDragging) {
        setTimeout(() => {
          isAutoScrolling = true;
          startAutoScroll();
        }, 300);
      }
    });
  }
  
  // KÉP NAGYÍTÁS FUNKCIÓK (ugyanaz marad)
  function createZoomOverlay() {
    if (zoomOverlay) return zoomOverlay;
    
    const overlay = document.createElement('div');
    overlay.className = 'image-zoom-overlay';
    
    overlay.innerHTML = `
      <button class="close-zoom" title="Bezárás (ESC)">×</button>
      <button class="zoom-nav prev" title="Előző kép (←)">‹</button>
      <button class="zoom-nav next" title="Következő kép (→)">›</button>
      <div class="zoomed-image-container">
        <img class="zoomed-image" src="" alt="">
      </div>
      <div class="image-counter">0/0</div>
    `;
    
    document.body.appendChild(overlay);
    zoomOverlay = overlay;
    
    overlay.querySelector('.close-zoom').addEventListener('click', closeZoom);
    overlay.querySelector('.prev').addEventListener('click', () => showPrevImage());
    overlay.querySelector('.next').addEventListener('click', () => showNextImage());
    
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeZoom();
      }
    });
    
    let touchStartX = 0;
    let touchStartTime = 0;
    
    overlay.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartTime = Date.now();
    }, { passive: true });
    
    overlay.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchDuration = Date.now() - touchStartTime;
      const deltaX = touchStartX - touchEndX;
      
      if (Math.abs(deltaX) > 50 && touchDuration < 300) {
        if (deltaX > 0) {
          showNextImage();
        } else {
          showPrevImage();
        }
      }
    }, { passive: true });
    
    return overlay;
  }
  
  function openZoom(index) {
    if (!zoomOverlay) createZoomOverlay();
    
    currentZoomIndex = index;
    updateZoomedImage();
    zoomOverlay.classList.add('active');
    
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleZoomKeyboard);
  }
  
  function closeZoom() {
    if (!zoomOverlay) return;
    
    zoomOverlay.classList.remove('active');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleZoomKeyboard);
  }
  
  function updateZoomedImage() {
    if (!zoomOverlay) return;
    
    const originalIndex = currentZoomIndex % originalItemsCount;
    const img = images[originalIndex];
    const zoomedImg = zoomOverlay.querySelector('.zoomed-image');
    const counter = zoomOverlay.querySelector('.image-counter');
    
    zoomedImg.style.opacity = '0';
    zoomedImg.src = img.src;
    zoomedImg.alt = img.alt;
    counter.textContent = `${currentZoomIndex + 1}/${originalItemsCount}`;
    
    if (zoomedImg.complete) {
      zoomedImg.style.opacity = '1';
    } else {
      zoomedImg.onload = () => {
        zoomedImg.style.opacity = '1';
      };
    }
  }
  
  function showNextImage() {
    currentZoomIndex = (currentZoomIndex + 1) % originalItemsCount;
    updateZoomedImage();
  }
  
  function showPrevImage() {
    currentZoomIndex = (currentZoomIndex - 1 + originalItemsCount) % originalItemsCount;
    updateZoomedImage();
  }
  
  function handleZoomKeyboard(e) {
    if (!zoomOverlay || !zoomOverlay.classList.contains('active')) return;
    
    switch(e.key) {
      case 'Escape':
        closeZoom();
        break;
      case 'ArrowLeft':
        showPrevImage();
        break;
      case 'ArrowRight':
        showNextImage();
        break;
    }
  }
  
  // Sebesség beállítása
  function calculateScrollSpeed() {
    const screenWidth = window.innerWidth;
    
    if (screenWidth >= 5120) autoScrollSpeed = 0.8;
    else if (screenWidth >= 3840) autoScrollSpeed = 0.7;
    else if (screenWidth >= 3440) autoScrollSpeed = 0.6;
    else if (screenWidth >= 2560) autoScrollSpeed = 0.5;
    else if (screenWidth >= 1920) autoScrollSpeed = 0.4;
    else if (screenWidth <= 900) autoScrollSpeed = 0.3;
  }
  
  // Initialize
  calculateScrollSpeed();
  createZoomIcons();
  createZoomOverlay();
  startAutoScroll(); // Start the auto scroll
  
  window.addEventListener('resize', calculateScrollSpeed);
  
  // Handle window blur/focus for performance
  window.addEventListener('blur', () => {
    stopAutoScroll();
    isAutoScrolling = false;
  });
  
  window.addEventListener('focus', () => {
    if (!isDragging) {
      isAutoScrolling = true;
      startAutoScroll();
    }
  });
});





















// KLIMAKAR KÉPSÁV DRAG AND DROP ÉS NAGYÍTÁS - JAVÍTVA

document.addEventListener('DOMContentLoaded', function() {
  // Ellenőrizzük, hogy a klimakar oldalon vagyunk-e
  const karCarouselTrack = document.querySelector('.kar-carousel-track');
  const karCarousel = document.querySelector('.kar-carousel');
  const karImages = document.querySelectorAll('.kar-img-card img');
  
  if (!karCarouselTrack || !karCarousel) return;
  
  // Változók a drag and drop-hoz - KLIMAKAR SPECIFIKUS
  let karIsDragging = false;
  let karDragStartX = 0;
  let karCurrentPosition = 0;
  let karAnimationId = null;
  let karIsTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  let karIsAutoScrolling = true;
  let karAutoScrollSpeed = 0.3;
  let karLastDragEvent = null; // Új változó a drag event tárolására
  
  // Változók a kép nagyításhoz - KLIMAKAR SPECIFIKUS
  let karCurrentZoomIndex = 0;
  let karZoomOverlay = null;
  const KAR_DRAG_THRESHOLD = 10;
  
  // Track méretek - KLIMAKAR SPECIFIKUS
  const karItemWidth = 250 + 24; // kar-img-card szélesség + margin-right
  const karOriginalItemsCount = 11; // Klimakar képek száma
  
  // DUPLIKÁLJUK A KÉPEKET A VÉGTELEN HATÁS ÉRDEKÉBEN
  function duplicateKarItemsForInfiniteEffect() {
    const originalItems = document.querySelectorAll('.kar-img-card');
    if (originalItems.length === 0) return;
    
    // Ellenőrizzük, hogy már duplikálva vannak-e
    const allItems = document.querySelectorAll('.kar-img-card');
    if (allItems.length === karOriginalItemsCount * 2) return; // Már duplikálva van
    
    // Duplikáljuk az összes eredeti elemet
    originalItems.forEach(item => {
      const clone = item.cloneNode(true);
      karCarouselTrack.appendChild(clone);
    });
  }
  
  // Hívjuk meg a duplikálást
  setTimeout(() => {
    duplicateKarItemsForInfiniteEffect();
  }, 100);
  
  // Kikapcsoljuk a CSS animációt és beállítjuk a kezdő pozíciót
  karCarouselTrack.style.animation = 'none';
  karCarouselTrack.style.transform = 'translateX(0px)';
  
  // Nagyító ikonok létrehozása - KLIMAKAR SPECIFIKUS
  function createKarZoomIcons() {
    // Várjuk meg a duplikálást, majd hozzuk létre az ikonokat
    setTimeout(() => {
      const allKarImages = document.querySelectorAll('.kar-img-card img');
      
      allKarImages.forEach((img, index) => {
        const item = img.closest('.kar-img-card');
        
        if (!item.querySelector('.kar-zoom-icon')) {
          const zoomIcon = document.createElement('div');
          zoomIcon.className = 'kar-zoom-icon';
          zoomIcon.title = 'Kép nagyítása';
          item.appendChild(zoomIcon);
          
          zoomIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            karOpenZoom(index % karOriginalItemsCount);
          });
          
          if (karIsTouchDevice) {
            zoomIcon.addEventListener('touchstart', (e) => {
              e.stopPropagation();
            }, { passive: true });
            
            zoomIcon.addEventListener('touchend', (e) => {
              e.stopPropagation();
              e.preventDefault();
              karOpenZoom(index % karOriginalItemsCount);
            });
          }
        }
      });
    }, 200);
  }
  
  // Automatikus scroll animáció (JavaScript-tel) - KLIMAKAR SPECIFIKUS
  function startKarAutoScroll() {
    if (!karIsAutoScrolling || karIsDragging) return;
    
    const totalItemsWidth = karOriginalItemsCount * karItemWidth * 2; // Duplikálva
    
    function animate() {
      if (!karIsDragging && karIsAutoScrolling) {
        karCurrentPosition -= karAutoScrollSpeed;
        
        // Ha túlmutatunk a duplikált résznél, ugrunk vissza az elejére
        if (karCurrentPosition <= -totalItemsWidth / 2) {
          karCurrentPosition += karOriginalItemsCount * karItemWidth;
        }
        
        karCarouselTrack.style.transform = `translateX(${karCurrentPosition}px)`;
        karAnimationId = requestAnimationFrame(animate);
      }
    }
    
    karAnimationId = requestAnimationFrame(animate);
  }
  
  function stopKarAutoScroll() {
    if (karAnimationId) {
      cancelAnimationFrame(karAnimationId);
      karAnimationId = null;
    }
  }
  
  // Drag and drop funkciók - KLIMAKAR SPECIFIKUS (JAVÍTVA)
  function startKarDrag(e) {
    if (e.target.closest('.kar-zoom-icon')) {
      return;
    }
    
    // Stop auto scroll
    stopKarAutoScroll();
    karIsAutoScrolling = false;
    
    karDragStartX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    karLastDragEvent = e; // Elmentjük az eseményt
    
    if (e.type === 'mousedown') {
      document.addEventListener('mousemove', handleKarDragMove);
      document.addEventListener('mouseup', handleKarDragEnd);
    } else {
      document.addEventListener('touchmove', handleKarDragMove, { passive: false });
      document.addEventListener('touchend', handleKarDragEnd);
    }
    
    e.preventDefault();
  }
  
  function handleKarDragMove(e) {
    const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    
    if (!karIsDragging) {
      const deltaX = Math.abs(currentX - karDragStartX);
      
      if (deltaX > KAR_DRAG_THRESHOLD) {
        karIsDragging = true;
        karCarouselTrack.classList.add('dragging');
        karCarouselTrack.style.transition = 'none';
        
        if (e.cancelable) e.preventDefault();
      } else {
        return;
      }
    }
    
    if (karIsDragging) {
      if (e.cancelable) e.preventDefault();
      
      const deltaX = currentX - karDragStartX;
      karDragStartX = currentX;
      
      // Update position
      karCurrentPosition += deltaX;
      
      // JAVÍTVA: Korlátozzuk a drag-ot, hogy ne lehessen kihozni a képernyőből
      const maxDragRight = 100; // Maximum mennyit lehet jobbra húzni
      const maxDragLeft = -(karOriginalItemsCount * karItemWidth * 1.5) + karCarousel.clientWidth;
      
      karCurrentPosition = Math.max(maxDragLeft, Math.min(maxDragRight, karCurrentPosition));
      
      karCarouselTrack.style.transform = `translateX(${karCurrentPosition}px)`;
    }
  }
  
  function handleKarDragEnd(e) {
    // Clean up
    document.removeEventListener('mousemove', handleKarDragMove);
    document.removeEventListener('mouseup', handleKarDragEnd);
    document.removeEventListener('touchmove', handleKarDragMove);
    document.removeEventListener('touchend', handleKarDragEnd);
    
    if (karIsDragging) {
      karCarouselTrack.classList.remove('dragging');
      karIsDragging = false;
      
      // JAVÍTVA: Smooth visszatérés a látható területre, ha túlmentünk
      smoothReturnToBounds(e); // Átadjuk az 'e' paramétert
    } else {
      // Resume auto scroll after a short delay
      setTimeout(() => {
        if (!karIsDragging) {
          karIsAutoScrolling = true;
          startKarAutoScroll();
        }
      }, 300);
    }
  }
  
  function smoothReturnToBounds(endEvent) {
    const visibleWidth = karCarousel.clientWidth;
    const contentWidth = karOriginalItemsCount * karItemWidth * 2;
    
    // Ha túl balra mentünk, smooth vissza
    if (karCurrentPosition < -contentWidth + visibleWidth + 100) {
      karCarouselTrack.style.transition = 'transform 0.5s ease-out';
      karCurrentPosition = -contentWidth + visibleWidth + 50;
      karCarouselTrack.style.transform = `translateX(${karCurrentPosition}px)`;
      
      setTimeout(() => {
        karCarouselTrack.style.transition = '';
      }, 500);
    }
    // Ha túl jobbra mentünk, smooth vissza
    else if (karCurrentPosition > 50) {
      karCarouselTrack.style.transition = 'transform 0.5s ease-out';
      karCurrentPosition = 0;
      karCarouselTrack.style.transform = `translateX(${karCurrentPosition}px)`;
      
      setTimeout(() => {
        karCarouselTrack.style.transition = '';
      }, 500);
    }
    
    // Inertia effect csak akkor, ha nem vagyunk a határokon
    if (karCurrentPosition > -contentWidth + visibleWidth + 150 && karCurrentPosition < 50) {
      applyKarInertia(endEvent); // Átadjuk az endEvent-et
    } else {
      // Start auto scroll
      setTimeout(() => {
        karIsAutoScrolling = true;
        startKarAutoScroll();
      }, 600);
    }
  }
  
  function applyKarInertia(endEvent) {
    let velocity = 0;
    
    if (endEvent && endEvent.type === 'mouseup') {
      const endX = endEvent.clientX;
      // Calculate velocity based on last movement
      velocity = (karDragStartX - endX) * 0.15;
    }
    
    if (Math.abs(velocity) > 1) {
      let inertiaId = null;
      let deceleration = 0.92;
      
      function applyInertiaFrame() {
        velocity *= deceleration;
        karCurrentPosition += velocity;
        
        // Limit position to prevent empty space
        const maxPosition = 50;
        const minPosition = -(karOriginalItemsCount * karItemWidth * 1.5) + karCarousel.clientWidth;
        
        if (karCurrentPosition > maxPosition) {
          karCurrentPosition = maxPosition;
          velocity = 0;
        } else if (karCurrentPosition < minPosition) {
          karCurrentPosition = minPosition;
          velocity = 0;
        }
        
        karCarouselTrack.style.transform = `translateX(${karCurrentPosition}px)`;
        
        if (Math.abs(velocity) > 0.1) {
          inertiaId = requestAnimationFrame(applyInertiaFrame);
        } else {
          // Start auto scroll after inertia stops
          setTimeout(() => {
            karIsAutoScrolling = true;
            startKarAutoScroll();
          }, 500);
        }
      }
      
      applyInertiaFrame();
    } else {
      // Start auto scroll immediately if no inertia
      setTimeout(() => {
        karIsAutoScrolling = true;
        startKarAutoScroll();
      }, 500);
    }
  }
  
  // Add drag event listeners - KLIMAKAR SPECIFIKUS
  karCarouselTrack.addEventListener('mousedown', startKarDrag);
  karCarouselTrack.addEventListener('touchstart', startKarDrag, { passive: false });
  
  // Hover pause only on desktop - KLIMAKAR SPECIFIKUS
  if (!karIsTouchDevice) {
    karCarousel.addEventListener('mouseenter', () => {
      if (!karIsDragging) {
        stopKarAutoScroll();
        karIsAutoScrolling = false;
      }
    });
    
    karCarousel.addEventListener('mouseleave', () => {
      if (!karIsDragging) {
        setTimeout(() => {
          karIsAutoScrolling = true;
          startKarAutoScroll();
        }, 300);
      }
    });
  }
  
  // KÉP NAGYÍTÁS FUNKCIÓK - KLIMAKAR SPECIFIKUS
  function createKarZoomOverlay() {
    if (karZoomOverlay) return karZoomOverlay;
    
    const overlay = document.createElement('div');
    overlay.className = 'kar-image-zoom-overlay';
    
    overlay.innerHTML = `
      <button class="kar-close-zoom" title="Bezárás (ESC)">×</button>
      <button class="kar-zoom-nav prev" title="Előző kép (←)">‹</button>
      <button class="kar-zoom-nav next" title="Következő kép (→)">›</button>
      <div class="kar-zoomed-image-container">
        <img class="kar-zoomed-image" src="" alt="">
      </div>
      <div class="kar-image-counter">0/0</div>
    `;
    
    document.body.appendChild(overlay);
    karZoomOverlay = overlay;
    
    overlay.querySelector('.kar-close-zoom').addEventListener('click', karCloseZoom);
    overlay.querySelector('.kar-zoom-nav.prev').addEventListener('click', () => karShowPrevImage());
    overlay.querySelector('.kar-zoom-nav.next').addEventListener('click', () => karShowNextImage());
    
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        karCloseZoom();
      }
    });
    
    let touchStartX = 0;
    let touchStartTime = 0;
    
    overlay.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartTime = Date.now();
    }, { passive: true });
    
    overlay.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchDuration = Date.now() - touchStartTime;
      const deltaX = touchStartX - touchEndX;
      
      if (Math.abs(deltaX) > 50 && touchDuration < 300) {
        if (deltaX > 0) {
          karShowNextImage();
        } else {
          karShowPrevImage();
        }
      }
    }, { passive: true });
    
    return overlay;
  }
  
  function karOpenZoom(index) {
    if (!karZoomOverlay) createKarZoomOverlay();
    
    karCurrentZoomIndex = index;
    karUpdateZoomedImage();
    karZoomOverlay.classList.add('active');
    
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKarZoomKeyboard);
  }
  
  function karCloseZoom() {
    if (!karZoomOverlay) return;
    
    karZoomOverlay.classList.remove('active');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleKarZoomKeyboard);
  }
  
  function karUpdateZoomedImage() {
    if (!karZoomOverlay) return;
    
    // Csak az eredeti képek közül választunk
    const allKarImages = document.querySelectorAll('.kar-img-card img');
    const originalIndex = karCurrentZoomIndex % karOriginalItemsCount;
    
    // Biztonsági ellenőrzés
    if (allKarImages.length === 0) return;
    
    const imgIndex = originalIndex < allKarImages.length ? originalIndex : 0;
    const img = allKarImages[imgIndex];
    const zoomedImg = karZoomOverlay.querySelector('.kar-zoomed-image');
    const counter = karZoomOverlay.querySelector('.kar-image-counter');
    
    zoomedImg.style.opacity = '0';
    zoomedImg.src = img.src;
    zoomedImg.alt = img.alt;
    counter.textContent = `${karCurrentZoomIndex + 1}/${karOriginalItemsCount}`;
    
    if (zoomedImg.complete) {
      zoomedImg.style.opacity = '1';
    } else {
      zoomedImg.onload = () => {
        zoomedImg.style.opacity = '1';
      };
    }
  }
  
  function karShowNextImage() {
    karCurrentZoomIndex = (karCurrentZoomIndex + 1) % karOriginalItemsCount;
    karUpdateZoomedImage();
  }
  
  function karShowPrevImage() {
    karCurrentZoomIndex = (karCurrentZoomIndex - 1 + karOriginalItemsCount) % karOriginalItemsCount;
    karUpdateZoomedImage();
  }
  
  function handleKarZoomKeyboard(e) {
    if (!karZoomOverlay || !karZoomOverlay.classList.contains('active')) return;
    
    switch(e.key) {
      case 'Escape':
        karCloseZoom();
        break;
      case 'ArrowLeft':
        karShowPrevImage();
        break;
      case 'ArrowRight':
        karShowNextImage();
        break;
    }
  }
  
  // Sebesség beállítása - KLIMAKAR SPECIFIKUS
  function calculateKarScrollSpeed() {
    const screenWidth = window.innerWidth;
    
    if (screenWidth >= 5120) karAutoScrollSpeed = 0.5;
    else if (screenWidth >= 3840) karAutoScrollSpeed = 0.4;
    else if (screenWidth >= 3440) karAutoScrollSpeed = 0.35;
    else if (screenWidth >= 2560) karAutoScrollSpeed = 0.3;
    else if (screenWidth >= 1920) karAutoScrollSpeed = 0.25;
    else if (screenWidth <= 900) karAutoScrollSpeed = 0.2;
  }
  
  // Initialize - KLIMAKAR SPECIFIKUS
  calculateKarScrollSpeed();
  createKarZoomIcons();
  createKarZoomOverlay();
  
  // Várjunk egy kicsit, hogy biztosan betöltődjenek a képek, majd indítsuk az animációt
  setTimeout(() => {
    startKarAutoScroll();
  }, 300);
  
  window.addEventListener('resize', calculateKarScrollSpeed);
  
  // Handle window blur/focus for performance - KLIMAKAR SPECIFIKUS
  window.addEventListener('blur', () => {
    stopKarAutoScroll();
    karIsAutoScrolling = false;
  });
  
  window.addEventListener('focus', () => {
    if (!karIsDragging) {
      karIsAutoScrolling = true;
      startKarAutoScroll();
    }
  });
});