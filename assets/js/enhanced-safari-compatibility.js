/* تحسينات إضافية للتوافق مع iOS - نسخة محسنة */
document.addEventListener('DOMContentLoaded', function() {
  // كشف متصفح سفاري
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  
  if (isSafari || isIOS) {
    document.body.classList.add('safari-browser');
    
    if (isIOS) {
      document.body.classList.add('ios-device');
    }
  }
  
  // إصلاح مشكلة الصوت في سفاري وiOS
  const unlockAudio = function() {
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const emptyBuffer = audioContext.createBuffer(1, 1, 22050);
        const source = audioContext.createBufferSource();
        source.buffer = emptyBuffer;
        source.connect(audioContext.destination);
        source.start(0);
        
        // إعادة تهيئة نظام الصوت
        if (typeof playClickSound === 'function') {
          setTimeout(function() {
            playClickSound(); // تشغيل صوت النقرة مرة واحدة للتأكد من عمله
          }, 100);
        }
      } catch (e) {
        console.error("خطأ في تهيئة الصوت:", e);
      }
    }
    
    // إزالة المستمع بعد التنفيذ
    document.removeEventListener('touchstart', unlockAudio);
    document.removeEventListener('click', unlockAudio);
  };
  
  // إضافة مستمعات للأحداث لتفعيل الصوت
  document.addEventListener('touchstart', unlockAudio, false);
  document.addEventListener('click', unlockAudio, false);
  
  // إصلاح مشكلة اللمس المزدوج في سفاري وiOS
  const clickableElements = document.querySelectorAll(
    '.ancestor-card, .answers-box button, .start-button a, .result-button, ' +
    '.print-button button, .mobile-nav-button'
  );
  
  clickableElements.forEach(function(element) {
    // إضافة فئة للعناصر القابلة للنقر
    element.classList.add('clickable');
    
    // منع السلوك الافتراضي للمس المزدوج
    element.addEventListener('touchend', function(e) {
      if (isSafari || isIOS) {
        const now = Date.now();
        const lastTouch = element.getAttribute('data-last-touch') || 0;
        
        if (now - lastTouch < 300) {
          e.preventDefault(); // منع النقر المزدوج
        }
        
        element.setAttribute('data-last-touch', now);
      }
    }, false);
    
    // إضافة تأثير النقر
    element.addEventListener('click', function() {
      if (typeof playClickSound === 'function') {
        playClickSound();
      }
      
      // إضافة تأثير بصري للنقر
      element.classList.add('clicked');
      setTimeout(function() {
        element.classList.remove('clicked');
      }, 300);
    });
  });
  
  // إصلاح مشكلة التمرير في سفاري وiOS
  if (isSafari || isIOS) {
    document.addEventListener('touchmove', function(e) {
      if (e.target.closest('.tooltip, .certificate')) {
        e.stopPropagation();
      }
    }, { passive: false });
    
    // تحسين أداء التمرير
    const scrollableElements = document.querySelectorAll('.ancestors-tree, .card-container');
    scrollableElements.forEach(function(element) {
      element.style.webkitOverflowScrolling = 'touch';
    });
  }
  
  // إصلاح مشكلة الخطوط في سفاري وiOS
  const checkFontsLoaded = function() {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function() {
        document.body.classList.add('fonts-loaded');
        
        // إعادة حساب أبعاد العناصر بعد تحميل الخطوط
        if (isSafari || isIOS) {
          setTimeout(function() {
            window.dispatchEvent(new Event('resize'));
          }, 500);
        }
      });
    } else {
      // احتياطي للمتصفحات القديمة
      setTimeout(function() {
        document.body.classList.add('fonts-loaded');
      }, 1000);
    }
  };
  
  checkFontsLoaded();
  
  // إصلاح مشكلة الأزرار في سفاري وiOS
  if (isSafari || isIOS) {
    const buttons = document.querySelectorAll('button, .start-button a, .result-button');
    buttons.forEach(function(button) {
      // تحسين استجابة الأزرار
      button.addEventListener('touchstart', function() {
        this.classList.add('active');
      });
      
      button.addEventListener('touchend', function() {
        this.classList.remove('active');
      });
    });
  }
  
  // إصلاح مشكلة شريط التنقل في سفاري وiOS
  if (isSafari || isIOS) {
    const mobileNav = document.querySelector('.mobile-nav');
    if (mobileNav) {
      // التأكد من ثبات شريط التنقل في الأسفل
      window.addEventListener('scroll', function() {
        mobileNav.style.transform = 'translateZ(0)';
      });
      
      // إضافة هامش أسفل للمحتوى لتجنب تداخله مع شريط التنقل
      document.body.style.paddingBottom = (mobileNav.offsetHeight + 10) + 'px';
    }
  }
});

// دالة تشغيل صوت النقرة البسيط
function playClickSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // إعداد المذبذب
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    
    // إعداد مستوى الصوت
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
    
    // توصيل العقد
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // تشغيل الصوت
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {
    console.error("خطأ في تشغيل صوت النقرة:", e);
  }
}
