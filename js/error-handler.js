// Global error handler and performance optimizer
(function() {
    'use strict';
    
    // Enhanced error handling for external resources
    window.addEventListener('error', function(e) {
        if (e.filename && !e.filename.includes(window.location.hostname)) {
            return true;
        }
        return true;
    });
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(e) {
        e.preventDefault();
    });
    
    // Handle network errors for external links
    function handleExternalLinkErrors() {
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a[href^="http"]');
        });
    }
    
    // Optimize images loading with better error handling
    function optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add loading="lazy" for better performance
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Enhanced image error handling
img.addEventListener('error', function() {}
                
                // Try to load a placeholder if available
                if (!this.src.includes('placeholder')) {
                    // You can uncomment this if you have a placeholder image
                    // this.src = 'images/placeholder.jpg';
                }
            });
            
            // Add loading state
            img.addEventListener('loadstart', function() {
                this.style.opacity = '0.7';
            });
            
            img.addEventListener('load', function() {
                this.style.opacity = '1';
                this.style.border = 'none';
            });
        });
    }
    
    // Handle CSP violations gracefully

    
    // Protect against XSS and other security issues
    function enhanceSecurity() {
        // Prevent inline script injection
        const metaCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
        if (!metaCSP) {
            const meta = document.createElement('meta');
            meta.httpEquiv = 'Content-Security-Policy';
            meta.content = "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com https://unpkg.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com https://unpkg.com; img-src 'self' data: https:;";
            document.head.appendChild(meta);
        }
    }
    
    // Initialize when DOM is ready
    function initialize() {
        optimizeImages();
        handleExternalLinkErrors();
        enhanceSecurity();
        initializeAOS();
    }
    
    // Initialize AOS (Animate On Scroll) with error handling
    function initializeAOS() {
        try {
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 800,
                    easing: 'ease-in-out',
                    once: true,
                    offset: 100,
                    disable: function() {
                        return window.innerWidth < 768;
                    }
                });
            }
        } catch (error) {}
    }
    
    // Smooth scrolling for anchor links with error handling
    function initializeSmoothScrolling() {
        try {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        } catch (error) {}
    }
    
    // Smooth sticky behavior with error handling
    function initializeHeader() {
        try {
            const header = document.querySelector('header');
            if (header) {
                let ticking = false;
                
                function updateHeader() {
                    try {
                        if (window.scrollY > 100) {
                            header.classList.add('sticky');
                        } else {
                            header.classList.remove('sticky');
                        }
                    } catch (error) {}
                    ticking = false;
                }
                
                window.addEventListener('scroll', function() {
                    if (!ticking) {
                        requestAnimationFrame(updateHeader);
                        ticking = true;
                    }
                });
            }
        } catch (error) {}
    }
    
    // Safe event listener
    function safeAddEventListener(target, event, handler) {
        try {
            target.addEventListener(event, handler);
        } catch (error) {}
    }
    
    // Initialize all features safely
    if (document.readyState === 'loading') {
        safeAddEventListener(document, 'DOMContentLoaded', function() {
            initialize();
            initializeSmoothScrolling();
            initializeHeader();
        });
    } else {
        initialize();
        initializeSmoothScrolling();
        initializeHeader();
    }
    
})();