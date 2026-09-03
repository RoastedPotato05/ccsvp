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
    const subheaders = document.querySelectorAll('.page-subheader');
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
const iframe = container.querySelector('.scalable-iframe');
const virtualWidth = 1280;
const virtualHeight = 853;

function updateScale() {
    // Calculate scale factor dynamically based on current container width
    const scale = container.clientWidth / virtualWidth;
    iframe.style.transform = `scale(${scale})`;
    
    // Automatically resize the container height to match the scaled iframe content
    container.style.height = `${virtualHeight * scale}px`;
}

// Re-calculate whenever the window or parent container changes size
const observer = new ResizeObserver(updateScale);
observer.observe(container);

// Initial run
updateScale();



function loadIframe(overlayElement) {
    const container = overlayElement.parentElement;
    const iframe = container.querySelector('iframe');
    
    // Trigger loading if not already loaded
    if (iframe && (!iframe.getAttribute('src') || iframe.getAttribute('src') === '')) {
        iframe.src = iframe.getAttribute('data-src');
    }
    
    // Change text to show loading status and disable extra clicks
    const textSpan = overlayElement.querySelector('.overlay-text');
    if (textSpan) {
        textSpan.textContent = "Loading interactive display...";
    }
    overlayElement.style.pointerEvents = 'none';
    
    // Wait 3 seconds to let the dashboard initialize, then fade out
    setTimeout(() => {
        overlayElement.style.transition = 'opacity 0.3s ease';
        overlayElement.style.opacity = '0';
        setTimeout(() => {
            overlayElement.style.display = 'none';
        }, 300);
    }, 3000);
}