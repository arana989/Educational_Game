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
        question: ' Select the transistor.',
        choice1: 'ECN 149',
        choice2: 'BC 149',
        choice3: '2BC 547',
        choice4: 'BD 139',
        answer: 1,
    },
    {
        question:"Select the transformer.",
        choice1: "Transformer with N1:N2= 2:2",
        choice2: "Transformer with N1:N2= 4:3",
        choice3: "Transformer with N1:N2= 2:1",
        choice4: "Transformer with N1:N2= 1:1",
        answer: 3,
    },
    {
        question: "Find the value of IC max using the value of RL’ new.",
        choice1: "3.22 Amp",
        choice2: "2.22 Amp",
        choice3: "1.11 Amp",
        choice4: "4.44 Amp",
        answer: 2,
    },
    {
        question: "What will be the value of resistor connected to emitter Re?",
        choice1: "1.6 Ω",
        choice2: "16 Ω",
        choice3: "120 Ω",
        choice4: "18 Ω",
        answer: 1,
    },
    {
        question: "Select the value of R1 and R2.",
        choice1: "R1=160 Ω  & R2= 24 Ω",
        choice2: "R1=12 KΩ  & R2=18 KΩ",
        choice3: "R1=18 Ω  & R2= 120 Ω",
        choice4: "R1=120 Ω  & R2=18 Ω",
        answer: 4,
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

        return window.location.assign('puzzle_3.html')
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