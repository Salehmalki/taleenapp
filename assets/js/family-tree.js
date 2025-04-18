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

// شجرة نسب النبي محمد ﷺ - النسخة المصححة

document.addEventListener('DOMContentLoaded', function() {
  // بناء شجرة النسب بالتصميم الجديد
  buildSimpleFamilyTree();
  
  // إعداد زر إغلاق التلميح
  document.querySelector('.close-tooltip')?.addEventListener('click', function() {
    document.getElementById('tooltip').style.display = 'none';
  });
  
  // إغلاق التلميح عند النقر خارجه
  document.addEventListener('click', function(event) {
    const tooltip = document.getElementById('tooltip');
    if (tooltip && !tooltip.contains(event.target) && 
        !event.target.closest('.person-card')) {
      tooltip.style.display = 'none';
    }
  });
});

// دالة بناء شجرة النسب البسيطة
function buildSimpleFamilyTree() {
  // الوصول إلى حاوية الشجرة
  const container = document.querySelector('.svg-container');
  if (!container) return;
  
  // تنظيف الحاوية
  container.innerHTML = '';
  
  // بيانات شجرة النسب مع معلومات الموقع
  const treeData = [
    // صف 1: النبي محمد ﷺ
    { id: "muhammad", name: "محمد ﷺ", title: "خاتم الأنبياء", row: 0, position: 0, type: "prophet" },
    
    // صف 2: عبدالله وآمنة
    { id: "abdullah", name: "عبدالله", title: "والد النبي ﷺ", row: 1, position: 1, type: "father" },
    { id: "amina", name: "آمنة", title: "أم النبي ﷺ", row: 1, position: -1, type: "mother" },
    
    // صف 3: عبدالمطلب ووهب
    { id: "abdulmutalib", name: "عبد المطلب", title: "جد النبي ﷺ لأبيه", row: 2, position: 1, type: "father" },
    { id: "wahb", name: "وهب", title: "جد النبي ﷺ لأمه", row: 2, position: -1, type: "father" },
    
    // صف 4: هاشم وعبد مناف الزهري
    { id: "hashim", name: "هاشم", title: "جد النبي الثاني", row: 3, position: 1, type: "father" },
    { id: "abdmanafzuhri", name: "عبد مناف الزهري", title: "أبو وهب", row: 3, position: -1, type: "father" },
    
    // صف 5: عبد مناف وزهرة
    { id: "abdmanaf", name: "عبد مناف", title: "جد النبي الثالث", row: 4, position: 1, type: "father" },
    { id: "zuhrah", name: "زهرة", title: "جد النبي من قبل أمه", row: 4, position: -1, type: "father" },
    
    // صف 6: قصي
    { id: "qusai", name: "قصي", title: "جد النبي الرابع", row: 5, position: 1, type: "father" },
    
    // صف 7: كلاب (الجد المشترك)
    { id: "kilab", name: "كلاب", title: "جد النبي الخامس", row: 6, position: 0, type: "father" },
    
    // صف 8 وما بعده: استكمال النسب في المنتصف
    { id: "murrah", name: "مرة", title: "جد النبي السادس", row: 7, position: 0, type: "father" },
    { id: "kaab", name: "كعب", title: "جد النبي السابع", row: 8, position: 0, type: "father" },
    { id: "luay", name: "لؤي", title: "جد النبي الثامن", row: 9, position: 0, type: "father" },
    { id: "ghalib", name: "غالب", title: "جد النبي التاسع", row: 10, position: 0, type: "father" },
    { id: "fihr", name: "فهر", title: "جد النبي العاشر (قريش)", row: 11, position: 0, type: "father" },
    { id: "malik", name: "مالك", title: "جد النبي الحادي عشر", row: 12, position: 0, type: "father" },
    { id: "alnadr", name: "النضر", title: "جد النبي الثاني عشر", row: 13, position: 0, type: "father" },
    { id: "kinanah", name: "كنانة", title: "جد النبي الثالث عشر", row: 14, position: 0, type: "father" },
    { id: "khuzaimah", name: "خزيمة", title: "جد النبي الرابع عشر", row: 15, position: 0, type: "father" },
    { id: "mudrikah", name: "مدركة", title: "جد النبي الخامس عشر", row: 16, position: 0, type: "father" },
    { id: "ilyas", name: "إلياس", title: "جد النبي السادس عشر", row: 17, position: 0, type: "father" },
    { id: "mudar", name: "مضر", title: "جد النبي السابع عشر", row: 18, position: 0, type: "father" },
    { id: "nizar", name: "نزار", title: "جد النبي الثامن عشر", row: 19, position: 0, type: "father" },
    { id: "maad", name: "معد", title: "جد النبي التاسع عشر", row: 20, position: 0, type: "father" },
    { id: "adnan", name: "عدنان", title: "جد النبي العشرون", row: 21, position: 0, type: "father" }
  ];
  
  // ترتيب البيانات حسب الصفوف
  const rows = {};
  treeData.forEach(person => {
    if (!rows[person.row]) rows[person.row] = [];
    rows[person.row].push(person);
  });
  
  // إنشاء الشجرة كعناصر HTML
  Object.keys(rows).sort((a, b) => a - b).forEach(rowIndex => {
    // إنشاء صف جديد
    const rowElement = document.createElement('div');
    rowElement.className = 'tree-row';
    rowElement.style.display = 'flex';
    rowElement.style.justifyContent = 'center';
    rowElement.style.alignItems = 'center';
    rowElement.style.margin = '20px 0';
    rowElement.style.width = '100%';
    rowElement.style.textAlign = 'center';
    
    // ترتيب العناصر في الصف
    const sortedPeople = rows[rowIndex].sort((a, b) => a.position - b.position);
    
    sortedPeople.forEach(person => {
      // إنشاء بطاقة شخص
      const card = document.createElement('div');
      
      // تعيين الفئة بناءً على النوع
      card.className = 'person-card';
      if (person.type === 'prophet') {
        card.classList.add('muhammad');
      } else if (person.type === 'mother') {
        card.classList.add('mother-line');
      } else {
        card.classList.add('father-line');
      }
      
      // تحديد الموقع
      const positionClass = person.position === 0 ? 'center' : 
                            person.position < 0 ? 'left' : 'right';
      card.classList.add(`position-${positionClass}`);
      card.setAttribute('data-id', person.id);
      
      // إضافة المحتوى
      card.innerHTML = `
        <div class="person-name">${person.name}</div>
        <div class="person-title">${person.title}</div>
        <span class="person-decoration decoration-top-right">۞</span>
        <span class="person-decoration decoration-bottom-left">۞</span>
      `;
      
      // إضافة معالج النقر
      card.addEventListener('click', function(event) {
        event.stopPropagation();
        showPersonInfo(person, card);
      });
      
      // إضافة البطاقة إلى الصف
      rowElement.appendChild(card);
    });
    
    // إضافة الصف إلى الحاوية
    container.appendChild(rowElement);
  });
}

// عرض معلومات الشخص
function showPersonInfo(person, element) {
  const tooltip = document.getElementById('tooltip');
  
  if (!tooltip) return;
  
  // تنظيف التلميح
  tooltip.innerHTML = '';
  
  // إنشاء رأس التلميح
  const header = document.createElement('div');
  header.className = 'tooltip-header';
  tooltip.appendChild(header);
  
  // إضافة عنوان التلميح
  const title = document.createElement('h3');
  title.id = 'tooltip-title';
  title.textContent = person.name;
  header.appendChild(title);
  
  // إضافة زر الإغلاق
  const closeButton = document.createElement('span');
  closeButton.className = 'close-tooltip';
  closeButton.innerHTML = '×';
  closeButton.addEventListener('click', function(e) {
    e.stopPropagation();
    tooltip.style.display = 'none';
  });
  header.appendChild(closeButton);
  
  // إضافة محتوى التلميح
  const content = document.createElement('div');
  content.id = 'tooltip-info';
  tooltip.appendChild(content);
  
  // النص الخاص بكل شخص
  const personBios = {
    muhammad: 'محمد بن عبد الله، خاتم الأنبياء والمرسلين، ولد في مكة المكرمة عام الفيل (571 م تقريباً).',
    abdullah: 'عبد الله بن عبد المطلب، والد النبي محمد ﷺ، توفي قبل مولد النبي ﷺ بأشهر.',
    amina: 'آمنة بنت وهب، أم النبي محمد ﷺ، توفيت والنبي في سن السادسة.',
    abdulmutalib: 'عبد المطلب بن هاشم، جد النبي محمد ﷺ لأبيه وكافله بعد وفاة أمه.',
    hashim: 'هاشم بن عبد مناف، جد النبي محمد ﷺ الثاني، ومنه ينسب الهاشميون.',
    wahb: 'وهب بن عبد مناف الزهري، والد آمنة أم النبي محمد ﷺ.',
    abdmanaf: 'عبد مناف بن قصي، جد النبي محمد ﷺ الثالث، كان من سادات قريش.',
    abdmanafzuhri: 'عبد مناف الزهري، أبو وهب والد آمنة أم النبي ﷺ.',
    qusai: 'قصي بن كلاب، جد النبي محمد ﷺ الرابع، كان مجمع قريش.',
    zuhrah: 'زهرة بن كلاب، جد النبي محمد ﷺ من جهة أمه، وأخو قصي بن كلاب.',
    kilab: 'كلاب بن مرة، جد النبي محمد ﷺ الخامس، وهو الجد المشترك بين فرعي الأب والأم.',
    murrah: 'مرة بن كعب، جد النبي محمد ﷺ السادس.',
    kaab: 'كعب بن لؤي، جد النبي محمد ﷺ السابع.',
    luay: 'لؤي بن غالب، جد النبي محمد ﷺ الثامن.',
    ghalib: 'غالب بن فهر، جد النبي محمد ﷺ التاسع.',
    fihr: 'فهر بن مالك، جد النبي محمد ﷺ العاشر، ويعرف بقريش وإليه تنسب القبيلة.',
    malik: 'مالك بن النضر، جد النبي محمد ﷺ الحادي عشر.',
    alnadr: 'النضر بن كنانة، جد النبي محمد ﷺ الثاني عشر.',
    kinanah: 'كنانة بن خزيمة، جد النبي محمد ﷺ الثالث عشر.',
    khuzaimah: 'خزيمة بن مدركة، جد النبي محمد ﷺ الرابع عشر.',
    mudrikah: 'مدركة بن إلياس، جد النبي محمد ﷺ الخامس عشر.',
    ilyas: 'إلياس بن مضر، جد النبي محمد ﷺ السادس عشر.',
    mudar: 'مضر بن نزار، جد النبي محمد ﷺ السابع عشر.',
    nizar: 'نزار بن معد، جد النبي محمد ﷺ الثامن عشر.',
    maad: 'معد بن عدنان، جد النبي محمد ﷺ التاسع عشر.',
    adnan: 'عدنان، جد النبي محمد ﷺ العشرون، وينتهي إليه نسب العرب العدنانية.'
  };
  
  content.textContent = personBios[person.id] || `${person.name}: أحد أجداد النبي محمد ﷺ الكرام.`;
  
  // تحديد موقع التلميح
  tooltip.style.display = 'block';
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  
  if (isMobile) {
    // على الجوال، عرض التلميح في وسط الشاشة
    tooltip.style.position = 'fixed';
    tooltip.style.top = '50%';
    tooltip.style.left = '50%';
    tooltip.style.transform = 'translate(-50%, -50%)';
    tooltip.style.width = '85%';
    tooltip.style.maxWidth = '300px';
    tooltip.style.zIndex = '1000';
  } else {
    // على سطح المكتب، عرض التلميح بالقرب من البطاقة
    const cardRect = element.getBoundingClientRect();
    const tooltipWidth = 320;
    
    tooltip.style.position = 'absolute';
    tooltip.style.zIndex = '1000';
    tooltip.style.width = `${tooltipWidth}px`;
    
    // حساب موقع التلميح (أسفل البطاقة مباشرة)
    const top = cardRect.bottom + window.scrollY + 10;
    const left = cardRect.left + (cardRect.width / 2) - (tooltipWidth / 2) + window.scrollX;
    
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
    tooltip.style.transform = 'none';
  }
}