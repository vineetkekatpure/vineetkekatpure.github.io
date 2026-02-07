// components.js - Handles dynamic header and footer injection

(function () {
    // Determine if we're in a subdirectory (like /blog/)
    const isSubdir = window.location.pathname.includes('/blog/');
    const basePath = isSubdir ? '../' : '';
    const assetPath = basePath + 'assets/';

    // Determine current page for active link highlighting
    const currentPath = window.location.pathname;
    const isHome = currentPath.endsWith('index.html') || currentPath.endsWith('/') && !isSubdir;
    const isBlogs = currentPath.includes('blogs.html') || currentPath.includes('/blog/');
    const isResume = currentPath.includes('resume.html');

    // Generate header HTML
    function generateHeader() {
        const homeLink = !isHome ? `<a href="${basePath}index.html"${isHome ? ' class="active-link"' : ''}>Home</a>` : '';

        return `
    <!-- Top Bar -->
    <nav class="top-bar">
        <button id="theme-toggle" aria-label="Toggle Dark Mode">
            <i class="ph ph-sun" id="theme-icon"></i>
        </button>
        <div class="logo-container">
            <a href="${basePath}index.html">
                <img src="${assetPath}light_mode_logo.jpg" alt="Logo" id="site-logo">
            </a>
        </div>
        <div class="nav-links">
            ${homeLink}
            <a href="${basePath}blogs.html"${isBlogs ? ' class="active-link"' : ''}>Blogs</a>
            <a href="${basePath}resume.html"${isResume ? ' class="active-link"' : ''}>Resume</a>
        </div>
    </nav>
        `
    }

    // Generate footer HTML
    function generateFooter() {
        return `
    <!-- Bottom Bar -->
    <footer class="bottom-bar">
        <div class="social-links">
            <a href="https://www.linkedin.com/in/vineet-kekatpure/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i class="ph ph-linkedin-logo"></i>
            </a>
            <a href="mailto:vineet.kekatpure@gmail.com" aria-label="Email">
                <i class="ph ph-envelope"></i>
            </a>
        </div>
    </footer>
        `;
    }

    // Inject header at the start of body
    function injectHeader() {
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = generateHeader();
        }
    }

    // Inject footer before scripts
    function injectFooter() {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = generateFooter();
        }
    }

    // Inject favicon dynamically
    function injectFavicon() {
        // Check if favicon already exists
        if (!document.querySelector('link[rel="icon"]')) {
            const favicon = document.createElement('link');
            favicon.rel = 'icon';
            favicon.type = 'image/jpeg';
            favicon.href = assetPath + 'light_mode_logo.jpg';
            document.head.appendChild(favicon);
        }
    }

    // Set ASSET_PATH for script.js
    window.ASSET_PATH = assetPath;

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            injectFavicon();
            injectHeader();
            injectFooter();
        });
    } else {
        injectFavicon();
        injectHeader();
        injectFooter();
    }
})();
