'use strict';

/*

1. The starting screen should have a button that users can click to start the quiz.
2. Users should be prompted through a series of at least 5 multiple choice questions that they can answer.
3. Users should be asked questions 1 after the other.
4. Users should only be prompted with 1 question at a time.
5. Users should not be able to skip questions.
6. Users should also be able to see which question they're on (for instance, "7 out of 10") and their current score ("5 correct, 2 incorrect").
7. Upon submitting an answer, users should:
         receive textual feedback about their answer. If they were incorrect, they should be told the correct answer.
         be moved onto the next question (or interact with an element to move on).
8. Users should be shown their overall score at the end of the quiz. In other words, how many questions they got right out of the total questions asked.
9. Users should be able to start a new quiz. */


$(document).ready(function() {

  // * STORE

  // store keeps track of all our quiz data - questions, answers, score, question number, whether
  // the quiz has started, whether it's the first quiz being played, whether the last question
  // was answered correctly or incorrectly. 
  const store = {
    questions: [
      {
        question: 'How do you say "cat" in Spanish?',
        answers: [
          'Gato',
          'Leon',
          'Raton',
          'Perro',
          'Pajaro'
        ],
        correctAnswer: 'Gato',
        questionNumber: 1,
        image:'images/gato.jpeg',
        alt: 'cat'
      },
      {
        question: 'What is a Biblioteca?',
        answers: [
          'Gas Station',
          'Hardware Store',
          'Library',
          'Police Station',
          'School'
        ],
        correctAnswer: 'Library',
        questionNumber: 2,
        image:'images/library.jpg',
        alt: 'library'
      },
      {
        question: 'Pablo toca la guitara. What instrument does Pablo play?',
        answers: [
          'Piano',
          'Trumpet',
          'Drums',
          'Bass',
          'Guitar'
        ],
        correctAnswer: 'Guitar',
        questionNumber: 3,
        image:'images/band.jpeg',
        alt: 'guitar'
      },
      {
        question: 'Daisy tiene puesto zapatos verdes. What color are Daisy\'s shoes ?',
        answers: [
          'Brown',
          'Red',
          'Purple',
          'Green',
          'Yellow'
        ],
        correctAnswer: 'Green',
        questionNumber: 4,
        image:'images/shoes.jpeg',
        alt: 'green shoes'
      },
      {
        question: 'What day is Cinco de Mayo on?',
        answers: [
          'May 5th',
          'September 16th',
          'July 4th',
          'Febuary 12th',
          'June 6th'
        ],
        correctAnswer: 'May 5th',
        questionNumber: 5,
        image:'images/flags.jpeg',
        alt: 'cinco de mayo flags'
      }
    ],
    score: 0,
    questionCounter: 0,
    quizStarted: false,
    lastQuestionIncorrect: null,
    firstGame: true,
  };

  // * RENDER FUNCTION

  // our render function is responsible for rendering all html to the page. it uses conditionals to figure out which html should be rendered.

  function render() {

    // select questionCounter for access from conditional checks
    let currentQuestion = store.questions[store.questionCounter];

    // if it's the questionCounter is 5 (after the last next button has been pressed) and quizStarted is true, the html rendered will be the game over page.

    if (store.questionCounter === 5 && store.quizStarted === true) {
      $('main').html(`<section>
      <h2 class="gameover">Game Over!</h2>
    
      <p class="finalscore">final score: ${store.score}/5</p>
      <button class="startbutton">start new quiz</button>
    </section>` 
      );
      // if true, we return from this function to keep any further render conditionals from running
      return;
    }

    // if the quiz hasn't started and it's the first game, we render the welcome page view

    if (store.quizStarted === false && store.firstGame === true) {
      $('main').html(`<section> <h1 class="quiztitle">Spanish Quiz</h1>
      <h2 class="starttext">Do you want to play a game?</h2>
        <button class="startbutton">Si!</button>
    </section>`);
    } 
    // otherwise, we render the question view
    else if (store.quizStarted === true) {
      $('main').html(generateQuestionHtml());
    }

    // if the last question was answered correctly, display correct answer view, and visa versa

    if (store.lastQuestionIncorrect === false) {      
      $('main').html(`
          <section> 
          <header>
          <p aria-label="score" class="incorrectScore">Score: ${store.score}</p>
          </header>
          <h1 aria-label="question number" class="questionNumber"> Question ${currentQuestion.questionNumber}/5</h1>
          <img src="${currentQuestion.image}" alt="${currentQuestion.alt}">
          <p aria-label="correct" class="correctAnswer">You are correct!</p>
          <button aria-label="next question" class="nextbutton">Next</button>
    
        </section>`);
    } else if (store.lastQuestionIncorrect === true) {
      let displayCorrect = store.questions[store.questionCounter].correctAnswer;
      $('main').html(`
          <section> 
          <header>
          <p aria-label="score" class="incorrectScore">Score: ${store.score}</p>
          </header>
          <h1 aria-label="question number" class="questionNumber"> Question ${currentQuestion.questionNumber}/5</h1>
          <img src="${currentQuestion.image}" alt="${currentQuestion.alt}">
          <p aria-label="incorrect" class="incorrectAnswer">You are incorrect!</p>
          <p aria-label = "correct answer" class="incorrectAnswerReal"> The correct answer is <span class="correcthighlight">${displayCorrect}</span></p>
          <button aria-label="next question" class="nextbutton">Next</button>
        </section>`);
    }
  }

  // * GENERATE QUESTION HTML FUNCTION

  // this function generates our question view html

  function generateQuestionHtml() {
    let questionNumber = store.questions[store.questionCounter].questionNumber;
    let currentQuestion = store.questions[store.questionCounter];
    let questionHtml = `
    
    <header>
    </header>
    <p aria-label="score" class="correctScore">Score: ${store.score}</p>
  
    <h1 aria-label="question number" class="questionNumber"> Question ${questionNumber}/5</h1>
    <p aria-label="question" class="question">${currentQuestion.question}</p> 

    <form aria-label="answer choices" class="questionform">
      <fieldset>
      <input class="inputselect" type="radio" id="correct" name="choice" value="${currentQuestion.answers[0]}" tabindex="0" required>
      <label aria-label="choice 1" for="correct">${currentQuestion.answers[0]}</label>
      <input class="inputselect" type="radio" id="wrong1" name="choice" value="${currentQuestion.answers[1]}" tabindex="0" required>
      <label aria-label="choice 2" for="wrong1">${currentQuestion.answers[1]}</label>
      <input class="inputselect" type="radio" id="wrong2" name="choice" value="${currentQuestion.answers[2]}" tabindex="0" required>
      <label aria-label="choice 3" for="wrong2">${currentQuestion.answers[2]}</label>
      <input class="inputselect" type="radio" id="wrong3" name="choice" value="${currentQuestion.answers[3]}" tabindex="0" required>
      <label aria-label="choice 4" for="wrong3">${currentQuestion.answers[3]}</label>
      <input class="inputselect" type="radio" id="wrong4" name="choice" value="${currentQuestion.answers[4]}" tabindex="0" required>
      <label aria-label="choice 5" for="wrong4">${currentQuestion.answers[4]}</label>
      <button aria-label="submit answer" class="submitanswerbutton" type="submit">Submit Answer</button>
      </fieldset>
    </form>`;
    return questionHtml;
  }

  // * EVENT HANDLER FUNCTIONS

  // this function listens for a click on the next button
  // when clicked, it resets lastQuestionIncorrect in the store object to 
  // null and adds 1 to the question counter. then it calls our render function

  function handleNextClick() {
    $('body').on('click', '.nextbutton', function(event) {
      store.lastQuestionIncorrect = null;
      store.questionCounter += 1;
      render();
    });
  }

  // this function listens for a click on the start game button and sets
  // store.firstGame to false. it then resets the questionCounter to 0 if we're on the last page. 

  function handleStartGameClick() {
    $('main').on('click', '.startbutton', function() {
      store.firstGame = false;
      if (store.questionCounter === 5) {
        store.questionCounter = 0;
        store.score = 0;
      } else {
        store.quizStarted = true;
      }
      render();
    });
  }

  // this function is responsible for listening to clicks on the new quiz button, using event delegation. when clicked, it changes firstGame to false (so that welcome page is never shown again) and quizStarted to true then it calls our render function

  function handleNewGameClick() {
    $('main').on('click', '.newquizbutton', function() {
      store.firstGame = false;
      store.quizStarted = true;
      render();
    });
  }

  // this function listens for a submit on our question form, using event delegation. when an answer
  // is submitted, we check if the value of the value of the selected (checked) input is equal
  // to the correctAnswer for the question kept in our store. if it is, we add 1 to the score and 
  // change store.lastQuestionIncorrect to false. if it doesn't match correctAnswer,
  // store.lastQuestionIncorrect is set to true. then we call our render function.

  function handleSubmitAnswerButton() {
    $('main').on('submit', '.questionform', function(event) {
      event.preventDefault();

      if ($('input:checked').val() === store.questions[store.questionCounter].correctAnswer) {
        store.score++;
        store.lastQuestionIncorrect = false;
      } else {
        store.lastQuestionIncorrect = true;
      }
      render();
    });
  }

  // * ACTIVATOR FUNCTION

  // this function is responsible for activating all of our other functions

  function buildQuizGame() {
    render();
    handleStartGameClick();
    handleSubmitAnswerButton();
    handleNewGameClick();
    handleNextClick();
  }

  // * CALL ACTIVATOR FUNCTION

  // this function calls our activator function, using jQuery syntax.

  $(buildQuizGame);

});
