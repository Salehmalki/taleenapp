// تحسين جودة الأصوات وتقصير الصوت الترحيبي الطويل

// تهيئة نظام الصوت
let audioContext;
let gainNode;
let isAudioInitialized = false;

// تهيئة نظام الصوت عند تفاعل المستخدم
function initAudio() {
  if (isAudioInitialized) return;
  
  try {
    // إنشاء سياق الصوت
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // إنشاء عقدة التحكم في مستوى الصوت
    gainNode = audioContext.createGain();
    gainNode.gain.value = 0.7; // تقليل مستوى الصوت قليلاً لتجنب التشويش
    gainNode.connect(audioContext.destination);
    
    isAudioInitialized = true;
    console.log("تم تهيئة نظام الصوت بنجاح");
  } catch (e) {
    console.error("خطأ في تهيئة نظام الصوت:", e);
  }
}

// تشغيل صوت ترحيبي مُحسّن وأقصر
function playWelcomeAudio() {
  if (!isAudioInitialized) initAudio();
  
  // إنشاء مذبذب للصوت الترحيبي
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  // إعداد المذبذب
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // نغمة لا
  oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.5); // انتقال إلى نغمة لا أعلى
  
  // إعداد مستوى الصوت
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.7, audioContext.currentTime + 0.1);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1.5);
  
  // توصيل العقد
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // تشغيل الصوت
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 1.5);
  
  // تشغيل صوت ترحيبي ثانٍ بعد الأول
  setTimeout(() => {
    const oscillator2 = audioContext.createOscillator();
    const gainNode2 = audioContext.createGain();
    
    oscillator2.type = 'sine';
    oscillator2.frequency.setValueAtTime(523.25, audioContext.currentTime); // نغمة دو
    oscillator2.frequency.exponentialRampToValueAtTime(783.99, audioContext.currentTime + 0.5); // انتقال إلى نغمة صول
    
    gainNode2.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode2.gain.linearRampToValueAtTime(0.7, audioContext.currentTime + 0.1);
    gainNode2.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1.5);
    
    oscillator2.connect(gainNode2);
    gainNode2.connect(audioContext.destination);
    
    oscillator2.start();
    oscillator2.stop(audioContext.currentTime + 1.5);
  }, 1600);
}

// تشغيل صوت عند النقر على اسم أحد الأجداد
function playAncestorAudio(name) {
  if (!isAudioInitialized) initAudio();
  
  // إنشاء مذبذب للصوت
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  // تعيين نوع الصوت ونغمته حسب الاسم
  oscillator.type = 'sine';
  
  // تعيين نغمات مختلفة حسب الاسم
  let baseFrequency = 440; // نغمة أساسية (لا)
  
  switch(name) {
    case 'محمد':
      baseFrequency = 523.25; // دو
      break;
    case 'عبد الله':
      baseFrequency = 493.88; // سي
      break;
    case 'عبد المطلب':
      baseFrequency = 440.00; // لا
      break;
    case 'هاشم':
      baseFrequency = 392.00; // صول
      break;
    case 'عبد مناف':
      baseFrequency = 349.23; // فا
      break;
    case 'قصي':
      baseFrequency = 329.63; // مي
      break;
    case 'كلاب':
      baseFrequency = 293.66; // ري
      break;
    case 'آمنة':
      baseFrequency = 587.33; // ري عالي
      break;
    case 'وهب':
      baseFrequency = 659.25; // مي عالي
      break;
    case 'زهرة':
      baseFrequency = 698.46; // فا عالي
      break;
    default:
      baseFrequency = 440.00; // لا
  }
  
  // إعداد المذبذب
  oscillator.frequency.setValueAtTime(baseFrequency, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(baseFrequency * 1.2, audioContext.currentTime + 0.1);
  oscillator.frequency.exponentialRampToValueAtTime(baseFrequency, audioContext.currentTime + 0.3);
  
  // إعداد مستوى الصوت
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.05);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
  
  // توصيل العقد
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // تشغيل الصوت
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.5);
}

// تشغيل صوت للإجابة الصحيحة
function playCorrectSound() {
  if (!isAudioInitialized) initAudio();
  
  // إنشاء مذبذبات للصوت
  const oscillator1 = audioContext.createOscillator();
  const oscillator2 = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  // إعداد المذبذب الأول
  oscillator1.type = 'sine';
  oscillator1.frequency.setValueAtTime(523.25, audioContext.currentTime); // دو
  oscillator1.frequency.exponentialRampToValueAtTime(783.99, audioContext.currentTime + 0.1); // صول
  
  // إعداد المذبذب الثاني
  oscillator2.type = 'sine';
  oscillator2.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // مي
  oscillator2.frequency.exponentialRampToValueAtTime(1046.50, audioContext.currentTime + 0.2); // دو عالي
  
  // إعداد مستوى الصوت
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.05);
  gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.2);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.4);
  
  // توصيل العقد
  oscillator1.connect(gainNode);
  oscillator2.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // تشغيل الصوت
  oscillator1.start();
  oscillator1.stop(audioContext.currentTime + 0.2);
  
  oscillator2.start(audioContext.currentTime + 0.1);
  oscillator2.stop(audioContext.currentTime + 0.4);
}

// تشغيل صوت للإجابة الخاطئة
function playIncorrectSound() {
  if (!isAudioInitialized) initAudio();
  
  // إنشاء مذبذب للصوت
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  // إعداد المذبذب
  oscillator.type = 'sawtooth';
  oscillator.frequency.setValueAtTime(196.00, audioContext.currentTime); // صول منخفض
  oscillator.frequency.exponentialRampToValueAtTime(130.81, audioContext.currentTime + 0.3); // دو منخفض
  
  // إعداد مستوى الصوت
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.05);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
  
  // توصيل العقد
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // تشغيل الصوت
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.5);
}

// إضافة مستمع للأحداث لتفعيل الصوت عند تفاعل المستخدم
document.addEventListener('click', function() {
  if (!isAudioInitialized) {
    initAudio();
  }
});

// تفعيل الصوت عند تحميل الصفحة
window.addEventListener('load', function() {
  // تأخير قصير لضمان تحميل الصفحة بالكامل
  setTimeout(function() {
    // محاولة تهيئة الصوت
    try {
      initAudio();
    } catch (e) {
      console.log("سيتم تهيئة الصوت عند أول تفاعل للمستخدم");
    }
  }, 500);
});
