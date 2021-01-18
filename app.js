
//selectors
const question_nr = document.querySelector('.question-nr');
const question = document.querySelector('.question h3');
const answers = document.querySelector('.answers');

async function fetchQuiz(url) {
    try {
        const response = await fetch(url);
        return response.json();
    } catch (e) {
        console.error(e);
    }
}

async function getQuiz(url) {
    const data = await fetchQuiz(url);
    quiz = data.quiz;
    console.log(quiz);
}

getQuiz('./quiz.json');