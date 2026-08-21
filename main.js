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