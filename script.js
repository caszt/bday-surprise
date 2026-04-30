// ═══════════════════════════════════════════════
// BIRTHDAY EXPERIENCE — FULL SCRIPT
// ═══════════════════════════════════════════════

// ─── WIFE LETTER TEXT ───────────────────────────
// ★★★ TYPE YOUR LETTER HERE ★★★
// Use \n for new lines, \n\n for paragraph breaks.
const WIFE_LETTER = `My dearest love,

Happy Birthday! 🎂

Every single day with you is a gift I never want to return. You make the ordinary feel extraordinary just by being in it.

I hope today reminds you of how deeply you are loved — not just by me, but by everyone lucky enough to know you.

Here's to you, to us, and to every adventure still ahead.

All my love, always. ♡`;
// ─────────────────────────────────────────────────

// ─── STATE & PERSISTENCE ─────────────────────────
const STATE_KEY = 'bday_state_v1';

function saveState(data) {
  try { sessionStorage.setItem(STATE_KEY, JSON.stringify(data)); } catch(e) {}
}

function loadState() {
  try {
    const raw = sessionStorage.getItem(STATE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}

const savedState = loadState();

// ─── STAGE MANAGEMENT ────────────────────────────
let currentStage = savedState?.stage || 'matrix';
let matrixSkipped = false;
let matrixInterval = null;

const homeBtn = document.getElementById('home-btn');

function switchStage(toStage, instant = false) {
  const stages = ['matrix', 'warm', 'yes'];
  stages.forEach(s => {
    const el = document.getElementById(`stage-${s}`);
    if (el) el.classList.remove('active');
  });

  const to = document.getElementById(`stage-${toStage}`);
  if (to) to.classList.add('active');

  currentStage = toStage;
  saveState({ stage: toStage });

  // Show/hide home button
  if (toStage !== 'matrix') {
    homeBtn.classList.add('visible');
  } else {
    homeBtn.classList.remove('visible');
  }
}

homeBtn.addEventListener('click', () => {
  // Clear state and go back to start
  sessionStorage.removeItem(STATE_KEY);
  location.reload();
});

// ═══════════════════════════════════════════════
// STAGE 1: MATRIX ANIMATION
// ═══════════════════════════════════════════════
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
const fontSize = 20;
let cols, drops;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function initMatrix() {
  cols = Math.floor(canvas.width / fontSize);
  drops = Array.from({ length: cols }, () => Math.random() * -50);
}

initMatrix();
window.addEventListener('resize', initMatrix);

const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function drawMatrix() {
  ctx.fillStyle = 'rgba(0,0,0,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    const progress = drops[i] / (canvas.height / fontSize);

    if (drops[i] * fontSize > 0) {
      const alpha = Math.max(0.08, Math.min(1, 1 - progress * 0.7));
      if (Math.random() > 0.97) {
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.font = `bold ${fontSize}px monospace`;
      } else {
        ctx.fillStyle = `rgba(200,200,200,${alpha * 0.5})`;
        ctx.font = `${fontSize}px monospace`;
      }
    } else {
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.font = `bold ${fontSize}px monospace`;
    }

    ctx.fillText(char, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i] += 0.5;
  }
}

// ─── Birthday popup ───
const bdayPopup = document.getElementById('bdayPopup');
const bdayLines = document.querySelectorAll('.bday-line');
let popupShown = false;
let canContinue = false;

function showPopupInstant() {
  if (popupShown) return;
  popupShown = true;
  bdayPopup.classList.add('show', 'instant');
  bdayLines.forEach(l => l.classList.add('reveal'));
  canContinue = true;
  // Show continue hint immediately
  document.querySelector('.continue-hint').style.opacity = '1';
  document.querySelector('.continue-hint').style.animation = 'bob 2s ease-in-out infinite';
}

function showPopupAnimated() {
  matrixInterval = setInterval(drawMatrix, 40);

  setTimeout(() => {
    bdayPopup.classList.add('show');
    popupShown = true;
    setTimeout(() => bdayLines[0].classList.add('reveal'), 200);
    setTimeout(() => bdayLines[1].classList.add('reveal'), 450);
    setTimeout(() => bdayLines[2].classList.add('reveal'), 900);
    setTimeout(() => bdayLines[3].classList.add('reveal'), 1250);
  }, 2200);

  setTimeout(() => { canContinue = true; }, 5000);
}

// ─── Click to skip or continue ───
document.getElementById('stage-matrix').addEventListener('click', () => {
  // If popup not shown yet, skip to it
  if (!popupShown) {
    clearInterval(matrixInterval);
    matrixInterval = setInterval(drawMatrix, 40);
    showPopupInstant();
    return;
  }

  // If can continue, go to stage 2
  if (canContinue) {
    clearInterval(matrixInterval);
    switchStage('warm');
    setTimeout(startWarmStage, 800);
  } else {
    // Skip remaining animation delay
    showPopupInstant();
    canContinue = true;
  }
});

// ═══════════════════════════════════════════════
// STAGE 2: WARM CARD SCENE
// ═══════════════════════════════════════════════
function startWarmStage() {
  createPetals();
  const pawPrompt = document.getElementById('paw-prompt');
  setTimeout(() => pawPrompt.classList.add('show'), 600);
  pawPrompt.addEventListener('click', showCard);
}

function createPetals() {
  const container = document.getElementById('stage-warm');
  const colors = ['#f9c89a', '#fde8d0', '#e8956d', '#f0a870'];
  for (let i = 0; i < 15; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.background = colors[Math.floor(Math.random() * colors.length)];
    petal.style.animationDuration = (8 + Math.random() * 7) + 's';
    petal.style.animationDelay = Math.random() * 5 + 's';
    container.appendChild(petal);
  }
}

function showCard() {
  const pawPrompt = document.getElementById('paw-prompt');
  const cardScene = document.getElementById('card-scene');

  pawPrompt.style.opacity = '0';
  pawPrompt.style.transform = 'translateY(-30px) scale(0.9)';

  setTimeout(() => {
    pawPrompt.style.display = 'none';
    cardScene.style.display = 'block';
    setTimeout(() => { cardScene.style.opacity = '1'; }, 50);
  }, 500);

  document.getElementById('card-front').addEventListener('click', openCard);
}

function openCard() {
  const cardInner = document.getElementById('card-inner');
  cardInner.classList.add('open');
  setTimeout(() => {
    showPets();
    showSurpriseButton();
  }, 1200);
}

function showPets() {
  const catEmoji = document.getElementById('cat-emoji');
  const catImg   = document.getElementById('cat-img');
  const catName  = document.getElementById('cat-name');
  const catBubble= document.getElementById('bubble-cat');
  const dogEmoji = document.getElementById('dog-emoji');
  const dogImg   = document.getElementById('dog-img');
  const dogName  = document.getElementById('dog-name');
  const dogBubble= document.getElementById('bubble-dog');
  const cardBottom = document.getElementById('card-bottom');

  if (catEmoji) setTimeout(() => catEmoji.classList.add('show'), 100);
  if (catImg)   setTimeout(() => catImg.classList.add('show'), 100);
  setTimeout(() => catName.classList.add('show'), 300);
  setTimeout(() => catBubble.classList.add('show'), 600);

  if (dogEmoji) setTimeout(() => dogEmoji.classList.add('show'), 200);
  if (dogImg)   setTimeout(() => dogImg.classList.add('show'), 200);
  setTimeout(() => dogName.classList.add('show'), 400);
  setTimeout(() => dogBubble.classList.add('show'), 800);
  setTimeout(() => cardBottom.classList.add('show'), 1000);
}

function showSurpriseButton() {
  const surpriseWrap = document.getElementById('surprise-btn-wrap');
  setTimeout(() => surpriseWrap.classList.add('show'), 1500);
}

// ─── Surprise button interactions ───
const surpriseBtn  = document.getElementById('surprise-btn');
const choiceWrap   = document.getElementById('choice-wrap');
const btnYes       = document.getElementById('btn-yes');
const btnNotYet    = document.getElementById('btn-notyet');
const takeTimeText = document.getElementById('taketime-text');

surpriseBtn.addEventListener('click', () => {
  surpriseBtn.style.opacity = '0';
  surpriseBtn.style.transform = 'translateY(-10px)';
  setTimeout(() => {
    surpriseBtn.style.display = 'none';
    choiceWrap.classList.add('show');
  }, 300);
});

btnNotYet.addEventListener('click', () => {
  takeTimeText.classList.remove('show');
  void takeTimeText.offsetWidth; // reflow
  takeTimeText.classList.add('show');
  setTimeout(() => takeTimeText.classList.remove('show'), 2500);
});

btnYes.addEventListener('click', () => {
  // Hide the entire surprise button wrap
  const surpriseWrap = document.getElementById('surprise-btn-wrap');
  surpriseWrap.style.opacity = '0';
  surpriseWrap.style.transform = 'translateY(20px)';
  
  setTimeout(() => {
    surpriseWrap.style.display = 'none';
    // Transition to next stage
    switchStage('yes');
  }, 400);
});



// ═══════════════════════════════════════════════
// STAGE 3: CHOICE BUTTONS
// ═══════════════════════════════════════════════
document.getElementById('btn-wife').addEventListener('click', openWifeOverlay);
document.getElementById('btn-friends').addEventListener('click', openFriendsOverlay);

// ═══════════════════════════════════════════════
// WIFE OVERLAY — LETTER + VIDEO
// ═══════════════════════════════════════════════
const wifeOverlay = document.getElementById('wife-overlay');
const wifeLetterPanel = document.getElementById('wife-letter-panel');
const wifeVideoPanel  = document.getElementById('wife-video-panel');
const letterBody      = document.getElementById('letter-body');
const letterCursor    = document.getElementById('letter-cursor');

let letterTyping = null;
let letterDone   = false;

function openWifeOverlay() {
  wifeOverlay.classList.add('open');
  wifeLetterPanel.style.display = 'flex';
  wifeVideoPanel.style.display  = 'none';
  // Reset and start typing
  if (!letterDone) {
    startLetterTyping();
  }
}

function startLetterTyping() {
  letterBody.textContent = '';
  letterCursor.classList.remove('done');
  let idx = 0;
  const speed = 28; // ms per character

  function type() {
    if (idx < WIFE_LETTER.length) {
      letterBody.textContent += WIFE_LETTER[idx++];
      // Auto-scroll
      const paper = letterBody.closest('.letter-paper');
      if (paper) paper.scrollTop = paper.scrollHeight;
      letterTyping = setTimeout(type, speed);
    } else {
      letterDone = true;
      letterCursor.classList.add('done');
    }
  }
  type();
}

// Click letter paper to skip typing
document.querySelector('.letter-paper')?.addEventListener('click', () => {
  if (!letterDone) {
    clearTimeout(letterTyping);
    letterBody.textContent = WIFE_LETTER;
    letterDone = true;
    letterCursor.classList.add('done');
  }
});

// Navigate letter → video
document.getElementById('wife-to-video').addEventListener('click', () => {
  wifeLetterPanel.style.display = 'none';
  wifeVideoPanel.style.display  = 'flex';
  wifeVideoPanel.style.alignItems = 'center';
  wifeVideoPanel.style.justifyContent = 'center';
  wifeVideoPanel.style.position = 'relative';
  wifeVideoPanel.style.width   = '100%';
  wifeVideoPanel.style.maxWidth = '700px';
  // Load video
  const iframe = document.getElementById('wife-iframe');
  if (!iframe.src || iframe.src === window.location.href) {
    iframe.src = iframe.dataset.src;
  }
});

// Navigate video → letter
document.getElementById('wife-to-letter').addEventListener('click', () => {
  wifeVideoPanel.style.display  = 'none';
  wifeLetterPanel.style.display = 'flex';
  // Pause video
  const iframe = document.getElementById('wife-iframe');
  iframe.src = iframe.src; // reload pauses it
});

// Close wife overlay
document.getElementById('wife-close').addEventListener('click', () => {
  wifeOverlay.classList.remove('open');
  // Stop video
  const iframe = document.getElementById('wife-iframe');
  iframe.src = '';
});

// ═══════════════════════════════════════════════
// FRIENDS OVERLAY — SLIDER + DOTS + SWIPE
// ═══════════════════════════════════════════════
const friendsOverlay = document.getElementById('friends-overlay');
const friendsSlider  = document.getElementById('friends-slider');
const sliderDots     = document.getElementById('slider-dots');
const friendLabel    = document.getElementById('friend-name-label');

const slides = Array.from(friendsSlider.querySelectorAll('.friend-slide'));
let currentSlide = 0;
let dotsCreated  = false;

function openFriendsOverlay() {
  friendsOverlay.classList.add('open');
  if (!dotsCreated) buildDots();
  goToSlide(0, false);
}

function buildDots() {
  sliderDots.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    sliderDots.appendChild(dot);
  });
  dotsCreated = true;
}

function goToSlide(idx, animate = true) {
  currentSlide = Math.max(0, Math.min(idx, slides.length - 1));

  // Translate slider
  friendsSlider.style.transition = animate ? 'transform 0.4s cubic-bezier(0.4,0,0.2,1)' : 'none';
  friendsSlider.style.transform  = `translateX(-${currentSlide * 100}%)`;

  // Update dots
  const dots = sliderDots.querySelectorAll('.slider-dot');
  dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));

  // Update name label
  const name = slides[currentSlide]?.dataset.name || '';
  if (friendLabel) {
    friendLabel.style.opacity = '0';
    setTimeout(() => {
      friendLabel.textContent  = name;
      friendLabel.style.opacity = '1';
    }, 150);
  }

  // Update arrow visibility
  document.getElementById('friends-prev').style.visibility = currentSlide === 0 ? 'hidden' : 'visible';
  document.getElementById('friends-next').style.visibility = currentSlide === slides.length - 1 ? 'hidden' : 'visible';
}

document.getElementById('friends-prev').addEventListener('click', () => goToSlide(currentSlide - 1));
document.getElementById('friends-next').addEventListener('click', () => goToSlide(currentSlide + 1));

// Close friends overlay
document.getElementById('friends-close').addEventListener('click', () => {
  friendsOverlay.classList.remove('open');
});

// ─── Touch / swipe for friends slider ───
let touchStartX = 0;
let touchStartY = 0;
let isDragging  = false;

friendsSlider.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  isDragging  = false;
}, { passive: true });

friendsSlider.addEventListener('touchmove', e => {
  const dx = e.touches[0].clientX - touchStartX;
  const dy = e.touches[0].clientY - touchStartY;
  if (Math.abs(dx) > Math.abs(dy) + 5) isDragging = true;
}, { passive: true });

friendsSlider.addEventListener('touchend', e => {
  if (!isDragging) return;
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) {
    if (dx < 0) goToSlide(currentSlide + 1);
    else         goToSlide(currentSlide - 1);
  }
});

// ─── Mouse drag for friends slider ───
let mouseStartX   = 0;
let mouseDown     = false;

friendsSlider.addEventListener('mousedown', e => {
  mouseStartX = e.clientX;
  mouseDown   = true;
  e.preventDefault();
});

window.addEventListener('mousemove', e => {
  if (!mouseDown) return;
  const dx = e.clientX - mouseStartX;
  // Live preview
  friendsSlider.style.transition = 'none';
  friendsSlider.style.transform  = `translateX(calc(-${currentSlide * 100}% + ${dx}px))`;
});

window.addEventListener('mouseup', e => {
  if (!mouseDown) return;
  mouseDown = false;
  const dx = e.clientX - mouseStartX;
  if (Math.abs(dx) > 60) {
    if (dx < 0) goToSlide(currentSlide + 1);
    else         goToSlide(currentSlide - 1);
  } else {
    goToSlide(currentSlide); // snap back
  }
});

// ═══════════════════════════════════════════════
// RESTORE STATE ON RELOAD
// ═══════════════════════════════════════════════
function restoreState() {
  if (!savedState) {
    // Fresh start
    showPopupAnimated();
    return;
  }

  const stage = savedState.stage;

  if (stage === 'matrix') {
    showPopupAnimated();
    return;
  }

  if (stage === 'warm') {
    if (matrixInterval) clearInterval(matrixInterval);
    matrixInterval = setInterval(drawMatrix, 40);
    switchStage('warm', true);
    setTimeout(() => {
      createPetals();
      // Skip straight to card open state
      const pawPrompt  = document.getElementById('paw-prompt');
      const cardScene  = document.getElementById('card-scene');
      const cardInner  = document.getElementById('card-inner');
      const surpriseWrap = document.getElementById('surprise-btn-wrap');
      pawPrompt.style.display = 'none';
      cardScene.style.display = 'block';
      cardScene.style.opacity = '1';
      cardInner.classList.add('open');
      // Instantly reveal pets
      ['cat-emoji','cat-img','cat-name','dog-emoji','dog-img','dog-name','card-bottom'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('show');
      });
      document.getElementById('bubble-cat')?.classList.add('show');
      document.getElementById('bubble-dog')?.classList.add('show');
      surpriseWrap.classList.add('show');
      homeBtn.classList.add('visible');
    }, 300);
    return;
  }

  if (stage === 'yes') {
    if (matrixInterval) clearInterval(matrixInterval);
    switchStage('yes', true);
    homeBtn.classList.add('visible');
    return;
  }
}

restoreState();

console.log('🎉 Birthday experience loaded!');