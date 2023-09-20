const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'For what input combination, race around condition takes place in JK flip flop? ',
        choice1: ' J=1, K=1',
        choice2: ' J=1, K=0',
        choice3: ' J=0, K=1',
        choice4: ' J=0, K=0',
        answer: 1,
    },
    {
        question:
            "Which of the following describes the operation of a positive edge-triggered D- type flip-flop?",
        choice1: "The input is toggled into the flip-flop on the leading edge of the clock and is passed to the output on the trailing edge of the clock.",
        choice2: "The output will follow the input on the leading edge of the clock.",
        choice3: "If both inputs are HIGH, the output will toggle.",
        choice4: "When both inputs are LOW, an invalid state exists.",
        answer: 2,
    },
    {
        question: "To add two m-bit numbers, the required number of half adders is ",
        choice1: "2m",
        choice2: "2m+1",
        choice3: "2^m-1",
        choice4: "2m-1",
        answer: 4,
    },
    {
        question: "A full adder can be made out of",
        choice1: "Two half adders",
        choice2: "Two half adders and a OR gate",
        choice3: "Two half adders and a NOT gate",
        choice4: "Three half adders",
        answer: 1,
    },
    {
        question: "Decimal 63 in hexadecimal number system ish",
        choice1: "3F",
        choice2: "2F",
        choice3: "2E",
        choice4: "3E",
        answer: 1,
    }
]

const SCORE_POINTS = 20
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end_1.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()