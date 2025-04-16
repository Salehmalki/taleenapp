// تبسيط الأصوات إلى صوت نقرة فقط
document.addEventListener('DOMContentLoaded', function() {
  // كشف المتصفح
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  
  // إضافة مستمع للنقر على جميع العناصر القابلة للنقر
  const clickableElements = document.querySelectorAll(
    '.ancestor-card, .answers-box button, .start-button a, .result-button, ' +
    '.print-button button, .mobile-nav-button'
  );
  
  clickableElements.forEach(function(element) {
    element.addEventListener('click', function() {
      playClickSound();
    });
  });
  
  // إضافة مستمع للنقر على أي مكان في الصفحة لتفعيل الصوت في iOS
  document.addEventListener('click', function() {
    if (!window.audioInitialized) {
      initAudio();
    }
  }, { once: true });
  
  // تهيئة نظام الصوت
  function initAudio() {
    try {
      window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      window.audioInitialized = true;
      
      // تشغيل صوت صامت لتفعيل الصوت في iOS
      if (isIOS) {
        const emptyBuffer = window.audioContext.createBuffer(1, 1, 22050);
        const source = window.audioContext.createBufferSource();
        source.buffer = emptyBuffer;
        source.connect(window.audioContext.destination);
        source.start(0);
      }
      
      console.log("تم تهيئة نظام الصوت بنجاح");
    } catch (e) {
      console.error("خطأ في تهيئة نظام الصوت:", e);
    }
  }
});

// دالة تشغيل صوت النقرة البسيط
function playClickSound() {
  if (!window.audioContext) {
    try {
      window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      window.audioInitialized = true;
    } catch (e) {
      console.error("خطأ في تهيئة نظام الصوت:", e);
      return;
    }
  }
  
  try {
    const oscillator = window.audioContext.createOscillator();
    const gainNode = window.audioContext.createGain();
    
    // إعداد المذبذب
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, window.audioContext.currentTime);
    
    // إعداد مستوى الصوت
    gainNode.gain.setValueAtTime(0, window.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, window.audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, window.audioContext.currentTime + 0.1);
    
    // توصيل العقد
    oscillator.connect(gainNode);
    gainNode.connect(window.audioContext.destination);
    
    // تشغيل الصوت
    oscillator.start();
    oscillator.stop(window.audioContext.currentTime + 0.1);
  } catch (e) {
    console.error("خطأ في تشغيل صوت النقرة:", e);
  }
}
