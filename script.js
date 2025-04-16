// script.js: منطق الاختبار الكامل

const questions = [
    {
      q: "من هو والد النبي محمد ﷺ؟",
      a: ["أ) أبو طالب", "ب) حمزة بن عبد المطلب", "ج) عبد الله بن عبد المطلب", "د) العباس بن عبد المطلب"],
      correct: 2
    },
    {
      q: "من هو جد النبي ﷺ من جهة أبيه؟",
      a: ["أ) عبد مناف", "ب) هاشم", "ج) عبد المطلب", "د) قصي"],
      correct: 2
    },
    {
      q: "ما اسم والدة النبي ﷺ؟",
      a: ["أ) صفية بنت عبد المطلب", "ب) أم سلمة", "ج) آمنة بنت وهب", "د) زينب بنت جحش"],
      correct: 2
    },
    {
      q: "من هو جد النبي ﷺ من جهة أمه؟",
      a: ["أ) عبد الله بن وهب", "ب) عبد مناف بن زهرة", "ج) وهب بن عبد مناف", "د) زهرة بن كلاب"],
      correct: 2
    },
    {
      q: "في أي جد يلتقي النسب؟",
      a: ["أ) عبد مناف بن قصي", "ب) هاشم بن عبد مناف", "ج) كلاب بن مرة", "د) قصي بن كلاب"],
      correct: 2
    },
    {
      q: "إلى أي بطن تنتمي والدة النبي ﷺ؟",
      a: ["أ) بنو هاشم", "ب) بنو أمية", "ج) بنو زهرة", "د) بنو مخزوم"],
      correct: 2
    },
    {
      q: "من هو الجد الذي جمع قريشًا في مكة؟",
      a: ["أ) عبد المطلب", "ب) هاشم", "ج) قصي", "د) عبد مناف"],
      correct: 2
    }
  ];
  
  let current = 0;
  let score = 0;
  let timeLeft = 120;
  let timer;
  
  const correctSound = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_6b48e5d953.mp3");
  const wrongSound = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_d464769a1f.mp3");
  
  window.onload = () => {
    showQuestion();
    startTimer();
  };
  
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("time").textContent = timeLeft;
      if (timeLeft <= 0) endQuiz();
    }, 1000);
  }
  
  function showQuestion() {
    const q = questions[current];
    document.getElementById("question").textContent = q.q;
    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";
    q.a.forEach((ans, index) => {
      const btn = document.createElement("button");
      btn.textContent = ans;
      btn.onclick = () => checkAnswer(index);
      answersDiv.appendChild(btn);
    });
  }
  
  function checkAnswer(selected) {
    const correct = questions[current].correct;
    if (selected === correct) {
      correctSound.play();
      score++;
    } else {
      wrongSound.play();
    }
    current++;
    if (current < questions.length) {
      setTimeout(showQuestion, 500);
    } else {
      endQuiz();
    }
  }
  
  function endQuiz() {
    clearInterval(timer);
    document.getElementById("quizBox").style.display = "none";
    const resultBox = document.getElementById("result");
    resultBox.style.display = "block";
    let message = score === questions.length
      ? "ممتاز! لقد أجبت على جميع الأسئلة بشكل صحيح!"
      : `لقد أجبت على ${score} من ${questions.length} أسئلة.`;
    resultBox.innerHTML = `<h3>${message}</h3>`;
  }
  