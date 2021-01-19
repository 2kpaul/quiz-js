
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
        this.nextQuestion = 0;

        //events

    }

    loadNextQuestion(e) {
        console.log(this.nextQuestion, this.quiz.questions.length)
        if (this.nextQuestion < this.quiz.questions.length) {
            this.getQuestion(this.nextQuestion);
        } else {
            alert("Quiz finished, display results now");
        }
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
        this.quiz.questions[key].answers.forEach(answer => {
            let new_answer = document.createElement('li');
            new_answer.classList.add('answer');
            new_answer.innerText = answer.answer;
            this.answers.appendChild(new_answer);
        });
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

    setActiveAnswer(event) {
        console.log(event);
    }

    async getQuiz(url) {
        const data = await this.fetchQuiz(url);
        this.quiz = data.quiz;
        console.log(quiz);

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
});







