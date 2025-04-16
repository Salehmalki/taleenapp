// إنشاء ملفات صوتية بسيطة باستخدام Web Audio API
function createAudioFiles() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  // إنشاء صوت الترحيب
  function createWelcomeSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // نوتة A4
    oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 1); // نوتة A5
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1.5);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1.5);
    
    return { oscillator, gainNode };
  }
  
  // إنشاء صوت النقر
  function createClickSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
    
    return { oscillator, gainNode };
  }
  
  // إنشاء صوت الإجابة الصحيحة
  function createCorrectSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // نوتة C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.2); // نوتة E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.4); // نوتة G5
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.6);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.6);
    
    return { oscillator, gainNode };
  }
  
  // إنشاء صوت الإجابة الخاطئة
  function createIncorrectSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // نوتة A3
    oscillator.frequency.setValueAtTime(196, audioContext.currentTime + 0.2); // نوتة G3
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.4);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.4);
    
    return { oscillator, gainNode };
  }
  
  return {
    playWelcomeSound: createWelcomeSound,
    playClickSound: createClickSound,
    playCorrectSound: createCorrectSound,
    playIncorrectSound: createIncorrectSound
  };
}

// تهيئة نظام الصوت
let audioFunctions = null;
let audioInitialized = false;

// تهيئة نظام الصوت
function initAudio() {
  if (!audioInitialized) {
    try {
      audioFunctions = createAudioFiles();
      audioInitialized = true;
      console.log("تم تهيئة نظام الصوت بنجاح");
    } catch (e) {
      console.error("خطأ في تهيئة نظام الصوت:", e);
    }
  }
}

// تشغيل صوت الترحيب
function playWelcomeAudio() {
  if (audioInitialized && audioFunctions) {
    audioFunctions.playWelcomeSound();
  }
}

// تشغيل صوت عند النقر على اسم
function playAncestorAudio(name) {
  if (audioInitialized && audioFunctions) {
    audioFunctions.playClickSound();
  }
}

// تشغيل صوت الإجابة الصحيحة
function playCorrectSound() {
  if (audioInitialized && audioFunctions) {
    audioFunctions.playCorrectSound();
  }
}

// تشغيل صوت الإجابة الخاطئة
function playIncorrectSound() {
  if (audioInitialized && audioFunctions) {
    audioFunctions.playIncorrectSound();
  }
}

// إضافة مستمع لحدث التفاعل مع الصفحة لتفعيل الصوت
document.addEventListener('click', function() {
  initAudio();
  // تشغيل صوت الترحيب عند أول تفاعل
  setTimeout(playWelcomeAudio, 500);
}, { once: true });

// تصدير الوظائف
window.playWelcomeAudio = playWelcomeAudio;
window.playAncestorAudio = playAncestorAudio;
window.playCorrectSound = playCorrectSound;
window.playIncorrectSound = playIncorrectSound;
