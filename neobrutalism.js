/* ========================================
   NEUBRUTALISM INTERACTIONS
   d.r. Albright Portfolio 2025
======================================== */

class NeoBrutalism {
    constructor() {
        this.currentBlade = 0; // Start at Toy Soldiers HD
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupFloatingUFOs();
        this.setupKineticTypography();
        this.setupScrollytelling();
        this.setupInteractiveElements();
        this.setupCursorEffects();
        this.setupBladeNavigation();
        this.setupMobileMenu();
        this.setupPortraitToggle();
        this.setupSmoothScrolling();
        this.setupSlopcadePreview();
    }

    /* ========================================
       SCROLL-TRIGGERED ANIMATIONS
    ======================================== */
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        // Observe all elements with animation classes
        const animatedElements = document.querySelectorAll('.neo-reveal, .neo-slide-in-left, .neo-slide-in-right');
        animatedElements.forEach(el => observer.observe(el));
    }

    /* ========================================
       FLOATING UFO ELEMENTS
    ======================================== */
    setupFloatingUFOs() {
        const ufoContainer = document.createElement('div');
        ufoContainer.className = 'neo-ufo-container';
        ufoContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        document.body.appendChild(ufoContainer);

        // Spawn all UFOs at once (no setTimeouts)
        this.createUFO('circle', 'neo-bg-yellow');
        this.createUFO('square', 'neo-bg-pink');
        this.createUFO('triangle', '');
 
        this.createUFO('circle', 'neo-bg-purple');
        this.createUFO('square', 'neo-bg-green');
    }

    createUFO(type, colorClass) {
        let ufo;
        // Parent container
        ufo = document.createElement('div');
        ufo.className = 'neo-ufo';
        ufo.style.position = 'absolute';
        ufo.style.width = '50px';
        ufo.style.height = '50px';
        ufo.style.pointerEvents = 'none';
        ufo.style.zIndex = '2';

        // Shadow shape (offset, black, no border for circle/square)
        const shadow = document.createElement('div');
        shadow.style.position = 'absolute';
        shadow.style.left = '10%';
        shadow.style.top = '10%';
        shadow.style.width = '50px';
        shadow.style.height = '50px';
        shadow.style.zIndex = '1';

        // Main shape (on top)
        const mainShape = document.createElement('div');
        mainShape.style.position = 'absolute';
        mainShape.style.left = '0';
        mainShape.style.top = '0';
        mainShape.style.width = '50px';
        mainShape.style.height = '50px';
        mainShape.style.zIndex = '2';

        // Color palette for triangles (excluding deep black, shadow, and white)
        const triangleColors = [
            'var(--neo-electric-blue)',
            'var(--neo-hot-pink)',
            'var(--neo-neon-yellow)',
            'var(--neo-cyan)',
            'var(--neo-orange)',
            'var(--neo-lime)',
            'var(--neo-purple)',
            'var(--neo-green)'
        ];

        if (type === 'triangle') {
            // Shadow triangle
            shadow.className = 'neo-ufo-triangle';
            shadow.style.borderLeft = '25px solid transparent';
            shadow.style.borderRight = '25px solid transparent';
            shadow.style.borderBottom = '50px solid var(--neo-deep-black)';
            // Main triangle
            mainShape.className = 'neo-ufo-triangle';
            mainShape.style.borderLeft = '25px solid transparent';
            mainShape.style.borderRight = '25px solid transparent';
            // Pick a random color for the triangle
            const randomColor = triangleColors[Math.floor(Math.random() * triangleColors.length)];
            mainShape.style.borderBottom = `50px solid ${randomColor}`;
        } else if (type === 'circle') {
            // Shadow circle
            shadow.className = 'neo-ufo-circle';
            shadow.style.background = 'var(--neo-deep-black)';
            shadow.style.borderRadius = '50%';
            // Main circle
            mainShape.className = 'neo-ufo-circle';
            // Pick a random color for the circle
            const randomColor = triangleColors[Math.floor(Math.random() * triangleColors.length)];
            mainShape.style.background = randomColor;
            mainShape.style.borderRadius = '50%';
        } else if (type === 'square') {
            // Shadow square
            shadow.className = 'neo-ufo-square';
            shadow.style.background = 'var(--neo-deep-black)';
            shadow.style.borderRadius = '0';
            // Main square
            mainShape.className = 'neo-ufo-square';
            // Pick a random color for the square
            const randomColor = triangleColors[Math.floor(Math.random() * triangleColors.length)];
            mainShape.style.background = randomColor;
            mainShape.style.borderRadius = '0';
        }
        // Append shadow and main shape
        ufo.appendChild(shadow);
        ufo.appendChild(mainShape);
        // Random positioning
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 100);
        ufo.style.left = `${x}px`;
        ufo.style.top = `${y}px`;
        // Add to container
        const container = document.querySelector('.neo-ufo-container');
        if (container) {
            container.appendChild(ufo);
        }
        // Mouse interaction
        this.addUFOInteraction(ufo);
    }

    addUFOInteraction(ufo) {
        let isInteracting = false;
        document.addEventListener('mousemove', (e) => {
            if (isInteracting) return;
            // For triangle, apply transform to parent
            let target = ufo;
            if (ufo.classList.contains('neo-ufo-triangle-shadow')) {
                target = ufo;
            }
            const rect = target.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            if (distance < 150) {
                isInteracting = true;
                const moveX = deltaX * 0.1;
                const moveY = deltaY * 0.1;
                target.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
                target.style.transition = 'transform 0.3s ease';
                setTimeout(() => {
                    target.style.transform = '';
                    isInteracting = false;
                }, 1000);
            }
        });
    }

    /* ========================================
       KINETIC TYPOGRAPHY
    ======================================== */
    setupKineticTypography() {
        const kineticElements = document.querySelectorAll('.neo-kinetic-text');
        
        kineticElements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';
            
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.className = 'letter';
                span.style.animationDelay = `${index * 0.05}s`;
                element.appendChild(span);
            });
        });
    }

    /* ========================================
       SCROLLYTELLING
    ======================================== */
    setupScrollytelling() {
        const scrollElements = document.querySelectorAll('[data-scroll-trigger]');
        
        scrollElements.forEach(element => {
            const trigger = element.dataset.scrollTrigger;
            const targetElement = document.querySelector(trigger);
            
            if (targetElement) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.triggerScrollEvent(element, targetElement);
                        }
                    });
                }, { threshold: 0.5 });
                
                observer.observe(targetElement);
            }
        });

        // Parallax scroll effects
        window.addEventListener('scroll', () => {
            this.updateParallaxElements();
        });
    }

    triggerScrollEvent(triggerElement, targetElement) {
        const action = triggerElement.dataset.scrollAction;
        
        switch (action) {
            case 'color-change':
                this.animateColorChange(targetElement);
                break;
            case 'scale-up':
                this.animateScaleUp(targetElement);
                break;
            case 'slide-in':
                this.animateSlideIn(targetElement);
                break;
        }
    }

    animateColorChange(element) {
        const colors = ['neo-color-blue', 'neo-color-pink', 'neo-color-yellow'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        element.classList.add(randomColor);
    }

    animateScaleUp(element) {
        element.style.transform = 'scale(1.1)';
        element.style.transition = 'transform 0.5s ease';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 500);
    }

    animateSlideIn(element) {
        element.style.transform = 'translateX(-50px)';
        element.style.opacity = '0';
        element.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
        }, 100);
    }

    updateParallaxElements() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.neo-parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallaxSpeed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    /* ========================================
       INTERACTIVE ELEMENTS
    ======================================== */
    setupInteractiveElements() {
        // Brutal button interactions
        const buttons = document.querySelectorAll('.neo-button');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.createButtonParticles(e.target);
            });
        });

        // Card hover effects
        const cards = document.querySelectorAll('.neo-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addCardGlow(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeCardGlow(card);
            });
        });

        // Section click animations
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.addEventListener('click', (e) => {
                this.createClickRipple(e);
            });
        });
    }

    createButtonParticles(button) {
        const rect = button.getBoundingClientRect();
        
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: var(--neo-neon-yellow);
                border: 2px solid var(--neo-deep-black);
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                z-index: 1000;
                pointer-events: none;
                animation: particle-burst 0.6s ease forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 600);
        }
    }

    addCardGlow(card) {
        card.style.boxShadow = `
            8px 8px 0 var(--neo-brutal-shadow),
            0 0 20px var(--neo-electric-blue)
        `;
    }

    removeCardGlow(card) {
        card.style.boxShadow = `8px 8px 0 var(--neo-brutal-shadow)`;
    }

    createClickRipple(event) {
        const ripple = document.createElement('div');
        const rect = event.currentTarget.getBoundingClientRect();
        
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: var(--neo-hot-pink);
            border: 2px solid var(--neo-deep-black);
            left: ${event.clientX - rect.left - 10}px;
            top: ${event.clientY - rect.top - 10}px;
            z-index: 100;
            pointer-events: none;
            animation: ripple-effect 0.8s ease forwards;
        `;
        
        event.currentTarget.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
    }

    /* ========================================
       CURSOR EFFECTS
    ======================================== */
    setupCursorEffects() {
        const cursor = document.createElement('div');
        cursor.className = 'neo-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--neo-electric-blue);
            border: 2px solid var(--neo-deep-black);
            z-index: 9999;
            pointer-events: none;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        `;
        
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });

        // Cursor interactions
        const interactiveElements = document.querySelectorAll('button, a, .neo-button, .neo-card');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.background = 'var(--neo-hot-pink)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'var(--neo-electric-blue)';
            });
        });
    }

    /* ========================================
       XBOX 360 BLADE CAROUSEL
    ======================================== */
    setupBladeNavigation() {
        const gameItems = document.querySelectorAll('.neo-game-item');
        
        if (!gameItems.length) return;
        
        this.isNavigating = false;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.dragThreshold = 50;
        
        // Game items are no longer clickable - titles contain the links
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isNavigating) return;
            
            const gamesSection = document.getElementById('games');
            if (!gamesSection) return;
            
            const rect = gamesSection.getBoundingClientRect();
            const isInGamesSection = rect.top <= window.innerHeight/2 && rect.bottom >= window.innerHeight/2;
            
            if (!isInGamesSection) return;
            
            if (e.key === 'ArrowLeft' && this.currentBlade > 0) {
                e.preventDefault();
                this.navigateToGame(this.currentBlade - 1);
            } else if (e.key === 'ArrowRight' && this.currentBlade < gameItems.length - 1) {
                e.preventDefault();
                this.navigateToGame(this.currentBlade + 1);
            }
        });

        // Mouse wheel navigation - only when hovering over game container
        const gameContainer = document.querySelector('.neo-game-blade-container');
        if (gameContainer) {
            let isHoveringGameArea = false;
            
            gameContainer.addEventListener('mouseenter', () => {
                isHoveringGameArea = true;
            });
            
            gameContainer.addEventListener('mouseleave', () => {
                isHoveringGameArea = false;
            });
            
            gameContainer.addEventListener('wheel', (e) => {
                if (!isHoveringGameArea) return;
                
                // Always prevent browser scrolling when over game area
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                
                if (this.isNavigating) return;
                
                if (e.deltaY > 0 && this.currentBlade < gameItems.length - 1) {
                    // Scroll down/right - next game
                    this.navigateToGame(this.currentBlade + 1);
                } else if (e.deltaY < 0 && this.currentBlade > 0) {
                    // Scroll up/left - previous game
                    this.navigateToGame(this.currentBlade - 1);
                }
            }, { passive: false });

            // Touch/Mouse drag navigation
            gameContainer.addEventListener('mousedown', this.handleDragStart.bind(this));
            gameContainer.addEventListener('touchstart', this.handleDragStart.bind(this), { passive: true });
            
            document.addEventListener('mousemove', this.handleDragMove.bind(this));
            document.addEventListener('touchmove', this.handleDragMove.bind(this), { passive: true });
            
            document.addEventListener('mouseup', this.handleDragEnd.bind(this));
            document.addEventListener('touchend', this.handleDragEnd.bind(this));
        }

        // Initial setup of blade positions
        this.navigateToGame(this.currentBlade);
    }

    handleDragStart(e) {
        if (this.isNavigating) return;
        
        this.isDragging = true;
        const touch = e.touches ? e.touches[0] : e;
        this.startX = touch.clientX;
        this.startY = touch.clientY;
        this.currentX = touch.clientX;
        
        // Prevent text selection during drag
        e.preventDefault();
    }

    handleDragMove(e) {
        if (!this.isDragging || this.isNavigating) return;
        
        const touch = e.touches ? e.touches[0] : e;
        this.currentX = touch.clientX;
    }

    handleDragEnd(e) {
        if (!this.isDragging || this.isNavigating) return;
        
        this.isDragging = false;
        
        const deltaX = this.currentX - this.startX;
        const gameItems = document.querySelectorAll('.neo-game-item');
        
        // Check if drag distance exceeds threshold
        if (Math.abs(deltaX) > this.dragThreshold) {
            if (deltaX > 0 && this.currentBlade > 0) {
                // Dragged right - previous game
                this.navigateToGame(this.currentBlade - 1);
            } else if (deltaX < 0 && this.currentBlade < gameItems.length - 1) {
                // Dragged left - next game
                this.navigateToGame(this.currentBlade + 1);
            }
        }
    }

    navigateToGame(index) {
        const gameItems = document.querySelectorAll('.neo-game-item');
        
        if (index < 0 || index >= gameItems.length || this.isNavigating) return;
        
        this.isNavigating = true;
        this.currentBlade = index;
        
        // Update positions for all items
        gameItems.forEach((item, i) => {
            item.classList.remove('active', 'prev', 'next', 'far-left', 'far-right', 'far-far-left', 'far-far-right', 'offscreen');
            
            const diff = i - index;
            switch(diff) {
                case 0: item.classList.add('active'); break;
                case -1: item.classList.add('prev'); break;
                case 1: item.classList.add('next'); break;
                case -2: item.classList.add('far-left'); break;
                case 2: item.classList.add('far-right'); break;
                case -3: item.classList.add('far-far-left'); break;
                case 3: item.classList.add('far-far-right'); break;
                default: item.classList.add('offscreen'); break;
            }
        });
        
        setTimeout(() => {
            this.isNavigating = false;
        }, 400);
    }

    /* ========================================
       MOBILE MENU FUNCTIONALITY
    ======================================== */
    setupMobileMenu() {
        const mobileToggle = document.querySelector('.neo-nav-mobile-toggle');
        const navMenu = document.querySelector('.neo-nav-menu');
        
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
            });
            
            // Close menu when clicking nav links
            document.querySelectorAll('.neo-nav-link').forEach(link => {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    /* ========================================
       PORTRAIT TOGGLE (INDEX PAGE)
    ======================================== */
    setupPortraitToggle() {
        const portrait = document.querySelector('.neo-portrait-frame');
        if (!portrait) return; // Only on index page
        
        let isOriginal = true;
        
        setInterval(() => {
            if (isOriginal) {
                portrait.src = 'images/clones.jpg';
            } else {
                portrait.src = 'images/portrait.jpg';
            }
            isOriginal = !isOriginal;
        }, 3000);
    }

    /* ========================================
       SMOOTH SCROLLING NAVIGATION
    ======================================== */
    setupSmoothScrolling() {
        // Enhanced scrolling for navigation with snap behavior
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    // Use smooth scroll with snap alignment
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                    });
                }
            });
        });

        // Ensure scroll snap works on all browsers
        // Add a small delay to ensure proper snap behavior on page load
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 100);

        // Enhanced keyboard navigation
        document.addEventListener('keydown', function(e) {
            const sections = document.querySelectorAll('.neo-hero-section, .neo-section');
            const currentSection = Math.round(window.scrollY / window.innerHeight);
            
            if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
                e.preventDefault();
                sections[currentSection + 1].scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else if (e.key === 'ArrowUp' && currentSection > 0) {
                e.preventDefault();
                sections[currentSection - 1].scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    /* ========================================
       SLOPCADE PREVIEW FUNCTIONALITY (MODAL)
    ======================================== */
    setupSlopcadePreview() {
        const slopcadeItems = Array.from(document.querySelectorAll('.slopcade-item'));
        if (slopcadeItems.length === 0) return; // Only on slopcade page

        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'slopcade-modal';
        modal.style.cssText = `
            position: fixed; left: 0; top: 0; width: 100vw; height: 100vh;
            background: rgba(20, 0, 40, 0.97); z-index: 2147483647;
            display: flex; align-items: center; justify-content: center;
            opacity: 0; pointer-events: none; transition: opacity 0.2s;
        `;
        modal.innerHTML = `
            <button class="slopcade-modal-close" style="position:absolute;top:24px;right:32px;font-size:2.5rem;background:none;border:none;color:#fff;z-index:2;cursor:pointer;"><i class="fas fa-times"></i></button>
            <button class="slopcade-modal-arrow slopcade-modal-prev" style="position:absolute;left:24px;top:50%;transform:translateY(-50%);font-size:2.5rem;background:none;border:none;color:#fff;z-index:2;cursor:pointer;"><i class="fas fa-chevron-left"></i></button>
            <button class="slopcade-modal-arrow slopcade-modal-next" style="position:absolute;right:24px;top:50%;transform:translateY(-50%);font-size:2.5rem;background:none;border:none;color:#fff;z-index:2;cursor:pointer;"><i class="fas fa-chevron-right"></i></button>
            <div class="slopcade-modal-content" style="max-width:90vw;max-height:90vh;display:flex;align-items:center;justify-content:center;position:relative;z-index:1;"></div>
        `;
        document.body.appendChild(modal);
        const closeBtn = modal.querySelector('.slopcade-modal-close');
        const prevBtn = modal.querySelector('.slopcade-modal-prev');
        const nextBtn = modal.querySelector('.slopcade-modal-next');
        const content = modal.querySelector('.slopcade-modal-content');

        let currentIndex = -1;
        let lastTouchTime = 0;
        let lastTapTarget = null;
        let preventOpen = false;
        let longPressTimer = null;
        let hintShown = false;
        let hintTimeout = null;

        // Helper: open modal for index
        const openModal = (idx) => {
            if (idx < 0 || idx >= slopcadeItems.length) return;
            currentIndex = idx;
            const item = slopcadeItems[idx];
            const img = item.querySelector('img');
            const video = item.querySelector('video');
            const caption = item.querySelector('.slopcade-caption')?.textContent || '';
            content.innerHTML = '';
            // Create a vertical flex container for media + caption
            const vertical = document.createElement('div');
            vertical.style.display = 'flex';
            vertical.style.flexDirection = 'column';
            vertical.style.alignItems = 'center';
            vertical.style.justifyContent = 'center';
            vertical.style.maxWidth = '90vw';
            vertical.style.maxHeight = '80vh';
            vertical.style.width = '100%';
            vertical.style.height = '100%';
            if (video) {
                const vid = document.createElement('video');
                vid.src = video.src;
                vid.autoplay = true;
                vid.loop = true;
                vid.muted = true;
                vid.controls = true;
                vid.style.maxWidth = '90vw';
                vid.style.maxHeight = '60vh';
                vid.style.display = 'block';
                vertical.appendChild(vid);
            } else if (img) {
                const image = document.createElement('img');
                image.src = img.src;
                image.alt = img.alt || '';
                image.style.maxWidth = '90vw';
                image.style.maxHeight = '60vh';
                image.style.display = 'block';
                vertical.appendChild(image);
            }
            if (caption) {
                const cap = document.createElement('div');
                cap.textContent = caption;
                cap.style.cssText = 'color:#fff;text-align:center;font-size:1.2rem;margin-top:1.5rem;text-shadow:2px 2px 8px #000;width:100%;';
                vertical.appendChild(cap);
            }
            content.appendChild(vertical);
            modal.style.opacity = '1';
            modal.style.pointerEvents = 'auto';
            document.body.style.overflow = 'hidden';
        };
        // Helper: close modal
        const closeModal = () => {
            modal.style.opacity = '0';
            modal.style.pointerEvents = 'none';
            document.body.style.overflow = '';
            setTimeout(() => { content.innerHTML = ''; }, 200);
            preventOpen = true;
            setTimeout(() => { preventOpen = false; }, 400); // Prevent immediate re-open
        };
        // Navigation
        const showPrev = () => openModal((currentIndex - 1 + slopcadeItems.length) % slopcadeItems.length);
        const showNext = () => openModal((currentIndex + 1) % slopcadeItems.length);

        // Event listeners for modal controls
        closeBtn.addEventListener('click', closeModal);
        prevBtn.addEventListener('click', showPrev);
        nextBtn.addEventListener('click', showNext);
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (modal.style.opacity !== '1') return;
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        });
        // Click outside content closes
        modal.addEventListener('mousedown', (e) => {
            if (e.target === modal) closeModal();
        });
        // Touch outside content closes
        modal.addEventListener('touchstart', (e) => {
            if (e.target === modal) closeModal();
        });
        // Swipe navigation (mobile)
        let touchStartX = 0;
        let touchEndX = 0;
        modal.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) touchStartX = e.touches[0].clientX;
        });
        modal.addEventListener('touchend', (e) => {
            if (touchStartX === 0) return;
            touchEndX = e.changedTouches[0].clientX;
            const dx = touchEndX - touchStartX;
            if (Math.abs(dx) > 60) {
                if (dx > 0) showPrev();
                else showNext();
            }
            touchStartX = 0;
            touchEndX = 0;
        });

        // Double-tap and long-press detection for mobile, single click for desktop
        slopcadeItems.forEach((item, idx) => {
            // Skip text-only items
            if (item.classList.contains('slopcade-text-item')) return;
            // Mouse click: always open modal, regardless of screen size
            item.addEventListener('click', (e) => {
                if (preventOpen) return;
                e.preventDefault();
                openModal(idx);
            });
            // Mobile: double-tap or long-press
            item.addEventListener('touchend', (e) => {
                if (window.innerWidth > 900) return; // Only mobile
                if (preventOpen) return;
                if (longPressTimer) {
                    clearTimeout(longPressTimer);
                    longPressTimer = null;
                }
                const now = Date.now();
                if (lastTapTarget === item && now - lastTouchTime < 600) {
                    e.preventDefault();
                    openModal(idx);
                    lastTouchTime = 0;
                    lastTapTarget = null;
                } else {
                    lastTouchTime = now;
                    lastTapTarget = item;
                    // Show hint on first tap
                    if (!hintShown) {
                        const hint = document.createElement('div');
                        hint.textContent = 'Double-tap or long-press to preview';
                        hint.style.cssText = 'position:absolute;left:50%;top:10%;transform:translateX(-50%);background:rgba(0,0,0,0.8);color:#fff;padding:8px 16px;border-radius:8px;font-size:1rem;z-index:10000;pointer-events:none;';
                        item.appendChild(hint);
                        hintShown = true;
                        hintTimeout = setTimeout(() => {
                            hint.remove();
                            hintShown = false;
                        }, 1200);
                    }
                }
            });
            item.addEventListener('touchstart', (e) => {
                if (window.innerWidth > 900) return;
                if (preventOpen) return;
                if (longPressTimer) clearTimeout(longPressTimer);
                longPressTimer = setTimeout(() => {
                    openModal(idx);
                    longPressTimer = null;
                }, 400); // 400ms long-press
            });
            item.addEventListener('touchmove', (e) => {
                if (longPressTimer) {
                    clearTimeout(longPressTimer);
                    longPressTimer = null;
                }
            });
            item.addEventListener('touchcancel', (e) => {
                if (longPressTimer) {
                    clearTimeout(longPressTimer);
                    longPressTimer = null;
                }
            });
        });
    }
}

/* ========================================
   ADDITIONAL ANIMATIONS
======================================== */
const additionalStyles = `
    @keyframes particle-burst {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0) translateY(-50px);
            opacity: 0;
        }
    }

    @keyframes ripple-effect {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(8);
            opacity: 0;
        }
    }

    .neo-cursor {
        border-radius: 2px;
    }

    @media (max-width: 768px) {
        .neo-cursor {
            display: none;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

/* ========================================
   INITIALIZE ON DOM LOADED
======================================== */
document.addEventListener('DOMContentLoaded', () => {
    new NeoBrutalism();
});

// Performance optimization
window.addEventListener('load', () => {
    // Remove any loading states
    document.body.classList.add('neo-loaded');
    
    // Optimize animations for mobile
    if (window.innerWidth <= 768) {
        document.body.classList.add('neo-mobile');
    }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NeoBrutalism;
} 