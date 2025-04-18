// تنفيذ شجرة النسب بتصميم محدد وثابت

// تنفيذ عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
  // إنشاء شجرة النسب بالتصميم المخصص
  createFixedFamilyTree();
  
  // إعداد أزرار التحكم
  setupControlButtons();
});

// دالة إنشاء شجرة النسب بتصميم محدد
function createFixedFamilyTree() {
  // الوصول إلى حاوية الشجرة
  const container = document.querySelector('.svg-container') || document.querySelector('#tree-container');
  if (!container) return;
  
  // تفريغ الحاوية
  container.innerHTML = '';
  
  // إنشاء الحاوية الرئيسية للشجرة
  const treeContainer = document.createElement('div');
  treeContainer.className = 'fixed-tree-container';
  container.appendChild(treeContainer);
  
  // تعريف بيانات الشجرة (الأسماء والعلاقات)
  const treeData = [
    { id: 'muhammad', name: 'محمد صلى الله عليه وسلم', type: 'prophet', level: 0, order: 0 },
    { id: 'abdullah', name: 'عبدالله', type: 'father', level: 1, order: 1, parent: 'muhammad' },
    { id: 'amina', name: 'آمنة', type: 'mother', level: 1, order: -1, parent: 'muhammad' },
    { id: 'hashim', name: 'هاشم', type: 'father', level: 2, order: 1, parent: 'abdullah' },
    { id: 'wahb', name: 'وهب', type: 'father', level: 2, order: -1, parent: 'amina' },
    { id: 'abdmanaf', name: 'عبد مناف', type: 'father', level: 3, order: 1, parent: 'hashim' },
    { id: 'abdmanafzuhri', name: 'عبد مناف الزهري', type: 'father', level: 3, order: -1, parent: 'wahb' },
    { id: 'qusai', name: 'قصي', type: 'father', level: 4, order: 1, parent: 'abdmanaf' },
    { id: 'zuhrah', name: 'زهرة', type: 'father', level: 4, order: -1, parent: 'abdmanafzuhri' },
    { id: 'kilab', name: 'كلاب', type: 'father', level: 5, order: 0, parent: 'qusai' },
    { id: 'murrah', name: 'مرة', type: 'father', level: 6, order: 0, parent: 'kilab' }
  ];
  
  // إنشاء الشجرة
  buildFixedTree(treeContainer, treeData);
  
  // توسيط الشجرة أفقياً
  treeContainer.style.textAlign = 'center';
}

// دالة بناء الشجرة بتصميم محدد
function buildFixedTree(container, data) {
  // تحديد عرض وارتفاع البطاقات
  const cardWidth = 120;
  const cardHeight = 50;
  const verticalSpacing = 30; // المسافة الرأسية بين المستويات
  
  // إنشاء حاوية رئيسية لوضع البطاقات بشكل مطلق
  const treeWrapper = document.createElement('div');
  treeWrapper.className = 'fixed-tree-wrapper';
  treeWrapper.style.position = 'relative';
  treeWrapper.style.height = '600px'; // ارتفاع كافٍ للشجرة
  treeWrapper.style.margin = '0 auto';
  treeWrapper.style.width = '100%';
  treeWrapper.style.maxWidth = '500px';
  container.appendChild(treeWrapper);
  
  // إنشاء بطاقات الأشخاص
  data.forEach(person => {
    // حساب الموقع بناءً على المستوى والترتيب
    const yPosition = 20 + person.level * (cardHeight + verticalSpacing);
    let xPosition = 50; // موقع افتراضي في الوسط
    
    // تعديل الموقع الأفقي بناءً على الترتيب
    if (person.order < 0) {
      xPosition = 50 - (cardWidth + 50);
    } else if (person.order > 0) {
      xPosition = 50 + 50;
    }
    
    // إنشاء بطاقة الشخص
    const card = createPersonCard(person);
    card.style.position = 'absolute';
    card.style.top = `${yPosition}px`;
    card.style.left = `${xPosition}px`;
    card.style.width = `${cardWidth}px`;
    card.style.height = `${cardHeight}px`;
    
    treeWrapper.appendChild(card);
  });
  
  // إنشاء خطوط الربط بين البطاقات
  drawConnectionLines(treeWrapper, data);
}

// دالة إنشاء بطاقة شخص
function createPersonCard(person) {
  const card = document.createElement('div');
  card.className = `fixed-person-card ${person.type}`;
  card.dataset.id = person.id;
  
  // تطبيق التنسيقات المناسبة
  card.style.borderRadius = '15px';
  card.style.display = 'flex';
  card.style.flexDirection = 'column';
  card.style.justifyContent = 'center';
  card.style.alignItems = 'center';
  card.style.textAlign = 'center';
  card.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
  card.style.padding = '10px';
  
  // تحديد لون الخلفية حسب نوع الشخص
  if (person.type === 'prophet') {
    card.style.backgroundColor = '#74b9ff'; // أزرق فاتح للنبي
  } else if (person.type === 'mother') {
    card.style.backgroundColor = '#e84393'; // وردي للأم
  } else {
    card.style.backgroundColor = '#74b9ff'; // أزرق فاتح للآباء
  }
  
  // إضافة اسم الشخص
  const nameText = document.createElement('span');
  nameText.textContent = person.name;
  nameText.style.fontWeight = 'bold';
  nameText.style.color = 'white';
  nameText.style.fontSize = '14px';
  card.appendChild(nameText);
  
  // إضافة مستمع حدث للنقر
  card.addEventListener('click', function() {
    showPersonInfo(person);
  });
  
  return card;
}

// دالة رسم خطوط الربط بين البطاقات
function drawConnectionLines(container, data) {
  // لكل شخص له أب في الشجرة
  data.forEach(person => {
    if (!person.parent) return;
    
    // البحث عن بطاقتي الابن والأب
    const childCard = container.querySelector(`.fixed-person-card[data-id="${person.id}"]`);
    const parentCard = container.querySelector(`.fixed-person-card[data-id="${person.parent}"]`);
    
    if (!childCard || !parentCard) return;
    
    // الحصول على إحداثيات البطاقات
    const childRect = childCard.getBoundingClientRect();
    const parentRect = parentCard.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // حساب الإحداثيات النسبية
    const childX = childCard.offsetLeft + childCard.offsetWidth / 2;
    const childY = childCard.offsetTop;
    const parentX = parentCard.offsetLeft + parentCard.offsetWidth / 2;
    const parentY = parentCard.offsetTop + parentCard.offsetHeight;
    
    // إنشاء خط الربط باستخدام SVG
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("style", "position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1;");
    
    // إنشاء مسار الخط
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", `M${parentX},${parentY} L${childX},${childY}`);
    path.setAttribute("stroke", "#a0a0a0");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("fill", "none");
    
    // إضافة المسار إلى SVG وإضافة SVG للحاوية
    svg.appendChild(path);
    container.appendChild(svg);
  });
}

// دالة عرض معلومات الشخص
function showPersonInfo(person) {
  // بيانات السيرة للأشخاص
  const bios = {
    muhammad: 'محمد بن عبد الله، خاتم الأنبياء والمرسلين، ولد في مكة المكرمة عام الفيل (571 م تقريباً).',
    abdullah: 'عبد الله بن عبد المطلب، والد النبي محمد ﷺ، توفي قبل مولد النبي ﷺ.',
    amina: 'آمنة بنت وهب، أم النبي محمد ﷺ، توفيت والنبي في سن السادسة.',
    hashim: 'هاشم بن عبد مناف، جد النبي محمد ﷺ الثاني، ومنه ينسب الهاشميون.',
    wahb: 'وهب بن عبد مناف، والد آمنة أم النبي محمد ﷺ.',
    abdmanaf: 'عبد مناف بن قصي، جد النبي محمد ﷺ الثالث، كان من سادات قريش.',
    abdmanafzuhri: 'عبد مناف الزهري، أبو وهب والد آمنة.',
    qusai: 'قصي بن كلاب، جد النبي محمد ﷺ الرابع، جمع قريشاً بعد تفرقها.',
    zuhrah: 'زهرة، جد النبي محمد ﷺ من جهة أمه.',
    kilab: 'كلاب بن مرة، جد النبي محمد ﷺ الخامس.'
  };
  
  // الحصول على معلومات الشخص
  const bio = bios[person.id] || `${person.name}: أحد أجداد النبي محمد ﷺ الكرام.`;
  
  // إنشاء نافذة منبثقة للمعلومات
  alert(`${person.name}\n\n${bio}`);
}

// دالة إعداد أزرار التحكم
function setupControlButtons() {
  // زر التكبير
  document.getElementById('zoom-in')?.addEventListener('click', function() {
    const tree = document.querySelector('.fixed-tree-wrapper');
    if (!tree) return;
    
    const currentScale = getComputedScale(tree);
    tree.style.transform = `scale(${currentScale * 1.2})`;
    tree.style.transformOrigin = 'center top';
  });
  
  // زر التصغير
  document.getElementById('zoom-out')?.addEventListener('click', function() {
    const tree = document.querySelector('.fixed-tree-wrapper');
    if (!tree) return;
    
    const currentScale = getComputedScale(tree);
    tree.style.transform = `scale(${Math.max(0.5, currentScale * 0.8)})`;
    tree.style.transformOrigin = 'center top';
  });
  
  // زر إعادة الضبط
  document.getElementById('reset-view')?.addEventListener('click', function() {
    const tree = document.querySelector('.fixed-tree-wrapper');
    if (!tree) return;
    
    tree.style.transform = '';
  });
}

// دالة الحصول على مقياس التكبير الحالي
function getComputedScale(element) {
  const style = window.getComputedStyle(element);
  const transform = style.transform || style.webkitTransform;
  
  if (transform === 'none' || !transform) return 1;
  
  const matrix = transform.match(/^matrix\((.+)\)$/);
  if (!matrix || matrix.length < 2) return 1;
  
  const values = matrix[1].split(', ');
  return parseFloat(values[0]) || 1;
}