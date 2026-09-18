document.addEventListener("DOMContentLoaded", () => {
    // Initialize all dropdowns
    document.querySelectorAll('.dropdown-container').forEach(initDropdown);
});

function initDropdown(container) {
    const btn = container.querySelector('button');
    const menu = container.querySelector('.dropdown-menu');
    const arrow = container.querySelector('.dropdown-arrow');

    if (!container || !menu) return;

    let isClickedOpen = false;
    let isHovered = false;
    let ignoreHoverUntilLeave = false;

    function showMenu() {
        menu.style.opacity = '1';
        menu.style.visibility = 'visible';
        if (arrow) arrow.style.transform = 'rotate(225deg)';
        if (btn) btn.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    }

    function hideMenu() {
        menu.style.opacity = '0';
        menu.style.visibility = 'hidden';
        if (arrow) arrow.style.transform = 'rotate(45deg)';
        if (btn && !isHovered) {
            btn.style.backgroundColor = 'transparent';
        }
    }

    container.addEventListener('mouseenter', () => {
        isHovered = true;
        if (!ignoreHoverUntilLeave) showMenu();
    });

    container.addEventListener('mouseleave', () => {
        isHovered = false;
        ignoreHoverUntilLeave = false;
        if (!isClickedOpen) hideMenu();
        else if (btn) btn.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    });

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        isClickedOpen = !isClickedOpen;
        if (isClickedOpen) {
            ignoreHoverUntilLeave = false;
            showMenu();
        } else {
            hideMenu();
            ignoreHoverUntilLeave = true;
        }
    });

    document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) {
            isClickedOpen = false;
            ignoreHoverUntilLeave = false;
            hideMenu();
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {
    // Select all page subheaders on the current page[cite: 1]
    const subheaders = document.querySelectorAll('.page-subheader:not(.ignore)');
    const sectionsContainer = document.getElementById('sections-container');

    if (subheaders.length > 0 && sectionsContainer) {
        subheaders.forEach((subheader, index) => {
            if (!subheader.id) {
                subheader.id = `section-subheader-${index}`;
            }

            const button = document.createElement('a');
            button.href = `#${subheader.id}`;
            button.className = 'prompt-regular menu-btn';
            button.textContent = subheader.textContent.trim();
            button.style.color = 'black';
            button.style.width = '100%';
            button.style.boxSizing = 'border-box';
            button.style.fontSize = '18px';
            
            // --- CHANGED STYLING FOR MULTI-LINE SUPPORT ---
            button.style.lineHeight = '1.3'; // Normal line spacing for wrapped text
            button.style.padding = '14px 15px'; // Consistent vertical and horizontal padding
            // ----------------------------------------------

            // button.style.borderLeft = '4px solid #4780b5';
            button.style.borderBottom = '1px solid rgba(0, 0, 0, 0.2)';
            button.style.backgroundColor = 'rgb(235, 235, 235)';
            button.style.textDecoration = 'none';
            button.style.display = 'block'; // Ensures padding applies properly to block layout

            button.addEventListener('click', (e) => {
                e.preventDefault();
                subheader.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            });

            sectionsContainer.appendChild(button);
        });
    }
});



document.addEventListener("DOMContentLoaded", () => {
    const sectionsCard = document.getElementById('sections-card');
    
    if (sectionsCard) {
        // Track original width and layout parent to preserve column alignment when fixed
        const parentColumn = sectionsCard.parentElement;
        const initialWidth = parentColumn.getBoundingClientRect().width;
        
        // Calculate when it should stick based on its initial distance from the top of the page
        const initialOffsetTop = sectionsCard.getBoundingClientRect().top + window.scrollY;
        const topStickyPosition = 20; // Pixels from top of screen

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            if (scrollY >= (initialOffsetTop - topStickyPosition)) {
                // Switch to fixed tracking so it locks below the topbar
                sectionsCard.style.position = 'fixed';
                sectionsCard.style.top = `${topStickyPosition}px`;
                sectionsCard.style.width = `${initialWidth}px`;
                sectionsCard.style.zIndex = '100';
            } else {
                // Reset back to normal layout flow when scrolled back up
                sectionsCard.style.position = 'static';
                sectionsCard.style.width = '100%';
            }
        });
    }
});



const container = document.querySelector('.responsive-iframe-container');

if (container) {
    const iframe = container.querySelector('.scalable-iframe');
    const virtualWidth = 1280;
    const virtualHeight = 853;

    function updateScale() {
        if (!iframe) return;
        const scale = container.clientWidth / virtualWidth;
        iframe.style.transform = `scale(${scale})`;
        container.style.height = `${virtualHeight * scale}px`;
    }

    const observer = new ResizeObserver(updateScale);
    observer.observe(container);
    updateScale();
}


let activePoppedContainer = null;
let activeStackingParent = null;

function updatePoppedScale(container) {
    const iframe = container.querySelector('iframe');
    if (!iframe) return;

    const virtualWidth = 1280;
    const virtualHeight = 853;

    // Calculate maximum available space (92vw x 88vh)
    const maxWidth = window.innerWidth * 0.92;
    const maxHeight = window.innerHeight * 0.88;

    // Scale to fit viewport up to 1.0
    const scale = Math.min(maxWidth / virtualWidth, maxHeight / virtualHeight, 1.0);

    // Set width and height with !important to completely override thumbnail dimensions
    container.style.setProperty('width', `${virtualWidth * scale}px`, 'important');
    container.style.setProperty('height', `${virtualHeight * scale}px`, 'important');

    // Apply scale to iframe
    iframe.style.setProperty('transform', `scale(${scale})`, 'important');
}

function openDashboardPopup(container) {
    let backdrop = document.getElementById('dashboard-modal-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = 'dashboard-modal-backdrop';
        backdrop.className = 'dashboard-modal-backdrop';
        document.body.appendChild(backdrop);
        backdrop.addEventListener('click', closeDashboardPopup);
    }

    // Temporarily elevate the layout container so its z-index: 10 stacking context doesn't trap the modal behind the backdrop
    activeStackingParent = container.closest('[style*="z-index: 10"]') || container.closest('[style*="z-index"]');
    if (activeStackingParent) {
        activeStackingParent.dataset.origZ = activeStackingParent.style.zIndex;
        activeStackingParent.style.zIndex = 'auto';
    }

    activePoppedContainer = container;
    container.classList.add('popped-out');
    backdrop.classList.add('active');
    updatePoppedScale(container);
}

function closeDashboardPopup() {
    if (!activePoppedContainer) return;
    const backdrop = document.getElementById('dashboard-modal-backdrop');
    if (backdrop) backdrop.classList.remove('active');

    const iframe = activePoppedContainer.querySelector('iframe');
    activePoppedContainer.classList.remove('popped-out');

    // Reset container size and iframe scale back to card thumbnail
    activePoppedContainer.style.width = '';
    activePoppedContainer.style.height = '';
    if (iframe) iframe.style.removeProperty('transform');

    // Restore parent z-index
    if (activeStackingParent) {
        activeStackingParent.style.zIndex = activeStackingParent.dataset.origZ || '10';
        activeStackingParent = null;
    }

    activePoppedContainer = null;
}

window.addEventListener('resize', () => {
    if (activePoppedContainer) updatePoppedScale(activePoppedContainer);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDashboardPopup();
});

function loadIframe(overlayElement) {
    const container = overlayElement.parentElement;
    const iframe = container.querySelector('iframe');

    // Trigger loading if not already loaded
    if (iframe && (!iframe.getAttribute('src') || iframe.getAttribute('src') === '')) {
        iframe.src = iframe.getAttribute('data-src');
    }

    // Change text to show loading status
    const textSpan = overlayElement.querySelector('.overlay-text');
    if (textSpan) {
        textSpan.textContent = "Loading interactive display...";
    }
    overlayElement.style.pointerEvents = 'none';

    // Wait 3 seconds, then reveal iframe and add expand controls
    setTimeout(() => {
        overlayElement.style.transition = 'opacity 0.3s ease';
        overlayElement.style.opacity = '0';
        setTimeout(() => {
            overlayElement.style.display = 'none';

            // Add popout button if not already present
            if (!container.querySelector('.dashboard-popout-btn')) {
                const popBtn = document.createElement('button');
                popBtn.type = 'button';
                popBtn.className = 'dashboard-popout-btn';
                popBtn.classList.add('menu-btn');
                popBtn.title = 'Expand to popup view';
                popBtn.innerHTML = `
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <polyline points="9 21 3 21 3 15"></polyline>
                        <line x1="21" y1="3" x2="14" y2="10"></line>
                        <line x1="3" y1="21" x2="10" y2="14"></line>
                    </svg>
                    <span>Expand</span>
                `;
                popBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openDashboardPopup(container);
                });
                container.appendChild(popBtn);
            }

            // Add close button for popup mode if not already present
            if (!container.querySelector('.dashboard-close-btn')) {
                const closeBtn = document.createElement('button');
                closeBtn.type = 'button';
                closeBtn.className = 'dashboard-close-btn';
                closeBtn.classList.add('menu-btn');
                closeBtn.title = 'Close popup view';
                closeBtn.innerHTML = '&times;';
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    closeDashboardPopup();
                });
                container.appendChild(closeBtn);
            }
        }, 300);
    }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById('dashboard-track');
    const prevBtn = document.getElementById('prev-card-btn');
    const nextBtn = document.getElementById('next-card-btn');
    const dotsContainer = document.getElementById('card-dots');
    const switcherContainer = document.querySelector('.card-switcher-container');

    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

    const originalCards = Array.from(track.querySelectorAll('.dashboard-card'));
    const totalReal = originalCards.length;
    if (totalReal === 0) return;

    // Create 1 indicator dot per original card
    dotsContainer.innerHTML = '';
    originalCards.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.className = `card-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('title', `Go to dashboard ${idx + 1}`);
        dot.addEventListener('click', () => {
            stopAutoplay();
            goToIndex(idx + 1);
        });
        dotsContainer.appendChild(dot);
    });

    // Infinite loop: clone last card to start, and first 3 cards to end
    const cloneLast = originalCards[totalReal - 1].cloneNode(true);
    track.insertBefore(cloneLast, originalCards[0]);

    const clonesToAppend = originalCards.slice(0, Math.min(3, totalReal));
    clonesToAppend.forEach(card => {
        track.appendChild(card.cloneNode(true));
    });

    const allCards = track.querySelectorAll('.dashboard-card');
    let currentIndex = 1;
    let isTransitioning = false;

    function getStepWidth() {
        const cardWidth = allCards[0].offsetWidth;
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.gap) || 20;
        return cardWidth + gap;
    }

    function updatePosition(animate = true) {
        track.style.transition = animate ? 'left 0.5s ease-in-out' : 'none';
        const step = getStepWidth();
        track.style.left = `-${currentIndex * step}px`;
        updateDots();
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.card-dot');
        const activeDotIdx = (currentIndex - 1 + totalReal) % totalReal;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activeDotIdx);
        });
    }

    function goToIndex(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex = index;
        updatePosition(true);
    }

    function nextSlide() {
        if (isTransitioning) return;
        goToIndex(currentIndex + 1);
    }

    function prevSlide() {
        if (isTransitioning) return;
        goToIndex(currentIndex - 1);
    }

    track.addEventListener('transitionend', (e) => {
        if (e.propertyName !== 'left') return;
        isTransitioning = false;
        if (currentIndex > totalReal) {
            currentIndex = 1;
            updatePosition(false);
        } else if (currentIndex < 1) {
            currentIndex = totalReal;
            updatePosition(false);
        }
    });

    // Autoplay every 4 seconds
    let autoplayTimer = setInterval(nextSlide, 4000);

    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }

    prevBtn.addEventListener('click', () => {
        stopAutoplay();
        prevSlide();
    });
    nextBtn.addEventListener('click', () => {
        stopAutoplay();
        nextSlide();
    });
    if (switcherContainer) {
        switcherContainer.addEventListener('click', stopAutoplay);
    }

    window.addEventListener('resize', () => {
        updatePosition(false);
    });

    updatePosition(false);
});