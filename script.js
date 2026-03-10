const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      "Hyper Text Markup Language",
      "High Transfer Machine Language",
      "Hyper Tool Multi Language",
      "Home Tool Markup Logic"
    ],
    correct: 0
  },
  {
    question: "Why is Git important for developers?",
    answers: [
      "It manages code versions",
      "It designs websites",
      "It stores images",
      "It sends emails"
    ],
    correct: 0
  },
  {
    question: "A colleague finds a bug in your code. What should you do?",
    answers: [
      "Ignore it",
      "Blame someone else",
      "Thank them and fix it",
      "Delete the code"
    ],
    correct: 2
  },
  {
    question: "What is SQL Injection?",
    answers: [
      "A database attack",
      "A CSS animation",
      "A design pattern",
      "A web server"
    ],
    correct: 0
  },
  {
    question: "You don't understand a task in a project. What should you do?",
    answers: [
      "Do nothing",
      "Ask for clarification",
      "Ignore the task",
      "Wait until the deadline"
    ],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const result = document.getElementById("result");
const scoreDisplay = document.getElementById("score");
const nextButton = document.getElementById("next");

// Create progress bar dynamically
const container = document.querySelector('.container');
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
progressBar.innerHTML = '<div class="progress-fill" id="progress-fill"></div>';
container.insertBefore(progressBar, questionElement);

const progressFill = document.getElementById('progress-fill');

function updateProgress() {
  const progress = ((currentQuestion) / questions.length) * 100;
  progressFill.style.width = progress + '%';
}

function getMessage(score) {
  const percentage = (score / questions.length) * 100;
  if (percentage === 100) return "Perfect! You're a true developer! 🏆";
  if (percentage >= 80) return "Great job! You know your stuff! 🌟";
  if (percentage >= 60) return "Good work! Keep learning! 📚";
  if (percentage >= 40) return "Not bad! There's room to improve! 💪";
  return "Keep practicing! You'll get better! 🔧";
}

function loadQuestion() {
  answered = false;
  const q = questions[currentQuestion];
  
  questionElement.innerText = q.question;
  answersDiv.innerHTML = "";
  result.innerText = "";
  result.className = "";
  
  nextButton.disabled = true;
  nextButton.style.opacity = '0.5';
  
  updateProgress();

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.innerText = answer;
    btn.dataset.index = index;
     
    btn.addEventListener("click", () => checkAnswer(index, btn));
    
    // Staggered animation for buttons
    btn.style.opacity = '0';
    btn.style.transform = 'translateX(-20px)';
    answersDiv.appendChild(btn);
    
    setTimeout(() => {
      btn.style.transition = 'all 0.3s ease';
      btn.style.opacity = '1';
      btn.style.transform = 'translateX(0)';
    }, index * 100);
  });
}

function checkAnswer(index, selectedBtn) {
  if (answered) return;
  answered = true;
  
  const q = questions[currentQuestion];
  const buttons = answersDiv.querySelectorAll("button");
  
  nextButton.disabled = false;
  nextButton.style.opacity = '1';
  
  if (index === q.correct) {
    result.innerText = "Correct! ✓";
    result.className = "correct";
    selectedBtn.classList.add("correct");
    score++;
    scoreDisplay.innerText = score;
    
    // Animate score
    scoreDisplay.style.animation = 'none';
    setTimeout(() => scoreDisplay.style.animation = 'scorePop 0.3s ease', 10);
  } else {
    result.innerText = "Wrong answer ✗";
    result.className = "wrong";
    selectedBtn.classList.add("wrong");
    
    // Show correct answer
    buttons[q.correct].classList.add("correct");
  }
  
  // Disable all buttons after answer
  buttons.forEach(btn => {
    btn.style.pointerEvents = 'none';
  });
}

function nextQuestion() {
  currentQuestion++;
  
  if (currentQuestion >= questions.length) {
    showGameFinished();
    return;
  }
  
  // Fade out effect
  container.style.animation = 'none';
  container.offsetHeight; // Trigger reflow
  container.style.animation = 'fadeIn 0.3s ease';
  
  setTimeout(loadQuestion, 300);
}

function showGameFinished() {
  questionElement.innerText = "Quiz Complete!";
  answersDiv.innerHTML = `
    <div class="game-finished">
      <div class="final-score">${score}/${questions.length}</div>
      <p class="message">${getMessage(score)}</p>
    </div>
  `;
  result.innerText = "";
  nextButton.style.display = "none";
  progressFill.style.width = '100%';
}

nextButton.addEventListener("click", nextQuestion);

// Initialize
loadQuestion();

