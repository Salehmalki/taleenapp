/**
 * ملف لإصلاح مشكلة بقاء الظل على أزرار الإجابات
 */

document.addEventListener('DOMContentLoaded', function() {
  // تطبيق الإصلاح مباشرة عند تحميل الصفحة
  applyFocusFixStyles();
  
  // إضافة مستمعات أحداث لإزالة التركيز
  addFocusRemovalListeners();
});

// دالة تطبيق أنماط CSS لإزالة آثار التركيز
function applyFocusFixStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /* إزالة كاملة لجميع تأثيرات التركيز */
    .answer-button,
    .clickable,
    button {
      outline: none !important;
      box-shadow: none !important;
      -webkit-tap-highlight-color: transparent !important;
    }
    
    /* إزالة جميع الحدود والظلال المرتبطة بالتركيز */
    .answer-button:focus,
    .clickable:focus,
    button:focus {
      outline: none !important;
      box-shadow: none !important;
      border-color: inherit !important;
      outline-offset: 0 !important;
    }
    
    /* تطبيق تأثير التحويم فقط كبديل */
    .answer-button:hover,
    .clickable:hover {
      background-color: rgba(212, 175, 55, 0.3);
    }
    
    /* تأثير النقر لتقديم تغذية راجعة بصرية فورية */
    .answer-button:active,
    .clickable:active {
      transform: scale(0.98);
      transition: transform 0.1s;
    }
    
    /* تأكد من عدم تجاوز هذه الأنماط بواسطة وكلاء المستخدم */
    @media all {
      .answer-button, button, .clickable {
        -webkit-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
      }
    }
  `;
  document.head.appendChild(style);
}

// دالة إضافة مستمعات الأحداث لإزالة التركيز
function addFocusRemovalListeners() {
  // إزالة التركيز عند أي نقر على الصفحة
  document.addEventListener('click', function() {
    document.activeElement?.blur();
  });
}
  