/* تحسينات إضافية للتوافق مع جميع المتصفحات المحمولة */
document.addEventListener('DOMContentLoaded', function() {
  // كشف نوع المتصفح والجهاز
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isChrome = /Chrome/i.test(navigator.userAgent) && !/Edge|Edg/i.test(navigator.userAgent);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isFirefox = /Firefox/i.test(navigator.userAgent);
  const isSamsung = /SamsungBrowser/i.test(navigator.userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  
  // إضافة فئات للجسم بناءً على نوع المتصفح والجهاز
  if (isMobile) document.body.classList.add('mobile-device');
  if (isChrome) document.body.classList.add('chrome-browser');
  if (isSafari) document.body.classList.add('safari-browser');
  if (isFirefox) document.body.classList.add('firefox-browser');
  if (isSamsung) document.body.classList.add('samsung-browser');
  if (isIOS) document.body.classList.add('ios-device');
  
  // تحسين التفاعل مع اللمس لجميع المتصفحات المحمولة
  if (isMobile) {
    const clickableElements = document.querySelectorAll(
      '.ancestor-card, .answers-box button, .start-button a, .result-button, ' +
      '.print-button button, .mobile-nav-button'
    );
    
    clickableElements.forEach(function(element) {
      // إضافة فئة للعناصر القابلة للنقر
      element.classList.add('clickable');
      
      // تحسين استجابة اللمس
      element.addEventListener('touchstart', function() {
        this.classList.add('touch-active');
      }, { passive: true });
      
      element.addEventListener('touchend', function() {
        this.classList.remove('touch-active');
        
        // تشغيل صوت النقرة
        if (typeof playClickSound === 'function') {
          playClickSound();
        }
      }, { passive: true });
      
      // منع النقر المزدوج
      element.addEventListener('click', function(e) {
        const now = Date.now();
        const lastClick = this.getAttribute('data-last-click') || 0;
        
        if (now - lastClick < 300) {
          e.preventDefault();
          e.stopPropagation();
        }
        
        this.setAttribute('data-last-click', now);
      });
    });
    
    // تحسين التمرير لجميع المتصفحات المحمولة
    const scrollableElements = document.querySelectorAll('.ancestors-tree, .card-container');
    scrollableElements.forEach(function(element) {
      // تحسين التمرير باللمس
      element.style.webkitOverflowScrolling = 'touch';
      
      // منع التمرير العمودي عند التمرير الأفقي
      element.addEventListener('touchmove', function(e) {
        if (Math.abs(e.touches[0].clientX - this.touchStartX) > 
            Math.abs(e.touches[0].clientY - this.touchStartY)) {
          e.preventDefault();
        }
      }, { passive: false });
      
      element.addEventListener('touchstart', function(e) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
      }, { passive: true });
    });
    
    // تحسين شريط التنقل للأجهزة المحمولة
    const mobileNav = document.querySelector('.mobile-nav');
    if (mobileNav) {
      // التأكد من ثبات شريط التنقل في الأسفل
      window.addEventListener('resize', function() {
        document.body.style.paddingBottom = (mobileNav.offsetHeight + 10) + 'px';
      });
      
      // تطبيق الهامش السفلي مباشرة
      document.body.style.paddingBottom = (mobileNav.offsetHeight + 10) + 'px';
      
      // تحسين التفاعل مع شريط التنقل
      const navButtons = mobileNav.querySelectorAll('.mobile-nav-button');
      navButtons.forEach(function(button) {
        button.addEventListener('click', function() {
          // إضافة تأثير بصري للنقر
          this.classList.add('clicked');
          setTimeout(() => {
            this.classList.remove('clicked');
          }, 300);
        });
      });
    }
    
    // تحسين التلميحات للأجهزة المحمولة
    document.addEventListener('click', function(e) {
      const ancestorCard = e.target.closest('.ancestor-card');
      if (ancestorCard) {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
          // تحسين موقع التلميح على الأجهزة المحمولة
          const windowWidth = window.innerWidth;
          const tooltipWidth = Math.min(windowWidth * 0.9, 300);
          
          tooltip.style.maxWidth = tooltipWidth + 'px';
          tooltip.style.left = Math.max(10, (windowWidth - tooltipWidth) / 2) + 'px';
          
          // إضافة زر إغلاق للتلميح
          if (!tooltip.querySelector('.close-tooltip')) {
            const closeButton = document.createElement('button');
            closeButton.className = 'close-tooltip';
            closeButton.innerHTML = '×';
            closeButton.addEventListener('click', function() {
              tooltip.remove();
            });
            tooltip.insertBefore(closeButton, tooltip.firstChild);
          }
        }
      }
    });
    
    // تحسين الاختبار للأجهزة المحمولة
    const quizContainer = document.querySelector('.quiz-container');
    if (quizContainer) {
      // تحسين أزرار الإجابة
      const answerButtons = quizContainer.querySelectorAll('.answers-box button');
      answerButtons.forEach(function(button) {
        button.addEventListener('touchstart', function() {
          this.classList.add('touch-active');
        }, { passive: true });
        
        button.addEventListener('touchend', function() {
          this.classList.remove('touch-active');
        }, { passive: true });
      });
    }
    
    // تحسين الشهادة للأجهزة المحمولة
    const certificateContainer = document.querySelector('.certificate-container');
    if (certificateContainer) {
      // تحسين حجم الشهادة
      const certificate = certificateContainer.querySelector('.certificate');
      if (certificate) {
        certificate.style.width = '100%';
        certificate.style.maxWidth = '500px';
        certificate.style.margin = '0 auto';
      }
    }
  }
  
  // تحسينات خاصة لمتصفح كروم على الأجهزة المحمولة
  if (isChrome && isMobile) {
    // تحسين التمرير في كروم
    document.documentElement.style.overscrollBehavior = 'none';
    
    // تحسين الأزرار في كروم
    const buttons = document.querySelectorAll('button, .start-button a, .result-button');
    buttons.forEach(function(button) {
      button.style.webkitAppearance = 'none';
      button.style.appearance = 'none';
    });
  }
  
  // تحسينات خاصة لمتصفح فايرفوكس على الأجهزة المحمولة
  if (isFirefox && isMobile) {
    // تحسين التمرير في فايرفوكس
    document.documentElement.style.scrollbarWidth = 'thin';
    
    // تحسين الأزرار في فايرفوكس
    const buttons = document.querySelectorAll('button, .start-button a, .result-button');
    buttons.forEach(function(button) {
      button.style.mozAppearance = 'none';
      button.style.appearance = 'none';
    });
  }
  
  // تحسينات خاصة لمتصفح سامسونج على الأجهزة المحمولة
  if (isSamsung) {
    // تحسين التمرير في متصفح سامسونج
    const scrollableElements = document.querySelectorAll('.ancestors-tree, .card-container');
    scrollableElements.forEach(function(element) {
      element.style.webkitOverflowScrolling = 'touch';
    });
  }
});
