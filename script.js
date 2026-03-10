const questions = [

{
question:"What does HTML stand for?",
answers:[
"Hyper Text Markup Language",
"High Transfer Machine Language",
"Hyper Tool Multi Language",
"Home Tool Markup Logic"
],
correct:0
},

{
question:"Why is Git important for developers?",
answers:[
"It manages code versions",
"It designs websites",
"It stores images",
"It sends emails"
],
correct:0
},

{
question:"A colleague finds a bug in your code. What should you do?",
answers:[
"Ignore it",
"Blame someone else",
"Thank them and fix it",
"Delete the code"
],
correct:2
},

{
question:"What is SQL Injection?",
answers:[
"A database attack",
"A CSS animation",
"A design pattern",
"A web server"
],
correct:0
},

{
question:"You don't understand a task in a project. What should you do?",
answers:[
"Do nothing",
"Ask for clarification",
"Ignore the task",
"Wait until the deadline"
],
correct:1
}

]

let currentQuestion = 0
let score = 0

const questionElement = document.getElementById("question")
const answersDiv = document.getElementById("answers")
const result = document.getElementById("result")
const scoreDisplay = document.getElementById("score")
const nextButton = document.getElementById("next")

function loadQuestion(){

const q = questions[currentQuestion]

questionElement.innerText = q.question
answersDiv.innerHTML=""

q.answers.forEach((answer,index)=>{

const btn = document.createElement("button")
btn.innerText = answer

btn.onclick = () => checkAnswer(index)

answersDiv.appendChild(btn)

})

}

function checkAnswer(index){

const q = questions[currentQuestion]

if(index === q.correct){
result.innerText="Correct!"
score++
}else{
result.innerText="Wrong answer"
}

scoreDisplay.innerText = score

}

function nextQuestion(){

currentQuestion++

if(currentQuestion >= questions.length){

questionElement.innerText="Game finished!"
answersDiv.innerHTML=""
result.innerText="Final score: "+score
nextButton.style.display="none"
return

}

result.innerText=""
loadQuestion()

}

nextButton.addEventListener("click",nextQuestion)

loadQuestion()