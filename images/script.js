// ==========================================================================
// HOUSE OF SNOW DROP - CORE HOMEPAGE MECHANICAL PIPELINE ENGINE
// ==========================================================================

// 1. LIVE DAY, DATE, AND CLOCK GENERATOR
function updateDateTime() {
    const dateBox = document.getElementById('live-datetime');
    if (!dateBox) return;
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    };
    dateBox.textContent = now.toLocaleDateString('en-US', options);
}
setInterval(updateDateTime, 1000);
updateDateTime();

// 2. HAMBURGER NAVIGATION PANEL CLOSURE LOGIC
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// 3. AUTOMATED CROSSFADE CARD BACKGROUND TRANSITION RUNNER
let lastIndex = -1;

function rotateCardBackground() {
    const bgLayer = document.getElementById('gallery-bg-layer');
    // Verifies that our text path array exists safely inside the main document window
    if (!bgLayer || typeof backgroundImages === 'undefined' || !backgroundImages.length) return; 
    
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * backgroundImages.length);
    } while (randomIndex === lastIndex && backgroundImages.length > 1);
    
    lastIndex = randomIndex;
    
    // Injects the direct text path value straight into the background property wrapper
    bgLayer.style.backgroundImage = "url('" + backgroundImages[randomIndex] + "')";
}

// 4. LIGHTBOX ZOOM ENGINE MODAL INTERACTION
const lightbox = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
}

if (lightboxClose) {
    lightboxClose.addEventListener('click', () => { lightbox.style.display = 'none'; });
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.style.display = 'none';
    });
}

// Global Document Thread Initiation Hook Execution Listener
window.addEventListener('DOMContentLoaded', () => {
    // Run background loop threads
    rotateCardBackground();
    setInterval(rotateCardBackground, 4000);
    
    // Fullscreen Background Image Lightbox Launcher Interception
    const cardHitbox = document.getElementById('gallery-bg-hitbox');
    if (cardHitbox) {
        cardHitbox.addEventListener('click', () => {
            const bgLayer = document.getElementById('gallery-bg-layer');
            if (bgLayer && bgLayer.style.backgroundImage) {
                const matches = bgLayer.style.backgroundImage.match(/url\(['"]?(.*?)['"]?\)/);
                if (matches && matches[1]) {
                    openLightbox(matches[1]);
                }
            }
        });
    }
    
    // Clickable Brand Logo Modal Zoom
    const brandLogo = document.getElementById('clickable-logo');
    if (brandLogo) {
        brandLogo.addEventListener('click', () => {
            openLightbox(brandLogo.src);
        });
    }
    
    const yearBox = document.getElementById('copyright-year');
    if (yearBox) yearBox.textContent = new Date().getFullYear();
});
