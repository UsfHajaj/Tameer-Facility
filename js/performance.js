// Performance optimizations and utilities
(function() {
    'use strict';
    
    // Lazy loading for images
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Preload critical resources
    function preloadCriticalResources() {
        const criticalImages = [
            'images/socialhousing_high.jpg',
            'images/logo1-300x194.png',
            'images/لوجو الشركة.jpeg'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
    
    // Optimize scroll performance
    function optimizeScrollPerformance() {
        let ticking = false;
        
        function updateOnScroll() {
            // Add any scroll-based animations here
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initLazyLoading();
            preloadCriticalResources();
            optimizeScrollPerformance();
        });
    } else {
        initLazyLoading();
        preloadCriticalResources();
        optimizeScrollPerformance();
    }
    
})();
