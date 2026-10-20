/**
 * ATHENA PHONE - Luxury OCA Glass Restoration Laboratory
 * 1. Before & After Screen Restoration Slider (Mouse, Touch, Pointer & Keyboard)
 * 2. Comprehensive DZD Savings Calculator (+180 Devices: iPhone 7->18 Pro Max, Samsung S/A/F/M/J, Redmi, POCO, Infinix, Realme, iPad, Apple Watch)
 * 3. Instant Global Search & Sub-Series Filter + Live Google Sheets Sync Engine
 * 4. 4-Step OCA Laboratory Process Interactive Simulator
 * 5. Apple Trade-In Style 3-Question Screen Diagnostic Quiz
 */

const ATHENA_WHATSAPP_NUMBER = '213540899574'; // 0540 89 95 74

/**
 * OPTIONAL: Paste your published Google Sheets CSV URL here (File -> Share -> Publish to web -> CSV)
 * When set (or configured via the footer modal), prices update online automatically whenever you edit Google Sheets!
 */
let GOOGLE_SHEET_CSV_URL = localStorage.getItem('athena_google_sheet_csv_url') || '';

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initBeforeAfterSlider();
  initSavingsCalculator();
  initOcaLabSimulator();
  initDiagnosticQuiz();
});

/* ==========================================================================
   0. MOBILE COMPACT HEADER AUTO HIDE/SHOW ON SCROLL
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById('mainAppHeader');
  if (!header) return;

  let lastScrollY = window.scrollY;
  window.addEventListener(
    'scroll',
    () => {
      const currentY = window.scrollY;
      if (currentY > 75 && currentY > lastScrollY) {
        header.classList.add('header-hidden');
      } else {
        header.classList.remove('header-hidden');
      }
      lastScrollY = currentY;
    },
    { passive: true }
  );
}

/* ==========================================================================
   1. INTERACTIVE BEFORE & AFTER SCREEN RESTORATION SLIDER
   ========================================================================== */
function initBeforeAfterSlider() {
  const viewport = document.getElementById('phoneComparisonViewport');
  const beforeLayer = document.getElementById('screenBeforeLayer');
  const laserLine = document.getElementById('sliderLaserLine');
  const laserFlare = document.getElementById('sliderLaserFlare');
  const handleBtn = document.getElementById('sliderHandleBtn');
  const readoutBadge = document.getElementById('sliderReadoutBadge');
  const presetButtons = document.querySelectorAll('[data-slider-preset]');

  if (!viewport || !beforeLayer || !laserLine || !handleBtn) return;

  let isDragging = false;
  let currentPercent = 50;

  function setSliderPosition(percent) {
    const clamped = Math.max(4, Math.min(96, Number(percent)));
    currentPercent = clamped;

    beforeLayer.style.clipPath = `inset(0 0 0 ${clamped}%)`;
    laserLine.style.left = `${clamped}%`;
    if (laserFlare) laserFlare.style.left = `${clamped}%`;
    handleBtn.style.left = `${clamped}%`;

    viewport.setAttribute('aria-valuenow', Math.round(clamped));
    if (readoutBadge) {
      readoutBadge.textContent = `OCA: ${Math.round(clamped)}%`;
    }
  }

  function updateFromClientX(clientX) {
    const rect = viewport.getBoundingClientRect();
    if (!rect.width) return;
    const rawPercent = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(rawPercent);
  }

  const startDrag = (clientX) => {
    isDragging = true;
    handleBtn.classList.add('dragging');
    updateFromClientX(clientX);
  };

  const moveDrag = (clientX) => {
    if (!isDragging) return;
    updateFromClientX(clientX);
  };

  const stopDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    handleBtn.classList.remove('dragging');
  };

  viewport.addEventListener('mousedown', (e) => {
    e.preventDefault();
    startDrag(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    moveDrag(e.clientX);
  });

  window.addEventListener('mouseup', stopDrag);

  viewport.addEventListener(
    'touchstart',
    (e) => {
      if (e.touches.length > 0) startDrag(e.touches[0].clientX);
    },
    { passive: true }
  );

  window.addEventListener(
    'touchmove',
    (e) => {
      if (!isDragging || e.touches.length === 0) return;
      moveDrag(e.touches[0].clientX);
    },
    { passive: true }
  );

  window.addEventListener('touchend', stopDrag);
  window.addEventListener('touchcancel', stopDrag);

  viewport.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition(currentPercent - 6);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition(currentPercent + 6);
    }
  });

  presetButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = Number(btn.getAttribute('data-slider-preset') || 50);
      animateSliderTo(target);
    });
  });

  function animateSliderTo(targetPercent) {
    const start = currentPercent;
    const diff = targetPercent - start;
    const duration = 380;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setSliderPosition(start + diff * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  setSliderPosition(50);
}

/* ==========================================================================
   2. COMPREHENSIVE DEVICE DATABASE (+180 MODELS)
   ========================================================================== */
const PHONE_DATABASE = {
  apple: [
    // iPhone 18 Series
    { id: 'ip18pm', subCategory: 'iphone', gen: '17_18', series: '18 & 17', name: 'iPhone 18 Pro Max', panel: 'LTPO Super Retina XDR OLED • 120Hz ProMotion', marketPrice: 160000, athenaPrice: 52000, time: '90 دقيقة' },
    { id: 'ip18p', subCategory: 'iphone', gen: '17_18', series: '18 & 17', name: 'iPhone 18 Pro', panel: 'LTPO Super Retina XDR OLED • 120Hz ProMotion', marketPrice: 145000, athenaPrice: 48000, time: '90 دقيقة' },
    { id: 'ip18plus', subCategory: 'iphone', gen: '17_18', series: '18 & 17', name: 'iPhone 18 Plus / Air', panel: 'Super Retina XDR OLED • 120Hz', marketPrice: 130000, athenaPrice: 42000, time: '90 دقيقة' },
    { id: 'ip18', subCategory: 'iphone', gen: '17_18', series: '18 & 17', name: 'iPhone 18', panel: 'Super Retina XDR OLED • 120Hz', marketPrice: 120000, athenaPrice: 38000, time: '90 دقيقة' },

    // iPhone 17 Series
    { id: 'ip17pm', subCategory: 'iphone', gen: '17_18', series: '18 & 17', name: 'iPhone 17 Pro Max', panel: 'LTPO Super Retina XDR OLED • 120Hz ProMotion', marketPrice: 130000, athenaPrice: 35500, time: '90 دقيقة' },
    { id: 'ip17p', subCategory: 'iphone', gen: '17_18', series: '18 & 17', name: 'iPhone 17 Pro', panel: 'LTPO Super Retina XDR OLED • 120Hz ProMotion', marketPrice: 110000, athenaPrice: 30000, time: '90 دقيقة' },
    { id: 'ip17air', subCategory: 'iphone', gen: '17_18', series: '18 & 17', name: 'iPhone 17 Air / Plus', panel: 'Super Retina XDR Slim OLED • 120Hz', marketPrice: 95000, athenaPrice: 26000, time: '90 دقيقة' },
    { id: 'ip17', subCategory: 'iphone', gen: '17_18', series: '18 & 17', name: 'iPhone 17', panel: 'Super Retina XDR OLED • 120Hz', marketPrice: 88000, athenaPrice: 24000, time: '60 - 90 دقيقة' },

    // iPhone 16 Series
    { id: 'ip16pm', subCategory: 'iphone', gen: '15_16', series: '16 & 15', name: 'iPhone 16 Pro Max', panel: 'LTPO Super Retina XDR OLED • 120Hz', marketPrice: 95000, athenaPrice: 27000, time: '90 دقيقة' },
    { id: 'ip16p', subCategory: 'iphone', gen: '15_16', series: '16 & 15', name: 'iPhone 16 Pro', panel: 'LTPO Super Retina XDR OLED • 120Hz', marketPrice: 85000, athenaPrice: 25000, time: '90 دقيقة' },
    { id: 'ip16plus', subCategory: 'iphone', gen: '15_16', series: '16 & 15', name: 'iPhone 16 Plus', panel: 'Super Retina XDR OLED • Ceramic Shield', marketPrice: 65000, athenaPrice: 18500, time: '60 - 90 دقيقة' },
    { id: 'ip16', subCategory: 'iphone', gen: '15_16', series: '16 & 15', name: 'iPhone 16', panel: 'Super Retina XDR OLED • Dynamic Island', marketPrice: 60000, athenaPrice: 17000, time: '60 - 90 دقيقة' },

    // iPhone 15 Series
    { id: 'ip15pm', subCategory: 'iphone', gen: '15_16', series: '16 & 15', name: 'iPhone 15 Pro Max', panel: 'LTPO Super Retina XDR OLED • 120Hz', marketPrice: 70000, athenaPrice: 19500, time: '60 - 90 دقيقة' },
    { id: 'ip15p', subCategory: 'iphone', gen: '15_16', series: '16 & 15', name: 'iPhone 15 Pro', panel: 'LTPO Super Retina XDR OLED • 120Hz', marketPrice: 62000, athenaPrice: 17500, time: '60 - 90 دقيقة' },
    { id: 'ip15plus', subCategory: 'iphone', gen: '15_16', series: '16 & 15', name: 'iPhone 15 Plus', panel: 'Super Retina XDR OLED • Dynamic Island', marketPrice: 52000, athenaPrice: 15000, time: '60 دقيقة' },
    { id: 'ip15', subCategory: 'iphone', gen: '15_16', series: '16 & 15', name: 'iPhone 15', panel: 'Super Retina XDR OLED • Dynamic Island', marketPrice: 48000, athenaPrice: 14000, time: '60 دقيقة' },

    // iPhone 14 Series
    { id: 'ip14pm', subCategory: 'iphone', gen: '13_14', series: '14 & 13', name: 'iPhone 14 Pro Max', panel: 'LTPO Super Retina XDR OLED • 120Hz', marketPrice: 65000, athenaPrice: 16000, time: '60 - 90 دقيقة' },
    { id: 'ip14p', subCategory: 'iphone', gen: '13_14', series: '14 & 13', name: 'iPhone 14 Pro', panel: 'LTPO Super Retina XDR OLED • 120Hz', marketPrice: 55000, athenaPrice: 12500, time: '60 دقيقة' },
    { id: 'ip14plus', subCategory: 'iphone', gen: '13_14', series: '14 & 13', name: 'iPhone 14 Plus', panel: 'Super Retina XDR OLED • True Tone', marketPrice: 42000, athenaPrice: 11000, time: '60 دقيقة' },
    { id: 'ip14', subCategory: 'iphone', gen: '13_14', series: '14 & 13', name: 'iPhone 14', panel: 'Super Retina XDR OLED • True Tone', marketPrice: 35000, athenaPrice: 9000, time: '60 دقيقة' },

    // iPhone 13 Series
    { id: 'ip13pm', subCategory: 'iphone', gen: '13_14', series: '14 & 13', name: 'iPhone 13 Pro Max', panel: 'Super Retina XDR OLED • 120Hz ProMotion', marketPrice: 52000, athenaPrice: 13500, time: '60 دقيقة' },
    { id: 'ip13p', subCategory: 'iphone', gen: '13_14', series: '14 & 13', name: 'iPhone 13 Pro', panel: 'Super Retina XDR OLED • 120Hz ProMotion', marketPrice: 48000, athenaPrice: 10500, time: '60 دقيقة' },
    { id: 'ip13', subCategory: 'iphone', gen: '13_14', series: '14 & 13', name: 'iPhone 13', panel: 'Super Retina XDR OLED • True Tone', marketPrice: 32000, athenaPrice: 8500, time: '60 دقيقة' },
    { id: 'ip13mini', subCategory: 'iphone', gen: '13_14', series: '14 & 13', name: 'iPhone 13 mini', panel: 'Super Retina XDR OLED • True Tone', marketPrice: 28000, athenaPrice: 8000, time: '60 دقيقة' },

    // iPhone 12 Series
    { id: 'ip12pm', subCategory: 'iphone', gen: '11_12', series: '12 & 11', name: 'iPhone 12 Pro Max', panel: 'Super Retina XDR OLED • True Tone', marketPrice: 32000, athenaPrice: 9500, time: '60 دقيقة' },
    { id: 'ip12p', subCategory: 'iphone', gen: '11_12', series: '12 & 11', name: 'iPhone 12 Pro', panel: 'Super Retina XDR OLED • True Tone', marketPrice: 28000, athenaPrice: 8000, time: '60 دقيقة' },
    { id: 'ip12', subCategory: 'iphone', gen: '11_12', series: '12 & 11', name: 'iPhone 12', panel: 'Super Retina XDR OLED • True Tone', marketPrice: 24000, athenaPrice: 7000, time: '60 دقيقة' },
    { id: 'ip12mini', subCategory: 'iphone', gen: '11_12', series: '12 & 11', name: 'iPhone 12 mini', panel: 'Super Retina XDR OLED • True Tone', marketPrice: 22000, athenaPrice: 6500, time: '60 دقيقة' },

    // iPhone 11 Series
    { id: 'ip11pm', subCategory: 'iphone', gen: '11_12', series: '12 & 11', name: 'iPhone 11 Pro Max', panel: 'Super Retina XDR OLED • True Tone', marketPrice: 32000, athenaPrice: 8500, time: '60 دقيقة' },
    { id: 'ip11p', subCategory: 'iphone', gen: '11_12', series: '12 & 11', name: 'iPhone 11 Pro', panel: 'Super Retina XDR OLED • True Tone', marketPrice: 28000, athenaPrice: 7000, time: '60 دقيقة' },
    { id: 'ip11', subCategory: 'iphone', gen: '11_12', series: '12 & 11', name: 'iPhone 11', panel: 'Liquid Retina HD Original • True Tone', marketPrice: 18000, athenaPrice: 4000, time: '45 - 60 دقيقة' },

    // iPhone X / XS / XR / SE / 8 / 7 Series
    { id: 'ipxsmax', subCategory: 'iphone', gen: 'x_older', series: 'X & 8 & 7', name: 'iPhone XS Max', panel: 'Super Retina OLED • 3D Touch', marketPrice: 18000, athenaPrice: 5500, time: '60 دقيقة' },
    { id: 'ipxs', subCategory: 'iphone', gen: 'x_older', series: 'X & 8 & 7', name: 'iPhone XS / iPhone X', panel: 'Super Retina OLED • 3D Touch', marketPrice: 15000, athenaPrice: 4500, time: '45 - 60 دقيقة' },
    { id: 'ipxr', subCategory: 'iphone', gen: 'x_older', series: 'X & 8 & 7', name: 'iPhone XR', panel: 'Liquid Retina HD Original • True Tone', marketPrice: 16000, athenaPrice: 3400, time: '45 - 60 دقيقة' },
    { id: 'ipse', subCategory: 'iphone', gen: 'x_older', series: 'X & 8 & 7', name: 'iPhone SE (2/3)', panel: 'Retina HD Original • Touch ID', marketPrice: 12000, athenaPrice: 3000, time: '45 دقيقة' },
    { id: 'ip8plus', subCategory: 'iphone', gen: 'x_older', series: 'X & 8 & 7', name: 'iPhone 8 Plus', panel: 'Retina HD 5.5" • True Tone', marketPrice: 13000, athenaPrice: 3000, time: '45 دقيقة' },
    { id: 'ip8', subCategory: 'iphone', gen: 'x_older', series: 'X & 8 & 7', name: 'iPhone 8', panel: 'Retina HD 4.7" • True Tone', marketPrice: 10000, athenaPrice: 2800, time: '45 دقيقة' },
    { id: 'ip7plus', subCategory: 'iphone', gen: 'x_older', series: 'X & 8 & 7', name: 'iPhone 7 Plus', panel: 'Retina HD 5.5" • 3D Touch', marketPrice: 9500, athenaPrice: 2800, time: '45 دقيقة' },
    { id: 'ip7', subCategory: 'iphone', gen: 'x_older', series: 'X & 8 & 7', name: 'iPhone 7', panel: 'Retina HD 4.7" • 3D Touch', marketPrice: 8000, athenaPrice: 2500, time: '45 دقيقة' },

    // Apple iPad
    { id: 'ipadprom4_13', subCategory: 'ipad', series: 'iPad Pro', name: 'iPad Pro 13" (M4 / 2024)', panel: 'Ultra Retina XDR Tandem OLED • 120Hz', marketPrice: 125000, athenaPrice: 36000, time: '2 - 3 ساعات' },
    { id: 'ipadprom4_11', subCategory: 'ipad', series: 'iPad Pro', name: 'iPad Pro 11" (M4 / 2024)', panel: 'Ultra Retina XDR Tandem OLED • 120Hz', marketPrice: 98000, athenaPrice: 29000, time: '2 - 3 ساعات' },
    { id: 'ipadpro129', subCategory: 'ipad', series: 'iPad Pro', name: 'iPad Pro 12.9" (M2 / M1 / 2020 / 2018)', panel: 'Liquid Retina XDR mini-LED • 120Hz', marketPrice: 82000, athenaPrice: 24000, time: '2 - 3 ساعات' },
    { id: 'ipadpro11', subCategory: 'ipad', series: 'iPad Pro', name: 'iPad Pro 11" (M2 / M1 / 2020 / 2018)', panel: 'Liquid Retina ProMotion • 120Hz', marketPrice: 64000, athenaPrice: 19000, time: '2 ساعات' },
    { id: 'ipadairm2', subCategory: 'ipad', series: 'iPad Air & mini', name: 'iPad Air 13" / 11" (M2 / Air 5 / Air 4)', panel: 'Liquid Retina Laminated • Apple Pencil', marketPrice: 52000, athenaPrice: 16000, time: '2 ساعات' },
    { id: 'ipadmini6', subCategory: 'ipad', series: 'iPad Air & mini', name: 'iPad mini 6 / iPad mini 5', panel: 'Liquid Retina True Tone Laminated', marketPrice: 42000, athenaPrice: 13500, time: '90 - 120 دقيقة' },
    { id: 'ipad10', subCategory: 'ipad', series: 'iPad Standard', name: 'iPad 10th Gen / 9th Gen / 8th Gen / 7th Gen', panel: 'Liquid Retina / Retina Display', marketPrice: 28000, athenaPrice: 9500, time: '90 دقيقة' },

    // Apple Watch
    { id: 'awultra2', subCategory: 'watch', series: 'Watch Ultra', name: 'Apple Watch Ultra 2 / Ultra 1 (49mm)', panel: 'LTPO2 OLED Always-On • Flat Sapphire Crystal', marketPrice: 55000, athenaPrice: 16500, time: '90 دقيقة' },
    { id: 'aws10', subCategory: 'watch', series: 'Watch Series', name: 'Apple Watch Series 10 (46mm / 42mm)', panel: 'Wide-Angle LTPO3 OLED • Curved Ion-X / Sapphire', marketPrice: 46000, athenaPrice: 14000, time: '90 دقيقة' },
    { id: 'aws9', subCategory: 'watch', series: 'Watch Series', name: 'Apple Watch Series 9 / Series 8 (45mm / 41mm)', panel: 'Always-On Retina LTPO OLED • Waterproof Seal', marketPrice: 38000, athenaPrice: 11500, time: '90 دقيقة' },
    { id: 'aws7', subCategory: 'watch', series: 'Watch Series', name: 'Apple Watch Series 7 (45mm / 41mm)', panel: 'Always-On Retina LTPO OLED', marketPrice: 32000, athenaPrice: 9500, time: '90 دقيقة' },
    { id: 'aws6', subCategory: 'watch', series: 'Watch Series', name: 'Apple Watch Series 6 / SE 2 / SE (44mm / 40mm)', panel: 'Retina LTPO OLED • Force Touch', marketPrice: 25000, athenaPrice: 7500, time: '60 - 90 دقيقة' },
    { id: 'aws5', subCategory: 'watch', series: 'Watch Series', name: 'Apple Watch Series 5 / Series 4 (44mm / 40mm)', panel: 'Retina LTPO OLED', marketPrice: 19500, athenaPrice: 6000, time: '60 - 90 دقيقة' }
  ],

  samsung: [
    // Serie S & Note (Curved & Flagship)
    { id: 's25u', subCategory: 's_note', series: 'Serie S & Note', name: 'Galaxy S25 Ultra', panel: 'Dynamic LTPO AMOLED 2X • 120Hz Gorilla Armor', marketPrice: 74000, athenaPrice: 21000, time: '90 دقيقة' },
    { id: 's25plus', subCategory: 's_note', series: 'Serie S & Note', name: 'Galaxy S25+ / S25', panel: 'Dynamic LTPO AMOLED 2X • 120Hz', marketPrice: 54000, athenaPrice: 15500, time: '60 - 90 دقيقة' },
    { id: 's24u', subCategory: 's_note', series: 'Serie S & Note', name: 'Galaxy S24 Ultra', panel: 'Dynamic LTPO AMOLED 2X • 120Hz Anti-Glare', marketPrice: 64000, athenaPrice: 18000, time: '90 دقيقة' },
    { id: 's24plus', subCategory: 's_note', series: 'Serie S & Note', name: 'Galaxy S24+ / S24', panel: 'Dynamic LTPO AMOLED 2X • 120Hz', marketPrice: 44000, athenaPrice: 12500, time: '60 - 90 دقيقة' },
    { id: 's24fe', subCategory: 's_note', series: 'Serie S & Note', name: 'Galaxy S24 FE / S23 FE', panel: 'Dynamic AMOLED 2X • 120Hz', marketPrice: 34000, athenaPrice: 10000, time: '60 دقيقة' },
    { id: 's23u', subCategory: 's_note', series: 'Serie S & Note', name: 'Galaxy S23 Ultra', panel: 'Dynamic AMOLED 2X Curved • 120Hz S-Pen', marketPrice: 54000, athenaPrice: 15500, time: '90 دقيقة' },
    { id: 's23plus', subCategory: 's_note', series: 'Serie S & Note', name: 'Galaxy S23+ / S23', panel: 'Dynamic AMOLED 2X • 120Hz', marketPrice: 39000, athenaPrice: 11000, time: '60 دقيقة' },
    { id: 's22u', subCategory: 's_note', series: 'Serie S & Note', name: 'Galaxy S22 Ultra', panel: 'Dynamic AMOLED 2X Curved • 120Hz S-Pen', marketPrice: 46000, athenaPrice: 13500, time: '90 دقيقة' },
    { id: 's22plus', subCategory: 's_note', series: 'Serie S & Note', name: 'Galaxy S22+ / S22', panel: 'Dynamic AMOLED 2X • 120Hz', marketPrice: 33000, athenaPrice: 9500, time: '60 دقيقة' },
    { id: 's21u', subCategory: 's_note', series: 'Serie S & Note', name: 'Galaxy S21 Ultra', panel: 'Dynamic AMOLED 2X Curved • 120Hz', marketPrice: 40000, athenaPrice: 12000, time: '90 دقيقة' },
    { id: 's21plus', subCategory: 's_note', series: 'Serie S & Note', name: 'Galaxy S21+ / S21 / S21 FE', panel: 'Dynamic AMOLED 2X • 120Hz', marketPrice: 29000, athenaPrice: 8500, time: '60 دقيقة' },
    { id: 's20u', subCategory: 's_note', series: 'Serie S & Note', name: 'Galaxy S20 Ultra / S20+ / S20', panel: 'Dynamic AMOLED 2X Curved • 120Hz', marketPrice: 34000, athenaPrice: 10500, time: '90 دقيقة' },
    { id: 's20fe', subCategory: 's_note', series: 'Serie S & Note', name: 'Galaxy S20 FE', panel: 'Super AMOLED • 120Hz Flat', marketPrice: 23000, athenaPrice: 7000, time: '60 دقيقة' },
    { id: 's10plus', subCategory: 's_note', series: 'Serie S & Note', name: 'Galaxy S10+ / S10 / S10e', panel: 'Dynamic AMOLED Curved • Ultrasonic FP', marketPrice: 28000, athenaPrice: 9000, time: '90 دقيقة' },
    { id: 's9plus', subCategory: 's_note', series: 'Serie S & Note', name: 'Galaxy S9+ / S9 / S8+ / S8', panel: 'Super AMOLED Curved Edge', marketPrice: 21000, athenaPrice: 7500, time: '90 دقيقة' },
    { id: 'note20u', subCategory: 's_note', series: 'Serie S & Note', name: 'Galaxy Note 20 Ultra / Note 20', panel: 'Dynamic AMOLED 2X Curved • 120Hz S-Pen', marketPrice: 44000, athenaPrice: 13000, time: '90 دقيقة' },
    { id: 'note10plus', subCategory: 's_note', series: 'Serie S & Note', name: 'Galaxy Note 10+ / Note 10', panel: 'Dynamic AMOLED Curved • S-Pen', marketPrice: 34000, athenaPrice: 10500, time: '90 دقيقة' },
    { id: 'note9', subCategory: 's_note', series: 'Serie S & Note', name: 'Galaxy Note 9 / Note 8', panel: 'Super AMOLED Curved • S-Pen', marketPrice: 24000, athenaPrice: 8000, time: '90 دقيقة' },

    // Serie Galaxy A & M & F & J
    { id: 'a73', subCategory: 'a_m', series: 'Galaxy A', name: 'Galaxy A73 5G / A72 / A71 / A70', panel: 'Super AMOLED Plus • 120Hz', marketPrice: 26000, athenaPrice: 7500, time: '60 دقيقة' },
    { id: 'a55', subCategory: 'a_m', series: 'Galaxy A', name: 'Galaxy A55 5G / A54 5G', panel: 'Super AMOLED • 120Hz Vision Booster', marketPrice: 22500, athenaPrice: 6500, time: '60 دقيقة' },
    { id: 'a53', subCategory: 'a_m', series: 'Galaxy A', name: 'Galaxy A53 5G / A52s / A52', panel: 'Super AMOLED • 120Hz Optical FP', marketPrice: 20000, athenaPrice: 6000, time: '60 دقيقة' },
    { id: 'a51', subCategory: 'a_m', series: 'Galaxy A', name: 'Galaxy A51 / A50 / A50s', panel: 'Super AMOLED Infinity-O / U', marketPrice: 15500, athenaPrice: 5000, time: '60 دقيقة' },
    { id: 'a35', subCategory: 'a_m', series: 'Galaxy A', name: 'Galaxy A35 5G / A34 5G', panel: 'Super AMOLED • 120Hz', marketPrice: 19500, athenaPrice: 5800, time: '60 دقيقة' },
    { id: 'a33', subCategory: 'a_m', series: 'Galaxy A', name: 'Galaxy A33 5G / A32 / A31 / A30', panel: 'Super AMOLED • 90Hz', marketPrice: 16500, athenaPrice: 5000, time: '60 دقيقة' },
    { id: 'a25', subCategory: 'a_m', series: 'Galaxy A', name: 'Galaxy A25 5G / A24', panel: 'Super AMOLED • 120Hz / 90Hz', marketPrice: 17000, athenaPrice: 5200, time: '60 دقيقة' },
    { id: 'a23', subCategory: 'a_m', series: 'Galaxy A', name: 'Galaxy A23 / A22 / A21s / A20', panel: 'Samsung Original Display', marketPrice: 13500, athenaPrice: 4200, time: '45 - 60 دقيقة' },
    { id: 'a16', subCategory: 'a_m', series: 'Galaxy A', name: 'Galaxy A16 / A15', panel: 'Super AMOLED • 90Hz', marketPrice: 15500, athenaPrice: 4800, time: '60 دقيقة' },
    { id: 'a14', subCategory: 'a_m', series: 'Galaxy A', name: 'Galaxy A14 / A13 / A12 / A11 / A10s', panel: 'PLS LCD / Infinity-V Original', marketPrice: 10500, athenaPrice: 3500, time: '45 دقيقة' },
    { id: 'a05s', subCategory: 'a_m', series: 'Galaxy A', name: 'Galaxy A06 / A05s / A04s / A03s / A02s', panel: 'Original Samsung Panel', marketPrice: 9500, athenaPrice: 3200, time: '45 دقيقة' },
    { id: 'm55', subCategory: 'a_m', series: 'Galaxy M & F', name: 'Galaxy M55 / M54 / M53 / M52 5G', panel: 'Super AMOLED Plus • 120Hz', marketPrice: 23000, athenaPrice: 6800, time: '60 دقيقة' },
    { id: 'm51', subCategory: 'a_m', series: 'Galaxy M & F', name: 'Galaxy M51 / M34 / M33 / M32 / M31', panel: 'Super AMOLED • 120Hz / 90Hz', marketPrice: 18000, athenaPrice: 5500, time: '60 دقيقة' },
    { id: 'm21', subCategory: 'a_m', series: 'Galaxy M & F', name: 'Galaxy M21 / M14 / M13 / M12 / M11', panel: 'Samsung Original Display', marketPrice: 12000, athenaPrice: 3800, time: '45 - 60 دقيقة' },
    { id: 'f54', subCategory: 'a_m', series: 'Galaxy M & F', name: 'Galaxy F54 5G / F34 5G / F23', panel: 'Super AMOLED Plus • 120Hz', marketPrice: 21000, athenaPrice: 6200, time: '60 دقيقة' },
    { id: 'f15', subCategory: 'a_m', series: 'Galaxy M & F', name: 'Galaxy F15 / F14 / F13 / F12', panel: 'Super AMOLED / PLS Original', marketPrice: 13000, athenaPrice: 4000, time: '45 - 60 دقيقة' },
    { id: 'j8', subCategory: 'a_m', series: 'Galaxy J', name: 'Galaxy J8 / J7 Pro / J7 Core', panel: 'Super AMOLED Original', marketPrice: 11500, athenaPrice: 3800, time: '45 دقيقة' },
    { id: 'j7prime', subCategory: 'a_m', series: 'Galaxy J', name: 'Galaxy J7 Prime / J6+ / J6', panel: 'Samsung Original Display', marketPrice: 9500, athenaPrice: 3200, time: '45 دقيقة' },
    { id: 'j5pro', subCategory: 'a_m', series: 'Galaxy J', name: 'Galaxy J5 Pro / J4+ / J4', panel: 'Super AMOLED / TFT Original', marketPrice: 8500, athenaPrice: 3000, time: '45 دقيقة' },

    // تابلت Samsung Tab
    { id: 'tabs9u', subCategory: 'tab', series: 'Samsung Tab S', name: 'Galaxy Tab S9 Ultra / S9+ / S9', panel: 'Dynamic AMOLED 2X • 120Hz S-Pen', marketPrice: 78000, athenaPrice: 23000, time: '2 - 3 ساعات' },
    { id: 'tabs8u', subCategory: 'tab', series: 'Samsung Tab S', name: 'Galaxy Tab S8 Ultra / S8+ / S8', panel: 'Super AMOLED / TFT • 120Hz', marketPrice: 62000, athenaPrice: 19000, time: '2 ساعات' },
    { id: 'tabs7p', subCategory: 'tab', series: 'Samsung Tab S', name: 'Galaxy Tab S7+ / S7 / S7 FE', panel: 'Super AMOLED • 120Hz S-Pen', marketPrice: 48000, athenaPrice: 15000, time: '2 ساعات' },
    { id: 'taba9p', subCategory: 'tab', series: 'Samsung Tab A', name: 'Galaxy Tab A9+ / A9 / A8 10.5"', panel: 'TFT Original Display • Wide Screen', marketPrice: 22000, athenaPrice: 7500, time: '90 دقيقة' },
    { id: 'taba7', subCategory: 'tab', series: 'Samsung Tab A', name: 'Galaxy Tab A7 / A7 Lite', panel: 'Samsung Original Display', marketPrice: 16000, athenaPrice: 6000, time: '90 دقيقة' }
  ],

  xiaomi_poco: [
    // Xiaomi Flagship
    { id: 'xm14u', subCategory: 'flagship', series: 'Xiaomi Flagship', name: 'Xiaomi 14 Ultra / 14 Pro / 14', panel: 'LTPO AMOLED Curved • 120Hz Dolby Vision', marketPrice: 48000, athenaPrice: 14500, time: '90 دقيقة' },
    { id: 'xm14tp', subCategory: 'flagship', series: 'Xiaomi Flagship', name: 'Xiaomi 14T Pro / 14T / 13T Pro / 13T', panel: 'CrystalRes AMOLED • 144Hz', marketPrice: 34000, athenaPrice: 10000, time: '60 - 90 دقيقة' },
    { id: 'xm13p', subCategory: 'flagship', series: 'Xiaomi Flagship', name: 'Xiaomi 13 Pro / 13 / 12T Pro / 12 Pro', panel: 'AMOLED 120Hz • Harman Edition', marketPrice: 32000, athenaPrice: 9500, time: '60 - 90 دقيقة' },

    // Redmi Note Series
    { id: 'rn14pp', subCategory: 'redmi_note', series: 'Redmi Note', name: 'Redmi Note 14 Pro+ 5G / Note 14 Pro', panel: 'Curved 1.5K AMOLED • 120Hz Gorilla Victus 2', marketPrice: 28000, athenaPrice: 8500, time: '60 - 90 دقيقة' },
    { id: 'rn13pp', subCategory: 'redmi_note', series: 'Redmi Note', name: 'Redmi Note 13 Pro+ 5G', panel: 'Curved CrystalRes AMOLED • 120Hz', marketPrice: 26000, athenaPrice: 8000, time: '60 - 90 دقيقة' },
    { id: 'rn13p', subCategory: 'redmi_note', series: 'Redmi Note', name: 'Redmi Note 13 Pro / Note 13', panel: 'AMOLED • 120Hz Ultra-Thin Bezel', marketPrice: 20000, athenaPrice: 6000, time: '60 دقيقة' },
    { id: 'rn12pp', subCategory: 'redmi_note', series: 'Redmi Note', name: 'Redmi Note 12 Pro+ / Note 12 Pro / Note 12', panel: 'Flow AMOLED • 120Hz', marketPrice: 18500, athenaPrice: 5800, time: '60 دقيقة' },
    { id: 'rn11p', subCategory: 'redmi_note', series: 'Redmi Note', name: 'Redmi Note 11 Pro+ / Note 11 Pro / Note 11', panel: 'Super AMOLED • 120Hz / 90Hz', marketPrice: 16500, athenaPrice: 5200, time: '60 دقيقة' },
    { id: 'rn10p', subCategory: 'redmi_note', series: 'Redmi Note', name: 'Redmi Note 10 Pro / Note 10S / Note 10', panel: 'AMOLED • 120Hz DotDisplay', marketPrice: 15500, athenaPrice: 4800, time: '60 دقيقة' },
    { id: 'rn9p', subCategory: 'redmi_note', series: 'Redmi Note', name: 'Redmi Note 9 Pro / Note 9 / Note 8 Pro / Note 8', panel: 'DotDisplay Original Gorilla Glass', marketPrice: 11500, athenaPrice: 3800, time: '45 - 60 دقيقة' },
    { id: 'r14c', subCategory: 'redmi_note', series: 'Redmi C & Number', name: 'Redmi 14C / Redmi 13C / Redmi 13', panel: '90Hz / 120Hz DotDrop Original', marketPrice: 11000, athenaPrice: 3500, time: '45 دقيقة' },
    { id: 'r12', subCategory: 'redmi_note', series: 'Redmi C & Number', name: 'Redmi 12 / 12C / Redmi 10 / 10C', panel: 'FHD+ / HD+ Original Panel', marketPrice: 10000, athenaPrice: 3300, time: '45 دقيقة' },
    { id: 'r9', subCategory: 'redmi_note', series: 'Redmi C & Number', name: 'Redmi 9 / 9C / 9A / 9T', panel: 'Xiaomi Original Display', marketPrice: 9000, athenaPrice: 3000, time: '45 دقيقة' },

    // POCO Series
    { id: 'pocof6p', subCategory: 'poco', series: 'POCO F', name: 'POCO F6 Pro / POCO F6', panel: 'WQHD+ Flow AMOLED • 120Hz', marketPrice: 26000, athenaPrice: 8000, time: '60 دقيقة' },
    { id: 'pocof5p', subCategory: 'poco', series: 'POCO F', name: 'POCO F5 Pro / POCO F5', panel: 'Flow AMOLED • 120Hz Dolby Vision', marketPrice: 23000, athenaPrice: 7000, time: '60 دقيقة' },
    { id: 'pocof4', subCategory: 'poco', series: 'POCO F', name: 'POCO F4 GT / POCO F4 / POCO F3', panel: 'E4 AMOLED • 120Hz Gaming Touch', marketPrice: 20000, athenaPrice: 6200, time: '60 دقيقة' },
    { id: 'pocox6p', subCategory: 'poco', series: 'POCO X', name: 'POCO X6 Pro 5G / POCO X6 5G', panel: 'CrystalRes 1.5K Flow AMOLED • 120Hz', marketPrice: 22500, athenaPrice: 6800, time: '60 دقيقة' },
    { id: 'pocox5p', subCategory: 'poco', series: 'POCO X', name: 'POCO X5 Pro 5G / POCO X5 / X4 Pro', panel: 'Flow AMOLED • 120Hz', marketPrice: 18500, athenaPrice: 5800, time: '60 دقيقة' },
    { id: 'pocox3p', subCategory: 'poco', series: 'POCO X', name: 'POCO X3 Pro / X3 GT / X3 NFC', panel: '120Hz DotDisplay Gorilla Glass 6', marketPrice: 13500, athenaPrice: 4200, time: '45 - 60 دقيقة' },
    { id: 'pocom6p', subCategory: 'poco', series: 'POCO M & C', name: 'POCO M6 Pro / M5s / M4 Pro / C65', panel: 'Flow AMOLED / 90Hz Original', marketPrice: 15500, athenaPrice: 4800, time: '60 دقيقة' }
  ],

  other: [
    // Infinix
    { id: 'infz40', subCategory: 'infinix', series: 'Infinix Zero & GT', name: 'Infinix Zero 40 5G / Zero 30 5G / Zero Ultra', panel: '3D Curved AMOLED • 144Hz Gorilla Glass', marketPrice: 25000, athenaPrice: 7800, time: '60 - 90 دقيقة' },
    { id: 'infgt20', subCategory: 'infinix', series: 'Infinix Zero & GT', name: 'Infinix GT 20 Pro / GT 10 Pro', panel: 'AMOLED Gaming • 144Hz', marketPrice: 22000, athenaPrice: 6800, time: '60 دقيقة' },
    { id: 'infn40p', subCategory: 'infinix', series: 'Infinix Note', name: 'Infinix Note 40 Pro+ / Note 40 Pro / Note 40', panel: '3D Curved / Flat AMOLED • 120Hz', marketPrice: 23000, athenaPrice: 7000, time: '60 - 90 دقيقة' },
    { id: 'infn30vip', subCategory: 'infinix', series: 'Infinix Note', name: 'Infinix Note 30 VIP / Note 30 Pro / Note 30', panel: 'AMOLED / 120Hz Eye-Care Display', marketPrice: 17500, athenaPrice: 5500, time: '60 دقيقة' },
    { id: 'infn12vip', subCategory: 'infinix', series: 'Infinix Note', name: 'Infinix Note 12 VIP / Note 12 G96', panel: 'AMOLED • 120Hz', marketPrice: 15500, athenaPrice: 4800, time: '60 دقيقة' },
    { id: 'infhot50', subCategory: 'infinix', series: 'Infinix Hot & Smart', name: 'Infinix Hot 50 Pro+ / Hot 40 Pro / Hot 40i', panel: 'Curved AMOLED / 120Hz Original', marketPrice: 14500, athenaPrice: 4500, time: '45 - 60 دقيقة' },
    { id: 'infhot30', subCategory: 'infinix', series: 'Infinix Hot & Smart', name: 'Infinix Hot 30 / Hot 20 / Smart 8', panel: '90Hz High-Brightness Original', marketPrice: 10500, athenaPrice: 3500, time: '45 دقيقة' },

    // Realme
    { id: 'rmgt6', subCategory: 'realme', series: 'Realme GT', name: 'Realme GT 6 / GT Neo 6 / GT Neo 5', panel: 'LTPO AMOLED • 144Hz / 120Hz 6000nits', marketPrice: 29000, athenaPrice: 9000, time: '60 - 90 دقيقة' },
    { id: 'rm13pp', subCategory: 'realme', series: 'Realme Number Pro', name: 'Realme 13 Pro+ / 12 Pro+ / 12 Pro', panel: 'Curved Vision AMOLED • 120Hz', marketPrice: 26000, athenaPrice: 8000, time: '60 - 90 دقيقة' },
    { id: 'rm11pp', subCategory: 'realme', series: 'Realme Number Pro', name: 'Realme 11 Pro+ / 11 Pro / 10 Pro+', panel: 'Curved Vision AMOLED • 120Hz', marketPrice: 23000, athenaPrice: 7200, time: '60 - 90 دقيقة' },
    { id: 'rm11', subCategory: 'realme', series: 'Realme Number & C', name: 'Realme 12+ / Realme 11 / Realme 10 / 9 Pro+', panel: 'Super AMOLED • 90Hz / 120Hz', marketPrice: 17500, athenaPrice: 5500, time: '60 دقيقة' },
    { id: 'rmc67', subCategory: 'realme', series: 'Realme Number & C', name: 'Realme C67 / C55 / C53 / C35', panel: '90Hz Mini-Capsule Original Display', marketPrice: 11500, athenaPrice: 3600, time: '45 دقيقة' }
  ]
};

/* ==========================================================================
   3. SAVINGS CALCULATOR, 2-TIER SUB-FILTERS, SEARCH & SHEETS ENGINE
   ========================================================================== */

const BRAND_SUB_FILTERS = {
  apple: [
    { key: 'iphone', label: 'هواتف iPhone 📱' },
    { key: 'ipad', label: 'Apple iPad 💻' },
    { key: 'watch', label: 'Apple Watch ⌚' }
  ],
  samsung: [
    { key: 'ALL', label: 'الكل' },
    { key: 's_note', label: 'سلسلة S & Note & Ultra (Curved)' },
    { key: 'a_m', label: 'سلسلة Galaxy A & M' },
    { key: 'tab', label: 'تابلت Samsung Tab' }
  ],
  xiaomi_poco: [
    { key: 'ALL', label: 'الكل' },
    { key: 'redmi_note', label: 'Redmi Note' },
    { key: 'poco', label: 'POCO Series' },
    { key: 'flagship', label: 'Xiaomi Flagship' }
  ],
  other: [
    { key: 'ALL', label: 'الكل' },
    { key: 'infinix', label: 'Infinix' },
    { key: 'realme', label: 'Realme' }
  ]
};

const IPHONE_GENERATION_PILLS = [
  { key: 'ALL', label: 'كل الأجيال' },
  { key: '17_18', label: '17 & 18' },
  { key: '15_16', label: '15 & 16' },
  { key: '13_14', label: '13 & 14' },
  { key: '11_12', label: '11 & 12' },
  { key: 'x_older', label: 'X & أقدم' }
];

function initSavingsCalculator() {
  const brandButtons = document.querySelectorAll('#brandTabsContainer .brand-tab');
  const subSeriesWrapper = document.getElementById('subSeriesFilterWrapper');
  const subSeriesContainer = document.getElementById('subSeriesPillsContainer');
  const iphoneGenWrapper = document.getElementById('iphoneGenFilterWrapper');
  const iphoneGenContainer = document.getElementById('iphoneGenPillsContainer');
  const searchInput = document.getElementById('globalModelSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const modelDropdown = document.getElementById('modelSelectDropdown');
  const modelQuickGrid = document.getElementById('modelQuickGrid');
  const modelCountBadge = document.getElementById('modelCountBadge');
  const branchButtons = document.querySelectorAll('#branchSelectorGroup .branch-select-btn');
  const quickBookBranchBtns = document.querySelectorAll('.quick-book-branch-btn');
  const jumpBrandBtns = document.querySelectorAll('.jump-calc-btn');

  // Output DOM Elements
  const elModelName = document.getElementById('calcSelectedModelName');
  const elPanelType = document.getElementById('calcSelectedPanelType');
  const elRepairTime = document.getElementById('calcRepairTime');
  const elMarketPrice = document.getElementById('calcMarketPrice');
  const elAthenaPrice = document.getElementById('calcAthenaPrice');
  const elSavedAmount = document.getElementById('calcSavedAmount');
  const elSavingPercentBadge = document.getElementById('calcSavingPercentBadge');
  const elProgressBar = document.getElementById('calcProgressBar');
  const elWhatsappPreview = document.getElementById('whatsappPreviewBox');
  const elWhatsappBtn = document.getElementById('whatsappBookingBtn');
  const copyBtn = document.getElementById('copyBookingTextBtn');
  const sheetStatusBadge = document.getElementById('sheetSyncStatusBadge');

  if (!modelDropdown || !elSavedAmount) return;

  let currentBrand = 'apple';
  let currentSubCategory = 'iphone';
  let currentIphoneGen = 'ALL';
  let currentModel = PHONE_DATABASE.apple[12]; // Default: iPhone 15 Pro Max
  let currentBranch = 'سوق بيلفور (الحراش)';
  let previousSavedVal = 50500;

  function formatDZD(num) {
    return Number(num).toLocaleString('en-US');
  }

  function animateValue(element, start, end, duration = 420) {
    if (!element) return;
    const startTime = performance.now();
    const diff = end - start;

    function tick(now) {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + diff * eased);
      element.textContent = formatDZD(current);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function getAllModelsFlat() {
    const list = [];
    Object.keys(PHONE_DATABASE).forEach((brandKey) => {
      PHONE_DATABASE[brandKey].forEach((m) => {
        list.push({ ...m, brandKey });
      });
    });
    return list;
  }

  function renderSubFilters() {
    if (!subSeriesContainer || !subSeriesWrapper) return;
    const filterList = BRAND_SUB_FILTERS[currentBrand] || [];

    subSeriesWrapper.classList.remove('hidden');

    subSeriesContainer.innerHTML = filterList
      .map((f) => {
        const isActive = f.key === currentSubCategory;
        return `<button type="button" data-sub="${f.key}" class="subseries-pill ${
          isActive ? 'active' : ''
        } px-3.5 py-1.5 rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-slate-300 hover:text-white shrink-0 whitespace-nowrap transition cursor-pointer">${f.label}</button>`;
      })
      .join('');

    subSeriesContainer.querySelectorAll('.subseries-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        currentSubCategory = pill.getAttribute('data-sub') || (currentBrand === 'apple' ? 'iphone' : 'ALL');
        currentIphoneGen = 'ALL';
        renderSubFilters();
        renderModelsList();
      });
    });

    // iPhone Generations Pill Row
    const isIphoneActive = currentBrand === 'apple' && currentSubCategory === 'iphone';
    if (iphoneGenWrapper && iphoneGenContainer) {
      if (isIphoneActive) {
        iphoneGenWrapper.classList.remove('hidden');
        iphoneGenContainer.innerHTML = IPHONE_GENERATION_PILLS
          .map((g) => {
            const isActive = g.key === currentIphoneGen;
            return `<button type="button" data-gen="${g.key}" class="gen-pill ${
              isActive ? 'active' : ''
            } px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 text-[11px] font-bold text-slate-300 hover:text-white shrink-0 whitespace-nowrap transition cursor-pointer">${g.label}</button>`;
          })
          .join('');

        iphoneGenContainer.querySelectorAll('.gen-pill').forEach((btn) => {
          btn.addEventListener('click', () => {
            currentIphoneGen = btn.getAttribute('data-gen') || 'ALL';
            iphoneGenContainer.querySelectorAll('.gen-pill').forEach((b) => {
              b.classList.toggle('active', b.getAttribute('data-gen') === currentIphoneGen);
            });
            renderModelsList();
          });
        });
      } else {
        iphoneGenWrapper.classList.add('hidden');
      }
    }
  }

  function renderModelsList(selectedModelId = null, searchQuery = '') {
    const trimmedSearch = searchQuery.trim().toLowerCase();
    let models = [];

    if (trimmedSearch.length > 0) {
      // Global search across ALL brands & models
      if (subSeriesWrapper) subSeriesWrapper.classList.add('hidden');
      models = getAllModelsFlat().filter(
        (m) =>
          m.name.toLowerCase().includes(trimmedSearch) ||
          (m.series && m.series.toLowerCase().includes(trimmedSearch)) ||
          (m.subCategory && m.subCategory.toLowerCase().includes(trimmedSearch))
      );
    } else {
      if (subSeriesWrapper) subSeriesWrapper.classList.remove('hidden');
      const brandModels = PHONE_DATABASE[currentBrand] || PHONE_DATABASE.apple || [];

      if (currentSubCategory === 'ALL') {
        models = brandModels;
      } else {
        models = brandModels.filter((m) => m.subCategory === currentSubCategory);
      }

      if (currentBrand === 'apple' && currentSubCategory === 'iphone' && currentIphoneGen !== 'ALL') {
        models = models.filter((m) => m.gen === currentIphoneGen);
      }
    }

    if (modelCountBadge) {
      modelCountBadge.textContent = `${models.length} موديل متوفر`;
    }

    if (models.length === 0) {
      modelDropdown.innerHTML = `<option value="">لم يتم العثور على موديل مطابق — تواصل معنا عبر واتساب</option>`;
      if (modelQuickGrid) {
        modelQuickGrid.innerHTML = `<div class="col-span-full text-center py-6 text-xs text-slate-400">لم تجد اسم جهازك؟ جميع الشاشات متوفرة! اضغط على زر واتساب بالأسفل للاستفسار المباشر.</div>`;
      }
      return;
    }

    modelDropdown.innerHTML = models
      .map(
        (m) =>
          `<option value="${m.id}">${m.name} — تجديد OCA: ${formatDZD(m.athenaPrice)} د.ج</option>`
      )
      .join('');

    const activeModel =
      models.find((m) => m.id === selectedModelId) ||
      models.find((m) => m.id === currentModel?.id) ||
      models[0];

    currentModel = activeModel;
    modelDropdown.value = activeModel.id;

    if (modelQuickGrid) {
      modelQuickGrid.innerHTML = models
        .map((m) => {
          const isActive = m.id === activeModel.id;
          return `
            <button type="button" data-model-id="${m.id}" class="model-option-btn ${
            isActive ? 'active' : ''
          } rounded-xl p-2.5 border border-white/10 bg-white/5 text-right transition hover:border-gold/50 cursor-pointer">
              <div class="font-en text-xs font-bold text-white truncate">${m.name}</div>
              <div class="flex items-center justify-between mt-1">
                <span class="text-[11px] text-amber-300 font-en font-bold">${formatDZD(
                  m.athenaPrice
                )} DZD</span>
                <span class="text-[9px] text-slate-400 font-en">${m.series || ''}</span>
              </div>
            </button>
          `;
        })
        .join('');

      modelQuickGrid.querySelectorAll('.model-option-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-model-id');
          selectModelById(id);
        });
      });
    }

    updateCalculationDisplay();
  }

  function selectModelById(modelId) {
    const allModels = getAllModelsFlat();
    const found = allModels.find((m) => m.id === modelId);
    if (!found) return;

    currentModel = found;
    modelDropdown.value = found.id;

    if (modelQuickGrid) {
      modelQuickGrid.querySelectorAll('.model-option-btn').forEach((btn) => {
        btn.classList.toggle(
          'active',
          btn.getAttribute('data-model-id') === found.id
        );
      });
    }

    updateCalculationDisplay();
  }

  function updateCalculationDisplay() {
    if (!currentModel) return;
    const saved = Math.max(0, currentModel.marketPrice - currentModel.athenaPrice);
    const savingPercent = Math.round((saved / currentModel.marketPrice) * 100);

    if (elModelName) elModelName.textContent = currentModel.name;
    if (elPanelType) elPanelType.textContent = currentModel.panel;
    if (elRepairTime) elRepairTime.textContent = currentModel.time;

    if (elMarketPrice) elMarketPrice.textContent = formatDZD(currentModel.marketPrice);
    if (elAthenaPrice) elAthenaPrice.textContent = formatDZD(currentModel.athenaPrice);

    animateValue(elSavedAmount, previousSavedVal, saved, 420);
    previousSavedVal = saved;

    if (elSavingPercentBadge) {
      elSavingPercentBadge.textContent = `وفّرت ${savingPercent}% من التكلفة`;
    }
    if (elProgressBar) {
      elProgressBar.style.width = `${savingPercent}%`;
    }

    const bookingMessage =
      `السلام عليكم ATHENA PHONE 👋\n` +
      `أرغب في حجز موعد لتغيير الزجاج الخارجي بتقنية OCA (مع الحفاظ على الشاشة الأصلية 100%):\n` +
      `📱 الجهاز: ${currentModel.name}\n` +
      `💎 سعر تجديد OCA: ${formatDZD(currentModel.athenaPrice)} د.ج (توفير ${formatDZD(saved)} د.ج)\n` +
      `📍 الفرع المفضل: ${currentBranch}\n` +
      `🗺️ الموقع: https://maps.app.goo.gl/cVj7zFsj9NEeiZpC8\n` +
      `✅ حالة الشاشة: الصورة واضحة واللمس يعمل 100%.`;

    if (elWhatsappPreview) {
      elWhatsappPreview.textContent = bookingMessage;
    }

    if (elWhatsappBtn) {
      const encodedText = encodeURIComponent(bookingMessage);
      elWhatsappBtn.href = `https://wa.me/${ATHENA_WHATSAPP_NUMBER}?text=${encodedText}`;
    }
  }

  // Brand Tab Clicks
  function switchBrand(brandKey, subKey = null, defaultModelId = null) {
    currentBrand = brandKey;
    if (subKey) {
      currentSubCategory = subKey;
    } else {
      currentSubCategory = brandKey === 'apple' ? 'iphone' : 'ALL';
    }
    currentIphoneGen = 'ALL';

    if (searchInput) searchInput.value = '';
    if (clearSearchBtn) clearSearchBtn.classList.add('hidden');

    brandButtons.forEach((b) => {
      b.classList.toggle('active', b.getAttribute('data-brand') === brandKey);
    });

    renderSubFilters();
    renderModelsList(defaultModelId, '');
  }

  brandButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const brandKey = btn.getAttribute('data-brand');
      if (brandKey) switchBrand(brandKey);
    });
  });

  // Bento Grid Jump Links
  jumpBrandBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetBrand = btn.getAttribute('data-jump-brand');
      const targetSub = btn.getAttribute('data-jump-sub') || null;
      if (targetBrand) switchBrand(targetBrand, targetSub);
    });
  });

  // Global Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      if (clearSearchBtn) {
        clearSearchBtn.classList.toggle('hidden', val.trim().length === 0);
      }
      renderModelsList(null, val);
    });
  }

  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      clearSearchBtn.classList.add('hidden');
      renderModelsList(null, '');
    });
  }

  modelDropdown.addEventListener('change', (e) => {
    selectModelById(e.target.value);
  });

  // Branch Selection
  function setPreferredBranch(branchName) {
    currentBranch = branchName;
    branchButtons.forEach((b) => {
      const isMatch = b.getAttribute('data-branch') === branchName;
      b.classList.toggle('active', isMatch);
      b.classList.toggle('border-gold', isMatch);
      b.classList.toggle('bg-amber-500/10', isMatch);
      b.classList.toggle('border-white/10', !isMatch);
      b.classList.toggle('bg-white/5', !isMatch);
      const dot = b.querySelector('span:last-child');
      if (dot) {
        dot.className = isMatch
          ? 'w-4 h-4 rounded-full border-2 border-gold bg-gold'
          : 'w-4 h-4 rounded-full border-2 border-slate-500';
      }
    });
    updateCalculationDisplay();
  }

  branchButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const branch = btn.getAttribute('data-branch');
      if (branch) setPreferredBranch(branch);
    });
  });

  quickBookBranchBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetBranch = btn.getAttribute('data-focus-branch');
      if (targetBranch) setPreferredBranch(targetBranch);
      const calcSection = document.getElementById('calculator');
      if (calcSection) calcSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const textToCopy = elWhatsappPreview ? elWhatsappPreview.textContent : '';
      if (navigator.clipboard && textToCopy) {
        navigator.clipboard.writeText(textToCopy);
      }
      const originalLabel = copyBtn.textContent;
      copyBtn.textContent = 'تم نسخ النص ✓';
      copyBtn.classList.add('text-emerald-400');
      setTimeout(() => {
        copyBtn.textContent = originalLabel;
        copyBtn.classList.remove('text-emerald-400');
      }, 2000);
    });
  }

  // =========================================================================
  // LIVE GOOGLE SHEETS CSV LOADER & TEMPLATE EXPORT
  // =========================================================================
  const BRAND_KEY_ALIAS = {
    iphone: 'apple',
    apple: 'apple',
    ipad: 'apple',
    watch: 'apple',
    samsung: 'samsung',
    xiaomi: 'xiaomi_poco',
    redmi: 'xiaomi_poco',
    poco: 'xiaomi_poco',
    xiaomi_poco: 'xiaomi_poco',
    infinix: 'other',
    realme: 'other',
    other: 'other'
  };

  async function syncFromGoogleSheets(csvUrl) {
    if (!csvUrl) return;
    try {
      const res = await fetch(csvUrl, { cache: 'no-store' });
      if (!res.ok) return;
      const csvText = await res.text();
      const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
      if (lines.length < 2) return;

      let updatedCount = 0;
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(',').map((c) => c.replace(/^"|"$/g, '').trim());
        // Format: id, brand, series, name, marketPrice, athenaPrice, time
        const [id, brand, series, name, marketStr, athenaStr, time] = cols;
        const marketPrice = Number(marketStr);
        const athenaPrice = Number(athenaStr);
        if (!id || isNaN(athenaPrice)) continue;

        const targetBrand = brand ? BRAND_KEY_ALIAS[brand.toLowerCase()] || brand : null;
        if (targetBrand && PHONE_DATABASE[targetBrand]) {
          const existing = PHONE_DATABASE[targetBrand].find((m) => m.id === id);
          if (existing) {
            if (name) existing.name = name;
            if (!isNaN(marketPrice) && marketPrice > 0) existing.marketPrice = marketPrice;
            existing.athenaPrice = athenaPrice;
            if (time) existing.time = time;
            updatedCount++;
          } else if (name) {
            const lowerBrand = (brand || '').toLowerCase();
            const subCategory =
              lowerBrand === 'ipad'
                ? 'ipad'
                : lowerBrand === 'watch'
                ? 'watch'
                : targetBrand === 'apple'
                ? 'iphone'
                : 'ALL';

            PHONE_DATABASE[targetBrand].push({
              id,
              subCategory,
              series: series || 'General',
              name,
              panel: 'Original Display • 100% OCA',
              marketPrice: !isNaN(marketPrice) && marketPrice > 0 ? marketPrice : athenaPrice * 3,
              athenaPrice,
              time: time || '60 دقيقة'
            });
            updatedCount++;
          }
        }
      }

      if (updatedCount > 0) {
        if (sheetStatusBadge) {
          sheetStatusBadge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span><span>متصل بـ Google Sheets (${updatedCount} سعر محدث)</span>`;
        }
        renderModelsList(currentModel?.id, searchInput?.value || '');
      }
    } catch (err) {
      console.warn('Google Sheets sync skipped:', err);
    }
  }

  // Modal Controls for Google Sheets Sync
  const openModalBtn = document.getElementById('openSheetsManagerBtn');
  const closeModalBtn = document.getElementById('closeSheetsManagerBtn');
  const modalEl = document.getElementById('sheetsManagerModal');
  const sheetUrlInput = document.getElementById('customSheetUrlInput');
  const saveSheetBtn = document.getElementById('saveSheetUrlBtn');
  const downloadCsvBtn = document.getElementById('downloadCsvTemplateBtn');

  const pixelIdInput = document.getElementById('customPixelIdInput');

  if (openModalBtn && modalEl) {
    openModalBtn.addEventListener('click', () => {
      if (sheetUrlInput) sheetUrlInput.value = GOOGLE_SHEET_CSV_URL;
      if (pixelIdInput) pixelIdInput.value = window.ATHENA_META_PIXEL_ID || '';
      modalEl.classList.remove('hidden');
    });
  }
  if (closeModalBtn && modalEl) {
    closeModalBtn.addEventListener('click', () => {
      modalEl.classList.add('hidden');
    });
  }
  if (saveSheetBtn && modalEl) {
    saveSheetBtn.addEventListener('click', async () => {
      if (sheetUrlInput) {
        const url = sheetUrlInput.value.trim();
        GOOGLE_SHEET_CSV_URL = url;
        localStorage.setItem('athena_google_sheet_csv_url', url);
        await syncFromGoogleSheets(url);
      }
      if (pixelIdInput) {
        const pId = pixelIdInput.value.trim();
        window.ATHENA_META_PIXEL_ID = pId;
        localStorage.setItem('athena_meta_pixel_id', pId);
        if (pId && typeof fbq === 'function') {
          fbq('init', pId);
          fbq('track', 'PageView');
        }
      }
      modalEl.classList.add('hidden');
    });
  }

  // Event Tracking on WhatsApp Click
  if (elWhatsappBtn) {
    elWhatsappBtn.addEventListener('click', () => {
      if (typeof window.trackAthenaEvent === 'function') {
        window.trackAthenaEvent('Lead', {
          content_name: currentModel ? currentModel.name : 'Unknown',
          value: currentModel ? currentModel.athenaPrice : 0,
          currency: 'DZD',
          branch: currentBranch
        });
      }
    });
  }
  if (downloadCsvBtn) {
    downloadCsvBtn.addEventListener('click', () => {
      const header = 'id,brand,series,name,marketPrice,athenaPrice,time\n';
      const rows = getAllModelsFlat()
        .map(
          (m) =>
            `"${m.id}","${m.brandKey}","${m.series || ''}","${m.name}",${m.marketPrice},${m.athenaPrice},"${m.time}"`
        )
        .join('\n');
      const blob = new Blob(['\uFEFF' + header + rows], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'athena_phone_prices_template.csv';
      link.click();
    });
  }

  // Initialize Default View (iPhone 15 Pro Max)
  switchBrand('apple', 'iphone', 'ip15pm');

  if (GOOGLE_SHEET_CSV_URL) {
    syncFromGoogleSheets(GOOGLE_SHEET_CSV_URL);
  }
}

/* ==========================================================================
   4. DYNAMIC 4-STEP OCA RESTORATION WORKBENCH CONTROLLER
   ========================================================================== */
const LAB_STEPS_DATA = {
  1: {
    tag: 'STAGE 01 / 04 • DIAMOND WIRE 0.03mm SEPARATION',
    title: 'الفصل الميكروني للزجاج المكسور دون المساس بطبقة OLED',
    desc: 'يتم تثبيت الشاشة على منصة تفريغ حرارية دقيقة (80°C) لتليين المادة اللاصقة، ثم يمر سلك الموليبدينوم والألماس بسماكة 0.03 ملم بسلاسة بين الزجاج المتشقق وشاشة الوكالة الأصلية لفصل الزجاج المتضرر مع الحفاظ على كل بيكسل سليم.',
    temp: '80.0 °C Precision',
    pressure: '-65 kPa',
    safety: '100% OLED SAFE',
    modeText: '● ACTIVE: 0.03mm DIAMOND WIRE SEPARATOR',
    timerText: 'STEP 1 OF 4'
  },
  2: {
    tag: 'STAGE 02 / 04 • ISO CLASS 1000 DUST-FREE CLEANROOM',
    title: 'إزالة بقايا اللاصق القديم والتنظيف بالميكروفايبر',
    desc: 'داخل غرفة هواء مؤين معقم تمنع جزيئات الغبار (99.99%)، تُنظف شاشة الـ OLED الأصلية بمذيبات بصرية متطورة ومسح ألياف ميكروفايبر لإزالة أي أثر للصمغ القديم دون أي خدوش.',
    temp: '24.5 °C Ambient',
    pressure: 'ISO Class 5',
    safety: '99.99% DUST-FREE',
    modeText: '● ACTIVE: IONIZED DUST-FREE CLEANROOM',
    timerText: 'STEP 2 OF 4'
  },
  3: {
    tag: 'STAGE 03 / 04 • VACUUM OCA OPTICAL LAMINATION',
    title: 'الكبس الفراغي لرقائق Mitsubishi OCA اليابانية',
    desc: 'محاذاة الزجاج الجديد المقوى مع شاشة الوكالة عبر قوالب ليزرية دقيقة، وتطبيق فيلم Mitsubishi OCA البصري داخل كابينة مفرغة تماماً من الهواء (-99 kPa) لضمان اندماج بصري تام.',
    temp: '45.0 °C Thermal',
    pressure: '-99 kPa Vac',
    safety: '99.9% CLARITY',
    modeText: '● ACTIVE: VACUUM OCA LAMINATION',
    timerText: 'STEP 3 OF 4'
  },
  4: {
    tag: 'STAGE 04 / 04 • AUTOCLAVE HIGH-PRESSURE (6.5 BAR)',
    title: 'الأوتوكلاف والضغط العالي لإزالة 100% من الفقاعات',
    desc: 'المرحلة المخبرية الختامية داخل أسطوانة الأوتوكلاف تحت ضغط 6.5 بار وحرارة 50°C لإذابة أي فقاعات مجهرية متناهية الصغر، فتخرج الشاشة بصلابة ونقاء واستجابة لمس المصنع تماماً.',
    temp: '50.0 °C Autoclave',
    pressure: '6.5 Bar Pressure',
    safety: '0% BUBBLES ✓',
    modeText: '● COMPLETE: 6.5 BAR AUTOCLAVE DE-BUBBLING',
    timerText: 'STEP 4 OF 4'
  }
};

const WORKBENCH_VISUALS = {
  1: `
    <div class="space-y-3 w-full">
      <div class="h-11 rounded-xl border border-red-500/60 bg-red-950/40 px-3.5 flex items-center justify-between text-xs font-bold text-red-200">
        <span>1. الزجاج الخارجي المتشقق (يتم فصله)</span>
        <span class="font-en text-[10px] px-2 py-0.5 rounded bg-red-500/25 text-red-300 font-bold">CRACKED GLASS</span>
      </div>
      <div class="relative h-9 rounded-lg bg-cyan-950/40 border border-dashed border-cyan-400/60 flex items-center overflow-hidden px-3">
        <div class="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-sm anim-wire-slide"></div>
        <div class="absolute inset-y-0 w-1 bg-white shadow-[0_0_12px_#00f0ff] anim-wire-slide"></div>
        <span class="relative z-10 text-[11px] font-bold text-cyan-200 font-en">⚡ 0.03mm DIAMOND WIRE CUTTING AT 80°C</span>
      </div>
      <div class="h-14 rounded-xl border-2 border-emerald-400/60 bg-emerald-950/40 px-3.5 flex items-center justify-between shadow-lg">
        <div>
          <div class="text-xs sm:text-sm font-black text-white">2. شاشة الوكالة الأصلية (OLED + Touch)</div>
          <div class="text-[10px] text-emerald-300">سليمة 100% — لا مساس بالبيكسلات أو التاتش</div>
        </div>
        <span class="font-en text-xs text-gold font-black px-2.5 py-1 rounded bg-black/60 border border-gold/40">100% ORIGINAL</span>
      </div>
    </div>
  `,
  2: `
    <div class="space-y-3 w-full">
      <div class="h-28 rounded-2xl border border-cyan-500/50 bg-[#081224] p-4 relative overflow-hidden flex flex-col justify-between">
        <div class="absolute inset-y-0 right-0 bg-gradient-to-l from-cyan-400/30 via-emerald-400/20 to-transparent anim-glue-wipe pointer-events-none"></div>
        <div class="flex items-center justify-between relative z-10">
          <span class="font-en text-xs font-bold text-cyan-300">ISO CLASS 1000 DUST-FREE CHAMBER</span>
          <span class="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-400/30">99.99% نقاء</span>
        </div>
        <div class="relative z-10 flex items-center justify-between">
          <div>
            <div class="text-xs font-bold text-white">إزالة صمغ OCA القديم بمحاليل بصرية نانوية</div>
            <div class="text-[10px] text-slate-300 mt-0.5">مسح ألياف الميكروفايبر المعقمة بدون أي خدوش مجهرية</div>
          </div>
          <div class="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 text-lg">✨</div>
        </div>
      </div>
      <div class="rounded-xl bg-white/5 border border-white/10 p-2.5 flex items-center justify-between text-xs text-slate-300">
        <span>حالة السطح البصري:</span>
        <span class="font-bold text-emerald-300 font-en">Crystal Clean OLED Screen ✓</span>
      </div>
    </div>
  `,
  3: `
    <div class="space-y-3 w-full">
      <div class="h-11 rounded-xl border-2 border-amber-400/70 bg-amber-950/30 px-3.5 flex items-center justify-between text-xs font-bold text-amber-200">
        <span>1. الزجاج الأصلي الجديد المقوى (Gorilla Glass)</span>
        <span class="font-en text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">NEW OEM GLASS</span>
      </div>
      <div class="relative h-10 rounded-lg bg-cyan-900/40 border border-cyan-400/60 px-3 flex items-center justify-between text-xs">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span class="text-cyan-200 font-bold">رقاقة Mitsubishi OCA البصرية اليابانية</span>
        </div>
        <span class="font-en text-[10px] text-cyan-300 font-bold">-99 kPa VACUUM</span>
      </div>
      <div class="h-11 rounded-xl border border-emerald-500/60 bg-emerald-950/40 px-3.5 flex items-center justify-between text-xs font-bold text-white">
        <span>3. شاشة OLED الأصلية مثبّتة بقوالب ليزرية دقيقة</span>
        <span class="font-en text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">ALIGNMENT JIG</span>
      </div>
    </div>
  `,
  4: `
    <div class="flex flex-col sm:flex-row items-center justify-around gap-4 w-full p-2">
      <div class="relative w-28 h-28 rounded-full border-2 border-cyan-400/60 bg-black/60 flex flex-col items-center justify-center shadow-xl shrink-0">
        <div class="absolute inset-1 rounded-full border border-dashed border-white/20"></div>
        <div class="absolute w-1 h-9 bg-gradient-to-t from-transparent to-red-400 rounded-full bottom-1/2 left-1/2 -ml-0.5 anim-gauge-needle"></div>
        <div class="w-3 h-3 rounded-full bg-cyan-400 z-10 shadow-[0_0_8px_#00f0ff]"></div>
        <span class="font-en text-xs font-black text-white mt-4">6.5 BAR</span>
        <span class="text-[9px] text-slate-400 font-en">AUTOCLAVE</span>
      </div>
      <div class="flex-1 space-y-2 text-right">
        <div class="flex items-center justify-between text-xs font-bold text-emerald-300">
          <span>إذابة الفقاعات المجهرية بالضغط</span>
          <span class="font-en">0% BUBBLES</span>
        </div>
        <div class="h-14 rounded-xl bg-black/50 border border-emerald-500/40 p-2.5 relative overflow-hidden flex items-center justify-around">
          <div class="w-3 h-3 rounded-full bg-cyan-300/60 anim-bubble-dissolve" style="animation-delay: 0s"></div>
          <div class="w-2.5 h-2.5 rounded-full bg-cyan-300/60 anim-bubble-dissolve" style="animation-delay: 0.7s"></div>
          <div class="w-4 h-4 rounded-full bg-cyan-300/60 anim-bubble-dissolve" style="animation-delay: 1.3s"></div>
          <div class="w-2 h-2 rounded-full bg-cyan-300/60 anim-bubble-dissolve" style="animation-delay: 1.8s"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent"></div>
          <span class="text-xs font-bold text-white relative z-10 font-en">FACTORY BONDING 100% COMPLETE</span>
        </div>
        <p class="text-[10px] text-slate-300">استعادة صلابة ولمعان الشاشة الأصلية تماماً بنسبة 100%.</p>
      </div>
    </div>
  `
};

function initOcaLabSimulator() {
  const stepTabs = document.querySelectorAll('.workbench-step-tab, #ocaStepsGrid .process-step-card');
  const labDots = document.querySelectorAll('.lab-dot');
  const toggleAutoBtn = document.getElementById('toggleAutoLabBtn');
  const autoDot = document.getElementById('autoLabStatusDot');
  const autoText = document.getElementById('autoLabBtnText');
  const prevBtn = document.getElementById('workbenchPrevBtn');
  const nextBtn = document.getElementById('workbenchNextBtn');
  const progressBar = document.getElementById('labProgressBar');

  const elTag = document.getElementById('labVisualizerTag');
  const elTitle = document.getElementById('labVisualizerTitle');
  const elDesc = document.getElementById('labVisualizerDesc');
  const elTemp = document.getElementById('labMetricTemp');
  const elPressure = document.getElementById('labMetricPressure');
  const elSafety = document.getElementById('labMetricSafety');
  const elModeText = document.getElementById('labChamberModeText');
  const elTimer = document.getElementById('labChamberTimer');
  const visualContainer = document.getElementById('workbenchVisualContainer');

  let activeStep = 1;
  let isAutoPlaying = true;
  let intervalId = null;

  function activateStep(stepNum) {
    const num = Number(stepNum);
    const data = LAB_STEPS_DATA[num];
    if (!data) return;
    activeStep = num;

    stepTabs.forEach((tab) => {
      tab.classList.toggle('active', Number(tab.getAttribute('data-step')) === activeStep);
    });

    labDots.forEach((dot) => {
      const dotStep = Number(dot.getAttribute('data-step'));
      dot.className =
        dotStep === activeStep
          ? 'lab-dot w-8 h-2 rounded-full bg-cyan-400 transition-all'
          : 'lab-dot w-2.5 h-2 rounded-full bg-white/20 transition-all';
    });

    if (progressBar) {
      progressBar.style.width = `${activeStep * 25}%`;
    }

    if (elTag) elTag.textContent = data.tag;
    if (elTitle) elTitle.textContent = data.title;
    if (elDesc) elDesc.textContent = data.desc;
    if (elTemp) elTemp.textContent = data.temp;
    if (elPressure) elPressure.textContent = data.pressure;
    if (elSafety) elSafety.textContent = data.safety;
    if (elModeText) {
      elModeText.innerHTML = `<span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span><span>${data.modeText}</span>`;
    }
    if (elTimer) elTimer.textContent = data.timerText;

    if (visualContainer && WORKBENCH_VISUALS[activeStep]) {
      visualContainer.innerHTML = WORKBENCH_VISUALS[activeStep];
    }
  }

  function startAutoLoop() {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
      if (!isAutoPlaying) return;
      const next = activeStep >= 4 ? 1 : activeStep + 1;
      activateStep(next);
    }, 4500);
  }

  stepTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      activateStep(Number(tab.getAttribute('data-step')));
      startAutoLoop();
    });
  });

  labDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      activateStep(Number(dot.getAttribute('data-step')));
      startAutoLoop();
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const prev = activeStep <= 1 ? 4 : activeStep - 1;
      activateStep(prev);
      startAutoLoop();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const next = activeStep >= 4 ? 1 : activeStep + 1;
      activateStep(next);
      startAutoLoop();
    });
  }

  if (toggleAutoBtn) {
    toggleAutoBtn.addEventListener('click', () => {
      isAutoPlaying = !isAutoPlaying;
      if (autoDot) {
        autoDot.className = isAutoPlaying
          ? 'w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping'
          : 'w-2.5 h-2.5 rounded-full bg-slate-500';
      }
      if (autoText) {
        autoText.textContent = isAutoPlaying
          ? 'المحاكي: يعمل تلقائياً'
          : 'المحاكي: متوقف';
      }
    });
  }

  activateStep(1);
  startAutoLoop();
}

/* ==========================================================================
   5. APPLE TRADE-IN STYLE SCREEN DIAGNOSTIC QUIZ
   ========================================================================== */
function initDiagnosticQuiz() {
  const groups = document.querySelectorAll('[data-diag-q]');
  const banner = document.getElementById('diagResultBanner');
  const icon = document.getElementById('diagResultIcon');
  const title = document.getElementById('diagResultTitle');
  const sub = document.getElementById('diagResultSub');

  if (!groups.length || !banner) return;

  const state = { q1: 'yes', q2: 'yes', q3: 'yes' };

  function updateVerdict() {
    const allYes = state.q1 === 'yes' && state.q2 === 'yes' && state.q3 === 'yes';

    if (allYes) {
      banner.className = 'rounded-2xl bg-emerald-950/50 border border-emerald-400/50 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all';
      icon.className = 'w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl font-black shrink-0';
      icon.textContent = '✓';
      title.className = 'text-base sm:text-lg font-black text-emerald-300';
      title.textContent = 'ممتاز! شاشتك مؤهلة 100% لتجديد الزجاج الخارجي بتقنية OCA';
      sub.textContent = 'يمكنك توفير حتى 70% من سعر الشاشة الكاملة مع الحفاظ على شاشتك الأصلية 100% في أقل من 90 دقيقة.';
    } else {
      banner.className = 'rounded-2xl bg-amber-950/50 border border-amber-400/50 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all';
      icon.className = 'w-12 h-12 rounded-2xl bg-amber-500/20 text-gold flex items-center justify-center text-2xl font-black shrink-0';
      icon.textContent = '!';
      title.className = 'text-base sm:text-lg font-black text-amber-300';
      title.textContent = 'تنبيه: قد تحتاج شاشتك إلى فحص مخبري أو استبدال شاشة كاملة أصلية';
      sub.textContent = 'تفضل بزيارة فرع بيلفور أو الكاليتوس لإجراء فحص مجاني دقيق، حيث نوفر أيضاً شاشات وكالة كاملة أصلية بضمان.';
    }
  }

  groups.forEach((group) => {
    const qKey = group.getAttribute('data-diag-q');
    const btns = group.querySelectorAll('.diag-choice-btn');
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-val');
        state[qKey] = val;
        btns.forEach((b) => {
          b.classList.remove('selected-yes', 'selected-no');
          if (b === btn) {
            b.classList.add(val === 'yes' ? 'selected-yes' : 'selected-no');
          }
        });
        updateVerdict();
      });
    });
  });
}
