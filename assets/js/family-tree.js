// شجرة نسب النبي محمد ﷺ باستخدام SVG

// متغيرات عامة
let svg, treeGroup;
let currentScale = 1;
let isHorizontalLayout = false;
let dragStartX, dragStartY;
let isDragging = false;
let currentTranslate = { x: 0, y: 0 };

// إعدادات الشكل البصري
const config = {
  nodeRadius: 40,
  nodeWidth: 100,
  nodeHeight: 60,
  horizontalSpacing: 80,
  verticalSpacing: 90,
  maleColor: '#3498db',
  femaleColor: '#e74c3c',
  lineColor: '#bdc3c7',
  animationDuration: 300,
};

// شجرة نسب النبي محمد ﷺ - نمط المخطوطة الذهبية

document.addEventListener('DOMContentLoaded', function() {
  // إنشاء حاوية شجرة النسب بتصميم المخطوطة الذهبية
  const svgContainer = document.querySelector('.svg-container');
  if (!svgContainer) return;
  
  // استبدال محتوى الحاوية الحالية
  svgContainer.innerHTML = '';
  svgContainer.className = 'family-tree-container';
  
  // إنشاء إطار زخرفي
  const ornamentalFrame = document.createElement('div');
  ornamentalFrame.className = 'ornamental-frame';
  svgContainer.appendChild(ornamentalFrame);
  
  // إنشاء عنصر العنوان
  const treeTitle = document.createElement('h3');
  treeTitle.textContent = 'نسب النبي محمد ﷺ المشرف';
  treeTitle.style.textAlign = 'center';
  treeTitle.style.color = '#5d4037';
  treeTitle.style.margin = '10px 0 30px';
  svgContainer.appendChild(treeTitle);
  
  // إنشاء حاوية رئيسية للشجرة
  const treeContainer = document.createElement('div');
  treeContainer.className = 'tree-container';
  svgContainer.appendChild(treeContainer);
  
  // بناء الشجرة المرئية
  buildFamilyTreeNative();
  
  // إزالة أزرار التكبير/التصغير غير المطلوبة
  const controlButtons = document.querySelector('.tree-controls');
  if (controlButtons) {
    controlButtons.style.display = 'none';
  }
});

// دالة بناء الشجرة بأسلوب المخطوطة الذهبية
function buildFamilyTreeNative() {
  // الحصول على حاوية الشجرة
  const treeContainer = document.querySelector('.tree-container');
  if (!treeContainer) return;
  
  // إنشاء خريطة للأشخاص لسهولة الوصول
  const peopleMap = {};
  lineage.forEach(person => {
    peopleMap[person.id] = person;
  });
  
  // ترتيب الأشخاص حسب المستويات العائلية
  const generations = organizeByGenerations(lineage);
  
  // إنشاء صفوف الشجرة لكل جيل
  generations.forEach((generation, index) => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'tree-row';
    rowDiv.dataset.level = index;
    
    // إنشاء بطاقات الأشخاص في هذا الجيل
    generation.forEach(personId => {
      const person = peopleMap[personId];
      if (!person) return;
      
      const card = createPersonCard(person);
      rowDiv.appendChild(card);
    });
    
    treeContainer.appendChild(rowDiv);
  });
  
  // إضافة خطوط اتصال بين الأشخاص
  setTimeout(() => {
    addConnectionLines(peopleMap);
  }, 100); // تأخير بسيط لضمان رسم جميع البطاقات أولاً
}

// تنظيم الأشخاص حسب الأجيال
function organizeByGenerations(people) {
  // إنشاء خريطة للأشخاص لسهولة الوصول
  const peopleMap = {};
  people.forEach(person => {
    peopleMap[person.id] = person;
  });
  
  // حساب عمق كل شخص من النبي محمد
  const depths = {};
  const visited = {};
  
  function calculateDepth(personId) {
    // إذا تم حساب العمق بالفعل، نعيده
    if (depths[personId] !== undefined) return depths[personId];
    
    // منع التكرار المستمر في حال وجود حلقة
    if (visited[personId]) return 0;
    visited[personId] = true;
    
    const person = peopleMap[personId];
    if (!person) return 0;
    
    // إذا كان هذا الشخص ليس له أب في القائمة، فهو في أعمق مستوى (عدنان)
    if (!person.father || !peopleMap[person.father]) {
      depths[personId] = 0;
      return 0;
    }
    
    // عمق الشخص = عمق والده + 1
    const fatherDepth = calculateDepth(person.father);
    depths[personId] = fatherDepth + 1;
    return depths[personId];
  }
  
  // حساب عمق لكل شخص بدءًا من محمد ﷺ
  people.forEach(person => {
    calculateDepth(person.id);
  });
  
  // تقسيم الأشخاص إلى مجموعات حسب العمق
  const depthGroups = {};
  Object.keys(depths).forEach(personId => {
    const depth = depths[personId];
    if (!depthGroups[depth]) depthGroups[depth] = [];
    depthGroups[depth].push(personId);
  });
  
  // ترتيب المجموعات من الأكثر عمقًا (عدنان) إلى الأقل عمقًا (محمد)
  const generations = [];
  const depthLevels = Object.keys(depthGroups).sort((a, b) => a - b);
  
  depthLevels.forEach(depth => {
    generations.push(depthGroups[depth]);
  });
  
  return generations.reverse(); // عكس الترتيب ليكون محمد ﷺ في الأعلى
}

// إنشاء بطاقة لشخص
function createPersonCard(person) {
  const card = document.createElement('div');
  card.className = 'person-card';
  card.dataset.id = person.id;
  
  // تحديد فئة إضافية حسب الشخصية
  if (person.id === 'muhammad') {
    card.classList.add('muhammad');
  } else if (person.gender === 'female') {
    card.classList.add('mother-line');
  } else {
    card.classList.add('father-line');
  }
  
  // إنشاء محتوى البطاقة
  const nameDiv = document.createElement('div');
  nameDiv.className = 'person-name';
  nameDiv.textContent = person.name;
  card.appendChild(nameDiv);
  
  // العنوان المختصر (اختياري)
  if (person.title) {
    const titleDiv = document.createElement('div');
    titleDiv.className = 'person-title';
    titleDiv.textContent = person.title;
    card.appendChild(titleDiv);
  }
  
  // إضافة زخارف
  const decorTopRight = document.createElement('span');
  decorTopRight.className = 'person-decoration decoration-top-right';
  decorTopRight.textContent = '۞';
  card.appendChild(decorTopRight);
  
  const decorBottomLeft = document.createElement('span');
  decorBottomLeft.className = 'person-decoration decoration-bottom-left';
  decorBottomLeft.textContent = '۞';
  card.appendChild(decorBottomLeft);
  
  // إضافة مستمع أحداث للنقر
  card.addEventListener('click', function() {
    showPersonInfo(person);
  });
  
  return card;
}

// إضافة خطوط الاتصال بين الأشخاص
function addConnectionLines(peopleMap) {
  const cards = document.querySelectorAll('.person-card');
  const cardsMap = {};
  
  // تخزين جميع البطاقات في خريطة للوصول السريع
  cards.forEach(card => {
    cardsMap[card.dataset.id] = card;
  });
  
  // إنشاء خط لكل علاقة بين الأب والابن
  Object.keys(peopleMap).forEach(personId => {
    const person = peopleMap[personId];
    if (!person.father || !cardsMap[person.father]) return;
    
    const childCard = cardsMap[personId];
    const parentCard = cardsMap[person.father];
    
    if (!childCard || !parentCard) return;
    
    drawConnectionLine(childCard, parentCard);
  });
}

// رسم خط الاتصال بين بطاقتين
function drawConnectionLine(childCard, parentCard) {
  const treeContainer = document.querySelector('.tree-container');
  if (!treeContainer) return;
  
  const childRect = childCard.getBoundingClientRect();
  const parentRect = parentCard.getBoundingClientRect();
  const containerRect = treeContainer.getBoundingClientRect();
  
  // تحويل الإحداثيات إلى مساحة الحاوية
  const childTop = childRect.top - containerRect.top + treeContainer.scrollTop;
  const childLeft = childRect.left - containerRect.left + treeContainer.scrollLeft;
  const parentTop = parentRect.top - containerRect.top + treeContainer.scrollTop;
  const parentLeft = parentRect.left - containerRect.left + treeContainer.scrollLeft;
  
  // نقاط المركز
  const childCenterX = childLeft + childRect.width / 2;
  const childCenterY = childTop;
  const parentCenterX = parentLeft + parentRect.width / 2;
  const parentCenterY = parentTop + parentRect.height;
  
  // إنشاء خط عمودي من الأب إلى منتصف المسافة
  const verticalLine = document.createElement('div');
  verticalLine.className = 'connection-line vertical-line';
  verticalLine.style.left = parentCenterX + 'px';
  verticalLine.style.top = parentCenterY + 'px';
  verticalLine.style.height = (childCenterY - parentCenterY) / 2 + 'px';
  treeContainer.appendChild(verticalLine);
  
  // إنشاء خط أفقي
  const horizontalLine = document.createElement('div');
  horizontalLine.className = 'connection-line horizontal-line';
  horizontalLine.style.top = (parentCenterY + (childCenterY - parentCenterY) / 2) + 'px';
  horizontalLine.style.left = Math.min(parentCenterX, childCenterX) + 'px';
  horizontalLine.style.width = Math.abs(childCenterX - parentCenterX) + 'px';
  treeContainer.appendChild(horizontalLine);
  
  // إنشاء خط عمودي من منتصف المسافة إلى الابن
  const verticalLine2 = document.createElement('div');
  verticalLine2.className = 'connection-line vertical-line';
  verticalLine2.style.left = childCenterX + 'px';
  verticalLine2.style.top = (parentCenterY + (childCenterY - parentCenterY) / 2) + 'px';
  verticalLine2.style.height = (childCenterY - (parentCenterY + (childCenterY - parentCenterY) / 2)) + 'px';
  treeContainer.appendChild(verticalLine2);
}

// عرض معلومات الشخص في نافذة منبثقة
function showPersonInfo(person) {
  // إزالة أي نوافذ سابقة
  const existingPopup = document.querySelector('.info-popup');
  if (existingPopup) {
    existingPopup.remove();
  }
  
  // إنشاء النافذة المنبثقة
  const popup = document.createElement('div');
  popup.className = 'info-popup';
  
  // إضافة زر الإغلاق
  const closeButton = document.createElement('button');
  closeButton.className = 'close-button';
  closeButton.textContent = '×';
  closeButton.addEventListener('click', function() {
    popup.remove();
  });
  popup.appendChild(closeButton);
  
  // إضافة العنوان
  const title = document.createElement('h3');
  title.className = 'info-title';
  title.textContent = person.title || person.name;
  popup.appendChild(title);
  
  // إضافة المحتوى
  const content = document.createElement('div');
  content.className = 'info-content';
  content.textContent = person.info || 'لا توجد معلومات إضافية متوفرة.';
  popup.appendChild(content);
  
  // إضافة تفاصيل إضافية
  if (person.father) {
    const father = lineage.find(p => p.id === person.father);
    if (father) {
      const fatherInfo = document.createElement('p');
      fatherInfo.style.marginTop = '10px';
      fatherInfo.innerHTML = '<strong>الأب:</strong> ' + father.name;
      content.appendChild(fatherInfo);
    }
  }
  
  if (person.mother) {
    const mother = lineage.find(p => p.id === person.mother);
    if (mother) {
      const motherInfo = document.createElement('p');
      motherInfo.style.marginTop = '5px';
      motherInfo.innerHTML = '<strong>الأم:</strong> ' + mother.name;
      content.appendChild(motherInfo);
    }
  }
  
  // إضافة زخرفة للنافذة
  const decorationBottom = document.createElement('div');
  decorationBottom.style.textAlign = 'center';
  decorationBottom.style.marginTop = '20px';
  decorationBottom.style.color = '#d4af37';
  decorationBottom.style.fontSize = '1.5rem';
  decorationBottom.textContent = '۞';
  popup.appendChild(decorationBottom);
  
  // إضافة النافذة إلى المستند
  document.body.appendChild(popup);
  
  // إضافة تأثير الظل عند النقر خارج النافذة لإغلاقها
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.right = '0';
  overlay.style.bottom = '0';
  overlay.style.left = '0';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.zIndex = '999';
  document.body.insertBefore(overlay, popup);
  
  overlay.addEventListener('click', function() {
    popup.remove();
    overlay.remove();
  });
  
  // إضافة مستمع للنقر على الـ Escape لإغلاق النافذة
  document.addEventListener('keydown', function escapeHandler(e) {
    if (e.key === 'Escape') {
      popup.remove();
      overlay.remove();
      document.removeEventListener('keydown', escapeHandler);
    }
  });
}