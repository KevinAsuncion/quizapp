'use strict';

var score = 0; 
var questionNumber = 0;

/*-----------------DATA----------------*/ 

const STORE = [
	{	question:'How many minutes of exercise a week should you get?',
		answers: ['150', '100', '60', '30'],
		correctAnswer:'150'
	},
	{	question:'Which food has the highest concentration of sulfurophane?',
		answers:['Broccoli Sprouts', 'Carrots', 'Black Beans', 'Garlic'],
		correctAnswer:'Broccoli Sprouts'
	},
	{	question:'Which of these spices is the strongest anti-inflammatory?',
		answers:['Turmeric', 'Ginger', 'Pepper', 'Fenugreek'],
		correctAnswer:'Turmeric'
	},
	{	question:'Which beverage contains beneficial probiotics?',
		answers:['Orange Juice', 'Green Tea', 'Almond Milk', 'Kombucha'],
		correctAnswer:'Kombucha'
	},
	{	question:'Pesticides and pollutants tend to accumulate in animal _________',
		answers:['Organs', 'Bones', 'Fat', 'Muscle'],
		correctAnswer:'Fat'
	},
	{	question:'Of the following, which is a not a risk factor for heart disease?',
		answers: ['High sugar diet',' Smoking', 'Sedentary lifestyle', 'High HDL cholesterol'],		
		correctAnswer:'High HDL cholesterol'
	},
	{	question:'Which of the following is not a benefit of meditation?',
		answers:['Better sleep', 'Less stress', 'Less concentration', 'Better relationships'],
		correctAnswer:'Less concentration'
	},
	{	question:'What is the most effective way to reset your circadian rhythm?',
		answers: ['No blue light exposure at night', 'Eat a majority of your calories at lunch', 'Exercise in the morning', 'Take more Vitamin C'],
		correctAnswer:'No blue light exposure at night'
	},
	{	question:'What blood biomarker is used to diagnose diabetes?',
		answers:['Hemoglobin A1C', 'Fibrinogen', 'Triglycerides', 'eGFR'],
		correctAnswer:'Hemoglobin A1C'
	},
	{	question:'Autophagy, the process of clearing away dead cells, is most strongly activated by which of the following?',
		answers:['Fasting', 'Napping', 'Aerobic Exercise', 'Laughing'],
		correctAnswer:'Fasting'
	}
]

/*------------------Question Functions-----------------*/ 

function renderQuestion(){
  let answerList = createAnswerList();
	$('#container').html(
		`<div id="status">
			<p>Score: <span id="status-score">${score}</span>/10</p>
			<p>Question: <span id="status-question">${questionNumber + 1}</span>/10</p>
		</div>
		<form id ="quiz-form">
		<fieldset>
			<legend><h2 id="question">${STORE[questionNumber].question}</h2></legend>
			${answerList}
		</fieldset>
		<button type="submit" class="button" id="submit-button">SUBMIT</button>
	</form>`
	)
	handleSubmittedAnswer();
}

function createAnswerList(){
  let arr = STORE[questionNumber].answers;
  let list = arr.map((answer,index) => 
	`<label>
		<input type="radio" name="answer" value = "${STORE[questionNumber].answers[index]}" required>
			${STORE[questionNumber].answers[index]}
	</label>`
  ).join('')
  return list;
}

function nextQuestion(){
	$('#next-button').on('click',function(){
		questionNumber++;
		if(questionNumber === STORE.length) {
			renderResultsPage();
		} else {
			renderQuestion();
		} 
	});
}

/*------------------Feedback Functions-----------------*/ 

function handleSubmittedAnswer(){
	$('#quiz-form').submit(function(event){
		event.preventDefault();
		let answer = $('input:checked').val();
		let correctAnswer = STORE[questionNumber].correctAnswer;
		renderFeedback(answer === correctAnswer);
	});
}

function renderFeedback(isCorrect) {
  let content = '';
  let classname = 'fa-frown';
  let headerText = 'Sorry, that\'s incorrect';
  let answer = `The correct answer is ${STORE[questionNumber].correctAnswer}`;
  
  if (isCorrect) {
    score++;
    classname = 'fa-smile';
    headerText = 'Great job, you got it right!';
    answer = '';
  }
  
  content = `
    <div class="feedback-page">
		  <i class="far ${classname}"></i>
		  <h2>${headerText}</h2>
		  <p>${answer}</p>
		  <button id='next-button'>NEXT</button>
		</div>
  `;
  
  $('#container').html(content);
  nextQuestion();
}

/*------------------Results Functions-----------------*/ 

function renderResultsPage(){
	$('#container').html(`<div>
		<h2>Your score is:</h2>
		<p>${score}/10</p>
		<p>Want to try again?</p>
		<button id ='restart-button'>RESTART QUIZ</button>
	</div>`)
	restartQuiz();
}

/*------------------Start Functions-----------------*/ 

function renderStartPage(){
	$("#container").html(`<div>
		<h2>Welcome to the Healthspan Quiz!</h2>
		<p>Research shows people with higher health conciousness live longer and healthier lives. Want to know what your healthspan IQ is?</p>
		<button id="start-quiz-button">START QUIZ</button>
	</div>`)
	startQuiz();
}

function startQuiz(){
	$('#start-quiz-button').on('click', function(){
		renderQuestion(); 
	})
}

function restartQuiz(){
	$('#restart-button').on('click',function(){
		questionNumber = 0; 
		score = 0; 
	 	renderStartPage();;
	});
}

$(renderStartPage);






