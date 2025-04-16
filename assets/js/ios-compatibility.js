/* تحسينات إضافية للتوافق مع iOS */
document.addEventListener('DOMContentLoaded', function() {
  // إصلاح مشكلة الصوت في iOS
  const unlockAudio = function() {
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
      const audioContext = new (AudioContext || webkitAudioContext)();
      const emptyBuffer = audioContext.createBuffer(1, 1, 22050);
      const source = audioContext.createBufferSource();
      source.buffer = emptyBuffer;
      source.connect(audioContext.destination);
      source.start(0);
      
      // إعادة تهيئة نظام الصوت
      if (typeof initAudio === 'function') {
        initAudio();
      }
    }
    
    // إزالة المستمع بعد التنفيذ
    document.removeEventListener('touchstart', unlockAudio);
    document.removeEventListener('click', unlockAudio);
  };
  
  // إضافة مستمعات للأحداث لتفعيل الصوت
  document.addEventListener('touchstart', unlockAudio, false);
  document.addEventListener('click', unlockAudio, false);
  
  // إصلاح مشكلة اللمس المزدوج في iOS
  const doubleTapElements = document.querySelectorAll('.ancestor-card, .answers-box button, .start-button a, .result-button, .print-button button');
  doubleTapElements.forEach(function(element) {
    element.addEventListener('touchend', function(e) {
      e.preventDefault();
    });
  });
  
  // إصلاح مشكلة التمرير في iOS
  document.addEventListener('touchmove', function(e) {
    if (e.target.closest('.tooltip, .certificate')) {
      e.stopPropagation();
    }
  }, { passive: false });
  
  // إصلاح مشكلة الخطوط في iOS
  const checkFontsLoaded = function() {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function() {
        document.body.classList.add('fonts-loaded');
      });
    } else {
      // احتياطي للمتصفحات القديمة
      setTimeout(function() {
        document.body.classList.add('fonts-loaded');
      }, 1000);
    }
  };
  
  checkFontsLoaded();
});
