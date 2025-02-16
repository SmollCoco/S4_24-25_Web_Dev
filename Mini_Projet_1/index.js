document.addEventListener("DOMContentLoaded", () => {
    const scoreElement = document.getElementById("score");
    const questionContainer = document.getElementById("question-container");
    const submitButton = document.getElementById("submit-btn");
    const startButton = document.getElementById("start-btn");
    const restartButton = document.getElementById("restart-btn");
    const categorySelect = document.getElementById("category");
    const difficultySelect = document.getElementById("difficulty");
    const timerElement = document.getElementById("time");
    const quizContainer = document.getElementById("quiz-container");
    const configContainer = document.getElementById("config-container");
    const resultsContainer = document.getElementById("results-container");
    const resultsDiv = document.getElementById("results");
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeLeft = 15;
    let answersLog = [];

    async function fetchCategories() {
        const res = await fetch("https://opentdb.com/api_category.php");
        const data = await res.json();
        categorySelect.innerHTML = data.trivia_categories
            .map((cat) => `<option value="${cat.id}">${cat.name}</option>`)
            .join("");
    }

    async function startQuiz() {
        const category = categorySelect.value;
        const difficulty = difficultySelect.value;
        const res = await fetch(
            `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`
        );
        const data = await res.json();
        questions = data.results;
        currentQuestionIndex = 0;
        score = 0;
        answersLog = [];
        scoreElement.textContent = score;
        configContainer.style.display = "none";
        quizContainer.style.display = "block";
        showQuestion();
    }

    function startTimer() {
        clearInterval(timer);
        timeLeft = 15;
        timerElement.textContent = timeLeft;
        timer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                nextQuestion();
            }
        }, 1000);
    }

    function showQuestion() {
        clearInterval(timer);
        if (currentQuestionIndex >= questions.length) {
            showResults();
            return;
        }
        const questionData = questions[currentQuestionIndex];
        const answers = [
            ...questionData.incorrect_answers,
            questionData.correct_answer,
        ].sort(() => Math.random() - 0.5);
        questionContainer.innerHTML = `
        <h3>${questionData.question}</h3>
        ${answers
            .map((ans) => `<button class="answer-btn">${ans}</button>`)
            .join("")}
    `;
        document.querySelectorAll(".answer-btn").forEach((btn) => {
            btn.addEventListener("click", () =>
                checkAnswer(btn.textContent, questionData.correct_answer)
            );
        });
        startTimer();
    }

    function checkAnswer(selected, correct) {
        clearInterval(timer);
        answersLog.push({
            question: questions[currentQuestionIndex].question,
            selected,
            correct,
        });
        if (selected === correct) {
            score++;
            scoreElement.textContent = score;
        }
        nextQuestion();
    }

    function nextQuestion() {
        currentQuestionIndex++;
        showQuestion();
    }

    function showResults() {
        quizContainer.style.display = "none";
        resultsContainer.style.display = "block";
        resultsDiv.innerHTML = answersLog
            .map(
                (ans) => `
        <p><strong>${ans.question}</strong><br>
        Your answer: ${ans.selected} ${
                    ans.selected === ans.correct ? "✔️" : "❌"
                }<br>
        Correct answer: ${ans.correct}</p>
    `
            )
            .join("");
    }

    fetchCategories();
    startButton.addEventListener("click", startQuiz);
    restartButton.addEventListener("click", () => location.reload());
});
