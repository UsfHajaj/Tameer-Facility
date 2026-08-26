// إصلاحات خاصة بالهواتف المحمولة
document.addEventListener('DOMContentLoaded', function() {
    
    // تحسين أداء الكاروسيل على الهواتف
    const carousel = document.getElementById('projectsCarousel');
    if (carousel && window.innerWidth < 768) {
        // إضافة دعم التمرير بالإصبع للكاروسيل
        let startX = 0;
        let endX = 0;
        
        carousel.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        carousel.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const threshold = 50; // الحد الأدنى للمسافة للتمرير
            
            if (startX - endX > threshold) {
                // تمرير لليسار - الصورة التالية
                const nextBtn = carousel.querySelector('.carousel-control-next');
                if (nextBtn) nextBtn.click();
            } else if (endX - startX > threshold) {
                // تمرير لليمين - الصورة السابقة
                const prevBtn = carousel.querySelector('.carousel-control-prev');
                if (prevBtn) prevBtn.click();
            }
        }
    }
    
    // تحسين التنقل على الهواتف
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // إغلاق القائمة عند الضغط على رابط
        const navLinks = navbarCollapse.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992) {
                    navbarToggler.click();
                }
            });
        });
    }
    
    // تحسين عرض الصور على الهواتف
    function optimizeImagesForMobile() {
        if (window.innerWidth < 768) {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                // إضافة lazy loading للصور
                if (!img.hasAttribute('loading')) {
                    img.setAttribute('loading', 'lazy');
                }
                
                // تحسين معالجة الأخطاء
                img.addEventListener('error', function() {
                    this.style.display = 'none';
                });
            });
        }
    }
    
    optimizeImagesForMobile();
    
    // تحسين الأداء على الهواتف
    function mobilePerformanceOptimizations() {
        if (window.innerWidth < 768) {
            // تقليل تعقيد الانيميشن على الهواتف
            const styleSheet = document.createElement('style');
            styleSheet.textContent = `
                @media (max-width: 768px) {
                    * {
                        animation-duration: 0.3s !important;
                        transition-duration: 0.3s !important;
                    }
                    
                    .carousel-item {
                        transition: transform 0.3s ease-in-out !important;
                    }
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }
    
    mobilePerformanceOptimizations();
    
    // إصلاح مشاكل التمرير على iOS
    function fixiOSScrolling() {
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            document.body.style.webkitOverflowScrolling = 'touch';
            
            // إصلاح مشكلة 100vh على iOS
            const fixViewportHeight = () => {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            };
            
            fixViewportHeight();
            window.addEventListener('resize', fixViewportHeight);
            window.addEventListener('orientationchange', fixViewportHeight);
        }
    }
    
    fixiOSScrolling();
    
    // تحسين إمكانية الوصول على الهواتف
    function improveMobileAccessibility() {
        // زيادة حجم منطقة اللمس للأزرار
        const buttons = document.querySelectorAll('button, .btn, .nav-link');
        buttons.forEach(btn => {
            if (window.innerWidth < 768) {
                btn.style.minHeight = '44px';
                btn.style.minWidth = '44px';
                btn.style.display = 'inline-flex';
                btn.style.alignItems = 'center';
                btn.style.justifyContent = 'center';
            }
        });
        
        // تحسين التباين للنصوص على الشاشات الصغيرة
        if (window.innerWidth < 576) {
            const carouselCaptions = document.querySelectorAll('.carousel-caption');
            carouselCaptions.forEach(caption => {
                caption.style.textShadow = '2px 2px 4px rgba(0,0,0,0.8)';
            });
        }
    }
    
    improveMobileAccessibility();
    
    // مراقبة تغيير الاتجاه
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            window.location.reload();
        }, 500);
    });
    
});

// دالة للتحقق من نوع الجهاز
function isMobileDevice() {
    return window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// تصدير الدوال للاستخدام العام
window.MobileFixes = {
    isMobileDevice: isMobileDevice
};
