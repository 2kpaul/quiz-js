
class Quiz {

    constructor() {
        this.question_nr = document.querySelector('.question-nr span');
        this.question_title = document.querySelector('.question h3');
        this.answers = document.querySelector('.answers');
        this.allAnswers = document.querySelectorAll('.answer');
        this.nextBtn = document.querySelector('.quiz-nav');
        this.questionsPoints = document.querySelector('.questions-info');
        this.quiz = '';
        this.current_question = 0;
        this.current_question_index = 0;
        this.nextQuestion = 0;
        this.final_score = 0;

    }

    resetSelectors() {
        this.answers = document.querySelector('.answers');
        this.allAnswers = document.querySelectorAll('.answer');
        this.nextBtn.disabled = true;
    }

    checkAnswer() {
        let activeAnswer = document.querySelector('.answer.active');
        let activeAnsweIndex = activeAnswer.getAttribute('data-index');
        if (this.quiz.questions[this.current_question_index].answers[activeAnsweIndex].isCorrect === true) {
            this.final_score++;
        }
    }

    displayResults() {
        this.nextBtn.remove();
        this.answers.remove();
        this.question_nr.parentElement.remove();
        this.question_title.innerText = "Yo've finished the quiz, you guessed " + this.final_score + " of " + this.quiz.questions.length;
    }

    loadNextQuestion(e) {
        if (this.nextQuestion < this.quiz.questions.length) {
            this.checkAnswer();
            this.getQuestion(this.nextQuestion);
        } else {
            //check final answer and then reset quiz
            this.checkAnswer();
            this.displayResults();
        }
        this.current_question_index++;
    }

    async fetchQuiz(url) {
        try {
            const response = await fetch(url);
            return response.json();
        } catch (e) {
            console.error(e);
        }
    }

    clearQuestion() {
        this.answers.innerHTML = '';
        this.answers.innerHTML = '';
        this.question_nr.innerText = '';
    }

    getQuestion(key) {
        this.clearQuestion();
        this.current_question++;
        this.question_nr.innerText = this.current_question;
        this.question_title.innerText = this.quiz.questions[key].title;
        this.quiz.questions[key].answers.forEach((answer, index) => {
            let new_answer = document.createElement('li');
            new_answer.classList.add('answer');
            new_answer.innerText = answer.answer;
            new_answer.setAttribute('data-index', index);
            this.answers.appendChild(new_answer);
        });
        this.addEventsToAnswers();
        this.nextQuestion++;
    }

    getQuestionsPoints() {
        this.questionsPoints.innerHTML = '';
        this.quiz.questions.forEach((question, index) => {
            let new_question = document.createElement('li');
            new_question.innerText = ++index + '.' + question.points;
            this.questionsPoints.appendChild(new_question);
        });
    }



    addEventsToAnswers() {
        this.resetSelectors();
        this.allAnswers.forEach(answer => {
            answer.addEventListener('click', function (event) {
                event.target.classList.toggle('active');
                if (event.target.classList.contains('active')) {
                    document.querySelector('.quiz-nav').disabled = false;
                } else {
                    document.querySelector('.quiz-nav').disabled = true;
                }
                event.target.parentNode.childNodes.forEach(other => {
                    if (event.target != other) {
                        other.classList.remove('active');
                    }
                });
            })
        });
    }

    async getQuiz(url) {
        const data = await this.fetchQuiz(url);
        this.quiz = data.quiz;
        this.getQuestion(0);

        this.getQuestionsPoints();

    }

}


//create quiz object

quiz = new Quiz();

//display quiz
quiz.getQuiz('./quiz.json');

//add events

quiz.nextBtn.addEventListener('click', function () {
    quiz.loadNextQuestion();
    if (quiz.current_question == 10) {
        quiz.nextBtn.innerText = 'finish quiz';
    }
});







