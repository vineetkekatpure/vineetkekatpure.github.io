// Wait for DOM and components to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait a small delay for components.js to inject elements
    setTimeout(initApp, 50);
});

function initApp() {
    // DOM Elements
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const siteLogo = document.getElementById('site-logo');
    const scrollProgress = document.getElementById('scroll-progress');
    const resumeBtns = document.querySelectorAll('.resume-nav-btn');
    const resumeBlocks = document.querySelectorAll('.resume-block');

    // Constants - Get ASSET_PATH from window (set by components.js)
    const LIGHT_LOGO = (window.ASSET_PATH || '') + 'light_mode_logo.jpg';
    const DARK_LOGO = (window.ASSET_PATH || '') + 'dark_mode_logo.jpg';

    // Initialize Theme
    function initTheme() {
        // Check localStorage or default to light
        const savedMode = localStorage.getItem('mode') || 'light';
        setTheme(savedMode);
    }

    // Set Theme Function
    function setTheme(mode) {
        body.setAttribute('data-mode', mode);
        localStorage.setItem('mode', mode);

        // Update Icon
        if (themeIcon) {
            if (mode === 'dark') {
                themeIcon.classList.remove('ph-sun');
                themeIcon.classList.add('ph-moon');
            } else {
                themeIcon.classList.remove('ph-moon');
                themeIcon.classList.add('ph-sun');
            }
        }

        // Update Logo
        if (siteLogo) {
            siteLogo.src = mode === 'dark' ? DARK_LOGO : LIGHT_LOGO;
        }
    }

    // Toggle Theme Handler
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentMode = body.getAttribute('data-mode');
            const newMode = currentMode === 'light' ? 'dark' : 'light';
            setTheme(newMode);
        });
    }

    // Scroll Progress Handler
    window.addEventListener('scroll', () => {
        if (scrollProgress) {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

            scrollProgress.style.width = scrollPercent + '%';
        }
    });

    // Resume Hamburger Menu
    const resumeMenuToggle = document.getElementById('resume-menu-toggle');
    const resumeNavItems = document.getElementById('resume-nav-items');

    function toggleResumeMenu() {
        if (resumeMenuToggle && resumeNavItems) {
            resumeMenuToggle.classList.toggle('active');
            resumeNavItems.classList.toggle('open');
        }
    }

    function closeResumeMenu() {
        if (resumeMenuToggle && resumeNavItems) {
            resumeMenuToggle.classList.remove('active');
            resumeNavItems.classList.remove('open');
        }
    }

    if (resumeMenuToggle) {
        resumeMenuToggle.addEventListener('click', toggleResumeMenu);
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (resumeNavItems && resumeMenuToggle) {
            if (!resumeNavItems.contains(e.target) && !resumeMenuToggle.contains(e.target)) {
                closeResumeMenu();
            }
        }
    });

    // Resume Interaction
    resumeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetBlock = document.getElementById(targetId);

            if (targetBlock) {
                // Close hamburger menu on mobile
                closeResumeMenu();

                // Smooth Scroll
                targetBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Add Glow Effect
                // Remove from all first to reset
                resumeBlocks.forEach(b => b.classList.remove('glow-active'));

                // Add to target
                targetBlock.classList.add('glow-active');

                // Remove after timeout (2s)
                setTimeout(() => {
                    targetBlock.classList.remove('glow-active');
                }, 2000);

                // Update active state on buttons
                resumeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
        });
    });

    // Intersection Observer for Scroll Spy on Resume
    if (resumeBlocks.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    // Activate corresponding button
                    resumeBtns.forEach(btn => {
                        if (btn.getAttribute('data-target') === id) {
                            btn.classList.add('active');
                        } else {
                            btn.classList.remove('active');
                        }
                    });
                }
            });
        }, observerOptions);

        resumeBlocks.forEach(block => observer.observe(block));

        // Handle scroll to bottom - activate last section
        window.addEventListener('scroll', () => {
            // Check if at bottom of page
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;

            // If within 50px of bottom, activate the last resume nav button
            if (scrollHeight - scrollTop - clientHeight < 50) {
                if (resumeBtns.length > 0) {
                    resumeBtns.forEach(btn => btn.classList.remove('active'));
                    resumeBtns[resumeBtns.length - 1].classList.add('active');
                }
            }
        });
    }

    // Initial Call
    initTheme();
}
