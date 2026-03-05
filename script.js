// Quiz logic for HTML structure
let currentQuestion = 1;
let score = 0;

const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const resultEl = document.getElementById('result');
const scoreEl = document.getElementById('score');

const answers = {
  q1: "Paris",
  q2: "JavaScript",
  q3: "Cascading Style Sheets"
};

document.querySelectorAll('.option').forEach(option => {
  option.addEventListener('click', function(e) {
    const selected = e.target.textContent;
    const questionId = e.target.closest('.question-container').id;
    const correct = answers[questionId];
    if (selected === correct) {
      score++;
      e.target.style.background = "#4CAF50";
    } else {
      e.target.style.background = "#f44336";
    }
    // Disable all options
    Array.from(e.target.parentNode.children).forEach(li => li.removeEventListener('click', arguments.callee));
  });
});

nextBtn.addEventListener('click', () => {
  document.getElementById(`q${currentQuestion}`).classList.add('hidden');
  currentQuestion++;
  if (currentQuestion <= 3) {
    document.getElementById(`q${currentQuestion}`).classList.remove('hidden');
  } else {
    showResult();
  }
});

function showResult() {
  resultEl.classList.remove('hidden');
  scoreEl.textContent = `${score} / 3`;
  nextBtn.classList.add('hidden');
}

restartBtn.addEventListener('click', () => {
  // Reset
  currentQuestion = 1;
  score = 0;
  resultEl.classList.add('hidden');
  nextBtn.classList.remove('hidden');
  // Hide all questions
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`q${i}`).classList.add('hidden');
  }
  // Reset option backgrounds and re-enable click
  document.querySelectorAll('.option').forEach(option => {
    option.style.background = '';
    option.addEventListener('click', function(e) {
      const selected = e.target.textContent;
      const questionId = e.target.closest('.question-container').id;
      const correct = answers[questionId];
      if (selected === correct) {
        score++;
        e.target.style.background = "#4CAF50";
      } else {
        e.target.style.background = "#f44336";
      }
      Array.from(e.target.parentNode.children).forEach(li => li.removeEventListener('click', arguments.callee));
    });
  });
  // Show first question
  document.getElementById('q1').classList.remove('hidden');
});

// Next button click
nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if(currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

// Show final score
function showResult() {
  document.getElementById('quiz').classList.add('hidden');
  resultEl.classList.remove('hidden');
  scoreEl.textContent = `${score} / ${quizData.length}`;
}

// Restart quiz
restartBtn.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  resultEl.classList.add('hidden');
  document.getElementById('quiz').classList.remove('hidden');
  loadQuestion();
});

// Initial load
loadQuestion();

// Restart quiz
restartBtn.addEventListener("click", () => {
  currentQuestion = 1;
  score = 0;
  resultEl.classList.add("hidden");
  nextBtn.classList.remove("hidden");
  document.querySelectorAll(".question-container").forEach(q => q.classList.add("hidden"));
  document.getElementById("q1").classList.remove("hidden");
  // Reset option colors
  document.querySelectorAll(".option").forEach(li => li.style.background = "#f4f4f4");
  // Reattach click events
  document.querySelectorAll(".option").forEach(option => {
    option.addEventListener("click", selectOption);
  });
});
