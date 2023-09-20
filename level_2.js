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
        question: "Design a single stage CS amplifier for audio frequency with BFW 11 With IDS= (3.3±0.6) mA and |AV|=12.... Q1. Find the value of gm for given data.",
        choice1: "3.472 m mho",
        choice2: '1.736 m mho',
        choice3: '34.72 mho',
        choice4: 'None of the above',
        answer: 1,
    },
    {
        question: 'Design a single stage CS amplifier for audio frequency with BFW 11 With IDS= (3.3±0.6) mA and |AV|=12.... Q2. What will be  RD  , find using formula |AV|= gm × RD ?',
        choice1: '7.6 K ohm ',
        choice2: '760 ohm',
        choice3: ' 3.8 K ohm',
        choice4: '380 ohm  ',
        answer: 3,
    },
    
    {
        question: "Design a single stage CS amplifier for audio frequency with BFW 11 With IDS= (3.3±0.6) mA and |AV|=12.... Q3. What will be Rs , find using KVL ?",
        choice1: "Can’t be determined",
        choice2: "1.1  K ohm",
        choice3: "11ohm",
        choice4: "3.4 Kohm ",
        answer: 2,
    },
    {
        question: "Design a single stage CS amplifier for audio frequency with BFW 11 With IDS= (3.3±0.6) mA and |AV|=12.... Q4. Select the value of R1 and R2 for that you can first find the Vdd.",
        choice1: "R1=12 K Ω and R2= 1 K Ω",
        choice2: "R1=12M Ω and R2= 1 M Ω",
        choice3: "R1=12M Ω and R2= 1 K Ω",
        choice4: "R1=12K Ω and R2= 1 M Ω",
        answer: 2,
    },
    {
        question: "Design a single stage CS amplifier for audio frequency with BFW 11 With IDS= (3.3±0.6) mA and |AV|=12.... Q5. Select the value of C1 , C2 and C3 using formula 1/(2π Req C ) .",
        choice1: "C1=8200 pF, C2=22 uF and C3= 72.343 uF",
        choice2: "C1=820 pF, C2=2.2 uF and C3= 72.343 uF",
        choice3: "C1=8200 pF, C2=2.2 uF and C3= 72.343 uF",
        choice4: "None of the above",
        answer: 3,
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

        return window.location.assign('puzzle_2.html')
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