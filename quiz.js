document.addEventListener("DOMContentLoaded", function() {
    const loginContainer = document.getElementById('login-container');
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const authError = document.getElementById('auth-error');
    const questionElement = document.getElementById('question');
    const optionElements = document.getElementById('options');
    const feedbackElement = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');
    const submitButton = document.getElementById('submit-btn');
    const timerElement = document.getElementById('timer');
    const timeLeftElement = document.getElementById('time-left');

    let currentQuestionIndex = 0;
    let score = 0;
    let timer;

    // Mock questions data (Replace this with actual data fetched from backend)
    const questions = [
        {
            question: "1. What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Rome"],
            answerIndex: 0 
        },
        {
            question: "2. Which planet is known as the Red Planet?",
            options: ["Mars", "Venus", "Jupiter", "Mercury"],
            answerIndex: 0 
        },
        {
            question: "3. What is the largest mammal?",
            options: ["Elephant", "Whale", "Giraffe", "Horse"],
            answerIndex: 1 
        },
        {
            question: "4. Which country is known as the Land of the Rising Sun?",
            options: ["China", "India", "Japan", "South Korea"],
            answerIndex: 2 
        },
        {
            question: "5. Who painted the Mona Lisa?",
            options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Michelangelo"],
            answerIndex: 0 
        },
        {
            question: "6. What is the chemical symbol for water?",
            options: ["W", "H2O", "O2", "CO2"],
            answerIndex: 1 
        },
        {
            question: "7. Which bird can fly backward?",
            options: ["Eagle", "Hummingbird", "Ostrich", "Penguin"],
            answerIndex: 1 
        },
        {
            question: "8. What is the tallest mountain in the world?",
            options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
            answerIndex: 0 
        },
        {
            question: "9. Which is the only planet in the solar system that rotates on its side?",
            options: ["Venus", "Mars", "Uranus", "Neptune"],
            answerIndex: 2 
        },
        {
            question: "10. What is the capital of Canada?",
            options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
            answerIndex: 2 
        }
    ];
    


    loginBtn.addEventListener('click', login);
    signupBtn.addEventListener('click', signUp);
    submitButton.addEventListener('click', handleOptionSelect);

    // Functions
    function login() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Add login logic here (connecting to backend)

        // For demo purposes, let's assume login is successful
        showQuiz();
    }

    function signUp() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Add sign up logic here (connecting to backend)

        // For demo purposes, let's assume sign up is successful
        showQuiz();
    }

    function showQuiz() {
        loginContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        displayQuestion(questions[currentQuestionIndex]);
        startTimer(30); // Timer set for 30 seconds per question
    }

    function displayQuestion(question) {
        questionElement.textContent = question.question;
        optionElements.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('li');
            optionElement.textContent = option;
            optionElement.classList.add('option');
            optionElement.setAttribute('data-index', index);
            optionElement.addEventListener('click', handleOptionSelect); 
            optionElements.appendChild(optionElement);
        });
    }

    function handleOptionSelect(event) {
        const selectedOptionIndex = parseInt(event.target.getAttribute('data-index')); 
        const correctOptionIndex = questions[currentQuestionIndex].answerIndex;

        if (selectedOptionIndex === correctOptionIndex) {
            score += 10;
            displayFeedback(true);
        } else {
            displayFeedback(false);
        }

        updateScore();
        setTimeout(() => {
            displayFeedback('');
            nextQuestion();
        }, 1000);
    }

    function displayFeedback(isCorrect) {
        feedbackElement.textContent = isCorrect ? 'Correct!' : 'Wrong!';
    }

    function updateScore() {
        scoreElement.textContent = `Your score: ${score}`;
        scoreElement.style.fontSize = '20px'; 
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion(questions[currentQuestionIndex]);
            resetTimer();
        } else {
            endQuiz();
        }
    }

    function endQuiz() {
        clearInterval(timer);
        quizContainer.style.display = 'none';
        resultContainer.style.display = 'block';
        updateScore();
    }

    function startTimer(duration) {
        let time = duration;
        updateTimer(time);
        timer = setInterval(() => {
            if (time <= 0) {
                clearInterval(timer);
                nextQuestion();
            } else {
                time--;
                updateTimer(time);
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timer);
        startTimer(30);
    }

    function updateTimer(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timeLeftElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
});
