
//selectors

class Quiz {

    constructor() {
        this.question_nr = document.querySelector('.question-nr span');
        this.question_title = document.querySelector('.question h3');
        this.answers = document.querySelector('.answers');
        this.quiz = '';
        this.current_question = 0;
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
        this.current_question++;
        this.question_nr.innerText = this.current_question;
        this.question_title.innerText = this.quiz.questions[0].title;
        this.quiz.questions[0].answers.forEach(answer => {
            let new_answer = document.createElement('li');
            new_answer.innerText = answer.answer;
            this.answers.appendChild(new_answer);
        });
    }

    async getQuiz(url) {
        const data = await this.fetchQuiz(url);
        this.quiz = data.quiz;
        console.log(quiz);

        this.clearQuestion();

        this.getQuestion(0);

    }

}


quiz = new Quiz();
quiz.getQuiz('./quiz.json');


