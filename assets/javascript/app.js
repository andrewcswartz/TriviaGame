

//End user selection .on(click) trigger for starting/answering/restarting game
$(document).on('click', '#start', function(action) {
  $('#game-Window').prepend('<br>Time Remaining: <span id="counter-number">10</span> Seconds<br>');
  trivia.startingQuestion();//starting timer works!
});

$(document).on('click', '.answer-button', function(action) {
  trivia.clicked(action);
});

$(document).on('click', '#start-over', function(action) {
  trivia.reset();
});

var quizzy = $('#quizzy'); //////////////////////
var secondsRemaining = 10;//deducting timer 
var trivia = {
  topQuestion:0,
  correct:0,
  wrong:0,

// the count down function for each series of 7 questions
  countdown: function(){ //anon function establishing timer
    trivia.counter--;
    $('#counter-number').html(trivia.counter); //displays counter in html

    if (trivia.counter === 0){
      console.log('Time is up!');//displays once time expires
      trivia.timeUp();
    }
  },

  startingQuestion: function(){//begins the game and the timer: anon function used
    timer = setInterval(trivia.countdown, 1000); // timer set to 10 seconds
    quizzy.html(questions[this.topQuestion].question); //executing display of trivia question

//re-coded for loop containing another variable and used this as a template for the remaining executions
//refering to w3 JS best practices under optimize loops section
    for (var i = 0; i<questions[this.topQuestion].answers.length; i++){ //condensed the for loop
      quizzy.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.topQuestion].answers[i] + '">' + questions[this.topQuestion].answers[i]+ '</button>');
    }
  },

  nextQuestion: function(){// function used to present next question
    trivia.counter = secondsRemaining;// game timer
    $('#counter-number').html(trivia.counter);// display of game timer
    trivia.topQuestion++; //tally of questions 
    trivia.startingQuestion();//starting 
  },

  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(trivia.counter);//displays timer
    quizzy.html("<br>Time is Up!<br>");//displays when user runs out of time
    quizzy.append("<br>The Correct Answer is: " + questions[this.topQuestion].correctAnswer + "<br>"); // triggers display of correct answer

//if, else statement progression to the next question
    if (trivia.topQuestion === questions.length - 1){
      setTimeout(trivia.results, 1 * 1000);
    } else {
      setTimeout(trivia.nextQuestion, 1 * 1000);
    }
  },

  clicked: function(action) {
    clearInterval(timer);

    if ($(action.target).data("name") === questions[this.topQuestion].correctAnswer){
      this.rightyy();
    } else {
      this.wrongly();
    }
  },

  rightyy: function(){
    clearInterval(timer);
    trivia.correct++; //adds tally to correct answer
    quizzy.html("<br>Correct!<br>"); //diplays message


    if (trivia.topQuestion === questions.length - 1){
      setTimeout(trivia.results, 1 * 1000);
      } else {
      setTimeout(trivia.nextQuestion, 1 * 1000);
    }
  },

  wrongly: function() {
    clearInterval(timer);
    trivia.wrong++; //adds tally to incorrect answer
    quizzy.html("<br>Nope!<br>"); //displays message
    quizzy.append("<br>The Correct Answer is: " + questions[trivia.topQuestion].correctAnswer + "<br>"); //triggers the display of correct answer

    if (trivia.topQuestion === questions.length - 1){
      setTimeout(trivia.results, 1 * 1000);
    } else {
      setTimeout(trivia.nextQuestion, 1 * 1000);
    }
  },



  results: function() {
  clearInterval(timer);

  quizzy.html("Completed!, Your results!");
  $('#counter-number').html(trivia.counter);
  quizzy.append("<br>Correct: " + trivia.correct);
  quizzy.append("<br>Wrong: " + trivia.wrong);
  quizzy.append("<br>Unanswered: " + (questions.length - (trivia.correct + trivia.wrong)));
  quizzy.append('<br><button id="start-over">Another Attempt?</button>');
  },


//starting a new game and resets timer and answer tally
  reset: function(){
    this.topQuestion = 0;
    this.correct = 0;
    this.wrong = 0;
    this.startingQuestion(); //function allows for restart of game
  }
};


//Questions and array answer set 

var questions = [{
  question: "1. Who did the Chiefs trade with to Select Patrick Mahomes?",
  answers: ["Browns", "Bears", "Bills", "Steelers"],
  correctAnswer: "Bills"
}, {
  question: "2. Where did Patrick go to College",
  answers: ["Texas Tech", "Florida", "USC", "Ohio State"],
  correctAnswer: "Texas Tech"
}, {
  question: "3. When will Mahomes make the Hall of Fame?",
  answers: ["2035", "Never", "2019","Already in"],
  correctAnswer: "Already in"
}, {
  question: "4. Who did Patrick Mahomes back up in 2017?",
  answers: ["Trent Green", "Tom Brady", "Alex Smith", "Aaron Rodgers"],
  correctAnswer: "Alex Smith"
}, {
  question: "5. What sport did Pat's Dad play?",
  answers: ["Football", "Lacrosse", "Baseball", "Soccer"],
  correctAnswer: "Baseball"
}, {
  question: "6. Who did he make his Debut against?",
  answers: ["Denver", "Seattle", "Miami", "Tennessee"],
  correctAnswer: "Denver"
}, {
  question: "7. Who is best Qb in Football",
  answers: ["Pat Mahomes", "Mr. Mahomes", "KC Chiefs QB1", "Pat Mahomes Left Handed"],
  correctAnswer: "Pat Mahomes"
}];


