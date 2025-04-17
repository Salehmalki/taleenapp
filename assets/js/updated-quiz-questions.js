// تحديث أسئلة الاختبار بناءً على المعلومات الدقيقة المقدمة من المستخدم
const quizQuestions = [
  {
    q: "من هو والد النبي محمد صلى الله عليه وسلم؟",
    a: ["عبد العزى", "عبد مناف", "عبد الله بن عبد المطلب", "عبد الدار"],
    correct: 2
  },
  {
    q: "من هو جد النبي محمد صلى الله عليه وسلم من جهة أبيه الذي قام بحفر بئر زمزم؟",
    a: ["عبد مناف", "هاشم", "عبد المطلب بن هاشم", "قصي"],
    correct: 2
  },
  {
    q: "ما اسم والدة النبي محمد صلى الله عليه وسلم؟",
    a: ["خديجة بنت خويلد", "عائشة بنت أبي بكر", "آمنة بنت وهب", "فاطمة الزهراء"],
    correct: 2
  },
  {
    q: "من هو جد النبي محمد صلى الله عليه وسلم من جهة أمه الذي كان سيدًا في بني زهرة؟",
    a: ["عبد الله بن وهب", "عبد مناف بن زهرة", "وهب بن عبد مناف", "زهرة بن كلاب"],
    correct: 2
  },
  {
    q: "في أي جد يلتقي نسب النبي صلى الله عليه وسلم من جهة أبيه ونسبه من جهة أمه؟",
    a: ["عبد مناف بن قصي", "هاشم بن عبد مناف", "كلاب بن مرة", "قصي بن كلاب"],
    correct: 2
  },
  {
    q: "إلى أي قبيلة تنتمي آمنة والدة النبي صلى الله عليه وسلم؟",
    a: ["بنو هاشم", "بنو أمية", "بنو زهرة", "بنو مخزوم"],
    correct: 2
  },
  {
    q: "من هو الجد الذي يعتبر المؤسس الحقيقي لزعامة قريش في مكة؟",
    a: ["عبد المطلب بن هاشم", "هاشم بن عبد مناف", "قصي بن كلاب", "عبد مناف بن قصي"],
    correct: 2
  }
];

// دالة عرض السؤال مع إضافة وظيفة إزالة التظليل

function showQuestion() {
  const questionData = questions[currentQuestion];
  const questionText = document.getElementById('question-text');
  const answersBox = document.getElementById('answers-box');
  
  // عرض نص السؤال
  questionText.textContent = questionData.q;
  
  // إنشاء أزرار الإجابات
  answersBox.innerHTML = '';
  
  // نسخ مصفوفة الإجابات وترتيبها عشوائيًا
  const answers = questionData.a.slice();
  shuffleArray(answers);
  
  // إنشاء أزرار الإجابات
  answers.forEach(function(answer, index) {
    const button = document.createElement('button');
    button.className = 'clickable';
    button.textContent = answer;
    button.addEventListener('click', function() {
      // التحقق من الإجابة
      checkAnswer(answer, questionData);
    });
    answersBox.appendChild(button);
  });
  
  // إعادة ضبط العداد التنازلي
  resetTimer();
  
  // إزالة أي تركيز متبقي من الأسئلة السابقة
  document.activeElement.blur();
}

// دالة التحقق من الإجابة مع تعديلها لإزالة التظليل قبل الانتقال للسؤال التالي
function checkAnswer(selectedAnswer, questionData) {
  const correctAnswer = questionData.a[questionData.correct];
  
  if (selectedAnswer === correctAnswer) {
    // الإجابة صحيحة
    score++;
    
    // تشغيل صوت النقرة
    if (typeof playClickSound === 'function') {
      playClickSound();
    }
  } else {
    // الإجابة خاطئة
    // تشغيل صوت النقرة
    if (typeof playClickSound === 'function') {
      playClickSound();
    }
  }
  
  // إزالة التركيز من جميع الأزرار
  const buttons = document.querySelectorAll('.answers-box button');
  buttons.forEach(button => {
    button.blur();  // إزالة التركيز
  });
  
  // الانتقال إلى السؤال التالي أو إنهاء الاختبار
  currentQuestion++;
  
  if (currentQuestion < questions.length) {
    // إضافة تأخير قصير قبل عرض السؤال التالي لإزالة أي آثار للتظليل
    setTimeout(() => {
      showQuestion();
    }, 10);
  } else {
    endQuiz();
  }
}
