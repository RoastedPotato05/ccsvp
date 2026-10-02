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
        menu.classList.add('menu-visible');
        if (arrow) arrow.style.transform = 'rotate(225deg)';
        if (btn) btn.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    }

    function hideMenu() {
        menu.style.opacity = '0';
        menu.style.visibility = 'hidden';
        menu.classList.remove('menu-visible');
        if (arrow) arrow.style.transform = 'rotate(45deg)';
        if (btn && !isHovered) {
            btn.style.backgroundColor = 'transparent';
        }
    }

    container.addEventListener('mouseenter', () => {
        if (window.innerWidth <= 900) return; // Disable hover in mobile / hamburger mode
        isHovered = true;
        if (!ignoreHoverUntilLeave) showMenu();
    });

    container.addEventListener('mouseleave', () => {
        if (window.innerWidth <= 900) return; // Disable hover in mobile / hamburger mode
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
    // Select all page subheaders on the current page
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
            button.style.lineHeight = '1.3';
            button.style.padding = '14px 15px';
            button.style.borderBottom = '1px solid rgba(0, 0, 0, 0.2)';
            button.style.backgroundColor = 'rgb(235, 235, 235)';
            button.style.textDecoration = 'none';
            button.style.display = 'block';

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
        const parentColumn = sectionsCard.parentElement;
        const initialWidth = parentColumn.getBoundingClientRect().width;
        const initialOffsetTop = sectionsCard.getBoundingClientRect().top + window.scrollY;
        const topStickyPosition = 20;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            if (scrollY >= (initialOffsetTop - topStickyPosition)) {
                sectionsCard.style.position = 'fixed';
                sectionsCard.style.top = `${topStickyPosition}px`;
                sectionsCard.style.width = `${initialWidth}px`;
                sectionsCard.style.zIndex = '100';
            } else {
                sectionsCard.style.position = 'static';
                sectionsCard.style.width = '100%';
            }
        });
    }
});

// Responsive scaling for non-popped dashboard iframes
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.responsive-iframe-container').forEach(container => {
        const iframe = container.querySelector('.scalable-iframe');
        const virtualWidth = 1280;
        const virtualHeight = 853;

        function updateScale() {
            if (!iframe || container.classList.contains('popped-out')) return;
            const scale = container.clientWidth / virtualWidth;
            iframe.style.transform = `scale(${scale})`;
            container.style.height = `${virtualHeight * scale}px`;
        }

        const observer = new ResizeObserver(updateScale);
        observer.observe(container);
        updateScale();
    });
});

let activePoppedContainer = null;
let activeStackingParent = null;

function updatePoppedScale(container) {
    const iframe = container.querySelector('iframe');
    if (!iframe) return;

    const virtualWidth = 1280;
    const virtualHeight = 853;

    // Define responsive margins (mobile gets tighter margins, desktop gets comfortable margins)
    const isMobile = window.innerWidth <= 600;
    const marginX = isMobile ? 24 : 80;
    const marginY = isMobile ? 32 : 80;

    const availableWidth = Math.max(120, window.innerWidth - marginX);
    const availableHeight = Math.max(120, window.innerHeight - marginY);

    // Scale to fit available width and height while strictly maintaining the 1280x853 aspect ratio
    const scale = Math.min(availableWidth / virtualWidth, availableHeight / virtualHeight);

    const targetWidth = Math.round(virtualWidth * scale);
    const targetHeight = Math.round(virtualHeight * scale);

    // Apply proportional dimensions
    container.style.setProperty('width', `${targetWidth}px`, 'important');
    container.style.setProperty('height', `${targetHeight}px`, 'important');

    iframe.style.setProperty('width', `${virtualWidth}px`, 'important');
    iframe.style.setProperty('height', `${virtualHeight}px`, 'important');
    iframe.style.setProperty('transform', `scale(${scale})`, 'important');
    iframe.style.setProperty('transform-origin', '0 0', 'important');
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

    // Reset container size and iframe scale back to page flow
    activePoppedContainer.style.width = '';
    activePoppedContainer.style.height = '';
    if (iframe) {
        iframe.style.removeProperty('width');
        iframe.style.removeProperty('height');
        iframe.style.removeProperty('transform');
        iframe.style.removeProperty('transform-origin');
    }

    // Restore parent z-index
    if (activeStackingParent) {
        activeStackingParent.style.zIndex = activeStackingParent.dataset.origZ || '10';
        activeStackingParent = null;
    }

    const closedContainer = activePoppedContainer;
    activePoppedContainer = null;

    // Immediately restore thumbnail scale if it's a responsive container
    if (closedContainer.classList.contains('responsive-iframe-container')) {
        const scalableIframe = closedContainer.querySelector('.scalable-iframe');
        if (scalableIframe) {
            const scale = closedContainer.clientWidth / 1280;
            scalableIframe.style.transform = `scale(${scale})`;
            closedContainer.style.height = `${853 * scale}px`;
        }
    }
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
    const viewport = document.querySelector('.dashboard-cards-viewport');

    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

    if (viewport) {
        viewport.style.touchAction = 'pan-y'; // Allows natural vertical page scrolling on mobile
    }

    const originalCards = Array.from(track.querySelectorAll('.dashboard-card'));
    const totalReal = originalCards.length;
    if (totalReal === 0) return;

    // Create navigation dots for the real cards
    dotsContainer.innerHTML = '';
    originalCards.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.className = `card-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('title', `Go to dashboard ${idx + 1}`);
        dot.addEventListener('click', () => {
            stopAutoplay();
            goToDotIndex(idx);
        });
        dotsContainer.appendChild(dot);
    });

    // 1. Prepend an ENTIRE previous cycle (clones of cards 0..N-1)
    for (let i = totalReal - 1; i >= 0; i--) {
        const clone = originalCards[i].cloneNode(true);
        track.insertBefore(clone, track.firstChild);
    }

    // 2. Append an ENTIRE next cycle (clones of cards 0..N-1)
    for (let i = 0; i < totalReal; i++) {
        const clone = originalCards[i].cloneNode(true);
        track.appendChild(clone);
    }

    const allCards = track.querySelectorAll('.dashboard-card');
    let isTransitioning = false;

    function getStepWidth() {
        const cardWidth = allCards[0].offsetWidth;
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.gap) || 20;
        return cardWidth + gap;
    }

    function getCycleWidth() {
        return totalReal * getStepWidth();
    }

    function getCurrentLeft() {
        const parsed = parseFloat(track.style.left);
        return isNaN(parsed) ? (-totalReal * getStepWidth()) : parsed;
    }

    // Seamlessly normalizes any track position into the middle cycle [ -2*cycle, -1*cycle ]
    function normalizePosition(left) {
        const cycle = getCycleWidth();
        const minBound = -2 * cycle;
        const maxBound = -cycle;

        while (left < minBound) {
            left += cycle;
        }
        while (left > maxBound) {
            left -= cycle;
        }
        return left;
    }

    function updateDotsFromPosition(leftPos) {
        const step = getStepWidth();
        const rawIndex = Math.round(-leftPos / step);
        const activeDotIdx = ((rawIndex % totalReal) + totalReal) % totalReal;
        const dots = dotsContainer.querySelectorAll('.card-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activeDotIdx);
        });
    }

    function lockToAbsolutePos(pos, animate = true) {
        track.style.transition = animate ? 'left 0.4s cubic-bezier(0.25, 1, 0.5, 1)' : 'none';
        track.style.left = `${pos}px`;
        isTransitioning = animate;
        updateDotsFromPosition(pos);
    }

    function goToDotIndex(dotIdx) {
        const step = getStepWidth();
        const curLeft = normalizePosition(getCurrentLeft());
        const cycle = getCycleWidth();

        // Find the closest equivalent target for this dot relative to current position
        const baseTarget = -(totalReal + dotIdx) * step;
        const candidates = [baseTarget - cycle, baseTarget, baseTarget + cycle];
        candidates.sort((a, b) => Math.abs(a - curLeft) - Math.abs(b - curLeft));

        lockToAbsolutePos(candidates[0], true);
    }

    // "Next" button: finds the first card wall to the right of visible left edge
    function nextSlide() {
        const currentLeft = getCurrentLeft();
        const step = getStepWidth();
        const offsetRatio = -currentLeft / step;

        let nextIdx;
        if (Math.abs(offsetRatio - Math.round(offsetRatio)) > 0.05) {
            nextIdx = Math.floor(offsetRatio) + 1;
        } else {
            nextIdx = Math.round(offsetRatio) + 1;
        }
        lockToAbsolutePos(-nextIdx * step, true);
    }

    // "Prev" button: finds the first card wall to the left
    function prevSlide() {
        const currentLeft = getCurrentLeft();
        const step = getStepWidth();
        const offsetRatio = -currentLeft / step;

        let prevIdx;
        if (Math.abs(offsetRatio - Math.round(offsetRatio)) > 0.05) {
            prevIdx = Math.ceil(offsetRatio) - 1;
        } else {
            prevIdx = Math.round(offsetRatio) - 1;
        }
        lockToAbsolutePos(-prevIdx * step, true);
    }

    track.addEventListener('transitionend', (e) => {
        if (e.propertyName !== 'left') return;
        isTransitioning = false;

        // Silently normalize back to the center cycle without any visual jump
        const curLeft = getCurrentLeft();
        const normLeft = normalizePosition(curLeft);
        if (normLeft !== curLeft) {
            track.style.transition = 'none';
            track.style.left = `${normLeft}px`;
        }
    });

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

    // ==========================================
    // INFINITE SMOOTH DRAGGING / SWIPING
    // ==========================================
    let isPointerDown = false;
    let isDragging = false;
    let wasDragged = false;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocityX = 0;

    const dragTarget = viewport || track;

    dragTarget.addEventListener('pointerdown', (e) => {
        stopAutoplay();
        isPointerDown = true;
        isDragging = false;
        wasDragged = false;
        startX = e.clientX;
        startY = e.clientY;
        lastX = e.clientX;
        lastTime = performance.now();
        velocityX = 0;

        // Always start drag from a normalized center position
        const normalized = normalizePosition(getCurrentLeft());
        track.style.transition = 'none';
        track.style.left = `${normalized}px`;
        startLeft = normalized;
        isTransitioning = false;
    });

    window.addEventListener('pointermove', (e) => {
        if (!isPointerDown) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        if (!isDragging) {
            if (Math.abs(deltaX) > 8 && Math.abs(deltaX) > Math.abs(deltaY)) {
                isDragging = true;
                wasDragged = true;
                track.style.transition = 'none';
            } else if (Math.abs(deltaY) > 8) {
                isPointerDown = false; // Natural vertical page scroll
                return;
            }
        }

        if (isDragging) {
            const now = performance.now();
            const dt = now - lastTime;
            if (dt > 10) {
                velocityX = (e.clientX - lastX) / dt;
                lastX = e.clientX;
                lastTime = now;
            }

            let newLeft = startLeft + deltaX;
            const cycle = getCycleWidth();

            // Seamless infinite drag: shift cycle if pulled beyond buffer
            if (newLeft < -2 * cycle) {
                startLeft += cycle;
                newLeft += cycle;
            } else if (newLeft > -cycle) {
                startLeft -= cycle;
                newLeft -= cycle;
            }

            track.style.left = `${newLeft}px`;
            updateDotsFromPosition(newLeft);
        }
    });

    function finishDrag() {
        if (!isPointerDown) return;
        isPointerDown = false;

        if (isDragging) {
            isDragging = false;
            const currentLeft = getCurrentLeft();

            // Soft coast momentum based on swipe speed
            const coastDistance = velocityX * 140;
            const targetLeft = currentLeft + coastDistance;

            track.style.transition = 'left 0.4s ease-out';
            track.style.left = `${targetLeft}px`;
            updateDotsFromPosition(targetLeft);
        }
    }

    window.addEventListener('pointerup', finishDrag);
    window.addEventListener('pointercancel', finishDrag);

    // Prevent card link clicks when finishing a swipe
    track.addEventListener('click', (e) => {
        if (wasDragged) {
            e.preventDefault();
            e.stopPropagation();
            wasDragged = false;
        }
    }, true);

    window.addEventListener('resize', () => {
        const curLeft = normalizePosition(getCurrentLeft());
        track.style.transition = 'none';
        track.style.left = `${curLeft}px`;
    });

    // Initialize track in the center cycle (card 1)
    const initialPos = -totalReal * getStepWidth();
    track.style.transition = 'none';
    track.style.left = `${initialPos}px`;
    updateDotsFromPosition(initialPos);
});