// Website Health Monitor
(function() {
    'use strict';
    
    let performanceMetrics = {
        pageLoadTime: 0,
        errorCount: 0,
        resourceErrors: [],
        externalErrors: [],
        lastActivity: Date.now()
    };
    
    // Monitor page performance
    function monitorPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', function() {
                setTimeout(function() {
                    const navigation = performance.getEntriesByType('navigation')[0];
                    if (navigation) {
                        performanceMetrics.pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
                    }
                }, 100);
            });
        }
    }
    
    // Monitor resource loading
    function monitorResources() {
        // Monitor failed resource loads
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.name.includes('.js') || entry.name.includes('.css') || entry.name.includes('.jpg') || entry.name.includes('.png')) {
                    if (entry.transferSize === 0 && entry.decodedBodySize === 0) {
                        performanceMetrics.resourceErrors.push({
                            url: entry.name,
                            time: new Date().toISOString()
                        });

                    }
                }
            });
        });
        
        try {
            observer.observe({entryTypes: ['resource']});
        } catch (e) {}
    }
    
    // Monitor external link health
    function monitorExternalLinks() {
        const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
        
        externalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
            });
        });
    }
    
    // User activity monitoring
    function monitorUserActivity() {
        const events = ['click', 'scroll', 'keydown', 'mousemove', 'touchstart'];
        
        events.forEach(event => {
            document.addEventListener(event, function() {
                performanceMetrics.lastActivity = Date.now();
            }, { passive: true });
        });
        
        // Check for inactive users

    }
    
    // Generate health report
    function generateHealthReport() {
        const report = {
            timestamp: new Date().toISOString(),
            performance: performanceMetrics,
            browser: {
                userAgent: navigator.userAgent,
                language: navigator.language,
                cookieEnabled: navigator.cookieEnabled,
                onLine: navigator.onLine
            },
            page: {
                url: window.location.href,
                referrer: document.referrer,
                title: document.title
            }
        };
        
        return report;
    }
    
    // Console command to get health report
    function initialize() {
        monitorPerformance();
        monitorResources();
        monitorExternalLinks();
        monitorUserActivity();
    }
    
    // Start monitoring when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    

    
})();
