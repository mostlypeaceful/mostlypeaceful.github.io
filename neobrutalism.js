document.addEventListener('DOMContentLoaded', () => {
    setupMobileNav();
    setupPortraitSwap();
});

function setupMobileNav() {
    const toggle = document.querySelector('.nav__toggle');
    const links = document.querySelector('.nav__links');

    if (!toggle || !links) {
        return;
    }

    toggle.addEventListener('click', () => {
        const isOpen = links.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    links.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            links.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}

function setupPortraitSwap() {
    const portrait = document.querySelector('.hero__portrait img');
    if (!portrait) {
        return;
    }

    const original = portrait.getAttribute('src');
    const alt = portrait.dataset.altSrc;

    if (!original || !alt) {
        return;
    }

    let showingOriginal = true;
    setInterval(() => {
        portrait.src = showingOriginal ? alt : original;
        showingOriginal = !showingOriginal;
    }, 3000);
} 